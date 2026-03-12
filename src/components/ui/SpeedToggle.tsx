import { useSettingsStore } from '../../store/settings';

export function SpeedToggle() {
  const audioSpeed = useSettingsStore((s) => s.audioSpeed);
  const setAudioSpeed = useSettingsStore((s) => s.setAudioSpeed);

  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full p-0.5">
      <button
        onClick={() => setAudioSpeed(0.75)}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
          audioSpeed === 0.75
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        0.75x
      </button>
      <button
        onClick={() => setAudioSpeed(1)}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
          audioSpeed === 1
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        1x
      </button>
    </div>
  );
}
