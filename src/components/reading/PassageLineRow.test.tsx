import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PassageLineRow } from './PassageLineRow';
import type { PassageLine } from '../../types/content';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const TEST_LINE: PassageLine = {
  korean: '저는 시장에 가요.',
  english: 'I go to the market.',
  tokens: [
    { text: '저는', gloss: { english: 'I (topic)', romanization: 'jeoneun' } },
    { text: ' ' },
    { text: '시장에', gloss: { english: 'to the market', romanization: 'sijange' } },
    { text: ' ' },
    { text: '가요', gloss: { english: 'go', romanization: 'gayo' } },
    { text: '.' },
  ],
};

const LINE_WITH_NO_GLOSS: PassageLine = {
  korean: '안녕.',
  english: 'Hello.',
  tokens: [{ text: '안녕' }, { text: '.' }],
};

function renderRow(props?: {
  line?: PassageLine;
  lineIndex?: number;
  passageId?: string;
  isPlaying?: boolean;
  activeGlossKey?: string | null;
  onGlossTap?: (key: string) => void;
  onGlossDismiss?: () => void;
  onAudioTap?: () => void;
}) {
  const merged = {
    line: TEST_LINE,
    lineIndex: 0,
    passageId: 'rdg-001',
    isPlaying: false,
    activeGlossKey: null,
    onGlossTap: vi.fn(),
    onGlossDismiss: vi.fn(),
    onAudioTap: vi.fn(),
    ...props,
  };
  return render(<PassageLineRow {...merged} />);
}

describe('PassageLineRow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all token text content', () => {
    renderRow();
    expect(screen.getByText('저는')).toBeInTheDocument();
    expect(screen.getByText('시장에')).toBeInTheDocument();
    expect(screen.getByText('가요')).toBeInTheDocument();
  });

  it('glossable token tap calls onGlossTap with correct key', () => {
    const onGlossTap = vi.fn();
    renderRow({ onGlossTap });
    // Tap first glossable token '저는' — index 0 in tokens
    const glossBtn = screen.getAllByRole('button').find((btn) => btn.textContent === '저는');
    expect(glossBtn).toBeDefined();
    fireEvent.click(glossBtn!);
    expect(onGlossTap).toHaveBeenCalledWith('rdg-001-0-0');
  });

  it('shows GlossPopup with english and romanization when activeGlossKey matches', () => {
    renderRow({ activeGlossKey: 'rdg-001-0-0' });
    expect(screen.getByText('I (topic)')).toBeInTheDocument();
    expect(screen.getByText('jeoneun')).toBeInTheDocument();
  });

  it('does not show GlossPopup when activeGlossKey does not match', () => {
    renderRow({ activeGlossKey: null });
    expect(screen.queryByText('I (topic)')).not.toBeInTheDocument();
  });

  it('"Show translation" button reveals English text', () => {
    renderRow();
    expect(screen.queryByText('I go to the market.')).not.toBeInTheDocument();
    const showBtn = screen.getByRole('button', { name: /show translation/i });
    fireEvent.click(showBtn);
    expect(screen.getByText('I go to the market.')).toBeInTheDocument();
  });

  it('audio tap area calls onAudioTap', () => {
    const onAudioTap = vi.fn();
    renderRow({ onAudioTap });
    const audioBtn = screen.getByRole('button', { name: /play audio/i });
    fireEvent.click(audioBtn);
    expect(onAudioTap).toHaveBeenCalledOnce();
  });

  it('highlights line with blue background when isPlaying', () => {
    const { container } = renderRow({ isPlaying: true });
    // The outer container should have blue background class when playing
    expect(container.firstChild).toBeDefined();
    // Check that the row element has bg-blue-50 class
    const row = container.querySelector('.bg-blue-50');
    expect(row).toBeTruthy();
  });

  it('non-glossable token renders as plain text (not a button)', () => {
    renderRow({ line: LINE_WITH_NO_GLOSS });
    // The period has no gloss — not a button
    const buttons = screen.queryAllByRole('button');
    // Only audio tap and show translation buttons
    const glossButtons = buttons.filter(
      (btn) => btn.textContent === '안녕' || btn.textContent === '.'
    );
    expect(glossButtons).toHaveLength(0);
  });
});
