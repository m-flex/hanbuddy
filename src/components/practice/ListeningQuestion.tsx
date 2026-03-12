import { useState, useEffect } from 'react';
import { AudioButton } from '../ui/AudioButton';
import type { ListeningQuestion as ListeningQuestionType } from '../../utils/exerciseUtils';
import { VOCAB } from '../../data/vocab';
import type { VocabItem } from '../../types/content';

interface ListeningQuestionProps {
  question: ListeningQuestionType;
  onAnswer: (correct: boolean) => void;
}

export default function ListeningQuestion({ question, onAnswer }: ListeningQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setAnswered(false);
  }, [question.vocabId]);

  function handleSelect(index: number) {
    if (answered) return;

    const option = question.options[index];
    setSelectedIndex(index);
    setAnswered(true);

    if (option.isCorrect) {
      setTimeout(() => onAnswer(true), 1000);
    }
  }

  // Find the vocab item for showing the example sentence on wrong answer
  const vocabItem = (VOCAB as VocabItem[]).find((v) => v.id === question.vocabId);
  const correctIndex = question.options.findIndex((o) => o.isCorrect);

  function optionClassName(index: number): string {
    const base =
      'rounded-xl border-2 py-4 text-xl font-medium transition-colors text-center';

    if (!answered) {
      return `${base} border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 cursor-pointer`;
    }

    const option = question.options[index];

    if (option.isCorrect) {
      return `${base} border-green-400 bg-green-50 text-green-800`;
    }

    if (index === selectedIndex) {
      return `${base} border-red-400 bg-red-50 text-red-700`;
    }

    return `${base} border-gray-200 bg-white text-gray-400 opacity-60`;
  }

  const isWrong = answered && selectedIndex !== null && !question.options[selectedIndex].isCorrect;

  return (
    <div className="flex flex-col gap-5">
      {/* Audio play area */}
      <div className="flex flex-col items-center justify-center bg-blue-50 rounded-2xl p-8 gap-3">
        <AudioButton text={question.audioText} className="w-16 h-16 rounded-full bg-blue-100 hover:bg-blue-200" />
        <p className="text-sm text-gray-500">Tap to play audio</p>
      </div>

      {/* 2×2 option grid */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={answered}
            className={optionClassName(i)}
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Wrong answer feedback */}
      {isWrong && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-200">
          <p className="text-green-700 font-semibold">
            Correct: <span className="text-green-800">{question.options[correctIndex].text}</span>
          </p>
          {vocabItem && vocabItem.examples.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-gray-800 font-medium">{vocabItem.examples[0].korean}</p>
              <p className="text-gray-500 text-sm mt-1">{vocabItem.examples[0].english}</p>
            </div>
          )}
          <button
            onClick={() => onAnswer(false)}
            className="mt-2 w-full py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
