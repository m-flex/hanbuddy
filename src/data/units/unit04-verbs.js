// Unit 4: Essential Verbs
// 5 lessons on how Korean verbs work, key verbs, and negation

const lessons = [
  // ─── Lesson 4.1: How Korean Verbs Work ─────────────────
  {
    id: 'u4-l1',
    title: 'How Korean Verbs Work',
    subtitle: 'Dictionary form, stems & conjugation',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Every verb ends in 다',
        content: 'Every Korean verb has a DICTIONARY FORM ending in 다. To conjugate a verb, remove 다 to get the STEM, then add endings. This is the foundation of all Korean grammar!',
      },
      {
        type: 'example',
        title: 'From dictionary to conversation',
        korean: '먹다 → 먹어요 / 먹습니다',
        breakdown: [
          { part: '먹다', role: 'Dictionary form (to eat)' },
          { part: '먹', role: 'Stem (remove 다)' },
          { part: '먹어요', role: 'Polite form (what you\'ll use 90% of the time)' },
          { part: '먹습니다', role: 'Formal form (news, speeches, military)' },
        ],
      },
      {
        type: 'example',
        title: 'Another example',
        korean: '가다 → 가요 / 갑니다',
        breakdown: [
          { part: '가다', role: 'Dictionary form (to go)' },
          { part: '가', role: 'Stem (remove 다)' },
          { part: '가요', role: 'Polite form' },
          { part: '갑니다', role: 'Formal form' },
        ],
      },
      {
        type: 'explanation',
        title: 'The 아요/어요 rule',
        content: 'For the polite form (-아요/어요), look at the stem\'s LAST VOWEL:\n\n• If it\'s ㅏ or ㅗ → add 아요 (bright vowels!)\n• Otherwise → add 어요\n• Special: 하다 → 해요 (always)\n\nThis is the vowel harmony rule from Lesson 1.2 in action!',
      },
    ],
    vocabulary: [
      { korean: '가다', roman: 'gada', english: 'To go', audio: true, example: { kr: '학교에 가요.', en: 'I go to school.' } },
      { korean: '오다', roman: 'oda', english: 'To come', audio: true, example: { kr: '여기로 오세요.', en: 'Please come here.' } },
      { korean: '먹다', roman: 'meokda', english: 'To eat', audio: true, example: { kr: '밥을 먹어요.', en: 'I eat rice/a meal.' } },
      { korean: '마시다', roman: 'masida', english: 'To drink', audio: true, example: { kr: '커피를 마셔요.', en: 'I drink coffee.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What do you remove from a Korean verb to get the stem?',
        options: ['요', '다', '아요', '니다'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'The stem of 먹다 is:',
        options: ['먹다', '먹', '먹어', '먹요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '가다 → 가요. Why is it 아요 (not 어요)?',
        options: [
          'Because 가 is short',
          'Because the stem\'s last vowel is ㅏ (a bright vowel)',
          'Because it\'s irregular',
          'Because it ends in a vowel',
        ],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '먹다 → 먹___',
        options: ['아요', '어요', '해요', '요'],
        correct: 1,
        hint: 'The stem 먹 has the vowel ㅓ — not ㅏ or ㅗ',
      },
      {
        type: 'multiple-choice',
        prompt: '하다 conjugates to which polite form?',
        options: ['하아요', '하어요', '해요', '하요'],
        correct: 2,
      },
      {
        type: 'matching',
        prompt: 'Match the dictionary form to its polite form',
        pairs: [
          { left: '가다', right: '가요' },
          { left: '오다', right: '와요' },
          { left: '먹다', right: '먹어요' },
          { left: '마시다', right: '마셔요' },
        ],
      },
      {
        type: 'listening',
        audio: '먹어요',
        prompt: 'What does this mean?',
        options: ['I go', 'I eat', 'I drink', 'I come'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 4.2: Existence & Possession (있다/없다) ────
  {
    id: 'u4-l2',
    title: 'Existence & Possession',
    subtitle: '있다 and 없다',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'The most important word: 있다',
        content: '있다 (itda) is one of the most important words in Korean. It means BOTH "to exist" and "to have." The context makes the meaning clear. Its polite form is 있어요.',
      },
      {
        type: 'example',
        title: '있다 = "to have"',
        korean: '시간이 있어요.',
        breakdown: [
          { part: '시간이', role: 'Time + subject marker' },
          { part: '있어요', role: 'Exists / I have' },
        ],
      },
      {
        type: 'example',
        title: '있다 = "to exist / to be (somewhere)"',
        korean: '여기에 있어요.',
        breakdown: [
          { part: '여기에', role: 'Here + location marker' },
          { part: '있어요', role: 'It exists / It\'s here' },
        ],
      },
      {
        type: 'explanation',
        title: 'The opposite: 없다',
        content: '없다 (eopda) is the opposite of 있다. It means "doesn\'t exist" / "don\'t have." Polite form: 없어요.\n\n돈이 없어요 = I don\'t have money (lit: money doesn\'t exist)',
      },
      {
        type: 'cultural-note',
        title: 'Bonus: noun + 있다/없다 = adjective!',
        content: 'Attach 있다 or 없다 to a noun to create adjectives:\n• 맛 (taste) + 있다 = 맛있다 (delicious — "taste exists")\n• 맛 (taste) + 없다 = 맛없다 (not delicious — "taste doesn\'t exist")\n• 재미 (fun) + 있다 = 재미있다 (fun/interesting)',
      },
    ],
    vocabulary: [
      { korean: '있다', roman: 'itda', english: 'To exist / to have', audio: true, example: { kr: '시간이 있어요.', en: 'I have time.' } },
      { korean: '없다', roman: 'eopda', english: 'To not exist / to not have', audio: true, example: { kr: '돈이 없어요.', en: 'I don\'t have money.' } },
      { korean: '시간', roman: 'sigan', english: 'Time', audio: true },
      { korean: '돈', roman: 'don', english: 'Money', audio: true },
      { korean: '맛있다', roman: 'masitda', english: 'Delicious (taste exists)', audio: true, example: { kr: '이거 맛있어요!', en: 'This is delicious!' } },
      { korean: '맛없다', roman: 'maeopda', english: 'Not delicious (taste doesn\'t exist)', audio: true },
      { korean: '재미있다', roman: 'jaemiitda', english: 'Fun / Interesting', audio: true, example: { kr: '한국어가 재미있어요.', en: 'Korean is fun.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: '있다 can mean both:',
        options: [
          '"To go" and "to come"',
          '"To exist" and "to have"',
          '"To eat" and "to drink"',
          '"To know" and "to understand"',
        ],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What is the opposite of 있다?',
        options: ['가다', '오다', '없다', '하다'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: '"돈이 없어요" means:',
        options: ['I have money', 'I don\'t have money', 'I need money', 'Where is the money?'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '맛 + 있다 = 맛있다. This means:',
        options: ['Expensive', 'Delicious', 'Big', 'Beautiful'],
        correct: 1,
        hint: '맛 means "taste" and 있다 means "exists"',
      },
      {
        type: 'conversation',
        prompt: 'A friend asks if you have time. You DO have time. You say:',
        options: ['시간이 없어요', '시간이 있어요', '시간이 가요', '시간이 먹어요'],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '있어요',
        prompt: 'What did you hear?',
        options: ['있어요 (exists/have)', '없어요 (doesn\'t exist)', '가요 (go)', '와요 (come)'],
        correct: 0,
      },
      {
        type: 'matching',
        prompt: 'Match Korean to English',
        pairs: [
          { left: '있어요', right: 'Have / Exists' },
          { left: '없어요', right: 'Don\'t have / Doesn\'t exist' },
          { left: '맛있어요', right: 'It\'s delicious' },
          { left: '재미있어요', right: 'It\'s fun' },
        ],
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 4.3: The Magic of 하다 ─────────────────────
  {
    id: 'u4-l3',
    title: 'The Magic of 하다',
    subtitle: 'The verb that creates hundreds more',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: '하다 = "to do" (and so much more)',
        content: '하다 means "to do" but it\'s secretly the most powerful verb in Korean. Attach it to nouns to create HUNDREDS of verbs. Once you learn this pattern, your vocabulary explodes!',
      },
      {
        type: 'breakdown',
        title: 'Noun + 하다 = Verb',
        items: [
          { char: '공부하다', roman: 'gongbuhada', sound: 'To study', mnemonic: '공부 (study) + 하다 (do)' },
          { char: '운동하다', roman: 'undonghada', sound: 'To exercise', mnemonic: '운동 (exercise) + 하다 (do)' },
          { char: '요리하다', roman: 'yorihada', sound: 'To cook', mnemonic: '요리 (cooking) + 하다 (do)' },
          { char: '일하다', roman: 'ilhada', sound: 'To work', mnemonic: '일 (work) + 하다 (do)' },
          { char: '전화하다', roman: 'jeonhwahada', sound: 'To make a phone call', mnemonic: '전화 (phone call) + 하다 (do)' },
        ],
      },
      {
        type: 'explanation',
        title: 'Conjugation',
        content: '하다 always conjugates the same way:\n• Polite: 해요 (haeyo)\n• Formal: 합니다 (hamnida)\n\nSo: 공부하다 → 공부해요 (I study), 운동하다 → 운동해요 (I exercise). Easy!',
      },
      {
        type: 'pattern',
        title: 'Noun + 해요 in sentences',
        examples: [
          { kr: '한국어를 공부해요.', en: 'I study Korean.' },
          { kr: '매일 운동해요.', en: 'I exercise every day.' },
          { kr: '저녁을 요리해요.', en: 'I cook dinner.' },
          { kr: '엄마한테 전화해요.', en: 'I call mom.' },
        ],
      },
    ],
    vocabulary: [
      { korean: '하다', roman: 'hada', english: 'To do', audio: true, example: { kr: '뭐 해요?', en: 'What are you doing?' } },
      { korean: '공부하다', roman: 'gongbuhada', english: 'To study', audio: true, example: { kr: '한국어를 공부해요.', en: 'I study Korean.' } },
      { korean: '운동하다', roman: 'undonghada', english: 'To exercise', audio: true, example: { kr: '매일 운동해요.', en: 'I exercise every day.' } },
      { korean: '요리하다', roman: 'yorihada', english: 'To cook', audio: true, example: { kr: '저녁을 요리해요.', en: 'I cook dinner.' } },
      { korean: '일하다', roman: 'ilhada', english: 'To work', audio: true, example: { kr: '회사에서 일해요.', en: 'I work at a company.' } },
      { korean: '전화하다', roman: 'jeonhwahada', english: 'To make a phone call', audio: true, example: { kr: '친구한테 전화해요.', en: 'I call a friend.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does 하다 mean?',
        options: ['To go', 'To be', 'To do', 'To have'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: '공부 (study) + 하다 (do) = ?',
        options: ['To teach', 'To study', 'To read', 'To learn'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '하다 → ___ (polite form)',
        options: ['하요', '하아요', '해요', '하어요'],
        correct: 2,
        hint: '하다 is a special case — it doesn\'t follow the normal 아요/어요 rule',
      },
      {
        type: 'matching',
        prompt: 'Match noun + 하다 to its meaning',
        pairs: [
          { left: '공부하다', right: 'To study' },
          { left: '운동하다', right: 'To exercise' },
          { left: '요리하다', right: 'To cook' },
          { left: '전화하다', right: 'To phone/call' },
        ],
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I study Korean."',
        tiles: ['한국어를', '공부해요'],
        correct: ['한국어를', '공부해요'],
        english: 'I study Korean.',
      },
      {
        type: 'listening',
        audio: '운동해요',
        prompt: 'What does this mean?',
        options: ['I study', 'I exercise', 'I cook', 'I work'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Why is 하다 called "the most powerful verb"?',
        options: [
          'It\'s the most common verb',
          'You attach it to nouns to create hundreds of verbs',
          'It\'s the easiest to pronounce',
          'It means everything',
        ],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 4.4: More Essential Verbs ──────────────────
  {
    id: 'u4-l4',
    title: 'More Essential Verbs',
    subtitle: 'See, read, write, listen & more',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'breakdown',
        title: 'Essential Verbs',
        items: [
          { char: '보다', roman: 'boda', sound: 'To see / watch', mnemonic: 'Stem: 보 (ㅗ = bright) → 봐요 (polite)' },
          { char: '읽다', roman: 'ikda', sound: 'To read', mnemonic: 'Stem: 읽 → 읽어요 (polite)' },
          { char: '쓰다', roman: 'sseuda', sound: 'To write', mnemonic: 'Stem: 쓰 → 써요 (ㅡ drops, add 어요)' },
          { char: '듣다', roman: 'deutda', sound: 'To listen', mnemonic: 'ㄷ-irregular! 듣 → 들 before a vowel → 들어요' },
          { char: '말하다', roman: 'malhada', sound: 'To speak', mnemonic: 'It\'s a 하다 verb! → 말해요' },
          { char: '사다', roman: 'sada', sound: 'To buy', mnemonic: 'Stem: 사 (ㅏ = bright) → 사요' },
          { char: '알다', roman: 'alda', sound: 'To know', mnemonic: 'Stem: 알 → 알아요' },
          { char: '모르다', roman: 'moreuda', sound: 'To not know', mnemonic: 'ㅡ drops! 모르 → 몰라요 (irregular)' },
        ],
      },
      {
        type: 'explanation',
        title: 'Watch out: Irregular verbs!',
        content: 'Most Korean verbs follow the rules, but a few are irregular:\n\n• 듣다 (listen): The ㄷ changes to ㄹ before a vowel ending → 들어요 (not 듣어요)\n• 모르다 (not know): The ㅡ drops and ㄹ doubles → 몰라요 (not 모르어요)\n\nDon\'t worry about memorizing rules — just learn these forms as vocabulary!',
      },
      {
        type: 'example',
        title: 'In sentences',
        korean: '영화를 봐요. 책을 읽어요.',
        breakdown: [
          { part: '영화를 봐요', role: 'I watch a movie' },
          { part: '책을 읽어요', role: 'I read a book' },
          { part: '음악을 들어요', role: 'I listen to music' },
          { part: '한국어를 몰라요', role: 'I don\'t know Korean' },
        ],
      },
    ],
    vocabulary: [
      { korean: '보다', roman: 'boda', english: 'To see / watch', audio: true, example: { kr: '영화를 봐요.', en: 'I watch a movie.' } },
      { korean: '읽다', roman: 'ikda', english: 'To read', audio: true, example: { kr: '책을 읽어요.', en: 'I read a book.' } },
      { korean: '쓰다', roman: 'sseuda', english: 'To write', audio: true, example: { kr: '편지를 써요.', en: 'I write a letter.' } },
      { korean: '듣다', roman: 'deutda', english: 'To listen (irregular)', audio: true, example: { kr: '음악을 들어요.', en: 'I listen to music.' } },
      { korean: '말하다', roman: 'malhada', english: 'To speak', audio: true, example: { kr: '한국어로 말해요.', en: 'I speak in Korean.' } },
      { korean: '사다', roman: 'sada', english: 'To buy', audio: true, example: { kr: '옷을 사요.', en: 'I buy clothes.' } },
      { korean: '알다', roman: 'alda', english: 'To know', audio: true, example: { kr: '저는 알아요.', en: 'I know.' } },
      { korean: '모르다', roman: 'moreuda', english: 'To not know (irregular)', audio: true, example: { kr: '저는 몰라요.', en: 'I don\'t know.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: '듣다 (to listen) is irregular. Its polite form is:',
        options: ['듣어요', '들어요', '듣아요', '들아요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '모르다 (to not know) conjugates to:',
        options: ['모르어요', '모라요', '몰라요', '몰러요'],
        correct: 2,
      },
      {
        type: 'matching',
        prompt: 'Match verb to polite form',
        pairs: [
          { left: '보다 (see)', right: '봐요' },
          { left: '읽다 (read)', right: '읽어요' },
          { left: '듣다 (listen)', right: '들어요' },
          { left: '쓰다 (write)', right: '써요' },
        ],
      },
      {
        type: 'fill-blank',
        prompt: '음악을 ___. (I listen to music.)',
        options: ['봐요', '읽어요', '들어요', '써요'],
        correct: 2,
        hint: 'Listen = 듣다 → 들어요',
      },
      {
        type: 'listening',
        audio: '몰라요',
        prompt: 'What does this mean?',
        options: ['I know', 'I don\'t know', 'I listen', 'I read'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '알다 and 모르다 are:',
        options: ['Synonyms', 'Opposites (know vs. don\'t know)', 'Both irregular', 'Both 하다 verbs'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I watch a movie."',
        tiles: ['영화를', '봐요'],
        correct: ['영화를', '봐요'],
        english: 'I watch a movie.',
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 4.5: Negation ─────────────────────────────
  {
    id: 'u4-l5',
    title: 'Negation',
    subtitle: 'Saying "don\'t" and "can\'t"',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Two ways to say "not"',
        content: 'Korean has two ways to negate verbs. Both mean the same thing — the short form is more common in speech, the long form is slightly more formal.',
      },
      {
        type: 'pattern',
        title: 'Method 1 (short): 안 + verb',
        content: 'Just put 안 before the verb. Simple!',
        examples: [
          { kr: '안 가요.', en: 'I don\'t go.' },
          { kr: '안 먹어요.', en: 'I don\'t eat.' },
          { kr: '안 봐요.', en: 'I don\'t watch.' },
        ],
      },
      {
        type: 'pattern',
        title: 'Method 2 (long): stem + 지 않아요',
        content: 'Add 지 않아요 to the verb stem. More formal/written.',
        examples: [
          { kr: '가지 않아요.', en: 'I don\'t go.' },
          { kr: '먹지 않아요.', en: 'I don\'t eat.' },
          { kr: '보지 않아요.', en: 'I don\'t watch.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Special: 하다 verbs',
        content: 'For 하다 verbs, 안 goes between the noun and 하다:\n\n• 공부 안 해요 (short) = I don\'t study\n• 공부하지 않아요 (long) = I don\'t study\n\nBoth are correct!',
      },
      {
        type: 'explanation',
        title: '"Can\'t" = 못 + verb',
        content: '못 means "can\'t" — you\'re unable to do something (not just choosing not to):\n\n• 못 가요 = I can\'t go\n• 못 먹어요 = I can\'t eat\n• 못 해요 = I can\'t do it\n\nFor 하다 verbs: 공부 못 해요 = I can\'t study',
      },
    ],
    vocabulary: [
      { korean: '안', roman: 'an', english: 'Not / Don\'t (short negation)', audio: true, example: { kr: '안 가요.', en: 'I don\'t go.' } },
      { korean: '못', roman: 'mot', english: 'Can\'t / Unable to', audio: true, example: { kr: '못 가요.', en: 'I can\'t go.' } },
      { korean: '~지 않아요', roman: '~ji anayo', english: 'Don\'t / Not (long negation)', audio: true, example: { kr: '먹지 않아요.', en: 'I don\'t eat.' } },
      { korean: '안 먹어요', roman: 'an meogeoyo', english: 'I don\'t eat', audio: true },
      { korean: '못 먹어요', roman: 'mot meogeoyo', english: 'I can\'t eat', audio: true },
      { korean: '공부 안 해요', roman: 'gongbu an haeyo', english: 'I don\'t study', audio: true },
      { korean: '공부 못 해요', roman: 'gongbu mot haeyo', english: 'I can\'t study', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'The SHORT way to negate a verb is:',
        options: ['못 + verb', '안 + verb', 'Verb + 지 않아요', 'Verb + 없어요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '"I don\'t go" using the short method:',
        options: ['가 안요', '안 가요', '못 가요', '가지 않아요'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: '"I CAN\'T go" is:',
        options: ['안 가요', '못 가요', '가지 않아요', '가 없어요'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '공부 ___ 해요. (I don\'t study — short form)',
        options: ['못', '안', '지', '없'],
        correct: 1,
        hint: 'For 하다 verbs, 안 goes between the noun and 해요',
      },
      {
        type: 'conversation',
        prompt: 'Someone offers you food but you\'re allergic and physically unable to eat it. You say:',
        options: ['안 먹어요 (I don\'t eat it)', '못 먹어요 (I can\'t eat it)', '먹어요 (I eat it)', '먹지 않아요 (I don\'t eat it)'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the Korean to its meaning',
        pairs: [
          { left: '안 가요', right: 'I don\'t go (choose not to)' },
          { left: '못 가요', right: 'I can\'t go (unable to)' },
          { left: '가지 않아요', right: 'I don\'t go (long form)' },
          { left: '공부 안 해요', right: 'I don\'t study' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'Which is the LONG negation form of 먹다?',
        options: ['안 먹어요', '못 먹어요', '먹지 않아요', '먹 안아요'],
        correct: 2,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
