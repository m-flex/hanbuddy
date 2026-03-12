import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProgressStore } from '../store/progress';
import { LESSONS } from '../data/lessons';
import { VOCAB } from '../data/vocab';
import type { VocabItem, ExampleSentence } from '../types/content';
import ExerciseProgress from '../components/practice/ExerciseProgress';
import SentenceTiles from '../components/practice/SentenceTiles';

interface SentenceQuestion {
  vocabId: string;
  englishPrompt: string;
  koreanWords: string[];
  correctSentence: string;
}

function getUnlockedVocab(completedLessons: string[]): VocabItem[] {
  const unlockedIds = new Set<string>();
  for (const lessonId of completedLessons) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (lesson) {
      for (const vocabId of lesson.vocab_ids) {
        unlockedIds.add(vocabId);
      }
    }
  }
  return VOCAB.filter((v) => unlockedIds.has(v.id));
}

function isShortEnough(example: ExampleSentence): boolean {
  const tokens = example.korean.split(' ');
  return tokens.length >= 2 && tokens.length <= 7;
}

function generateQuestions(vocabItems: VocabItem[], maxQuestions = 10): SentenceQuestion[] {
  const questions: SentenceQuestion[] = [];
  const used = new Set<string>();

  // Prefer <= 5 tokens; allow up to 7 as fallback
  const shortExamples: { item: VocabItem; example: ExampleSentence }[] = [];
  const mediumExamples: { item: VocabItem; example: ExampleSentence }[] = [];

  for (const item of vocabItems) {
    for (const example of item.examples) {
      const tokens = example.korean.split(' ');
      if (tokens.length >= 2 && tokens.length <= 5) {
        shortExamples.push({ item, example });
      } else if (tokens.length >= 2 && tokens.length <= 7) {
        mediumExamples.push({ item, example });
      }
    }
  }

  const candidates = [...shortExamples, ...mediumExamples];

  for (const { item, example } of candidates) {
    if (questions.length >= maxQuestions) break;
    const key = `${item.id}:${example.korean}`;
    if (used.has(key)) continue;
    used.add(key);

    const words = example.korean.split(' ');
    if (!isShortEnough(example)) continue;

    questions.push({
      vocabId: item.id,
      englishPrompt: example.english,
      koreanWords: words,
      correctSentence: example.korean,
    });
  }

  return questions;
}

type AnswerState = 'idle' | 'correct' | 'incorrect';

export default function SentenceBuildPage() {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const unlockedVocab = useMemo(() => getUnlockedVocab(completedLessons), [completedLessons]);
  const questions = useMemo(() => generateQuestions(unlockedVocab), [unlockedVocab]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [userAnswer, setUserAnswer] = useState('');
  const [finished, setFinished] = useState(false);
  const [tileKey, setTileKey] = useState(0);

  if (unlockedVocab.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
        <p className="text-gray-700 text-lg font-medium">No vocabulary unlocked yet.</p>
        <p className="text-gray-500">Complete a lesson first to start sentence building practice.</p>
        <Link to="/" className="text-blue-600 underline font-medium">Go to Lessons</Link>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
        <p className="text-gray-700 text-lg font-medium">No sentence examples available yet.</p>
        <Link to="/practice" className="text-blue-600 underline font-medium">Back to Practice</Link>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-6 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Exercise Complete!</h1>
        <p className="text-5xl font-bold text-blue-600">{score}<span className="text-2xl text-gray-500">/{questions.length}</span></p>
        <p className="text-gray-600">
          {score === questions.length
            ? 'Perfect score!'
            : score >= questions.length / 2
            ? 'Good effort! Keep practicing.'
            : 'Keep at it — practice makes perfect!'}
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setAnswerState('idle');
              setUserAnswer('');
              setFinished(false);
              setTileKey((k) => k + 1);
            }}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Practice Again
          </button>
          <Link
            to="/practice"
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-center hover:bg-gray-50 transition-colors"
          >
            Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];

  function handleComplete(answer: string) {
    const normalized = (s: string) => s.normalize('NFC').trim();
    const isCorrect = normalized(answer) === normalized(question.correctSentence);
    setUserAnswer(answer);
    setAnswerState(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore((s) => s + 1);
      setTimeout(() => {
        advanceQuestion();
      }, 1000);
    }
  }

  function advanceQuestion() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswerState('idle');
      setUserAnswer('');
      setTileKey((k) => k + 1);
    }
  }

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/practice" className="p-1 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Back">
          <ArrowLeft size={22} className="text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 flex-1">Sentence Builder</h1>
      </div>

      <ExerciseProgress current={currentIndex} total={questions.length} />

      {/* Prompt */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
        <p className="text-sm text-gray-500 mb-1">Arrange the Korean words to match:</p>
        <p className="text-lg font-semibold text-gray-900">{question.englishPrompt}</p>
      </div>

      {/* Feedback */}
      {answerState === 'correct' && (
        <div className="rounded-xl bg-green-50 border border-green-200 p-3">
          <p className="text-green-700 font-semibold text-center">Correct!</p>
        </div>
      )}

      {answerState === 'incorrect' && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 space-y-2">
          <p className="text-red-700 font-semibold">Incorrect</p>
          <p className="text-sm text-gray-600">Your answer: <span className="text-red-600 font-medium">{userAnswer}</span></p>
          <p className="text-sm text-gray-600">
            Correct order:{' '}
            <span className="text-green-700 font-semibold">{question.correctSentence}</span>
          </p>
        </div>
      )}

      {/* Tiles — hide after checking */}
      {answerState === 'idle' && (
        <SentenceTiles
          key={tileKey}
          words={question.koreanWords}
          onComplete={handleComplete}
        />
      )}

      {/* Placed tiles feedback (show correct order highlighted when incorrect) */}
      {answerState === 'incorrect' && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Correct word order:</p>
          <div className="flex flex-wrap gap-2">
            {question.koreanWords.map((word, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-lg border-2 border-green-400 bg-green-50 text-gray-900 text-lg font-medium"
              >
                {word}
              </span>
            ))}
          </div>
          <button
            onClick={advanceQuestion}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors mt-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
