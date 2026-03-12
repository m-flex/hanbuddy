import { CheckCircle2, Play, Lock } from 'lucide-react';
import type { Lesson } from '../../types/content';

interface CurriculumNodeProps {
  lesson: Lesson;
  state: 'completed' | 'current' | 'locked';
  isLast: boolean;
  onTap: () => void;
  isFirstOfLevel?: boolean;
  nodeRef?: React.RefObject<HTMLDivElement | null>;
}

export function CurriculumNode({
  lesson,
  state,
  isLast,
  onTap,
  isFirstOfLevel,
  nodeRef,
}: CurriculumNodeProps) {
  const circleClasses = {
    completed: 'bg-green-500 text-white',
    current: 'bg-blue-500 text-white',
    locked: 'bg-gray-200 text-gray-400',
  }[state];

  const labelClasses =
    state === 'locked' ? 'text-gray-400' : 'text-gray-900';

  return (
    <div ref={nodeRef}>
      {isFirstOfLevel && (
        <div className="mb-2 mt-4 first:mt-0">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Level {lesson.level}
          </span>
        </div>
      )}
      <button
        onClick={onTap}
        aria-label={lesson.title}
        className="flex items-center gap-4 w-full text-left py-2 focus:outline-none"
      >
        {/* Node circle + vertical line */}
        <div className="relative flex flex-col items-center flex-shrink-0">
          <div
            data-testid={`node-${state}`}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${circleClasses}`}
          >
            {state === 'completed' && <CheckCircle2 size={16} />}
            {state === 'current' && <Play size={14} />}
            {state === 'locked' && <Lock size={14} />}
          </div>
          {/* Vertical connector line below the circle */}
          {!isLast && (
            <div className="w-0.5 bg-gray-200 flex-1 min-h-[24px]" />
          )}
        </div>
        {/* Lesson title */}
        <span className={`text-sm font-medium ${labelClasses}`}>
          {lesson.title}
        </span>
      </button>
    </div>
  );
}
