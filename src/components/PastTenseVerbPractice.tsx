
import React, { useState } from "react";

type Question = {
  textBefore: string;
  blank?: string;
  textAfter?: string;
  options: string[];
  correct: string;
};

const questions: Question[] = [
  {
    textBefore: "אתמול אני",
    blank: "______",
    textAfter: "לבית הספר.",
    options: ["הלכתי", "הולך", "ילך", "הולכים"],
    correct: "הלכתי",
  },
  {
    textBefore: "ביום ראשון הם",
    blank: "______",
    textAfter: "ארוחת ערב טעימה.",
    options: ["אכלו", "אוכלים", "אכל", "יאכלו"],
    correct: "אכלו",
  },
  {
    textBefore: "שלשום את",
    blank: "______",
    textAfter: "סרט מצחיק.",
    options: ["ראית", "רואה", "תראה", "ראו"],
    correct: "ראית",
  },
];

export default function PastTenseVerbPractice() {
  // Track for each question: selected option and feedback
  const [selections, setSelections] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});

  function checkVerb(qIndex: number, option: string) {
    setSelections((prev) => ({ ...prev, [qIndex]: option }));
    setFeedbacks((prev) => ({
      ...prev,
      [qIndex]: option === questions[qIndex].correct ? "correct" : "incorrect",
    }));
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8 min-h-[60vh] bg-background rounded-2xl shadow-md border max-w-xl mx-auto rtl">
      <h1 className="text-3xl font-bold text-primary mb-4" dir="rtl">
        בחר את הפועל הנכון בזמן עבר
      </h1>
      {questions.map((q, i) => (
        <div key={i} className="w-full max-w-md flex flex-col items-center mb-2">
          <p className="text-lg mb-2 flex flex-wrap items-center justify-center" dir="rtl">
            {q.textBefore} <span className="mx-1 font-bold">{q.blank}</span> {q.textAfter}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-1 w-full max-w-xs">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => checkVerb(i, opt)}
                className={`rounded-2xl px-4 py-2 bg-gray-200 text-lg hover:bg-gray-300 transition whitespace-nowrap disabled:opacity-60 ${
                  selections[i] === opt ? "ring-2 ring-primary" : ""
                }`}
                dir="rtl"
                disabled={!!selections[i]}
                aria-disabled={!!selections[i]}
              >
                {opt}
              </button>
            ))}
          </div>
          {feedbacks[i] === "correct" && (
            <div className="text-md font-semibold mt-1 text-green-600" dir="rtl">
              ✅ תשובה נכונה!
            </div>
          )}
          {feedbacks[i] === "incorrect" && (
            <div className="text-md font-semibold mt-1 text-red-500" dir="rtl">
              ❌ נסה שוב
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
