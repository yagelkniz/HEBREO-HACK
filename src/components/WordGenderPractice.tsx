
import React, { useState } from "react";

const WORD = "מיטה";
const CORRECT_ANSWERS = ["נקבה", "יחיד"];

const options = [
  { label: "זכר" },
  { label: "נקבה" },
  { label: "יחיד" },
  { label: "רבים" }
];

export default function WordGenderPractice() {
  const [feedback, setFeedback] = useState<null | "correct" | "incorrect">(null);
  const [clicked, setClicked] = useState<string[]>([]);

  function checkAnswer(answer: string) {
    setClicked([...clicked, answer]);
    if (CORRECT_ANSWERS.includes(answer)) {
      setFeedback("correct");
    } else {
      setFeedback("incorrect");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 min-h-[60vh] bg-background rounded-2xl shadow-md border max-w-xl mx-auto rtl">
      <h1 className="text-3xl font-bold text-primary mb-2" dir="rtl">מה סוג המילה?</h1>
      <p className="text-xl mb-4" dir="rtl">
        המילה: <strong className="font-extrabold">{WORD}</strong>
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        {options.map(({ label }) => (
          <button
            key={label}
            onClick={() => checkAnswer(label)}
            className="rounded-2xl px-4 py-2 bg-gray-200 text-lg hover:bg-gray-300 transition whitespace-nowrap"
            dir="rtl"
            disabled={clicked.includes(label)}
            aria-disabled={clicked.includes(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {feedback === "correct" && (
        <div className="text-xl font-semibold mt-6 text-green-600" dir="rtl">
          ✅ תשובה נכונה!
        </div>
      )}
      {feedback === "incorrect" && (
        <div className="text-xl font-semibold mt-6 text-red-500" dir="rtl">
          ❌ נסה שוב
        </div>
      )}
    </div>
  );
}
