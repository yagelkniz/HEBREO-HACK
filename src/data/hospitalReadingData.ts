export const hospitalReadingText = `דני לא מרגיש טוב. יש לו כאב ראש וחום גבוה.
אמא שלו לוקחת אותו לבית החולים. הם מגיעים למחלקת חירום.
האחות בודקת את הטמפרטורה שלו — שלושים ותשע מעלות.
הרופא בודק את דני ואומר: "אתה צריך לנוח ולשתות הרבה מים."
הרופא נותן לו מרשם לתרופות. אמא קונה את התרופות בבית מרקחת.
דני לוקח את התרופה ואחרי יומיים הוא מרגיש הרבה יותר טוב.`;

export const hospitalReadingTranslation = `Danny doesn't feel well. He has a headache and a high fever.
His mom takes him to the hospital. They arrive at the emergency department.
The nurse checks his temperature — thirty-nine degrees.
The doctor examines Danny and says: "You need to rest and drink lots of water."
The doctor gives him a prescription for medicine. Mom buys the medicine at the pharmacy.
Danny takes the medicine and after two days he feels much better.`;

export interface HospitalQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
  highlightWord?: string;
}

export const hospitalQuestions: HospitalQuestion[] = [
  { question: "מה כואב לדני?", questionEn: "What hurts Danny?", options: ["ראש", "בטן", "רגל", "יד"], answer: "ראש" },
  { question: "לאן אמא לוקחת את דני?", questionEn: "Where does mom take Danny?", options: ["בית החולים", "בית הספר", "פארק", "חנות"], answer: "בית החולים" },
  { question: "מה הטמפרטורה של דני?", questionEn: "What is Danny's temperature?", options: ["39", "37", "40", "36"], answer: "39" },
  { question: "מי בודק את דני?", questionEn: "Who examines Danny?", options: ["הרופא", "האחות", "אמא", "אבא"], answer: "הרופא" },
  { question: "מה הרופא אומר לדני לעשות?", questionEn: "What does the doctor tell Danny to do?", options: ["לנוח ולשתות מים", "לאכול הרבה", "ללכת לבית הספר", "לרוץ בחוץ"], answer: "לנוח ולשתות מים" },
  { question: "איפה אמא קונה תרופות?", questionEn: "Where does mom buy medicine?", options: ["בית מרקחת", "סופרמרקט", "בית חולים", "חנות"], answer: "בית מרקחת" },
  { question: "אחרי כמה זמן דני מרגיש טוב?", questionEn: "After how long does Danny feel better?", options: ["יומיים", "שבוע", "שעה", "חודש"], answer: "יומיים" },
  { question: "מי בודק את הטמפרטורה?", questionEn: "Who checks the temperature?", options: ["האחות", "הרופא", "אמא", "דני"], answer: "האחות" },
];

export const hospitalVocab = [
  { hebrew: "בית חולים", english: "Hospital" },
  { hebrew: "רופא", english: "Doctor" },
  { hebrew: "אחות", english: "Nurse" },
  { hebrew: "מחלקת חירום", english: "Emergency department" },
  { hebrew: "טמפרטורה", english: "Temperature" },
  { hebrew: "חום", english: "Fever" },
  { hebrew: "כאב ראש", english: "Headache" },
  { hebrew: "מרשם", english: "Prescription" },
  { hebrew: "תרופה", english: "Medicine" },
  { hebrew: "בית מרקחת", english: "Pharmacy" },
];
