
import React, { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correct: string;
};

const readingText = `שחר הולך לבקר את חבר שלו בערב. הם מחליטים לבשל יחד פסטה ולאכול סלט ירקות גדול. שחר אוהב להוסיף גבינה לפסטה שלו, אבל החבר מעדיף פסטה בלי גבינה. אחרי האוכל, שותים תה עם עוגה.`;

const questions: Question[] = [
  {
    question: "מה הכינו שחר והחבר?",
    options: ["פיצה", "פסטה וסלט", "מרק ועוף", "עוגת שוקולד"],
    correct: "פסטה וסלט",
  },
  {
    question: "מה שחר אוהב להוסיף לפסטה?",
    options: ["בשר", "גבינה", "מלפפון", "רוטב עגבניות"],
    correct: "גבינה",
  },
  {
    question: "מה שתו בסוף הארוחה?",
    options: ["קפה", "מים", "מיץ תפוזים", "תה"],
    correct: "תה",
  },
];

export default function TextComprehensionFood() {
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});

  function checkAnswer(qIdx: number, option: string) {
    setAnswers((prev) => ({ ...prev, [qIdx]: option }));
    setFeedbacks((prev) => ({
      ...prev,
      [qIdx]: option === questions[qIdx].correct ? "correct" : "incorrect",
    }));
  }

  const allAnswered = Object.keys(answers).length === questions.length;
  const correctCount = Object.values(feedbacks).filter(f => f === "correct").length;

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-8 bg-background rounded-2xl shadow-md border max-w-xl mx-auto mt-6 rtl">
      <h2 className="text-2xl font-bold mb-2" dir="rtl">הבנת הנקרא: אוכל</h2>
      <div className="border px-6 py-4 rounded-xl bg-yellow-50 text-lg leading-8 mb-2" dir="rtl">
        {readingText}
      </div>
      {questions.map((q, i) => (
        <div key={i} className="w-full mb-3">
          <div className="mb-2 font-semibold text-md" dir="rtl">{i+1}. {q.question}</div>
          <div className="flex flex-wrap gap-3">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => checkAnswer(i, opt)}
                className={`px-4 py-2 rounded-xl text-base font-medium border
                  ${answers[i] === opt
                    ? (feedbacks[i] === "correct"
                      ? "bg-green-200 border-green-500"
                      : "bg-red-200 border-red-500")
                    : "bg-white border-gray-300 hover:bg-gray-100"}
                  `}
                disabled={!!answers[i]}
                aria-disabled={!!answers[i]}
                dir="rtl"
              >
                {opt}
              </button>
            ))}
          </div>
          {feedbacks[i]==="correct" && <div className="mt-1 text-green-700">✅ תשובה נכונה</div>}
          {feedbacks[i]==="incorrect" && <div className="mt-1 text-red-700">❌ שגוי</div>}
        </div>
      ))}
      {allAnswered && (
        <div className="mt-4 font-bold text-blue-800" dir="rtl">
          סיימת! קיבלת {correctCount} מתוך {questions.length}
        </div>
      )}
    </div>
  );
}
