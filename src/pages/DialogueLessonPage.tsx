import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { DIALOGUES } from '../data/dialogues';
import DialoguePlayer from '../components/practice/DialoguePlayer';

export default function DialogueLessonPage() {
  const [selectedId, setSelectedId] = useState<string | null>(
    DIALOGUES.length > 0 ? DIALOGUES[0].id : null
  );

  const selectedDialogue = DIALOGUES.find((d) => d.id === selectedId) ?? null;

  return (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/practice" className="p-1 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Back">
          <ArrowLeft size={22} className="text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 flex-1">Dialogue Lessons</h1>
      </div>

      {/* Dialogue selector cards */}
      <div className="space-y-2">
        {DIALOGUES.map((dialogue) => {
          const isSelected = dialogue.id === selectedId;
          return (
            <button
              key={dialogue.id}
              onClick={() => setSelectedId(dialogue.id)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${
                isSelected
                  ? 'border-blue-400 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-blue-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <MessageSquare size={18} className={isSelected ? 'text-blue-600' : 'text-gray-500'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{dialogue.title}</h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{dialogue.lines.length} lines</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{dialogue.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected dialogue player */}
      {selectedDialogue && (
        <div className="space-y-3">
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{selectedDialogue.title}</h2>
            <DialoguePlayer dialogue={selectedDialogue} />
          </div>
        </div>
      )}

      {DIALOGUES.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No dialogues available yet.</p>
        </div>
      )}
    </div>
  );
}
