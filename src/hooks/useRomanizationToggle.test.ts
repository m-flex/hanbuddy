import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useRomanizationToggle } from './useRomanizationToggle';

describe('useRomanizationToggle', () => {
  it('defaults to hidden — isRevealed returns false for any id', () => {
    const { result } = renderHook(() => useRomanizationToggle());
    expect(result.current.isRevealed('voc-001')).toBe(false);
    expect(result.current.isRevealed('any-id')).toBe(false);
  });

  it('toggle reveals a word', () => {
    const { result } = renderHook(() => useRomanizationToggle());
    act(() => {
      result.current.toggle('voc-001');
    });
    expect(result.current.isRevealed('voc-001')).toBe(true);
  });

  it('toggle twice hides the word again', () => {
    const { result } = renderHook(() => useRomanizationToggle());
    act(() => {
      result.current.toggle('voc-001');
    });
    act(() => {
      result.current.toggle('voc-001');
    });
    expect(result.current.isRevealed('voc-001')).toBe(false);
  });

  it('revealing voc-002 hides previously revealed voc-001 (exclusive reveal)', () => {
    const { result } = renderHook(() => useRomanizationToggle());
    act(() => {
      result.current.toggle('voc-001');
    });
    act(() => {
      result.current.toggle('voc-002');
    });
    expect(result.current.isRevealed('voc-001')).toBe(false);
    expect(result.current.isRevealed('voc-002')).toBe(true);
  });

  it('hideAll hides everything', () => {
    const { result } = renderHook(() => useRomanizationToggle());
    act(() => {
      result.current.toggle('voc-001');
    });
    act(() => {
      result.current.hideAll();
    });
    expect(result.current.isRevealed('voc-001')).toBe(false);
  });
});
