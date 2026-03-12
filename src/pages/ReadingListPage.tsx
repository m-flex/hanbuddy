import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, BookOpen } from 'lucide-react';
import { READINGS } from '../data/readings';
import { LESSONS } from '../data/lessons';
import { useProgressStore } from '../store/progress';
import { isPassageUnlocked } from '../utils/readingUnlock';
import { Toast } from '../components/ui/Toast';
import type { ReadingPassage } from '../types/content';

/** Group passages by level, returning a sorted array of [level, passages] pairs. */
function groupByLevel(passages: ReadingPassage[]): [number, ReadingPassage[]][] {
  const map = new Map<number, ReadingPassage[]>();
  for (const passage of passages) {
    const group = map.get(passage.level) ?? [];
    group.push(passage);
    map.set(passage.level, group);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a - b);
}

const LEVEL_COLORS: Record<number, string> = {
  1: 'bg-green-100 text-green-700',
  2: 'bg-blue-100 text-blue-700',
  3: 'bg-purple-100 text-purple-700',
  4: 'bg-red-100 text-red-700',
};

export default function ReadingListPage() {
  const navigate = useNavigate();
  const { completedReadings, completedLessons } = useProgressStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dismissToast = useCallback(() => setToastMessage(null), []);

  const groups = groupByLevel(READINGS);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Reading</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Graded passages to build your reading comprehension.
        </p>
      </div>

      {/* Passage groups */}
      {groups.map(([level, passages]) => (
        <section key={level} className="px-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Level {level}
          </h2>
          <div className="space-y-3">
            {passages.map((passage) => {
              const unlocked = isPassageUnlocked(passage, LESSONS, completedLessons);
              const completed = completedReadings.includes(passage.id);
              const levelColor = LEVEL_COLORS[passage.level] ?? 'bg-gray-100 text-gray-600';

              return (
                <button
                  key={passage.id}
                  onClick={() => {
                    if (!unlocked) {
                      setToastMessage(
                        `Complete all Level ${passage.level} lessons to unlock`
                      );
                    } else {
                      navigate(`/read/${passage.id}`);
                    }
                  }}
                  className={`w-full text-left bg-white border border-gray-200 rounded-xl p-4 shadow-sm transition-opacity ${
                    unlocked ? 'active:bg-gray-50' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor}`}
                        >
                          Level {passage.level}
                        </span>
                        {passage.topics.slice(0, 1).map((topicId) => (
                          <span
                            key={topicId}
                            className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full"
                          >
                            {topicId}
                          </span>
                        ))}
                      </div>
                      <p className="font-medium text-gray-900 truncate">{passage.title}</p>
                    </div>
                    <div className="shrink-0 mt-0.5">
                      {!unlocked ? (
                        <Lock size={16} className="text-gray-400" />
                      ) : completed ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <BookOpen size={16} className="text-blue-400" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <Toast message={toastMessage} onDismiss={dismissToast} />
    </div>
  );
}
