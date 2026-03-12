---
phase: 03-practice
plan: 01
subsystem: content
tags: [typescript, ts-fsrs, vocab, dialogues, content-types, topik]

# Dependency graph
requires:
  - phase: 02-lessons
    provides: VocabItem type and existing 20-item vocab dataset with satisfies pattern

provides:
  - TopikLevel type and required topik_level field on all VocabItem instances
  - Required examples field (was optional) on VocabItem, all 20 items have 2+ examples
  - DialogueLine and Dialogue types in content.ts
  - 3 authored dialogues in src/data/dialogues.ts
  - ts-fsrs v5 installed and wired into SRS store

affects: [04-reading, srs-store, practice-exercises]

# Tech tracking
tech-stack:
  added: [ts-fsrs@5.2.3]
  patterns: [satisfies-operator-data-files, required-examples-pattern]

key-files:
  created:
    - src/data/dialogues.ts
  modified:
    - src/types/content.ts
    - src/data/vocab.ts
    - src/types/content.test.ts
    - package.json
    - src/store/srs.ts

key-decisions:
  - "TopikLevel is a required field on VocabItem (not optional) — all 20 current items are beginner TOPIK I-II content"
  - "examples is required on VocabItem (changed from optional) — ensures all SRS cards have study material"
  - "Dialogues use satisfies Dialogue[] pattern consistent with existing data files"

patterns-established:
  - "Dialogue data: satisfies Dialogue[] at end of array literal, same pattern as VOCAB/GRAMMAR/LESSONS"
  - "TopikLevel: added as required field alongside speech_level for dual-axis difficulty tagging"

requirements-completed: [VOCAB-04, VOCAB-05, LIST-03]

# Metrics
duration: 12min
completed: 2026-03-12
---

# Phase 03 Plan 01: Content Data Foundation Summary

**ts-fsrs installed, VocabItem extended with required topik_level and examples fields, all 20 vocab items complete, and 3 authored Korean dialogues created in dialogues.ts**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-12T14:45:00Z
- **Completed:** 2026-03-12T14:57:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Installed ts-fsrs v5.2.3 and resolved type compatibility issues in srs.ts
- Extended VocabItem with required `topik_level: TopikLevel` and made `examples` required (was optional)
- Added `TopikLevel`, `DialogueLine`, and `Dialogue` types to content.ts
- Updated all 20 vocab items with `topik_level: 'beginner'` and added missing example sentences for 5 items (voc-006, voc-008, voc-009, voc-010, voc-013)
- Created src/data/dialogues.ts with 3 authored dialogues: coffee shop, meeting someone new, asking for directions
- Added 4 new test suites covering TOPIK levels, vocab examples, and dialogue integrity (122 total tests passing)

## Task Commits

1. **Task 1: Install ts-fsrs and extend content types** - `ff70e27` (feat)
2. **Task 2: Author vocab examples, dialogues, and update tests** - `62f078f` (feat)

**Plan metadata:** (pending final commit)

## Files Created/Modified
- `src/types/content.ts` - Added TopikLevel type, topik_level to VocabItem, made examples required, added DialogueLine and Dialogue interfaces
- `src/data/vocab.ts` - Added topik_level: 'beginner' to all 20 items, added missing examples for 5 items, added second examples to 7 more items
- `src/data/dialogues.ts` - New file: 3 authored dialogues (coffee shop, meeting someone, asking for directions)
- `src/types/content.test.ts` - Added 4 new test suites: TOPIK level coverage, vocab examples coverage, dialogue data integrity
- `package.json` - Added ts-fsrs@^5.2.3 dependency
- `src/store/srs.ts` - Fixed pre-existing ts-fsrs type errors (Grade cast, unused variable cleanup)

## Decisions Made
- All 20 current vocab items tagged as `topik_level: 'beginner'` — they are all TOPIK I Level 1-2 vocabulary
- `examples` changed from optional to required on VocabItem to enforce data quality at compile time
- Kept TopikLevel as a simple 2-value union ('beginner' | 'intermediate') matching the project's current TOPIK I/II scope

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed pre-existing ts-fsrs type errors in srs.ts**
- **Found during:** Task 2 verification (`npm run build`)
- **Issue:** srs.ts (created by plan 03-02) had 3 TypeScript errors: `get` unused in `(set, get)`, `scheduling[rating]` using Rating which includes Rating.Manual not in RecordLog, and `state` unused in onRehydrateStorage callback
- **Fix:** Removed `get` from store factory params, imported `Grade` type and cast rating to `Grade`, renamed `state` to `_state`
- **Files modified:** src/store/srs.ts
- **Verification:** `npm run build` passes cleanly after fix
- **Committed in:** 62f078f (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix was necessary to satisfy the "npm run build passes" success criterion. Pre-existing errors in srs.ts blocked the build; fix was minimal and type-safe.

## Issues Encountered
- `npx tsc --noEmit` using the root tsconfig.json (composite project) returned no errors even when vocab.ts had missing required fields — had to use `npx tsc -p tsconfig.app.json --noEmit` to see actual errors. The final build command `tsc -b` correctly catches all errors.

## Next Phase Readiness
- Content data foundation complete: all vocab items have topik_level and 2+ examples, 3 dialogues authored
- ts-fsrs is installed and the SRS store (03-02) can now schedule cards
- Ready for practice exercise UI (03-03 flashcard, 03-04 multiple choice, 03-05 dialogue player)

---
*Phase: 03-practice*
*Completed: 2026-03-12*

## Self-Check: PASSED

- src/types/content.ts: FOUND
- src/data/vocab.ts: FOUND
- src/data/dialogues.ts: FOUND
- .planning/phases/03-practice/03-01-SUMMARY.md: FOUND
- Commit ff70e27: FOUND
- Commit 62f078f: FOUND
