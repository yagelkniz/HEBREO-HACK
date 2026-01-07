
import React, { useState } from "react";
import { SocialMediaReadingData } from "./SocialMediaReadingData";
import { BookOpen } from "lucide-react";

const questions = [
  {
    level: "easy",
    label: "קל",
    question: "מה הפעילות שטל הכי אוהב לעשות בבית?",
    options: [
      "לשחק עם חברים",
      "לצפות בטלוויזיה עם המשפחה ולאכול פופקורן",
      "לקרוא ספרים",
      "לצייר"
    ],
    correct: "לצפות בטלוויזיה עם המשפחה ולאכול פופקורן"
  },
  {
    level: "medium",
    label: "בינוני",
    question: "לשם מה שיר עוקבת אחרי תוכניות טלוויזיה?",
    options: [
      "בשביל לקבל רעיונות לסרטונים שלה",
      "כי היא אוהבת להיות בטלוויזיה",
      "כדי ללמוד לדבר עברית",
      "בשביל לעבוד בהפקה"
    ],
    correct: "בשביל לקבל רעיונות לסרטונים שלה"
  },
  {
    level: "hard",
    label: "קשה",
    question: "מה נועם אומר על הקשר בין טלוויזיה לרשתות?",
    options: [
      "טלוויזיה לא משפיעה על מה שאנשים משתפים",
      "הוא משתף תכנים משעממים",
      "התוכן בטלוויזיה משפיע על מה שאנשים משתפים ברשתות",
      "הוא לא אוהב להיות מקורי"
    ],
    correct: "התוכן בטלוויזיה משפיע על מה שאנשים משתפים ברשתות"
  }
];

interface TextComprehensionSocialMediaProps {
  onBack: () => void;
}

export default function TextComprehensionSocialMedia({ onBack }: TextComprehensionSocialMediaProps) {
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
    <div className="flex flex-col items-center justify-center p-7 gap-7 bg-blue-50 rounded-2xl shadow-lg border-[3px] border-blue-300 max-w-2xl mx-auto mt-8 rtl transition-all">
      <button
        onClick={onBack}
        className="self-start text-sm text-blue-800 underline underline-offset-2 mb-2"
      >
        ⬅ חזרה לתפריט הראשי
      </button>
      <h2 className="text-3xl font-bold mb-1 text-blue-800 flex items-center gap-2" dir="rtl">
        <BookOpen className="inline-block text-blue-400" />
        הבנת הנקרא: טלוויזיה ורשתות חברתיות
      </h2>
      <div className="w-full flex flex-col gap-5">
        {questions.map((q, i) => (
          <div key={i} className="w-full bg-white border border-blue-100 rounded-xl p-3 shadow">
            <div className="font-bold text-lg text-blue-600 mb-2" dir="rtl">
              <span>רמת {q.label}:</span>
              <div className="bg-blue-50 border rounded-md px-3 py-2 mt-2 text-black">{SocialMediaReadingData[q.level as "easy"|"medium"|"hard"]}</div>
            </div>
            <div className="font-semibold text-md mb-2" dir="rtl">
              {q.question}
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
      <div className="mt-5 flex flex-col items-center gap-2 w-full">
        <div className="font-bold text-lg text-blue-900 bg-blue-100 px-5 py-2 rounded shadow" dir="rtl">
          סטטיסטיקה: {correct} תשובות נכונות מתוך {questions.length}
        </div>
        {finished && (
          <div className="text-2xl font-bold text-blue-700 mt-1" dir="rtl">
            כל הכבוד! סיימת את התרגול 🎉
          </div>
        )}
      </div>
    </div>
  );
}
