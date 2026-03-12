// Unit 3: How Korean Sentences Work
// 5 lessons on word order, particles, and sentence building

const lessons = [
  // ─── Lesson 3.1: Korean Word Order (SOV) ──────────────────
  {
    id: 'u3-l1',
    title: 'Korean Word Order (SOV)',
    subtitle: 'The verb always goes last',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'English vs Korean word order',
        content: 'English uses SVO (Subject-Verb-Object): "I eat rice." Korean uses SOV (Subject-Object-Verb): "I rice eat." The verb ALWAYS goes last in Korean. Always!',
      },
      {
        type: 'breakdown',
        title: 'How it works',
        items: [
          { char: '저는', roman: 'jeoneun', sound: 'I (topic)', mnemonic: 'Subject — who is doing the action' },
          { char: '밥을', roman: 'babeul', sound: 'rice (object)', mnemonic: 'Object — what receives the action' },
          { char: '먹어요', roman: 'meogeoyo', sound: 'eat (verb)', mnemonic: 'Verb — always at the END' },
        ],
      },
      {
        type: 'example',
        title: 'Think of it this way',
        content: '저는 밥을 먹어요 — "As for me, rice, I eat."',
        korean: '저는 밥을 먹어요',
        breakdown: [
          { part: '저는', role: 'I (topic marker)' },
          { part: '밥을', role: 'rice (object marker)' },
          { part: '먹어요', role: 'eat (verb — last!)' },
        ],
      },
      {
        type: 'comparison',
        title: 'English vs Korean',
        content: 'Notice how the verb moves to the end in Korean. Everything else is flexible!',
        pairs: [
          { basic: 'I eat rice (SVO)', y: '저는 밥을 먹어요 (SOV)' },
          { basic: 'I drink coffee (SVO)', y: '저는 커피를 마셔요 (SOV)' },
          { basic: 'I study Korean (SVO)', y: '저는 한국어를 공부해요 (SOV)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Good news: flexibility!',
        content: 'Other than the verb being last, word order in Korean is actually flexible! Particles (markers like 은/는, 을/를) tell you who does what, so you can rearrange the other parts. The verb just has to stay at the end.',
      },
    ],
    vocabulary: [
      { korean: '밥', roman: 'bap', english: 'Rice / Meal', audio: true, example: { kr: '저는 밥을 먹어요.', en: 'I eat rice.' } },
      { korean: '먹어요', roman: 'meogeoyo', english: 'Eat (polite)', audio: true, example: { kr: '뭐 먹어요?', en: 'What do you eat?' } },
      { korean: '마셔요', roman: 'masyeoyo', english: 'Drink (polite)', audio: true, example: { kr: '커피를 마셔요.', en: 'I drink coffee.' } },
      { korean: '공부해요', roman: 'gongbuhaeyo', english: 'Study (polite)', audio: true, example: { kr: '한국어를 공부해요.', en: 'I study Korean.' } },
      { korean: '한국어', roman: 'hangugeo', english: 'Korean language', audio: true, example: { kr: '한국어를 공부해요.', en: 'I study Korean.' } },
      { korean: '커피', roman: 'keopi', english: 'Coffee', audio: true, example: { kr: '커피를 마셔요.', en: 'I drink coffee.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Korean word order is:',
        options: ['Subject-Verb-Object (SVO)', 'Verb-Subject-Object (VSO)', 'Subject-Object-Verb (SOV)', 'Object-Verb-Subject (OVS)'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'In Korean, what ALWAYS goes last?',
        options: ['The subject', 'The object', 'The verb', 'The topic'],
        correct: 2,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I eat rice" in Korean word order',
        tiles: ['먹어요', '저는', '밥을'],
        correct: ['저는', '밥을', '먹어요'],
        english: 'I eat rice',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I drink coffee" in Korean word order',
        tiles: ['마셔요', '커피를', '저는'],
        correct: ['저는', '커피를', '마셔요'],
        english: 'I drink coffee',
      },
      {
        type: 'multiple-choice',
        prompt: '"I study Korean" in Korean word order is:',
        options: ['저는 공부해요 한국어를', '공부해요 저는 한국어를', '저는 한국어를 공부해요', '한국어를 저는 공부해요'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'Why is Korean word order flexible (except for the verb)?',
        options: [
          'Because Korean has no grammar rules',
          'Because particles tell you who does what',
          'Because Koreans speak fast',
          'Because Korean has no verbs',
        ],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 3.2: Topic & Subject Markers (은/는 and 이/가) ──
  {
    id: 'u3-l2',
    title: 'Topic & Subject Markers',
    subtitle: '은/는 and 이/가',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'The concept that trips up most learners',
        content: 'Korean has two types of markers for the "doer" of a sentence: TOPIC markers (은/는) and SUBJECT markers (이/가). This distinction doesn\'t exist in English, so let\'s get it right from the start.',
      },
      {
        type: 'breakdown',
        title: '은/는 — Topic Marker',
        items: [
          { char: '은', roman: 'eun', sound: 'Topic marker (after consonant)', mnemonic: '"As for X..." / "Speaking of X..." — use after a consonant: 저는 (as for me)' },
          { char: '는', roman: 'neun', sound: 'Topic marker (after vowel)', mnemonic: '"As for X..." / "Speaking of X..." — use after a vowel: 나는 (as for me, casual)' },
        ],
      },
      {
        type: 'breakdown',
        title: '이/가 — Subject Marker',
        items: [
          { char: '이', roman: 'i', sound: 'Subject marker (after consonant)', mnemonic: 'Identifies who/what does the action — use after a consonant: 학생이 (the student [does something])' },
          { char: '가', roman: 'ga', sound: 'Subject marker (after vowel)', mnemonic: 'Identifies who/what does the action — use after a vowel: 날씨가 (the weather [does something])' },
        ],
      },
      {
        type: 'comparison',
        title: 'The difference',
        content: 'The topic marker sets the scene. The subject marker highlights who does something.',
        pairs: [
          { basic: '저는 학생이에요', y: '"As for ME, I\'m a student" (topic = me)' },
          { basic: '제가 학생이에요', y: '"I\'M the student" (I\'m the one, not someone else)' },
        ],
      },
      {
        type: 'pattern',
        title: 'Simple rule for now',
        content: 'Use 은/는 for introducing topics and general statements. Use 이/가 for new information and emphasis.',
        examples: [
          { kr: '저는 학생이에요.', en: 'As for me, I\'m a student. (introducing yourself)' },
          { kr: '날씨가 좋아요.', en: 'The weather is good. (new info — describing what\'s happening)' },
          { kr: '누가 학생이에요? 제가 학생이에요.', en: 'Who\'s the student? I\'M the student. (answering a question)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Don\'t overthink it!',
        content: 'Even native Korean speakers sometimes struggle to explain the difference between 은/는 and 이/가. For now, default to 은/는 for general statements and topics. You\'ll develop a natural feel for 이/가 over time.',
      },
    ],
    vocabulary: [
      { korean: '은', roman: 'eun', english: 'Topic marker (after consonant)', audio: true, example: { kr: '저는 학생이에요.', en: 'As for me, I am a student.' } },
      { korean: '는', roman: 'neun', english: 'Topic marker (after vowel)', audio: true, example: { kr: '나는 한국 사람이에요.', en: 'As for me, I am Korean.' } },
      { korean: '이', roman: 'i', english: 'Subject marker (after consonant)', audio: true, example: { kr: '학생이 많아요.', en: 'There are many students.' } },
      { korean: '가', roman: 'ga', english: 'Subject marker (after vowel)', audio: true, example: { kr: '날씨가 좋아요.', en: 'The weather is good.' } },
      { korean: '날씨', roman: 'nalssi', english: 'Weather', audio: true, example: { kr: '오늘 날씨가 좋아요.', en: 'Today the weather is good.' } },
      { korean: '좋아요', roman: 'joayo', english: 'Is good / I like it', audio: true, example: { kr: '이거 좋아요.', en: 'This is good.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: '은/는 is the ___ marker.',
        options: ['Subject', 'Object', 'Topic', 'Location'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: '이/가 is the ___ marker.',
        options: ['Topic', 'Subject', 'Object', 'Possessive'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '저___ 학생이에요. (As for me, I am a student.)',
        options: ['는', '가', '을', '에'],
        correct: 0,
        hint: '저 ends in a vowel, and this is a topic/general statement',
      },
      {
        type: 'fill-blank',
        prompt: '날씨___ 좋아요. (The weather is good.)',
        options: ['는', '가', '을', '에서'],
        correct: 1,
        hint: '날씨 ends in a vowel, and we are stating new information',
      },
      {
        type: 'fill-blank',
        prompt: '학생___ 많아요. (There are many students.)',
        options: ['은', '이', '를', '에'],
        correct: 1,
        hint: '학생 ends in a consonant, and this is new information (subject marker)',
      },
      {
        type: 'multiple-choice',
        prompt: '"제가 학생이에요" emphasizes...',
        options: [
          'That I\'m talking about myself in general',
          'That I\'M the student (not someone else)',
          'That I\'m no longer a student',
          'That I want to be a student',
        ],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Which marker do you use after a consonant for the topic?',
        options: ['는', '은', '가', '이'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 3.3: Object Marker (을/를) ────────────────────
  {
    id: 'u3-l3',
    title: 'Object Marker',
    subtitle: '을/를 — what receives the action',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Marking the object',
        content: 'The object marker tells you WHAT receives the action. In "I eat rice," rice is the object — it\'s what gets eaten. Korean marks this explicitly with 을 or 를.',
      },
      {
        type: 'breakdown',
        title: '을/를 — Object Marker',
        items: [
          { char: '을', roman: 'eul', sound: 'Object marker (after consonant)', mnemonic: '밥을 먹어요 — I eat RICE (밥 ends in ㅂ, a consonant)' },
          { char: '를', roman: 'reul', sound: 'Object marker (after vowel)', mnemonic: '커피를 마셔요 — I drink COFFEE (커피 ends in ㅣ, a vowel)' },
        ],
      },
      {
        type: 'example',
        title: 'Object marker in action',
        content: 'The object marker goes right after the noun that receives the action:',
        korean: '저는 밥을 먹어요',
        breakdown: [
          { part: '저는', role: 'I (topic)' },
          { part: '밥을', role: 'rice + object marker (what I eat)' },
          { part: '먹어요', role: 'eat (verb)' },
        ],
      },
      {
        type: 'pattern',
        title: 'Subject + Object + Verb',
        content: 'Now you can build complete sentences with all the markers!',
        examples: [
          { kr: '저는 밥을 먹어요.', en: 'I eat rice.' },
          { kr: '저는 커피를 마셔요.', en: 'I drink coffee.' },
          { kr: '저는 한국어를 공부해요.', en: 'I study Korean.' },
          { kr: '저는 음악을 들어요.', en: 'I listen to music.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Dropping particles in casual speech',
        content: 'In casual speech, particles are often dropped — Koreans might just say 밥 먹어요 instead of 밥을 먹어요. But learn them properly first! Knowing the particles helps you understand who does what, even when the word order changes.',
      },
    ],
    vocabulary: [
      { korean: '을', roman: 'eul', english: 'Object marker (after consonant)', audio: true, example: { kr: '밥을 먹어요.', en: 'I eat rice.' } },
      { korean: '를', roman: 'reul', english: 'Object marker (after vowel)', audio: true, example: { kr: '커피를 마셔요.', en: 'I drink coffee.' } },
      { korean: '음악', roman: 'eumak', english: 'Music', audio: true, example: { kr: '음악을 들어요.', en: 'I listen to music.' } },
      { korean: '들어요', roman: 'deureoyo', english: 'Listen (polite)', audio: true, example: { kr: '음악을 들어요.', en: 'I listen to music.' } },
      { korean: '책', roman: 'chaek', english: 'Book', audio: true, example: { kr: '책을 읽어요.', en: 'I read a book.' } },
      { korean: '읽어요', roman: 'ilgeoyo', english: 'Read (polite)', audio: true, example: { kr: '책을 읽어요.', en: 'I read a book.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: '을/를 marks the ___ of a sentence.',
        options: ['Subject', 'Topic', 'Object', 'Location'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '밥___ 먹어요. (I eat rice.)',
        options: ['을', '를', '은', '는'],
        correct: 0,
        hint: '밥 ends in a consonant (ㅂ)',
      },
      {
        type: 'fill-blank',
        prompt: '커피___ 마셔요. (I drink coffee.)',
        options: ['을', '를', '이', '가'],
        correct: 1,
        hint: '커피 ends in a vowel (ㅣ)',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I study Korean"',
        tiles: ['공부해요', '한국어를', '저는'],
        correct: ['저는', '한국어를', '공부해요'],
        english: 'I study Korean',
      },
      {
        type: 'fill-blank',
        prompt: '음악___ 들어요. (I listen to music.)',
        options: ['를', '을', '는', '가'],
        correct: 1,
        hint: '음악 ends in a consonant (ㄱ)',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I read a book"',
        tiles: ['읽어요', '저는', '책을'],
        correct: ['저는', '책을', '읽어요'],
        english: 'I read a book',
      },
      {
        type: 'multiple-choice',
        prompt: 'In casual speech, particles are often...',
        options: ['Doubled', 'Dropped', 'Changed to 은/는', 'Moved to the end'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 3.4: Location Markers (에 and 에서) ────────────
  {
    id: 'u3-l4',
    title: 'Location Markers',
    subtitle: '에 and 에서 — two kinds of "at"',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Two different "at/in" markers',
        content: 'English uses "at" for everything: "I\'m AT home," "I study AT school." Korean has two different markers depending on what\'s happening. This distinction doesn\'t exist in English, so pay close attention!',
      },
      {
        type: 'breakdown',
        title: '에 — Destination / Static Location / Time',
        items: [
          { char: '에', roman: 'e', sound: '"to" or "at" (existence/time)', mnemonic: 'Going TO a place, being AT a place, or a specific TIME' },
        ],
      },
      {
        type: 'pattern',
        title: '에 in action',
        content: 'Use 에 for where you GO, where something EXISTS, or for TIME:',
        examples: [
          { kr: '학교에 가요.', en: 'I GO TO school.' },
          { kr: '집에 있어요.', en: 'I AM AT home.' },
          { kr: '3시에 만나요.', en: 'Let\'s meet AT 3 o\'clock.' },
        ],
      },
      {
        type: 'breakdown',
        title: '에서 — Where an Action Happens',
        items: [
          { char: '에서', roman: 'eseo', sound: '"at/in" (for doing things)', mnemonic: 'Where an ACTION takes place — studying, eating, working' },
        ],
      },
      {
        type: 'pattern',
        title: '에서 in action',
        content: 'Use 에서 for where you DO something:',
        examples: [
          { kr: '학교에서 공부해요.', en: 'I study AT school.' },
          { kr: '식당에서 먹어요.', en: 'I eat AT the restaurant.' },
          { kr: '회사에서 일해요.', en: 'I work AT the company.' },
        ],
      },
      {
        type: 'comparison',
        title: 'The simple rule',
        content: 'Going TO or being AT (existence) a place, or TIME → 에. Doing something AT a place → 에서.',
        pairs: [
          { basic: '학교에 가요 (go TO school)', y: '학교에서 공부해요 (study AT school)' },
          { basic: '집에 있어요 (am AT home)', y: '집에서 쉬어요 (rest AT home)' },
          { basic: '식당에 가요 (go TO restaurant)', y: '식당에서 먹어요 (eat AT restaurant)' },
        ],
      },
    ],
    vocabulary: [
      { korean: '에', roman: 'e', english: 'To / At (destination, existence, time)', audio: true, example: { kr: '학교에 가요.', en: 'I go to school.' } },
      { korean: '에서', roman: 'eseo', english: 'At / In (where action happens)', audio: true, example: { kr: '학교에서 공부해요.', en: 'I study at school.' } },
      { korean: '학교', roman: 'hakgyo', english: 'School', audio: true, example: { kr: '학교에 가요.', en: 'I go to school.' } },
      { korean: '집', roman: 'jip', english: 'House / Home', audio: true, example: { kr: '집에 있어요.', en: 'I am at home.' } },
      { korean: '식당', roman: 'sikdang', english: 'Restaurant', audio: true, example: { kr: '식당에서 먹어요.', en: 'I eat at the restaurant.' } },
      { korean: '회사', roman: 'hoesa', english: 'Company / Office', audio: true, example: { kr: '회사에서 일해요.', en: 'I work at the office.' } },
      { korean: '가요', roman: 'gayo', english: 'Go (polite)', audio: true, example: { kr: '학교에 가요.', en: 'I go to school.' } },
      { korean: '있어요', roman: 'isseoyo', english: 'Exist / Am at (polite)', audio: true, example: { kr: '집에 있어요.', en: 'I am at home.' } },
      { korean: '일해요', roman: 'ilhaeyo', english: 'Work (polite)', audio: true, example: { kr: '회사에서 일해요.', en: 'I work at the company.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: '"I go TO school" — which marker goes after 학교?',
        options: ['에', '에서', '을', '는'],
        correct: 0,
      },
      {
        type: 'multiple-choice',
        prompt: '"I study AT school" — which marker goes after 학교?',
        options: ['에', '에서', '을', '는'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '집___ 있어요. (I am at home.)',
        options: ['에', '에서', '을', '는'],
        correct: 0,
        hint: 'Being at a place (existence) uses 에',
      },
      {
        type: 'fill-blank',
        prompt: '식당___ 먹어요. (I eat at the restaurant.)',
        options: ['에', '에서', '을', '는'],
        correct: 1,
        hint: 'Doing an action at a place uses 에서',
      },
      {
        type: 'fill-blank',
        prompt: '3시___ 만나요. (Let\'s meet at 3 o\'clock.)',
        options: ['에서', '에', '을', '는'],
        correct: 1,
        hint: 'Time uses 에',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I work at the company"',
        tiles: ['일해요', '회사에서', '저는'],
        correct: ['저는', '회사에서', '일해요'],
        english: 'I work at the company',
      },
      {
        type: 'multiple-choice',
        prompt: 'The simple rule: going TO / being AT → ___. Doing something AT → ___.',
        options: ['에서 / 에', '에 / 에서', '을 / 를', '는 / 가'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 3.5: Possessive & Others (의, 도, 하고) ────────
  {
    id: 'u3-l5',
    title: 'Possessive & Others',
    subtitle: '의, 도, 하고 — more useful particles',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'breakdown',
        title: '의 — Possessive ("\'s" / "of")',
        items: [
          { char: '의', roman: 'ui (often pronounced "e")', sound: 'Possessive marker', mnemonic: 'Like English \'s — marks ownership or relation' },
        ],
      },
      {
        type: 'pattern',
        title: '의 in action',
        content: '의 connects two nouns to show possession or relation:',
        examples: [
          { kr: '저의 친구', en: 'My friend (often shortened to 제 친구)' },
          { kr: '한국의 음식', en: 'Korea\'s food / Korean food' },
          { kr: '선생님의 이름', en: 'The teacher\'s name' },
        ],
      },
      {
        type: 'breakdown',
        title: '도 — "Also / Too"',
        items: [
          { char: '도', roman: 'do', sound: '"also" / "too"', mnemonic: 'REPLACES the topic/subject marker — never use 는도 or 가도!' },
        ],
      },
      {
        type: 'pattern',
        title: '도 in action',
        content: '도 replaces 은/는 or 이/가 — it does NOT stack on top of them:',
        examples: [
          { kr: '저도 학생이에요.', en: 'I am ALSO a student. (not 저는도!)' },
          { kr: '커피도 좋아요.', en: 'Coffee is ALSO good.' },
          { kr: '친구도 한국 사람이에요.', en: 'My friend is ALSO Korean.' },
        ],
      },
      {
        type: 'breakdown',
        title: '하고 — "And / With"',
        items: [
          { char: '하고', roman: 'hago', sound: '"and" / "with" (connecting nouns)', mnemonic: 'Casual way to connect nouns or say "together with"' },
        ],
      },
      {
        type: 'pattern',
        title: '하고 in action',
        content: '하고 connects nouns together or means "with":',
        examples: [
          { kr: '빵하고 커피', en: 'Bread and coffee' },
          { kr: '친구하고 같이', en: 'Together with a friend' },
          { kr: '밥하고 김치를 먹어요.', en: 'I eat rice and kimchi.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Shortening 저의 to 제',
        content: 'In everyday Korean, 저의 (my, polite) is almost always shortened to 제, and 나의 (my, casual) is shortened to 내. You\'ll hear 제 친구 (my friend) much more often than 저의 친구.',
      },
    ],
    vocabulary: [
      { korean: '의', roman: 'ui', english: 'Possessive (\'s / of)', audio: true, example: { kr: '한국의 음식이 맛있어요.', en: 'Korean food is delicious.' } },
      { korean: '도', roman: 'do', english: 'Also / Too', audio: true, example: { kr: '저도 학생이에요.', en: 'I am also a student.' } },
      { korean: '하고', roman: 'hago', english: 'And / With', audio: true, example: { kr: '빵하고 커피를 주세요.', en: 'Bread and coffee, please.' } },
      { korean: '친구', roman: 'chingu', english: 'Friend', audio: true, example: { kr: '제 친구는 한국 사람이에요.', en: 'My friend is Korean.' } },
      { korean: '빵', roman: 'ppang', english: 'Bread', audio: true, example: { kr: '빵을 먹어요.', en: 'I eat bread.' } },
      { korean: '김치', roman: 'gimchi', english: 'Kimchi', audio: true, example: { kr: '김치가 맛있어요.', en: 'Kimchi is delicious.' } },
      { korean: '같이', roman: 'gachi', english: 'Together', audio: true, example: { kr: '같이 가요.', en: 'Let\'s go together.' } },
      { korean: '맛있어요', roman: 'masisseoyo', english: 'Is delicious', audio: true, example: { kr: '이거 맛있어요!', en: 'This is delicious!' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: '의 is the ___ marker.',
        options: ['Object', 'Topic', 'Possessive', 'Location'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: '도 means "also" and it ___ the topic/subject marker.',
        options: ['Stacks on top of', 'Replaces', 'Comes before', 'Is optional with'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I am ALSO a student"?',
        options: ['저는도 학생이에요', '저가도 학생이에요', '저도 학생이에요', '도저 학생이에요'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '빵___ 커피를 주세요. (Bread and coffee, please.)',
        options: ['도', '하고', '의', '에서'],
        correct: 1,
        hint: 'We are connecting two nouns with "and"',
      },
      {
        type: 'multiple-choice',
        prompt: '저의 친구 is often shortened to:',
        options: ['저 친구', '제 친구', '나 친구', '저가 친구'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I eat rice and kimchi"',
        tiles: ['먹어요', '밥하고', '김치를', '저는'],
        correct: ['저는', '밥하고', '김치를', '먹어요'],
        english: 'I eat rice and kimchi',
      },
      {
        type: 'matching',
        prompt: 'Match each particle to its meaning',
        pairs: [
          { left: '의', right: 'Possessive (\'s)' },
          { left: '도', right: 'Also / Too' },
          { left: '하고', right: 'And / With' },
          { left: '을/를', right: 'Object marker' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'Your friend says they like coffee. You want to say "I also like coffee!" You say:',
        options: ['저는 커피 좋아요!', '저도 커피 좋아요!', '저의 커피 좋아요!', '저하고 커피 좋아요!'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
