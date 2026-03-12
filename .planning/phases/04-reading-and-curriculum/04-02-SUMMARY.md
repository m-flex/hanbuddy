---
phase: 04-reading-and-curriculum
plan: 02
subsystem: ui
tags: [react, react-router, zustand, lucide-react, tailwind, vitest]

# Dependency graph
requires:
  - phase: 04-01
    provides: useProgressStore with completedLessons, isLessonUnlocked utility
  - phase: 03-practice
    provides: existing BottomTabBar, router pattern, Toast component
provides:
  - CurriculumMapPage as the Learn tab index (vertical path with completed/current/locked nodes)
  - CurriculumNode component with state-based icons (CheckCircle2/Play/Lock)
  - CurriculumPath vertical container component
  - 5-tab BottomTabBar (Learn, Practice, Read, Topics, Settings)
  - /read and /read/:passageId routes (stub pages for Plan 03)
affects: [04-03, future-ui-polish]

# Tech tracking
tech-stack:
  added: []
  patterns: [TDD red-green, node-state pattern with data-testid for test targeting]

key-files:
  created:
    - src/components/curriculum/CurriculumNode.tsx
    - src/components/curriculum/CurriculumPath.tsx
    - src/pages/CurriculumMapPage.tsx
    - src/pages/CurriculumMapPage.test.tsx
    - src/pages/ReadingListPage.tsx
    - src/pages/ReadingPassagePage.tsx
  modified:
    - src/components/layout/BottomTabBar.tsx
    - src/main.tsx

key-decisions:
  - "CurriculumNode uses data-testid='node-{state}' for test-targeting — avoids brittle aria-label matching for icon state assertions"
  - "5-tab layout uses text-[10px] labels (not text-xs) to prevent wrapping at 320px viewport width"
  - "Icon size reduced from 20 to 18 for 5-tab layout to maintain visual balance"
  - "ReadingListPage and ReadingPassagePage created as stubs — content built in Plan 03"

patterns-established:
  - "TDD pattern: write test file first with data-testid markers, then implement component to match"
  - "Node state derivation: completedLessons includes? -> completed; id === currentLessonId? -> current; else -> locked"

requirements-completed: [PROG-03]

# Metrics
duration: 4min
completed: 2026-03-12
---

# Phase 4 Plan 02: Curriculum Map and 5-Tab Navigation Summary

**Vertical curriculum map with completed/current/locked node states, 5-tab navigation with Learn and Read tabs, router wired to CurriculumMapPage at index**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-12T16:05:58Z
- **Completed:** 2026-03-12T16:09:58Z
- **Tasks:** 2
- **Files modified:** 8 (4 created, 4 modified)

## Accomplishments

- CurriculumMapPage renders lessons as a vertical path with completed (checkmark), current (play), and locked (lock) node states
- Tapping unlocked/current nodes navigates to /lessons/{lessonId}; locked nodes show a toast message
- BottomTabBar updated from 4 to 5 tabs: Learn, Practice, Read, Topics, Settings with GraduationCap and BookText icons
- Router updated — index route now serves CurriculumMapPage, /read and /read/:passageId stub routes added for Plan 03

## Task Commits

Each task was committed atomically:

1. **Test(04-02): add failing tests for CurriculumMapPage** - `4cdebb2` (test - TDD RED)
2. **Task 1: Curriculum map components and page** - `0664430` (feat - TDD GREEN)
3. **Task 2: Update BottomTabBar to 5 tabs and wire router** - `2cc41c0` (feat)

_Note: TDD task has two commits (test RED → feat GREEN)_

## Files Created/Modified

- `src/components/curriculum/CurriculumNode.tsx` - Single lesson node with state-based icons and level header labels
- `src/components/curriculum/CurriculumPath.tsx` - Vertical flex container for curriculum nodes
- `src/pages/CurriculumMapPage.tsx` - Learn tab index: sorts lessons, derives node states, handles navigation and toast
- `src/pages/CurriculumMapPage.test.tsx` - 6 tests covering all node states, navigation, and locked toast
- `src/pages/ReadingListPage.tsx` - Stub page for /read route
- `src/pages/ReadingPassagePage.tsx` - Stub page for /read/:passageId route
- `src/components/layout/BottomTabBar.tsx` - 5-tab layout with GraduationCap (Learn) and BookText (Read)
- `src/main.tsx` - Index route changed from LessonListPage to CurriculumMapPage; /read routes added

## Decisions Made

- `data-testid="node-{state}"` on the circle div makes test assertions simple and stable without coupling to icon component internals
- `text-[10px]` for tab labels prevents text wrapping on 320px (min supported) viewports with 5 tabs
- Icon size reduced to 18 (from 20) for the 5-tab layout to preserve visual balance
- Auto-scroll to current node uses `useRef + useEffect + scrollIntoView({ behavior: 'smooth', block: 'center' })`

## Deviations from Plan

None - plan executed exactly as written.

Note: During final verification, `src/store/progress.ts` was found already updated to v2 (completedReadings) by an earlier session commit `c7b194a`. The 6 pre-existing test failures from `progress.test.ts` resolved automatically — no action required in this plan.

## Issues Encountered

- Full test suite initially showed 6 failing tests in `progress.test.ts` (completedReadings v2 tests). Investigation confirmed these were already fixed by a prior `feat(04-01)` commit `c7b194a` (progress store v2 extension). All 193 tests pass after that commit was accounted for.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- CurriculumMapPage is live as the Learn tab index — users see their learning journey as a vertical path
- /read route exists (stub) — Plan 03 can implement reading content without routing changes
- All 193 tests pass, tsc --noEmit clean
- Plan 03 can proceed: ReadingListPage and ReadingPassagePage stubs are in place for content implementation

---
*Phase: 04-reading-and-curriculum*
*Completed: 2026-03-12*

## Self-Check: PASSED

All files present and all commits verified.
