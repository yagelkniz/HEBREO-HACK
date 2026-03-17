export interface AdjectiveItem {
  hebrew: string;
  hebrewFemale: string;
  english: string;
  example: string;
  exampleEn: string;
}

export const adjectives: AdjectiveItem[] = [
  { hebrew: "גדול", hebrewFemale: "גדולה", english: "Big", example: "הבית גדול", exampleEn: "The house is big" },
  { hebrew: "קטן", hebrewFemale: "קטנה", english: "Small", example: "החתול קטן", exampleEn: "The cat is small" },
  { hebrew: "יפה", hebrewFemale: "יפה", english: "Beautiful", example: "הפרח יפה", exampleEn: "The flower is beautiful" },
  { hebrew: "חדש", hebrewFemale: "חדשה", english: "New", example: "הטלפון חדש", exampleEn: "The phone is new" },
  { hebrew: "ישן", hebrewFemale: "ישנה", english: "Old", example: "הספר ישן", exampleEn: "The book is old" },
  { hebrew: "טוב", hebrewFemale: "טובה", english: "Good", example: "האוכל טוב", exampleEn: "The food is good" },
  { hebrew: "רע", hebrewFemale: "רעה", english: "Bad", example: "מזג האוויר רע", exampleEn: "The weather is bad" },
  { hebrew: "חם", hebrewFemale: "חמה", english: "Hot", example: "היום חם", exampleEn: "The day is hot" },
  { hebrew: "קר", hebrewFemale: "קרה", english: "Cold", example: "החורף קר", exampleEn: "The winter is cold" },
  { hebrew: "מהיר", hebrewFemale: "מהירה", english: "Fast", example: "הרכבת מהירה", exampleEn: "The train is fast" },
  { hebrew: "איטי", hebrewFemale: "איטית", english: "Slow", example: "הצב איטי", exampleEn: "The turtle is slow" },
  { hebrew: "חזק", hebrewFemale: "חזקה", english: "Strong", example: "הגבר חזק", exampleEn: "The man is strong" },
  { hebrew: "חלש", hebrewFemale: "חלשה", english: "Weak", example: "הקפה חלש", exampleEn: "The coffee is weak" },
  { hebrew: "גבוה", hebrewFemale: "גבוהה", english: "Tall/High", example: "הבניין גבוה", exampleEn: "The building is tall" },
  { hebrew: "נמוך", hebrewFemale: "נמוכה", english: "Short/Low", example: "השולחן נמוך", exampleEn: "The table is low" },
  { hebrew: "רחב", hebrewFemale: "רחבה", english: "Wide", example: "הכביש רחב", exampleEn: "The road is wide" },
  { hebrew: "צר", hebrewFemale: "צרה", english: "Narrow", example: "הסימטה צרה", exampleEn: "The alley is narrow" },
  { hebrew: "עמוק", hebrewFemale: "עמוקה", english: "Deep", example: "הבור עמוק", exampleEn: "The pit is deep" },
];

export interface AdjectiveQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const adjectiveQuestions: AdjectiveQuestion[] = [
  { question: "מה ההיפך של 'גדול'?", questionEn: "What is the opposite of 'big'?", options: ["קטן", "גבוה", "רחב", "חזק"], answer: "קטן" },
  { question: "מה ההיפך של 'חם'?", questionEn: "What is the opposite of 'hot'?", options: ["קר", "רע", "חדש", "ישן"], answer: "קר" },
  { question: "מה ההיפך של 'מהיר'?", questionEn: "What is the opposite of 'fast'?", options: ["איטי", "חלש", "נמוך", "צר"], answer: "איטי" },
  { question: "מה ההיפך של 'חזק'?", questionEn: "What is the opposite of 'strong'?", options: ["חלש", "קטן", "איטי", "נמוך"], answer: "חלש" },
  { question: "מה ההיפך של 'גבוה'?", questionEn: "What is the opposite of 'tall'?", options: ["נמוך", "צר", "קטן", "איטי"], answer: "נמוך" },
  { question: "מה ההיפך של 'חדש'?", questionEn: "What is the opposite of 'new'?", options: ["ישן", "רע", "קר", "חלש"], answer: "ישן" },
  { question: "מה ההיפך של 'טוב'?", questionEn: "What is the opposite of 'good'?", options: ["רע", "ישן", "קר", "צר"], answer: "רע" },
  { question: "מה ההיפך של 'רחב'?", questionEn: "What is the opposite of 'wide'?", options: ["צר", "נמוך", "קטן", "איטי"], answer: "צר" },
  { question: "מה הנקבה של 'גדול'?", questionEn: "What is the feminine of 'gadol'?", options: ["גדולה", "קטנה", "חדשה", "יפה"], answer: "גדולה" },
  { question: "מה הנקבה של 'חם'?", questionEn: "What is the feminine of 'cham'?", options: ["חמה", "קרה", "חדשה", "ישנה"], answer: "חמה" },
  { question: "מה הנקבה של 'מהיר'?", questionEn: "What is the feminine of 'mahir'?", options: ["מהירה", "איטית", "חזקה", "חלשה"], answer: "מהירה" },
  { question: "מה הנקבה של 'חזק'?", questionEn: "What is the feminine of 'chazak'?", options: ["חזקה", "חלשה", "גדולה", "קטנה"], answer: "חזקה" },
  { question: "השלם: הילדה _____ (גבוה)", questionEn: "Complete: The girl is _____ (tall)", options: ["גבוהה", "גבוה", "גבוהים", "גבוהות"], answer: "גבוהה" },
  { question: "השלם: הכלב _____ (קטן)", questionEn: "Complete: The dog is _____ (small)", options: ["קטן", "קטנה", "קטנים", "קטנות"], answer: "קטן" },
  { question: "השלם: הדירה _____ (חדש)", questionEn: "Complete: The apartment is _____ (new)", options: ["חדשה", "חדש", "חדשים", "חדשות"], answer: "חדשה" },
];
