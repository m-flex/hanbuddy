---
phase: 3
slug: practice
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.x |
| **Config file** | `vite.config.ts` (test section — `environment: 'happy-dom'`, `setupFiles: ./src/test-setup.ts`) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | VOCAB-02 | unit | `npx vitest run src/store/srs.test.ts` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | VOCAB-02 | unit | `npx vitest run src/store/srs.test.ts` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 2 | VOCAB-01 | unit | `npx vitest run src/components/practice/FlashCard.test.tsx` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 2 | VOCAB-04 | unit | `npx vitest run src/components/practice/FlashCard.test.tsx` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 2 | VOCAB-03 | unit | `npx vitest run src/pages/ClozeExercisePage.test.tsx` | ❌ W0 | ⬜ pending |
| 03-04-01 | 04 | 2 | LIST-02 | unit | `npx vitest run src/utils/exerciseUtils.test.ts` | ❌ W0 | ⬜ pending |
| 03-05-01 | 05 | 2 | GRAM-03 | unit | `npx vitest run src/pages/SentenceBuildPage.test.tsx` | ❌ W0 | ⬜ pending |
| 03-06-01 | 06 | 2 | LIST-03 | unit | `npx vitest run src/components/practice/DialogueLesson.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/store/srs.test.ts` — stubs for VOCAB-02 (SRS store: addVocabToPool, recordReview, daily cap, Date rehydration, FSRS scheduling)
- [ ] `src/utils/exerciseUtils.test.ts` — stubs for LIST-02 (distractor selection: 3 unique, excludes target, same conjugation_type)
- [ ] `src/components/practice/FlashCard.test.tsx` — stubs for VOCAB-01, VOCAB-04 (card render, TOPIK-I level tag)
- [ ] `src/pages/ClozeExercisePage.test.tsx` — stubs for VOCAB-03 (cloze NFC normalization, trim, correct/incorrect)
- [ ] `src/pages/SentenceBuildPage.test.tsx` — stubs for GRAM-03 (tile pool/placed state transitions)
- [ ] `src/components/practice/DialogueLesson.test.tsx` — stubs for LIST-03 (dialogue lines render with AudioButton)
- [ ] Install ts-fsrs: `npm install ts-fsrs`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Card flip animation plays smoothly | VOCAB-01 | CSS/framer-motion animation quality is visual | Flip a flashcard, verify 3D rotation is smooth with no flicker |
| Audio plays on card flip to answer side | VOCAB-01 | Browser audio autoplay policies vary | Flip card, verify pronunciation audio plays automatically |
| Tile drag/tap ordering feels responsive | GRAM-03 | Touch interaction UX is subjective | On mobile viewport, tap tiles to reorder, verify no lag |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
