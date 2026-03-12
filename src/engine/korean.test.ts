import { describe, expect, it } from 'vitest';
import { attachJosa, wordHasBatchim } from './korean';

describe('attachJosa', () => {
  describe('이/가 (subject particle)', () => {
    it('consonant-final 물 + 이/가 = 물이', () => {
      expect(attachJosa('물', '이/가')).toBe('물이');
    });

    it('vowel-final 나라 + 이/가 = 나라가', () => {
      expect(attachJosa('나라', '이/가')).toBe('나라가');
    });
  });

  describe('은/는 (topic particle)', () => {
    it('consonant-final 선생님 + 은/는 = 선생님은', () => {
      expect(attachJosa('선생님', '은/는')).toBe('선생님은');
    });

    it('vowel-final 의사 + 은/는 = 의사는', () => {
      expect(attachJosa('의사', '은/는')).toBe('의사는');
    });
  });

  describe('을/를 (object particle)', () => {
    it('consonant-final 물 + 을/를 = 물을', () => {
      expect(attachJosa('물', '을/를')).toBe('물을');
    });

    it('vowel-final 사과 + 을/를 = 사과를', () => {
      expect(attachJosa('사과', '을/를')).toBe('사과를');
    });
  });

  describe('으로/로 (direction/means particle)', () => {
    it('consonant-final 바깥 + 으로/로 = 바깥으로', () => {
      expect(attachJosa('바깥', '으로/로')).toBe('바깥으로');
    });

    it('ㄹ-final 서울 + 으로/로 = 서울로', () => {
      expect(attachJosa('서울', '으로/로')).toBe('서울로');
    });

    it('vowel-final 내부 + 으로/로 = 내부로', () => {
      expect(attachJosa('내부', '으로/로')).toBe('내부로');
    });
  });
});

describe('wordHasBatchim', () => {
  it('물 has batchim (ㄹ final) → true', () => {
    expect(wordHasBatchim('물')).toBe(true);
  });

  it('나라 has no batchim (vowel final) → false', () => {
    expect(wordHasBatchim('나라')).toBe(false);
  });

  it('선생님 has batchim (ㅁ final) → true', () => {
    expect(wordHasBatchim('선생님')).toBe(true);
  });

  it('의사 has no batchim (vowel final) → false', () => {
    expect(wordHasBatchim('의사')).toBe(false);
  });
});
