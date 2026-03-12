import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 inset-x-4 z-50 flex justify-center pointer-events-none"
        >
          <div className="bg-gray-800 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg max-w-sm">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
