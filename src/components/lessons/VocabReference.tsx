import { AudioButton } from '../ui/AudioButton';
import { useRomanizationToggle } from '../../hooks/useRomanizationToggle';
import type { VocabItem } from '../../types/content';

interface VocabReferenceProps {
  vocabItems: VocabItem[];
}

export function VocabReference({ vocabItems }: VocabReferenceProps) {
  const { toggle, isRevealed } = useRomanizationToggle();

  if (vocabItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-base font-bold text-gray-800 mb-3">Vocabulary Reference</h3>
      <ul className="divide-y divide-gray-200">
        {vocabItems.map((item) => (
          <li key={item.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <button
                    onClick={() => toggle(item.id)}
                    className="text-left"
                    aria-label={`Toggle romanization for ${item.korean}`}
                  >
                    <span className="font-bold text-gray-900">{item.korean}</span>
                    {isRevealed(item.id) && (
                      <span className="ml-2 text-sm text-blue-500 italic">{item.romanization}</span>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{item.english}</p>
                {item.examples && item.examples.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1 italic">
                    {item.examples[0].korean}
                  </p>
                )}
              </div>
              <AudioButton text={item.korean} className="shrink-0 mt-0.5" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
