# Phase 3: Practice - Research

**Researched:** 2026-03-12
**Domain:** SRS flashcard scheduling (FSRS), exercise UI patterns, React state management
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Flashcard review flow:**
- Front shows Korean word only — forces active recall of meaning
- Romanization available via tap-to-reveal on front (reuse existing `useRomanizationToggle` hook)
- Tap anywhere on card to flip to answer side
- Back shows: Korean word, English meaning, one example sentence (Korean + English), auto-play audio of the Korean word
- FSRS rating buttons on back: Again / Hard / Good / Easy
- Audio auto-plays on flip using existing AudioButton/TTS infrastructure

**SRS scheduling & sessions:**
- FSRS algorithm with fixed default parameters — no user-configurable settings
- Mixed sessions: due reviews presented first, then new cards up to daily cap (10 new cards/day)
- Session ends when all due reviews + available new cards are complete
- Vocab items auto-added to SRS pool when user completes a lesson (via `lesson.vocab_ids`)
- Empty state shows today's stats (cards reviewed count) + next review time + link to exercises
- New Zustand store needed for SRS state (card schedules, review history) with persist middleware

**Cloze exercises:**
- User types the missing Korean word into a text input (active recall, not multiple choice)
- Full sentence displayed with a blank where the target vocab word belongs
- English translation shown as context hint
- On correct: green highlight, move to next
- On incorrect: show correct answer in green, user's answer in red, full sentence with translation displayed

**Listening exercises:**
- Audio plays a Korean word/phrase, user selects matching Korean text from 4 options
- Uses existing AudioButton component and Naver CLOVA TTS
- Multiple choice with 4 Korean text options (1 correct, 3 distractors from same difficulty pool)
- On incorrect: show correct answer + full sentence with translation

**Sentence building exercises:**
- Tap-to-place interaction — word tiles in a shuffled pool, tap to add to answer in order
- Tap a placed tile to remove it back to pool
- No drag-and-drop — tap-based is mobile-friendly without gesture complexity
- English sentence shown as prompt, user assembles Korean word order from tiles
- On incorrect: show correct word order + full sentence with translation

**Exercise feedback (all types):**
- Wrong answer: highlight incorrect in red, show correct answer in green, display full sentence with Korean + English translation
- 10 questions per exercise session with progress indicator (3/10)
- Exercises draw from all unlocked vocabulary (all vocab from completed lessons)

**Practice navigation:**
- New bottom tab added: Lessons | Practice | Topics | Settings (4 tabs)
- Practice tab home is a dashboard layout:
  - Top section: Vocabulary Review card showing due count + "Start Review" button
  - Below: Exercise type cards (Cloze, Listening, Sentence Building) each showing available question count
- No topic/lesson filter for exercises — always draws from full unlocked pool

### Claude's Discretion
- TOPIK-I level tag placement on flashcards
- Exact FSRS parameter weights
- Distractor selection algorithm for listening exercises
- Exercise question generation logic (which sentences to blank, which words to use)
- Visual design, animations, spacing
- Progress bar / completion screen design for exercise sessions
- SRS store schema and migration strategy

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VOCAB-01 | User can learn vocabulary through flashcards showing Korean, English, and example sentences | Flashcard component pattern; FSRS `createEmptyCard` + `Card` type; flip animation via CSS preserve-3d or framer-motion rotateY |
| VOCAB-02 | Flashcard review uses FSRS spaced repetition with confidence ratings (Again/Hard/Good/Easy) | ts-fsrs 5.x library; `Rating` enum (Again=1, Hard=2, Good=3, Easy=4); `fsrs().repeat(card, now)` → `RecordLog`; Zustand SRS store with persist |
| VOCAB-03 | User can practice vocabulary through cloze (fill-in-the-blank) exercises in sentence context | Text input pattern; Korean normalization via es-hangul for comparison; exercise question generation from `VOCAB[].examples` |
| VOCAB-04 | Vocabulary items are tagged with TOPIK-I level for benchmark alignment | VocabItem type already has `speech_level`; TOPIK-I tag is a new field or UI mapping; `SpeechBadge` component available for reuse |
| VOCAB-05 | Each vocabulary item includes 2-3 example sentences with audio | VocabItem.examples already typed; AudioButton reusable; vocab data has examples on ~16/20 items — remaining items need examples authored |
| LIST-02 | User can practice listening through multiple-choice exercises (hear audio, select answer) | AudioButton + speak() utility; distractor selection from same conjugation_type pool; 4-option layout |
| LIST-03 | User can learn through dialogue-based lessons (4-8 line conversations with playable lines) | Dialogue data type to be defined; AudioButton per line; new lesson section type; distinct from Practice exercises |
| GRAM-03 | User can practice sentence building with word-order exercises | Tap-to-place tile UI; Korean SOV order with verb-final constraint; single canonical answer per beginner sentence accepted |
</phase_requirements>

---

## Summary

Phase 3 adds the Practice tab — a vocabulary review system using FSRS spaced repetition and three exercise types. The key external dependency is `ts-fsrs` (currently v5.2.x), which provides the FSRS v6 scheduling algorithm. All other work builds on existing project infrastructure: Zustand stores, AudioButton/TTS, useRomanizationToggle, and the existing VocabItem content schema.

The most architecturally significant piece is the SRS Zustand store (`hanbuddy_srs`). It must persist a `cards` record keyed by `voc-NNN` ID, a daily cap counter with a date stamp, and a session queue. The store follows the established pattern from `useProgressStore`: persist with partialize, versioned migration, and corruption handling via `onRehydrateStorage`.

For sentence-building, Korean's particle-based flexibility means multiple valid orderings exist for most sentences. The solution is to use simple beginner sentences where the canonical SOV order is the only accepted answer — the existing vocab examples are short, unambiguous sentences ideal for this.

**Primary recommendation:** Install `ts-fsrs@^5.2.1`; build the SRS store first (it's the shared dependency for all exercise types); then build the flashcard UI and exercise screens as independent components.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| ts-fsrs | ^5.2.1 | FSRS v6 scheduling algorithm | Official TypeScript implementation by open-spaced-repetition; ESM-compatible; well-typed |
| zustand | ^5.0.11 (already installed) | SRS store state | Already used for progress and settings stores |
| react-router-dom | ^7.13.1 (already installed) | New /practice/* routes | Already used throughout the app |
| framer-motion | ^12.35.2 (already installed) | Card flip animation | Already a project dependency; rotateY for flashcard flip |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| es-hangul | ^2.3.8 (already installed) | Korean text normalization for cloze comparison | Use when comparing user input to answer; handles particle variants |
| lucide-react | ^0.577.0 (already installed) | Icons for Practice tab and exercise UI | All icon needs |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| ts-fsrs | SM-2 custom implementation | ts-fsrs is FSRS v6 which outperforms SM-2; no reason to hand-roll |
| ts-fsrs | femto-fsrs (100 lines) | Less maintained, missing rollback/forget/reschedule |
| framer-motion flip | CSS-only transform | framer-motion already installed; rotateY provides cleaner React integration |

**Installation:**
```bash
npm install ts-fsrs
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── store/
│   └── srs.ts              # New SRS Zustand store (hanbuddy_srs key)
├── pages/
│   ├── PracticeDashboardPage.tsx   # /practice — dashboard with review card + exercise cards
│   ├── FlashcardReviewPage.tsx     # /practice/review — SRS session
│   ├── ClozeExercisePage.tsx       # /practice/cloze
│   ├── ListeningExercisePage.tsx   # /practice/listening
│   └── SentenceBuildPage.tsx       # /practice/build
├── components/
│   └── practice/
│       ├── FlashCard.tsx           # Flip card component (front/back)
│       ├── RatingButtons.tsx       # Again/Hard/Good/Easy row
│       ├── ClozeQuestion.tsx       # Sentence with blank + text input
│       ├── ListeningQuestion.tsx   # Audio player + 4-choice grid
│       ├── SentenceTiles.tsx       # Tile pool + answer track
│       └── ExerciseProgress.tsx    # Progress bar (3/10)
└── hooks/
    └── useSrsSession.ts    # Derive session queue from srs store
```

### Pattern 1: SRS Store Schema
**What:** Zustand store persisting FSRS card state keyed by vocab ID
**When to use:** Any component that needs to know due cards, schedule a review, or cap new cards

```typescript
// Source: modeled on existing useProgressStore pattern + ts-fsrs Card type
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Card } from 'ts-fsrs';

interface SrsCard {
  vocabId: `voc-${number}`;
  card: Card;          // ts-fsrs Card — due, stability, difficulty, state, etc.
}

interface SrsStoreState {
  cards: Record<string, SrsCard>;  // keyed by vocabId
  // Daily cap tracking
  newCardsToday: number;
  newCardsDayStamp: string;         // ISO date string "2026-03-12"
  // History for stats display
  reviewedTodayCount: number;
  reviewedDayStamp: string;
  _corruptionDetected: boolean;
  // Actions
  addVocabToPool: (vocabIds: string[]) => void;
  recordReview: (vocabId: string, rating: import('ts-fsrs').Rating) => void;
  clearCorruptionFlag: () => void;
}
```

### Pattern 2: FSRS Scheduling
**What:** Call `fsrs().repeat(card, now)` to get next states for all 4 ratings; on user tap, save chosen rating's card
**When to use:** Inside `recordReview` action in SRS store

```typescript
// Source: ts-fsrs official API (verified via CDN type definitions)
import { createEmptyCard, fsrs, Rating } from 'ts-fsrs';

const f = fsrs();   // use default parameters — no user-configurable settings (locked decision)
const now = new Date();
const scheduling = f.repeat(currentCard, now);

// User taps "Good"
const nextCard = scheduling[Rating.Good].card;
// nextCard.due = Date of next review
// nextCard.state = State.Learning | State.Review | State.Relearning
```

### Pattern 3: Session Queue Derivation
**What:** Derive today's review queue from store state without storing the queue itself
**When to use:** `useSrsSession` hook consumed by FlashcardReviewPage

```typescript
// Pseudocode — derive, don't store
const dueCards = Object.values(store.cards)
  .filter(c => c.card.due <= now && c.card.state !== State.New)
  .sort((a, b) => a.card.due.getTime() - b.card.due.getTime());

const todayStamp = toDateStamp(now);           // "2026-03-12"
const newCardsSoFar = store.newCardsDayStamp === todayStamp
  ? store.newCardsToday : 0;
const newSlots = Math.max(0, 10 - newCardsSoFar);

const newCards = Object.values(store.cards)
  .filter(c => c.card.state === State.New)
  .slice(0, newSlots);

const sessionQueue = [...dueCards, ...newCards];
```

### Pattern 4: Flashcard Flip Animation
**What:** CSS 3D transform via framer-motion for card flip; framer-motion already installed
**When to use:** FlashCard component on tap

```tsx
// Source: framer-motion rotateY pattern (framer-motion v12 already in project)
import { motion } from 'framer-motion';

// Front face
<motion.div
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  transition={{ duration: 0.35, ease: 'easeInOut' }}
  style={{ transformStyle: 'preserve-3d' }}
>
  <div style={{ backfaceVisibility: 'hidden' }}>
    {/* front content */}
  </div>
  <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
    {/* back content */}
  </div>
</motion.div>
```

### Pattern 5: Tap-to-Place Sentence Tiles
**What:** Two arrays: `pool` (shuffled remaining tiles) and `placed` (ordered answer). Tap pool tile → move to placed end. Tap placed tile → return to pool at original index.
**When to use:** SentenceBuildPage

```typescript
// State shape
const [pool, setPool] = useState<string[]>(shuffled(words));
const [placed, setPlaced] = useState<string[]>([]);

function tapPool(word: string, idx: number) {
  setPool(p => p.filter((_, i) => i !== idx));
  setPlaced(p => [...p, word]);
}
function tapPlaced(word: string, idx: number) {
  setPlaced(p => p.filter((_, i) => i !== idx));
  setPool(p => [...p, word]);  // return to end of pool
}
```

### Anti-Patterns to Avoid
- **Storing session queue in persisted store:** The queue should be derived on the fly from card.due and card.state. Persisting a queue creates stale-queue bugs after clock changes or missed reviews.
- **Mutating ts-fsrs Card objects directly:** `repeat()` returns new Card objects — store the new card from `scheduling[Rating.X].card`, never mutate the old one.
- **Using `Date.now()` strings as day stamp:** Use `new Date().toISOString().slice(0, 10)` ("2026-03-12") for day boundary comparisons to survive timezone edge cases.
- **Adding vocab to SRS pool on every app load:** Pool should only be populated when a lesson transitions from not-completed to completed (delta check in `completeLesson` or a one-time migration on store init).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SRS interval calculation | Custom SM-2 or hand-rolled exponential interval | ts-fsrs | FSRS v6 is peer-reviewed; memory model handles lapses, fuzzing, and stability correctly |
| Korean particle normalization for cloze comparison | Custom regex replace | `es-hangul` (already installed) | Handles batchim attachment (을/를, 이/가, 은/는) and Unicode normalization |
| Card flip animation | CSS @keyframes with -webkit- prefixes | framer-motion `rotateY` (already installed) | Handles `backfaceVisibility`, `transformStyle`, and mobile repaint correctly |

**Key insight:** The hard problems in this phase are SRS scheduling (hand-rolling is algorithmically risky) and Korean normalization (Unicode combining forms will cause false-negative comparisons without a library).

---

## Common Pitfalls

### Pitfall 1: Korean String Comparison in Cloze
**What goes wrong:** `userInput === correctAnswer` fails even when the user typed the right word, because Korean IME may produce different Unicode normalization forms (NFC vs NFD) or trailing spaces.
**Why it happens:** Korean IME on mobile can leave partially-composed jamo.
**How to avoid:** Use `userInput.trim().normalize('NFC') === correctAnswer.trim().normalize('NFC')` as the comparison. Optionally also lowercase both (though Korean has no case). For sentences with attached particles, only compare the base word token — this is why cloze uses the target vocab word itself as the blank (not a derived form with particles).
**Warning signs:** Works in desktop browser testing but fails on real Android/iOS keyboard input.

### Pitfall 2: Daily New Card Cap Crossing Midnight
**What goes wrong:** `newCardsToday` counter is not reset at midnight — user gets no new cards on day 2 because the count persists.
**Why it happens:** The counter is stored but the day stamp comparison is never evaluated.
**How to avoid:** Always compare `newCardsDayStamp` to `new Date().toISOString().slice(0, 10)` before reading `newCardsToday`. If stamps differ, treat `newCardsToday` as 0.
**Warning signs:** In testing, advancing the clock by 1 day causes session to show 0 new cards.

### Pitfall 3: Sentence Builder — Multiple Valid Korean Orderings
**What goes wrong:** User builds a grammatically valid but non-canonical sentence and gets marked wrong.
**Why it happens:** Korean particle-marked sentences allow SOV, OSV, and other orderings. Only the verb-final constraint is absolute.
**How to avoid:** Restrict sentence-building exercises to sentences from VOCAB examples that are short, unambiguous, and have a single natural order. Accept only the canonical sentence from the data. For Phase 3 scope with 20 vocab items and beginner sentences (3-5 tokens), this is always solvable. Document in code that only canonical order is accepted.
**Warning signs:** User complaints of correct answers marked wrong; use simple 3-4 token sentences.

### Pitfall 4: FSRS Card Date Serialization in localStorage
**What goes wrong:** `card.due` is stored as a `Date` object but JSON serializes as a string. On rehydration, `card.due <= new Date()` comparison fails because `due` is a string.
**Why it happens:** `JSON.stringify(new Date())` → ISO string; `JSON.parse(...)` → plain string, not a Date object.
**How to avoid:** In the SRS store's `migrate` function and `onRehydrateStorage`, convert all `card.due` and `card.last_review` fields back to `Date` objects: `card.due = new Date(card.due)`. Or use a custom Zustand storage serializer.
**Warning signs:** All cards show as "due" or "not due" regardless of actual schedule.

### Pitfall 5: Auto-play Audio Blocked by Browser
**What goes wrong:** Flashcard flip triggers `speak()` but the browser blocks autoplay because it requires user gesture.
**Why it happens:** Web Audio API and `new Audio().play()` require a user gesture. The flip IS a user gesture (tap), so this usually works — but only if the promise is chained from the tap handler directly.
**How to avoid:** Ensure the flip handler calls `speak()` in the same synchronous call stack as the tap event. Do not `setTimeout` or `await` before calling speak. The existing `speak()` utility already handles this correctly when called from an event handler.
**Warning signs:** Audio works in devtools but not on mobile; check for "NotAllowedError: play() failed" in console.

### Pitfall 6: LIST-03 Scope (Dialogue Lessons)
**What goes wrong:** LIST-03 requires dialogue-based lessons, but the existing `Lesson` type has no `dialogue` field. This is a content schema change.
**Why it happens:** Phase 3 adds a new content type (dialogue) that isn't in the current `VocabItem`/`Lesson`/`GrammarPoint` schema.
**How to avoid:** Define a `DialogueLine` interface and a `DialogueLesson` variant type before building the UI. Content data for dialogues must be authored as part of this phase. Treat this as a mini Phase 1 within Phase 3.
**Warning signs:** Attempting to render dialogues without a schema leads to `undefined` field access errors.

---

## Code Examples

### ts-fsrs: Schedule a Card After Review
```typescript
// Source: ts-fsrs official type definitions (CDN verified)
import { createEmptyCard, fsrs, Rating, type Card } from 'ts-fsrs';

// Create a new card for a vocab item
const newCard: Card = createEmptyCard();

// Schedule (call on every review)
const f = fsrs();  // default FSRS v6 params
const scheduling = f.repeat(currentCard, new Date());

// User taps "Good"
const nextCard: Card = scheduling[Rating.Good].card;
// nextCard.due — Date of next review
// nextCard.state — New(0)/Learning(1)/Review(2)/Relearning(3)
// nextCard.stability, .difficulty — algorithm internals (persist but don't display)
```

### ts-fsrs: Rating Enum Values
```typescript
// Source: ts-fsrs CDN type definitions (verified)
Rating.Again = 1   // forgot completely — short relearning interval
Rating.Hard  = 2   // remembered with difficulty — slightly extended
Rating.Good  = 3   // remembered correctly — standard interval
Rating.Easy  = 4   // too easy — extended interval + stability boost
```

### Zustand SRS Store: Minimal Persist Pattern
```typescript
// Source: modeled on existing useProgressStore (src/store/progress.ts)
export const useSrsStore = create<SrsStoreState>()(
  persist(
    (set, get) => ({
      cards: {},
      newCardsToday: 0,
      newCardsDayStamp: '',
      reviewedTodayCount: 0,
      reviewedDayStamp: '',
      _corruptionDetected: false,
      addVocabToPool: (vocabIds) => set((state) => {
        const additions: Record<string, SrsCard> = {};
        for (const id of vocabIds) {
          if (!state.cards[id]) {
            additions[id] = { vocabId: id as `voc-${number}`, card: createEmptyCard() };
          }
        }
        return { cards: { ...state.cards, ...additions } };
      }),
      recordReview: (vocabId, rating) => set((state) => {
        const entry = state.cards[vocabId];
        if (!entry) return state;
        const f = fsrs();
        const scheduling = f.repeat(entry.card, new Date());
        const nextCard = scheduling[rating].card;
        const today = new Date().toISOString().slice(0, 10);
        const wasNew = entry.card.state === State.New;
        return {
          cards: { ...state.cards, [vocabId]: { ...entry, card: nextCard } },
          newCardsToday: wasNew
            ? (state.newCardsDayStamp === today ? state.newCardsToday + 1 : 1)
            : state.newCardsToday,
          newCardsDayStamp: wasNew ? today : state.newCardsDayStamp,
          reviewedTodayCount: state.reviewedDayStamp === today
            ? state.reviewedTodayCount + 1 : 1,
          reviewedDayStamp: today,
        };
      }),
      clearCorruptionFlag: () => set({ _corruptionDetected: false }),
    }),
    {
      name: 'hanbuddy_srs',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cards: state.cards,
        newCardsToday: state.newCardsToday,
        newCardsDayStamp: state.newCardsDayStamp,
        reviewedTodayCount: state.reviewedTodayCount,
        reviewedDayStamp: state.reviewedDayStamp,
      }),
      migrate: (persisted, version) => {
        if (version < 1) return { cards: {}, newCardsToday: 0, newCardsDayStamp: '', reviewedTodayCount: 0, reviewedDayStamp: '' };
        // Rehydrate Date objects (JSON stringifies them)
        const state = persisted as any;
        for (const entry of Object.values(state.cards ?? {}) as any[]) {
          if (entry.card.due) entry.card.due = new Date(entry.card.due);
          if (entry.card.last_review) entry.card.last_review = new Date(entry.card.last_review);
        }
        return state;
      },
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('hanbuddy_srs corrupted, resetting', error);
          localStorage.removeItem('hanbuddy_srs');
          useSrsStore.setState({ _corruptionDetected: true, cards: {} });
        }
      },
    }
  )
);
```

### BottomTabBar: Adding the 4th Tab
```tsx
// Source: existing src/components/layout/BottomTabBar.tsx pattern
import { BookOpen, LayoutGrid, Settings, Dumbbell } from 'lucide-react';

// Add between Topics and Settings NavLink:
<NavLink to="/practice" className={...}>
  <Dumbbell size={20} />
  <span>Practice</span>
</NavLink>
```

### Router: New Practice Routes
```tsx
// Source: existing src/main.tsx pattern
{ path: 'practice', element: <PracticeDashboardPage /> },
{ path: 'practice/review', element: <FlashcardReviewPage /> },
{ path: 'practice/cloze', element: <ClozeExercisePage /> },
{ path: 'practice/listening', element: <ListeningExercisePage /> },
{ path: 'practice/build', element: <SentenceBuildPage /> },
```

### Distractor Selection for Listening Exercises
```typescript
// Recommended algorithm (Claude's discretion)
// Strategy: pick 3 words from the same conjugation_type as the target,
// excluding the target itself, from the unlocked vocab pool.
// Falls back to any unlocked vocab if conjugation_type pool is too small.
function pickDistractors(target: VocabItem, pool: VocabItem[], count = 3): VocabItem[] {
  const sameType = pool.filter(v => v.id !== target.id && v.conjugation_type === target.conjugation_type);
  const candidates = sameType.length >= count ? sameType : pool.filter(v => v.id !== target.id);
  return shuffle(candidates).slice(0, count);
}
```

### TOPIK-I Level Tag (Claude's Discretion)
```typescript
// VocabItem already has speech_level (formal-high | polite | informal | plain)
// TOPIK-I Beginner = TOPIK Level 1-2; Intermediate = Level 3-4
// Recommended approach: add a topikLevel field to VocabItem or maintain a separate mapping
// Simple mapping based on speech_level + conjugation_type complexity:
// All 20 existing vocab items are TOPIK-I Beginner (Level 1-2 expressions/basic nouns)
// Use a static lookup until more content exists
type TopikLevel = 'beginner' | 'intermediate';
const TOPIK_LEVEL_MAP: Record<string, TopikLevel> = {
  'voc-001': 'beginner', 'voc-002': 'beginner', /* ... */
};
// Or add topik_level?: 'beginner' | 'intermediate' to VocabItem type
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SM-2 spaced repetition | FSRS v6 (Free SRS) | ~2022 | Better retention prediction; ts-fsrs is the standard TS library |
| HTML5 drag-and-drop API | Tap-to-place tile interaction | Mobile-era shift | DnD has mobile touch inconsistencies; tap is universal |
| CSS @keyframes flip | framer-motion rotateY | React became dominant | Declarative React state → animation mapping; no class toggling |

**Deprecated/outdated:**
- SM-2 algorithm: Superseded by FSRS for new apps; FSRS outperforms on measured retention.
- HTML5 drag-and-drop for mobile vocabulary builders: Poor touch support; locked decision to use tap.

---

## Open Questions

1. **LIST-03 Dialogue Data Schema and Content**
   - What we know: LIST-03 requires dialogue-based lessons (4-8 line conversations with audio). The current `Lesson` type has `vocab_ids` and `grammar_ids` but no `dialogue_lines` field.
   - What's unclear: Should dialogues be a new type (e.g. `DialogueLesson`) separate from `Lesson`, or an optional extension? How many dialogues need to be authored for Phase 3 to pass?
   - Recommendation: Define a `DialogueLine` interface (`{ speaker: string; korean: string; english: string; romanization: string }`) and add a `dialogues?: DialogueLine[][]` field to Lesson, or create a separate `DIALOGUES` data array. Author at least 2-3 dialogues drawn from existing lesson topics (Greetings, Food, Daily Life). This is a content authoring task as well as a schema task.

2. **VOCAB-04 TOPIK-I Level Field — Schema Extension or Static Map**
   - What we know: VocabItem currently has `speech_level` (politeness) but no TOPIK level field.
   - What's unclear: Is it better to add `topik_level?: 'beginner' | 'intermediate'` to the `VocabItem` type and author it for all 20 words, or keep a static lookup map outside the schema?
   - Recommendation: Add the field to VocabItem type and author it for all 20 vocab items. This is the cleanest approach and follows the project's "schema-first" mandate.

3. **VOCAB-05 Missing Examples on 4/20 Vocab Items**
   - What we know: `voc-006` (사람), `voc-008` (어디), `voc-009` (네), `voc-010` (아니요), `voc-013` (셋) have no `examples` array. VOCAB-05 requires 2-3 example sentences per item.
   - What's unclear: Should this be authoring within Phase 3 Plan 1 (data/content task), or handled as a prerequisite?
   - Recommendation: Include an explicit "author missing examples" task in Wave 1 (data tasks) before building the flashcard UI. These 5 items need examples authored directly in `vocab.ts`.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.x |
| Config file | `vite.config.ts` (test section — `environment: 'happy-dom'`, `setupFiles: ./src/test-setup.ts`) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VOCAB-02 | SRS store: addVocabToPool, recordReview, daily cap, Date rehydration | unit | `npx vitest run src/store/srs.test.ts` | Wave 0 |
| VOCAB-02 | FSRS scheduling produces correct next state | unit | `npx vitest run src/store/srs.test.ts` | Wave 0 |
| VOCAB-03 | Cloze comparison: NFC normalization, trim, correct/incorrect detection | unit | `npx vitest run src/pages/ClozeExercisePage.test.tsx` | Wave 0 |
| LIST-02 | Distractor selection: returns 3 unique, excludes target, same conjugation_type | unit | `npx vitest run src/utils/exerciseUtils.test.ts` | Wave 0 |
| GRAM-03 | Sentence tile tap-to-place: pool/placed state transitions | unit | `npx vitest run src/pages/SentenceBuildPage.test.tsx` | Wave 0 |
| VOCAB-01 | FlashCard renders front and back correctly | unit | `npx vitest run src/components/practice/FlashCard.test.tsx` | Wave 0 |
| VOCAB-04 | TOPIK-I level tag renders on flashcard | unit | included in FlashCard tests | Wave 0 |
| LIST-03 | Dialogue lines render with AudioButton per line | unit | `npx vitest run src/components/practice/DialogueLesson.test.tsx` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/store/srs.test.ts` — covers VOCAB-02 (SRS store unit tests)
- [ ] `src/utils/exerciseUtils.test.ts` — covers LIST-02 (distractor selection)
- [ ] `src/components/practice/FlashCard.test.tsx` — covers VOCAB-01, VOCAB-04
- [ ] `src/pages/ClozeExercisePage.test.tsx` — covers VOCAB-03 (cloze comparison logic)
- [ ] `src/pages/SentenceBuildPage.test.tsx` — covers GRAM-03 (tile state)
- [ ] `src/components/practice/DialogueLesson.test.tsx` — covers LIST-03
- [ ] Install ts-fsrs: `npm install ts-fsrs`

---

## Sources

### Primary (HIGH confidence)
- ts-fsrs CDN type definitions (`cdn.jsdelivr.net/npm/ts-fsrs@4.7.1/dist/index.d.ts`) — Card, Rating, State, FSRS, createEmptyCard types verified
- DeepWiki ts-fsrs documentation — scheduling workflow, repeat() method, RecordLog type
- Existing project source code — `src/store/progress.ts`, `src/store/settings.ts`, `src/hooks/useRomanizationToggle.ts`, `src/components/ui/AudioButton.tsx`, `src/data/vocab.ts`, `src/types/content.ts`

### Secondary (MEDIUM confidence)
- WebSearch: ts-fsrs current version confirmed as 5.2.x (npm search result referenced 5.2.3 as latest)
- WebSearch: framer-motion rotateY + backfaceVisibility pattern for card flip — confirmed standard approach in 2025, multiple sources agree
- WebSearch: Korean word order flexibility (SOV, verb-final constraint) — multiple Korean learning sites corroborate

### Tertiary (LOW confidence)
- ts-fsrs v5.x breaking changes relative to v4.x — version jump confirmed (5.2.3 is latest), but specific breaking changes from v4→v5 not fully documented in search results. The basic API (createEmptyCard, fsrs, Rating, repeat) is stable across v3-v5.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — ts-fsrs types verified via CDN; all other dependencies already in project
- Architecture: HIGH — SRS store pattern directly mirrors existing progress store; FSRS API fully typed
- Pitfalls: HIGH — Korean IME normalization, Date serialization, and midnight boundary are well-known issues; tile ordering based on Korean grammar research
- LIST-03 scope: MEDIUM — schema design is speculative; content authoring volume unvalidated

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (ts-fsrs API stable; Tailwind/framer-motion APIs stable)
