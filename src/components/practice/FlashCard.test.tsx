import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlashCard from './FlashCard';
import type { VocabItem } from '../../types/content';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock useRomanizationToggle
const mockToggle = vi.fn();
const mockIsRevealed = vi.fn(() => false);
const mockHideAll = vi.fn();

vi.mock('../../hooks/useRomanizationToggle', () => ({
  useRomanizationToggle: () => ({
    toggle: mockToggle,
    isRevealed: mockIsRevealed,
    hideAll: mockHideAll,
  }),
}));

// Mock AudioButton
vi.mock('../ui/AudioButton', () => ({
  AudioButton: ({ text }: { text: string }) => (
    <button aria-label="Play audio" data-text={text}>Audio</button>
  ),
}));

const mockVocab: VocabItem = {
  id: 'voc-001',
  korean: '안녕하세요',
  english: 'Hello (formal polite)',
  romanization: 'annyeonghaseyo',
  speech_level: 'polite',
  conjugation_type: 'expression',
  topik_level: 'beginner',
  topics: ['top-001'],
  examples: [
    {
      korean: '안녕하세요, 만나서 반갑습니다.',
      english: 'Hello, nice to meet you.',
      romanization: 'Annyeonghaseyo, mannaseo bangapseumnida.',
    },
  ],
};

const mockVocabIntermediate: VocabItem = {
  id: 'voc-002',
  korean: '감사합니다',
  english: 'Thank you',
  romanization: 'gamsahamnida',
  speech_level: 'formal-high',
  conjugation_type: 'expression',
  topik_level: 'intermediate',
  topics: ['top-001'],
  examples: [
    {
      korean: '도와줘서 감사합니다.',
      english: 'Thank you for helping me.',
      romanization: 'Dowajwoseo gamsahamnida.',
    },
  ],
};

function renderCard(props: { isFlipped?: boolean; onFlip?: () => void; vocab?: VocabItem }) {
  return render(
    <MemoryRouter>
      <FlashCard
        vocab={props.vocab ?? mockVocab}
        isFlipped={props.isFlipped ?? false}
        onFlip={props.onFlip ?? vi.fn()}
      />
    </MemoryRouter>
  );
}

describe('FlashCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsRevealed.mockReturnValue(false);
  });

  it('renders Korean word on front face', () => {
    renderCard({ isFlipped: false });
    // Korean word appears on both front (large) and back face (both faces render in DOM for 3D flip)
    const koreanElements = screen.getAllByText('안녕하세요');
    expect(koreanElements.length).toBeGreaterThanOrEqual(1);
  });

  it('does not show romanization by default (hidden)', () => {
    renderCard({ isFlipped: false });
    expect(screen.queryByText('annyeonghaseyo')).not.toBeInTheDocument();
  });

  it('shows romanization on front when isRevealed returns true', () => {
    mockIsRevealed.mockReturnValue(true);
    renderCard({ isFlipped: false });
    expect(screen.getByText('annyeonghaseyo')).toBeInTheDocument();
  });

  it('calls onFlip callback when card is clicked', () => {
    const onFlip = vi.fn();
    renderCard({ isFlipped: false, onFlip });
    const card = screen.getByRole('button', { name: /flip card/i });
    fireEvent.click(card);
    expect(onFlip).toHaveBeenCalledOnce();
  });

  it('renders English meaning on back face when flipped', () => {
    renderCard({ isFlipped: true });
    expect(screen.getByText('Hello (formal polite)')).toBeInTheDocument();
  });

  it('renders example sentence Korean on back face when flipped', () => {
    renderCard({ isFlipped: true });
    expect(screen.getByText('안녕하세요, 만나서 반갑습니다.')).toBeInTheDocument();
  });

  it('renders example sentence English on back face when flipped', () => {
    renderCard({ isFlipped: true });
    expect(screen.getByText('Hello, nice to meet you.')).toBeInTheDocument();
  });

  it('renders TOPIK badge with "Beginner" text for beginner level', () => {
    renderCard({ isFlipped: true, vocab: mockVocab });
    expect(screen.getByText('TOPIK I - Beginner')).toBeInTheDocument();
  });

  it('renders TOPIK badge with "Intermediate" text for intermediate level', () => {
    renderCard({ isFlipped: true, vocab: mockVocabIntermediate });
    expect(screen.getByText('TOPIK I - Intermediate')).toBeInTheDocument();
  });

  it('renders AudioButton on back face', () => {
    renderCard({ isFlipped: true });
    expect(screen.getByLabelText('Play audio')).toBeInTheDocument();
  });

  it('toggles romanization when romanization hint is tapped', () => {
    renderCard({ isFlipped: false });
    // There should be a tap-to-reveal romanization area
    const romanizationArea = screen.getByRole('button', { name: /show romanization/i });
    fireEvent.click(romanizationArea);
    expect(mockToggle).toHaveBeenCalledWith(mockVocab.id);
  });
});
