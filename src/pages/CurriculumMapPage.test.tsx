import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CurriculumMapPage from './CurriculumMapPage';

// Mock useProgressStore
const mockCompletedLessons: string[] = [];
vi.mock('../store/progress', () => ({
  useProgressStore: (selector: (s: { completedLessons: string[] }) => unknown) =>
    selector({ completedLessons: mockCompletedLessons }),
}));

// Mock LESSONS data
vi.mock('../data/lessons', () => ({
  LESSONS: [
    { id: 'les-001', title: 'Greetings', level: 1, order: 1, vocab_ids: [], grammar_ids: [], topics: [], description: '' },
    { id: 'les-002', title: 'Basic Particles', level: 1, order: 2, vocab_ids: [], grammar_ids: [], topics: [], description: '' },
    { id: 'les-003', title: 'Copula', level: 2, order: 1, vocab_ids: [], grammar_ids: [], topics: [], description: '' },
  ],
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage() {
  return render(
    <MemoryRouter>
      <CurriculumMapPage />
    </MemoryRouter>
  );
}

describe('CurriculumMapPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    // Reset completedLessons to empty for each test
    mockCompletedLessons.length = 0;
  });

  it('renders current node with play icon for first unlocked lesson when no progress', () => {
    renderPage();
    // les-001 is the first lesson and always unlocked — it should be "current"
    const greetingsNode = screen.getByText('Greetings');
    expect(greetingsNode).toBeDefined();
    // The play-icon should be present (aria-label or test-id)
    const playIcon = document.querySelector('[data-testid="node-current"]');
    expect(playIcon).not.toBeNull();
  });

  it('renders locked node with lock icon for locked lessons', () => {
    renderPage();
    // les-002 and les-003 should be locked with no completed lessons
    const lockIcons = document.querySelectorAll('[data-testid="node-locked"]');
    expect(lockIcons.length).toBeGreaterThan(0);
  });

  it('renders completed node with checkmark for completed lesson', () => {
    // Simulate les-001 completed
    mockCompletedLessons.push('les-001');
    renderPage();
    const checkIcon = document.querySelector('[data-testid="node-completed"]');
    expect(checkIcon).not.toBeNull();
  });

  it('navigates to lesson on current node tap', () => {
    renderPage();
    // Find and click the Greetings node (it's current)
    const greetingsButton = screen.getByRole('button', { name: /Greetings/i });
    fireEvent.click(greetingsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/lessons/les-001');
  });

  it('shows toast on locked node tap', () => {
    renderPage();
    // les-002 is locked — tap it
    const lockedButton = screen.getByRole('button', { name: /Basic Particles/i });
    fireEvent.click(lockedButton);
    // Toast should appear
    expect(screen.getByText(/complete previous lessons to unlock/i)).toBeDefined();
  });

  it('does not navigate on locked node tap', () => {
    renderPage();
    const lockedButton = screen.getByRole('button', { name: /Basic Particles/i });
    fireEvent.click(lockedButton);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
