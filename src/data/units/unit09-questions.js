// Unit 9: Asking Questions
// 3 lessons on question words, yes/no questions, and demonstratives

const lessons = [
  // ─── Lesson 9.1: Question Words ─────────────────────────────
  {
    id: 'u9-l1',
    title: 'Question Words',
    subtitle: '뭐, 누구, 어디, 언제, 왜, 어떻게',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Korean question words',
        content: 'Korean has question words just like English (what, who, where, when, why, how). The amazing thing? Korean questions use the SAME word order as statements! You just swap in the question word where the answer would go.',
      },
      {
        type: 'comparison',
        title: 'Same word order as statements!',
        content: 'In English, you rearrange the sentence to ask a question: "You eat pizza" becomes "What do you eat?" In Korean, the structure stays the same: 피자를 먹어요 (I eat pizza) → 뭐 먹어요? (What do you eat?) Just swap 피자 for 뭐!',
      },
      {
        type: 'breakdown',
        title: 'The essential question words',
        items: [
          { char: '뭐 / 무엇', roman: 'mwo / mueot', sound: 'What', mnemonic: '뭐 is casual, 무엇 is formal — use 뭐 most of the time' },
          { char: '누구', roman: 'nugu', sound: 'Who', mnemonic: 'Think "nugu?" when you see someone you don\'t recognize' },
          { char: '어디', roman: 'eodi', sound: 'Where', mnemonic: '"Oh, dee-rectory!" — where is it?' },
          { char: '언제', roman: 'eonje', sound: 'When', mnemonic: 'Sounds a bit like "on je... day?" — when?' },
          { char: '왜', roman: 'wae', sound: 'Why', mnemonic: 'Sounds like "wae?" — "whyyy?"' },
          { char: '어떻게', roman: 'eotteoke', sound: 'How', mnemonic: 'The famous K-drama exclamation: "어떡해!" (What do I do?!)' },
        ],
      },
      {
        type: 'breakdown',
        title: 'Quantity question words',
        items: [
          { char: '얼마', roman: 'eolma', sound: 'How much (price)', mnemonic: 'Essential for shopping: 얼마예요? = How much is it?' },
          { char: '몇', roman: 'myeot', sound: 'How many / what number', mnemonic: 'Used with counters: 몇 개? 몇 시? 몇 명?' },
        ],
      },
      {
        type: 'pattern',
        title: 'Question words in action',
        examples: [
          { kr: '뭐 먹어요?', en: 'What are you eating?' },
          { kr: '누구예요?', en: 'Who is it?' },
          { kr: '어디에 가요?', en: 'Where are you going?' },
          { kr: '언제 와요?', en: 'When are you coming?' },
          { kr: '왜요?', en: 'Why?' },
          { kr: '어떻게 가요?', en: 'How do you get there?' },
        ],
      },
      {
        type: 'cultural-note',
        title: '왜요? — The universal follow-up',
        content: '왜요? (Why?) is incredibly common in Korean conversation. It can be a genuine question, an expression of surprise, or even a playful challenge. If someone says something unexpected, just hit them with a 왜요? and they\'ll explain!',
      },
    ],
    vocabulary: [
      { korean: '뭐', roman: 'mwo', english: 'What (casual)', audio: true, example: { kr: '뭐 먹어요?', en: 'What are you eating?' } },
      { korean: '무엇', roman: 'mueot', english: 'What (formal)', audio: true, example: { kr: '무엇을 원하세요?', en: 'What would you like?' } },
      { korean: '누구', roman: 'nugu', english: 'Who', audio: true, example: { kr: '누구예요?', en: 'Who is it?' } },
      { korean: '어디', roman: 'eodi', english: 'Where', audio: true, example: { kr: '어디에 가요?', en: 'Where are you going?' } },
      { korean: '언제', roman: 'eonje', english: 'When', audio: true, example: { kr: '언제 와요?', en: 'When are you coming?' } },
      { korean: '왜', roman: 'wae', english: 'Why', audio: true, example: { kr: '왜요?', en: 'Why?' } },
      { korean: '어떻게', roman: 'eotteoke', english: 'How', audio: true, example: { kr: '어떻게 가요?', en: 'How do you get there?' } },
      { korean: '얼마', roman: 'eolma', english: 'How much', audio: true, example: { kr: '이거 얼마예요?', en: 'How much is this?' } },
      { korean: '몇', roman: 'myeot', english: 'How many / what number', audio: true, example: { kr: '몇 개요?', en: 'How many?' } },
    ],
    exercises: [
      {
        type: 'matching',
        prompt: 'Match each question word to its meaning',
        pairs: [
          { left: '뭐', right: 'What' },
          { left: '누구', right: 'Who' },
          { left: '어디', right: 'Where' },
          { left: '언제', right: 'When' },
          { left: '왜', right: 'Why' },
          { left: '어떻게', right: 'How' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'Which question word completes: "___ 가요?" (Where are you going?)',
        options: ['뭐', '누구', '어디에', '언제'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'You want to ask how much something costs. Which phrase do you use?',
        options: ['뭐예요?', '어디예요?', '얼마예요?', '몇 개요?'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '___ 먹어요? (What are you eating?)',
        options: ['뭐', '누구', '어디', '언제'],
        correct: 0,
        hint: 'The question asks about the thing being eaten',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "When are you coming?"',
        tiles: ['언제', '와요?'],
        correct: ['언제', '와요?'],
        english: 'When are you coming?',
      },
      {
        type: 'listening',
        audio: '이거 얼마예요?',
        prompt: 'What is being asked?',
        options: ['What is this?', 'How much is this?', 'Where is this?', 'Who is this?'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'You arrive at a crossroads and need to ask how to get to the station. You say:',
        options: ['어디에 가요?', '어떻게 가요?', '언제 가요?', '왜 가요?'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 9.2: Yes/No Questions ──────────────────────────
  {
    id: 'u9-l2',
    title: 'Yes/No Questions',
    subtitle: 'Intonation + 네/아니요',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'The easiest questions in Korean',
        content: 'Yes/No questions in Korean are incredibly simple. Take any statement and just raise your intonation at the end (in speech) or add a question mark (in writing). The sentence structure does NOT change at all!',
      },
      {
        type: 'pattern',
        title: 'Statement to question — just change intonation',
        examples: [
          { kr: '학생이에요. → 학생이에요?', en: 'I am a student. → Are you a student?' },
          { kr: '한국 사람이에요. → 한국 사람이에요?', en: 'I am Korean. → Are you Korean?' },
          { kr: '이거 맛있어요. → 이거 맛있어요?', en: 'This is delicious. → Is this delicious?' },
          { kr: '커피 좋아해요. → 커피 좋아해요?', en: 'I like coffee. → Do you like coffee?' },
        ],
      },
      {
        type: 'explanation',
        title: 'Answering: 네 and 아니요',
        content: '네 (ne) means "yes" and 아니요 (aniyo) means "no." After answering, you usually repeat or modify the statement. Important: 네 confirms the QUESTION as stated, just like English.',
      },
      {
        type: 'pattern',
        title: 'Full yes/no answers',
        examples: [
          { kr: '학생이에요? — 네, 학생이에요.', en: 'Are you a student? — Yes, I am a student.' },
          { kr: '학생이에요? — 아니요, 학생이 아니에요.', en: 'Are you a student? — No, I am not a student.' },
          { kr: '한국 사람이에요? — 아니요, 미국 사람이에요.', en: 'Are you Korean? — No, I am American.' },
          { kr: '이거 맛있어요? — 네, 맛있어요!', en: 'Is this delicious? — Yes, it\'s delicious!' },
        ],
      },
      {
        type: 'breakdown',
        title: 'Ways to say yes and no',
        items: [
          { char: '네', roman: 'ne', sound: 'Yes (polite)', mnemonic: 'The standard, polite "yes"' },
          { char: '예', roman: 'ye', sound: 'Yes (formal)', mnemonic: 'Slightly more formal version of 네' },
          { char: '응', roman: 'eung', sound: 'Yeah (casual)', mnemonic: 'Use only with close friends' },
          { char: '아니요', roman: 'aniyo', sound: 'No (polite)', mnemonic: 'Polite "no" for everyday use' },
          { char: '아니에요', roman: 'anieyo', sound: 'It is not / That\'s not right', mnemonic: 'Used when negating a noun: X가 아니에요' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'The Korean "ne" is not always "yes"',
        content: 'Koreans say 네 a LOT during conversations — as a listener response meaning "I\'m listening" or "I understand," not necessarily "I agree." Don\'t confuse frequent 네 responses with agreement!',
      },
    ],
    vocabulary: [
      { korean: '네', roman: 'ne', english: 'Yes (polite)', audio: true },
      { korean: '예', roman: 'ye', english: 'Yes (formal)', audio: true },
      { korean: '아니요', roman: 'aniyo', english: 'No (polite)', audio: true },
      { korean: '맞아요', roman: 'majayo', english: 'That\'s right / correct', audio: true, example: { kr: '맞아요, 학생이에요.', en: 'That\'s right, I\'m a student.' } },
      { korean: '아니에요', roman: 'anieyo', english: 'It is not / That\'s not right', audio: true, example: { kr: '학생이 아니에요.', en: 'I am not a student.' } },
      { korean: '맛있어요', roman: 'masisseoyo', english: 'It\'s delicious', audio: true, example: { kr: '이거 맛있어요?', en: 'Is this delicious?' } },
      { korean: '좋아해요', roman: 'joahaeyo', english: 'I like (it)', audio: true, example: { kr: '커피 좋아해요?', en: 'Do you like coffee?' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you turn "학생이에요." (I am a student) into a question?',
        options: ['학생이에요 뭐?', '학생이에요?', '학생이에요 네?', '뭐 학생이에요.'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Someone asks "한국 사람이에요?" and you are American. You reply:',
        options: ['네, 한국 사람이에요.', '아니요, 미국 사람이에요.', '네, 미국 사람이에요.', '아니요, 한국 사람이에요.'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '이거 맛있어요? — ___, 맛있어요! (Yes, it\'s delicious!)',
        options: ['아니요', '네', '왜', '뭐'],
        correct: 1,
        hint: 'You are confirming that it IS delicious',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "No, I am not a student."',
        tiles: ['아니요,', '학생이', '아니에요.'],
        correct: ['아니요,', '학생이', '아니에요.'],
        english: 'No, I am not a student.',
      },
      {
        type: 'listening',
        audio: '커피 좋아해요?',
        prompt: 'What is being asked?',
        options: ['I like coffee.', 'Do you like coffee?', 'Is this coffee?', 'Where is the coffee?'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the response type',
        pairs: [
          { left: '네', right: 'Yes (polite)' },
          { left: '아니요', right: 'No (polite)' },
          { left: '맞아요', right: 'That\'s right' },
          { left: '아니에요', right: 'It is not' },
        ],
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 9.3: This, That, Over There (이/그/저) ─────────
  {
    id: 'u9-l3',
    title: 'This, That, Over There',
    subtitle: '이/그/저',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Three levels of distance',
        content: 'Unlike English which has just "this" and "that," Korean has THREE demonstratives based on distance: 이 (near me), 그 (near you / previously mentioned), and 저 (far from both of us). This three-way system is one of Korean\'s unique features!',
      },
      {
        type: 'breakdown',
        title: 'The 이/그/저 system',
        items: [
          { char: '이', roman: 'i', sound: 'This (near me)', mnemonic: '"이" = "I" can reach it — it\'s right here by me!' },
          { char: '그', roman: 'geu', sound: 'That (near you)', mnemonic: '"그" = near the person you\'re talking to, or something mentioned before' },
          { char: '저', roman: 'jeo', sound: 'That over there (far)', mnemonic: '"저" = "jeo" far away — you need to "journey over" to get it' },
        ],
      },
      {
        type: 'pattern',
        title: 'Thing words: 이것/그것/저것 → 이거/그거/저거',
        examples: [
          { kr: '이것 (이거) = this thing', en: 'Formal (casual) — near me' },
          { kr: '그것 (그거) = that thing', en: 'Formal (casual) — near you' },
          { kr: '저것 (저거) = that thing over there', en: 'Formal (casual) — far from both' },
        ],
      },
      {
        type: 'pattern',
        title: 'Person and place words',
        examples: [
          { kr: '이 사람 / 그 사람 / 저 사람', en: 'This person / that person / that person over there' },
          { kr: '여기 / 거기 / 저기', en: 'Here / there / over there' },
        ],
      },
      {
        type: 'example',
        title: 'Shopping with demonstratives',
        korean: '이거 얼마예요? — 그거 5,000원이에요. — 저거는요?',
        breakdown: [
          { part: '이거 얼마예요?', role: 'How much is this? (pointing at item near you)' },
          { part: '그거 5,000원이에요.', role: 'That\'s 5,000 won. (shopkeeper refers to item near you)' },
          { part: '저거는요?', role: 'What about that one over there? (pointing at distant item)' },
        ],
      },
      {
        type: 'cultural-note',
        title: '그 for things mentioned before',
        content: '그 is also used to refer to something previously mentioned in conversation, even if it\'s not physically nearby. For example: "I have a friend. 그 사람은 한국 사람이에요." = "That person (the friend I just mentioned) is Korean."',
      },
    ],
    vocabulary: [
      { korean: '이거', roman: 'igeo', english: 'This (thing)', audio: true, example: { kr: '이거 뭐예요?', en: 'What is this?' } },
      { korean: '그거', roman: 'geugeo', english: 'That (thing, near you)', audio: true, example: { kr: '그거 주세요.', en: 'Please give me that.' } },
      { korean: '저거', roman: 'jeogeo', english: 'That (thing, over there)', audio: true, example: { kr: '저거 뭐예요?', en: 'What is that over there?' } },
      { korean: '이 사람', roman: 'i saram', english: 'This person', audio: true },
      { korean: '그 사람', roman: 'geu saram', english: 'That person', audio: true, example: { kr: '그 사람 누구예요?', en: 'Who is that person?' } },
      { korean: '저 사람', roman: 'jeo saram', english: 'That person (over there)', audio: true },
      { korean: '여기', roman: 'yeogi', english: 'Here', audio: true, example: { kr: '여기 앉으세요.', en: 'Please sit here.' } },
      { korean: '거기', roman: 'geogi', english: 'There', audio: true, example: { kr: '거기 어디예요?', en: 'Where is there?' } },
      { korean: '저기', roman: 'jeogi', english: 'Over there', audio: true, example: { kr: '저기요!', en: 'Excuse me! (calling someone)' } },
      { korean: '주세요', roman: 'juseyo', english: 'Please give me', audio: true, example: { kr: '이거 주세요.', en: 'Please give me this.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Korean has how many levels of distance for demonstratives?',
        options: ['Two (this/that)', 'Three (this/that/that over there)', 'Four', 'One'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the demonstrative to its distance',
        pairs: [
          { left: '이거', right: 'Near me (this)' },
          { left: '그거', right: 'Near you (that)' },
          { left: '저거', right: 'Far away (that over there)' },
        ],
      },
      {
        type: 'fill-blank',
        prompt: 'You\'re in a shop pointing at an item on the shelf near you: "___ 얼마예요?" (How much is this?)',
        options: ['이거', '그거', '저거', '뭐'],
        correct: 0,
        hint: 'The item is near you, so use the "near me" demonstrative',
      },
      {
        type: 'multiple-choice',
        prompt: 'You see something far away across the street. Which word do you use?',
        options: ['이거', '그거', '저거', '여기'],
        correct: 2,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Please give me this."',
        tiles: ['이거', '주세요.'],
        correct: ['이거', '주세요.'],
        english: 'Please give me this.',
      },
      {
        type: 'matching',
        prompt: 'Match the place words',
        pairs: [
          { left: '여기', right: 'Here' },
          { left: '거기', right: 'There' },
          { left: '저기', right: 'Over there' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'You\'re at a market. You point at an apple near you and want to buy it. You say:',
        options: ['저거 주세요.', '그거 주세요.', '이거 주세요.', '여기 주세요.'],
        correct: 2,
      },
      {
        type: 'listening',
        audio: '저기요!',
        prompt: 'When would you say this?',
        options: ['When saying goodbye', 'When calling someone\'s attention (Excuse me!)', 'When answering the phone', 'When saying thank you'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
