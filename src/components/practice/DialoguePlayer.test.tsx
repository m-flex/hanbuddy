import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DialoguePlayer from './DialoguePlayer';
import type { Dialogue } from '../../types/content';

// Mock AudioButton to avoid TTS calls in tests
vi.mock('../ui/AudioButton', () => ({
  AudioButton: ({ text }: { text: string }) => (
    <button aria-label="Play audio" data-testid="audio-btn" data-text={text}>
      Audio
    </button>
  ),
}));

const TEST_DIALOGUE: Dialogue = {
  id: 'dlg-001',
  title: 'Test Dialogue',
  description: 'A test dialogue',
  topics: ['top-001'],
  vocab_ids: [],
  lines: [
    {
      speaker: 'Person A',
      korean: '안녕하세요',
      english: 'Hello',
      romanization: 'Annyeonghaseyo',
    },
    {
      speaker: 'Person B',
      korean: '안녕히 가세요',
      english: 'Goodbye',
      romanization: 'Annyeonghi gaseyo',
    },
    {
      speaker: 'Person A',
      korean: '감사합니다',
      english: 'Thank you',
      romanization: 'Gamsahamnida',
    },
  ],
};

describe('DialoguePlayer', () => {
  it('renders all dialogue lines with speaker names', () => {
    render(<DialoguePlayer dialogue={TEST_DIALOGUE} />);
    // Check speaker names visible (Person A appears twice, Person B once)
    expect(screen.getAllByText('Person A')).toHaveLength(2);
    expect(screen.getByText('Person B')).toBeDefined();
  });

  it('renders Korean text for each line', () => {
    render(<DialoguePlayer dialogue={TEST_DIALOGUE} />);
    expect(screen.getByText('안녕하세요')).toBeDefined();
    expect(screen.getByText('안녕히 가세요')).toBeDefined();
    expect(screen.getByText('감사합니다')).toBeDefined();
  });

  it('renders English translations for each line', () => {
    render(<DialoguePlayer dialogue={TEST_DIALOGUE} />);
    expect(screen.getByText('Hello')).toBeDefined();
    expect(screen.getByText('Goodbye')).toBeDefined();
    expect(screen.getByText('Thank you')).toBeDefined();
  });

  it('renders an AudioButton for each dialogue line', () => {
    render(<DialoguePlayer dialogue={TEST_DIALOGUE} />);
    const audioBtns = screen.getAllByTestId('audio-btn');
    expect(audioBtns).toHaveLength(TEST_DIALOGUE.lines.length);
  });

  it('renders romanization for each line', () => {
    render(<DialoguePlayer dialogue={TEST_DIALOGUE} />);
    expect(screen.getByText('Annyeonghaseyo')).toBeDefined();
    expect(screen.getByText('Annyeonghi gaseyo')).toBeDefined();
  });
});
