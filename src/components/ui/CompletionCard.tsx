import { AnimatePresence, motion } from 'framer-motion';

interface CompletionCardProps {
  lessonTitle: string;
  nextLessonId: string | null;
  nextLessonTitle: string | null;
  onContinue: () => void;
}

export function CompletionCard({
  lessonTitle,
  nextLessonId,
  nextLessonTitle,
  onContinue,
}: CompletionCardProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="completion-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="mx-4 my-4 p-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg text-center"
      >
        <div className="text-3xl mb-2">🎉</div>
        <h2 className="text-xl font-bold mb-1">Lesson Complete!</h2>
        <p className="text-green-100 text-sm mb-4">{lessonTitle}</p>

        {nextLessonId && nextLessonTitle ? (
          <>
            <p className="text-green-100 text-xs mb-3">Next up: {nextLessonTitle}</p>
            <button
              onClick={onContinue}
              className="bg-white text-green-700 font-semibold text-sm px-5 py-2 rounded-full hover:bg-green-50 transition-colors"
            >
              Continue
            </button>
          </>
        ) : (
          <p className="text-green-100 text-sm font-semibold">
            All lessons complete! Amazing work.
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
