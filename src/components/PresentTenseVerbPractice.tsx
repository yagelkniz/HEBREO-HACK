
import React, { useState } from "react";
import {
  presentTenseQuestionsPart1,
  presentTenseQuestionsPart2,
  presentTenseQuestionsPart3,
  presentTenseQuestionsPart4,
} from "./presentTenseQuestionsParts";
import type { PresentTenseQuestion } from "./presentTenseQuestions";

const parts = [
  { label: "חלק 1", data: presentTenseQuestionsPart1 },
  { label: "חלק 2", data: presentTenseQuestionsPart2 },
  { label: "חלק 3", data: presentTenseQuestionsPart3 },
  { label: "חלק 4", data: presentTenseQuestionsPart4 },
];

interface PresentTenseVerbPracticeProps {
  onBack: () => void;
}

export default function PresentTenseVerbPractice({ onBack }: PresentTenseVerbPracticeProps) {
  const [currentPart, setCurrentPart] = useState(0); // begin with part 1
  const questions = parts[currentPart].data;

  const [selections, setSelections] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});
  const [showVowels, setShowVowels] = useState(false);

  function checkVerb(qNumber: number, option: string) {
    setSelections((prev) => ({ ...prev, [qNumber]: option }));
    const q = questions.find((qq) => qq.number === qNumber);
    setFeedbacks((prev) => ({
      ...prev,
      [qNumber]: option === q?.answer ? "correct" : "incorrect",
    }));
  }

  // reset state when changing part
  function handlePartChange(idx: number) {
    setCurrentPart(idx);
    setSelections({});
    setFeedbacks({});
  }

  const correctAnswers = Object.values(feedbacks).filter((f) => f === "correct").length;
  const incorrectAnswers = Object.values(feedbacks).filter((f) => f === "incorrect").length;

  function displayWithVowels(text: string) {
    if (!showVowels) return text;
    return text.normalize("NFC");
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-10 min-h-[65vh] bg-background rounded-2xl shadow-md border max-w-xl mx-auto rtl">
      <button
        onClick={onBack}
        className="self-start text-sm text-blue-800 underline underline-offset-2 mb-2"
      >
        ⬅ חזרה לתפריט הראשי
      </button>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold text-primary mb-4" dir="rtl">
          בחר/י את הפועל הנכון בזמן הווה {String.fromCodePoint(0x1f31f)}
        </h1>
        <div className="flex gap-2 mb-3">
          {parts.map((part, idx) => (
            <button
              key={part.label}
              className={`px-3 py-1 text-base font-semibold rounded-xl border ${
                idx === currentPart
                  ? "bg-green-500 text-white border-green-700"
                  : "bg-white text-green-600 border-green-300 hover:bg-green-100"
              } transition`}
              onClick={() => handlePartChange(idx)}
              disabled={idx === currentPart}
              aria-disabled={idx === currentPart}
              type="button"
            >
              {part.label}
            </button>
          ))}
        </div>
        <label className="flex gap-2 mb-3 items-center text-base cursor-pointer" dir="rtl">
          <input
            type="checkbox"
            checked={showVowels}
            onChange={() => setShowVowels((v) => !v)}
            className="accent-blue-500 w-4 h-4"
          />
          הפעל ניקוד בתשובות
        </label>
      </div>
      {questions.map((q) => (
        <div key={q.number} className={`w-full max-w-md flex flex-col items-center mb-2 rounded-xl shadow`}>
          {/* מספר שאלה */}
          <div className="text-xs text-gray-400 mt-2">#{q.number}</div>
          <p className="text-lg mb-2 flex flex-wrap items-center justify-center" dir="rtl">
            {q.sentence}
          </p>
          {/* תרגום באנגלית */}
          <div className="text-sm text-gray-500 italic mb-2 text-center" dir="ltr">
            ({q.translation})
          </div>
          <div className="grid grid-cols-2 gap-3 mb-1 w-full max-w-xs">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => checkVerb(q.number, opt)}
                className={`rounded-xl px-4 py-2 text-lg font-medium hover:scale-105 transition whitespace-nowrap disabled:opacity-60 ${
                  selections[q.number] === opt
                    ? (opt === q.answer ? "bg-green-300" : "bg-red-200")
                    : "bg-white hover:bg-gray-200"
                }`}
                dir="rtl"
                disabled={!!selections[q.number]}
                aria-disabled={!!selections[q.number]}
                style={{ border: selections[q.number] === opt ? "2px solid #a3a3a3" : "" }}
              >
                {displayWithVowels(opt)}
              </button>
            ))}
          </div>
          {feedbacks[q.number] === "correct" && (
            <div className="text-md font-semibold mt-1 text-green-600" dir="rtl">
              ✅ תשובה נכונה!
            </div>
          )}
          {feedbacks[q.number] === "incorrect" && (
            <div className="text-md font-semibold mt-1 text-red-500" dir="rtl">
              ❌ נסה שוב
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col items-center gap-2 mt-6 w-full">
        <div className="font-bold text-lg text-gray-700" dir="rtl">
          סטטיסטיקה: {correctAnswers} נכונות / {incorrectAnswers} שגויות / {questions.length} סה"כ
        </div>
      </div>
    </div>
  );
}
