import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, X, RotateCcw } from 'lucide-react'

export default function SentenceBuilder({ exercise, onAnswer }) {
  const [placed, setPlaced] = useState([])
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const shuffledTiles = useMemo(() => {
    const tiles = [...exercise.tiles]
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }
    return tiles
  }, [exercise.tiles])

  const available = shuffledTiles.filter(t => !placed.includes(t))

  const handleTileClick = (tile) => {
    if (answered) return
    const newPlaced = [...placed, tile]
    setPlaced(newPlaced)

    if (newPlaced.length === exercise.tiles.length) {
      const correct = newPlaced.every((t, i) => t === exercise.correct[i])
      setIsCorrect(correct)
      setAnswered(true)
      onAnswer(correct, exercise.english)
    }
  }

  const handleRemove = (index) => {
    if (answered) return
    setPlaced(placed.filter((_, i) => i !== index))
  }

  const handleReset = () => {
    if (answered) return
    setPlaced([])
  }

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="text-lg font-semibold text-white text-center mb-2">
        {exercise.prompt}
      </h3>
      <p className="text-slate-400 text-center mb-6">"{exercise.english}"</p>

      {/* Answer area */}
      <div className={`min-h-[60px] bg-slate-800/50 border-2 border-dashed rounded-xl p-3 mb-4 flex flex-wrap gap-2 items-center
        ${answered
          ? isCorrect ? 'border-green-500/50' : 'border-red-500/50'
          : 'border-slate-600/50'
        }`}
      >
        {placed.length === 0 && (
          <span className="text-slate-600 text-sm">Tap tiles to build the sentence...</span>
        )}
        {placed.map((tile, i) => (
          <motion.button
            key={`placed-${i}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={() => handleRemove(i)}
            disabled={answered}
            className={`hangul px-3 py-2 rounded-lg font-medium cursor-pointer border-0 text-base
              ${answered
                ? isCorrect ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                : 'bg-primary-500/20 text-primary-300 hover:bg-primary-500/30'
              }`}
          >
            {tile}
          </motion.button>
        ))}
        {!answered && placed.length > 0 && (
          <button onClick={handleReset} className="ml-auto text-slate-500 hover:text-slate-300 cursor-pointer bg-transparent border-0 p-1">
            <RotateCcw size={16} />
          </button>
        )}
      </div>

      {/* Available tiles */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {available.map((tile, i) => (
          <motion.button
            key={`avail-${tile}-${i}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTileClick(tile)}
            disabled={answered}
            className="hangul px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50
              text-white font-medium cursor-pointer hover:bg-slate-600/50 hover:border-slate-500/50
              transition-colors text-base"
          >
            {tile}
          </motion.button>
        ))}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {isCorrect ? (
            <span className="text-green-400 font-medium flex items-center justify-center gap-2">
              <Check size={18} /> Perfect!
            </span>
          ) : (
            <div className="text-red-400">
              <span className="flex items-center justify-center gap-2 mb-1">
                <X size={18} /> Not quite
              </span>
              <span className="text-sm text-slate-400">
                Correct: <span className="hangul text-green-400">{exercise.correct.join(' ')}</span>
              </span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
