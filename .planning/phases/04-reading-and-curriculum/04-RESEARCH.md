# Phase 4: Reading and Curriculum - Research

**Researched:** 2026-03-12
**Domain:** React/TypeScript reading passage UI, curriculum map visualization, vocabulary glossing, Zustand store extension, Korean word segmentation
**Confidence:** HIGH (codebase is the primary source; all patterns directly verified)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **Vocabulary glossing:** Tap-to-reveal popup on any Korean word — tooltip shows English meaning + romanization. Dismiss by tapping elsewhere. All words glossable. No audio in popup. No SRS integration.
- **Passage presentation:** Line-by-line layout with spacing. Tapping a line plays audio via Naver CLOVA TTS at user's chosen speed. English translation hidden by default, tap to reveal per line. Passage metadata: title, level badge, topic tag. Passages tagged with level, unlocked by lesson progress. Locked passages dimmed with lock icon.
- **Curriculum map:** Vertical scrolling path, lesson nodes connected by a line. Each node: circular icon (checkmark/play/lock) + lesson title. Tapping a node navigates to that lesson (unlocked/complete only). Locked nodes show toast. Map shows lessons only — reading passages accessed via separate Read tab.
- **Navigation structure:** 5-tab bottom bar: Learn | Practice | Read | Topics | Settings. "Learn" tab replaces "Lessons" and shows curriculum map as primary view. "Read" tab is new, shows passage list by level.
- **Progress persistence:** Existing Zustand persist stores already handle localStorage. No new store needed — add `completedReadings` to existing progress store. Phase validates close/reopen restores all state.

### Claude's Discretion

- Exact visual design of curriculum path (node sizes, colors, line style, spacing)
- Popup tooltip design and positioning logic
- Reading passage data schema and content authoring
- Passage word segmentation approach for glossing (Korean doesn't use spaces consistently)
- How to map passage words to gloss entries
- Audio playback UX for line taps (highlight line while playing, etc.)
- Welcome card adaptation for new Learn tab
- 5th tab icon choices (Lucide icons)
- Reading passage content volume (how many passages per level)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| READ-01 | User can read graded Korean text passages matched to their level | Passage data schema with `level` field + unlock gating via `completedLessons` (same `isLessonUnlocked` pattern). New `ReadingPassagePage` with level unlock guard. |
| READ-02 | Reading passages include vocabulary glossing for unknown words | `useGlossToggle` hook (extends `useRomanizationToggle` pattern). Korean tokenization via whitespace + punctuation split at data-authoring time. Gloss data embedded per-word in passage data. |
| READ-03 | Reading passages support line-by-line audio playback | Reuse `speak()` from `utils/audio.ts` + `useSettingsStore` `audioSpeed`. Each passage line is tappable; tapping calls `speak(line.korean, audioSpeed)`. Existing `AudioButton` not reused directly — lines ARE the tap target. |
| PROG-03 | User can view a visual curriculum map showing completion state | New `CurriculumMapPage` replaces `LessonListPage` at `/` route. Uses `completedLessons` from `useProgressStore`. Vertical SVG/CSS line connecting lesson nodes. |
| PROG-04 | User progress persists across sessions via localStorage | Already implemented via Zustand persist middleware. Phase adds `completedReadings` to `useProgressStore` with store version bump to `2`, `partialize` update, and migration from v1. Validate with browser close/reopen test. |
</phase_requirements>

---

## Summary

Phase 4 is a primarily UI-composition phase — almost all infrastructure exists. The existing TTS pipeline (`speak()`), persist stores, `useRomanizationToggle` pattern, `Toast`, `LessonCard`, and unlock logic are all reusable without modification (except `useProgressStore`, which gets a version bump for `completedReadings`).

The three genuinely new problems are: (1) Korean word segmentation for per-word glossing, (2) the curriculum path visual layout (CSS or SVG vertical line connecting node circles), and (3) the reading passage data schema. All three are author-time decisions rather than runtime complexity — the planner should treat them as content/structure tasks with low technical risk.

The main risk is Korean tokenization for glossing. Korean does not use spaces between all morphemes, but passages can be pre-segmented at authoring time (data array of tokens per line), sidestepping runtime parsing entirely. This is the recommended approach given the project already uses authored data files.

**Primary recommendation:** Author passage data as pre-segmented arrays of `{ text, gloss? }` tokens per line. This eliminates runtime Korean tokenization complexity and keeps the approach consistent with the existing TypeScript data-as-source-of-truth pattern.

---

## Standard Stack

### Core (already in project)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.0.0 | Component rendering | Project baseline |
| react-router-dom | 7.13.1 | Routing — new `/read`, `/read/:passageId` routes | Project baseline |
| zustand | 5.0.11 | State — extend `useProgressStore` for `completedReadings` | Established in phases 1-3 |
| framer-motion | 12.35.2 | Toast animations (already used in `Toast.tsx`) | Project baseline |
| lucide-react | 0.577.0 | Icons — new tab icons (e.g. `BookText` for Read, `GraduationCap` for Learn) | Project baseline |
| tailwindcss | 4.2.1 | Styling — all layout and node design | Project baseline |

### Supporting (already in project)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| es-hangul | 2.3.8 | Korean text utilities | If runtime tokenization is ever needed — NOT needed for authored segmentation approach |
| ts-fsrs | 5.2.3 | SRS (no new usage) | Not touched in this phase |

### No New Dependencies

All Phase 4 features build on existing dependencies. Do NOT add new libraries.

**Installation:** None needed.

---

## Architecture Patterns

### Recommended Project Structure (new files only)

```
src/
├── types/
│   └── content.ts              # Add ReadingPassage, PassageLine, PassageToken interfaces
├── data/
│   └── readings.ts             # New: READINGS data array (satisfies ReadingPassage[])
├── utils/
│   └── readingUnlock.ts        # New: isPassageUnlocked() — parallel to lessonUnlock.ts
├── hooks/
│   └── useGlossToggle.ts       # New: per-word gloss reveal toggle (extends useRomanizationToggle pattern)
├── pages/
│   ├── CurriculumMapPage.tsx   # New: replaces LessonListPage as "/" route (Learn tab)
│   ├── ReadingListPage.tsx     # New: "/read" route, passage list by level
│   └── ReadingPassagePage.tsx  # New: "/read/:passageId" route, passage reader
├── components/
│   ├── layout/
│   │   └── BottomTabBar.tsx    # MODIFIED: 4 tabs → 5 tabs, "Lessons" → "Learn"
│   ├── curriculum/             # New folder
│   │   ├── CurriculumNode.tsx  # Circular node with icon + lesson title
│   │   └── CurriculumPath.tsx  # Vertical line connector between nodes
│   └── reading/                # New folder
│       ├── PassageLineRow.tsx  # Single line: Korean text + tap-to-reveal translation + audio
│       └── GlossPopup.tsx      # Word gloss tooltip (English + romanization)
└── store/
    └── progress.ts             # MODIFIED: add completedReadings, bump version to 2, update migrate/partialize
```

### Pattern 1: Pre-segmented Passage Data Schema

**What:** Passages authored as arrays of lines, each line as an array of tokens. Each token is either plain text or a glossable word entry.

**When to use:** Any reading passage content. This sidesteps Korean runtime tokenization entirely.

**Example:**

```typescript
// src/types/content.ts (additions)

/** A single token in a reading passage line — either plain text or a glossable word. */
export interface PassageToken {
  text: string;
  /** If present, this word has a gloss entry */
  gloss?: {
    english: string;
    romanization: string;
  };
}

/** A single line in a reading passage with Korean text, translation, and tokens. */
export interface PassageLine {
  /** Full Korean line — used for TTS audio */
  korean: string;
  /** English translation — hidden by default, revealed on tap */
  english: string;
  /** Pre-segmented tokens for per-word glossing */
  tokens: PassageToken[];
}

/** A graded Korean reading passage. */
export interface ReadingPassage {
  /** Prefixed counter ID, e.g. "rdg-001" */
  id: `rdg-${number}`;
  title: string;
  /** Level that must be completed to unlock this passage */
  level: number;
  topics: `top-${number}`[];
  lines: PassageLine[];
}
```

```typescript
// src/data/readings.ts
import type { ReadingPassage } from '../types/content';

export const READINGS = [
  {
    id: 'rdg-001',
    title: 'At the Market',
    level: 1,
    topics: ['top-003'],
    lines: [
      {
        korean: '저는 시장에 가요.',
        english: 'I go to the market.',
        tokens: [
          { text: '저는', gloss: { english: 'I (topic)', romanization: 'jeo-neun' } },
          { text: ' ' },
          { text: '시장에', gloss: { english: 'to the market', romanization: 'si-jang-e' } },
          { text: ' ' },
          { text: '가요', gloss: { english: 'go', romanization: 'ga-yo' } },
          { text: '.' },
        ],
      },
    ],
  },
] satisfies ReadingPassage[];
```

### Pattern 2: useGlossToggle Hook

**What:** Extends the `useRomanizationToggle` pattern for gloss popup management. One gloss visible at a time. Key is `${passageId}-${lineIndex}-${tokenIndex}`.

**When to use:** `ReadingPassagePage` — manages which word gloss is currently shown.

```typescript
// src/hooks/useGlossToggle.ts
// Identical shape to useRomanizationToggle.ts
// toggle(wordKey), isRevealed(wordKey), hideAll()
// State: string | null (only one gloss at a time)
```

### Pattern 3: Curriculum Map Node Layout

**What:** Vertical list of lesson nodes with a CSS connecting line. No SVG required — use a positioned border-left on the container.

**When to use:** `CurriculumMapPage`

```typescript
// CurriculumNode state: 'completed' | 'current' | 'locked'
// Determine state:
//   completed: completedLessons.includes(lesson.id)
//   current:   first lesson that is unlocked but not completed
//   locked:    !isLessonUnlocked(lesson, LESSONS, completedLessons)

// Layout: relative positioned container with border-left line
// Node: absolute positioned circle overlapping the line
// Colors: completed=green, current=blue, locked=gray
```

```tsx
// CurriculumNode.tsx example structure
<div className="relative flex items-start gap-4 pb-6">
  {/* Vertical line (except last node) */}
  {!isLast && (
    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
  )}
  {/* Circle icon */}
  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${circleClass}`}>
    {state === 'completed' && <CheckCircle2 size={16} />}
    {state === 'current' && <Play size={14} />}
    {state === 'locked' && <Lock size={14} />}
  </div>
  {/* Lesson title */}
  <div className="pt-1">
    <p className={`font-medium text-sm ${state === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
      {lesson.title}
    </p>
  </div>
</div>
```

### Pattern 4: Progress Store Extension (version bump)

**What:** Add `completedReadings: string[]` and `completeReading` action to existing `useProgressStore`. Bump `version` from 1 to 2. Update `partialize` and `migrate`.

**When to use:** This is required for READ-01/PROG-04. Store must be version-bumped because the shape changes.

```typescript
// progress.ts changes:

// 1. Add to ProgressStoreState interface:
completedReadings: string[];
completeReading: (readingId: string) => void;

// 2. Add to initialState:
completedReadings: [] as string[],

// 3. Add action:
completeReading: (readingId: string) =>
  set((state) => ({
    completedReadings: state.completedReadings.includes(readingId)
      ? state.completedReadings
      : [...state.completedReadings, readingId],
  })),

// 4. Update partialize to include completedReadings

// 5. Bump version: 1 → 2

// 6. Add migration case for storedVersion === 1:
if (storedVersion === 1) {
  return { ...persistedState as ..., completedReadings: [] };
}
```

### Pattern 5: Passage Level Unlock

**What:** A passage is unlocked when all lessons at the passage's level are completed.

**When to use:** `ReadingListPage` (dimming), `ReadingPassagePage` (locked guard).

```typescript
// src/utils/readingUnlock.ts
import type { ReadingPassage } from '../types/content';
import type { Lesson } from '../types/content';

export function isPassageUnlocked(
  passage: ReadingPassage,
  allLessons: Lesson[],
  completedLessons: string[]
): boolean {
  const lessonsForLevel = allLessons.filter((l) => l.level === passage.level);
  if (lessonsForLevel.length === 0) return true; // no lessons at level = open
  return lessonsForLevel.every((l) => completedLessons.includes(l.id));
}
```

### Pattern 6: Line Audio Tap

**What:** Tapping a passage line calls `speak(line.korean, audioSpeed)` directly. The line container is a `button` (or `div role="button"`). Optionally highlight the active line while audio plays using a `playingLine: number | null` state.

**When to use:** `PassageLineRow.tsx`

```typescript
// ReadingPassagePage owns: playingLine state (number | null)
// PassageLineRow receives: onAudioTap callback
// On tap: set playingLine to this line index, call speak(), clear on resolve/reject

async function handleLineTap(lineIndex: number, koreanText: string) {
  setPlayingLine(lineIndex);
  try {
    await speak(koreanText, audioSpeed);
  } finally {
    setPlayingLine(null);
  }
}
```

### Anti-Patterns to Avoid

- **Runtime Korean tokenization:** Do NOT use `es-hangul` or custom regex to split Korean text at runtime for glossing. Pre-segment at authoring time in the data file — tokens array per line.
- **Separate gloss store:** Do NOT create a Zustand store for gloss state. It is ephemeral UI state — local `useState` via `useGlossToggle` hook.
- **Re-implementing unlock logic:** Do NOT rewrite lesson unlock for the curriculum map. Import and reuse `isLessonUnlocked` from `utils/lessonUnlock.ts`.
- **SVG for curriculum line:** Do NOT use SVG for the vertical connecting line between nodes. A simple CSS `border-left` or `w-0.5 bg-gray-200` div with absolute positioning is sufficient and matches the Tailwind CSS-only approach used throughout.
- **5-tab flex-1 overflow:** With 5 tabs, each `flex-1` tab in `BottomTabBar` will be narrower. Test on 320px viewport width to ensure labels don't wrap or truncate badly. Consider dropping tab text labels to icons-only for 5-tab layout, or use shorter labels.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Korean TTS | Custom audio fetching | Existing `speak()` in `utils/audio.ts` | Already handles caching, speed, stop-on-new |
| Gloss tooltip state | Custom event system | `useGlossToggle` (modeled on `useRomanizationToggle`) | Idiomatic React hook, handles one-at-a-time correctly |
| Passage level gating | Custom logic | `isPassageUnlocked()` in new `readingUnlock.ts` (mirrors `lessonUnlock.ts`) | Consistent unlock semantics, testable |
| Lesson node state (complete/current/locked) | Complex state machine | `isLessonUnlocked()` + `completedLessons.includes()` | Already proven in phases 1-3 |
| Locked content feedback | Custom modal | `Toast` component in `components/ui/Toast.tsx` | Established pattern — see `LessonListPage` |
| Level badge on passage cards | Custom component | Numeric level `<span>` with Tailwind badge classes | `SpeechBadge` pattern — simple inline badge |
| Store persistence | Custom localStorage | Zustand persist middleware (already configured) | Already handles versioning, migration, corruption |

**Key insight:** This phase is almost entirely UI composition over existing infrastructure. The hardest problem (Korean tokenization) is eliminated by pre-segmenting passage data at authoring time.

---

## Common Pitfalls

### Pitfall 1: Zustand Store Version Not Bumped

**What goes wrong:** Adding `completedReadings` to `useProgressStore` without bumping `version` from 1 to 2 causes existing users' rehydrated state to lack `completedReadings` — runtime errors accessing `.includes()` on undefined.

**Why it happens:** Zustand's persist middleware only runs `migrate` when `storedVersion` differs from `version`. If version stays at 1, old localStorage data is hydrated as-is without migration, missing the new field.

**How to avoid:** Always bump `version` when adding fields to a persisted store. Add a migration case `storedVersion === 1 → spread v1 state + completedReadings: []`. Update `partialize` to include `completedReadings`.

**Warning signs:** `TypeError: state.completedReadings.includes is not a function` after store change.

### Pitfall 2: 5-Tab Bottom Bar Label Overflow on Small Viewports

**What goes wrong:** Five `flex-1` tabs at 320px viewport = 64px each. Tab labels "Learn", "Practice", "Read", "Topics", "Settings" may truncate or wrap, breaking the layout.

**Why it happens:** `BottomTabBar.tsx` currently has 4 tabs — adding a 5th reduces each from ~25% to 20% width.

**How to avoid:** Test on 320px viewport after adding 5th tab. If labels overflow, shorten "Practice" → "Train" or use icons only (consistent with common mobile patterns). Alternatively use `text-[10px]` instead of `text-xs` for 5-tab labels.

**Warning signs:** Visible label wrap or ellipsis on iPhone SE screen size.

### Pitfall 3: Gloss Popup Overflows Viewport at Line Edges

**What goes wrong:** A gloss tooltip anchored to a word near the right edge of the screen overflows off-screen to the right.

**Why it happens:** Naive `position: absolute; left: 0` on the tooltip renders relative to the word, not the viewport.

**How to avoid:** Use `max-w-[160px]` on the tooltip and apply a clamp: if the word is in the right half of the viewport, anchor the tooltip to the right instead of left. Or use a fixed-position tooltip anchored to the word's `getBoundingClientRect()`. Keep it simple — a small `bg-white border rounded shadow-md px-2 py-1 text-xs` popup is sufficient.

**Warning signs:** Tooltip shows partial content or is cut off on the right side.

### Pitfall 4: Audio Highlight State Not Cleared on Navigation

**What goes wrong:** User taps a line, audio starts, user navigates away before audio finishes — `playingLine` state is stale but audio continues playing.

**Why it happens:** `speak()` is fire-and-forget unless awaited; page unmount doesn't cancel the audio.

**How to avoid:** Call `stopAudio()` (already exported from `utils/audio.ts`) in a `useEffect` cleanup on `ReadingPassagePage` unmount:

```typescript
useEffect(() => {
  return () => stopAudio();
}, []);
```

**Warning signs:** Audio keeps playing after navigating away from reading passage.

### Pitfall 5: WelcomeCard NavigatePath is Hard-Coded

**What goes wrong:** `WelcomeCard` currently navigates to `/lessons/les-001` — this path still works after renaming the "Lessons" tab to "Learn" but the curriculum map at `/` replaces `LessonListPage`, so the welcome card's button logic (hiding after any lesson completed) remains correct but the navigate target should remain `/lessons/les-001` (lesson detail route is unchanged).

**Why it happens:** The "Learn" tab rename doesn't change `/lessons/:lessonId` routes — only the index `/` route changes from `LessonListPage` to `CurriculumMapPage`. WelcomeCard adapts by being re-homed to the curriculum map view.

**How to avoid:** Do not change the `/lessons/:lessonId` route. Only the index route changes. Update `WelcomeCard` button to navigate to `/lessons/les-001` (unchanged) or adapt its copy to reflect the curriculum map context.

### Pitfall 6: Reading Passage Unlock Criterion

**What goes wrong:** Using "any lesson at this level completed" instead of "all lessons at this level completed" creates passages that unlock prematurely.

**Why it happens:** The CONTEXT.md says "Level 1 passages available after completing Level 1 lessons" — plural. This means all Level 1 lessons must be done.

**How to avoid:** `isPassageUnlocked` uses `every()` not `some()` — all lessons at the passage's level must be in `completedLessons`.

---

## Code Examples

Verified patterns from existing codebase:

### Reading Line with Audio Tap and Translation Reveal

```typescript
// PassageLineRow.tsx
interface PassageLineRowProps {
  line: PassageLine;
  lineIndex: number;
  isPlaying: boolean;
  onAudioTap: () => void;
  activeGlossKey: string | null;
  onGlossTap: (key: string) => void;
  onGlossDismiss: () => void;
}

// Key behaviors:
// - Outer div: onClick={onGlossDismiss} to dismiss gloss when tapping non-word area
// - Each token: onClick={(e) => { e.stopPropagation(); onGlossTap(tokenKey); }}
// - Line audio: separate tap area (e.g. left speaker icon or tapping the korean line)
// - Translation: useState(false) → revealed on tap of "Show translation" button
```

### Store Version Bump Migration Pattern

```typescript
// In persist() options — versioned migration
version: 2,  // bumped from 1
migrate: (persistedState, storedVersion) => {
  if (storedVersion < 1) {
    return { completedLessons: [], lastActiveLesson: null, completedReadings: [] };
  }
  if (storedVersion === 1) {
    // v1 → v2: add completedReadings
    return {
      ...(persistedState as { completedLessons: string[]; lastActiveLesson: string | null }),
      completedReadings: [],
    };
  }
  return persistedState as Omit<ProgressStoreState, '_corruptionDetected' | 'completeLesson' | 'setActiveLesson' | 'completeReading' | 'clearCorruptionFlag'>;
},
```

### Curriculum Map Node Status Derivation

```typescript
// CurriculumMapPage.tsx
const sorted = [...LESSONS].sort((a, b) =>
  a.level !== b.level ? a.level - b.level : a.order - b.order
);

// Find first unlocked + incomplete lesson (the "current" node)
const currentLessonId = sorted.find(
  (l) => isLessonUnlocked(l, LESSONS, completedLessons) && !completedLessons.includes(l.id)
)?.id ?? null;

function getNodeState(lesson: Lesson): 'completed' | 'current' | 'locked' {
  if (completedLessons.includes(lesson.id)) return 'completed';
  if (lesson.id === currentLessonId) return 'current';
  return 'locked';
}
```

### Bottom Tab Bar — 5-Tab Extension

```typescript
// BottomTabBar.tsx — add Read tab between Practice and Topics
// New imports needed: BookText (or FileText) for Read, GraduationCap (or Map) for Learn
// Rename label "Lessons" → "Learn", keep to="/" end

// Candidate icons (all available in lucide-react 0.577.0):
// Learn tab: GraduationCap, BookOpen (already used — reuse is fine), Map
// Read tab: BookText, FileText, AlignLeft
// Must register new icons in lucideIcons.ts if used in topic/lesson rendering context
// (BottomTabBar imports directly, no registry needed for tab bar itself)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| LessonListPage as Learn tab index | CurriculumMapPage as Learn tab index | Phase 4 | `/` route replaces `<LessonListPage />` with `<CurriculumMapPage />`; LessonListPage can be deleted or kept as unused file |
| 4-tab BottomTabBar | 5-tab BottomTabBar | Phase 4 | Add Read tab between Practice and Topics |
| progress store v1 (completedLessons only) | progress store v2 (+ completedReadings) | Phase 4 | Store migration required — storedVersion 1 → 2 |

**No deprecated APIs used in this phase.** All patterns follow the established Phase 1-3 approach.

---

## Open Questions

1. **Passage content volume**
   - What we know: CONTEXT.md flags "Reading passage content authoring volume is unvalidated." Lessons currently have 2 levels (les-001 to les-005: 3 at level 1, 2 at level 2).
   - What's unclear: How many passages per level to author for MVP? The unlock criterion (all level-N lessons complete) means Level 2 passages need 2 completions to unlock.
   - Recommendation: Author 2 passages per existing level (4 total: rdg-001/002 at level 1, rdg-003/004 at level 2). This is sufficient for validation without over-investing in content.

2. **Gloss tooltip positioning strategy**
   - What we know: `position: absolute` inside a line container will overflow at right edge.
   - What's unclear: Whether to use `getBoundingClientRect` + `position: fixed` or a simpler Tailwind-only solution.
   - Recommendation: Use a simple approach — render the tooltip with `absolute bottom-full left-0` (above the word), cap with `max-w-[180px]`, and add `right-0 left-auto` when the word token is in the last 40% of the container. Avoid JavaScript positioning; use CSS class toggling based on token index relative to line length.

3. **CurriculumMapPage scroll-to-current behavior**
   - What we know: If there are many lessons, the "current" node may not be visible on initial render.
   - What's unclear: Whether to auto-scroll to current node on mount.
   - Recommendation: Auto-scroll using `useEffect` + `ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })` on the current node. This is a UX improvement that fits within Claude's Discretion.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| Config file | `vite.config.ts` (vitest config embedded — `test.globals: true, environment: 'happy-dom'`) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| READ-01 | `isPassageUnlocked` returns true when all level-N lessons completed | unit | `npx vitest run src/utils/readingUnlock.test.ts` | Wave 0 |
| READ-01 | `isPassageUnlocked` returns false when level-N lessons not all completed | unit | `npx vitest run src/utils/readingUnlock.test.ts` | Wave 0 |
| READ-02 | `useGlossToggle` reveals one gloss at a time, dismisses on `hideAll()` | unit | `npx vitest run src/hooks/useGlossToggle.test.ts` | Wave 0 |
| READ-03 | `PassageLineRow` calls `onAudioTap` when line is tapped | unit | `npx vitest run src/components/reading/PassageLineRow.test.tsx` | Wave 0 |
| PROG-03 | `CurriculumMapPage` renders completed node with checkmark, locked with lock | unit | `npx vitest run src/pages/CurriculumMapPage.test.tsx` | Wave 0 |
| PROG-04 | `useProgressStore` v2 persists `completedReadings` to localStorage | unit | `npx vitest run src/store/progress.test.ts` | ✅ (extend existing) |
| PROG-04 | `useProgressStore` v1 → v2 migration adds empty `completedReadings` | unit | `npx vitest run src/store/progress.test.ts` | ✅ (extend existing) |
| PROG-04 | `useProgressStore` `completeReading` deduplicates | unit | `npx vitest run src/store/progress.test.ts` | ✅ (extend existing) |

### Sampling Rate

- **Per task commit:** `npx vitest run`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/utils/readingUnlock.test.ts` — covers READ-01 unlock logic
- [ ] `src/hooks/useGlossToggle.test.ts` — covers READ-02 gloss toggle
- [ ] `src/components/reading/PassageLineRow.test.tsx` — covers READ-03 audio tap
- [ ] `src/pages/CurriculumMapPage.test.tsx` — covers PROG-03 node rendering

*(No new framework install required — existing Vitest + happy-dom + testing-library handles all cases)*

---

## Sources

### Primary (HIGH confidence)

- Direct codebase inspection: `src/store/progress.ts`, `src/store/settings.ts`, `src/store/srs.ts` — confirmed Zustand persist pattern, version field, partialize, migrate structure
- Direct codebase inspection: `src/hooks/useRomanizationToggle.ts` — confirmed gloss hook design basis
- Direct codebase inspection: `src/utils/audio.ts` — confirmed `speak()`, `stopAudio()`, caching, speed mapping
- Direct codebase inspection: `src/utils/lessonUnlock.ts` — confirmed unlock pattern for parallel `readingUnlock.ts`
- Direct codebase inspection: `src/components/layout/BottomTabBar.tsx` — confirmed 4-tab structure to extend
- Direct codebase inspection: `src/components/ui/Toast.tsx`, `LessonCard.tsx`, `WelcomeCard.tsx` — confirmed reuse targets
- Direct codebase inspection: `src/types/content.ts` — confirmed ID convention `rdg-NNN`, `satisfies` operator usage
- Direct codebase inspection: `src/main.tsx` — confirmed router structure for new routes
- `package.json` — confirmed all dependencies, lucide-react 0.577.0, framer-motion 12.35.2

### Secondary (MEDIUM confidence)

- `src/pages/LessonListPage.tsx` — confirmed level grouping and locked tap toast pattern to mirror in ReadingListPage
- `src/pages/LessonDetailPage.tsx` — confirmed locked guard pattern and audio/completion patterns

### Tertiary (LOW confidence)

- None — all findings are directly verified from the codebase.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — directly verified from package.json and existing source files
- Architecture: HIGH — all patterns derived from existing code, not assumed
- Pitfalls: HIGH (store version bump, audio cleanup, viewport overflow) / MEDIUM (gloss positioning — CSS approach not battle-tested against real data)
- Test map: HIGH — existing test files confirm happy-dom + vitest work for store and hook tests

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable stack; no fast-moving dependencies in this phase)
