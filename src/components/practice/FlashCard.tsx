import { motion } from 'framer-motion';
import type { VocabItem } from '../../types/content';
import { useRomanizationToggle } from '../../hooks/useRomanizationToggle';
import { AudioButton } from '../ui/AudioButton';

interface FlashCardProps {
  vocab: VocabItem;
  isFlipped: boolean;
  onFlip: () => void;
}

function TopikBadge({ level }: { level: VocabItem['topik_level'] }) {
  const label = level === 'beginner' ? 'TOPIK I - Beginner' : 'TOPIK I - Intermediate';
  const colorClass = level === 'beginner' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}

export default function FlashCard({ vocab, isFlipped, onFlip }: FlashCardProps) {
  const { toggle, isRevealed } = useRomanizationToggle();

  const firstExample = vocab.examples[0];

  return (
    <div className="w-full perspective-1000">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        className="w-full min-h-[300px]"
      >
        {/* Front face */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 w-full min-h-[300px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-center border border-gray-100"
        >
          {/* Clickable area for flip */}
          <button
            aria-label="Flip card"
            onClick={onFlip}
            className="flex flex-col items-center justify-center flex-1 w-full cursor-pointer hover:opacity-90 transition-opacity bg-transparent border-0 p-0"
          >
            {/* Korean word large */}
            <p className="text-4xl font-bold text-gray-900 mb-4">{vocab.korean}</p>
          </button>

          {/* Romanization reveal button (separate, not nested) */}
          <button
            aria-label="Show romanization"
            onClick={(e) => {
              e.stopPropagation();
              toggle(vocab.id);
            }}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
          >
            {isRevealed(vocab.id) ? (
              <span className="text-blue-600">{vocab.romanization}</span>
            ) : (
              <span className="italic">tap to see romanization</span>
            )}
          </button>
        </div>

        {/* Back face */}
        <div
          aria-hidden={!isFlipped}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 w-full min-h-[300px] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-center border border-gray-100"
        >
          {/* Korean word */}
          <p className="text-2xl font-bold text-gray-900 mb-1">{vocab.korean}</p>

          {/* AudioButton */}
          <div className="mb-3">
            <AudioButton text={vocab.korean} />
          </div>

          {/* English meaning */}
          <p className="text-xl text-gray-700 font-medium mb-4">{vocab.english}</p>

          {/* Example sentence */}
          {firstExample && (
            <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 w-full text-left">
              <p className="text-sm font-medium text-gray-800 mb-0.5">{firstExample.korean}</p>
              <p className="text-xs text-gray-500">{firstExample.english}</p>
            </div>
          )}

          {/* TOPIK badge */}
          <TopikBadge level={vocab.topik_level} />
        </div>
      </motion.div>
    </div>
  );
}
