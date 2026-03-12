/**
 * Exercise utility functions for Hanbuddy practice pages.
 *
 * Provides question generation, distractor selection, and Korean string
 * comparison shared by ClozeExercisePage and ListeningExercisePage.
 */

import type { VocabItem } from '../types/content';
import { LESSONS } from '../data/lessons';
import { VOCAB } from '../data/vocab';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ClozeQuestion {
  vocabId: string;
  sentence: string;
  blankSentence: string;
  correctAnswer: string;
  englishHint: string;
}

export interface ListeningOption {
  text: string;
  isCorrect: boolean;
}

export interface ListeningQuestion {
  vocabId: string;
  audioText: string;
  options: ListeningOption[];
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Fisher-Yates in-place shuffle. Returns the same array. */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Compares two Korean strings after trimming whitespace and normalizing to
 * NFC (composed Unicode form). Handles IME input that may produce different
 * Unicode representations of the same character.
 */
export function compareKorean(input: string, answer: string): boolean {
  return input.trim().normalize('NFC') === answer.trim().normalize('NFC');
}

/**
 * Picks `count` distractors from `pool` excluding `target`.
 * Prefers items with the same conjugation_type as the target.
 * Falls back to any vocab item if the same-type pool is too small.
 * Returns fewer than `count` items if the pool itself is too small.
 */
export function pickDistractors(
  target: VocabItem,
  pool: VocabItem[],
  count = 3
): VocabItem[] {
  const withoutTarget = pool.filter((v) => v.id !== target.id);

  // Prefer same conjugation_type
  const sameType = withoutTarget.filter(
    (v) => v.conjugation_type === target.conjugation_type
  );

  if (sameType.length >= count) {
    return shuffle([...sameType]).slice(0, count);
  }

  // Not enough same-type items — use all of same type plus fill from rest
  const otherType = withoutTarget.filter(
    (v) => v.conjugation_type !== target.conjugation_type
  );

  const combined = [...shuffle([...sameType]), ...shuffle([...otherType])];
  return combined.slice(0, count);
}

/**
 * Generates up to `count` cloze (fill-in-the-blank) questions from `vocabPool`.
 * Each question blanks out the Korean word in one of its example sentences.
 */
export function generateClozeQuestions(
  vocabPool: VocabItem[],
  count = 10
): ClozeQuestion[] {
  const shuffled = shuffle([...vocabPool]);
  const selected = shuffled.slice(0, count);

  return selected.map((vocab) => {
    const example = vocab.examples[Math.floor(Math.random() * vocab.examples.length)];
    const blankSentence = example.korean.replace(vocab.korean, '______');

    return {
      vocabId: vocab.id,
      sentence: example.korean,
      blankSentence,
      correctAnswer: vocab.korean,
      englishHint: example.english,
    };
  });
}

/**
 * Generates up to `count` listening (audio multiple-choice) questions from
 * `vocabPool`. Each question has 4 shuffled options (1 correct + 3 distractors).
 */
export function generateListeningQuestions(
  vocabPool: VocabItem[],
  count = 10
): ListeningQuestion[] {
  const shuffled = shuffle([...vocabPool]);
  const selected = shuffled.slice(0, count);

  return selected.map((vocab) => {
    const distractors = pickDistractors(vocab, vocabPool, 3);
    const options: ListeningOption[] = shuffle([
      { text: vocab.korean, isCorrect: true },
      ...distractors.map((d) => ({ text: d.korean, isCorrect: false })),
    ]);

    return {
      vocabId: vocab.id,
      audioText: vocab.korean,
      options,
    };
  });
}

/**
 * Returns unique VocabItem objects from all completed lessons.
 * Items shared across multiple lessons are deduplicated by ID.
 */
export function getUnlockedVocab(completedLessons: string[]): VocabItem[] {
  const seenIds = new Set<string>();
  const result: VocabItem[] = [];

  for (const lessonId of completedLessons) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) continue;

    for (const vocabId of lesson.vocab_ids) {
      if (seenIds.has(vocabId)) continue;
      const vocab = (VOCAB as VocabItem[]).find((v) => v.id === vocabId);
      if (vocab) {
        seenIds.add(vocabId);
        result.push(vocab);
      }
    }
  }

  return result;
}
