// Unit 13: Expressing Feelings & Opinions
// 3 lessons on emotions, likes/dislikes, and giving opinions

const lessons = [
  // ─── Lesson 13.1: Emotions & States ─────────────────────────
  {
    id: 'u13-l1',
    title: 'Emotions & States',
    subtitle: 'Expressing how you feel',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Talking about feelings in Korean',
        content: 'Korean has a rich set of adjectives for emotions and physical states. Many of them follow a special pattern called the \u3163\u3142-irregular, where the final \u3142 of the stem drops and changes when conjugated. Once you learn a few, you\'ll spot the pattern everywhere.',
      },
      {
        type: 'pattern',
        title: 'Feeling good or bad',
        content: 'The most basic way to express how you feel:',
        examples: [
          { kr: '\uAE30\uBD84\uC774 \uC88B\uC544\uC694.', en: 'I feel good. (literally "mood is good")' },
          { kr: '\uAE30\uBD84\uC774 \uB098\uBE60\uC694.', en: 'I feel bad. (literally "mood is bad")' },
        ],
      },
      {
        type: 'breakdown',
        title: 'Emotion & state adjectives',
        items: [
          { char: '\uD589\uBCF5\uD558\uB2E4', roman: 'haengbokhada', sound: 'to be happy', mnemonic: '\uD589\uBCF5 (happiness) + \uD558\uB2E4 (to do/be) \u2192 \uD589\uBCF5\uD574\uC694' },
          { char: '\uC2AC\uD504\uB2E4', roman: 'seulpeuda', sound: 'to be sad', mnemonic: '\u3163\u3142-irregular: \uC2AC\uD504\uB2E4 \u2192 \uC2AC\uD37C\uC694 (the \u3142 drops!)' },
          { char: '\uD53C\uACE4\uD558\uB2E4', roman: 'pigonhada', sound: 'to be tired', mnemonic: '\uD53C\uACE4 (fatigue) + \uD558\uB2E4 \u2192 \uD53C\uACE4\uD574\uC694' },
          { char: '\uBC30\uACE0\uD504\uB2E4', roman: 'baegopeda', sound: 'to be hungry', mnemonic: '\u3163\u3142-irregular: \uBC30\uACE0\uD504\uB2E4 \u2192 \uBC30\uACE0\uD30C\uC694' },
          { char: '\uBAA9\uB9C8\uB974\uB2E4', roman: 'mongmareuda', sound: 'to be thirsty', mnemonic: '\uBAA9 (throat) + \uB9C8\uB974\uB2E4 (to be dry) \u2192 \uBAA9\uB9D0\uB77C\uC694' },
          { char: '\uC878\uB9AC\uB2E4', roman: 'jollida', sound: 'to be sleepy', mnemonic: 'Regular: \uC878\uB9AC\uB2E4 \u2192 \uC878\uB824\uC694' },
          { char: '\uC544\uD504\uB2E4', roman: 'apeuda', sound: 'to be sick/hurt', mnemonic: '\u3163\u3142-irregular: \uC544\uD504\uB2E4 \u2192 \uC544\uD30C\uC694 (the \u3142 drops!)' },
        ],
      },
      {
        type: 'example',
        title: 'Using emotion adjectives in sentences',
        content: 'Here\'s how these adjectives look in real sentences:',
        korean: '\uC624\uB298 \uB108\uBB34 \uD53C\uACE4\uD574\uC694.',
        breakdown: [
          { part: '\uC624\uB298', role: 'today' },
          { part: '\uB108\uBB34', role: 'very / too much' },
          { part: '\uD53C\uACE4\uD574\uC694', role: 'am tired (\uD53C\uACE4\uD558\uB2E4 conjugated)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'The \u3163\u3142-irregular pattern',
        content: 'Many Korean adjectives ending in \u3142 are "irregular" \u2014 when conjugated, the \u3142 drops and \u3147 takes its place:\n\u2022 \uC2AC\uD504\uB2E4 \u2192 \uC2AC\uD37C\uC694 (sad)\n\u2022 \uC544\uD504\uB2E4 \u2192 \uC544\uD30C\uC694 (sick)\n\u2022 \uBC30\uACE0\uD504\uB2E4 \u2192 \uBC30\uACE0\uD30C\uC694 (hungry)\n\u2022 \uB36E\uB2E4 \u2192 \uB354\uC6CC\uC694 (hot)\nThis is one of the most common irregular patterns in Korean. Don\'t memorize a rule \u2014 just notice: "\uD504\uB2E4 endings often become \uD30C\uC694."',
      },
    ],
    vocabulary: [
      { korean: '\uAE30\uBD84', roman: 'gibun', english: 'Mood / feeling', audio: true, example: { kr: '\uAE30\uBD84\uC774 \uC88B\uC544\uC694.', en: 'I feel good.' } },
      { korean: '\uD589\uBCF5\uD558\uB2E4', roman: 'haengbokhada', english: 'To be happy', audio: true, example: { kr: '\uC800\uB294 \uD589\uBCF5\uD574\uC694.', en: 'I am happy.' } },
      { korean: '\uC2AC\uD504\uB2E4', roman: 'seulpeuda', english: 'To be sad', audio: true, example: { kr: '\uC2AC\uD37C\uC694.', en: 'I\'m sad.' } },
      { korean: '\uD53C\uACE4\uD558\uB2E4', roman: 'pigonhada', english: 'To be tired', audio: true, example: { kr: '\uB108\uBB34 \uD53C\uACE4\uD574\uC694.', en: 'I\'m so tired.' } },
      { korean: '\uBC30\uACE0\uD504\uB2E4', roman: 'baegopeda', english: 'To be hungry', audio: true, example: { kr: '\uBC30\uACE0\uD30C\uC694!', en: 'I\'m hungry!' } },
      { korean: '\uBAA9\uB9C8\uB974\uB2E4', roman: 'mongmareuda', english: 'To be thirsty', audio: true, example: { kr: '\uBAA9\uB9D0\uB77C\uC694.', en: 'I\'m thirsty.' } },
      { korean: '\uC878\uB9AC\uB2E4', roman: 'jollida', english: 'To be sleepy', audio: true, example: { kr: '\uC878\uB824\uC694.', en: 'I\'m sleepy.' } },
      { korean: '\uC544\uD504\uB2E4', roman: 'apeuda', english: 'To be sick/hurt', audio: true, example: { kr: '\uBA38\uB9AC\uAC00 \uC544\uD30C\uC694.', en: 'My head hurts.' } },
    ],
    exercises: [
      {
        type: 'matching',
        prompt: 'Match the feeling to its meaning',
        pairs: [
          { left: '\uD589\uBCF5\uD574\uC694', right: 'Happy' },
          { left: '\uC2AC\uD37C\uC694', right: 'Sad' },
          { left: '\uD53C\uACE4\uD574\uC694', right: 'Tired' },
          { left: '\uBC30\uACE0\uD30C\uC694', right: 'Hungry' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'How do you say "I feel good" in Korean?',
        options: ['\uAE30\uBD84\uC774 \uB098\uBE60\uC694.', '\uAE30\uBD84\uC774 \uC88B\uC544\uC694.', '\uD53C\uACE4\uD574\uC694.', '\uC544\uD30C\uC694.'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What is the conjugated (polite) form of \uC2AC\uD504\uB2E4 (to be sad)?',
        options: ['\uC2AC\uD504\uC694', '\uC2AC\uD37C\uC694', '\uC2AC\uD504\uD574\uC694', '\uC2AC\uD504\uB2C8\uB2E4'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '\uBA38\uB9AC\uAC00 ___. (My head hurts.)',
        options: ['\uC2AC\uD37C\uC694', '\uC544\uD30C\uC694', '\uD53C\uACE4\uD574\uC694', '\uC878\uB824\uC694'],
        correct: 1,
        hint: 'This comes from \uC544\uD504\uB2E4 (to be sick/hurt).',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I\'m so hungry!"',
        tiles: ['\uBC30\uACE0\uD30C\uC694', '\uB108\uBB34', '!'],
        correct: ['\uB108\uBB34', '\uBC30\uACE0\uD30C\uC694', '!'],
        english: 'I\'m so hungry!',
      },
      {
        type: 'conversation',
        prompt: 'Your friend asks how you\'re feeling. You\'re very tired today. You say:',
        options: ['\uD589\uBCF5\uD574\uC694!', '\uBC30\uACE0\uD30C\uC694.', '\uC624\uB298 \uB108\uBB34 \uD53C\uACE4\uD574\uC694.', '\uBAA9\uB9D0\uB77C\uC694.'],
        correct: 2,
      },
      {
        type: 'listening',
        prompt: 'Listen and choose the correct meaning of: \uC878\uB824\uC694.',
        audio: '\uC878\uB824\uC694',
        options: ['I\'m hungry.', 'I\'m thirsty.', 'I\'m sleepy.', 'I\'m happy.'],
        correct: 2,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 13.2: Likes & Dislikes ──────────────────────────
  {
    id: 'u13-l2',
    title: 'Likes & Dislikes',
    subtitle: 'Saying what you like and don\'t like',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Two ways to say "I like it"',
        content: 'Korean has two different ways to say you like something, and they\'re subtly different. Understanding both will make you sound much more natural. One focuses on YOUR action of liking, the other describes the thing as being good to you.',
      },
      {
        type: 'pattern',
        title: 'Active liking: Noun + \uC88B\uC544\uD574\uC694',
        content: 'Use \uC88B\uC544\uD574\uC694 when YOU actively like something. The noun takes the object marker \uC744/\uB97C:',
        examples: [
          { kr: '\uD55C\uAD6D \uC74C\uC2DD\uC744 \uC88B\uC544\uD574\uC694.', en: 'I like Korean food. (I actively enjoy it)' },
          { kr: '\uCEE4\uD53C\uB97C \uC88B\uC544\uD574\uC694.', en: 'I like coffee.' },
          { kr: '\uC74C\uC545\uC744 \uC88B\uC544\uD574\uC694.', en: 'I like music.' },
        ],
      },
      {
        type: 'pattern',
        title: 'Descriptive liking: Noun + \uC774/\uAC00 \uC88B\uC544\uC694',
        content: 'Use \uC88B\uC544\uC694 when something IS good/likable to you. The noun takes the subject marker \uC774/\uAC00:',
        examples: [
          { kr: '\uD55C\uAD6D \uC74C\uC2DD\uC774 \uC88B\uC544\uC694.', en: 'Korean food is good (to me). / I like Korean food.' },
          { kr: '\uCEE4\uD53C\uAC00 \uC88B\uC544\uC694.', en: 'Coffee is good (to me).' },
          { kr: '\uC774 \uB178\uB798\uAC00 \uC88B\uC544\uC694.', en: 'I like this song. (this song is good)' },
        ],
      },
      {
        type: 'example',
        title: 'The subtle difference',
        content: 'Compare these two sentences \u2014 both translate as "I like Korean food" but the nuance differs:',
        korean: '\uD55C\uAD6D \uC74C\uC2DD\uC744 \uC88B\uC544\uD574\uC694 vs. \uD55C\uAD6D \uC74C\uC2DD\uC774 \uC88B\uC544\uC694',
        breakdown: [
          { part: '\uC88B\uC544\uD574\uC694', role: 'Active verb \u2014 "I like it" (emphasis on your feeling)' },
          { part: '\uC88B\uC544\uC694', role: 'Descriptive verb \u2014 "It\'s good" (emphasis on the thing)' },
        ],
      },
      {
        type: 'pattern',
        title: 'Expressing dislike',
        content: 'For things you don\'t like:',
        examples: [
          { kr: '\uB354\uC6B4 \uB0A0\uC528\uB97C \uC2EB\uC5B4\uD574\uC694.', en: 'I dislike hot weather.' },
          { kr: '\uBCC4\uB85C \uC548 \uC88B\uC544\uD574\uC694.', en: 'I don\'t really like it. (softer / more polite)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Softening your dislikes',
        content: 'Koreans tend to avoid blunt negative statements. Instead of \uC2EB\uC5B4\uD574\uC694 (I dislike it), you\'ll more often hear the softer \uBCC4\uB85C \uC548 \uC88B\uC544\uD574\uC694 ("I don\'t really like it"). This indirect approach is more polite and very common in Korean conversation. \uBCC4\uB85C means "not particularly" and softens almost any negative.',
      },
    ],
    vocabulary: [
      { korean: '\uC88B\uC544\uD574\uC694', roman: 'joahaeyo', english: 'I like (active)', audio: true, example: { kr: '\uCEE4\uD53C\uB97C \uC88B\uC544\uD574\uC694.', en: 'I like coffee.' } },
      { korean: '\uC88B\uC544\uC694', roman: 'joayo', english: 'It\'s good / I like it (descriptive)', audio: true, example: { kr: '\uC774\uAC70 \uC88B\uC544\uC694!', en: 'This is good!' } },
      { korean: '\uC2EB\uC5B4\uD574\uC694', roman: 'sireohaeyo', english: 'I dislike', audio: true, example: { kr: '\uCD94\uC6B4 \uB0A0\uC528\uB97C \uC2EB\uC5B4\uD574\uC694.', en: 'I dislike cold weather.' } },
      { korean: '\uBCC4\uB85C', roman: 'byeollo', english: 'Not particularly / not really', audio: true, example: { kr: '\uBCC4\uB85C \uC548 \uC88B\uC544\uD574\uC694.', en: 'I don\'t really like it.' } },
      { korean: '\uC74C\uC2DD', roman: 'eumsik', english: 'Food', audio: true, example: { kr: '\uD55C\uAD6D \uC74C\uC2DD\uC744 \uC88B\uC544\uD574\uC694.', en: 'I like Korean food.' } },
      { korean: '\uC74C\uC545', roman: 'eumak', english: 'Music', audio: true, example: { kr: '\uC74C\uC545\uC744 \uC88B\uC544\uD574\uC694.', en: 'I like music.' } },
      { korean: '\uB0A0\uC528', roman: 'nalssi', english: 'Weather', audio: true, example: { kr: '\uC624\uB298 \uB0A0\uC528\uAC00 \uC88B\uC544\uC694.', en: 'The weather is nice today.' } },
      { korean: '\uB178\uB798', roman: 'norae', english: 'Song', audio: true, example: { kr: '\uC774 \uB178\uB798\uAC00 \uC88B\uC544\uC694.', en: 'I like this song.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which sentence means "I like Korean food" with emphasis on YOUR liking?',
        options: ['\uD55C\uAD6D \uC74C\uC2DD\uC774 \uC88B\uC544\uC694.', '\uD55C\uAD6D \uC74C\uC2DD\uC744 \uC88B\uC544\uD574\uC694.', '\uD55C\uAD6D \uC74C\uC2DD\uC744 \uC2EB\uC5B4\uD574\uC694.', '\uD55C\uAD6D \uC74C\uC2DD\uC774 \uB098\uBE60\uC694.'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '\uCEE4\uD53C___ \uC88B\uC544\uD574\uC694. (I like coffee.)',
        options: ['\uC774', '\uAC00', '\uB97C', '\uC740'],
        correct: 2,
        hint: '\uC88B\uC544\uD574\uC694 uses the object marker.',
      },
      {
        type: 'matching',
        prompt: 'Match the expression to its meaning',
        pairs: [
          { left: '\uC88B\uC544\uD574\uC694', right: 'I like (active)' },
          { left: '\uC88B\uC544\uC694', right: 'It\'s good (descriptive)' },
          { left: '\uC2EB\uC5B4\uD574\uC694', right: 'I dislike' },
          { left: '\uBCC4\uB85C \uC548 \uC88B\uC544\uD574\uC694', right: 'I don\'t really like it' },
        ],
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I like music."',
        tiles: ['\uC88B\uC544\uD574\uC694', '\uC74C\uC545\uC744'],
        correct: ['\uC74C\uC545\uC744', '\uC88B\uC544\uD574\uC694'],
        english: 'I like music.',
      },
      {
        type: 'conversation',
        prompt: 'Someone asks if you like spicy food. You don\'t really like it. The most polite way to respond is:',
        options: ['\uC2EB\uC5B4\uD574\uC694!', '\uBCC4\uB85C \uC548 \uC88B\uC544\uD574\uC694.', '\uB108\uBB34 \uB098\uBE60\uC694!', '\uC548 \uBA39\uC5B4\uC694.'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does \uBCC4\uB85C mean?',
        options: ['Very much', 'Not particularly', 'Always', 'Absolutely'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 13.3: Giving Opinions ───────────────────────────
  {
    id: 'u13-l3',
    title: 'Giving Opinions',
    subtitle: 'Sharing what you think',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Expressing opinions in Korean',
        content: 'Korean culture values indirect communication, especially when sharing opinions. Rather than stating things as absolute facts, Koreans often soften their statements with phrases like "I think..." or "It seems like..." This makes you sound both polite and natural.',
      },
      {
        type: 'pattern',
        title: '"In my opinion..." \u2014 \uC81C \uC0DD\uAC01\uC5D0\uB294...',
        content: 'A common way to start giving your opinion:',
        examples: [
          { kr: '\uC81C \uC0DD\uAC01\uC5D0\uB294 \uC88B\uC544\uC694.', en: 'In my opinion, it\'s good.' },
          { kr: '\uC81C \uC0DD\uAC01\uC5D0\uB294 \uB108\uBB34 \uBE44\uC2F8\uC694.', en: 'I think it\'s too expensive.' },
        ],
      },
      {
        type: 'pattern',
        title: '"I think..." / "It seems..." \u2014 ~\uAC83 \uAC19\uC544\uC694',
        content: 'The most versatile opinion pattern. Attach \uAC83 \uAC19\uC544\uC694 to express what you think or what seems to be the case:',
        examples: [
          { kr: '\uC88B\uC740 \uAC83 \uAC19\uC544\uC694.', en: 'I think it\'s good. / It seems good.' },
          { kr: '\uB9DB\uC788\uB294 \uAC83 \uAC19\uC544\uC694.', en: 'It seems delicious. / I think it\'s delicious.' },
          { kr: '\uBE44\uC2BC \uAC83 \uAC19\uC544\uC694.', en: 'It seems expensive.' },
          { kr: '\uC7AC\uBBF8\uC788\uB294 \uAC83 \uAC19\uC544\uC694.', en: 'I think it\'s interesting.' },
        ],
      },
      {
        type: 'example',
        title: 'How \uAC83 \uAC19\uC544\uC694 works',
        content: 'This pattern attaches differently to adjectives vs. verbs:',
        korean: '\uC88B\uC740 \uAC83 \uAC19\uC544\uC694',
        breakdown: [
          { part: '\uC88B\uC740', role: 'good (adjective with \u2013(\uC73C)\u3134 modifier form)' },
          { part: '\uAC83', role: 'thing / fact (nominalizer)' },
          { part: '\uAC19\uC544\uC694', role: '"is like" / "seems"' },
        ],
      },
      {
        type: 'pattern',
        title: 'Agreeing and disagreeing',
        content: 'Quick ways to agree or politely disagree:',
        examples: [
          { kr: '\uADF8\uB7F0 \uAC83 \uAC19\uC544\uC694.', en: 'I think so. (literally "it seems like that")' },
          { kr: '\uC544\uB2CC \uAC83 \uAC19\uC544\uC694.', en: 'I don\'t think so. (literally "it seems not")' },
          { kr: '\uADF8\uB7F4 \uC218\uB3C4 \uC788\uC5B4\uC694.', en: 'That could be. / Maybe.' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Korean indirect communication',
        content: 'In Korean culture, stating opinions too directly can come across as rude or aggressive. Using \uAC83 \uAC19\uC544\uC694 ("it seems like") softens your statement, even when you\'re quite sure. For example, instead of \uC774\uAC70 \uBE44\uC2F8\uC694 ("This is expensive"), saying \uBE44\uC2BC \uAC83 \uAC19\uC544\uC694 ("It seems expensive") is much more natural and polite. This isn\'t being wishy-washy \u2014 it\'s being considerate.',
      },
    ],
    vocabulary: [
      { korean: '\uC0DD\uAC01', roman: 'saenggak', english: 'Thought / opinion', audio: true, example: { kr: '\uC81C \uC0DD\uAC01\uC5D0\uB294...', en: 'In my opinion...' } },
      { korean: '\uAC83 \uAC19\uC544\uC694', roman: 'geot gatayo', english: 'It seems / I think', audio: true, example: { kr: '\uC88B\uC740 \uAC83 \uAC19\uC544\uC694.', en: 'I think it\'s good.' } },
      { korean: '\uADF8\uB7F0 \uAC83 \uAC19\uC544\uC694', roman: 'geureon geot gatayo', english: 'I think so', audio: true },
      { korean: '\uC544\uB2CC \uAC83 \uAC19\uC544\uC694', roman: 'anin geot gatayo', english: 'I don\'t think so', audio: true },
      { korean: '\uC88B\uC740', roman: 'joeun', english: 'Good (modifier form)', audio: true, example: { kr: '\uC88B\uC740 \uC0DD\uAC01\uC774\uC5D0\uC694!', en: 'That\'s a good idea!' } },
      { korean: '\uB9DB\uC788\uB294', roman: 'masinneun', english: 'Delicious (modifier form)', audio: true, example: { kr: '\uB9DB\uC788\uB294 \uC74C\uC2DD', en: 'Delicious food' } },
      { korean: '\uC7AC\uBBF8\uC788\uB294', roman: 'jaemiinneun', english: 'Interesting / fun (modifier form)', audio: true, example: { kr: '\uC7AC\uBBF8\uC788\uB294 \uAC83 \uAC19\uC544\uC694.', en: 'It seems fun.' } },
      { korean: '\uADF8\uB7F4 \uC218\uB3C4 \uC788\uC5B4\uC694', roman: 'geureol sudo isseoyo', english: 'That could be / Maybe', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How do you say "In my opinion..." in Korean?',
        options: ['\uC81C \uC0DD\uAC01\uC5D0\uB294...', '\uADF8\uB7F0 \uAC83 \uAC19\uC544\uC694', '\uC544\uB2CC \uAC83 \uAC19\uC544\uC694', '\uBCC4\uB85C\uC694'],
        correct: 0,
      },
      {
        type: 'fill-blank',
        prompt: '\uB9DB\uC788\uB294 ___ \uAC19\uC544\uC694. (It seems delicious.)',
        options: ['\uAC83', '\uAC83\uC774', '\uAC70', '\uB370'],
        correct: 0,
        hint: 'This little word means "thing" and acts as a nominalizer.',
      },
      {
        type: 'matching',
        prompt: 'Match the opinion phrase',
        pairs: [
          { left: '\uC81C \uC0DD\uAC01\uC5D0\uB294', right: 'In my opinion' },
          { left: '\uADF8\uB7F0 \uAC83 \uAC19\uC544\uC694', right: 'I think so' },
          { left: '\uC544\uB2CC \uAC83 \uAC19\uC544\uC694', right: 'I don\'t think so' },
          { left: '\uADF8\uB7F4 \uC218\uB3C4 \uC788\uC5B4\uC694', right: 'Maybe / That could be' },
        ],
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "I think it\'s good."',
        tiles: ['\uAC19\uC544\uC694', '\uC88B\uC740', '\uAC83'],
        correct: ['\uC88B\uC740', '\uAC83', '\uAC19\uC544\uC694'],
        english: 'I think it\'s good.',
      },
      {
        type: 'conversation',
        prompt: 'Your friend asks "\uC774 \uC601\uD654 \uC5B4\uB54C\uC694?" (How\'s this movie?). You think it\'s interesting. You say:',
        options: ['\uC2EB\uC5B4\uD574\uC694.', '\uC7AC\uBBF8\uC788\uB294 \uAC83 \uAC19\uC544\uC694.', '\uC544\uB2CC \uAC83 \uAC19\uC544\uC694.', '\uBAA8\uB974\uACA0\uC5B4\uC694.'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Someone says something you disagree with. The polite way to say "I don\'t think so" is:',
        options: ['\uC544\uB2C8\uC5D0\uC694!', '\uD2C0\uB838\uC5B4\uC694!', '\uC544\uB2CC \uAC83 \uAC19\uC544\uC694.', '\uC2EB\uC5B4\uC694!'],
        correct: 2,
      },
      {
        type: 'listening',
        prompt: 'Listen and choose the correct meaning of: \uC88B\uC740 \uAC83 \uAC19\uC544\uC694.',
        audio: '\uC88B\uC740 \uAC83 \uAC19\uC544\uC694',
        options: ['It\'s definitely good.', 'I think it\'s good.', 'It\'s not good.', 'Is it good?'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
