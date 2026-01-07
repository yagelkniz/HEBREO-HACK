
import React, { useState } from "react";
import { Smile, PartyPopper, Frown, RotateCcw } from "lucide-react";
import TranslatableText from "./TranslatableText";

type Question = {
  question: string;
  options: string[];
  correct: string;
};

const readingText = `שחר הולך לבקר את חבר שלו בערב. הם מחליטים לבשל יחד פסטה ולאכול סלט ירקות גדול. שחר אוהב להוסיף גבינה לפסטה שלו, אבל החבר מעדיף פסטה בלי גבינה. אחרי האוכל, שותים תה עם עוגה.`;

// מפת תרגומים למילים מרכזיות
const translationMap: { [hebrewWord: string]: string } = {
  "שחר": "Shahar (a name)",
  "חבר": "friend",
  "הולך": "goes",
  "לבקר": "to visit",
  "בערב": "in the evening",
  "מחליטים": "decide",
  "לבשל": "to cook",
  "יחד": "together",
  "פסטה": "pasta",
  "סלט": "salad",
  "ירקות": "vegetables",
  "גדול": "big",
  "אוהב": "likes/loves",
  "להוסיף": "to add",
  "גבינה": "cheese",
  "שלו": "his",
  "אבל": "but",
  "מעדיף": "prefers",
  "בלי": "without",
  "אחרי": "after",
  "האוכל": "the food/meal",
  "שותים": "drink (plural)",
  "תה": "tea",
  "עם": "with",
  "עוגה": "cake"
};

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

interface TextComprehensionFoodProps {
  onBack: () => void;
}

export default function TextComprehensionFood({ onBack }: TextComprehensionFoodProps) {
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});
  const [finished, setFinished] = useState(false);

  function checkAnswer(qIdx: number, option: string) {
    if (answers[qIdx]) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: option }));
    setFeedbacks((prev) => ({
      ...prev,
      [qIdx]: option === questions[qIdx].correct ? "correct" : "incorrect",
    }));
    if (Object.keys({ ...answers, [qIdx]: option }).length === questions.length) {
      setFinished(true);
    }
  }

  function resetQuiz() {
    setAnswers({});
    setFeedbacks({});
    setFinished(false);
  }

  const correctCount = Object.values(feedbacks).filter(f => f === "correct").length;

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8 bg-yellow-50 rounded-2xl shadow-lg border-2 border-yellow-300 max-w-xl mx-auto mt-7 rtl animate-fade-in">
      <button
        onClick={onBack}
        className="self-start text-sm text-blue-800 underline underline-offset-2 mb-2"
      >
        ⬅ חזרה לתפריט הראשי
      </button>
      <h2 className="text-3xl font-bold mb-2 text-yellow-800 flex items-center gap-2" dir="rtl">
        🍝 הבנת הנקרא: אוכל
      </h2>
      <div className="border px-7 py-5 rounded-xl bg-yellow-100 text-lg leading-8 mb-2 shadow" dir="rtl">
        <TranslatableText text={readingText} translations={translationMap} />
      </div>
      <div className="flex flex-col gap-5 w-full">
        {questions.map((q, i) => (
          <div key={i} className="w-full bg-white border border-yellow-200 rounded-xl p-4 shadow transition-all hover:shadow-lg">
            <div className="mb-2 font-semibold text-md flex items-center gap-1" dir="rtl">
              <span className="text-yellow-500">{i + 1}.</span> {q.question}
            </div>
            <div className="flex flex-wrap gap-3">
              {q.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => checkAnswer(i, opt)}
                  className={`px-4 py-2 rounded-xl text-base font-medium border
                    ${answers[i] === opt
                      ? (feedbacks[i] === "correct"
                        ? "bg-green-200 border-green-500 scale-105 animate-scale-in"
                        : "bg-red-200 border-red-500 scale-95 animate-shake")
                      : "bg-white border-gray-300 hover:bg-yellow-100"}
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
              <div className="mt-2 flex items-center gap-2">
                {feedbacks[i] === "correct" ? (
                  <span className="text-green-700 font-bold flex items-center gap-1 animate-fade-in">
                    <Smile className="inline w-5 h-5" /> תשובה נכונה!
                  </span>
                ) : (
                  <span className="text-red-700 font-bold flex items-center gap-1 animate-fade-in">
                    <Frown className="inline w-5 h-5" /> טעות
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-col items-center gap-3 w-full animate-fade-in">
        <div className="font-bold text-lg text-yellow-900 bg-yellow-200 px-5 py-2 rounded shadow" dir="rtl">
          סטטיסטיקה: {correctCount} תשובות נכונות מתוך {questions.length}
        </div>
        {finished && (
          <div className="text-2xl font-bold mt-1 text-yellow-700 flex items-center gap-2 animate-scale-in" dir="rtl">
            <PartyPopper className="w-7 h-7 text-green-400" />
            {correctCount === questions.length ? "מושלם! כל הכבוד! 🎉" : correctCount > 0 ? "סיימת! כל הכבוד!" : "נסה שוב!"}
          </div>
        )}
        {finished && (
          <button
            className="mt-3 px-5 py-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold flex items-center gap-2 border border-yellow-400 transition-all shadow"
            onClick={resetQuiz}
            aria-label="התחל שוב"
          >
            <RotateCcw className="w-5 h-5" /> התחל שוב
          </button>
        )}
      </div>
    </div>
  );
}

