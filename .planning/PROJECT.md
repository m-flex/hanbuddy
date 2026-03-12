# Hanbuddy

## What This Is

A comprehensive Korean language learning web app that picks up where Hanguller (Hangul alphabet trainer) leaves off. Hanbuddy teaches vocabulary, grammar, reading, and listening — taking users from knowing the Korean alphabet to actually understanding and using the language. Built primarily for personal use, but designed to work for any beginner.

## Core Value

Users can systematically learn Korean vocabulary, grammar, and comprehension through a structured progression with flexible topic-based access.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Structured lesson progression (levels that unlock sequentially)
- [ ] Topic-based browsing (greetings, food, numbers, travel, etc.)
- [ ] Vocabulary learning with spaced repetition drills
- [ ] Grammar lessons with sentence pattern explanations
- [ ] Reading practice with Korean text passages
- [ ] Listening exercises with TTS and adjustable speed
- [ ] Sentence building / translation exercises
- [ ] Context-based learning through example sentences and dialogues
- [ ] Progress tracking with localStorage persistence
- [ ] Supports complete beginners and users with basic Korean knowledge

### Out of Scope

- Gamification (XP, achievements, streaks) — pure learning focus
- Integration with Hanguller — standalone app, separate progress
- Hangul alphabet teaching — covered by Hanguller
- Mobile native app — web-first
- User accounts / backend — localStorage only
- Real-time conversation practice — not feasible without a backend

## Context

- Companion app to Hanguller (C:/dev/Hanguller), a Hangul alphabet learning tool built with React 19, Vite, Tailwind CSS 4
- Same tech stack for consistency: React 19, Vite, Tailwind CSS 4, localStorage
- Audio via Google TTS proxy (same approach as Hanguller) with adjustable speed control
- Learning approach: mix of drill-based (flashcards, quizzes, SRS) and context-based (sentences, dialogues, reading passages)
- Target user knows Hangul characters but is starting Korean language learning from scratch

## Constraints

- **Tech stack**: React 19, Vite, Tailwind CSS 4 — consistent with Hanguller
- **Storage**: localStorage only — no backend, no user accounts
- **Audio**: Google TTS proxy — no pre-recorded audio files
- **Data**: All Korean language content embedded in app (JSON/JS data files)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Same stack as Hanguller | Consistency, familiarity, proven to work for this type of app | — Pending |
| No gamification | Pure learning focus, less complexity | — Pending |
| Standalone from Hanguller | Simpler architecture, no cross-app data concerns | — Pending |
| Structured + topic browsing | Structured path for progression, topics for flexibility | — Pending |
| TTS with speed control | Pronunciation is critical for Korean, slow mode aids comprehension | — Pending |

---
*Last updated: 2026-03-12 after initialization*
