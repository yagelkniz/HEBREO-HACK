
export type Question = {
  question: string;
  options: string[];
  correct: string;
  joke?: string;
};

export const questions: Question[] = [
  {
    question: "מה החיה האהובה על דני?",
    options: [
      "פיל",
      "אריה",
      "חתול",
      "קוף"
    ],
    correct: "פיל"
  },
  {
    question: "למה דני אוהב את הפיל?",
    options: [
      "כי הוא גדול, חכם ורגוע",
      "כי הוא קטן ומצחיק",
      "כי הוא עף בשמיים",
      "כי הוא רעשן ומפחיד"
    ],
    correct: "כי הוא גדול, חכם ורגוע"
  }
];
