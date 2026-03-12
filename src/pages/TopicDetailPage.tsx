import { Link, useParams } from 'react-router-dom';
import { TOPICS } from '../data/topics';
import { LESSONS } from '../data/lessons';
import { VOCAB } from '../data/vocab';
import { getIcon } from '../utils/lucideIcons';
import { AudioButton } from '../components/ui/AudioButton';
import { useRomanizationToggle } from '../hooks/useRomanizationToggle';
import { useSettingsStore } from '../store/settings';

export default function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { toggle, isRevealed } = useRomanizationToggle();
  const romanizationHintsEnabled = useSettingsStore((s) => s.romanizationHintsEnabled);

  const topic = TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">Topic not found.</p>
        <Link to="/topics" className="text-blue-600 hover:underline">
          Back to Topics
        </Link>
      </div>
    );
  }

  const Icon = getIcon(topic.icon);
  const lessons = LESSONS.filter((l) => (l.topics as string[]).includes(topic.id));
  const vocab = VOCAB.filter((v) => (v.topics as string[]).includes(topic.id));

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0">
          <Icon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{topic.name}</h1>
          <p className="text-sm text-gray-500">{topic.description}</p>
        </div>
      </div>

      {/* Lessons section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Lessons</h2>
        {lessons.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No lessons yet.</p>
        ) : (
          <ul className="space-y-2">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  to={`/lessons/${lesson.id}`}
                  className="block rounded-lg border border-gray-200 bg-white p-3 hover:shadow-sm hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>
                    <span className="ml-3 shrink-0 text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">
                      Lv {lesson.level}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Vocabulary section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Vocabulary</h2>
        {vocab.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No vocabulary yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg bg-white overflow-hidden">
            {vocab.map((item) => (
              <li key={item.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => romanizationHintsEnabled && toggle(item.id)}
                    className="text-left"
                    aria-label={`Toggle romanization for ${item.korean}`}
                  >
                    <span className="block font-bold text-gray-900">{item.korean}</span>
                    {romanizationHintsEnabled && isRevealed(item.id) && (
                      <span className="block text-xs text-blue-500 mt-0.5">
                        {item.romanization}
                      </span>
                    )}
                  </button>
                  <span className="block text-sm text-gray-600 mt-0.5">{item.english}</span>
                </div>
                <AudioButton text={item.korean} className="ml-3 shrink-0" />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
