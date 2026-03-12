import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProgressStore } from '../store/progress';
import { generateClozeQuestions, getUnlockedVocab } from '../utils/exerciseUtils';
import ExerciseProgress from '../components/practice/ExerciseProgress';
import ClozeQuestion from '../components/practice/ClozeQuestion';

const TOTAL = 10;

export default function ClozeExercisePage() {
  const completedLessons = useProgressStore((s) => s.completedLessons);

  const unlockedVocab = useMemo(
    () => getUnlockedVocab(completedLessons),
    [completedLessons]
  );

  const [questions] = useState(() => generateClozeQuestions(unlockedVocab, TOTAL));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  function handleAnswer(correct: boolean) {
    if (correct) setScore((s) => s + 1);
    if (currentIndex + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handlePracticeAgain() {
    // Regenerate questions
    window.location.reload();
  }

  // Empty state
  if (unlockedVocab.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6 text-center">
        <p className="text-gray-500 text-lg">
          Complete a lesson first to unlock exercises.
        </p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Lessons
        </Link>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Exercise Complete!</h2>
        <div className="bg-blue-50 rounded-2xl px-8 py-6 w-full">
          <p className="text-5xl font-bold text-blue-600">
            {score}/{questions.length}
          </p>
          <p className="text-gray-600 mt-2">correct answers</p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handlePracticeAgain}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium text-lg hover:bg-blue-700 transition-colors"
          >
            Practice Again
          </button>
          <Link
            to="/practice"
            className="w-full py-3 bg-gray-100 text-gray-800 rounded-xl font-medium text-lg text-center hover:bg-gray-200 transition-colors"
          >
            Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-lg mx-auto px-4 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/practice" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={22} className="text-gray-600" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Fill in the Blank</h1>
      </div>

      {/* Progress */}
      <ExerciseProgress current={currentIndex} total={questions.length} />

      {/* Question */}
      {currentQuestion && (
        <ClozeQuestion
          key={`${currentQuestion.vocabId}-${currentIndex}`}
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
