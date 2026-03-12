import { describe, it, expect } from 'vitest';
import { isLessonUnlocked } from './lessonUnlock';
import type { Lesson } from '../types/content';

const makeLesson = (id: number, level: number, order: number): Lesson => ({
  id: `les-${id}` as `les-${number}`,
  title: `Lesson ${id}`,
  description: '',
  level,
  order,
  vocab_ids: [],
  grammar_ids: [],
  topics: [],
});

const lesson1 = makeLesson(1, 1, 1);
const lesson2 = makeLesson(2, 1, 2);
const lesson3 = makeLesson(3, 1, 3);
const lesson4 = makeLesson(4, 2, 1); // Level 2, lesson 1

const allLessons = [lesson3, lesson1, lesson2, lesson4]; // intentionally unordered

describe('isLessonUnlocked()', () => {
  it('first lesson (by level ASC, order ASC) is always unlocked', () => {
    expect(isLessonUnlocked(lesson1, allLessons, [])).toBe(true);
  });

  it('second lesson is locked when completedLessons is empty', () => {
    expect(isLessonUnlocked(lesson2, allLessons, [])).toBe(false);
  });

  it('empty completedLessons means only first lesson is unlocked', () => {
    expect(isLessonUnlocked(lesson1, allLessons, [])).toBe(true);
    expect(isLessonUnlocked(lesson2, allLessons, [])).toBe(false);
    expect(isLessonUnlocked(lesson3, allLessons, [])).toBe(false);
    expect(isLessonUnlocked(lesson4, allLessons, [])).toBe(false);
  });

  it('lesson N+1 unlocks when lesson N is in completedLessons', () => {
    expect(isLessonUnlocked(lesson2, allLessons, ['les-1'])).toBe(true);
  });

  it('lesson N+1 requires lesson N specifically — not a later lesson', () => {
    expect(isLessonUnlocked(lesson3, allLessons, ['les-1'])).toBe(false);
  });

  it('lesson N+1 unlocks when previous lesson completed', () => {
    expect(isLessonUnlocked(lesson3, allLessons, ['les-1', 'les-2'])).toBe(true);
  });

  it('Level 2 Lesson 1 unlocks when last lesson of Level 1 is completed', () => {
    // lesson3 is the last lesson of Level 1 (level=1, order=3)
    expect(isLessonUnlocked(lesson4, allLessons, ['les-1', 'les-2', 'les-3'])).toBe(true);
  });

  it('Level 2 Lesson 1 is locked when last lesson of Level 1 is NOT completed', () => {
    expect(isLessonUnlocked(lesson4, allLessons, ['les-1', 'les-2'])).toBe(false);
  });
});
