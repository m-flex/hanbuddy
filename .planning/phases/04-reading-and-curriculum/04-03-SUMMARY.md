---
phase: 04-reading-and-curriculum
plan: "03"
subsystem: reading-ui
tags: [reading, glossing, audio, tts, tdd, ui-components]
dependency_graph:
  requires: [04-01]
  provides: [reading-list-ui, reading-passage-ui, gloss-popup, passage-line-row]
  affects: [reading-experience, progress-tracking]
tech_stack:
  added: []
  patterns: [tdd-red-green, zustand-selector, useEffect-cleanup, controlled-component]
key_files:
  created:
    - src/components/reading/GlossPopup.tsx
    - src/components/reading/PassageLineRow.tsx
    - src/components/reading/PassageLineRow.test.tsx
  modified:
    - src/pages/ReadingListPage.tsx
    - src/pages/ReadingPassagePage.tsx
decisions:
  - "activeGlossKey tracked as local useState in ReadingPassagePage rather than extracting internal state from useGlossToggle — keeps hook API clean and avoids coupling"
  - "PassageLineRow uses local showTranslation state per line — each line independently remembers whether user revealed translation during a session"
  - "alignRight for GlossPopup determined by tokenIndex > tokens.length * 0.6 — popup shifts right-aligned when token appears in right 40% of line to prevent viewport overflow"
metrics:
  duration: "3min"
  completed_date: "2026-03-12"
  tasks_completed: 2
  files_modified: 5
---

# Phase 04 Plan 03: Reading UI Components Summary

Reading list page and passage viewer with vocabulary glossing, line-by-line TTS audio, hidden translation reveal, and completion tracking via `useGlossToggle` + `useProgressStore`.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | GlossPopup and PassageLineRow components | a61d480 | GlossPopup.tsx, PassageLineRow.tsx, PassageLineRow.test.tsx |
| 2 | ReadingListPage and ReadingPassagePage | ebc5bc7 | ReadingListPage.tsx, ReadingPassagePage.tsx |

## What Was Built

### GlossPopup (`src/components/reading/GlossPopup.tsx`)
Tooltip-style popup positioned above glossed words. Accepts `english`, `romanization`, `onDismiss`, and optional `alignRight` props. Uses `bottom-full` positioning with `left-0`/`right-0` switching to prevent viewport overflow on right-side tokens.

### PassageLineRow (`src/components/reading/PassageLineRow.tsx`)
Single passage line component. Renders a speaker icon button (audio tap), inline token buttons with dotted underline for glossable words, GlossPopup when `activeGlossKey` matches, "Show translation" toggle revealing `line.english`, and `bg-blue-50` highlight when `isPlaying`. Gloss key format: `${passageId}-${lineIndex}-${tokenIndex}`.

### ReadingListPage (`src/pages/ReadingListPage.tsx`)
Replaced stub. Passages grouped by level using `Map<number, ReadingPassage[]>`. Each card shows level badge, topic tag, title with lock/checkmark/book icon. Locked passages show toast "Complete all Level N lessons to unlock" via `isPassageUnlocked`. Completed state from `useProgressStore.completedReadings`.

### ReadingPassagePage (`src/pages/ReadingPassagePage.tsx`)
Replaced stub. Handles not-found and locked states with back link. Renders passage header (level badge, completed indicator, title). Maps lines to `PassageLineRow` components with `playingLine` state for audio highlight. `useGlossToggle` integrated — active key tracked locally via `useState<string | null>` and passed as `activeGlossKey` prop. Audio via `speak()` in async handler with `finally` cleanup. `stopAudio()` called on unmount. "Mark as Complete" calls `completeReading(passage.id)`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Design] useGlossToggle internal state not directly accessible**
- **Found during:** Task 2 — initial implementation used `isRevealed()` in a complex expression
- **Issue:** `useGlossToggle` exposes `isRevealed(key)` per-key check but `PassageLineRow` needs `activeGlossKey: string | null` as a prop. No way to extract `revealedKey` from hook without modifying the hook API.
- **Fix:** Added local `activeGlossKey` useState in `ReadingPassagePage` alongside `useGlossToggle`. Both are updated together on tap/dismiss. Hook is kept for its toggle semantics; local state drives the prop.
- **Files modified:** src/pages/ReadingPassagePage.tsx

## Test Coverage

8 tests written and passing for `PassageLineRow`:
- Renders all token text content
- Glossable token tap calls onGlossTap with correct key format
- Shows GlossPopup with english + romanization when activeGlossKey matches
- Does not show GlossPopup when activeGlossKey is null
- "Show translation" button reveals English text
- Audio tap area calls onAudioTap
- Highlights line with bg-blue-50 when isPlaying
- Non-glossable tokens render as plain spans (not buttons)

## Verification

- `npx tsc --noEmit`: clean (0 errors)
- `npx vitest run`: 201 tests pass across 19 test files
- ReadingListPage replaces stub at /read with full passage list
- ReadingPassagePage replaces stub at /read/:passageId with full reading experience

## Self-Check: PASSED
