import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw, Eye } from 'lucide-react'
import confetti from 'canvas-confetti'
import { STAGES } from '../data/korean'
import { getNextReviewItems, recordAnswer } from '../store/progress'
import { speak, playCorrect, playWrong } from '../utils/audio'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function findItemByWord(word) {
  for (const stage of STAGES) {
    const found = stage.items.find(i => i.word === word)
    if (found) return found
  }
  return null
}

function getAllItems() {
  return STAGES.flatMap(s => s.items)
}

export default function Review({ progress, updateProgress }) {
  const reviewItems = useMemo(() => {
    const due = getNextReviewItems(progress.mastery, 10)
    return due.map(d => ({ ...d, item: findItemByWord(d.word) })).filter(d => d.item)
  }, [])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  if (reviewItems.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-white mb-2">All Caught Up!</h1>
        <p className="text-slate-400 mb-8">No items due for review right now. Keep learning!</p>
        <Link to="/stages">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">
            Back to Learning
          </motion.button>
        </Link>
      </motion.div>
    )
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">💪</div>
        <h1 className="text-2xl font-bold text-white mb-2">Review Complete!</h1>
        <p className="text-slate-400 mb-8">{correctCount}/{reviewItems.length} correct</p>
        <Link to="/stages">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">
            Continue
          </motion.button>
        </Link>
      </motion.div>
    )
  }

  const current = reviewItems[index]
  const item = current.item
  const allItems = getAllItems()
  const wrongs = shuffle(allItems.filter(i => i.meaning !== item.meaning)).slice(0, 3).map(i => i.meaning)
  const options = useMemo(() => shuffle([item.meaning, ...wrongs]), [index])

  const handleSelect = (option) => {
    if (selected !== null) return
    setSelected(option)
    setShowResult(true)
    const isCorrect = option === item.meaning

    if (isCorrect) {
      setCorrectCount(c => c + 1)
      playCorrect()
      confetti({ particleCount: 20, spread: 30, origin: { y: 0.7 } })
    } else {
      playWrong()
    }

    speak(item.word)
    updateProgress(prev => recordAnswer({ ...prev }, item.word, isCorrect))

    setTimeout(() => {
      if (index + 1 >= reviewItems.length) {
        setDone(true)
      } else {
        setIndex(i => i + 1)
        setSelected(null)
        setShowResult(false)
      }
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/stages" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors no-underline text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <span className="text-sm text-slate-400">Review {index + 1}/{reviewItems.length}</span>
      </div>

      <div className="h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div animate={{ width: `${((index + 1) / reviewItems.length) * 100}%` }}
          className="h-full bg-amber-500 rounded-full" />
      </div>

      <div className="text-center mb-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <RotateCcw size={10} /> Spaced Repetition Review
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium mb-3 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-primary-400">
              <Eye size={12} /> What does this mean?
            </div>
            <div className="hangul text-5xl sm:text-6xl font-black text-white mb-3">{item.word}</div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => speak(item.word)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-sm font-medium cursor-pointer hover:bg-primary-600/30 transition-colors">
              <Volume2 size={16} /> Listen
            </motion.button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((option, i) => {
              let style = 'bg-slate-800/80 border-slate-600/50 text-white hover:border-primary-400/50'
              if (showResult && option === item.meaning)
                style = 'bg-green-500/20 border-green-500/50 text-green-400'
              else if (showResult && option === selected && option !== item.meaning)
                style = 'bg-red-500/20 border-red-500/50 text-red-400'

              return (
                <motion.button key={option + i}
                  whileHover={selected === null ? { scale: 1.03 } : {}}
                  whileTap={selected === null ? { scale: 0.97 } : {}}
                  onClick={() => handleSelect(option)}
                  disabled={selected !== null}
                  className={`p-4 rounded-xl border font-semibold cursor-pointer transition-all ${style} disabled:cursor-default text-sm`}>
                  <div className="flex items-center justify-center gap-2">
                    {showResult && option === item.meaning && <CheckCircle size={18} />}
                    {showResult && option === selected && option !== item.meaning && <XCircle size={18} />}
                    {option}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
              <div className="text-sm text-slate-400">
                <span className="hangul text-lg text-white">{item.word}</span>
                {' = '}
                <span className="text-primary-400 font-medium">{item.meaning}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
