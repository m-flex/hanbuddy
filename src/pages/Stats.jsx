import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Target, Trophy, BookOpen } from 'lucide-react'
import { getLevel, getDailyStreak, getSessionHeatmap } from '../store/progress'

export default function Stats({ progress }) {
  const level = getLevel(progress.xp)
  const dailyStreak = getDailyStreak(progress.sessionDates)
  const heatmap = getSessionHeatmap(progress.sessionDates)
  const vocabCount = Object.keys(progress.mastery).length
  const completedLessons = Object.values(progress.lessonProgress).filter(l => l.completed).length
  const completedUnits = Object.keys(progress.unitsCompleted).length
  const accuracy = progress.totalAttempts > 0 ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-white no-underline text-sm"><ArrowLeft size={16} /> Back</Link>
        <h1 className="text-xl font-bold text-white">Statistics</h1>
        <div />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <Star className="text-amber-400" size={18} />, value: progress.xp, label: 'Total XP' },
          { icon: <span>🔥</span>, value: `${dailyStreak}d`, label: 'Day Streak' },
          { icon: <Target className="text-primary-400" size={18} />, value: `${accuracy}%`, label: 'Accuracy' },
          { icon: <BookOpen className="text-green-400" size={18} />, value: completedLessons, label: 'Lessons Done' },
          { icon: <Trophy className="text-purple-400" size={18} />, value: completedUnits, label: 'Units Done' },
          { icon: <span>📝</span>, value: vocabCount, label: 'Words Seen' },
        ].map((s, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{level.icon}</span>
          <span className="font-bold text-white">Level {level.level}: {level.title}</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${level.progress * 100}%`, backgroundColor: level.color }} />
        </div>
        {level.xpForNext > 0 && <span className="text-xs text-slate-500 mt-1 block">{level.xpForNext} XP to next level</span>}
      </div>
      <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
        <h3 className="text-white font-semibold mb-3">Activity (90 days)</h3>
        <div className="flex flex-wrap gap-1">
          {heatmap.map((d, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${d.active ? 'bg-green-500' : 'bg-slate-700/50'}`} title={d.date} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
