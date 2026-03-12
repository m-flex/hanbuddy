import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { GRAMMAR } from '../data/grammar';
import { VOCAB } from '../data/vocab';
import { useProgressStore } from '../store/progress';
import { isLessonUnlocked } from '../utils/lessonUnlock';
import { SpeedToggle } from '../components/ui/SpeedToggle';
import { CompletionCard } from '../components/ui/CompletionCard';
import { GrammarSection } from '../components/lessons/GrammarSection';
import { VocabReference } from '../components/lessons/VocabReference';
import type { Lesson } from '../types/content';

/** Sort lessons by (level ASC, order ASC) */
function sortedLessons(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort((a, b) =>
    a.level !== b.level ? a.level - b.level : a.order - b.order
  );
}

export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const completedLessons = useProgressStore((s) => s.completedLessons);
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const setActiveLesson = useProgressStore((s) => s.setActiveLesson);

  const [showCompletion, setShowCompletion] = useState(false);

  const lesson = LESSONS.find((l) => l.id === lessonId);

  // Set active lesson on mount
  useEffect(() => {
    if (lesson) {
      setActiveLesson(lesson.id);
    }
  }, [lesson, setActiveLesson]);

  // Not found
  if (!lesson) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">Lesson not found.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Lessons
        </Link>
      </div>
    );
  }

  // Locked guard
  if (!isLessonUnlocked(lesson, LESSONS, completedLessons)) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 mb-2">This lesson is locked.</p>
        <p className="text-sm text-gray-400 mb-4">Complete the previous lesson to unlock it.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Lessons
        </Link>
      </div>
    );
  }

  // Resolve grammar and vocab
  const grammarPoints = lesson.grammar_ids
    .map((id) => GRAMMAR.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => g !== undefined);

  const vocabItems = lesson.vocab_ids
    .map((id) => VOCAB.find((v) => v.id === id))
    .filter((v): v is NonNullable<typeof v> => v !== undefined);

  // Compute next lesson
  const sorted = sortedLessons(LESSONS);
  const currentIndex = sorted.findIndex((l) => l.id === lesson.id);
  const nextLesson = currentIndex >= 0 && currentIndex < sorted.length - 1
    ? sorted[currentIndex + 1]
    : null;

  const isAlreadyCompleted = completedLessons.includes(lesson.id);

  function handleComplete() {
    completeLesson(lesson!.id);
    setShowCompletion(true);
  }

  function handleContinue() {
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 truncate">{lesson.title}</h1>
        <SpeedToggle />
      </div>

      <div className="px-4 py-4">
        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{lesson.description}</p>

        {/* Grammar sections */}
        {grammarPoints.map((gp) => (
          <GrammarSection key={gp.id} grammarPoint={gp} />
        ))}

        {/* Vocabulary reference */}
        <VocabReference vocabItems={vocabItems} />

        {/* Completion section */}
        {showCompletion ? (
          <CompletionCard
            lessonTitle={lesson.title}
            nextLessonId={nextLesson?.id ?? null}
            nextLessonTitle={nextLesson?.title ?? null}
            onContinue={handleContinue}
          />
        ) : isAlreadyCompleted ? (
          <div className="flex items-center gap-2 text-green-600 text-sm py-4 justify-center">
            <CheckCircle2 size={18} />
            <span className="text-gray-500">Lesson completed</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors mt-2"
          >
            Complete Lesson
          </button>
        )}
      </div>
    </div>
  );
}
