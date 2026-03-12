import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopicListPage from './TopicListPage';

// Mock data modules
vi.mock('../data/topics', () => ({
  TOPICS: [
    { id: 'top-001', name: 'Greetings', description: 'Hello and goodbye.', icon: 'Hand' },
    { id: 'top-002', name: 'Numbers', description: 'Counting in Korean.', icon: 'Hash' },
    { id: 'top-003', name: 'Empty Topic', description: 'No content here.', icon: undefined },
  ],
}));

vi.mock('../data/lessons', () => ({
  LESSONS: [
    {
      id: 'les-001',
      title: 'Lesson A',
      description: 'First lesson',
      level: 1,
      order: 1,
      vocab_ids: [],
      grammar_ids: [],
      topics: ['top-001'],
    },
    {
      id: 'les-002',
      title: 'Lesson B',
      description: 'Second lesson',
      level: 1,
      order: 2,
      vocab_ids: [],
      grammar_ids: [],
      topics: ['top-001'],
    },
  ],
}));

vi.mock('../data/vocab', () => ({
  VOCAB: [
    {
      id: 'voc-001',
      korean: '안녕',
      english: 'Hi',
      romanization: 'annyeong',
      speech_level: 'informal',
      conjugation_type: 'expression',
      topics: ['top-001'],
    },
    {
      id: 'voc-002',
      korean: '하나',
      english: 'One',
      romanization: 'hana',
      speech_level: 'plain',
      conjugation_type: 'noun',
      topics: ['top-002'],
    },
    {
      id: 'voc-003',
      korean: '둘',
      english: 'Two',
      romanization: 'dul',
      speech_level: 'plain',
      conjugation_type: 'noun',
      topics: ['top-002'],
    },
    {
      id: 'voc-004',
      korean: '셋',
      english: 'Three',
      romanization: 'set',
      speech_level: 'plain',
      conjugation_type: 'noun',
      topics: ['top-002'],
    },
  ],
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <TopicListPage />
    </MemoryRouter>
  );
}

describe('TopicListPage', () => {
  it('renders a card for a topic that has lessons', () => {
    renderPage();
    expect(screen.getByText('Greetings')).toBeInTheDocument();
  });

  it('renders a card for a topic that has only vocab', () => {
    renderPage();
    expect(screen.getByText('Numbers')).toBeInTheDocument();
  });

  it('does NOT render a card for an empty topic', () => {
    renderPage();
    expect(screen.queryByText('Empty Topic')).not.toBeInTheDocument();
  });

  it('shows the correct lesson count for a topic', () => {
    renderPage();
    // Greetings has 2 lessons
    expect(screen.getByText('2 lessons, 1 vocab')).toBeInTheDocument();
  });

  it('shows the correct vocab count for a topic', () => {
    renderPage();
    // Numbers has 0 lessons, 3 vocab
    expect(screen.getByText('0 lessons, 3 vocab')).toBeInTheDocument();
  });

  it('each topic card links to the correct topic detail route', () => {
    renderPage();
    const greetingsLink = screen.getByRole('link', { name: /greetings/i });
    expect(greetingsLink).toHaveAttribute('href', '/topics/top-001');

    const numbersLink = screen.getByRole('link', { name: /numbers/i });
    expect(numbersLink).toHaveAttribute('href', '/topics/top-002');
  });
});
