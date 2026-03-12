import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { Rating } from 'ts-fsrs';

import { useSrsStore } from '../store/srs';
import { useSrsSession } from '../hooks/useSrsSession';
import { useProgressStore } from '../store/progress';
import { LESSONS } from '../data/lessons';
import { VOCAB } from '../data/vocab';
import { speak } from '../utils/audio';

import ExerciseProgress from '../components/practice/ExerciseProgress';
import FlashCard from '../components/practice/FlashCard';
import RatingButtons from '../components/practice/RatingButtons';

export default function FlashcardReviewPage() {
  const addVocabToPool = useSrsStore((s) => s.addVocabToPool);
  const recordReview = useSrsStore((s) => s.recordReview);
  const cards = useSrsStore((s) => s.cards);
  const { sessionQueue, reviewedTodayCount, isEmpty } = useSrsSession();

  const completedLessons = useProgressStore((s) => s.completedLessons);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionTotal, setSessionTotal] = useState(0);

  // Auto-populate SRS pool on mount from completed lessons
  useEffect(() => {
    const allVocabIds: string[] = [];
    for (const lessonId of completedLessons) {
      const lesson = LESSONS.find((l) => l.id === lessonId);
      if (lesson) {
        for (const vocabId of lesson.vocab_ids) {
          if (!allVocabIds.includes(vocabId)) {
            allVocabIds.push(vocabId);
          }
        }
      }
    }
    if (allVocabIds.length > 0) {
      addVocabToPool(allVocabIds);
    }
  }, [completedLessons, addVocabToPool]);

  // Capture total session count when session starts
  useEffect(() => {
    if (!sessionStarted && sessionQueue.length > 0) {
      setSessionTotal(sessionQueue.length);
      setSessionStarted(true);
    }
  }, [sessionQueue.length, sessionStarted]);

  const currentCard = sessionQueue[currentIndex];
  const currentVocab = currentCard ? VOCAB.find((v) => v.id === currentCard.vocabId) : null;

  // Determine next review time from SRS cards
  const now = new Date();
  const futureCards = Object.values(cards).filter((c) => c.card.due > now);
  const nextDue =
    futureCards.length > 0
      ? futureCards.reduce((min, c) => (c.card.due < min ? c.card.due : min), futureCards[0].card.due)
      : null;

  function formatNextReview(date: Date): string {
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }

  function handleFlip() {
    if (!isFlipped && currentVocab) {
      setIsFlipped(true);
      // Speak on flip — must be synchronous from user gesture (Pitfall 5)
      speak(currentVocab.korean).catch(() => {
        // Audio failure is non-fatal — silently ignore
      });
    }
  }

  function handleRate(rating: Rating) {
    if (!currentCard) return;
    recordReview(currentCard.vocabId, rating);
    setCurrentIndex((i) => i + 1);
    setIsFlipped(false);
  }

  // Empty state: no cards in session queue
  if (isEmpty) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
          <Link to="/practice" className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft size={22} className="text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Flashcard Review</h1>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All caught up!</h2>
          <p className="text-gray-500 mb-2">
            You've reviewed {reviewedTodayCount} card{reviewedTodayCount !== 1 ? 's' : ''} today.
          </p>
          {nextDue && (
            <p className="text-sm text-blue-600 font-medium mb-6">
              Next review in {formatNextReview(nextDue)}
            </p>
          )}
          {!nextDue && (
            <p className="text-sm text-gray-400 mb-6">No cards scheduled yet. Complete some lessons to start reviewing!</p>
          )}
          <Link
            to="/practice"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  // Completion state: finished all cards in this session
  if (currentIndex >= sessionQueue.length && sessionStarted) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
          <Link to="/practice" className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft size={22} className="text-gray-600" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Flashcard Review</h1>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Complete!</h2>
          <p className="text-gray-500 mb-2">
            You reviewed {sessionTotal} card{sessionTotal !== 1 ? 's' : ''} this session.
          </p>
          <p className="text-gray-500 mb-6">
            Total today: {reviewedTodayCount} card{reviewedTodayCount !== 1 ? 's' : ''}
          </p>
          <Link
            to="/practice"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  // Active session state
  if (!currentVocab) {
    // Vocab not found for card — skip
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
        <Link to="/practice" className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={22} className="text-gray-600" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Flashcard Review</h1>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-4">
        <ExerciseProgress
          current={currentIndex}
          total={sessionTotal > 0 ? sessionTotal : sessionQueue.length}
        />
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-sm">
          <FlashCard
            vocab={currentVocab}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </div>
      </div>

      {/* Rating buttons — only shown when flipped */}
      <div className="px-4 pb-6">
        {isFlipped ? (
          <div className="w-full max-w-sm mx-auto">
            <RatingButtons onRate={handleRate} />
          </div>
        ) : (
          <p className="text-center text-sm text-gray-400">Tap card to reveal answer</p>
        )}
      </div>
    </div>
  );
}
