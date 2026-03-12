// Unit 12: Out & About — Shopping & Restaurants
// 3 lessons on real-world transactions

const lessons = [
  // ─── Lesson 12.1: At a Restaurant ──────────────────────────
  {
    id: 'u12-l1',
    title: 'At a Restaurant',
    subtitle: 'Ordering food like a local',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'The full restaurant experience',
        content: 'Korean restaurants have a very distinct flow. You\'ll learn the key phrases from sitting down to paying the bill. Once you know these, you can eat anywhere in Korea with confidence.',
      },
      {
        type: 'pattern',
        title: 'Getting attention & ordering',
        content: 'Here\'s how a typical restaurant interaction flows:',
        examples: [
          { kr: '저기요!', en: 'Excuse me! (calling the server — literally "over there!")' },
          { kr: '메뉴 주세요.', en: 'Menu, please.' },
          { kr: '이거 뭐예요?', en: 'What is this? (pointing at the menu)' },
          { kr: '이거 주세요.', en: 'This one, please. (pointing at what you want)' },
        ],
      },
      {
        type: 'pattern',
        title: 'During the meal',
        content: 'Useful phrases while you\'re eating:',
        examples: [
          { kr: '물 주세요.', en: 'Water, please.' },
          { kr: '하나 더 주세요.', en: 'One more, please.' },
          { kr: '맛있어요!', en: 'It\'s delicious!' },
        ],
      },
      {
        type: 'pattern',
        title: 'Paying & leaving',
        content: 'Wrapping up your meal:',
        examples: [
          { kr: '얼마예요?', en: 'How much is it?' },
          { kr: '계산해 주세요.', en: 'Check, please. (literally "please calculate")' },
          { kr: '카드 돼요?', en: 'Can I use card?' },
        ],
      },
      {
        type: 'example',
        title: 'Before & after eating',
        content: 'These phrases show respect and gratitude for the meal:',
        korean: '잘 먹겠습니다 / 잘 먹었습니다',
        breakdown: [
          { part: '잘 먹겠습니다', role: '"I will eat well" — said BEFORE eating (like bon appetit)' },
          { part: '잘 먹었습니다', role: '"I ate well" — said AFTER eating (expressing thanks)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Korean restaurant etiquette',
        content: 'A few things that surprise newcomers:\n• Water is FREE — it\'s usually self-serve from a dispenser.\n• Banchan (side dishes) are FREE and you can ask for refills!\n• Tipping does NOT exist in Korea. Don\'t leave extra money.\n• Many restaurants have a buzzer button on the table to call the server.\n• You often pay at the counter near the exit, not at the table.',
      },
    ],
    vocabulary: [
      { korean: '저기요', roman: 'jeogiyo', english: 'Excuse me! (calling someone)', audio: true, example: { kr: '저기요! 여기 물 주세요.', en: 'Excuse me! Water here, please.' } },
      { korean: '메뉴', roman: 'menyu', english: 'Menu', audio: true, example: { kr: '메뉴 주세요.', en: 'Menu, please.' } },
      { korean: '주세요', roman: 'juseyo', english: 'Please give me', audio: true, example: { kr: '이거 주세요.', en: 'This one, please.' } },
      { korean: '이거', roman: 'igeo', english: 'This (thing)', audio: true, example: { kr: '이거 뭐예요?', en: 'What is this?' } },
      { korean: '하나 더', roman: 'hana deo', english: 'One more', audio: true, example: { kr: '하나 더 주세요.', en: 'One more, please.' } },
      { korean: '얼마예요', roman: 'eolmayeyo', english: 'How much is it?', audio: true },
      { korean: '계산', roman: 'gyesan', english: 'Bill / calculation', audio: true, example: { kr: '계산해 주세요.', en: 'Check, please.' } },
      { korean: '잘 먹겠습니다', roman: 'jal meokgesseumnida', english: 'I will eat well (before eating)', audio: true },
      { korean: '잘 먹었습니다', roman: 'jal meogeosseumnida', english: 'I ate well (after eating)', audio: true },
      { korean: '맛있어요', roman: 'masisseoyo', english: 'It\'s delicious', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you call a server in a Korean restaurant?',
        options: ['여기요!', '저기요!', '안녕하세요!', '잠깐만요!'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Menu, please."',
        tiles: ['주세요', '메뉴'],
        correct: ['메뉴', '주세요'],
        english: 'Menu, please.',
      },
      {
        type: 'multiple-choice',
        prompt: 'What do you say BEFORE eating a meal?',
        options: ['잘 먹었습니다', '잘 먹겠습니다', '맛있어요', '감사합니다'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '___해 주세요. (Check, please.)',
        options: ['메뉴', '계산', '주문', '요리'],
        correct: 1,
        hint: 'This word means "calculation".',
      },
      {
        type: 'matching',
        prompt: 'Match the phrase to its meaning',
        pairs: [
          { left: '이거 뭐예요?', right: 'What is this?' },
          { left: '하나 더 주세요', right: 'One more, please' },
          { left: '얼마예요?', right: 'How much?' },
          { left: '맛있어요', right: 'It\'s delicious' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'You sit down at a restaurant and want to see the menu. You say:',
        options: ['계산해 주세요', '메뉴 주세요', '잘 먹겠습니다', '얼마예요?'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'You\'ve finished eating and want to pay. Complete the dialogue:\nYou: "저기요! ___"',
        options: ['메뉴 주세요.', '이거 뭐예요?', '계산해 주세요.', '하나 더 주세요.'],
        correct: 2,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 12.2: Shopping ─────────────────────────────────
  {
    id: 'u12-l2',
    title: 'Shopping',
    subtitle: 'Navigating markets and stores',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Shopping in Korea',
        content: 'Whether you\'re in a traditional market (시장) or a modern store, these phrases will get you through any shopping situation. Korea has everything from massive underground malls to tiny street vendors.',
      },
      {
        type: 'pattern',
        title: 'Essential shopping phrases',
        content: 'The key phrases you\'ll use in any store or market:',
        examples: [
          { kr: '얼마예요?', en: 'How much is it?' },
          { kr: '이거 주세요.', en: 'I\'ll take this, please.' },
          { kr: '카드 돼요?', en: 'Can I use card?' },
          { kr: '다른 거 있어요?', en: 'Do you have something different?' },
          { kr: '사이즈가 있어요?', en: 'Do you have the size?' },
        ],
      },
      {
        type: 'pattern',
        title: 'Negotiating price',
        content: 'Haggling is common at traditional markets — not at regular stores:',
        examples: [
          { kr: '너무 비싸요.', en: 'It\'s too expensive.' },
          { kr: '깎아 주세요.', en: 'Please give me a discount. (literally "please shave it down")' },
          { kr: '좀 싸게 해 주세요.', en: 'Please make it a bit cheaper.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Where to haggle (and where not to)',
        content: 'Haggling is expected at traditional markets (시장) like Namdaemun or Dongdaemun. Street vendors are also open to it. However, do NOT haggle at regular stores, convenience stores, department stores, or chain shops — prices are fixed there. A friendly smile and 깎아 주세요 goes a long way in markets!',
      },
    ],
    vocabulary: [
      { korean: '얼마예요', roman: 'eolmayeyo', english: 'How much is it?', audio: true, example: { kr: '이거 얼마예요?', en: 'How much is this?' } },
      { korean: '비싸요', roman: 'bissayo', english: 'It\'s expensive', audio: true, example: { kr: '너무 비싸요!', en: 'It\'s too expensive!' } },
      { korean: '싸요', roman: 'ssayo', english: 'It\'s cheap', audio: true, example: { kr: '와, 진짜 싸요!', en: 'Wow, it\'s really cheap!' } },
      { korean: '깎아 주세요', roman: 'kkakka juseyo', english: 'Please give a discount', audio: true },
      { korean: '카드', roman: 'kadeu', english: 'Card (credit/debit)', audio: true, example: { kr: '카드 돼요?', en: 'Can I use card?' } },
      { korean: '현금', roman: 'hyeongeum', english: 'Cash', audio: true, example: { kr: '현금만 돼요.', en: 'Cash only.' } },
      { korean: '다른 거', roman: 'dareun geo', english: 'Something different', audio: true, example: { kr: '다른 거 있어요?', en: 'Do you have something different?' } },
      { korean: '사이즈', roman: 'saijeu', english: 'Size', audio: true, example: { kr: '큰 사이즈 있어요?', en: 'Do you have a bigger size?' } },
      { korean: '시장', roman: 'sijang', english: 'Traditional market', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you ask "How much is it?" in Korean?',
        options: ['이거 뭐예요?', '얼마예요?', '카드 돼요?', '있어요?'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 깎아 주세요 mean?',
        options: ['Wrap it up, please', 'Give me one more', 'Please give a discount', 'I\'ll pay cash'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '너무 ___. (It\'s too expensive.)',
        options: ['싸요', '좋아요', '비싸요', '맛있어요'],
        correct: 2,
        hint: 'The opposite of cheap.',
      },
      {
        type: 'matching',
        prompt: 'Match the shopping phrase',
        pairs: [
          { left: '얼마예요?', right: 'How much?' },
          { left: '깎아 주세요', right: 'Discount, please' },
          { left: '카드 돼요?', right: 'Can I use card?' },
          { left: '다른 거 있어요?', right: 'Have something else?' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'You\'re at a market and the vendor says the price is 20,000 won. That\'s too high. You say:',
        options: ['잘 먹겠습니다', '너무 비싸요. 깎아 주세요.', '메뉴 주세요', '감사합니다'],
        correct: 1,
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Can I use card?"',
        tiles: ['돼요?', '카드'],
        correct: ['카드', '돼요?'],
        english: 'Can I use card?',
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 12.3: Transportation ───────────────────────────
  {
    id: 'u12-l3',
    title: 'Transportation',
    subtitle: 'Getting around Korea',
    estimatedMinutes: 11,
    teach: [
      {
        type: 'explanation',
        title: 'Korea\'s amazing transit',
        content: 'Korea has one of the best public transportation systems in the world. The subway is clean, on time, and cheap. Buses cover everywhere the subway doesn\'t. And taxis are affordable compared to most countries.',
      },
      {
        type: 'breakdown',
        title: 'Transportation vocabulary',
        items: [
          { char: '지하철', roman: 'jihacheol', sound: 'Subway', mnemonic: '지하 (underground) + 철 (iron/rail)' },
          { char: '버스', roman: 'beoseu', sound: 'Bus', mnemonic: 'Sounds like "bus" — it\'s a loanword!' },
          { char: '택시', roman: 'taeksi', sound: 'Taxi', mnemonic: 'Sounds like "taxi" — another loanword!' },
          { char: '역', roman: 'yeok', sound: 'Station', mnemonic: 'Short and common — 서울역 = Seoul Station' },
          { char: '정류장', roman: 'jeongnyujang', sound: 'Bus stop', mnemonic: 'Longer word for the smaller stops' },
        ],
      },
      {
        type: 'pattern',
        title: 'Key transportation phrases',
        content: 'Phrases for getting where you need to go:',
        examples: [
          { kr: '어디까지 가세요?', en: 'Where are you going? (taxi driver might ask this)' },
          { kr: '___까지 가 주세요.', en: 'Please take me to ___.' },
          { kr: '얼마나 걸려요?', en: 'How long does it take?' },
          { kr: '내려 주세요.', en: 'Please let me off. (in a taxi or bus)' },
          { kr: '여기서 세워 주세요.', en: 'Please stop here.' },
        ],
      },
      {
        type: 'example',
        title: 'Taxi conversation',
        content: 'A typical taxi ride:',
        korean: '서울역까지 가 주세요.',
        breakdown: [
          { part: '서울역', role: 'Seoul Station (destination)' },
          { part: '까지', role: '"To / until" (destination marker)' },
          { part: '가', role: '"Go" (verb stem)' },
          { part: '주세요', role: '"Please (do it for me)"' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'T-money card is essential',
        content: 'Get a T-money card (티머니) at any convenience store. It works on ALL subways, buses, and even taxis across Korea. You tap on when boarding and tap off when exiting. It\'s also cheaper than paying cash — you get a small discount per ride. You can recharge it at convenience stores or machines in subway stations.',
      },
    ],
    vocabulary: [
      { korean: '지하철', roman: 'jihacheol', english: 'Subway', audio: true, example: { kr: '지하철로 가요.', en: 'Let\'s go by subway.' } },
      { korean: '버스', roman: 'beoseu', english: 'Bus', audio: true, example: { kr: '버스가 왔어요.', en: 'The bus has arrived.' } },
      { korean: '택시', roman: 'taeksi', english: 'Taxi', audio: true, example: { kr: '택시 타요.', en: 'Let\'s take a taxi.' } },
      { korean: '역', roman: 'yeok', english: 'Station', audio: true, example: { kr: '다음 역에서 내려요.', en: 'I\'ll get off at the next station.' } },
      { korean: '정류장', roman: 'jeongnyujang', english: 'Bus stop', audio: true, example: { kr: '정류장이 어디예요?', en: 'Where is the bus stop?' } },
      { korean: '까지', roman: 'kkaji', english: 'To / until', audio: true, example: { kr: '서울까지 얼마예요?', en: 'How much to Seoul?' } },
      { korean: '내려 주세요', roman: 'naeryeo juseyo', english: 'Please let me off', audio: true },
      { korean: '얼마나 걸려요', roman: 'eolmana geollyeoyo', english: 'How long does it take?', audio: true },
      { korean: '티머니', roman: 'timoni', english: 'T-money (transit card)', audio: true },
    ],
    exercises: [
      {
        type: 'matching',
        prompt: 'Match the transportation word',
        pairs: [
          { left: '지하철', right: 'Subway' },
          { left: '버스', right: 'Bus' },
          { left: '택시', right: 'Taxi' },
          { left: '역', right: 'Station' },
        ],
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Please take me to Seoul Station."',
        tiles: ['가 주세요', '서울역까지'],
        correct: ['서울역까지', '가 주세요'],
        english: 'Please take me to Seoul Station.',
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 얼마나 걸려요? mean?',
        options: ['How much is it?', 'How long does it take?', 'Where is it?', 'When does it leave?'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '다음 ___에서 내려요. (I get off at the next station.)',
        options: ['정류장', '역', '버스', '택시'],
        correct: 1,
        hint: 'This word means "station" (for subways/trains).',
      },
      {
        type: 'conversation',
        prompt: 'You\'re in a taxi and want to get off here. You say:',
        options: ['여기까지 가 주세요', '내려 주세요', '얼마나 걸려요?', '어디까지 가세요?'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What is a T-money card (티머니) used for?',
        options: ['Restaurant payments only', 'Online shopping', 'Public transit (subway, bus, taxi)', 'International calls'],
        correct: 2,
      },
      {
        type: 'conversation',
        prompt: 'A taxi driver asks 어디까지 가세요? You want to go to Gangnam Station. You say:',
        options: ['강남역이에요.', '강남역까지 가 주세요.', '강남역 얼마예요?', '강남역 있어요?'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
