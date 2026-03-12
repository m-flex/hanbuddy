interface GlossPopupProps {
  english: string;
  romanization: string;
  onDismiss: () => void;
  alignRight?: boolean;
}

export function GlossPopup({ english, romanization, onDismiss, alignRight = false }: GlossPopupProps) {
  return (
    <div
      className={`absolute bottom-full mb-1 z-10 bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 max-w-[180px] ${
        alignRight ? 'right-0' : 'left-0'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onDismiss();
      }}
    >
      <p className="text-xs italic text-gray-500">{romanization}</p>
      <p className="text-sm font-medium text-gray-800">{english}</p>
    </div>
  );
}
