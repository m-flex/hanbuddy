// Unit 17: Culture & Communication
// 3 lessons on Korean cultural context and real communication

const lessons = [
  // ─── Lesson 17.1: Korean Dining Culture ─────────────────
  {
    id: 'u17-l1',
    title: 'Korean Dining Culture',
    subtitle: 'Meal expressions and customs you need to know',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Eating is a social event in Korea',
        content: 'Korean meals come with their own set of phrases and customs. Before and after every meal, Koreans say specific expressions — skipping them would be like not saying "thank you" in English. These phrases show gratitude for the food and respect for the person who prepared or paid for it.',
      },
      {
        type: 'pattern',
        title: 'Before and after eating',
        content: 'These two phrases are used at every single meal. Say the first one before you start eating, and the second one when you finish:',
        examples: [
          { kr: '잘 먹겠습니다.', en: 'I will eat well. (Before eating — thank you for the food.)' },
          { kr: '잘 먹었습니다.', en: 'I ate well. (After eating — that was great, thank you.)' },
        ],
      },
      {
        type: 'example',
        title: 'Breaking down "잘 먹겠습니다"',
        content: 'This phrase literally expresses your intention to eat well, but it functions as gratitude:',
        korean: '잘 먹겠습니다.',
        breakdown: [
          { part: '잘', role: '"Well"' },
          { part: '먹', role: '"Eat" (verb stem)' },
          { part: '겠', role: 'Future/intention marker' },
          { part: '습니다', role: 'Formal polite ending' },
        ],
      },
      {
        type: 'pattern',
        title: 'What the host says',
        content: 'If you are hosting or treating someone, you use these phrases to encourage your guests to eat:',
        examples: [
          { kr: '많이 드세요.', en: 'Please eat a lot.' },
          { kr: '맛있게 드세요.', en: 'Please enjoy your meal.' },
        ],
      },
      {
        type: 'example',
        title: 'Breaking down "많이 드세요"',
        content: 'This is what a host, parent, or the person treating says to their guests:',
        korean: '많이 드세요.',
        breakdown: [
          { part: '많이', role: '"A lot"' },
          { part: '드세요', role: '"Please eat/drink" (honorific of 먹다)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Important dining rules',
        content: 'Korean dining has strict etiquette. Elders eat first — wait until the oldest person picks up their spoon before you start. Pour drinks for others, never for yourself (someone else will pour for you). Use two hands when receiving a drink or giving something to an elder. Never stick chopsticks upright in rice — this resembles incense at a funeral and is considered very disrespectful.',
      },
    ],
    vocabulary: [
      { korean: '잘 먹겠습니다', roman: 'jal meokgesseumnida', english: 'I will eat well (before a meal)', audio: true },
      { korean: '잘 먹었습니다', roman: 'jal meogeosseumnida', english: 'I ate well (after a meal)', audio: true },
      { korean: '많이 드세요', roman: 'mani deuseyo', english: 'Please eat a lot', audio: true },
      { korean: '맛있게 드세요', roman: 'masitge deuseyo', english: 'Please enjoy your meal', audio: true },
      { korean: '드시다', roman: 'deusida', english: 'To eat/drink (honorific)', audio: true, example: { kr: '뭐 드실래요?', en: 'What would you like to eat?' } },
      { korean: '어른', roman: 'eoreun', english: 'Elder / adult', audio: true, example: { kr: '어른이 먼저 드세요.', en: 'Elders eat first.' } },
      { korean: '건배', roman: 'geonbae', english: 'Cheers! (toast)', audio: true, example: { kr: '건배!', en: 'Cheers!' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'What do you say BEFORE starting a meal in Korea?',
        options: ['잘 먹었습니다.', '잘 먹겠습니다.', '많이 드세요.', '맛있게 드세요.'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What do you say AFTER finishing a meal?',
        options: ['잘 먹겠습니다.', '많이 드세요.', '잘 먹었습니다.', '맛있게 드세요.'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '잘 ___습니다. (I will eat well — said before a meal.)',
        options: ['먹었', '먹겠', '드셨', '마셨'],
        correct: 1,
        hint: 'This uses the future/intention marker 겠 with the verb 먹다.',
      },
      {
        type: 'matching',
        prompt: 'Match each phrase to when you use it',
        pairs: [
          { left: '잘 먹겠습니다', right: 'Before eating' },
          { left: '잘 먹었습니다', right: 'After eating' },
          { left: '많이 드세요', right: 'Host to guest' },
          { left: '맛있게 드세요', right: 'Enjoy your meal' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'You are at dinner with a Korean family. The grandmother has not started eating yet. What should you do?',
        options: [
          'Start eating right away — you are hungry.',
          'Wait until the grandmother picks up her spoon first.',
          'Pour your own drink and begin.',
          'Stick your chopsticks in the rice to hold them.',
        ],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Your Korean friend just paid for your dinner. The food is served. You say:',
        options: ['감사합니다.', '잘 먹겠습니다.', '많이 드세요.', '잘 먹었습니다.'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'Why should you NEVER stick chopsticks upright in rice?',
        options: [
          'It is bad luck for the cook.',
          'It resembles incense at a funeral — very disrespectful.',
          'It means you did not like the food.',
          'It is considered messy.',
        ],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 17.2: Korean Phone & Texting ────────────────
  {
    id: 'u17-l2',
    title: 'Korean Phone & Texting',
    subtitle: 'Phone greetings and text-speak shortcuts',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'Texting culture in Korea',
        content: 'Koreans text constantly — KakaoTalk is the dominant messaging app, used by virtually everyone. Korean texting has its own shorthand that looks confusing at first but is actually simple once you know the system. Single consonants or vowels are used as abbreviations for full words.',
      },
      {
        type: 'pattern',
        title: 'The phone-only greeting',
        content: 'There is a special word used ONLY when answering the phone. You never use it as a face-to-face greeting:',
        examples: [
          { kr: '여보세요?', en: 'Hello? (Phone greeting only!)' },
        ],
      },
      {
        type: 'pattern',
        title: 'Text-speak: laughter and emotions',
        content: 'Korean text laughter uses repeated consonants. More repetitions = more laughter:',
        examples: [
          { kr: 'ㅋㅋㅋ', en: 'Hahaha (ㅋ = "k" sound, like laughing)' },
          { kr: 'ㅎㅎㅎ', en: 'Hehe (softer, gentler laugh)' },
          { kr: 'ㅠㅠ', en: 'Crying face (ㅠ looks like tears streaming down)' },
        ],
      },
      {
        type: 'pattern',
        title: 'Text-speak: quick responses',
        content: 'Single consonants stand for common words. These are everywhere in Korean chats:',
        examples: [
          { kr: 'ㄱㄱ', en: '고고 (gogo) = "Let\'s go!"' },
          { kr: 'ㅇㅇ', en: '응응 (eung eung) = "Yeah yeah"' },
          { kr: 'ㄴㄴ', en: '노노 (nono) = "No no"' },
          { kr: '넵 / 넹', en: 'Cute version of 네 (yes) — softer and friendly' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'KakaoTalk is life',
        content: 'KakaoTalk (카카오톡, often called 카톡) is not just a messaging app — it is THE communication platform in Korea. Everyone from students to grandparents to businesses uses it. Not having KakaoTalk in Korea is like not having a phone number. Group chats, scheduling, even payments all happen through KakaoTalk.',
      },
    ],
    vocabulary: [
      { korean: '여보세요', roman: 'yeoboseyo', english: 'Hello? (phone only)', audio: true },
      { korean: 'ㅋㅋㅋ', roman: 'kkk', english: 'Hahaha (text laughter)', audio: false },
      { korean: 'ㅎㅎㅎ', roman: 'hhh', english: 'Hehe (soft laugh)', audio: false },
      { korean: 'ㅠㅠ', roman: 'yooyoo', english: 'Crying face', audio: false },
      { korean: 'ㄱㄱ', roman: 'gg', english: 'Go go / Let\'s go', audio: false },
      { korean: 'ㅇㅇ', roman: 'oo', english: 'Yeah yeah', audio: false },
      { korean: 'ㄴㄴ', roman: 'nn', english: 'No no', audio: false },
      { korean: '넵', roman: 'nep', english: 'Yes (cute/soft)', audio: true, example: { kr: '넵! 알겠습니다.', en: 'Yep! Got it.' } },
      { korean: '카톡', roman: 'katok', english: 'KakaoTalk (short form)', audio: true, example: { kr: '카톡 보내 줘.', en: 'Send me a KakaoTalk message.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'When do you use 여보세요?',
        options: ['When meeting someone in person.', 'When answering the phone.', 'When entering a store.', 'When greeting your teacher.'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the text-speak to its meaning',
        pairs: [
          { left: 'ㅋㅋㅋ', right: 'Hahaha' },
          { left: 'ㅠㅠ', right: 'Crying face' },
          { left: 'ㄱㄱ', right: 'Let\'s go' },
          { left: 'ㄴㄴ', right: 'No no' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'Your friend texts you: "밥 먹으러 갈까? ㄱㄱ" — What does ㄱㄱ mean here?',
        options: ['I\'m angry.', 'Let\'s go!', 'No thanks.', 'I\'m crying.'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does ㅠㅠ express in a text message?',
        options: ['Laughter', 'Sadness / crying', 'Agreement', 'Excitement'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'You receive a text: "내일 시험이야 ㅠㅠ" (I have a test tomorrow ㅠㅠ). How is your friend feeling?',
        options: ['Excited and happy.', 'Sad or stressed about the test.', 'Laughing about the test.', 'Saying no to the test.'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'Your Korean friend calls you. You pick up the phone and say:',
        options: ['안녕하세요!', '여보세요?', '안녕!', '반갑습니다!'],
        correct: 1,
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 17.3: Common Expressions & Konglish ─────────
  {
    id: 'u17-l3',
    title: 'Common Expressions & Konglish',
    subtitle: 'Everyday exclamations and English-Korean hybrid words',
    estimatedMinutes: 8,
    teach: [
      {
        type: 'explanation',
        title: 'Expressions you will hear everywhere',
        content: 'Korean has a set of exclamations and reactions that pop up in almost every conversation. These are not full sentences — they are quick emotional reactions. Learning them will help you understand K-dramas, Korean friends, and daily life much better.',
      },
      {
        type: 'pattern',
        title: 'Everyday Korean exclamations',
        content: 'These are the most common reactions you will hear. Memorize them — they come up constantly:',
        examples: [
          { kr: '화이팅!', en: 'Fighting! / You can do it! (encouragement)' },
          { kr: '대박!', en: 'Amazing! / Jackpot! / Wow!' },
          { kr: '진짜?', en: 'Really?! (surprise or disbelief)' },
          { kr: '어머!', en: 'Oh my! (surprise, mostly used by women)' },
          { kr: '아이고...', en: 'Oh dear... (frustration, sympathy, or tiredness)' },
          { kr: '뭐?', en: 'What?! (casual surprise)' },
        ],
      },
      {
        type: 'example',
        title: 'When to use 화이팅',
        content: '화이팅 (from English "fighting") is used to cheer someone on. It has nothing to do with actual fighting:',
        korean: '시험 화이팅!',
        breakdown: [
          { part: '시험', role: '"Test / exam"' },
          { part: '화이팅', role: '"You can do it! / Good luck!"' },
        ],
      },
      {
        type: 'pattern',
        title: 'Konglish — Korean + English words',
        content: 'Many English words have been adopted into Korean but changed to fit Korean pronunciation. These are called Konglish (콩글리시):',
        examples: [
          { kr: '셀카', en: 'Selfie (from "self-camera")' },
          { kr: '핸드폰', en: 'Cellphone (from "hand phone")' },
          { kr: '에어컨', en: 'Air conditioner (from "air con")' },
          { kr: '노트북', en: 'Laptop (from "notebook")' },
          { kr: '아이쇼핑', en: 'Window shopping (from "eye shopping")' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Konglish is not "wrong" English',
        content: 'Konglish is a natural part of the Korean language — it is not broken English. These words have been fully adopted and given new meanings. For example, 핸드폰 is not considered English in Korea — it is just the Korean word for cellphone. Understanding Konglish will help you pick up new Korean vocabulary faster because many words will sound familiar.',
      },
    ],
    vocabulary: [
      { korean: '화이팅', roman: 'hwaiting', english: 'Fighting! / You can do it!', audio: true, example: { kr: '시험 화이팅!', en: 'Good luck on the test!' } },
      { korean: '대박', roman: 'daebak', english: 'Amazing! / Jackpot!', audio: true, example: { kr: '대박! 진짜요?', en: 'Wow! Really?' } },
      { korean: '진짜', roman: 'jinjja', english: 'Really?! / For real', audio: true, example: { kr: '진짜? 믿을 수 없어!', en: 'Really? I can\'t believe it!' } },
      { korean: '어머', roman: 'eomeo', english: 'Oh my! (surprise)', audio: true },
      { korean: '아이고', roman: 'aigo', english: 'Oh dear (frustration/sympathy)', audio: true },
      { korean: '뭐', roman: 'mwo', english: 'What?', audio: true, example: { kr: '뭐? 진짜?', en: 'What? Really?' } },
      { korean: '셀카', roman: 'selka', english: 'Selfie', audio: true, example: { kr: '셀카 찍자!', en: 'Let\'s take a selfie!' } },
      { korean: '핸드폰', roman: 'haendeupon', english: 'Cellphone', audio: true, example: { kr: '핸드폰 번호가 뭐예요?', en: 'What is your phone number?' } },
      { korean: '에어컨', roman: 'eeokeon', english: 'Air conditioner', audio: true, example: { kr: '에어컨 켜 주세요.', en: 'Please turn on the AC.' } },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Your friend has a big job interview tomorrow. You want to encourage them. You say:',
        options: ['대박!', '아이고...', '화이팅!', '뭐?'],
        correct: 2,
      },
      {
        type: 'matching',
        prompt: 'Match the expression to its meaning',
        pairs: [
          { left: '화이팅', right: 'You can do it!' },
          { left: '대박', right: 'Amazing! / Wow!' },
          { left: '아이고', right: 'Oh dear...' },
          { left: '진짜?', right: 'Really?!' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'What is 셀카 in English?',
        options: ['Cell phone', 'Selfie', 'Sale', 'Celebrity'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match the Konglish word to its meaning',
        pairs: [
          { left: '셀카', right: 'Selfie' },
          { left: '핸드폰', right: 'Cellphone' },
          { left: '에어컨', right: 'Air conditioner' },
          { left: '노트북', right: 'Laptop' },
        ],
      },
      {
        type: 'conversation',
        prompt: 'Your friend tells you they won the lottery. You react with surprise:',
        options: ['아이고...', '대박! 진짜?', '화이팅!', '어서 오세요.'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'An elderly Korean woman drops her bag and sighs. She would most likely say:',
        options: ['화이팅!', '대박!', '아이고...', '뭐?'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '___! 시험 잘 봐! (You can do it! Do well on the exam!)',
        options: ['대박', '아이고', '화이팅', '어머'],
        correct: 2,
        hint: 'This is the Korean encouragement word from English "fighting."',
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
