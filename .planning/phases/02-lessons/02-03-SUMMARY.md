---
phase: 02-lessons
plan: 03
subsystem: ui
tags: [react, react-router, zustand, lucide-react, vitest, testing-library, korean-lessons, tts]

# Dependency graph
requires:
  - phase: 02-lessons
    plan: 01
    provides: "Router shell, AudioButton, SpeechBadge, SpeedToggle, WelcomeCard, CompletionCard, Toast, speak(), isLessonUnlocked()"
  - phase: 02-lessons
    plan: 02
    provides: "5 lessons, 8 grammar points, 20 vocab items"
provides:
  - "LessonListPage with level grouping, unlock logic, and locked-tap toast"
  - "LessonCard component with locked/unlocked/completed states"
  - "LessonDetailPage with single-scroll layout and completion flow"
  - "GrammarSection with anchor id, pattern badge, speech-level border color"
  - "ConjugationTable for particle-type grammar with auto-derived rows"
  - "ExampleSentence with romanization toggle, SpeechBadge, and AudioButton"
  - "VocabReference section with romanization toggle and example preview"
  - "GrammarSection unit tests (9 tests, all passing)"
affects: [03-srs, 04-topics-settings]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Lessons grouped by level using Map.reduce(), preserving insertion order via sorted keys"
    - "ConjugationTable accepts optional rows prop or auto-derives from well-known particle patterns"
    - "GrammarSection uses id={grammarPoint.id} for URL anchor deep-linking (#grm-NNN)"
    - "LessonDetailPage uses locked-guard pattern — redirect/message on isLessonUnlocked() false"
    - "ExampleSentence uses per-sentence sentenceId for romanization toggle (grm-NNN-ex-N)"

key-files:
  created:
    - src/components/lessons/LessonCard.tsx
    - src/components/lessons/GrammarSection.tsx
    - src/components/lessons/GrammarSection.test.tsx
    - src/components/lessons/ConjugationTable.tsx
    - src/components/lessons/ExampleSentence.tsx
    - src/components/lessons/VocabReference.tsx
    - src/pages/LessonDetailPage.tsx
  modified:
    - src/pages/LessonListPage.tsx
    - src/pages/TopicListPage.tsx
    - src/pages/TopicDetailPage.tsx
    - src/main.tsx

key-decisions:
  - "ConjugationTable derives rows from grammar pattern string matching rather than requiring explicit row data — keeps data files clean and handles all 4 particle patterns automatically"
  - "GrammarSection anchor id uses grammarPoint.id directly (grm-NNN) — enables deep-link URLs like /lessons/les-002#grm-001"
  - "ExampleSentence instantiates its own useRomanizationToggle — each sentence has independent reveal state scoped to its sentenceId"
  - "LessonDetailPage uses setActiveLesson (not setLastActiveLesson as plan spec'd) — matched actual store API from progress.ts"
  - "Pre-existing TopicListPage/TopicDetailPage type errors fixed as blocking deviation — satisfies operator caused narrow type issues with Array.includes() under tsc -b"

requirements-completed: [GRAM-01, GRAM-04, PROG-01, PROG-05]

# Metrics
duration: 5min
completed: 2026-03-12
---

# Phase 2 Plan 03: Lessons Tab and Lesson Detail Page Summary

**LessonListPage with level grouping and unlock logic, LessonDetailPage with grammar/conjugation/vocab/completion flow, and 9 GrammarSection unit tests — all 97 tests passing**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-12T13:37:42Z
- **Completed:** 2026-03-12T13:42:22Z
- **Tasks:** 3
- **Files modified:** 11 (7 created, 4 modified)

## Accomplishments

- LessonListPage with sticky header (SpeedToggle), level groupings (Level 1/Level 2), WelcomeCard for new users, and Toast on locked lesson tap showing previous lesson name
- LessonCard with three states: locked (lock icon, opacity-50, tap shows toast), unlocked (Link to detail), completed (green check, Link to detail)
- LessonDetailPage with locked guard, full single-scroll layout: description, grammar sections, vocab reference, and completion button
- GrammarSection with `id={grammarPoint.id}` anchor linking, pattern badge in code style, speech-level border color (blue for formal-high, green for polite)
- ConjugationTable for particle grammar: 4-column table (Word | Ends in | Particle Form | Result) with auto-derived rows per pattern string
- ExampleSentence with romanization toggle (tap Korean to reveal), SpeechBadge, AudioButton
- VocabReference with romanization reveal, English gloss, first example sentence preview, and AudioButton
- CompletionCard shown on completion with next lesson title and Continue button that navigates to next lesson or back to Lessons tab
- 9 GrammarSection unit tests covering title, explanation, pattern badge, anchor ID, all examples, speech-level border colors (polite/formal-high), and conditional ConjugationTable rendering

## Task Commits

Each task was committed atomically:

1. **Task 1: LessonListPage with level groups, unlock logic, and welcome card** - `c33d1ec` (feat)
2. **Task 2: LessonDetailPage with grammar sections, conjugation tables, examples, vocab, and completion** - `5ecff43` (feat)
3. **Task 3: GrammarSection unit tests** - `de8f684` (test)

## Files Created/Modified

- `src/pages/LessonListPage.tsx` — Full implementation with sticky header, level groups, LessonCard integration, Toast
- `src/components/lessons/LessonCard.tsx` — Reusable card with locked/unlocked/completed states
- `src/pages/LessonDetailPage.tsx` — Single-scroll lesson page with locked guard and completion flow
- `src/components/lessons/GrammarSection.tsx` — Grammar block with anchor id, pattern badge, speech-level border
- `src/components/lessons/GrammarSection.test.tsx` — 9 unit tests for GrammarSection
- `src/components/lessons/ConjugationTable.tsx` — Particle grammar table with auto-derived rows
- `src/components/lessons/ExampleSentence.tsx` — Sentence row with romanization toggle, badge, and audio
- `src/components/lessons/VocabReference.tsx` — Vocabulary section with reveal toggle and example preview
- `src/main.tsx` — Updated lessons/:lessonId route to use LessonDetailPage
- `src/pages/TopicListPage.tsx` — Fixed type error (satisfies + Array.includes narrow type under tsc -b)
- `src/pages/TopicDetailPage.tsx` — Fixed same type error

## Decisions Made

- ConjugationTable derives rows from grammar pattern string matching rather than requiring explicit row data, keeping data files clean and handling all 4 particle patterns (은/는, 이/가, 을/를, 의) automatically
- GrammarSection anchor uses grammarPoint.id directly (e.g., `grm-001`) enabling deep-link URLs per GRAM-04 requirement
- ExampleSentence instantiates its own useRomanizationToggle — each sentence independently toggles romanization keyed by `${grammarId}-ex-${index}`
- LessonDetailPage calls `setActiveLesson()` (store API) not `setLastActiveLesson()` (plan spec) — plan spec had a discrepancy with actual store implementation

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed pre-existing TopicListPage/TopicDetailPage type errors blocking build**
- **Found during:** Task 1 verification (`npm run build`)
- **Issue:** `satisfies VocabItem[]` / `satisfies Lesson[]` causes TypeScript to infer `topics` as narrow literal unions. Under `tsc -b` (project references build), `.includes(topic.id)` then fails with "not assignable to `never`" because the intersection of all literal tuples is `never`
- **Fix:** Cast `l.topics as string[]` and `v.topics as string[]` before calling `.includes()` in both files
- **Files modified:** `src/pages/TopicListPage.tsx`, `src/pages/TopicDetailPage.tsx`
- **Commit:** `c33d1ec` (Task 1 commit)

**2. [Rule 1 - Bug] Fixed GrammarSection anchor ID test selector**
- **Found during:** Task 3 (RED phase — test ran but failed)
- **Issue:** Test used `container.firstChild.querySelector('#grm-001')` but `firstChild` returned the MemoryRouter root element, and since `querySelector` is called on the wrong node level, it returned null
- **Fix:** Changed to `container.querySelector('#grm-001')` which correctly searches all descendants
- **Files modified:** `src/components/lessons/GrammarSection.test.tsx`
- **Commit:** `de8f684` (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (Rule 3 - Blocking, Rule 1 - Bug)
**Impact on plan:** Both fixes were necessary for build and test correctness. No scope creep.

## Verification Results

- `npx tsc --noEmit`: passed (0 errors)
- `npm run build`: passed (vite build 2.33s, 2184 modules)
- `npx vitest run --reporter=verbose`: 97 tests passed across 10 test files

## Self-Check: PASSED
