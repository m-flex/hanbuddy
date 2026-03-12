import { Link } from 'react-router-dom';
import { getIcon } from '../../utils/lucideIcons';
import type { Topic } from '../../types/content';

interface TopicCardProps {
  topic: Topic;
  lessonCount: number;
  vocabCount: number;
}

export function TopicCard({ topic, lessonCount, vocabCount }: TopicCardProps) {
  const Icon = getIcon(topic.icon);

  return (
    <Link
      to={`/topics/${topic.id}`}
      className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-center hover:shadow-md hover:border-blue-300 transition-all duration-200 gap-2"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600">
        <Icon size={24} />
      </div>
      <p className="font-semibold text-gray-900 text-sm leading-tight">{topic.name}</p>
      <p className="text-xs text-gray-500">
        {lessonCount} lesson{lessonCount !== 1 ? 's' : ''}, {vocabCount} vocab
      </p>
    </Link>
  );
}
