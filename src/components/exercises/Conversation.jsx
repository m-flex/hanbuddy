import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, MessageCircle } from 'lucide-react'

export default function Conversation({ exercise, onAnswer }) {
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
      {/* Scenario */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle size={18} className="text-primary-400" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">Situation</p>
            <p className="text-slate-300">{exercise.prompt}</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {exercise.options.map((option, i) => {
          const isCorrect = i === exercise.correct
          const isSelected = i === selected

          let style = 'bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/50 hover:border-slate-500/50'
          if (answered) {
            if (isCorrect) style = 'bg-green-500/10 border-green-500/50 text-green-400'
            else if (isSelected) style = 'bg-red-500/10 border-red-500/50 text-red-400'
            else style = 'bg-slate-800/30 border-slate-700/30 text-slate-500'
          }

          return (
            <motion.button
              key={i}
              whileHover={!answered ? { scale: 1.02 } : {}}
              whileTap={!answered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full text-left px-5 py-4 rounded-xl border cursor-pointer transition-colors hangul ${style}`}
            >
              <span className="flex items-center gap-2">
                {option}
                {answered && isCorrect && <Check size={18} className="text-green-400 ml-auto flex-shrink-0" />}
                {answered && isSelected && !isCorrect && <X size={18} className="text-red-400 ml-auto flex-shrink-0" />}
              </span>
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
          {selected === exercise.correct ? 'Great choice!' : `Better answer: ${exercise.options[exercise.correct]}`}
        </motion.div>
      )}
    </div>
  )
}
