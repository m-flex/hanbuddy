import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Trophy, Target, Star, BarChart3, BookOpen, RefreshCw } from 'lucide-react'
import { getLevel, getDailyStreak, getNextReviewItems } from '../store/progress'
import { ACHIEVEMENTS } from '../data/achievements'
import { UNITS } from '../data/course'

export default function Dashboard({ progress }) {
  const level = getLevel(progress.xp)
  const dailyStreak = getDailyStreak(progress.sessionDates)
  const earnedAchievements = ACHIEVEMENTS.filter(a => progress.achievements.includes(a.id))
  const reviewDue = getNextReviewItems(progress.mastery).length
  const completedLessons = Object.values(progress.lessonProgress).filter(l => l.completed).length
  const completedUnits = Object.keys(progress.unitsCompleted).length
  const vocabCount = Object.keys(progress.mastery).length

  // Find the next lesson to do
  let nextLesson = null
  for (const unit of UNITS) {
    if (!progress.unitsUnlocked.includes(unit.id)) continue
    for (let i = 0; i < unit.lessonCount; i++) {
      const key = `${unit.id}-${i}`
      if (!progress.lessonProgress[key]?.completed) {
        nextLesson = { unitId: unit.id, lessonIdx: i, unit }
        break
      }
    }
    if (nextLesson) break
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Hero */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="text-6xl mb-3"
        >
          {level.icon}
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
          Hanbuddy
        </h1>
        <p className="text-slate-400">
          Learn Korean, step by step
        </p>
      </div>

      {/* Main action */}
      <div className="flex justify-center gap-3 mb-8">
        {nextLesson ? (
          <Link to={`/lesson/${nextLesson.unitId}/${nextLesson.lessonIdx}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-primary-600 hover:bg-primary-500 text-white
                px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg glow-blue
                cursor-pointer border-0 transition-colors"
            >
              <Play size={22} />
              {completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
            </motion.button>
          </Link>
        ) : (
          <Link to="/course">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white
                px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg glow-green
                cursor-pointer border-0 transition-colors"
            >
              <Trophy size={22} />
              Course Complete!
            </motion.button>
          </Link>
        )}
      </div>

      {/* Quick actions row */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Link to="/course">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium cursor-pointer hover:bg-slate-700/50 transition-colors">
            <BookOpen size={16} /> All Units
          </motion.button>
        </Link>
        {reviewDue > 0 && (
          <Link to="/review">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium cursor-pointer hover:bg-amber-500/20 transition-colors">
              <RefreshCw size={16} /> Review ({reviewDue} due)
            </motion.button>
          </Link>
        )}
        <Link to="/stats">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium cursor-pointer hover:bg-slate-700/50 transition-colors">
            <BarChart3 size={16} /> Stats
          </motion.button>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Star className="text-amber-400" size={20} />} value={progress.xp} label="Total XP" />
        <StatCard icon={<span className="text-lg">🔥</span>} value={dailyStreak > 0 ? `${dailyStreak}d` : '0'} label="Day Streak" />
        <StatCard icon={<Target className="text-primary-400" size={20} />} value={vocabCount} label="Words Learned" />
        <StatCard icon={<Trophy className="text-green-400" size={20} />} value={`${completedLessons}`} label="Lessons Done" />
      </div>

      {/* Level progress */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{level.icon}</span>
            <div>
              <span className="text-sm text-slate-400">Level {level.level}</span>
              <span className="font-bold text-white ml-2">{level.title}</span>
            </div>
          </div>
          {level.xpForNext > 0 && (
            <span className="text-sm text-slate-500">{level.xpForNext} XP to next</span>
          )}
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level.progress * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ backgroundColor: level.color }}
          />
        </div>
      </div>

      {/* Course progress */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-primary-400" />
          Course Progress
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {UNITS.slice(0, 6).map(unit => {
            const unlocked = progress.unitsUnlocked.includes(unit.id)
            const completed = progress.unitsCompleted?.[unit.id]
            return (
              <div key={unit.id} className={`flex items-center gap-3 p-2 rounded-lg ${unlocked ? '' : 'opacity-40'}`}>
                <span className="text-lg w-8 text-center">{unlocked ? unit.icon : '🔒'}</span>
                <span className={`text-sm flex-1 ${completed ? 'text-green-400' : 'text-slate-300'}`}>
                  {unit.title}
                </span>
                {completed && <span className="text-xs text-green-400">✓</span>}
              </div>
            )
          })}
        </div>
        {UNITS.length > 6 && (
          <Link to="/course" className="text-sm text-primary-400 hover:text-primary-300 mt-3 inline-block no-underline">
            View all {UNITS.length} units →
          </Link>
        )}
      </div>

      {/* Achievements */}
      {earnedAchievements.length > 0 && (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-amber-400" />
            Achievements ({earnedAchievements.length}/{ACHIEVEMENTS.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {earnedAchievements.slice(0, 12).map(a => (
              <div key={a.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/50 border border-amber-500/20 text-sm" title={a.desc}>
                <span>{a.icon}</span>
                <span className="text-white text-xs">{a.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center"
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </motion.div>
  )
}
