export interface VocabWord {
  hebrew: string;
  hebrewNikud: string;
  english: string;
  transliteration: string;
  gender: "m" | "f";
  exampleHe: string;
  exampleEn: string;
}

export const foodDrinksWords: VocabWord[] = [
  { hebrew: "לחם", hebrewNikud: "לֶחֶם", english: "Bread", transliteration: "Lékhem", gender: "m", exampleHe: "אני אוכל לחם בבוקר", exampleEn: "I eat bread in the morning" },
  { hebrew: "גבינה", hebrewNikud: "גְּבִינָה", english: "Cheese", transliteration: "Gviná", gender: "f", exampleHe: "הגבינה טעימה מאוד", exampleEn: "The cheese is very tasty" },
  { hebrew: "ביצה", hebrewNikud: "בֵּיצָה", english: "Egg", transliteration: "Beytsá", gender: "f", exampleHe: "אני רוצה ביצה מקושקשת", exampleEn: "I want a scrambled egg" },
  { hebrew: "אורז", hebrewNikud: "אוֹרֶז", english: "Rice", transliteration: "Órez", gender: "m", exampleHe: "אני מבשל אורז לארוחת ערב", exampleEn: "I cook rice for dinner" },
  { hebrew: "עוף", hebrewNikud: "עוֹף", english: "Chicken", transliteration: "Of", gender: "m", exampleHe: "העוף בתנור מריח נהדר", exampleEn: "The chicken in the oven smells great" },
  { hebrew: "דג", hebrewNikud: "דָּג", english: "Fish", transliteration: "Dag", gender: "m", exampleHe: "אני אוהב דג צלוי", exampleEn: "I like grilled fish" },
  { hebrew: "סלט", hebrewNikud: "סָלָט", english: "Salad", transliteration: "Salát", gender: "m", exampleHe: "הסלט הישראלי טעים", exampleEn: "The Israeli salad is delicious" },
  { hebrew: "מים", hebrewNikud: "מַיִם", english: "Water", transliteration: "Máyim", gender: "m", exampleHe: "אני שותה הרבה מים", exampleEn: "I drink a lot of water" },
  { hebrew: "קפה", hebrewNikud: "קָפֶה", english: "Coffee", transliteration: "Kafé", gender: "m", exampleHe: "אני שותה קפה כל בוקר", exampleEn: "I drink coffee every morning" },
  { hebrew: "תה", hebrewNikud: "תֵּה", english: "Tea", transliteration: "Te", gender: "m", exampleHe: "היא שותה תה עם נענע", exampleEn: "She drinks tea with mint" },
  { hebrew: "מיץ", hebrewNikud: "מִיץ", english: "Juice", transliteration: "Mits", gender: "m", exampleHe: "הילדים שותים מיץ תפוזים", exampleEn: "The children drink orange juice" },
  { hebrew: "עוגה", hebrewNikud: "עוּגָה", english: "Cake", transliteration: "Ugá", gender: "f", exampleHe: "אמא אפתה עוגת שוקולד", exampleEn: "Mom baked a chocolate cake" },
];

export interface FillBlankQuestion {
  id: number;
  sentence: string;
  sentenceEn: string;
  blank: string;
  options: string[];
  correct: string;
}

export const foodDrinksQuestions: FillBlankQuestion[] = [
  { id: 1, sentence: "אני אוכל ___ עם חמאה בבוקר", sentenceEn: "I eat ___ with butter in the morning", blank: "לחם", options: ["לחם", "אורז", "דג", "עוגה"], correct: "לחם" },
  { id: 2, sentence: "ה___ הצהובה מארץ הולנד", sentenceEn: "The yellow ___ is from Holland", blank: "גבינה", options: ["עוגה", "ביצה", "גבינה", "סלט"], correct: "גבינה" },
  { id: 3, sentence: "אני שותה ___ חם כל בוקר", sentenceEn: "I drink hot ___ every morning", blank: "קפה", options: ["מיץ", "קפה", "מים", "תה"], correct: "קפה" },
  { id: 4, sentence: "ה___ בתנור כמעט מוכן", sentenceEn: "The ___ in the oven is almost ready", blank: "עוף", options: ["סלט", "לחם", "עוף", "ביצה"], correct: "עוף" },
  { id: 5, sentence: "אנחנו מבשלים ___ לבן לארוחה", sentenceEn: "We cook white ___ for the meal", blank: "אורז", options: ["דג", "אורז", "עוף", "לחם"], correct: "אורז" },
  { id: 6, sentence: "ה___ הישראלי עם עגבניות ומלפפונים", sentenceEn: "The Israeli ___ with tomatoes and cucumbers", blank: "סלט", options: ["סלט", "לחם", "אורז", "דג"], correct: "סלט" },
  { id: 7, sentence: "הילדים שותים ___ תפוזים", sentenceEn: "The children drink orange ___", blank: "מיץ", options: ["תה", "מים", "קפה", "מיץ"], correct: "מיץ" },
  { id: 8, sentence: "צריך לשתות הרבה ___ ביום חם", sentenceEn: "You need to drink a lot of ___ on a hot day", blank: "מים", options: ["מים", "קפה", "מיץ", "תה"], correct: "מים" },
  { id: 9, sentence: "אני אוהב ___ צלוי עם לימון", sentenceEn: "I like grilled ___ with lemon", blank: "דג", options: ["עוף", "לחם", "דג", "אורז"], correct: "דג" },
  { id: 10, sentence: "אמא אפתה ___ ליום ההולדת", sentenceEn: "Mom baked a ___ for the birthday", blank: "עוגה", options: ["ביצה", "עוגה", "גבינה", "לחם"], correct: "עוגה" },
];
