import { describe, expect, it } from 'vitest';
import { isPassageUnlocked } from './readingUnlock';
import type { Lesson, ReadingPassage } from '../types/content';

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

const makePassage = (id: number, level: number): ReadingPassage => ({
  id: `rdg-${id}` as `rdg-${number}`,
  title: `Passage ${id}`,
  level,
  topics: [],
  lines: [],
});

const level1Lessons = [makeLesson(1, 1, 1), makeLesson(2, 1, 2), makeLesson(3, 1, 3)];
const level2Lessons = [makeLesson(4, 2, 1), makeLesson(5, 2, 2)];
const allLessons = [...level1Lessons, ...level2Lessons];

const passage1 = makePassage(1, 1);
const passage2 = makePassage(2, 2);

describe('isPassageUnlocked()', () => {
  it('returns true when ALL lessons at passage level are completed', () => {
    const completedLessons = ['les-1', 'les-2', 'les-3'];
    expect(isPassageUnlocked(passage1, allLessons, completedLessons)).toBe(true);
  });

  it('returns false when only SOME lessons at passage level are completed', () => {
    const completedLessons = ['les-1', 'les-2']; // les-3 not done
    expect(isPassageUnlocked(passage1, allLessons, completedLessons)).toBe(false);
  });

  it('returns true when passage level has no matching lessons (edge case)', () => {
    const passageLevel99 = makePassage(99, 99);
    expect(isPassageUnlocked(passageLevel99, allLessons, [])).toBe(true);
  });

  it('returns false when completedLessons is empty and level has lessons', () => {
    expect(isPassageUnlocked(passage1, allLessons, [])).toBe(false);
  });

  it('returns true for level 2 when all level 2 lessons are completed', () => {
    const completedLessons = ['les-4', 'les-5'];
    expect(isPassageUnlocked(passage2, allLessons, completedLessons)).toBe(true);
  });

  it('returns false for level 2 when no level 2 lessons are completed (even if level 1 done)', () => {
    const completedLessons = ['les-1', 'les-2', 'les-3']; // level 1 done, level 2 not
    expect(isPassageUnlocked(passage2, allLessons, completedLessons)).toBe(false);
  });

  it('only considers lessons at the same level — other levels do not affect result', () => {
    // All level 2 lessons done, but passage is level 1 (not all level 1 done)
    const completedLessons = ['les-4', 'les-5'];
    expect(isPassageUnlocked(passage1, allLessons, completedLessons)).toBe(false);
  });
});
