import type { ReadingPassage } from '../types/content';

/**
 * Reading passages for Hanbuddy Korean learning app.
 * 2 passages per level (levels 1 and 2).
 * Each line has pre-segmented tokens with gloss annotations on content words.
 */
export const READINGS = [
  {
    id: 'rdg-001',
    title: 'At the Market',
    level: 1,
    topics: ['top-003'],
    lines: [
      {
        korean: '저는 시장에 가요.',
        english: 'I go to the market.',
        tokens: [
          { text: '저는', gloss: { english: 'I (topic)', romanization: 'jeoneun' } },
          { text: ' ' },
          { text: '시장에', gloss: { english: 'to the market', romanization: 'sijange' } },
          { text: ' ' },
          { text: '가요', gloss: { english: 'go', romanization: 'gayo' } },
          { text: '.' },
        ],
      },
      {
        korean: '사과가 있어요.',
        english: 'There are apples.',
        tokens: [
          { text: '사과가', gloss: { english: 'apples (subject)', romanization: 'sagwaga' } },
          { text: ' ' },
          { text: '있어요', gloss: { english: 'there are', romanization: 'isseoyo' } },
          { text: '.' },
        ],
      },
      {
        korean: '사과 두 개 주세요.',
        english: 'Please give me two apples.',
        tokens: [
          { text: '사과', gloss: { english: 'apple', romanization: 'sagwa' } },
          { text: ' ' },
          { text: '두', gloss: { english: 'two', romanization: 'du' } },
          { text: ' ' },
          { text: '개', gloss: { english: '(counter)', romanization: 'gae' } },
          { text: ' ' },
          { text: '주세요', gloss: { english: 'please give', romanization: 'juseyo' } },
          { text: '.' },
        ],
      },
      {
        korean: '얼마예요?',
        english: 'How much is it?',
        tokens: [
          { text: '얼마예요', gloss: { english: 'how much', romanization: 'eolmayeyo' } },
          { text: '?' },
        ],
      },
      {
        korean: '천 원이에요.',
        english: "It's 1,000 won.",
        tokens: [
          { text: '천', gloss: { english: 'one thousand', romanization: 'cheon' } },
          { text: ' ' },
          { text: '원이에요', gloss: { english: 'won (it is)', romanization: 'wonieyo' } },
          { text: '.' },
        ],
      },
    ],
  },
  {
    id: 'rdg-002',
    title: 'Meeting a Friend',
    level: 1,
    topics: ['top-001'],
    lines: [
      {
        korean: '안녕하세요! 잘 지냈어요?',
        english: 'Hello! Have you been well?',
        tokens: [
          { text: '안녕하세요', gloss: { english: 'hello', romanization: 'annyeonghaseyo' } },
          { text: '! ' },
          { text: '잘', gloss: { english: 'well', romanization: 'jal' } },
          { text: ' ' },
          { text: '지냈어요', gloss: { english: 'have you been', romanization: 'jinaesseoyo' } },
          { text: '?' },
        ],
      },
      {
        korean: '네, 잘 지냈어요. 감사해요.',
        english: 'Yes, I have been well. Thank you.',
        tokens: [
          { text: '네', gloss: { english: 'yes', romanization: 'ne' } },
          { text: ', ' },
          { text: '잘', gloss: { english: 'well', romanization: 'jal' } },
          { text: ' ' },
          { text: '지냈어요', gloss: { english: 'I have been', romanization: 'jinaesseoyo' } },
          { text: '. ' },
          { text: '감사해요', gloss: { english: 'thank you', romanization: 'gamsahaeyo' } },
          { text: '.' },
        ],
      },
      {
        korean: '오늘 어디 가요?',
        english: 'Where are you going today?',
        tokens: [
          { text: '오늘', gloss: { english: 'today', romanization: 'oneul' } },
          { text: ' ' },
          { text: '어디', gloss: { english: 'where', romanization: 'eodi' } },
          { text: ' ' },
          { text: '가요', gloss: { english: 'going', romanization: 'gayo' } },
          { text: '?' },
        ],
      },
      {
        korean: '카페에 가요. 같이 가요?',
        english: 'I am going to a café. Shall we go together?',
        tokens: [
          { text: '카페에', gloss: { english: 'to the café', romanization: 'kapee' } },
          { text: ' ' },
          { text: '가요', gloss: { english: 'going', romanization: 'gayo' } },
          { text: '. ' },
          { text: '같이', gloss: { english: 'together', romanization: 'gachi' } },
          { text: ' ' },
          { text: '가요', gloss: { english: 'shall we go', romanization: 'gayo' } },
          { text: '?' },
        ],
      },
      {
        korean: '좋아요! 같이 가요.',
        english: "Great! Let's go together.",
        tokens: [
          { text: '좋아요', gloss: { english: 'great / good', romanization: 'joayo' } },
          { text: '! ' },
          { text: '같이', gloss: { english: 'together', romanization: 'gachi' } },
          { text: ' ' },
          { text: '가요', gloss: { english: "let's go", romanization: 'gayo' } },
          { text: '.' },
        ],
      },
    ],
  },
  {
    id: 'rdg-003',
    title: 'At a Restaurant',
    level: 2,
    topics: ['top-003'],
    lines: [
      {
        korean: '어서 오세요. 몇 분이세요?',
        english: 'Welcome. How many people?',
        tokens: [
          { text: '어서 오세요', gloss: { english: 'welcome', romanization: 'eoseo oseyo' } },
          { text: '. ' },
          { text: '몇', gloss: { english: 'how many', romanization: 'myeot' } },
          { text: ' ' },
          { text: '분이세요', gloss: { english: 'people (honorific)', romanization: 'buniseyo' } },
          { text: '?' },
        ],
      },
      {
        korean: '두 명이에요.',
        english: 'We are two people.',
        tokens: [
          { text: '두', gloss: { english: 'two', romanization: 'du' } },
          { text: ' ' },
          { text: '명이에요', gloss: { english: 'people (it is)', romanization: 'myeongieyo' } },
          { text: '.' },
        ],
      },
      {
        korean: '뭘 드시겠어요?',
        english: 'What would you like to eat?',
        tokens: [
          { text: '뭘', gloss: { english: 'what (object)', romanization: 'mwol' } },
          { text: ' ' },
          { text: '드시겠어요', gloss: { english: 'would you like to eat', romanization: 'deusigesseoyo' } },
          { text: '?' },
        ],
      },
      {
        korean: '비빔밥 하나하고 된장찌개 하나 주세요.',
        english: 'Please give us one bibimbap and one doenjang jjigae.',
        tokens: [
          { text: '비빔밥', gloss: { english: 'bibimbap', romanization: 'bibimbap' } },
          { text: ' ' },
          { text: '하나하고', gloss: { english: 'one and', romanization: 'hanahago' } },
          { text: ' ' },
          { text: '된장찌개', gloss: { english: 'doenjang jjigae', romanization: 'doenjang jjigae' } },
          { text: ' ' },
          { text: '하나', gloss: { english: 'one', romanization: 'hana' } },
          { text: ' ' },
          { text: '주세요', gloss: { english: 'please give', romanization: 'juseyo' } },
          { text: '.' },
        ],
      },
      {
        korean: '얼마예요?',
        english: 'How much is it?',
        tokens: [
          { text: '얼마예요', gloss: { english: 'how much', romanization: 'eolmayeyo' } },
          { text: '?' },
        ],
      },
      {
        korean: '만 오천 원이에요.',
        english: "It's 15,000 won.",
        tokens: [
          { text: '만', gloss: { english: 'ten thousand', romanization: 'man' } },
          { text: ' ' },
          { text: '오천', gloss: { english: 'five thousand', romanization: 'ocheon' } },
          { text: ' ' },
          { text: '원이에요', gloss: { english: 'won (it is)', romanization: 'wonieyo' } },
          { text: '.' },
        ],
      },
    ],
  },
  {
    id: 'rdg-004',
    title: 'Weekend Plans',
    level: 2,
    topics: ['top-004'],
    lines: [
      {
        korean: '이번 주말에 뭐 해요?',
        english: 'What are you doing this weekend?',
        tokens: [
          { text: '이번', gloss: { english: 'this (time)', romanization: 'ibeon' } },
          { text: ' ' },
          { text: '주말에', gloss: { english: 'on the weekend', romanization: 'jumare' } },
          { text: ' ' },
          { text: '뭐', gloss: { english: 'what', romanization: 'mwo' } },
          { text: ' ' },
          { text: '해요', gloss: { english: 'do', romanization: 'haeyo' } },
          { text: '?' },
        ],
      },
      {
        korean: '친구하고 영화를 볼 거예요.',
        english: 'I am going to watch a movie with a friend.',
        tokens: [
          { text: '친구하고', gloss: { english: 'with a friend', romanization: 'chinguhago' } },
          { text: ' ' },
          { text: '영화를', gloss: { english: 'movie (object)', romanization: 'yeonghwareul' } },
          { text: ' ' },
          { text: '볼 거예요', gloss: { english: 'going to watch', romanization: 'bol geoyeyo' } },
          { text: '.' },
        ],
      },
      {
        korean: '어떤 영화예요?',
        english: 'What kind of movie is it?',
        tokens: [
          { text: '어떤', gloss: { english: 'what kind of', romanization: 'eotteon' } },
          { text: ' ' },
          { text: '영화예요', gloss: { english: 'movie (is it)', romanization: 'yeonghwayeyo' } },
          { text: '?' },
        ],
      },
      {
        korean: '한국 액션 영화예요. 재미있을 것 같아요.',
        english: 'It is a Korean action movie. I think it will be fun.',
        tokens: [
          { text: '한국', gloss: { english: 'Korean', romanization: 'hanguk' } },
          { text: ' ' },
          { text: '액션', gloss: { english: 'action', romanization: 'aegsyeon' } },
          { text: ' ' },
          { text: '영화예요', gloss: { english: 'movie (is it)', romanization: 'yeonghwayeyo' } },
          { text: '. ' },
          { text: '재미있을 것 같아요', gloss: { english: 'I think it will be fun', romanization: 'jaemiissеul geot gatayo' } },
          { text: '.' },
        ],
      },
      {
        korean: '저도 같이 가도 돼요?',
        english: 'May I go with you too?',
        tokens: [
          { text: '저도', gloss: { english: 'I also', romanization: 'jeodo' } },
          { text: ' ' },
          { text: '같이', gloss: { english: 'together', romanization: 'gachi' } },
          { text: ' ' },
          { text: '가도 돼요', gloss: { english: 'is it okay to go', romanization: 'gado dwaeyo' } },
          { text: '?' },
        ],
      },
    ],
  },
] satisfies ReadingPassage[];
