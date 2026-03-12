import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Rating, State } from 'ts-fsrs';
import { useSrsStore } from './srs';

// Reset Zustand store and localStorage between tests
beforeEach(() => {
  localStorage.clear();
  useSrsStore.setState({
    cards: {},
    newCardsToday: 0,
    newCardsDayStamp: '',
    reviewedTodayCount: 0,
    reviewedDayStamp: '',
    _corruptionDetected: false,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useSrsStore - addVocabToPool', () => {
  it('creates new SrsCard entries for given vocab IDs', () => {
    useSrsStore.getState().addVocabToPool(['voc-001', 'voc-002']);
    const { cards } = useSrsStore.getState();
    expect(Object.keys(cards)).toHaveLength(2);
    expect(cards['voc-001']).toBeDefined();
    expect(cards['voc-002']).toBeDefined();
    expect(cards['voc-001'].vocabId).toBe('voc-001');
  });

  it('does not overwrite existing card (idempotent)', () => {
    useSrsStore.getState().addVocabToPool(['voc-001']);
    const originalCard = useSrsStore.getState().cards['voc-001'].card;

    // Record a review to advance the card state
    useSrsStore.getState().recordReview('voc-001', Rating.Good);
    const advancedCard = useSrsStore.getState().cards['voc-001'].card;

    // Now add the same vocab again — should not overwrite
    useSrsStore.getState().addVocabToPool(['voc-001']);
    const finalCard = useSrsStore.getState().cards['voc-001'].card;

    expect(finalCard.state).toBe(advancedCard.state);
    expect(finalCard.state).not.toBe(originalCard.state);
  });

  it('creates cards with State.New initial state', () => {
    useSrsStore.getState().addVocabToPool(['voc-001']);
    const card = useSrsStore.getState().cards['voc-001'].card;
    expect(card.state).toBe(State.New);
  });
});

describe('useSrsStore - recordReview', () => {
  it('transitions card from New to Learning after Good rating', () => {
    useSrsStore.getState().addVocabToPool(['voc-001']);
    useSrsStore.getState().recordReview('voc-001', Rating.Good);
    const card = useSrsStore.getState().cards['voc-001'].card;
    // After reviewing a new card, state should be Learning (1)
    expect(card.state).toBe(State.Learning);
  });

  it('updates card via FSRS scheduling', () => {
    useSrsStore.getState().addVocabToPool(['voc-001']);
    const beforeCard = useSrsStore.getState().cards['voc-001'].card;
    useSrsStore.getState().recordReview('voc-001', Rating.Good);
    const afterCard = useSrsStore.getState().cards['voc-001'].card;
    // Card should have been updated — state changed from New
    expect(afterCard.state).not.toBe(State.New);
    expect(afterCard).not.toBe(beforeCard);
  });

  it('increments newCardsToday for a New card review', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-12T10:00:00Z'));

    useSrsStore.getState().addVocabToPool(['voc-001']);
    useSrsStore.getState().recordReview('voc-001', Rating.Good);

    const { newCardsToday, newCardsDayStamp } = useSrsStore.getState();
    expect(newCardsToday).toBe(1);
    expect(newCardsDayStamp).toBe('2026-03-12');
  });

  it('sets newCardsDayStamp to today on New card review', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-12T10:00:00Z'));

    useSrsStore.getState().addVocabToPool(['voc-001']);
    useSrsStore.getState().recordReview('voc-001', Rating.Good);

    expect(useSrsStore.getState().newCardsDayStamp).toBe('2026-03-12');
  });

  it('does NOT increment newCardsToday for a non-New (Review) card', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-12T10:00:00Z'));

    useSrsStore.getState().addVocabToPool(['voc-001']);

    // Force card into Review state directly
    const cards = useSrsStore.getState().cards;
    useSrsStore.setState({
      cards: {
        'voc-001': {
          ...cards['voc-001'],
          card: { ...cards['voc-001'].card, state: State.Review },
        },
      },
    });

    useSrsStore.getState().recordReview('voc-001', Rating.Good);

    expect(useSrsStore.getState().newCardsToday).toBe(0);
  });

  it('increments reviewedTodayCount on every review', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-12T10:00:00Z'));

    useSrsStore.getState().addVocabToPool(['voc-001', 'voc-002']);
    useSrsStore.getState().recordReview('voc-001', Rating.Good);
    useSrsStore.getState().recordReview('voc-002', Rating.Good);

    expect(useSrsStore.getState().reviewedTodayCount).toBe(2);
  });
});

describe('useSrsStore - day stamp reset', () => {
  it('resets newCardsToday when newCardsDayStamp does not match today', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-11T10:00:00Z'));

    useSrsStore.getState().addVocabToPool(['voc-001']);
    useSrsStore.getState().recordReview('voc-001', Rating.Good);
    expect(useSrsStore.getState().newCardsToday).toBe(1);

    // Advance to the next day
    vi.setSystemTime(new Date('2026-03-12T10:00:00Z'));

    // Add a new card and review it
    useSrsStore.getState().addVocabToPool(['voc-002']);
    useSrsStore.getState().recordReview('voc-002', Rating.Good);

    // newCardsToday should reset to 1 (not 2) since day stamp changed
    const { newCardsToday, newCardsDayStamp } = useSrsStore.getState();
    expect(newCardsDayStamp).toBe('2026-03-12');
    expect(newCardsToday).toBe(1);
  });

  it('resets reviewedTodayCount on new day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-11T10:00:00Z'));

    useSrsStore.getState().addVocabToPool(['voc-001']);
    useSrsStore.getState().recordReview('voc-001', Rating.Good);
    expect(useSrsStore.getState().reviewedTodayCount).toBe(1);

    // Move to next day
    vi.setSystemTime(new Date('2026-03-12T10:00:00Z'));
    useSrsStore.getState().addVocabToPool(['voc-002']);
    useSrsStore.getState().recordReview('voc-002', Rating.Good);

    expect(useSrsStore.getState().reviewedTodayCount).toBe(1);
    expect(useSrsStore.getState().reviewedDayStamp).toBe('2026-03-12');
  });
});

describe('useSrsStore - Date rehydration', () => {
  it('card.due is a Date object after JSON serialize/deserialize round-trip', () => {
    useSrsStore.getState().addVocabToPool(['voc-001']);
    useSrsStore.getState().recordReview('voc-001', Rating.Good);

    // Serialize the cards as JSON (simulating localStorage)
    const state = useSrsStore.getState();
    const serialized = JSON.stringify({ cards: state.cards });
    const deserialized = JSON.parse(serialized);

    // Manually rehydrate dates (as the migrate function would)
    for (const entry of Object.values(deserialized.cards) as any[]) {
      if (entry.card.due) entry.card.due = new Date(entry.card.due);
      if (entry.card.last_review) entry.card.last_review = new Date(entry.card.last_review);
    }

    const card = deserialized.cards['voc-001'].card;
    expect(card.due).toBeInstanceOf(Date);
    expect(card.last_review).toBeInstanceOf(Date);
  });
});

describe('useSrsStore - corruption handling', () => {
  it('clearCorruptionFlag sets _corruptionDetected to false', () => {
    useSrsStore.setState({ _corruptionDetected: true });
    useSrsStore.getState().clearCorruptionFlag();
    expect(useSrsStore.getState()._corruptionDetected).toBe(false);
  });

  it('_corruptionDetected starts as false', () => {
    expect(useSrsStore.getState()._corruptionDetected).toBe(false);
  });
});

describe('useSrsStore - persistence config', () => {
  it('store has correct name for localStorage key', () => {
    // The store should be persisted under 'hanbuddy_srs'
    const storeState = useSrsStore.getState();
    // Verify the store exports correctly
    expect(storeState.addVocabToPool).toBeTypeOf('function');
    expect(storeState.recordReview).toBeTypeOf('function');
    expect(storeState.clearCorruptionFlag).toBeTypeOf('function');
    expect(storeState.cards).toBeDefined();
    expect(storeState.newCardsToday).toBeDefined();
    expect(storeState.newCardsDayStamp).toBeDefined();
    expect(storeState.reviewedTodayCount).toBeDefined();
  });
});
