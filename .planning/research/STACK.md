# Stack Research

**Domain:** Korean language learning web app (vocabulary, grammar, SRS, listening)
**Researched:** 2026-03-12
**Confidence:** HIGH (core stack confirmed by Hanguller precedent; supporting libraries verified via npm registry)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | ^19.2.0 | UI framework | Already used in Hanguller; React 19 ships the new compiler and concurrent features; consistency eliminates context-switching cost |
| Vite | ^7.3.1 | Build tool + dev server | Already used in Hanguller; native ESM, sub-second HMR, `import.meta.glob` for dynamic content loading — critical for loading lesson data on demand |
| Tailwind CSS | ^4.2.1 | Styling | Already used in Hanguller; v4 ships with a Vite plugin (`@tailwindcss/vite`) that replaces PostCSS config; no separate CSS build step needed |
| React Router DOM | ^7.13.1 | Client-side routing | Already used in Hanguller; v7 is the current stable release with data-mode loaders; lesson/topic/drill pages each need distinct URLs |
| Lucide React | ^0.577.0 | Icon set | Already used in Hanguller; tree-shakeable SVG icons; consistent visual language across companion apps |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| ts-fsrs | ^5.2.3 | FSRS v5 spaced repetition scheduling | Use instead of hand-rolling SM-2; FSRS outperforms SM-2 empirically; TypeScript-native, ESM-compatible, no dependencies; drop-in for browser localStorage use |
| es-hangul | ^2.3.8 | Korean text processing (josa selection, choseong extraction, syllable decomposition) | Use when: rendering Korean particles correctly (을/를, 이/가) based on final consonant; implementing Korean substring search; decomposing syllables for display |
| framer-motion | ^12.35.2 | Animation | Already used in Hanguller; flashcard flip, slide transitions between lessons, answer feedback animations |
| Zustand | ^5.0.11 | Global state + localStorage persistence | Use for cross-component state (current lesson, SRS card queue, audio settings, progress); built-in `persist` middleware writes directly to localStorage — no extra glue code |

### Audio (No npm package needed)

| Approach | Implementation | Why |
|----------|---------------|-----|
| Naver TTS via Cloudflare Worker proxy | Port from Hanguller (`hangulr-tts.imminencers.workers.dev`) | Proven in production; Naver TTS has high-quality `ko-KR` voices (kyuri female, jinho male) with a `-5 to +5` speed parameter; no API keys needed in the client |
| Web Speech API fallback | `SpeechSynthesisUtterance`, `lang: 'ko-KR'`, `utterance.rate` | Covers offline/proxy-unavailable scenarios; already implemented in Hanguller |
| Web Audio API (sound effects) | `AudioContext`, `OscillatorNode` | Correct/wrong answer feedback tones; already implemented in Hanguller |

Speed control mapping (from Hanguller): `naverSpeed = Math.round(Math.max(-5, Math.min(5, (rate - 0.75) * 8)))`. Default rate `0.75` maps to Naver speed `-2` (slightly slow — good for learners). This formula should be reused verbatim.

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| @vitejs/plugin-react | Fast Refresh + JSX transform | Use with Vite; Babel-based by default; sufficient for this app size |
| ESLint 9 (flat config) | Linting | Already configured in Hanguller with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`; copy config |
| @types/react ^19.2.7 | TypeScript types for React | Use even in JSX-only project for editor autocomplete |

---

## Installation

```bash
# Core (same as Hanguller)
npm install react@^19.2.0 react-dom@^19.2.0 react-router-dom@^7.13.1 framer-motion@^12.35.2 lucide-react@^0.577.0

# SRS + Korean text
npm install ts-fsrs@^5.2.3 es-hangul@^2.3.8

# State management
npm install zustand@^5.0.11

# Dev dependencies (same as Hanguller)
npm install -D vite@^7.3.1 @vitejs/plugin-react@^5.1.1 tailwindcss@^4.2.1 @tailwindcss/vite@^4.2.1 eslint@^9.39.1 @eslint/js @types/react@^19.2.7 @types/react-dom@^19.2.3 eslint-plugin-react-hooks@^7.0.1 eslint-plugin-react-refresh@^0.4.24 globals
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| ts-fsrs (FSRS v5) | Custom SM-2 (Hanguller's approach) | SM-2 is fine for a small alphabet trainer with ~40 cards. For vocabulary (hundreds of words), FSRS produces meaningfully better recall predictions and is worth the library dependency |
| ts-fsrs | `spaced-repetition` npm package | Only when you need a zero-dependency SM-2 drop-in and cannot add a TypeScript package |
| es-hangul | hangul-js | hangul-js is unmaintained (last release 1+ year ago, 0.2.6). es-hangul is actively developed by Toss (major Korean tech company), v2.3.8 released Sep 2025, TypeScript-native |
| Zustand persist | Raw localStorage (Hanguller's approach) | Raw localStorage works fine for a single-concern app like Hanguller. Hanbuddy has more state slices (lesson progress, SRS per-word, topic filters, audio settings) — Zustand's `persist` middleware handles serialization and partial state updates cleanly |
| Naver TTS proxy | Google Cloud TTS API | Google Cloud TTS requires API keys, billing setup, and a backend proxy. Naver TTS via existing Cloudflare Worker proxy is already running and has been validated for Korean |
| Naver TTS proxy | Web Speech API (primary) | Web Speech API Korean voice quality varies dramatically by OS. Windows often lacks a `ko-KR` voice. Naver TTS is consistent quality; Web Speech is kept only as fallback |
| React Router DOM v7 | TanStack Router | TanStack Router is excellent but adds conceptual overhead. React Router v7 is already proven in Hanguller and covers all routing needs for a lesson-based SPA |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| hangul-js | Unmaintained; last published 1+ year ago; lacks TypeScript types | es-hangul (actively maintained by Toss, TypeScript-native) |
| SM-2 custom implementation for vocabulary SRS | Hanguller's SM-2 is correct for small card sets but SM-2 underperforms FSRS for large vocabulary decks — research shows 20-40% better retention with FSRS | ts-fsrs |
| Google Translate TTS (translate_tts endpoint) | Disabled by Google in mid-2023 | Naver TTS proxy (already running) or Google Cloud TTS (requires billing) |
| Pre-recorded audio files | Korean vocabulary sets have thousands of words; managing audio files is impractical at scale; storage bloat | TTS-on-demand with blob URL caching (Hanguller pattern) |
| Redux / Redux Toolkit | Excessive boilerplate and bundle weight for an offline-first localStorage app | Zustand with persist middleware |
| react-i18next or similar i18n libraries | App is Korean-content-first, not a localized UI; the "content" is the curriculum, not UI strings | Plain JavaScript data files (JSON/JS modules) imported via Vite |
| Backend / database | Out of scope per PROJECT.md; adds auth, hosting, and sync complexity | localStorage via Zustand persist |
| canvas-confetti | Used in Hanguller for achievements; PROJECT.md explicitly removes gamification from Hanbuddy | Nothing — omit |

---

## Stack Patterns by Variant

**For SRS card scheduling (vocabulary drills):**
- Use `ts-fsrs` `createEmptyCard()` + `fsrs.next(card, now, rating)` to produce next-review timestamps
- Store card state objects in Zustand store, persisted to localStorage
- `rating` maps to: Again (1) = wrong, Hard (2) = very difficult, Good (3) = correct with effort, Easy (4) = instant recall

**For Korean text rendering (grammar lessons):**
- Use `es-hangul` `josa()` for particle selection when generating Korean sentences programmatically
- Use `es-hangul` `disassemble()` for choseong-based search across vocabulary

**For lesson content (embedded data):**
- Use plain `.js` or `.json` modules under `src/data/`
- Use `import.meta.glob` for lazy-loading lesson content by topic/level to avoid loading all vocabulary on startup

**For audio playback with speed control:**
- Reuse Hanguller's `audio.js` pattern directly: fetch from Cloudflare Worker, cache as blob URLs in a `Map`, fall back to Web Speech API
- Expose `speak(text, rate)` as a shared utility; rate `0.5` for slow-mode listening exercises, `0.75` for default, `1.0` for native speed

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| React ^19.2.0 | react-router-dom ^7.13.1 | RRD v7 requires React 18+; works with React 19 |
| React ^19.2.0 | framer-motion ^12.35.2 | framer-motion v12 supports React 19 |
| tailwindcss ^4.2.1 | @tailwindcss/vite ^4.2.1 | Must match major versions; v4 uses the Vite plugin, NOT the PostCSS plugin |
| vite ^7.3.1 | @vitejs/plugin-react ^5.1.1 | plugin-react v5 targets Vite 5+; confirmed working with Vite 7 in Hanguller |
| ts-fsrs ^5.2.3 | ESM (Vite) | ts-fsrs supports ESM, CJS, and UMD; works natively with Vite's ESM dev server |
| es-hangul ^2.3.8 | Vite ESM | Published as ESM-first; Toss explicitly documents optimal bundle size via ESM tree-shaking |
| zustand ^5.0.11 | React 19 | Zustand v5 is React 18+ compatible; bug fix in v5.0.10 resolved persist middleware race condition |

---

## Sources

- Hanguller source code (`C:/dev/Hanguller`) — confirmed stack versions from `package.json`, audio/TTS implementation from `src/utils/audio.js`, SRS implementation from `src/store/progress.js`
- `npm info ts-fsrs version` → 5.2.3 (verified 2026-03-12)
- `npm info es-hangul version` → 2.3.8 (verified 2026-03-12)
- `npm info zustand version` → 5.0.11 (verified 2026-03-12)
- `npm info react version` → 19.2.4, `npm info vite version` → 7.3.1, `npm info tailwindcss version` → 4.2.1 (verified 2026-03-12)
- GitHub: open-spaced-repetition/ts-fsrs — FSRS v5 implementation, TypeScript, ESM/CJS/UMD support, requires Node 18+
- GitHub: toss/es-hangul — v2.3.8 (Sep 2025), 1.8k stars, 44 releases, TypeScript-native, actively maintained by Toss
- WebSearch: "hangul-js npm" — last release 1+ year ago, 0.2.6, unmaintained (LOW confidence for current maintenance, but version fact is observable from npm)
- WebSearch: "Zustand v5 localStorage persist 2025" — persist middleware confirmed working; v5.0.10 race condition fix confirmed (MEDIUM confidence)
- WebSearch: "Google Translate TTS API" — original translate_tts endpoint disabled mid-2023 confirmed by multiple sources (MEDIUM confidence)

---

*Stack research for: Hanbuddy — Korean language learning web app*
*Researched: 2026-03-12*
