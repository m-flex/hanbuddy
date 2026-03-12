---
phase: 01-foundation
plan: 02
subsystem: storage
tags: [zustand, persist, localStorage, es-hangul, korean, react-hooks, vitest, tdd]

# Dependency graph
requires:
  - phase: 01-01
    provides: ProgressState and SettingsState interfaces from src/types/store.ts; project scaffold with zustand and es-hangul installed
provides:
  - useProgressStore — Zustand v5 store persisted to hanbuddy_progress with version 1 migration and corruption handling
  - useSettingsStore — Zustand v5 store persisted to hanbuddy_settings with version 1 migration
  - attachJosa / wordHasBatchim / decompose — es-hangul wrappers with typed JosaType union
  - useRomanizationToggle — per-word exclusive reveal hook, hidden by default
  - 30 new unit tests covering stores, engine, and hook (48 total across project)
affects:
  - 02 (audio, lesson progression — consumes useProgressStore and useSettingsStore)
  - 03 (vocabulary exercises — consumes useRomanizationToggle and attachJosa)
  - All subsequent phases that render Korean text with particles

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Zustand v5 curried syntax — create<State>()(persist(...)) with double parentheses
    - persist partialize to exclude actions and internal flags from localStorage
    - migrate function handles version 0 (legacy/fresh) by returning safe defaults; future versions chain with storedVersion < N guards
    - onRehydrateStorage corruption handler — logs warning, removes bad key, sets _corruptionDetected flag for component useEffect to display toast
    - JosaType union for typed particle selection — centralized in engine, enforced at call sites
    - useRomanizationToggle tracks single string | null — exclusive reveal, hidden by default

key-files:
  created:
    - src/store/progress.ts
    - src/store/settings.ts
    - src/engine/korean.ts
    - src/hooks/useRomanizationToggle.ts
    - src/store/progress.test.ts
    - src/engine/korean.test.ts
    - src/hooks/useRomanizationToggle.test.ts
  modified: []

key-decisions:
  - "partialize used on both stores to exclude action functions and _corruptionDetected from localStorage — prevents stale function references and internal flags being serialized"
  - "onRehydrateStorage sets _corruptionDetected flag on state directly when state is available; falls back to setState when state is undefined (Zustand limitation with corrupted JSON)"
  - "Korean engine kept thin — no added logic beyond typed wrapper; value is typed JosaType union and single import point"
  - "useRomanizationToggle tracks revealedWordId as string | null (not Set) — only one word revealed at a time per locked UX decision"

patterns-established:
  - "Stores: use create<State>()(persist(...)) — curried syntax is required for Zustand v5 TypeScript inference"
  - "Store persist: always set version explicitly (never rely on default 0); migrate handles storedVersion < N chains"
  - "Korean particle calls: always go through attachJosa() from engine/korean.ts — never import josa() directly"

requirements-completed: [FOUND-02, FOUND-03, FOUND-04]

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 1 Plan 02: Storage Layer, Korean Engine, and Romanization Toggle Summary

**Zustand stores with localStorage persist and versioned schema migration, es-hangul typed particle wrapper, and per-word romanization reveal hook — all TDD with 48 passing tests**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-12T12:33:56Z
- **Completed:** 2026-03-12T12:36:42Z
- **Tasks:** 3 of 3
- **Files modified:** 7

## Accomplishments

- useProgressStore and useSettingsStore implemented with Zustand v5 curried syntax, localStorage persist middleware, versioned migration (v0 → v1), and corruption detection with flag-based error reporting
- Korean engine wrapping es-hangul with typed JosaType union — all particle forms (이/가, 은/는, 을/를, 으로/로, 와/과, 아/야) validated against consonant-final and vowel-final nouns
- useRomanizationToggle hook enforcing hidden-by-default romanization with exclusive per-word reveal via string | null state
- 30 new unit tests (48 total) covering all FOUND-02, FOUND-03, FOUND-04 success criteria; tsc --noEmit clean, npm run build passes

## Task Commits

Each task was committed atomically:

1. **Task 1: Zustand stores with persist middleware and versioned migration** - `5f17b2d` (feat)
2. **Task 2: Korean engine utilities and romanization toggle hook** - `90df0dd` (feat)
3. **Task 3: Unit tests for stores, engine, and romanization hook** - `44515b8` (test)

_Note: TDD approach — tests were written first (RED), then implementation (GREEN). Task 3 commit captures a minor test fix after build verification found an unused variable caught by tsc -b._

## Files Created/Modified

- `src/store/progress.ts` — useProgressStore with hanbuddy_progress key, version 1, migration, corruption handler, partialize
- `src/store/settings.ts` — useSettingsStore with hanbuddy_settings key, version 1, migration, partialize
- `src/engine/korean.ts` — attachJosa(), wordHasBatchim(), decompose() wrapping es-hangul with JosaType union
- `src/hooks/useRomanizationToggle.ts` — toggle/isRevealed/hideAll hook, revealedWordId string | null
- `src/store/progress.test.ts` — 12 tests: initial state, actions, persistence, migration, corruption
- `src/engine/korean.test.ts` — 13 tests: 이/가 을/를 은/는 으로/로 with consonant/vowel finals + wordHasBatchim
- `src/hooks/useRomanizationToggle.test.ts` — 5 tests: hidden by default, toggle reveal/hide, exclusive reveal, hideAll

## Decisions Made

- Used `partialize` on both stores to exclude action functions and `_corruptionDetected` from localStorage — prevents stale function references from being serialized and deserialized
- `onRehydrateStorage` sets `_corruptionDetected` via direct state mutation when `state` is defined; falls back to `useProgressStore.setState()` call when `state` is undefined (edge case with completely unparseable JSON)
- Korean engine kept intentionally thin — no logic beyond the typed wrapper. The value is in the typed `JosaType` union and the single import point, not in added logic
- `useRomanizationToggle` uses `string | null` (not `Set<string>`) because only one word can be revealed at a time — matches locked UX decision for "tap/click per-word inline reveal"

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused variable in progress.test.ts caught by tsc -b**
- **Found during:** Task 3 verification (`npm run build`)
- **Issue:** `const stored = localStorage.getItem(...)` was declared but unused in the "stores version 1" test — `tsc --noEmit` with `noEmit` flag doesn't catch this but `tsc -b` (used by vite build) does
- **Fix:** Removed the unused variable; the test checks `storedAfter` from after the action instead
- **Files modified:** src/store/progress.test.ts
- **Verification:** `npm run build` succeeds, all 48 tests still pass
- **Committed in:** `44515b8` (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — bug in test file, unused variable)
**Impact on plan:** Trivial fix. No scope change. Build now clean end-to-end.

## Issues Encountered

None beyond the minor tsc -b unused variable flag documented above.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- useProgressStore and useSettingsStore are fully functional and tested — Phase 2 (audio, lesson progression) can import immediately
- attachJosa() is ready for Phase 3 vocabulary exercises that render particles
- useRomanizationToggle is ready for any Phase 2+ component that renders vocab items with romanization
- All 48 tests pass, TypeScript clean, production build succeeds

---
*Phase: 01-foundation*
*Completed: 2026-03-12*
