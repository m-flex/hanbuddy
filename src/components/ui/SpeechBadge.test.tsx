import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpeechBadge } from './SpeechBadge';
import type { SpeechLevel } from '../../types/content';

describe('SpeechBadge', () => {
  it('renders correct Korean label for formal-high', () => {
    render(<SpeechBadge level="formal-high" />);
    expect(screen.getByText('합쇼체')).toBeInTheDocument();
  });

  it('renders correct Korean label for polite', () => {
    render(<SpeechBadge level="polite" />);
    expect(screen.getByText('해요체')).toBeInTheDocument();
  });

  it('renders correct Korean label for informal', () => {
    render(<SpeechBadge level="informal" />);
    expect(screen.getByText('반말')).toBeInTheDocument();
  });

  it('renders correct Korean label for plain', () => {
    render(<SpeechBadge level="plain" />);
    expect(screen.getByText('기본형')).toBeInTheDocument();
  });

  it('applies blue color classes for formal-high', () => {
    const { container } = render(<SpeechBadge level="formal-high" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-blue-100');
    expect(badge.className).toContain('text-blue-800');
  });

  it('applies green color classes for polite', () => {
    const { container } = render(<SpeechBadge level="polite" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-green-100');
    expect(badge.className).toContain('text-green-800');
  });

  it('applies yellow color classes for informal', () => {
    const { container } = render(<SpeechBadge level="informal" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-yellow-100');
    expect(badge.className).toContain('text-yellow-800');
  });

  it('applies gray color classes for plain', () => {
    const { container } = render(<SpeechBadge level="plain" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('bg-gray-100');
    expect(badge.className).toContain('text-gray-600');
  });

  it('all speech levels render without error', () => {
    const levels: SpeechLevel[] = ['formal-high', 'polite', 'informal', 'plain'];
    for (const level of levels) {
      expect(() => render(<SpeechBadge level={level} />)).not.toThrow();
    }
  });
});
