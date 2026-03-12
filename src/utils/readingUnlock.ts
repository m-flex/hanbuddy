import type { Lesson, ReadingPassage } from '../types/content';

/**
 * Determines whether a reading passage is unlocked based on lesson completion.
 *
 * Rules:
 * - All lessons at the passage's level must be completed.
 * - If no lessons exist at that level, the passage is unlocked (no gate).
 */
export function isPassageUnlocked(
  passage: ReadingPassage,
  allLessons: Lesson[],
  completedLessons: string[]
): boolean {
  const lessonsForLevel = allLessons.filter((l) => l.level === passage.level);

  // No lessons at this level — passage is freely accessible
  if (lessonsForLevel.length === 0) return true;

  // All lessons at this level must be completed
  return lessonsForLevel.every((l) => completedLessons.includes(l.id));
}
