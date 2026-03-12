---
phase: 02-lessons
plan: 04
subsystem: ui
tags: [react, react-router, zustand, tailwind, vitest, lucide-react]

# Dependency graph
requires:
  - phase: 02-lessons-01
    provides: Audio infrastructure, lucideIcons utility, Zustand stores (settings, progress)
  - phase: 02-lessons-02
    provides: TOPICS, LESSONS, VOCAB data arrays with topic cross-referencing
provides:
  - TopicListPage: grid of topic cards with icon and lesson/vocab counts, filtered to non-empty topics
  - TopicDetailPage: topic detail view with all linked lessons (unlocked regardless of progression) and vocab with audio
  - TopicCard component: reusable card with Lucide icon, name, and counts
  - SettingsPage: audio enabled toggle, playback speed selector, romanization hints toggle
  - Map icon added to lucideIcons registry
affects: [03-exercises, 04-reading]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "(topics as string[]).includes(topic.id) cast pattern for satisfies-typed data arrays with literal topic tuples"
    - "ToggleSwitch inline component with aria-checked role=switch for accessible boolean toggles"
    - "Playback speed selector as two-button group with active highlight, dimmed when audio disabled"

key-files:
  created:
    - src/components/topics/TopicCard.tsx
    - src/pages/TopicDetailPage.tsx
    - src/pages/TopicListPage.test.tsx
  modified:
    - src/pages/TopicListPage.tsx
    - src/pages/SettingsPage.tsx
    - src/utils/lucideIcons.ts

key-decisions:
  - "(topics as string[]).includes() cast used throughout — satisfies operator causes LESSONS/VOCAB topic arrays to infer as literal readonly tuples; casting to string[] is the minimal fix without altering data definitions"
  - "Map icon added to lucideIcons registry — topics.ts Travel entry uses 'Map' but registry only had MapPin; deviation auto-fixed during Task 1"

patterns-established:
  - "Topic browsing ignores progression lock — all lessons shown as links with isUnlocked semantically true"
  - "Romanization reveal gated by romanizationHintsEnabled store flag — toggle in vocab list only activates when hints are on"

requirements-completed: [PROG-02]

# Metrics
duration: 5min
completed: 2026-03-12
---

# Phase 2 Plan 04: Topics Tab and Settings Summary

**TopicListPage grid, TopicDetailPage with unlocked lesson access, and SettingsPage with audio/romanization toggles backed by Zustand persist store**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-12T13:38:00Z
- **Completed:** 2026-03-12T13:43:00Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Topics tab shows responsive 2-col/3-col grid of topic cards with dynamic Lucide icons and real lesson/vocab counts; empty topics filtered out
- Topic detail page shows all linked lessons as clickable links (bypassing lock state per PROG-02) and vocab items with AudioButton and tap-to-reveal romanization
- Settings page has three preference sections (audio enable, playback speed, romanization hints) wired to Zustand settings store with persistence
- 6 unit tests for TopicListPage covering rendering, empty-topic filtering, count display, and navigation links — all passing

## Task Commits

Each task was committed atomically:

1. **Task 1: TopicListPage, TopicDetailPage, TopicCard, main.tsx** - `1a73f36` (feat)
2. **Task 2: Unit tests for TopicListPage** - `7356ca2` (test)
3. **Task 3: SettingsPage with preference toggles** - `498a94b` (feat)

## Files Created/Modified
- `src/components/topics/TopicCard.tsx` - Topic grid card with Lucide icon, name, and lesson/vocab counts; links to /topics/:topicId
- `src/pages/TopicListPage.tsx` - Replaced stub; grid of TopicCard components filtered to non-empty topics
- `src/pages/TopicDetailPage.tsx` - Topic detail with lessons section (all unlocked) and vocab section with AudioButton and romanization reveal
- `src/pages/TopicListPage.test.tsx` - 6 vitest unit tests for topic rendering, filtering, counts, and routing
- `src/pages/SettingsPage.tsx` - Replaced stub; three setting rows with animated toggle switches and speed selector
- `src/utils/lucideIcons.ts` - Added Map icon to support Travel topic

## Decisions Made
- Used `(topics as string[]).includes(topic.id)` pattern: the `satisfies Lesson[]` / `satisfies VocabItem[]` operators cause each item's `topics` array to be inferred as a literal readonly tuple. Calling `.includes()` with a general `top-${number}` type fails compilation. Casting to `string[]` is minimal and correct.
- Added `Map` to lucideIcons registry: `topics.ts` has `icon: 'Map'` for Travel but the existing map only contained `MapPin`. Auto-fixed during Task 1 (Rule 1 - Bug).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added Map icon to lucideIcons registry**
- **Found during:** Task 1 (TopicCard implementation)
- **Issue:** topics.ts Travel entry uses `icon: 'Map'` but lucideIcons.ts only registered `MapPin`, causing Travel to fall back to BookOpen icon
- **Fix:** Added `Map` import and entry to iconMap in lucideIcons.ts
- **Files modified:** src/utils/lucideIcons.ts
- **Verification:** tsc --noEmit and npm run build pass; Travel card displays correct map icon
- **Committed in:** 1a73f36 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed TypeScript compile errors from satisfies literal type inference**
- **Found during:** Task 1 (first build attempt)
- **Issue:** `l.topics.includes(topic.id)` failed TypeScript — satisfies operator makes topic arrays literal tuples; general `top-${number}` argument not assignable to 'never'
- **Fix:** Cast `(l.topics as string[]).includes(topic.id)` throughout TopicListPage and TopicDetailPage
- **Files modified:** src/pages/TopicListPage.tsx, src/pages/TopicDetailPage.tsx
- **Verification:** npx tsc --noEmit passes, npm run build succeeds
- **Committed in:** 1a73f36 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 - Bug)
**Impact on plan:** Both required for correct TypeScript compilation and correct icon rendering. No scope creep.

## Issues Encountered
None beyond the two auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Topics navigation path complete and functional
- Settings persistence via Zustand middleware is in place
- Phase 3 (exercises) can build on the lesson content infrastructure without changes to topic/settings layer
- Lesson detail page (from plan 02-03) is also wired in main.tsx, completing the lesson browsing flow

---
*Phase: 02-lessons*
*Completed: 2026-03-12*
