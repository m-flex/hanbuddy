// Unit 8: Past & Future Tense
// 3 lessons on expressing past, future, and ongoing actions

const lessons = [
  // ─── Lesson 8.1: Past Tense ─────────────────────────────────
  {
    id: 'u8-l1',
    title: 'Past Tense',
    subtitle: '았/었/했',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Talking about the past',
        content: 'To make past tense in Korean, add 았/었 to the verb stem, then the ending (어요, 습니다, etc.). Use 았 when the last vowel of the stem is ㅏ or ㅗ (bright vowels). Use 었 for all other vowels. 하다 always becomes 했.',
      },
      {
        type: 'breakdown',
        title: 'Past tense conjugation',
        items: [
          { char: '가다 → 갔어요', roman: 'gada → gasseoyo', sound: 'went', mnemonic: '가 (ㅏ = bright) + 았어요 → 갔어요' },
          { char: '먹다 → 먹었어요', roman: 'meokda → meogeosseoyo', sound: 'ate', mnemonic: '먹 (ㅓ = not bright) + 었어요 → 먹었어요' },
          { char: '하다 → 했어요', roman: 'hada → haesseoyo', sound: 'did', mnemonic: '하 + 였어요 contracts to 했어요' },
          { char: '보다 → 봤어요', roman: 'boda → bwasseoyo', sound: 'saw', mnemonic: '보 (ㅗ = bright) + 았어요 → 봤어요' },
          { char: '마시다 → 마셨어요', roman: 'masida → masyeosseoyo', sound: 'drank', mnemonic: '마시 + 었어요 → 마셨어요' },
        ],
      },
      {
        type: 'explanation',
        title: 'The bright/dark vowel rule',
        content: 'This is the same ㅏ/ㅗ rule you\'ll see throughout Korean conjugation. If the last vowel of the stem is ㅏ or ㅗ → use 아 variants. Everything else → use 어 variants. 하다 is always special → 해.',
      },
      {
        type: 'pattern',
        title: 'Practice: What did you do yesterday?',
        examples: [
          { kr: '어제 뭐 했어요?', en: 'What did you do yesterday?' },
          { kr: '영화를 봤어요.', en: 'I watched a movie.' },
          { kr: '친구를 만났어요.', en: 'I met a friend.' },
          { kr: '커피를 마셨어요.', en: 'I drank coffee.' },
        ],
      },
    ],
    vocabulary: [
      { korean: '갔어요', roman: 'gasseoyo', english: 'Went', audio: true, example: { kr: '학교에 갔어요.', en: 'I went to school.' } },
      { korean: '먹었어요', roman: 'meogeosseoyo', english: 'Ate', audio: true, example: { kr: '밥을 먹었어요.', en: 'I ate a meal.' } },
      { korean: '했어요', roman: 'haesseoyo', english: 'Did', audio: true, example: { kr: '운동했어요.', en: 'I exercised.' } },
      { korean: '봤어요', roman: 'bwasseoyo', english: 'Saw / watched', audio: true, example: { kr: '영화를 봤어요.', en: 'I watched a movie.' } },
      { korean: '마셨어요', roman: 'masyeosseoyo', english: 'Drank', audio: true },
      { korean: '만났어요', roman: 'mannasseoyo', english: 'Met', audio: true, example: { kr: '친구를 만났어요.', en: 'I met a friend.' } },
      { korean: '어제', roman: 'eoje', english: 'Yesterday', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What is the past tense of 가다 (to go)?',
        options: ['가요', '갔어요', '갈 거예요', '가고 있어요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '먹다 uses 었 (not 았) because...',
        options: ['먹 ends in a consonant', 'The last vowel ㅓ is not ㅏ or ㅗ', '먹다 is irregular', 'It\'s a food verb'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '어제 영화를 ___. (I watched a movie yesterday)',
        options: ['봐요', '봤어요', '볼 거예요', '보고 있어요'],
        correct: 1,
        hint: '보다 → past tense',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "What did you do yesterday?"',
        tiles: ['어제', '뭐', '했어요?'],
        correct: ['어제', '뭐', '했어요?'],
        english: 'What did you do yesterday?',
      },
      {
        type: 'matching',
        prompt: 'Match the verb to its past tense',
        pairs: [
          { left: '가다 (go)', right: '갔어요' },
          { left: '먹다 (eat)', right: '먹었어요' },
          { left: '하다 (do)', right: '했어요' },
          { left: '보다 (see)', right: '봤어요' },
        ],
      },
      {
        type: 'listening',
        audio: '어제 뭐 했어요?',
        prompt: 'What did you hear?',
        options: ['어제 뭐 했어요?', '오늘 뭐 해요?', '내일 뭐 할 거예요?', '뭐 하고 있어요?'],
        correct: 0,
      },
      {
        type: 'conversation',
        prompt: 'Someone asks "어제 뭐 했어요?" You met a friend. You reply:',
        options: ['친구를 만나요', '친구를 만났어요', '친구를 만날 거예요', '친구를 만나고 싶어요'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 8.2: Future Tense & Plans ───────────────────────
  {
    id: 'u8-l2',
    title: 'Future Tense & Plans',
    subtitle: '(으)ㄹ 거예요',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Talking about the future',
        content: 'To say "I will" or "I\'m going to", add (으)ㄹ 거예요 to the verb stem. If the stem ends in a vowel, add ㄹ 거예요. If it ends in a consonant, add 을 거예요. This expresses plans and intentions.',
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)ㄹ 거예요 = "I will / going to"',
        examples: [
          { kr: '갈 거예요.', en: 'I\'m going to go.' },
          { kr: '먹을 거예요.', en: 'I\'m going to eat.' },
          { kr: '공부할 거예요.', en: 'I\'m going to study.' },
          { kr: '내일 뭐 할 거예요?', en: 'What are you going to do tomorrow?' },
        ],
      },
      {
        type: 'explanation',
        title: 'Immediate intention: 겠',
        content: 'The ending 겠 expresses immediate intention, willingness, or conjecture. You\'ll hear it in set phrases that are very common in daily Korean:',
      },
      {
        type: 'breakdown',
        title: 'Common 겠 expressions',
        items: [
          { char: '알겠습니다', roman: 'algesseumnida', sound: 'I understand / Got it', mnemonic: 'Shows you\'ve just understood something' },
          { char: '잘 먹겠습니다', roman: 'jal meokgesseumnida', sound: 'I will eat well (before eating)', mnemonic: 'Said before a meal — shows gratitude for the food' },
          { char: '가겠습니다', roman: 'gagesseumnida', sound: 'I will go (right now)', mnemonic: 'Announcing your immediate departure' },
        ],
      },
      {
        type: 'cultural-note',
        title: '잘 먹겠습니다 — before every meal!',
        content: 'Koreans say 잘 먹겠습니다 before eating and 잘 먹었습니다 after eating. The first means "I will eat well" (gratitude before), and the second means "I ate well" (gratitude after). Especially important when someone treats you!',
      },
    ],
    vocabulary: [
      { korean: '갈 거예요', roman: 'gal geoyeyo', english: 'I\'m going to go', audio: true, example: { kr: '내일 학교에 갈 거예요.', en: 'I\'m going to go to school tomorrow.' } },
      { korean: '먹을 거예요', roman: 'meogeul geoyeyo', english: 'I\'m going to eat', audio: true },
      { korean: '공부할 거예요', roman: 'gongbuhal geoyeyo', english: 'I\'m going to study', audio: true, example: { kr: '오늘 한국어 공부할 거예요.', en: 'I\'m going to study Korean today.' } },
      { korean: '알겠습니다', roman: 'algesseumnida', english: 'I understand / Got it', audio: true },
      { korean: '잘 먹겠습니다', roman: 'jal meokgesseumnida', english: 'I will eat well (before eating)', audio: true },
      { korean: '잘 먹었습니다', roman: 'jal meogeosseumnida', english: 'I ate well (after eating)', audio: true },
      { korean: '내일', roman: 'naeil', english: 'Tomorrow', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I\'m going to go"?',
        options: ['갔어요', '가고 있어요', '갈 거예요', '가고 싶어요'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '내일 한국어 공부___ 거예요. (I\'m going to study Korean tomorrow)',
        options: ['할', '했', '하는', '하고'],
        correct: 0,
        hint: '하다 → stem 하 ends in vowel → add ㄹ',
      },
      {
        type: 'multiple-choice',
        prompt: 'What do you say BEFORE a meal in Korean?',
        options: ['잘 먹었습니다', '잘 먹겠습니다', '감사합니다', '맛있어요'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "What are you going to do tomorrow?"',
        tiles: ['내일', '뭐', '할 거예요?'],
        correct: ['내일', '뭐', '할 거예요?'],
        english: 'What are you going to do tomorrow?',
      },
      {
        type: 'matching',
        prompt: 'Match the tense to the correct form of 가다',
        pairs: [
          { left: 'Past', right: '갔어요' },
          { left: 'Present', right: '가요' },
          { left: 'Future', right: '갈 거예요' },
          { left: 'Want to', right: '가고 싶어요' },
        ],
      },
      {
        type: 'listening',
        audio: '잘 먹겠습니다',
        prompt: 'When is this expression used?',
        options: ['After eating', 'Before eating', 'When ordering', 'When leaving a restaurant'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 8.3: Progressive & Ongoing Actions ──────────────
  {
    id: 'u8-l3',
    title: 'Progressive & Ongoing Actions',
    subtitle: 'Verb stem + 고 있다',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'What are you doing right now?',
        content: 'To say "I am [verb]-ing" (an action in progress), add 고 있어요 to the verb stem. This is similar to English present progressive: 먹다 → 먹고 있어요 = "I am eating."',
      },
      {
        type: 'pattern',
        title: 'Verb stem + 고 있어요 = "I am [verb]-ing"',
        examples: [
          { kr: '먹고 있어요.', en: 'I am eating.' },
          { kr: '공부하고 있어요.', en: 'I am studying.' },
          { kr: '일하고 있어요.', en: 'I am working.' },
          { kr: '기다리고 있어요.', en: 'I am waiting.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Asking what someone is doing',
        content: 'The most common question with this pattern: 뭐 하고 있어요? = "What are you doing?" You\'ll hear this constantly in Korean daily life and phone calls.',
      },
      {
        type: 'example',
        title: 'A common conversation',
        korean: '뭐 하고 있어요? — 한국어 공부하고 있어요.',
        breakdown: [
          { part: '뭐 하고 있어요?', role: 'What are you doing?' },
          { part: '한국어 공부하고 있어요.', role: 'I\'m studying Korean.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Ongoing states',
        content: 'Some verbs use 고 있다 to describe ongoing states rather than actions in progress. For example: 알고 있어요 = "I know (and continue to know)" rather than "I am knowing."',
      },
      {
        type: 'pattern',
        title: 'Ongoing states with 고 있다',
        examples: [
          { kr: '알고 있어요.', en: 'I know (that). / I\'m aware.' },
          { kr: '살고 있어요.', en: 'I am living (in a place).' },
          { kr: '서울에 살고 있어요.', en: 'I\'m living in Seoul.' },
        ],
      },
    ],
    vocabulary: [
      { korean: '먹고 있어요', roman: 'meokgo isseoyo', english: 'I am eating', audio: true },
      { korean: '공부하고 있어요', roman: 'gongbuhago isseoyo', english: 'I am studying', audio: true, example: { kr: '지금 공부하고 있어요.', en: 'I\'m studying right now.' } },
      { korean: '일하고 있어요', roman: 'ilhago isseoyo', english: 'I am working', audio: true },
      { korean: '기다리고 있어요', roman: 'gidarigo isseoyo', english: 'I am waiting', audio: true, example: { kr: '버스를 기다리고 있어요.', en: 'I\'m waiting for the bus.' } },
      { korean: '알고 있어요', roman: 'algo isseoyo', english: 'I know / I\'m aware', audio: true },
      { korean: '살고 있어요', roman: 'salgo isseoyo', english: 'I am living (in)', audio: true, example: { kr: '서울에 살고 있어요.', en: 'I\'m living in Seoul.' } },
      { korean: '지금', roman: 'jigeum', english: 'Now / right now', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I am eating"?',
        options: ['먹었어요', '먹을 거예요', '먹고 있어요', '먹고 싶어요'],
        correct: 2,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "What are you doing?"',
        tiles: ['뭐', '하고', '있어요?'],
        correct: ['뭐', '하고', '있어요?'],
        english: 'What are you doing?',
      },
      {
        type: 'fill-blank',
        prompt: '지금 한국어 ___하고 있어요. (I\'m studying Korean right now)',
        options: ['공부', '운동', '일', '요리'],
        correct: 0,
        hint: '공부하다 = to study',
      },
      {
        type: 'conversation',
        prompt: 'A friend calls and asks "뭐 하고 있어요?" You are studying. You reply:',
        options: ['공부했어요', '공부할 거예요', '공부하고 있어요', '공부하고 싶어요'],
        correct: 2,
      },
      {
        type: 'matching',
        prompt: 'Match each form of 먹다 to its meaning',
        pairs: [
          { left: '먹었어요', right: 'Ate (past)' },
          { left: '먹고 있어요', right: 'Am eating (progressive)' },
          { left: '먹을 거예요', right: 'Will eat (future)' },
          { left: '먹고 싶어요', right: 'Want to eat' },
        ],
      },
      {
        type: 'listening',
        audio: '뭐 하고 있어요?',
        prompt: 'What did you hear?',
        options: ['뭐 했어요?', '뭐 하고 있어요?', '뭐 할 거예요?', '뭐 하고 싶어요?'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '알고 있어요 means:',
        options: ['I am knowing (in progress)', 'I know / I\'m aware (ongoing state)', 'I knew', 'I will know'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
