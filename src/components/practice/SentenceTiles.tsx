import { useState, useEffect } from 'react';

interface SentenceTilesProps {
  words: string[];
  onComplete: (userAnswer: string) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SentenceTiles({ words, onComplete }: SentenceTilesProps) {
  const [pool, setPool] = useState<string[]>(() => shuffleArray(words));
  const [placed, setPlaced] = useState<string[]>([]);

  // Reset when words change (new question)
  useEffect(() => {
    setPool(shuffleArray(words));
    setPlaced([]);
  }, [words]);

  function handlePoolTileClick(index: number) {
    const word = pool[index];
    setPool((prev) => prev.filter((_, i) => i !== index));
    setPlaced((prev) => [...prev, word]);
  }

  function handlePlacedTileClick(index: number) {
    const word = placed[index];
    setPlaced((prev) => prev.filter((_, i) => i !== index));
    setPool((prev) => [...prev, word]);
  }

  const allPlaced = placed.length === words.length;

  return (
    <div className="space-y-4">
      {/* Answer track — placed tiles */}
      <div
        data-testid="placed-area"
        className="min-h-[56px] border-2 border-dashed border-blue-300 rounded-xl p-3 flex flex-wrap gap-2 bg-blue-50/40"
      >
        {placed.length === 0 ? (
          <span className="text-gray-400 text-sm self-center">Tap words below to build the sentence</span>
        ) : (
          placed.map((word, i) => (
            <button
              key={`placed-${i}-${word}`}
              onClick={() => handlePlacedTileClick(i)}
              aria-label={word}
              className="px-4 py-2 rounded-lg border-2 border-blue-400 bg-white text-gray-900 text-lg font-medium hover:bg-blue-50 active:scale-95 transition-all"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Pool of available tiles */}
      <div
        data-testid="pool-area"
        className="flex flex-wrap gap-2 min-h-[48px]"
      >
        {pool.map((word, i) => (
          <button
            key={`pool-${i}-${word}`}
            onClick={() => handlePoolTileClick(i)}
            aria-label={word}
            className="px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-gray-800 text-lg font-medium hover:bg-blue-100 active:scale-95 transition-all"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Check button */}
      <button
        onClick={() => onComplete(placed.join(' '))}
        disabled={!allPlaced}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
      >
        Check
      </button>
    </div>
  );
}
