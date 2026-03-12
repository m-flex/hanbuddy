import { useCallback, useState } from 'react';

interface GlossToggle {
  /** Toggle gloss visibility for the given key. Key format: `${passageId}-${lineIndex}-${tokenIndex}` */
  toggle: (key: string) => void;
  /** Returns true if the gloss for the given key is currently revealed. */
  isRevealed: (key: string) => boolean;
  /** Hide all glosses (used when tapping elsewhere). */
  hideAll: () => void;
}

/**
 * Per-word gloss reveal toggle hook for reading passages.
 *
 * Enforces the "hidden by default, reveal on tap" principle:
 * - Nothing is revealed initially.
 * - Only one gloss can be revealed at a time.
 * - Tapping the same word again hides it.
 * - Tapping a different word hides the previous one and reveals the new one.
 * - hideAll() hides everything (used for "tap elsewhere" dismissal).
 *
 * Key format: `${passageId}-${lineIndex}-${tokenIndex}`
 */
export function useGlossToggle(): GlossToggle {
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  const toggle = useCallback((key: string) => {
    setRevealedKey((current) => (current === key ? null : key));
  }, []);

  const isRevealed = useCallback(
    (key: string) => revealedKey === key,
    [revealedKey]
  );

  const hideAll = useCallback(() => {
    setRevealedKey(null);
  }, []);

  return { toggle, isRevealed, hideAll };
}
