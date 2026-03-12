import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, RotateCcw, Volume2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { SENTENCES } from '../data/korean'
import { speak, playCorrect, playWrong } from '../utils/audio'

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }

export default function SentencePractice({ progress, updateProgress }) {
  const sentences = useMemo(() => shuffle([...SENTENCES]), [])
  const [index, setIndex] = useState(0)
  const [placed, setPlaced] = useState([])
  const [available, setAvailable] = useState(() => shuffle([...sentences[0].korean]))
  const [done, setDone] = useState(false)
  const [result, setResult] = useState(null) // 'correct' | 'wrong'
  const [score, setScore] = useState(0)

  const sentence = sentences[index]
  const fullKorean = sentence.korean.join('')

  function selectTile(word, i) {
    if (result) return
    setPlaced(p => [...p, word])
    setAvailable(a => a.filter((_, idx) => idx !== i))
  }

  function removeTile(i) {
    if (result) return
    const word = placed[i]
    setPlaced(p => p.filter((_, idx) => idx !== i))
    setAvailable(a => [...a, word])
  }

  function checkAnswer() {
    const answer = placed.join('')
    const correct = answer === fullKorean
    setResult(correct ? 'correct' : 'wrong')
    if (correct) {
      setScore(s => s + 1)
      playCorrect()
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 } })
      updateProgress(prev => ({ ...prev, sentencesBuilt: (prev.sentencesBuilt || 0) + 1 }))
    } else {
      playWrong()
    }
    speak(fullKorean)
  }

  function next() {
    if (index + 1 >= sentences.length) { setDone(true); return }
    const nextSentence = sentences[index + 1]
    setIndex(i => i + 1)
    setPlaced([])
    setAvailable(shuffle([...nextSentence.korean]))
    setResult(null)
  }

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">💬</div>
      <h1 className="text-2xl font-bold text-white mb-2">Practice Complete!</h1>
      <p className="text-slate-400 mb-8">{score}/{sentences.length} sentences correct</p>
      <Link to="/stages"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">Done</motion.button></Link>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/stages" className="flex items-center gap-1 text-slate-400 hover:text-white text-sm no-underline"><ArrowLeft size={16} /> Back</Link>
        <span className="text-sm text-slate-400">{index + 1}/{sentences.length}</span>
      </div>

      <div className="h-1.5 bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div animate={{ width: `${((index + 1) / sentences.length) * 100}%` }} className="h-full bg-purple-500 rounded-full" />
      </div>

      <div className="text-center mb-6">
        <div className="text-sm text-slate-400 mb-2">Arrange the tiles to say:</div>
        <div className="text-xl font-bold text-white mb-1">{sentence.english}</div>
        {sentence.hint && <div className="text-xs text-slate-500">{sentence.hint}</div>}
      </div>

      {/* Placed tiles */}
      <div className="min-h-[60px] bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 mb-4 flex flex-wrap gap-2">
        {placed.length === 0 && <span className="text-slate-600 text-sm">Tap tiles below to build the sentence</span>}
        {placed.map((word, i) => (
          <motion.button key={`p-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={() => removeTile(i)}
            className={`hangul px-3 py-2 rounded-lg font-medium text-sm cursor-pointer border-0 transition-colors
              ${result === 'correct' ? 'bg-green-500/20 text-green-400' : result === 'wrong' ? 'bg-red-500/20 text-red-400' : 'bg-primary-600/30 text-primary-300 hover:bg-primary-600/50'}`}>{word}</motion.button>
        ))}
      </div>

      {/* Available tiles */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {available.map((word, i) => (
          <motion.button key={`a-${i}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => selectTile(word, i)}
            className="hangul px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-600/50 text-white font-medium text-sm cursor-pointer hover:border-primary-400/50 transition-colors">{word}</motion.button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!result && placed.length === sentence.korean.length && (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={checkAnswer}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">
            <CheckCircle size={16} /> Check
          </motion.button>
        )}
        {result && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={next}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white border-0 cursor-pointer font-medium">
            Next →
          </motion.button>
        )}
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
          <div className={`text-lg font-bold ${result === 'correct' ? 'text-green-400' : 'text-red-400'}`}>{result === 'correct' ? 'Correct!' : 'Not quite!'}</div>
          <div className="hangul text-white mt-1">{fullKorean}</div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => speak(fullKorean)}
            className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-400 text-xs cursor-pointer"><Volume2 size={12} /> Listen</motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
