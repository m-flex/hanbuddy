import type { GrammarPoint } from '../types/content';

export const GRAMMAR = [
  {
    id: 'grm-001',
    title: 'Topic Particle 은/는',
    explanation:
      '은/는 marks the topic of a sentence. Use 은 after a consonant-ending syllable and 는 after a vowel-ending syllable. The topic is what the sentence is about — it often carries a nuance of contrast or emphasis.',
    speech_level: 'plain',
    conjugation_type: 'particle',
    pattern: 'N + 은/는',
    topics: ['top-004'],
    examples: [
      {
        korean: '저는 학생이에요.',
        english: 'I am a student.',
        romanization: 'Jeoneun haksaengieyo.',
      },
      {
        korean: '물은 차가워요.',
        english: 'The water is cold.',
        romanization: 'Mureun chagawoyo.',
      },
      {
        korean: '오늘은 날씨가 좋아요.',
        english: 'Today, the weather is nice.',
        romanization: 'Oneureun nalssiga joayo.',
      },
    ],
  },
  {
    id: 'grm-002',
    title: 'Subject Particle 이/가',
    explanation:
      '이/가 marks the grammatical subject of a sentence. Use 이 after a consonant-ending syllable and 가 after a vowel-ending syllable. Unlike 은/는, 이/가 presents new information or identifies the subject specifically.',
    speech_level: 'plain',
    conjugation_type: 'particle',
    pattern: 'N + 이/가',
    topics: ['top-004'],
    examples: [
      {
        korean: '고양이가 있어요.',
        english: 'There is a cat.',
        romanization: 'Goyangi ga isseoyo.',
      },
      {
        korean: '물이 맛있어요.',
        english: 'The water tastes good.',
        romanization: 'Muri massisseoyo.',
      },
      {
        korean: '누가 왔어요?',
        english: 'Who came?',
        romanization: 'Nuga wasseoyo?',
      },
    ],
  },
  {
    id: 'grm-003',
    title: 'Object Particle 을/를',
    explanation:
      '을/를 marks the direct object of a verb — the thing that receives the action. Use 을 after a consonant-ending syllable and 를 after a vowel-ending syllable.',
    speech_level: 'plain',
    conjugation_type: 'particle',
    pattern: 'N + 을/를',
    topics: ['top-004'],
    examples: [
      {
        korean: '밥을 먹어요.',
        english: 'I eat rice.',
        romanization: 'Babeul meogeoyo.',
      },
      {
        korean: '물을 마셔요.',
        english: 'I drink water.',
        romanization: 'Mureul masyeoyo.',
      },
      {
        korean: '책을 읽어요.',
        english: 'I read a book.',
        romanization: 'Chaegeul ilgeoyo.',
      },
    ],
  },
  {
    id: 'grm-004',
    title: 'Possessive Particle 의',
    explanation:
      "의 indicates possession, similar to 's in English or 'of'. It connects a possessor noun to the possessed noun. In casual speech, 의 is often pronounced as '에'.",
    speech_level: 'plain',
    conjugation_type: 'particle',
    pattern: 'N + 의 + N',
    topics: ['top-004', 'top-006'],
    examples: [
      {
        korean: '제 친구의 가족이에요.',
        english: "It's my friend's family.",
        romanization: 'Je chinguui gajogieyo.',
      },
      {
        korean: '한국의 음식이 맛있어요.',
        english: "Korean food is delicious.",
        romanization: 'Hangugui eumsigi massisseoyo.',
      },
      {
        korean: '우리의 꿈은 크다.',
        english: 'Our dream is big.',
        romanization: 'Uriui kkumeun keuda.',
      },
    ],
  },
] satisfies GrammarPoint[];
