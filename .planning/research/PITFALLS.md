# Pitfalls Research

**Domain:** Korean language learning web app (client-side React, localStorage, TTS, embedded content)
**Researched:** 2026-03-12
**Confidence:** HIGH (Korean linguistics), MEDIUM (SRS + localStorage at this scale), HIGH (TTS browser behavior)

---

## Critical Pitfalls

### Pitfall 1: Collapsing All Speech Levels Into One

**What goes wrong:**
The app teaches Korean only in one formality level — typically the polite 해요 form — and treats it as "the" way Korean is spoken. Learners then encounter real Korean (dramas, friends, offices) and are immediately lost because every register sounds different. Worse: apps that teach exclusively formal 합쇼체 (하십시오체) produce learners who sound bizarrely stiff ordering coffee.

**Why it happens:**
Developers simplify to avoid scope explosion. Korean has 7 grammatically distinct speech levels, so defaulting to one feels pragmatic. The three practically important levels (해요체, 해라체/반말, 합쇼체) are collapsed into one to ship faster.

**How to avoid:**
Design the content schema from the start with a `speech_level` field on every sentence and dialogue. Teach 해요체 as the explicit default "polite informal" baseline. Flag 반말 and 합쇼체 as named variants when they appear. Do NOT try to teach all seven levels — three are sufficient. The critical distinction to encode: speech levels are for the *listener*, honorific vocabulary (존댓말 lexical items like 드시다 vs 먹다) is for the *subject being discussed*.

**Warning signs:**
- All example sentences end in -요
- No dialogue has a casual or command register
- Content data has no `formality` or `speech_level` metadata field

**Phase to address:**
Content schema design phase (before any vocabulary data is written). This cannot be retrofitted.

---

### Pitfall 2: Teaching One Number System Without Flagging the Other

**What goes wrong:**
Korean has two completely separate number systems: Native Korean (하나, 둘, 셋... for counting objects, age, hours) and Sino-Korean (일, 이, 삼... for money, minutes, dates, phone numbers, floors). Apps teach one system first and defer the other. Learners then encounter "두 개" and "이십 원" in the same sentence and have no mental model for why both exist or when to use each.

**Why it happens:**
Presenting both at the same time looks overwhelming. Deferring one feels like good pedagogy. But deferral without explicit flagging creates confusion the moment learners see any real Korean text.

**How to avoid:**
Introduce both systems early — in the same lesson, explicitly named as "System 1" and "System 2." Build a usage-context table into the lesson content: Native = age/hours/counting things; Sino = money/minutes/dates/phone/floors/years. Never introduce a vocabulary item using numbers without specifying which system. Note: 하나→한, 둘→두, 셋→세 contractions before counters must be taught as part of the number lesson, not discovered later.

**Warning signs:**
- Number lessons reference only 하나/둘 or only 일/이
- No lesson content explains the "when to use which" rule
- Vocabulary items with numbers don't specify the system

**Phase to address:**
Numbers topic module, early in the curriculum (Level 1 content).

---

### Pitfall 3: Irregular Verb Conjugation Presented as Edge Cases

**What goes wrong:**
The six Korean irregular verb types (ㅂ, ㄷ, ㅅ, 르, 으, ㄹ irregulars) are introduced as footnotes or "advanced" content, but they appear constantly in basic vocabulary. Common beginner words like 쉽다 (easy), 듣다 (listen), 짓다 (build), 모르다 (don't know) are all irregular. Learners try to apply regular conjugation rules and produce wrong forms. The app's drill answers silently mark them wrong with no explanation of *why*.

**Why it happens:**
Irregulars feel like grammar complexity that belongs in intermediate content. Developers sequence them after regular conjugation is "mastered." But frequency data betrays this — irregular verbs are not rare.

**How to avoid:**
Tag every verb in the vocabulary data with `conjugation_type: "regular" | "b-irregular" | "d-irregular" | "s-irregular" | "r-irregular" | "eu-irregular" | "l-irregular"`. When a drill involves conjugation, display the relevant rule on the feedback screen. Introduce irregulars in the same lesson as the grammar patterns that trigger them — not as a separate later unit. Prioritize the ㅂ and 르 irregulars first as they appear in the most common words.

**Warning signs:**
- Vocabulary data has no conjugation type metadata
- Common verbs like 듣다/쉽다 appear in drills without conjugation guidance
- Grammar lessons cover -아/어 endings without mentioning ㅂ→우 change

**Phase to address:**
Vocabulary data schema design and grammar lesson sequencing phase.

---

### Pitfall 4: localStorage Data Structure That Cannot Evolve

**What goes wrong:**
Progress data is stored with an ad-hoc flat structure like `{ "word_123_seen": true, "word_123_score": 3 }`. As the app grows, this structure breaks — new SRS fields can't be added without migrating existing data, keys proliferate into hundreds of unstructured entries, and the app silently behaves incorrectly for users with old data formats.

**Why it happens:**
localStorage feels simple, so developers skip schema design. The first version works. By the time the structure is painful, there is existing user data that cannot be silently wiped.

**How to avoid:**
Define a versioned storage schema before writing any localStorage code. Structure: one top-level key for the app (`hanbuddy_v1`) containing a JSON object with a `schema_version` field and typed sub-objects (`progress`, `settings`, `srs_queue`). Implement a migration function that runs on app boot: check `schema_version`, apply transformations if needed, write updated version. Keep migrations in source — they are permanent. Never store content data (vocabulary definitions, lesson text) in localStorage — only user state.

**Warning signs:**
- No `schema_version` in localStorage data
- Direct reads of individual keys like `localStorage.getItem("word_45_score")`
- No migration logic in app bootstrap

**Phase to address:**
Phase 1 (foundation/data layer) — before any user-facing features.

---

### Pitfall 5: Overfilling the 5 MB localStorage Budget with Content

**What goes wrong:**
The app embeds all Korean content as JS/JSON data files. When the developer also caches progress state, SRS scheduling data, and user settings in localStorage, the 5 MB per-origin limit fills up. The app throws a silent `QuotaExceededError`, stops saving progress, and the user loses their learning history without any indication.

**Why it happens:**
Content data size is tracked during build. localStorage usage is not. Developers don't realize the cumulative size of SRS timestamps, review history arrays, and per-item metadata until it's too late.

**How to avoid:**
Keep content data entirely out of localStorage — it lives in the bundle (JS/JSON imports), not storage. localStorage should only hold: user progress flags, SRS scheduling dates, settings, and completion booleans. Budget the storage: SRS data for 1000 vocabulary items with full history ≈ 200-400 KB; settings ≈ 10 KB; total budget ≈ 5 MB. Wrap every `localStorage.setItem` call in try/catch for `QuotaExceededError`. Show a visible warning when approaching 80% of the budget.

**Warning signs:**
- No try/catch around localStorage writes
- SRS history stores every review event (grows unbounded)
- No measurement of current localStorage usage at any point in development

**Phase to address:**
Phase 1 (storage architecture) — establish the budget rule before first data write.

---

### Pitfall 6: Particles Taught as Rules Instead of Pattern Exposure

**What goes wrong:**
The app presents particles (은/는, 이/가, 을/를, 에, 에서, 로/으로) as memorizable grammar rules with drills that test whether learners can identify them. Learners pass the drills but cannot produce particles naturally in novel sentences — because particle selection in Korean requires contextual judgment (topic vs. subject emphasis, new vs. given information) that cannot be reduced to a simple rule.

**Why it happens:**
Grammar-rule presentation is easy to structure and easy to test. "Use 은/는 for the topic, 이/가 for the subject" is writable as a quiz. The actual pragmatic distinction requires thousands of examples to internalize.

**How to avoid:**
Supplement rule-based particle lessons with high-volume sentence examples showing the same noun with different particles and different meanings. Every particle lesson should include at least 5-8 contrasting example pairs. Particle drills should primarily be fill-in-the-blank in context sentences, not abstract "which particle fits here?" out-of-context questions. Mark 은/는 vs 이/가 distinction as "comes with exposure, not rules" in the lesson content itself — set expectations correctly.

**Warning signs:**
- Particle lessons have fewer than 5 example sentences
- No contrast examples (same noun, different particle, different meaning)
- Particle drills use isolated noun+particle matching without sentence context

**Phase to address:**
Grammar content authoring phase (particle lessons and sentence example library).

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Single formality level in all content | Faster content authoring | Confuses learners the moment they see real Korean; requires full content rewrite to add registers | Never — tag at authoring time |
| No `conjugation_type` on verb data | Simpler data schema | Can't explain wrong answers in conjugation drills; grammar features need a full schema migration | Never — add at the start |
| Unbounded SRS review history array | Simple to append | Fills localStorage budget; slows JSON parse on boot | Acceptable in MVP if review history is capped at last 50 events per item |
| Hardcoded lesson order in component logic | Fast to ship | Reordering curriculum requires code changes, not data changes | Only acceptable for first 10 lessons; extract to config before scaling |
| TTS fired on every render instead of user action | Simpler code | Audio fires unexpectedly on re-renders; wastes Google TTS quota | Never — always gate TTS on explicit user interaction |
| No schema version in localStorage | Saves one field | Any data structure change corrupts existing user progress silently | Never — one line to prevent major support issue |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google TTS proxy | Fire a new TTS request for the same Korean text on every playback | Cache the audio blob URL in memory (Map keyed by text+speed) for the session; re-use for repeated plays |
| Google TTS proxy | Pass raw Korean text with punctuation — commas and periods alter prosody unpredictably | Strip or normalize punctuation before sending to TTS; test edge cases like 안녕하세요! vs 안녕하세요 |
| Google TTS proxy | No error handling when proxy is unavailable | Graceful degradation: disable audio button and show "Audio unavailable" — don't crash the lesson flow |
| Google TTS proxy | Speed control implemented by re-fetching at different rate | Use the HTML `<audio>` element's `playbackRate` property for on-the-fly speed change — no re-fetch needed |
| Web Speech API (fallback) | Assume `ko-KR` locale is always available | Check `speechSynthesis.getVoices()` for `ko-KR` before using; fall back to Google TTS proxy if unavailable |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading all vocabulary JSON at app boot | Slow initial load as content grows; blocking parse on main thread | Code-split content by module/level; load lesson data on demand | At ~500+ vocabulary items with rich metadata |
| JSON.parse of entire SRS state on every route change | Noticeable lag navigating between lessons | Parse once on boot, keep in React state/context; only write back on changes | At ~200+ tracked items with history |
| Re-rendering all flashcard items to find due cards | UI freezes during SRS queue computation | Pre-compute due queue on boot and on review completion; memoize | At ~100+ due items in queue |
| TTS requests for every character as user types (if search/input features added) | Excessive proxy calls, rate limiting | Debounce any TTS trigger by 500ms minimum | Immediately — always debounce |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Showing lesson unlock state without showing *why* it's locked | Learners don't know what to complete to progress; frustration and abandonment | Show prerequisite: "Complete Lesson 3 to unlock" with a direct link |
| SRS "due" queue mixing forgotten beginner words with new advanced vocab | Overwhelm; learner cannot tell what is a new word vs. something they failed | Separate visual treatment for "new" vs. "review" cards; show item age |
| Audio playback only on the "answer" side of a flashcard | Learner never practices recognition from sound alone | Provide audio on *both* question and answer sides; let user choose direction |
| No confirmation before clearing progress | User loses all SRS history with a misclick | Two-step confirmation with explicit count: "This will delete 47 reviewed items. Are you sure?" |
| Lesson progression locked too strictly | Users who know some Korean cannot access relevant content | Topic-browse mode should always be freely accessible, independent of structured progression |
| Presenting Korean words without counters/classifiers | Learners memorize 사과 (apple) but don't know how to say "3 apples" | Include counter/classifier notes in vocabulary metadata; teach common counters (개, 명, 권) early |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Vocabulary drill:** Often missing conjugation type metadata — verify every verb in the data has `conjugation_type` set before lesson goes live
- [ ] **Grammar lesson:** Often missing contrasting examples — verify each grammar point has at least 3 sentences showing the rule *and* sentences showing related exceptions
- [ ] **SRS implementation:** Often missing the "new card limit per day" cap — verify the queue cannot surface 80 new items at once and overwhelm the learner
- [ ] **TTS playback:** Often missing error handling — verify audio failure shows a graceful fallback message, not a broken audio button
- [ ] **Lesson unlock system:** Often missing "what to do next" guidance — verify locked lessons display their unlock prerequisite
- [ ] **localStorage writes:** Often missing quota error handling — verify every `setItem` call is wrapped in try/catch
- [ ] **Speech level tagging:** Often missing on dialogue content — verify every dialogue sentence has an explicit formality tag in the data
- [ ] **Number system:** Often incomplete — verify lessons distinguish Sino-Korean vs Native Korean with context rules, not just vocabulary lists

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Speech level missing from content schema | HIGH | Audit all content, add `speech_level` field, update all existing sentences, update all components that render content |
| Verb conjugation type missing from vocabulary data | MEDIUM | Script to audit verbs, manually tag irregular verbs, no UI changes needed if field is optional with fallback |
| localStorage schema has no versioning | MEDIUM | Add `schema_version: 1` to current structure, write migration 0→1 that adds the field to existing data, deploy |
| localStorage quota exceeded silently | MEDIUM | Add global error boundary for storage, implement history pruning (keep last N reviews per item), add storage usage display in settings |
| TTS caching not implemented (excess proxy calls) | LOW | Add in-memory Map cache as a single hook/utility; no data migration needed |
| Lesson unlock too restrictive (users stuck) | MEDIUM | Add topic-browse bypass as a settings toggle; does not require content changes |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Speech level collapse | Phase 1 (content schema design) | Every sentence data object has a `speech_level` field before any content is authored |
| Dual number system confusion | Phase 2 (numbers content module) | Numbers lesson has a usage-context table distinguishing Sino-Korean vs Native Korean contexts |
| Irregular verb handling | Phase 1 (vocabulary data schema) | Every verb in vocab data has `conjugation_type`; drill feedback displays rule on wrong answer |
| localStorage schema with no versioning | Phase 1 (storage layer) | App boot reads `schema_version`, runs migration function, schema is documented |
| localStorage budget overflow | Phase 1 (storage layer) | try/catch on all writes; content data is never stored in localStorage |
| Particle teaching as pure rules | Phase 3 (grammar content authoring) | Each particle lesson has contrast sentence pairs; fill-in-the-blank in context sentences |
| TTS request flooding | Phase 2 (audio feature) | TTS calls are cached by text+speed key; `playbackRate` used for speed control instead of re-fetching |
| SRS queue overwhelming new learners | Phase 2 (SRS implementation) | Daily new card cap is configurable and set to a sane default (≤10 new cards/day) |

---

## Sources

- [Top 10 Mistakes to Avoid While Learning Korean - Good Job Korean](https://www.goodjobkorean.com/blog/tips-for-Korean-language-learners)
- [Korean Honorifics and Speech Levels - Migaku](https://migaku.com/blog/korean/korean-honorifics)
- [Korean Speech Levels Guide - Bunpo](https://bunpo.app/blog/korean/a-guide-to-korean-speech-levels-how-to-speak-respectfully-in-korean/)
- [Korean Numbers: Sino vs Native - 90 Day Korean](https://www.90daykorean.com/korean-numbers/)
- [When to Use Sino and Native Korean Numbers - LearnKorean24](https://learnkorean24.com/when-to-use-sino-and-native-korean-numbers/)
- [Korean Irregular Verbs - 90 Day Korean](https://www.90daykorean.com/korean-irregular-verbs/)
- [Korean Irregular Verbs: 6 Types - StoryLearning](https://storylearning.com/learn/korean/korean-tips/korean-irregular-verbs)
- [Korean Particles Guide - Migaku](https://migaku.com/blog/korean/korean-particles)
- [Korean Particles - 90 Day Korean](https://www.90daykorean.com/korean-particles/)
- [SRS Common Mistakes - TrustWrites](https://trustwrites.com/en/education-srs-en/)
- [localStorage limitations and performance - RxDB](https://rxdb.info/articles/localstorage.html)
- [Using localStorage in Modern Applications - RxDB](https://rxdb.info/articles/localstorage.html)
- [5 Mistakes People Make When Starting to Learn Korean - Luca Lampariello](https://www.lucalampariello.com/5-mistakes-people-learn-korean/)
- [Why You Can't Speak Korean After 5 Apps - Kaiwa](https://trykaiwa.com/blog/korean-why-you-cant-speak-after-apps-what-works)
- [Common Mistakes: Korean Learners - Glossika Blog](https://ai.glossika.com/blog/common-korean-mistakes)

---
*Pitfalls research for: Korean language learning web app (Hanbuddy)*
*Researched: 2026-03-12*
