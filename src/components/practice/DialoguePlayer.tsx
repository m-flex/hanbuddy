import type { Dialogue } from '../../types/content';
import { AudioButton } from '../ui/AudioButton';

interface DialoguePlayerProps {
  dialogue: Dialogue;
}

// Collect unique speaker names in order of appearance
function getSpeakers(dialogue: Dialogue): string[] {
  const seen = new Set<string>();
  const speakers: string[] = [];
  for (const line of dialogue.lines) {
    if (!seen.has(line.speaker)) {
      seen.add(line.speaker);
      speakers.push(line.speaker);
    }
  }
  return speakers;
}

export default function DialoguePlayer({ dialogue }: DialoguePlayerProps) {
  const speakers = getSpeakers(dialogue);

  return (
    <div className="space-y-3">
      {dialogue.lines.map((line, i) => {
        const speakerIndex = speakers.indexOf(line.speaker);
        const isSpeakerA = speakerIndex === 0;
        const isRight = !isSpeakerA;

        return (
          <div
            key={i}
            className={`flex flex-col ${isRight ? 'items-end' : 'items-start'}`}
          >
            {/* Speaker name */}
            <span className="text-xs font-semibold text-gray-500 mb-0.5 px-1">
              {line.speaker}
            </span>

            {/* Bubble row */}
            <div className={`flex items-start gap-2 max-w-[85%] ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Chat bubble */}
              <div
                className={`rounded-2xl px-4 py-3 ${
                  isSpeakerA
                    ? 'rounded-tl-none bg-blue-50 border border-blue-100'
                    : 'rounded-tr-none bg-gray-50 border border-gray-200'
                }`}
              >
                <p className="text-gray-900 text-base font-medium leading-snug">{line.korean}</p>
                <p className="text-gray-400 text-xs mt-0.5 italic">{line.romanization}</p>
                <p className="text-gray-600 text-sm mt-1">{line.english}</p>
              </div>

              {/* Audio button */}
              <div className="flex-shrink-0 mt-1">
                <AudioButton text={line.korean} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
