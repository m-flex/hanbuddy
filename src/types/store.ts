/**
 * Store state interfaces for Hanbuddy Zustand stores.
 * Used by Plan 02 (storage layer).
 */

/** Progress tracking state — which lessons the user has completed. */
export interface ProgressState {
  completedLessons: string[];
  lastActiveLesson: string | null;
}

/** Actions for ProgressState. */
export interface ProgressActions {
  completeLesson: (lessonId: string) => void;
  setLastActiveLesson: (lessonId: string | null) => void;
  resetProgress: () => void;
}

/** User settings state. */
export interface SettingsState {
  audioEnabled: boolean;
  audioSpeed: 0.75 | 1;
  romanizationHintsEnabled: boolean;
}

/** Actions for SettingsState. */
export interface SettingsActions {
  setAudioEnabled: (enabled: boolean) => void;
  setAudioSpeed: (speed: 0.75 | 1) => void;
  setRomanizationHintsEnabled: (enabled: boolean) => void;
}
