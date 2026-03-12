import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { WelcomeCard } from './WelcomeCard';

// Mock the progress store
const mockUseProgressStore = vi.fn();
vi.mock('../../store/progress', () => ({
  useProgressStore: (selector: (state: { completedLessons: string[] }) => unknown) =>
    mockUseProgressStore(selector),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderCard() {
  return render(
    <MemoryRouter>
      <WelcomeCard />
    </MemoryRouter>
  );
}

describe('WelcomeCard', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders welcome text when completedLessons is empty', () => {
    mockUseProgressStore.mockImplementation(
      (selector: (state: { completedLessons: string[] }) => unknown) =>
        selector({ completedLessons: [] })
    );
    renderCard();
    expect(screen.getByText(/Welcome to Hanbuddy/i)).toBeInTheDocument();
  });

  it('renders "Start Learning" button when completedLessons is empty', () => {
    mockUseProgressStore.mockImplementation(
      (selector: (state: { completedLessons: string[] }) => unknown) =>
        selector({ completedLessons: [] })
    );
    renderCard();
    expect(screen.getByRole('button', { name: /start learning/i })).toBeInTheDocument();
  });

  it('does not render when completedLessons has at least one entry', () => {
    mockUseProgressStore.mockImplementation(
      (selector: (state: { completedLessons: string[] }) => unknown) =>
        selector({ completedLessons: ['les-1'] })
    );
    const { container } = renderCard();
    expect(container.firstChild).toBeNull();
  });

  it('"Start Learning" button navigates to /lessons/les-001', async () => {
    mockUseProgressStore.mockImplementation(
      (selector: (state: { completedLessons: string[] }) => unknown) =>
        selector({ completedLessons: [] })
    );
    renderCard();
    const button = screen.getByRole('button', { name: /start learning/i });
    await userEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/lessons/les-001');
  });
});
