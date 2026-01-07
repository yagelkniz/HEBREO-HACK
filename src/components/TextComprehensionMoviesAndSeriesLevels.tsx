import React, { useState, useEffect } from "react";
import { BookOpen, Tv } from "lucide-react";
import { MoviesAndSeriesReadingData } from "./MoviesAndSeriesReadingData";
import { MoviesAndSeriesQuestions } from "./MoviesAndSeriesQuestions";
import MoviesAndSeriesTranslatableText from "./MoviesAndSeriesTranslatableText";

const levels = [
  { key: "easy", label: "קל" },
  { key: "medium", label: "בינוני" },
  { key: "hard", label: "קשה" }
] as const;

type LevelKey = typeof levels[number]["key"];

interface TextComprehensionMoviesAndSeriesLevelsProps {
  onBack: () => void;
}

export default function TextComprehensionMoviesAndSeriesLevels({ onBack }: TextComprehensionMoviesAndSeriesLevelsProps) {
  const [selectedLevel, setSelectedLevel] = useState<LevelKey | null>(null);
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setAnswers({});
    setFeedbacks({});
    setFinished(false);
  }, [selectedLevel]);

  const text = selectedLevel ? MoviesAndSeriesReadingData[selectedLevel] : "";
  const questions = selectedLevel ? MoviesAndSeriesQuestions[selectedLevel] : [];
  const totalQuestions = questions.length;

  function check(qIdx: number, option: string) {
    setAnswers((prev) => ({ ...prev, [qIdx]: option }));
    setFeedbacks((prev) => ({
      ...prev,
      [qIdx]: option === questions[qIdx].answer ? "correct" : "incorrect",
    }));
    if (Object.keys({ ...answers, [qIdx]: option }).length === totalQuestions) {
      setFinished(true);
    }
  }

  const correctCount = Object.values(feedbacks).filter((val) => val === "correct").length;

  if (!selectedLevel) {
    return (
      <div className="flex flex-col items-center py-10 px-4 gap-6 bg-blue-50 rounded-2xl shadow-lg border-2 border-blue-400 max-w-lg mx-auto mt-8">
        <button
          onClick={onBack}
          className="self-start text-sm text-blue-800 underline underline-offset-2 mb-2"
        >
          ⬅ חזרה לתפריט הראשי
        </button>
        <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2 mb-3" dir="rtl">
          <span><Tv className="inline text-blue-400" /></span> הבנת הנקרא: טלוויזיה וסדרות (שלוש רמות)
        </h2>
        <div className="text-lg font-medium text-gray-700 mb-2" dir="rtl">
          בחר רמת קושי לתרגול קריאה בנושא טלוויזיה וסדרות:
        </div>
        <div className="flex gap-4 w-full flex-wrap justify-center">
          {levels.map(({ key, label }) => (
            <button
              key={key}
              className="bg-blue-200 hover:bg-blue-300 transition-all px-7 py-3 rounded-xl border-2 border-blue-400 text-xl font-bold text-blue-900 shadow focus:outline-none"
              onClick={() => setSelectedLevel(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 px-4 gap-7 bg-blue-50 rounded-2xl shadow-lg border-[3px] border-blue-400 max-w-2xl mx-auto mt-8">
      <div className="self-start flex gap-4">
        <button
          onClick={onBack}
          className="text-sm text-blue-800 underline underline-offset-2"
        >
          ⬅ חזרה לתפריט הראשי
        </button>
        <button
          className="text-sm text-blue-800 underline underline-offset-2"
          onClick={() => setSelectedLevel(null)}
          aria-label="בחר רמת קושי אחרת"
        >
          ← לרמות
        </button>
      </div>
      <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2 mb-2" dir="rtl">
        <span><Tv className="inline text-blue-400" /></span> תרגול ברמת {levels.find(l => l.key === selectedLevel)?.label}
      </h2>
      <div className="rounded-xl border px-5 py-3 bg-blue-100 text-lg leading-8 text-black shadow-sm w-full" dir="rtl">
        <MoviesAndSeriesTranslatableText text={text} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        {questions.map((q, i) => (
          <div key={i} className="w-full bg-white border border-blue-200 rounded-xl p-3 shadow">
            <div className="font-semibold text-md mb-2" dir="rtl">
              {i + 1}. {q.question}
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
                      : "bg-white border-gray-300 hover:bg-blue-100"}
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
                    ✅ תשובה נכונה!
                  </span>
                ) : (
                  <span className="text-red-700 font-bold flex items-center gap-1">
                    ❌ טעות
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center gap-2 w-full">
        <div className="font-bold text-lg text-blue-900 bg-blue-100 px-5 py-2 rounded shadow" dir="rtl">
          סטטיסטיקה: {correctCount} תשובות נכונות מתוך {totalQuestions}
        </div>
        {finished && (
          <div className="text-xl font-bold text-blue-700 mt-1" dir="rtl">
            כל הכבוד! סיימת את התרגול 🎉
          </div>
        )}
      </div>
    </div>
  );
}
