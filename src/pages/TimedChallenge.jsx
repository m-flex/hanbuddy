import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Zap, Trophy, RotateCcw, Volume2 } from 'lucide-react'
import { STAGES } from '../data/korean'
import { recordAnswer, updateTimedBest, addXp } from '../store/progress'
import { speak, playCorrect, playWrong } from '../utils/audio'

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

function getAllLearnedItems(progress) {
  const learned = new Set(Object.keys(progress.mastery))
  if (learned.size < 4) return STAGES[0].items
  return STAGES.flatMap(s => s.items).filter(i => learned.has(i.word))
}

export default function TimedChallenge({ progress, updateProgress }) {
  const items = useMemo(() => getAllLearnedItems(progress), [])
  const [phase, setPhase] = useState('ready') // ready | playing | done
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [question, setQuestion] = useState(null)
  const [selected, setSelected] = useState(null)
  const timerRef = useRef(null)

  function makeQ() {
    const item = items[Math.floor(Math.random() * items.length)]
    const wrongs = shuffle(items.filter(i => i.meaning !== item.meaning)).slice(0, 3).map(i => i.meaning)
    return { item, options: shuffle([item.meaning, ...wrongs]) }
  }

  function start() {
    setPhase('playing'); setScore(0); setStreak(0); setTimeLeft(30); setSelected(null)
    setQuestion(makeQ())
    timerRef.current = setInterval(() => setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); setPhase('done'); return 0 } return t - 1 }), 1000)
  }

  useEffect(() => () => clearInterval(timerRef.current), [])

  useEffect(() => {
    if (phase === 'done') {
      updateProgress(prev => {
        const next = { ...prev }
        updateTimedBest(next, 'blitz30', score)
        return addXp(next, Math.floor(score * 2))
      })
    }
  }, [phase])

  function handleSelect(option) {
    if (selected !== null) return
    setSelected(option)
    const correct = option === question.item.meaning
    if (correct) { setScore(s => s + 1 + Math.floor(streak * 0.5)); setStreak(s => s + 1); playCorrect() }
    else { setStreak(0); playWrong() }
    updateProgress(prev => recordAnswer({ ...prev }, question.item.word, correct))
    setTimeout(() => { setSelected(null); setQuestion(makeQ()) }, 600)
  }

  const best = progress.timedBests?.blitz30?.score || 0

  if (phase === 'ready') return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto px-4 py-16 text-center">
      <Zap size={48} className="text-orange-400 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-white mb-2">Timed Challenge</h1>
      <p className="text-slate-400 mb-2">30 seconds. How many can you get?</p>
      {best > 0 && <p className="text-accent-400 text-sm mb-6">Personal best: {best}</p>}
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={start}
        className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg border-0 cursor-pointer">Start!</motion.button>
      <div className="mt-6"><Link to="/stages" className="text-slate-400 hover:text-white text-sm"><ArrowLeft size={14} className="inline" /> Back</Link></div>
    </motion.div>
  )

  if (phase === 'done') return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">⚡</div>
      <h1 className="text-3xl font-bold text-white mb-2">Time's Up!</h1>
      <div className="text-5xl font-black text-orange-400 mb-2">{score}</div>
      <p className="text-slate-400 mb-1">points scored</p>
      {score > best && score > 0 && <p className="text-accent-400 font-bold mb-4">New personal best!</p>}
      <div className="flex gap-3 justify-center mt-6">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={start}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white border-0 cursor-pointer font-medium"><RotateCcw size={16} /> Again</motion.button>
        <Link to="/stages"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white border-0 cursor-pointer font-medium">Done</motion.button></Link>
      </div>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className={`text-2xl font-black ${timeLeft <= 5 ? 'text-danger-400' : 'text-white'}`}>{timeLeft}s</span>
          {streak >= 3 && <span className="text-orange-400 font-bold text-sm">🔥 {streak}</span>}
        </div>
        <div className="flex items-center gap-2"><Trophy size={16} className="text-accent-400" /><span className="text-xl font-bold text-white">{score}</span></div>
      </div>

      {question && (
        <div>
          <div className="text-center mb-6">
            <div className="hangul text-5xl font-black text-white mb-2">{question.item.word}</div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => speak(question.item.word)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs cursor-pointer"><Volume2 size={12} /> Listen</motion.button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((opt, i) => {
              let style = 'bg-slate-800/80 border-slate-600/50 text-white hover:border-primary-400/50'
              if (selected === opt && opt === question.item.meaning) style = 'bg-green-500/20 border-green-500/50 text-green-400'
              else if (selected === opt) style = 'bg-red-500/20 border-red-500/50 text-red-400'
              return (
                <motion.button key={opt + i} whileHover={!selected ? { scale: 1.03 } : {}} whileTap={!selected ? { scale: 0.97 } : {}}
                  onClick={() => handleSelect(opt)} disabled={selected !== null}
                  className={`p-4 rounded-xl border font-medium cursor-pointer transition-all ${style} disabled:cursor-default text-sm`}>{opt}</motion.button>
              )
            })}
          </div>
        </div>
      )}
    </motion.div>
  )
}
