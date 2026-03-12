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
  {
    id: 'les-003',
    title: 'Copula: Is and Am',
    description:
      'Learn how to say "I am...", "This is...", and "It is..." in both polite (해요체) and formal (합쇼체) speech using the Korean copula 이에요/예요 and 입니다.',
    level: 1,
    order: 3,
    vocab_ids: ['voc-006', 'voc-018', 'voc-020'],
    grammar_ids: ['grm-005', 'grm-006'],
    topics: ['top-004'],
  },
  {
    id: 'les-004',
    title: 'Korean Numbers',
    description:
      'Master both counting systems in Korean: Sino-Korean numbers for dates, money, and phone numbers, and Native Korean numbers for counting objects, people, and ages.',
    level: 2,
    order: 1,
    vocab_ids: ['voc-011', 'voc-012', 'voc-013', 'voc-014', 'voc-019'],
    grammar_ids: ['grm-007', 'grm-008'],
    topics: ['top-002'],
  },
  {
    id: 'les-005',
    title: 'Ordering Food',
    description:
      'Learn how to navigate a Korean restaurant: read common food vocabulary, ask for the menu, find out prices, and make polite requests when ordering.',
    level: 2,
    order: 2,
    vocab_ids: ['voc-004', 'voc-005', 'voc-015', 'voc-016', 'voc-017', 'voc-018', 'voc-019'],
    grammar_ids: ['grm-003'],
    topics: ['top-003'],
  },
] satisfies Lesson[];
