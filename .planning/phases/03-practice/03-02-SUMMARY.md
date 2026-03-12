---
phase: 03-practice
plan: 02
subsystem: ui
tags: [ts-fsrs, zustand, react-router-dom, srs, spaced-repetition, lucide-react]

# Dependency graph
requires:
  - phase: 03-practice-01
    provides: ts-fsrs installed, VocabItem type with topik_level, VOCAB/LESSONS data files

provides:
  - useSrsStore: Zustand store persisting FSRS card state to hanbuddy_srs localStorage key
  - useSrsSession hook: derives today's review queue from store (due + new cards)
  - ExerciseProgress component: horizontal progress bar (current/total)
  - BottomTabBar: updated to 4 tabs (Lessons, Practice, Topics, Settings)
  - All 5 practice routes registered in router (/practice, /review, /cloze, /listening, /build)
  - PracticeDashboardPage: review card with due count + 3 exercise type cards

affects: [03-practice-03, 03-practice-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Zustand persist store with partialize, versioned migrate, and Date rehydration for ts-fsrs Card objects
    - TDD red-green workflow: failing tests committed before implementation
    - Session queue derived on the fly (not stored) to avoid stale-queue bugs

key-files:
  created:
    - src/store/srs.ts
    - src/store/srs.test.ts
    - src/hooks/useSrsSession.ts
    - src/components/practice/ExerciseProgress.tsx
    - src/pages/PracticeDashboardPage.tsx
    - src/pages/FlashcardReviewPage.tsx
    - src/pages/ClozeExercisePage.tsx
    - src/pages/ListeningExercisePage.tsx
    - src/pages/SentenceBuildPage.tsx
  modified:
    - src/components/layout/BottomTabBar.tsx
    - src/main.tsx

key-decisions:
  - "Grade cast used for scheduling[rating as Grade] — ts-fsrs IPreview keyed by Grade (excludes Rating.Manual), recordReview accepts Rating and casts"
  - "Stub exercise pages created as minimal placeholder files — Plans 03/04 will replace them entirely"
  - "useSrsSession derives queue fresh on each call — sessionQueue not persisted to avoid stale-queue bugs after clock changes"

patterns-established:
  - "SRS store pattern: persist with partialize (exclude actions/_corruptionDetected), versioned migrate rehydrates Date objects, onRehydrateStorage handles corruption"
  - "Day boundary comparison: toISOString().slice(0, 10) not Date.now() strings — survives timezone edge cases"

requirements-completed: [VOCAB-02]

# Metrics
duration: 15min
completed: 2026-03-12
---

# Phase 03 Plan 02: SRS Store, Session Hook, and Practice Navigation Summary

**Zustand SRS store with FSRS v6 scheduling (ts-fsrs), useSrsSession queue hook, ExerciseProgress bar, 4-tab bottom nav, and all 5 /practice/* routes wired to PracticeDashboardPage**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-12T14:48:00Z
- **Completed:** 2026-03-12T14:52:00Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- useSrsStore persists FSRS card state to hanbuddy_srs with correct Date rehydration on migrate
- 15 unit tests covering: add to pool (idempotent), FSRS state transitions, daily new card cap, day stamp reset, Date serialize/deserialize round-trip, corruption flag
- useSrsSession derives today's queue: due cards sorted by due date, new cards capped at (10 - newCardsToday)
- BottomTabBar updated to 4 tabs: Lessons | Practice | Topics | Settings (Dumbbell icon)
- All 5 practice routes registered; PracticeDashboardPage shows review card + 3 exercise type cards
- 122 tests pass, tsc --noEmit clean, production build succeeds

## Task Commits

Each task was committed atomically:

1. **Task 1: SRS Zustand store with FSRS scheduling and unit tests** - `ead1998` (feat)
2. **Task 2: Session hook, ExerciseProgress, practice navigation and routes** - `77ada66` (feat)

## Files Created/Modified

- `src/store/srs.ts` - useSrsStore: addVocabToPool, recordReview, persist to hanbuddy_srs
- `src/store/srs.test.ts` - 15 unit tests for SRS store behaviors
- `src/hooks/useSrsSession.ts` - derives sessionQueue, dueCount, newCount, reviewedTodayCount, isEmpty
- `src/components/practice/ExerciseProgress.tsx` - progress bar component (current/total)
- `src/pages/PracticeDashboardPage.tsx` - dashboard with review card + 3 exercise type cards
- `src/pages/FlashcardReviewPage.tsx` - stub (replaced by Plan 03)
- `src/pages/ClozeExercisePage.tsx` - stub (replaced by Plan 03)
- `src/pages/ListeningExercisePage.tsx` - stub (replaced by Plan 03)
- `src/pages/SentenceBuildPage.tsx` - stub (replaced by Plan 03)
- `src/components/layout/BottomTabBar.tsx` - added Practice tab with Dumbbell icon
- `src/main.tsx` - added 5 /practice/* route registrations

## Decisions Made

- **Grade cast for ts-fsrs scheduling index:** `scheduling[rating as Grade]` — ts-fsrs v5 IPreview is keyed by `Grade` (excludes `Rating.Manual`); `recordReview` accepts `Rating` and casts to `Grade` for indexing. This is safe since the public API only exposes Again/Hard/Good/Easy ratings.
- **Stub exercise pages:** Plans 03/04 will replace FlashcardReviewPage, ClozeExercisePage, ListeningExercisePage, SentenceBuildPage entirely. Stubs created as minimal placeholders to make routes immediately functional.
- **Session queue not persisted:** useSrsSession derives the queue fresh on each call from card.due and card.state — avoids stale-queue bugs after clock changes or missed reviews (per RESEARCH.md anti-pattern guidance).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript error: Rating vs Grade type for FSRS scheduling index**
- **Found during:** Task 2 verification (npm run build)
- **Issue:** `scheduling[rating].card` failed because ts-fsrs IPreview is keyed by `Grade` (excludes `Rating.Manual`), but `recordReview` accepts `Rating`. TypeScript error TS7053.
- **Fix:** Cast `rating as Grade` when indexing the scheduling result. Added `Grade` to ts-fsrs imports.
- **Files modified:** `src/store/srs.ts`
- **Verification:** `npx tsc --noEmit` passes; `npm run build` succeeds
- **Committed in:** ead1998 (Task 1 commit — linter auto-applied during save)

---

**Total deviations:** 1 auto-fixed (Rule 1 - type fix)
**Impact on plan:** Required for build correctness. No scope creep.

## Issues Encountered

None beyond the auto-fixed TypeScript error above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- SRS store is the shared dependency for all exercise pages — Plans 03 and 04 can now implement FlashcardReviewPage, ClozeExercisePage, ListeningExercisePage, SentenceBuildPage replacing the stubs
- useSrsSession provides the queue needed by FlashcardReviewPage
- ExerciseProgress component ready for reuse in all exercise session pages
- PracticeDashboardPage will auto-update once lessons are completed (via useProgressStore.completedLessons)

---
*Phase: 03-practice*
*Completed: 2026-03-12*
