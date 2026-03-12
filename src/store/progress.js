import { LEVELS, ACHIEVEMENTS, STAGES } from '../data/korean'

const STORAGE_KEY = 'hanbuddy_progress'
const DAY_MS = 86400000

const defaultProgress = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  sentencesBuilt: 0,
  achievements: [],
  // Per-item mastery: { [word]: { seen, correct, stars, easinessFactor, interval, repetitions, nextReview, lastQuality } }
  mastery: {},
  // Per-stage completion
  stageProgress: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
  // Per-lesson completion: { "stageId-lessonIdx": percentage }
  lessonProgress: {},
  // Per-lesson milestones: { "stageId-lessonIdx": { learned: bool, quizScore: num } }
  lessonMilestones: {},
  // Which stages are unlocked
  stagesUnlocked: [1],
  // Spaced repetition data
  srs: {},
  lastSession: null,
  sessionDates: [],
  timedBests: {},
  dailyChallengeDate: null,
  settings: {
    audioEnabled: true,
    theme: 'dark',
  },
}

// --- SM-2 Spaced Repetition Algorithm ---

const DEFAULT_EASINESS = 2.5
const MIN_EASINESS = 1.3

export function mapQuality(correct, currentStreak) {
  if (!correct) return 2
  if (currentStreak >= 3) return 5
  return 4
}

function defaultSrsFields() {
  return {
    easinessFactor: DEFAULT_EASINESS,
    interval: 0,
    repetitions: 0,
    nextReview: 0,
    lastQuality: null,
  }
}

function ensureSrsFields(m) {
  return { ...defaultSrsFields(), ...m }
}

export function sm2(card, quality) {
  let { easinessFactor, interval, repetitions } = card
  quality = Math.max(0, Math.min(5, Math.round(quality)))

  if (quality < 3) {
    repetitions = 0
    interval = 1
  } else {
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easinessFactor)
    repetitions++
  }

  easinessFactor = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easinessFactor < MIN_EASINESS) easinessFactor = MIN_EASINESS

  return {
    easinessFactor,
    interval,
    repetitions,
    nextReview: Date.now() + interval * DAY_MS,
    lastQuality: quality,
  }
}

export function getNextReviewItems(mastery, count = 0) {
  const now = Date.now()
  const due = []
  for (const [word, rawEntry] of Object.entries(mastery)) {
    const entry = ensureSrsFields(rawEntry)
    if (entry.nextReview <= now) {
      const overdueDays = entry.nextReview === 0 ? Infinity : (now - entry.nextReview) / DAY_MS
      due.push({ word, mastery: entry, overdueDays })
    }
  }
  due.sort((a, b) => b.overdueDays - a.overdueDays)
  return count > 0 ? due.slice(0, count) : due
}

export function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...defaultProgress, ...JSON.parse(saved) }
  } catch (e) {
    console.warn('Failed to load progress:', e)
  }
  return { ...defaultProgress }
}

export function saveProgress(progress) {
  try {
    progress.lastSession = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.warn('Failed to save progress:', e)
  }
}

export function getLevel(xp) {
  let current = LEVELS[0]
  for (const level of LEVELS) {
    if (xp >= level.minXp) current = level
    else break
  }
  const nextLevel = LEVELS.find(l => l.minXp > xp)
  const xpForNext = nextLevel ? nextLevel.minXp - xp : 0
  const xpInLevel = nextLevel ? xp - current.minXp : 0
  const xpNeeded = nextLevel ? nextLevel.minXp - current.minXp : 1
  return { ...current, xpForNext, progress: xpInLevel / xpNeeded }
}

export function getStars(mastery) {
  if (!mastery || mastery.seen === 0) return 0
  const ratio = mastery.correct / mastery.seen
  if (mastery.seen >= 5 && ratio >= 0.9) return 3
  if (mastery.seen >= 3 && ratio >= 0.7) return 2
  if (mastery.seen >= 1 && ratio >= 0.5) return 1
  return 0
}

export function recordAnswer(progress, word, correct) {
  const raw = progress.mastery[word] || { seen: 0, correct: 0, stars: 0 }
  const m = ensureSrsFields(raw)

  m.seen++
  if (correct) {
    m.correct++
    progress.totalCorrect++
    progress.streak++
    progress.xp += 3 + Math.min(progress.streak, 5)
    if (progress.streak > progress.bestStreak) progress.bestStreak = progress.streak
  } else {
    progress.streak = 0
  }
  m.stars = getStars(m)
  progress.totalAttempts++

  const quality = mapQuality(correct, progress.streak)
  const srsUpdate = sm2(m, quality)
  m.easinessFactor = srsUpdate.easinessFactor
  m.interval = srsUpdate.interval
  m.repetitions = srsUpdate.repetitions
  m.nextReview = srsUpdate.nextReview
  m.lastQuality = srsUpdate.lastQuality

  progress.mastery[word] = m
  recordSession(progress)
  return progress
}

export function addXp(progress, amount) {
  progress.xp += amount
  return progress
}

export function checkAchievements(progress) {
  const newAchievements = []
  const earned = new Set(progress.achievements)

  const checks = {
    first_word: () => Object.keys(progress.mastery).length >= 1,
    phrases_done: () => (progress.stageProgress[1] || 0) >= 80,
    grammar_done: () => (progress.stageProgress[2] || 0) >= 80,
    vocab_50: () => Object.keys(progress.mastery).length >= 50,
    vocab_100: () => Object.keys(progress.mastery).length >= 100,
    perfect_quiz: () => progress.streak >= 5,
    streak_3: () => progress.bestStreak >= 3,
    streak_10: () => progress.bestStreak >= 10,
    daily_3: () => getDailyStreak(progress.sessionDates) >= 3,
    daily_7: () => getDailyStreak(progress.sessionDates) >= 7,
    blitz_20: () => progress.timedBests?.blitz30?.score >= 20,
    sentences_10: () => (progress.sentencesBuilt || 0) >= 10,
    all_stages: () => STAGES.every(s => (progress.stageProgress[s.id] || 0) >= 80),
  }

  for (const [id, check] of Object.entries(checks)) {
    if (!earned.has(id) && check()) {
      const achievement = ACHIEVEMENTS.find(a => a.id === id)
      if (achievement) {
        progress.achievements.push(id)
        progress.xp += achievement.xp
        newAchievements.push(achievement)
      }
    }
  }
  return newAchievements
}

export function unlockNextStage(progress, stageId) {
  const maxStage = STAGES.length
  if (!progress.stagesUnlocked.includes(stageId + 1) && stageId < maxStage) {
    progress.stagesUnlocked.push(stageId + 1)
  }
  return progress
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
  return { ...defaultProgress }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function recordSession(progress) {
  const today = todayStr()
  if (!progress.sessionDates) progress.sessionDates = []
  if (!progress.sessionDates.includes(today)) {
    progress.sessionDates = [...progress.sessionDates, today]
  }
  return progress
}

export function getDailyStreak(sessionDates = []) {
  if (sessionDates.length === 0) return 0
  const sorted = [...new Set(sessionDates)].sort().reverse()
  const today = todayStr()
  const yesterday = new Date(Date.now() - DAY_MS).toISOString().slice(0, 10)
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T00:00:00')
    const curr = new Date(sorted[i] + 'T00:00:00')
    const diff = (prev - curr) / DAY_MS
    if (diff === 1) streak++
    else break
  }
  return streak
}

export function getSessionHeatmap(sessionDates = [], days = 90) {
  const result = []
  const dateSet = new Set(sessionDates)
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * DAY_MS)
    const str = d.toISOString().slice(0, 10)
    result.push({ date: str, active: dateSet.has(str), day: d.getDay() })
  }
  return result
}

export function updateTimedBest(progress, mode, score) {
  if (!progress.timedBests) progress.timedBests = {}
  const current = progress.timedBests[mode]
  if (!current || score > current.score) {
    progress.timedBests[mode] = { score, date: todayStr() }
  }
  return progress
}

export function updateSetting(progress, key, value) {
  if (!progress.settings) progress.settings = { audioEnabled: true }
  progress.settings = { ...progress.settings, [key]: value }
  return progress
}
