---
phase: 03-practice
plan: 03
subsystem: ui
tags: [framer-motion, ts-fsrs, react, srs, flashcard, tdd, spaced-repetition]

# Dependency graph
requires:
  - phase: 03-practice-02
    provides: useSrsStore, useSrsSession, ExerciseProgress, stub FlashcardReviewPage

provides:
  - FlashCard: flip card with front (Korean + romanization reveal) and back (Korean + English + example + audio + TOPIK badge)
  - RatingButtons: Again/Hard/Good/Easy row calling onRate with ts-fsrs Rating
  - FlashcardReviewPage: full review session with session queue, empty state, completion screen

affects: [03-practice-04]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - TDD red-green workflow: failing tests committed before implementation
    - framer-motion rotateY flip animation with preserve-3d and backfaceVisibility
    - speak() called synchronously in flip click handler to stay within user gesture for audio autoplay
    - Parent controls isFlipped state — FlashCard is pure/controlled component

key-files:
  created:
    - src/components/practice/FlashCard.tsx
    - src/components/practice/FlashCard.test.tsx
    - src/components/practice/RatingButtons.tsx
  modified:
    - src/pages/FlashcardReviewPage.tsx

key-decisions:
  - "FlashCard is a pure controlled component — parent (FlashcardReviewPage) owns isFlipped state and calls speak() on flip, not the card component itself"
  - "Nested button HTML invalid — front face outer container changed from button to div with a child flip button and sibling romanization button to avoid nested button error"
  - "Both card faces render in DOM simultaneously for 3D CSS flip — tests use getAllByText for Korean word that appears on both faces"

# Metrics
duration: ~3min
completed: 2026-03-12
---

# Phase 03 Plan 03: Flashcard Review System Summary

**FlashCard flip component with framer-motion rotateY, RatingButtons for FSRS scheduling, and FlashcardReviewPage managing the full review session from SRS queue to completion screen**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-12T14:55:40Z
- **Completed:** 2026-03-12T14:58:55Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- FlashCard TDD: RED phase (11 failing tests committed), then GREEN phase (implementation passing all tests)
- FlashCard front: Korean word large, tap-to-reveal romanization via useRomanizationToggle
- FlashCard back: Korean word, AudioButton, English meaning, first example sentence (Korean + English), TOPIK I - Beginner (green) / TOPIK I - Intermediate (orange) badge
- Framer-motion rotateY flip animation (0.35s easeInOut) with preserve-3d and backfaceVisibility: hidden
- RatingButtons: Again (rose) / Hard (orange) / Good (green) / Easy (blue) calling onRate with ts-fsrs Rating
- FlashcardReviewPage: auto-populates SRS pool from completed lessons, session queue, progress bar, flip-to-reveal, rating buttons
- speak() called synchronously in flip click handler per Pitfall 5 (user gesture for audio autoplay)
- Empty state: "All caught up!" with reviewed count and next review time countdown
- Completion screen: session stats and Back to Practice link
- 168 tests pass (11 new FlashCard tests), tsc --noEmit clean, production build succeeds

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Failing FlashCard tests** - `e4057f6` (test)
2. **Task 1 GREEN: FlashCard implementation** - `836b57a` (feat)
3. **Task 2: RatingButtons and FlashcardReviewPage** - `f008d70` (feat)

## Files Created/Modified

- `src/components/practice/FlashCard.tsx` - flip card with framer-motion, romanization toggle, TOPIK badge
- `src/components/practice/FlashCard.test.tsx` - 11 unit tests for rendering and flip behavior
- `src/components/practice/RatingButtons.tsx` - Again/Hard/Good/Easy button row with color coding
- `src/pages/FlashcardReviewPage.tsx` - full review session replacing Plan 02 stub

## Decisions Made

- **Pure controlled FlashCard:** FlashCard receives `isFlipped` prop and `onFlip` callback — the parent owns flip state and calls `speak()`. Keeps component testable and separates audio side effects.
- **Nested button fix:** The original design had a button (flip) containing a button (romanization). Fixed by using a div as the outer container with the flip button and romanization button as siblings.
- **TDD red-green workflow:** Tests written first (commit e4057f6), implementation second (commit 836b57a). Tests mock framer-motion and AudioButton to isolate rendering behavior.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Nested button invalid HTML — front face structure changed**
- **Found during:** Task 1 GREEN phase test run
- **Issue:** Original design had the flip `<button>` wrapping the romanization `<button>`. HTML prohibits nested interactive elements; happy-dom throws a warning and the inner button cannot be found by `getByRole`.
- **Fix:** Changed front face outer container from `<button>` to `<div>`. The flip button is now the Korean word clickable area and the romanization toggle is a sibling button outside it.
- **Files modified:** `src/components/practice/FlashCard.tsx`
- **Commit:** 836b57a

**2. [Rule 1 - Bug] Test used `getByText` for Korean word appearing on both card faces**
- **Found during:** Task 1 GREEN phase test run
- **Issue:** Both front and back faces render in DOM simultaneously (required for CSS 3D flip). `getByText('안녕하세요')` found multiple elements and threw "Found multiple elements".
- **Fix:** Changed test to use `getAllByText` and assert `length >= 1`.
- **Files modified:** `src/components/practice/FlashCard.test.tsx`
- **Commit:** 836b57a

---

**Total deviations:** 2 auto-fixed (Rule 1 - bugs)
**Impact on plan:** Required for correct HTML structure and test accuracy. No scope creep.

## Issues Encountered

None beyond the two auto-fixed issues above.

## User Setup Required

None.

## Next Phase Readiness

- FlashCard is a standalone reusable component — can be embedded in other exercise pages
- RatingButtons can be reused wherever FSRS ratings are needed
- FlashcardReviewPage is the complete /practice/review route handler
- Plans 04+ (ClozeExercisePage, ListeningExercisePage, SentenceBuildPage) can use ExerciseProgress and RatingButtons patterns established here

## Self-Check: PASSED

All files found. All commits verified.

---
*Phase: 03-practice*
*Completed: 2026-03-12*
