// Course metadata — units, progression, and lesson index

export const UNITS = [
  {
    id: 1,
    title: 'The Korean Alphabet',
    subtitle: 'Hangul',
    description: 'Learn to read and write every Korean character',
    icon: 'ㄱ',
    color: '#3b82f6',
    lessonCount: 10,
  },
  {
    id: 2,
    title: 'First Words',
    subtitle: 'Introductions',
    description: 'Greet people, introduce yourself, and be polite',
    icon: '👋',
    color: '#8b5cf6',
    lessonCount: 5,
  },
  {
    id: 3,
    title: 'Sentence Structure',
    subtitle: 'How Korean Works',
    description: 'Understand SOV word order and the particle system',
    icon: '🧩',
    color: '#06b6d4',
    lessonCount: 5,
  },
  {
    id: 4,
    title: 'Essential Verbs',
    subtitle: 'Actions',
    description: 'Learn common verbs and how conjugation works',
    icon: '🏃',
    color: '#f97316',
    lessonCount: 5,
  },
  {
    id: 5,
    title: 'People, Places & Things',
    subtitle: 'Vocabulary',
    description: 'Build practical vocabulary for everyday life',
    icon: '🏘️',
    color: '#22c55e',
    lessonCount: 5,
  },
  {
    id: 6,
    title: 'Numbers & Counting',
    subtitle: 'Both Systems',
    description: 'Master Sino-Korean and Native Korean numbers',
    icon: '🔢',
    color: '#eab308',
    lessonCount: 4,
  },
  {
    id: 7,
    title: 'Making Sentences',
    subtitle: 'Patterns',
    description: 'Express wants, abilities, and requests',
    icon: '💬',
    color: '#ec4899',
    lessonCount: 5,
  },
  {
    id: 8,
    title: 'Past & Future',
    subtitle: 'Tenses',
    description: 'Talk about what happened and what will happen',
    icon: '⏳',
    color: '#14b8a6',
    lessonCount: 3,
  },
  {
    id: 9,
    title: 'Asking Questions',
    subtitle: 'Questions',
    description: 'Ask anything with question words and patterns',
    icon: '❓',
    color: '#a855f7',
    lessonCount: 3,
  },
  {
    id: 10,
    title: 'Connecting Ideas',
    subtitle: 'Flow',
    description: 'Move beyond simple sentences into natural Korean',
    icon: '🔗',
    color: '#6366f1',
    lessonCount: 4,
  },
  {
    id: 11,
    title: 'Daily Life',
    subtitle: 'Routines',
    description: 'Describe your daily life fluently',
    icon: '☀️',
    color: '#f59e0b',
    lessonCount: 4,
  },
  {
    id: 12,
    title: 'Out & About',
    subtitle: 'Shopping & Food',
    description: 'Navigate restaurants, shops, and transportation',
    icon: '🛒',
    color: '#10b981',
    lessonCount: 3,
  },
  {
    id: 13,
    title: 'Feelings & Opinions',
    subtitle: 'Expression',
    description: 'Share how you feel and what you think',
    icon: '💭',
    color: '#f43f5e',
    lessonCount: 3,
  },
  {
    id: 14,
    title: 'Honorifics',
    subtitle: 'Politeness',
    description: 'Understand Korean\'s essential politeness system',
    icon: '🎎',
    color: '#d946ef',
    lessonCount: 3,
  },
  {
    id: 15,
    title: 'Comparisons & More',
    subtitle: 'Advanced Grammar',
    description: 'Compare things, make suggestions, share experiences',
    icon: '⚖️',
    color: '#0ea5e9',
    lessonCount: 3,
  },
  {
    id: 16,
    title: 'Complex Sentences',
    subtitle: 'Fluency',
    description: 'Handle real conversations with connected Korean',
    icon: '🧠',
    color: '#8b5cf6',
    lessonCount: 4,
  },
  {
    id: 17,
    title: 'Culture & Slang',
    subtitle: 'Real Korean',
    description: 'Cultural context, texting, and common expressions',
    icon: '🇰🇷',
    color: '#ef4444',
    lessonCount: 3,
  },
  {
    id: 18,
    title: 'Putting It Together',
    subtitle: 'Review',
    description: 'Consolidate everything through real-world scenarios',
    icon: '🏆',
    color: '#f59e0b',
    lessonCount: 4,
  },
]

// XP levels
export const LEVELS = [
  { level: 1, title: 'Curious', minXp: 0, color: '#94a3b8', icon: '🥚' },
  { level: 2, title: 'Beginner', minXp: 100, color: '#60a5fa', icon: '🌱' },
  { level: 3, title: 'Student', minXp: 300, color: '#34d399', icon: '🌿' },
  { level: 4, title: 'Learner', minXp: 600, color: '#a78bfa', icon: '🌳' },
  { level: 5, title: 'Speaker', minXp: 1200, color: '#f472b6', icon: '🌸' },
  { level: 6, title: 'Conversant', minXp: 2000, color: '#fb923c', icon: '🏵️' },
  { level: 7, title: 'Skilled', minXp: 3500, color: '#facc15', icon: '🦢' },
  { level: 8, title: 'Fluent', minXp: 5500, color: '#f87171', icon: '🐯' },
  { level: 9, title: 'Advanced', minXp: 8000, color: '#c084fc', icon: '🐉' },
  { level: 10, title: 'Master', minXp: 12000, color: '#ef4444', icon: '🔥' },
]

/**
 * Dynamically load a unit's lessons.
 * Units are lazy-loaded to keep the initial bundle small.
 */
const unitModules = import.meta.glob('./units/unit*.js', { eager: true })

export function getUnitLessons(unitId) {
  const pad = String(unitId).padStart(2, '0')
  for (const [path, mod] of Object.entries(unitModules)) {
    if (path.includes(`unit${pad}`)) {
      return mod.default || mod.lessons || []
    }
  }
  return []
}

export function getLesson(unitId, lessonIndex) {
  const lessons = getUnitLessons(unitId)
  return lessons[lessonIndex] || null
}

export function getTotalLessons() {
  return UNITS.reduce((sum, u) => sum + u.lessonCount, 0)
}
