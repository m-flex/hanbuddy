import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MultipleChoice from './exercises/MultipleChoice'
import Listening from './exercises/Listening'
import MatchingPairs from './exercises/MatchingPairs'
import FillBlank from './exercises/FillBlank'
import SentenceBuilder from './exercises/SentenceBuilder'
import Conversation from './exercises/Conversation'

const exerciseComponents = {
  'multiple-choice': MultipleChoice,
  'listening': Listening,
  'matching': MatchingPairs,
  'fill-blank': FillBlank,
  'sentence-builder': SentenceBuilder,
  'conversation': Conversation,
}

export default function ExerciseRunner({ exercises, onComplete, onAnswer }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState([])
  const [direction, setDirection] = useState(1)

  const exercise = exercises[currentIndex]
  const ExerciseComponent = exerciseComponents[exercise?.type]

  const handleAnswer = useCallback((correct, word) => {
    const newResults = [...results, { correct, exercise: exercises[currentIndex] }]
    setResults(newResults)

    if (onAnswer) onAnswer(correct, word)

    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setDirection(1)
        setCurrentIndex(i => i + 1)
      } else {
        const correctCount = newResults.filter(r => r.correct).length
        const score = correctCount / newResults.length
        onComplete(score, newResults)
      }
    }, correct ? 800 : 1500)
  }, [currentIndex, exercises, results, onAnswer, onComplete])

  if (!exercise || !ExerciseComponent) return null

  const progress = (currentIndex + 1) / exercises.length

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
        <motion.div
          animate={{ width: `${progress * 100}%` }}
          className="h-full bg-primary-500 rounded-full"
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="text-center mb-4">
        <span className="text-sm text-slate-400">
          Question {currentIndex + 1} of {exercises.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: direction * 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 200, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <ExerciseComponent
            exercise={exercise}
            onAnswer={handleAnswer}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
