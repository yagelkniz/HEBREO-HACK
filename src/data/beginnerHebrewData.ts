export interface CoreVerb {
  word: string;
  wordNikud: string;
  meaning: string;
  meaningEn: string;
  wordEn: string;
  examples: { text: string; textNikud: string; en: string }[];
}

export const coreVerbs: CoreVerb[] = [
  {
    word: "רוצה",
    wordNikud: "רוֹצֶה",
    wordEn: "want",
    meaning: "כשאנחנו רוצים משהו",
    meaningEn: "When we want something",
    examples: [
      { text: "אני רוצה מים", textNikud: "אֲנִי רוֹצֶה מַיִם", en: "I want water" },
      { text: "אני רוצה לאכול", textNikud: "אֲנִי רוֹצֶה לֶאֱכוֹל", en: "I want to eat" },
    ],
  },
  {
    word: "צריך",
    wordNikud: "צָרִיךְ",
    wordEn: "need",
    meaning: "כשיש צורך או חובה",
    meaningEn: "When there is a need or obligation",
    examples: [
      { text: "אני צריך ללמוד", textNikud: "אֲנִי צָרִיךְ לִלְמוֹד", en: "I need to study" },
      { text: "אני צריך לחם", textNikud: "אֲנִי צָרִיךְ לֶחֶם", en: "I need bread" },
    ],
  },
  {
    word: "יכול",
    wordNikud: "יָכוֹל",
    wordEn: "can",
    meaning: "כשאפשר לעשות משהו",
    meaningEn: "When it's possible to do something",
    examples: [
      { text: "אני יכול לקרוא", textNikud: "אֲנִי יָכוֹל לִקְרוֹא", en: "I can read" },
      { text: "אני יכול ללכת", textNikud: "אֲנִי יָכוֹל לָלֶכֶת", en: "I can walk" },
    ],
  },
  {
    word: "אוהב",
    wordNikud: "אוֹהֵב",
    wordEn: "love / like",
    meaning: "כשמשהו נעים לנו",
    meaningEn: "When we enjoy something",
    examples: [
      { text: "אני אוהב לשחק", textNikud: "אֲנִי אוֹהֵב לְשַׂחֵק", en: "I love to play" },
      { text: "אני אוהב ספרים", textNikud: "אֲנִי אוֹהֵב סְפָרִים", en: "I love books" },
    ],
  },
];

export interface InfinitiveVerb {
  word: string;
  wordNikud: string;
  wordEn: string;
  exampleSentence: string;
  exampleSentenceNikud: string;
  exampleSentenceEn: string;
}

export const infinitiveVerbs: InfinitiveVerb[] = [
  { word: "לאכול", wordNikud: "לֶאֱכוֹל", wordEn: "to eat", exampleSentence: "אני רוצה לאכול", exampleSentenceNikud: "אֲנִי רוֹצֶה לֶאֱכוֹל", exampleSentenceEn: "I want to eat" },
  { word: "לשתות", wordNikud: "לִשְׁתּוֹת", wordEn: "to drink", exampleSentence: "אני רוצה לשתות", exampleSentenceNikud: "אֲנִי רוֹצֶה לִשְׁתּוֹת", exampleSentenceEn: "I want to drink" },
  { word: "ללכת", wordNikud: "לָלֶכֶת", wordEn: "to walk / to go", exampleSentence: "אני יכול ללכת", exampleSentenceNikud: "אֲנִי יָכוֹל לָלֶכֶת", exampleSentenceEn: "I can walk" },
  { word: "ללמוד", wordNikud: "לִלְמוֹד", wordEn: "to study", exampleSentence: "אני צריך ללמוד", exampleSentenceNikud: "אֲנִי צָרִיךְ לִלְמוֹד", exampleSentenceEn: "I need to study" },
  { word: "לכתוב", wordNikud: "לִכְתּוֹב", wordEn: "to write", exampleSentence: "אני יכול לכתוב", exampleSentenceNikud: "אֲנִי יָכוֹל לִכְתּוֹב", exampleSentenceEn: "I can write" },
  { word: "לקרוא", wordNikud: "לִקְרוֹא", wordEn: "to read", exampleSentence: "אני אוהב לקרוא", exampleSentenceNikud: "אֲנִי אוֹהֵב לִקְרוֹא", exampleSentenceEn: "I love to read" },
  { word: "לישון", wordNikud: "לִישׁוֹן", wordEn: "to sleep", exampleSentence: "אני רוצה לישון", exampleSentenceNikud: "אֲנִי רוֹצֶה לִישׁוֹן", exampleSentenceEn: "I want to sleep" },
  { word: "לשחק", wordNikud: "לְשַׂחֵק", wordEn: "to play", exampleSentence: "אני אוהב לשחק", exampleSentenceNikud: "אֲנִי אוֹהֵב לְשַׂחֵק", exampleSentenceEn: "I love to play" },
];

export interface VocabWord {
  word: string;
  wordNikud: string;
  en: string;
}

export const nouns: VocabWord[] = [
  { word: "מים", wordNikud: "מַיִם", en: "water" },
  { word: "לחם", wordNikud: "לֶחֶם", en: "bread" },
  { word: "בית", wordNikud: "בַּיִת", en: "house" },
  { word: "ספר", wordNikud: "סֵפֶר", en: "book" },
  { word: "ילד", wordNikud: "יֶלֶד", en: "boy" },
  { word: "ילדה", wordNikud: "יַלְדָּה", en: "girl" },
  { word: "אוכל", wordNikud: "אוֹכֶל", en: "food" },
  { word: "חדר", wordNikud: "חֶדֶר", en: "room" },
];

export const adjectives: VocabWord[] = [
  { word: "גדול", wordNikud: "גָּדוֹל", en: "big" },
  { word: "קטן", wordNikud: "קָטָן", en: "small" },
  { word: "טוב", wordNikud: "טוֹב", en: "good" },
  { word: "יפה", wordNikud: "יָפֶה", en: "beautiful" },
  { word: "חדש", wordNikud: "חָדָשׁ", en: "new" },
  { word: "חם", wordNikud: "חַם", en: "hot" },
  { word: "קר", wordNikud: "קַר", en: "cold" },
  { word: "נעים", wordNikud: "נָעִים", en: "pleasant" },
];

export interface SentenceOption {
  text: string;
  textNikud: string;
  en: string;
}

export const sentenceBuilderVerbs: SentenceOption[] = [
  { text: "רוצה", textNikud: "רוֹצֶה", en: "want" },
  { text: "צריך", textNikud: "צָרִיךְ", en: "need" },
  { text: "יכול", textNikud: "יָכוֹל", en: "can" },
  { text: "אוהב", textNikud: "אוֹהֵב", en: "love" },
];

export const sentenceBuilderObjects: SentenceOption[] = [
  { text: "לאכול", textNikud: "לֶאֱכוֹל", en: "to eat" },
  { text: "לשתות", textNikud: "לִשְׁתּוֹת", en: "to drink" },
  { text: "ללכת", textNikud: "לָלֶכֶת", en: "to go" },
  { text: "ללמוד", textNikud: "לִלְמוֹד", en: "to study" },
  { text: "לקרוא", textNikud: "לִקְרוֹא", en: "to read" },
  { text: "לישון", textNikud: "לִישׁוֹן", en: "to sleep" },
  { text: "לשחק", textNikud: "לְשַׂחֵק", en: "to play" },
  { text: "מים", textNikud: "מַיִם", en: "water" },
  { text: "לחם", textNikud: "לֶחֶם", en: "bread" },
  { text: "ספרים", textNikud: "סְפָרִים", en: "books" },
  { text: "בית גדול", textNikud: "בַּיִת גָּדוֹל", en: "a big house" },
  { text: "אוכל טוב", textNikud: "אוֹכֶל טוֹב", en: "good food" },
];

export interface PracticeQuestion {
  id: string;
  type: "match" | "multiple-choice";
  question: string;
  questionNikud: string;
  questionEn: string;
  options: { text: string; textNikud: string; en: string }[];
  correctIndex: number;
}

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: "pq-1",
    type: "multiple-choice",
    question: 'אני ___ לאכול. (כשאני רעב)',
    questionNikud: 'אֲנִי ___ לֶאֱכוֹל. (כְּשֶׁאֲנִי רָעֵב)',
    questionEn: 'I ___ to eat. (when I\'m hungry)',
    options: [
      { text: "רוצה", textNikud: "רוֹצֶה", en: "want" },
      { text: "יכול", textNikud: "יָכוֹל", en: "can" },
      { text: "אוהב", textNikud: "אוֹהֵב", en: "love" },
    ],
    correctIndex: 0,
  },
  {
    id: "pq-2",
    type: "multiple-choice",
    question: 'אני ___ לקרוא עברית. (יש לי את היכולת)',
    questionNikud: 'אֲנִי ___ לִקְרוֹא עִבְרִית. (יֵשׁ לִי אֶת הַיְּכוֹלֶת)',
    questionEn: 'I ___ read Hebrew. (I have the ability)',
    options: [
      { text: "צריך", textNikud: "צָרִיךְ", en: "need" },
      { text: "יכול", textNikud: "יָכוֹל", en: "can" },
      { text: "רוצה", textNikud: "רוֹצֶה", en: "want" },
    ],
    correctIndex: 1,
  },
  {
    id: "pq-3",
    type: "multiple-choice",
    question: 'אני ___ ללמוד למבחן. (חובה)',
    questionNikud: 'אֲנִי ___ לִלְמוֹד לַמִּבְחָן. (חוֹבָה)',
    questionEn: 'I ___ to study for the exam. (obligation)',
    options: [
      { text: "אוהב", textNikud: "אוֹהֵב", en: "love" },
      { text: "רוצה", textNikud: "רוֹצֶה", en: "want" },
      { text: "צריך", textNikud: "צָרִיךְ", en: "need" },
    ],
    correctIndex: 2,
  },
  {
    id: "pq-4",
    type: "multiple-choice",
    question: 'אני ___ לשחק כדורגל. (נהנה מזה)',
    questionNikud: 'אֲנִי ___ לְשַׂחֵק כַּדּוּרֶגֶל. (נֶהֱנֶה מִזֶּה)',
    questionEn: 'I ___ playing soccer. (enjoy it)',
    options: [
      { text: "צריך", textNikud: "צָרִיךְ", en: "need" },
      { text: "אוהב", textNikud: "אוֹהֵב", en: "love" },
      { text: "יכול", textNikud: "יָכוֹל", en: "can" },
    ],
    correctIndex: 1,
  },
  {
    id: "pq-5",
    type: "match",
    question: 'מה המילה ההפוכה ל"גדול"?',
    questionNikud: 'מָה הַמִּלָּה הַהֲפוּכָה ל"גָּדוֹל"?',
    questionEn: 'What is the opposite of "big"?',
    options: [
      { text: "יפה", textNikud: "יָפֶה", en: "beautiful" },
      { text: "קטן", textNikud: "קָטָן", en: "small" },
      { text: "חם", textNikud: "חַם", en: "hot" },
    ],
    correctIndex: 1,
  },
];
