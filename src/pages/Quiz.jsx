import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, Flame, RotateCcw, Volume2, Ear, Eye, Clock } from 'lucide-react'
import confetti from 'canvas-confetti'
import { STAGES, getLessons, getPreviousItems } from '../data/korean'
import { recordAnswer, unlockNextStage } from '../store/progress'
import { speak, playCorrect, playWrong } from '../utils/audio'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const Q_TYPES = ['korean_to_english', 'english_to_korean', 'listen_to_korean']

function makeQuestion(item, allItems, type) {
  const word = item.word
  const meaning = item.meaning

  if (type === 'korean_to_english') {
    const wrongs = shuffle(allItems.filter(l => l.meaning !== meaning)).slice(0, 3).map(l => l.meaning)
    return {
      type, item, word, correct: meaning,
      options: shuffle([meaning, ...wrongs]),
      prompt: word, hint: item.hint,
      isRetry: false,
    }
  }
  if (type === 'english_to_korean') {
    const wrongs = shuffle(allItems.filter(l => l.word !== word)).slice(0, 3).map(l => l.word)
    return {
      type, item, word, correct: word,
      options: shuffle([word, ...wrongs]),
      prompt: meaning, hint: item.hint,
      isRetry: false,
    }
  }
  // listen_to_korean
  const wrongs = shuffle(allItems.filter(l => l.word !== word)).slice(0, 3).map(l => l.word)
  return {
    type, item, word, correct: word,
    options: shuffle([word, ...wrongs]),
    prompt: null, hint: null,
    isRetry: false,
  }
}

function generateQuestions(lessonItems, allItems, previousItems) {
  const questions = []
  const lessonPool = shuffle(lessonItems)

  lessonPool.forEach((item, i) => {
    const type1 = Q_TYPES[i % Q_TYPES.length]
    const type2 = Q_TYPES[(i + 1) % Q_TYPES.length]
    questions.push(makeQuestion(item, allItems, type1))
    questions.push(makeQuestion(item, allItems, type2))
  })

  if (previousItems.length > 0) {
    const reviewPool = shuffle(previousItems).slice(0, 2)
    reviewPool.forEach((item, i) => {
      const type = Q_TYPES[i % Q_TYPES.length]
      const q = makeQuestion(item, allItems, type)
      q.isReview = true
      questions.push(q)
    })
  }

  return shuffle(questions)
}

const typeLabels = {
  korean_to_english: { icon: Eye, text: 'What does this mean?', color: 'text-primary-400' },
  english_to_korean: { icon: Eye, text: 'Which is the Korean for:', color: 'text-purple-400' },
  listen_to_korean: { icon: Ear, text: 'Listen and pick the word:', color: 'text-green-400' },
}

export default function Quiz({ progress, updateProgress }) {
  const { stageId, lessonIdx } = useParams()
  const stage = STAGES.find(s => s.id === Number(stageId))
  const lessons = getLessons(stage)
  const lesson = lessons?.[Number(lessonIdx)]
  const previousItems = useMemo(() => getPreviousItems(stage, Number(lessonIdx)), [stage, lessonIdx])

  const [questions, setQuestions] = useState(() =>
    generateQuestions(lesson?.items || [], stage?.items || [], previousItems)
  )
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [done, setDone] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const startTime = useRef(Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!stage || !lesson) return <div className="text-center py-20 text-slate-400">Quiz not found</div>

  const q = questions[qIndex]
  const totalQ = questions.length
  const tl = typeLabels[q.type]
  const TypeIcon = tl.icon
  const isHangulOptions = q.type !== 'korean_to_english'

  useEffect(() => {
    if (q.type === 'listen_to_korean') {
      speak(q.word)
    }
  }, [qIndex, q.type, q.word])

  const handleSelect = (option) => {
    if (selected !== null) return
    setSelected(option)
    setShowResult(true)
    const isCorrect = option === q.correct

    if (isCorrect) {
      setCorrectCount(c => c + 1)
      setStreak(s => s + 1)
      playCorrect()
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 }, colors: ['#22c55e', '#4ade80'] })
    } else {
      setStreak(0)
      playWrong()

      if (!q.isRetry) {
        setQuestions(prev => {
          const copy = [...prev]
          const retryType = Q_TYPES[Math.floor(Math.random() * Q_TYPES.length)]
          const retry = makeQuestion(q.item, stage.items, retryType)
          retry.isRetry = true
          const insertAt = Math.min(qIndex + 2 + Math.floor(Math.random() * 3), copy.length)
          copy.splice(insertAt, 0, retry)
          return copy
        })
      }
    }

    setTimeout(() => speak(q.word), 300)
    updateProgress(prev => recordAnswer({ ...prev }, q.word, isCorrect))

    setTimeout(() => {
      if (qIndex + 1 >= questions.length) {
        setDone(true)
        const finalCorrect = correctCount + (isCorrect ? 1 : 0)
        const score = Math.round((finalCorrect / questions.length) * 100)
        if (score >= 70) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } })
          updateProgress(prev => {
            const next = { ...prev }
            const key = `${stage.id}-${lessonIdx}`
            next.lessonProgress = { ...next.lessonProgress }
            next.lessonProgress[key] = Math.max(next.lessonProgress[key] || 0, score)
            next.lessonMilestones = { ...next.lessonMilestones }
            const existing = next.lessonMilestones[key] || {}
            next.lessonMilestones[key] = { ...existing, quizScore: Math.max(existing.quizScore || 0, score) }
            const allLessons = getLessons(stage)
            const totalPct = allLessons.reduce((sum, _, i) => sum + (next.lessonProgress[`${stage.id}-${i}`] || 0), 0)
            next.stageProgress = { ...next.stageProgress }
            next.stageProgress[stage.id] = Math.round(totalPct / allLessons.length)
            const allDone = allLessons.every((_, i) => (next.lessonProgress[`${stage.id}-${i}`] || 0) >= 70)
            if (allDone) return unlockNextStage(next, stage.id)
            return next
          })
        }
      } else {
        setQIndex(i => i + 1)
        setSelected(null)
        setShowResult(false)
      }
    }, 1500)
  }

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  const restart = () => {
    setQuestions(generateQuestions(lesson.items, stage.items, previousItems))
    setQIndex(0)
    setSelected(null)
    setCorrectCount(0)
    setStreak(0)
    setDone(false)
    setShowResult(false)
    startTime.current = Date.now()
  }

  if (done) {
    const score = Math.round((correctCount / totalQ) * 100)
    const passed = score >= 70
    const lessonNum = Number(lessonIdx)
    const hasNextLesson = lessonNum + 1 < lessons.length

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto px-4 py-16 text-center"
      >
        <div className="text-6xl mb-4">{passed ? '🎉' : '💪'}</div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {passed ? 'Great Job!' : 'Keep Practicing!'}
        </h1>
        <div className="text-5xl font-black mb-2" style={{ color: passed ? '#22c55e' : '#f59e0b' }}>
          {score}%
        </div>
        <p className="text-slate-400 mb-1">
          {correctCount} out of {totalQ} correct — {lesson.title}
        </p>
        {passed && hasNextLesson && (
          <p className="text-green-400 text-sm mb-2">Next lesson unlocked!</p>
        )}
        <p className="text-slate-500 text-sm mb-8">
          Completed in {formatTime(elapsed)}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={restart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl
              bg-slate-700 hover:bg-slate-600 text-white border-0 cursor-pointer font-medium"
          >
            <RotateCcw size={16} /> Try Again
          </motion.button>
          <Link to="/stages">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium w-full"
            >
              {passed ? 'Continue →' : 'Back to Stages'}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-xl mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <Link to="/stages" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors no-underline text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="flex items-center gap-1 text-orange-400 text-sm font-bold"
            >
              <Flame size={16} />{streak}
            </motion.div>
          )}
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock size={10} />{formatTime(elapsed)}
          </span>
          <span className="text-sm text-slate-400">{qIndex + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="text-center mb-2">
        <span className="text-xs text-slate-500">{stage.title} · {lesson.title}</span>
      </div>

      {q.isRetry && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <RotateCcw size={10} /> Retry — you missed this one earlier
          </span>
        </motion.div>
      )}
      {q.isReview && !q.isRetry && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
            Review from previous lesson
          </span>
        </motion.div>
      )}

      <div className="h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div
          animate={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-primary-500 rounded-full"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-1.5 text-xs font-medium mb-3 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 ${tl.color}`}>
              <TypeIcon size={12} />
              {q.type === 'korean_to_english' && 'Translate'}
              {q.type === 'english_to_korean' && 'Recognize'}
              {q.type === 'listen_to_korean' && 'Listen'}
            </div>

            <div className="text-sm text-slate-400 mb-2">{tl.text}</div>

            {q.type === 'korean_to_english' && (
              <div className="hangul text-5xl sm:text-6xl font-black text-white mb-3">{q.prompt}</div>
            )}
            {q.type === 'english_to_korean' && (
              <div className="text-3xl sm:text-4xl font-black text-purple-400 mb-3">{q.prompt}</div>
            )}
            {q.type === 'listen_to_korean' && (
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => speak(q.word)}
                className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500/40
                  flex items-center justify-center cursor-pointer text-green-400 mx-auto mb-3
                  hover:bg-green-600/30 transition-colors"
              >
                <Volume2 size={32} />
              </motion.button>
            )}

            {q.type !== 'listen_to_korean' && (
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => speak(q.word)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                  bg-primary-600/20 border border-primary-500/30 text-primary-400
                  text-sm font-medium cursor-pointer hover:bg-primary-600/30 transition-colors mb-2"
              >
                <Volume2 size={16} /> Listen
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {q.options.map((option, i) => {
              let style = 'bg-slate-800/80 border-slate-600/50 text-white hover:border-primary-400/50'
              if (showResult && option === q.correct)
                style = 'bg-green-500/20 border-green-500/50 text-green-400'
              else if (showResult && option === selected && option !== q.correct)
                style = 'bg-red-500/20 border-red-500/50 text-red-400'

              return (
                <motion.button
                  key={option + i}
                  whileHover={selected === null ? { scale: 1.03 } : {}}
                  whileTap={selected === null ? { scale: 0.97 } : {}}
                  onClick={() => handleSelect(option)}
                  disabled={selected !== null}
                  className={`p-4 rounded-xl border font-semibold cursor-pointer
                    transition-all ${style} disabled:cursor-default
                    ${isHangulOptions ? 'hangul text-lg' : 'text-sm'}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {showResult && option === q.correct && <CheckCircle size={18} />}
                    {showResult && option === selected && option !== q.correct && <XCircle size={18} />}
                    {option}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <div className="text-sm text-slate-400">
                <span className="hangul text-lg text-white">{q.word}</span>
                {' = '}
                <span className="text-primary-400 font-medium">{q.item.meaning}</span>
              </div>
              {q.item.hint && (
                <div className="text-xs text-slate-500 mt-1 bg-slate-800/50 inline-block px-3 py-1 rounded-lg">
                  {q.item.hint}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
