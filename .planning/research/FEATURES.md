# Feature Research

**Domain:** Korean language learning web app (post-Hangul: vocabulary, grammar, reading, listening, sentence building)
**Researched:** 2026-03-12
**Confidence:** HIGH — core feature categories well-established across multiple competitor products; specifics verified against LingoDeer, Duolingo, TTMIK, Clozemaster, and Memrise

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist in any language learning product. Missing these = product feels broken or unfinished.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Vocabulary flashcards | Every Korean learning product has them; foundational for retention | LOW | Must show Korean, romanization, English meaning |
| Spaced repetition scheduling (SRS) | Anki, Memrise, and Duolingo have trained users to expect SRS; without it, vocab learning feels inefficient | MEDIUM | SM-2 algorithm is the baseline; FSRS-5 is SOTA but overkill for v1. Persist review schedule in localStorage |
| Audio pronunciation for vocab | Korean pronunciation diverges significantly from romanization; audio is required, not optional | LOW | Google TTS proxy (same as Hanguller) covers this well |
| Grammar lesson pages with pattern explanations | TTMIK and LingoDeer established this as the standard; users expect written grammar notes, not just exercises | MEDIUM | Must explain particles (이/가, 은/는, 을/를), verb conjugation endings, and politeness levels |
| Example sentences in every vocabulary/grammar item | Context is how meaning is retained; single-word flashcards are insufficient | LOW | Each vocab word needs 2–3 example sentences with audio |
| Progress persistence across sessions | Users expect to resume where they left off; browser reload losing progress is a blocker | LOW | localStorage key/value per lesson completion and SRS schedule |
| Structured level progression | LingoDeer and Duolingo have set expectation of sequential unlocking; learners need a roadmap | MEDIUM | Levels unlock sequentially; each level covers a vocabulary set + grammar patterns |
| Topic-based browsing | Learners often want to target a specific domain (travel, food, numbers); blocking this with strict linearity frustrates them | MEDIUM | Must coexist with structured progression — topics available but flagged by level recommendation |
| Multiple exercise types per lesson | Passive reading + active recall needed; one exercise type per lesson is insufficient | MEDIUM | At minimum: recognition (multiple-choice), production (type answer), listening (audio → answer) |
| Reading passages | Clozemaster and TTMIK Stories established reading as core to comprehension; text-only flashcards aren't enough | HIGH | Passages need line-by-line audio, vocabulary glossing for unknown words |
| Listening exercises | Korean is a tonal-adjacent language with final consonant clusters; listening practice is non-negotiable for comprehension | MEDIUM | TTS + speed control (slow / normal). Transcription reveal toggle. |
| Adjustable audio speed | KoreanClass101 and Pimsleur established slow-audio as standard for beginners; fast native speech is difficult for new learners | LOW | 0.75x slow mode and 1.0x normal. Aligns with existing Hanguller approach |
| Clear beginner orientation | Users arrive knowing Hangul but nothing else; product must make it explicit where to start | LOW | Landing/onboarding screen that directs to Level 1. No skill test needed for v1 |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required for table stakes, but high value given the project's core value proposition (systematic progression + flexible topic access).

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Sentence building exercises (word-order drag-and-drop) | Korean SOV word order is a cognitive challenge for English speakers; active production exercises outperform passive recall. Few free apps do this well | HIGH | User arranges scrambled word tiles into correct Korean sentence. Validates against correct answer(s). Requires handling multiple valid orderings |
| Dialogue-based context learning | Isolated vocab/grammar misses real usage; full-dialogue passages show how particles, politeness levels, and conjugations interact in natural speech | HIGH | Short 4–8 line dialogues between characters. Each line is playable. Vocab and grammar annotations inline. More engaging than single sentences |
| Vocabulary in sentence context (cloze exercises) | Clozemaster's entire product is built on this; context dramatically improves retention vs. isolated flashcards | MEDIUM | Show a sentence with one word blanked. User selects or types the missing Korean word. Far more memorable than word → translation |
| Grammar pattern cross-referencing | Users often encounter a grammar point in reading before they reach it in the lesson sequence; linking grammar notes across the app is a navigation win | MEDIUM | Each grammar point has a dedicated anchor page. Vocabulary, reading passages, and exercise explanations link to it |
| TOPIK-aligned vocabulary tiers | TOPIK I vocabulary list (1671 words) is a free, authoritative, frequency-ordered corpus. Aligning the app's vocabulary to TOPIK levels gives learners a recognized external benchmark | MEDIUM | Tag each vocabulary item with TOPIK-I or TOPIK-II. Display "TOPIK I ready" completion milestone. Data available as free public resource |
| Visible learning path with completion state | Distinguishing apps like LingoDeer show users exactly where they are and what unlocks next; this reduces dropout from feeling lost | LOW | Visual curriculum map or progress sidebar. Completed / in-progress / locked state per unit |
| Grammar notes with worked examples | TTMIK is the gold standard for Korean grammar explanations for English speakers; providing this within the app (not linking away) keeps users in context | HIGH | Each grammar point: explanation, 3–5 worked examples with audio, common mistake callout |

### Anti-Features (Commonly Requested, Often Problematic)

Features that appear beneficial but create scope, complexity, or user-experience problems that outweigh the value — particularly given the no-backend, personal-use-first constraints.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Streaks and daily XP | Duolingo made gamification synonymous with language learning; users often ask for it | PROJECT.md explicitly rules it out — and correctly. Streaks optimize for daily logins, not retention or comprehension. Gamification mechanics require backend tracking to be meaningful; localStorage streaks are trivially cheatable and lose meaning. Creates maintenance surface | Focus on genuine progress metrics: lessons completed, vocab items at each SRS maturity level, reading passages finished. These are meaningful signals without gamification |
| Speech recognition / pronunciation scoring | Pimsleur and more advanced apps offer pronunciation feedback | Requires a backend or expensive speech API; Web Speech API is browser-inconsistent and inaccurate for Korean phonemes. Would either degrade UX across browsers or create a hard dependency | Audio listening exercises with self-assessment ("did I say it right?") are the standard offline alternative. Show IPA or romanization for reference |
| User-generated flashcard decks | Anki and Memrise allow custom decks; power users request this | Dramatically increases content management complexity; conflicts with the structured-progression model; without a backend, syncing custom decks across devices is impossible | The app already covers TOPIK-I vocabulary systematically. Users who want custom decks should use Anki alongside this app |
| Community features (forums, comments, shared progress) | HelloTalk and language exchange platforms thrive on community | No backend → no user accounts → no community possible. Any attempt to simulate it (localStorage-only social features) would be a dead end and mislead users | The app is explicitly a companion study tool. Direct users to r/Korean or HelloTalk for community |
| AI-generated content or AI tutoring chat | Talkpal and Kaiwa offer AI conversation; users see this as the future | Requires a backend API key, adds ongoing cost, creates privacy concerns, and introduces hallucination risk for grammar explanations. Scope far exceeds a structured curriculum tool | Pre-authored content is higher quality for structured learning. Grammar explanations written by a subject matter expert outperform LLM-generated ones in accuracy and consistency |
| Offline mode with service worker caching | Native apps (LingoDeer) offer offline; web users sometimes expect it | For a Vite/React SPA with all content embedded as JS/JSON, the app already works offline by nature once loaded. Adding a full service worker PWA increases build complexity disproportionately | Ensure all content (audio excluded) works without a network connection by design. Note that Google TTS audio requires network |
| Romanization as a primary learning mode | Beginners sometimes want romanization crutch | Romanization of Korean is inconsistent (multiple systems) and actively impedes Hangul reading fluency. If romanization is shown prominently, learners lean on it rather than developing Korean reading skill | Show romanization as an optional hint that must be revealed deliberately, not displayed by default. User already knows Hangul |

---

## Feature Dependencies

```
[Vocabulary data layer] (word, definition, audio, example sentences)
    └──required by──> [Flashcard / SRS review]
    └──required by──> [Cloze exercises]
    └──required by──> [Reading passage vocabulary glosses]
    └──required by──> [Grammar lesson worked examples]

[Grammar lesson pages]
    └──required by──> [Sentence building exercises]
    └──required by──> [Grammar cross-reference links]

[Lesson progression model] (levels, units, unlock state)
    └──required by──> [Topic browsing with level badges]
    └──required by──> [Visual curriculum map]

[Audio playback system] (TTS proxy + speed control)
    └──required by──> [Listening exercises]
    └──required by──> [Reading passage line-by-line audio]
    └──required by──> [Dialogue audio playback]
    └──required by──> [Vocabulary pronunciation]

[SRS review schedule] (localStorage)
    └──required by──> [Vocabulary flashcard review queue]
    └──enhances──> [Cloze exercises] (can weight cloze toward due items)

[Reading passages]
    └──enhances──> [Dialogue-based learning] (dialogues are a reading passage subtype)

[Sentence building exercises]
    └──conflicts with──> [Romanization as primary mode] (exercises depend on Hangul literacy)
```

### Dependency Notes

- **Vocabulary data layer is the foundation:** Every exercise type — flashcards, cloze, sentence building, reading glosses — depends on a clean, consistent vocabulary data model. This must be designed first and well.
- **Audio playback must be abstracted early:** The TTS proxy call and speed control logic should be a shared hook/component, not embedded per-feature. Multiple features consume audio.
- **SRS requires persistence design:** The localStorage schema for SRS (card ID, interval, ease factor, next due date) needs to be decided before the flashcard system is built — migrating it later is painful.
- **Grammar pages must exist before sentence building:** Users cannot meaningfully attempt sentence building exercises without having access to the grammar patterns being tested.
- **Romanization hint conflicts with Hangul fluency goal:** Showing romanization prominently undermines the foundational assumption (user knows Hangul). Keep it as an opt-in reveal only.

---

## MVP Definition

### Launch With (v1)

Minimum viable product — enough to validate whether the structured progression + SRS approach works for a Korean learner who knows Hangul.

- [ ] Vocabulary data layer — 200–400 words organized into beginner topics (greetings, numbers, family, food, basic verbs) with example sentences and audio
- [ ] Flashcard review with SRS (SM-2) — localStorage-persisted schedule, basic confidence rating (easy / hard / again)
- [ ] Grammar lesson pages — 10–15 core grammar points covering particles and basic conjugation patterns, with worked examples and audio
- [ ] Multiple-choice listening exercises — hear a word or sentence, select the matching Korean or English
- [ ] Structured lesson progression — at least 2 levels with sequential unlock, each level covering vocabulary set + grammar point(s)
- [ ] Topic browsing index — browse all vocabulary topics regardless of level, with level-recommendation tags
- [ ] Progress persistence — localStorage tracks lesson completion and SRS schedule across sessions
- [ ] Audio playback with speed control — slow (0.75x) and normal (1.0x) for all audio-bearing content

### Add After Validation (v1.x)

Features to add once core progression is working and the content model is stable.

- [ ] Cloze (fill-in-the-blank) exercises — add once vocabulary data layer is large enough to make blanking meaningful
- [ ] Reading passages — add once 3–4 levels of content exist; passages can be composed from known vocabulary + grammar
- [ ] Sentence building (word-order) exercises — add once grammar lessons are complete for the covered patterns; requires clear UI for tile drag-and-drop
- [ ] Visual curriculum map / learning path UI — meaningful only once multiple levels exist with distinct content
- [ ] TOPIK-I vocabulary tier tagging — low-effort enhancement once vocabulary data layer reaches 800+ words

### Future Consideration (v2+)

Features to defer until product-market fit with the core learning loop is established.

- [ ] Dialogue-based context learning — high content authoring cost; defer until core lesson format is proven
- [ ] Grammar cross-reference linking system — high implementation effort; valuable once the grammar library is large
- [ ] Expanded vocabulary to TOPIK-II tier — scope expansion; tackle only after TOPIK-I coverage is solid
- [ ] PWA / installable app — only if usage patterns show users want persistent access beyond browser tab

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Vocabulary flashcards with SRS | HIGH | MEDIUM | P1 |
| Audio pronunciation + speed control | HIGH | LOW | P1 |
| Grammar lesson pages | HIGH | HIGH | P1 |
| Structured level progression | HIGH | MEDIUM | P1 |
| Topic browsing | HIGH | LOW | P1 |
| Progress persistence (localStorage) | HIGH | LOW | P1 |
| Multiple-choice listening exercises | HIGH | MEDIUM | P1 |
| Cloze exercises | HIGH | MEDIUM | P2 |
| Reading passages | HIGH | HIGH | P2 |
| Sentence building (word-order tiles) | MEDIUM | HIGH | P2 |
| Visual curriculum map | MEDIUM | MEDIUM | P2 |
| TOPIK-I vocabulary tagging | MEDIUM | LOW | P2 |
| Dialogue-based learning | HIGH | HIGH | P3 |
| Grammar cross-reference links | MEDIUM | HIGH | P3 |
| Romanization hint (reveal-only) | LOW | LOW | P2 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | Duolingo Korean | LingoDeer Korean | TTMIK Stories | Clozemaster | Our Approach |
|---------|----------------|-----------------|---------------|-------------|--------------|
| Structured progression | Yes (tree) | Yes (units) | No (story library) | No | Yes — sequential levels |
| Topic browsing | Partial | Partial | Yes (by level) | By category | Yes — topic index alongside levels |
| SRS vocabulary review | Basic | Yes | No | Yes (FSRS-5) | SM-2 via localStorage |
| Grammar explanations | Thin (notes only) | Strong (best-in-class free) | No | No | In-depth pattern pages (TTMIK-style) |
| Example sentences | Yes | Yes | Stories only | Yes (sentence = the lesson) | Yes — per vocab item + in passages |
| Listening / audio | Yes (native) | Yes (studio) | Yes (native) | Partial | TTS with speed control |
| Reading passages | No | Partial | Yes (core feature) | Sentence-level only | Yes — graded by level |
| Sentence building | Yes (tile tap) | Partial | No | No | Yes — word-order drag-and-drop |
| Cloze exercises | No | No | No | Yes (core feature) | Yes |
| Progress tracking | Gamified (XP, streaks) | Yes (completion) | No | Yes (mastery %) | Lesson completion + SRS maturity, no gamification |
| Romanization | Optional | Optional | Optional | Optional | Reveal-only hint |
| No account required | No | No | No | No | Yes — localStorage only |

---

## Sources

- [Best Apps to Learn Korean 2026 — Clozemaster Blog](https://blog.clozemaster.com/best-apps-to-learn-korean-2026/)
- [34 Best Korean Learning Apps in 2026 — Joy of Korean](https://joyofkorean.com/apps-to-learn-korean/)
- [Best App for Learning Korean — Chamelingo](https://chamelingo.com/blog/best-app-to-learn-korean-2026)
- [Best Apps to Learn Korean: What Works and What Doesn't — Migaku](https://migaku.com/blog/korean/best-apps-to-learn-korean)
- [LingoDeer Korean Review 2025 — Korean Study Junkie](https://www.koreanstudyjunkie.com/post/is-lingodeer-better-than-duolingo-for-korean-full-review-features-2025)
- [Best Language Learning App for Korean 2025: Taalhammer vs Duolingo, LingQ, LingoDeer, Memrise — Taalhammer](https://www.taalhammer.com/best-language-learning-app-for-korean-in-2025-taalhammer-vs-duolingo-lingq-lingodeer-memrise/)
- [How Spaced Repetition Makes Korean Vocabulary Stick — Chamelingo](https://chamelingo.com/blog/spaced-repetition-korean)
- [TTMIK Stories — 1,000+ Korean Graded Stories with Audio](https://ttmikstories.app/)
- [Korean Reading Practice — Hanabira/Zen Lingo](https://hanabira.org/korean/reading)
- [TOPIK I Vocabulary List — LingoDeer Blog](https://blog.lingodeer.com/topik-1-vocabulary/)
- [Complete TOPIK 1 Vocabulary List — KoreanTOPIK](https://www.koreantopik.com/2024/05/topik-1-vocabulary-list-1850-for.html)
- [Duolingo Korean Review 2026 — Migaku](https://migaku.com/blog/korean/duolingo-korean-review)
- [Mirinae — Korean Sentence Grammar Analysis](https://mirinae.io/)
- [Clozemaster — Learn Language in Context](https://www.clozemaster.com/)

---
*Feature research for: Korean language learning web app (post-Hangul)*
*Researched: 2026-03-12*
