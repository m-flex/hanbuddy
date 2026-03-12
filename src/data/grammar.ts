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
  {
    id: 'grm-005',
    title: 'Polite Copula 이에요/예요',
    explanation:
      '이에요/예요 is the polite speech (해요체) form of the copula, meaning "is", "am", or "are". Use 이에요 after a noun ending in a consonant and 예요 after a noun ending in a vowel. It is used to equate the subject with a noun.',
    speech_level: 'polite',
    conjugation_type: 'expression',
    pattern: 'N + 이에요/예요',
    topics: ['top-004'],
    examples: [
      {
        korean: '저는 학생이에요.',
        english: 'I am a student.',
        romanization: 'Jeoneun haksaengieyo.',
      },
      {
        korean: '이것은 물이에요.',
        english: 'This is water.',
        romanization: 'Igeoseun murieyo.',
      },
      {
        korean: '제 이름은 민지예요.',
        english: 'My name is Minji.',
        romanization: 'Je ireumeun minjiyeyo.',
      },
    ],
  },
  {
    id: 'grm-006',
    title: 'Formal Copula 입니다/입니까',
    explanation:
      '입니다 is the formal high speech (합쇼체) form of the copula, used in formal situations such as presentations, official settings, and when speaking to superiors. 입니까 is the question form. It attaches directly to nouns without change.',
    speech_level: 'formal-high',
    conjugation_type: 'expression',
    pattern: 'N + 입니다',
    topics: ['top-004'],
    examples: [
      {
        korean: '저는 회사원입니다.',
        english: 'I am an office worker.',
        romanization: 'Jeoneun hoesawonimnida.',
      },
      {
        korean: '이것은 제 명함입니다.',
        english: 'This is my business card.',
        romanization: 'Igeoseun je myeonghamimnida.',
      },
      {
        korean: '성함이 어떻게 되십니까?',
        english: 'What is your name (formal)?',
        romanization: 'Seonghami eotteoke doesipnikka?',
      },
    ],
  },
  {
    id: 'grm-007',
    title: 'Sino-Korean Numbers 일, 이, 삼...',
    explanation:
      'Sino-Korean numbers (일, 이, 삼, 사, 오, 육, 칠, 팔, 구, 십) are borrowed from Chinese and are used for dates, phone numbers, money, addresses, and counting in multiples of ten and above. They pair with certain counters and measure words.',
    speech_level: 'plain',
    conjugation_type: 'noun',
    pattern: 'Sino-Korean number + counter/unit',
    topics: ['top-002'],
    examples: [
      {
        korean: '오늘은 삼월 십이일이에요.',
        english: 'Today is March 12th.',
        romanization: 'Oneureun samwol sibiiriéyo.',
      },
      {
        korean: '제 전화번호는 010-일이삼사-오육칠팔이에요.',
        english: 'My phone number is 010-1234-5678.',
        romanization: 'Je jeonhwabeonhoneun gongil-il-i-sam-sa-o-yuk-chil-palieyo.',
      },
      {
        korean: '커피 한 잔에 오천 원이에요.',
        english: 'One cup of coffee is 5,000 won.',
        romanization: 'Keopi han jane ocheon woniéyo.',
      },
    ],
  },
  {
    id: 'grm-008',
    title: 'Native Korean Numbers 하나, 둘, 셋...',
    explanation:
      'Native Korean numbers (하나, 둘, 셋, 넷, 다섯, 여섯, 일곱, 여덟, 아홉, 열) are used for counting objects, people, and ages. They combine with specific counters such as 개 (things), 명 (people), and 잔 (cups/glasses). When used before a counter, 하나 becomes 한, 둘 becomes 두, 셋 becomes 세, and 넷 becomes 네.',
    speech_level: 'plain',
    conjugation_type: 'noun',
    pattern: 'Native Korean number + counter',
    topics: ['top-002'],
    examples: [
      {
        korean: '사과 두 개 주세요.',
        english: 'Please give me two apples.',
        romanization: 'Sagwa du gae juseyo.',
      },
      {
        korean: '친구 세 명이 왔어요.',
        english: 'Three friends came.',
        romanization: 'Chingu se myeongi wasseoyo.',
      },
      {
        korean: '커피 한 잔 마실게요.',
        english: 'I will drink one cup of coffee.',
        romanization: 'Keopi han jan masilgeyo.',
      },
    ],
  },
] satisfies GrammarPoint[];
