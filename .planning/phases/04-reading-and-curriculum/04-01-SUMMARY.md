---
phase: 04-reading-and-curriculum
plan: 01
subsystem: ui
tags: [typescript, zustand, react, vitest, korean-content]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: content type system (VocabItem, Lesson, Topic interfaces) and progress store foundation
  - phase: 02-lessons
    provides: LESSONS data with level/order structure that unlock logic depends on

provides:
  - PassageToken, PassageLine, ReadingPassage interfaces in src/types/content.ts
  - READINGS array with 4 passages (2 per level) with pre-segmented gloss tokens
  - isPassageUnlocked pure function for level-completion gating
  - useGlossToggle hook for per-word gloss reveal (one-at-a-time)
  - useProgressStore v2 with completedReadings field, completeReading action, and v1->v2 migration

affects:
  - 04-02 (reading UI pages depend on types, READINGS, useGlossToggle, isPassageUnlocked)
  - 04-03 (curriculum map depends on completedReadings from store)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - satisfies operator used on READINGS array (consistent with LESSONS/VOCAB data files)
    - useGlossToggle mirrors useRomanizationToggle shape — string | null state, one key at a time
    - Zustand persist version bump with explicit storedVersion === N migration case per version

key-files:
  created:
    - src/data/readings.ts
    - src/utils/readingUnlock.ts
    - src/utils/readingUnlock.test.ts
    - src/hooks/useGlossToggle.ts
    - src/hooks/useGlossToggle.test.ts
  modified:
    - src/types/content.ts
    - src/store/progress.ts
    - src/store/progress.test.ts

key-decisions:
  - "useGlossToggle uses string | null (not Set) — only one word revealed at a time, consistent with useRomanizationToggle UX decision"
  - "isPassageUnlocked gates by full level completion (all lessons at that level) — not previous lesson chaining like isLessonUnlocked"
  - "Passage level with no lessons returns true — avoids dead-end for future levels that may not have lessons yet"
  - "v1 -> v2 migration adds completedReadings: [] preserving all existing lesson progress"

patterns-established:
  - "Per-word toggle hook pattern: string | null state, toggle flips same/clears prior, hideAll nullifies — reuse for any word-annotation reveal"
  - "Level-gate unlock pattern: filter allItems by level, every().includes() — use for any future level-gated content"

requirements-completed:
  - READ-01
  - READ-02
  - PROG-04

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 4 Plan 01: Reading Types, Data, and Store v2 Summary

**PassageToken/PassageLine/ReadingPassage types, 4 Korean reading passages with gloss tokens, isPassageUnlocked level-gate, useGlossToggle hook, and Zustand progress store v2 with completedReadings and v1 migration**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-12T16:05:59Z
- **Completed:** 2026-03-12T16:09:09Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Added PassageToken, PassageLine, ReadingPassage type interfaces to content.ts with `rdg-${number}` ID pattern
- Created 4 reading passages (rdg-001 to rdg-004) with realistic 해요체 Korean, pre-segmented tokens with English/romanization gloss annotations
- Implemented isPassageUnlocked — level-wide completion gate with edge case handling (no lessons at level = unlocked)
- Implemented useGlossToggle — one-at-a-time word gloss reveal, mirrors useRomanizationToggle shape exactly
- Extended progress store to version 2 with completedReadings field, completeReading idempotent action, and v1→v2 migration
- All 193 tests pass across 18 test files, zero TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Reading types, data, unlock utility, and gloss hook** - `fb55c52` (feat)
2. **Task 2: Extend progress store with completedReadings (v2 migration)** - `c7b194a` (feat)

**Plan metadata:** (docs commit)

_Note: TDD tasks — tests written first (RED), then implementation (GREEN), both in single task commit_

## Files Created/Modified

- `src/types/content.ts` - Added PassageToken, PassageLine, ReadingPassage interfaces
- `src/data/readings.ts` - READINGS array with 4 passages (2 per level), pre-segmented tokens
- `src/utils/readingUnlock.ts` - isPassageUnlocked pure function (level-wide completion gate)
- `src/utils/readingUnlock.test.ts` - 7 test cases covering all behavior scenarios
- `src/hooks/useGlossToggle.ts` - Per-word gloss reveal hook, same shape as useRomanizationToggle
- `src/hooks/useGlossToggle.test.ts` - 6 test cases covering toggle, exclusive reveal, hideAll
- `src/store/progress.ts` - Version 2 with completedReadings field, completeReading action, v1->v2 migration, updated partialize and onRehydrateStorage
- `src/store/progress.test.ts` - 6 new test cases for completedReadings behavior, idempotency, persistence, and migration; beforeEach reset includes completedReadings

## Decisions Made

- useGlossToggle uses `string | null` (not Set) — only one word revealed at a time, consistent with useRomanizationToggle locked UX decision from Phase 1
- isPassageUnlocked gates by full level completion (all lessons at that level must be completed) — not sequential chaining like isLessonUnlocked
- Passage level with no matching lessons returns `true` (freely accessible) — prevents dead-end for levels without lessons
- v1→v2 migration adds `completedReadings: []` while spreading all existing v1 state — preserves lesson progress

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - both tasks implemented cleanly on first attempt. Full test suite (193 tests) and TypeScript check passed without issues.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All data contracts for reading UI are established: types, data, unlock logic, gloss hook
- Progress store v2 ready for reading completion tracking
- Plan 04-02 (reading UI pages) and 04-03 (curriculum map) can proceed — both depend on artifacts from this plan

---
*Phase: 04-reading-and-curriculum*
*Completed: 2026-03-12*
