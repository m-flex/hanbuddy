import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createEmptyCard, fsrs, Rating, State, type Card } from 'ts-fsrs';

export interface SrsCard {
  vocabId: string;
  card: Card;
}

interface SrsStoreState {
  cards: Record<string, SrsCard>;
  newCardsToday: number;
  newCardsDayStamp: string;
  reviewedTodayCount: number;
  reviewedDayStamp: string;
  _corruptionDetected: boolean;
  addVocabToPool: (vocabIds: string[]) => void;
  recordReview: (vocabId: string, rating: Rating) => void;
  clearCorruptionFlag: () => void;
}

function rehydrateDates(cards: Record<string, SrsCard>): Record<string, SrsCard> {
  const result: Record<string, SrsCard> = {};
  for (const [id, entry] of Object.entries(cards)) {
    result[id] = {
      ...entry,
      card: {
        ...entry.card,
        due: entry.card.due ? new Date(entry.card.due) : new Date(),
        last_review: entry.card.last_review ? new Date(entry.card.last_review) : undefined,
      } as Card,
    };
  }
  return result;
}

export const useSrsStore = create<SrsStoreState>()(
  persist(
    (set, get) => ({
      cards: {},
      newCardsToday: 0,
      newCardsDayStamp: '',
      reviewedTodayCount: 0,
      reviewedDayStamp: '',
      _corruptionDetected: false,

      addVocabToPool: (vocabIds: string[]) =>
        set((state) => {
          const additions: Record<string, SrsCard> = {};
          for (const id of vocabIds) {
            if (!state.cards[id]) {
              additions[id] = { vocabId: id, card: createEmptyCard() };
            }
          }
          if (Object.keys(additions).length === 0) return state;
          return { cards: { ...state.cards, ...additions } };
        }),

      recordReview: (vocabId: string, rating: Rating) =>
        set((state) => {
          const entry = state.cards[vocabId];
          if (!entry) return state;

          const f = fsrs();
          const now = new Date();
          const scheduling = f.repeat(entry.card, now);
          const nextCard = scheduling[rating].card;

          const today = now.toISOString().slice(0, 10);
          const wasNew = entry.card.state === State.New;

          // Compute new daily new card count
          let newCardsToday: number;
          let newCardsDayStamp: string;
          if (wasNew) {
            if (state.newCardsDayStamp === today) {
              newCardsToday = state.newCardsToday + 1;
            } else {
              newCardsToday = 1;
            }
            newCardsDayStamp = today;
          } else {
            newCardsToday = state.newCardsToday;
            newCardsDayStamp = state.newCardsDayStamp;
          }

          // Compute new reviewed count
          const reviewedTodayCount =
            state.reviewedDayStamp === today ? state.reviewedTodayCount + 1 : 1;
          const reviewedDayStamp = today;

          return {
            cards: { ...state.cards, [vocabId]: { ...entry, card: nextCard } },
            newCardsToday,
            newCardsDayStamp,
            reviewedTodayCount,
            reviewedDayStamp,
          };
        }),

      clearCorruptionFlag: () => set({ _corruptionDetected: false }),
    }),
    {
      name: 'hanbuddy_srs',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cards: state.cards,
        newCardsToday: state.newCardsToday,
        newCardsDayStamp: state.newCardsDayStamp,
        reviewedTodayCount: state.reviewedTodayCount,
        reviewedDayStamp: state.reviewedDayStamp,
      }),
      migrate: (persistedState, storedVersion) => {
        if (storedVersion < 1) {
          return {
            cards: {},
            newCardsToday: 0,
            newCardsDayStamp: '',
            reviewedTodayCount: 0,
            reviewedDayStamp: '',
          };
        }
        // Version 1: rehydrate Date objects (JSON serializes Date as string)
        const state = persistedState as {
          cards: Record<string, SrsCard>;
          newCardsToday: number;
          newCardsDayStamp: string;
          reviewedTodayCount: number;
          reviewedDayStamp: string;
        };
        return {
          ...state,
          cards: rehydrateDates(state.cards ?? {}),
        };
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('hanbuddy_srs corrupted, resetting', error);
          localStorage.removeItem('hanbuddy_srs');
          useSrsStore.setState({ _corruptionDetected: true, cards: {} });
        }
      },
    }
  )
);
