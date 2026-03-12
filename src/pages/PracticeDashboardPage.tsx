import { Link } from 'react-router-dom';
import { Mic, PenLine, Layers, MessageSquare } from 'lucide-react';
import { DIALOGUES } from '../data/dialogues';
import { useSrsSession } from '../hooks/useSrsSession';
import { useProgressStore } from '../store/progress';
import { useSrsStore } from '../store/srs';
import { LESSONS } from '../data/lessons';
import { VOCAB } from '../data/vocab';

function getUnlockedVocabCount(completedLessons: string[]): number {
  const unlockedIds = new Set<string>();
  for (const lessonId of completedLessons) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (lesson) {
      for (const vocabId of lesson.vocab_ids) {
        unlockedIds.add(vocabId);
      }
    }
  }
  return unlockedIds.size;
}

function getEarliestNextReview(cards: Record<string, { vocabId: string; card: { due: Date; state: number } }>): Date | null {
  const now = new Date();
  let earliest: Date | null = null;
  for (const entry of Object.values(cards)) {
    if (entry.card.due > now) {
      if (!earliest || entry.card.due < earliest) {
        earliest = entry.card.due;
      }
    }
  }
  return earliest;
}

function formatNextReview(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMins = Math.ceil(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} min`;
  const diffHours = Math.ceil(diffMs / 3600000);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.ceil(diffMs / 86400000);
  return `${diffDays}d`;
}

export default function PracticeDashboardPage() {
  const session = useSrsSession();
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const cards = useSrsStore((state) => state.cards);

  const unlockedVocabCount = getUnlockedVocabCount(completedLessons);
  const totalVocabCount = VOCAB.length;
  const exerciseCount = unlockedVocabCount > 0 ? unlockedVocabCount : 0;

  const nextReviewDate = session.isEmpty ? getEarliestNextReview(cards) : null;

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Practice</h1>

      {/* Vocabulary Review Card */}
      <div className="rounded-xl shadow-md bg-white p-5 border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Layers size={22} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Vocabulary Review</h2>
            <p className="text-sm text-gray-500">Spaced repetition flashcards</p>
          </div>
        </div>

        {session.isEmpty ? (
          <div className="space-y-2">
            <p className="text-green-600 font-medium">All caught up!</p>
            <p className="text-sm text-gray-500">
              Reviewed today: {session.reviewedTodayCount} card{session.reviewedTodayCount !== 1 ? 's' : ''}
            </p>
            {nextReviewDate && (
              <p className="text-sm text-gray-500">
                Next review in: {formatNextReview(nextReviewDate)}
              </p>
            )}
            {Object.keys(cards).length === 0 && completedLessons.length === 0 && (
              <p className="text-sm text-gray-400">Complete a lesson to add cards to your review queue.</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-4 text-sm">
              {session.dueCount > 0 && (
                <span className="text-orange-600 font-medium">{session.dueCount} due</span>
              )}
              {session.newCount > 0 && (
                <span className="text-blue-600 font-medium">{session.newCount} new</span>
              )}
            </div>
            <Link
              to="/practice/review"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Start Review
            </Link>
          </div>
        )}
      </div>

      {/* Exercise Type Cards */}
      <h2 className="text-lg font-semibold text-gray-700 pt-2">Exercises</h2>

      <div className="space-y-3">
        {/* Cloze Exercise */}
        <Link
          to="/practice/cloze"
          className="flex items-center gap-4 rounded-xl shadow-sm bg-white p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
            <PenLine size={20} className="text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">Fill in the Blank</h3>
            <p className="text-sm text-gray-500">Type the missing Korean word in context</p>
          </div>
          <span className="text-sm text-gray-400 flex-shrink-0">{exerciseCount} words</span>
        </Link>

        {/* Listening Exercise */}
        <Link
          to="/practice/listening"
          className="flex items-center gap-4 rounded-xl shadow-sm bg-white p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
            <Mic size={20} className="text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">Listening</h3>
            <p className="text-sm text-gray-500">Hear audio, select the matching Korean word</p>
          </div>
          <span className="text-sm text-gray-400 flex-shrink-0">{exerciseCount} words</span>
        </Link>

        {/* Sentence Building */}
        <Link
          to="/practice/build"
          className="flex items-center gap-4 rounded-xl shadow-sm bg-white p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
            <Layers size={20} className="text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">Sentence Builder</h3>
            <p className="text-sm text-gray-500">Arrange Korean word tiles into the correct order</p>
          </div>
          <span className="text-sm text-gray-400 flex-shrink-0">{exerciseCount} words</span>
        </Link>
        {/* Dialogue Lessons */}
        <Link
          to="/practice/dialogues"
          className="flex items-center gap-4 rounded-xl shadow-sm bg-white p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <MessageSquare size={20} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">Dialogues</h3>
            <p className="text-sm text-gray-500">Read and listen to Korean conversations</p>
          </div>
          <span className="text-sm text-gray-400 flex-shrink-0">{DIALOGUES.length} dialogues</span>
        </Link>
      </div>

      {unlockedVocabCount === 0 && (
        <p className="text-center text-sm text-gray-400 pt-2">
          Complete lessons to unlock exercises ({totalVocabCount} words available)
        </p>
      )}
    </div>
  );
}
