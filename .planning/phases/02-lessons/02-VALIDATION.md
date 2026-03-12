---
phase: 2
slug: lessons
status: draft
nyquist_compliant: false
wave_0_complete: false
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
| 02-01-01 | 01 | 0 | GRAM-01 | unit | `npx vitest run src/components/lessons/GrammarSection.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 0 | GRAM-02 | unit (data) | `npx vitest run src/types/content.test.ts -x` | ✅ partial | ⬜ pending |
| 02-01-03 | 01 | 0 | GRAM-04 | unit (data) | `npx vitest run src/types/content.test.ts -x` | ✅ partial | ⬜ pending |
| 02-01-04 | 01 | 0 | GRAM-05 | unit | `npx vitest run src/components/ui/SpeechBadge.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-01-05 | 01 | 0 | LIST-01 | unit | `npx vitest run src/utils/audio.test.ts -x` | ❌ W0 | ⬜ pending |
| 02-01-06 | 01 | 0 | PROG-01 | unit | `npx vitest run src/utils/lessonUnlock.test.ts -x` | ❌ W0 | ⬜ pending |
| 02-01-07 | 01 | 0 | PROG-02 | unit | `npx vitest run src/pages/TopicListPage.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-01-08 | 01 | 0 | PROG-05 | unit | `npx vitest run src/components/ui/WelcomeCard.test.tsx -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/lessons/GrammarSection.test.tsx` — stubs for GRAM-01 rendering
- [ ] `src/components/ui/SpeechBadge.test.tsx` — stubs for GRAM-05 badge label/color
- [ ] `src/utils/audio.test.ts` — stubs for LIST-01 speed mapping (pure function; no fetch)
- [ ] `src/utils/lessonUnlock.test.ts` — stubs for PROG-01 unlock gate logic
- [ ] `src/pages/TopicListPage.test.tsx` — stubs for PROG-02 topic browsing
- [ ] `src/components/ui/WelcomeCard.test.tsx` — stubs for PROG-05 orientation display
- [ ] Update `src/types/content.test.ts` — raise GRAMMAR examples minimum from 1 to 3 (GRAM-02)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Audio plays at 0.75x/1.0x with correct pitch | LIST-01 | Requires actual audio playback and speaker | 1. Open lesson page 2. Click audio button 3. Verify slow speed plays 4. Toggle to normal 5. Verify pitch is correct |
| Naver TTS Worker responds correctly | LIST-01 | External service integration | 1. Deploy worker 2. Hit endpoint with Korean text 3. Verify MP3 returned |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
