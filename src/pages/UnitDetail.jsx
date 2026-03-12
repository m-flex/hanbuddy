import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Star, Check, Clock, ChevronRight } from 'lucide-react'
import { UNITS, getUnitLessons } from '../data/course'

export default function UnitDetail({ progress }) {
  const { unitId } = useParams()
  const unit = UNITS.find(u => u.id === Number(unitId))
  const lessons = getUnitLessons(Number(unitId))

  if (!unit) return <div className="text-center py-20 text-slate-400">Unit not found</div>

  const isUnlocked = progress.unitsUnlocked.includes(unit.id)
  if (!isUnlocked) return <div className="text-center py-20 text-slate-400">This unit is locked</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <Link to="/course" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors no-underline text-sm mb-6">
        <ArrowLeft size={16} /> All Units
      </Link>

      {/* Unit header */}
      <div className="text-center mb-8">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
          style={{ backgroundColor: unit.color + '20', border: `2px solid ${unit.color}40` }}
        >
          {unit.icon}
        </div>
        <span className="text-xs font-medium px-3 py-1 rounded-full inline-block mb-2"
          style={{ color: unit.color, backgroundColor: unit.color + '15' }}>
          Unit {unit.id}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{unit.title}</h1>
        <p className="text-slate-400 mt-1">{unit.description}</p>
      </div>

      {/* Lessons */}
      <div className="space-y-3">
        {lessons.map((lesson, i) => {
          const key = `${unit.id}-${i}`
          const lp = progress.lessonProgress[key]
          const completed = lp?.completed
          const stars = lp?.stars || 0
          // Unlock: first lesson always, or previous completed
          const prevKey = `${unit.id}-${i - 1}`
          const prevCompleted = i === 0 || progress.lessonProgress[prevKey]?.completed
          const locked = !prevCompleted

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {locked ? (
                <div className="bg-slate-800/20 border border-slate-700/20 rounded-xl p-4 opacity-40 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/30 flex items-center justify-center">
                    <Lock size={16} className="text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-slate-600">Lesson {i + 1}</span>
                    <h3 className="text-slate-500 font-medium">{lesson.title}</h3>
                  </div>
                </div>
              ) : (
                <Link to={`/lesson/${unit.id}/${i}`} className="no-underline block">
                  <div className={`bg-slate-800/50 border rounded-xl p-4 transition-all hover:bg-slate-800/80 flex items-center gap-4
                    ${completed ? 'border-green-500/20' : 'border-slate-700/50 hover:border-slate-600/50'}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${completed ? 'bg-green-500/20' : 'bg-slate-700/40'}`}
                      style={!completed ? { backgroundColor: unit.color + '15' } : {}}
                    >
                      {completed
                        ? <Check size={18} className="text-green-400" />
                        : <span className="text-sm font-bold" style={{ color: unit.color }}>{i + 1}</span>
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Lesson {i + 1}</span>
                        {lesson.estimatedMinutes && (
                          <span className="text-xs text-slate-600 flex items-center gap-0.5">
                            <Clock size={10} /> {lesson.estimatedMinutes}min
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-medium">{lesson.title}</h3>
                      {lesson.subtitle && (
                        <p className="text-slate-400 text-sm hangul">{lesson.subtitle}</p>
                      )}

                      {/* Stars */}
                      {completed && (
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1, 2, 3].map(s => (
                            <Star
                              key={s}
                              size={14}
                              className={s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <ChevronRight size={18} className="text-slate-500 flex-shrink-0" />
                  </div>
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
