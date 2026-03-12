# Phase 2: Lessons - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can navigate structured lesson content with audio, covering core grammar, speech levels, and topic browsing. This phase delivers the first real UI: navigation, lesson viewing, audio playback, topic browsing, and lesson progression. SRS, exercises, and reading are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Lesson page layout
- Single continuous scroll page: lesson intro → pattern/explanation → inline conjugation table → example sentences with audio → vocabulary reference at bottom
- No tabs or sub-navigation within a lesson — one linear flow
- Conjugation tables are inline (word → ending type → particle → result), embedded in the scroll flow
- Vocabulary items referenced by the lesson appear in a "Vocabulary Reference" section at the bottom of the lesson page

### Speech level display
- Each example sentence has a small colored badge showing its speech level (해요체 polite, 합쇼체 formal)
- Formal and informal polite forms are distinguished from the very first lesson — no lesson presents a single form as "the Korean way"

### Audio & TTS
- Naver CLOVA TTS via Cloudflare Worker — same infrastructure as Hanguller (C:/dev/Hanguller/tts-worker/)
- Uses Naver Dictionary voice API (`dict.naver.com/api/nvoice`) with `speaker` and `speed` params
- Inline play button (speaker icon) next to each example sentence — per-sentence playback
- Persistent speed toggle (0.75x / 1x) in the lesson page header — changes apply immediately to next audio played, syncs with settings store (`audioSpeed`)

### Navigation structure
- Bottom tab bar: Lessons | Topics | Settings — mobile-friendly, Lessons is primary tab
- react-router-dom for routing (already a project dependency from Phase 1 decision)

### Lessons tab
- Lessons grouped under level headings (Level 1, Level 2, ...)
- Each lesson displayed as a card: title, description snippet, completion status indicator
- Locked lessons are dimmed (lower opacity) with a lock icon replacing the status indicator
- Tapping a locked lesson shows a toast: "Complete [previous lesson] to unlock this"

### Topics tab
- Grid of topic cards showing icon (Lucide, from Topic.icon field) + count of lessons and vocab items
- Tapping a topic card opens a detail page with two sections: "Lessons" (linked lesson cards) and "Vocabulary" (Korean/English with audio button)
- Topic browsing ignores level locking — all content for a topic is accessible regardless of progression

### Beginner orientation
- Welcome card at top of Lessons tab for first-time users: "Welcome to Hanbuddy! Start your Korean journey with Lesson 1" + "Start Learning" button
- Card dismisses after the user starts their first lesson (tracked via completedLessons in progress store)
- No separate onboarding flow or full-screen splash

### Lesson completion & progression
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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Lesson` type (`src/types/content.ts`): has `level`, `order`, `vocab_ids`, `grammar_ids`, `topics` fields — ready for list grouping and page rendering
- `GrammarPoint` type: has `pattern`, `explanation`, `examples` (each with `korean`, `english`, `romanization`) — maps directly to lesson page sections
- `VocabItem` type: has `korean`, `english`, `romanization`, `speech_level`, `topics` — ready for vocab reference display
- `Topic` type: has `name`, `description`, `icon` — maps to topic grid cards
- `useProgressStore` (`src/store/progress.ts`): `completedLessons`, `lastActiveLesson`, `completeLesson()` — already handles completion tracking
- `useSettingsStore` (`src/store/settings.ts`): `audioSpeed` (0.75 | 1), `audioEnabled`, `romanizationHintsEnabled` — ready for audio toggle
- `useRomanizationToggle` hook (`src/hooks/`): tap-to-reveal romanization — use in lesson pages for vocab/examples
- `attachJosa`, `wordHasBatchim`, `decompose` (`src/engine/korean.ts`): Korean text processing utilities
- Hanguller's `tts-worker/worker.js`: Naver TTS Cloudflare Worker with `speaker`, `speed` params — copy/adapt for Hanbuddy

### Established Patterns
- Content as TypeScript data files with `satisfies` operator (LESSONS, GRAMMAR, VOCAB, TOPICS arrays)
- Zustand stores with persist middleware, partialize, and corruption handling
- Prefixed counter IDs (`voc-NNN`, `grm-NNN`, `les-NNN`, `top-NNN`) for cross-referencing
- es-hangul for Korean text processing (thin typed wrapper)

### Integration Points
- `App.tsx` is a bare placeholder — needs react-router-dom setup with bottom tab navigation
- No `src/pages/` content yet — lesson list, lesson detail, topic list, topic detail pages all new
- No `src/components/` yet — all UI components are new
- Data files (`src/data/`) have sample content (2 lessons, 4 grammar points) — will need expansion

</code_context>

<specifics>
## Specific Ideas

- Hanguller already uses Naver TTS — PROJECT.md incorrectly called it "Google TTS proxy." Hanbuddy should use the same Naver infrastructure for consistency and quality (Naver has more accurate Korean TTS where Google gets some wrong)
- Conjugation table format: show the word, which character it ends in (consonant vs vowel), which particle form applies, and the combined result

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-lessons*
*Context gathered: 2026-03-12*
