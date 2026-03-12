---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (Vite-native) |
| **Config file** | `vitest.config.ts` or inline in `vite.config.ts` under `test:` — Wave 0 installs |
| **Quick run command** | `npx tsc --noEmit && npx vitest run --reporter=dot` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit && npx vitest run --reporter=dot`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | FOUND-01 | build | `npx tsc --noEmit` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 0 | FOUND-01 | unit | `npx vitest run src/types/content.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 0 | FOUND-02 | unit | `npx vitest run src/store/progress.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 0 | FOUND-02 | unit | `npx vitest run src/store/progress.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 0 | FOUND-03 | unit | `npx vitest run src/engine/korean.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 0 | FOUND-03 | unit | `npx vitest run src/engine/korean.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-07 | 01 | 0 | FOUND-04 | unit | `npx vitest run src/hooks/useRomanizationToggle.test.ts` | ❌ W0 | ⬜ pending |
| 1-01-08 | 01 | 0 | FOUND-04 | unit | `npx vitest run src/hooks/useRomanizationToggle.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest` dev dependency install: `npm install -D vitest @vitest/ui jsdom`
- [ ] `vite.config.ts` test block or `vitest.config.ts` — configure jsdom environment for React
- [ ] `src/types/content.test.ts` — stubs for FOUND-01 type validation
- [ ] `src/store/progress.test.ts` — stubs for FOUND-02 persist + migration
- [ ] `src/engine/korean.test.ts` — stubs for FOUND-03 particle selection
- [ ] `src/hooks/useRomanizationToggle.test.ts` — stubs for FOUND-04 toggle behavior

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Romanization is visually hidden by default | FOUND-04 | Visual rendering requires browser | Boot app, navigate to any vocab view, confirm no romanization visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
