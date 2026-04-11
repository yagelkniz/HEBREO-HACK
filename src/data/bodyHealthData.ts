export interface VocabWord {
  hebrew: string;
  hebrewNikud: string;
  english: string;
  transliteration: string;
  gender: "m" | "f";
  exampleHe: string;
  exampleEn: string;
}

export const bodyHealthWords: VocabWord[] = [
  { hebrew: "ראש", hebrewNikud: "רֹאשׁ", english: "Head", transliteration: "Rosh", gender: "m", exampleHe: "כואב לי הראש", exampleEn: "I have a headache" },
  { hebrew: "עין", hebrewNikud: "עַיִן", english: "Eye", transliteration: "Áyin", gender: "f", exampleHe: "יש לי עיניים חומות", exampleEn: "I have brown eyes" },
  { hebrew: "אוזן", hebrewNikud: "אוֹזֶן", english: "Ear", transliteration: "Ózen", gender: "f", exampleHe: "כואבת לי האוזן", exampleEn: "My ear hurts" },
  { hebrew: "אף", hebrewNikud: "אַף", english: "Nose", transliteration: "Af", gender: "m", exampleHe: "יש לי נזלת באף", exampleEn: "I have a runny nose" },
  { hebrew: "פה", hebrewNikud: "פֶּה", english: "Mouth", transliteration: "Pe", gender: "m", exampleHe: "פתח את הפה בבקשה", exampleEn: "Open your mouth please" },
  { hebrew: "יד", hebrewNikud: "יָד", english: "Hand", transliteration: "Yad", gender: "f", exampleHe: "תן לי יד בבקשה", exampleEn: "Give me a hand please" },
  { hebrew: "רגל", hebrewNikud: "רֶגֶל", english: "Leg/Foot", transliteration: "Régel", gender: "f", exampleHe: "כואבת לי הרגל", exampleEn: "My leg hurts" },
  { hebrew: "בטן", hebrewNikud: "בֶּטֶן", english: "Stomach", transliteration: "Béten", gender: "f", exampleHe: "כואבת לי הבטן", exampleEn: "My stomach hurts" },
  { hebrew: "גב", hebrewNikud: "גַּב", english: "Back", transliteration: "Gav", gender: "m", exampleHe: "כואב לי הגב", exampleEn: "My back hurts" },
  { hebrew: "לב", hebrewNikud: "לֵב", english: "Heart", transliteration: "Lev", gender: "m", exampleHe: "הלב שלי דופק מהר", exampleEn: "My heart is beating fast" },
  { hebrew: "שן", hebrewNikud: "שֵׁן", english: "Tooth", transliteration: "Shen", gender: "f", exampleHe: "כואבת לי השן", exampleEn: "My tooth hurts" },
  { hebrew: "חום", hebrewNikud: "חוֹם", english: "Fever", transliteration: "Khom", gender: "m", exampleHe: "יש לי חום גבוה", exampleEn: "I have a high fever" },
];

export interface FillBlankQuestion {
  id: number;
  sentence: string;
  sentenceEn: string;
  blank: string;
  options: string[];
  correct: string;
}

export const bodyHealthQuestions: FillBlankQuestion[] = [
  { id: 1, sentence: "כואב לי ה___, אני צריך אספירין", sentenceEn: "My ___ hurts, I need aspirin", blank: "ראש", options: ["ראש", "גב", "רגל", "בטן"], correct: "ראש" },
  { id: 2, sentence: "הרופא אומר: פתח את ה___ בבקשה", sentenceEn: "The doctor says: open your ___ please", blank: "פה", options: ["עין", "אוזן", "פה", "אף"], correct: "פה" },
  { id: 3, sentence: "יש לי ___ חומות ושיער שחור", sentenceEn: "I have brown ___ and black hair", blank: "עיניים", options: ["אוזניים", "ידיים", "עיניים", "רגליים"], correct: "עיניים" },
  { id: 4, sentence: "כואבת לי ה___ אחרי הריצה", sentenceEn: "My ___ hurts after the run", blank: "רגל", options: ["יד", "ראש", "שן", "רגל"], correct: "רגל" },
  { id: 5, sentence: "כואבת לי ה___, אני הולך לרופא שיניים", sentenceEn: "My ___ hurts, I'm going to the dentist", blank: "שן", options: ["אוזן", "שן", "עין", "בטן"], correct: "שן" },
  { id: 6, sentence: "ה___ שלי דופק מהר כי רצתי", sentenceEn: "My ___ is beating fast because I ran", blank: "לב", options: ["ראש", "גב", "לב", "בטן"], correct: "לב" },
  { id: 7, sentence: "כואב לי ה___ כי ישבתי הרבה", sentenceEn: "My ___ hurts because I sat a lot", blank: "גב", options: ["רגל", "יד", "ראש", "גב"], correct: "גב" },
  { id: 8, sentence: "כואבת לי ה___ כי אכלתי יותר מדי", sentenceEn: "My ___ hurts because I ate too much", blank: "בטן", options: ["בטן", "גב", "רגל", "שן"], correct: "בטן" },
  { id: 9, sentence: "יש לי ___ גבוה, אני חולה", sentenceEn: "I have a high ___, I'm sick", blank: "חום", options: ["אף", "חום", "ראש", "גב"], correct: "חום" },
  { id: 10, sentence: "כואבת לי ה___, אני לא שומע טוב", sentenceEn: "My ___ hurts, I can't hear well", blank: "אוזן", options: ["עין", "פה", "אוזן", "אף"], correct: "אוזן" },
];
