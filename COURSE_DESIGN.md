# Hanbuddy — Korean Language Course Design

## Vision

Hanbuddy teaches Korean the way a great tutor would: explain clearly, practice immediately, reinforce constantly, and make the whole journey feel like a game you can't put down. Every lesson **teaches before it tests** — you'll never be quizzed on something you haven't been properly taught first.

Inspired by: LingoDeer (grammar explanations), Talk To Me In Korean (clear teaching), Duolingo (gamification), 90 Day Korean (practical conversation focus).

---

## Architecture Overview

```
Course
 └── Unit (themed collection, ~5-8 lessons)
      └── Lesson (~5-10 min, focused on 2-3 concepts)
           ├── Teach Phase — visual explanation with examples
           ├── Practice Phase — guided exercises (multiple types)
           └── Quiz Phase — assessment to unlock next lesson
```

**Tech stack** (keeping what works): React 19 + Vite + Tailwind + Framer Motion + Lucide icons

### Key Technical Changes
- **Data**: Replace flat vocab arrays with structured lesson content (teaching text, exercises, grammar notes)
- **Routing**: `/unit/:unitId/lesson/:lessonId` with phases (`/teach`, `/practice`, `/quiz`)
- **Progress**: Unit-based unlocking, lesson completion tracking, per-concept mastery
- **New components**: TeachView (rich explanations), ExerciseRunner (multi-type exercises), UnitMap (course overview)

### What to Keep
- SM-2 spaced repetition engine (progress.js) — battle-tested
- Audio system (TTS proxy + Cloudflare worker)
- Achievement/XP/streak system (expand it)
- Visual design language (dark theme, glassmorphism, framer motion animations)
- localStorage persistence pattern

### What to Rebuild
- All page components (new lesson flow)
- Data layer (structured course content instead of flat word lists)
- Navigation (unit map instead of stage map)
- Dashboard (course progress focused)

---

## Gamification System

### XP & Levels
| Level | Title | XP Required | Badge |
|-------|-------|-------------|-------|
| 1 | Curious | 0 | Egg |
| 2 | Beginner | 100 | Sprout |
| 3 | Student | 300 | Seedling |
| 4 | Learner | 600 | Sapling |
| 5 | Speaker | 1,200 | Tree |
| 6 | Conversant | 2,000 | Blossom |
| 7 | Skilled | 3,500 | Crane |
| 8 | Fluent | 5,500 | Tiger |
| 9 | Advanced | 8,000 | Dragon |
| 10 | Master | 12,000 | Phoenix |

### XP Sources
- Complete a teach phase: 5 XP
- Each correct practice answer: 3-8 XP (scaled by streak)
- Perfect quiz (100%): 25 XP bonus
- Complete a lesson: 15 XP
- Complete a unit: 50 XP bonus
- Daily streak bonus: streak_days × 2 XP
- Review session (5+ items): 10 XP

### Engagement Features
- **Daily Streak**: Track consecutive study days, visual fire counter
- **Hearts/Lives**: Start with 5 hearts per lesson, wrong answers lose hearts, run out = restart quiz (keeps stakes real)
- **Lesson Stars**: 1-3 stars based on quiz accuracy (1 star = pass, 3 stars = perfect)
- **Unit Badges**: Earn a themed badge for completing each unit
- **Review Reminders**: SRS-driven "X items due for review" nudge on dashboard
- **Weekly Goal**: Set daily XP target (casual: 10, regular: 20, serious: 50, intense: 100)
- **Achievements**: 30+ unlockable achievements across categories

---

## Exercise Types

### 1. Multiple Choice (Korean → English)
Show Korean word/phrase, pick the correct English meaning from 4 options.

### 2. Multiple Choice (English → Korean)
Show English meaning, pick the correct Korean from 4 options.

### 3. Listening Comprehension
Play audio, pick the correct Korean text or English meaning from options.

### 4. Sentence Builder (Word Tiles)
Given an English sentence, arrange Korean word tiles in correct order.
Critical for teaching SOV word order.

### 5. Fill in the Blank
Korean sentence with a blank — pick the correct particle, verb ending, or word.
Essential for grammar (particles, conjugation).

### 6. Type the Answer
Given English, type the Korean (with on-screen keyboard option).
Harder exercise for later in each lesson.

### 7. Matching Pairs
Match 5 Korean words to their English meanings by tapping pairs.
Good for vocabulary review.

### 8. True/False
"Does this sentence mean X?" — tests reading comprehension.

### 9. Conversation Completion
Show a dialogue with a missing line — pick the appropriate response.
Teaches practical conversation skills.

### 10. Conjugation Practice
Given a verb stem + context (formal/polite/casual), produce the correct conjugated form.

---

## Course Content — Detailed Curriculum

### Unit 1: The Korean Alphabet (Hangul)
**Goal**: Read and write all Korean characters. No vocabulary pressure — just the alphabet.

**Lesson 1.1: What is Hangul?**
- Teach: King Sejong created Hangul in 1443 to give common people literacy. It's one of the most scientific writing systems ever designed — each consonant shape mimics the mouth/tongue position used to make the sound. Korean is written in syllable blocks (consonant + vowel), not linear strings.
- Key concept: Syllable blocks = C + V (or C + V + C)
- Practice: Identify syllable blocks vs. individual characters

**Lesson 1.2: Basic Vowels (ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ)**
- Teach: The 6 basic vowels built from 3 elements — a dot (·), horizontal line (ㅡ), vertical line (ㅣ). The dot became a short stroke.
  - ㅏ (a) — vertical line + stroke right: mouth open, "ah" like "father"
  - ㅓ (eo) — vertical line + stroke left: like "uh" in "hut" but rounder
  - ㅗ (o) — horizontal line + stroke up: round lips, "oh"
  - ㅜ (u) — horizontal line + stroke down: tight round lips, "oo" like "food"
  - ㅡ (eu) — flat horizontal: smile with lips flat, say "uh" (no English equivalent — like the "u" in "put" but with flat lips)
  - ㅣ (i) — vertical line: "ee" like "see"
- Memory trick: Strokes pointing RIGHT or UP = bright/yang vowels. Strokes pointing LEFT or DOWN = dark/yin vowels. This matters for conjugation later!
- Practice: Listen and identify, match sound to character

**Lesson 1.3: Y-Vowels (ㅑ ㅕ ㅛ ㅠ)**
- Teach: Double the short stroke = add a "y" sound. That's it. ㅏ→ㅑ, ㅓ→ㅕ, ㅗ→ㅛ, ㅜ→ㅠ
  - ㅑ (ya) — "yah"
  - ㅕ (yeo) — "yuh"
  - ㅛ (yo) — "yo"
  - ㅠ (yu) — "yoo"
- Practice: Identify y-vowels vs basic vowels by ear and sight

**Lesson 1.4: Basic Consonants Part 1 (ㄱ ㄴ ㄷ ㄹ ㅁ)**
- Teach: Each consonant mimics the shape your mouth/tongue makes:
  - ㄱ (g/k) — shape of the tongue touching the back of the mouth. Sounds like "g" at start, "k" at end.
  - ㄴ (n) — shape of tongue touching behind front teeth. Always "n".
  - ㄷ (d/t) — shape of tongue flat against roof. "d" at start, "t" at end.
  - ㄹ (r/l) — tongue curling. "r" between vowels, "l" at end of syllable. (This is the trickiest sound for English speakers!)
  - ㅁ (m) — shape of closed lips from the side. Always "m".
- Practice: Build first syllable blocks: 가 (ga), 나 (na), 다 (da), 라 (ra), 마 (ma)
- Key moment: You can now read real Korean syllables!

**Lesson 1.5: Basic Consonants Part 2 (ㅂ ㅅ ㅇ ㅈ)**
- Teach:
  - ㅂ (b/p) — shape of lips from the front. "b" at start, "p" at end.
  - ㅅ (s) — shape of a tooth. Always "s" (but before ㅣ, it sounds like "sh")
  - ㅇ (ng/silent) — shape of throat (open circle). SILENT at the start of a syllable (placeholder), "ng" at the end!
  - ㅈ (j/ch) — ㅅ with a line on top. "j" at start, light "ch" at end.
- Key insight: ㅇ is the most important character to understand — it's silent when leading (아 = "a"), but sounds like "ng" when trailing (앙 = "ang")
- Practice: Build more syllables: 바 (ba), 사 (sa), 아 (a), 자 (ja)

**Lesson 1.6: Aspirated Consonants (ㅊ ㅋ ㅌ ㅍ ㅎ)**
- Teach: These are the "breathy" versions — add a puff of air. Each builds on a basic consonant:
  - ㅊ (ch) — aspirated ㅈ: strong "ch" with breath
  - ㅋ (k) — aspirated ㄱ: strong "k" with breath (like "k" in "kite")
  - ㅌ (t) — aspirated ㄷ: strong "t" with breath (like "t" in "top")
  - ㅍ (p) — aspirated ㅂ: strong "p" with breath (like "p" in "pop")
  - ㅎ (h) — standalone "h" sound
- Pattern: Basic → Aspirated is just adding a stroke. ㄱ→ㅋ, ㄷ→ㅌ, ㅂ→ㅍ, ㅈ→ㅊ
- Practice: Distinguish basic vs aspirated sounds (minimal pairs)

**Lesson 1.7: Double Consonants (ㄲ ㄸ ㅃ ㅆ ㅉ)**
- Teach: Tensed versions — NO breath, just tense your throat. Like the difference between "sky" (tensed k, no breath) vs "kite" (aspirated k, breath).
  - ㄲ (kk) — tensed ㄱ
  - ㄸ (tt) — tensed ㄷ
  - ㅃ (pp) — tensed ㅂ
  - ㅆ (ss) — tensed ㅅ
  - ㅉ (jj) — tensed ㅈ
- The 3-way distinction: ㄱ (soft g) vs ㅋ (breathy k) vs ㄲ (tight k). This is THE hardest part of Korean pronunciation for English speakers.
- Practice: Listen and categorize: basic / aspirated / tensed

**Lesson 1.8: Compound Vowels (ㅐ ㅔ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ)**
- Teach: Two vowels merged into one:
  - ㅐ (ae) — ㅏ+ㅣ = sounds like "e" in "bed" (in modern Korean, ㅐ and ㅔ sound nearly identical)
  - ㅔ (e) — ㅓ+ㅣ = also sounds like "e" in "bed"
  - ㅘ (wa) — ㅗ+ㅏ = "wa"
  - ㅝ (wo) — ㅜ+ㅓ = "wo"
  - ㅟ (wi) — ㅜ+ㅣ = "wi" like "we"
  - ㅢ (ui) — ㅡ+ㅣ = "eui" (the tricky one — depends on position)
  - ㅙ (wae), ㅚ (oe), ㅞ (we) — less common, all approaching "we" sound
- Practice: Read full syllable blocks with compound vowels

**Lesson 1.9: Final Consonants (받침 - Batchim)**
- Teach: Syllable blocks can have a consonant at the bottom: 한 (han) = ㅎ+ㅏ+ㄴ. The bottom consonant often changes pronunciation:
  - Only 7 actual ending sounds: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ
  - Multiple consonants collapse: ㅅ,ㅈ,ㅊ,ㅌ all sound like ㄷ at the end
  - ㄲ,ㅋ sound like ㄱ at the end
  - ㅃ,ㅍ sound like ㅂ at the end
- Practice: Read words with batchim, identify the ending sound

**Lesson 1.10: Reading Practice — Putting It All Together**
- Practice: Read real Korean words using everything learned:
  - 한국 (han-guk) = Korea
  - 사랑 (sa-rang) = love
  - 감사 (gam-sa) = gratitude
  - 학생 (hak-saeng) = student
  - 친구 (chin-gu) = friend
- Read simple signs, brand names, and common words
- Celebrate: You can now read Korean!

---

### Unit 2: First Words & Introductions
**Goal**: Greet people, introduce yourself, and use basic polite expressions.

**Lesson 2.1: Hello & Goodbye**
- Teach: Korean has different greetings depending on who's leaving/staying. Korean culture is built on respect — you'll mostly use polite forms.
  - 안녕하세요 (annyeonghaseyo) — "Hello" (polite, works for everyone)
  - 안녕히 가세요 (annyeonghi gaseyo) — "Goodbye" (said to the person leaving — literally "go in peace")
  - 안녕히 계세요 (annyeonghi gyeseyo) — "Goodbye" (said to the person staying — literally "stay in peace")
- Cultural note: Among close friends of similar age, just 안녕 (annyeong) works for both hello and bye.
- Vocab: 안녕하세요, 안녕히 가세요, 안녕히 계세요, 안녕
- Practice: Dialogue — who says what when leaving a shop?

**Lesson 2.2: Thank You & Sorry**
- Teach: Politeness levels exist in Korean grammar itself — not just tone.
  - 감사합니다 (gamsahamnida) — "Thank you" (formal polite — use with strangers, elders, in business)
  - 고마워요 (gomawoyo) — "Thank you" (casual polite — use with acquaintances)
  - 죄송합니다 (joesonghamnida) — "I'm sorry" (formal — for real apologies)
  - 괜찮아요 (gwaenchanayo) — "It's okay / I'm fine" (incredibly useful!)
- Cultural note: Koreans bow slightly when thanking or apologizing. Deeper bow = more respect.
- Practice: Match the situation to the right expression (formal vs casual)

**Lesson 2.3: I Am [Name] — Self-Introduction**
- Teach: Your first Korean sentence pattern! Korean sentences end with the verb — Subject Object Verb (SOV).
  - 저 (jeo) — "I" (polite/humble)
  - 는 (neun) — topic marker particle (more on this in Unit 3!)
  - 저는 ___입니다 (jeoneun ___ imnida) — "I am ___" (formal)
  - 저는 ___이에요/예요 (jeoneun ___ ieyo/yeyo) — "I am ___" (polite)
  - Rule: 이에요 after consonant, 예요 after vowel
  - Example: 저는 마크입니다 (I am Mark), 저는 학생이에요 (I am a student)
- Teach: 만나서 반갑습니다 (mannaseo bangapseumnida) — "Nice to meet you"
- Practice: Introduce yourself with your name

**Lesson 2.4: Yes, No, & Basic Responses**
- Teach:
  - 네 (ne) — "Yes" (also used as "uh-huh" to show you're listening — Koreans say 네 A LOT in conversation)
  - 아니요 (aniyo) — "No" (polite)
  - 네, 맞아요 (ne, majayo) — "Yes, that's right"
  - 아니요, 아니에요 (aniyo, anieyo) — "No, it's not"
  - 몰라요 (mollayo) — "I don't know"
  - 알겠습니다 (algesseumnida) — "I understand / Got it"
- Practice: Respond to yes/no questions

**Lesson 2.5: Excuse Me & Getting Attention**
- Teach:
  - 실례합니다 (sillyehamnida) — "Excuse me" (polite interruption)
  - 저기요 (jeogiyo) — "Excuse me!" (to get someone's attention, call a waiter)
  - 잠시만요 (jamsimanyo) — "Just a moment, please"
  - 주세요 (juseyo) — "Please give me" (you'll use this CONSTANTLY)
  - Example: 물 주세요 (mul juseyo) — "Water, please"
- Cultural note: In Korean restaurants, you call the server by saying 저기요! This is normal and not rude.
- Practice: Restaurant scenario — get attention, order water

---

### Unit 3: How Korean Sentences Work
**Goal**: Understand SOV word order and the particle system — the backbone of Korean grammar.

**Lesson 3.1: Korean Word Order (SOV)**
- Teach: English = "I eat rice" (SVO). Korean = "I rice eat" (SOV). The verb ALWAYS goes last.
  - 저는 밥을 먹어요 — I (topic) rice (object) eat (verb)
  - Think of it as: "As for me, rice, I eat."
  - Good news: other than the verb being last, word order is flexible! Particles tell you who does what.
- Practice: Rearrange English sentences into Korean word order

**Lesson 3.2: Topic & Subject Markers (은/는 and 이/가)**
- Teach: This is the concept that trips up most Korean learners, so let's get it right.
  - 은/는 (eun/neun) = TOPIC marker: "As for X..." / "Speaking of X..."
    - 은 after consonant: 저는 (as for me)
    - 는 after vowel: 나는 (as for me, casual)
  - 이/가 (i/ga) = SUBJECT marker: identifies who/what does the action
    - 이 after consonant: 학생이 (the student [does something])
    - 가 after vowel: 날씨가 (the weather [does something])
  - The difference: 저는 학생이에요 = "As for ME, I'm a student" (topic = me). 제가 학생이에요 = "I'M the student" (emphasizing that I'm the one, not someone else).
  - Simple rule for now: Use 은/는 for introducing topics and general statements. Use 이/가 for new information and emphasis.
- Practice: Fill in the blank — 은/는 or 이/가?

**Lesson 3.3: Object Marker (을/를)**
- Teach: Marks what receives the action (the object).
  - 을 (eul) after consonant: 밥을 먹어요 (I eat rice)
  - 를 (reul) after vowel: 커피를 마셔요 (I drink coffee)
  - In casual speech, particles are often dropped — but learn them properly first!
- Practice: Build sentences with subject + object + verb

**Lesson 3.4: Location Markers (에 and 에서)**
- Teach: Two different "at/in" markers — this distinction doesn't exist in English:
  - 에 (e) = destination or static location: "to" or "at" (for existence/time)
    - 학교에 가요 = I GO TO school
    - 집에 있어요 = I AM AT home
    - 3시에 = AT 3 o'clock
  - 에서 (eseo) = where an ACTION happens: "at/in" (for doing things)
    - 학교에서 공부해요 = I study AT school
    - 식당에서 먹어요 = I eat AT the restaurant
  - Simple rule: Going TO / being AT → 에. Doing something AT → 에서.
- Practice: Choose 에 or 에서

**Lesson 3.5: Possessive & Others (의, 도, 하고)**
- Teach:
  - 의 (ui, often pronounced "e") = possessive "'s" / "of"
    - 저의 친구 = my friend (often shortened to 제 친구)
    - 한국의 음식 = Korea's food / Korean food
  - 도 (do) = "also/too" — REPLACES the topic/subject marker
    - 저도 학생이에요 = I am ALSO a student (not 저는도 — 도 replaces 는)
  - 하고 (hago) = "and/with" (connecting nouns, casual)
    - 친구하고 같이 = together with a friend
    - 빵하고 커피 = bread and coffee
- Practice: Translate sentences using these particles

---

### Unit 4: Essential Verbs
**Goal**: Learn the most common verbs and understand how Korean verb conjugation works.

**Lesson 4.1: How Korean Verbs Work**
- Teach: Every Korean verb has a DICTIONARY FORM ending in 다. Remove 다 to get the STEM. Add endings to conjugate.
  - 먹다 (to eat) → stem: 먹 → 먹어요 (polite), 먹습니다 (formal)
  - 가다 (to go) → stem: 가 → 가요 (polite), 갑니다 (formal)
  - For now, we'll learn the polite form (-아요/어요) — it's what you'll use 90% of the time.
  - Rule: If the stem's last vowel is ㅏ or ㅗ → add 아요. Otherwise → add 어요. 하다 → 해요 (special).
- Key verbs introduced: 가다 (go), 오다 (come), 먹다 (eat), 마시다 (drink)
- Practice: Conjugate verbs to polite form

**Lesson 4.2: Existence & Possession (있다/없다)**
- Teach: 있다 (itda) is one of the most important words in Korean. It means BOTH "to exist" and "to have":
  - 시간이 있어요 = I have time (lit: time exists)
  - 여기에 있어요 = It's here (it exists here)
  - 없다 (eopda) = the opposite — "doesn't exist" / "don't have"
  - 돈이 없어요 = I don't have money
  - Bonus pattern: noun + 있다/없다 creates adjectives! 맛 (taste) + 있다 = 맛있다 (delicious, lit: "taste exists")
- Practice: Answer "Do you have ___?" questions

**Lesson 4.3: The Magic of 하다 (To Do)**
- Teach: 하다 means "to do" but it's secretly the most powerful verb in Korean. Attach it to nouns to create hundreds of verbs:
  - 공부 (study) + 하다 = 공부하다 (to study)
  - 운동 (exercise) + 하다 = 운동하다 (to exercise)
  - 요리 (cooking) + 하다 = 요리하다 (to cook)
  - 일 (work) + 하다 = 일하다 (to work)
  - 전화 (phone call) + 하다 = 전화하다 (to make a phone call)
  - Conjugation: 하다 → 해요 (polite), 합니다 (formal)
- Practice: Match noun + 하다 to English meanings

**Lesson 4.4: More Essential Verbs**
- Teach: Round out your verb vocabulary:
  - 보다 (boda) — to see/watch: 영화를 봐요 (I watch a movie)
  - 읽다 (ikda) — to read: 책을 읽어요 (I read a book)
  - 쓰다 (sseuda) — to write: 편지를 써요 (I write a letter)
  - 듣다 (deutda) — to listen: 음악을 들어요 (I listen to music) — Note: ㄷ-irregular! 듣 → 들
  - 말하다 (malhada) — to speak: 한국어를 말해요 (I speak Korean)
  - 사다 (sada) — to buy: 옷을 사요 (I buy clothes)
  - 알다 (alda) — to know: 알아요 (I know)
  - 모르다 (moreuda) — to not know: 몰라요 (I don't know) — Note: ㅡ drops!
- Practice: Build sentences with new verbs + particles from Unit 3

**Lesson 4.5: Negation — Saying "Don't" and "Not"**
- Teach: Two ways to negate in Korean:
  - Method 1 (short): 안 + verb = "not/don't"
    - 안 가요 = I don't go
    - 안 먹어요 = I don't eat
  - Method 2 (long): verb stem + 지 않아요 = "not/don't" (same meaning, slightly more formal)
    - 가지 않아요 = I don't go
    - 먹지 않아요 = I don't eat
  - For 하다 verbs: 공부 안 해요 or 공부하지 않아요 (both work)
  - Exception: 없다 is already negative (don't use 안 없다)
  - "Can't" = 못 + verb: 못 가요 (I can't go)
- Practice: Negate sentences both ways

---

### Unit 5: People, Places & Things
**Goal**: Build practical vocabulary for everyday nouns — learned in sentence context, not isolation.

**Lesson 5.1: People & Family**
- Teach: Korean has different words for family depending on YOUR gender and whether the relative is older/younger. For now, the most common:
  - 사람 (saram) — person/people
  - 친구 (chingu) — friend (same-age only! Age matters hugely in Korean)
  - 가족 (gajok) — family
  - 엄마 (eomma) / 아빠 (appa) — mom / dad (casual)
  - 선생님 (seonsaengnim) — teacher (also used as a respectful title for many professionals)
  - 학생 (haksaeng) — student
- Cultural note: In Korea, you rarely call someone by name unless they're younger or the same age. Titles and honorifics are essential.
- Practice: "Who is this?" exercises with context sentences

**Lesson 5.2: Places**
- Teach: Common locations + using 에 (to/at) and 에서 (at, doing something):
  - 집 (jip) — home/house: 집에 가요 (I go home)
  - 학교 (hakgyo) — school: 학교에서 공부해요 (I study at school)
  - 회사 (hoesa) — company/office: 회사에 다녀요 (I commute to work)
  - 식당 (sikdang) — restaurant: 식당에서 먹어요 (I eat at the restaurant)
  - 병원 (byeongwon) — hospital: 병원에 가요 (I go to the hospital)
  - 가게 (gage) — shop/store: 가게에서 사요 (I buy at the store)
  - 카페 (kape) — cafe: 카페에서 커피를 마셔요 (I drink coffee at a cafe)
- Practice: Where do you do what? Match activity to location

**Lesson 5.3: Food & Drink**
- Teach: Food culture is central to Korean life. "밥 먹었어요?" (Have you eaten?) is a common greeting!
  - 밥 (bap) — rice/meal (the most important word in Korean food)
  - 물 (mul) — water
  - 고기 (gogi) — meat
  - 커피 (keopi) — coffee (loanword)
  - 빵 (ppang) — bread (from Portuguese "pão"!)
  - 과일 (gwail) — fruit
  - 음식 (eumsik) — food (general)
  - 반찬 (banchan) — side dishes
- Key phrase: ___ 주세요 (juseyo) — "Please give me ___"
  - 물 주세요 = Water, please
  - 메뉴 주세요 = Menu, please
- Practice: Order food at a restaurant (dialogue exercise)

**Lesson 5.4: Time Words**
- Teach: Time words usually go at the START of the sentence (before the subject):
  - 오늘 (oneul) — today: 오늘 뭐 해요? (What are you doing today?)
  - 내일 (naeil) — tomorrow
  - 어제 (eoje) — yesterday
  - 지금 (jigeum) — now
  - 아침 (achim) — morning (also means breakfast!)
  - 점심 (jeomsim) — lunch/noon
  - 저녁 (jeonyeok) — evening (also means dinner!)
- Pattern: Time + Subject + Object + Verb
  - 오늘 저는 한국어를 공부해요 = Today I study Korean
- Practice: Place time words correctly in sentences

**Lesson 5.5: Descriptive Words (Adjectives)**
- Teach: In Korean, adjectives ARE verbs! They conjugate the same way:
  - 좋다 (jota) → 좋아요 — to be good/nice: 날씨가 좋아요 (The weather is nice)
  - 크다 (keuda) → 커요 — to be big
  - 작다 (jakda) → 작아요 — to be small
  - 많다 (manta) → 많아요 — to be many/much
  - 맛있다 (masitda) → 맛있어요 — to be delicious
  - 재미있다 (jaemiitda) → 재미있어요 — to be fun/interesting
  - 바쁘다 (bappeuda) → 바빠요 — to be busy
  - 어렵다 (eoryeopda) → 어려워요 — to be difficult (ㅂ-irregular!)
  - 쉽다 (swipda) → 쉬워요 — to be easy (also ㅂ-irregular!)
- Key concept: ㅂ-irregular verbs: when the stem ends in ㅂ, it becomes 우 before 어 → 어려워요, 쉬워요
- Practice: Describe things using adjective-verbs

---

### Unit 6: Numbers & Counting
**Goal**: Master both Korean number systems and know when to use each.

**Lesson 6.1: Sino-Korean Numbers (일, 이, 삼...)**
- Teach: Korea uses TWO number systems (yes, really). Sino-Korean numbers come from Chinese:
  - 일(1), 이(2), 삼(3), 사(4), 오(5), 육(6), 칠(7), 팔(8), 구(9), 십(10)
  - Building bigger numbers is logical: 십일(11), 이십(20), 이십삼(23), 백(100), 천(1000), 만(10,000)
  - Use for: dates, money, phone numbers, minutes, months, addresses, floors
  - Example: 삼월 이십오일 = March 25th
  - Example: 오천 원 = 5,000 won
- Practice: Read prices, dates, phone numbers

**Lesson 6.2: Native Korean Numbers (하나, 둘, 셋...)**
- Teach: Native Korean numbers are older and used for different things:
  - 하나(1), 둘(2), 셋(3), 넷(4), 다섯(5), 여섯(6), 일곱(7), 여덟(8), 아홉(9), 열(10)
  - Before counters, 1-4 change form: 하나→한, 둘→두, 셋→세, 넷→네
  - Use for: counting things (with counters), hours, age
  - Only goes to 99 — after that, use Sino-Korean
- Practice: Count objects, tell your age

**Lesson 6.3: Counters (개, 명, 잔, 마리...)**
- Teach: Korean uses COUNTERS — special words between the number and the noun (like "a SHEET of paper" or "a CUP of coffee" in English, except Korean does this for everything):
  - 개 (gae) — general counter for things: 사과 세 개 (3 apples)
  - 명 (myeong) — people: 두 명 (2 people)
  - 잔 (jan) — cups/glasses: 커피 한 잔 (1 cup of coffee)
  - 병 (byeong) — bottles: 물 두 병 (2 bottles of water)
  - 마리 (mari) — animals: 고양이 세 마리 (3 cats)
  - 권 (gwon) — books: 책 다섯 권 (5 books)
  - Word order: Noun + Number + Counter: 사과 세 개 주세요 (Three apples, please)
- Practice: Order specific quantities at a store

**Lesson 6.4: Telling Time**
- Teach: Time uses BOTH number systems at once!
  - Hours = Native Korean: 한 시 (1 o'clock), 두 시 (2 o'clock), 세 시 (3 o'clock)
  - Minutes = Sino-Korean: 십 분 (10 minutes), 삼십 분 (30 minutes)
  - Combined: 세 시 삼십 분 = 3:30
  - 반 (ban) = half: 두 시 반 = 2:30
  - AM/PM: 오전 (ojeon) = AM, 오후 (ohu) = PM
  - 지금 몇 시예요? = What time is it now?
- Practice: Read and say times

---

### Unit 7: Making Sentences
**Goal**: Learn essential sentence patterns to express wants, abilities, and requests.

**Lesson 7.1: It Is / It Is Not (이다 / 아니다)**
- Teach: The copula — "to be" for nouns:
  - Noun + 입니다/이에요/예요 = "It is [noun]"
    - 학생입니다 / 학생이에요 = (I) am a student
    - 의사예요 = (I) am a doctor
  - Noun + 이/가 아니에요 = "It is NOT [noun]"
    - 학생이 아니에요 = (I) am not a student
  - 이것은 뭐예요? = What is this?
  - 이것은 책이에요 = This is a book
- Practice: Identify and negate — "Is this a ___?" → "No, it's not a ___. It's a ___."

**Lesson 7.2: Want To (고 싶다)**
- Teach: Express desires:
  - Verb stem + 고 싶어요 = "I want to [verb]"
  - 가고 싶어요 = I want to go
  - 먹고 싶어요 = I want to eat
  - 한국에 가고 싶어요 = I want to go to Korea
  - Question: 뭐 먹고 싶어요? = What do you want to eat?
  - Negative: 가고 싶지 않아요 = I don't want to go
- Practice: Express what you want to do / ask others

**Lesson 7.3: Can & Can't (ㄹ 수 있다/없다)**
- Teach: Express ability:
  - Verb stem + (으)ㄹ 수 있어요 = "I can [verb]"
    - 할 수 있어요 = I can do it
    - 한국어를 읽을 수 있어요 = I can read Korean
  - Verb stem + (으)ㄹ 수 없어요 = "I can't [verb]"
    - 갈 수 없어요 = I can't go
  - Shortcut: 못 + verb also means "can't": 못 가요, 못 먹어요
  - (으)ㄹ rule: vowel stem → ㄹ, consonant stem → 을
- Practice: Talk about what you can/can't do

**Lesson 7.4: Please Do / Please Don't (세요 / 지 마세요)**
- Teach: Polite requests and commands:
  - Verb stem + (으)세요 = "Please [verb]" (polite imperative)
    - 앉으세요 = Please sit down
    - 드세요 = Please eat (honorific of 먹다)
    - 오세요 = Please come
  - Verb stem + 지 마세요 = "Please don't [verb]"
    - 걱정하지 마세요 = Please don't worry
    - 가지 마세요 = Please don't go
  - Very useful: ___해 주세요 = "Please do ___ for me"
    - 사진 찍어 주세요 = Please take a picture (for me)
- Practice: Make polite requests in various situations

**Lesson 7.5: Because & If (아서/어서, (으)면)**
- Teach: Connect ideas and give reasons:
  - Verb stem + 아서/어서 = "because/so"
    - 배가 고파서 밥을 먹었어요 = I ate because I was hungry
    - 비가 와서 집에 있었어요 = It rained so I stayed home
  - Verb stem + (으)면 = "if/when"
    - 시간이 있으면 만나요 = If you have time, let's meet
    - 비가 오면 안 가요 = If it rains, I won't go
- Practice: Complete sentences with reasons and conditions

---

### Unit 8: Past & Future Tense
**Goal**: Talk about what happened and what will happen.

**Lesson 8.1: Past Tense (았/었/했)**
- Teach: Add 았/었 to the verb stem (same ㅏ/ㅗ rule as polite form):
  - 가다 → 갔어요 (went): stem 가 + 았 → 갔
  - 먹다 → 먹었어요 (ate): stem 먹 + 었
  - 하다 → 했어요 (did): 하 + 였 → 했
  - 보다 → 봤어요 (saw): 보 + 았 → 봤
  - 마시다 → 마셨어요 (drank): 마시 + 었 → 마셨
  - The past marker goes BEFORE the ending: 갔 + 어요 = 갔어요
- Practice: Talk about what you did yesterday

**Lesson 8.2: Future Tense & Plans (ㄹ 거예요)**
- Teach: Express future plans/intentions:
  - Verb stem + (으)ㄹ 거예요 = "I will [verb]" / "I'm going to [verb]"
  - 갈 거예요 = I will go / I'm going to go
  - 먹을 거예요 = I will eat
  - 공부할 거예요 = I'm going to study
  - 내일 뭐 할 거예요? = What will you do tomorrow?
- Teach also: 겠 for immediate intention/willingness:
  - 알겠습니다 = I understand (lit: I will know)
  - 잘 먹겠습니다 = I will eat well (said before a meal)
- Practice: Make future plans — schedule for tomorrow

**Lesson 8.3: Progressive & Ongoing Actions (고 있다)**
- Teach: The "-ing" form — what's happening right now:
  - Verb stem + 고 있어요 = "I am [verb]-ing"
  - 먹고 있어요 = I am eating
  - 공부하고 있어요 = I am studying
  - 뭐 하고 있어요? = What are you doing?
  - Can also express ongoing states: 알고 있어요 = I know (I am in the state of knowing)
- Practice: Describe what people are doing right now (from pictures/scenarios)

---

### Unit 9: Asking Questions
**Goal**: Ask any question in Korean — the question words and patterns.

**Lesson 9.1: Question Words**
- Teach: Korean question words all start with similar sounds:
  - 뭐/무엇 (mwo/mueot) — what: 뭐 먹어요? (What are you eating?)
  - 누구 (nugu) — who: 누구예요? (Who is it?)
  - 어디 (eodi) — where: 어디에 가요? (Where are you going?)
  - 언제 (eonje) — when: 언제 와요? (When are you coming?)
  - 왜 (wae) — why: 왜요? (Why?)
  - 어떻게 (eotteoke) — how: 어떻게 가요? (How do you get there?)
  - 얼마 (eolma) — how much: 이거 얼마예요? (How much is this?)
  - 몇 (myeot) — how many: 몇 개요? (How many?)
- Key insight: Korean questions use the SAME word order as statements! Just swap in the question word where the answer would go. No word order change needed.
- Practice: Form questions from given answers

**Lesson 9.2: Yes/No Questions**
- Teach: Even simpler — just raise your voice at the end (in speech) or add a question mark (in writing):
  - 학생이에요. (I'm a student.) → 학생이에요? (Are you a student?)
  - 한국 사람이에요? = Are you Korean?
  - 이거 맛있어요? = Is this delicious?
  - Answering: 네, 학생이에요. / 아니요, 학생이 아니에요.
- Practice: Ask and answer yes/no questions

**Lesson 9.3: This, That, Over There (이/그/저)**
- Teach: Korean has THREE levels of distance (English only has two!):
  - 이 (i) — this (near me): 이거 (this thing), 이 사람 (this person), 여기 (here)
  - 그 (geu) — that (near you): 그거 (that thing), 그 사람 (that person), 거기 (there)
  - 저 (jeo) — that over there (far from both): 저거 (that thing over there), 저 사람 (that person), 저기 (over there)
  - Pattern: 이것/그것/저것 (formal) → 이거/그거/저거 (casual)
- Practice: Point and identify — shopping scenarios

---

### Unit 10: Connecting Ideas
**Goal**: Move beyond simple sentences into natural, flowing Korean.

**Lesson 10.1: And, But, So (그리고, 하지만, 그래서)**
- Teach: Sentence connectors (used between two sentences):
  - 그리고 (geurigo) — "And / And then"
    - 밥을 먹었어요. 그리고 커피를 마셨어요. (I ate. And then I drank coffee.)
  - 하지만 (hajiman) — "But / However"
    - 비싸요. 하지만 맛있어요. (It's expensive. But it's delicious.)
  - 그래서 (geuraeseo) — "So / Therefore"
    - 비가 왔어요. 그래서 집에 있었어요. (It rained. So I stayed home.)
  - 그런데 (geureonde) — "But / By the way" (softer than 하지만)
    - 그런데 시간 있어요? (By the way, do you have time?)
- Practice: Connect sentence pairs with the right connector

**Lesson 10.2: And (within sentences) — 고**
- Teach: To connect actions within a single sentence:
  - Verb stem + 고 = "and" (listing actions)
    - 아침을 먹고 학교에 가요 = I eat breakfast AND go to school
    - 커피를 마시고 공부해요 = I drink coffee AND study
  - Unlike 그리고 (between sentences), 고 connects verbs within one sentence
  - Can chain multiple: 일어나고, 샤워하고, 아침을 먹어요 = I wake up, shower, and eat breakfast
- Practice: Describe your daily routine using 고

**Lesson 10.3: Before & After (전에 / 후에)**
- Teach: Sequence actions:
  - Verb + 기 전에 = "before [verb]-ing"
    - 자기 전에 책을 읽어요 = Before sleeping, I read a book
    - 먹기 전에 손을 씻어요 = Before eating, I wash my hands
  - Verb stem + (으)ㄴ 후에 = "after [verb]-ing"
    - 먹은 후에 커피를 마셔요 = After eating, I drink coffee
  - Also: noun + 전에/후에: 수업 전에 (before class), 점심 후에 (after lunch)
- Practice: Order events in time

**Lesson 10.4: Useful Adverbs**
- Teach: Adverbs modify the whole sentence — place them before the verb:
  - 항상 (hangsang) — always: 항상 아침을 먹어요
  - 보통 (botong) — usually: 보통 여덟 시에 일어나요
  - 자주 (jaju) — often: 자주 운동해요
  - 가끔 (gakkeum) — sometimes: 가끔 영화를 봐요
  - 별로 (byeollo) — not really (used with negative): 별로 안 좋아요
  - 아직 (ajik) — still/yet: 아직 안 왔어요 (hasn't come yet)
  - 벌써 (beolsseo) — already: 벌써 끝났어요? (It's done already?)
  - 같이 (gachi) — together: 같이 가요! (Let's go together!)
  - 정말/진짜 (jeongmal/jinjja) — really: 정말 맛있어요!
- Practice: Add adverbs to make sentences more natural

---

### Unit 11: Daily Life & Routines
**Goal**: Describe your daily life fluently — practical conversation topics.

**Lesson 11.1: Morning Routine**
- Teach vocabulary in context:
  - 일어나다 (ireonada) — to wake up/get up
  - 씻다 (ssitda) — to wash
  - 샤워하다 (syawohada) — to shower
  - 옷을 입다 (oseul ipda) — to get dressed (lit: wear clothes)
  - 출발하다 (chulbalhada) — to depart/leave
- Practice: Describe your morning using 고 connections and time expressions
  - 일곱 시에 일어나고, 샤워하고, 아침을 먹고, 여덟 시에 출발해요.

**Lesson 11.2: At Work/School**
- Teach:
  - 수업 (sueop) — class/lesson
  - 회의 (hoeui) — meeting
  - 점심시간 (jeomsim-sigan) — lunch time
  - 끝나다 (kkeutnada) — to finish/end
  - 시작하다 (sijakhada) — to start/begin
- Practice: Talk about your workday/school day

**Lesson 11.3: Free Time & Hobbies**
- Teach:
  - 취미 (chwimi) — hobby: 취미가 뭐예요? (What's your hobby?)
  - 영화를 보다 — to watch movies
  - 음악을 듣다 — to listen to music
  - 운동하다 — to exercise
  - 게임하다 — to play games
  - 산책하다 (sanchaek) — to take a walk
  - 요리하다 — to cook
- Grammar: ~는 것을 좋아해요 = "I like [verb]-ing"
  - 요리하는 것을 좋아해요 = I like cooking
- Practice: Talk about hobbies, ask others about theirs

**Lesson 11.4: Weather**
- Teach:
  - 날씨 (nalssi) — weather
  - 덥다 (deopda) → 더워요 — to be hot (ㅂ-irregular)
  - 춥다 (chupda) → 추워요 — to be cold (ㅂ-irregular)
  - 비가 오다 — to rain (lit: rain comes)
  - 눈이 오다 — to snow (lit: snow comes)
  - 맑다 (makda) — to be clear/sunny
  - 흐리다 (heurida) — to be cloudy
- Practice: Talk about today's weather, ask about weather

---

### Unit 12: Shopping & Restaurants
**Goal**: Navigate real-world transactions in Korean.

**Lesson 12.1: At a Restaurant**
- Teach: Full restaurant dialogue pattern:
  - 저기요! (jeogiyo) — "Excuse me!" (calling server)
  - 메뉴 주세요 — "Menu, please"
  - 이거 뭐예요? — "What is this?"
  - ___ 주세요 — "[item] please"
  - 하나 더 주세요 — "One more, please"
  - 얼마예요? — "How much is it?"
  - 계산해 주세요 — "Check, please" (bill please)
  - 잘 먹겠습니다 / 잘 먹었습니다 — before/after meal phrases
- Practice: Full restaurant roleplay dialogue

**Lesson 12.2: Shopping**
- Teach:
  - 얼마예요? — How much?
  - 너무 비싸요 — It's too expensive
  - 깎아 주세요 (kkakka juseyo) — Please give me a discount
  - 카드 돼요? (kadeu dwaeyo?) — Can I use card?
  - 이거 주세요 — I'll take this, please
  - 다른 거 있어요? — Do you have something different?
  - 사이즈가 있어요? — Do you have the size?
- Practice: Buying something — price negotiation dialogue

**Lesson 12.3: Transportation**
- Teach:
  - 어디까지 가세요? — Where are you going (to)?
  - ___까지 가 주세요 — Please take me to ___
  - 얼마나 걸려요? — How long does it take?
  - 지하철 (jihacheol) — subway
  - 버스 (beoseu) — bus
  - 택시 (taeksi) — taxi
  - 역 (yeok) — station
  - 정류장 (jeongnyujang) — bus stop
  - 내려 주세요 — Please let me off / I'd like to get off
- Practice: Give taxi directions, ask about bus routes

---

### Unit 13: Expressing Feelings & Opinions
**Goal**: Share how you feel and what you think.

**Lesson 13.1: Emotions & States**
- Teach:
  - 기분이 좋아요 / 나빠요 — I feel good / bad
  - 행복하다 (haengbokhada) — to be happy
  - 슬프다 (seulpeuda) → 슬퍼요 — to be sad
  - 피곤하다 (pigonhada) — to be tired
  - 배고프다 (baegopeda) — to be hungry
  - 목마르다 (mongmareuda) — to be thirsty
  - 졸리다 (jollida) — to be sleepy
  - 아프다 (apeuda) → 아파요 — to be sick/hurt
- Practice: Express how you feel and ask others

**Lesson 13.2: Likes & Dislikes**
- Teach: Two patterns for liking:
  - Noun + 좋아해요 = "I like [noun]": 한국 음식을 좋아해요
  - Noun + 이/가 좋아요 = "[noun] is good/liked": 한국 음식이 좋아요
  - (Subtle difference: 좋아해요 = actively like, 좋아요 = it's good to me)
  - Noun + 싫어해요 = "I dislike [noun]": 더운 날씨를 싫어해요
  - 별로 안 좋아해요 = "I don't really like it" (softer)
- Practice: Talk about food/hobby preferences

**Lesson 13.3: Giving Opinions**
- Teach:
  - 제 생각에는... = "In my opinion..."
  - ~(으)ㄴ/는 것 같아요 = "I think that..." / "It seems like..."
    - 좋은 것 같아요 = I think it's good
    - 맛있는 것 같아요 = It seems delicious
  - 그런 것 같아요 = I think so
  - 아닌 것 같아요 = I don't think so
- Practice: Share opinions about given topics

---

### Unit 14: Honorifics & Politeness
**Goal**: Understand and use Korean's essential politeness system.

**Lesson 14.1: Speech Levels Overview**
- Teach: Korean has 7 speech levels, but you really need 3:
  1. **Formal polite** (-ㅂ니다/습니다): presentations, news, business, interviews
  2. **Informal polite** (-아요/어요): everyday conversation with most people (YOUR DEFAULT)
  3. **Casual/반말** (-아/어, no 요): close friends of same age, to children, to yourself
  - Using the wrong level is a SOCIAL mistake, not just a grammar one. Using 반말 with an elder is rude. Using 존댓말 (polite) with a close friend can feel distant.
- Practice: Identify which speech level fits each situation

**Lesson 14.2: Honorific Vocabulary**
- Teach: Korean has completely different words for actions when the subject is someone you respect:
  - 먹다 → 드시다 (to eat, honorific): 뭐 드시겠어요? (What would you like to eat?)
  - 자다 → 주무시다 (to sleep, honorific)
  - 있다 → 계시다 (to be/exist, honorific): 어머니 계세요? (Is your mother here?)
  - 말하다 → 말씀하시다 (to speak, honorific)
  - 나이 → 연세 (age, honorific): 연세가 어떻게 되세요? (How old are you? — very polite)
  - 이름 → 성함 (name, honorific): 성함이 어떻게 되세요? (What is your name? — polite)
- Practice: Convert casual sentences to honorific

**Lesson 14.3: Age Culture & Titles**
- Teach: In Korea, your age relative to others determines how you speak to them:
  - 오빠 (oppa) — older brother (used by females)
  - 형 (hyeong) — older brother (used by males)
  - 언니 (eonni) — older sister (used by females)
  - 누나 (nuna) — older sister (used by males)
  - 동생 (dongsaeng) — younger sibling (gender-neutral)
  - ~씨 (ssi) — Mr./Ms. (after name): 마크씨 (Mr. Mark) — polite but not too formal
  - ~님 (nim) — honorific suffix: 사장님 (CEO/boss, honorific)
- Cultural note: One of the first questions Koreans ask new acquaintances: 몇 살이에요? / 나이가 어떻게 되세요? (How old are you?) — This determines the entire dynamic of the relationship.
- Practice: Address people correctly based on relationship

---

### Unit 15: Making Comparisons & More Grammar
**Goal**: Express comparisons, suggestions, and experiences.

**Lesson 15.1: Comparisons (더, 보다, 가장/제일)**
- Teach:
  - 더 (deo) = "more": 더 크다 (bigger), 더 좋아요 (better)
  - A보다 B가 더... = "B is more... than A"
    - 여름보다 겨울이 더 좋아요 = I like winter more than summer
  - 가장/제일 = "most/best": 제일 맛있어요 (most delicious)
  - 같다 (gatda) = "same": A하고 B가 같아요 (A and B are the same)
  - 다르다 (dareuda) = "different": A하고 B가 달라요 (A and B are different)
- Practice: Compare things — food, seasons, activities

**Lesson 15.2: Suggestions (ㄹ까요? / ㅂ시다)**
- Teach: "Shall we...?" and "Let's...":
  - Verb stem + (으)ㄹ까요? = "Shall we [verb]?"
    - 갈까요? = Shall we go?
    - 뭐 먹을까요? = What shall we eat?
  - Verb stem + (으)ㅂ시다 = "Let's [verb]" (slightly formal)
    - 갑시다 = Let's go
  - 같이 ___요 = informal "let's": 같이 가요! (Let's go together!)
- Practice: Make and respond to suggestions

**Lesson 15.3: Experience (ㄴ 적이 있다/없다)**
- Teach: "Have you ever...?"
  - Verb stem + (으)ㄴ 적이 있어요 = "I have [verb]-ed before"
    - 한국에 간 적이 있어요 = I've been to Korea before
    - 김치를 먹은 적이 있어요 = I've eaten kimchi before
  - Verb stem + (으)ㄴ 적이 없어요 = "I have never [verb]-ed"
    - 한국어를 배운 적이 없어요 = I've never learned Korean (but you're learning now!)
- Practice: Ask and answer "Have you ever...?" questions

---

### Unit 16: Complex Sentences & Practical Skills
**Goal**: Handle real conversations with connected, natural-sounding Korean.

**Lesson 16.1: Quoting & Reported Speech (-다고 하다)**
- Teach: Reporting what someone said:
  - Statement + (이)라고 해요 / 다고 해요 = "They say..."
    - 맛있다고 해요 = They say it's delicious
    - 학생이라고 해요 = They say they're a student
  - Common usage: 뭐라고요? = "What did you say?" (super useful!)
  - Used in everyday speech: 아프다고 해서 안 왔어요 = They said they're sick so they didn't come
- Practice: Report what others said

**Lesson 16.2: While / During (~면서, ~동안)**
- Teach: Actions happening simultaneously:
  - Verb stem + (으)면서 = "while [verb]-ing"
    - 음악을 들으면서 공부해요 = I study while listening to music
    - 밥을 먹으면서 이야기해요 = We talk while eating
  - Noun + 동안 = "during [noun]" / "for [duration]"
    - 방학 동안 = during vacation
    - 세 시간 동안 = for three hours
- Practice: Describe multitasking activities

**Lesson 16.3: Must & Should (~야 하다/되다)**
- Teach: Obligations:
  - Verb stem + 아/어야 해요 = "must/have to [verb]"
    - 가야 해요 = I have to go
    - 공부해야 해요 = I have to study
  - Verb stem + 아/어야 돼요 = same meaning, slightly more casual
    - 일해야 돼요 = I have to work
  - Negative: 안 해도 돼요 = "You don't have to" (not the same as "must not"!)
  - "Must not" = ~(으)면 안 돼요 = "If you do it, it's not okay"
    - 여기서 담배를 피우면 안 돼요 = You must not smoke here
- Practice: Talk about daily obligations

**Lesson 16.4: Giving Reasons More Naturally (~(으)니까)**
- Teach: Another "because" — but with a difference:
  - ~아서/어서: neutral cause-effect (from Unit 7)
  - ~(으)니까: emphasizes the reason, can be used with commands/suggestions
    - 비가 오니까 우산을 가져가세요 = Because it's raining, take an umbrella (command OK with 니까!)
    - 시간이 없으니까 빨리 가요 = Because we don't have time, let's go quickly
  - Rule: Use ~(으)니까 when the second clause is a command, suggestion, or request. Use ~아서/어서 for neutral statements.
- Practice: Give reasons and make suggestions

---

### Unit 17: Culture & Communication
**Goal**: Understand Korean cultural context that affects how you communicate.

**Lesson 17.1: Korean Dining Culture**
- Teach: Meal expressions and customs:
  - 잘 먹겠습니다 — "I will eat well" (before a meal — shows gratitude)
  - 잘 먹었습니다 — "I ate well" (after a meal — shows appreciation)
  - 많이 드세요 — "Please eat a lot" (the host says this)
  - 맛있게 드세요 — "Please enjoy your meal"
  - Cultural rules: Elders eat first. Pour drinks for others (not yourself). Use two hands when receiving or giving.
- Practice: Restaurant dialogue with cultural elements

**Lesson 17.2: Korean Phone & Texting**
- Teach: Phone/text conventions:
  - 여보세요 (yeoboseyo) — "Hello?" (phone only!)
  - ㅋㅋㅋ = laughter (like "hahaha"): ㅋ = k sound = "kekeke"
  - ㅎㅎㅎ = softer laugh
  - ㅠㅠ = crying face (the ㅠ looks like tears)
  - ㄱㄱ = 고고 = "go go" = "let's go"
  - ~ㅇㅇ = 응응 = "yeah yeah"
  - ㄴㄴ = 노노 = "no no"
  - 넵/넹 = cute version of 네 (yes)
- Practice: Read and write text messages

**Lesson 17.3: Common Expressions & Konglish**
- Teach: Expressions you'll hear constantly:
  - 화이팅! (hwaiting) — "Fighting! / You can do it!" (encouragement)
  - 대박 (daebak) — "Amazing! / Jackpot!" (exclamation)
  - 진짜? (jinjja?) — "Really?!"
  - 어머! (eomeo!) — "Oh my!" (surprise, mostly women)
  - 아이고 (aigo) — "Oh dear / Oh my" (frustration or sympathy)
  - 뭐? (mwo?) — "What?" (casual surprise)
  - Konglish (Korean + English): 셀카 (selka = selfie), 핸드폰 (haendeupon = handphone/cellphone), 에어컨 (eeokeon = air con)
- Practice: Use expressions in context

---

### Unit 18: Review & Practical Application
**Goal**: Consolidate everything through real-world scenarios.

**Lesson 18.1: Self-Introduction Speech**
- Full self-introduction using everything learned:
  - Name, nationality, job, hobbies, what you like, future plans
  - Practice writing and speaking a 자기소개 (self-introduction)

**Lesson 18.2: Making Plans with a Friend**
- Dialogue practice:
  - Suggesting activities, agreeing/disagreeing, setting time/place
  - Using future tense, suggestions, wants

**Lesson 18.3: Handling Problems**
- Emergency/problem phrases:
  - 도와주세요 (dowajuseyo) — "Please help me"
  - 길을 잃었어요 (gireul ireosseoyo) — "I'm lost"
  - 한국어를 잘 못해요 — "I can't speak Korean well"
  - 영어 할 수 있어요? — "Can you speak English?"
  - 다시 한번 말해 주세요 — "Please say it one more time"
  - 천천히 말해 주세요 — "Please speak slowly"

**Lesson 18.4: Comprehensive Review**
- Mixed exercises across all units
- Reading comprehension passages
- Dialogue completion
- Translation challenges

---

## Data Structure

Each lesson is a structured object:

```javascript
{
  id: 'unit1-lesson2',
  unitId: 1,
  title: 'Basic Vowels',
  subtitle: 'ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ',
  estimatedMinutes: 8,

  // TEACH PHASE — rich content displayed as cards/slides
  teach: [
    {
      type: 'explanation',  // or 'example', 'cultural-note', 'pattern', 'comparison'
      title: 'The 6 Basic Vowels',
      content: 'Korean vowels are built from...',
      korean: 'ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ',
      image: null,  // optional illustration
    },
    {
      type: 'breakdown',
      items: [
        { char: 'ㅏ', roman: 'a', sound: 'ah like father', mnemonic: '...' },
        // ...
      ]
    }
  ],

  // VOCABULARY — words introduced in this lesson
  vocabulary: [
    {
      korean: '아',
      roman: 'a',
      english: 'Ah (vowel sound)',
      audio: true,
      example: { kr: '아이', en: 'child' },
    }
  ],

  // PRACTICE PHASE — exercises
  exercises: [
    {
      type: 'multiple-choice',
      prompt: 'Which character makes the "ah" sound?',
      options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'],
      correct: 0,
      audio: null,
    },
    {
      type: 'listening',
      audio: 'ㅓ',
      prompt: 'What sound did you hear?',
      options: ['ㅏ (a)', 'ㅓ (eo)', 'ㅗ (o)', 'ㅜ (u)'],
      correct: 1,
    },
    {
      type: 'matching',
      pairs: [
        { left: 'ㅏ', right: 'a' },
        { left: 'ㅓ', right: 'eo' },
        { left: 'ㅗ', right: 'o' },
        { left: 'ㅜ', right: 'u' },
      ]
    },
    {
      type: 'fill-blank',
      sentence: '___ is pronounced like "oo" in "food"',
      options: ['ㅏ', 'ㅜ', 'ㅡ'],
      correct: 1,
    }
  ],

  // QUIZ PHASE — assessment (generated from exercise pool + new questions)
  quizQuestionCount: 8,
  passThreshold: 0.7,  // 70% to pass
}
```

---

## File Structure (New)

```
src/
├── data/
│   ├── course.js          # Unit & lesson metadata, progression
│   ├── units/
│   │   ├── unit01-hangul.js
│   │   ├── unit02-introductions.js
│   │   ├── unit03-sentence-structure.js
│   │   ├── unit04-verbs.js
│   │   ├── unit05-vocabulary.js
│   │   ├── unit06-numbers.js
│   │   ├── unit07-sentence-patterns.js
│   │   ├── unit08-tenses.js
│   │   ├── unit09-questions.js
│   │   ├── unit10-connectors.js
│   │   ├── unit11-daily-life.js
│   │   ├── unit12-shopping.js
│   │   ├── unit13-feelings.js
│   │   ├── unit14-honorifics.js
│   │   ├── unit15-comparisons.js
│   │   ├── unit16-complex.js
│   │   ├── unit17-culture.js
│   │   └── unit18-review.js
│   └── achievements.js
├── components/
│   ├── Navbar.jsx
│   ├── AchievementToast.jsx
│   ├── TeachSlide.jsx        # Renders teach phase content
│   ├── ExerciseRunner.jsx    # Runs all exercise types
│   ├── exercises/
│   │   ├── MultipleChoice.jsx
│   │   ├── Listening.jsx
│   │   ├── SentenceBuilder.jsx
│   │   ├── FillBlank.jsx
│   │   ├── MatchingPairs.jsx
│   │   ├── TypeAnswer.jsx
│   │   ├── TrueFalse.jsx
│   │   ├── ConversationComplete.jsx
│   │   └── ConjugationPractice.jsx
│   ├── ProgressBar.jsx
│   ├── HeartCounter.jsx
│   └── XpPopup.jsx
├── pages/
│   ├── Dashboard.jsx         # Home with course progress
│   ├── CourseMap.jsx          # Unit overview (the main progression view)
│   ├── UnitDetail.jsx        # Lessons within a unit
│   ├── LessonTeach.jsx       # Teach phase
│   ├── LessonPractice.jsx    # Practice phase
│   ├── LessonQuiz.jsx        # Quiz phase
│   ├── Review.jsx            # SRS review session
│   ├── Stats.jsx             # Progress analytics
│   └── Settings.jsx          # Preferences
├── store/
│   └── progress.js           # State management (keep SM-2, expand)
├── utils/
│   └── audio.js              # TTS (keep existing)
├── App.jsx
├── main.jsx
└── index.css
```

---

## Build Order

1. **Data layer** — Course structure, Unit 1-2 content (most important to get right)
2. **Core components** — TeachSlide, ExerciseRunner, exercise types
3. **Lesson flow** — Teach → Practice → Quiz page flow
4. **Course map** — Unit overview and progression
5. **Dashboard** — Stats, streaks, level display
6. **Progress system** — Expand existing SM-2 with unit/lesson tracking
7. **Gamification** — XP, hearts, stars, achievements
8. **Review mode** — SRS-driven review across all learned content
9. **Remaining units** — Build out Units 3-18 content
10. **Polish** — Animations, sounds, edge cases
