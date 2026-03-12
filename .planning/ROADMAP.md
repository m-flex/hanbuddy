# Roadmap: Hanbuddy

## Overview

Hanbuddy builds a Korean language learning app in four phases. The schema and engine are established first because every downstream feature — flashcards, exercises, SRS, reading — depends on stable data structures that cannot be retrofitted. Audio and lessons ship second, validating the content model before it fans out. SRS and the full exercise suite ship third, layering on the validated foundation. Reading and the visual curriculum close the v1 release once sufficient content volume exists.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Data schema, storage layer, engine, and project scaffolding (completed 2026-03-12)
- [ ] **Phase 2: Lessons** - Audio service, lesson viewer, core grammar content, and progression structure
- [ ] **Phase 3: Practice** - SRS vocabulary drills, cloze exercises, listening, and sentence building
- [ ] **Phase 4: Reading and Curriculum** - Graded reading passages, progress persistence, and visual curriculum map

## Phase Details

### Phase 1: Foundation
**Goal**: The content schema, storage layer, and engine are established so every subsequent feature can be built without rework
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04
**Success Criteria** (what must be TRUE):
  1. A TypeScript vocabulary item can be authored with `speech_level`, `conjugation_type`, and a stable `voc-NNN` ID, and the type system rejects malformed entries at build time
  2. The app boots, reads zero saved state from localStorage, and writes an initial versioned schema record (`hanbuddy_v1` key) without error
  3. A simulated schema migration (version bump) runs on boot and correctly transforms old shape to new shape without data loss
  4. Korean particle selection via es-hangul produces correct 은/는 and 이/가 forms for both consonant-final and vowel-final nouns
  5. Romanization is rendered only when explicitly revealed — it does not appear in any default view
**Plans:** 2/2 plans complete

Plans:
- [ ] 01-01-PLAN.md — Project scaffold, content type system, and sample data with build-time validation
- [ ] 01-02-PLAN.md — Zustand stores with persist/migration, Korean engine utilities, and romanization hook

### Phase 2: Lessons
**Goal**: Users can navigate structured lesson content with audio, covering core grammar, speech levels, and topic browsing
**Depends on**: Phase 1
**Requirements**: GRAM-01, GRAM-02, GRAM-04, GRAM-05, LIST-01, PROG-01, PROG-02, PROG-05
**Success Criteria** (what must be TRUE):
  1. A new user opening the app sees a clear beginner orientation screen directing them to Level 1, Lesson 1
  2. User can open a grammar lesson page and see pattern explanation, particles, conjugation tables, and 3-5 worked example sentences — each with a playable audio button
  3. Audio plays at 0.75x slow and 1.0x normal speed with correct Naver TTS pitch; toggling speed mid-lesson works without page reload
  4. Formal (합쇼체) and informal polite (해요체) speech levels are distinguished in lesson content from the start — no lesson presents a single form as "the Korean way"
  5. User can browse vocabulary and lessons by topic (greetings, numbers, food, etc.) regardless of which level they are on
  6. Completing a lesson unlocks the next lesson in sequence; locked lessons are visibly distinct from unlocked ones
**Plans:** 2/4 plans executed

Plans:
- [ ] 02-01-PLAN.md — Routing shell, audio utility, TTS worker, and shared UI components
- [ ] 02-02-PLAN.md — Content expansion (5+ lessons, 8+ grammar points, 20+ vocab)
- [ ] 02-03-PLAN.md — Lesson list page and lesson detail page with completion flow
- [ ] 02-04-PLAN.md — Topic browsing pages and settings page

### Phase 3: Practice
**Goal**: Users can retain vocabulary through SRS flashcard review and reinforce it through cloze, listening, and sentence-building exercises
**Depends on**: Phase 2
**Requirements**: VOCAB-01, VOCAB-02, VOCAB-03, VOCAB-04, VOCAB-05, LIST-02, LIST-03, GRAM-03
**Success Criteria** (what must be TRUE):
  1. User can review vocabulary flashcards showing Korean, English, and an example sentence; flipping the card plays audio on the answer side
  2. Rating a card Again/Hard/Good/Easy schedules its next review via FSRS — due cards appear in review sessions, new cards are capped at 10 per day
  3. User can complete a cloze exercise where a vocabulary word is blanked out in a sentence, and the correct answer is accepted while incorrect answers show the right form
  4. User can complete a listening exercise by hearing audio and selecting the correct Korean or English answer from multiple choices
  5. User can complete a sentence-building exercise by arranging word tiles into correct Korean word order
  6. Each vocabulary item shows its TOPIK-I level tag — user can see at a glance whether a word is TOPIK-I Beginner or Intermediate
**Plans:** 5 plans

Plans:
- [ ] 03-01-PLAN.md — Install ts-fsrs, extend content types (TOPIK level, dialogues), author missing vocab examples
- [ ] 03-02-PLAN.md — SRS Zustand store with FSRS scheduling, practice navigation shell and routes
- [ ] 03-03-PLAN.md — Flashcard review system (FlashCard, RatingButtons, FlashcardReviewPage)
- [ ] 03-04-PLAN.md — Cloze and listening exercise pages with exercise utilities
- [ ] 03-05-PLAN.md — Sentence building exercise and dialogue lesson viewer

### Phase 4: Reading and Curriculum
**Goal**: Users can read graded Korean passages and see their full curriculum progress visualized across all levels
**Depends on**: Phase 3
**Requirements**: READ-01, READ-02, READ-03, PROG-03, PROG-04
**Success Criteria** (what must be TRUE):
  1. User can open a reading passage matched to their current level and read Korean text with vocabulary glosses appearing inline for unfamiliar words
  2. User can tap a line in a reading passage to hear it read aloud at their chosen speed
  3. User can view a visual curriculum map showing which lessons are complete, in progress, or locked across all levels
  4. Closing the browser and reopening the app restores the user's lesson completion state, SRS card states, and settings exactly as left — no progress is lost
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete   | 2026-03-12 |
| 2. Lessons | 2/4 | In Progress|  |
| 3. Practice | 0/5 | Not started | - |
| 4. Reading and Curriculum | 0/TBD | Not started | - |
