import { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { speak } from '../../utils/audio';
import { useSettingsStore } from '../../store/settings';

interface AudioButtonProps {
  text: string;
  className?: string;
}

export function AudioButton({ text, className = '' }: AudioButtonProps) {
  const [loading, setLoading] = useState(false);
  const audioSpeed = useSettingsStore((s) => s.audioSpeed);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      await speak(text, audioSpeed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label="Play audio"
      className={`inline-flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin text-blue-600" />
      ) : (
        <Volume2 size={18} className="text-blue-600" />
      )}
    </button>
  );
}
