import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { PassageLine } from '../../types/content';
import { GlossPopup } from './GlossPopup';

interface PassageLineRowProps {
  line: PassageLine;
  lineIndex: number;
  passageId: string;
  isPlaying: boolean;
  activeGlossKey: string | null;
  onGlossTap: (key: string) => void;
  onGlossDismiss: () => void;
  onAudioTap: () => void;
}

export function PassageLineRow({
  line,
  lineIndex,
  passageId,
  isPlaying,
  activeGlossKey,
  onGlossTap,
  onGlossDismiss,
  onAudioTap,
}: PassageLineRowProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div
      className={`py-3 px-4 rounded-lg transition-colors ${isPlaying ? 'bg-blue-50' : ''}`}
      onClick={onGlossDismiss}
    >
      {/* Speaker icon + token row */}
      <div className="flex items-start gap-2">
        {/* Audio tap area */}
        <button
          aria-label="Play audio"
          onClick={(e) => {
            e.stopPropagation();
            onAudioTap();
          }}
          className="mt-0.5 shrink-0 text-gray-400 hover:text-blue-500 transition-colors"
        >
          <Volume2 size={16} />
        </button>

        {/* Tokens */}
        <div className="flex flex-wrap gap-y-1">
          {line.tokens.map((token, tokenIndex) => {
            const glossKey = `${passageId}-${lineIndex}-${tokenIndex}`;
            const isActive = activeGlossKey === glossKey;

            if (token.gloss) {
              const alignRight = tokenIndex > line.tokens.length * 0.6;
              return (
                <span key={tokenIndex} className="relative inline-block">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onGlossTap(glossKey);
                    }}
                    className="underline decoration-dotted decoration-blue-400 text-gray-800 hover:text-blue-700 transition-colors"
                  >
                    {token.text}
                  </button>
                  {isActive && (
                    <GlossPopup
                      english={token.gloss.english}
                      romanization={token.gloss.romanization}
                      onDismiss={onGlossDismiss}
                      alignRight={alignRight}
                    />
                  )}
                </span>
              );
            }

            return (
              <span key={tokenIndex} className="text-gray-800">
                {token.text}
              </span>
            );
          })}
        </div>
      </div>

      {/* Translation reveal */}
      <div className="mt-2 ml-6">
        {showTranslation ? (
          <p className="text-gray-500 italic text-sm">{line.english}</p>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTranslation(true);
            }}
            className="text-xs text-blue-400 hover:text-blue-600 transition-colors"
          >
            Show translation
          </button>
        )}
      </div>
    </div>
  );
}
