// Exercise data for practice modes

export interface FillInBlankQuestion {
  id: string;
  sentence: string;
  sentenceWithNikud: string;
  blank: string;
  correctAnswer: string;
  correctAnswerWithNikud: string;
  options: { text: string; textWithNikud: string }[];
  hint: string;
  hintHe: string;
  context: string;
}

export interface IdentifyBinyanQuestion {
  id: string;
  word: string;
  wordWithNikud: string;
  root: string;
  correctBinyan: string;
  meaning: string;
  meaningHe: string;
  options: string[];
}

export interface ErrorCorrectionQuestion {
  id: string;
  incorrectSentence: string;
  incorrectSentenceWithNikud: string;
  correctSentence: string;
  correctSentenceWithNikud: string;
  errorType: "gender" | "number" | "tense" | "binyan";
  explanation: string;
  explanationHe: string;
}

export interface FindRootQuestion {
  id: string;
  conjugatedWord: string;
  conjugatedWordWithNikud: string;
  correctRoot: string;
  correctBinyan: string;
  rootOptions: string[];
  binyanOptions: string[];
  meaning: string;
  meaningHe: string;
}

// Fill in the blank exercises
export const fillInBlankQuestions: FillInBlankQuestion[] = [
  {
    id: "fib-1",
    sentence: "הילד ___ ספר חדש.",
    sentenceWithNikud: "הַיֶּלֶד ___ סֵפֶר חָדָשׁ.",
    blank: "___",
    correctAnswer: "קורא",
    correctAnswerWithNikud: "קוֹרֵא",
    options: [
      { text: "קורא", textWithNikud: "קוֹרֵא" },
      { text: "קוראת", textWithNikud: "קוֹרֵאת" },
      { text: "קוראים", textWithNikud: "קוֹרְאִים" },
      { text: "קראתי", textWithNikud: "קָרָאתִי" },
    ],
    hint: "The subject is masculine singular (הילד)",
    hintHe: "הנושא הוא זכר יחיד (הילד)",
    context: "present tense, masculine singular",
  },
  {
    id: "fib-2",
    sentence: "אתמול היא ___ לעבודה.",
    sentenceWithNikud: "אֶתְמוֹל הִיא ___ לַעֲבוֹדָה.",
    blank: "___",
    correctAnswer: "הלכה",
    correctAnswerWithNikud: "הָלְכָה",
    options: [
      { text: "הולכת", textWithNikud: "הוֹלֶכֶת" },
      { text: "הלכה", textWithNikud: "הָלְכָה" },
      { text: "תלך", textWithNikud: "תֵּלֵךְ" },
      { text: "הלך", textWithNikud: "הָלַךְ" },
    ],
    hint: "אתמול indicates past tense, היא is feminine singular",
    hintHe: "אתמול מציין עבר, היא נקבה יחידה",
    context: "past tense, feminine singular",
  },
  {
    id: "fib-3",
    sentence: "מחר אנחנו ___ לים.",
    sentenceWithNikud: "מָחָר אֲנַחְנוּ ___ לַיָּם.",
    blank: "___",
    correctAnswer: "נלך",
    correctAnswerWithNikud: "נֵלֵךְ",
    options: [
      { text: "הולכים", textWithNikud: "הוֹלְכִים" },
      { text: "הלכנו", textWithNikud: "הָלַכְנוּ" },
      { text: "נלך", textWithNikud: "נֵלֵךְ" },
      { text: "ילכו", textWithNikud: "יֵלְכוּ" },
    ],
    hint: "מחר indicates future tense, אנחנו is first person plural",
    hintHe: "מחר מציין עתיד, אנחנו גוף ראשון רבים",
    context: "future tense, first person plural",
  },
  {
    id: "fib-4",
    sentence: "הסטודנטים ___ עברית בכיתה.",
    sentenceWithNikud: "הַסְּטוּדֶנְטִים ___ עִבְרִית בַּכִּיתָה.",
    blank: "___",
    correctAnswer: "לומדים",
    correctAnswerWithNikud: "לוֹמְדִים",
    options: [
      { text: "לומד", textWithNikud: "לוֹמֵד" },
      { text: "לומדת", textWithNikud: "לוֹמֶדֶת" },
      { text: "לומדים", textWithNikud: "לוֹמְדִים" },
      { text: "למדו", textWithNikud: "לָמְדוּ" },
    ],
    hint: "The subject is masculine plural (הסטודנטים)",
    hintHe: "הנושא הוא זכר רבים (הסטודנטים)",
    context: "present tense, masculine plural",
  },
  {
    id: "fib-5",
    sentence: "המורה ___ את התלמידים.",
    sentenceWithNikud: "הַמּוֹרָה ___ אֶת הַתַּלְמִידִים.",
    blank: "___",
    correctAnswer: "מלמדת",
    correctAnswerWithNikud: "מְלַמֶּדֶת",
    options: [
      { text: "לומדת", textWithNikud: "לוֹמֶדֶת" },
      { text: "מלמדת", textWithNikud: "מְלַמֶּדֶת" },
      { text: "מלמד", textWithNikud: "מְלַמֵּד" },
      { text: "לימדה", textWithNikud: "לִימְּדָה" },
    ],
    hint: "Teaching (Pi'el) vs Learning (Pa'al), feminine subject",
    hintHe: "ללמד (פיעל) לעומת ללמוד (פעל), נושא נקבה",
    context: "present tense, Pi'el, feminine singular",
  },
];

// Identify binyan exercises
export const identifyBinyanQuestions: IdentifyBinyanQuestion[] = [
  {
    id: "ib-1",
    word: "מתלבש",
    wordWithNikud: "מִתְלַבֵּשׁ",
    root: "ל-ב-ש",
    correctBinyan: "hitpael",
    meaning: "gets dressed",
    meaningHe: "מתלבש",
    options: ["paal", "piel", "hifil", "hitpael"],
  },
  {
    id: "ib-2",
    word: "מדבר",
    wordWithNikud: "מְדַבֵּר",
    root: "ד-ב-ר",
    correctBinyan: "piel",
    meaning: "speaks",
    meaningHe: "מדבר",
    options: ["paal", "piel", "nifal", "hifil"],
  },
  {
    id: "ib-3",
    word: "נשבר",
    wordWithNikud: "נִשְׁבַּר",
    root: "ש-ב-ר",
    correctBinyan: "nifal",
    meaning: "was broken",
    meaningHe: "נשבר",
    options: ["paal", "nifal", "piel", "pual"],
  },
  {
    id: "ib-4",
    word: "מלביש",
    wordWithNikud: "מַלְבִּישׁ",
    root: "ל-ב-ש",
    correctBinyan: "hifil",
    meaning: "dresses (someone)",
    meaningHe: "מלביש מישהו",
    options: ["paal", "piel", "hifil", "hitpael"],
  },
  {
    id: "ib-5",
    word: "סופר",
    wordWithNikud: "סֻפַּר",
    root: "ס-פ-ר",
    correctBinyan: "pual",
    meaning: "was told",
    meaningHe: "סופר",
    options: ["paal", "piel", "pual", "nifal"],
  },
  {
    id: "ib-6",
    word: "הוזמן",
    wordWithNikud: "הֻזְמַן",
    root: "ז-מ-ן",
    correctBinyan: "hufal",
    meaning: "was invited",
    meaningHe: "הוזמן",
    options: ["hifil", "hufal", "nifal", "pual"],
  },
];

// Error correction exercises
export const errorCorrectionQuestions: ErrorCorrectionQuestion[] = [
  {
    id: "ec-1",
    incorrectSentence: "הילדה הולך לבית הספר.",
    incorrectSentenceWithNikud: "הַיַּלְדָּה הוֹלֵךְ לְבֵית הַסֵּפֶר.",
    correctSentence: "הילדה הולכת לבית הספר.",
    correctSentenceWithNikud: "הַיַּלְדָּה הוֹלֶכֶת לְבֵית הַסֵּפֶר.",
    errorType: "gender",
    explanation: "The verb must agree with the feminine subject 'הילדה'. הולך (masculine) should be הולכת (feminine).",
    explanationHe: "הפועל חייב להתאים לנושא הנקבה 'הילדה'. הולך (זכר) צריך להיות הולכת (נקבה).",
  },
  {
    id: "ec-2",
    incorrectSentence: "הילדים רואה את הכלב.",
    incorrectSentenceWithNikud: "הַיְּלָדִים רוֹאֶה אֶת הַכֶּלֶב.",
    correctSentence: "הילדים רואים את הכלב.",
    correctSentenceWithNikud: "הַיְּלָדִים רוֹאִים אֶת הַכֶּלֶב.",
    errorType: "number",
    explanation: "The verb must agree with the plural subject 'הילדים'. רואה (singular) should be רואים (plural).",
    explanationHe: "הפועל חייב להתאים לנושא ברבים 'הילדים'. רואה (יחיד) צריך להיות רואים (רבים).",
  },
  {
    id: "ec-3",
    incorrectSentence: "אתמול אני אוכל פיצה.",
    incorrectSentenceWithNikud: "אֶתְמוֹל אֲנִי אוֹכֵל פִּיצָה.",
    correctSentence: "אתמול אני אכלתי פיצה.",
    correctSentenceWithNikud: "אֶתְמוֹל אֲנִי אָכַלְתִּי פִּיצָה.",
    errorType: "tense",
    explanation: "'אתמול' (yesterday) requires past tense. אוכל (present) should be אכלתי (past).",
    explanationHe: "'אתמול' דורש זמן עבר. אוכל (הווה) צריך להיות אכלתי (עבר).",
  },
  {
    id: "ec-4",
    incorrectSentence: "היא לומד עברית.",
    incorrectSentenceWithNikud: "הִיא לוֹמֵד עִבְרִית.",
    correctSentence: "היא לומדת עברית.",
    correctSentenceWithNikud: "הִיא לוֹמֶדֶת עִבְרִית.",
    errorType: "gender",
    explanation: "The verb must agree with the feminine pronoun 'היא'. לומד (masculine) should be לומדת (feminine).",
    explanationHe: "הפועל חייב להתאים לכינוי הנקבה 'היא'. לומד (זכר) צריך להיות לומדת (נקבה).",
  },
  {
    id: "ec-5",
    incorrectSentence: "אנחנו תלמד מחר.",
    incorrectSentenceWithNikud: "אֲנַחְנוּ תִּלְמַד מָחָר.",
    correctSentence: "אנחנו נלמד מחר.",
    correctSentenceWithNikud: "אֲנַחְנוּ נִלְמַד מָחָר.",
    errorType: "tense",
    explanation: "'אנחנו' in future tense uses נ- prefix, not ת-. תלמד should be נלמד.",
    explanationHe: "'אנחנו' בעתיד משתמש בתחילית נ-, לא ת-. תלמד צריך להיות נלמד.",
  },
];

// Find the root exercises
export const findRootQuestions: FindRootQuestion[] = [
  {
    id: "fr-1",
    conjugatedWord: "מתלבשים",
    conjugatedWordWithNikud: "מִתְלַבְּשִׁים",
    correctRoot: "ל-ב-ש",
    correctBinyan: "hitpael",
    rootOptions: ["ל-ב-ש", "ת-ל-ב", "מ-ל-ב", "ב-ש-ל"],
    binyanOptions: ["paal", "piel", "hitpael", "hifil"],
    meaning: "getting dressed (m.pl.)",
    meaningHe: "מתלבשים (זכר רבים)",
  },
  {
    id: "fr-2",
    conjugatedWord: "הזמנתי",
    conjugatedWordWithNikud: "הִזְמַנְתִּי",
    correctRoot: "ז-מ-ן",
    correctBinyan: "hifil",
    rootOptions: ["ז-מ-ן", "ה-ז-מ", "מ-נ-ה", "נ-ת-ן"],
    binyanOptions: ["paal", "piel", "hifil", "nifal"],
    meaning: "I invited",
    meaningHe: "הזמנתי",
  },
  {
    id: "fr-3",
    conjugatedWord: "דיברנו",
    conjugatedWordWithNikud: "דִּבַּרְנוּ",
    correctRoot: "ד-ב-ר",
    correctBinyan: "piel",
    rootOptions: ["ד-ב-ר", "ב-ר-ד", "ד-ר-ב", "ר-ד-ב"],
    binyanOptions: ["paal", "piel", "nifal", "hitpael"],
    meaning: "we spoke",
    meaningHe: "דיברנו",
  },
  {
    id: "fr-4",
    conjugatedWord: "נכתב",
    conjugatedWordWithNikud: "נִכְתַּב",
    correctRoot: "כ-ת-ב",
    correctBinyan: "nifal",
    rootOptions: ["כ-ת-ב", "נ-כ-ת", "ת-ב-כ", "ב-כ-ת"],
    binyanOptions: ["paal", "nifal", "piel", "hifil"],
    meaning: "was written",
    meaningHe: "נכתב",
  },
  {
    id: "fr-5",
    conjugatedWord: "תלמדי",
    conjugatedWordWithNikud: "תִּלְמְדִי",
    correctRoot: "ל-מ-ד",
    correctBinyan: "paal",
    rootOptions: ["ל-מ-ד", "ת-ל-מ", "מ-ד-ל", "ד-ל-מ"],
    binyanOptions: ["paal", "piel", "hifil", "hitpael"],
    meaning: "you (f.s.) will learn",
    meaningHe: "תלמדי (נקבה יחידה, עתיד)",
  },
];

// Sentence builder data
export interface SentenceBuilderExercise {
  id: string;
  words: { text: string; textWithNikud: string; position: number }[];
  correctOrder: number[];
  translation: string;
  translationHe: string;
  difficulty: "easy" | "medium" | "hard";
}

export const sentenceBuilderExercises: SentenceBuilderExercise[] = [
  {
    id: "sb-1",
    words: [
      { text: "לומד", textWithNikud: "לוֹמֵד", position: 2 },
      { text: "דן", textWithNikud: "דָּן", position: 1 },
      { text: "עברית", textWithNikud: "עִבְרִית", position: 3 },
    ],
    correctOrder: [1, 2, 3],
    translation: "Dan learns Hebrew",
    translationHe: "דן לומד עברית",
    difficulty: "easy",
  },
  {
    id: "sb-2",
    words: [
      { text: "הספר", textWithNikud: "הַסֵּפֶר", position: 1 },
      { text: "על", textWithNikud: "עַל", position: 3 },
      { text: "נמצא", textWithNikud: "נִמְצָא", position: 2 },
      { text: "השולחן", textWithNikud: "הַשֻּׁלְחָן", position: 4 },
    ],
    correctOrder: [1, 2, 3, 4],
    translation: "The book is on the table",
    translationHe: "הספר נמצא על השולחן",
    difficulty: "easy",
  },
  {
    id: "sb-3",
    words: [
      { text: "אתמול", textWithNikud: "אֶתְמוֹל", position: 1 },
      { text: "למסעדה", textWithNikud: "לְמִסְעָדָה", position: 4 },
      { text: "הלכנו", textWithNikud: "הָלַכְנוּ", position: 2 },
      { text: "חדשה", textWithNikud: "חֲדָשָׁה", position: 5 },
      { text: "אנחנו", textWithNikud: "אֲנַחְנוּ", position: 3 },
    ],
    correctOrder: [1, 3, 2, 4, 5],
    translation: "Yesterday we went to a new restaurant",
    translationHe: "אתמול אנחנו הלכנו למסעדה חדשה",
    difficulty: "medium",
  },
  {
    id: "sb-4",
    words: [
      { text: "המורה", textWithNikud: "הַמּוֹרָה", position: 1 },
      { text: "את", textWithNikud: "אֶת", position: 3 },
      { text: "בכיתה", textWithNikud: "בַּכִּיתָה", position: 5 },
      { text: "התלמידים", textWithNikud: "הַתַּלְמִידִים", position: 4 },
      { text: "מלמדת", textWithNikud: "מְלַמֶּדֶת", position: 2 },
    ],
    correctOrder: [1, 2, 3, 4, 5],
    translation: "The teacher teaches the students in the classroom",
    translationHe: "המורה מלמדת את התלמידים בכיתה",
    difficulty: "medium",
  },
];
