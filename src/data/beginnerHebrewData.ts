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

export interface ConjugationRow {
  pronoun: string;
  pronounNikud: string;
  pronounEn: string;
  form: string;
  formNikud: string;
  example: string;
  exampleNikud: string;
  exampleEn: string;
}

export interface VerbConjugation {
  word: string;
  wordEn: string;
  rows: ConjugationRow[];
}

export const verbConjugations: VerbConjugation[] = [
  {
    word: "רוצה",
    wordEn: "want",
    rows: [
      { pronoun: "אני (זכר)", pronounNikud: "אֲנִי (ז)", pronounEn: "I (m.)", form: "רוצה", formNikud: "רוֹצֶה", example: "אני רוצה מים", exampleNikud: "אֲנִי רוֹצֶה מַיִם", exampleEn: "I want water" },
      { pronoun: "אני (נקבה)", pronounNikud: "אֲנִי (נ)", pronounEn: "I (f.)", form: "רוצה", formNikud: "רוֹצָה", example: "אני רוצה מים", exampleNikud: "אֲנִי רוֹצָה מַיִם", exampleEn: "I want water" },
      { pronoun: "הוא", pronounNikud: "הוּא", pronounEn: "he", form: "רוצה", formNikud: "רוֹצֶה", example: "הוא רוצה לאכול", exampleNikud: "הוּא רוֹצֶה לֶאֱכֹל", exampleEn: "He wants to eat" },
      { pronoun: "היא", pronounNikud: "הִיא", pronounEn: "she", form: "רוצה", formNikud: "רוֹצָה", example: "היא רוצה לאכול", exampleNikud: "הִיא רוֹצָה לֶאֱכֹל", exampleEn: "She wants to eat" },
      { pronoun: "אנחנו", pronounNikud: "אֲנַחְנוּ", pronounEn: "we", form: "רוצים", formNikud: "רוֹצִים", example: "אנחנו רוצים ללכת", exampleNikud: "אֲנַחְנוּ רוֹצִים לָלֶכֶת", exampleEn: "We want to go" },
      { pronoun: "אתם", pronounNikud: "אַתֶּם", pronounEn: "you (pl.)", form: "רוצים", formNikud: "רוֹצִים", example: "אתם רוצים קפה?", exampleNikud: "אַתֶּם רוֹצִים קָפֶה?", exampleEn: "Do you want coffee?" },
      { pronoun: "הם", pronounNikud: "הֵם", pronounEn: "they", form: "רוצים", formNikud: "רוֹצִים", example: "הם רוצים לישון", exampleNikud: "הֵם רוֹצִים לִישֹׁן", exampleEn: "They want to sleep" },
    ],
  },
  {
    word: "צריך",
    wordEn: "need",
    rows: [
      { pronoun: "אני (זכר)", pronounNikud: "אֲנִי (ז)", pronounEn: "I (m.)", form: "צריך", formNikud: "צָרִיךְ", example: "אני צריך עזרה", exampleNikud: "אֲנִי צָרִיךְ עֶזְרָה", exampleEn: "I need help" },
      { pronoun: "אני (נקבה)", pronounNikud: "אֲנִי (נ)", pronounEn: "I (f.)", form: "צריכה", formNikud: "צְרִיכָה", example: "אני צריכה עזרה", exampleNikud: "אֲנִי צְרִיכָה עֶזְרָה", exampleEn: "I need help" },
      { pronoun: "הוא", pronounNikud: "הוּא", pronounEn: "he", form: "צריך", formNikud: "צָרִיךְ", example: "הוא צריך ללמוד", exampleNikud: "הוּא צָרִיךְ לִלְמֹד", exampleEn: "He needs to study" },
      { pronoun: "היא", pronounNikud: "הִיא", pronounEn: "she", form: "צריכה", formNikud: "צְרִיכָה", example: "היא צריכה ללמוד", exampleNikud: "הִיא צְרִיכָה לִלְמֹד", exampleEn: "She needs to study" },
      { pronoun: "אנחנו", pronounNikud: "אֲנַחְנוּ", pronounEn: "we", form: "צריכים", formNikud: "צְרִיכִים", example: "אנחנו צריכים לחם", exampleNikud: "אֲנַחְנוּ צְרִיכִים לֶחֶם", exampleEn: "We need bread" },
      { pronoun: "אתם", pronounNikud: "אַתֶּם", pronounEn: "you (pl.)", form: "צריכים", formNikud: "צְרִיכִים", example: "אתם צריכים עזרה?", exampleNikud: "אַתֶּם צְרִיכִים עֶזְרָה?", exampleEn: "Do you need help?" },
      { pronoun: "הם", pronounNikud: "הֵם", pronounEn: "they", form: "צריכים", formNikud: "צְרִיכִים", example: "הם צריכים לעבוד", exampleNikud: "הֵם צְרִיכִים לַעֲבֹד", exampleEn: "They need to work" },
    ],
  },
  {
    word: "יכול",
    wordEn: "can",
    rows: [
      { pronoun: "אני (זכר)", pronounNikud: "אֲנִי (ז)", pronounEn: "I (m.)", form: "יכול", formNikud: "יָכוֹל", example: "אני יכול לעזור", exampleNikud: "אֲנִי יָכוֹל לַעֲזֹר", exampleEn: "I can help" },
      { pronoun: "אני (נקבה)", pronounNikud: "אֲנִי (נ)", pronounEn: "I (f.)", form: "יכולה", formNikud: "יְכוֹלָה", example: "אני יכולה לעזור", exampleNikud: "אֲנִי יְכוֹלָה לַעֲזֹר", exampleEn: "I can help" },
      { pronoun: "הוא", pronounNikud: "הוּא", pronounEn: "he", form: "יכול", formNikud: "יָכוֹל", example: "הוא יכול לקרוא", exampleNikud: "הוּא יָכוֹל לִקְרֹא", exampleEn: "He can read" },
      { pronoun: "היא", pronounNikud: "הִיא", pronounEn: "she", form: "יכולה", formNikud: "יְכוֹלָה", example: "היא יכולה לקרוא", exampleNikud: "הִיא יְכוֹלָה לִקְרֹא", exampleEn: "She can read" },
      { pronoun: "אנחנו", pronounNikud: "אֲנַחְנוּ", pronounEn: "we", form: "יכולים", formNikud: "יְכוֹלִים", example: "אנחנו יכולים ללכת", exampleNikud: "אֲנַחְנוּ יְכוֹלִים לָלֶכֶת", exampleEn: "We can go" },
      { pronoun: "אתם", pronounNikud: "אַתֶּם", pronounEn: "you (pl.)", form: "יכולים", formNikud: "יְכוֹלִים", example: "אתם יכולים לבוא?", exampleNikud: "אַתֶּם יְכוֹלִים לָבוֹא?", exampleEn: "Can you come?" },
      { pronoun: "הם", pronounNikud: "הֵם", pronounEn: "they", form: "יכולים", formNikud: "יְכוֹלִים", example: "הם יכולים לשחק", exampleNikud: "הֵם יְכוֹלִים לְשַׂחֵק", exampleEn: "They can play" },
    ],
  },
  {
    word: "אוהב",
    wordEn: "love / like",
    rows: [
      { pronoun: "אני (זכר)", pronounNikud: "אֲנִי (ז)", pronounEn: "I (m.)", form: "אוהב", formNikud: "אוֹהֵב", example: "אני אוהב מוזיקה", exampleNikud: "אֲנִי אוֹהֵב מוּזִיקָה", exampleEn: "I love music" },
      { pronoun: "אני (נקבה)", pronounNikud: "אֲנִי (נ)", pronounEn: "I (f.)", form: "אוהבת", formNikud: "אוֹהֶבֶת", example: "אני אוהבת מוזיקה", exampleNikud: "אֲנִי אוֹהֶבֶת מוּזִיקָה", exampleEn: "I love music" },
      { pronoun: "הוא", pronounNikud: "הוּא", pronounEn: "he", form: "אוהב", formNikud: "אוֹהֵב", example: "הוא אוהב לקרוא", exampleNikud: "הוּא אוֹהֵב לִקְרֹא", exampleEn: "He loves to read" },
      { pronoun: "היא", pronounNikud: "הִיא", pronounEn: "she", form: "אוהבת", formNikud: "אוֹהֶבֶת", example: "היא אוהבת לקרוא", exampleNikud: "הִיא אוֹהֶבֶת לִקְרֹא", exampleEn: "She loves to read" },
      { pronoun: "אנחנו", pronounNikud: "אֲנַחְנוּ", pronounEn: "we", form: "אוהבים", formNikud: "אוֹהֲבִים", example: "אנחנו אוהבים פיצה", exampleNikud: "אֲנַחְנוּ אוֹהֲבִים פִּיצָה", exampleEn: "We love pizza" },
      { pronoun: "אתם", pronounNikud: "אַתֶּם", pronounEn: "you (pl.)", form: "אוהבים", formNikud: "אוֹהֲבִים", example: "אתם אוהבים ים?", exampleNikud: "אַתֶּם אוֹהֲבִים יָם?", exampleEn: "Do you love the sea?" },
      { pronoun: "הם", pronounNikud: "הֵם", pronounEn: "they", form: "אוהבים", formNikud: "אוֹהֲבִים", example: "הם אוהבים לשחק", exampleNikud: "הֵם אוֹהֲבִים לְשַׂחֵק", exampleEn: "They love to play" },
    ],
  },
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
