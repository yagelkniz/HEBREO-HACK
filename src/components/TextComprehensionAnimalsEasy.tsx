
import React, { useState } from "react";
import { PawPrint, Smile, Frown } from "lucide-react";
import TranslatableText from "./TranslatableText";

type Q = {
  question: string;
  options: string[];
  correct: string;
  joke?: string;
};

// טקסט קריאה
const readingText = `🐾 דני אוהב חיות – במיוחד את הכלב ג'וני, שמאמין שבני אדם נוצרו כדי לזרוק לו כדורים ולפנק אותו עם חטיפים. כל בוקר דני וג'וני יוצאים לטיול בפארק, פוגשים כלבים אחרים (וגם ברווז שנעלב כשלא מזמינים אותו למשחק). יום אחד ג'וני רץ אחרי חתול, והחתול דווקא רץ אחרי דני! בסוף כולם הסתבכו בתוך שיח, וכל מי שעבר בפארק קיבל הופעה בחינם. מאז דני מחליט לצאת רק עם חטיפי פיוס – גם לכלבים, גם לחתולים, וגם לברווז!`;

// אובייקט תרגום מסודר - חובה לסגור סוגריים!
const translationMap: { [hebrewWord: string]: string } = {
  "דני": "Danny",
  "אוהב": "loves",
  "חיות": "animals",
  "במיוחד": "especially",
  "הכלב": "the dog",
  "ג'וני": "Johnny",
  "מאמין": "believes",
  "בני": "people",
  "אדם": "man/human",
  "נוצרו": "were created",
  "לזרוק": "to throw",
  "כדורים": "balls",
  "לפנק": "to pamper",
  "חטיפים": "treats",
  "בוקר": "morning",
  "יוצאים": "go out",
  "טיול": "walk",
  "פארק": "park",
  "פוגשים": "meet",
  "כלבים": "dogs",
  "אחרים": "others",
  "ברווז": "duck",
  "שנעלב": "was insulted",
  "משחק": "game",
  "יום": "day",
  "אחד": "one",
  "רץ": "ran",
  "אחרי": "after",
  "חתול": "cat",
  "דווקא": "on the contrary",
  "בסוף": "in the end",
  "כולם": "everyone",
  "הסתבכו": "got entangled",
  "שיח": "bush",
  "עבר": "passed by",
  "קיבל": "got/received",
  "הופעה": "show/performance",
  "בחינם": "for free",
  "מאז": "since then",
  "מחליט": "decides",
  "חטיפי": "treats (plural base)",
  "פיוס": "reconciliation",
  "גם": "also",
  "לכלבים": "for dogs",
  "לחתולים": "for cats",
  "לברווז": "for the duck"
};

const questions: Q[] = [
  {
    question: "מי החיה האהובה על דני?",
    options: ["ג'וני הכלב", "הברווזים", "החתול", "הדולפין"],
    correct: "ג'וני הכלב",
    joke: "דולפינים בפארק? אולי בפעם הבאה!"
  },
  {
    question: "מה ג'וני חושב על בני אדם?",
    options: [
      "הם זורקים כדורים ונותנים חטיפים",
      "הם מגרשים אותו מהספה",
      "הם חייבים לנבוח כל בוקר",
      "הם שותפים בלהקת ברווזים"
    ],
    correct: "הם זורקים כדורים ונותנים חטיפים"
  },
  {
    question: "מה קורה בבוקר עם דני וג'וני?",
    options: [
      "הם מטיילים בפארק",
      "הם רואים טלוויזיה",
      "הם לומדים יפנית",
      "הם מבשלים מרק"
    ],
    correct: "הם מטיילים בפארק"
  },
  {
    question: "איזו חיה נעלבת כשהיא לא משתתפת במשחק?",
    options: [
      "הברווז",
      "החתול",
      "הג'ירפה",
      "העקרב"
    ],
    correct: "הברווז",
    joke: "עקרבים לא אוהבים כדורים, אל תדאג!"
  },
  {
    question: "מה קרה כשג'וני רץ אחרי החתול?",
    options: [
      "החתול רץ אחרי דני",
      "כולם נרדמו",
      "הברווז התחבא",
      "ג'וני הפך לשף"
    ],
    correct: "החתול רץ אחרי דני"
  },
  {
    question: "איך נגמרה ההרפתקה בפארק?",
    options: [
      "הם הסתבכו בשיח",
      "הם רצו עד לים",
      "כולם טסו לירח",
      "הברווז הפך למאמן כושר"
    ],
    correct: "הם הסתבכו בשיח"
  },
  {
    question: "מי קיבל הופעה בחינם?",
    options: [
      "כל מי שעבר בפארק",
      "הטלוויזיה האזורית",
      "הדולפינים הארציים",
      "הציפורים של קוסטה ריקה"
    ],
    correct: "כל מי שעבר בפארק"
  },
  {
    question: "מה דני מביא מאז לטיולים?",
    options: [
      "חטיפי פיוס",
      "פסנתר",
      "כדור פורח",
      "מטריה מוזיקלית"
    ],
    correct: "חטיפי פיוס"
  },
  {
    question: "מי מקבל את החטיפים?",
    options: [
      "כלבים, חתולים וברווזים",
      "רק הכלבים",
      "רק החתולים",
      "רק הברווזים"
    ],
    correct: "כלבים, חתולים וברווזים"
  },
  {
    question: "מה אפשר ללמוד מהסיפור?",
    options: [
      "שקצת הומור וטיפת פיוס פותרים בלגן גם בשיחים",
      "לא כדאי להיכנס לשיחים בכלל",
      "כדאי ללמוד יפנית",
      "עיקרון הברווזים בפיזיקה"
    ],
    correct: "שקצת הומור וטיפת פיוס פותרים בלגן גם בשיחים"
  }
];

export default function TextComprehensionAnimalsEasy() {
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
