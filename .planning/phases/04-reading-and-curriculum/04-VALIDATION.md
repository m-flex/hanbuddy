---
phase: 4
slug: reading-and-curriculum
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| **Config file** | `vite.config.ts` (vitest config embedded — `test.globals: true, environment: 'happy-dom'`) |
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
| 04-01-01 | 01 | 1 | READ-01 | unit | `npx vitest run src/utils/readingUnlock.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | READ-02 | unit | `npx vitest run src/hooks/useGlossToggle.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | READ-03 | unit | `npx vitest run src/components/reading/PassageLineRow.test.tsx` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | PROG-03 | unit | `npx vitest run src/pages/CurriculumMapPage.test.tsx` | ❌ W0 | ⬜ pending |
| 04-03-01 | 03 | 1 | PROG-04 | unit | `npx vitest run src/store/progress.test.ts` | ✅ extend | ⬜ pending |
| 04-03-02 | 03 | 1 | PROG-04 | unit | `npx vitest run src/store/progress.test.ts` | ✅ extend | ⬜ pending |
| 04-03-03 | 03 | 1 | PROG-04 | unit | `npx vitest run src/store/progress.test.ts` | ✅ extend | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/utils/readingUnlock.test.ts` — stubs for READ-01 unlock logic
- [ ] `src/hooks/useGlossToggle.test.ts` — stubs for READ-02 gloss toggle
- [ ] `src/components/reading/PassageLineRow.test.tsx` — stubs for READ-03 audio tap
- [ ] `src/pages/CurriculumMapPage.test.tsx` — stubs for PROG-03 node rendering

*No new framework install required — existing Vitest + happy-dom + testing-library handles all cases.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Gloss tooltip stays within viewport | READ-02 | Visual edge-case positioning | Open reading, tap rightmost word on narrow screen, verify tooltip doesn't overflow |
| TTS audio plays at correct speed | READ-03 | Audio output verification | Open reading, tap line, verify audible playback at selected speed |
| Curriculum map scrolls to current node | PROG-03 | Scroll behavior | Open curriculum map, verify auto-scroll to in-progress node |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
