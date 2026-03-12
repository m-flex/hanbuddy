import { ConjugationTable } from './ConjugationTable';
import { ExampleSentence } from './ExampleSentence';
import type { GrammarPoint, SpeechLevel } from '../../types/content';

interface GrammarSectionProps {
  grammarPoint: GrammarPoint;
}

const BORDER_COLOR: Record<SpeechLevel, string> = {
  'formal-high': 'border-blue-400',
  polite: 'border-green-400',
  informal: 'border-yellow-400',
  plain: 'border-gray-300',
};

export function GrammarSection({ grammarPoint }: GrammarSectionProps) {
  const borderColor = BORDER_COLOR[grammarPoint.speech_level];

  return (
    <div
      id={grammarPoint.id}
      className={`border-l-4 ${borderColor} pl-4 py-4 mb-6`}
    >
      {/* Title + pattern badge */}
      <div className="flex items-start gap-2 mb-2">
        <h3 className="text-base font-bold text-gray-900 leading-snug">{grammarPoint.title}</h3>
        <code className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono shrink-0 mt-0.5">
          {grammarPoint.pattern}
        </code>
      </div>

      {/* Explanation */}
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{grammarPoint.explanation}</p>

      {/* Conjugation table (particle-type only) */}
      <ConjugationTable grammarPoint={grammarPoint} />

      {/* Examples */}
      <h4 className="text-sm font-semibold text-gray-700 mb-1 mt-2">Examples</h4>
      <div>
        {grammarPoint.examples.map((example, i) => (
          <ExampleSentence
            key={i}
            example={example}
            speechLevel={grammarPoint.speech_level}
            sentenceId={`${grammarPoint.id}-ex-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
