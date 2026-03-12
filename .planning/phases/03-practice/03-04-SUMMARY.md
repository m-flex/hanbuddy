---
phase: 03-practice
plan: 04
subsystem: practice-exercises
tags: [vitest, tdd, react, tailwind, korean-tts, zustand]

# Dependency graph
requires:
  - phase: 03-practice-01
    provides: VocabItem type with examples/topik_level, VOCAB/LESSONS data
  - phase: 03-practice-02
    provides: ExerciseProgress component, practice routes, useProgressStore

provides:
  - exerciseUtils.ts: compareKorean, pickDistractors, generateClozeQuestions, generateListeningQuestions, getUnlockedVocab
  - ClozeQuestion component: fill-in-the-blank with NFC comparison, feedback
  - ListeningQuestion component: audio + 2x2 option grid, feedback
  - ClozeExercisePage: /practice/cloze — 10-question fill-in-the-blank session
  - ListeningExercisePage: /practice/listening — 10-question audio multiple-choice session

affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - TDD red-green: failing tests committed before implementation
    - Fisher-Yates shuffle inline helper (no lodash dependency)
    - NFC normalization for Korean IME input comparison
    - Same-conjugation-type distractor preference with graceful fallback
    - Auto-advance with setTimeout(1000) on correct answers

key-files:
  created:
    - src/utils/exerciseUtils.ts
    - src/utils/exerciseUtils.test.ts
    - src/components/practice/ClozeQuestion.tsx
    - src/components/practice/ListeningQuestion.tsx
  modified:
    - src/pages/ClozeExercisePage.tsx
    - src/pages/ListeningExercisePage.tsx

key-decisions:
  - "compareKorean uses input.trim().normalize('NFC') === answer.trim().normalize('NFC') — handles Korean IME output that may produce NFD-composed characters"
  - "pickDistractors prefers same conjugation_type, falls back to pool-wide shuffle — avoids revealing correct answer by obvious category mismatch"
  - "ListeningExercisePage auto-plays first question on mount — gesture chain is valid from Link click, per plan spec"
  - "window.location.reload() used for Practice Again — simpler than threading reset state through multi-question hooks"

requirements-completed: [VOCAB-03, LIST-02]

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 03 Plan 04: Cloze and Listening Exercise Pages Summary

**Fill-in-the-blank and audio multiple-choice exercise pages with shared exercise utility module — compareKorean (NFC), distractor selection, and question generation functions**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-12T14:55:29Z
- **Completed:** 2026-03-12T14:58:49Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- 25 unit tests covering all exercise utility functions (compareKorean, pickDistractors, generateClozeQuestions, generateListeningQuestions, getUnlockedVocab)
- compareKorean normalizes NFC and trims whitespace before comparison — prevents Korean IME input mismatches
- pickDistractors uses Fisher-Yates shuffle, prefers same conjugation_type, falls back gracefully
- ClozeExercisePage: 10-question fill-in-the-blank, controlled input, Enter-to-submit, 1s auto-advance on correct, incorrect feedback shows user answer (red) + correct answer (green) + full sentence
- ListeningExercisePage: AudioButton centered hero, 2x2 option grid, auto-plays audio on mount and on each question advance
- Both pages: ExerciseProgress bar, empty state guard ("Complete a lesson first"), results screen with score/total
- 168 total tests pass, tsc --noEmit clean, production build succeeds

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Failing tests for exerciseUtils** - `77acefb` (test)
2. **Task 1 GREEN: exerciseUtils implementation** - `3dd76c2` (feat)
3. **Task 2: ClozeExercisePage and ListeningExercisePage** - `bbe1c24` (feat)

## Files Created/Modified

- `src/utils/exerciseUtils.ts` — compareKorean, pickDistractors, generateClozeQuestions, generateListeningQuestions, getUnlockedVocab
- `src/utils/exerciseUtils.test.ts` — 25 unit tests across all utility functions
- `src/components/practice/ClozeQuestion.tsx` — fill-in-the-blank component with NFC comparison and feedback states
- `src/components/practice/ListeningQuestion.tsx` — audio + 2x2 option grid with correct/incorrect highlights
- `src/pages/ClozeExercisePage.tsx` — 10-question cloze session page (replaced stub)
- `src/pages/ListeningExercisePage.tsx` — 10-question listening session page (replaced stub)

## Decisions Made

- **compareKorean NFC normalization:** `input.trim().normalize('NFC') === answer.trim().normalize('NFC')` — Korean IME (e.g., iOS keyboard) can output different Unicode representations of the same syllable. NFC normalizes both to composed form before comparison.
- **pickDistractors conjugation_type preference:** Same-type distractors are less obviously wrong (both are verbs, or both are nouns), making exercises appropriately challenging without being misleading by category.
- **Auto-play on mount:** ListeningExercisePage calls `speak()` immediately on mount — this is within the user gesture chain (they clicked a Link to navigate here), so browser autoplay policy is satisfied.
- **window.location.reload() for Practice Again:** Resets all React state and regenerates shuffled questions cleanly, without needing to thread a reset function through multiple useState hooks.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. All verification steps passed on first attempt.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- ClozeExercisePage and ListeningExercisePage are fully functional at /practice/cloze and /practice/listening
- Both pages draw from getUnlockedVocab — exercise content grows automatically as users complete more lessons
- All 5 practice routes now have full implementations (Plans 02-05)

---
*Phase: 03-practice*
*Completed: 2026-03-12*

## Self-Check: PASSED

All 6 expected files found on disk. All 3 task commits (77acefb, 3dd76c2, bbe1c24) verified in git log.
