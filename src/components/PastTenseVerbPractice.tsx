
import React, { useState } from "react";

type Question = {
  textBefore: string;
  blank?: string;
  textAfter?: string;
  options: string[];
  correct: string;
};

const questions: Question[] = [
  // 1-5 (הקיימים)
  {
    textBefore: "אתמול אני",
    blank: "______",
    textAfter: "תפוח.",
    options: ["אכלתי", "אוכל", "יאכל", "אכל"],
    correct: "אכלתי",
  },
  {
    textBefore: "במסיבה היא",
    blank: "______",
    textAfter: "מיץ תפוזים.",
    options: ["שתתה", "שותה", "שתו", "תשתה"],
    correct: "שתתה",
  },
  {
    textBefore: "ביום שישי הם",
    blank: "______",
    textAfter: "לחיפה.",
    options: ["נסעו", "נוסעים", "נוסע", "ייסעו"],
    correct: "נסעו",
  },
  {
    textBefore: "בשבוע שעבר היא",
    blank: "______",
    textAfter: "מכתב ארוך.",
    options: ["כתבה", "כותבת", "כתבו", "תכתוב"],
    correct: "כתבה",
  },
  {
    textBefore: "אתמול אתה",
    blank: "______",
    textAfter: "את הדלת.",
    options: ["סגרת", "סוגר", "תסגור", "סגרו"],
    correct: "סגרת",
  },
  // 6-50 (חדשים)
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "בבית כל סוף שבוע.",
    options: ["נשארו", "נשאר", "נשארה", "יישארו"],
    correct: "נשארו",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "חולצה חדשה אתמול.",
    options: ["לבשה", "לובשת", "ילבשו", "לבשו"],
    correct: "לבשה",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "כדורסל בפארק.",
    options: ["שיחקנו", "משחקים", "ישחק", "שיחק"],
    correct: "שיחקנו",
  },
  {
    textBefore: "אתמול הוא",
    blank: "______",
    textAfter: "לעבודה מאוחר.",
    options: ["הגיע", "מגיע", "יגיע", "הגיעו"],
    correct: "הגיע",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "את הבית לבן.",
    options: ["צבעו", "צובע", "צבעה", "יצבעו"],
    correct: "צבעו",
  },
  {
    textBefore: "ביום חמישי אני",
    blank: "______",
    textAfter: "עם חברים.",
    options: ["נפגשתי", "נפגש", "נפגשה", "ייפגש"],
    correct: "נפגשתי",
  },
  {
    textBefore: "את",
    blank: "______",
    textAfter: "ספר מעניין בקיץ.",
    options: ["קראת", "קוראת", "קראו", "תקראי"],
    correct: "קראת",
  },
  {
    textBefore: "הילדים",
    blank: "______",
    textAfter: "עוגות לאמא.",
    options: ["אפינו", "אופים", "אפית", "יאפו"],
    correct: "אפינו",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "את החלון בבוקר.",
    options: ["פתח", "פותח", "פתחו", "יפתח"],
    correct: "פתח",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "למוזיאון.",
    options: ["נסענו", "נוסעים", "נוסעות", "ייסע"],
    correct: "נסענו",
  },
  {
    textBefore: "הן",
    blank: "______",
    textAfter: "משהו חדש אתמול.",
    options: ["למדו", "לומדות", "ילמדו", "למדה"],
    correct: "למדו",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "טלפון לאמא.",
    options: ["התקשר", "מתקשר", "יתקשר", "התקשרו"],
    correct: "התקשר",
  },
  {
    textBefore: "אתה",
    blank: "______",
    textAfter: "את השיעורים אתמול?",
    options: ["סיימת", "מסיים", "יסיים", "סיימו"],
    correct: "סיימת",
  },
  {
    textBefore: "אני",
    blank: "______",
    textAfter: "את הדלת.",
    options: ["סגרתי", "סוגר", "סגרו", "אסגור"],
    correct: "סגרתי",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "כסף בקניון.",
    options: ["שילם", "משלם", "ישלם", "שילמו"],
    correct: "שילם",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "את הסל כביסה.",
    options: ["ניקינו", "מנקים", "ינקו", "ניקית"],
    correct: "ניקינו",
  },
  {
    textBefore: "הילדה",
    blank: "______",
    textAfter: "צבעים יפים.",
    options: ["ציירה", "מציירת", "צייר", "תצייר"],
    correct: "ציירה",
  },
  {
    textBefore: "הוריי",
    blank: "______",
    textAfter: "מכונית חדשה.",
    options: ["קנו", "קונים", "קנתה", "יקנו"],
    correct: "קנו",
  },
  {
    textBefore: "אתמול אתם",
    blank: "______",
    textAfter: "טלוויזיה?",
    options: ["צפיתם", "צופים", "יצפו", "צפינו"],
    correct: "צפיתם",
  },
  {
    textBefore: "אביב",
    blank: "______",
    textAfter: "בערב.",
    options: ["נרדם", "נרדם", "מרדם", "ירדם"],
    correct: "נרדם",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "על השולחן.",
    options: ["שמה", "שם", "שמו", "תשים"],
    correct: "שמה",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "בגן החיות.",
    options: ["ביקרו", "מבקרים", "יבקרו", "ביקר"],
    correct: "ביקרו",
  },
  {
    textBefore: "הן",
    blank: "______",
    textAfter: "מוזיקה.",
    options: ["שמעו", "שומעות", "ישמעו", "שמע"],
    correct: "שמעו",
  },
  {
    textBefore: "דני",
    blank: "______",
    textAfter: "בית חדש.",
    options: ["בנה", "בונה", "יבנה", "בנו"],
    correct: "בנה",
  },
  {
    textBefore: "הילדים",
    blank: "______",
    textAfter: "לגלוש בים.",
    options: ["למדו", "לומדים", "ילמדו", "למד"],
    correct: "למדו",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "לנו מתנה.",
    options: ["הביא", "מביא", "יביא", "הביאו"],
    correct: "הביא",
  },
  {
    textBefore: "את",
    blank: "______",
    textAfter: "לחברה שלך?",
    options: ["שלחת", "שולחת", "ישלח", "שלחו"],
    correct: "שלחת",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "שיעורי בית.",
    options: ["עשו", "עושים", "יעשו", "עשה"],
    correct: "עשו",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "מהחדר בשקט.",
    options: ["יצאה", "יוצאת", "יצא", "תצא"],
    correct: "יצאה",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "לאכול בחוץ.",
    options: ["יצאנו", "יוצאים", "נצא", "יצאה"],
    correct: "יצאנו",
  },
  {
    textBefore: "אתם",
    blank: "______",
    textAfter: "זר פרחים לאמא?",
    options: ["קניתם", "קונים", "תקנו", "קנה"],
    correct: "קניתם",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "חברה חדשה.",
    options: ["פגשה", "פוגשת", "פגשו", "תפגוש"],
    correct: "פגשה",
  },
  {
    textBefore: "אתה",
    blank: "______",
    textAfter: "בספר החדש?",
    options: ["התעניינת", "מתעניין", "יתעניין", "התעניינה"],
    correct: "התעניינת",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "המבחן בהצלחה.",
    options: ["עברו", "עוברים", "יעברו", "עבר"],
    correct: "עברו",
  },
  {
    textBefore: "אני",
    blank: "______",
    textAfter: "מכתב לסבתא.",
    options: ["כתבתי", "כותב", "יכתוב", "כתבת"],
    correct: "כתבתי",
  },
  {
    textBefore: "אתמול הילדה",
    blank: "______",
    textAfter: "על האופניים.",
    options: ["רכבה", "רוכבת", "יירכבו", "רכב"],
    correct: "רכבה",
  },
  {
    textBefore: "בשנה שעברה הם",
    blank: "______",
    textAfter: "לחו\"ל.",
    options: ["טסו", "טסים", "יטוסו", "טס"],
    correct: "טסו",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "את הכוס.",
    options: ["שבר", "שובר", "ישבור", "שברו"],
    correct: "שבר",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "עם אחותה.",
    options: ["שיחקה", "משחקת", "ישחקו", "שיחקו"],
    correct: "שיחקה",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "את החדר.",
    options: ["סידרנו", "מסדרים", "יסדרו", "סידרה"],
    correct: "סידרנו",
  },
  {
    textBefore: "הילד",
    blank: "______",
    textAfter: "לבד הביתה.",
    options: ["חזר", "חוזר", "יחזור", "חזרו"],
    correct: "חזר",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "את המכנסיים.",
    options: ["לבשה", "לובשת", "לבשו", "תלבש"],
    correct: "לבשה",
  },
  {
    textBefore: "דניאל",
    blank: "______",
    textAfter: "על החידה.",
    options: ["חשב", "חושב", "יחשוב", "חשבה"],
    correct: "חשב",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "את הכסף.",
    options: ["מצאו", "מוצאים", "ימצאו", "מצא"],
    correct: "מצאו",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "עוגה טעימה.",
    options: ["אפתה", "אופה", "אפוי", "אפו"],
    correct: "אפתה",
  },
  {
    textBefore: "ההורים",
    blank: "______",
    textAfter: "לילדים מתנות.",
    options: ["קנו", "קונים", "יקנו", "קנה"],
    correct: "קנו",
  },
  {
    textBefore: "רוית",
    blank: "______",
    textAfter: "את השולחן.",
    options: ["ניקתה", "מנקה", "ניקו", "תנקה"],
    correct: "ניקתה",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "לסרט עם חברים.",
    options: ["הלכו", "הולכים", "ילכו", "הלך"],
    correct: "הלכו",
  },
  {
    textBefore: "אתה",
    blank: "______",
    textAfter: "על השאלה הזאת?",
    options: ["חשבת", "חושב", "יחשוב", "חשבו"],
    correct: "חשבת",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "הרבה מים אחרי הריצה.",
    options: ["שתה", "שותה", "שתו", "ישתה"],
    correct: "שתה",
  },
  {
    textBefore: "הילדים",
    blank: "______",
    textAfter: "את הגינה.",
    options: ["ניקו", "מנקים", "ינקו", "ניקתה"],
    correct: "ניקו",
  },
  {
    textBefore: "אמא",
    blank: "______",
    textAfter: "עוגה ליום הולדת.",
    options: ["אפיתה", "אופה", "יאפה", "אפה"],
    correct: "אפיתה",
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
