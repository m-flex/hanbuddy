import { disassemble, hasBatchim, josa } from 'es-hangul';

/** Supported Korean particle types (josa) with both consonant and vowel forms. */
export type JosaType = '이/가' | '을/를' | '은/는' | '으로/로' | '와/과' | '아/야';

/**
 * Attach the correct form of a Korean particle to a word.
 * Wraps es-hangul's josa() with a typed particle union.
 *
 * @example
 * attachJosa('물', '이/가') // '물이'
 * attachJosa('나라', '이/가') // '나라가'
 */
export function attachJosa(word: string, particle: JosaType): string {
  return josa(word, particle);
}

/**
 * Check whether a Korean syllable's final character has a batchim (final consonant).
 * Wraps es-hangul's hasBatchim().
 *
 * @example
 * wordHasBatchim('물') // true  (ㄹ final)
 * wordHasBatchim('나라') // false (vowel final)
 */
export function wordHasBatchim(word: string): boolean {
  return hasBatchim(word);
}

/**
 * Decompose Korean text into individual jamo characters.
 * Wraps es-hangul's disassemble().
 *
 * @example
 * decompose('한글') // 'ㅎㅏㄴㄱㅡㄹ'
 */
export function decompose(text: string): string {
  return disassemble(text);
}
