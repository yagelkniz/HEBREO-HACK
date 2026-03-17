export interface FamilyMember {
  hebrew: string;
  english: string;
  gender: "male" | "female" | "neutral";
}

export const familyMembers: FamilyMember[] = [
  { hebrew: "אבא", english: "Father/Dad", gender: "male" },
  { hebrew: "אמא", english: "Mother/Mom", gender: "female" },
  { hebrew: "אח", english: "Brother", gender: "male" },
  { hebrew: "אחות", english: "Sister", gender: "female" },
  { hebrew: "סבא", english: "Grandfather", gender: "male" },
  { hebrew: "סבתא", english: "Grandmother", gender: "female" },
  { hebrew: "דוד", english: "Uncle", gender: "male" },
  { hebrew: "דודה", english: "Aunt", gender: "female" },
  { hebrew: "בן דוד", english: "Cousin (male)", gender: "male" },
  { hebrew: "בת דוד", english: "Cousin (female)", gender: "female" },
  { hebrew: "בן", english: "Son", gender: "male" },
  { hebrew: "בת", english: "Daughter", gender: "female" },
  { hebrew: "בעל", english: "Husband", gender: "male" },
  { hebrew: "אישה", english: "Wife", gender: "female" },
  { hebrew: "נכד", english: "Grandson", gender: "male" },
  { hebrew: "נכדה", english: "Granddaughter", gender: "female" },
  { hebrew: "חם", english: "Father-in-law", gender: "male" },
  { hebrew: "חמות", english: "Mother-in-law", gender: "female" },
];

export interface FamilyQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: string;
}

export const familyQuestions: FamilyQuestion[] = [
  { question: "מי אבא של אבא?", questionEn: "Who is father's father?", options: ["סבא", "דוד", "אח", "בן"], answer: "סבא" },
  { question: "מי אחות של אמא?", questionEn: "Who is mother's sister?", options: ["דודה", "סבתא", "אחות", "בת"], answer: "דודה" },
  { question: "מי הבן של הדוד שלי?", questionEn: "Who is my uncle's son?", options: ["בן דוד", "אח", "נכד", "בעל"], answer: "בן דוד" },
  { question: "איך אומרים 'grandmother' בעברית?", questionEn: "How do you say 'grandmother' in Hebrew?", options: ["סבתא", "דודה", "חמות", "אמא"], answer: "סבתא" },
  { question: "מי ההיפך של 'בן'?", questionEn: "What is the opposite of 'son'?", options: ["בת", "אח", "אחות", "נכדה"], answer: "בת" },
  { question: "איך אומרים 'husband' בעברית?", questionEn: "How do you say 'husband' in Hebrew?", options: ["בעל", "אח", "אבא", "דוד"], answer: "בעל" },
  { question: "מי ההיפך של 'סבא'?", questionEn: "What is the opposite of 'grandfather'?", options: ["סבתא", "אמא", "דודה", "חמות"], answer: "סבתא" },
  { question: "איך אומרים 'brother' בעברית?", questionEn: "How do you say 'brother' in Hebrew?", options: ["אח", "בן", "דוד", "בעל"], answer: "אח" },
  { question: "מי אמא של אמא?", questionEn: "Who is mother's mother?", options: ["סבתא", "דודה", "חמות", "אחות"], answer: "סבתא" },
  { question: "מי ההיפך של 'דוד'?", questionEn: "What is the opposite of 'uncle'?", options: ["דודה", "סבתא", "אחות", "אמא"], answer: "דודה" },
  { question: "איך אומרים 'wife' בעברית?", questionEn: "How do you say 'wife' in Hebrew?", options: ["אישה", "בת", "אחות", "אמא"], answer: "אישה" },
  { question: "מי הילד של הבן שלי?", questionEn: "Who is my son's child?", options: ["נכד", "בן דוד", "אח", "דוד"], answer: "נכד" },
];
