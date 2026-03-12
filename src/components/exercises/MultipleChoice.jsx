import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function MultipleChoice({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    const correct = index === exercise.correct
    onAnswer(correct, exercise.prompt)
  }

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="text-lg sm:text-xl font-semibold text-white text-center mb-6">
        {exercise.prompt}
      </h3>

      <div className="space-y-3">
        {exercise.options.map((option, i) => {
          const isCorrect = i === exercise.correct
          const isSelected = i === selected
          let borderColor = 'border-slate-600/50'
          let bgColor = 'bg-slate-800/50'
          let textColor = 'text-white'

          if (answered) {
            if (isCorrect) {
              borderColor = 'border-green-500/70'
              bgColor = 'bg-green-500/10'
              textColor = 'text-green-400'
            } else if (isSelected && !isCorrect) {
              borderColor = 'border-red-500/70'
              bgColor = 'bg-red-500/10'
              textColor = 'text-red-400'
            } else {
              bgColor = 'bg-slate-800/30'
              textColor = 'text-slate-500'
            }
          }

          return (
            <motion.button
              key={i}
              whileHover={!answered ? { scale: 1.02 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left px-5 py-4 rounded-xl border ${borderColor} ${bgColor} ${textColor}
                cursor-pointer transition-colors flex items-center gap-3
                ${!answered ? 'hover:bg-slate-700/50 hover:border-slate-500/50' : ''}`}
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-sm font-medium text-slate-400">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 hangul">{option}</span>
              {answered && isCorrect && <Check size={20} className="text-green-400 flex-shrink-0" />}
              {answered && isSelected && !isCorrect && <X size={20} className="text-red-400 flex-shrink-0" />}
            </motion.button>
          )
        })}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 text-center text-sm font-medium ${selected === exercise.correct ? 'text-green-400' : 'text-red-400'}`}
        >
          {selected === exercise.correct ? 'Correct!' : `The answer was: ${exercise.options[exercise.correct]}`}
        </motion.div>
      )}
    </div>
  )
}
