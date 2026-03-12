import type { SpeechLevel } from '../../types/content';

interface SpeechBadgeProps {
  level: SpeechLevel;
  className?: string;
}

const BADGE_CONFIG: Record<SpeechLevel, { label: string; classes: string }> = {
  'formal-high': {
    label: '합쇼체',
    classes: 'bg-blue-100 text-blue-800',
  },
  polite: {
    label: '해요체',
    classes: 'bg-green-100 text-green-800',
  },
  informal: {
    label: '반말',
    classes: 'bg-yellow-100 text-yellow-800',
  },
  plain: {
    label: '기본형',
    classes: 'bg-gray-100 text-gray-600',
  },
};

export function SpeechBadge({ level, className = '' }: SpeechBadgeProps) {
  const { label, classes } = BADGE_CONFIG[level];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${classes} ${className}`}
    >
      {label}
    </span>
  );
}
