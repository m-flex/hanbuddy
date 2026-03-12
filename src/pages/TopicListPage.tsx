import { TOPICS } from '../data/topics';
import { LESSONS } from '../data/lessons';
import { VOCAB } from '../data/vocab';
import { TopicCard } from '../components/topics/TopicCard';

export default function TopicListPage() {
  const topicsWithContent = TOPICS.filter((topic) => {
    const lessonCount = LESSONS.filter((l) => (l.topics as string[]).includes(topic.id)).length;
    const vocabCount = VOCAB.filter((v) => (v.topics as string[]).includes(topic.id)).length;
    return lessonCount > 0 || vocabCount > 0;
  });

  return (
    <div className="px-4 py-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Topics</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {topicsWithContent.map((topic) => {
          const lessonCount = LESSONS.filter((l) => (l.topics as string[]).includes(topic.id)).length;
          const vocabCount = VOCAB.filter((v) => (v.topics as string[]).includes(topic.id)).length;
          return (
            <TopicCard
              key={topic.id}
              topic={topic}
              lessonCount={lessonCount}
              vocabCount={vocabCount}
            />
          );
        })}
      </div>
    </div>
  );
}
