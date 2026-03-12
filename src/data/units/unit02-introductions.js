// Unit 2: First Words & Introductions
// 5 lessons on greetings, basic expressions, and self-introduction

const lessons = [
  // ─── Lesson 2.1: Hello & Goodbye ─────────────────────────
  {
    id: 'u2-l1',
    title: 'Hello & Goodbye',
    subtitle: 'Essential greetings',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'Your first Korean words',
        content: 'Korean has different greetings depending on the situation. The good news: one word covers 90% of cases.',
      },
      {
        type: 'breakdown',
        title: 'Greetings',
        items: [
          { char: '안녕하세요', roman: 'annyeonghaseyo', sound: 'Hello (polite)', mnemonic: 'Works for everyone — strangers, elders, coworkers. Your default greeting.' },
          { char: '안녕히 가세요', roman: 'annyeonghi gaseyo', sound: 'Goodbye (to someone leaving)', mnemonic: 'Literally "go in peace" — YOU stay, THEY leave' },
          { char: '안녕히 계세요', roman: 'annyeonghi gyeseyo', sound: 'Goodbye (to someone staying)', mnemonic: 'Literally "stay in peace" — YOU leave, THEY stay' },
          { char: '안녕', roman: 'annyeong', sound: 'Hi / Bye (casual)', mnemonic: 'Short form — only with close friends your age or younger!' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Who says what?',
        content: 'When leaving a shop: YOU say 안녕히 계세요 (stay well) to the shopkeeper, and THEY say 안녕히 가세요 (go well) to you. If BOTH people are leaving, both say 안녕히 가세요!',
      },
    ],
    vocabulary: [
      { korean: '안녕하세요', roman: 'annyeonghaseyo', english: 'Hello (polite)', audio: true, example: { kr: '안녕하세요! 오랜만이에요.', en: 'Hello! Long time no see.' } },
      { korean: '안녕히 가세요', roman: 'annyeonghi gaseyo', english: 'Goodbye (to person leaving)', audio: true, example: { kr: '안녕히 가세요! 조심하세요.', en: 'Goodbye! Be careful.' } },
      { korean: '안녕히 계세요', roman: 'annyeonghi gyeseyo', english: 'Goodbye (to person staying)', audio: true, example: { kr: '안녕히 계세요, 내일 봐요.', en: 'Goodbye, see you tomorrow.' } },
      { korean: '안녕', roman: 'annyeong', english: 'Hi / Bye (casual)', audio: true, example: { kr: '안녕! 잘 지냈어?', en: 'Hi! Have you been well?' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What is the standard polite greeting in Korean?',
        options: ['안녕', '안녕하세요', '안녕히 가세요', '안녕히 계세요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'You are LEAVING a restaurant. What do you say to the staff?',
        options: ['안녕히 가세요 (go in peace)', '안녕히 계세요 (stay in peace)', '안녕 (casual bye)', '감사합니다 (thank you)'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '안녕 is appropriate to use with...',
        options: ['Your boss', 'A stranger', 'A close friend your age', 'An elderly person'],
        correct: 2,
      },
      {
        type: 'listening',
        audio: '안녕하세요',
        prompt: 'What did you hear?',
        options: ['안녕히 가세요', '안녕하세요', '안녕히 계세요', '안녕'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'A shopkeeper says goodbye as you leave. They say: "안녕히 가세요!" What did they mean?',
        options: ['Stay in peace', 'Go in peace (safe travels)', 'See you tomorrow', 'Thank you'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Both people are leaving a meeting. What do they BOTH say?',
        options: ['안녕히 계세요', '안녕히 가세요', '안녕하세요', '안녕'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 2.2: Thank You & Sorry ───────────────────────
  {
    id: 'u2-l2',
    title: 'Thank You & Sorry',
    subtitle: 'Politeness essentials',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'Politeness is built into Korean',
        content: 'In English, you can say "thanks" or "thank you" with different tone. In Korean, the WORDS themselves change based on how polite you need to be. There are formal and casual versions of almost everything.',
      },
      {
        type: 'breakdown',
        title: 'Essential Polite Expressions',
        items: [
          { char: '감사합니다', roman: 'gamsahamnida', sound: 'Thank you (formal)', mnemonic: 'Most polite — use with strangers, elders, in business' },
          { char: '고마워요', roman: 'gomawoyo', sound: 'Thank you (casual polite)', mnemonic: 'Friendly but still polite — use with acquaintances' },
          { char: '죄송합니다', roman: 'joesonghamnida', sound: 'I\'m sorry (formal)', mnemonic: 'For real apologies and formal situations' },
          { char: '미안해요', roman: 'mianhaeyo', sound: 'I\'m sorry (casual polite)', mnemonic: 'Lighter sorry — bumping into someone, small mistakes' },
          { char: '괜찮아요', roman: 'gwaenchanayo', sound: 'It\'s okay / I\'m fine', mnemonic: 'One of the most useful Korean words — "it\'s fine/no problem/I\'m okay"' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Bowing',
        content: 'Koreans often bow slightly when thanking or apologizing. A small head nod works for casual situations. A deeper bow (15-30°) shows more respect. You don\'t need to bow deeply in everyday situations — a slight nod is perfect.',
      },
    ],
    vocabulary: [
      { korean: '감사합니다', roman: 'gamsahamnida', english: 'Thank you (formal)', audio: true, example: { kr: '도와주셔서 감사합니다.', en: 'Thank you for helping me.' } },
      { korean: '고마워요', roman: 'gomawoyo', english: 'Thank you (casual polite)', audio: true, example: { kr: '선물 고마워요!', en: 'Thanks for the gift!' } },
      { korean: '죄송합니다', roman: 'joesonghamnida', english: 'I\'m sorry (formal)', audio: true, example: { kr: '늦어서 죄송합니다.', en: 'I\'m sorry for being late.' } },
      { korean: '미안해요', roman: 'mianhaeyo', english: 'I\'m sorry (casual polite)', audio: true, example: { kr: '미안해요, 잠깐만요.', en: 'Sorry, just a moment.' } },
      { korean: '괜찮아요', roman: 'gwaenchanayo', english: 'It\'s okay / I\'m fine', audio: true, example: { kr: '괜찮아요, 걱정하지 마세요.', en: 'It\'s okay, don\'t worry.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which is the MOST formal way to say "thank you"?',
        options: ['고마워', '고마워요', '감사합니다', '괜찮아요'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'Someone apologizes to you and you want to say "it\'s okay". You say:',
        options: ['감사합니다', '죄송합니다', '괜찮아요', '미안해요'],
        correct: 2,
      },
      {
        type: 'conversation',
        prompt: 'You accidentally step on someone\'s foot on the subway. You should say:',
        options: ['감사합니다', '괜찮아요', '안녕하세요', '죄송합니다'],
        correct: 3,
      },
      {
        type: 'listening',
        audio: '괜찮아요',
        prompt: 'What did you hear?',
        options: ['감사합니다', '죄송합니다', '괜찮아요', '미안해요'],
        correct: 2,
      },
      {
        type: 'matching',
        prompt: 'Match expression to situation',
        pairs: [
          { left: '감사합니다', right: 'Thanking your professor' },
          { left: '고마워요', right: 'Thanking a friendly coworker' },
          { left: '죄송합니다', right: 'Apologizing to your boss' },
          { left: '미안해요', right: 'Apologizing to a friend' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: '괜찮아요 can mean all of these EXCEPT:',
        options: ['It\'s okay', 'I\'m fine', 'No problem', 'I\'m sorry'],
        correct: 3,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 2.3: I Am [Name] ─────────────────────────────
  {
    id: 'u2-l3',
    title: 'I Am [Name]',
    subtitle: 'Self-introduction',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Your first sentence pattern!',
        content: 'Time to build your first Korean sentence. Korean sentences end with the verb — this is called SOV (Subject-Object-Verb) order. English: "I am a student." Korean: "I student am."',
      },
      {
        type: 'breakdown',
        title: 'Key Words',
        items: [
          { char: '저', roman: 'jeo', sound: 'I / me (polite/humble)', mnemonic: 'Use 저 in most situations. 나 (na) is casual.' },
          { char: '는', roman: 'neun', sound: 'Topic marker (after vowel)', mnemonic: 'Marks what you\'re talking about. More on this in Unit 3!' },
          { char: '입니다', roman: 'imnida', sound: '"am/is/are" (formal)', mnemonic: 'Formal ending — presentations, first meetings' },
          { char: '이에요/예요', roman: 'ieyo/yeyo', sound: '"am/is/are" (polite)', mnemonic: '이에요 after consonant, 예요 after vowel' },
        ],
      },
      {
        type: 'pattern',
        title: 'The pattern: 저는 ___입니다/이에요',
        content: 'Fill in the blank with a name or noun:',
        examples: [
          { kr: '저는 마크입니다.', en: 'I am Mark. (formal)' },
          { kr: '저는 학생이에요.', en: 'I am a student. (polite)' },
          { kr: '저는 미국 사람이에요.', en: 'I am American. (polite)' },
        ],
      },
      {
        type: 'explanation',
        title: '이에요 vs 예요',
        content: 'After a consonant ending: 이에요. After a vowel ending: 예요.\n• 학생 ends in ㅇ (consonant) → 학생이에요\n• 의사 ends in ㅏ (vowel) → 의사예요',
      },
      {
        type: 'breakdown',
        title: 'Meeting someone new',
        items: [
          { char: '만나서 반갑습니다', roman: 'mannaseo bangapseumnida', sound: 'Nice to meet you', mnemonic: 'Literally: "Having met you, I\'m glad"' },
          { char: '이름이 뭐예요?', roman: 'ireumi mwoyeyo?', sound: 'What is your name?', mnemonic: '이름 = name, 뭐 = what' },
        ],
      },
    ],
    vocabulary: [
      { korean: '저', roman: 'jeo', english: 'I / me (polite)', audio: true },
      { korean: '저는', roman: 'jeoneun', english: 'As for me / I (topic)', audio: true },
      { korean: '입니다', roman: 'imnida', english: 'am/is/are (formal)', audio: true },
      { korean: '이에요', roman: 'ieyo', english: 'am/is/are (after consonant)', audio: true },
      { korean: '예요', roman: 'yeyo', english: 'am/is/are (after vowel)', audio: true },
      { korean: '만나서 반갑습니다', roman: 'mannaseo bangapseumnida', english: 'Nice to meet you', audio: true },
      { korean: '학생', roman: 'haksaeng', english: 'Student', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I am Mark" formally?',
        options: ['마크 저는입니다', '저는 마크입니다', '입니다 마크 저는', '마크입니다 저는'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '저는 학생___.',
        options: ['예요', '이에요', '는', '가'],
        correct: 1,
        hint: '학생 ends in a consonant (ㅇ)',
      },
      {
        type: 'fill-blank',
        prompt: '저는 의사___.',
        options: ['이에요', '예요', '입니다', '는'],
        correct: 1,
        hint: '의사 ends in a vowel (ㅏ)',
      },
      {
        type: 'multiple-choice',
        prompt: 'Korean sentence order is:',
        options: ['Subject-Verb-Object (SVO)', 'Subject-Object-Verb (SOV)', 'Verb-Subject-Object (VSO)', 'Object-Subject-Verb (OSV)'],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '만나서 반갑습니다',
        prompt: 'What does this expression mean?',
        options: ['Thank you', 'Nice to meet you', 'I\'m sorry', 'Goodbye'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I am a student" (formal)',
        tiles: ['저는', '학생', '입니다'],
        correct: ['저는', '학생', '입니다'],
        english: 'I am a student',
      },
      {
        type: 'multiple-choice',
        prompt: '저 is the polite form of "I". The casual form is:',
        options: ['나', '너', '우리', '그'],
        correct: 0,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 2.4: Yes, No & Basic Responses ───────────────
  {
    id: 'u2-l4',
    title: 'Yes, No & Responses',
    subtitle: 'Basic responses',
    estimatedMinutes: 7,
    teach: [
      {
        type: 'breakdown',
        title: 'Essential Responses',
        items: [
          { char: '네', roman: 'ne', sound: 'Yes', mnemonic: 'Also used constantly as "uh-huh" to show you\'re listening — Koreans say 네 A LOT in conversation!' },
          { char: '아니요', roman: 'aniyo', sound: 'No (polite)', mnemonic: 'Polite "no" — safe in any situation' },
          { char: '네, 맞아요', roman: 'ne, majayo', sound: 'Yes, that\'s right', mnemonic: '맞다 = to be correct' },
          { char: '아니요, 아니에요', roman: 'aniyo, anieyo', sound: 'No, it\'s not', mnemonic: 'Denying something — "no, that\'s not the case"' },
          { char: '몰라요', roman: 'mollayo', sound: 'I don\'t know', mnemonic: 'From 모르다 (to not know) — very common!' },
          { char: '알겠습니다', roman: 'algesseumnida', sound: 'I understand / Got it', mnemonic: 'Shows you understood — formal and reliable' },
        ],
      },
      {
        type: 'cultural-note',
        title: '네 as a listening signal',
        content: 'In Korean phone calls, you\'ll hear 네, 네, 네 repeated constantly. It doesn\'t mean "yes" each time — it\'s like "uh-huh, I\'m listening, go on." Not saying 네 enough can make you seem disinterested!',
      },
    ],
    vocabulary: [
      { korean: '네', roman: 'ne', english: 'Yes / Uh-huh', audio: true, example: { kr: '네, 알겠습니다.', en: 'Yes, I understand.' } },
      { korean: '아니요', roman: 'aniyo', english: 'No', audio: true, example: { kr: '아니요, 괜찮아요.', en: 'No, it\'s okay.' } },
      { korean: '맞아요', roman: 'majayo', english: 'That\'s right / Correct', audio: true, example: { kr: '네, 맞아요!', en: 'Yes, that\'s right!' } },
      { korean: '아니에요', roman: 'anieyo', english: 'It\'s not / That\'s not it', audio: true, example: { kr: '아니에요, 저는 학생이에요.', en: 'No, I\'m a student.' } },
      { korean: '몰라요', roman: 'mollayo', english: 'I don\'t know', audio: true, example: { kr: '저도 몰라요.', en: 'I don\'t know either.' } },
      { korean: '알겠습니다', roman: 'algesseumnida', english: 'I understand / Got it', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Someone asks you a question and you agree. You say:',
        options: ['아니요', '몰라요', '네', '괜찮아요'],
        correct: 2,
      },
      {
        type: 'conversation',
        prompt: '"학생이에요?" (Are you a student?) — You are NOT a student. You reply:',
        options: ['네, 학생이에요', '아니요, 학생이 아니에요', '몰라요', '알겠습니다'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'In Korean phone calls, repeated 네 네 네 means:',
        options: ['Yes yes yes!', 'I\'m listening / go on', 'Hurry up', 'I disagree'],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '몰라요',
        prompt: 'What does this mean?',
        options: ['I understand', 'I don\'t know', 'That\'s right', 'No'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match expression to meaning',
        pairs: [
          { left: '네', right: 'Yes / Uh-huh' },
          { left: '아니요', right: 'No' },
          { left: '몰라요', right: 'I don\'t know' },
          { left: '알겠습니다', right: 'I understand' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'Your teacher explains something and asks if you understand. You say:',
        options: ['네, 맞아요', '네, 알겠습니다', '아니요', '몰라요'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 2.5: Excuse Me & Getting Attention ────────────
  {
    id: 'u2-l5',
    title: 'Excuse Me & Please',
    subtitle: 'Getting attention & ordering',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'breakdown',
        title: 'Getting Attention',
        items: [
          { char: '실례합니다', roman: 'sillyehamnida', sound: 'Excuse me (formal)', mnemonic: 'Polite way to interrupt or approach someone' },
          { char: '저기요', roman: 'jeogiyo', sound: 'Excuse me! (calling out)', mnemonic: 'Use this to call a waiter, get attention from across the room' },
          { char: '잠시만요', roman: 'jamsimanyo', sound: 'Just a moment, please', mnemonic: '잠시 = a moment, 만 = just/only' },
        ],
      },
      {
        type: 'explanation',
        title: 'The magic word: 주세요',
        content: '주세요 (juseyo) means "please give me" and it\'s the single most useful phrase for daily life in Korea. Just put what you want in front of it!',
      },
      {
        type: 'pattern',
        title: '___ 주세요 = "___, please"',
        examples: [
          { kr: '물 주세요.', en: 'Water, please.' },
          { kr: '메뉴 주세요.', en: 'Menu, please.' },
          { kr: '커피 주세요.', en: 'Coffee, please.' },
          { kr: '이거 주세요.', en: 'This one, please.' },
          { kr: '계산서 주세요.', en: 'The bill, please.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Restaurant culture',
        content: 'In Korean restaurants, you call the server by saying 저기요! loudly. This is completely normal and NOT rude. Servers don\'t check on your table like in Western restaurants — you call them when you need them. Many restaurants also have a call button (벨) at the table.',
      },
    ],
    vocabulary: [
      { korean: '실례합니다', roman: 'sillyehamnida', english: 'Excuse me (formal)', audio: true, example: { kr: '실례합니다, 화장실이 어디예요?', en: 'Excuse me, where is the restroom?' } },
      { korean: '저기요', roman: 'jeogiyo', english: 'Excuse me! (calling attention)', audio: true, example: { kr: '저기요, 주문할게요!', en: 'Excuse me, I\'d like to order!' } },
      { korean: '잠시만요', roman: 'jamsimanyo', english: 'Just a moment', audio: true, example: { kr: '잠시만요, 곧 갈게요.', en: 'Just a moment, I\'ll be right there.' } },
      { korean: '주세요', roman: 'juseyo', english: 'Please give me', audio: true, example: { kr: '물 주세요.', en: 'Water, please.' } },
      { korean: '이거', roman: 'igeo', english: 'This (thing)', audio: true, example: { kr: '이거 주세요.', en: 'This one, please.' } },
      { korean: '물', roman: 'mul', english: 'Water', audio: true },
      { korean: '메뉴', roman: 'menyu', english: 'Menu', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'You want to call a waiter in a Korean restaurant. You say:',
        options: ['실례합니다', '저기요!', '잠시만요', '안녕하세요'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Water, please."',
        tiles: ['물', '주세요'],
        correct: ['물', '주세요'],
        english: 'Water, please.',
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 주세요 mean?',
        options: ['Thank you', 'Please give me', 'Excuse me', 'I\'m sorry'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'You walk up to a stranger to ask for directions. You start with:',
        options: ['저기요!', '실례합니다', '잠시만요', '안녕'],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '주세요',
        prompt: 'What did you hear?',
        options: ['주세요 (please give me)', '잠시만요 (just a moment)', '저기요 (excuse me)', '이거 (this)'],
        correct: 0,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "This one, please."',
        tiles: ['이거', '주세요'],
        correct: ['이거', '주세요'],
        english: 'This one, please.',
      },
      {
        type: 'conversation',
        prompt: 'You\'re at a cafe. How do you order a coffee?',
        options: ['커피 감사합니다', '커피 주세요', '커피 안녕하세요', '커피 괜찮아요'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
