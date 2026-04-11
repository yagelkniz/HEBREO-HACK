export interface VocabWord {
  hebrew: string;
  hebrewNikud: string;
  english: string;
  transliteration: string;
  gender: "m" | "f";
  exampleHe: string;
  exampleEn: string;
}

export const professionsWords: VocabWord[] = [
  { hebrew: "רופא", hebrewNikud: "רוֹפֵא", english: "Doctor (m)", transliteration: "Rofé", gender: "m", exampleHe: "הרופא בודק את החולה", exampleEn: "The doctor examines the patient" },
  { hebrew: "רופאה", hebrewNikud: "רוֹפְאָה", english: "Doctor (f)", transliteration: "Rofá", gender: "f", exampleHe: "הרופאה כותבת מרשם", exampleEn: "The doctor writes a prescription" },
  { hebrew: "מורה", hebrewNikud: "מוֹרֶה", english: "Teacher (m)", transliteration: "Moré", gender: "m", exampleHe: "המורה מלמד מתמטיקה", exampleEn: "The teacher teaches math" },
  { hebrew: "מורה", hebrewNikud: "מוֹרָה", english: "Teacher (f)", transliteration: "Morá", gender: "f", exampleHe: "המורה מלמדת אנגלית", exampleEn: "The teacher teaches English" },
  { hebrew: "עורך דין", hebrewNikud: "עוֹרֵךְ דִּין", english: "Lawyer (m)", transliteration: "Orékh din", gender: "m", exampleHe: "עורך הדין מייצג את הלקוח", exampleEn: "The lawyer represents the client" },
  { hebrew: "שוטר", hebrewNikud: "שׁוֹטֵר", english: "Police officer (m)", transliteration: "Shotér", gender: "m", exampleHe: "השוטר שומר על הסדר", exampleEn: "The police officer keeps order" },
  { hebrew: "מהנדס", hebrewNikud: "מְהַנְדֵּס", english: "Engineer (m)", transliteration: "Mehandés", gender: "m", exampleHe: "המהנדס מתכנן את הבניין", exampleEn: "The engineer plans the building" },
  { hebrew: "אחות", hebrewNikud: "אָחוֹת", english: "Nurse (f)", transliteration: "Akhót", gender: "f", exampleHe: "האחות נותנת זריקה", exampleEn: "The nurse gives an injection" },
  { hebrew: "טבח", hebrewNikud: "טַבָּח", english: "Chef (m)", transliteration: "Tabákh", gender: "m", exampleHe: "הטבח מכין ארוחה טעימה", exampleEn: "The chef prepares a delicious meal" },
  { hebrew: "נהג", hebrewNikud: "נַהָג", english: "Driver (m)", transliteration: "Nahág", gender: "m", exampleHe: "הנהג נוסע לתל אביב", exampleEn: "The driver goes to Tel Aviv" },
  { hebrew: "מוכר", hebrewNikud: "מוֹכֵר", english: "Salesperson (m)", transliteration: "Mokhér", gender: "m", exampleHe: "המוכר עוזר ללקוחות", exampleEn: "The salesperson helps customers" },
  { hebrew: "רואה חשבון", hebrewNikud: "רוֹאֶה חֶשְׁבּוֹן", english: "Accountant", transliteration: "Roé kheshbón", gender: "m", exampleHe: "רואה החשבון בודק את המאזן", exampleEn: "The accountant checks the balance" },
];

export interface FillBlankQuestion {
  id: number;
  sentence: string;
  sentenceEn: string;
  blank: string;
  options: string[];
  correct: string;
}

export const professionsQuestions: FillBlankQuestion[] = [
  { id: 1, sentence: "ה___ בודק את החולה בבית החולים", sentenceEn: "The ___ examines the patient in the hospital", blank: "רופא", options: ["רופא", "מורה", "שוטר", "נהג"], correct: "רופא" },
  { id: 2, sentence: "ה___ מלמדת את התלמידים בכיתה", sentenceEn: "The ___ teaches students in class", blank: "מורה", options: ["אחות", "מורה", "טבח", "מוכר"], correct: "מורה" },
  { id: 3, sentence: "___ הדין מייצג את הנאשם בבית המשפט", sentenceEn: "The ___ represents the defendant in court", blank: "עורך", options: ["עורך", "רואה", "מוכר", "נהג"], correct: "עורך" },
  { id: 4, sentence: "ה___ שומר על הסדר ברחוב", sentenceEn: "The ___ keeps order on the street", blank: "שוטר", options: ["טבח", "שוטר", "מהנדס", "מורה"], correct: "שוטר" },
  { id: 5, sentence: "ה___ מתכנן את הגשר החדש", sentenceEn: "The ___ plans the new bridge", blank: "מהנדס", options: ["נהג", "רופא", "מהנדס", "מוכר"], correct: "מהנדס" },
  { id: 6, sentence: "ה___ נותנת זריקה לילד", sentenceEn: "The ___ gives the child an injection", blank: "אחות", options: ["מורה", "אחות", "רופאה", "טבח"], correct: "אחות" },
  { id: 7, sentence: "ה___ מכין סושי במסעדה", sentenceEn: "The ___ prepares sushi at the restaurant", blank: "טבח", options: ["טבח", "נהג", "שוטר", "מוכר"], correct: "טבח" },
  { id: 8, sentence: "ה___ נוסע באוטובוס כל יום", sentenceEn: "The ___ drives the bus every day", blank: "נהג", options: ["מהנדס", "רופא", "נהג", "מורה"], correct: "נהג" },
  { id: 9, sentence: "ה___ מוכר ירקות בשוק", sentenceEn: "The ___ sells vegetables at the market", blank: "מוכר", options: ["מוכר", "טבח", "אחות", "שוטר"], correct: "מוכר" },
  { id: 10, sentence: "___ החשבון בודק את המסמכים", sentenceEn: "The ___ checks the documents", blank: "רואה", options: ["עורך", "רואה", "מורה", "נהג"], correct: "רואה" },
];
