---
phase: 01-foundation
plan: 01
subsystem: scaffolding
tags: [vite, react, typescript, tailwindcss, zustand, vitest, es-hangul, framer-motion, lucide-react, react-router-dom]

# Dependency graph
requires: []
provides:
  - Vite 6 + React 19 + TypeScript project scaffold with all dependencies installed
  - Content type system (VocabItem, GrammarPoint, Lesson, Topic, ExampleSentence, SpeechLevel, ConjugationType)
  - Build-time ID enforcement via TypeScript template literal types (voc-NNN, grm-NNN, les-NNN, top-NNN)
  - Sample data: 10 vocab items, 4 grammar points, 2 lessons, 6 topics — all using satisfies operator
  - Store state interfaces (ProgressState, SettingsState) for Plan 02
  - 18-test content validation suite (ID uniqueness, cross-references, regex patterns)
  - src/ folder structure: types/, data/, engine/, store/, hooks/, components/, pages/, utils/, assets/
affects:
  - 01-02 (storage layer — uses ProgressState, SettingsState from store.ts)
  - All subsequent phases (build on content types and folder structure)

# Tech tracking
tech-stack:
  added:
    - vite@6, @vitejs/plugin-react
    - react@19, react-dom@19
    - typescript@5.7
    - tailwindcss@4, @tailwindcss/vite
    - zustand@5
    - es-hangul@2
    - framer-motion@12
    - lucide-react@0.577
    - react-router-dom@7
    - vitest@4, @testing-library/react, @testing-library/jest-dom, happy-dom
  patterns:
    - satisfies operator for data files (build-time type checking, literal inference preserved)
    - Template literal types for prefixed counter IDs (voc-NNN, grm-NNN, les-NNN, top-NNN)
    - Multi-tag topic system (vocab and lessons reference multiple top-NNN IDs)
    - Romanization as authored field (not computed) for irregular pronunciation accuracy

key-files:
  created:
    - src/types/content.ts
    - src/types/store.ts
    - src/data/topics.ts
    - src/data/vocab.ts
    - src/data/grammar.ts
    - src/data/lessons.ts
    - src/types/content.test.ts
    - vite.config.ts
    - tsconfig.json / tsconfig.app.json / tsconfig.node.json
    - src/main.tsx, src/App.tsx, src/index.css, src/test-setup.ts
  modified: []

key-decisions:
  - "Used happy-dom instead of jsdom for Vitest environment — jsdom 28 + html-encoding-sniffer v6 has ESM/CJS incompatibility"
  - "Vitest config uses vitest/config import (not vite) to get proper TypeScript types for the test property"
  - "satisfies operator chosen over type annotations so TypeScript infers literal types for autocomplete while still enforcing shape"

patterns-established:
  - "Data files: export const NAME = [...] satisfies Type[] — never use type annotation directly"
  - "ID format: 3-char prefix + zero-padded 3-digit number (voc-001, grm-001, les-001, top-001)"
  - "All content cross-references by ID string — items are never embedded inline in other items"

requirements-completed: [FOUND-01]

# Metrics
duration: 4min
completed: 2026-03-12
---

# Phase 1 Plan 01: Project Scaffold and Content Schema Summary

**Vite 6 + React 19 + TypeScript scaffold with build-time content schema (VocabItem, GrammarPoint, Lesson, Topic) enforced by template literal types and satisfies operator, plus 18 passing validation tests**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-12T12:26:41Z
- **Completed:** 2026-03-12T12:30:56Z
- **Tasks:** 3 of 3
- **Files modified:** 19

## Accomplishments

- Vite 6 + React 19 + TypeScript project scaffolded with production deps (zustand, es-hangul, framer-motion, lucide-react, react-router-dom) and dev deps (tailwindcss v4, vitest, happy-dom)
- Content type system in `src/types/content.ts` with template literal ID types (`voc-${number}`, etc.) that make malformed IDs a compile-time error
- Sample data authored in `src/data/` — 10 vocab items, 4 grammar points (particles), 2 lessons, 6 topics — all using the `satisfies` operator for build-time validation
- 18-test validation suite in `src/types/content.test.ts` covering ID uniqueness, regex patterns, cross-reference integrity, and cross-collection uniqueness

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Vite + React + TypeScript project** - `52d2b1c` (feat)
2. **Task 2: Define content type system and author sample data** - `c14ca04` (feat)
3. **Task 3: Content schema validation tests** - `649486c` (test)

_Note: Task 2 used the satisfies operator (build-time checks) as its TDD mechanism; Task 3 added runtime Vitest tests for semantic validation._

## Files Created/Modified

- `src/types/content.ts` - VocabItem, GrammarPoint, Lesson, Topic, ExampleSentence interfaces; SpeechLevel, ConjugationType union types
- `src/types/store.ts` - ProgressState, SettingsState and action interfaces for Plan 02
- `src/data/topics.ts` - 6 topics (top-001 to top-006) exported as TOPICS satisfies Topic[]
- `src/data/vocab.ts` - 10 vocab items covering multiple speech levels and conjugation types exported as VOCAB satisfies VocabItem[]
- `src/data/grammar.ts` - 4 grammar points (topic, subject, object, possessive particles) exported as GRAMMAR satisfies GrammarPoint[]
- `src/data/lessons.ts` - 2 lessons (Greetings, Basic Particles) exported as LESSONS satisfies Lesson[]
- `src/types/content.test.ts` - 18-test Vitest suite for data integrity validation
- `vite.config.ts` - Vitest + Tailwind v4 + React plugin configuration
- `tsconfig.json / tsconfig.app.json / tsconfig.node.json` - TypeScript composite project config

## Decisions Made

- Used happy-dom instead of jsdom for the Vitest environment — jsdom 28 ships with html-encoding-sniffer v6 which has an ESM/CJS incompatibility when loaded via require() in forks workers
- Used `import { defineConfig } from 'vitest/config'` (not `vite`) so the `test` property is recognized without TypeScript errors
- Kept `satisfies` (not `as const` or type annotation) on all data arrays so TypeScript infers literal union types for autocomplete while still enforcing shape at compile time

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Switched Vitest environment from jsdom to happy-dom**
- **Found during:** Task 3 (content schema validation tests)
- **Issue:** jsdom@28 depends on html-encoding-sniffer@6 which requires `@exodus/bytes` as an ESM module but Vitest's forks pool loads it via `require()`, causing `ERR_REQUIRE_ESM`
- **Fix:** Installed `happy-dom` and updated vite.config.ts `environment: 'happy-dom'`
- **Files modified:** vite.config.ts, package.json, package-lock.json
- **Verification:** All 18 tests pass with happy-dom
- **Committed in:** `649486c` (Task 3 commit)

**2. [Rule 3 - Blocking] Created project scaffold manually instead of via npm create vite**
- **Found during:** Task 1 (scaffold)
- **Issue:** `npm create vite@latest . -- --template react-ts` prompts interactively about the non-empty directory (.git/, .planning/ exist) and cancels when stdin is not a TTY
- **Fix:** Created all Vite template files manually (package.json, tsconfig files, index.html, src/main.tsx, src/App.tsx, etc.)
- **Files modified:** All scaffold files
- **Verification:** `npm run build` succeeds, `npx tsc --noEmit` clean
- **Committed in:** `52d2b1c` (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 3 — blocking)
**Impact on plan:** Both fixes were necessary to unblock the planned work. No scope creep. happy-dom is a maintained, actively developed alternative to jsdom and is fully compatible with the test suite.

## Issues Encountered

None beyond the blocking issues documented above (both resolved automatically).

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Content type system is stable and complete — Plan 02 (storage layer) can import from `src/types/content.ts` and `src/types/store.ts` immediately
- Data files are sample data only — Plan 02+ can expand without breaking anything
- Build passes, tests pass, TypeScript clean
- Folder structure (types/, data/, engine/, store/, hooks/, components/, pages/, utils/) matches locked decision and is ready for subsequent plans to populate

---
*Phase: 01-foundation*
*Completed: 2026-03-12*
