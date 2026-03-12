import { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Volume2, Check, X, RefreshCw } from 'lucide-react'
import { getNextReviewItems, recordAnswer } from '../store/progress'
import { speak } from '../utils/audio'

export default function Review({ progress, updateProgress }) {
  const navigate = useNavigate()
  const reviewItems = useMemo(() => getNextReviewItems(progress.mastery, 15), [progress.mastery])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)

  const item = reviewItems[currentIndex]

  const handleGrade = useCallback((correct) => {
    if (!item) return
    setResults(r => [...r, { word: item.word, correct }])
    updateProgress(prev => {
      const next = recordAnswer({ ...prev }, item.word, correct)
      next.totalReviews = (next.totalReviews || 0) + 1
      return next
    })
    if (currentIndex < reviewItems.length - 1) {
      setFlipped(false)
      setCurrentIndex(i => i + 1)
    } else setDone(true)
  }, [item, currentIndex, reviewItems.length, updateProgress])

  if (reviewItems.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">✨</div>
        <h2 className="text-2xl font-bold text-white mb-2">All caught up!</h2>
        <p className="text-slate-400 mb-6">No items due for review.</p>
        <Link to="/" className="text-primary-400 no-underline">← Dashboard</Link>
      </motion.div>
    )
  }

  if (done) {
    const correctCount = results.filter(r => r.correct).length
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="text-5xl mb-4">🧠</div>
        <h2 className="text-2xl font-bold text-white mb-2">Review Complete!</h2>
        <p className="text-slate-400 mb-4">{correctCount}/{results.length} correct</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate(0)} className="px-6 py-3 rounded-xl bg-primary-600 text-white cursor-pointer border-0 font-medium flex items-center gap-2">
            <RefreshCw size={16} /> More
          </button>
          <Link to="/"><button className="px-6 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white cursor-pointer font-medium">Dashboard</button></Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-white no-underline text-sm"><ArrowLeft size={16} /> Back</Link>
        <span className="text-sm text-slate-400">Review {currentIndex + 1}/{reviewItems.length}</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div animate={{ width: `${((currentIndex + 1) / reviewItems.length) * 100}%` }} className="h-full bg-amber-500 rounded-full" />
      </div>
      <div className="flex justify-center mb-8">
        <motion.div key={currentIndex} initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          onClick={() => { setFlipped(true); speak(item.word) }} className="w-72 sm:w-80 cursor-pointer">
          <div className="bg-slate-800/80 border border-amber-500/20 rounded-2xl p-8 text-center min-h-[250px] flex flex-col items-center justify-center">
            <span className="hangul text-5xl font-black text-white mb-4">{item.word}</span>
            {!flipped && <span className="text-slate-500 text-sm">Tap to reveal</span>}
            {flipped && (
              <button onClick={(e) => { e.stopPropagation(); speak(item.word) }}
                className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center cursor-pointer border-0 text-white mt-2">
                <Volume2 size={18} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
      {flipped && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center gap-4">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleGrade(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 cursor-pointer font-medium">
            <X size={18} /> Forgot
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleGrade(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 cursor-pointer font-medium">
            <Check size={18} /> Knew it
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
