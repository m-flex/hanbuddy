import { describe, it, expect } from 'vitest';
import { VOCAB } from '../data/vocab';
import { GRAMMAR } from '../data/grammar';
import { LESSONS } from '../data/lessons';
import { TOPICS } from '../data/topics';

const VALID_SPEECH_LEVELS = new Set(['formal-high', 'polite', 'informal', 'plain']);
const VALID_CONJUGATION_TYPES = new Set(['action', 'descriptive', 'noun', 'particle', 'expression']);

// ─── Vocab Data Integrity ───────────────────────────────────────────────────

describe('VOCAB data integrity', () => {
  it('has at least one entry', () => {
    expect(VOCAB.length).toBeGreaterThan(0);
  });

  it('all IDs are unique', () => {
    const ids = VOCAB.map((v) => v.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('all IDs match /^voc-\\d{3}$/', () => {
    for (const item of VOCAB) {
      expect(item.id).toMatch(/^voc-\d{3}$/);
    }
  });

  it('every item has non-empty korean, english, and romanization', () => {
    for (const item of VOCAB) {
      expect(item.korean.trim()).not.toBe('');
      expect(item.english.trim()).not.toBe('');
      expect(item.romanization.trim()).not.toBe('');
    }
  });

  it('every item has a valid speech_level', () => {
    for (const item of VOCAB) {
      expect(VALID_SPEECH_LEVELS).toContain(item.speech_level);
    }
  });

  it('every item has a valid conjugation_type', () => {
    for (const item of VOCAB) {
      expect(VALID_CONJUGATION_TYPES).toContain(item.conjugation_type);
    }
  });

  it('every item topics array contains valid top-NNN references that exist in TOPICS', () => {
    const topicIds = new Set(TOPICS.map((t) => t.id));
    for (const item of VOCAB) {
      for (const topicId of item.topics) {
        expect(topicIds).toContain(topicId);
      }
    }
  });
});

// ─── Grammar Data Integrity ──────────────────────────────────────────────────

describe('GRAMMAR data integrity', () => {
  it('has at least one entry', () => {
    expect(GRAMMAR.length).toBeGreaterThan(0);
  });

  it('all IDs are unique', () => {
    const ids = GRAMMAR.map((g) => g.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('all IDs match /^grm-\\d{3}$/', () => {
    for (const point of GRAMMAR) {
      expect(point.id).toMatch(/^grm-\d{3}$/);
    }
  });

  it('every grammar point has at least 1 example sentence', () => {
    for (const point of GRAMMAR) {
      expect(point.examples.length).toBeGreaterThan(0);
    }
  });

  it('every example has non-empty korean and english', () => {
    for (const point of GRAMMAR) {
      for (const ex of point.examples) {
        expect(ex.korean.trim()).not.toBe('');
        expect(ex.english.trim()).not.toBe('');
      }
    }
  });
});

// ─── Lesson Data Integrity ───────────────────────────────────────────────────

describe('LESSONS data integrity', () => {
  it('has at least one entry', () => {
    expect(LESSONS.length).toBeGreaterThan(0);
  });

  it('all IDs are unique', () => {
    const ids = LESSONS.map((l) => l.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('all IDs match /^les-\\d{3}$/', () => {
    for (const lesson of LESSONS) {
      expect(lesson.id).toMatch(/^les-\d{3}$/);
    }
  });

  it("every lesson's vocab_ids all exist in VOCAB", () => {
    const vocabIds = new Set(VOCAB.map((v) => v.id));
    for (const lesson of LESSONS) {
      for (const vid of lesson.vocab_ids) {
        expect(vocabIds).toContain(vid);
      }
    }
  });

  it("every lesson's grammar_ids all exist in GRAMMAR", () => {
    const grammarIds = new Set(GRAMMAR.map((g) => g.id));
    for (const lesson of LESSONS) {
      for (const gid of lesson.grammar_ids) {
        expect(grammarIds).toContain(gid);
      }
    }
  });
});

// ─── Cross-Collection Uniqueness ─────────────────────────────────────────────

describe('cross-collection ID uniqueness', () => {
  it('no ID appears in more than one collection', () => {
    const vocabIds = VOCAB.map((v) => v.id);
    const grammarIds = GRAMMAR.map((g) => g.id);
    const lessonIds = LESSONS.map((l) => l.id);
    const topicIds = TOPICS.map((t) => t.id);

    const allIds = [...vocabIds, ...grammarIds, ...lessonIds, ...topicIds];
    const uniqueIds = new Set(allIds);

    expect(allIds.length).toBe(uniqueIds.size);
  });
});
