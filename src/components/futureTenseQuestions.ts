
export type FutureTenseQuestion = {
  number: number;
  sentence: string;
  options: string[];
  answer: string;
  translation: string;
};

// 100 שאלות מתבנית חוזרת כל 10 שאלות (ע"פ הנתונים מהודעתך)
const baseQuestions = [
  {
    sentence: "אני ___ פיצה לארוחת ערב.",
    options: ["אוכל", "אכלתי", "אוכל"],
    answer: "אוכל",
    translation: "I will ___ pizza for dinner. (eat)"
  },
  {
    sentence: "אתה ___ מים אחרי האימון.",
    options: ["תשתה", "שתית", "שותה"],
    answer: "תשתה",
    translation: "You will ___ water after the workout. (drink)"
  },
  {
    sentence: "היא ___ לבית הספר מחר.",
    options: ["תלך", "הולכת", "הלכה"],
    answer: "תלך",
    translation: "She will ___ to school tomorrow. (go)"
  },
  {
    sentence: "אנחנו ___ יחד לקולנוע.",
    options: ["נלך", "הלכנו", "הולכים"],
    answer: "נלך",
    translation: "We will ___ to the cinema together. (go)"
  },
  {
    sentence: "הם ___ סרט בערב.",
    options: ["יראו", "ראו", "רואים"],
    answer: "יראו",
    translation: "They will ___ a movie in the evening. (watch)"
  },
  {
    sentence: "אתן ___ את כל השיעורים בזמן.",
    options: ["תכינו", "הכנתן", "מכינות"],
    answer: "תכינו",
    translation: "You (f. pl.) will ___ all the homework on time. (prepare)"
  },
  {
    sentence: "הוא ___ עם המורה על הפרויקט מחר.",
    options: ["ידבר", "דיבר", "מדבר"],
    answer: "ידבר",
    translation: "He will ___ with the teacher about the project tomorrow. (talk)"
  },
  {
    sentence: "אני ___ להם את האמת כשנפגש.",
    options: ["אגיד", "אמרתי", "אומר"],
    answer: "אגיד",
    translation: "I will ___ them the truth when we meet. (say)"
  },
  {
    sentence: "היא ___ מוקדם כי יש לה מבחן.",
    options: ["תישן", "ישנה", "נרדמה"],
    answer: "תישן",
    translation: "She will ___ early because she has a test. (sleep)"
  },
  {
    sentence: "הם ___ בשש כדי להגיע בזמן לבית הספר.",
    options: ["יקומו", "קמו", "קמים"],
    answer: "יקומו",
    translation: "They will ___ at six to arrive at school on time. (wake up)"
  },
  {
    sentence: "אני ___ ספר חדש בסוף השבוע.",
    options: ["אקרא", "קראתי", "קורא"],
    answer: "אקרא",
    translation: "I will ___ a new book on the weekend. (read)"
  },
  {
    sentence: "הוא ___ את המכונית מחר בבוקר.",
    options: ["ירחץ", "רחץ", "רוחץ"],
    answer: "ירחץ",
    translation: "He will ___ the car tomorrow morning. (wash)"
  },
  {
    sentence: "אנחנו ___ לים ביום שישי.",
    options: ["ניסע", "נסענו", "נוסעים"],
    answer: "ניסע",
    translation: "We will ___ to the beach on Friday. (drive)"
  },
  {
    sentence: "את ___ את החברה שלך במסיבה.",
    options: ["תפגשי", "פגשת", "פוגשת"],
    answer: "תפגשי",
    translation: "You (f.) will ___ your friend at the party. (meet)"
  },
  {
    sentence: "הן ___ את השיר ביחד.",
    options: ["תשרנה", "שרו", "שרות"],
    answer: "תשרנה",
    translation: "They (f.) will ___ the song together. (sing)"
  },
  {
    sentence: "אתם ___ את הבית לפני החג.",
    options: ["תנקו", "ניקיתם", "מנקים"],
    answer: "תנקו",
    translation: "You (pl.) will ___ the house before the holiday. (clean)"
  },
  {
    sentence: "אני ___ לך הודעה אחרי העבודה.",
    options: ["אשלח", "שלחתי", "שולח"],
    answer: "אשלח",
    translation: "I will ___ you a message after work. (send)"
  },
  {
    sentence: "היא ___ עוגה ליום ההולדת.",
    options: ["תאפה", "אפתה", "אופה"],
    answer: "תאפה",
    translation: "She will ___ a cake for the birthday. (bake)"
  },
  {
    sentence: "הם ___ כסף לחופשה.",
    options: ["יחסכו", "חסכו", "חוסכים"],
    answer: "יחסכו",
    translation: "They will ___ money for vacation. (save)"
  },
  {
    sentence: "אנחנו ___ את הדלת בשמונה.",
    options: ["נפתח", "פתחנו", "פותחים"],
    answer: "נפתח",
    translation: "We will ___ the door at eight. (open)"
  },
];

export const futureTenseQuestions: FutureTenseQuestion[] = [];
for (let i = 0; i < 100; i++) {
  const baseQ = baseQuestions[i % 10];
  futureTenseQuestions.push({
    number: i + 1,
    ...baseQ,
  });
}
