import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ProgressStoreState {
  completedLessons: string[];
  lastActiveLesson: string | null;
  _corruptionDetected: boolean;
  completeLesson: (lessonId: string) => void;
  setActiveLesson: (lessonId: string) => void;
  clearCorruptionFlag: () => void;
}

const initialState = {
  completedLessons: [] as string[],
  lastActiveLesson: null as string | null,
  _corruptionDetected: false,
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
    }),
    {
      name: 'hanbuddy_progress',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        lastActiveLesson: state.lastActiveLesson,
      }),
      migrate: (persistedState, storedVersion) => {
        if (storedVersion < 1) {
          // Version 0 or legacy state — return safe defaults
          return {
            completedLessons: [],
            lastActiveLesson: null,
          };
        }
        return persistedState as Omit<
          ProgressStoreState,
          '_corruptionDetected' | 'completeLesson' | 'setActiveLesson' | 'clearCorruptionFlag'
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
          } else {
            // state is undefined — set via the store directly after creation
            useProgressStore.setState({
              _corruptionDetected: true,
              completedLessons: [],
              lastActiveLesson: null,
            });
          }
        }
      },
    }
  )
);
