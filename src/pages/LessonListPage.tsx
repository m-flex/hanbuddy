import { useState } from 'react';
import { WelcomeCard } from '../components/ui/WelcomeCard';
import { Toast } from '../components/ui/Toast';
import { SpeedToggle } from '../components/ui/SpeedToggle';
import { LessonCard } from '../components/lessons/LessonCard';
import { LESSONS } from '../data/lessons';
import { useProgressStore } from '../store/progress';
import { isLessonUnlocked } from '../utils/lessonUnlock';
import type { Lesson } from '../types/content';

// Sort lessons by (level ASC, order ASC)
function sortedLessons(lessons: Lesson[]): Lesson[] {
  return [...lessons].sort((a, b) =>
    a.level !== b.level ? a.level - b.level : a.order - b.order
  );
}

export default function LessonListPage() {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Group lessons by level, sorted level ASC, within each level by order ASC
  const sorted = sortedLessons(LESSONS);
  const levelGroups = sorted.reduce<Map<number, Lesson[]>>((acc, lesson) => {
    const group = acc.get(lesson.level) ?? [];
    group.push(lesson);
    acc.set(lesson.level, group);
    return acc;
  }, new Map<number, Lesson[]>());

  function handleLockedTap(lesson: Lesson) {
    // Find the previous lesson in sorted order
    const index = sorted.findIndex((l) => l.id === lesson.id);
    const previousLesson = index > 0 ? sorted[index - 1] : null;
    const message = previousLesson
      ? `Complete "${previousLesson.title}" to unlock this`
      : 'Complete the previous lesson to unlock this';
    setToastMsg(message);
  }

  return (
    <div className="pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Lessons</h1>
        <SpeedToggle />
      </div>

      <WelcomeCard />

      <div className="px-4 py-4 space-y-6">
        {Array.from(levelGroups.entries()).map(([level, lessons]) => (
          <section key={level}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Level {level}
            </h2>
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isUnlocked={isLessonUnlocked(lesson, LESSONS, completedLessons)}
                  isCompleted={completedLessons.includes(lesson.id)}
                  onLockedTap={() => handleLockedTap(lesson)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Toast message={toastMsg} onDismiss={() => setToastMsg(null)} />
    </div>
  );
}
