// Unit 14: Honorifics & Politeness
// 3 lessons on Korean's essential politeness system

const lessons = [
  // ─── Lesson 14.1: Speech Levels Overview ──────────────────
  {
    id: 'u14-l1',
    title: 'Speech Levels Overview',
    subtitle: 'The 3 levels you actually need',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Korean has 7 speech levels (you need 3)',
        content: 'Korean technically has 7 speech levels, but in modern daily life you only need to master 3. The speech level you choose tells the listener exactly how you see the relationship between you and them. Getting it wrong is a SOCIAL mistake, not just a grammar mistake.',
      },
      {
        type: 'pattern',
        title: '1. Formal polite (-ㅂ니다/습니다)',
        content: 'Used in presentations, news broadcasts, business meetings, and speaking to elders you don\'t know well. This is the "safest" level when in doubt.',
        examples: [
          { kr: '감사합니다.', en: 'Thank you. (formal polite)' },
          { kr: '반갑습니다.', en: 'Nice to meet you. (formal polite)' },
          { kr: '알겠습니다.', en: 'I understand. (formal polite)' },
          { kr: '좋습니다.', en: 'It\'s good. (formal polite)' },
        ],
      },
      {
        type: 'pattern',
        title: '2. Informal polite (-아요/어요) — YOUR DEFAULT',
        content: 'This is your everyday go-to level. Use it with most people: coworkers, acquaintances, shopkeepers, strangers. Polite but not stiff.',
        examples: [
          { kr: '감사해요.', en: 'Thank you. (informal polite)' },
          { kr: '좋아요.', en: 'It\'s good. (informal polite)' },
          { kr: '먹어요.', en: 'I eat. (informal polite)' },
          { kr: '가요.', en: 'I go. (informal polite)' },
        ],
      },
      {
        type: 'pattern',
        title: '3. Casual / 반말 (-아/어, no 요)',
        content: 'Only use with close friends the SAME age or younger, children, or when someone explicitly says "말 놓으세요" (speak casually). Never use with someone older unless invited.',
        examples: [
          { kr: '고마워.', en: 'Thanks. (casual)' },
          { kr: '좋아.', en: 'It\'s good. (casual)' },
          { kr: '먹어.', en: 'I eat. (casual)' },
          { kr: '가.', en: 'I go. (casual)' },
        ],
      },
      {
        type: 'example',
        title: 'Same sentence, 3 levels',
        content: 'Watch how "I\'m going" changes across all 3 levels:',
        korean: '갑니다 / 가요 / 가',
        breakdown: [
          { part: '갑니다', role: 'Formal polite — to your boss, in a speech' },
          { part: '가요', role: 'Informal polite — to a coworker, a stranger' },
          { part: '가', role: 'Casual — to your best friend, a child' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Why speech levels matter so much',
        content: 'Using 반말 (casual speech) with an elder or stranger is considered RUDE — like cursing at someone in English. On the flip side, using 존댓말 (polite speech) with a very close friend can feel cold and distant, like you\'re creating a wall. Koreans pay close attention to speech levels as a signal of the relationship. When in doubt, always go MORE polite, not less.',
      },
    ],
    vocabulary: [
      { korean: '존댓말', roman: 'jondaenmal', english: 'Polite/formal speech', audio: true, example: { kr: '존댓말로 말해 주세요.', en: 'Please speak in polite speech.' } },
      { korean: '반말', roman: 'banmal', english: 'Casual speech', audio: true, example: { kr: '반말 해도 돼요?', en: 'Can I speak casually?' } },
      { korean: '감사합니다', roman: 'gamsahamnida', english: 'Thank you (formal polite)', audio: true },
      { korean: '감사해요', roman: 'gamsahaeyo', english: 'Thank you (informal polite)', audio: true },
      { korean: '고마워', roman: 'gomawo', english: 'Thanks (casual)', audio: true },
      { korean: '말 놓으세요', roman: 'mal nouseyo', english: 'Please speak casually (to me)', audio: true },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        prompt: 'Which speech level should you use as your DEFAULT in Korean?',
        options: ['Formal polite (-ㅂ니다)', 'Informal polite (-아요/어요)', 'Casual / 반말', 'It doesn\'t matter'],
        correct: 1,
      },
      {
        type: 'matching',
        prompt: 'Match each speech level to its situation',
        pairs: [
          { left: '갑니다 (formal)', right: 'Business presentation' },
          { left: '가요 (informal polite)', right: 'Talking to a shopkeeper' },
          { left: '가 (casual)', right: 'Close friend same age' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 반말 mean?',
        options: ['Polite speech', 'Formal speech', 'Casual speech (no politeness)', 'Written speech'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'You meet someone older than you for the first time. Which is MOST appropriate?',
        options: ['고마워', '감사해요', '감사합니다', 'Any of these'],
        correct: 2,
      },
      {
        type: 'conversation',
        prompt: 'Your Korean friend says "말 놓으세요." What are they asking you to do?',
        options: ['Speak more formally', 'Speak casually / drop the politeness', 'Speak louder', 'Stop talking'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: 'Using casual 반말 with an elder is considered ___.',
        options: ['friendly', 'normal', 'rude', 'formal'],
        correct: 2,
        hint: 'Speech levels reflect respect in Korean culture.',
      },
    ],
    quizQuestionCount: 5,
    passThreshold: 0.7,
  },

  // ─── Lesson 14.2: Honorific Vocabulary ────────────────────
  {
    id: 'u14-l2',
    title: 'Honorific Vocabulary',
    subtitle: 'Special words that show respect',
    estimatedMinutes: 12,
    teach: [
      {
        type: 'explanation',
        title: 'Different words for respected people',
        content: 'Korean doesn\'t just change verb endings for politeness — it has completely DIFFERENT words for certain actions and nouns when the subject is someone you respect (elders, bosses, strangers). Using these honorific words shows a deeper level of respect than speech levels alone.',
      },
      {
        type: 'pattern',
        title: 'Honorific verbs',
        content: 'When the subject is someone you respect, swap in these special verbs:',
        examples: [
          { kr: '뭐 드시겠어요?', en: 'What would you like to eat? (honorific of 먹다)' },
          { kr: '잘 주무셨어요?', en: 'Did you sleep well? (honorific of 자다)' },
          { kr: '어머니 계세요?', en: 'Is your mother here? (honorific of 있다)' },
          { kr: '선생님이 말씀하셨어요.', en: 'The teacher spoke. (honorific of 말하다)' },
        ],
      },
      {
        type: 'pattern',
        title: 'Honorific nouns',
        content: 'Some nouns also have honorific forms when referring to a respected person:',
        examples: [
          { kr: '연세가 어떻게 되세요?', en: 'How old are you? (honorific of 나이/age)' },
          { kr: '성함이 어떻게 되세요?', en: 'What is your name? (honorific of 이름/name)' },
        ],
      },
      {
        type: 'example',
        title: 'Regular vs. honorific comparison',
        content: 'See how the same idea changes when you\'re being honorific:',
        korean: '밥 먹었어요? → 식사 드셨어요?',
        breakdown: [
          { part: '밥 먹었어요?', role: 'Did you eat? (regular — to a friend)' },
          { part: '식사 드셨어요?', role: 'Have you dined? (honorific — to an elder)' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'When to use honorific vocabulary',
        content: 'Use honorific words when TALKING ABOUT someone you respect, not just when talking TO them. If you tell a friend "Grandma is sleeping," you\'d still use 주무시다 (not 자다) because grandma is the subject. The respect is about WHO you\'re describing, not just who you\'re speaking to.',
      },
    ],
    vocabulary: [
      { korean: '드시다', roman: 'deusida', english: 'To eat (honorific of 먹다)', audio: true, example: { kr: '뭐 드시겠어요?', en: 'What would you like to eat?' } },
      { korean: '주무시다', roman: 'jumusida', english: 'To sleep (honorific of 자다)', audio: true, example: { kr: '잘 주무셨어요?', en: 'Did you sleep well?' } },
      { korean: '계시다', roman: 'gyesida', english: 'To be/exist (honorific of 있다)', audio: true, example: { kr: '어머니 계세요?', en: 'Is your mother here?' } },
      { korean: '말씀하시다', roman: 'malsseum-hasida', english: 'To speak (honorific of 말하다)', audio: true, example: { kr: '선생님이 말씀하셨어요.', en: 'The teacher spoke.' } },
      { korean: '연세', roman: 'yeonse', english: 'Age (honorific of 나이)', audio: true, example: { kr: '연세가 어떻게 되세요?', en: 'How old are you? (respectful)' } },
      { korean: '성함', roman: 'seongham', english: 'Name (honorific of 이름)', audio: true, example: { kr: '성함이 어떻게 되세요?', en: 'What is your name? (respectful)' } },
      { korean: '식사', roman: 'siksa', english: 'Meal (formal/honorific)', audio: true, example: { kr: '식사 드셨어요?', en: 'Have you eaten? (respectful)' } },
    ],
    exercises: [
      {
        type: 'matching',
        prompt: 'Match each regular word to its honorific form',
        pairs: [
          { left: '먹다 (to eat)', right: '드시다' },
          { left: '자다 (to sleep)', right: '주무시다' },
          { left: '있다 (to be)', right: '계시다' },
          { left: '이름 (name)', right: '성함' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'Your grandmother is sleeping. How do you tell your friend?',
        options: ['할머니가 자요.', '할머니가 주무세요.', '할머니가 있어요.', '할머니가 먹어요.'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '뭐 ___? (What would you like to eat? — honorific)',
        options: ['먹겠어요', '드시겠어요', '자겠어요', '가겠어요'],
        correct: 1,
        hint: 'The honorific form of 먹다 is 드시다.',
      },
      {
        type: 'sentence-builder',
        prompt: 'Build: "Is your mother here?" (honorific)',
        tiles: ['계세요?', '어머니'],
        correct: ['어머니', '계세요?'],
        english: 'Is your mother here?',
      },
      {
        type: 'multiple-choice',
        prompt: 'What is the honorific word for 나이 (age)?',
        options: ['성함', '연세', '식사', '말씀'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'You want to politely ask an elder their name. You say:',
        options: ['이름이 뭐예요?', '이름이 뭐야?', '성함이 어떻게 되세요?', '누구세요?'],
        correct: 2,
      },
      {
        type: 'fill-blank',
        prompt: '선생님이 ___. (The teacher spoke. — honorific)',
        options: ['말했어요', '말씀하셨어요', '이야기했어요', '말해요'],
        correct: 1,
        hint: 'The honorific form of 말하다 is 말씀하시다.',
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },

  // ─── Lesson 14.3: Age Culture & Titles ────────────────────
  {
    id: 'u14-l3',
    title: 'Age Culture & Titles',
    subtitle: 'How age shapes every relationship',
    estimatedMinutes: 10,
    teach: [
      {
        type: 'explanation',
        title: 'Age is everything in Korea',
        content: 'One of the first questions Koreans ask new people is "How old are you?" (몇 살이에요?). This isn\'t rude — it\'s essential. Your relative age determines which titles you use, which speech level is appropriate, and even who pours drinks first. Age defines the relationship dynamic.',
      },
      {
        type: 'pattern',
        title: 'Family-style titles (used with non-family too!)',
        content: 'These titles are used for ANYONE older, not just siblings. A slightly older classmate, coworker, or friend gets one of these:',
        examples: [
          { kr: '오빠, 어디 가요?', en: 'Oppa, where are you going? (girl to older male)' },
          { kr: '형, 같이 먹자!', en: 'Hyeong, let\'s eat together! (guy to older male)' },
          { kr: '언니, 이거 봐요!', en: 'Eonni, look at this! (girl to older female)' },
          { kr: '누나, 도와 주세요.', en: 'Nuna, please help me. (guy to older female)' },
        ],
      },
      {
        type: 'pattern',
        title: 'Formal titles and suffixes',
        content: 'For more formal or distant relationships:',
        examples: [
          { kr: '마크씨, 안녕하세요.', en: 'Mr./Ms. Mark, hello. (~씨 = polite name suffix)' },
          { kr: '사장님, 감사합니다.', en: 'Boss, thank you. (~님 = honorific suffix)' },
          { kr: '선생님, 질문 있어요.', en: 'Teacher, I have a question. (선생님 = teacher/honorific)' },
        ],
      },
      {
        type: 'example',
        title: 'Choosing the right title',
        content: 'Which title you use depends on YOUR gender and the other person\'s gender and age:',
        korean: '오빠 / 형 / 언니 / 누나',
        breakdown: [
          { part: '오빠', role: 'Older brother/male — used by FEMALES' },
          { part: '형', role: 'Older brother/male — used by MALES' },
          { part: '언니', role: 'Older sister/female — used by FEMALES' },
          { part: '누나', role: 'Older sister/female — used by MALES' },
        ],
      },
      {
        type: 'cultural-note',
        title: 'Age questions are normal',
        content: '"몇 살이에요?" (How old are you?) or "몇 년생이에요?" (What year were you born?) are completely normal questions in Korea, even when meeting someone for the first time. Don\'t be surprised or offended! They\'re figuring out the social dynamic. In Korean age culture, even being ONE year older matters for titles and speech levels.',
      },
    ],
    vocabulary: [
      { korean: '오빠', roman: 'oppa', english: 'Older brother (used by females)', audio: true, example: { kr: '오빠, 어디 가요?', en: 'Oppa, where are you going?' } },
      { korean: '형', roman: 'hyeong', english: 'Older brother (used by males)', audio: true, example: { kr: '형, 같이 가자!', en: 'Hyeong, let\'s go together!' } },
      { korean: '언니', roman: 'eonni', english: 'Older sister (used by females)', audio: true, example: { kr: '언니, 이거 봐요!', en: 'Eonni, look at this!' } },
      { korean: '누나', roman: 'nuna', english: 'Older sister (used by males)', audio: true, example: { kr: '누나, 도와 주세요.', en: 'Nuna, please help me.' } },
      { korean: '동생', roman: 'dongsaeng', english: 'Younger sibling', audio: true, example: { kr: '제 동생이에요.', en: 'This is my younger sibling.' } },
      { korean: '~씨', roman: '~ssi', english: 'Mr./Ms. (polite name suffix)', audio: true, example: { kr: '마크씨, 안녕하세요.', en: 'Mr./Ms. Mark, hello.' } },
      { korean: '~님', roman: '~nim', english: 'Honorific suffix (higher respect)', audio: true, example: { kr: '사장님, 감사합니다.', en: 'Boss, thank you.' } },
      { korean: '몇 살이에요?', roman: 'myeot sarieyo?', english: 'How old are you?', audio: true },
    ],
    exercises: [
      {
        type: 'matching',
        prompt: 'Match the title to who uses it',
        pairs: [
          { left: '오빠 (older male)', right: 'Used by females' },
          { left: '형 (older male)', right: 'Used by males' },
          { left: '언니 (older female)', right: 'Used by females' },
          { left: '누나 (older female)', right: 'Used by males' },
        ],
      },
      {
        type: 'multiple-choice',
        prompt: 'You are a MALE. Your friend is an older FEMALE. What do you call her?',
        options: ['언니', '누나', '오빠', '형'],
        correct: 1,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does ~님 indicate when added to a title?',
        options: ['Casual relationship', 'High respect / honorific', 'Same age', 'Younger person'],
        correct: 1,
      },
      {
        type: 'fill-blank',
        prompt: '마크___, 안녕하세요. (Hello, Mr./Ms. Mark.)',
        options: ['님', '씨', '형', '야'],
        correct: 1,
        hint: 'This polite suffix is used with someone\'s name in everyday formal situations.',
      },
      {
        type: 'conversation',
        prompt: 'You just met someone in Korea and they ask "몇 살이에요?" Why are they asking?',
        options: ['They think you look old', 'They want to know your birthday', 'They need to determine the social dynamic and proper titles', 'They\'re being rude'],
        correct: 2,
      },
      {
        type: 'multiple-choice',
        prompt: 'What does 동생 mean?',
        options: ['Older sibling', 'Younger sibling', 'Best friend', 'Coworker'],
        correct: 1,
      },
      {
        type: 'conversation',
        prompt: 'You are a FEMALE talking to an older MALE friend. You want to say "Oppa, let\'s eat together!" You say:',
        options: ['형, 같이 먹자!', '오빠, 같이 먹자!', '누나, 같이 먹자!', '언니, 같이 먹자!'],
        correct: 1,
      },
    ],
    quizQuestionCount: 6,
    passThreshold: 0.7,
  },
]

export default lessons
