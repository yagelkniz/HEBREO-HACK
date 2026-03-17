
export interface HouseholdItem {
  hebrew: string;
  transliteration: string;
  english: string;
  category: string;
}

export const householdItems: HouseholdItem[] = [
  // At Home (בבית)
  { hebrew: "שולחן", transliteration: "shulchan", english: "table", category: "home" },
  { hebrew: "כיסא", transliteration: "kise", english: "chair", category: "home" },
  { hebrew: "מיטה", transliteration: "mitah", english: "bed", category: "home" },
  { hebrew: "ספה", transliteration: "sapah", english: "sofa", category: "home" },
  { hebrew: "חלון", transliteration: "chalon", english: "window", category: "home" },
  { hebrew: "דלת", transliteration: "delet", english: "door", category: "home" },
  { hebrew: "מנורה", transliteration: "menorah", english: "lamp", category: "home" },
  { hebrew: "שטיח", transliteration: "shatiach", english: "carpet", category: "home" },
  { hebrew: "מקרר", transliteration: "makrer", english: "refrigerator", category: "home" },
  { hebrew: "תנור", transliteration: "tanur", english: "oven", category: "home" },
  { hebrew: "מראה", transliteration: "marah", english: "mirror", category: "home" },
  { hebrew: "מדף", transliteration: "madaf", english: "shelf", category: "home" },

  // In the Kitchen (במטבח)
  { hebrew: "צלחת", transliteration: "tzalachat", english: "plate", category: "kitchen" },
  { hebrew: "כוס", transliteration: "kos", english: "cup", category: "kitchen" },
  { hebrew: "מזלג", transliteration: "mazleg", english: "fork", category: "kitchen" },
  { hebrew: "סכין", transliteration: "sakin", english: "knife", category: "kitchen" },
  { hebrew: "כף", transliteration: "kaf", english: "spoon", category: "kitchen" },
  { hebrew: "סיר", transliteration: "sir", english: "pot", category: "kitchen" },
  { hebrew: "מחבת", transliteration: "machvat", english: "pan", category: "kitchen" },
  { hebrew: "תנור אפייה", transliteration: "tanur afiyah", english: "baking oven", category: "kitchen" },
  { hebrew: "מקפיא", transliteration: "makpia", english: "freezer", category: "kitchen" },
  { hebrew: "מיקרוגל", transliteration: "mikrogol", english: "microwave", category: "kitchen" },

  // Office & Tools (כלים)
  { hebrew: "עט", transliteration: "et", english: "pen", category: "office" },
  { hebrew: "עיפרון", transliteration: "iparon", english: "pencil", category: "office" },
  { hebrew: "מחברת", transliteration: "machberet", english: "notebook", category: "office" },
  { hebrew: "ספר", transliteration: "sefer", english: "book", category: "office" },
  { hebrew: "מחשב", transliteration: "machshev", english: "computer", category: "office" },
  { hebrew: "מקלדת", transliteration: "mikledet", english: "keyboard", category: "office" },
  { hebrew: "עכבר מחשב", transliteration: "achbar machshev", english: "computer mouse", category: "office" },
  { hebrew: "מדפסת", transliteration: "madpeset", english: "printer", category: "office" },
  { hebrew: "תיק", transliteration: "tik", english: "bag", category: "office" },
  { hebrew: "טלפון", transliteration: "telefon", english: "phone", category: "office" },

  // Leisure & Hobbies (פנאי)
  { hebrew: "כדור", transliteration: "kadur", english: "ball", category: "leisure" },
  { hebrew: "גיטרה", transliteration: "gitarah", english: "guitar", category: "leisure" },
  { hebrew: "משחק", transliteration: "mischak", english: "game", category: "leisure" },
  { hebrew: "פאזל", transliteration: "pazel", english: "puzzle", category: "leisure" },
  { hebrew: "מצלמה", transliteration: "matzlemah", english: "camera", category: "leisure" },
  { hebrew: "טלוויזיה", transliteration: "televizyah", english: "television", category: "leisure" },
  { hebrew: "אוזניות", transliteration: "ozniyot", english: "headphones", category: "leisure" },
  { hebrew: "רמקול", transliteration: "ramkol", english: "speaker", category: "leisure" },

  // School Items (בית ספר)
  { hebrew: "ילקוט", transliteration: "yalkut", english: "backpack", category: "school" },
  { hebrew: "לוח", transliteration: "luach", english: "board", category: "school" },
  { hebrew: "גיר", transliteration: "gir", english: "chalk", category: "school" },
  { hebrew: "סרגל", transliteration: "sargel", english: "ruler", category: "school" },
  { hebrew: "מחק", transliteration: "machak", english: "eraser", category: "school" },
  { hebrew: "טוש", transliteration: "tush", english: "marker", category: "school" }
];

export interface ExerciseQuestion {
  id: string;
  type: "multiple-choice" | "fill-blank" | "match" | "translation" | "sentence-completion" | "category-sort" | "true-false";
  question: string;
  questionEn?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  category?: string;
  hebrew?: string;
  transliteration?: string;
  english?: string;
}

// Beginner Level Questions (20+)
export const beginnerQuestions: ExerciseQuestion[] = [
  {
    id: "beg1",
    type: "multiple-choice",
    question: "מה זה?",
    questionEn: "What is this?",
    options: ["שולחן", "כיסא", "מיטה"],
    correctAnswer: "שולחן",
    explanation: "שולחן (shulchan) = table",
    hebrew: "שולחן",
    transliteration: "shulchan",
    english: "table"
  },
  {
    id: "beg2",
    type: "fill-blank",
    question: "זו _____",
    questionEn: "This is a _____",
    options: ["מנורה", "ספה", "מדף"],
    correctAnswer: "מנורה",
    explanation: "מנורה (menorah) = lamp"
  },
  {
    id: "beg3",
    type: "translation",
    question: "chair",
    questionEn: "Translate to Hebrew:",
    options: ["כיסא", "שולחן", "מיטה"],
    correctAnswer: "כיסא",
    explanation: "chair = כיסא (kise)"
  },
  {
    id: "beg4",
    type: "multiple-choice",
    question: "איך אומרים 'bed' בעברית?",
    questionEn: "How do you say 'bed' in Hebrew?",
    options: ["מיטה", "ספה", "כיסא"],
    correctAnswer: "מיטה",
    explanation: "bed = מיטה (mitah)"
  },
  {
    id: "beg5",
    type: "fill-blank",
    question: "זה _____",
    questionEn: "This is a _____",
    options: ["חלון", "דלת", "מראה"],
    correctAnswer: "חלון",
    explanation: "חלון (chalon) = window"
  },
  {
    id: "beg6",
    type: "multiple-choice",
    question: "מה זה 'door' בעברית?",
    questionEn: "What is 'door' in Hebrew?",
    options: ["דלת", "חלון", "קיר"],
    correctAnswer: "דלת",
    explanation: "door = דלת (delet)"
  },
  {
    id: "beg7",
    type: "translation",
    question: "carpet",
    questionEn: "Translate to Hebrew:",
    options: ["שטיח", "מדף", "מראה"],
    correctAnswer: "שטיח",
    explanation: "carpet = שטיח (shatiach)"
  },
  {
    id: "beg8",
    type: "fill-blank",
    question: "זה _____ קר",
    questionEn: "This _____ is cold",
    options: ["מקרר", "תנור", "מיקרוגל"],
    correctAnswer: "מקרר",
    explanation: "מקרר (makrer) = refrigerator"
  },
  {
    id: "beg9",
    type: "multiple-choice",
    question: "איפה אתה רואה את עצמך?",
    questionEn: "Where do you see yourself?",
    options: ["במראה", "בחלון", "בטלוויזיה"],
    correctAnswer: "במראה",
    explanation: "במראה (ba-marah) = in the mirror"
  },
  {
    id: "beg10",
    type: "translation",
    question: "shelf",
    questionEn: "Translate to Hebrew:",
    options: ["מדף", "שולחן", "ארון"],
    correctAnswer: "מדף",
    explanation: "shelf = מדף (madaf)"
  },
  {
    id: "beg11",
    type: "multiple-choice",
    question: "במה אוכלים?",
    questionEn: "What do you eat from?",
    options: ["צלחת", "כוס", "מזלג"],
    correctAnswer: "צלחת",
    explanation: "צלחת (tzalach) = plate"
  },
  {
    id: "beg12",
    type: "fill-blank",
    question: "אני שותה מ_____",
    questionEn: "I drink from a _____",
    options: ["כוס", "צלחת", "כף"],
    correctAnswer: "כוס",
    explanation: "כוס (kos) = cup"
  },
  {
    id: "beg13",
    type: "translation",
    question: "fork",
    questionEn: "Translate to Hebrew:",
    options: ["מזלג", "סכין", "כף"],
    correctAnswer: "מזלג",
    explanation: "fork = מזלג (mazleg)"
  },
  {
    id: "beg14",
    type: "multiple-choice",
    question: "במה חותכים?",
    questionEn: "What do you cut with?",
    options: ["סכין", "מזלג", "כף"],
    correctAnswer: "סכין",
    explanation: "סכין (sakin) = knife"
  },
  {
    id: "beg15",
    type: "fill-blank",
    question: "אני אוכל עם _____",
    questionEn: "I eat with a _____",
    options: ["כף", "צלחת", "כוס"],
    correctAnswer: "כף",
    explanation: "כף (kaf) = spoon"
  },
  {
    id: "beg16",
    type: "translation",
    question: "pot",
    questionEn: "Translate to Hebrew:",
    options: ["סיר", "מחבת", "קערה"],
    correctAnswer: "סיר",
    explanation: "pot = סיר (sir)"
  },
  {
    id: "beg17",
    type: "multiple-choice",
    question: "איך אומרים 'pan' בעברית?",
    questionEn: "How do you say 'pan' in Hebrew?",
    options: ["מחבת", "סיר", "צלחת"],
    correctAnswer: "מחבת",
    explanation: "pan = מחבת (machvat)"
  },
  {
    id: "beg18",
    type: "fill-blank",
    question: "אני כותב עם _____",
    questionEn: "I write with a _____",
    options: ["עט", "ספר", "מחברת"],
    correctAnswer: "עט",
    explanation: "עט (et) = pen"
  },
  {
    id: "beg19",
    type: "translation",
    question: "book",
    questionEn: "Translate to Hebrew:",
    options: ["ספר", "מחברת", "עיתון"],
    correctAnswer: "ספר",
    explanation: "book = ספר (sefer)"
  },
  {
    id: "beg20",
    type: "multiple-choice",
    question: "במה מתקשרים?",
    questionEn: "What do you use to call?",
    options: ["טלפון", "מחשב", "טלוויזיה"],
    correctAnswer: "טלפון",
    explanation: "טלפון (telefon) = phone"
  }
];

// Intermediate Level Questions (20+)
export const intermediateQuestions: ExerciseQuestion[] = [
  {
    id: "int1",
    type: "sentence-completion",
    question: "השולחן נמצא ליד ה_____",
    questionEn: "The table is next to the _____",
    options: ["כיסא", "תקרה", "רצפה"],
    correctAnswer: "כיסא",
    explanation: "Tables are commonly placed next to chairs"
  },
  {
    id: "int2",
    type: "multiple-choice",
    question: "אני מנקה את ה_____",
    questionEn: "I am cleaning the _____",
    options: ["שטיח", "גיטרה", "נעל"],
    correctAnswer: "שטיח",
    explanation: "Carpets need regular cleaning"
  },
  {
    id: "int3",
    type: "sentence-completion",
    question: "המזון נמצא ב_____",
    questionEn: "The food is in the _____",
    options: ["מקרר", "מדף", "מיטה"],
    correctAnswer: "מקרר",
    explanation: "Food is stored in the refrigerator"
  },
  {
    id: "int4",
    type: "multiple-choice",
    question: "אני מבשל עם ה_____",
    questionEn: "I cook with the _____",
    options: ["תנור", "מראה", "ספר"],
    correctAnswer: "תنور",
    explanation: "You cook with an oven"
  },
  {
    id: "int5",
    type: "sentence-completion",
    question: "הבגדים תלויים ב_____",
    questionEn: "The clothes are hanging in the _____",
    options: ["ארון", "כיסא", "צלחת"],
    correctAnswer: "ארון",
    explanation: "Clothes hang in a closet/wardrobe"
  },
  {
    id: "int6",
    type: "multiple-choice",
    question: "אני רואה את עצמי ב_____",
    questionEn: "I see myself in the _____",
    options: ["מראה", "חלון", "מסך"],
    correctAnswer: "מראה",
    explanation: "You see yourself in a mirror"
  },
  {
    id: "int7",
    type: "sentence-completion",
    question: "הספרים על ה_____",
    questionEn: "The books are on the _____",
    options: ["מדף", "רצפה", "תקרה"],
    correctAnswer: "מדף",
    explanation: "Books are placed on shelves"
  },
  {
    id: "int8",
    type: "multiple-choice",
    question: "אני שותה קפה מ_____",
    questionEn: "I drink coffee from a _____",
    options: ["כוס", "צלחת", "מזלג"],
    correctAnswer: "כוס",
    explanation: "You drink from a cup"
  },
  {
    id: "int9",
    type: "sentence-completion",
    question: "אני חותך עם ה_____",
    questionEn: "I cut with the _____",
    options: ["סכין", "כף", "צלחת"],
    correctAnswer: "סכין",
    explanation: "You cut with a knife"
  },
  {
    id: "int10",
    type: "multiple-choice",
    question: "אני מחמם אוכל ב_____",
    questionEn: "I heat food in the _____",
    options: ["מיקרוגל", "מקפיא", "כיור"],
    correctAnswer: "מיקרוגל",
    explanation: "You heat food in a microwave"
  },
  {
    id: "int11",
    type: "sentence-completion",
    question: "אני כותב ב_____ עם עט",
    questionEn: "I write in a _____ with a pen",
    options: ["מחברת", "ספר", "עיתון"],
    correctAnswer: "מחברת",
    explanation: "You write in a notebook"
  },
  {
    id: "int12",
    type: "multiple-choice",
    question: "אני עובד על ה_____",
    questionEn: "I work on the _____",
    options: ["מחשב", "טלפון", "מצלמה"],
    correctAnswer: "מחשב",
    explanation: "You work on a computer"
  },
  {
    id: "int13",
    type: "sentence-completion",
    question: "אני מקליד על ה_____",
    questionEn: "I type on the _____",
    options: ["מקלדת", "מסך", "עכבר"],
    correctAnswer: "מקלדת",
    explanation: "You type on a keyboard"
  },
  {
    id: "int14",
    type: "multiple-choice",
    question: "אני משחק ב_____",
    questionEn: "I play _____",
    options: ["גיטרה", "ספר", "צלחת"],
    correctAnswer: "גיטרה",
    explanation: "You play guitar"
  },
  {
    id: "int15",
    type: "sentence-completion",
    question: "אני צופה ב_____",
    questionEn: "I watch _____",
    options: ["טלוויזיה", "רמקול", "מצלמה"],
    correctAnswer: "טלוויזיה",
    explanation: "You watch television"
  },
  {
    id: "int16",
    type: "multiple-choice",
    question: "אני שומע מוזיקה ב_____",
    questionEn: "I listen to music with _____",
    options: ["אוזניות", "מצלמה", "מדפסת"],
    correctAnswer: "אוזניות",
    explanation: "You listen with headphones"
  },
  {
    id: "int17",
    type: "sentence-completion",
    question: "הילקוט שלי מלא ב_____",
    questionEn: "My backpack is full of _____",
    options: ["ספרים", "צלחות", "מזלגות"],
    correctAnswer: "ספרים",
    explanation: "Backpacks are filled with books"
  },
  {
    id: "int18",
    type: "multiple-choice",
    question: "המורה כותב על ה_____",
    questionEn: "The teacher writes on the _____",
    options: ["לוח", "ספר", "כיסא"],
    correctAnswer: "לוח",
    explanation: "Teachers write on the board"
  },
  {
    id: "int19",
    type: "sentence-completion",
    question: "אני מוחק עם ה_____",
    questionEn: "I erase with the _____",
    options: ["מחק", "עט", "סרגל"],
    correctAnswer: "מחק",
    explanation: "You erase with an eraser"
  },
  {
    id: "int20",
    type: "multiple-choice",
    question: "אני צולם עם ה_____",
    questionEn: "I take photos with the _____",
    options: ["מצלמה", "טלפון", "מחשב"],
    correctAnswer: "מצלמה",
    explanation: "You take photos with a camera"
  }
];

// Advanced Level Questions (20+)
export const advancedQuestions: ExerciseQuestion[] = [
  {
    id: "adv1",
    type: "sentence-completion",
    question: "איפה המחשב? המחשב על ה_____",
    questionEn: "Where is the computer? The computer is on the _____",
    options: ["שולחן", "רצפה", "קיר"],
    correctAnswer: "שולחן",
    explanation: "Computers are typically placed on desks/tables"
  },
  {
    id: "adv2",
    type: "true-false",
    question: "הטלוויזיה גדולה מהמחשב",
    questionEn: "The TV is bigger than the computer",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון",
    explanation: "TVs are generally larger than computers"
  },
  {
    id: "adv3",
    type: "sentence-completion",
    question: "איפה הכוס? הכוס ליד ה_____",
    questionEn: "Where is the cup? The cup is next to the _____",
    options: ["צלחת", "מיטה", "מראה"],
    correctAnswer: "צלחת",
    explanation: "Cups and plates are commonly used together"
  },
  {
    id: "adv4",
    type: "category-sort",
    question: "איזה פריט שייך למטבח?",
    questionEn: "Which item belongs in the kitchen?",
    options: ["מיקרוגל", "מיטה", "ספר"],
    correctAnswer: "מיקרוגל",
    explanation: "Microwave belongs in the kitchen"
  },
  {
    id: "adv5",
    type: "true-false",
    question: "הסכין חדה יותר מהכף",
    questionEn: "The knife is sharper than the spoon",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון",
    explanation: "Knives are designed to be sharp for cutting"
  },
  {
    id: "adv6",
    type: "sentence-completion",
    question: "איפה הטלפון? הטלפון על ה_____",
    questionEn: "Where is the phone? The phone is on the _____",
    options: ["מדף", "רצפה", "תקרה"],
    correctAnswer: "מדף",
    explanation: "Phones are often placed on shelves or surfaces"
  },
  {
    id: "adv7",
    type: "category-sort",
    question: "איזה פריט משמש ללמידה?",
    questionEn: "Which item is used for learning?",
    options: ["מחברת", "מחבת", "מראה"],
    correctAnswer: "מחברת",
    explanation: "Notebooks are used for learning and writing"
  },
  {
    id: "adv8",
    type: "true-false",
    question: "המקרר קר יותר מהתנור",
    questionEn: "The refrigerator is colder than the oven",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון",
    explanation: "Refrigerators keep things cold while ovens heat things up"
  },
  {
    id: "adv9",
    type: "sentence-completion",
    question: "במה אני רואה את הסרט? אני רואה ב_____",
    questionEn: "What do I watch the movie on? I watch on the _____",
    options: ["טלוויזיה", "רמקול", "מקלדת"],
    correctAnswer: "טלוויזיה",
    explanation: "You watch movies on television"
  },
  {
    id: "adv10",
    type: "category-sort",
    question: "איזה פריט שייך לבית הספר?",
    questionEn: "Which item belongs at school?",
    options: ["ילקוט", "מקרר", "ספה"],
    correctAnswer: "ילקוט",
    explanation: "Backpacks are used at school"
  },
  {
    id: "adv11",
    type: "true-false",
    question: "הגיטרה גדולה יותר מהעיפרון",
    questionEn: "The guitar is bigger than the pencil",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון",
    explanation: "Guitars are much larger than pencils"
  },
  {
    id: "adv12",
    type: "sentence-completion",
    question: "איפה אני שם את הבגדים? אני שם ב_____",
    questionEn: "Where do I put the clothes? I put them in the _____",
    options: ["ארון", "סיר", "מדפסת"],
    correctAnswer: "ארון",
    explanation: "Clothes go in the closet/wardrobe"
  },
  {
    id: "adv13",
    type: "category-sort",
    question: "איזה פריט משמש לכתיבה?",
    questionEn: "Which item is used for writing?",
    options: ["עט", "כדור", "אוזניות"],
    correctAnswer: "עט",
    explanation: "Pens are used for writing"
  },
  {
    id: "adv14",
    type: "true-false",
    question: "המחק יכול למחוק את מה שכתוב בעיפרון",
    questionEn: "The eraser can erase what's written in pencil",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון",
    explanation: "Erasers are designed to erase pencil marks"
  },
  {
    id: "adv15",
    type: "sentence-completion",
    question: "איך אני שומע מוזיקה? אני שומע דרך ה_____",
    questionEn: "How do I listen to music? I listen through the _____",
    options: ["אוזניות", "מצלמה", "לוח"],
    correctAnswer: "אוזניות",
    explanation: "You listen to music through headphones"
  },
  {
    id: "adv16",
    type: "category-sort",
    question: "איזה פריט נמצא בסלון?",
    questionEn: "Which item is found in the living room?",
    options: ["ספה", "מזלג", "גיר"],
    correctAnswer: "ספה",
    explanation: "Sofas are living room furniture"
  },
  {
    id: "adv17",
    type: "true-false",
    question: "השולחן חזק יותר מהנייר",
    questionEn: "The table is stronger than paper",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון",
    explanation: "Tables are made of solid materials, much stronger than paper"
  },
  {
    id: "adv18",
    type: "sentence-completion",
    question: "איפה אני מכין אוכל? אני מכין ב_____",
    questionEn: "Where do I prepare food? I prepare in the _____",
    options: ["מטבח", "חדר שינה", "חדר אמבטיה"],
    correctAnswer: "מטבח",
    explanation: "Food is prepared in the kitchen"
  },
  {
    id: "adv19",
    type: "category-sort",
    question: "איזה פריט משמש להדפסה?",
    questionEn: "Which item is used for printing?",
    options: ["מדפסת", "פאזל", "רמקול"],
    correctAnswer: "מדפסת",
    explanation: "Printers are used for printing documents"
  },
  {
    id: "adv20",
    type: "true-false",
    question: "הכיסא משמש לישיבה",
    questionEn: "The chair is used for sitting",
    options: ["נכון", "לא נכון"],
    correctAnswer: "נכון",
    explanation: "Chairs are designed for sitting"
  }
];

export const categoryNames = {
  home: { hebrew: "בבית", english: "At Home" },
  kitchen: { hebrew: "במטבח", english: "In the Kitchen" },
  office: { hebrew: "כלים", english: "Office & Tools" },
  leisure: { hebrew: "פנאי", english: "Leisure & Hobbies" },
  school: { hebrew: "בית ספר", english: "School Items" }
};
