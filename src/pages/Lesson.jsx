import { useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight, ChevronLeft, BookOpen, Dumbbell, GraduationCap, Volume2, Star } from 'lucide-react'
import { UNITS, getLesson, getUnitLessons } from '../data/course'
import { recordAnswer, completeLesson, checkUnitComplete } from '../store/progress'
import { speak } from '../utils/audio'
import TeachSlide from '../components/TeachSlide'
import ExerciseRunner from '../components/ExerciseRunner'

export default function Lesson({ progress, updateProgress }) {
  const { unitId, lessonIdx } = useParams()
  const navigate = useNavigate()
  const uid = Number(unitId)
  const lidx = Number(lessonIdx)

  const unit = UNITS.find(u => u.id === uid)
  const lesson = getLesson(uid, lidx)
  const allLessons = getUnitLessons(uid)

  const [phase, setPhase] = useState('teach') // teach | vocab | practice | results
  const [teachIndex, setTeachIndex] = useState(0)
  const [teachDirection, setTeachDirection] = useState(1)
  const [quizScore, setQuizScore] = useState(null)
  const [quizResults, setQuizResults] = useState(null)

  // Shuffle exercises for the quiz
  const quizExercises = useMemo(() => {
    if (!lesson) return []
    const all = [...lesson.exercises]
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]]
    }
    return all.slice(0, lesson.quizQuestionCount || all.length)
  }, [lesson])

  const handleAnswer = useCallback((correct, word) => {
    if (word) {
      updateProgress(prev => recordAnswer({ ...prev }, word, correct))
    }
  }, [updateProgress])

  const handleQuizComplete = useCallback((score, results) => {
    setQuizScore(score)
    setQuizResults(results)
    setPhase('results')

    updateProgress(prev => {
      let next = { ...prev }
      next = completeLesson(next, uid, lidx, score)
      next = checkUnitComplete(next, uid, allLessons.length)
      return next
    })
  }, [uid, lidx, allLessons.length, updateProgress])

  if (!unit || !lesson) {
    return <div className="text-center py-20 text-slate-400">Lesson not found</div>
  }

  const totalTeachSlides = lesson.teach.length + (lesson.vocabulary.length > 0 ? 1 : 0)
  const hasVocab = lesson.vocabulary.length > 0

  const goNextTeach = () => {
    setTeachDirection(1)
    if (teachIndex < lesson.teach.length - 1) {
      setTeachIndex(i => i + 1)
    } else if (hasVocab && teachIndex === lesson.teach.length - 1) {
      setPhase('vocab')
    } else {
      setPhase('practice')
    }
  }

  const goPrevTeach = () => {
    if (phase === 'vocab') {
      setPhase('teach')
      setTeachDirection(-1)
      return
    }
    if (teachIndex > 0) {
      setTeachDirection(-1)
      setTeachIndex(i => i - 1)
    }
  }

  const stars = quizScore !== null ? (quizScore >= 0.95 ? 3 : quizScore >= 0.8 ? 2 : quizScore >= 0.7 ? 1 : 0) : 0
  const passed = quizScore !== null && quizScore >= (lesson.passThreshold || 0.7)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto px-4 py-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to={`/unit/${uid}`} className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors no-underline text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: unit.color, backgroundColor: unit.color + '15' }}>
            Unit {uid}
          </span>
          <span className="text-sm text-slate-400">{lesson.title}</span>
        </div>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[
          { key: 'teach', icon: BookOpen, label: 'Learn' },
          ...(hasVocab ? [{ key: 'vocab', icon: Volume2, label: 'Vocab' }] : []),
          { key: 'practice', icon: Dumbbell, label: 'Practice' },
          { key: 'results', icon: GraduationCap, label: 'Results' },
        ].map((p, i) => {
          const phases = ['teach', ...(hasVocab ? ['vocab'] : []), 'practice', 'results']
          const currentPhaseIndex = phases.indexOf(phase)
          const thisPhaseIndex = phases.indexOf(p.key)
          const isCurrent = phase === p.key
          const isDone = thisPhaseIndex < currentPhaseIndex

          return (
            <div key={p.key} className="flex items-center gap-2">
              {i > 0 && <div className={`w-6 h-0.5 ${isDone ? 'bg-green-500' : 'bg-slate-700'}`} />}
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors
                ${isCurrent ? 'bg-primary-500/20 text-primary-400' : isDone ? 'text-green-400' : 'text-slate-600'}`}>
                <p.icon size={12} />
                <span className="hidden sm:inline">{p.label}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── TEACH PHASE ───────────────────────────────────── */}
      {phase === 'teach' && (
        <div>
          {/* Progress */}
          <div className="h-1.5 bg-slate-700 rounded-full mb-6 overflow-hidden">
            <motion.div
              animate={{ width: `${((teachIndex + 1) / lesson.teach.length) * 100}%` }}
              className="h-full bg-primary-500 rounded-full"
            />
          </div>

          <AnimatePresence mode="wait">
            <TeachSlide
              key={teachIndex}
              slide={lesson.teach[teachIndex]}
              index={teachIndex}
              direction={teachDirection}
            />
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goPrevTeach}
              disabled={teachIndex === 0}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-700/50 border border-slate-600/50
                text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-600/50 transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </motion.button>

            <span className="text-sm text-slate-500">{teachIndex + 1} / {lesson.teach.length}</span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goNextTeach}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500
                text-white cursor-pointer border-0 transition-colors font-medium"
            >
              {teachIndex === lesson.teach.length - 1
                ? (hasVocab ? 'Vocabulary' : 'Practice')
                : 'Next'
              }
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      )}

      {/* ─── VOCAB PHASE ───────────────────────────────────── */}
      {phase === 'vocab' && (
        <VocabPhase
          vocabulary={lesson.vocabulary}
          onComplete={() => setPhase('practice')}
          onBack={goPrevTeach}
        />
      )}

      {/* ─── PRACTICE (QUIZ) PHASE ─────────────────────────── */}
      {phase === 'practice' && (
        <div>
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-white">Practice Time!</h2>
            <p className="text-sm text-slate-400">Get {Math.round((lesson.passThreshold || 0.7) * 100)}% to pass</p>
          </div>
          <ExerciseRunner
            exercises={quizExercises}
            onComplete={handleQuizComplete}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {/* ─── RESULTS PHASE ─────────────────────────────────── */}
      {phase === 'results' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 mb-6">
            {passed ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  {stars === 3 ? '🌟' : stars === 2 ? '⭐' : '✅'}
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {stars === 3 ? 'Perfect!' : stars === 2 ? 'Great Job!' : 'Lesson Complete!'}
                </h2>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">💪</div>
                <h2 className="text-2xl font-bold text-white mb-2">Keep Practicing!</h2>
              </>
            )}

            <p className="text-slate-400 mb-4">
              Score: {Math.round(quizScore * 100)}%
            </p>

            {/* Stars display */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3].map(s => (
                <motion.div
                  key={s}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + s * 0.15, type: 'spring' }}
                >
                  <Star
                    size={32}
                    className={s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                  />
                </motion.div>
              ))}
            </div>

            {/* Results breakdown */}
            <div className="flex justify-center gap-6 text-sm">
              <div>
                <span className="text-green-400 font-bold">{quizResults?.filter(r => r.correct).length}</span>
                <span className="text-slate-400"> correct</span>
              </div>
              <div>
                <span className="text-red-400 font-bold">{quizResults?.filter(r => !r.correct).length}</span>
                <span className="text-slate-400"> wrong</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!passed && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('practice')
                  setQuizScore(null)
                  setQuizResults(null)
                }}
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white
                  cursor-pointer border-0 font-medium transition-colors"
              >
                Try Again
              </motion.button>
            )}

            {passed && lidx < allLessons.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/lesson/${uid}/${lidx + 1}`)}
                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white
                  cursor-pointer border-0 font-medium transition-colors flex items-center gap-2 justify-center"
              >
                Next Lesson <ChevronRight size={18} />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/unit/${uid}`)}
              className="px-6 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white
                cursor-pointer hover:bg-slate-600/50 font-medium transition-colors"
            >
              Back to Unit
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Vocabulary Sub-Phase ──────────────────────────────────

function VocabPhase({ vocabulary, onComplete, onBack }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [direction, setDirection] = useState(1)

  const item = vocabulary[index]
  const isLast = index === vocabulary.length - 1

  const handleFlip = () => {
    const willFlip = !flipped
    setFlipped(willFlip)
    if (willFlip && item.audio !== false) speak(item.korean)
  }

  const goNext = () => {
    if (isLast) {
      onComplete()
      return
    }
    setDirection(1)
    setFlipped(false)
    setIndex(i => i + 1)
  }

  const goPrev = () => {
    if (index === 0) {
      onBack()
      return
    }
    setDirection(-1)
    setFlipped(false)
    setIndex(i => i - 1)
  }

  return (
    <div>
      <div className="h-1.5 bg-slate-700 rounded-full mb-6 overflow-hidden">
        <motion.div
          animate={{ width: `${((index + 1) / vocabulary.length) * 100}%` }}
          className="h-full bg-amber-500 rounded-full"
        />
      </div>

      <div className="text-center mb-2">
        <span className="text-xs text-amber-400 font-medium">Vocabulary {index + 1}/{vocabulary.length}</span>
      </div>

      <div className="flex justify-center mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: direction * 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 200, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={handleFlip}
            className="w-72 sm:w-80 cursor-pointer"
          >
            <div className="bg-slate-800/80 border border-amber-500/20 rounded-2xl p-8 text-center min-h-[280px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {!flipped ? (
                  <motion.div key="front" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: -90 }} transition={{ duration: 0.2 }} className="flex flex-col items-center">
                    <span className="hangul text-5xl font-black text-white mb-4">{item.korean}</span>
                    <span className="text-slate-500 text-sm">Tap to reveal</span>
                  </motion.div>
                ) : (
                  <motion.div key="back" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} exit={{ rotateY: -90 }} transition={{ duration: 0.2 }} className="flex flex-col items-center gap-3">
                    <span className="hangul text-4xl font-bold text-white">{item.korean}</span>
                    <button onClick={(e) => { e.stopPropagation(); speak(item.korean) }}
                      className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-500 flex items-center justify-center cursor-pointer border-0 text-white transition-colors">
                      <Volume2 size={18} />
                    </button>
                    <div className="text-primary-400 font-medium">{item.roman}</div>
                    <div className="text-lg text-green-400 font-medium">{item.english}</div>
                    {item.example && (
                      <div className="text-sm bg-slate-700/50 px-4 py-3 rounded-xl w-full mt-2">
                        <button onClick={(e) => { e.stopPropagation(); speak(item.example.kr) }} className="hangul text-white cursor-pointer bg-transparent border-0 p-0 text-left hover:text-primary-400 transition-colors">
                          {item.example.kr}
                        </button>
                        <div className="text-slate-400 text-xs mt-1">{item.example.en}</div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goPrev}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white cursor-pointer hover:bg-slate-600/50 transition-colors">
          <ChevronLeft size={18} /> Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => speak(item.korean)}
          className="w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-500 flex items-center justify-center cursor-pointer border-0 text-white transition-colors">
          <Volume2 size={20} />
        </motion.button>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goNext}
          className={`flex items-center gap-1 px-4 py-2 rounded-xl cursor-pointer border-0 text-white font-medium transition-colors
            ${isLast ? 'bg-green-600 hover:bg-green-500' : 'bg-primary-600 hover:bg-primary-500'}`}>
          {isLast ? 'Start Practice' : 'Next'} <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}
