// Unit 1: The Korean Alphabet (Hangul)
// 10 lessons taking learners from zero to reading Korean

const lessons = [
  // ─── Lesson 1.1: What is Hangul? ─────────────────────────
  {
    id: 'u1-l1',
    title: 'What is Hangul?',
    subtitle: 'The world\'s most scientific alphabet',
    estimatedMinutes: 5,
    teach: [
      {
        type: 'explanation',
        title: 'Meet Hangul (한글)',
        content: 'In 1443, King Sejong the Great created Hangul so that common people could read and write. Before that, only scholars who knew Chinese characters were literate. Hangul was designed to be easy to learn — and it is!',
      },
      {
        type: 'explanation',
        title: 'How it works',
        content: 'Unlike English letters that go in a line, Korean letters are stacked into syllable blocks. Each block = one syllable. A block is made of 2-3 (sometimes 4) characters: at least one consonant and one vowel.',
      },
      {
        type: 'example',
        title: 'Syllable blocks',
        content: 'The word 한 (han) is one block made of three characters stacked together:',
        korean: 'ㅎ + ㅏ + ㄴ = 한',
        breakdown: [
          { part: 'ㅎ', role: 'Initial consonant (h)' },
          { part: 'ㅏ', role: 'Vowel (a)' },
          { part: 'ㄴ', role: 'Final consonant (n)' },
        ],
      },
      {
        type: 'explanation',
        title: 'What you\'ll learn',
        content: 'By the end of this unit, you\'ll be able to read any Korean text — signs, menus, song lyrics, everything. There are 14 basic consonants, 10 basic vowels, and a handful of combinations. Let\'s start with the vowels!',
      },
    ],
    vocabulary: [],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Korean letters are stacked into...',
        options: ['Words', 'Syllable blocks', 'Paragraphs', 'Lines'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Each syllable block contains at least...',
        options: ['Two vowels', 'One consonant and one vowel', 'Three consonants', 'One vowel only'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Who created Hangul?',
        options: ['King Sejong', 'Confucius', 'A Buddhist monk', 'It evolved naturally'],
        correct: 0,
      },
    ],
    quizQuestionCount: 3,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.2: Basic Vowels ────────────────────────────
  {
    id: 'u1-l2',
    title: 'Basic Vowels',
    subtitle: 'ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'The building blocks',
        content: 'Korean vowels are built from just 3 elements: a vertical line (ㅣ), a horizontal line (ㅡ), and a short stroke. By combining these, you get all Korean vowels. Let\'s learn the 6 most basic ones.',
      },
      {
        type: 'breakdown',
        title: '6 Basic Vowels',
        items: [
          { char: 'ㅏ', roman: 'a', sound: '"ah" like "father"', mnemonic: 'Stroke goes RIGHT → mouth opens wide' },
          { char: 'ㅓ', roman: 'eo', sound: '"uh" like "hut" but rounder', mnemonic: 'Stroke goes LEFT → lips pull back slightly' },
          { char: 'ㅗ', roman: 'o', sound: '"oh" like "go"', mnemonic: 'Stroke goes UP → lips round upward' },
          { char: 'ㅜ', roman: 'u', sound: '"oo" like "food"', mnemonic: 'Stroke goes DOWN → lips push forward and down' },
          { char: 'ㅡ', roman: 'eu', sound: 'No English equivalent — flat "uh" with spread lips', mnemonic: 'Flat horizontal line → flat lips, teeth together' },
          { char: 'ㅣ', roman: 'i', sound: '"ee" like "see"', mnemonic: 'Straight vertical line → mouth forms a thin line' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Bright vs. Dark vowels',
        content: 'Strokes pointing RIGHT or UP (ㅏ, ㅗ) are "bright/yang" vowels. Strokes pointing LEFT or DOWN (ㅓ, ㅜ) are "dark/yin" vowels. This will matter later for verb conjugation!',
      },
      {
        type: 'explanation',
        title: 'Writing vowels alone',
        content: 'A vowel can\'t stand alone in Korean — it needs the silent consonant ㅇ in front. So the vowel "a" is written as 아 (ㅇ + ㅏ), "o" as 오 (ㅇ + ㅗ), etc. The ㅇ is completely silent here — just a placeholder.',
      },
    ],
    vocabulary: [
      { korean: '아', roman: 'a', english: '"ah" sound', audio: true },
      { korean: '어', roman: 'eo', english: '"uh" sound', audio: true },
      { korean: '오', roman: 'o', english: '"oh" sound', audio: true },
      { korean: '우', roman: 'u', english: '"oo" sound', audio: true },
      { korean: '으', roman: 'eu', english: 'flat "uh" sound', audio: true },
      { korean: '이', roman: 'i', english: '"ee" sound', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which character makes the "ah" sound?',
        options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'],
        correct: 0,
      },
      {
        type: 'multiple-choice',
        prompt: 'Which character makes the "oo" sound?',
        options: ['ㅗ', 'ㅡ', 'ㅜ', 'ㅣ'],
        correct: 2,
      },
      {
        type: 'listening',
        audio: '오',
        prompt: 'What sound did you hear?',
        options: ['아 (a)', '오 (o)', '우 (u)', '으 (eu)'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match each vowel to its sound',
        pairs: [
          { left: 'ㅏ', right: 'a (ah)' },
          { left: 'ㅓ', right: 'eo (uh)' },
          { left: 'ㅗ', right: 'o (oh)' },
          { left: 'ㅜ', right: 'u (oo)' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'Why is 아 written with ㅇ in front?',
        options: [
          'ㅇ adds a nasal sound',
          'Vowels can\'t stand alone — ㅇ is a silent placeholder',
          'It\'s just decoration',
          'ㅇ means the vowel is long',
        ],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '으',
        prompt: 'What sound did you hear?',
        options: ['이 (i)', '우 (u)', '으 (eu)', '어 (eo)'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'ㅏ and ㅗ are called "bright" vowels because their strokes point...',
        options: ['Left and down', 'Right and up', 'Right and down', 'Left and up'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.3: Y-Vowels ───────────────────────────────
  {
    id: 'u1-l3',
    title: 'Y-Vowels',
    subtitle: 'ㅑ ㅕ ㅛ ㅠ',
    estimatedMinutes: 6,
    teach: [
      {
        type: 'explanation',
        title: 'The simplest rule in Korean',
        content: 'To add a "y" sound to a vowel, just double the short stroke. That\'s it! This is one of the most elegant features of Hangul.',
      },
      {
        type: 'breakdown',
        title: 'Y-Vowels',
        items: [
          { char: 'ㅑ', roman: 'ya', sound: '"yah"', mnemonic: 'ㅏ with double stroke = ya' },
          { char: 'ㅕ', roman: 'yeo', sound: '"yuh"', mnemonic: 'ㅓ with double stroke = yeo' },
          { char: 'ㅛ', roman: 'yo', sound: '"yo"', mnemonic: 'ㅗ with double stroke = yo' },
          { char: 'ㅠ', roman: 'yu', sound: '"yoo"', mnemonic: 'ㅜ with double stroke = yu' },
        ],
      },
      {
        type: 'comparison',
        title: 'Spot the difference',
        content: 'Can you see the pattern? One stroke → basic vowel. Two strokes → y-vowel.',
        pairs: [
          { basic: 'ㅏ (a)', y: 'ㅑ (ya)' },
          { basic: 'ㅓ (eo)', y: 'ㅕ (yeo)' },
          { basic: 'ㅗ (o)', y: 'ㅛ (yo)' },
          { basic: 'ㅜ (u)', y: 'ㅠ (yu)' },
        ],
      },
    ],
    vocabulary: [
      { korean: '야', roman: 'ya', english: '"ya" sound', audio: true },
      { korean: '여', roman: 'yeo', english: '"yuh" sound', audio: true },
      { korean: '요', roman: 'yo', english: '"yo" sound', audio: true },
      { korean: '유', roman: 'yu', english: '"yoo" sound', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What makes a vowel into a y-vowel?',
        options: ['Add ㅇ', 'Double the short stroke', 'Add a circle', 'Flip it horizontally'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'ㅛ is the y-version of which vowel?',
        options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'],
        correct: 2,
      },
      {
        type: 'listening',
        audio: '여',
        prompt: 'What sound did you hear?',
        options: ['야 (ya)', '여 (yeo)', '요 (yo)', '유 (yu)'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match each basic vowel to its y-vowel',
        pairs: [
          { left: 'ㅏ → ?', right: 'ㅑ' },
          { left: 'ㅓ → ?', right: 'ㅕ' },
          { left: 'ㅗ → ?', right: 'ㅛ' },
          { left: 'ㅜ → ?', right: 'ㅠ' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'How is ㅑ pronounced?',
        options: ['a', 'ya', 'yo', 'yu'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.4: Basic Consonants Part 1 ─────────────────
  {
    id: 'u1-l4',
    title: 'Consonants Part 1',
    subtitle: 'ㄱ ㄴ ㄷ ㄹ ㅁ',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Consonants mimic your mouth',
        content: 'Here\'s what makes Hangul brilliant: each consonant\'s shape is based on what your mouth, tongue, or throat does to make that sound. This means once you understand the logic, the shapes make sense!',
      },
      {
        type: 'breakdown',
        title: 'First 5 Consonants',
        items: [
          { char: 'ㄱ', roman: 'g/k', sound: '"g" at start of word, "k" at end', mnemonic: 'Shape of the tongue touching the back of the roof of the mouth' },
          { char: 'ㄴ', roman: 'n', sound: 'Always "n"', mnemonic: 'Shape of tongue tip touching behind front teeth' },
          { char: 'ㄷ', roman: 'd/t', sound: '"d" at start, "t" at end', mnemonic: 'Shape of tongue flat against roof of mouth' },
          { char: 'ㄹ', roman: 'r/l', sound: '"r" between vowels, "l" at end of syllable', mnemonic: 'Tongue curling — the trickiest sound for English speakers!' },
          { char: 'ㅁ', roman: 'm', sound: 'Always "m"', mnemonic: 'Shape of closed lips seen from the side — looks like a box (mouth closed!)' },
        ],
      },
      {
        type: 'example',
        title: 'Your first syllables!',
        content: 'Combine these consonants with ㅏ (a) to make real syllables:',
        korean: '가 나 다 라 마',
        breakdown: [
          { part: '가', role: 'ga — ㄱ + ㅏ' },
          { part: '나', role: 'na — ㄴ + ㅏ' },
          { part: '다', role: 'da — ㄷ + ㅏ' },
          { part: '라', role: 'ra — ㄹ + ㅏ' },
          { part: '마', role: 'ma — ㅁ + ㅏ' },
        ],
      },
      {
        type: 'explanation',
        title: 'You can read now!',
        content: 'With just 5 consonants and 6 vowels, you can already read 30 Korean syllables! Try: 구 (gu), 나 (na), 모 (mo), 리 (ri), 두 (du). You\'re on your way!',
      },
    ],
    vocabulary: [
      { korean: '가', roman: 'ga', english: 'syllable "ga"', audio: true },
      { korean: '나', roman: 'na', english: 'syllable "na" (also means "I/me" casually)', audio: true },
      { korean: '다', roman: 'da', english: 'syllable "da"', audio: true },
      { korean: '라', roman: 'ra', english: 'syllable "ra"', audio: true },
      { korean: '마', roman: 'ma', english: 'syllable "ma"', audio: true },
      { korean: '구', roman: 'gu', english: 'syllable "gu"', audio: true },
      { korean: '모', roman: 'mo', english: 'syllable "mo"', audio: true },
      { korean: '리', roman: 'ri', english: 'syllable "ri"', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which consonant sounds like "n"?',
        options: ['ㄱ', 'ㄴ', 'ㄷ', 'ㅁ'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does ㅁ sound like?',
        options: ['n', 'r/l', 'm', 'g/k'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'ㄱ + ㅏ = ?',
        options: ['나', '가', '다', '마'],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '나',
        prompt: 'What syllable did you hear?',
        options: ['가 (ga)', '나 (na)', '다 (da)', '마 (ma)'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match consonants to their sounds',
        pairs: [
          { left: 'ㄱ', right: 'g/k' },
          { left: 'ㄴ', right: 'n' },
          { left: 'ㄷ', right: 'd/t' },
          { left: 'ㅁ', right: 'm' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'How is 무 pronounced?',
        options: ['gu', 'mu', 'nu', 'du'],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '구',
        prompt: 'What syllable did you hear?',
        options: ['구 (gu)', '누 (nu)', '두 (du)', '루 (ru)'],
        correct: 0,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.5: Basic Consonants Part 2 ─────────────────
  {
    id: 'u1-l5',
    title: 'Consonants Part 2',
    subtitle: 'ㅂ ㅅ ㅇ ㅈ',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'breakdown',
        title: 'Next 4 Consonants',
        items: [
          { char: 'ㅂ', roman: 'b/p', sound: '"b" at start, "p" at end', mnemonic: 'Shape of lips seen from the front — two vertical lines like lips pressing together' },
          { char: 'ㅅ', roman: 's', sound: '"s" (but "sh" before ㅣ)', mnemonic: 'Shape of a tooth — tongue near the teeth makes the "s" sound' },
          { char: 'ㅇ', roman: 'ng / silent', sound: 'SILENT at start, "ng" at end!', mnemonic: 'Circle = open throat. At start → empty (silent). At end → nasal "ng"' },
          { char: 'ㅈ', roman: 'j', sound: '"j" at start, light "ch" at end', mnemonic: 'ㅅ with a line on top — looks like ㅅ wearing a hat' },
        ],
      },
      {
        type: 'explanation',
        title: 'The special one: ㅇ',
        content: 'ㅇ is the most important character to understand. At the BEGINNING of a syllable, it\'s completely silent — it\'s just a placeholder so vowels have a consonant spot filled. At the END of a syllable, it sounds like "ng" (like "sing").',
      },
      {
        type: 'example',
        title: 'ㅇ in action',
        korean: '아 vs 앙',
        breakdown: [
          { part: '아', role: 'a — ㅇ is silent here (just the vowel sound)' },
          { part: '앙', role: 'ang — ㅇ sounds like "ng" at the end' },
        ],
      },
      {
        type: 'example',
        title: 'New syllables',
        korean: '바 사 아 자',
        breakdown: [
          { part: '바', role: 'ba — ㅂ + ㅏ' },
          { part: '사', role: 'sa — ㅅ + ㅏ' },
          { part: '아', role: 'a — ㅇ (silent) + ㅏ' },
          { part: '자', role: 'ja — ㅈ + ㅏ' },
        ],
      },
    ],
    vocabulary: [
      { korean: '바', roman: 'ba', english: 'syllable "ba"', audio: true },
      { korean: '사', roman: 'sa', english: 'syllable "sa"', audio: true },
      { korean: '아', roman: 'a', english: 'syllable "a" (ㅇ is silent)', audio: true },
      { korean: '자', roman: 'ja', english: 'syllable "ja"', audio: true },
      { korean: '시', roman: 'si/shi', english: 'syllable "shi" (ㅅ before ㅣ = "sh")', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What is special about ㅇ?',
        options: [
          'It always sounds like "ng"',
          'It\'s silent at the start but sounds like "ng" at the end',
          'It only appears in vowels',
          'It sounds like "o"',
        ],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'ㅅ + ㅣ sounds like...',
        options: ['si', 'shi', 'ji', 'chi'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'ㅂ + ㅗ = ?',
        options: ['보', '소', '조', '오'],
        correct: 0,
      },
      {
        type: 'listening',
        audio: '자',
        prompt: 'What syllable did you hear?',
        options: ['사 (sa)', '자 (ja)', '바 (ba)', '아 (a)'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match consonants to their sounds',
        pairs: [
          { left: 'ㅂ', right: 'b/p' },
          { left: 'ㅅ', right: 's' },
          { left: 'ㅇ', right: 'silent / ng' },
          { left: 'ㅈ', right: 'j' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'Which is pronounced "sa"?',
        options: ['자', '사', '바', '아'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.6: Aspirated Consonants ────────────────────
  {
    id: 'u1-l6',
    title: 'Aspirated Consonants',
    subtitle: 'ㅊ ㅋ ㅌ ㅍ ㅎ',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'Add a puff of air',
        content: 'Aspirated consonants are the "breathy" versions — same mouth position, but with a strong puff of air. Hold your hand in front of your mouth: you should feel air for these!',
      },
      {
        type: 'breakdown',
        title: 'Aspirated Consonants',
        items: [
          { char: 'ㅊ', roman: 'ch', sound: 'Strong "ch" with breath', mnemonic: 'Aspirated ㅈ — ㅈ got an extra stroke on top' },
          { char: 'ㅋ', roman: 'k', sound: '"k" like "kite" (with breath)', mnemonic: 'Aspirated ㄱ — ㄱ with an extra stroke' },
          { char: 'ㅌ', roman: 't', sound: '"t" like "top" (with breath)', mnemonic: 'Aspirated ㄷ — ㄷ with an extra stroke' },
          { char: 'ㅍ', roman: 'p', sound: '"p" like "pop" (with breath)', mnemonic: 'Aspirated ㅂ — ㅂ with an extra stroke' },
          { char: 'ㅎ', roman: 'h', sound: '"h" like "hat"', mnemonic: 'Standalone H — a person wearing a hat' },
        ],
      },
      {
        type: 'pattern',
        title: 'See the pattern!',
        content: 'Each aspirated consonant builds on a basic one by adding a stroke. This is Hangul\'s genius — related sounds look similar:',
        pairs: [
          { basic: 'ㄱ (g)', aspirated: 'ㅋ (k)' },
          { basic: 'ㄷ (d)', aspirated: 'ㅌ (t)' },
          { basic: 'ㅂ (b)', aspirated: 'ㅍ (p)' },
          { basic: 'ㅈ (j)', aspirated: 'ㅊ (ch)' },
        ],
      },
    ],
    vocabulary: [
      { korean: '카', roman: 'ka', english: 'syllable "ka"', audio: true },
      { korean: '타', roman: 'ta', english: 'syllable "ta"', audio: true },
      { korean: '파', roman: 'pa', english: 'syllable "pa"', audio: true },
      { korean: '차', roman: 'cha', english: 'syllable "cha"', audio: true },
      { korean: '하', roman: 'ha', english: 'syllable "ha"', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'ㅋ is the aspirated version of...',
        options: ['ㄴ', 'ㄱ', 'ㄷ', 'ㅂ'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does "aspirated" mean?',
        options: [
          'Spoken quietly',
          'Pronounced with a puff of air',
          'Said very fast',
          'Made with the nose',
        ],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match basic consonant to its aspirated form',
        pairs: [
          { left: 'ㄱ (g) →', right: 'ㅋ (k)' },
          { left: 'ㄷ (d) →', right: 'ㅌ (t)' },
          { left: 'ㅂ (b) →', right: 'ㅍ (p)' },
          { left: 'ㅈ (j) →', right: 'ㅊ (ch)' },
        ],
      },
      {
        type: 'listening',
        audio: '하',
        prompt: 'What syllable did you hear?',
        options: ['카 (ka)', '타 (ta)', '파 (pa)', '하 (ha)'],
        correct: 3,
      },
      {
        type: 'multiple-choice',
        prompt: 'ㅌ + ㅗ = ?',
        options: ['토', '코', '포', '호'],
        correct: 0,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.7: Double Consonants ───────────────────────
  {
    id: 'u1-l7',
    title: 'Double Consonants',
    subtitle: 'ㄲ ㄸ ㅃ ㅆ ㅉ',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'Tensed sounds',
        content: 'Double (tensed) consonants are made with NO breath — instead, you tense your throat. Think of the "k" in "sky" vs the "k" in "kite". In "sky", there\'s no puff of air. That\'s a tensed sound!',
      },
      {
        type: 'breakdown',
        title: 'Double Consonants',
        items: [
          { char: 'ㄲ', roman: 'kk', sound: 'Tensed "k" — tight, no air', mnemonic: 'Double ㄱ' },
          { char: 'ㄸ', roman: 'tt', sound: 'Tensed "t" — tight, no air', mnemonic: 'Double ㄷ' },
          { char: 'ㅃ', roman: 'pp', sound: 'Tensed "p" — tight, no air', mnemonic: 'Double ㅂ' },
          { char: 'ㅆ', roman: 'ss', sound: 'Tensed "s" — sharp, strong', mnemonic: 'Double ㅅ' },
          { char: 'ㅉ', roman: 'jj', sound: 'Tensed "j" — tight, no air', mnemonic: 'Double ㅈ' },
        ],
      },
      {
        type: 'comparison',
        title: 'The 3-way system',
        content: 'Korean has THREE versions of these sounds. This is the hardest part of Korean pronunciation. Don\'t worry — it gets easier with practice!',
        pairs: [
          { basic: 'ㄱ (g) soft', aspirated: 'ㅋ (k) breathy', tensed: 'ㄲ (kk) tight' },
          { basic: 'ㄷ (d) soft', aspirated: 'ㅌ (t) breathy', tensed: 'ㄸ (tt) tight' },
          { basic: 'ㅂ (b) soft', aspirated: 'ㅍ (p) breathy', tensed: 'ㅃ (pp) tight' },
        ],
      },
    ],
    vocabulary: [
      { korean: '까', roman: 'kka', english: 'syllable "kka"', audio: true },
      { korean: '따', roman: 'tta', english: 'syllable "tta"', audio: true },
      { korean: '빠', roman: 'ppa', english: 'syllable "ppa"', audio: true },
      { korean: '싸', roman: 'ssa', english: 'syllable "ssa"', audio: true },
      { korean: '짜', roman: 'jja', english: 'syllable "jja"', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Double consonants are made by...',
        options: ['Adding breath', 'Tensing the throat with no air', 'Speaking louder', 'Speaking slowly'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Which is the tensed version of ㅂ?',
        options: ['ㅍ', 'ㄲ', 'ㅃ', 'ㅆ'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'Korean has ___ versions of sounds like k, t, p:',
        options: ['Two (soft and hard)', 'Three (soft, breathy, tensed)', 'Four', 'Just one'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match to the correct category',
        pairs: [
          { left: 'ㄱ', right: 'Basic (soft)' },
          { left: 'ㅋ', right: 'Aspirated (breathy)' },
          { left: 'ㄲ', right: 'Tensed (tight)' },
          { left: 'ㅎ', right: 'Standalone' },
        ],
      },
      {
        type: 'listening',
        audio: '싸',
        prompt: 'What syllable did you hear?',
        options: ['사 (sa)', '싸 (ssa)', '자 (ja)', '짜 (jja)'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.8: Compound Vowels ─────────────────────────
  {
    id: 'u1-l8',
    title: 'Compound Vowels',
    subtitle: 'ㅐ ㅔ ㅘ ㅝ ㅟ ㅢ',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'Two vowels → one sound',
        content: 'Compound vowels combine two basic vowels into one. Some have unique sounds, but many have merged in modern Korean — making them easier than they look!',
      },
      {
        type: 'breakdown',
        title: 'Key Compound Vowels',
        items: [
          { char: 'ㅐ', roman: 'ae', sound: '"e" like "bed"', mnemonic: 'ㅏ + ㅣ combined. In modern Korean, sounds like "e"' },
          { char: 'ㅔ', roman: 'e', sound: '"e" like "bed" (same as ㅐ!)', mnemonic: 'ㅓ + ㅣ combined. Sounds identical to ㅐ for most speakers' },
          { char: 'ㅘ', roman: 'wa', sound: '"wa" like "want"', mnemonic: 'ㅗ + ㅏ = say them fast → "wa"' },
          { char: 'ㅝ', roman: 'wo', sound: '"wo" like "wonder"', mnemonic: 'ㅜ + ㅓ = say them fast → "wo"' },
          { char: 'ㅟ', roman: 'wi', sound: '"wi" like "we"', mnemonic: 'ㅜ + ㅣ = say them fast → "wi"' },
          { char: 'ㅢ', roman: 'ui', sound: '"eui" — varies by position', mnemonic: 'ㅡ + ㅣ = the tricky one. Often just sounds like "e"' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Don\'t stress ㅐ vs ㅔ',
        content: 'Even native Korean speakers often can\'t tell ㅐ and ㅔ apart by sound — they\'ve merged in modern Seoul Korean. You\'ll learn which to use through vocabulary, not by ear. So don\'t worry about it!',
      },
    ],
    vocabulary: [
      { korean: '애', roman: 'ae', english: '"ae/e" sound', audio: true },
      { korean: '에', roman: 'e', english: '"e" sound', audio: true },
      { korean: '와', roman: 'wa', english: '"wa" sound', audio: true },
      { korean: '워', roman: 'wo', english: '"wo" sound', audio: true },
      { korean: '위', roman: 'wi', english: '"wi" sound', audio: true },
      { korean: '의', roman: 'ui', english: '"eui" sound', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'ㅘ is made by combining which two vowels?',
        options: ['ㅗ + ㅏ', 'ㅜ + ㅓ', 'ㅏ + ㅣ', 'ㅡ + ㅣ'],
        correct: 0,
      },
      {
        type: 'multiple-choice',
        prompt: 'In modern Korean, ㅐ and ㅔ sound...',
        options: ['Very different', 'Nearly identical', 'The same as ㅏ', 'The same as ㅗ'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match compound vowels to sounds',
        pairs: [
          { left: 'ㅘ', right: 'wa' },
          { left: 'ㅝ', right: 'wo' },
          { left: 'ㅟ', right: 'wi' },
          { left: 'ㅐ', right: 'ae/e' },
        ],
      },
      {
        type: 'listening',
        audio: '와',
        prompt: 'What sound did you hear?',
        options: ['와 (wa)', '워 (wo)', '위 (wi)', '외 (oe)'],
        correct: 0,
      },
      {
        type: 'multiple-choice',
        prompt: 'Which compound vowel sounds like "wi" (as in "we")?',
        options: ['ㅘ', 'ㅝ', 'ㅟ', 'ㅢ'],
        correct: 2,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.9: Final Consonants (받침) ──────────────────
  {
    id: 'u1-l9',
    title: 'Final Consonants',
    subtitle: '받침 (Batchim)',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'The bottom of the block',
        content: 'Syllable blocks can have a consonant at the bottom — this is called 받침 (batchim, meaning "support/base"). It changes the syllable from an open sound to a closed one: 가 (ga) → 간 (gan), 마 (ma) → 말 (mal).',
      },
      {
        type: 'explanation',
        title: 'Only 7 ending sounds',
        content: 'Here\'s a huge shortcut: no matter which consonant is at the bottom, there are only 7 actual sounds that endings can make. Many consonants "collapse" into the same ending sound:',
      },
      {
        type: 'breakdown',
        title: 'The 7 Ending Sounds',
        items: [
          { char: 'ㄱ', roman: 'k', sound: 'Unreleased "k" — tongue back, stop', mnemonic: 'Also: ㅋ and ㄲ sound like ㄱ at the end' },
          { char: 'ㄴ', roman: 'n', sound: '"n" — tongue behind front teeth', mnemonic: 'Always ㄴ' },
          { char: 'ㄷ', roman: 't', sound: 'Unreleased "t" — tongue on roof', mnemonic: 'Also: ㅅ, ㅈ, ㅊ, ㅌ, ㅆ all sound like ㄷ at the end!' },
          { char: 'ㄹ', roman: 'l', sound: '"l" — tongue curled', mnemonic: 'Always ㄹ' },
          { char: 'ㅁ', roman: 'm', sound: '"m" — lips closed', mnemonic: 'Always ㅁ' },
          { char: 'ㅂ', roman: 'p', sound: 'Unreleased "p" — lips closed, stop', mnemonic: 'Also: ㅍ sounds like ㅂ at the end' },
          { char: 'ㅇ', roman: 'ng', sound: '"ng" like "sing"', mnemonic: 'Remember: ㅇ is only "ng" at the END!' },
        ],
      },
      {
        type: 'example',
        title: 'Examples',
        korean: '한 국 말 밥 강',
        breakdown: [
          { part: '한', role: 'han — ㅎ+ㅏ+ㄴ (n ending)' },
          { part: '국', role: 'guk — ㄱ+ㅜ+ㄱ (k ending)' },
          { part: '말', role: 'mal — ㅁ+ㅏ+ㄹ (l ending)' },
          { part: '밥', role: 'bap — ㅂ+ㅏ+ㅂ (p ending)' },
          { part: '강', role: 'gang — ㄱ+ㅏ+ㅇ (ng ending)' },
        ],
      },
    ],
    vocabulary: [
      { korean: '한', roman: 'han', english: 'syllable with ㄴ ending', audio: true },
      { korean: '국', roman: 'guk', english: 'syllable with ㄱ ending', audio: true },
      { korean: '말', roman: 'mal', english: 'syllable with ㄹ ending (also: language/words)', audio: true },
      { korean: '밥', roman: 'bap', english: 'syllable with ㅂ ending (also: rice/meal)', audio: true },
      { korean: '강', roman: 'gang', english: 'syllable with ㅇ ending (also: river)', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How many actual ending sounds exist in Korean?',
        options: ['14', '10', '7', '5'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'ㅅ at the end of a syllable sounds like...',
        options: ['s', 't (like ㄷ)', 'sh', 'It\'s silent'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What is the ending sound in 강?',
        options: ['g', 'ng', 'n', 'k'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the word to its ending sound',
        pairs: [
          { left: '한 (han)', right: 'n' },
          { left: '밥 (bap)', right: 'p' },
          { left: '말 (mal)', right: 'l' },
          { left: '국 (guk)', right: 'k' },
        ],
      },
      {
        type: 'listening',
        audio: '밥',
        prompt: 'What word did you hear?',
        options: ['밥 (bap)', '반 (ban)', '발 (bal)', '방 (bang)'],
        correct: 0,
      },
      {
        type: 'multiple-choice',
        prompt: '받침 means...',
        options: ['Vowel', 'Consonant', 'The final consonant at the bottom of a syllable block', 'A type of Korean food'],
        correct: 2,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 1.10: Reading Practice ───────────────────────
  {
    id: 'u1-l10',
    title: 'Reading Practice',
    subtitle: 'Put it all together!',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'You can read Korean! 🎉',
        content: 'You now know all the building blocks of Hangul. Let\'s put everything together by reading real Korean words. Sound them out character by character, syllable by syllable.',
      },
      {
        type: 'breakdown',
        title: 'Real Korean Words',
        items: [
          { char: '한국', roman: 'han-guk', sound: 'Korea', mnemonic: '한 (han) + 국 (guk)' },
          { char: '사랑', roman: 'sa-rang', sound: 'Love', mnemonic: '사 (sa) + 랑 (rang)' },
          { char: '감사', roman: 'gam-sa', sound: 'Gratitude/Thanks', mnemonic: '감 (gam) + 사 (sa)' },
          { char: '학생', roman: 'hak-saeng', sound: 'Student', mnemonic: '학 (hak) + 생 (saeng)' },
          { char: '친구', roman: 'chin-gu', sound: 'Friend', mnemonic: '친 (chin) + 구 (gu)' },
          { char: '선생님', roman: 'seon-saeng-nim', sound: 'Teacher', mnemonic: '선 (seon) + 생 (saeng) + 님 (nim)' },
        ],
      },
      {
        type: 'explanation',
        title: 'Recognizing loanwords',
        content: 'Korean borrows many English words! Once you can read Hangul, you\'ll recognize them:',
      },
      {
        type: 'breakdown',
        title: 'Loanwords (외래어)',
        items: [
          { char: '커피', roman: 'keo-pi', sound: 'Coffee', mnemonic: 'Sounds like "coffee"!' },
          { char: '버스', roman: 'beo-seu', sound: 'Bus', mnemonic: 'Sounds like "bus"!' },
          { char: '택시', roman: 'taek-si', sound: 'Taxi', mnemonic: 'Sounds like "taxi"!' },
          { char: '컴퓨터', roman: 'keom-pyu-teo', sound: 'Computer', mnemonic: 'Sounds like "computer"!' },
        ],
      },
    ],
    vocabulary: [
      { korean: '한국', roman: 'hanguk', english: 'Korea', audio: true },
      { korean: '사랑', roman: 'sarang', english: 'Love', audio: true },
      { korean: '감사', roman: 'gamsa', english: 'Gratitude', audio: true },
      { korean: '학생', roman: 'haksaeng', english: 'Student', audio: true },
      { korean: '친구', roman: 'chingu', english: 'Friend', audio: true },
      { korean: '커피', roman: 'keopi', english: 'Coffee', audio: true },
      { korean: '버스', roman: 'beoseu', english: 'Bus', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'How is 한국 pronounced?',
        options: ['han-guk', 'ha-nguk', 'han-kuk', 'hang-uk'],
        correct: 0,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 사랑 mean?',
        options: ['Friend', 'Student', 'Love', 'Teacher'],
        correct: 2,
      },
      {
        type: 'listening',
        audio: '친구',
        prompt: 'What word did you hear?',
        options: ['학생 (student)', '친구 (friend)', '선생님 (teacher)', '사랑 (love)'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the Korean word to its meaning',
        pairs: [
          { left: '한국', right: 'Korea' },
          { left: '학생', right: 'Student' },
          { left: '커피', right: 'Coffee' },
          { left: '감사', right: 'Gratitude' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: '컴퓨터 is a loanword from English. What does it mean?',
        options: ['Camera', 'Computer', 'Calendar', 'Carpet'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'How many syllable blocks are in 선생님?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correct: 1,
      },
      {
        type: 'listening',
        audio: '버스',
        prompt: 'This is a loanword. What English word is it?',
        options: ['Boss', 'Bus', 'Bass', 'Best'],
        correct: 1,
      },
    ],
    quizQuestionCount: 7,
    passThreshold: 0.7,
  },
]

export default lessons
