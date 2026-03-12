interface ExerciseProgressProps {
  current: number;
  total: number;
}

export default function ExerciseProgress({ current, total }: ExerciseProgressProps) {
  const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-end mb-1">
        <span className="text-sm font-medium text-gray-600">
          {current}/{total}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
