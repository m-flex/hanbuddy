// Unit 7: Making Sentences
// 5 lessons on essential Korean sentence patterns

const lessons = [
  // ─── Lesson 7.1: It Is / It Is Not ─────────────────────────
  {
    id: 'u7-l1',
    title: 'It Is / It Is Not',
    subtitle: '이다 / 아니다',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Identifying things in Korean',
        content: 'To say "It is [noun]" in Korean, you attach 입니다 (formal) or 이에요/예요 (polite) directly to the noun. Remember: 이에요 after a consonant, 예요 after a vowel.',
      },
      {
        type: 'pattern',
        title: 'Noun + 입니다 / 이에요 / 예요',
        examples: [
          { kr: '이것은 책이에요.', en: 'This is a book.' },
          { kr: '저는 학생이에요.', en: 'I am a student.' },
          { kr: '이것은 커피예요.', en: 'This is coffee.' },
          { kr: '저는 의사입니다.', en: 'I am a doctor. (formal)' },
        ],
      },
      {
        type: 'explanation',
        title: 'It is NOT: 아니에요',
        content: 'To say "It is NOT [noun]", use Noun + 이/가 아니에요. The subject particle 이 comes after a consonant, 가 after a vowel. This is a completely different word from 이다 — Korean uses 아니다 for negation.',
      },
      {
        type: 'pattern',
        title: 'Noun + 이/가 아니에요',
        examples: [
          { kr: '이것은 책이 아니에요.', en: 'This is not a book.' },
          { kr: '저는 학생이 아니에요.', en: 'I am not a student.' },
          { kr: '커피가 아니에요.', en: 'It is not coffee.' },
        ],
      },
      {
        type: 'example',
        title: 'Asking "What is this?"',
        korean: '이것은 뭐예요?',
        breakdown: [
          { part: '이것은', role: 'This (topic)' },
          { part: '뭐', role: 'What' },
          { part: '예요', role: 'is (polite)' },
        ],
      },
    ],
    vocabulary: [
      { korean: '이것', roman: 'igeot', english: 'This (thing)', audio: true, example: { kr: '이것은 뭐예요?', en: 'What is this?' } },
      { korean: '입니다', roman: 'imnida', english: 'It is (formal)', audio: true },
      { korean: '이에요', roman: 'ieyo', english: 'It is (after consonant)', audio: true },
      { korean: '예요', roman: 'yeyo', english: 'It is (after vowel)', audio: true },
      { korean: '아니에요', roman: 'anieyo', english: 'It is not', audio: true, example: { kr: '그것은 물이 아니에요.', en: 'That is not water.' } },
      { korean: '뭐', roman: 'mwo', english: 'What', audio: true },
      { korean: '책', roman: 'chaek', english: 'Book', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "This is a book"?',
        options: ['이것은 책이에요', '이것은 책 아니에요', '책은 이것이에요', '이것은 책가 아니에요'],
        correct: 0,
      },
      {
        type: 'fill-blank',
        prompt: '이것은 커피___.',
        options: ['이에요', '예요', '아니에요', '입니다'],
        correct: 1,
        hint: '커피 ends in a vowel (ㅣ)',
      },
      {
        type: 'multiple-choice',
        prompt: 'How do you say "This is NOT water"?',
        options: ['물이에요', '물이 아니에요', '물 예요', '물 입니다'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "What is this?"',
        tiles: ['이것은', '뭐', '예요?'],
        correct: ['이것은', '뭐', '예요?'],
        english: 'What is this?',
      },
      {
        type: 'listening',
        audio: '이것은 뭐예요?',
        prompt: 'What did you hear?',
        options: ['이것은 뭐예요?', '이것은 책이에요', '이것은 커피예요', '저는 학생이에요'],
        correct: 0,
      },
      {
        type: 'conversation',
        prompt: 'Someone asks "학생이에요?" and you are NOT a student. You reply:',
        options: ['네, 학생이에요', '아니요, 학생이 아니에요', '몰라요', '네, 맞아요'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 7.2: Want To (고 싶다) ──────────────────────────
  {
    id: 'u7-l2',
    title: 'Want To',
    subtitle: 'Verb stem + 고 싶어요',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Expressing desires',
        content: 'To say "I want to [verb]", take the verb stem and add 고 싶어요. The verb stem is the dictionary form minus 다. For example: 가다 → 가 (stem) + 고 싶어요 = 가고 싶어요 (I want to go).',
      },
      {
        type: 'pattern',
        title: 'Verb stem + 고 싶어요',
        examples: [
          { kr: '가고 싶어요.', en: 'I want to go.' },
          { kr: '먹고 싶어요.', en: 'I want to eat.' },
          { kr: '자고 싶어요.', en: 'I want to sleep.' },
          { kr: '한국에 가고 싶어요.', en: 'I want to go to Korea.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Asking what someone wants',
        content: 'To ask "What do you want to [verb]?", use 뭐 (what) before the verb + 고 싶어요. For example: 뭐 먹고 싶어요? = "What do you want to eat?"',
      },
      {
        type: 'explanation',
        title: 'Negative: don\'t want to',
        content: 'To say "I don\'t want to", use verb stem + 고 싶지 않아요. For example: 가고 싶지 않아요 = "I don\'t want to go." You can also use 안 before 고 싶어요: 안 가고 싶어요.',
      },
    ],
    vocabulary: [
      { korean: '가고 싶어요', roman: 'gago sipeoyo', english: 'I want to go', audio: true, example: { kr: '집에 가고 싶어요.', en: 'I want to go home.' } },
      { korean: '먹고 싶어요', roman: 'meokgo sipeoyo', english: 'I want to eat', audio: true, example: { kr: '뭐 먹고 싶어요?', en: 'What do you want to eat?' } },
      { korean: '자고 싶어요', roman: 'jago sipeoyo', english: 'I want to sleep', audio: true },
      { korean: '보고 싶어요', roman: 'bogo sipeoyo', english: 'I want to see / I miss (someone)', audio: true, example: { kr: '엄마 보고 싶어요.', en: 'I miss mom.' } },
      { korean: '배우고 싶어요', roman: 'baeugo sipeoyo', english: 'I want to learn', audio: true, example: { kr: '한국어를 배우고 싶어요.', en: 'I want to learn Korean.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I want to eat"?',
        options: ['먹어요', '먹고 싶어요', '먹고 있어요', '먹을 거예요'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "What do you want to eat?"',
        tiles: ['뭐', '먹고', '싶어요?'],
        correct: ['뭐', '먹고', '싶어요?'],
        english: 'What do you want to eat?',
      },
      {
        type: 'fill-blank',
        prompt: '한국에 ___고 싶어요. (I want to go to Korea)',
        options: ['가', '먹', '자', '보'],
        correct: 0,
        hint: '가다 = to go',
      },
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I don\'t want to go"?',
        options: ['가고 싶어요', '안 가요', '가고 싶지 않아요', '가세요'],
        correct: 2,
      },
      {
        type: 'listening',
        audio: '보고 싶어요',
        prompt: 'What does this expression mean?',
        options: ['I want to eat', 'I want to see / I miss you', 'I want to go', 'I want to sleep'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the expression to its meaning',
        pairs: [
          { left: '가고 싶어요', right: 'I want to go' },
          { left: '먹고 싶어요', right: 'I want to eat' },
          { left: '자고 싶어요', right: 'I want to sleep' },
          { left: '배우고 싶어요', right: 'I want to learn' },
        ],
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 7.3: Can & Can't ────────────────────────────────
  {
    id: 'u7-l3',
    title: 'Can & Can\'t',
    subtitle: '(으)ㄹ 수 있다 / 없다',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Expressing ability',
        content: 'To say "I can [verb]", add (으)ㄹ 수 있어요 to the verb stem. If the stem ends in a vowel, add ㄹ 수 있어요. If it ends in a consonant, add 을 수 있어요. 하다 → 할 수 있어요 (I can do it).',
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)ㄹ 수 있어요',
        examples: [
          { kr: '할 수 있어요.', en: 'I can do it.' },
          { kr: '한국어를 읽을 수 있어요.', en: 'I can read Korean.' },
          { kr: '갈 수 있어요.', en: 'I can go.' },
          { kr: '먹을 수 있어요.', en: 'I can eat (it).' },
        ],
      },
      {
        type: 'explanation',
        title: 'Can\'t: 수 없어요 or 못',
        content: 'For "I can\'t", replace 있어요 with 없어요: 할 수 없어요 (I can\'t do it). There\'s also a shortcut: put 못 before the verb. 못 가요 = "I can\'t go." 못 먹어요 = "I can\'t eat."',
      },
      {
        type: 'pattern',
        title: 'Shortcut: 못 + verb',
        examples: [
          { kr: '못 가요.', en: 'I can\'t go.' },
          { kr: '못 먹어요.', en: 'I can\'t eat.' },
          { kr: '못 해요.', en: 'I can\'t do it.' },
        ],
      },
    ],
    vocabulary: [
      { korean: '할 수 있어요', roman: 'hal su isseoyo', english: 'I can do it', audio: true, example: { kr: '저도 할 수 있어요!', en: 'I can do it too!' } },
      { korean: '할 수 없어요', roman: 'hal su eopseoyo', english: 'I can\'t do it', audio: true },
      { korean: '읽을 수 있어요', roman: 'ilgeul su isseoyo', english: 'I can read', audio: true, example: { kr: '한국어를 읽을 수 있어요.', en: 'I can read Korean.' } },
      { korean: '못 가요', roman: 'mot gayo', english: 'I can\'t go', audio: true, example: { kr: '오늘 못 가요.', en: 'I can\'t go today.' } },
      { korean: '못 먹어요', roman: 'mot meogeoyo', english: 'I can\'t eat', audio: true },
      { korean: '못 해요', roman: 'mot haeyo', english: 'I can\'t do it', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I can do it"?',
        options: ['하고 싶어요', '할 수 있어요', '하고 있어요', '했어요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '"I can\'t go" using the 못 shortcut is:',
        options: ['갈 수 없어요', '못 가요', '안 가요', '가고 싶지 않아요'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '한국어를 ___ 수 있어요. (I can read Korean)',
        options: ['읽을', '읽고', '읽는', '읽어'],
        correct: 0,
        hint: '읽다 stem ends in a consonant → add 을',
      },
      {
        type: 'conversation',
        prompt: 'A friend asks "같이 갈 수 있어요?" (Can you go together?) and you cannot. You reply:',
        options: ['네, 갈 수 있어요', '아니요, 못 가요', '가고 싶어요', '네, 맞아요'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the expression to its meaning',
        pairs: [
          { left: '할 수 있어요', right: 'I can do it' },
          { left: '할 수 없어요', right: 'I can\'t do it' },
          { left: '못 가요', right: 'I can\'t go' },
          { left: '못 먹어요', right: 'I can\'t eat' },
        ],
      },
      {
        type: 'listening',
        audio: '할 수 있어요',
        prompt: 'What did you hear?',
        options: ['할 수 있어요', '할 수 없어요', '못 해요', '하고 싶어요'],
        correct: 0,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 7.4: Please Do / Please Don't ──────────────────
  {
    id: 'u7-l4',
    title: 'Please Do / Please Don\'t',
    subtitle: '(으)세요 / 지 마세요',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Polite requests',
        content: 'To politely ask someone to do something, add (으)세요 to the verb stem. If the stem ends in a vowel, add 세요. If it ends in a consonant, add 으세요. This is like saying "please [verb]".',
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)세요 = "Please [verb]"',
        examples: [
          { kr: '앉으세요.', en: 'Please sit down.' },
          { kr: '오세요.', en: 'Please come.' },
          { kr: '드세요.', en: 'Please eat. (honorific)' },
          { kr: '보세요.', en: 'Please look.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Please DON\'T: 지 마세요',
        content: 'To say "Please don\'t [verb]", add 지 마세요 to the verb stem. This is very useful for warnings and requests: 걱정하지 마세요 = "Please don\'t worry."',
      },
      {
        type: 'pattern',
        title: 'Verb stem + 지 마세요 = "Please don\'t"',
        examples: [
          { kr: '걱정하지 마세요.', en: 'Please don\'t worry.' },
          { kr: '가지 마세요.', en: 'Please don\'t go.' },
          { kr: '만지지 마세요.', en: 'Please don\'t touch.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Requesting a favor: 해 주세요',
        content: 'To ask someone to do something FOR you, add 아/어 주세요 to the verb stem. This is softer and more of a request than a command.',
      },
      {
        type: 'pattern',
        title: 'Verb stem + 아/어 주세요 = "Please do ___ for me"',
        examples: [
          { kr: '사진 찍어 주세요.', en: 'Please take a photo (for me).' },
          { kr: '도와 주세요.', en: 'Please help me.' },
          { kr: '천천히 말해 주세요.', en: 'Please speak slowly (for me).' },
        ],
      },
    ],
    vocabulary: [
      { korean: '앉으세요', roman: 'anjeuseyo', english: 'Please sit down', audio: true },
      { korean: '오세요', roman: 'oseyo', english: 'Please come', audio: true },
      { korean: '걱정하지 마세요', roman: 'geokjeonghaji maseyo', english: 'Please don\'t worry', audio: true },
      { korean: '가지 마세요', roman: 'gaji maseyo', english: 'Please don\'t go', audio: true },
      { korean: '사진 찍어 주세요', roman: 'sajin jjigeo juseyo', english: 'Please take a photo for me', audio: true },
      { korean: '도와 주세요', roman: 'dowa juseyo', english: 'Please help me', audio: true },
      { korean: '천천히 말해 주세요', roman: 'cheoncheonhi malhae juseyo', english: 'Please speak slowly', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you politely say "Please sit down"?',
        options: ['앉아요', '앉으세요', '앉지 마세요', '앉고 싶어요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '"Please don\'t worry" is:',
        options: ['걱정하세요', '걱정하지 마세요', '걱정해 주세요', '걱정할 수 있어요'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Please take a photo for me."',
        tiles: ['사진', '찍어', '주세요'],
        correct: ['사진', '찍어', '주세요'],
        english: 'Please take a photo for me.',
      },
      {
        type: 'conversation',
        prompt: 'You want someone to speak more slowly. You say:',
        options: ['빨리 말하세요', '천천히 말해 주세요', '말하지 마세요', '말하고 싶어요'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the expression to its meaning',
        pairs: [
          { left: '오세요', right: 'Please come' },
          { left: '가지 마세요', right: 'Please don\'t go' },
          { left: '도와 주세요', right: 'Please help me' },
          { left: '앉으세요', right: 'Please sit down' },
        ],
      },
      {
        type: 'listening',
        audio: '걱정하지 마세요',
        prompt: 'What did you hear?',
        options: ['걱정하세요', '걱정하지 마세요', '걱정해 주세요', '걱정하고 싶어요'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 7.5: Because & If ──────────────────────────────
  {
    id: 'u7-l5',
    title: 'Because & If',
    subtitle: '아서/어서, (으)면',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Connecting reasons: because / so',
        content: 'To say "because" or "so", add 아서/어서 to the verb stem. Use 아서 when the last vowel of the stem is ㅏ or ㅗ (bright vowels), and 어서 for all other vowels. 하다 becomes 해서.',
      },
      {
        type: 'pattern',
        title: 'Verb stem + 아서/어서 = "because / so"',
        examples: [
          { kr: '배가 고파서 밥을 먹었어요.', en: 'Because I was hungry, I ate.' },
          { kr: '비가 와서 집에 있었어요.', en: 'Because it rained, I stayed home.' },
          { kr: '피곤해서 일찍 잤어요.', en: 'Because I was tired, I slept early.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Conditionals: if / when',
        content: 'To say "if" or "when (a condition is met)", add (으)면 to the verb stem. If the stem ends in a vowel, add 면. If it ends in a consonant, add 으면.',
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)면 = "if / when"',
        examples: [
          { kr: '시간이 있으면 만나요.', en: 'If you have time, let\'s meet.' },
          { kr: '비가 오면 집에 있을 거예요.', en: 'If it rains, I\'ll stay home.' },
          { kr: '한국에 가면 뭐 하고 싶어요?', en: 'If you go to Korea, what do you want to do?' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Building longer sentences',
        content: 'These connectors are how Korean sentences grow beyond simple statements. You\'ll hear 아서/어서 and (으)면 constantly in everyday Korean. Mastering them is a big step toward natural conversation!',
      },
    ],
    vocabulary: [
      { korean: '배가 고파서', roman: 'baega gopaseo', english: 'Because (I\'m) hungry', audio: true, example: { kr: '배가 고파서 밥을 먹었어요.', en: 'Because I was hungry, I ate.' } },
      { korean: '피곤해서', roman: 'pigonhaeseo', english: 'Because (I\'m) tired', audio: true, example: { kr: '피곤해서 쉬고 싶어요.', en: 'Because I\'m tired, I want to rest.' } },
      { korean: '시간이 있으면', roman: 'sigani isseumyeon', english: 'If (you) have time', audio: true, example: { kr: '시간이 있으면 같이 가요.', en: 'If you have time, let\'s go together.' } },
      { korean: '비가 오면', roman: 'biga omyeon', english: 'If it rains', audio: true },
      { korean: '배가 고프다', roman: 'baega gopeuda', english: 'To be hungry', audio: true },
      { korean: '피곤하다', roman: 'pigonhada', english: 'To be tired', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "Because I was hungry, I ate"?',
        options: ['배가 고프면 밥을 먹었어요', '배가 고파서 밥을 먹었어요', '배가 고프고 밥을 먹었어요', '배가 고파요 밥을 먹었어요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '"If you have time, let\'s meet" uses which connector?',
        options: ['아서/어서', '(으)면', '고', '지만'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '피곤___ 일찍 잤어요. (Because I was tired, I slept early)',
        options: ['하면', '해서', '하고', '해요'],
        correct: 1,
        hint: '하다 + 아서/어서 = 해서',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "If it rains, I\'ll stay home."',
        tiles: ['비가', '오면', '집에', '있을 거예요'],
        correct: ['비가', '오면', '집에', '있을 거예요'],
        english: 'If it rains, I\'ll stay home.',
      },
      {
        type: 'conversation',
        prompt: 'Someone asks why you didn\'t come to the party. You were tired. You say:',
        options: ['피곤하면 안 갔어요', '피곤해서 못 갔어요', '피곤하고 싶어요', '피곤하지 마세요'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the connector to its meaning',
        pairs: [
          { left: '아서/어서', right: 'Because / so' },
          { left: '(으)면', right: 'If / when' },
          { left: '고 싶어요', right: 'Want to' },
          { left: '(으)세요', right: 'Please do' },
        ],
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },
]

export default lessons
