# Phase 2: Lessons - Research

**Researched:** 2026-03-12
**Domain:** React UI — routing, audio, lesson display, topic browsing, progression
**Confidence:** HIGH

## Summary

Phase 2 builds the entire visible app on top of the Phase 1 foundation. `App.tsx` is currently a bare placeholder; this phase adds react-router-dom layout routes, three pages (LessonList, TopicList, Settings), two detail pages (LessonDetail, TopicDetail), and a suite of shared UI components. All data types, stores, and content arrays are already defined — this phase is primarily about rendering and wiring, not schema design.

The audio system is the highest-risk piece: the Naver TTS Cloudflare Worker infrastructure already exists in the sibling Hanguller project and is well-understood. The `speak()` function from `C:/dev/Hanguller/src/utils/audio.js` provides the complete, production-verified pattern — blob-URL caching, rate-to-speed mapping, single-audio-at-a-time cancellation, and Web Speech API fallback. This should be adapted (not reimagined) for Hanbuddy.

The project already has react-router-dom v7, framer-motion v12, lucide-react, zustand, and tailwindcss v4 installed. No new runtime dependencies are needed. Toast notifications and speed toggling are simple enough to implement with local component state or a tiny Zustand slice — adding react-hot-toast or similar is unnecessary.

**Primary recommendation:** Wire react-router-dom v7 layout routes with a bottom tab bar, adapt the Hanguller `speak()` audio utility into `src/utils/audio.ts`, then build pages top-down (LessonList → LessonDetail → TopicList → TopicDetail → Settings).

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Lesson page layout**
- Single continuous scroll page: lesson intro → pattern/explanation → inline conjugation table → example sentences with audio → vocabulary reference at bottom
- No tabs or sub-navigation within a lesson — one linear flow
- Conjugation tables are inline (word → ending type → particle → result), embedded in the scroll flow
- Vocabulary items referenced by the lesson appear in a "Vocabulary Reference" section at the bottom of the lesson page

**Speech level display**
- Each example sentence has a small colored badge showing its speech level (해요체 polite, 합쇼체 formal)
- Formal and informal polite forms are distinguished from the very first lesson — no lesson presents a single form as "the Korean way"

**Audio & TTS**
- Naver CLOVA TTS via Cloudflare Worker — same infrastructure as Hanguller (`C:/dev/Hanguller/tts-worker/`)
- Uses Naver Dictionary voice API (`dict.naver.com/api/nvoice`) with `speaker` and `speed` params
- Inline play button (speaker icon) next to each example sentence — per-sentence playback
- Persistent speed toggle (0.75x / 1x) in the lesson page header — changes apply immediately to next audio played, syncs with settings store (`audioSpeed`)

**Navigation structure**
- Bottom tab bar: Lessons | Topics | Settings — mobile-friendly, Lessons is primary tab
- react-router-dom for routing (already a project dependency from Phase 1 decision)

**Lessons tab**
- Lessons grouped under level headings (Level 1, Level 2, ...)
- Each lesson displayed as a card: title, description snippet, completion status indicator
- Locked lessons are dimmed (lower opacity) with a lock icon replacing the status indicator
- Tapping a locked lesson shows a toast: "Complete [previous lesson] to unlock this"

**Topics tab**
- Grid of topic cards showing icon (Lucide, from Topic.icon field) + count of lessons and vocab items
- Tapping a topic card opens a detail page with two sections: "Lessons" (linked lesson cards) and "Vocabulary" (Korean/English with audio button)
- Topic browsing ignores level locking — all content for a topic is accessible regardless of progression

**Beginner orientation**
- Welcome card at top of Lessons tab for first-time users: "Welcome to Hanbuddy! Start your Korean journey with Lesson 1" + "Start Learning" button
- Card dismisses after the user starts their first lesson (tracked via completedLessons in progress store)
- No separate onboarding flow or full-screen splash

**Lesson completion & progression**
- Explicit "Complete Lesson" button at the bottom of the lesson page — must tap to mark complete
- Completion triggers a brief celebration card: "Lesson Complete! Next: [title]" with "Continue" button
- Per-lesson sequential unlocking: completing Lesson N unlocks Lesson N+1 (within and across levels)
- Progress tracked via useProgressStore.completedLessons (already exists)

### Claude's Discretion
- Exact visual design (colors, spacing, typography, shadows, animations)
- Loading states and error handling
- Settings page layout and content
- Toast/notification implementation approach
- Lesson page scroll behavior details
- Exact Cloudflare Worker adaptation (copy vs shared worker)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| GRAM-01 | User can study grammar lesson pages with pattern explanations, particles, and conjugation | `GrammarPoint` type has `pattern`, `explanation`, `examples`; lesson page scroll layout decided |
| GRAM-02 | Each grammar point includes 3-5 worked examples with audio | `ExampleSentence` type exists; audio utility pattern from Hanguller `speak()` |
| GRAM-04 | Grammar points are cross-referenced and linkable across the app | ID-based references already in `Lesson.grammar_ids`; react-router-dom links to lesson/grammar anchors |
| GRAM-05 | Grammar lessons cover speech levels (formal/informal) from the start | `speech_level` field on `GrammarPoint`; colored badge approach decided |
| LIST-01 | All audio supports adjustable speed (0.75x slow / 1.0x normal) | `useSettingsStore.audioSpeed`; Naver speed param mapping: 0.75→-2, 1.0→0 |
| PROG-01 | Lessons are organized in structured levels that unlock sequentially | `Lesson.level` + `Lesson.order` fields; `useProgressStore.completedLessons` for gate logic |
| PROG-02 | User can browse vocabulary and lessons by topic regardless of level | `Topic` type + `topics` arrays on all content; Topics tab ignores lock state |
| PROG-05 | Clear beginner orientation directs new users to Level 1 | Welcome card in Lessons tab, dismisses on first lesson start |
</phase_requirements>

---

## Standard Stack

### Core (all already installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-router-dom | ^7.13.1 | Routing, nested layouts, NavLink | Already installed; v7 is minor upgrade from v6 — same API, add `createBrowserRouter` |
| zustand | ^5.0.11 | State management (progress, settings) | Already in use with persist middleware |
| lucide-react | ^0.577.0 | Icons (Volume2, Lock, Check, ChevronRight, etc.) | Already installed; Topic.icon field stores Lucide icon names |
| framer-motion | ^12.35.2 | Completion celebration card animation, tab transitions | Already installed |
| tailwindcss | ^4.2.1 | Utility-first CSS — v4 CSS-first, no config file needed | Already installed via @tailwindcss/vite plugin |

### Supporting (already installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| es-hangul | ^2.3.8 | josa particle attachment for dynamic text | Used in content engine; available for UI text (e.g., attaching particles to lesson titles) |
| @testing-library/react | ^16.3.2 | Component integration tests | Use for LessonList unlock logic, audio hook tests |

### No New Dependencies Needed

The phase requires zero new `npm install` commands. Every runtime need — routing, state, icons, animation, CSS — is satisfied by Phase 1 installs.

**Browser API used:** `new Audio(blobUrl)`, `URL.createObjectURL(blob)`, `fetch()` for TTS calls. No polyfill needed for target browsers (modern mobile/desktop).

## Architecture Patterns

### Recommended Project Structure

```
src/
├── pages/
│   ├── LessonListPage.tsx       # Lessons tab: level groups, welcome card
│   ├── LessonDetailPage.tsx     # Full lesson scroll: grammar + vocab
│   ├── TopicListPage.tsx        # Topics tab: grid of topic cards
│   ├── TopicDetailPage.tsx      # Topic detail: linked lessons + vocab
│   └── SettingsPage.tsx         # Audio speed toggle, romanization toggle
├── components/
│   ├── layout/
│   │   ├── RootLayout.tsx       # BrowserRouter root — holds bottom tab bar
│   │   └── BottomTabBar.tsx     # NavLink-based tab navigation
│   ├── lessons/
│   │   ├── LessonCard.tsx       # Reusable lesson card (list + topic detail)
│   │   ├── GrammarSection.tsx   # Grammar point block within lesson detail
│   │   ├── ConjugationTable.tsx # Inline conjugation table
│   │   ├── ExampleSentence.tsx  # Sentence row with audio button + speech badge
│   │   └── VocabReference.tsx   # Vocab section at lesson bottom
│   ├── topics/
│   │   └── TopicCard.tsx        # Topic grid card with Lucide icon
│   └── ui/
│       ├── AudioButton.tsx      # Speaker icon button — calls speak()
│       ├── SpeedToggle.tsx      # 0.75x / 1x toggle in header
│       ├── SpeechBadge.tsx      # Colored badge for 해요체 / 합쇼체
│       ├── WelcomeCard.tsx      # Beginner orientation card
│       ├── CompletionCard.tsx   # "Lesson Complete!" celebration
│       └── Toast.tsx            # Transient lock-tap message
└── utils/
    └── audio.ts                 # Adapted from Hanguller: speak(), cache, fallback
```

### Pattern 1: react-router-dom v7 Layout with Bottom Tab Bar

**What:** A root `createBrowserRouter` with a layout route that renders `<Outlet />` above a sticky bottom tab bar. Each tab (Lessons, Topics, Settings) is a top-level route.
**When to use:** Any mobile-first app with persistent tab navigation.

```tsx
// src/main.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import LessonListPage from './pages/LessonListPage';
import LessonDetailPage from './pages/LessonDetailPage';
import TopicListPage from './pages/TopicListPage';
import TopicDetailPage from './pages/TopicDetailPage';
import SettingsPage from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LessonListPage /> },
      { path: 'lessons/:lessonId', element: <LessonDetailPage /> },
      { path: 'topics', element: <TopicListPage /> },
      { path: 'topics/:topicId', element: <TopicDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
```

```tsx
// src/components/layout/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
```

```tsx
// src/components/layout/BottomTabBar.tsx
import { NavLink } from 'react-router-dom';
import { BookOpen, LayoutGrid, Settings } from 'lucide-react';

export default function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'tab tab-active' : 'tab'}>
        <BookOpen size={22} /> Lessons
      </NavLink>
      <NavLink to="/topics" className={({ isActive }) => isActive ? 'tab tab-active' : 'tab'}>
        <LayoutGrid size={22} /> Topics
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'tab tab-active' : 'tab'}>
        <Settings size={22} /> Settings
      </NavLink>
    </nav>
  );
}
```

**Key detail:** `<NavLink to="/" end>` requires the `end` prop so the Lessons tab only activates on exact `/` match, not on `/topics`.

### Pattern 2: Lesson Unlock Logic

**What:** A pure function that determines whether a lesson is unlocked given the completedLessons set.
**When to use:** LessonListPage (rendering), LessonDetailPage (guard), locked-tap toast trigger.

```tsx
// Derives unlock state from sorted lesson list + completedLessons
function isLessonUnlocked(lesson: Lesson, allLessons: Lesson[], completedLessons: string[]): boolean {
  // First lesson is always unlocked
  const sorted = [...allLessons].sort((a, b) =>
    a.level !== b.level ? a.level - b.level : a.order - b.order
  );
  const idx = sorted.findIndex((l) => l.id === lesson.id);
  if (idx === 0) return true;
  const previous = sorted[idx - 1];
  return completedLessons.includes(previous.id);
}
```

### Pattern 3: Audio Utility (adapted from Hanguller)

**What:** `src/utils/audio.ts` — a singleton module with blob-URL cache, single-instance cancellation, Naver TTS fetch, and Web Speech API fallback.
**When to use:** Every `<AudioButton>` component call.

Key mapping — Naver `speed` parameter (integer -5 to 5, 0 = normal):
- `audioSpeed = 0.75` → `speed = -2` (confirmed from Hanguller source)
- `audioSpeed = 1.0` → `speed = 0`

```ts
// src/utils/audio.ts
const TTS_WORKER_URL = import.meta.env.VITE_TTS_WORKER_URL ?? 'https://hanbuddy-tts.YOUR_ACCOUNT.workers.dev';

let currentAudio: HTMLAudioElement | null = null;
const cache = new Map<string, string>(); // cacheKey → blob URL

export async function speak(text: string, speed: 0.75 | 1 = 1): Promise<void> {
  // Stop current playback
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const naverSpeed = speed === 0.75 ? -2 : 0;
  const cacheKey = `${text}|${naverSpeed}`;
  let blobUrl = cache.get(cacheKey);

  if (!blobUrl) {
    const res = await fetch(`${TTS_WORKER_URL}?text=${encodeURIComponent(text)}&speed=${naverSpeed}&speaker=kyuri`);
    if (!res.ok) throw new Error(`TTS ${res.status}`);
    const blob = await res.blob();
    blobUrl = URL.createObjectURL(blob);
    cache.set(cacheKey, blobUrl);
  }

  const audio = new Audio(blobUrl);
  currentAudio = audio;
  await audio.play();
}

export function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}
```

**Cloudflare Worker:** Copy `C:/dev/Hanguller/tts-worker/worker.js` and `wrangler.toml` verbatim into `tts-worker/` in Hanbuddy root. Rename the worker in wrangler.toml to `hanbuddy-tts`. Deploy separately (`wrangler deploy`). Expose URL via `VITE_TTS_WORKER_URL` env variable.

**env variable pattern:** Create `.env.local` with `VITE_TTS_WORKER_URL=https://...`. Vite exposes `VITE_*` vars to the browser at build time via `import.meta.env`.

### Pattern 4: Speech Level Badge

**What:** A small inline badge with color-coded speech level.
**When to use:** Every `<ExampleSentence>` row.

```tsx
// src/components/ui/SpeechBadge.tsx
const BADGE_CONFIG: Record<SpeechLevel, { label: string; className: string }> = {
  'formal-high': { label: '합쇼체', className: 'bg-blue-100 text-blue-800' },
  polite:        { label: '해요체', className: 'bg-green-100 text-green-800' },
  informal:      { label: '반말',   className: 'bg-yellow-100 text-yellow-800' },
  plain:         { label: '기본형', className: 'bg-gray-100 text-gray-600' },
};

export function SpeechBadge({ level }: { level: SpeechLevel }) {
  const { label, className } = BADGE_CONFIG[level];
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${className}`}>
      {label}
    </span>
  );
}
```

### Pattern 5: Toast (Locked Lesson Tap)

**What:** A simple React state-based toast — no library needed. One toast at a time.
**When to use:** Tapping a locked lesson card.

```tsx
// In LessonListPage or a custom useToast hook:
const [toast, setToast] = useState<string | null>(null);
const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);

function showToast(message: string) {
  if (toastTimer.current) clearTimeout(toastTimer.current);
  setToast(message);
  toastTimer.current = setTimeout(() => setToast(null), 2500);
}
```

Render at page root with `position: fixed`. Animate with framer-motion `AnimatePresence` + slide-in.

### Pattern 6: Completion Card (framer-motion)

**What:** After tapping "Complete Lesson", an in-page overlay card replaces the completion button area momentarily. Uses framer-motion `motion.div` with `AnimatePresence`.
**When to use:** Lesson completion flow only.

```tsx
<AnimatePresence>
  {showCompletion && (
    <motion.div
      key="completion"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="..."
    >
      <p>Lesson Complete!</p>
      <p>Next: {nextLesson.title}</p>
      <button onClick={handleContinue}>Continue</button>
    </motion.div>
  )}
</AnimatePresence>
```

### Anti-Patterns to Avoid

- **Using `useEffect` to derive unlock state:** Derive it inline during render from the Zustand store snapshot — no effect needed.
- **Fetching TTS audio on every render:** Always check the `cache` Map first. TTS responses are cached by `text|speed` key as blob URLs.
- **Embedding grammar/vocab objects in the lesson state:** Lessons reference IDs only. Look up by ID at render time from the GRAMMAR/VOCAB arrays. Do not store resolved objects in Zustand.
- **Using `useNavigate` for tab switching:** Use `<NavLink>` for the bottom tab bar so active states are automatic and accessible.
- **Calling `speak()` inside a `useEffect`:** Call it from user event handlers (button onClick) only. Autoplay policies block programmatic audio not triggered by user gesture.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Korean particle attachment | Custom batchim check | `attachJosa()` from `src/engine/korean.ts` | Already wraps es-hangul correctly |
| Icon rendering from string name | Dynamic import or switch | Lucide component map via `{ [name]: Component }` lookup | Lucide tree-shakes; dynamic `import()` is async |
| Blob URL audio with caching | Re-fetch on each play | Adapted `speak()` from Hanguller | Hanguller implementation is battle-tested; handles cancel, cache, fallback |
| Romanization toggle logic | useState per word | `useRomanizationToggle()` from `src/hooks/` | Already enforces one-at-a-time constraint |
| Progress persistence | Manual localStorage | `useProgressStore` (already persists) | Zustand persist middleware handles versioning and migration |

**Key insight:** Every cross-cutting concern — Korean text, romanization, audio, progress — has been solved in Phase 1 or Hanguller. Phase 2 assembles, not invents.

### Lucide Dynamic Icons (for Topic cards)

`Topic.icon` stores a string like `"Hand"`, `"Utensils"`, `"Map"`. Lucide does not support dynamic string-to-component lookup out of the box. The correct pattern:

```ts
// src/utils/lucideIcons.ts
import { Hand, Hash, Utensils, Map, Sun, Users, BookOpen, LayoutGrid, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Hand, Hash, Utensils, Map, Sun, Users, BookOpen, LayoutGrid, Settings,
};

export function getIcon(name: string | undefined): LucideIcon {
  return (name && ICON_MAP[name]) ? ICON_MAP[name] : BookOpen;
}
```

Tree-shaking still works because the imports are explicit.

## Common Pitfalls

### Pitfall 1: NavLink `end` Prop Missing on Root Route

**What goes wrong:** The Lessons tab (`to="/"`) stays highlighted on `/topics` and `/settings` because the root path matches all child routes.
**Why it happens:** react-router-dom's default active matching is prefix-based.
**How to avoid:** Always add `end` prop to the root NavLink: `<NavLink to="/" end>`.
**Warning signs:** Both Lessons and another tab are highlighted simultaneously.

### Pitfall 2: Audio Autoplay Blocked

**What goes wrong:** `speak()` call silently fails — no error thrown, no audio plays.
**Why it happens:** Browsers require audio to be triggered by a direct user gesture. Calling `audio.play()` inside `useEffect`, `setTimeout`, or after awaiting a previous step loses the gesture trust.
**How to avoid:** Keep the entire `speak()` call inside an `onClick` handler. The `await fetch(...)` inside speak is acceptable as long as the outer call starts synchronously from the click event.
**Warning signs:** Audio plays fine in dev but fails intermittently in Chrome; works on Safari more permissively.

### Pitfall 3: Blob URL Memory Leaks

**What goes wrong:** Each `URL.createObjectURL(blob)` creates a reference the browser holds in memory. If cached Map grows unboundedly, memory increases for long sessions.
**Why it happens:** `URL.revokeObjectURL()` is never called.
**How to avoid:** For Phase 2's scope (small fixed content set), the cache is effectively bounded — at most one blob per unique sentence/speed combination. Accept this. Note it as a future concern if content grows to hundreds of sentences.
**Warning signs:** Memory profiler shows growing Blob counts across long sessions.

### Pitfall 4: Tailwind v4 — No `tailwind.config.js`

**What goes wrong:** Planner or implementer tries to create `tailwind.config.js` for custom theme tokens.
**Why it happens:** v3 habits. The project uses Tailwind v4 via `@tailwindcss/vite`.
**How to avoid:** Add custom tokens in `src/index.css` using the `@theme` directive: `@theme { --color-primary: #... }`. This generates `bg-primary`, `text-primary` etc.
**Warning signs:** `tailwind.config.js` is created but has no effect.

### Pitfall 5: Lesson Order Assumption Across Levels

**What goes wrong:** Unlock logic assumes `order` is globally unique across levels (e.g., Level 1 has orders 1-3, Level 2 starts at 4). In reality, `order` resets per level.
**Why it happens:** Deriving "previous lesson" without sorting by `(level, order)`.
**How to avoid:** Always sort by `(level ASC, order ASC)` before deriving index. The `isLessonUnlocked()` function above does this correctly.
**Warning signs:** Level 2 Lesson 1 is always locked even after completing all of Level 1.

### Pitfall 6: `useProgressStore` Actions Not Available in Test

**What goes wrong:** Tests import store actions and call them, but find them undefined.
**Why it happens:** Tests call store methods on the state snapshot, not the full store reference.
**How to avoid:** Use `useProgressStore.getState().completeLesson('les-001')` — the established pattern from `progress.test.ts`.
**Warning signs:** `TypeError: completeLesson is not a function`.

## Code Examples

Verified patterns from project source:

### Grouping Lessons by Level (for LessonListPage)

```tsx
// Derive level groups at render time — no useEffect
import { LESSONS } from '../data/lessons';

const lessonsByLevel = LESSONS.reduce<Record<number, Lesson[]>>((acc, lesson) => {
  const key = lesson.level;
  if (!acc[key]) acc[key] = [];
  acc[key].push(lesson);
  return acc;
}, {});

const levels = Object.keys(lessonsByLevel).map(Number).sort((a, b) => a - b);
```

### Resolving Lesson Grammar and Vocab by ID

```tsx
// In LessonDetailPage — look up referenced items at render time
import { GRAMMAR } from '../data/grammar';
import { VOCAB } from '../data/vocab';

const grammar = lesson.grammar_ids.map((id) => GRAMMAR.find((g) => g.id === id)!);
const vocab = lesson.vocab_ids.map((id) => VOCAB.find((v) => v.id === id)!);
```

### Reading audioSpeed from Settings Store

```tsx
import { useSettingsStore } from '../store/settings';

function AudioButton({ text }: { text: string }) {
  const audioSpeed = useSettingsStore((s) => s.audioSpeed);
  return (
    <button onClick={() => speak(text, audioSpeed)}>
      <Volume2 size={18} />
    </button>
  );
}
```

### Checking Welcome Card Visibility

```tsx
// Show welcome card when no lessons completed yet
import { useProgressStore } from '../store/progress';

const completedLessons = useProgressStore((s) => s.completedLessons);
const showWelcome = completedLessons.length === 0;
```

### Using useRomanizationToggle in a Sentence List

```tsx
import { useRomanizationToggle } from '../hooks/useRomanizationToggle';

function ExampleList({ examples }: { examples: ExampleSentence[] }) {
  const { toggle, isRevealed } = useRomanizationToggle();
  return examples.map((ex, i) => (
    <div key={i} onClick={() => toggle(`ex-${i}`)}>
      <p>{ex.korean}</p>
      {isRevealed(`ex-${i}`) && <p className="text-gray-500 text-sm">{ex.romanization}</p>}
    </div>
  ));
}
```

### Conjugation Table Format (from CONTEXT.md spec)

```tsx
// Columns: Word | Ends in | Particle Form | Result
// Example row: 물 | consonant (ㄹ) | 을 | 물을
interface ConjugationRow {
  word: string;
  endingType: 'consonant' | 'vowel';
  particleForm: string;
  result: string;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme {}` in CSS file | Tailwind v4 (2025) | No config file needed; custom tokens as CSS variables |
| `BrowserRouter` wrapping App | `createBrowserRouter` + `RouterProvider` | React Router v6.4 / v7 | Enables data APIs; cleaner nested route definition |
| Manual route type checking | TypeScript-first route params via `useParams<{ id: string }>()` | Ongoing | Params are always `string | undefined` — always guard |
| Global CSS for theming | `@theme` CSS custom properties | Tailwind v4 | Utility classes auto-generated from `--color-*` vars |

**Deprecated / outdated:**
- `<Switch>` (React Router v5): replaced by `<Routes>` in v6, `createBrowserRouter` in v7
- `jsdom` as Vitest environment: replaced by `happy-dom` in this project (jsdom 28 ESM incompatibility)

## Open Questions

1. **Cloudflare Worker deployment for Hanbuddy TTS**
   - What we know: Worker code is copy-paste ready from Hanguller; `wrangler deploy` is the mechanism
   - What's unclear: Whether the planner should include a "deploy worker" task or treat it as an external prerequisite
   - Recommendation: Include as Wave 0 task — create `tts-worker/` directory with files and document the `wrangler deploy` step, but do not make it a CI blocker; dev can use Hanguller's worker URL temporarily via `.env.local`

2. **Content expansion (data files)**
   - What we know: Only 2 lessons and 4 grammar points exist; UI will look sparse
   - What's unclear: How many lessons are needed for the phase to demonstrate the full unlock sequence across two levels
   - Recommendation: Author at minimum 5 lessons (3 in Level 1, 2 in Level 2) and 6-8 grammar points as part of phase implementation tasks

3. **Settings page scope**
   - What we know: `useSettingsStore` has `audioEnabled`, `audioSpeed`, `romanizationHintsEnabled`
   - What's unclear: Whether Settings should be a stub (just toggle controls) or include app version/about
   - Recommendation: Render all three toggles from `useSettingsStore` + a simple "About Hanbuddy" text block; no routing complexity

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.x |
| Config file | `vite.config.ts` (test block present, happy-dom environment) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| GRAM-01 | Grammar lesson page renders pattern, explanation, conjugation table, examples | unit | `npx vitest run src/components/lessons/GrammarSection.test.tsx -x` | Wave 0 |
| GRAM-02 | Each grammar point has 3+ examples in data | unit (data integrity) | `npx vitest run src/types/content.test.ts -x` | Partial (tests min 1; update to min 3) |
| GRAM-04 | Lesson grammar_ids resolve to valid grammar points | unit (data integrity) | `npx vitest run src/types/content.test.ts -x` | Partial (already tested) |
| GRAM-05 | GrammarPoint speech_level field is populated; SpeechBadge renders correct label | unit | `npx vitest run src/components/ui/SpeechBadge.test.tsx -x` | Wave 0 |
| LIST-01 | audioSpeed 0.75 maps to Naver speed -2; 1.0 maps to 0 | unit | `npx vitest run src/utils/audio.test.ts -x` | Wave 0 |
| PROG-01 | isLessonUnlocked returns false for lesson 2 when lesson 1 not completed | unit | `npx vitest run src/utils/lessonUnlock.test.ts -x` | Wave 0 |
| PROG-02 | Topics tab shows all topics; TopicDetail shows vocab regardless of lock state | unit | `npx vitest run src/pages/TopicListPage.test.tsx -x` | Wave 0 |
| PROG-05 | Welcome card renders when completedLessons is empty; hides after first completion | unit | `npx vitest run src/components/ui/WelcomeCard.test.tsx -x` | Wave 0 |

### Sampling Rate

- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `src/components/lessons/GrammarSection.test.tsx` — covers GRAM-01 rendering
- [ ] `src/components/ui/SpeechBadge.test.tsx` — covers GRAM-05 badge label/color
- [ ] `src/utils/audio.test.ts` — covers LIST-01 speed mapping (pure function test; no actual fetch)
- [ ] `src/utils/lessonUnlock.test.ts` — covers PROG-01 unlock gate logic
- [ ] `src/pages/TopicListPage.test.tsx` — covers PROG-02 topic browsing
- [ ] `src/components/ui/WelcomeCard.test.tsx` — covers PROG-05 orientation display
- [ ] Update `src/types/content.test.ts` — raise GRAMMAR examples minimum from 1 to 3 (GRAM-02)

## Sources

### Primary (HIGH confidence)

- Project source `C:/dev/Hanbuddy/src/` — all types, stores, hooks, data files read directly
- Project source `C:/dev/Hanguller/src/utils/audio.js` — complete TTS implementation verified
- Project source `C:/dev/Hanguller/tts-worker/worker.js` — Naver nvoice worker verified
- `C:/dev/Hanbuddy/package.json` — exact installed versions confirmed

### Secondary (MEDIUM confidence)

- [React Router v7 Official Docs](https://reactrouter.com/start/library/routing) — `createBrowserRouter`, `Outlet`, `NavLink` patterns
- [Tailwind CSS v4 Blog Post](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first `@theme` configuration confirmed
- [Motion (Framer Motion) React Animation Docs](https://motion.dev/docs/react-animation) — `AnimatePresence` API confirmed stable in v12

### Tertiary (LOW confidence)

- WebSearch results for react-router-dom v7 bottom tabs — general patterns only; verified against official docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified from `package.json` and direct source reads
- Architecture: HIGH — patterns derived from existing project code + official library APIs
- Audio/TTS: HIGH — Hanguller implementation read directly; speed mapping confirmed from source
- Pitfalls: HIGH — derived from project-specific decisions (Tailwind v4, Vitest happy-dom) + well-known browser behaviors

**Research date:** 2026-03-12
**Valid until:** 2026-06-12 (stable stack; react-router-dom v7 API is stable)
