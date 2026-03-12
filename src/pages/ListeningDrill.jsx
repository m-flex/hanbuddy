import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Volume2, CheckCircle, XCircle } from 'lucide-react'
import confetti from 'canvas-confetti'
import { STAGES } from '../data/korean'
import { recordAnswer } from '../store/progress'
import { speak, playCorrect, playWrong } from '../utils/audio'

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

function getPool(progress) {
  const learned = new Set(Object.keys(progress.mastery))
  if (learned.size < 4) return STAGES[0].items
  return STAGES.flatMap(s => s.items).filter(i => learned.has(i.word))
}

export default function ListeningDrill({ progress, updateProgress }) {
  const pool = useMemo(() => getPool(progress), [])
  const [questions] = useState(() => {
    const qs = []
    const items = shuffle(pool).slice(0, 10)
    items.forEach(item => {
      const wrongs = shuffle(pool.filter(i => i.word !== item.word)).slice(0, 3).map(i => i.word)
      qs.push({ item, options: shuffle([item.word, ...wrongs]) })
    })
    return qs
  })
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">👂</div>
      <h1 className="text-2xl font-bold text-white mb-2">Listening Complete!</h1>
      <p className="text-slate-400 mb-8">{correctCount}/{questions.length} correct</p>
      <Link to="/stages"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">Done</motion.button></Link>
    </motion.div>
  )

  const q = questions[index]

  function handleSelect(opt) {
    if (selected !== null) return
    setSelected(opt)
    const correct = opt === q.item.word
    if (correct) { setCorrectCount(c => c + 1); playCorrect(); confetti({ particleCount: 20, spread: 30, origin: { y: 0.7 } }) }
    else playWrong()
    updateProgress(prev => recordAnswer({ ...prev }, q.item.word, correct))
    setTimeout(() => { if (index + 1 >= questions.length) setDone(true); else { setIndex(i => i + 1); setSelected(null) } }, 1200)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/stages" className="flex items-center gap-1 text-slate-400 hover:text-white text-sm no-underline"><ArrowLeft size={16} /> Back</Link>
        <span className="text-sm text-slate-400">{index + 1}/{questions.length}</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div animate={{ width: `${((index + 1) / questions.length) * 100}%` }} className="h-full bg-green-500 rounded-full" />
      </div>
      <div className="text-center mb-8">
        <div className="text-sm text-slate-400 mb-4">Listen and pick the correct word:</div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => speak(q.item.word)}
          className="w-24 h-24 rounded-full bg-green-600/20 border-2 border-green-500/40 flex items-center justify-center cursor-pointer text-green-400 mx-auto hover:bg-green-600/30 transition-colors">
          <Volume2 size={40} />
        </motion.button>
        <div className="text-xs text-slate-500 mt-2">{q.item.meaning}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          let style = 'bg-slate-800/80 border-slate-600/50 text-white hover:border-primary-400/50'
          if (selected && opt === q.item.word) style = 'bg-green-500/20 border-green-500/50 text-green-400'
          else if (selected === opt) style = 'bg-red-500/20 border-red-500/50 text-red-400'
          return (
            <motion.button key={opt + i} whileHover={!selected ? { scale: 1.03 } : {}} onClick={() => handleSelect(opt)} disabled={selected !== null}
              className={`hangul p-4 rounded-xl border font-semibold text-lg cursor-pointer transition-all ${style} disabled:cursor-default`}>
              <div className="flex items-center justify-center gap-2">
                {selected && opt === q.item.word && <CheckCircle size={18} />}
                {selected === opt && opt !== q.item.word && <XCircle size={18} />}
                {opt}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
