// Unit 10: Connecting Ideas
// 4 lessons on sentence connectors and adverbs

const lessons = [
  // ─── Lesson 10.1: And, But, So ─────────────────────────────
  {
    id: 'u10-l1',
    title: 'And, But, So',
    subtitle: '그리고, 하지만, 그래서',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Connecting sentences in Korean',
        content: 'Korean has dedicated connector words that go between two sentences to link them. These work just like English "and," "but," and "so." They sit at the start of the second sentence, connecting it to the first.',
      },
      {
        type: 'breakdown',
        title: 'The four key connectors',
        items: [
          { char: '그리고', roman: 'geurigo', sound: 'And / And then', mnemonic: 'Adds more information or a next action' },
          { char: '하지만', roman: 'hajiman', sound: 'But / However', mnemonic: 'Introduces a contrast or exception' },
          { char: '그래서', roman: 'geuraeseo', sound: 'So / Therefore', mnemonic: 'Shows cause and effect — "because of that..."' },
          { char: '그런데', roman: 'geureonde', sound: 'But / By the way', mnemonic: 'Softer contrast, or shifts the topic slightly' },
        ],
      },
      {
        type: 'pattern',
        title: '그리고 — "And / And then"',
        examples: [
          { kr: '밥을 먹었어요. 그리고 커피를 마셨어요.', en: 'I ate a meal. And then I drank coffee.' },
          { kr: '한국어를 공부해요. 그리고 일본어도 공부해요.', en: 'I study Korean. And I also study Japanese.' },
        ],
      },
      {
        type: 'pattern',
        title: '하지만 — "But / However"',
        examples: [
          { kr: '비싸요. 하지만 맛있어요.', en: 'It\'s expensive. But it\'s delicious.' },
          { kr: '피곤해요. 하지만 공부할 거예요.', en: 'I\'m tired. But I\'m going to study.' },
        ],
      },
      {
        type: 'pattern',
        title: '그래서 — "So / Therefore"',
        examples: [
          { kr: '비가 왔어요. 그래서 집에 있었어요.', en: 'It rained. So I stayed home.' },
          { kr: '배고파요. 그래서 밥을 먹을 거예요.', en: 'I\'m hungry. So I\'m going to eat.' },
        ],
      },
      {
        type: 'pattern',
        title: '그런데 — "But / By the way"',
        examples: [
          { kr: '내일 시간 있어요? 그런데 어디에서 만날까요?', en: 'Do you have time tomorrow? By the way, where should we meet?' },
          { kr: '한국어 공부해요. 그런데 어려워요.', en: 'I study Korean. But (you know) it\'s hard.' },
        ],
      },
      {
        type: 'cultural-note',
        title: '그런데 vs 하지만',
        content: '하지만 is a strong "but" — a clear contrast. 그런데 is softer, more like "but actually" or "by the way." In casual speech, 그런데 is shortened to 근데 (geunde). You\'ll hear 근데 constantly in everyday Korean!',
      },
    ],
    vocabulary: [
      { korean: '그리고', roman: 'geurigo', english: 'And / And then', audio: true, example: { kr: '사과 그리고 바나나.', en: 'Apples and bananas.' } },
      { korean: '하지만', roman: 'hajiman', english: 'But / However', audio: true, example: { kr: '작아요. 하지만 좋아요.', en: 'It\'s small. But it\'s good.' } },
      { korean: '그래서', roman: 'geuraeseo', english: 'So / Therefore', audio: true, example: { kr: '늦었어요. 그래서 택시를 탔어요.', en: 'I was late. So I took a taxi.' } },
      { korean: '그런데', roman: 'geureonde', english: 'But / By the way', audio: true, example: { kr: '그런데 시간 있어요?', en: 'By the way, do you have time?' } },
      { korean: '근데', roman: 'geunde', english: 'But (casual, short for 그런데)', audio: true },
      { korean: '비싸요', roman: 'bissayo', english: 'It\'s expensive', audio: true },
      { korean: '피곤해요', roman: 'pigonhaeyo', english: 'I\'m tired', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which connector means "so / therefore"?',
        options: ['그리고', '하지만', '그래서', '그런데'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '비싸요. ___ 맛있어요. (It\'s expensive. But it\'s delicious.)',
        options: ['그리고', '하지만', '그래서', '그런데'],
        correct: 1,
        hint: 'You need a strong contrast — "but"',
      },
      {
        type: 'fill-blank',
        prompt: '비가 왔어요. ___ 집에 있었어요. (It rained. So I stayed home.)',
        options: ['그리고', '하지만', '그래서', '그런데'],
        correct: 2,
        hint: 'The rain caused staying home',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I ate a meal. And then I drank coffee."',
        tiles: ['밥을 먹었어요.', '그리고', '커피를 마셨어요.'],
        correct: ['밥을 먹었어요.', '그리고', '커피를 마셨어요.'],
        english: 'I ate a meal. And then I drank coffee.',
      },
      {
        type: 'matching',
        prompt: 'Match the connector to its meaning',
        pairs: [
          { left: '그리고', right: 'And / And then' },
          { left: '하지만', right: 'But / However' },
          { left: '그래서', right: 'So / Therefore' },
          { left: '그런데', right: 'But / By the way' },
        ],
      },
      {
        type: 'listening',
        audio: '배고파요. 그래서 밥을 먹을 거예요.',
        prompt: 'What connector did you hear?',
        options: ['그리고', '하지만', '그래서', '그런데'],
        correct: 2,
      },
      {
        type: 'conversation',
        prompt: 'Your friend says "한국어 어려워요." (Korean is hard.) You agree but want to say you like it. You say:',
        options: ['그리고 좋아해요.', '하지만 좋아해요.', '그래서 좋아해요.', '그런데 좋아해요?'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 10.2: And (within sentences) — 고 ──────────────
  {
    id: 'u10-l2',
    title: 'And (Within Sentences)',
    subtitle: 'Verb stem + 고',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Connecting actions with 고',
        content: 'While 그리고 connects two separate sentences, 고 connects actions within one sentence. Attach 고 to the verb stem (remove 다) to list sequential or parallel actions: "I do X and Y."',
      },
      {
        type: 'pattern',
        title: 'Verb stem + 고 = "and (then)"',
        examples: [
          { kr: '아침을 먹고 학교에 가요.', en: 'I eat breakfast and go to school.' },
          { kr: '커피를 마시고 공부해요.', en: 'I drink coffee and study.' },
          { kr: '샤워하고 옷을 입어요.', en: 'I shower and get dressed.' },
        ],
      },
      {
        type: 'explanation',
        title: 'Chaining multiple actions',
        content: 'You can chain several actions with 고 to describe a routine or sequence. Only the final verb gets conjugated — all the 고 verbs stay in stem form.',
      },
      {
        type: 'pattern',
        title: 'Chaining three or more actions',
        examples: [
          { kr: '일어나고, 샤워하고, 아침을 먹어요.', en: 'I wake up, shower, and eat breakfast.' },
          { kr: '학교에 가고, 공부하고, 집에 와요.', en: 'I go to school, study, and come home.' },
          { kr: '운동하고, 샤워하고, 쉬어요.', en: 'I exercise, shower, and rest.' },
        ],
      },
      {
        type: 'breakdown',
        title: 'How to form verb stem + 고',
        items: [
          { char: '먹다 → 먹고', roman: 'meokda → meokgo', sound: 'eat and...', mnemonic: 'Remove 다, add 고' },
          { char: '마시다 → 마시고', roman: 'masida → masigo', sound: 'drink and...', mnemonic: 'Remove 다, add 고' },
          { char: '하다 → 하고', roman: 'hada → hago', sound: 'do and...', mnemonic: 'Remove 다, add 고' },
          { char: '가다 → 가고', roman: 'gada → gago', sound: 'go and...', mnemonic: 'Remove 다, add 고' },
          { char: '오다 → 오고', roman: 'oda → ogo', sound: 'come and...', mnemonic: 'Remove 다, add 고' },
        ],
      },
      {
        type: 'cultural-note',
        title: '고 vs 그리고',
        content: '그리고 sits between two complete sentences. 고 joins verb phrases into one sentence. Compare: "밥을 먹었어요. 그리고 갔어요." (Two sentences) vs "밥을 먹고 갔어요." (One sentence, more natural).',
      },
    ],
    vocabulary: [
      { korean: '일어나다', roman: 'ireonada', english: 'To wake up / get up', audio: true, example: { kr: '아침에 일어나고 운동해요.', en: 'I wake up in the morning and exercise.' } },
      { korean: '샤워하다', roman: 'syawohada', english: 'To shower', audio: true },
      { korean: '옷을 입다', roman: 'oseul ipda', english: 'To get dressed', audio: true, example: { kr: '옷을 입고 나가요.', en: 'I get dressed and go out.' } },
      { korean: '나가다', roman: 'nagada', english: 'To go out', audio: true },
      { korean: '쉬다', roman: 'swida', english: 'To rest', audio: true, example: { kr: '일하고 쉬어요.', en: 'I work and rest.' } },
      { korean: '운동하다', roman: 'undonghada', english: 'To exercise', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "eat and go" in one sentence?',
        options: ['먹어요 그리고 가요', '먹고 가요', '먹다 가다', '먹는 가요'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '커피를 마시___ 공부해요. (I drink coffee and study.)',
        options: ['고', '그리고', '는', '을'],
        correct: 0,
        hint: 'Attach directly to the verb stem 마시',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I wake up, shower, and eat breakfast."',
        tiles: ['일어나고,', '샤워하고,', '아침을 먹어요.'],
        correct: ['일어나고,', '샤워하고,', '아침을 먹어요.'],
        english: 'I wake up, shower, and eat breakfast.',
      },
      {
        type: 'matching',
        prompt: 'Match the verb to its 고 form',
        pairs: [
          { left: '먹다', right: '먹고' },
          { left: '마시다', right: '마시고' },
          { left: '하다', right: '하고' },
          { left: '가다', right: '가고' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'Someone asks about your morning routine. You wake up, eat breakfast, and go to school. You say:',
        options: ['일어나고, 아침을 먹고, 학교에 가요.', '일어나요 그리고 먹어요 그리고 가요.', '일어나다 먹다 가다.', '일어나서 먹어서 가요.'],
        correct: 0,
      },
      {
        type: 'listening',
        audio: '운동하고 샤워해요.',
        prompt: 'What does this mean?',
        options: ['I exercise or shower.', 'I exercise and shower.', 'I will exercise and shower.', 'I exercised and showered.'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 10.3: Before & After ──────────────────────────
  {
    id: 'u10-l3',
    title: 'Before & After',
    subtitle: '전에 / 후에',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Sequencing actions: before and after',
        content: 'Korean uses 전에 (jeone) for "before" and 후에 (hue) for "after." These can attach to nouns directly, or to verbs using special patterns to express "before doing X" and "after doing X."',
      },
      {
        type: 'breakdown',
        title: 'Before: Verb + 기 전에',
        items: [
          { char: '자기 전에', roman: 'jagi jeone', sound: 'Before sleeping', mnemonic: '자다 (sleep) → 자 + 기 전에' },
          { char: '먹기 전에', roman: 'meokgi jeone', sound: 'Before eating', mnemonic: '먹다 (eat) → 먹 + 기 전에' },
          { char: '가기 전에', roman: 'gagi jeone', sound: 'Before going', mnemonic: '가다 (go) → 가 + 기 전에' },
        ],
      },
      {
        type: 'pattern',
        title: 'Verb + 기 전에 in sentences',
        examples: [
          { kr: '자기 전에 책을 읽어요.', en: 'I read a book before sleeping.' },
          { kr: '먹기 전에 손을 씻어요.', en: 'I wash my hands before eating.' },
          { kr: '나가기 전에 확인하세요.', en: 'Please check before going out.' },
        ],
      },
      {
        type: 'breakdown',
        title: 'After: Verb stem + (으)ㄴ 후에',
        items: [
          { char: '먹은 후에', roman: 'meogeun hue', sound: 'After eating', mnemonic: '먹 ends in consonant → add 은 후에' },
          { char: '한 후에', roman: 'han hue', sound: 'After doing', mnemonic: '하 ends in vowel → add ㄴ 후에' },
          { char: '본 후에', roman: 'bon hue', sound: 'After seeing', mnemonic: '보 ends in vowel → add ㄴ 후에' },
        ],
      },
      {
        type: 'pattern',
        title: 'Verb stem + (으)ㄴ 후에 in sentences',
        examples: [
          { kr: '먹은 후에 커피를 마셔요.', en: 'After eating, I drink coffee.' },
          { kr: '운동한 후에 샤워해요.', en: 'After exercising, I shower.' },
          { kr: '영화를 본 후에 이야기해요.', en: 'After watching the movie, let\'s talk.' },
        ],
      },
      {
        type: 'pattern',
        title: 'Nouns + 전에/후에',
        examples: [
          { kr: '수업 전에 커피를 마셔요.', en: 'I drink coffee before class.' },
          { kr: '점심 후에 산책해요.', en: 'I take a walk after lunch.' },
          { kr: '시험 전에 공부해요.', en: 'I study before the exam.' },
        ],
      },
    ],
    vocabulary: [
      { korean: '전에', roman: 'jeone', english: 'Before', audio: true, example: { kr: '수업 전에 왔어요.', en: 'I came before class.' } },
      { korean: '후에', roman: 'hue', english: 'After', audio: true, example: { kr: '점심 후에 만나요.', en: 'Let\'s meet after lunch.' } },
      { korean: '자다', roman: 'jada', english: 'To sleep', audio: true },
      { korean: '손을 씻다', roman: 'soneul ssitda', english: 'To wash hands', audio: true, example: { kr: '먹기 전에 손을 씻어요.', en: 'I wash my hands before eating.' } },
      { korean: '수업', roman: 'sueop', english: 'Class / Lesson', audio: true },
      { korean: '점심', roman: 'jeomsim', english: 'Lunch', audio: true },
      { korean: '시험', roman: 'siheom', english: 'Exam / Test', audio: true },
      { korean: '산책하다', roman: 'sanchaekada', english: 'To take a walk', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "before sleeping"?',
        options: ['잔 후에', '자기 전에', '자고', '자는 전에'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '먹___ 전에 손을 씻어요. (I wash my hands before eating.)',
        options: ['기', '은', '고', '는'],
        correct: 0,
        hint: 'Verb + 기 전에 = "before [verb]-ing"',
      },
      {
        type: 'fill-blank',
        prompt: '운동___ 후에 샤워해요. (After exercising, I shower.)',
        options: ['하기', '한', '하고', '해서'],
        correct: 1,
        hint: '하 ends in vowel → add ㄴ 후에',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I read a book before sleeping."',
        tiles: ['자기 전에', '책을', '읽어요.'],
        correct: ['자기 전에', '책을', '읽어요.'],
        english: 'I read a book before sleeping.',
      },
      {
        type: 'matching',
        prompt: 'Match the expression to its meaning',
        pairs: [
          { left: '먹기 전에', right: 'Before eating' },
          { left: '먹은 후에', right: 'After eating' },
          { left: '수업 전에', right: 'Before class' },
          { left: '점심 후에', right: 'After lunch' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'A friend asks what you do before bed. You read a book. You say:',
        options: ['자기 전에 책을 읽어요.', '잔 후에 책을 읽어요.', '자고 책을 읽어요.', '자기 후에 책을 읽어요.'],
        correct: 0,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 10.4: Useful Adverbs ──────────────────────────
  {
    id: 'u10-l4',
    title: 'Useful Adverbs',
    subtitle: '항상, 보통, 가끔, 정말...',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Adverbs add detail to your sentences',
        content: 'Korean adverbs usually come before the verb they modify. They tell you how often, how much, or in what way something happens. Adding adverbs makes your Korean sound much more natural and expressive.',
      },
      {
        type: 'breakdown',
        title: 'Frequency adverbs (how often?)',
        items: [
          { char: '항상', roman: 'hangsang', sound: 'Always', mnemonic: 'The "hang" in there = "hanging around" all the time' },
          { char: '보통', roman: 'botong', sound: 'Usually / Normally', mnemonic: '보통 is the "normal" default' },
          { char: '자주', roman: 'jaju', sound: 'Often / Frequently', mnemonic: 'Sounds like "ja-ju" — just do it often!' },
          { char: '가끔', roman: 'gakkeum', sound: 'Sometimes', mnemonic: 'Only "ga" there some of the time' },
        ],
      },
      {
        type: 'pattern',
        title: 'Frequency adverbs in sentences',
        examples: [
          { kr: '항상 아침을 먹어요.', en: 'I always eat breakfast.' },
          { kr: '보통 버스를 타요.', en: 'I usually take the bus.' },
          { kr: '자주 한국 음식을 먹어요.', en: 'I often eat Korean food.' },
          { kr: '가끔 영화를 봐요.', en: 'I sometimes watch movies.' },
        ],
      },
      {
        type: 'breakdown',
        title: 'Degree and time adverbs',
        items: [
          { char: '별로', roman: 'byeollo', sound: 'Not really (+ negative)', mnemonic: 'Always paired with a negative ending' },
          { char: '아직', roman: 'ajik', sound: 'Still / Yet', mnemonic: 'Things haven\'t changed yet' },
          { char: '벌써', roman: 'beolsseo', sound: 'Already', mnemonic: 'Surprise! It already happened' },
          { char: '같이', roman: 'gachi', sound: 'Together', mnemonic: 'Sounds like "got-chi" — we got this together' },
          { char: '정말', roman: 'jeongmal', sound: 'Really / Truly', mnemonic: 'The sincere, formal "really"' },
          { char: '진짜', roman: 'jinjja', sound: 'Really (casual)', mnemonic: 'The everyday, emphatic "for real?!"' },
        ],
      },
      {
        type: 'pattern',
        title: 'Degree and time adverbs in sentences',
        examples: [
          { kr: '별로 안 좋아해요.', en: 'I don\'t really like it.' },
          { kr: '아직 안 먹었어요.', en: 'I haven\'t eaten yet.' },
          { kr: '벌써 왔어요?', en: 'You\'re here already?' },
          { kr: '같이 가요!', en: 'Let\'s go together!' },
          { kr: '정말 맛있어요!', en: 'It\'s really delicious!' },
          { kr: '진짜요?', en: 'Really? (For real?)' },
        ],
      },
      {
        type: 'cultural-note',
        title: '별로 always needs a negative!',
        content: '별로 (not really) must always be paired with a negative verb form. "별로 좋아해요" is incorrect. It should be "별로 안 좋아해요" (I don\'t really like it) or "별로예요" (It\'s not great). This is a very common mistake for beginners!',
      },
      {
        type: 'cultural-note',
        title: '정말 vs 진짜',
        content: '정말 and 진짜 both mean "really," but 진짜 is more casual and emphatic. Think of 정말 as "truly/really" and 진짜 as "for real / seriously." In formal settings, use 정말. With friends, 진짜 is more natural.',
      },
    ],
    vocabulary: [
      { korean: '항상', roman: 'hangsang', english: 'Always', audio: true, example: { kr: '항상 감사합니다.', en: 'Thank you always.' } },
      { korean: '보통', roman: 'botong', english: 'Usually / Normally', audio: true, example: { kr: '보통 몇 시에 일어나요?', en: 'What time do you usually wake up?' } },
      { korean: '자주', roman: 'jaju', english: 'Often / Frequently', audio: true, example: { kr: '자주 와요.', en: 'I come often.' } },
      { korean: '가끔', roman: 'gakkeum', english: 'Sometimes', audio: true, example: { kr: '가끔 운동해요.', en: 'I sometimes exercise.' } },
      { korean: '별로', roman: 'byeollo', english: 'Not really (+ negative)', audio: true, example: { kr: '별로 안 비싸요.', en: 'It\'s not really expensive.' } },
      { korean: '아직', roman: 'ajik', english: 'Still / Yet', audio: true, example: { kr: '아직 학생이에요.', en: 'I\'m still a student.' } },
      { korean: '벌써', roman: 'beolsseo', english: 'Already', audio: true, example: { kr: '벌써 끝났어요.', en: 'It\'s already over.' } },
      { korean: '같이', roman: 'gachi', english: 'Together', audio: true, example: { kr: '같이 먹어요.', en: 'Let\'s eat together.' } },
      { korean: '정말', roman: 'jeongmal', english: 'Really / Truly', audio: true },
      { korean: '진짜', roman: 'jinjja', english: 'Really (casual)', audio: true, example: { kr: '진짜 좋아요!', en: 'It\'s really good!' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which adverb means "sometimes"?',
        options: ['항상', '보통', '자주', '가끔'],
        correct: 3,
      },
      {
        type: 'multiple-choice',
        prompt: 'Which sentence is CORRECT?',
        options: ['별로 좋아해요.', '별로 안 좋아해요.', '별로 많이 좋아해요.', '별로 항상 좋아해요.'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '___ 안 먹었어요. (I haven\'t eaten yet.)',
        options: ['벌써', '아직', '항상', '같이'],
        correct: 1,
        hint: '"Still/yet" — the action hasn\'t happened',
      },
      {
        type: 'fill-blank',
        prompt: '___ 왔어요? (You\'re here already?)',
        options: ['아직', '벌써', '가끔', '보통'],
        correct: 1,
        hint: 'Expresses surprise that something happened sooner than expected',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Let\'s go together!"',
        tiles: ['같이', '가요!'],
        correct: ['같이', '가요!'],
        english: 'Let\'s go together!',
      },
      {
        type: 'matching',
        prompt: 'Match the adverb to its meaning',
        pairs: [
          { left: '항상', right: 'Always' },
          { left: '가끔', right: 'Sometimes' },
          { left: '벌써', right: 'Already' },
          { left: '같이', right: 'Together' },
        ],
      },
      {
        type: 'listening',
        audio: '정말 맛있어요!',
        prompt: 'What does this mean?',
        options: ['It\'s not really delicious.', 'It\'s really delicious!', 'It\'s sometimes delicious.', 'It\'s always delicious.'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
