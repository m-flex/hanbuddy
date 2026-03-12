# Phase 1: Foundation - Research

**Researched:** 2026-03-12
**Domain:** Vite + React + TypeScript scaffolding, Zustand persist with migrations, es-hangul Korean text processing, content data schema design
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Content data model**
- Lesson-centric architecture: lessons are the top-level unit, referencing standalone vocab and grammar collections by ID
- Vocab, grammar, and lessons are independent collections that can be queried/filtered independently
- Lessons compose items by referencing their IDs — items can appear in multiple lessons
- Prefixed counter IDs across all content types: `voc-NNN`, `grm-NNN`, `les-NNN`, `top-NNN` (3-char prefix + zero-padded number)
- Multi-tag topic system: each vocab/lesson can belong to multiple topics (e.g., 물 tagged [food, travel, daily-life])
- Content authored as TypeScript data files (typed constants), not JSON — type-checked at build time per success criteria #1

**Project scaffolding**
- Mirror Hanguller's flat folder structure with TypeScript additions:
  - `components/`, `pages/`, `store/`, `data/`, `utils/` (same as Hanguller)
  - `hooks/`, `types/`, `engine/` (new for Hanbuddy)
- Match Hanguller's dependency stack: react-router-dom, Zustand, Lucide icons, Framer Motion, @tailwindcss/vite
- Add es-hangul for Korean text processing (new for Hanbuddy)
- Copy and adapt Hanguller's tts-worker for audio (Phase 2 will adapt for speed control)
- Own visual identity — fresh color palette, not Hanguller's dark theme

**Storage design**
- Single localStorage key `hanbuddy_v1` containing a structured object with partitions (progress, srs, settings)
- Sequential migration functions for schema version bumps (v1→v2, v2→v3 chain)
- Zustand persist middleware handles serialization; migration runs via persist's `migrate` option
- Multiple Zustand stores for separate concerns: progress, settings, SRS state
- Corruption handling: reset to fresh state with one-time toast warning if data is unparseable

**Romanization**
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Content data schema includes speech level, conjugation type, and stable IDs | TypeScript union types for `SpeechLevel` and `ConjugationType`; `as const` satisfies pattern for build-time rejection |
| FOUND-02 | localStorage uses versioned schema with migration support | Zustand persist `version` + `migrate(persistedState, version)` API; sequential migration chain pattern |
| FOUND-03 | Korean text processing via es-hangul (josa particles, decomposition) | `josa()`, `hasBatchim()`, `disassemble()`, `romanize()` from es-hangul v2.3.8 |
| FOUND-04 | Romanization shown as opt-in reveal hint only, never primary display | Authored `romanization` field on vocab items; component-level toggle state per word; default hidden |
</phase_requirements>

---

## Summary

Hanbuddy Phase 1 establishes a TypeScript-first greenfield project that mirrors Hanguller's proven Vite + React stack but upgrades from JSX to TSX, adds es-hangul for Korean text processing, and introduces Zustand's persist middleware with versioned schema migrations. The dependency versions from Hanguller are already current (Vite 7, React 19, Tailwind 4, react-router-dom 7, Framer Motion 12, Lucide React 0.577) — these carry directly into Hanbuddy's package.json with only `zustand` and `es-hangul` added.

The two most technically specific requirements are: (1) build-time schema enforcement, achieved by exporting typed constants (not JSON) using TypeScript `satisfies` operator against strict interfaces — this makes malformed entries compiler errors rather than runtime surprises; and (2) Zustand's persist `migrate` function, which receives `(persistedState, storedVersion)` and returns the transformed state — version is bumped in persist options when the schema changes, triggering sequential migrations on boot.

es-hangul v2.3.8 (maintained by Toss, the Korean fintech company) provides a stable `josa(word, '은/는')` and `josa(word, '이/가')` API that automatically selects the correct particle form based on whether the word ends with a 받침 (final consonant). The library also exposes `hasBatchim()`, `disassemble()`, and a built-in `romanize()` function — however, romanization is stored as an authored field (not computed) per the locked decisions, so `romanize()` is a secondary utility only.

**Primary recommendation:** Scaffold with `npm create vite@latest hanbuddy -- --template react-ts`, add `zustand es-hangul framer-motion lucide-react react-router-dom`, configure `@tailwindcss/vite` plugin (no PostCSS needed), then establish types and store scaffolding before any content files.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | ^7.3.1 | Build tool, dev server | Inherited from Hanguller; current; @tailwindcss/vite plugin requires it |
| react + react-dom | ^19.2.0 | UI framework | Inherited from Hanguller; current |
| typescript | ^5.x (via vite template) | Type safety, build-time schema enforcement | Required by FOUND-01 success criteria |
| @vitejs/plugin-react | ^5.1.1 | React fast refresh | Standard Vite React plugin |
| tailwindcss + @tailwindcss/vite | ^4.2.1 | Utility CSS | Inherited from Hanguller; v4 uses Vite plugin, no PostCSS |
| react-router-dom | ^7.13.1 | Client-side routing | Inherited from Hanguller |
| zustand | ^5.0.11 | State management + persist | Inherited pattern from Hanguller; v5 is current |
| es-hangul | ^2.3.8 | Korean text processing (particles, decomposition) | FOUND-03 requirement; maintained by Toss |
| framer-motion | ^12.35.2 | Animations | Inherited from Hanguller |
| lucide-react | ^0.577.0 | Icons | Inherited from Hanguller |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/react + @types/react-dom | ^19.x | React TypeScript definitions | Always — included by vite react-ts template |
| eslint + @eslint/js | ^9.x | Linting | Dev quality; inherited from Hanguller config |
| eslint-plugin-react-hooks | ^7.0.1 | Hooks rules | Prevents stale closure bugs |
| globals | ^16.x | ESLint env globals | Required by Hanguller's flat config style |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| es-hangul `josa()` | Manual regex lookup tables | Don't hand-roll — es-hangul handles all 14 particle pairs including edge cases like compound vowels |
| Authored `romanization` field | `es-hangul romanize()` computed at runtime | Authored field wins for irregular pronunciations (e.g., 맛있다 → "masitda" not "mat-issda") |
| Zustand persist `migrate` | Custom migration runner on `localStorage.getItem` | Don't hand-roll — persist handles version detection, fallback, and serialization |

**Installation:**
```bash
npm create vite@latest hanbuddy -- --template react-ts
cd hanbuddy
npm install zustand es-hangul framer-motion lucide-react react-router-dom
npm install -D tailwindcss @tailwindcss/vite
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── types/           # All TypeScript interfaces and union types (VocabItem, GrammarPoint, Lesson, etc.)
├── data/            # Typed content constants (vocab.ts, grammar.ts, lessons.ts, topics.ts)
├── engine/          # Korean processing utilities (josa wrapper, hasBatchim, romanization helpers)
├── store/           # Zustand stores (progress.ts, settings.ts, srs.ts)
├── hooks/           # Custom React hooks (useRomanizationToggle, etc.)
├── components/      # Reusable UI components
├── pages/           # Route-level page components
├── utils/           # General utilities (audio.ts, adapted from Hanguller)
└── assets/          # Static assets
```

### Pattern 1: Build-Time Schema Enforcement with `satisfies`

**What:** Export content data as typed constants using the `satisfies` operator so TypeScript rejects malformed entries at compile time, not runtime.

**When to use:** All content data files (vocab, grammar, lessons).

**Example:**
```typescript
// Source: TypeScript docs — satisfies operator (TS 4.9+)
// src/types/content.ts
export type SpeechLevel = 'formal-high' | 'polite' | 'informal' | 'plain';
export type ConjugationType = 'action' | 'descriptive' | 'noun' | 'particle' | 'expression';

export interface VocabItem {
  id: `voc-${number}`;        // template literal type enforces prefix format
  korean: string;
  english: string;
  romanization: string;       // authored field — not computed
  speech_level: SpeechLevel;
  conjugation_type: ConjugationType;
  topics: string[];           // topic IDs e.g. ['top-001', 'top-002']
  examples?: ExampleSentence[];
}

// src/data/vocab.ts
import type { VocabItem } from '../types/content';

export const VOCAB_ITEMS = [
  {
    id: 'voc-001',
    korean: '안녕하세요',
    english: 'Hello (formal)',
    romanization: 'annyeonghaseyo',
    speech_level: 'formal-high',
    conjugation_type: 'expression',
    topics: ['top-001'],
  },
] satisfies VocabItem[];
// ^^^ TypeScript will error at build time if any field is missing or has wrong type
```

### Pattern 2: Zustand Persist with Versioned Migrations

**What:** Use Zustand's `persist` middleware with `version` and `migrate` options to handle schema evolution. `migrate(persistedState, storedVersion)` is called when `storedVersion` differs from the configured version.

**When to use:** All persisted stores. Version starts at 1 (the `hanbuddy_v1` key). Bump `version` in persist options whenever the store shape changes.

**Example:**
```typescript
// Source: https://zustand.docs.pmnd.rs/reference/middlewares/persist
// src/store/progress.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  completedLessons: string[];   // lesson IDs
  // version 2 added: lastActiveLesson
  lastActiveLesson: string | null;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: [],
      lastActiveLesson: null,
    }),
    {
      name: 'hanbuddy_v1',          // localStorage key
      version: 1,                    // bump when shape changes
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, storedVersion: number) => {
        const state = persistedState as Record<string, unknown>;
        if (storedVersion === 0) {
          // v0 → v1: example rename
          state.completedLessons = state.lessonsDone ?? [];
          delete state.lessonsDone;
        }
        return state as ProgressState;
      },
      // Corruption guard: onRehydrateStorage catches parse errors
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn('hanbuddy_v1 corrupted, resetting', error);
          localStorage.removeItem('hanbuddy_v1');
          // trigger one-time toast in app bootstrap
        }
      },
    }
  )
);
```

**Multiple stores, same key prefix:** Each store gets its own key. Progress: `hanbuddy_progress`, settings: `hanbuddy_settings`, SRS: `hanbuddy_srs`. Each has its own `version` counter.

### Pattern 3: es-hangul Josa Wrapper

**What:** Thin utility wrapper around es-hangul `josa()` to provide typed particle selection and centralize the import.

**When to use:** Anywhere the app constructs Korean sentences dynamically (exercise prompts, grammar explanations).

**Example:**
```typescript
// Source: https://es-hangul.slash.page/en/docs/api/core/josa
// src/engine/korean.ts
import { josa, hasBatchim, disassemble } from 'es-hangul';

// Type-safe particle selector
type JosaType = '이/가' | '을/를' | '은/는' | '으로/로' | '와/과' | '아/야';

export function attachJosa(word: string, particle: JosaType): string {
  return josa(word, particle);
}

// Examples:
// attachJosa('물', '이/가')   → '물이'   (받침 ㄹ → first form)
// attachJosa('나라', '이/가') → '나라가' (vowel-final → second form)
// attachJosa('선생님', '은/는') → '선생님은'
// attachJosa('의사', '은/는')  → '의사는'

export function wordHasBatchim(word: string): boolean {
  return hasBatchim(word);
}

export function decompose(text: string): string[] {
  return disassemble(text);
}
```

### Pattern 4: Romanization as Component-Level Toggle

**What:** Romanization is stored as an authored field on each vocab item. Components manage per-word reveal state locally. Default is hidden.

**When to use:** Any component rendering Korean text that should support romanization reveal.

**Example:**
```typescript
// src/hooks/useRomanizationToggle.ts
import { useState, useCallback } from 'react';

export function useRomanizationToggle() {
  const [revealedWordId, setRevealedWordId] = useState<string | null>(null);

  const toggle = useCallback((wordId: string) => {
    setRevealedWordId(prev => prev === wordId ? null : wordId);
  }, []);

  const isRevealed = useCallback((wordId: string) => {
    return revealedWordId === wordId;
  }, [revealedWordId]);

  const hideAll = useCallback(() => setRevealedWordId(null), []);

  return { toggle, isRevealed, hideAll };
}

// Usage in component:
// <button onClick={() => toggle(item.id)}>
//   <span>{item.korean}</span>
//   {isRevealed(item.id) && (
//     <span className="text-sm text-muted">{item.romanization}</span>
//   )}
// </button>
```

### Anti-Patterns to Avoid

- **JSON data files for content:** Using `.json` files removes TypeScript type checking — content must be `.ts` files with typed exports so the compiler catches schema violations at build time.
- **Computing romanization at runtime:** `es-hangul romanize()` implements standard rules but Korean has irregular pronunciations (연음, 격음화, etc.). Store romanization as authored fields.
- **Single monolithic persist key:** Storing all state in one Zustand store under one key means one schema version counter governs everything — hard to reason about migrations. Use separate stores with separate keys.
- **Relying on `version === 0` default:** Zustand defaults stored version to 0. Always explicitly set `version: 1` on first ship to avoid accidental future migration triggers.
- **`localStorage.getItem` directly in components:** All state reads go through Zustand stores; direct localStorage access is only in migration/corruption handlers.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Korean particle selection (은/는, 이/가, etc.) | Custom 받침 lookup table | `es-hangul josa()` | 14 particle pairs, compound vowel edge cases, compound consonant finals — all handled |
| Hangul final consonant detection | Unicode math (`(charCode - 0xAC00) % 28`) | `es-hangul hasBatchim()` | Named, tested, handles all valid/invalid codepoints |
| localStorage versioning & migration | Custom version field + migration runner | Zustand persist `version` + `migrate` | Handles version mismatch detection, fallback-to-default, JSON serialization, storage engine abstraction |
| TypeScript project scaffolding | Manual tsconfig/vite config authoring | `npm create vite@latest -- --template react-ts` | Correct target, strict mode, path resolution already configured |
| Tailwind CSS config | tailwind.config.js + PostCSS setup | `@tailwindcss/vite` plugin + `@import "tailwindcss"` in CSS | Tailwind v4 plugin replaces PostCSS entirely — no config file needed |

**Key insight:** Korean particle selection has genuine linguistic edge cases (e.g., words ending in compound consonants like ㄳ, ㄶ, ㄼ). es-hangul's `josa()` handles all 14 Korean particle pairs including 으로/로 which has a three-way split (consonant-final, ㄹ-final, vowel-final). Any hand-rolled solution will miss these.

---

## Common Pitfalls

### Pitfall 1: Zustand v5 Double-Parenthesis TypeScript Syntax

**What goes wrong:** Using `create<State>(persist(...))` (single call) instead of `create<State>()(persist(...))` causes a TypeScript error in Zustand v5.

**Why it happens:** Zustand v5 changed to curried syntax to improve type inference.

**How to avoid:** Always use `create<StateType>()(persist(...))` — note the empty `()` between type parameter and middleware.

**Warning signs:** TS error `Argument of type ... is not assignable to parameter` on the `create()` call.

### Pitfall 2: `satisfies` Requires TypeScript 4.9+ (Already in Vite react-ts template)

**What goes wrong:** `satisfies` operator not available in older TS configurations.

**Why it happens:** `satisfies` shipped in TypeScript 4.9. The Vite react-ts template ships with TS 5.x so this is not an issue — but custom tsconfig targets or older installs could break it.

**How to avoid:** Confirm `"typescript": "^5.x"` in package.json after scaffolding. The Vite template guarantees this.

**Warning signs:** TS error `'satisfies' is not available when targeting lower than ES2015` or syntax error on `satisfies` keyword.

### Pitfall 3: Tailwind v4 Import Syntax

**What goes wrong:** Using `@tailwind base; @tailwind components; @tailwind utilities;` (v3 directives) in CSS produces no output or partial output.

**Why it happens:** Tailwind v4 replaced the `@tailwind` directives with a single `@import "tailwindcss"` statement.

**How to avoid:** In `src/index.css` use only `@import "tailwindcss";`. No tailwind.config.js file is needed.

**Warning signs:** Tailwind utility classes not applying; no compilation error (silent failure).

### Pitfall 4: Zustand Persist `version` Default is 0

**What goes wrong:** Not setting an explicit `version` in persist options means Zustand stores version `0`. When you later add version `1` and a migration, Zustand calls `migrate` for every user whose data is at version `0` — including first-time users who never had the v0 schema.

**Why it happens:** Zustand defaults the stored version to `0` if no version was previously stored.

**How to avoid:** Always ship the first version of any persist store with `version: 1`. Keep `migrate` function defensive: if `storedVersion < 1`, treat as fresh state (return defaults).

**Warning signs:** Unexpected migration running for users who never had the old schema; data appearing to reset for new users.

### Pitfall 5: Template Literal ID Types vs. Runtime ID Generation

**What goes wrong:** TypeScript type `id: \`voc-${number}\`` provides compile-time checking but doesn't prevent authoring duplicate IDs in data files.

**Why it happens:** TypeScript checks shape, not uniqueness across array elements.

**How to avoid:** Include a simple ID uniqueness check as a test (see Validation Architecture). During authoring, IDs are manually assigned sequentially.

**Warning signs:** Two vocab items with the same `voc-NNN` ID, causing silent overwrite in lookup maps.

### Pitfall 6: `onRehydrateStorage` Timing for Corruption Toast

**What goes wrong:** Showing a toast notification inside `onRehydrateStorage` fails because the React component tree hasn't mounted yet when Zustand rehydrates on app init.

**Why it happens:** Zustand persist rehydrates synchronously before React first render.

**How to avoid:** Set a flag in the store (e.g., `_corruptionDetected: boolean`) inside `onRehydrateStorage`, then read that flag in a top-level component's `useEffect` to trigger the toast.

**Warning signs:** Toast library throwing "no context provider found" during app boot.

---

## Code Examples

Verified patterns from official sources:

### es-hangul Josa Selection (은/는 and 이/가)

```typescript
// Source: https://es-hangul.slash.page/en/docs/api/core/josa
import { josa } from 'es-hangul';

// 이/가 — subject particle
josa('칫솔', '이/가')   // → '칫솔이'  (받침 ㄹ → 이)
josa('샴푸', '이/가')   // → '샴푸가'  (vowel-final → 가)

// 은/는 — topic particle
josa('선생님', '은/는') // → '선생님은' (받침 ㅁ → 은)
josa('의사', '은/는')   // → '의사는'  (vowel-final → 는)

// 을/를 — object particle
josa('물', '을/를')     // → '물을'    (받침 ㄹ → 을)
josa('사과', '을/를')   // → '사과를'  (vowel-final → 를)

// 으로/로 — directional/instrumental (three-way: 으로, 로, 로)
josa('바깥', '으로/로') // → '바깥으로' (consonant-final, not ㄹ)
josa('서울', '으로/로') // → '서울로'   (ㄹ-final → 로)
josa('내부', '으로/로') // → '내부로'   (vowel-final → 로)
```

### Zustand Persist with Version + Migrate

```typescript
// Source: https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  audioEnabled: boolean;
  romanizationHintsEnabled: boolean;
  setAudioEnabled: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      audioEnabled: true,
      romanizationHintsEnabled: true,
      setAudioEnabled: (v) => set({ audioEnabled: v }),
    }),
    {
      name: 'hanbuddy_settings',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        const s = persistedState as Record<string, unknown>;
        if (version < 1) {
          // First migration: set defaults for any fields added in v1
          s.romanizationHintsEnabled = s.romanizationHintsEnabled ?? true;
        }
        return s as SettingsState;
      },
    }
  )
);
```

### TypeScript Content Schema with `satisfies`

```typescript
// Source: TypeScript 4.9 satisfies operator docs
// src/types/content.ts
export type SpeechLevel = 'formal-high' | 'polite' | 'informal' | 'plain';
export type ConjugationType = 'action' | 'descriptive' | 'noun' | 'particle' | 'expression';

export interface ExampleSentence {
  korean: string;
  english: string;
  romanization: string;
}

export interface VocabItem {
  id: `voc-${number}`;
  korean: string;
  english: string;
  romanization: string;
  speech_level: SpeechLevel;
  conjugation_type: ConjugationType;
  topics: `top-${number}`[];
  examples?: ExampleSentence[];
}

// src/data/vocab.ts
import type { VocabItem } from '../types/content';

export const VOCAB = [
  {
    id: 'voc-001',
    korean: '물',
    english: 'water',
    romanization: 'mul',
    speech_level: 'plain',
    conjugation_type: 'noun',
    topics: ['top-001', 'top-003'],
  },
  // Missing 'english' field here → TypeScript BUILD ERROR
] satisfies VocabItem[];
```

### Tailwind v4 + Vite Setup

```typescript
// Source: https://dev.to/imamifti056/how-to-setup-tailwind-css-v415-with-vite-react-2025-updated-guide-3koc
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});

// src/index.css — v4 single import (replaces all @tailwind directives)
// @import "tailwindcss";
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js + PostCSS | `@tailwindcss/vite` plugin, CSS `@import "tailwindcss"` | Tailwind v4 (2025) | No config file needed; faster builds |
| `create<State>(middleware(...))` | `create<State>()(middleware(...))` curried syntax | Zustand v5 (2024) | Required for correct TypeScript inference |
| `@tailwind base/components/utilities` directives | `@import "tailwindcss"` | Tailwind v4 | Old directives don't work in v4 |
| Manual `localStorage` with JSON.parse/stringify | Zustand `persist` + `createJSONStorage` | Zustand v4+ | Built-in versioning, migration, corruption handling |
| Hand-rolled particle tables | `es-hangul josa()` | es-hangul v1+ | All 14 particle pairs, maintained by Toss |

**Deprecated/outdated from Hanguller context:**
- Hanguller uses `.jsx` — Hanbuddy uses `.tsx` throughout
- Hanguller's `progress.js` uses raw `localStorage.getItem/setItem` — Hanbuddy uses Zustand persist
- Hanguller uses a single store file — Hanbuddy splits into `progress`, `settings`, `srs` stores

---

## Open Questions

1. **Zustand persist: separate store keys vs. sub-partitions of one key**
   - What we know: Locked decision says "single localStorage key `hanbuddy_v1`" but also "Multiple Zustand stores for separate concerns." These are in slight tension — Zustand persist uses one `name` key per store instance.
   - What's unclear: Does the user mean one physical localStorage key (requiring a custom storage adapter), or does `hanbuddy_v1` serve as a prefix convention with separate keys like `hanbuddy_progress`, `hanbuddy_settings`?
   - Recommendation: Interpret as a naming prefix convention. Use `hanbuddy_progress`, `hanbuddy_settings`, `hanbuddy_srs` as separate keys. Each Zustand store persists independently — this is the standard Zustand pattern and requires no custom adapter. The constraint is satisfied by the `hanbuddy_` prefix. Document this interpretation in PLAN.md.

2. **ID template literal type strictness**
   - What we know: `id: \`voc-${number}\`` enforces the prefix pattern. But `voc-1` and `voc-001` are both valid since `number` includes both.
   - What's unclear: Whether to enforce zero-padding at the type level (not feasible with template literals) or only by convention.
   - Recommendation: Enforce zero-padding by convention and dev tooling. The type is `\`voc-${number}\`` for compile checking; a test validates formatting with a regex.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest (Vite-native, no separate config needed for basic setup) |
| Config file | `vitest.config.ts` (or inline in `vite.config.ts` under `test:`) — Wave 0 |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | `satisfies VocabItem[]` causes build error on malformed entry | Build check | `npx tsc --noEmit` | Wave 0 |
| FOUND-01 | Valid VocabItem with speech_level and conjugation_type is accepted | Unit | `npx vitest run src/types/content.test.ts` | Wave 0 |
| FOUND-02 | App boot writes `hanbuddy_progress` key to localStorage | Unit | `npx vitest run src/store/progress.test.ts` | Wave 0 |
| FOUND-02 | Schema migration v0→v1 transforms old shape without data loss | Unit | `npx vitest run src/store/progress.test.ts` | Wave 0 |
| FOUND-03 | `josa('물', '이/가')` → `'물이'`; `josa('사과', '이/가')` → `'사과가'` | Unit | `npx vitest run src/engine/korean.test.ts` | Wave 0 |
| FOUND-03 | `josa('선생님', '은/는')` → `'선생님은'`; `josa('의사', '은/는')` → `'의사는'` | Unit | `npx vitest run src/engine/korean.test.ts` | Wave 0 |
| FOUND-04 | Romanization field hidden by default in romanization toggle hook | Unit | `npx vitest run src/hooks/useRomanizationToggle.test.ts` | Wave 0 |
| FOUND-04 | Romanization toggles visible on tap/click, hides on second tap | Unit | `npx vitest run src/hooks/useRomanizationToggle.test.ts` | Wave 0 |

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit && npx vitest run --reporter=dot`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green + `tsc --noEmit` clean before `/gsd:verify-work`

### Wave 0 Gaps (test infrastructure does not exist yet)

- [ ] `vitest` dev dependency install: `npm install -D vitest @vitest/ui`
- [ ] `vite.config.ts` test block or `vitest.config.ts` — configure jsdom environment for React
- [ ] `src/types/content.test.ts` — covers FOUND-01 type validation
- [ ] `src/store/progress.test.ts` — covers FOUND-02 persist + migration
- [ ] `src/engine/korean.test.ts` — covers FOUND-03 particle selection
- [ ] `src/hooks/useRomanizationToggle.test.ts` — covers FOUND-04 toggle behavior

---

## Sources

### Primary (HIGH confidence)
- es-hangul official docs (https://es-hangul.slash.page/en/docs/api/core/josa) — josa API signature, all supported particle pairs, selection logic
- es-hangul introduction page (https://es-hangul.slash.page/en/docs/introduction) — full exported function list
- Zustand persist docs (https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data) — migrate function signature `(persistedState, version) => state`
- Hanguller source code (C:/dev/Hanguller) — confirmed dependency versions, store pattern, audio utility structure, vite config

### Secondary (MEDIUM confidence)
- Tailwind v4 + Vite setup guide (https://dev.to/imamifti056/how-to-setup-tailwind-css-v415-with-vite-react-2025-updated-guide-3koc) — `@import "tailwindcss"` pattern confirmed by multiple sources
- Zustand migration DEV article (https://dev.to/diballesteros/how-to-migrate-zustand-local-storage-store-to-a-new-version-njp) — migration pattern consistent with official docs
- Zustand v5 guide (https://dev.to/vishwark/mastering-zustand-the-modern-react-state-manager-v4-v5-guide-8mm) — double-parenthesis TypeScript syntax confirmed

### Tertiary (LOW confidence — flagged)
- es-hangul version 2.3.8 (from WebSearch summary) — version number reported by search engine, not directly verified via npm page (403 blocked); confirm with `npm info es-hangul version` before install
- Zustand 5.0.11 latest (from WebSearch summary) — same caveat; confirm with `npm info zustand version`

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed from Hanguller source + npm search results; only version numbers are MEDIUM (npm page blocked, confirmed via search engine snippet)
- Architecture: HIGH — TypeScript `satisfies`, Zustand persist `migrate`, es-hangul `josa()` all verified against official docs
- Pitfalls: HIGH — Zustand v5 syntax and Tailwind v4 CSS import changes verified by multiple sources; ID uniqueness pitfall is reasoning from TypeScript docs behavior

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable libraries — Zustand, es-hangul, Tailwind are not fast-moving at patch level)
