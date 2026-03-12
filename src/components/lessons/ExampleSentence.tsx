import { AudioButton } from '../ui/AudioButton';
import { SpeechBadge } from '../ui/SpeechBadge';
import { useRomanizationToggle } from '../../hooks/useRomanizationToggle';
import type { ExampleSentence as ExampleSentenceType, SpeechLevel } from '../../types/content';

interface ExampleSentenceProps {
  example: ExampleSentenceType;
  speechLevel: SpeechLevel;
  sentenceId: string;
}

export function ExampleSentence({ example, speechLevel, sentenceId }: ExampleSentenceProps) {
  const { toggle, isRevealed } = useRomanizationToggle();
  const revealed = isRevealed(sentenceId);

  return (
    <div className="py-3 border-b last:border-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <button
            onClick={() => toggle(sentenceId)}
            className="text-left w-full"
            aria-label={`Toggle romanization for sentence`}
          >
            <span className="block text-base font-medium text-gray-900 leading-snug">
              {example.korean}
            </span>
            {revealed && (
              <span className="block text-sm text-gray-400 mt-0.5 italic">
                {example.romanization}
              </span>
            )}
          </button>
          <p className="text-sm text-gray-600 mt-1">{example.english}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          <SpeechBadge level={speechLevel} />
          <AudioButton text={example.korean} />
        </div>
      </div>
    </div>
  );
}
