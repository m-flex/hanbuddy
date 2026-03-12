import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { READINGS } from '../data/readings';
import { LESSONS } from '../data/lessons';
import { useProgressStore } from '../store/progress';
import { useSettingsStore } from '../store/settings';
import { useGlossToggle } from '../hooks/useGlossToggle';
import { isPassageUnlocked } from '../utils/readingUnlock';
import { speak, stopAudio } from '../utils/audio';
import { PassageLineRow } from '../components/reading/PassageLineRow';

const LEVEL_COLORS: Record<number, string> = {
  1: 'bg-green-100 text-green-700',
  2: 'bg-blue-100 text-blue-700',
  3: 'bg-purple-100 text-purple-700',
  4: 'bg-red-100 text-red-700',
};

export default function ReadingPassagePage() {
  const { passageId } = useParams<{ passageId: string }>();
  const navigate = useNavigate();

  const { completedReadings, completedLessons, completeReading } = useProgressStore();
  const { audioSpeed } = useSettingsStore();
  const glossToggle = useGlossToggle();

  const [playingLine, setPlayingLine] = useState<number | null>(null);
  const [activeGlossKey, setActiveGlossKey] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const passage = READINGS.find((r) => r.id === passageId);

  if (!passage) {
    return (
      <div className="p-4">
        <button
          onClick={() => navigate('/read')}
          className="flex items-center gap-1 text-blue-500 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Reading
        </button>
        <p className="text-gray-500">Passage not found.</p>
      </div>
    );
  }

  const unlocked = isPassageUnlocked(passage, LESSONS, completedLessons);

  if (!unlocked) {
    return (
      <div className="p-4">
        <button
          onClick={() => navigate('/read')}
          className="flex items-center gap-1 text-blue-500 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Reading
        </button>
        <p className="text-gray-500">
          Complete all Level {passage.level} lessons to unlock this passage.
        </p>
      </div>
    );
  }

  const isCompleted = completedReadings.includes(passage.id);
  const levelColor = LEVEL_COLORS[passage.level] ?? 'bg-gray-100 text-gray-600';

  const handleAudioTap = async (lineIndex: number, koreanText: string) => {
    setPlayingLine(lineIndex);
    try {
      await speak(koreanText, audioSpeed);
    } catch {
      // Ignore audio errors silently
    } finally {
      setPlayingLine((current) => (current === lineIndex ? null : current));
    }
  };

  const handleGlossTap = (key: string) => {
    setActiveGlossKey((current) => (current === key ? null : key));
    glossToggle.toggle(key);
  };

  const handleGlossDismiss = () => {
    setActiveGlossKey(null);
    glossToggle.hideAll();
  };

  const handleMarkComplete = () => {
    completeReading(passage.id);
    setShowCompletion(true);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => navigate('/read')}
          className="flex items-center gap-1 text-blue-500 mb-4"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColor}`}>
            Level {passage.level}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle size={12} />
              Completed
            </span>
          )}
        </div>
        <h1 className="text-xl font-bold text-gray-900">{passage.title}</h1>
      </div>

      {/* Passage lines */}
      <div className="mt-2 divide-y divide-gray-100">
        {passage.lines.map((line, lineIndex) => (
          <PassageLineRow
            key={lineIndex}
            line={line}
            lineIndex={lineIndex}
            passageId={passage.id}
            isPlaying={playingLine === lineIndex}
            activeGlossKey={activeGlossKey}
            onGlossTap={handleGlossTap}
            onGlossDismiss={handleGlossDismiss}
            onAudioTap={() => handleAudioTap(lineIndex, line.korean)}
          />
        ))}
      </div>

      {/* Mark as complete */}
      <div className="px-4 mt-6">
        {isCompleted || showCompletion ? (
          <div className="flex items-center justify-center gap-2 py-3 text-green-600 font-medium">
            <CheckCircle size={18} />
            <span>Passage Completed!</span>
          </div>
        ) : (
          <button
            onClick={handleMarkComplete}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-sm active:bg-blue-600 transition-colors"
          >
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
}
