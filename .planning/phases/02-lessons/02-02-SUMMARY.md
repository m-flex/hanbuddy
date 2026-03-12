---
phase: 02-lessons
plan: 02
subsystem: content-data
tags: [korean, grammar, vocab, lessons, data-expansion, typescript]
dependency_graph:
  requires: [01-01, 01-02]
  provides: [expanded-content-corpus]
  affects: [02-03, 02-04]
tech_stack:
  added: []
  patterns: [satisfies-operator, cross-reference-integrity, speech-level-coverage]
key_files:
  created: []
  modified:
    - src/data/grammar.ts
    - src/data/vocab.ts
    - src/data/lessons.ts
    - src/types/content.test.ts
decisions:
  - Chose to use top-004 (Daily Life) as the topic for copula grammar points (grm-005, grm-006) since copula patterns are core sentence structure used in daily speech, not tied to a specialized domain
  - les-003 references voc-018 (주세요) and voc-020 (실례합니다) to give the Copula lesson real polite/formal expression examples alongside grammar points
  - les-005 (Ordering Food) reuses grm-003 (object particle 을/를) to reinforce its use in food ordering contexts rather than adding a new grammar point
metrics:
  duration_minutes: 8
  completed_date: "2026-03-12T13:31:27Z"
  tasks_completed: 2
  files_modified: 4
---

# Phase 2 Plan 02: Content Expansion Summary

**One-liner:** Expanded corpus to 5 lessons (3 Level-1, 2 Level-2), 8 grammar points with polite and formal-high copula plus both Korean number systems, and 20 vocabulary items with example sentences on 13 of them.

## What Was Built

### Data files expanded

**grammar.ts** — Added 4 grammar points (grm-005 through grm-008):
- `grm-005`: Polite copula 이에요/예요 (speech_level: polite, 3 examples in 해요체)
- `grm-006`: Formal copula 입니다/입니까 (speech_level: formal-high, 3 examples in 합쇼체)
- `grm-007`: Sino-Korean numbers 일, 이, 삼... (plain, 3 examples: date, phone, money)
- `grm-008`: Native Korean numbers 하나, 둘, 셋... (plain, 3 examples with counters 개/명/잔)

**vocab.ts** — Added 10 vocabulary items (voc-011 through voc-020):
- Numbers: 하나, 둘, 셋, 열 (native Korean, top-002)
- Food: 김치, 커피, 빵 (top-003) with example sentences
- Polite expressions: 주세요, 얼마예요? (polite), 실례합니다 (formal-high)
- 13 of 20 total vocab items have example sentences (65% — exceeds 50% target)

**lessons.ts** — Added 3 lessons to reach 5 total:
- `les-003`: Copula: Is and Am (Level 1, Order 3) — grm-005, grm-006
- `les-004`: Korean Numbers (Level 2, Order 1) — grm-007, grm-008
- `les-005`: Ordering Food (Level 2, Order 2) — food vocab + grm-003

**content.test.ts** — Updated and expanded tests:
- GRAM-02: `examples.length >= 3` (was >= 1)
- GRAM-05: polite speech level coverage test
- GRAM-05: formal-high speech level coverage test
- LESSONS: minimum 5 lessons test
- LESSONS: spans at least 2 distinct levels test
- VOCAB: at least 5 items have example sentences test

## Verification Results

- `npx tsc --noEmit`: passed (0 errors)
- `npm run build`: passed (vite build 516ms)
- `npx vitest run --reporter=verbose`: 69 tests passed across 6 test files

## Deviations from Plan

None — plan executed exactly as written.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1    | 9293d89 | feat(02-02): expand content data to 5 lessons, 8 grammar points, 20 vocab items |
| 2    | ab6db4c | test(02-02): enforce minimum 3 examples per grammar point and content coverage requirements |

## Self-Check: PASSED

All files present, all commits verified:
- FOUND: src/data/grammar.ts
- FOUND: src/data/vocab.ts
- FOUND: src/data/lessons.ts
- FOUND: src/types/content.test.ts
- FOUND: .planning/phases/02-lessons/02-02-SUMMARY.md
- FOUND: commit 9293d89
- FOUND: commit ab6db4c
