import { Link } from 'react-router-dom';
import { CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import type { Lesson } from '../../types/content';

interface LessonCardProps {
  lesson: Lesson;
  isUnlocked: boolean;
  isCompleted: boolean;
  onLockedTap: (lessonTitle: string) => void;
}

export function LessonCard({ lesson, isUnlocked, isCompleted, onLockedTap }: LessonCardProps) {
  const descriptionSnippet = lesson.description.length > 80
    ? lesson.description.slice(0, 80) + '…'
    : lesson.description;

  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-base ${!isUnlocked ? 'text-gray-400' : 'text-gray-900'}`}>
            {lesson.title}
          </h3>
          <p className={`text-sm mt-0.5 ${!isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
            {descriptionSnippet}
          </p>
        </div>
        <div className="shrink-0 mt-0.5">
          {!isUnlocked ? (
            <Lock size={18} className="text-gray-300" />
          ) : isCompleted ? (
            <CheckCircle2 size={18} className="text-green-500" />
          ) : (
            <ChevronRight size={18} className="text-gray-400" />
          )}
        </div>
      </div>
    </>
  );

  if (!isUnlocked) {
    return (
      <div
        role="button"
        onClick={() => onLockedTap(lesson.title)}
        className="rounded-lg border border-gray-200 p-4 shadow-sm opacity-50 cursor-pointer select-none"
        aria-label={`${lesson.title} — locked`}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      to={`/lessons/${lesson.id}`}
      className="block rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {cardContent}
    </Link>
  );
}
