import { useCallback, useState } from 'react';

interface RomanizationToggle {
  /** Toggle visibility of romanization for the given word ID. */
  toggle: (wordId: string) => void;
  /** Returns true if the romanization for the given word ID is currently revealed. */
  isRevealed: (wordId: string) => boolean;
  /** Hide all romanization (used when tapping elsewhere). */
  hideAll: () => void;
}

/**
 * Per-word romanization reveal toggle hook.
 *
 * Enforces the "hidden by default, reveal on tap" principle:
 * - Nothing is revealed initially.
 * - Only one word can be revealed at a time.
 * - Tapping the same word again hides it.
 * - Tapping a different word hides the previous one and reveals the new one.
 * - hideAll() hides everything (used for "tap elsewhere" dismissal).
 */
export function useRomanizationToggle(): RomanizationToggle {
  const [revealedWordId, setRevealedWordId] = useState<string | null>(null);

  const toggle = useCallback((wordId: string) => {
    setRevealedWordId((current) => (current === wordId ? null : wordId));
  }, []);

  const isRevealed = useCallback(
    (wordId: string) => revealedWordId === wordId,
    [revealedWordId]
  );

  const hideAll = useCallback(() => {
    setRevealedWordId(null);
  }, []);

  return { toggle, isRevealed, hideAll };
}
