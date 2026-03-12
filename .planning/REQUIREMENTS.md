# Requirements: Hanbuddy

**Defined:** 2026-03-12
**Core Value:** Users can systematically learn Korean vocabulary, grammar, and comprehension through a structured progression with flexible topic-based access.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Vocabulary

- [ ] **VOCAB-01**: User can learn vocabulary through flashcards showing Korean, English, and example sentences
- [x] **VOCAB-02**: Flashcard review uses FSRS spaced repetition with confidence ratings (Again/Hard/Good/Easy)
- [ ] **VOCAB-03**: User can practice vocabulary through cloze (fill-in-the-blank) exercises in sentence context
- [x] **VOCAB-04**: Vocabulary items are tagged with TOPIK-I level for benchmark alignment
- [x] **VOCAB-05**: Each vocabulary item includes 2-3 example sentences with audio

### Grammar

- [x] **GRAM-01**: User can study grammar lesson pages with pattern explanations, particles, and conjugation
- [x] **GRAM-02**: Each grammar point includes 3-5 worked examples with audio
- [ ] **GRAM-03**: User can practice sentence building with word-order drag-and-drop exercises
- [x] **GRAM-04**: Grammar points are cross-referenced and linkable across the app
- [x] **GRAM-05**: Grammar lessons cover speech levels (formal/informal) from the start

### Listening

- [x] **LIST-01**: All audio supports adjustable speed (0.75x slow / 1.0x normal)
- [ ] **LIST-02**: User can practice listening through multiple-choice exercises (hear audio, select answer)
- [x] **LIST-03**: User can learn through dialogue-based lessons (4-8 line conversations with playable lines)

### Reading

- [ ] **READ-01**: User can read graded Korean text passages matched to their level
- [ ] **READ-02**: Reading passages include vocabulary glossing for unknown words
- [ ] **READ-03**: Reading passages support line-by-line audio playback

### Progression

- [x] **PROG-01**: Lessons are organized in structured levels that unlock sequentially
- [x] **PROG-02**: User can browse vocabulary and lessons by topic regardless of level
- [ ] **PROG-03**: User can view a visual curriculum map showing completion state
- [ ] **PROG-04**: User progress persists across sessions via localStorage
- [x] **PROG-05**: Clear beginner orientation directs new users to Level 1

### Foundation

- [x] **FOUND-01**: Content data schema includes speech level, conjugation type, and stable IDs
- [x] **FOUND-02**: localStorage uses versioned schema with migration support
- [x] **FOUND-03**: Korean text processing via es-hangul (josa particles, decomposition)
- [x] **FOUND-04**: Romanization shown as opt-in reveal hint only, never primary display

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Notifications

- **NOTF-01**: Daily review reminder notification (PWA)

### Content Expansion

- **CONT-01**: TOPIK-II vocabulary tier coverage
- **CONT-02**: Expanded dialogue library with more complex conversations
- **CONT-03**: Grammar cross-reference linking to external resources (TTMIK, etc.)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Gamification (XP, streaks, achievements) | Pure learning focus, explicitly excluded |
| Speech recognition / pronunciation scoring | Requires backend or unreliable Web Speech API for Korean |
| User-generated flashcard decks | Conflicts with structured progression; use Anki alongside |
| Community features (forums, comments) | No backend, no user accounts |
| AI tutoring / AI-generated content | Requires backend API, ongoing cost, hallucination risk |
| Mobile native app | Web-first; already works on mobile browsers |
| Integration with Hanguller | Standalone app, separate progress |
| Romanization as primary display | Undermines Hangul fluency; reveal-only hint |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| GRAM-01 | Phase 2 | Complete |
| GRAM-02 | Phase 2 | Complete |
| GRAM-04 | Phase 2 | Complete |
| GRAM-05 | Phase 2 | Complete |
| LIST-01 | Phase 2 | Complete |
| PROG-01 | Phase 2 | Complete |
| PROG-02 | Phase 2 | Complete |
| PROG-05 | Phase 2 | Complete |
| VOCAB-01 | Phase 3 | Pending |
| VOCAB-02 | Phase 3 | Complete |
| VOCAB-03 | Phase 3 | Pending |
| VOCAB-04 | Phase 3 | Complete |
| VOCAB-05 | Phase 3 | Complete |
| LIST-02 | Phase 3 | Pending |
| LIST-03 | Phase 3 | Complete |
| GRAM-03 | Phase 3 | Pending |
| READ-01 | Phase 4 | Pending |
| READ-02 | Phase 4 | Pending |
| READ-03 | Phase 4 | Pending |
| PROG-03 | Phase 4 | Pending |
| PROG-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0

---
*Requirements defined: 2026-03-12*
*Last updated: 2026-03-12 after roadmap creation*
