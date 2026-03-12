import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function MatchingPairs({ exercise, onAnswer }) {
  const pairs = exercise.pairs
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState(new Set())
  const [wrongPair, setWrongPair] = useState(null)
  const [mistakes, setMistakes] = useState(0)

  // Shuffle right side
  const shuffledRight = useMemo(() => {
    const items = pairs.map((p, i) => ({ text: p.right, index: i }))
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]]
    }
    return items
  }, [pairs])

  const handleLeftClick = (index) => {
    if (matched.has(index)) return
    setSelectedLeft(index)
    setWrongPair(null)
  }

  const handleRightClick = (rightItem) => {
    if (selectedLeft === null) return
    if (matched.has(selectedLeft)) return

    if (rightItem.index === selectedLeft) {
      // Correct match
      const newMatched = new Set(matched)
      newMatched.add(selectedLeft)
      setMatched(newMatched)
      setSelectedLeft(null)
      setWrongPair(null)

      // All matched?
      if (newMatched.size === pairs.length) {
        setTimeout(() => {
          onAnswer(mistakes === 0, exercise.prompt)
        }, 500)
      }
    } else {
      // Wrong match
      setWrongPair({ left: selectedLeft, right: rightItem.index })
      setMistakes(m => m + 1)
      setTimeout(() => {
        setWrongPair(null)
        setSelectedLeft(null)
      }, 800)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="text-lg font-semibold text-white text-center mb-6">
        {exercise.prompt}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-2">
          {pairs.map((pair, i) => {
            const isMatched = matched.has(i)
            const isSelected = selectedLeft === i
            const isWrong = wrongPair?.left === i

            return (
              <motion.button
                key={`l-${i}`}
                whileTap={!isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleLeftClick(i)}
                disabled={isMatched}
                className={`w-full px-4 py-3 rounded-xl border text-left cursor-pointer transition-all hangul
                  ${isMatched
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : isWrong
                      ? 'bg-red-500/10 border-red-500/50 text-red-400'
                      : isSelected
                        ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                        : 'bg-slate-800/50 border-slate-600/50 text-white hover:border-slate-500/50'
                  }`}
              >
                <span className="flex items-center gap-2">
                  {isMatched && <Check size={14} className="text-green-400" />}
                  {pair.left}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          {shuffledRight.map((item, i) => {
            const isMatched = matched.has(item.index)
            const isWrong = wrongPair?.right === item.index

            return (
              <motion.button
                key={`r-${i}`}
                whileTap={!isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleRightClick(item)}
                disabled={isMatched || selectedLeft === null}
                className={`w-full px-4 py-3 rounded-xl border text-left cursor-pointer transition-all
                  ${isMatched
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : isWrong
                      ? 'bg-red-500/10 border-red-500/50 text-red-400'
                      : selectedLeft !== null
                        ? 'bg-slate-800/50 border-slate-600/50 text-white hover:border-primary-500/50 hover:bg-primary-500/10'
                        : 'bg-slate-800/30 border-slate-700/30 text-slate-400'
                  }`}
              >
                <span className="flex items-center gap-2">
                  {isMatched && <Check size={14} className="text-green-400" />}
                  {item.text}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
