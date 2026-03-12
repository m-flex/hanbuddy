import { describe, it, expect } from 'vitest';
import { VOCAB } from '../data/vocab';
import { GRAMMAR } from '../data/grammar';
import { LESSONS } from '../data/lessons';
import { TOPICS } from '../data/topics';
import { DIALOGUES } from '../data/dialogues';

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

  // VOCAB-EX: At least 5 vocab items have non-empty examples arrays
  it('at least 5 vocab items have example sentences', () => {
    const withExamples = VOCAB.filter((v) => v.examples && v.examples.length > 0);
    expect(withExamples.length).toBeGreaterThanOrEqual(5);
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

  // GRAM-02: Every grammar point must have at least 3 example sentences
  it('every grammar point has at least 3 example sentences (GRAM-02)', () => {
    for (const point of GRAMMAR) {
      expect(point.examples.length).toBeGreaterThanOrEqual(3);
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

  // GRAM-05: Grammar content must cover both polite (해요체) and formal-high (합쇼체) speech levels
  it('contains at least one grammar point with speech_level "polite" (GRAM-05)', () => {
    const politePoints = GRAMMAR.filter((g) => g.speech_level === 'polite');
    expect(politePoints.length).toBeGreaterThanOrEqual(1);
  });

  it('contains at least one grammar point with speech_level "formal-high" (GRAM-05)', () => {
    const formalPoints = GRAMMAR.filter((g) => g.speech_level === 'formal-high');
    expect(formalPoints.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Lesson Data Integrity ───────────────────────────────────────────────────

describe('LESSONS data integrity', () => {
  it('has at least 5 lessons', () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(5);
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

  it('lessons span at least 2 distinct levels', () => {
    const levels = new Set(LESSONS.map((l) => l.level));
    expect(levels.size).toBeGreaterThanOrEqual(2);
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

// ─── TOPIK Level Coverage ─────────────────────────────────────────────────────

describe('VOCAB TOPIK level coverage (VOCAB-04)', () => {
  const VALID_TOPIK_LEVELS = new Set(['beginner', 'intermediate']);

  it('every vocab item has a valid topik_level', () => {
    for (const item of VOCAB) {
      expect(VALID_TOPIK_LEVELS).toContain(item.topik_level);
    }
  });
});

// ─── Vocab Examples Coverage ─────────────────────────────────────────────────

describe('VOCAB examples coverage (VOCAB-05)', () => {
  it('every vocab item has at least 2 example sentences', () => {
    for (const item of VOCAB) {
      expect(item.examples.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('every example sentence has non-empty korean, english, and romanization', () => {
    for (const item of VOCAB) {
      for (const ex of item.examples) {
        expect(ex.korean.trim()).not.toBe('');
        expect(ex.english.trim()).not.toBe('');
        expect(ex.romanization.trim()).not.toBe('');
      }
    }
  });
});

// ─── Dialogue Data Integrity ──────────────────────────────────────────────────

describe('DIALOGUES data integrity (LIST-03)', () => {
  it('has at least 3 dialogues', () => {
    expect(DIALOGUES.length).toBeGreaterThanOrEqual(3);
  });

  it('all dialogue IDs are unique', () => {
    const ids = DIALOGUES.map((d) => d.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('all dialogue IDs match /^dlg-\\d{3}$/', () => {
    for (const dialogue of DIALOGUES) {
      expect(dialogue.id).toMatch(/^dlg-\d{3}$/);
    }
  });

  it('each dialogue has 4-8 lines', () => {
    for (const dialogue of DIALOGUES) {
      expect(dialogue.lines.length).toBeGreaterThanOrEqual(4);
      expect(dialogue.lines.length).toBeLessThanOrEqual(8);
    }
  });

  it('each dialogue line has non-empty speaker, korean, english, and romanization', () => {
    for (const dialogue of DIALOGUES) {
      for (const line of dialogue.lines) {
        expect(line.speaker.trim()).not.toBe('');
        expect(line.korean.trim()).not.toBe('');
        expect(line.english.trim()).not.toBe('');
        expect(line.romanization.trim()).not.toBe('');
      }
    }
  });

  it("every dialogue's vocab_ids all exist in VOCAB", () => {
    const vocabIds = new Set(VOCAB.map((v) => v.id));
    for (const dialogue of DIALOGUES) {
      for (const vid of dialogue.vocab_ids) {
        expect(vocabIds).toContain(vid);
      }
    }
  });

  it("every dialogue's topics all exist in TOPICS", () => {
    const topicIds = new Set(TOPICS.map((t) => t.id));
    for (const dialogue of DIALOGUES) {
      for (const topicId of dialogue.topics) {
        expect(topicIds).toContain(topicId);
      }
    }
  });
});
