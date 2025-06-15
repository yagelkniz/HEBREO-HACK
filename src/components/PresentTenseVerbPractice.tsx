import React, { useState } from "react";

type Question = {
  emoji: string;
  textBefore: string;
  blank?: string;
  textAfter?: string;
  options: string[];
  correct: string;
  color?: string;
  infinitive: string; // שם הפועל
};

const questions: Question[] = [
  {
    emoji: "🍎",
    textBefore: "אני",
    blank: "______",
    textAfter: "תפוח כל בוקר.",
    options: ["אוכל", "אוכלת", "אוכלים", "אוכלות"],
    correct: "אוכל",
    color: "bg-red-100",
    infinitive: "לאכול",
  },
  {
    emoji: "🏀",
    textBefore: "אתה",
    blank: "______",
    textAfter: "כדורסל עם חברים?",
    options: ["משחק", "משחקת", "משחקים", "משחקות"],
    correct: "משחק",
    color: "bg-orange-100",
    infinitive: "לשחק",
  },
  {
    emoji: "🎵",
    textBefore: "הם",
    blank: "______",
    textAfter: "מוזיקה בשיעור.",
    options: ["שומעים", "שומעות", "שומע", "שומעת"],
    correct: "שומעים",
    color: "bg-pink-100",
    infinitive: "לשמוע",
  },
  {
    emoji: "🥪",
    textBefore: "היא",
    blank: "______",
    textAfter: "סנדוויץ'.",
    options: ["אוכלת", "אוכל", "אוכלות", "אוכלים"],
    correct: "אוכלת",
    color: "bg-yellow-100",
    infinitive: "לאכול",
  },
  {
    emoji: "📚",
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "בכיתה.",
    options: ["לומדים", "לומדות", "לומד", "לומדת"],
    correct: "לומדים",
    color: "bg-green-100",
    infinitive: "ללמוד",
  },
  {
    emoji: "🚗",
    textBefore: "אתן",
    blank: "______",
    textAfter: "לעבודה יחד?",
    options: ["נוסעות", "נוסעים", "נוסעת", "נוסע"],
    correct: "נוסעות",
    color: "bg-blue-100",
    infinitive: "לנסוע",
  },
  {
    emoji: "🦸‍♀️",
    textBefore: "את",
    blank: "______",
    textAfter: "הביתה לבד.",
    options: ["הולכת", "הולך", "הולכות", "הולכים"],
    correct: "הולכת",
    color: "bg-purple-100",
    infinitive: "ללכת",
  },
  {
    emoji: "🌙",
    textBefore: "הוא",
    blank: "______",
    textAfter: "מאוחר כל לילה.",
    options: ["נרדם", "נרדמת", "נרדמים", "נרדמות"],
    correct: "נרדם",
    color: "bg-indigo-100",
    infinitive: "להירדם",
  },
];

export default function PresentTenseVerbPractice() {
  const [selections, setSelections] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});
  const [showVowels, setShowVowels] = useState(false);

  function checkVerb(qIndex: number, option: string) {
    setSelections((prev) => ({ ...prev, [qIndex]: option }));
    setFeedbacks((prev) => ({
      ...prev,
      [qIndex]: option === questions[qIndex].correct ? "correct" : "incorrect",
    }));
  }

  // חישוב סטטיסטיקות פשוט
  const totalAnswered = Object.keys(selections).length;
  const correctAnswers = Object.values(feedbacks).filter((f) => f === "correct").length;
  const incorrectAnswers = Object.values(feedbacks).filter((f) => f === "incorrect").length;

  // פונקציית הוספת או הסרת ניקוד, במידה ורלוונטי
  function displayWithVowels(text: string) {
    if (!showVowels) return text;
    // כאן אפשר להטמיע טבלת ניקוד פשוטה בעתיד; בינתיים, חזרה על הטקסט (ההדגמה).
    return text.normalize("NFC");
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-10 min-h-[65vh] bg-background rounded-2xl shadow-md border max-w-xl mx-auto rtl">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold text-primary mb-4" dir="rtl">
          בחר/י את הפועל הנכון בזמן הווה {String.fromCodePoint(0x1f31f)}
        </h1>
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
      {questions.map((q, i) => (
        <div key={i} className={`w-full max-w-md flex flex-col items-center mb-2 rounded-xl shadow ${q.color}`}>
          <div className="flex items-center text-3xl mt-2">{q.emoji}</div>
          {/* שם הפועל בעיצוב עדין */}
          <div
            className="text-sm text-gray-500 italic mt-1 mb-1"
            dir="rtl"
            style={{ letterSpacing: "0.05em" }}
          >
            {displayWithVowels(q.infinitive)}
          </div>
          <p className="text-lg mb-2 flex flex-wrap items-center justify-center" dir="rtl">
            {q.textBefore} <span className="mx-1 font-bold">{q.blank}</span> {q.textAfter}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-1 w-full max-w-xs">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => checkVerb(i, opt)}
                className={`rounded-xl px-4 py-2 text-lg font-medium hover:scale-105 transition whitespace-nowrap disabled:opacity-60 ${
                  selections[i] === opt
                    ? (opt === q.correct ? "bg-green-300" : "bg-red-200")
                    : "bg-white hover:bg-gray-200"
                }`}
                dir="rtl"
                disabled={!!selections[i]}
                aria-disabled={!!selections[i]}
                style={{ border: selections[i] === opt ? "2px solid #a3a3a3" : "" }}
              >
                {displayWithVowels(opt)}
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
      <div className="flex flex-col items-center gap-2 mt-6 w-full">
        <div className="font-bold text-lg text-gray-700" dir="rtl">
          סטטיסטיקה: {correctAnswers} נכונות / {incorrectAnswers} שגויות / {questions.length} סה"כ
        </div>
      </div>
    </div>
  );
}
