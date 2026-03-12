# Phase 4: Reading and Curriculum - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can read graded Korean passages with vocabulary glossing and line-by-line audio, and see their full curriculum progress visualized as a vertical learning path. Progress persistence across sessions is validated. Creating new content types (dialogues, exercises) and gamification are separate concerns.

</domain>

<decisions>
## Implementation Decisions

### Vocabulary glossing
- Tap-to-reveal popup: tap any Korean word in a passage to see a tooltip with English meaning + romanization
- Dismiss by tapping elsewhere (consistent with existing `useRomanizationToggle` pattern)
- All words glossable — every word in the passage is tappable, not just vocab-linked words
- Gloss shows English meaning + romanization (no audio button in popup)
- Reading and SRS kept separate — tapping a gloss does NOT add the word to SRS review pool

### Passage presentation
- Line-by-line layout with spacing between each sentence
- Tapping a line plays audio for that line via Naver CLOVA TTS (at user's chosen speed)
- English translation hidden by default, tap to reveal per line (forces comprehension attempt first)
- Passage metadata: title, level badge, topic tag
- Passages tagged with a level — unlock by lesson progress (Level 1 passages available after completing Level 1 lessons)
- Same sequential unlock pattern as lessons: locked passages dimmed with lock icon

### Curriculum map
- Vertical scrolling path with lesson nodes connected by a line (journey/path style)
- Each node shows: circular icon (checkmark = complete, play = current, lock = locked) + lesson title
- Tapping a node navigates directly to that lesson (completed/unlocked nodes only)
- Locked nodes show a toast on tap (same pattern as existing lesson list)
- Map shows lessons only — reading passages accessed separately via Reading tab

### Navigation structure
- 5-tab bottom bar: Learn | Practice | Read | Topics | Settings
- "Learn" tab replaces "Lessons" — shows the curriculum map as the primary view (no separate lesson list)
- "Read" tab is new — shows reading passages listed by level, each with title, level badge, topic tag
- Locked passages dimmed in the list, tapping shows unlock requirement toast

### Progress persistence
- Existing Zustand persist stores (progress, srs, settings) already handle localStorage persistence
- Phase validates that closing/reopening browser restores all state correctly (success criteria #4)
- No new store needed — reading completion tracking added to existing progress store

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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useRomanizationToggle` (`src/hooks/useRomanizationToggle.ts`): Tap-to-reveal pattern — adapt for gloss popups
- `AudioButton` (`src/components/ui/AudioButton.tsx`): TTS playback — reuse for line-by-line audio
- `useProgressStore` (`src/store/progress.ts`): `completedLessons` array — extend with reading completion tracking
- `useSrsStore` (`src/store/srs.ts`): Already persists card states to localStorage
- `useSettingsStore` (`src/store/settings.ts`): `audioSpeed` (0.75 | 1) — reuse for reading audio
- `LessonCard` (`src/components/lessons/LessonCard.tsx`): Card pattern for passage list cards
- `Toast` (`src/components/ui/Toast.tsx`): For locked content feedback
- `WelcomeCard` (`src/components/ui/WelcomeCard.tsx`): May need adaptation for new Learn tab
- `SpeechBadge` (`src/components/ui/SpeechBadge.tsx`): Badge pattern for level badges

### Established Patterns
- Content as TypeScript data files with `satisfies` operator — follow for reading passage data
- Zustand stores with persist middleware, partialize, corruption handling — extend progress store
- Prefixed counter IDs (`voc-NNN`, `les-NNN`) — follow for reading passages (`rdg-NNN`)
- Naver CLOVA TTS via Cloudflare Worker with speed toggle — reuse for passage line audio
- Sequential unlock via `completedLessons` array — extend for passage level gating

### Integration Points
- `BottomTabBar` needs 5th tab (Read) and rename Lessons → Learn
- `LessonListPage` replaced by curriculum map as primary Learn tab view
- New routes needed: `/read`, `/read/:passageId`, curriculum map is new `/` (Learn tab)
- `useProgressStore` needs `completedReadings` array (or similar) for passage tracking
- New content type needed in `src/types/content.ts` for reading passages
- New data file needed in `src/data/` for passage content with per-line gloss data

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decisions captured above.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-reading-and-curriculum*
*Context gathered: 2026-03-12*
