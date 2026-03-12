// Unit 11: Daily Life & Routines
// 4 lessons on describing daily activities

const lessons = [
  // ─── Lesson 11.1: Morning Routine ─────────────────────────────
  {
    id: 'u11-l1',
    title: 'Morning Routine',
    subtitle: 'Starting your day in Korean',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Describing your morning',
        content: 'In this lesson you\'ll learn the key verbs Koreans use to describe their morning routine. You already know how to connect actions with 고 ("and then") from earlier units. Now we\'ll use that to chain a full morning together!',
      },
      {
        type: 'breakdown',
        title: 'Morning routine verbs',
        items: [
          { char: '일어나다', roman: 'ireonada', sound: 'to wake up / get up', mnemonic: 'Think "I re-awaken" each morning' },
          { char: '양치하다', roman: 'yangchihada', sound: 'to brush teeth', mnemonic: 'yangchi = dental care, hada = do it' },
          { char: '씻다', roman: 'ssitda', sound: 'to wash (face/hands)', mnemonic: 'Short and sharp like a quick wash' },
          { char: '샤워하다', roman: 'syawohada', sound: 'to shower', mnemonic: 'Sounds like "shower" + 하다' },
          { char: '옷을 입다', roman: 'oseul ipda', sound: 'to get dressed', mnemonic: '옷 = clothes, 입다 = to wear/put on' },
          { char: '출발하다', roman: 'chulbalhada', sound: 'to depart / leave', mnemonic: '출발 = departure, like "let\'s go!"' },
        ],
      },
      {
        type: 'explanation',
        title: 'Chaining actions with 고',
        content: 'Use 고 between verb stems to list actions in order: "I do A, and (then) B, and (then) C." The tense goes only on the final verb. This is exactly how Koreans describe their daily routines.',
      },
      {
        type: 'pattern',
        title: 'A full morning routine',
        examples: [
          { kr: '일곱 시에 일어나요.', en: 'I wake up at 7 o\'clock.' },
          { kr: '일어나고 양치해요.', en: 'I wake up and brush my teeth.' },
          { kr: '샤워하고 옷을 입어요.', en: 'I shower and get dressed.' },
          { kr: '일곱 시에 일어나고, 샤워하고, 아침을 먹고, 여덟 시에 출발해요.', en: 'I wake up at 7, shower, eat breakfast, and leave at 8.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Korean morning culture',
        content: 'Many Koreans start their day early. Breakfast is often a full meal (rice, soup, side dishes) rather than something light. The phrase 아침을 먹다 literally means "eat morning" and is the standard way to say "eat breakfast."',
      },
    ],
    vocabulary: [
      { korean: '일어나다', roman: 'ireonada', english: 'To wake up / get up', audio: true, example: { kr: '매일 일곱 시에 일어나요.', en: 'I wake up at 7 every day.' } },
      { korean: '양치하다', roman: 'yangchihada', english: 'To brush teeth', audio: true, example: { kr: '아침에 양치해요.', en: 'I brush my teeth in the morning.' } },
      { korean: '씻다', roman: 'ssitda', english: 'To wash', audio: true, example: { kr: '얼굴을 씻어요.', en: 'I wash my face.' } },
      { korean: '샤워하다', roman: 'syawohada', english: 'To shower', audio: true, example: { kr: '아침에 샤워해요.', en: 'I shower in the morning.' } },
      { korean: '옷을 입다', roman: 'oseul ipda', english: 'To get dressed', audio: true, example: { kr: '옷을 입고 출발해요.', en: 'I get dressed and leave.' } },
      { korean: '출발하다', roman: 'chulbalhada', english: 'To depart / leave', audio: true, example: { kr: '여덟 시에 출발해요.', en: 'I leave at 8 o\'clock.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does 일어나다 mean?',
        options: ['To sleep', 'To wake up / get up', 'To eat breakfast', 'To leave'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the Korean to the English',
        pairs: [
          { left: '일어나다', right: 'To wake up' },
          { left: '씻다', right: 'To wash' },
          { left: '샤워하다', right: 'To shower' },
          { left: '출발하다', right: 'To depart' },
        ],
      },
      {
        type: 'fill-blank',
        prompt: '아침에 ___ 하고 옷을 입어요. (I shower and get dressed in the morning)',
        options: ['출발', '샤워', '양치', '공부'],
        correct: 1,
        hint: 'Which word means "to shower"?',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I wake up at 7 o\'clock."',
        tiles: ['일곱 시에', '일어나요.'],
        correct: ['일곱 시에', '일어나요.'],
        english: 'I wake up at 7 o\'clock.',
      },
      {
        type: 'listening',
        audio: '샤워하고 옷을 입어요.',
        prompt: 'What did you hear?',
        options: ['샤워하고 옷을 입어요.', '일어나고 양치해요.', '아침을 먹고 출발해요.', '얼굴을 씻어요.'],
        correct: 0,
      },
      {
        type: 'conversation',
        prompt: 'Someone asks "아침에 뭐 해요?" (What do you do in the morning?) You shower and eat breakfast. You reply:',
        options: ['샤워하고 아침을 먹어요.', '저녁을 먹어요.', '일하고 있어요.', '출발했어요.'],
        correct: 0,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 11.2: At Work/School ──────────────────────────────
  {
    id: 'u11-l2',
    title: 'At Work/School',
    subtitle: 'Talking about your day',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Your workday or school day',
        content: 'Whether you\'re at work (회사) or school (학교), there are key verbs and nouns that describe what happens during the day. In this lesson we\'ll cover the most common ones.',
      },
      {
        type: 'breakdown',
        title: 'Work & school vocabulary',
        items: [
          { char: '수업', roman: 'sueop', sound: 'class / lesson', mnemonic: 'su-eop: what you attend at school' },
          { char: '회의', roman: 'hoeui', sound: 'meeting', mnemonic: 'hoe-ui: a gathering to discuss' },
          { char: '점심시간', roman: 'jeomsim-sigan', sound: 'lunch time', mnemonic: '점심 = lunch + 시간 = time' },
          { char: '시작하다', roman: 'sijakhada', sound: 'to start / begin', mnemonic: '시작 = start + 하다 = do' },
          { char: '끝나다', roman: 'kkeutnada', sound: 'to finish / end', mnemonic: '끝 = end + 나다 = come out' },
          { char: '일하다', roman: 'ilhada', sound: 'to work', mnemonic: '일 = work + 하다 = do' },
        ],
      },
      {
        type: 'pattern',
        title: 'Talking about schedules',
        examples: [
          { kr: '아홉 시에 수업이 시작해요.', en: 'Class starts at 9 o\'clock.' },
          { kr: '열두 시에 점심시간이에요.', en: 'It\'s lunch time at 12.' },
          { kr: '다섯 시에 일이 끝나요.', en: 'Work ends at 5 o\'clock.' },
          { kr: '오늘 회의가 있어요.', en: 'I have a meeting today.' },
        ],
      },
      {
        type: 'example',
        title: 'Describing a full day',
        korean: '아홉 시에 일이 시작하고, 열두 시에 점심을 먹고, 다섯 시에 끝나요.',
        breakdown: [
          { part: '아홉 시에 일이 시작하고', role: 'Work starts at 9, and' },
          { part: '열두 시에 점심을 먹고', role: 'I eat lunch at 12, and' },
          { part: '다섯 시에 끝나요.', role: 'it ends at 5.' },
        ],
      },
    ],
    vocabulary: [
      { korean: '수업', roman: 'sueop', english: 'Class / lesson', audio: true, example: { kr: '오늘 수업이 있어요.', en: 'I have class today.' } },
      { korean: '회의', roman: 'hoeui', english: 'Meeting', audio: true, example: { kr: '두 시에 회의가 있어요.', en: 'I have a meeting at 2.' } },
      { korean: '점심시간', roman: 'jeomsim-sigan', english: 'Lunch time', audio: true },
      { korean: '시작하다', roman: 'sijakhada', english: 'To start / begin', audio: true, example: { kr: '수업이 시작해요.', en: 'Class starts.' } },
      { korean: '끝나다', roman: 'kkeutnada', english: 'To finish / end', audio: true, example: { kr: '일이 끝났어요.', en: 'Work finished.' } },
      { korean: '일하다', roman: 'ilhada', english: 'To work', audio: true, example: { kr: '회사에서 일해요.', en: 'I work at a company.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What does 끝나다 mean?',
        options: ['To start', 'To work', 'To finish / end', 'To meet'],
        correct: 2,
      },
      {
        type: 'matching',
        prompt: 'Match the Korean to the English',
        pairs: [
          { left: '수업', right: 'Class / lesson' },
          { left: '회의', right: 'Meeting' },
          { left: '시작하다', right: 'To start' },
          { left: '일하다', right: 'To work' },
        ],
      },
      {
        type: 'fill-blank',
        prompt: '아홉 시에 수업이 ___해요. (Class starts at 9.)',
        options: ['끝', '시작', '일', '점심'],
        correct: 1,
        hint: 'Which word means "to start"?',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I have a meeting today."',
        tiles: ['오늘', '회의가', '있어요.'],
        correct: ['오늘', '회의가', '있어요.'],
        english: 'I have a meeting today.',
      },
      {
        type: 'listening',
        audio: '다섯 시에 일이 끝나요.',
        prompt: 'What did you hear?',
        options: ['다섯 시에 일이 시작해요.', '다섯 시에 일이 끝나요.', '다섯 시에 점심을 먹어요.', '다섯 시에 회의가 있어요.'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'A coworker asks "오늘 몇 시에 끝나요?" (What time do you finish today?) You finish at 6. You reply:',
        options: ['아홉 시에 시작해요.', '여섯 시에 끝나요.', '점심시간이에요.', '회의가 있어요.'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 11.3: Free Time & Hobbies ─────────────────────────
  {
    id: 'u11-l3',
    title: 'Free Time & Hobbies',
    subtitle: '취미가 뭐예요?',
    estimatedMinutes: 14,
    teach: [
      {
        type: 'explanation',
        title: 'Talking about hobbies',
        content: 'One of the most common conversation starters in Korean is 취미가 뭐예요? (What\'s your hobby?). In this lesson you\'ll learn hobby vocabulary and a useful grammar pattern for saying what you like doing.',
      },
      {
        type: 'breakdown',
        title: 'Hobby vocabulary',
        items: [
          { char: '취미', roman: 'chwimi', sound: 'hobby', mnemonic: 'chwi-mi: your favorite pastime' },
          { char: '영화를 보다', roman: 'yeonghwareul boda', sound: 'to watch movies', mnemonic: '영화 = movie + 보다 = to see' },
          { char: '음악을 듣다', roman: 'eumageul deutda', sound: 'to listen to music', mnemonic: '음악 = music + 듣다 = to listen' },
          { char: '운동하다', roman: 'undonghada', sound: 'to exercise', mnemonic: '운동 = exercise + 하다 = do' },
          { char: '게임하다', roman: 'geimhada', sound: 'to play games', mnemonic: 'Sounds like "game" + 하다' },
          { char: '산책하다', roman: 'sanchaek-hada', sound: 'to take a walk', mnemonic: '산책 = a stroll' },
          { char: '요리하다', roman: 'yorihada', sound: 'to cook', mnemonic: '요리 = cooking/cuisine + 하다' },
        ],
      },
      {
        type: 'explanation',
        title: 'Grammar: ~는 것을 좋아해요',
        content: 'To say "I like [verb]-ing," use: verb stem + 는 것을 좋아해요. The 는 것 turns a verb into a noun ("the act of doing"), and 좋아해요 means "like." Example: 요리하다 → 요리하는 것을 좋아해요 = "I like cooking."',
      },
      {
        type: 'pattern',
        title: 'What do you like doing?',
        examples: [
          { kr: '취미가 뭐예요?', en: 'What\'s your hobby?' },
          { kr: '영화를 보는 것을 좋아해요.', en: 'I like watching movies.' },
          { kr: '요리하는 것을 좋아해요.', en: 'I like cooking.' },
          { kr: '음악을 듣는 것을 좋아해요.', en: 'I like listening to music.' },
          { kr: '산책하는 것을 좋아해요.', en: 'I like taking walks.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Simpler alternative',
        content: 'In casual speech, Koreans often skip the ~는 것을 pattern and just say the activity directly: 취미가 뭐예요? — 영화 보기요. / 요리요. Both the grammar pattern and the short form are perfectly natural.',
      },
    ],
    vocabulary: [
      { korean: '취미', roman: 'chwimi', english: 'Hobby', audio: true, example: { kr: '취미가 뭐예요?', en: 'What\'s your hobby?' } },
      { korean: '영화를 보다', roman: 'yeonghwareul boda', english: 'To watch movies', audio: true, example: { kr: '주말에 영화를 봐요.', en: 'I watch movies on the weekend.' } },
      { korean: '음악을 듣다', roman: 'eumageul deutda', english: 'To listen to music', audio: true },
      { korean: '운동하다', roman: 'undonghada', english: 'To exercise', audio: true, example: { kr: '매일 운동해요.', en: 'I exercise every day.' } },
      { korean: '게임하다', roman: 'geimhada', english: 'To play games', audio: true },
      { korean: '산책하다', roman: 'sanchaek-hada', english: 'To take a walk', audio: true, example: { kr: '공원에서 산책해요.', en: 'I take a walk in the park.' } },
      { korean: '요리하다', roman: 'yorihada', english: 'To cook', audio: true, example: { kr: '요리하는 것을 좋아해요.', en: 'I like cooking.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you ask "What\'s your hobby?" in Korean?',
        options: ['취미가 뭐예요?', '뭐 하고 있어요?', '뭐 좋아해요?', '뭐 해요?'],
        correct: 0,
      },
      {
        type: 'matching',
        prompt: 'Match the hobby to the Korean',
        pairs: [
          { left: 'Watch movies', right: '영화를 보다' },
          { left: 'Listen to music', right: '음악을 듣다' },
          { left: 'Exercise', right: '운동하다' },
          { left: 'Cook', right: '요리하다' },
        ],
      },
      {
        type: 'fill-blank',
        prompt: '요리___ 것을 좋아해요. (I like cooking.)',
        options: ['하는', '하고', '한', '할'],
        correct: 0,
        hint: 'verb stem + 는 것을 좋아해요',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I like watching movies."',
        tiles: ['영화를', '보는 것을', '좋아해요.'],
        correct: ['영화를', '보는 것을', '좋아해요.'],
        english: 'I like watching movies.',
      },
      {
        type: 'listening',
        audio: '취미가 뭐예요?',
        prompt: 'What is being asked?',
        options: ['What are you doing?', 'What\'s your hobby?', 'What do you want?', 'Where are you going?'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Someone asks "취미가 뭐예요?" You like taking walks. You reply:',
        options: ['산책하는 것을 좋아해요.', '일하고 있어요.', '아침을 먹어요.', '수업이 있어요.'],
        correct: 0,
      },
      {
        type: 'multiple-choice',
        prompt: 'Which sentence means "I like listening to music"?',
        options: ['음악을 들었어요.', '음악을 듣는 것을 좋아해요.', '음악을 듣고 있어요.', '음악을 듣고 싶어요.'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 11.4: Weather ─────────────────────────────────────
  {
    id: 'u11-l4',
    title: 'Weather',
    subtitle: '오늘 날씨 어때요?',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Talking about the weather',
        content: 'Weather (날씨) is a universal conversation topic. In Korean, weather descriptions use descriptive verbs (adjectives). Two important ones -- 덥다 and 춥다 -- follow the ㅂ-irregular pattern, which is very common in Korean.',
      },
      {
        type: 'breakdown',
        title: 'Weather vocabulary',
        items: [
          { char: '날씨', roman: 'nalssi', sound: 'weather', mnemonic: 'nal-ssi: the condition of the day' },
          { char: '덥다 → 더워요', roman: 'deopda → deowoyo', sound: 'to be hot', mnemonic: 'ㅂ drops, add 워요 (ㅂ-irregular)' },
          { char: '춥다 → 추워요', roman: 'chupda → chuwoyo', sound: 'to be cold', mnemonic: 'Same ㅂ-irregular pattern as 덥다' },
          { char: '비가 오다', roman: 'biga oda', sound: 'to rain (rain comes)', mnemonic: '비 = rain + 오다 = to come' },
          { char: '눈이 오다', roman: 'nuni oda', sound: 'to snow (snow comes)', mnemonic: '눈 = snow + 오다 = to come' },
          { char: '맑다', roman: 'makda', sound: 'to be clear / sunny', mnemonic: 'The ㄹ is silent: sounds like "mak-da"' },
          { char: '흐리다', roman: 'heurida', sound: 'to be cloudy', mnemonic: 'heu-ri-da: the sky is hazy' },
        ],
      },
      {
        type: 'explanation',
        title: 'The ㅂ-irregular pattern',
        content: 'When a verb stem ends in ㅂ and is followed by a vowel, the ㅂ drops and becomes 우 (or 오 in some cases). This is one of the most common irregular patterns. 덥다 → 더우 + 어요 → 더워요. 춥다 → 추우 + 어요 → 추워요. You\'ll see this pattern with many descriptive verbs.',
      },
      {
        type: 'pattern',
        title: 'Weather conversations',
        examples: [
          { kr: '오늘 날씨 어때요?', en: 'How\'s the weather today?' },
          { kr: '오늘 더워요.', en: 'It\'s hot today.' },
          { kr: '오늘 추워요.', en: 'It\'s cold today.' },
          { kr: '비가 와요.', en: 'It\'s raining.' },
          { kr: '눈이 와요.', en: 'It\'s snowing.' },
          { kr: '날씨가 맑아요.', en: 'The weather is clear.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Korea\'s four distinct seasons',
        content: 'Korea has four very distinct seasons (사계절). Spring (봄) is cherry blossom season. Summer (여름) is hot and humid with a monsoon period (장마). Autumn (가을) brings beautiful foliage. Winter (겨울) is cold and dry with snow. Koreans take great pride in their four seasons, and seasonal activities and foods are deeply embedded in the culture.',
      },
    ],
    vocabulary: [
      { korean: '날씨', roman: 'nalssi', english: 'Weather', audio: true, example: { kr: '오늘 날씨가 좋아요.', en: 'The weather is nice today.' } },
      { korean: '더워요', roman: 'deowoyo', english: 'It\'s hot', audio: true, example: { kr: '여름에 더워요.', en: 'It\'s hot in summer.' } },
      { korean: '추워요', roman: 'chuwoyo', english: 'It\'s cold', audio: true, example: { kr: '겨울에 추워요.', en: 'It\'s cold in winter.' } },
      { korean: '비가 오다', roman: 'biga oda', english: 'To rain', audio: true, example: { kr: '오늘 비가 와요.', en: 'It\'s raining today.' } },
      { korean: '눈이 오다', roman: 'nuni oda', english: 'To snow', audio: true, example: { kr: '겨울에 눈이 와요.', en: 'It snows in winter.' } },
      { korean: '맑다', roman: 'makda', english: 'To be clear / sunny', audio: true },
      { korean: '흐리다', roman: 'heurida', english: 'To be cloudy', audio: true, example: { kr: '오늘 흐려요.', en: 'It\'s cloudy today.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What is the polite present form of 덥다 (to be hot)?',
        options: ['덥어요', '더워요', '덥아요', '더웠어요'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the weather words',
        pairs: [
          { left: '더워요', right: 'It\'s hot' },
          { left: '추워요', right: 'It\'s cold' },
          { left: '비가 와요', right: 'It\'s raining' },
          { left: '맑아요', right: 'It\'s clear/sunny' },
        ],
      },
      {
        type: 'fill-blank',
        prompt: '오늘 ___ 어때요? (How\'s the weather today?)',
        options: ['날씨', '시간', '기분', '이름'],
        correct: 0,
        hint: 'Which word means "weather"?',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "It\'s snowing."',
        tiles: ['눈이', '와요.'],
        correct: ['눈이', '와요.'],
        english: 'It\'s snowing.',
      },
      {
        type: 'listening',
        audio: '오늘 날씨 어때요?',
        prompt: 'What is being asked?',
        options: ['What time is it?', 'How\'s the weather today?', 'What are you doing today?', 'Where are you going?'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Someone asks "오늘 날씨 어때요?" It\'s cold and snowing. You reply:',
        options: ['더워요.', '맑아요.', '추워요. 눈이 와요.', '비가 와요.'],
        correct: 2,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },
]

export default lessons
