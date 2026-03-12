import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useGlossToggle } from './useGlossToggle';

describe('useGlossToggle', () => {
  it('defaults to hidden — isRevealed returns false for any key', () => {
    const { result } = renderHook(() => useGlossToggle());
    expect(result.current.isRevealed('rdg-001-0-0')).toBe(false);
    expect(result.current.isRevealed('rdg-001-1-2')).toBe(false);
  });

  it('toggle(key) reveals that key, isRevealed(key) returns true', () => {
    const { result } = renderHook(() => useGlossToggle());
    act(() => {
      result.current.toggle('rdg-001-0-0');
    });
    expect(result.current.isRevealed('rdg-001-0-0')).toBe(true);
  });

  it('toggling a different key hides the previous one (only one at a time)', () => {
    const { result } = renderHook(() => useGlossToggle());
    act(() => {
      result.current.toggle('rdg-001-0-0');
    });
    act(() => {
      result.current.toggle('rdg-001-0-1');
    });
    expect(result.current.isRevealed('rdg-001-0-0')).toBe(false);
    expect(result.current.isRevealed('rdg-001-0-1')).toBe(true);
  });

  it('toggle(sameKey) hides it (toggle off)', () => {
    const { result } = renderHook(() => useGlossToggle());
    act(() => {
      result.current.toggle('rdg-001-0-0');
    });
    act(() => {
      result.current.toggle('rdg-001-0-0');
    });
    expect(result.current.isRevealed('rdg-001-0-0')).toBe(false);
  });

  it('hideAll() clears all revealed state', () => {
    const { result } = renderHook(() => useGlossToggle());
    act(() => {
      result.current.toggle('rdg-001-1-2');
    });
    act(() => {
      result.current.hideAll();
    });
    expect(result.current.isRevealed('rdg-001-1-2')).toBe(false);
  });

  it('isRevealed returns false for other keys when one is toggled', () => {
    const { result } = renderHook(() => useGlossToggle());
    act(() => {
      result.current.toggle('rdg-001-0-0');
    });
    expect(result.current.isRevealed('rdg-001-0-1')).toBe(false);
    expect(result.current.isRevealed('rdg-002-0-0')).toBe(false);
  });
});
