---
phase: 03-practice
plan: 05
subsystem: ui
tags: [react, tailwind, testing-library, vitest, tdd, korean, sentence-building, dialogue]

# Dependency graph
requires:
  - phase: 03-practice-01
    provides: DIALOGUES data file, VocabItem/ExampleSentence types, AudioButton component
  - phase: 03-practice-02
    provides: ExerciseProgress component, practice routes, PracticeDashboardPage

provides:
  - SentenceTiles component: tap-to-place tile pool with pool/placed state management
  - SentenceBuildPage: 10-question sentence-building exercise at /practice/build
  - DialoguePlayer component: chat-style dialogue viewer with per-line AudioButton
  - DialogueLessonPage: dialogue selector + inline player at /practice/dialogues
  - PracticeDashboardPage: Dialogues card added

affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - TDD red-green: failing tests committed before implementation
    - Shuffle-on-mount pattern: useEffect resets pool/placed when words prop changes (new question)
    - NFC normalize + trim for Korean sentence comparison (avoids Unicode variation mismatches)
    - vi.mock for AudioButton in dialogue tests to avoid TTS calls

key-files:
  created:
    - src/components/practice/SentenceTiles.tsx
    - src/components/practice/SentenceTiles.test.tsx
    - src/components/practice/DialoguePlayer.tsx
    - src/components/practice/DialoguePlayer.test.tsx
    - src/pages/DialogueLessonPage.tsx
  modified:
    - src/pages/SentenceBuildPage.tsx
    - src/pages/PracticeDashboardPage.tsx
    - src/main.tsx

key-decisions:
  - "SentenceTiles uses index-based key (not just word) for pool/placed to correctly handle duplicate words in tile arrays"
  - "SentenceBuildPage generates its own questions inline (no exerciseUtils import) per plan spec — Plan 04 creates exerciseUtils in parallel"
  - "Korean sentence comparison uses .normalize('NFC').trim() to handle Unicode normalization edge cases"
  - "DialoguePlayer shows romanization by default (not behind a toggle) — dialogue lines are longer than single vocab words and benefit from reading support"
  - "DialogueLessonPage uses inline expansion (dialogue selector + player on same page) rather than navigation — simpler for short content lists"

patterns-established:
  - "Tile state management: pool (string[]) + placed (string[]) with index-based operations; useEffect resets on words prop change"
  - "Korean exercise answer check: normalize('NFC').trim() before comparing both sides"

requirements-completed: [GRAM-03, LIST-03]

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 03 Plan 05: Sentence Building and Dialogue Lessons Summary

**Tap-to-place SentenceTiles component with SentenceBuildPage word-order exercises and chat-style DialoguePlayer with per-line TTS at /practice/build and /practice/dialogues**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-12T14:55:32Z
- **Completed:** 2026-03-12T14:58:45Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- SentenceTiles manages pool/placed tile state with tap-to-place and tap-to-return; check button gated on all tiles placed
- SentenceBuildPage generates up to 10 questions from short example sentences (2-5 tokens preferred, 7 max), checks canonical word order with NFC normalization
- Incorrect answers show the correct word order tiles highlighted in green plus a "Next" button
- DialoguePlayer renders chat-style bubbles with alternating left/right alignment by speaker, inline romanization, and AudioButton per line
- DialogueLessonPage lists all 3 DIALOGUES as selector cards and shows selected dialogue inline
- PracticeDashboardPage extended with a 4th Dialogues card linking to /practice/dialogues
- 10 unit tests pass (5 SentenceTiles + 5 DialoguePlayer), 168 total tests pass, tsc clean, build succeeds

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Failing SentenceTiles tests** - `338e7e6` (test)
2. **Task 1 GREEN: SentenceTiles component and SentenceBuildPage** - `e6848ce` (feat)
3. **Task 2: DialoguePlayer, DialogueLessonPage, dashboard update** - `4558323` (feat)

## Files Created/Modified

- `src/components/practice/SentenceTiles.tsx` - Tap-to-place tile pool with pool/placed state and check button
- `src/components/practice/SentenceTiles.test.tsx` - 5 unit tests for tile state transitions
- `src/pages/SentenceBuildPage.tsx` - 10-question sentence-building exercise with feedback and results screen
- `src/components/practice/DialoguePlayer.tsx` - Chat-style dialogue display with per-line AudioButton
- `src/components/practice/DialoguePlayer.test.tsx` - 5 unit tests with AudioButton mock
- `src/pages/DialogueLessonPage.tsx` - Dialogue selector + inline DialoguePlayer at /practice/dialogues
- `src/main.tsx` - Added practice/dialogues route
- `src/pages/PracticeDashboardPage.tsx` - Added Dialogues card (MessageSquare icon, DIALOGUES.length count)

## Decisions Made

- **Index-based tile keys:** `key={pool-${i}-${word}}` uses both index and word to handle duplicate words correctly in shuffle.
- **Inline question generation:** SentenceBuildPage imports LESSONS/VOCAB directly (no exerciseUtils) per plan note that Plan 04 creates that file in parallel and it may not exist.
- **NFC normalization:** Korean text comparison uses `.normalize('NFC').trim()` to avoid Unicode variation mismatches (composed vs decomposed Hangul).
- **Romanization always visible in DialoguePlayer:** Dialogue lines are multi-word and longer than flashcard vocab; showing romanization by default aids comprehension without requiring a tap-to-reveal interaction.
- **Inline dialogue layout:** Single-page selector + player (no routing per dialogue) keeps the implementation simple for 3 dialogues.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- /practice/build is fully functional with sentence-building exercise
- /practice/dialogues lists all 3 DIALOGUES with per-line TTS
- All 168 tests pass, tsc clean, production build succeeds
- Phase 03 Plans 03/04 (ClozeExercise, ListeningExercise, FlashcardReview) can proceed independently — they don't depend on this plan

## Self-Check: PASSED

All 7 files verified present. All 3 task commits verified in git log.

---
*Phase: 03-practice*
*Completed: 2026-03-12*
