import type { Lesson } from '../types/content';

export const LESSONS = [
  {
    id: 'les-001',
    title: 'Greetings',
    description:
      'Learn essential Korean greetings and polite expressions for everyday interactions.',
    level: 1,
    order: 1,
    vocab_ids: ['voc-001', 'voc-002', 'voc-003', 'voc-009', 'voc-010'],
    grammar_ids: [],
    topics: ['top-001'],
  },
  {
    id: 'les-002',
    title: 'Basic Particles',
    description:
      'Understand how Korean particles mark the role of nouns in a sentence — topic, subject, and object.',
    level: 1,
    order: 2,
    vocab_ids: ['voc-004', 'voc-005', 'voc-006'],
    grammar_ids: ['grm-001', 'grm-002', 'grm-003'],
    topics: ['top-004'],
  },
] satisfies Lesson[];
