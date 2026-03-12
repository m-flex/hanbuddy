import { Rating } from 'ts-fsrs';

interface RatingButtonsProps {
  onRate: (rating: Rating) => void;
  disabled?: boolean;
}

interface RatingConfig {
  label: string;
  rating: Rating;
  colorClass: string;
}

const RATINGS: RatingConfig[] = [
  {
    label: 'Again',
    rating: Rating.Again,
    colorClass: 'bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:bg-rose-50 disabled:text-rose-300',
  },
  {
    label: 'Hard',
    rating: Rating.Hard,
    colorClass: 'bg-orange-100 text-orange-700 hover:bg-orange-200 disabled:bg-orange-50 disabled:text-orange-300',
  },
  {
    label: 'Good',
    rating: Rating.Good,
    colorClass: 'bg-green-100 text-green-700 hover:bg-green-200 disabled:bg-green-50 disabled:text-green-300',
  },
  {
    label: 'Easy',
    rating: Rating.Easy,
    colorClass: 'bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:bg-blue-50 disabled:text-blue-300',
  },
];

export default function RatingButtons({ onRate, disabled = false }: RatingButtonsProps) {
  return (
    <div className="flex flex-row gap-2 w-full">
      {RATINGS.map(({ label, rating, colorClass }) => (
        <button
          key={label}
          onClick={() => onRate(rating)}
          disabled={disabled}
          aria-label={label}
          className={`flex-1 rounded-lg py-3 font-bold text-sm transition-colors disabled:cursor-not-allowed ${colorClass}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
