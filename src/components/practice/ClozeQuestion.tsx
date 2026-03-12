import { useState, useEffect } from 'react';
import { compareKorean } from '../../utils/exerciseUtils';
import type { ClozeQuestion as ClozeQuestionType } from '../../utils/exerciseUtils';

interface ClozeQuestionProps {
  question: ClozeQuestionType;
  onAnswer: (correct: boolean) => void;
}

export default function ClozeQuestion({ question, onAnswer }: ClozeQuestionProps) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setInput('');
    setSubmitted(false);
    setIsCorrect(false);
  }, [question.vocabId, question.blankSentence]);

  function handleSubmit() {
    if (submitted || input.trim() === '') return;

    const correct = compareKorean(input, question.correctAnswer);
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      setTimeout(() => onAnswer(true), 1000);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Blank sentence */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xl font-medium text-gray-900 leading-relaxed">
          {question.blankSentence}
        </p>
        <p className="text-sm text-gray-500 mt-2">{question.englishHint}</p>
      </div>

      {/* Input */}
      {!submitted && (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Korean word..."
            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            onClick={handleSubmit}
            disabled={input.trim() === ''}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Check
          </button>
        </div>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="rounded-xl overflow-hidden border">
          {isCorrect ? (
            <div className="bg-green-50 border-green-200 p-4">
              <p className="text-green-700 font-semibold text-lg">Correct!</p>
              <p className="text-green-600 mt-1">
                <span className="font-medium">{question.correctAnswer}</span>
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border-red-200 p-4 space-y-2">
              <p className="text-red-600 font-medium">
                Your answer:{' '}
                <span className="line-through">{input}</span>
              </p>
              <p className="text-green-700 font-semibold">
                Correct: <span className="text-green-800">{question.correctAnswer}</span>
              </p>
              <div className="pt-2 border-t border-red-200">
                <p className="text-gray-800 font-medium">{question.sentence}</p>
                <p className="text-gray-500 text-sm mt-1">{question.englishHint}</p>
              </div>
              <button
                onClick={() => onAnswer(false)}
                className="mt-3 w-full py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
