export interface VocabWord {
  hebrew: string;
  hebrewNikud: string;
  english: string;
  transliteration: string;
  gender: "m" | "f";
  exampleHe: string;
  exampleEn: string;
}

export const weatherWords: VocabWord[] = [
  { hebrew: "שמש", hebrewNikud: "שֶׁמֶשׁ", english: "Sun", transliteration: "Shémesh", gender: "f", exampleHe: "היום יש הרבה שמש", exampleEn: "Today there is a lot of sun" },
  { hebrew: "גשם", hebrewNikud: "גֶּשֶׁם", english: "Rain", transliteration: "Guéshem", gender: "m", exampleHe: "יורד גשם חזק בחוץ", exampleEn: "It's raining hard outside" },
  { hebrew: "רוח", hebrewNikud: "רוּחַ", english: "Wind", transliteration: "Rúakh", gender: "f", exampleHe: "הרוח חזקה היום", exampleEn: "The wind is strong today" },
  { hebrew: "שלג", hebrewNikud: "שֶׁלֶג", english: "Snow", transliteration: "Shéleg", gender: "m", exampleHe: "יורד שלג בחרמון", exampleEn: "It's snowing on the Hermon" },
  { hebrew: "ענן", hebrewNikud: "עָנָן", english: "Cloud", transliteration: "Anán", gender: "m", exampleHe: "השמיים מלאים בעננים", exampleEn: "The sky is full of clouds" },
  { hebrew: "חום", hebrewNikud: "חוֹם", english: "Heat", transliteration: "Khom", gender: "m", exampleHe: "החום בקיץ קשה מאוד", exampleEn: "The heat in summer is very hard" },
  { hebrew: "קור", hebrewNikud: "קוֹר", english: "Cold", transliteration: "Kor", gender: "m", exampleHe: "בחורף יש קור בירושלים", exampleEn: "In winter it's cold in Jerusalem" },
  { hebrew: "קיץ", hebrewNikud: "קַיִץ", english: "Summer", transliteration: "Káyits", gender: "m", exampleHe: "בקיץ אנחנו הולכים לים", exampleEn: "In summer we go to the beach" },
  { hebrew: "חורף", hebrewNikud: "חוֹרֶף", english: "Winter", transliteration: "Khóref", gender: "m", exampleHe: "בחורף יורד גשם", exampleEn: "In winter it rains" },
  { hebrew: "אביב", hebrewNikud: "אָבִיב", english: "Spring", transliteration: "Avív", gender: "m", exampleHe: "באביב הפרחים פורחים", exampleEn: "In spring the flowers bloom" },
  { hebrew: "סתיו", hebrewNikud: "סְתָיו", english: "Autumn", transliteration: "Stav", gender: "m", exampleHe: "בסתיו העלים נושרים", exampleEn: "In autumn the leaves fall" },
  { hebrew: "סערה", hebrewNikud: "סְעָרָה", english: "Storm", transliteration: "Se'ará", gender: "f", exampleHe: "הייתה סערה חזקה אתמול", exampleEn: "There was a strong storm yesterday" },
];

export interface FillBlankQuestion {
  id: number;
  sentence: string;
  sentenceEn: string;
  blank: string;
  options: string[];
  correct: string;
}

export const weatherQuestions: FillBlankQuestion[] = [
  { id: 1, sentence: "היום יש ___ חזקה ואי אפשר לשבת בחוץ", sentenceEn: "Today there is strong ___ and you can't sit outside", blank: "שמש", options: ["שמש", "גשם", "שלג", "ענן"], correct: "שמש" },
  { id: 2, sentence: "יורד ___ חזק, קח מטרייה!", sentenceEn: "It's ___ hard, take an umbrella!", blank: "גשם", options: ["שלג", "גשם", "רוח", "חום"], correct: "גשם" },
  { id: 3, sentence: "ה___ נושבת חזק ליד הים", sentenceEn: "The ___ blows hard near the sea", blank: "רוח", options: ["שמש", "סערה", "רוח", "ענן"], correct: "רוח" },
  { id: 4, sentence: "יורד ___ לבן על הר החרמון", sentenceEn: "White ___ is falling on Mt. Hermon", blank: "שלג", options: ["גשם", "שלג", "ענן", "קור"], correct: "שלג" },
  { id: 5, sentence: "ב___ אנחנו הולכים לים ושוחים", sentenceEn: "In ___ we go to the sea and swim", blank: "קיץ", options: ["חורף", "סתיו", "קיץ", "אביב"], correct: "קיץ" },
  { id: 6, sentence: "ב___ יורד הרבה גשם בישראל", sentenceEn: "In ___ it rains a lot in Israel", blank: "חורף", options: ["קיץ", "אביב", "חורף", "סתיו"], correct: "חורף" },
  { id: 7, sentence: "ה___ בנגב בקיץ מגיע ל-40 מעלות", sentenceEn: "The ___ in the Negev in summer reaches 40 degrees", blank: "חום", options: ["קור", "חום", "גשם", "רוח"], correct: "חום" },
  { id: 8, sentence: "ב___ הפרחים פורחים והכל ירוק", sentenceEn: "In ___ the flowers bloom and everything is green", blank: "אביב", options: ["סתיו", "חורף", "קיץ", "אביב"], correct: "אביב" },
  { id: 9, sentence: "הייתה ___ חזקה עם ברקים ורעמים", sentenceEn: "There was a strong ___ with lightning and thunder", blank: "סערה", options: ["שמש", "רוח", "סערה", "ענן"], correct: "סערה" },
  { id: 10, sentence: "ב___ העלים משנים צבע ונושרים", sentenceEn: "In ___ the leaves change color and fall", blank: "סתיו", options: ["אביב", "קיץ", "חורף", "סתיו"], correct: "סתיו" },
];
