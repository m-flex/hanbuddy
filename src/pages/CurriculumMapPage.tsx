import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LESSONS } from '../data/lessons';
import { useProgressStore } from '../store/progress';
import { isLessonUnlocked } from '../utils/lessonUnlock';
import { Toast } from '../components/ui/Toast';
import { WelcomeCard } from '../components/ui/WelcomeCard';
import { CurriculumNode } from '../components/curriculum/CurriculumNode';
import { CurriculumPath } from '../components/curriculum/CurriculumPath';
import type { Lesson } from '../types/content';

function sortedLessons(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort((a, b) =>
    a.level !== b.level ? a.level - b.level : a.order - b.order
  );
}

type NodeState = 'completed' | 'current' | 'locked';

export default function CurriculumMapPage() {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const currentNodeRef = useRef<HTMLDivElement | null>(null);

  const sorted = sortedLessons(LESSONS);

  // Derive the current lesson: first unlocked but not completed
  const currentLessonId = sorted.find(
    (l) => isLessonUnlocked(l, LESSONS, completedLessons) && !completedLessons.includes(l.id)
  )?.id ?? null;

  function getNodeState(lesson: Lesson): NodeState {
    if (completedLessons.includes(lesson.id)) return 'completed';
    if (lesson.id === currentLessonId) return 'current';
    return 'locked';
  }

  function handleNodeTap(lesson: Lesson, state: NodeState) {
    if (state === 'locked') {
      setToastMsg('Complete previous lessons to unlock');
    } else {
      navigate(`/lessons/${lesson.id}`);
    }
  }

  // Auto-scroll to current node on mount
  useEffect(() => {
    if (currentNodeRef.current) {
      currentNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <div className="pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <h1 className="text-xl font-bold text-gray-900">Your Learning Path</h1>
      </div>

      <WelcomeCard />

      <CurriculumPath>
        {sorted.map((lesson, index) => {
          const state = getNodeState(lesson);
          const isLast = index === sorted.length - 1;
          const isFirstOfLevel =
            index === 0 || sorted[index - 1].level !== lesson.level;

          return (
            <CurriculumNode
              key={lesson.id}
              lesson={lesson}
              state={state}
              isLast={isLast}
              isFirstOfLevel={isFirstOfLevel}
              onTap={() => handleNodeTap(lesson, state)}
              nodeRef={state === 'current' ? currentNodeRef : undefined}
            />
          );
        })}
      </CurriculumPath>

      <Toast message={toastMsg} onDismiss={() => setToastMsg(null)} />
    </div>
  );
}
