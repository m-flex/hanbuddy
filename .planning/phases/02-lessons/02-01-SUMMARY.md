---
phase: 02-lessons
plan: 01
subsystem: ui
tags: [react, react-router, zustand, framer-motion, lucide-react, vitest, testing-library, cloudflare-workers, naver-tts]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Zustand stores (settings/progress), content types (Lesson/Topic/SpeechLevel), data arrays"
provides:
  - "speak() and stopAudio() audio utility with blob-URL caching and single-instance cancellation"
  - "isLessonUnlocked() pure function for sequential lesson unlock logic"
  - "createBrowserRouter shell with RootLayout and three-tab BottomTabBar"
  - "AudioButton, SpeedToggle, SpeechBadge, WelcomeCard, CompletionCard, Toast shared UI components"
  - "lucideIcons.ts icon map with getIcon() fallback"
  - "TTS worker proxy in tts-worker/ ready for Cloudflare Workers deployment"
affects: [03-lesson-detail, 04-topics-settings, 05-srs]

# Tech tracking
tech-stack:
  added: ["@testing-library/user-event ^14", "react-router-dom (createBrowserRouter pattern)"]
  patterns:
    - "Module-level audio state (currentAudio, audioCache) — single shared instance per app"
    - "naverSpeed() pure helper extracted for testability"
    - "vi.stubGlobal + constructor function pattern for mocking Audio in Vitest/happy-dom"
    - "NavLink with isActive callback for tab bar active state"

key-files:
  created:
    - src/utils/audio.ts
    - src/utils/audio.test.ts
    - src/utils/lessonUnlock.ts
    - src/utils/lessonUnlock.test.ts
    - src/utils/lucideIcons.ts
    - src/components/layout/RootLayout.tsx
    - src/components/layout/BottomTabBar.tsx
    - src/components/ui/AudioButton.tsx
    - src/components/ui/SpeedToggle.tsx
    - src/components/ui/SpeechBadge.tsx
    - src/components/ui/WelcomeCard.tsx
    - src/components/ui/CompletionCard.tsx
    - src/components/ui/Toast.tsx
    - src/components/ui/SpeechBadge.test.tsx
    - src/components/ui/WelcomeCard.test.tsx
    - src/pages/LessonListPage.tsx
    - src/pages/TopicListPage.tsx
    - src/pages/SettingsPage.tsx
    - tts-worker/worker.js
    - tts-worker/wrangler.toml
  modified:
    - src/main.tsx
    - src/App.tsx
    - package.json

key-decisions:
  - "Use constructor function (not arrow) for Audio mock in happy-dom — arrow functions cannot be used with new"
  - "naverSpeed() exported as named helper (not inline) to enable unit testing of pure speed mapping logic"
  - ".env.local gitignored — Hanguller worker URL used as default, user updates after deploying own worker"
  - "vi.spyOn(URL, 'createObjectURL') preferred over vi.stubGlobal('URL', ...) to avoid replacing URL constructor"

patterns-established:
  - "TDD: write failing tests first, implement to pass, then integration commit"
  - "Audio tests: vi.stubGlobal for fetch/Audio, vi.spyOn for URL.createObjectURL, vi.resetModules to isolate module-level state"
  - "Component tests: vi.mock for Zustand stores using selector pattern, MemoryRouter wrapper for router-dependent components"

requirements-completed: [LIST-01, PROG-05]

# Metrics
duration: 15min
completed: 2026-03-12
---

# Phase 2 Plan 01: Routing Shell, Audio Infrastructure, and Shared UI Components Summary

**React Router shell with three-tab navigation, Naver TTS audio utility (blob caching + speed mapping), and six shared UI components backed by 82 passing tests**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-12T13:29:10Z
- **Completed:** 2026-03-12T13:34:00Z
- **Tasks:** 3
- **Files modified:** 22

## Accomplishments

- Audio utility (speak/stopAudio) with Naver TTS worker proxy, blob-URL caching keyed by text+speed, and single-instance cancellation
- isLessonUnlocked() sorting by level+order with sequential unlock logic and cross-level boundary support
- createBrowserRouter with RootLayout + BottomTabBar and routes for all app sections including placeholder lesson/topic detail routes
- Six shared UI components: AudioButton (loading state), SpeedToggle (persistent via Zustand), SpeechBadge (color-coded Korean labels), WelcomeCard (conditional on progress), CompletionCard (framer-motion entrance), Toast (auto-dismiss)
- 82 tests passing across 8 test files including 17 audio/unlock utility tests and 13 component tests

## Task Commits

Each task was committed atomically:

1. **Task 1: TTS worker, audio utility, and lesson unlock logic** - `44d6eb7` (feat)
2. **Task 2: Router shell, layout, bottom tab bar, and shared UI components** - `c0482e1` (feat)
3. **Task 3: Unit tests for SpeechBadge and WelcomeCard** - `9a5e186` (test)

## Files Created/Modified

- `tts-worker/worker.js` - Cloudflare Worker proxy to Naver TTS API (copied from Hanguller, renamed to hanbuddy-tts)
- `tts-worker/wrangler.toml` - Worker config with name hanbuddy-tts
- `src/utils/audio.ts` - speak()/stopAudio()/naverSpeed() with blob caching and speed mapping
- `src/utils/audio.test.ts` - 10 tests: speed mapping, fetch caching, cancellation behavior
- `src/utils/lessonUnlock.ts` - isLessonUnlocked() sorting by level+order, previous-lesson-required unlock
- `src/utils/lessonUnlock.test.ts` - 8 tests covering all edge cases including cross-level unlock
- `src/utils/lucideIcons.ts` - getIcon() map with Hand/Hash/Utensils/MapPin/Sun/Users/BookOpen/LayoutGrid/Settings/MessageCircle/Calculator + BookOpen fallback
- `src/components/layout/RootLayout.tsx` - flex column layout with Outlet + BottomTabBar
- `src/components/layout/BottomTabBar.tsx` - fixed bottom nav with NavLink active state styling
- `src/components/ui/AudioButton.tsx` - Volume2 icon button with loading spinner and speak() integration
- `src/components/ui/SpeedToggle.tsx` - 0.75x/1x toggle reading/writing audioSpeed via useSettingsStore
- `src/components/ui/SpeechBadge.tsx` - Korean speech level badge (합쇼체/해요체/반말/기본형) with color coding
- `src/components/ui/WelcomeCard.tsx` - Gradient card showing only when completedLessons is empty
- `src/components/ui/CompletionCard.tsx` - Animated completion card with framer-motion scale+opacity entrance
- `src/components/ui/Toast.tsx` - Slide-up toast fixed above tab bar with 2500ms auto-dismiss
- `src/components/ui/SpeechBadge.test.tsx` - 9 tests for all speech level labels and color classes
- `src/components/ui/WelcomeCard.test.tsx` - 4 tests for conditional render and navigation
- `src/pages/LessonListPage.tsx` - Stub page with WelcomeCard
- `src/pages/TopicListPage.tsx` - Stub page
- `src/pages/SettingsPage.tsx` - Stub page
- `src/main.tsx` - createBrowserRouter with all routes, RouterProvider render
- `src/App.tsx` - Emptied (router handled in main.tsx)
- `package.json` - Added @testing-library/user-event

## Decisions Made

- Used constructor function (not arrow function) for mocking the Audio class in Vitest with happy-dom — arrow functions cannot be used with `new`
- Exported `naverSpeed()` as a named function to enable isolated unit testing of the speed mapping formula without mocking Audio/fetch
- `.env.local` is gitignored; Hanguller TTS worker URL used as default so dev can build without deploying their own worker immediately
- Used `vi.spyOn(URL, 'createObjectURL')` instead of `vi.stubGlobal('URL', ...)` to avoid replacing the URL constructor needed internally

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Audio constructor mock pattern in tests**
- **Found during:** Task 1 (audio tests, GREEN phase)
- **Issue:** `vi.fn().mockImplementation(() => mockAudio)` creates an arrow function which cannot be used as a constructor with `new Audio()`, causing "not a constructor" errors
- **Fix:** Changed to explicit constructor function pattern; also switched `vi.stubGlobal('URL', ...)` to `vi.spyOn(URL, 'createObjectURL')` to avoid replacing the URL class
- **Files modified:** src/utils/audio.test.ts
- **Verification:** All 17 audio tests pass
- **Committed in:** 44d6eb7 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Test infrastructure fix necessary for correctness. No scope creep.

## User Setup Required

Cloudflare Worker configuration needed for production TTS:

1. `cd tts-worker && npx wrangler deploy` — deploys hanbuddy-tts worker
2. Set `VITE_TTS_WORKER_URL=<your-worker-url>` in `.env.local`
3. Default value points to Hanguller's worker for development without deployment

## Issues Encountered

- happy-dom does not support `Audio` as a global constructor by default — required manual mock setup using regular constructor functions, not arrow functions

## Next Phase Readiness

- Router and shared components fully ready for Plan 02-03 (LessonDetailPage) and 02-04 (TopicListPage/SettingsPage)
- AudioButton and SpeedToggle can be dropped directly into lesson pages
- SpeechBadge ready for vocabulary/grammar display
- WelcomeCard wired to progress store — will auto-hide after first lesson completion

---
*Phase: 02-lessons*
*Completed: 2026-03-12*

## Self-Check: PASSED

All 22 created/modified files confirmed present on disk. All 3 task commits (44d6eb7, c0482e1, 9a5e186) confirmed in git log.
