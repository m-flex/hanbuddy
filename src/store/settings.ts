import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsStoreState {
  audioEnabled: boolean;
  audioSpeed: 0.75 | 1;
  romanizationHintsEnabled: boolean;
  setAudioEnabled: (v: boolean) => void;
  setAudioSpeed: (v: 0.75 | 1) => void;
  setRomanizationHintsEnabled: (v: boolean) => void;
}

const initialState = {
  audioEnabled: true,
  audioSpeed: 1 as 0.75 | 1,
  romanizationHintsEnabled: true,
};

export const useSettingsStore = create<SettingsStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      setAudioEnabled: (v: boolean) => set({ audioEnabled: v }),
      setAudioSpeed: (v: 0.75 | 1) => set({ audioSpeed: v }),
      setRomanizationHintsEnabled: (v: boolean) => set({ romanizationHintsEnabled: v }),
    }),
    {
      name: 'hanbuddy_settings',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        audioEnabled: state.audioEnabled,
        audioSpeed: state.audioSpeed,
        romanizationHintsEnabled: state.romanizationHintsEnabled,
      }),
      migrate: (persistedState, storedVersion) => {
        if (storedVersion < 1) {
          // Version 0 or legacy state — return safe defaults
          return { ...initialState };
        }
        return persistedState as Omit<
          SettingsStoreState,
          'setAudioEnabled' | 'setAudioSpeed' | 'setRomanizationHintsEnabled'
        >;
      },
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.warn('hanbuddy_settings corrupted, resetting', error);
          localStorage.removeItem('hanbuddy_settings');
        }
      },
    }
  )
);
