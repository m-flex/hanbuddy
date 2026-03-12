import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Target, CheckCircle, XCircle, Volume2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { STAGES } from '../data/korean'
import { recordAnswer } from '../store/progress'
import { speak, playCorrect, playWrong } from '../utils/audio'

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

function findItem(word) { for (const s of STAGES) { const f = s.items.find(i => i.word === word); if (f) return f } return null }

export default function WeakLetterDrill({ progress, updateProgress }) {
  const weakItems = useMemo(() => {
    const entries = Object.entries(progress.mastery).filter(([, m]) => m.seen > 0).map(([word, m]) => ({ word, ratio: m.correct / m.seen, ef: m.easinessFactor || 2.5 }))
    entries.sort((a, b) => a.ratio - b.ratio || a.ef - b.ef)
    return entries.slice(0, 10).map(e => ({ ...e, item: findItem(e.word) })).filter(e => e.item)
  }, [])

  const allItems = useMemo(() => STAGES.flatMap(s => s.items), [])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  if (weakItems.length === 0) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
      <Target size={48} className="text-slate-400 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">No Weak Areas Yet</h1>
      <p className="text-slate-400 mb-8">Complete some quizzes first to identify areas to improve.</p>
      <Link to="/stages"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">Back to Learning</motion.button></Link>
    </motion.div>
  )

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h1 className="text-2xl font-bold text-white mb-2">Drill Complete!</h1>
      <p className="text-slate-400 mb-8">{correct}/{weakItems.length} correct</p>
      <Link to="/stages"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">Done</motion.button></Link>
    </motion.div>
  )

  const current = weakItems[index]
  const item = current.item
  const wrongs = shuffle(allItems.filter(i => i.meaning !== item.meaning)).slice(0, 3).map(i => i.meaning)
  const options = useMemo(() => shuffle([item.meaning, ...wrongs]), [index])

  function handleSelect(opt) {
    if (selected !== null) return
    setSelected(opt)
    const isCorrect = opt === item.meaning
    if (isCorrect) { setCorrect(c => c + 1); playCorrect(); confetti({ particleCount: 20, spread: 30, origin: { y: 0.7 } }) }
    else playWrong()
    speak(item.word)
    updateProgress(prev => recordAnswer({ ...prev }, item.word, isCorrect))
    setTimeout(() => { if (index + 1 >= weakItems.length) setDone(true); else { setIndex(i => i + 1); setSelected(null) } }, 1200)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/stages" className="flex items-center gap-1 text-slate-400 hover:text-white text-sm no-underline"><ArrowLeft size={16} /> Back</Link>
        <span className="text-sm text-slate-400">{index + 1}/{weakItems.length}</span>
      </div>
      <div className="text-center mb-2"><span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
        <Target size={10} /> Weak Area — {Math.round(current.ratio * 100)}% accuracy</span></div>
      <div className="text-center mb-8">
        <div className="hangul text-5xl font-black text-white mb-3">{item.word}</div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => speak(item.word)}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs cursor-pointer"><Volume2 size={12} /> Listen</motion.button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt, i) => {
          let style = 'bg-slate-800/80 border-slate-600/50 text-white hover:border-primary-400/50'
          if (selected && opt === item.meaning) style = 'bg-green-500/20 border-green-500/50 text-green-400'
          else if (selected === opt) style = 'bg-red-500/20 border-red-500/50 text-red-400'
          return (
            <motion.button key={opt + i} onClick={() => handleSelect(opt)} disabled={selected !== null}
              className={`p-4 rounded-xl border font-semibold cursor-pointer transition-all ${style} disabled:cursor-default text-sm`}>
              <div className="flex items-center justify-center gap-2">
                {selected && opt === item.meaning && <CheckCircle size={18} />}
                {selected === opt && opt !== item.meaning && <XCircle size={18} />}
                {opt}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
