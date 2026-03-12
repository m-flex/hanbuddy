import { State } from 'ts-fsrs';
import { useSrsStore } from '../store/srs';

export interface SrsSessionCard {
  vocabId: string;
}

export interface SrsSession {
  sessionQueue: SrsSessionCard[];
  dueCount: number;
  newCount: number;
  reviewedTodayCount: number;
  isEmpty: boolean;
}

export function useSrsSession(): SrsSession {
  const cards = useSrsStore((state) => state.cards);
  const newCardsToday = useSrsStore((state) => state.newCardsToday);
  const newCardsDayStamp = useSrsStore((state) => state.newCardsDayStamp);
  const reviewedTodayCount = useSrsStore((state) => state.reviewedTodayCount);

  const now = new Date();
  const todayStamp = now.toISOString().slice(0, 10);

  // Due cards: state is not New AND due <= now, sorted by due date ascending
  const dueCards = Object.values(cards)
    .filter((entry) => entry.card.state !== State.New && entry.card.due <= now)
    .sort((a, b) => a.card.due.getTime() - b.card.due.getTime());

  // New card slots available today
  const newCardsSoFar = newCardsDayStamp === todayStamp ? newCardsToday : 0;
  const newSlots = Math.max(0, 10 - newCardsSoFar);

  // New cards: state is New, capped by remaining slots
  const newCards = Object.values(cards)
    .filter((entry) => entry.card.state === State.New)
    .slice(0, newSlots);

  const sessionQueue: SrsSessionCard[] = [
    ...dueCards.map((e) => ({ vocabId: e.vocabId })),
    ...newCards.map((e) => ({ vocabId: e.vocabId })),
  ];

  return {
    sessionQueue,
    dueCount: dueCards.length,
    newCount: newCards.length,
    reviewedTodayCount,
    isEmpty: sessionQueue.length === 0,
  };
}
