# Project Research Summary

**Project:** Hanbuddy — Korean Language Learning Web App
**Domain:** Client-side SPA for post-Hangul Korean learners (vocabulary, grammar, SRS, listening, reading)
**Researched:** 2026-03-12
**Confidence:** HIGH

## Executive Summary

Hanbuddy is a structured Korean language learning app targeting learners who already know Hangul. The expert approach for this domain combines spaced repetition (SRS) for vocabulary retention, explicit grammar pattern pages with worked examples (the TTMIK model), and multiple exercise types per lesson to move learners from passive recognition to active production. The product has a clear precedent in Hanguller — a companion app sharing the same stack — which dramatically reduces technology risk. The recommended architecture is a fully client-side React SPA with all curriculum content embedded as static TypeScript modules, Zustand for localStorage-persisted state, and the existing Naver TTS Cloudflare Worker proxy for audio.

The single most important architectural decision is the content data schema. Every feature — flashcards, cloze exercises, sentence building, reading glosses — depends on a well-typed vocabulary and grammar data model designed before any content is authored. SRS card state must be keyed by stable vocabulary IDs; speech level, conjugation type, and number system context must be metadata fields on data objects from day one. These schema choices cannot be retrofitted without breaking existing user progress. Building the data layer and storage layer first, before any UI feature, is the research-confirmed build order.

The primary risks are pedagogical, not technical: collapsing Korean speech levels into a single formality register, teaching only one number system, and presenting irregular verbs as edge cases. All three produce learners who pass app drills but fail in real Korean encounters. They must be addressed in the content schema design phase, not the content authoring phase. The technical risk is localStorage schema evolution — a versioned schema with migration logic must be established before the first localStorage write.

---

## Key Findings

### Recommended Stack

The stack is almost entirely inherited from Hanguller, which eliminates research uncertainty for the core framework. React 19 + Vite 7 + Tailwind CSS v4 + React Router DOM v7 + Framer Motion is the proven combination. Two new libraries are added for this app's expanded scope: `ts-fsrs` (FSRS v5 algorithm) replaces Hanguller's custom SM-2 for vocabulary SRS — FSRS demonstrably outperforms SM-2 for large card decks and is TypeScript-native with no dependencies. `es-hangul` (maintained by Toss, v2.3.8 Sep 2025) provides Korean text utilities for particle selection and syllable decomposition. Zustand with the `persist` middleware replaces raw localStorage calls, managing multiple state slices (lesson progress, SRS card states, audio settings) cleanly. All package versions were verified against the npm registry on 2026-03-12.

**Core technologies:**
- React 19 + Vite 7: UI framework and build tool — identical to Hanguller, confirmed working
- Tailwind CSS v4 + @tailwindcss/vite: styling — v4 Vite plugin eliminates PostCSS config
- React Router DOM v7: client-side routing for lesson/drill/browse pages
- ts-fsrs v5.2.3: FSRS v5 SRS scheduling — replaces custom SM-2; better retention at vocabulary scale
- es-hangul v2.3.8: Korean text processing (particles, jamo decomposition) — maintained by Toss
- Zustand v5.0.11 + persist middleware: global state persisted to localStorage
- Naver TTS via Cloudflare Worker proxy: high-quality `ko-KR` TTS, already running in production
- Framer Motion v12: flashcard flip, slide transitions, answer feedback animations
- Lucide React: icon set, consistent with Hanguller

**Critical version notes:**
- Tailwind v4 requires `@tailwindcss/vite`, NOT the PostCSS plugin
- Zustand v5.0.11 fixes a persist middleware race condition (do not use v5.0.9 or earlier)
- Speed formula to reuse verbatim: `naverSpeed = Math.round(Math.max(-5, Math.min(5, (rate - 0.75) * 8)))`

### Expected Features

Users of Korean learning apps (Duolingo, LingoDeer, TTMIK, Clozemaster) arrive with established expectations. Missing table-stakes features make the product feel broken regardless of other quality. The research identifies a clean MVP boundary and a validated v1.x expansion set.

**Must have (table stakes — P1):**
- Vocabulary flashcards with SRS (FSRS v5 via ts-fsrs) — foundational for retention
- Audio pronunciation with speed control (0.75x slow / 1.0x normal) — Korean pronunciation diverges critically from romanization
- Grammar lesson pages with pattern explanations and worked examples — TTMIK/LingoDeer established this as the standard
- Multiple exercise types per lesson (recognition, production, listening) — passive reading alone is insufficient
- Structured level progression with sequential unlock — LingoDeer/Duolingo trained users to expect a roadmap
- Topic-based browsing index — learners must be able to target specific domains (travel, food, numbers)
- Progress persistence across sessions (localStorage) — losing progress on reload is a blocker
- Clear beginner orientation — explicit "start here" for users who know Hangul

**Should have (competitive — P2):**
- Cloze (fill-in-the-blank) exercises — Clozemaster proved context dramatically improves retention
- Reading passages graded by level — TTMIK Stories established reading comprehension as core
- Sentence building (word-order drag-and-drop) — Korean SOV order is a learner cognitive challenge; few free apps address it
- Visual curriculum map with completion state — reduces dropout from feeling lost
- TOPIK-I vocabulary tier tagging — free authoritative corpus, recognized external benchmark
- Romanization as opt-in reveal only — never shown by default

**Defer (v2+):**
- Dialogue-based context learning — high content authoring cost; defer until core format is proven
- Grammar cross-reference linking system — valuable but high implementation effort
- Expanded vocabulary to TOPIK-II tier — scope expansion after TOPIK-I coverage is solid
- PWA / installable app — only if usage patterns justify it

**Anti-features (explicitly exclude):**
- Streaks/daily XP/gamification — PROJECT.md excludes; localStorage-only gamification is trivially cheatable and meaningless
- Speech recognition / pronunciation scoring — requires backend or inaccurate Web Speech API for Korean
- User-generated flashcard decks — conflicts with structured progression model; no sync without backend
- AI tutoring chat — requires backend API key, ongoing cost, hallucination risk

### Architecture Approach

The architecture is a three-layer client-side SPA: a static content data layer (TypeScript modules under `src/data/`), a pure logic engine layer (`src/engine/` with no React coupling), and a Zustand store layer for all user state persisted to localStorage. The UI layer consumes the store and engine exclusively through hooks — components never import from `engine/` directly. This separation makes the SRS algorithm independently testable and swappable, keeps content editable without touching components, and ensures all localStorage access flows through Zustand's persist middleware with consistent serialization.

**Major components:**
1. Content Data Layer (`src/data/`) — static TypeScript modules for vocabulary, grammar patterns, lesson manifest, reading passages; imported at build time, never written to localStorage
2. Engine Layer (`src/engine/`) — pure functions: `srs.ts` (FSRS algorithm), `curriculum.ts` (unlock logic), `quiz.ts` (exercise generation); no React dependencies, fully testable
3. Progress Store (`src/store/progressStore.ts`) — Zustand with persist; single source of truth for all user state; two separate slices: `lessonProgress: Record<lessonId, boolean>` and `cardStates: Record<cardId, CardState>`
4. Audio Service (`useAudio` hook) — wraps Naver TTS proxy with in-memory blob URL cache; speed from settingsStore; graceful fallback to Web Speech API
5. Curriculum Navigator (`engine/curriculum.ts`) — resolves unlock state from manifest + progress store; called on app init and after every lesson completion
6. UI Pages and Components — Lesson Viewer, Practice Mode, Browse/Topics, Progress Dashboard; all communicate through hooks

**Build order (architecture-derived):**
1. Content data TypeScript interfaces and vocabulary data files
2. Engine layer (SRS, curriculum) — pure functions, no React
3. Progress Store with versioned localStorage schema
4. Shared UI components (AudioButton, KoreanText, ProgressBar)
5. Lesson Viewer — first real feature, validates content + audio integration
6. Browse/Topics — depends on manifest only, no SRS
7. Practice Mode (SRS drills) — most complex, build last
8. Progress Dashboard — read-only store view, any time after store exists

### Critical Pitfalls

1. **Speech level collapse** — Teaching only 해요체 throughout the app. Learners fail in real Korean encounters. Prevention: add `speech_level` field to every sentence object in the content schema before authoring any content. Cannot be retrofitted.

2. **localStorage schema without versioning** — Ad-hoc flat structure breaks as the app grows; existing user data becomes corrupted silently on any structure change. Prevention: define a versioned schema (`hanbuddy_v1` top-level key with `schema_version` field and typed sub-objects) before the first localStorage write. Implement a migration function that runs on app boot.

3. **Irregular verb conjugation treated as advanced content** — Common beginner words (쉽다, 듣다, 모르다) are irregular. Drills mark them wrong with no explanation. Prevention: add `conjugation_type` field to every verb in the vocabulary schema from the start. Display conjugation rules on drill feedback for irregular forms.

4. **localStorage budget overflow from unbounded SRS history** — SRS review history arrays grow without bound; `QuotaExceededError` fires silently, progress stops saving. Prevention: keep all content data in the bundle (never in localStorage), wrap every `setItem` in try/catch, cap review history per item, show a storage usage warning at 80% of 5 MB.

5. **Particles taught as memorizable rules without contrast examples** — Learners pass drills but cannot produce particles naturally. Prevention: every particle lesson must include 5–8 contrasting example pairs (same noun, different particle, different meaning); drills use fill-in-the-blank in context, not abstract matching.

---

## Implications for Roadmap

Based on the research, the dependency chain is clear: content schema before content, engine before UI, storage layer before features. The pitfall research adds hard constraints that override intuitive "build the UI first" sequencing.

### Phase 1: Foundation — Data Schema, Storage, and Engine

**Rationale:** Every downstream feature depends on these. The content schema cannot be retrofitted (speech level, conjugation type, stable IDs), and the localStorage schema must be versioned before the first write. The SRS engine and curriculum logic are pure functions that should be established before any UI consumes them. No content should be authored until the data interfaces are finalized.
**Delivers:** TypeScript interfaces for vocabulary, grammar, and lesson manifest; stable vocabulary IDs (`voc-001` pattern); FSRS engine via ts-fsrs; versioned localStorage schema with migration bootstrap; Zustand progress store with two separate slices; project scaffolding and dev toolchain identical to Hanguller.
**Addresses:** Vocabulary flashcards (data layer), SRS scheduling, progress persistence
**Avoids:** localStorage schema corruption (Pitfall 4), content migration costs (Pitfall 1, 3), storage budget overflow (Pitfall 5)

### Phase 2: Audio and Lesson Viewer

**Rationale:** Audio is a dependency for all content-bearing features. The Lesson Viewer is the first real feature that validates the content schema and audio integration working together. Building this before exercises confirms the data model is correct before it fans out into multiple exercise types.
**Delivers:** `useAudio` hook with Naver TTS proxy + blob URL cache + Web Speech fallback + speed control; shared UI components (AudioButton, KoreanText with optional romanization reveal); Lesson Viewer rendering vocabulary lists, grammar explanations, and example sentences with audio; lesson manifest and first complete lesson content (greetings, basic particles).
**Uses:** Naver TTS Cloudflare Worker proxy (existing), Framer Motion for transitions, es-hangul for particle rendering
**Avoids:** Component-level audio state anti-pattern (Architecture anti-pattern 4); TTS fired on re-renders (Pitfalls tech debt table)

### Phase 3: Core Curriculum — Level 1 Content and Structured Progression

**Rationale:** Once the data schema and lesson viewer are validated, the numbers and particle content must be authored under the critical constraints identified in pitfalls research. This phase creates the first complete structured progression path and the topic browsing index.
**Delivers:** Level 1 curriculum content: greetings, both number systems (Sino-Korean and Native Korean in the same lesson with usage-context table), core particles (은/는, 이/가, 을/를) with contrast pairs, basic verb conjugation including top-priority irregular types (ㅂ, 르), basic verbs and adjectives (200–400 words with metadata). Topic browsing index. Sequential lesson unlock with prerequisite display. Clear beginner orientation screen.
**Addresses:** Structured level progression (table stakes), topic browsing, beginner orientation
**Avoids:** Dual number system confusion (Pitfall 2), particle rule-only teaching (Pitfall 6), speech level collapse (Pitfall 1)

### Phase 4: SRS Practice Mode

**Rationale:** SRS depends on a stable vocabulary data layer and a working progress store — both from Phase 1 — and cannot be built before content exists to review. This is the most complex UI flow and is correctly deferred until the foundation is solid.
**Delivers:** Flashcard review queue driven by FSRS (due card computation, daily new card cap ≤10), FlashCard component with audio on both question and answer sides, grade submission (Again/Hard/Good/Easy mapped to FSRS ratings), session completion view, visual separation of "new" vs "review" cards, SRS queue pre-computation on boot (not on render).
**Uses:** ts-fsrs `createEmptyCard()` + `fsrs.next(card, now, rating)`, useSRSSession hook as sole integration point to engine
**Avoids:** SRS queue overwhelming new learners ("looks done but isn't" checklist item), re-rendering all items to find due cards (performance trap)

### Phase 5: Exercise Types Expansion

**Rationale:** With vocabulary, grammar, and basic SRS working, additional exercise types can be layered on the existing content and data model. Each exercise type is additive — none requires changes to the foundation.
**Delivers:** Multiple-choice listening exercises (hear audio, select Korean or English); cloze (fill-in-the-blank) exercises weighted toward due SRS items; sentence building (word-order tile drag-and-drop for SOV practice); progress dashboard with lesson completion and SRS maturity stats.
**Addresses:** Multiple exercise types per lesson (table stakes), cloze exercises (P2), sentence building (P2)
**Avoids:** Audio-only on answer side of flashcard (UX pitfall)

### Phase 6: Reading and Visual Curriculum

**Rationale:** Reading passages require 3–4 levels of content to exist before they can use known vocabulary and grammar meaningfully. The visual curriculum map is only meaningful once multiple levels with distinct content exist.
**Delivers:** Graded reading passages with line-by-line audio and vocabulary glossing; Level 2 content expansion; visual curriculum map showing completed/in-progress/locked state per unit; TOPIK-I vocabulary tier tagging.
**Addresses:** Reading passages (P2), visual curriculum map (P2), TOPIK-I tagging (P2)

### Phase Ordering Rationale

- **Schema-first order** (Phases 1–2 before any content authoring) is mandated by the pitfalls research: speech level, conjugation type, and stable IDs cannot be retrofitted without content migration and broken SRS state.
- **Audio in Phase 2** (not deferred) because it is a dependency of every content-bearing feature and discovering integration issues early is less costly than discovering them after content exists.
- **SRS in Phase 4** (not Phase 1) because FSRS needs real cards to schedule, and building exercises before the content schema is stable risks rework.
- **Exercise expansion in Phase 5** is additive — it does not require changing Phase 1–4 foundations, making it safe to defer.
- **Reading in Phase 6** requires content volume that only exists after Level 2 is authored.

### Research Flags

Phases likely needing deeper `/gsd:research-phase` during planning:
- **Phase 5 (Sentence Builder):** Word-order tile drag-and-drop requires handling multiple valid Korean sentence orderings; touch vs. mouse input UX is non-trivial. Research the HTML5 drag-and-drop vs. pointer events approach for mobile compatibility.
- **Phase 6 (Reading Passages):** Content authoring for graded Korean reading is a bottleneck — research whether TTMIK open content or other CC-licensed Korean texts can seed this, versus fully original authoring.

Phases with well-documented standard patterns (skip research):
- **Phase 1:** TypeScript module + Zustand persist patterns are well-established; Hanguller is a direct reference.
- **Phase 2:** Audio hook pattern is copy-portable from Hanguller; TTS proxy is already running.
- **Phase 4:** ts-fsrs has clear documentation; FSRS scheduling is a solved problem with the library.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against npm registry 2026-03-12; Hanguller is a live production reference for core stack |
| Features | HIGH | Competitor analysis across 6+ Korean learning products; TOPIK vocabulary lists are authoritative public resources |
| Architecture | MEDIUM | Patterns derived from open-source SRS apps and React state management consensus; no single authoritative source covers all layers. Build order is well-reasoned but unverified end-to-end |
| Pitfalls | HIGH (linguistics), MEDIUM (localStorage scale) | Korean linguistics pitfalls verified across multiple independent sources; localStorage quota behavior at SRS scale is based on projected calculations rather than measured production data |

**Overall confidence:** HIGH

### Gaps to Address

- **FSRS daily new card cap:** ts-fsrs does not enforce a daily new card limit — this must be implemented in `useSRSSession`. Research the standard default (10 new/day is conventional; verify against FSRS community guidance during Phase 4 planning).
- **localStorage budget measurement:** The 5 MB budget calculation (SRS data for 1000 cards ≈ 200–400 KB) is a projection. Measure actual Zustand persist serialization size during Phase 1 to confirm the budget assumption holds.
- **Sentence builder multiple valid orderings:** Korean allows flexible word order with meaning shifts. The sentence builder exercise will need a ground-truth answer set that accounts for this. Scope this carefully in Phase 5 planning — it could be simplified to a single canonical ordering with a "also valid" explanatory note.
- **Content authoring volume for MVP:** The research identifies 200–400 vocabulary words + 10–15 grammar points as MVP scope, but does not validate that this is achievable before content authoring begins. A realistic authoring estimate should be part of Phase 3 planning.

---

## Sources

### Primary (HIGH confidence)
- Hanguller source code (`C:/dev/Hanguller`) — confirmed stack versions, audio/TTS implementation, SRS pattern
- npm registry (2026-03-12) — verified: ts-fsrs@5.2.3, es-hangul@2.3.8, zustand@5.0.11, react@19.2.4, vite@7.3.1, tailwindcss@4.2.1
- GitHub: open-spaced-repetition/ts-fsrs — FSRS v5 TypeScript implementation
- GitHub: toss/es-hangul — v2.3.8, 1.8k stars, actively maintained

### Secondary (MEDIUM confidence)
- [Clozemaster Blog — Best Apps to Learn Korean 2026](https://blog.clozemaster.com/best-apps-to-learn-korean-2026/)
- [LingoDeer Korean Review 2025 — Korean Study Junkie](https://www.koreanstudyjunkie.com/post/is-lingodeer-better-than-duolingo-for-korean-full-review-features-2025)
- [Korean Speech Levels Guide — Bunpo](https://bunpo.app/blog/korean/a-guide-to-korean-speech-levels-how-to-speak-respectfully-in-korean/)
- [Korean Numbers: Sino vs Native — 90 Day Korean](https://www.90daykorean.com/korean-numbers/)
- [Korean Irregular Verbs: 6 Types — StoryLearning](https://storylearning.com/learn/korean/korean-tips/korean-irregular-verbs)
- [Korean Particles Guide — Migaku](https://migaku.com/blog/korean/korean-particles)
- [localStorage limitations and performance — RxDB](https://rxdb.info/articles/localstorage.html)
- [React State Management in 2025 — DEV Community](https://dev.to/cristiansifuentes/react-state-management-in-2025-context-api-vs-zustand-385m)

### Tertiary (LOW confidence)
- WebSearch: "Zustand v5 localStorage persist 2025" — persist middleware confirmed working; v5.0.10 race condition fix confirmed (community sources, not official changelog)
- WebSearch: "Google Translate TTS API disabled" — translate_tts endpoint disabled mid-2023 (multiple community sources)

---
*Research completed: 2026-03-12*
*Ready for roadmap: yes*
