// Unit 16: Complex Sentences & Practical Skills
// 4 lessons on advanced grammar for real conversations

const lessons = [
  // ─── Lesson 16.1: Quoting & Reported Speech ──────────────
  {
    id: 'u16-l1',
    title: 'Quoting & Reported Speech',
    subtitle: 'Saying what others said with -다고 하다',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'How to quote people in Korean',
        content: 'In English we say "They say..." or "He said that..." — Korean does the same thing with a quoting pattern. You take what was said and attach ~(이)라고 해요 or ~다고 해요 depending on the type of sentence being quoted. This is one of the most common patterns in everyday Korean conversation.',
      },
      {
        type: 'pattern',
        title: 'Quoting statements',
        content: 'For action verbs and descriptive verbs, use ~다고 해요. For nouns with 이다, use ~(이)라고 해요:',
        examples: [
          { kr: '맛있다고 해요.', en: 'They say it\'s delicious.' },
          { kr: '내일 간다고 해요.', en: 'They say they\'re going tomorrow.' },
          { kr: '학생이라고 해요.', en: 'They say they\'re a student.' },
          { kr: '한국 사람이라고 해요.', en: 'They say they\'re Korean.' },
        ],
      },
      {
        type: 'example',
        title: 'The most useful phrase: "What did you say?"',
        content: 'When you don\'t catch what someone said, this phrase is a lifesaver:',
        korean: '뭐라고요?',
        breakdown: [
          { part: '뭐', role: '"What"' },
          { part: '라고', role: 'Quoting particle' },
          { part: '요', role: 'Polite ending' },
        ],
      },
      {
        type: 'pattern',
        title: 'Giving a reason with a quote',
        content: 'You can combine quoting with ~서 to explain why something happened based on what someone said:',
        examples: [
          { kr: '아프다고 해서 안 왔어요.', en: 'They said they\'re sick, so they didn\'t come.' },
          { kr: '바쁘다고 해서 안 만났어요.', en: 'They said they\'re busy, so we didn\'t meet.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Indirect speech is everywhere',
        content: 'Koreans use reported speech constantly in daily life — in gossip, news, explaining situations, and even when talking about their own past statements. Mastering ~다고 해요 will make you sound much more natural and help you understand conversations between native speakers.',
      },
    ],
    vocabulary: [
      { korean: '다고 해요', roman: 'dago haeyo', english: 'They say (verb quote)', audio: true, example: { kr: '좋다고 해요.', en: 'They say it\'s good.' } },
      { korean: '(이)라고 해요', roman: '(i)rago haeyo', english: 'They say (noun quote)', audio: true, example: { kr: '의사라고 해요.', en: 'They say they\'re a doctor.' } },
      { korean: '뭐라고요?', roman: 'mworaguyo?', english: 'What did you say?', audio: true },
      { korean: '맛있다', roman: 'masitda', english: 'To be delicious', audio: true, example: { kr: '맛있다고 해요.', en: 'They say it\'s delicious.' } },
      { korean: '아프다', roman: 'apeuda', english: 'To be sick/hurt', audio: true, example: { kr: '아프다고 해서 안 왔어요.', en: 'They said they\'re sick so they didn\'t come.' } },
      { korean: '바쁘다', roman: 'bappeuda', english: 'To be busy', audio: true, example: { kr: '바쁘다고 해요.', en: 'They say they\'re busy.' } },
      { korean: '학생', roman: 'haksaeng', english: 'Student', audio: true, example: { kr: '학생이라고 해요.', en: 'They say they\'re a student.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "They say it\'s delicious"?',
        options: ['맛있어요.', '맛있다고 해요.', '맛있으면 좋겠어요.', '맛있게 드세요.'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '학생___해요. (They say they\'re a student.)',
        options: ['다고', '이라고', '으로', '에서'],
        correct: 1,
        hint: 'Use the noun quoting particle after a consonant-ending noun.',
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 뭐라고요? mean?',
        options: ['What is that?', 'What did you say?', 'Where did you go?', 'Who said that?'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "They said they\'re sick, so they didn\'t come."',
        tiles: ['안 왔어요', '해서', '아프다고'],
        correct: ['아프다고', '해서', '안 왔어요'],
        english: 'They said they\'re sick, so they didn\'t come.',
      },
      {
        type: 'matching',
        prompt: 'Match the quoted speech to its meaning',
        pairs: [
          { left: '맛있다고 해요', right: 'They say it\'s delicious' },
          { left: '학생이라고 해요', right: 'They say they\'re a student' },
          { left: '바쁘다고 해요', right: 'They say they\'re busy' },
          { left: '뭐라고요?', right: 'What did you say?' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'Your friend is speaking too fast and you didn\'t catch what they said. You say:',
        options: ['뭐라고요?', '뭐 먹어요?', '왜요?', '어디 가요?'],
        correct: 0,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 16.2: While / During ─────────────────────────
  {
    id: 'u16-l2',
    title: 'While / During',
    subtitle: 'Expressing simultaneous actions with ~면서 and ~동안',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Doing two things at once',
        content: 'Korean has two main ways to say "while" or "during." Use ~(으)면서 when the same person does two things at the same time. Use ~동안 for "during" a time period or "for" a duration. Both are super common and easy to use once you know the difference.',
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)면서 — "while doing"',
        content: 'Attach ~면서 after a vowel-ending verb stem, or ~으면서 after a consonant-ending verb stem. The same subject does both actions:',
        examples: [
          { kr: '음악을 들으면서 공부해요.', en: 'I study while listening to music.' },
          { kr: '밥을 먹으면서 이야기해요.', en: 'We talk while eating.' },
          { kr: '걸으면서 전화해요.', en: 'I talk on the phone while walking.' },
          { kr: '커피를 마시면서 책을 읽어요.', en: 'I read a book while drinking coffee.' },
        ],
      },
      {
        type: 'pattern',
        title: 'Noun + 동안 — "during / for (time)"',
        content: 'Attach 동안 after a noun (time period or duration):',
        examples: [
          { kr: '방학 동안 여행했어요.', en: 'I traveled during vacation.' },
          { kr: '세 시간 동안 공부했어요.', en: 'I studied for three hours.' },
          { kr: '점심시간 동안 쉬었어요.', en: 'I rested during lunch break.' },
          { kr: '일주일 동안 한국에 있었어요.', en: 'I was in Korea for one week.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Multitasking the Korean way',
        content: 'Koreans often combine eating with socializing. Phrases like 밥을 먹으면서 이야기해요 (let\'s talk while eating) are extremely natural. In fact, eating alone (혼밥) is a relatively new concept in Korea — traditionally, meals are always shared with conversation.',
      },
    ],
    vocabulary: [
      { korean: '(으)면서', roman: '(eu)myeonseo', english: 'While ~ing (same subject)', audio: true, example: { kr: '노래를 하면서 요리해요.', en: 'I cook while singing.' } },
      { korean: '동안', roman: 'dongan', english: 'During / for (time)', audio: true, example: { kr: '한 달 동안 배웠어요.', en: 'I learned for one month.' } },
      { korean: '음악', roman: 'eumak', english: 'Music', audio: true, example: { kr: '음악을 들어요.', en: 'I listen to music.' } },
      { korean: '듣다', roman: 'deutda', english: 'To listen / to hear', audio: true, example: { kr: '음악을 들으면서 쉬어요.', en: 'I rest while listening to music.' } },
      { korean: '방학', roman: 'banghak', english: 'Vacation (school break)', audio: true, example: { kr: '방학 동안 뭐 했어요?', en: 'What did you do during vacation?' } },
      { korean: '걷다', roman: 'geotda', english: 'To walk', audio: true, example: { kr: '걸으면서 이야기해요.', en: 'Let\'s talk while walking.' } },
      { korean: '일주일', roman: 'iljuil', english: 'One week', audio: true, example: { kr: '일주일 동안 쉬었어요.', en: 'I rested for one week.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I study while listening to music"?',
        options: ['음악을 듣고 공부해요.', '음악을 들으면서 공부해요.', '음악 동안 공부해요.', '음악을 듣기 전에 공부해요.'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '방학 ___ 여행했어요. (I traveled during vacation.)',
        options: ['면서', '동안', '까지', '부터'],
        correct: 1,
        hint: 'This word means "during" and follows a noun.',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I read a book while drinking coffee."',
        tiles: ['책을 읽어요', '커피를 마시면서'],
        correct: ['커피를 마시면서', '책을 읽어요'],
        english: 'I read a book while drinking coffee.',
      },
      {
        type: 'matching',
        prompt: 'Match the sentence to its meaning',
        pairs: [
          { left: '밥을 먹으면서 이야기해요', right: 'We talk while eating' },
          { left: '세 시간 동안 공부했어요', right: 'I studied for three hours' },
          { left: '걸으면서 전화해요', right: 'I call while walking' },
          { left: '방학 동안 여행했어요', right: 'I traveled during vacation' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'Which word means "for one week"?',
        options: ['한 달 동안', '일주일 동안', '세 시간 동안', '방학 동안'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Your friend asks what you do on your commute. You listen to music while walking. You say:',
        options: ['음악을 들어요.', '음악을 들으면서 걸어요.', '걷기 동안 음악이에요.', '음악하고 걸어요.'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 16.3: Must & Should ──────────────────────────
  {
    id: 'u16-l3',
    title: 'Must & Should',
    subtitle: 'Expressing obligation with ~야 하다/되다',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Saying "must" and "must not"',
        content: 'Need to express obligation? Korean has clear patterns for "must/have to," "don\'t have to," and "must not." These are essential for understanding rules, giving advice, and talking about responsibilities. Pay attention to the difference between "don\'t have to" and "must not" — they\'re very different!',
      },
      {
        type: 'pattern',
        title: 'Verb stem + 아/어야 해요 — "must / have to"',
        content: 'This is the standard way to say someone must or has to do something:',
        examples: [
          { kr: '가야 해요.', en: 'I have to go.' },
          { kr: '공부해야 해요.', en: 'I have to study.' },
          { kr: '일찍 일어나야 해요.', en: 'I have to wake up early.' },
          { kr: '숙제를 해야 해요.', en: 'I have to do homework.' },
        ],
      },
      {
        type: 'pattern',
        title: 'Verb stem + 아/어야 돼요 — same meaning, slightly casual',
        content: '돼요 can replace 해요 in this pattern with the same meaning. It\'s slightly more casual and very common in spoken Korean:',
        examples: [
          { kr: '가야 돼요.', en: 'I have to go.' },
          { kr: '먹어야 돼요.', en: 'I have to eat.' },
        ],
      },
      {
        type: 'pattern',
        title: '"Don\'t have to" vs. "Must not"',
        content: 'These look similar but mean very different things! Be careful:',
        examples: [
          { kr: '안 해도 돼요.', en: 'You don\'t have to do it. (It\'s okay not to.)' },
          { kr: '안 가도 돼요.', en: 'You don\'t have to go. (It\'s fine.)' },
          { kr: '여기서 담배를 피우면 안 돼요.', en: 'You must not smoke here. (It\'s not allowed.)' },
          { kr: '사진을 찍으면 안 돼요.', en: 'You must not take photos. (It\'s prohibited.)' },
        ],
      },
      {
        type: 'example',
        title: 'Breaking down "must not"',
        content: 'The "must not" pattern literally means "if you do X, it won\'t do":',
        korean: '여기서 담배를 피우면 안 돼요.',
        breakdown: [
          { part: '여기서', role: '"Here" + location particle' },
          { part: '담배를', role: '"Cigarette" + object particle' },
          { part: '피우면', role: '"If you smoke" (verb stem + 면)' },
          { part: '안 돼요', role: '"It won\'t do / not allowed"' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Following rules in Korea',
        content: 'Korea takes public rules seriously. You\'ll see signs saying ~면 안 됩니다 (must not ~) everywhere — no smoking areas, quiet zones on subways, no photography in certain places. Knowing this pattern helps you read and understand these signs.',
      },
    ],
    vocabulary: [
      { korean: '아/어야 해요', roman: 'a/eoya haeyo', english: 'Must / have to', audio: true, example: { kr: '가야 해요.', en: 'I have to go.' } },
      { korean: '아/어야 돼요', roman: 'a/eoya dwaeyo', english: 'Must / have to (casual)', audio: true, example: { kr: '먹어야 돼요.', en: 'I have to eat.' } },
      { korean: '안 해도 돼요', roman: 'an haedo dwaeyo', english: 'Don\'t have to', audio: true },
      { korean: '(으)면 안 돼요', roman: '(eu)myeon an dwaeyo', english: 'Must not', audio: true, example: { kr: '들어가면 안 돼요.', en: 'You must not go in.' } },
      { korean: '일찍', roman: 'iljjik', english: 'Early', audio: true, example: { kr: '일찍 일어나야 해요.', en: 'I have to wake up early.' } },
      { korean: '숙제', roman: 'sukje', english: 'Homework', audio: true, example: { kr: '숙제를 해야 돼요.', en: 'I have to do homework.' } },
      { korean: '담배', roman: 'dambae', english: 'Cigarette', audio: true, example: { kr: '담배를 피우면 안 돼요.', en: 'You must not smoke.' } },
      { korean: '사진', roman: 'sajin', english: 'Photo', audio: true, example: { kr: '사진을 찍으면 안 돼요.', en: 'You must not take photos.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I have to go"?',
        options: ['가면 안 돼요.', '가야 해요.', '안 가도 돼요.', '가고 싶어요.'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '공부___해요. (I have to study.)',
        options: ['하면', '해야', '해도', '하고'],
        correct: 1,
        hint: 'This particle expresses obligation — "must."',
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 안 해도 돼요 mean?',
        options: ['You must not do it.', 'You should do it.', 'You don\'t have to do it.', 'You already did it.'],
        correct: 2,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "You must not smoke here."',
        tiles: ['안 돼요', '피우면', '여기서', '담배를'],
        correct: ['여기서', '담배를', '피우면', '안 돼요'],
        english: 'You must not smoke here.',
      },
      {
        type: 'matching',
        prompt: 'Match the expression to its meaning',
        pairs: [
          { left: '가야 해요', right: 'I have to go' },
          { left: '안 가도 돼요', right: 'You don\'t have to go' },
          { left: '가면 안 돼요', right: 'You must not go' },
          { left: '가야 돼요', right: 'I have to go (casual)' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'Your friend asks if they need to bring anything to the party. It\'s not necessary. You say:',
        options: ['가져와야 해요.', '가져오면 안 돼요.', '안 가져와도 돼요.', '가져오세요.'],
        correct: 2,
      },
      {
        type: 'conversation',
        prompt: 'You see a sign at a museum. It says: "사진을 찍으면 안 됩니다." What does it mean?',
        options: ['Please take photos.', 'You must not take photos.', 'Photos are available.', 'Take photos for free.'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 16.4: Giving Reasons Naturally ────────────────
  {
    id: 'u16-l4',
    title: 'Giving Reasons More Naturally',
    subtitle: 'Using ~(으)니까 for reasons with commands and suggestions',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Two ways to say "because"',
        content: 'You already know ~아서/어서 for giving reasons (from earlier units). Now meet ~(으)니까 — another "because" that\'s used when the second part of the sentence is a command, suggestion, or request. Think of 니까 as a stronger, more emphatic "because" that leads to action.',
      },
      {
        type: 'pattern',
        title: '~(으)니까 — "because" (with commands/suggestions)',
        content: 'Use ~니까 after a vowel-ending verb stem, and ~으니까 after a consonant-ending verb stem. The second clause is typically a command, suggestion, or request:',
        examples: [
          { kr: '비가 오니까 우산을 가져가세요.', en: 'Because it\'s raining, take an umbrella.' },
          { kr: '시간이 없으니까 빨리 가요.', en: 'We don\'t have time, so let\'s go quickly.' },
          { kr: '배가 고프니까 밥 먹자.', en: 'I\'m hungry, so let\'s eat.' },
          { kr: '위험하니까 조심하세요.', en: 'It\'s dangerous, so be careful.' },
        ],
      },
      {
        type: 'pattern',
        title: 'When to use 니까 vs. 아서/어서',
        content: 'Here\'s the key rule: Use 니까 when the second clause is a command, suggestion, or request. Use 아서/어서 for neutral cause-effect statements:',
        examples: [
          { kr: '비가 와서 안 갔어요.', en: 'It rained, so I didn\'t go. (neutral statement)' },
          { kr: '비가 오니까 우산 가져가세요.', en: 'It\'s raining, so take an umbrella. (command)' },
          { kr: '피곤해서 일찍 잤어요.', en: 'I was tired, so I slept early. (neutral)' },
          { kr: '피곤하니까 일찍 자요.', en: 'I\'m tired, so let\'s sleep early. (suggestion)' },
        ],
      },
      {
        type: 'example',
        title: 'Breaking it down',
        content: 'Let\'s analyze a typical 니까 sentence:',
        korean: '비가 오니까 우산을 가져가세요.',
        breakdown: [
          { part: '비가', role: '"Rain" + subject particle' },
          { part: '오니까', role: '"Because it comes/falls" (오다 stem + 니까)' },
          { part: '우산을', role: '"Umbrella" + object particle' },
          { part: '가져가세요', role: '"Please take (with you)"' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Sounding natural with reasons',
        content: 'Native speakers switch between 아서/어서 and 니까 naturally based on what follows. If you use 아서 before a command, Koreans will understand you, but it sounds a bit off. Using 니까 before commands makes your Korean sound much more polished and natural.',
      },
    ],
    vocabulary: [
      { korean: '(으)니까', roman: '(eu)nikka', english: 'Because (before commands)', audio: true, example: { kr: '추우니까 코트 입으세요.', en: 'It\'s cold, so wear a coat.' } },
      { korean: '아서/어서', roman: 'aseo/eoseo', english: 'Because (neutral)', audio: true, example: { kr: '피곤해서 쉬었어요.', en: 'I was tired, so I rested.' } },
      { korean: '우산', roman: 'usan', english: 'Umbrella', audio: true, example: { kr: '우산을 가져가세요.', en: 'Take an umbrella.' } },
      { korean: '빨리', roman: 'ppalli', english: 'Quickly / fast', audio: true, example: { kr: '빨리 가요!', en: 'Let\'s go quickly!' } },
      { korean: '위험하다', roman: 'wiheomhada', english: 'To be dangerous', audio: true, example: { kr: '위험하니까 조심하세요.', en: 'It\'s dangerous, so be careful.' } },
      { korean: '조심하다', roman: 'josimhada', english: 'To be careful', audio: true, example: { kr: '조심하세요!', en: 'Be careful!' } },
      { korean: '배가 고프다', roman: 'baega gopeuda', english: 'To be hungry', audio: true, example: { kr: '배가 고프니까 밥 먹자.', en: 'I\'m hungry, so let\'s eat.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which connector should you use before a command or suggestion?',
        options: ['아서/어서', '(으)니까', '(으)면', '고'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '비가 오___ 우산을 가져가세요. (Because it\'s raining, take an umbrella.)',
        options: ['아서', '니까', '면서', '고'],
        correct: 1,
        hint: 'The second clause is a command, so use the emphatic "because."',
      },
      {
        type: 'multiple-choice',
        prompt: 'Which sentence is correct?',
        options: [
          '비가 와서 우산 가져가세요.',
          '비가 오니까 우산 가져가세요.',
          '비가 오면서 우산 가져가세요.',
          '비가 오고 우산 가져가세요.',
        ],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "We don\'t have time, so let\'s go quickly."',
        tiles: ['빨리 가요', '시간이 없으니까'],
        correct: ['시간이 없으니까', '빨리 가요'],
        english: 'We don\'t have time, so let\'s go quickly.',
      },
      {
        type: 'matching',
        prompt: 'Match the reason to its result',
        pairs: [
          { left: '비가 오니까', right: '우산 가져가세요' },
          { left: '위험하니까', right: '조심하세요' },
          { left: '배가 고프니까', right: '밥 먹자' },
          { left: '시간이 없으니까', right: '빨리 가요' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'You want to tell your friend to be careful because the road is dangerous. You say:',
        options: [
          '위험해서 조심했어요.',
          '위험하니까 조심하세요.',
          '위험하면 안 가요.',
          '위험하고 조심해요.',
        ],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },
]

export default lessons
