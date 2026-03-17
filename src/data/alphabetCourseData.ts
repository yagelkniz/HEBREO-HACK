// ========== STAGE 1: Letters ==========
export interface HebrewLetter {
  letter: string;
  name: string;
  nameWithNikud: string;
  sound: string;
  soundExample: string;
  exampleWord: string;
  exampleWordNikud: string;
  exampleTransliteration: string;
  exampleTranslation: string;
  isFinal?: boolean;
}

export const hebrewLetters: HebrewLetter[] = [
  { letter: "א", name: "אלף", nameWithNikud: "אָלֶף", sound: "a / silent", soundExample: 'כמו "a" ב-apple', exampleWord: "אבא", exampleWordNikud: "אָבָּא", exampleTransliteration: "A-ba", exampleTranslation: "Dad" },
  { letter: "ב", name: "בית", nameWithNikud: "בֵּית", sound: "b / v", soundExample: 'כמו "b" ב-boy', exampleWord: "בית", exampleWordNikud: "בַּיִת", exampleTransliteration: "Ba-yit", exampleTranslation: "House" },
  { letter: "ג", name: "גימל", nameWithNikud: "גִּימֶל", sound: "g", soundExample: 'כמו "g" ב-go', exampleWord: "גמל", exampleWordNikud: "גָּמָל", exampleTransliteration: "Ga-mal", exampleTranslation: "Camel" },
  { letter: "ד", name: "דלת", nameWithNikud: "דָּלֶת", sound: "d", soundExample: 'כמו "d" ב-dog', exampleWord: "דלת", exampleWordNikud: "דֶּלֶת", exampleTransliteration: "De-let", exampleTranslation: "Door" },
  { letter: "ה", name: "הא", nameWithNikud: "הֵא", sound: "h", soundExample: 'כמו "h" ב-hello', exampleWord: "הר", exampleWordNikud: "הַר", exampleTransliteration: "Har", exampleTranslation: "Mountain" },
  { letter: "ו", name: "וו", nameWithNikud: "וָו", sound: "v / o / u", soundExample: 'כמו "v" ב-very', exampleWord: "ורד", exampleWordNikud: "וֶרֶד", exampleTransliteration: "Ve-red", exampleTranslation: "Rose" },
  { letter: "ז", name: "זין", nameWithNikud: "זַיִן", sound: "z", soundExample: 'כמו "z" ב-zoo', exampleWord: "זית", exampleWordNikud: "זַיִת", exampleTransliteration: "Za-yit", exampleTranslation: "Olive" },
  { letter: "ח", name: "חית", nameWithNikud: "חֵית", sound: "ch", soundExample: 'כמו "ch" בגרמנית Bach', exampleWord: "חלב", exampleWordNikud: "חָלָב", exampleTransliteration: "Cha-lav", exampleTranslation: "Milk" },
  { letter: "ט", name: "טית", nameWithNikud: "טֵית", sound: "t", soundExample: 'כמו "t" ב-top', exampleWord: "טוב", exampleWordNikud: "טוֹב", exampleTransliteration: "Tov", exampleTranslation: "Good" },
  { letter: "י", name: "יוד", nameWithNikud: "יוּד", sound: "y", soundExample: 'כמו "y" ב-yes', exampleWord: "יד", exampleWordNikud: "יָד", exampleTransliteration: "Yad", exampleTranslation: "Hand" },
  { letter: "כ", name: "כף", nameWithNikud: "כַּף", sound: "k / ch", soundExample: 'כמו "k" ב-kite', exampleWord: "כלב", exampleWordNikud: "כֶּלֶב", exampleTransliteration: "Ke-lev", exampleTranslation: "Dog" },
  { letter: "ל", name: "למד", nameWithNikud: "לָמֶד", sound: "l", soundExample: 'כמו "l" ב-love', exampleWord: "לב", exampleWordNikud: "לֵב", exampleTransliteration: "Lev", exampleTranslation: "Heart" },
  { letter: "מ", name: "מם", nameWithNikud: "מֵם", sound: "m", soundExample: 'כמו "m" ב-mom', exampleWord: "מים", exampleWordNikud: "מַיִם", exampleTransliteration: "Ma-yim", exampleTranslation: "Water" },
  { letter: "נ", name: "נון", nameWithNikud: "נוּן", sound: "n", soundExample: 'כמו "n" ב-no', exampleWord: "נר", exampleWordNikud: "נֵר", exampleTransliteration: "Ner", exampleTranslation: "Candle" },
  { letter: "ס", name: "סמך", nameWithNikud: "סָמֶךְ", sound: "s", soundExample: 'כמו "s" ב-sun', exampleWord: "ספר", exampleWordNikud: "סֵפֶר", exampleTransliteration: "Se-fer", exampleTranslation: "Book" },
  { letter: "ע", name: "עין", nameWithNikud: "עַיִן", sound: "a / silent", soundExample: "צליל גרוני עמוק", exampleWord: "עץ", exampleWordNikud: "עֵץ", exampleTransliteration: "Etz", exampleTranslation: "Tree" },
  { letter: "פ", name: "פא", nameWithNikud: "פֵּא", sound: "p / f", soundExample: 'כמו "p" ב-pen', exampleWord: "פה", exampleWordNikud: "פֶּה", exampleTransliteration: "Pe", exampleTranslation: "Mouth" },
  { letter: "צ", name: "צדי", nameWithNikud: "צָדִי", sound: "ts", soundExample: 'כמו "ts" ב-cats', exampleWord: "צבע", exampleWordNikud: "צֶבַע", exampleTransliteration: "Tze-va", exampleTranslation: "Color" },
  { letter: "ק", name: "קוף", nameWithNikud: "קוּף", sound: "k", soundExample: 'כמו "k" ב-king', exampleWord: "קול", exampleWordNikud: "קוֹל", exampleTransliteration: "Kol", exampleTranslation: "Voice" },
  { letter: "ר", name: "ריש", nameWithNikud: "רֵישׁ", sound: "r", soundExample: 'כמו "r" בצרפתית', exampleWord: "רגל", exampleWordNikud: "רֶגֶל", exampleTransliteration: "Re-gel", exampleTranslation: "Leg" },
  { letter: "ש", name: "שין", nameWithNikud: "שִׁין", sound: "sh / s", soundExample: 'כמו "sh" ב-shop', exampleWord: "שמש", exampleWordNikud: "שֶׁמֶשׁ", exampleTransliteration: "She-mesh", exampleTranslation: "Sun" },
  { letter: "ת", name: "תו", nameWithNikud: "תָּו", sound: "t", soundExample: 'כמו "t" ב-tea', exampleWord: "תפוח", exampleWordNikud: "תַּפּוּחַ", exampleTransliteration: "Ta-pu-ach", exampleTranslation: "Apple" },
  // Final letters
  { letter: "ך", name: "כף סופית", nameWithNikud: "כַּף סוֹפִית", sound: "ch / k", soundExample: "כמו כ בסוף מילה", exampleWord: "מלך", exampleWordNikud: "מֶלֶךְ", exampleTransliteration: "Me-lech", exampleTranslation: "King", isFinal: true },
  { letter: "ם", name: "מם סופית", nameWithNikud: "מֵם סוֹפִית", sound: "m", soundExample: "כמו מ בסוף מילה", exampleWord: "מים", exampleWordNikud: "מַיִם", exampleTransliteration: "Ma-yim", exampleTranslation: "Water", isFinal: true },
  { letter: "ן", name: "נון סופית", nameWithNikud: "נוּן סוֹפִית", sound: "n", soundExample: "כמו נ בסוף מילה", exampleWord: "חלון", exampleWordNikud: "חַלּוֹן", exampleTransliteration: "Cha-lon", exampleTranslation: "Window", isFinal: true },
  { letter: "ף", name: "פא סופית", nameWithNikud: "פֵּא סוֹפִית", sound: "f", soundExample: "כמו פ בסוף מילה", exampleWord: "כסף", exampleWordNikud: "כֶּסֶף", exampleTransliteration: "Ke-sef", exampleTranslation: "Money", isFinal: true },
  { letter: "ץ", name: "צדי סופית", nameWithNikud: "צָדִי סוֹפִית", sound: "ts", soundExample: "כמו צ בסוף מילה", exampleWord: "עץ", exampleWordNikud: "עֵץ", exampleTransliteration: "Etz", exampleTranslation: "Tree", isFinal: true },
];

// ========== STAGE 2: Nikud ==========
export interface NikudMark {
  name: string;
  nameWithNikud: string;
  symbol: string;
  sound: string;
  soundExample: string;
  letterExample: string; // letter + nikud combined
  examples: { word: string; transliteration: string }[];
}

export const nikudMarks: NikudMark[] = [
  { name: "פתח", nameWithNikud: "פַּתַח", symbol: "ַ", sound: "a", soundExample: 'כמו "a" ב-cat', letterExample: "בַ", examples: [{ word: "בַּיִת", transliteration: "Ba-yit" }, { word: "יַד", transliteration: "Yad" }, { word: "אַבָּא", transliteration: "A-ba" }] },
  { name: "קמץ", nameWithNikud: "קָמָץ", symbol: "ָ", sound: "a", soundExample: 'כמו "a" ב-father', letterExample: "בָ", examples: [{ word: "שָׁלוֹם", transliteration: "Sha-lom" }, { word: "גָּדוֹל", transliteration: "Ga-dol" }, { word: "חָלָב", transliteration: "Cha-lav" }] },
  { name: "סגול", nameWithNikud: "סֶגוֹל", symbol: "ֶ", sound: "e", soundExample: 'כמו "e" ב-bed', letterExample: "בֶ", examples: [{ word: "יֶלֶד", transliteration: "Ye-led" }, { word: "כֶּלֶב", transliteration: "Ke-lev" }, { word: "דֶּלֶת", transliteration: "De-let" }] },
  { name: "צירי", nameWithNikud: "צֵירֵי", symbol: "ֵ", sound: "e", soundExample: 'כמו "ey" ב-they', letterExample: "בֵ", examples: [{ word: "סֵפֶר", transliteration: "Se-fer" }, { word: "לֵב", transliteration: "Lev" }, { word: "נֵר", transliteration: "Ner" }] },
  { name: "חיריק", nameWithNikud: "חִירִיק", symbol: "ִ", sound: "i", soundExample: 'כמו "ee" ב-see', letterExample: "בִ", examples: [{ word: "בִּירָה", transliteration: "Bi-ra" }, { word: "שִׁיר", transliteration: "Shir" }, { word: "כִּסֵּא", transliteration: "Ki-se" }] },
  { name: "חולם", nameWithNikud: "חוֹלָם", symbol: "ֹ", sound: "o", soundExample: 'כמו "o" ב-go', letterExample: "בֹ", examples: [{ word: "שָׁלוֹם", transliteration: "Sha-lom" }, { word: "טוֹב", transliteration: "Tov" }, { word: "קוֹל", transliteration: "Kol" }] },
  { name: "שורוק", nameWithNikud: "שׁוּרוּק", symbol: "וּ", sound: "u", soundExample: 'כמו "oo" ב-moon', letterExample: "בוּ", examples: [{ word: "שׁוּק", transliteration: "Shuk" }, { word: "חוּל", transliteration: "Chul" }, { word: "סוּס", transliteration: "Sus" }] },
  { name: "קובוץ", nameWithNikud: "קֻבּוּץ", symbol: "ֻ", sound: "u", soundExample: 'כמו "oo" ב-food', letterExample: "בֻ", examples: [{ word: "שֻׁלְחָן", transliteration: "Shul-chan" }, { word: "קֻבּוּץ", transliteration: "Ku-butz" }, { word: "כֻּלָּם", transliteration: "Ku-lam" }] },
  { name: "שווא", nameWithNikud: "שְׁוָא", symbol: "ְ", sound: "silent / e", soundExample: "שקט או צליל קצר מאוד", letterExample: "בְ", examples: [{ word: "בְּרֵאשִׁית", transliteration: "Be-re-shit" }, { word: "שְׁמוֹ", transliteration: "Shmo" }, { word: "דְּבַשׁ", transliteration: "Dvash" }] },
];

// ========== STAGE 3: Syllables ==========
export interface SyllableGroup {
  letter: string;
  letterName: string;
  syllables: { syllable: string; nikudName: string; sound: string }[];
}

export const syllableGroups: SyllableGroup[] = [
  { letter: "ב", letterName: "בית", syllables: [
    { syllable: "בַּ", nikudName: "פתח", sound: "ba" },
    { syllable: "בִּ", nikudName: "חיריק", sound: "bi" },
    { syllable: "בֻּ", nikudName: "קובוץ", sound: "bu" },
    { syllable: "בֶּ", nikudName: "סגול", sound: "be" },
    { syllable: "בֹּ", nikudName: "חולם", sound: "bo" },
  ]},
  { letter: "מ", letterName: "מם", syllables: [
    { syllable: "מַ", nikudName: "פתח", sound: "ma" },
    { syllable: "מִ", nikudName: "חיריק", sound: "mi" },
    { syllable: "מֻ", nikudName: "קובוץ", sound: "mu" },
    { syllable: "מֶ", nikudName: "סגול", sound: "me" },
    { syllable: "מֹ", nikudName: "חולם", sound: "mo" },
  ]},
  { letter: "ל", letterName: "למד", syllables: [
    { syllable: "לַ", nikudName: "פתח", sound: "la" },
    { syllable: "לִ", nikudName: "חיריק", sound: "li" },
    { syllable: "לֻ", nikudName: "קובוץ", sound: "lu" },
    { syllable: "לֶ", nikudName: "סגול", sound: "le" },
    { syllable: "לֹ", nikudName: "חולם", sound: "lo" },
  ]},
  { letter: "ש", letterName: "שין", syllables: [
    { syllable: "שַׁ", nikudName: "פתח", sound: "sha" },
    { syllable: "שִׁ", nikudName: "חיריק", sound: "shi" },
    { syllable: "שֻׁ", nikudName: "קובוץ", sound: "shu" },
    { syllable: "שֶׁ", nikudName: "סגול", sound: "she" },
    { syllable: "שֹׁ", nikudName: "חולם", sound: "sho" },
  ]},
  { letter: "ד", letterName: "דלת", syllables: [
    { syllable: "דַ", nikudName: "פתח", sound: "da" },
    { syllable: "דִ", nikudName: "חיריק", sound: "di" },
    { syllable: "דֻ", nikudName: "קובוץ", sound: "du" },
    { syllable: "דֶ", nikudName: "סגול", sound: "de" },
    { syllable: "דֹ", nikudName: "חולם", sound: "do" },
  ]},
  { letter: "ר", letterName: "ריש", syllables: [
    { syllable: "רַ", nikudName: "פתח", sound: "ra" },
    { syllable: "רִ", nikudName: "חיריק", sound: "ri" },
    { syllable: "רֻ", nikudName: "קובוץ", sound: "ru" },
    { syllable: "רֶ", nikudName: "סגול", sound: "re" },
    { syllable: "רֹ", nikudName: "חולם", sound: "ro" },
  ]},
  { letter: "ת", letterName: "תו", syllables: [
    { syllable: "תַ", nikudName: "פתח", sound: "ta" },
    { syllable: "תִ", nikudName: "חיריק", sound: "ti" },
    { syllable: "תֻ", nikudName: "קובוץ", sound: "tu" },
    { syllable: "תֶ", nikudName: "סגול", sound: "te" },
    { syllable: "תֹ", nikudName: "חולם", sound: "to" },
  ]},
  { letter: "כ", letterName: "כף", syllables: [
    { syllable: "כַּ", nikudName: "פתח", sound: "ka" },
    { syllable: "כִּ", nikudName: "חיריק", sound: "ki" },
    { syllable: "כֻּ", nikudName: "קובוץ", sound: "ku" },
    { syllable: "כֶּ", nikudName: "סגול", sound: "ke" },
    { syllable: "כֹּ", nikudName: "חולם", sound: "ko" },
  ]},
];

// ========== STAGE 4: First Words ==========
export interface FirstWord {
  word: string;
  wordWithNikud: string;
  transliteration: string;
  translation: string;
}

export const firstWords: FirstWord[] = [
  { word: "אבא", wordWithNikud: "אָבָּא", transliteration: "A-ba", translation: "Dad / Father" },
  { word: "אמא", wordWithNikud: "אִמָּא", transliteration: "I-ma", translation: "Mom / Mother" },
  { word: "בית", wordWithNikud: "בַּיִת", transliteration: "Ba-yit", translation: "House" },
  { word: "ילד", wordWithNikud: "יֶלֶד", transliteration: "Ye-led", translation: "Boy / Child" },
  { word: "ילדה", wordWithNikud: "יַלְדָּה", transliteration: "Yal-da", translation: "Girl" },
  { word: "כלב", wordWithNikud: "כֶּלֶב", transliteration: "Ke-lev", translation: "Dog" },
  { word: "חתול", wordWithNikud: "חָתוּל", transliteration: "Cha-tul", translation: "Cat" },
  { word: "מים", wordWithNikud: "מַיִם", transliteration: "Ma-yim", translation: "Water" },
  { word: "לחם", wordWithNikud: "לֶחֶם", transliteration: "Le-chem", translation: "Bread" },
  { word: "שמש", wordWithNikud: "שֶׁמֶשׁ", transliteration: "She-mesh", translation: "Sun" },
  { word: "ספר", wordWithNikud: "סֵפֶר", transliteration: "Se-fer", translation: "Book" },
  { word: "עץ", wordWithNikud: "עֵץ", transliteration: "Etz", translation: "Tree" },
  { word: "דלת", wordWithNikud: "דֶּלֶת", transliteration: "De-let", translation: "Door" },
  { word: "חלון", wordWithNikud: "חַלּוֹן", transliteration: "Cha-lon", translation: "Window" },
  { word: "שולחן", wordWithNikud: "שֻׁלְחָן", transliteration: "Shul-chan", translation: "Table" },
  { word: "כיסא", wordWithNikud: "כִּסֵּא", transliteration: "Ki-se", translation: "Chair" },
  { word: "רגל", wordWithNikud: "רֶגֶל", transliteration: "Re-gel", translation: "Leg" },
  { word: "יד", wordWithNikud: "יָד", transliteration: "Yad", translation: "Hand" },
  { word: "עין", wordWithNikud: "עַיִן", transliteration: "A-yin", translation: "Eye" },
  { word: "פה", wordWithNikud: "פֶּה", transliteration: "Pe", translation: "Mouth" },
];

// ========== STAGE 5: Short Sentences ==========
export interface ShortSentence {
  sentence: string;
  sentenceWithNikud: string;
  words: string[]; // individual words for highlighting
  transliteration: string;
  translation: string;
}

export const shortSentences: ShortSentence[] = [
  { sentence: "זה הבית שלי", sentenceWithNikud: "זֶה הַבַּיִת שֶׁלִּי", words: ["זֶה", "הַבַּיִת", "שֶׁלִּי"], transliteration: "Ze ha-ba-yit she-li", translation: "This is my house" },
  { sentence: "הכלב רץ מהר", sentenceWithNikud: "הַכֶּלֶב רָץ מַהֵר", words: ["הַכֶּלֶב", "רָץ", "מַהֵר"], transliteration: "Ha-ke-lev ratz ma-her", translation: "The dog runs fast" },
  { sentence: "אני אוהב לקרוא", sentenceWithNikud: "אֲנִי אוֹהֵב לִקְרֹא", words: ["אֲנִי", "אוֹהֵב", "לִקְרֹא"], transliteration: "A-ni o-hev lik-ro", translation: "I love to read" },
  { sentence: "השמש זורחת", sentenceWithNikud: "הַשֶּׁמֶשׁ זוֹרַחַת", words: ["הַשֶּׁמֶשׁ", "זוֹרַחַת"], transliteration: "Ha-she-mesh zo-ra-chat", translation: "The sun is shining" },
  { sentence: "אמא ואבא בבית", sentenceWithNikud: "אִמָּא וְאָבָּא בַּבַּיִת", words: ["אִמָּא", "וְאָבָּא", "בַּבַּיִת"], transliteration: "I-ma ve-a-ba ba-ba-yit", translation: "Mom and dad are home" },
  { sentence: "הילד שותה מים", sentenceWithNikud: "הַיֶּלֶד שׁוֹתֶה מַיִם", words: ["הַיֶּלֶד", "שׁוֹתֶה", "מַיִם"], transliteration: "Ha-ye-led sho-te ma-yim", translation: "The boy drinks water" },
  { sentence: "הספר על השולחן", sentenceWithNikud: "הַסֵּפֶר עַל הַשֻּׁלְחָן", words: ["הַסֵּפֶר", "עַל", "הַשֻּׁלְחָן"], transliteration: "Ha-se-fer al ha-shul-chan", translation: "The book is on the table" },
  { sentence: "אני רואה את העץ", sentenceWithNikud: "אֲנִי רוֹאֶה אֶת הָעֵץ", words: ["אֲנִי", "רוֹאֶה", "אֶת", "הָעֵץ"], transliteration: "A-ni ro-e et ha-etz", translation: "I see the tree" },
  { sentence: "החתול ישן על הכיסא", sentenceWithNikud: "הֶחָתוּל יָשֵׁן עַל הַכִּסֵּא", words: ["הֶחָתוּל", "יָשֵׁן", "עַל", "הַכִּסֵּא"], transliteration: "He-cha-tul ya-shen al ha-ki-se", translation: "The cat sleeps on the chair" },
  { sentence: "שלום וברכה", sentenceWithNikud: "שָׁלוֹם וּבְרָכָה", words: ["שָׁלוֹם", "וּבְרָכָה"], transliteration: "Sha-lom u-vra-cha", translation: "Hello and blessings" },
];

// Encouragement messages
export const encouragements = [
  "כל הכבוד! 🌟",
  "מעולה! 💪",
  "ממשיכים! 🚀",
  "יפה מאוד! ✨",
  "אלוף/ה! 🏆",
  "נהדר! 🎉",
  "את/ה מתקדם/ת יופי! 🌈",
  "עוד קצת! 💫",
];

export const stageNames = [
  "הכרת האות",
  "הניקוד",
  "הברות",
  "מילים ראשונות",
  "משפטים קצרים",
];
