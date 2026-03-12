import { LEVELS } from '../data/course'
import { ACHIEVEMENTS } from '../data/achievements'

const STORAGE_KEY = 'hanbuddy_progress'
const DAY_MS = 86400000

const defaultProgress = {
  xp: 0,
  streak: 0,          // current answer streak
  bestStreak: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  totalReviews: 0,
  perfectQuizzes: 0,
  achievements: [],

  // Per-item mastery: { [korean]: { seen, correct, stars, easinessFactor, interval, repetitions, nextReview, lastQuality } }
  mastery: {},

  // Unit completion: { [unitId]: true }
  unitsCompleted: {},

  // Lesson completion: { "unitId-lessonIdx": { completed, stars, quizScore, bestScore } }
  lessonProgress: {},

  // Which units are unlocked (unit 1 always unlocked)
  unitsUnlocked: [1],

  // Session tracking
  lastSession: null,
  sessionDates: [],

  // Hearts (per lesson attempt)
  hearts: 5,

  settings: {
    audioEnabled: true,
    theme: 'dark',
    dailyGoal: 20, // XP per day
  },
}

// ─── SM-2 Spaced Repetition ────────────────────────────────

const DEFAULT_EASINESS = 2.5
const MIN_EASINESS = 1.3

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

export function mapQuality(correct, currentStreak) {
  if (!correct) return 2
  if (currentStreak >= 3) return 5
  return 4
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
    if (entry.nextReview > 0 && entry.nextReview <= now) {
      const overdueDays = (now - entry.nextReview) / DAY_MS
      due.push({ word, mastery: entry, overdueDays })
    }
  }
  due.sort((a, b) => b.overdueDays - a.overdueDays)
  return count > 0 ? due.slice(0, count) : due
}

// ─── Core Progress Functions ───────────────────────────────

export function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...defaultProgress, ...parsed, settings: { ...defaultProgress.settings, ...(parsed.settings || {}) } }
    }
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

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
  return { ...defaultProgress }
}

// ─── Level System ──────────────────────────────────────────

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

// ─── Stars ─────────────────────────────────────────────────

export function getStarsForScore(score) {
  if (score >= 0.95) return 3
  if (score >= 0.8) return 2
  if (score >= 0.7) return 1
  return 0
}

// ─── Record Answer (for exercises & quizzes) ───────────────

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
  const ratio = m.correct / m.seen
  if (m.seen >= 5 && ratio >= 0.9) m.stars = 3
  else if (m.seen >= 3 && ratio >= 0.7) m.stars = 2
  else if (m.seen >= 1 && ratio >= 0.5) m.stars = 1
  else m.stars = 0

  progress.totalAttempts++

  const quality = mapQuality(correct, progress.streak)
  const srsUpdate = sm2(m, quality)
  Object.assign(m, srsUpdate)

  progress.mastery[word] = m
  recordSession(progress)
  return progress
}

// ─── Lesson Completion ─────────────────────────────────────

export function completeLesson(progress, unitId, lessonIdx, score) {
  const key = `${unitId}-${lessonIdx}`
  const stars = getStarsForScore(score)
  const prev = progress.lessonProgress[key] || {}

  progress.lessonProgress = {
    ...progress.lessonProgress,
    [key]: {
      completed: true,
      stars: Math.max(prev.stars || 0, stars),
      quizScore: score,
      bestScore: Math.max(prev.bestScore || 0, score),
    },
  }

  // XP for lesson completion
  progress.xp += 15
  if (score >= 1.0) {
    progress.perfectQuizzes = (progress.perfectQuizzes || 0) + 1
    progress.xp += 25 // perfect bonus
  }

  return progress
}

// ─── Unit Completion ───────────────────────────────────────

export function completeUnit(progress, unitId) {
  progress.unitsCompleted = { ...progress.unitsCompleted, [unitId]: true }
  progress.xp += 50 // unit completion bonus

  // Unlock next unit
  const nextId = unitId + 1
  if (!progress.unitsUnlocked.includes(nextId) && nextId <= 18) {
    progress.unitsUnlocked = [...progress.unitsUnlocked, nextId]
  }

  return progress
}

// ─── Unlock next unit when last lesson of current unit is done ──

export function checkUnitComplete(progress, unitId, totalLessons) {
  let allDone = true
  for (let i = 0; i < totalLessons; i++) {
    const key = `${unitId}-${i}`
    if (!progress.lessonProgress[key]?.completed) {
      allDone = false
      break
    }
  }
  if (allDone && !progress.unitsCompleted[unitId]) {
    return completeUnit(progress, unitId)
  }
  // Even if unit not complete, unlock next unit after first lesson pass
  const nextId = unitId + 1
  if (!progress.unitsUnlocked.includes(nextId) && nextId <= 18) {
    // Unlock next unit after completing at least half the lessons
    let completed = 0
    for (let i = 0; i < totalLessons; i++) {
      if (progress.lessonProgress[`${unitId}-${i}`]?.completed) completed++
    }
    if (completed >= Math.ceil(totalLessons / 2)) {
      progress.unitsUnlocked = [...progress.unitsUnlocked, nextId]
    }
  }
  return progress
}

// ─── Achievements ──────────────────────────────────────────

export function checkAchievements(progress) {
  const newAchievements = []
  const earned = new Set(progress.achievements)
  const hour = new Date().getHours()

  const completedLessons = Object.values(progress.lessonProgress).filter(l => l.completed).length
  const completedUnits = Object.keys(progress.unitsCompleted).length
  const vocabCount = Object.keys(progress.mastery).length
  const dailyStreak = getDailyStreak(progress.sessionDates)
  const threeStarCount = Object.values(progress.lessonProgress).filter(l => l.stars >= 3).length

  const checks = {
    first_lesson: () => completedLessons >= 1,
    hangul_master: () => progress.unitsCompleted[1],
    introducer: () => progress.unitsCompleted[2],
    unit5: () => completedUnits >= 5,
    unit10: () => completedUnits >= 10,
    unit18: () => completedUnits >= 18,
    perfect_quiz: () => progress.perfectQuizzes >= 1,
    ten_perfect: () => progress.perfectQuizzes >= 10,
    vocab_50: () => vocabCount >= 50,
    vocab_100: () => vocabCount >= 100,
    vocab_200: () => vocabCount >= 200,
    streak_3: () => dailyStreak >= 3,
    streak_7: () => dailyStreak >= 7,
    streak_14: () => dailyStreak >= 14,
    streak_30: () => dailyStreak >= 30,
    correct_5: () => progress.bestStreak >= 5,
    correct_10: () => progress.bestStreak >= 10,
    correct_20: () => progress.bestStreak >= 20,
    first_review: () => progress.totalReviews >= 1,
    review_50: () => progress.totalReviews >= 50,
    review_200: () => progress.totalReviews >= 200,
    xp_500: () => progress.xp >= 500,
    xp_2000: () => progress.xp >= 2000,
    xp_5000: () => progress.xp >= 5000,
    night_owl: () => hour >= 0 && hour < 5,
    early_bird: () => hour >= 5 && hour < 7,
    three_stars: () => threeStarCount >= 1,
    ten_three_stars: () => threeStarCount >= 10,
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

// ─── Session & Streak ──────────────────────────────────────

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

export function updateSetting(progress, key, value) {
  progress.settings = { ...progress.settings, [key]: value }
  return progress
}
