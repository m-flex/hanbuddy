import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Check, ChevronRight, Star } from 'lucide-react'
import { UNITS, getUnitLessons } from '../data/course'

export default function CourseMap({ progress }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Korean Course</h1>
      <p className="text-slate-400 text-center mb-8">Master Korean step by step</p>

      <div className="space-y-4">
        {UNITS.map((unit, i) => {
          const unlocked = progress.unitsUnlocked.includes(unit.id)
          const completed = progress.unitsCompleted?.[unit.id]
          const lessons = getUnitLessons(unit.id)
          const completedCount = lessons.filter((_, li) =>
            progress.lessonProgress[`${unit.id}-${li}`]?.completed
          ).length
          const totalStars = lessons.reduce((sum, _, li) =>
            sum + (progress.lessonProgress[`${unit.id}-${li}`]?.stars || 0), 0
          )
          const maxStars = lessons.length * 3
          const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              {unlocked ? (
                <Link to={`/unit/${unit.id}`} className="no-underline block">
                  <div className={`bg-slate-800/50 border rounded-2xl p-5 transition-all hover:bg-slate-800/80 hover:border-slate-600/80
                    ${completed ? 'border-green-500/30' : 'border-slate-700/50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ backgroundColor: unit.color + '20', border: `1px solid ${unit.color}40` }}
                      >
                        {completed ? <Check size={24} style={{ color: unit.color }} /> : unit.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ color: unit.color, backgroundColor: unit.color + '15' }}>
                            Unit {unit.id}
                          </span>
                          {completed && (
                            <span className="text-xs text-green-400 font-medium">Complete</span>
                          )}
                        </div>
                        <h3 className="text-white font-semibold mt-1">{unit.title}</h3>
                        <p className="text-slate-400 text-sm">{unit.description}</p>

                        {/* Progress bar */}
                        {!completed && completedCount > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${progressPercent}%`, backgroundColor: unit.color }}
                              />
                            </div>
                            <span className="text-xs text-slate-500">{completedCount}/{lessons.length}</span>
                          </div>
                        )}

                        {/* Stars */}
                        {totalStars > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            <span className="text-xs text-amber-400">{totalStars}/{maxStars}</span>
                          </div>
                        )}
                      </div>

                      <ChevronRight size={20} className="text-slate-500 flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-slate-800/20 border border-slate-700/20 rounded-2xl p-5 opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-700/30 flex items-center justify-center text-2xl flex-shrink-0">
                      <Lock size={20} className="text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-slate-600">Unit {unit.id}</span>
                      <h3 className="text-slate-500 font-semibold">{unit.title}</h3>
                      <p className="text-slate-600 text-sm">{unit.subtitle}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
