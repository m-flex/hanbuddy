import { beforeEach, describe, expect, it } from 'vitest';
import { useProgressStore } from './progress';

describe('useProgressStore', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset store to initial state between tests
    useProgressStore.setState({
      completedLessons: [],
      lastActiveLesson: null,
      _corruptionDetected: false,
      completedReadings: [],
    });
  });

  describe('initial state', () => {
    it('initializes with empty completedLessons array', () => {
      const state = useProgressStore.getState();
      expect(state.completedLessons).toEqual([]);
    });

    it('initializes with null lastActiveLesson', () => {
      const state = useProgressStore.getState();
      expect(state.lastActiveLesson).toBeNull();
    });

    it('initializes with _corruptionDetected false', () => {
      const state = useProgressStore.getState();
      expect(state._corruptionDetected).toBe(false);
    });
  });

  describe('actions', () => {
    it('completeLesson adds lesson ID to completedLessons', () => {
      useProgressStore.getState().completeLesson('les-001');
      expect(useProgressStore.getState().completedLessons).toContain('les-001');
    });

    it('completeLesson does not duplicate already-completed lessons', () => {
      useProgressStore.getState().completeLesson('les-001');
      useProgressStore.getState().completeLesson('les-001');
      const { completedLessons } = useProgressStore.getState();
      expect(completedLessons.filter((id) => id === 'les-001')).toHaveLength(1);
    });

    it('setActiveLesson sets lastActiveLesson', () => {
      useProgressStore.getState().setActiveLesson('les-002');
      expect(useProgressStore.getState().lastActiveLesson).toBe('les-002');
    });

    it('clearCorruptionFlag sets _corruptionDetected to false', () => {
      useProgressStore.setState({ _corruptionDetected: true });
      useProgressStore.getState().clearCorruptionFlag();
      expect(useProgressStore.getState()._corruptionDetected).toBe(false);
    });
  });

  describe('persistence', () => {
    it('persists state to localStorage key hanbuddy_progress', () => {
      useProgressStore.getState().completeLesson('les-001');
      const stored = localStorage.getItem('hanbuddy_progress');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed.state.completedLessons).toContain('les-001');
    });

    it('stores version 2 in persisted data (legacy test — updated from v1)', () => {
      // After an action that triggers persist, check the stored version
      useProgressStore.getState().completeLesson('les-001');
      const storedAfter = localStorage.getItem('hanbuddy_progress');
      const parsed = JSON.parse(storedAfter!);
      expect(parsed.version).toBe(2);
    });

    it('does not persist _corruptionDetected flag', () => {
      useProgressStore.setState({ _corruptionDetected: true });
      const stored = localStorage.getItem('hanbuddy_progress');
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.state._corruptionDetected).toBeUndefined();
      }
    });
  });

  describe('migration', () => {
    it('version 0 (legacy) state migrates to valid defaults', () => {
      localStorage.setItem(
        'hanbuddy_progress',
        JSON.stringify({ state: { lessonsDone: ['les-001'] }, version: 0 })
      );
      // Force rehydration by creating a fresh store context
      // Since persist middleware reads on init, we verify the outcome
      useProgressStore.persist.rehydrate();
      const state = useProgressStore.getState();
      // After migration from v0, should have valid structure
      expect(Array.isArray(state.completedLessons)).toBe(true);
      expect(state.lastActiveLesson === null || typeof state.lastActiveLesson === 'string').toBe(
        true
      );
    });
  });

  describe('corruption handling', () => {
    it('corrupted localStorage triggers reset with _corruptionDetected flag', () => {
      localStorage.setItem('hanbuddy_progress', 'not-json{{{');
      useProgressStore.persist.rehydrate();
      const state = useProgressStore.getState();
      expect(state._corruptionDetected).toBe(true);
      expect(Array.isArray(state.completedLessons)).toBe(true);
    });
  });

  describe('completedReadings (v2)', () => {
    it('initializes with empty completedReadings array', () => {
      const state = useProgressStore.getState();
      expect(state.completedReadings).toEqual([]);
    });

    it('completeReading adds reading ID to completedReadings', () => {
      useProgressStore.getState().completeReading('rdg-001');
      expect(useProgressStore.getState().completedReadings).toContain('rdg-001');
    });

    it('completeReading is idempotent — calling twice does not duplicate', () => {
      useProgressStore.getState().completeReading('rdg-001');
      useProgressStore.getState().completeReading('rdg-001');
      const { completedReadings } = useProgressStore.getState();
      expect(completedReadings.filter((id) => id === 'rdg-001')).toHaveLength(1);
    });

    it('partialize includes completedReadings in persisted state', () => {
      useProgressStore.getState().completeReading('rdg-001');
      const stored = localStorage.getItem('hanbuddy_progress');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed.state.completedReadings).toContain('rdg-001');
    });

    it('stores version 2 in persisted data', () => {
      useProgressStore.getState().completeReading('rdg-001');
      const stored = localStorage.getItem('hanbuddy_progress');
      const parsed = JSON.parse(stored!);
      expect(parsed.version).toBe(2);
    });

    it('v1 to v2 migration populates completedReadings as empty array', () => {
      localStorage.setItem(
        'hanbuddy_progress',
        JSON.stringify({
          state: { completedLessons: ['les-001'], lastActiveLesson: null },
          version: 1,
        })
      );
      useProgressStore.persist.rehydrate();
      const state = useProgressStore.getState();
      expect(Array.isArray(state.completedReadings)).toBe(true);
      expect(state.completedReadings).toEqual([]);
      // Existing data preserved
      expect(state.completedLessons).toContain('les-001');
    });
  });
});
