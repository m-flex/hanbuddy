// Unit 15: Comparisons & More Grammar
// 3 lessons on comparisons, suggestions, and experiences

const lessons = [
  // ─── Lesson 15.1: Comparisons ─────────────────────────────
  {
    id: 'u15-l1',
    title: 'Comparisons',
    subtitle: 'More, less, most, same, and different',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Comparing things in Korean',
        content: 'Comparisons in Korean are actually simpler than in English. You don\'t need to change the adjective form (no "bigger" or "biggest"). Instead, you add a word BEFORE the adjective to show degree. The key words are 더 (more), 가장/제일 (most), 같다 (same), and 다르다 (different).',
      },
      {
        type: 'pattern',
        title: '더 = "more"',
        content: 'Put 더 before any adjective or verb to mean "more":',
        examples: [
          { kr: '더 크다', en: 'Bigger (more big)' },
          { kr: '더 좋아요', en: 'Better (more good)' },
          { kr: '더 빨라요', en: 'Faster (more fast)' },
          { kr: '커피를 더 마시고 싶어요.', en: 'I want to drink more coffee.' },
        ],
      },
      {
        type: 'pattern',
        title: 'A보다 B가 더... = "B is more... than A"',
        content: 'Use 보다 (than) after the thing you\'re comparing against. Notice: the LESSER thing comes first!',
        examples: [
          { kr: '여름보다 겨울이 더 좋아요.', en: 'I like winter more than summer.' },
          { kr: '커피보다 차가 더 좋아요.', en: 'I like tea more than coffee.' },
          { kr: '버스보다 지하철이 더 빨라요.', en: 'The subway is faster than the bus.' },
        ],
      },
      {
        type: 'pattern',
        title: '가장 / 제일 = "most / best"',
        content: '가장 is formal, 제일 is casual. Both mean "the most":',
        examples: [
          { kr: '제일 맛있어요.', en: 'It\'s the most delicious.' },
          { kr: '가장 좋아하는 음식이 뭐예요?', en: 'What is your favorite food? (the food you like the most)' },
          { kr: '한국에서 제일 큰 도시는 서울이에요.', en: 'The biggest city in Korea is Seoul.' },
        ],
      },
      {
        type: 'pattern',
        title: 'Same & different',
        content: 'Use 같다 for "same" and 다르다 for "different":',
        examples: [
          { kr: 'A하고 B가 같아요.', en: 'A and B are the same.' },
          { kr: 'A하고 B가 달라요.', en: 'A and B are different.' },
          { kr: '우리 나이가 같아요.', en: 'We\'re the same age.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Koreans love rankings!',
        content: 'Korean culture loves asking about favorites and rankings. "What\'s your #1 food?" (제일 좋아하는 음식?), "Who\'s the most popular?" (누가 제일 인기 있어요?) are very common conversation starters. Having a ready answer makes you sound natural!',
      },
    ],
    vocabulary: [
      { korean: '더', roman: 'deo', english: 'More', audio: true, example: { kr: '더 먹고 싶어요.', en: 'I want to eat more.' } },
      { korean: '보다', roman: 'boda', english: 'Than (comparison)', audio: true, example: { kr: '여름보다 겨울이 좋아요.', en: 'I like winter more than summer.' } },
      { korean: '가장', roman: 'gajang', english: 'The most (formal)', audio: true, example: { kr: '가장 좋아해요.', en: 'I like it the most.' } },
      { korean: '제일', roman: 'jeil', english: 'The most (casual)', audio: true, example: { kr: '제일 맛있어요.', en: 'It\'s the most delicious.' } },
      { korean: '같다', roman: 'gatda', english: 'To be the same', audio: true, example: { kr: '우리 나이가 같아요.', en: 'We\'re the same age.' } },
      { korean: '다르다', roman: 'dareuda', english: 'To be different', audio: true, example: { kr: '한국하고 일본은 달라요.', en: 'Korea and Japan are different.' } },
      { korean: '크다', roman: 'keuda', english: 'To be big', audio: true, example: { kr: '서울이 더 커요.', en: 'Seoul is bigger.' } },
      { korean: '빠르다', roman: 'ppareuda', english: 'To be fast', audio: true, example: { kr: '지하철이 더 빨라요.', en: 'The subway is faster.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does 더 mean when placed before an adjective?',
        options: ['Less', 'More', 'Very', 'Not'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I like winter more than summer."',
        tiles: ['더 좋아요', '겨울이', '여름보다'],
        correct: ['여름보다', '겨울이', '더 좋아요'],
        english: 'I like winter more than summer.',
      },
      {
        type: 'fill-blank',
        prompt: '커피___ 차가 더 좋아요. (I like tea more than coffee.)',
        options: ['하고', '보다', '에서', '까지'],
        correct: 1,
        hint: 'This particle means "than" in comparisons.',
      },
      {
        type: 'multiple-choice',
        prompt: 'How do you say "the most delicious" in casual Korean?',
        options: ['더 맛있어요', '가장 맛있어요', '제일 맛있어요', '많이 맛있어요'],
        correct: 2,
      },
      {
        type: 'matching',
        prompt: 'Match the comparison word',
        pairs: [
          { left: '더', right: 'More' },
          { left: '보다', right: 'Than' },
          { left: '제일', right: 'The most' },
          { left: '같다', right: 'Same' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'Someone asks your favorite food. You want to say "Bibimbap is the most delicious." You say:',
        options: ['비빔밥이 더 맛있어요.', '비빔밥이 제일 맛있어요.', '비빔밥하고 같아요.', '비빔밥보다 맛있어요.'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does "A하고 B가 달라요" mean?',
        options: ['A and B are the same', 'A and B are different', 'A is bigger than B', 'A is better than B'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 15.2: Suggestions ─────────────────────────────
  {
    id: 'u15-l2',
    title: 'Suggestions',
    subtitle: '"Shall we...?" and "Let\'s..."',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Making suggestions in Korean',
        content: 'Korean has several ways to suggest doing something together. The most common are (으)ㄹ까요? ("Shall we...?"), (으)ㅂ시다 ("Let\'s..." — slightly formal), and the casual 같이 ___요 ("Let\'s... together"). The ending you choose depends on how formal you want to be.',
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)ㄹ까요? = "Shall we...?"',
        content: 'This is the go-to way to make a polite suggestion or ask what someone wants to do. If the stem ends in a vowel, add ㄹ까요. If it ends in a consonant, add 을까요:',
        examples: [
          { kr: '갈까요?', en: 'Shall we go?' },
          { kr: '뭐 먹을까요?', en: 'What shall we eat?' },
          { kr: '어디에서 만날까요?', en: 'Where shall we meet?' },
          { kr: '커피 마실까요?', en: 'Shall we drink coffee?' },
        ],
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)ㅂ시다 = "Let\'s..." (formal)',
        content: 'This is a more decisive "let\'s do it." Common in group settings or slightly formal situations. If the stem ends in a vowel, add ㅂ시다. If consonant, add 읍시다:',
        examples: [
          { kr: '갑시다!', en: 'Let\'s go!' },
          { kr: '시작합시다.', en: 'Let\'s begin.' },
          { kr: '먹읍시다.', en: 'Let\'s eat.' },
        ],
      },
      {
        type: 'pattern',
        title: '같이 ___요 = Casual "Let\'s..."',
        content: 'The easiest and most casual way to suggest something. Just add 같이 (together) before the verb:',
        examples: [
          { kr: '같이 가요!', en: 'Let\'s go together!' },
          { kr: '같이 먹어요!', en: 'Let\'s eat together!' },
          { kr: '같이 공부해요!', en: 'Let\'s study together!' },
        ],
      },
      {
        type: 'example',
        title: 'Making weekend plans',
        content: 'Here\'s how suggestions sound in a natural conversation:',
        korean: '주말에 뭐 할까요?',
        breakdown: [
          { part: '주말에', role: '"On the weekend" — 주말 (weekend) + 에 (time particle)' },
          { part: '뭐', role: '"What"' },
          { part: '할까요?', role: '"Shall we do?" — 하다 (to do) + ㄹ까요 (suggestion ending)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Korean group culture',
        content: 'Koreans often make plans on the spot. 같이 밥 먹을까요? (Shall we eat together?) is a very common way to bond with coworkers or new friends. Saying yes to spontaneous meal invitations is a great way to build relationships in Korea!',
      },
    ],
    vocabulary: [
      { korean: '같이', roman: 'gachi', english: 'Together', audio: true, example: { kr: '같이 가요!', en: 'Let\'s go together!' } },
      { korean: '만나다', roman: 'mannada', english: 'To meet', audio: true, example: { kr: '어디에서 만날까요?', en: 'Where shall we meet?' } },
      { korean: '시작하다', roman: 'sijakhada', english: 'To start/begin', audio: true, example: { kr: '시작합시다!', en: 'Let\'s begin!' } },
      { korean: '주말', roman: 'jumal', english: 'Weekend', audio: true, example: { kr: '주말에 뭐 해요?', en: 'What are you doing on the weekend?' } },
      { korean: '영화', roman: 'yeonghwa', english: 'Movie', audio: true, example: { kr: '영화 볼까요?', en: 'Shall we watch a movie?' } },
      { korean: '산책하다', roman: 'sanchekhada', english: 'To take a walk', audio: true, example: { kr: '같이 산책해요!', en: 'Let\'s take a walk together!' } },
      { korean: '놀다', roman: 'nolda', english: 'To hang out / play', audio: true, example: { kr: '주말에 같이 놀까요?', en: 'Shall we hang out this weekend?' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "Shall we go?" in Korean?',
        options: ['가요?', '갈까요?', '갑시다!', '같이 가!'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '뭐 ___? (What shall we eat?)',
        options: ['먹어요', '먹을까요', '먹읍시다', '먹었어요'],
        correct: 1,
        hint: 'Use the "shall we" suggestion ending.',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Let\'s study together!"',
        tiles: ['공부해요!', '같이'],
        correct: ['같이', '공부해요!'],
        english: 'Let\'s study together!',
      },
      {
        type: 'matching',
        prompt: 'Match the suggestion style to its meaning',
        pairs: [
          { left: '갈까요?', right: 'Shall we go?' },
          { left: '갑시다!', right: 'Let\'s go! (formal)' },
          { left: '같이 가요!', right: 'Let\'s go together! (casual)' },
          { left: '뭐 할까요?', right: 'What shall we do?' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'A friend asks what to do this weekend. You want to suggest watching a movie. You say:',
        options: ['영화 봤어요.', '영화 볼까요?', '영화 좋아해요.', '영화 있어요?'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Which ending is more formal: (으)ㄹ까요 or (으)ㅂ시다?',
        options: ['(으)ㄹ까요 is more formal', '(으)ㅂ시다 is more formal', 'They are the same', 'Neither is formal'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 15.3: Experience ──────────────────────────────
  {
    id: 'u15-l3',
    title: 'Talking About Experience',
    subtitle: '"Have you ever...?"',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Expressing past experience in Korean',
        content: 'In English we say "I have done X before" or "Have you ever...?" Korean uses the grammar pattern (으)ㄴ 적이 있다/없다. Think of 적 as meaning "an occasion" or "a time." So literally: "A time of doing X exists (or doesn\'t exist)."',
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)ㄴ 적이 있어요 = "I have [done] before"',
        content: 'For verbs ending in a vowel, add ㄴ 적이. For consonants, add 은 적이. Then 있어요 (exists) or 없어요 (doesn\'t exist):',
        examples: [
          { kr: '한국에 간 적이 있어요.', en: 'I\'ve been to Korea before.' },
          { kr: '김치를 먹은 적이 있어요.', en: 'I\'ve eaten kimchi before.' },
          { kr: '한국 영화를 본 적이 있어요.', en: 'I\'ve watched a Korean movie before.' },
        ],
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)ㄴ 적이 없어요 = "I have never [done]"',
        content: 'Just swap 있어요 with 없어요 to say you\'ve NEVER done something:',
        examples: [
          { kr: '한국어를 배운 적이 없어요.', en: 'I\'ve never learned Korean.' },
          { kr: '비행기를 탄 적이 없어요.', en: 'I\'ve never ridden an airplane.' },
          { kr: '스키를 탄 적이 없어요.', en: 'I\'ve never been skiing.' },
        ],
      },
      {
        type: 'example',
        title: 'Breaking down the pattern',
        content: 'Let\'s see exactly how this grammar works:',
        korean: '김치를 먹은 적이 있어요.',
        breakdown: [
          { part: '김치를', role: '"Kimchi" + object particle' },
          { part: '먹은', role: '"Ate / eaten" — past modifier form of 먹다 (to eat)' },
          { part: '적이', role: '"An occasion / time" + subject particle' },
          { part: '있어요', role: '"Exists" — meaning the experience exists' },
        ],
      },
      {
        type: 'pattern',
        title: 'Asking about experience',
        content: 'To ask "Have you ever...?" just add a question mark and raise your intonation:',
        examples: [
          { kr: '한국에 간 적이 있어요?', en: 'Have you ever been to Korea?' },
          { kr: '매운 음식을 먹은 적이 있어요?', en: 'Have you ever eaten spicy food?' },
          { kr: '한국어 노래를 들은 적이 있어요?', en: 'Have you ever listened to a Korean song?' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Sharing experiences builds bonds',
        content: 'Koreans love asking about your experiences with Korean culture. "Have you tried kimchi?" "Have you been to Korea?" "Have you watched a K-drama?" These questions are conversation starters. Even if you haven\'t, saying 아직 없어요. 해 보고 싶어요! (Not yet. I want to try!) shows enthusiasm and earns bonus points.',
      },
    ],
    vocabulary: [
      { korean: '적', roman: 'jeok', english: 'An occasion / time (experience)', audio: true, example: { kr: '간 적이 있어요.', en: 'I\'ve been there before.' } },
      { korean: '가다 → 간', roman: 'gada → gan', english: 'Go → gone (past modifier)', audio: true, example: { kr: '한국에 간 적이 있어요.', en: 'I\'ve been to Korea.' } },
      { korean: '먹다 → 먹은', roman: 'meokda → meogeun', english: 'Eat → eaten (past modifier)', audio: true, example: { kr: '먹은 적이 있어요.', en: 'I\'ve eaten it before.' } },
      { korean: '보다 → 본', roman: 'boda → bon', english: 'See/watch → seen (past modifier)', audio: true, example: { kr: '본 적이 있어요.', en: 'I\'ve seen/watched it before.' } },
      { korean: '배우다 → 배운', roman: 'baeuda → baeun', english: 'Learn → learned (past modifier)', audio: true, example: { kr: '배운 적이 없어요.', en: 'I\'ve never learned it.' } },
      { korean: '타다 → 탄', roman: 'tada → tan', english: 'Ride → ridden (past modifier)', audio: true, example: { kr: '비행기를 탄 적이 있어요.', en: 'I\'ve ridden an airplane.' } },
      { korean: '듣다 → 들은', roman: 'deutda → deureun', english: 'Listen → listened (past modifier)', audio: true, example: { kr: '들은 적이 있어요.', en: 'I\'ve heard/listened before.' } },
      { korean: '아직', roman: 'ajik', english: 'Not yet / still', audio: true, example: { kr: '아직 없어요.', en: 'Not yet.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does "한국에 간 적이 있어요" mean?',
        options: ['I\'m going to Korea', 'I\'ve been to Korea before', 'I want to go to Korea', 'I live in Korea'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '김치를 ___ 적이 있어요. (I\'ve eaten kimchi before.)',
        options: ['먹은', '먹는', '먹을', '먹고'],
        correct: 0,
        hint: 'Use the past modifier form of 먹다.',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I\'ve never learned Korean."',
        tiles: ['적이', '한국어를', '없어요', '배운'],
        correct: ['한국어를', '배운', '적이', '없어요'],
        english: 'I\'ve never learned Korean.',
      },
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I have never ridden an airplane"?',
        options: ['비행기를 탄 적이 있어요.', '비행기를 탄 적이 없어요.', '비행기를 타고 싶어요.', '비행기를 탔어요.'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the experience phrase',
        pairs: [
          { left: '간 적이 있어요', right: 'I\'ve been (gone) before' },
          { left: '먹은 적이 없어요', right: 'I\'ve never eaten' },
          { left: '본 적이 있어요', right: 'I\'ve seen/watched before' },
          { left: '배운 적이 없어요', right: 'I\'ve never learned' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'A Korean friend asks "한국 음식을 먹은 적이 있어요?" You have tried it. You respond:',
        options: ['아니요, 없어요.', '네, 먹은 적이 있어요!', '먹고 싶어요.', '몰라요.'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Someone asks if you\'ve ever been to Japan. You haven\'t. You say:',
        options: ['일본에 간 적이 있어요.', '일본에 가고 싶어요.', '일본에 간 적이 없어요.', '일본에 갔어요.'],
        correct: 2,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
