import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ProgressStoreState {
  completedLessons: string[];
  lastActiveLesson: string | null;
  _corruptionDetected: boolean;
  completedReadings: string[];
  completeLesson: (lessonId: string) => void;
  setActiveLesson: (lessonId: string) => void;
  clearCorruptionFlag: () => void;
  completeReading: (readingId: string) => void;
}

const initialState = {
  completedLessons: [] as string[],
  lastActiveLesson: null as string | null,
  _corruptionDetected: false,
  completedReadings: [] as string[],
};

export const useProgressStore = create<ProgressStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      completeLesson: (lessonId: string) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),
      setActiveLesson: (lessonId: string) =>
        set({ lastActiveLesson: lessonId }),
      clearCorruptionFlag: () => set({ _corruptionDetected: false }),
      completeReading: (readingId: string) =>
        set((state) => ({
          completedReadings: state.completedReadings.includes(readingId)
            ? state.completedReadings
            : [...state.completedReadings, readingId],
        })),
    }),
    {
      name: 'hanbuddy_progress',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        lastActiveLesson: state.lastActiveLesson,
        completedReadings: state.completedReadings,
      }),
      migrate: (persistedState, storedVersion) => {
        if (storedVersion < 1) {
          // Version 0 or legacy state — return safe defaults
          return {
            completedLessons: [],
            lastActiveLesson: null,
            completedReadings: [],
          };
        }
        if (storedVersion === 1) {
          return {
            ...(persistedState as { completedLessons: string[]; lastActiveLesson: string | null }),
            completedReadings: [],
          };
        }
        return persistedState as Omit<
          ProgressStoreState,
          '_corruptionDetected' | 'completeLesson' | 'setActiveLesson' | 'clearCorruptionFlag' | 'completeReading'
        >;
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('hanbuddy_progress corrupted, resetting', error);
          localStorage.removeItem('hanbuddy_progress');
          if (state) {
            state._corruptionDetected = true;
            state.completedLessons = [];
            state.lastActiveLesson = null;
            state.completedReadings = [];
          } else {
            // state is undefined — set via the store directly after creation
            useProgressStore.setState({
              _corruptionDetected: true,
              completedLessons: [],
              lastActiveLesson: null,
              completedReadings: [],
            });
          }
        }
      },
    }
  )
);
