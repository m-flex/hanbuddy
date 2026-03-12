# Phase 1: Foundation - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Data schema, storage layer, engine, and project scaffolding. Every subsequent feature (lessons, SRS, reading) builds on the types, storage, and utilities established here. No UI beyond what's needed to verify the foundation works.

</domain>

<decisions>
## Implementation Decisions

### Content data model
- Lesson-centric architecture: lessons are the top-level unit, referencing standalone vocab and grammar collections by ID
- Vocab, grammar, and lessons are independent collections that can be queried/filtered independently
- Lessons compose items by referencing their IDs — items can appear in multiple lessons
- Prefixed counter IDs across all content types: `voc-NNN`, `grm-NNN`, `les-NNN`, `top-NNN` (3-char prefix + zero-padded number)
- Multi-tag topic system: each vocab/lesson can belong to multiple topics (e.g., 물 tagged [food, travel, daily-life])
- Content authored as TypeScript data files (typed constants), not JSON — type-checked at build time per success criteria #1

### Project scaffolding
- Mirror Hanguller's flat folder structure with TypeScript additions:
  - `components/`, `pages/`, `store/`, `data/`, `utils/` (same as Hanguller)
  - `hooks/`, `types/`, `engine/` (new for Hanbuddy)
- Match Hanguller's dependency stack: react-router-dom, Zustand, Lucide icons, Framer Motion, @tailwindcss/vite
- Add es-hangul for Korean text processing (new for Hanbuddy)
- Copy and adapt Hanguller's tts-worker for audio (Phase 2 will adapt for speed control)
- Own visual identity — fresh color palette, not Hanguller's dark theme

### Storage design
- Single localStorage key `hanbuddy_v1` containing a structured object with partitions (progress, srs, settings)
- Sequential migration functions for schema version bumps (v1→v2, v2→v3 chain)
- Zustand persist middleware handles serialization; migration runs via persist's `migrate` option
- Multiple Zustand stores for separate concerns: progress, settings, SRS state
- Corruption handling: reset to fresh state with one-time toast warning if data is unparseable

### Romanization
- Tap/click per-word inline reveal — only the tapped word shows romanization below it
- Stays visible until user taps the word again or taps elsewhere (no auto-hide)
- Uses Revised Romanization standard (official South Korean system)
- Romanization stored as an authored field on each vocab item (not computed) — ensures accuracy for irregular pronunciations

### Claude's Discretion
- Exact TypeScript type definitions for content schemas (field names, union types)
- Zustand store partitioning strategy (single persist key vs sub-keys)
- es-hangul utility wrapper design
- Project scaffolding details (vite.config, tsconfig, eslint setup)
- Color palette and visual identity specifics

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Hanguller's tts-worker/: TTS proxy for Google TTS — copy and adapt for speed control
- Hanguller's store/progress.js: Zustand store pattern to reference (convert to TypeScript)
- Hanguller's utils/audio.js: Audio utility pattern to reference

### Established Patterns
- Hanguller uses flat folder structure (components/, pages/, store/, data/, utils/) — Hanbuddy mirrors this
- Hanguller uses react-router-dom for routing, Zustand for state — same in Hanbuddy
- Hanguller is JSX — Hanbuddy upgrades to TypeScript (.tsx)

### Integration Points
- No existing Hanbuddy code — this is greenfield scaffolding
- tts-worker copied from Hanguller will need adaptation in Phase 2

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

*Phase: 01-foundation*
*Context gathered: 2026-03-12*
