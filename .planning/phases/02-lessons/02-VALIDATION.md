---
phase: 2
slug: lessons
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-12
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.x |
| **Config file** | `vite.config.ts` (test block present, happy-dom environment) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 0 | GRAM-01 | unit | `npx vitest run src/components/lessons/GrammarSection.test.tsx -x` | Plan 03 T3 creates | ⬜ pending |
| 02-01-02 | 01 | 0 | GRAM-02 | unit (data) | `npx vitest run src/types/content.test.ts -x` | ✅ partial | ⬜ pending |
| 02-01-03 | 01 | 0 | GRAM-04 | unit (data) | `npx vitest run src/types/content.test.ts -x` | ✅ partial | ⬜ pending |
| 02-01-04 | 01 | 0 | GRAM-05 | unit | `npx vitest run src/components/ui/SpeechBadge.test.tsx -x` | Plan 01 T3 creates | ⬜ pending |
| 02-01-05 | 01 | 0 | LIST-01 | unit | `npx vitest run src/utils/audio.test.ts -x` | Plan 01 T1 creates | ⬜ pending |
| 02-01-06 | 01 | 0 | PROG-01 | unit | `npx vitest run src/utils/lessonUnlock.test.ts -x` | Plan 01 T1 creates | ⬜ pending |
| 02-01-07 | 01 | 0 | PROG-02 | unit | `npx vitest run src/pages/TopicListPage.test.tsx -x` | Plan 04 T2 creates | ⬜ pending |
| 02-01-08 | 01 | 0 | PROG-05 | unit | `npx vitest run src/components/ui/WelcomeCard.test.tsx -x` | Plan 01 T3 creates | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/lessons/GrammarSection.test.tsx` — stubs for GRAM-01 rendering (created by Plan 03, Task 3)
- [ ] `src/components/ui/SpeechBadge.test.tsx` — stubs for GRAM-05 badge label/color (created by Plan 01, Task 3)
- [ ] `src/utils/audio.test.ts` — stubs for LIST-01 speed mapping (created by Plan 01, Task 1)
- [ ] `src/utils/lessonUnlock.test.ts` — stubs for PROG-01 unlock gate logic (created by Plan 01, Task 1)
- [ ] `src/pages/TopicListPage.test.tsx` — stubs for PROG-02 topic browsing (created by Plan 04, Task 2)
- [ ] `src/components/ui/WelcomeCard.test.tsx` — stubs for PROG-05 orientation display (created by Plan 01, Task 3)
- [ ] Update `src/types/content.test.ts` — raise GRAMMAR examples minimum from 1 to 3 (GRAM-02) (Plan 02, Task 2)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Audio plays at 0.75x/1.0x with correct pitch | LIST-01 | Requires actual audio playback and speaker | 1. Open lesson page 2. Click audio button 3. Verify slow speed plays 4. Toggle to normal 5. Verify pitch is correct |
| Naver TTS Worker responds correctly | LIST-01 | External service integration | 1. Deploy worker 2. Hit endpoint with Korean text 3. Verify MP3 returned |

---

## Sampling Continuity Check

Task sequence with test coverage (no 3 consecutive tasks without automated test):
- 02-01 T1: audio.test.ts + lessonUnlock.test.ts (unit tests)
- 02-01 T2: tsc + build (compile check)
- 02-01 T3: SpeechBadge.test.tsx + WelcomeCard.test.tsx (unit tests) -- breaks any potential gap
- 02-02 T1: tsc + build (compile check)
- 02-02 T2: content.test.ts (unit tests)
- 02-03 T1: tsc + build (compile check)
- 02-03 T2: tsc + build (compile check)
- 02-03 T3: GrammarSection.test.tsx (unit tests) -- breaks the gap from T1+T2
- 02-04 T1: tsc + build (compile check)
- 02-04 T2: TopicListPage.test.tsx (unit tests) -- breaks the gap from T1
- 02-04 T3: tsc + build (compile check)

No window of 3 consecutive tasks lacks a unit test.

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** ready
