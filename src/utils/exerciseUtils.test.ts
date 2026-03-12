import { describe, it, expect } from 'vitest';
import {
  compareKorean,
  pickDistractors,
  generateClozeQuestions,
  generateListeningQuestions,
  getUnlockedVocab,
} from './exerciseUtils';
import type { VocabItem } from '../types/content';

// ─── Fixtures ────────────────────────────────────────────────────────────────

function makeVocab(
  id: `voc-${number}`,
  korean: string,
  conjugation_type: VocabItem['conjugation_type'] = 'noun'
): VocabItem {
  return {
    id,
    korean,
    english: `meaning of ${korean}`,
    romanization: 'rom',
    speech_level: 'polite',
    conjugation_type,
    topik_level: 'beginner',
    topics: ['top-001'],
    examples: [
      {
        korean: `예문 ${korean} 입니다.`,
        english: `Example sentence with ${korean}.`,
        romanization: 'rom',
      },
    ],
  };
}

const pool: VocabItem[] = [
  makeVocab('voc-001', '사과', 'noun'),
  makeVocab('voc-002', '바나나', 'noun'),
  makeVocab('voc-003', '오렌지', 'noun'),
  makeVocab('voc-004', '포도', 'noun'),
  makeVocab('voc-005', '달리다', 'action'),
  makeVocab('voc-006', '먹다', 'action'),
];

// ─── compareKorean ────────────────────────────────────────────────────────────

describe('compareKorean()', () => {
  it('returns true for identical strings', () => {
    expect(compareKorean('김치', '김치')).toBe(true);
  });

  it('returns true when input has leading/trailing whitespace', () => {
    expect(compareKorean(' 김치 ', '김치')).toBe(true);
  });

  it('returns true when answer has leading/trailing whitespace', () => {
    expect(compareKorean('김치', '  김치  ')).toBe(true);
  });

  it('returns false for different words', () => {
    expect(compareKorean('김치', '커피')).toBe(false);
  });

  it('returns false for empty input vs non-empty answer', () => {
    expect(compareKorean('', '김치')).toBe(false);
  });

  it('handles NFC normalization (composed form equals composed form)', () => {
    const composed = '\uAC00'; // 가 precomposed
    const decomposed = '\u1100\u1161'; // 가 decomposed (NFC normalizes both to composed)
    expect(compareKorean(composed, decomposed.normalize('NFC'))).toBe(true);
    expect(compareKorean(decomposed.normalize('NFC'), composed)).toBe(true);
  });
});

// ─── pickDistractors ──────────────────────────────────────────────────────────

describe('pickDistractors()', () => {
  it('returns exactly 3 distractors by default', () => {
    const target = pool[0];
    const distractors = pickDistractors(target, pool, 3);
    expect(distractors).toHaveLength(3);
  });

  it('never includes the target in the returned distractors', () => {
    const target = pool[0];
    const distractors = pickDistractors(target, pool, 3);
    const ids = distractors.map((d) => d.id);
    expect(ids).not.toContain(target.id);
  });

  it('returns distinct items (no duplicates)', () => {
    const target = pool[0];
    const distractors = pickDistractors(target, pool, 3);
    const ids = distractors.map((d) => d.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(3);
  });

  it('prefers same conjugation_type when pool is large enough', () => {
    // target is 'action', pool has 2 other actions (voc-005, voc-006)
    const target = makeVocab('voc-010', '걷다', 'action');
    const extendedPool: VocabItem[] = [
      ...pool,
      target,
      makeVocab('voc-011', '뛰다', 'action'),
    ];
    // With 3 same-type items (voc-005, voc-006, voc-011), all 3 distractors should be 'action'
    const distractors = pickDistractors(target, extendedPool, 3);
    const allSameType = distractors.every((d) => d.conjugation_type === 'action');
    expect(allSameType).toBe(true);
  });

  it('falls back to any vocab if same-type pool is too small', () => {
    // target is 'action', but only 1 other action exists → must fall back
    const target = pool[4]; // 달리다 (action)
    const smallPool = [pool[0], pool[1], pool[2], target]; // 3 nouns + 1 action
    const distractors = pickDistractors(target, smallPool, 3);
    expect(distractors).toHaveLength(3);
    const ids = distractors.map((d) => d.id);
    expect(ids).not.toContain(target.id);
  });

  it('returns fewer than requested count if pool is too small', () => {
    const target = pool[0];
    const tinyPool = [pool[0], pool[1]]; // only 2 items, one is target
    const distractors = pickDistractors(target, tinyPool, 3);
    expect(distractors.length).toBeLessThanOrEqual(1);
  });
});

// ─── generateClozeQuestions ───────────────────────────────────────────────────

describe('generateClozeQuestions()', () => {
  it('returns up to the requested count', () => {
    const questions = generateClozeQuestions(pool, 4);
    expect(questions.length).toBeLessThanOrEqual(4);
    expect(questions.length).toBeGreaterThan(0);
  });

  it('returns fewer questions when pool is smaller than count', () => {
    const questions = generateClozeQuestions(pool.slice(0, 2), 10);
    expect(questions.length).toBeLessThanOrEqual(2);
  });

  it('each question has required fields', () => {
    const questions = generateClozeQuestions(pool, 3);
    for (const q of questions) {
      expect(q.vocabId).toBeDefined();
      expect(typeof q.sentence).toBe('string');
      expect(typeof q.blankSentence).toBe('string');
      expect(typeof q.correctAnswer).toBe('string');
      expect(typeof q.englishHint).toBe('string');
    }
  });

  it('blankSentence contains "______" and sentence does not', () => {
    const questions = generateClozeQuestions(pool, 6);
    for (const q of questions) {
      expect(q.blankSentence).toContain('______');
      expect(q.sentence).not.toContain('______');
    }
  });

  it('correctAnswer matches the vocab korean field', () => {
    const questions = generateClozeQuestions(pool, 6);
    for (const q of questions) {
      const match = pool.find((v) => v.id === q.vocabId);
      expect(match).toBeDefined();
      expect(q.correctAnswer).toBe(match!.korean);
    }
  });
});

// ─── generateListeningQuestions ───────────────────────────────────────────────

describe('generateListeningQuestions()', () => {
  it('returns up to the requested count', () => {
    const questions = generateListeningQuestions(pool, 4);
    expect(questions.length).toBeLessThanOrEqual(4);
    expect(questions.length).toBeGreaterThan(0);
  });

  it('each question has required fields', () => {
    const questions = generateListeningQuestions(pool, 4);
    for (const q of questions) {
      expect(q.vocabId).toBeDefined();
      expect(typeof q.audioText).toBe('string');
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBe(4);
    }
  });

  it('each question has exactly one correct option', () => {
    const questions = generateListeningQuestions(pool, 4);
    for (const q of questions) {
      const correctCount = q.options.filter((o) => o.isCorrect).length;
      expect(correctCount).toBe(1);
    }
  });

  it('the correct option text matches the audioText', () => {
    const questions = generateListeningQuestions(pool, 4);
    for (const q of questions) {
      const correct = q.options.find((o) => o.isCorrect);
      expect(correct).toBeDefined();
      expect(correct!.text).toBe(q.audioText);
    }
  });
});

// ─── getUnlockedVocab ─────────────────────────────────────────────────────────

describe('getUnlockedVocab()', () => {
  it('returns empty array when no lessons completed', () => {
    expect(getUnlockedVocab([])).toEqual([]);
  });

  it('returns vocab items for completed lessons', () => {
    const result = getUnlockedVocab(['les-001']);
    expect(result.length).toBeGreaterThan(0);
  });

  it('deduplicates vocab items shared across lessons', () => {
    // les-002 and les-003 both include voc-006
    const result = getUnlockedVocab(['les-002', 'les-003']);
    const ids = result.map((v) => v.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('returns unknown lesson IDs gracefully (no crash)', () => {
    expect(() => getUnlockedVocab(['les-999'])).not.toThrow();
  });
});
