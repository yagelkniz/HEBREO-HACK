
import React, { useState } from "react";
import { PawPrint, Smile, Frown } from "lucide-react";
import TranslatableText from "./TranslatableText";
import { readingText, translationMap } from "./AnimalsEasyReadingData";
import { questions, Question } from "./AnimalsEasyQuestions";

interface TextComprehensionAnimalsEasyProps {
  onBack: () => void;
}

export default function TextComprehensionAnimalsEasy({ onBack }: TextComprehensionAnimalsEasyProps) {
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});
  const [finished, setFinished] = useState(false);

  function check(qIdx: number, option: string) {
    setAnswers((prev) => ({ ...prev, [qIdx]: option }));
    setFeedbacks((prev) => ({
      ...prev,
      [qIdx]: option === questions[qIdx].correct ? "correct" : "incorrect",
    }));
    if (Object.keys(answers).length + 1 === questions.length) {
      setFinished(true);
    }
  }

  const correct = Object.values(feedbacks).filter((f) => f === "correct").length;

  return (
    <div className="flex flex-col items-center justify-center p-7 gap-7 bg-green-50 rounded-2xl shadow-lg border-[3px] border-green-300 max-w-2xl mx-auto mt-8 rtl transition-all">
      <button
        onClick={onBack}
        className="self-start text-sm text-blue-800 underline underline-offset-2 mb-2"
      >
        ⬅ חזרה לתפריט הראשי
      </button>
      <h2 className="text-3xl font-bold mb-1 text-green-800 flex items-center gap-2" dir="rtl">
        <PawPrint className="inline-block text-green-500" /> הבנת הנקרא: חיות (קל)
      </h2>
      <div className="rounded-xl border px-6 py-4 bg-yellow-50 text-lg leading-8 text-black mb-1 shadow-sm" dir="rtl">
        <TranslatableText text={readingText} translations={translationMap} />
      </div>
      <div className="flex flex-col gap-3 w-full">
        {questions.map((q, i) => (
          <div key={i} className="w-full bg-white border border-green-200 rounded-xl p-3 shadow transition-all hover:shadow-lg">
            <div className="mb-2 font-semibold text-md flex items-center gap-2" dir="rtl">
              <span className="text-green-500">{i + 1}.</span> {q.question}
            </div>
            <div className="flex flex-wrap gap-2">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => check(i, opt)}
                  className={`px-3 py-1.5 rounded-xl text-base font-medium border
                    ${answers[i] === opt
                      ? (feedbacks[i] === "correct"
                        ? "bg-green-200 border-green-500 scale-105"
                        : "bg-red-200 border-red-500 scale-95")
                      : "bg-white border-gray-300 hover:bg-green-100"}
                    transition-all duration-200`}
                  disabled={!!answers[i]}
                  aria-disabled={!!answers[i]}
                  dir="rtl"
                >
                  {opt}
                </button>
              ))}
            </div>
            {answers[i] && (
              <div className="mt-1 flex items-center gap-2">
                {feedbacks[i] === "correct" ? (
                  <span className="text-green-700 font-bold flex items-center gap-1">
                    <Smile className="inline w-5 h-5" /> תשובה נכונה!
                  </span>
                ) : (
                  <span className="text-red-700 font-bold flex items-center gap-1">
                    <Frown className="inline w-5 h-5" /> טעות{questions[i].joke && <> – <span className="text-xs">{questions[i].joke}</span></>}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-col items-center gap-2 w-full">
        <div className="font-bold text-lg text-green-800 bg-green-100 px-5 py-2 rounded shadow" dir="rtl">
          סטטיסטיקה: {correct} תשובות נכונות מתוך {questions.length}
        </div>
        {finished && (
          <div className="text-2xl font-bold text-yellow-700 mt-1" dir="rtl">
            כל הכבוד! סיימת את התרגול 🎉
          </div>
        )}
      </div>
    </div>
  );
}
