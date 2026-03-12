/**
 * Content type definitions for Hanbuddy Korean learning app.
 * All content is typed at build time — malformed data is a compiler error.
 */

/** The formality/politeness register of a word or grammar point. */
export type SpeechLevel = 'formal-high' | 'polite' | 'informal' | 'plain';

/** The grammatical category of a word or grammar point. */
export type ConjugationType = 'action' | 'descriptive' | 'noun' | 'particle' | 'expression';

/** TOPIK proficiency level for a vocabulary item. */
export type TopikLevel = 'beginner' | 'intermediate';

/** A Korean example sentence with English translation and romanization. */
export interface ExampleSentence {
  korean: string;
  english: string;
  romanization: string;
}

/** A vocabulary item in the Korean content database. */
export interface VocabItem {
  /** Prefixed counter ID, e.g. "voc-001" */
  id: `voc-${number}`;
  korean: string;
  english: string;
  /** Revised Romanization — authored, not computed, for irregular pronunciations */
  romanization: string;
  speech_level: SpeechLevel;
  conjugation_type: ConjugationType;
  /** TOPIK proficiency level */
  topik_level: TopikLevel;
  /** Topic references — multi-tag system, e.g. ["top-001", "top-004"] */
  topics: `top-${number}`[];
  examples: ExampleSentence[];
}

/** A grammar point explaining a Korean grammatical structure. */
export interface GrammarPoint {
  /** Prefixed counter ID, e.g. "grm-001" */
  id: `grm-${number}`;
  title: string;
  explanation: string;
  speech_level: SpeechLevel;
  conjugation_type: ConjugationType;
  /** The grammar pattern, e.g. "N + 은/는" */
  pattern: string;
  examples: ExampleSentence[];
  topics: `top-${number}`[];
}

/** A lesson that composes vocabulary and grammar items by reference. */
export interface Lesson {
  /** Prefixed counter ID, e.g. "les-001" */
  id: `les-${number}`;
  title: string;
  description: string;
  /** Level for sequential unlock (1, 2, 3...) */
  level: number;
  /** Position within a level */
  order: number;
  /** References to VocabItem IDs — not embedded */
  vocab_ids: `voc-${number}`[];
  /** References to GrammarPoint IDs — not embedded */
  grammar_ids: `grm-${number}`[];
  topics: `top-${number}`[];
}

/** A topic tag that groups vocabulary, grammar, and lessons thematically. */
export interface Topic {
  /** Prefixed counter ID, e.g. "top-001" */
  id: `top-${number}`;
  name: string;
  description: string;
  /** Optional Lucide icon name */
  icon?: string;
}

/** A single line in a Korean dialogue. */
export interface DialogueLine {
  speaker: string;
  korean: string;
  english: string;
  romanization: string;
}

/** A dialogue lesson with 4-8 lines of conversation. */
export interface Dialogue {
  id: `dlg-${number}`;
  title: string;
  description: string;
  /** Topic references */
  topics: `top-${number}`[];
  /** The dialogue lines in order */
  lines: DialogueLine[];
  /** Vocab IDs referenced in this dialogue */
  vocab_ids: `voc-${number}`[];
}

/** A single token in a reading passage line, optionally annotated with gloss. */
export interface PassageToken {
  text: string;
  gloss?: {
    english: string;
    romanization: string;
  };
}

/** A single line in a reading passage with full translation and token-level annotations. */
export interface PassageLine {
  korean: string;
  english: string;
  tokens: PassageToken[];
}

/** A graded reading passage composed of annotated lines. */
export interface ReadingPassage {
  /** Prefixed counter ID, e.g. "rdg-001" */
  id: `rdg-${number}`;
  title: string;
  /** Level for unlock gating — matches Lesson.level */
  level: number;
  /** Topic references */
  topics: `top-${number}`[];
  /** The passage lines in order */
  lines: PassageLine[];
}
