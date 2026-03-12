import type { Lesson } from '../types/content';

/**
 * Determines whether a lesson is unlocked based on completion progress.
 *
 * Rules:
 * - The first lesson (by level ASC, order ASC) is always unlocked.
 * - Subsequent lessons require the previous lesson (in sorted order) to be completed.
 */
export function isLessonUnlocked(
  lesson: Lesson,
  allLessons: Lesson[],
  completedLessons: string[]
): boolean {
  // Sort all lessons by level ASC, then order ASC
  const sorted = [...allLessons].sort((a, b) =>
    a.level !== b.level ? a.level - b.level : a.order - b.order
  );

  const index = sorted.findIndex((l) => l.id === lesson.id);

  // Lesson not found in list — treat as locked
  if (index === -1) return false;

  // First lesson is always unlocked
  if (index === 0) return true;

  // All subsequent lessons require previous lesson to be completed
  const previousLesson = sorted[index - 1];
  return completedLessons.includes(previousLesson.id);
}
