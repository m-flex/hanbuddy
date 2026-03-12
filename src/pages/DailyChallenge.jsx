import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, CheckCircle, XCircle, Volume2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { STAGES } from '../data/korean'
import { recordAnswer, addXp } from '../store/progress'
import { speak, playCorrect, playWrong } from '../utils/audio'

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
function seededRandom(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646 } }

export default function DailyChallenge({ progress, updateProgress }) {
  const today = new Date().toISOString().slice(0, 10)
  const alreadyDone = progress.dailyChallengeDate === today
  const allItems = useMemo(() => STAGES.flatMap(s => s.items), [])

  const questions = useMemo(() => {
    const seed = today.split('-').reduce((a, b) => a * 31 + Number(b), 0)
    const rng = seededRandom(seed)
    const sorted = [...allItems].sort(() => rng() - 0.5)
    return sorted.slice(0, 5).map(item => {
      const wrongs = allItems.filter(i => i.meaning !== item.meaning).sort(() => rng() - 0.5).slice(0, 3).map(i => i.meaning)
      return { item, options: [item.meaning, ...wrongs].sort(() => rng() - 0.5) }
    })
  }, [today])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(alreadyDone)

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">{alreadyDone ? '✅' : '🌟'}</div>
      <h1 className="text-2xl font-bold text-white mb-2">{alreadyDone ? 'Already Completed!' : 'Daily Challenge Done!'}</h1>
      {!alreadyDone && <p className="text-slate-400 mb-2">{correct}/{questions.length} correct · +{correct * 5} XP</p>}
      <p className="text-slate-500 text-sm mb-8">{alreadyDone ? 'Come back tomorrow for a new challenge.' : 'Come back tomorrow!'}</p>
      <Link to="/stages"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">Back</motion.button></Link>
    </motion.div>
  )

  const q = questions[index]

  function handleSelect(opt) {
    if (selected !== null) return
    setSelected(opt)
    const isCorrect = opt === q.item.meaning
    if (isCorrect) { setCorrect(c => c + 1); playCorrect(); confetti({ particleCount: 20, spread: 30, origin: { y: 0.7 } }) }
    else playWrong()
    speak(q.item.word)
    updateProgress(prev => recordAnswer({ ...prev }, q.item.word, isCorrect))
    setTimeout(() => {
      if (index + 1 >= questions.length) {
        setDone(true)
        updateProgress(prev => { const next = addXp({ ...prev }, (correct + (isCorrect ? 1 : 0)) * 5); next.dailyChallengeDate = today; return next })
      } else { setIndex(i => i + 1); setSelected(null) }
    }, 1200)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/stages" className="flex items-center gap-1 text-slate-400 hover:text-white text-sm no-underline"><ArrowLeft size={16} /> Back</Link>
        <div className="flex items-center gap-2"><Calendar size={14} className="text-amber-400" /><span className="text-sm text-amber-400 font-medium">Daily Challenge</span></div>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div animate={{ width: `${((index + 1) / questions.length) * 100}%` }} className="h-full bg-amber-500 rounded-full" />
      </div>
      <div className="text-center mb-8">
        <div className="text-sm text-slate-400 mb-2">What does this mean?</div>
        <div className="hangul text-5xl font-black text-white mb-3">{q.item.word}</div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => speak(q.item.word)}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs cursor-pointer"><Volume2 size={12} /> Listen</motion.button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          let style = 'bg-slate-800/80 border-slate-600/50 text-white hover:border-primary-400/50'
          if (selected && opt === q.item.meaning) style = 'bg-green-500/20 border-green-500/50 text-green-400'
          else if (selected === opt) style = 'bg-red-500/20 border-red-500/50 text-red-400'
          return (
            <motion.button key={opt + i} onClick={() => handleSelect(opt)} disabled={selected !== null}
              className={`p-4 rounded-xl border font-semibold cursor-pointer transition-all ${style} disabled:cursor-default text-sm`}>
              <div className="flex items-center justify-center gap-2">
                {selected && opt === q.item.meaning && <CheckCircle size={18} />}
                {selected === opt && opt !== q.item.meaning && <XCircle size={18} />}
                {opt}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
