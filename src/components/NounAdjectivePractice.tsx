
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/shuffleArray";

type Q = {
  sentence: string;
  options: string[];
  correct: string;
  translation?: string;
};

const questionsRaw: Q[] = [
  // קל
  {
    sentence: "הילד ______ (גדול/קטן/כחול/ישן)",
    options: ["גדול", "קטן", "כחול", "ישן"],
    correct: "גדול",
    translation: "The boy is big."
  },
  {
    sentence: "התפוז ______ (טעים/שמח/יפה/חדש)",
    options: ["טעים", "שמח", "יפה", "חדש"],
    correct: "טעים",
    translation: "The orange is tasty."
  },
  {
    sentence: "הספר ______ (חדש/ישן/שחור/חם)",
    options: ["חדש", "ישן", "שחור", "חם"],
    correct: "חדש",
    translation: "The book is new."
  },
  {
    sentence: "המורה ______ (טובה/קרה/רחבה/עצובה)",
    options: ["טובה", "קרה", "רחבה", "עצובה"],
    correct: "טובה",
    translation: "The teacher (f) is good."
  },
  {
    sentence: "הילדה ______ (יפה/קטנה/שמחה/ארוכה)",
    options: ["יפה", "קטנה", "שמחה", "ארוכה"],
    correct: "יפה",
    translation: "The girl is beautiful."
  },
  {
    sentence: "הבית ______ (גדול/קר/שמח/ירוק)",
    options: ["גדול", "קר", "שמח", "ירוק"],
    correct: "גדול",
    translation: "The house is big."
  },
  {
    sentence: "הכלב ______ (ישן/שמח/חום/קטן)",
    options: ["שמח", "ישן", "חום", "קטן"],
    correct: "שמח",
    translation: "The dog is happy."
  },
  {
    sentence: "הדלת ______ (חדשה/ישנה/חמה/קצרה)",
    options: ["חדשה", "ישנה", "חמה", "קצרה"],
    correct: "חדשה",
    translation: "The door is new."
  },

  // בינוני
  {
    sentence: "האופניים ______ (ישנים/חדשים/חכמים/קרים)",
    options: ["חדשים", "ישנים", "חכמים", "קרים"],
    correct: "חדשים",
    translation: "The (bi)cycle is new."
  },
  {
    sentence: "השולחנות ______ (נקיים/קטנים/שמחים/ישנים)",
    options: ["נקיים", "קטנים", "שמחים", "ישנים"],
    correct: "נקיים",
    translation: "The tables are clean."
  },
  {
    sentence: "החתולים ______ (יפים/גדולים/טעימים/כבדים)",
    options: ["יפים", "גדולים", "טעימים", "כבדים"],
    correct: "יפים",
    translation: "The cats are pretty."
  },
  {
    sentence: "המורות ______ (טובות/ישנות/נמוכות/מהירות)",
    options: ["טובות", "ישנות", "נמוכות", "מהירות"],
    correct: "טובות",
    translation: "The teachers (f) are good."
  },
  {
    sentence: "התלמידות ______ (חכמות/חמות/גבוהות/מגעילות)",
    options: ["חכמות", "חמות", "גבוהות", "מגעילות"],
    correct: "חכמות",
    translation: "The students (f) are smart."
  },
  {
    sentence: "הכיסאות ______ (שחורים/יקרים/ישנים/טעימים)",
    options: ["שחורים", "יקרים", "ישנים", "טעימים"],
    correct: "שחורים",
    translation: "The chairs are black."
  },
  {
    sentence: "הנסיעה ______ (ארוכה/קצרה/מהירה/חמה)",
    options: ["ארוכה", "קצרה", "מהירה", "חמה"],
    correct: "ארוכה",
    translation: "The ride is long."
  },
  {
    sentence: "הילדים ______ (שמחים/טובים/יפים/קטנים)",
    options: ["שמחים", "טובים", "יפים", "קטנים"],
    correct: "שמחים",
    translation: "The children are happy."
  },

  // קשה
  {
    sentence: "המשפחה שלי ______ (מאושרת/ענייה/עשירה/קטנה)",
    options: ["מאושרת", "ענייה", "עשירה", "קטנה"],
    correct: "מאושרת",
    translation: "My family is happy."
  },
  {
    sentence: "החברים שלי ______ (נאמנים/יקרים/מוזרים/עשירים)",
    options: ["נאמנים", "יקרים", "מוזרים", "עשירים"],
    correct: "נאמנים",
    translation: "My friends are loyal."
  },
  {
    sentence: "העיר ______ (עמוסה/יפה/נקייה/ים)",
    options: ["עמוסה", "יפה", "נקייה", "ים"],
    correct: "נקייה",
    translation: "The city is clean."
  },
  {
    sentence: "הרחובות בעיר ______ (סואנים/מוארים/יפים/ריקים)",
    options: ["סואנים", "מוארים", "יפים", "ריקים"],
    correct: "מוארים",
    translation: "The streets in the city are lit."
  },
  {
    sentence: "הארוחה במסעדה הייתה ______ (טעימה/מהירה/חמה/קשה)",
    options: ["טעימה", "מהירה", "חמה", "קשה"],
    correct: "טעימה",
    translation: "The meal at the restaurant was tasty."
  },
  {
    sentence: "המלצרית ______ (אדיבה/יפה/עצלנית/קרה)",
    options: ["אדיבה", "יפה", "עצלנית", "קרה"],
    correct: "אדיבה",
    translation: "The waitress was polite."
  },
  {
    sentence: "הכלבים של השכן ______ (רועשים/מפחידים/שקטים/זריזים)",
    options: ["רועשים", "מפחידים", "שקטים", "זריזים"],
    correct: "רועשים",
    translation: "The neighbor's dogs are noisy."
  },
  {
    sentence: "הים בקיץ ______ (חם/מלוח/כחול/ריק)",
    options: ["חם", "מלוח", "כחול", "ריק"],
    correct: "חם",
    translation: "The sea in summer is hot."
  },

  // בונוס
  {
    sentence: "המטבח בבית שלי ______ (נקי/מלוכלך/קטן/ישן)",
    options: ["נקי", "מלוכלך", "קטן", "ישן"],
    correct: "נקי",
    translation: "The kitchen in my house is clean."
  },
  {
    sentence: "אחי ואחותי ______ (חכמים/שמחים/צעירים/יפים)",
    options: ["חכמים", "שמחים", "צעירים", "יפים"],
    correct: "צעירים",
    translation: "My brother and sister are young."
  },
  {
    sentence: "הכיתה ______ (רחבה/גבוהה/חדשה/נקייה)",
    options: ["נקייה", "רחבה", "גבוהה", "חדשה"],
    correct: "נקייה",
    translation: "The classroom is clean."
  },
  {
    sentence: "החגים בישראל ______ (מיוחדים/עמוסים/נעימים/ארוכים)",
    options: ["מיוחדים", "עמוסים", "נעימים", "ארוכים"],
    correct: "מיוחדים",
    translation: "The holidays in Israel are special."
  },
  {
    sentence: "הילדים בכיתה ______ (חכמים/בדיחה/חמים/חכמות)",
    options: ["חכמים", "חמים", "חכמות", "בדיחה"],
    correct: "חכמים",
    translation: "The children in the class are smart."
  }
];

export default function NounAdjectivePractice({ onBack }: { onBack?: () => void }) {
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});

  // Shuffle options for each question
  const questions = useMemo(() => {
    return questionsRaw.map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
  }, []);

  const total = questions.length;
  const correct = Object.values(feedbacks).filter((f) => f === "correct").length;
  const incorrect = Object.values(feedbacks).filter((f) => f === "incorrect").length;

  function check(i: number, option: string) {
    setAnswers((prev) => ({ ...prev, [i]: option }));
    setFeedbacks((prev) => ({ ...prev, [i]: option === questions[i].correct ? "correct" : "incorrect" }));
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-8 min-h-[60vh] bg-background rounded-2xl shadow-md border max-w-xl mx-auto" dir="rtl">
      <div className="flex justify-end w-full mb-2">
        {onBack && <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>}
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2" dir="rtl">
        בחר/י את שם התואר המתאים למשפט
      </h2>
      {questions.map((q, i) => (
        <div key={i} className="w-full max-w-md flex flex-col items-center mb-2">
          <p className="text-lg mb-2 flex flex-wrap items-center justify-center" dir="rtl">{q.sentence}</p>
          {q.translation && (
            <div className="text-sm text-gray-500 italic mb-1 text-center" dir="ltr">
              ({q.translation})
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 mb-1 w-full max-w-xs">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => check(i, opt)}
                className={`rounded-2xl px-4 py-2 bg-gray-200 text-lg hover:bg-gray-300 transition whitespace-nowrap disabled:opacity-60 ${
                  answers[i] === opt ? "ring-2 ring-primary" : ""
                }`}
                dir="rtl"
                disabled={!!answers[i]}
                aria-disabled={!!answers[i]}
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
      <div className="flex flex-col items-center gap-2 mt-6 w-full">
        <div className="font-bold text-lg text-gray-700" dir="rtl">
          סטטיסטיקה: {correct} נכונות / {incorrect} שגויות / {total} סה"כ
        </div>
      </div>
    </div>
  );
}
