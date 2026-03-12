import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SentenceTiles from './SentenceTiles';

const WORDS = ['저는', '학생이에요', '한국'];

describe('SentenceTiles', () => {
  it('renders all words in pool initially, none in placed', () => {
    render(<SentenceTiles words={WORDS} onComplete={vi.fn()} />);
    // All words should be visible in the pool
    for (const word of WORDS) {
      expect(screen.getAllByText(word).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('tapping a pool tile moves it to placed', () => {
    render(<SentenceTiles words={WORDS} onComplete={vi.fn()} />);
    // Click first tile in the pool
    const poolTiles = screen.getAllByRole('button', { name: /저는/ });
    fireEvent.click(poolTiles[0]);
    // The placed area should now have 저는
    const placedArea = screen.getByTestId('placed-area');
    expect(placedArea).toHaveTextContent('저는');
  });

  it('tapping a placed tile returns it to pool', () => {
    render(<SentenceTiles words={WORDS} onComplete={vi.fn()} />);
    // Move tile to placed
    const poolTile = screen.getAllByRole('button', { name: /저는/ })[0];
    fireEvent.click(poolTile);
    // Now click the placed tile
    const placedArea = screen.getByTestId('placed-area');
    const placedTile = placedArea.querySelector('button')!;
    fireEvent.click(placedTile);
    // placed area should be empty
    expect(placedArea).not.toHaveTextContent('저는');
  });

  it('check button is disabled until all tiles are placed', () => {
    render(<SentenceTiles words={WORDS} onComplete={vi.fn()} />);
    const checkBtn = screen.getByRole('button', { name: /check/i });
    expect(checkBtn).toBeDisabled();
    // Place all tiles
    for (const word of WORDS) {
      const btn = screen.getAllByRole('button', { name: new RegExp(word) })[0];
      fireEvent.click(btn);
    }
    expect(checkBtn).not.toBeDisabled();
  });

  it('calls onComplete with joined placed words when check is clicked', () => {
    const onComplete = vi.fn();
    render(<SentenceTiles words={['저는', '학생이에요']} onComplete={onComplete} />);
    // Place all tiles in order
    fireEvent.click(screen.getAllByRole('button', { name: /저는/ })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: /학생이에요/ })[0]);
    fireEvent.click(screen.getByRole('button', { name: /check/i }));
    expect(onComplete).toHaveBeenCalledWith('저는 학생이에요');
  });
});
