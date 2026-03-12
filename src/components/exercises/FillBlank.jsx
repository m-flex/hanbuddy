import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function FillBlank({ exercise, onAnswer }) {
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
      {/* Sentence with blank */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 mb-6 text-center">
        <p className="hangul text-xl sm:text-2xl text-white leading-relaxed">
          {exercise.prompt.split('___').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={`inline-block min-w-[4rem] mx-1 px-3 py-1 rounded-lg border-2 border-dashed
                  ${answered
                    ? selected === exercise.correct
                      ? 'border-green-500/50 bg-green-500/10 text-green-400'
                      : 'border-red-500/50 bg-red-500/10 text-red-400'
                    : 'border-primary-500/50 bg-primary-500/10 text-primary-300'
                  }`}>
                  {answered ? exercise.options[selected] : '?'}
                </span>
              )}
            </span>
          ))}
        </p>
        {exercise.hint && !answered && (
          <p className="text-sm text-slate-500 mt-3">{exercise.hint}</p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map((option, i) => {
          const isCorrect = i === exercise.correct
          const isSelected = i === selected

          let style = 'bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/50'
          if (answered) {
            if (isCorrect) style = 'bg-green-500/10 border-green-500/50 text-green-400'
            else if (isSelected) style = 'bg-red-500/10 border-red-500/50 text-red-400'
            else style = 'bg-slate-800/30 border-slate-700/30 text-slate-500'
          }

          return (
            <motion.button
              key={i}
              whileHover={!answered ? { scale: 1.03 } : {}}
              whileTap={!answered ? { scale: 0.97 } : {}}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`px-4 py-3 rounded-xl border cursor-pointer transition-colors hangul text-lg font-medium ${style}`}
            >
              {option}
              {answered && isCorrect && <Check size={16} className="inline ml-2" />}
              {answered && isSelected && !isCorrect && <X size={16} className="inline ml-2" />}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
