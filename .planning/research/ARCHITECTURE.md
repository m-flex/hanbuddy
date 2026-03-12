# Architecture Research

**Domain:** Client-side Korean language learning app (React, no backend)
**Researched:** 2026-03-12
**Confidence:** MEDIUM — patterns derived from open-source language apps, Anki deck design, SRS algorithm implementations, and React state management community consensus. No single authoritative source covers all layers together.

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         UI Layer (React)                        │
│  ┌───────────┐  ┌──────────────┐  ┌─────────────┐  ┌────────┐  │
│  │  Lesson   │  │   Practice   │  │   Browse/   │  │Progress│  │
│  │  Viewer   │  │    Mode      │  │   Topics    │  │ Screen │  │
│  └─────┬─────┘  └──────┬───────┘  └──────┬──────┘  └───┬────┘  │
│        │               │                 │              │       │
├────────┴───────────────┴─────────────────┴──────────────┴───────┤
│                     State / Logic Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐    │
│  │  Curriculum │  │  SRS Engine │  │   Progress Store     │    │
│  │  Navigator  │  │ (SM-2 algo) │  │ (Zustand + persist)  │    │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬───────────┘    │
│         │                │                    │                 │
├─────────┴────────────────┴────────────────────┴─────────────────┤
│                     Content Data Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Vocabulary  │  │   Grammar    │  │ Dialogues / Reading  │  │
│  │  data files  │  │  data files  │  │     data files       │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                     Persistence Layer                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                       localStorage                        │ │
│  │  progress / srs-state / settings / lesson-completion      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| Lesson Viewer | Renders lesson content: vocabulary list, grammar explanation, example sentences, dialogue | Curriculum Navigator (what to show), Progress Store (mark complete) |
| Practice Mode | Drives SRS flashcard drills, quizzes, sentence building exercises | SRS Engine (which cards are due), Content data (card content), Progress Store (write results) |
| Browse / Topics | Lets user jump to any topic outside sequential path | Content data (topic index), Curriculum Navigator (unlock state) |
| Progress Screen | Displays stats, completion %, SRS deck health | Progress Store (read-only) |
| Curriculum Navigator | Resolves which lesson is "current", what is locked/unlocked | Progress Store (completion flags), Content data (lesson manifest) |
| SRS Engine | Implements SM-2 algorithm: given a card ID + grade (0–5), returns next interval and updated ease factor | Content data (card IDs), Progress Store (card state) |
| Progress Store | Single source of truth for all user state; persists to localStorage via Zustand middleware | All components read/write through this |
| Audio Service | Wraps Google TTS proxy calls; exposes `play(text, speed)` | Lesson Viewer, Practice Mode |
| Content data files | Static JSON/TS modules — vocabulary, grammar, dialogues, reading passages | Imported at build time; never mutate at runtime |

## Recommended Project Structure

```
src/
├── data/                    # All static Korean content (source of truth)
│   ├── vocabulary/
│   │   ├── beginner.ts      # TOPIK 1 tier vocabulary entries
│   │   ├── intermediate.ts  # TOPIK 2 tier vocabulary entries
│   │   └── index.ts         # Re-exports + topic lookup map
│   ├── grammar/
│   │   ├── patterns.ts      # Grammar pattern definitions
│   │   └── index.ts
│   ├── lessons/
│   │   ├── manifest.ts      # Ordered lesson list with metadata
│   │   └── [lesson-id].ts   # Per-lesson content (or inline in manifest)
│   ├── dialogues/
│   │   └── [topic].ts       # Short contextual dialogues
│   └── reading/
│       └── [passage-id].ts  # Reading practice passages
│
├── store/                   # Global app state (Zustand)
│   ├── progressStore.ts     # Lesson completion + SRS card state
│   ├── settingsStore.ts     # Audio speed, UI preferences
│   └── index.ts
│
├── engine/                  # Pure logic, no React
│   ├── srs.ts               # SM-2 algorithm implementation
│   ├── curriculum.ts        # Lesson unlock/progression logic
│   └── quiz.ts              # Exercise generation (pick answer, fill blank)
│
├── components/
│   ├── lesson/
│   │   ├── LessonViewer.tsx
│   │   ├── VocabularyList.tsx
│   │   ├── GrammarExplanation.tsx
│   │   └── DialogueReader.tsx
│   ├── practice/
│   │   ├── PracticeSession.tsx
│   │   ├── FlashCard.tsx
│   │   ├── QuizQuestion.tsx
│   │   └── SentenceBuilder.tsx
│   ├── browse/
│   │   ├── TopicGrid.tsx
│   │   └── LessonList.tsx
│   ├── progress/
│   │   └── ProgressDashboard.tsx
│   └── shared/
│       ├── AudioButton.tsx
│       ├── KoreanText.tsx   # Renders Korean with optional romanization
│       └── ProgressBar.tsx
│
├── hooks/
│   ├── useAudio.ts          # Wraps Google TTS proxy
│   ├── useSRSSession.ts     # Loads due cards, submits grades
│   └── useLesson.ts         # Loads lesson content by ID
│
├── pages/ (or routes/)
│   ├── Home.tsx
│   ├── LessonPage.tsx
│   ├── PracticePage.tsx
│   ├── BrowsePage.tsx
│   └── ProgressPage.tsx
│
└── utils/
    ├── hangul.ts            # Korean text utilities (jamo detection, etc.)
    └── localStorage.ts      # Storage key constants + typed helpers
```

### Structure Rationale

- **data/:** Separating static content from all React code keeps content editable without touching components. Content is imported as TypeScript modules (type-safe, tree-shakeable, no fetch overhead).
- **engine/:** SRS and curriculum logic are pure functions with no framework coupling. This makes them testable and replaceable. A bug in SM-2 is fixed in one file.
- **store/:** Zustand with the `persist` middleware writes directly to localStorage. Everything the user has ever done lives here. No other component touches localStorage directly.
- **hooks/:** Bridge between engine/store and components. `useSRSSession` orchestrates "which cards are due" → "show card" → "record grade" without Practice components knowing about SM-2.

## Architectural Patterns

### Pattern 1: Static Content Modules (not dynamic fetch)

**What:** All Korean content lives in TypeScript files under `src/data/`, imported at build time via standard `import` statements.
**When to use:** Always, for this app. There is no backend to fetch from, and embedding content in the bundle is the right call for an offline-first, client-only app.
**Trade-offs:** Bundle size grows with content volume. For a beginner-to-intermediate Korean app (~2,000–5,000 vocabulary items, 50–100 lessons), the total JSON equivalent is roughly 500KB–2MB — acceptable for a web app. If it balloons, route-level code splitting can lazy-load lesson content per level.

**Example:**
```typescript
// src/data/vocabulary/beginner.ts
export interface VocabularyEntry {
  id: string;           // stable ID used as SRS card key
  korean: string;       // 한국어
  romanization: string; // hangul romanization (RR system)
  english: string;      // primary translation
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'expression';
  topicTags: string[];  // ["greetings", "daily-life"]
  level: 1 | 2 | 3;    // 1=beginner, 2=intermediate, 3=upper
  exampleSentence?: {
    korean: string;
    english: string;
  };
}

export const beginnerVocabulary: VocabularyEntry[] = [
  {
    id: 'voc-001',
    korean: '안녕하세요',
    romanization: 'annyeonghaseyo',
    english: 'Hello (formal)',
    partOfSpeech: 'expression',
    topicTags: ['greetings'],
    level: 1,
    exampleSentence: {
      korean: '안녕하세요, 저는 학생이에요.',
      english: 'Hello, I am a student.',
    },
  },
];
```

### Pattern 2: SM-2 SRS Engine as Pure Function

**What:** The SRS algorithm is a stateless function. It takes a card's current state and a grade (0–5), and returns the next state. No side effects. The Zustand store calls it and persists the result.
**When to use:** Always. Keeping the algorithm isolated makes it easy to upgrade (e.g., swap SM-2 for FSRS) without touching any React component.
**Trade-offs:** Requires discipline to not leak algorithm logic into components. The `useSRSSession` hook is the only place that calls `engine/srs.ts`.

**Example:**
```typescript
// src/engine/srs.ts
export interface CardState {
  interval: number;      // days until next review
  repetition: number;    // number of successful reviews
  easeFactor: number;    // difficulty multiplier (initially 2.5)
  dueDate: string;       // ISO date string
}

export function gradeCard(state: CardState, grade: 0 | 1 | 2 | 3 | 4 | 5): CardState {
  // SM-2 algorithm: grade < 3 resets, grade >= 3 advances interval
  // Returns new CardState — caller persists it
}

export function isDue(state: CardState): boolean {
  return new Date(state.dueDate) <= new Date();
}
```

### Pattern 3: Lesson Manifest + Sequential Unlock

**What:** A single manifest file defines the ordered list of lessons with metadata (id, title, topic, prerequisite lesson IDs). The curriculum engine checks the Progress Store to determine which lessons are unlocked.
**When to use:** This is the core progression system. Topic browsing can bypass locks, but the structured path uses this.
**Trade-offs:** Requires the manifest to be maintained as content grows. Keep it flat (array, not tree) until nesting is truly needed — nested structures complicate unlock logic significantly.

**Example:**
```typescript
// src/data/lessons/manifest.ts
export interface LessonMeta {
  id: string;
  title: string;
  topicTag: string;
  level: 1 | 2 | 3;
  prerequisites: string[];  // lesson IDs that must be completed first
  vocabularyIds: string[];  // which vocab entries this lesson teaches
  grammarPatternIds: string[];
}

export const lessonManifest: LessonMeta[] = [
  { id: 'lesson-001', title: 'Greetings & Introductions', topicTag: 'greetings',
    level: 1, prerequisites: [], vocabularyIds: ['voc-001', 'voc-002'], grammarPatternIds: ['gram-001'] },
  { id: 'lesson-002', title: 'Numbers & Counting', topicTag: 'numbers',
    level: 1, prerequisites: ['lesson-001'], vocabularyIds: ['voc-010', 'voc-011'], grammarPatternIds: [] },
];
```

## Data Flow

### Lesson Study Flow

```
User opens a lesson
    ↓
LessonPage → useLesson(lessonId) → lessonManifest + data files
    ↓
Renders: VocabularyList, GrammarExplanation, DialogueReader
    ↓
User clicks audio → AudioButton → useAudio → Google TTS proxy
    ↓
User marks lesson complete
    ↓
progressStore.completeLesson(lessonId)
    ↓
Zustand persist middleware → localStorage
    ↓
Curriculum Navigator re-evaluates unlocked lessons
```

### SRS Practice Flow

```
User starts practice session
    ↓
useSRSSession → progressStore.getCardStates() → filter by isDue()
    ↓
PracticeSession renders FlashCard (front: Korean, back: English + audio)
    ↓
User grades recall (Again / Hard / Good / Easy → maps to SM-2 grade 0–4)
    ↓
useSRSSession → srs.gradeCard(currentState, grade) → nextState
    ↓
progressStore.updateCardState(cardId, nextState)
    ↓
Zustand persist middleware → localStorage
    ↓
Next due card rendered, or session ends
```

### Browse / Topic Jump Flow

```
User opens Topics browser
    ↓
TopicGrid reads topic index from data/vocabulary/index.ts
    ↓
User selects topic → LessonList filters lessonManifest by topicTag
    ↓
User opens any lesson (no lock enforced in browse mode)
    ↓
LessonPage renders as normal
```

### State Management

```
Zustand Store (progressStore)
    ↓ (subscribe, component re-renders only on used slice)
UI Components ← actions ← user interactions
    ↓
persist middleware
    ↓
localStorage (serialized JSON)
```

## Scaling Considerations

This is a client-side-only app. "Scaling" means content volume and localStorage limits, not users.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 50 lessons, ~500 vocab | Static imports, everything in one bundle — fine |
| 150+ lessons, ~3,000 vocab | Route-based lazy loading per level; split data files by level so only current level loads eagerly |
| 500+ lessons, ~10,000 vocab | Consider IndexedDB instead of localStorage (localStorage has a ~5MB limit per origin); content could be split into level-packs loaded on demand |

### Scaling Priorities

1. **First bottleneck: localStorage size.** SRS state for 5,000 cards (each ~100 bytes) is ~500KB. Combined with lesson completion flags and settings, you'll approach the 5MB limit around 8,000–10,000 cards. Switch to IndexedDB if content grows that large.
2. **Second bottleneck: initial bundle size.** All content embedded at build time. If lessons grow beyond ~150, lazy-load level packs via dynamic import to keep initial load fast.

## Anti-Patterns

### Anti-Pattern 1: Storing Content in localStorage

**What people do:** Dynamically write lesson content into localStorage (or a cache) to "speed things up."
**Why it's wrong:** Content is static — it never changes at runtime. Writing it to localStorage wastes the limited storage budget needed for progress data, and adds complexity with zero benefit. Static imports are faster (bundled) and simpler.
**Do this instead:** Keep all content in `src/data/` as static TypeScript modules. Only user-generated state (progress, SRS card states, settings) goes in localStorage.

### Anti-Pattern 2: Mixing SRS State with Lesson Completion Tracking

**What people do:** Use a single flat object to track both "lesson completed" booleans and "card next-due date + ease factor" states.
**Why it's wrong:** Lesson completion is a simple boolean flag. SRS card state is a rich object updated on every review. Mixing them couples unrelated concerns and makes the SM-2 logic harder to isolate.
**Do this instead:** Two separate store slices: `lessonProgress: Record<lessonId, boolean>` and `cardStates: Record<cardId, CardState>`. Both persist to localStorage under different keys.

### Anti-Pattern 3: Flat Vocabulary Without IDs

**What people do:** Structure vocabulary as arrays of objects without stable IDs, using array index or Korean text as the key.
**Why it's wrong:** SRS card state is keyed by card ID. If you add a new vocabulary entry early in the array, every index shifts and all SRS progress maps to the wrong cards. Korean text as a key breaks if you correct a typo.
**Do this instead:** Every vocabulary entry gets a stable, permanent string ID (`voc-001`, `voc-002`, ...) assigned at authoring time. Never renumber. Append only.

### Anti-Pattern 4: Component-Level Audio State

**What people do:** Each component that needs audio creates its own state for managing playback, loading, and speed.
**Why it's wrong:** Audio playback conflicts (two components playing at once), duplicated TTS proxy logic, and settings (speed preference) don't propagate.
**Do this instead:** A single `useAudio` hook backed by a module-level audio manager. All components call `play(text, speed)` from the same hook. Speed comes from `settingsStore`.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Google TTS proxy | `useAudio` hook wraps `fetch()` to proxy URL with `text` and `speed` query params; response is audio blob played via Web Audio API or `<audio>` element | Same approach as companion app Hanguller — reuse that implementation |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| UI components ↔ Progress Store | Zustand hooks (`useProgressStore`) | Components never import from `engine/` directly |
| UI components ↔ Content data | Direct TypeScript imports | No abstraction needed; content is static |
| Practice components ↔ SRS engine | Via `useSRSSession` hook only | Hook is the single integration point |
| Curriculum Navigator ↔ lesson manifest | `engine/curriculum.ts` reads manifest + store; returns unlock map | Called on app init and after every lesson completion |

## Build Order Implications

Dependencies between components determine safe build order:

1. **Content data layer first** (`src/data/`) — Everything else depends on it. Define TypeScript interfaces before writing data files.
2. **Engine layer second** (`src/engine/srs.ts`, `src/engine/curriculum.ts`) — Pure functions, no React. Can be developed and tested in isolation.
3. **Progress Store third** (`src/store/progressStore.ts`) — Depends on engine types (CardState, etc.). Enables localStorage persistence from day one.
4. **Shared UI components** (`KoreanText`, `AudioButton`, `ProgressBar`) — Needed by all feature components.
5. **Lesson Viewer** — First real feature. Validates content data structure and audio integration.
6. **Browse / Topics** — Depends on lesson manifest and content data. No SRS needed.
7. **Practice Mode (SRS)** — Depends on store + engine being solid. Most complex UI flow — build last.
8. **Progress Dashboard** — Read-only view of store. Can be built anytime after store exists.

## Sources

- SM-2 algorithm: [supermemo npm package](https://www.npmjs.com/package/supermemo), [SM-2 explanation — tegaru.app](https://tegaru.app/en/blog/sm2-algorithm-explained), [A Better Spaced Repetition Algorithm: SM2+](https://www.blueraja.com/blog/477/a-better-spaced-repetition-learning-algorithm-sm2)
- Vocabulary data schema: [jlpt-kanji-dictionary (analogous Japanese structure)](https://github.com/AnchorI/jlpt-kanji-dictionary)
- Atomic card design principle: [How You Should Study Korean Vocabulary — Go Billy Korean](https://gobillykorean.com/how-you-should-study-korean-vocabulary-anki-guide/)
- State management: [React State Management in 2025 — DEV Community](https://dev.to/cristiansifuentes/react-state-management-in-2025-context-api-vs-zustand-385m), [State Management in 2025 — DEV Community](https://dev.to/hijazi313/state-management-in-2025-when-to-use-context-redux-zustand-or-jotai-2d2k)
- localStorage React integration: [Local Storage in React — Robin Wieruch](https://www.robinwieruch.de/local-storage-react/)
- Open-source SRS React: [leetcode-tracker (localStorage + SRS pattern)](https://github.com/javydevx/leetcode-tracker)

---
*Architecture research for: Hanbuddy — client-side Korean language learning app*
*Researched: 2026-03-12*
