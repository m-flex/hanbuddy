# Phase 3: Practice - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can retain vocabulary through SRS flashcard review and reinforce it through cloze, listening, and sentence-building exercises. This phase delivers the Practice tab, flashcard review system with FSRS scheduling, and three exercise types. Reading passages and curriculum map are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Flashcard review flow
- Front shows Korean word only — forces active recall of meaning
- Romanization available via tap-to-reveal on front (reuse existing `useRomanizationToggle` hook)
- Tap anywhere on card to flip to answer side
- Back shows: Korean word, English meaning, one example sentence (Korean + English), auto-play audio of the Korean word
- FSRS rating buttons on back: Again / Hard / Good / Easy
- Audio auto-plays on flip using existing AudioButton/TTS infrastructure

### SRS scheduling & sessions
- FSRS algorithm with fixed default parameters — no user-configurable settings
- Mixed sessions: due reviews presented first, then new cards up to daily cap (10 new cards/day)
- Session ends when all due reviews + available new cards are complete
- Vocab items auto-added to SRS pool when user completes a lesson (via `lesson.vocab_ids`)
- Empty state shows today's stats (cards reviewed count) + next review time + link to exercises
- New Zustand store needed for SRS state (card schedules, review history) with persist middleware

### Cloze exercises
- User types the missing Korean word into a text input (active recall, not multiple choice)
- Full sentence displayed with a blank where the target vocab word belongs
- English translation shown as context hint
- On correct: green highlight, move to next
- On incorrect: show correct answer in green, user's answer in red, full sentence with translation displayed

### Listening exercises
- Audio plays a Korean word/phrase, user selects matching Korean text from 4 options
- Uses existing AudioButton component and Naver CLOVA TTS
- Multiple choice with 4 Korean text options (1 correct, 3 distractors from same difficulty pool)
- On incorrect: show correct answer + full sentence with translation

### Sentence building exercises
- Tap-to-place interaction — word tiles in a shuffled pool, tap to add to answer in order
- Tap a placed tile to remove it back to pool
- No drag-and-drop — tap-based is mobile-friendly without gesture complexity
- English sentence shown as prompt, user assembles Korean word order from tiles
- On incorrect: show correct word order + full sentence with translation

### Exercise feedback (all types)
- Wrong answer: highlight incorrect in red, show correct answer in green, display full sentence with Korean + English translation
- 10 questions per exercise session with progress indicator (3/10)
- Exercises draw from all unlocked vocabulary (all vocab from completed lessons)

### Practice navigation
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AudioButton` (`src/components/ui/AudioButton.tsx`): Inline play button for TTS — reuse on flashcard back and listening exercises
- `SpeechBadge` (`src/components/ui/SpeechBadge.tsx`): Speech level badge — reuse for TOPIK level display on cards
- `useRomanizationToggle` (`src/hooks/useRomanizationToggle.ts`): Tap-to-reveal romanization — reuse on flashcard front
- `useProgressStore` (`src/store/progress.ts`): `completedLessons` array — use to determine which vocab enters SRS pool
- `useSettingsStore` (`src/store/settings.ts`): `audioSpeed` (0.75 | 1) — reuse for all practice audio
- `BottomTabBar` (`src/components/layout/BottomTabBar.tsx`): Needs new Practice tab entry
- `VocabItem` type (`src/types/content.ts`): Has `examples`, `speech_level`, `romanization` — all needed for flashcards and exercises
- `VOCAB` data (`src/data/vocab.ts`): 20 vocab items with examples — source content for exercises

### Established Patterns
- Zustand stores with persist middleware, partialize, corruption handling — follow for new SRS store
- Content as TypeScript data files with `satisfies` operator — follow for any exercise data
- Prefixed counter IDs (`voc-NNN`) — SRS cards reference vocab by ID
- Naver CLOVA TTS via Cloudflare Worker with speed toggle — reuse for all audio

### Integration Points
- `BottomTabBar` needs a 4th tab (Practice)
- `useProgressStore.completedLessons` feeds into SRS card pool determination
- `VOCAB` and `LESSONS` data arrays provide content for exercises
- New routes needed: `/practice`, `/practice/review`, `/practice/cloze`, `/practice/listening`, `/practice/build`
- New SRS store (`hanbuddy_srs` localStorage key) alongside existing progress and settings stores

</code_context>

<specifics>
## Specific Ideas

- Flashcard review flow modeled after Anki — due reviews first, then new cards, rating buttons after flip
- "All caught up" empty state with stats is motivating without being gamified (consistent with no-gamification decision)
- Tap-to-place sentence building inspired by Duolingo's tile approach — proven mobile-friendly without drag complexity
- Exercise sessions of 10 questions match the 10 new cards/day SRS cap for consistent session lengths

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-practice*
*Context gathered: 2026-03-12*
