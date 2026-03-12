import { useSettingsStore } from '../store/settings';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  id: string;
}

function ToggleSwitch({ enabled, onChange, label, id }: ToggleSwitchProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex w-11 h-6 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 mt-0.5 ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const audioEnabled = useSettingsStore((s) => s.audioEnabled);
  const audioSpeed = useSettingsStore((s) => s.audioSpeed);
  const romanizationHintsEnabled = useSettingsStore((s) => s.romanizationHintsEnabled);
  const setAudioEnabled = useSettingsStore((s) => s.setAudioEnabled);
  const setAudioSpeed = useSettingsStore((s) => s.setAudioSpeed);
  const setRomanizationHintsEnabled = useSettingsStore((s) => s.setRomanizationHintsEnabled);

  return (
    <div className="px-4 py-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-100">
        {/* Audio Enabled */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex-1 min-w-0 mr-4">
            <p className="font-medium text-gray-900">Audio</p>
            <p className="text-sm text-gray-500">Enable audio playback for example sentences</p>
          </div>
          <ToggleSwitch
            id="audio-enabled-toggle"
            enabled={audioEnabled}
            onChange={setAudioEnabled}
            label="Toggle audio playback"
          />
        </div>

        {/* Audio Speed */}
        <div
          className={`flex items-center justify-between px-4 py-4 transition-opacity duration-200 ${
            !audioEnabled ? 'opacity-40 pointer-events-none' : ''
          }`}
        >
          <div className="flex-1 min-w-0 mr-4">
            <p className="font-medium text-gray-900">Playback Speed</p>
          </div>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setAudioSpeed(0.75)}
              disabled={!audioEnabled}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                audioSpeed === 0.75
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              0.75x (Slow)
            </button>
            <button
              onClick={() => setAudioSpeed(1)}
              disabled={!audioEnabled}
              className={`px-3 py-1.5 text-sm font-medium border-l border-gray-200 transition-colors ${
                audioSpeed === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              1x (Normal)
            </button>
          </div>
        </div>

        {/* Romanization Hints */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex-1 min-w-0 mr-4">
            <p className="font-medium text-gray-900">Romanization Hints</p>
            <p className="text-sm text-gray-500">Show romanization when tapping Korean text</p>
          </div>
          <ToggleSwitch
            id="romanization-toggle"
            enabled={romanizationHintsEnabled}
            onChange={setRomanizationHintsEnabled}
            label="Toggle romanization hints"
          />
        </div>
      </div>

      {/* About */}
      <div className="mt-8 text-center">
        <p className="font-semibold text-gray-800">Hanbuddy</p>
        <p className="text-sm text-gray-500">Learn Korean, step by step.</p>
        <p className="text-xs text-gray-400 mt-1">v1.0</p>
      </div>
    </div>
  );
}
