import React, { useState } from "react";

type Question = {
  textBefore: string;
  blank?: string;
  textAfter?: string;
  options: string[];
  correct: string;
  translation: string;
};

const questions: Question[] = [
  // 1-5 (הקיימים)
  {
    textBefore: "אתמול אני",
    blank: "______",
    textAfter: "תפוח.",
    options: ["אכלתי", "אוכל", "יאכל", "אכל"],
    correct: "אכלתי",
    translation: "Yesterday I ______ an apple.",
  },
  {
    textBefore: "במסיבה היא",
    blank: "______",
    textAfter: "מיץ תפוזים.",
    options: ["שתתה", "שותה", "שתו", "תשתה"],
    correct: "שתתה",
    translation: "At the party she ______ orange juice.",
  },
  {
    textBefore: "ביום שישי הם",
    blank: "______",
    textAfter: "לחיפה.",
    options: ["נסעו", "נוסעים", "נוסע", "ייסעו"],
    correct: "נסעו",
    translation: "On Friday they ______ to Haifa.",
  },
  {
    textBefore: "בשבוע שעבר היא",
    blank: "______",
    textAfter: "מכתב ארוך.",
    options: ["כתבה", "כותבת", "כתבו", "תכתוב"],
    correct: "כתבה",
    translation: "Last week she ______ a long letter.",
  },
  {
    textBefore: "אתמול אתה",
    blank: "______",
    textAfter: "את הדלת.",
    options: ["סגרת", "סוגר", "תסגור", "סגרו"],
    correct: "סגרת",
    translation: "Yesterday you ______ the door.",
  },
  // 6-50 (חדשים)
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "בבית כל סוף שבוע.",
    options: ["נשארו", "נשאר", "נשארה", "יישארו"],
    correct: "נשארו",
    translation: "They ______ at home every weekend.",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "חולצה חדשה אתמול.",
    options: ["לבשה", "לובשת", "ילבשו", "לבשו"],
    correct: "לבשה",
    translation: "She ______ a new shirt yesterday.",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "כדורסל בפארק.",
    options: ["שיחקנו", "משחקים", "ישחק", "שיחק"],
    correct: "שיחקנו",
    translation: "We ______ basketball in the park.",
  },
  {
    textBefore: "אתמול הוא",
    blank: "______",
    textAfter: "לעבודה מאוחר.",
    options: ["הגיע", "מגיע", "יגיע", "הגיעו"],
    correct: "הגיע",
    translation: "Yesterday he ______ to work late.",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "את הבית לבן.",
    options: ["צבעו", "צובע", "צבעה", "יצבעו"],
    correct: "צבעו",
    translation: "They ______ the house white.",
  },
  {
    textBefore: "ביום חמישי אני",
    blank: "______",
    textAfter: "עם חברים.",
    options: ["נפגשתי", "נפגש", "נפגשה", "ייפגש"],
    correct: "נפגשתי",
    translation: "On Thursday I ______ with friends.",
  },
  {
    textBefore: "את",
    blank: "______",
    textAfter: "ספר מעניין בקיץ.",
    options: ["קראת", "קוראת", "קראו", "תקראי"],
    correct: "קראת",
    translation: "You ______ an interesting book in the summer.",
  },
  {
    textBefore: "הילדים",
    blank: "______",
    textAfter: "עוגות לאמא.",
    options: ["אפינו", "אופים", "אפית", "יאפו"],
    correct: "אפינו",
    translation: "The children ______ cakes for Mom.",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "את החלון בבוקר.",
    options: ["פתח", "פותח", "פתחו", "יפתח"],
    correct: "פתח",
    translation: "He ______ the window in the morning.",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "למוזיאון.",
    options: ["נסענו", "נוסעים", "נוסעות", "ייסע"],
    correct: "נסענו",
    translation: "We ______ to the museum.",
  },
  {
    textBefore: "הן",
    blank: "______",
    textAfter: "משהו חדש אתמול.",
    options: ["למדו", "לומדות", "ילמדו", "למדה"],
    correct: "למדו",
    translation: "They ______ something new yesterday.",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "טלפון לאמא.",
    options: ["התקשר", "מתקשר", "יתקשר", "התקשרו"],
    correct: "התקשר",
    translation: "He ______ a phone to Mom.",
  },
  {
    textBefore: "אתה",
    blank: "______",
    textAfter: "את השיעורים אתמול?",
    options: ["סיימת", "מסיים", "יסיים", "סיימו"],
    correct: "סיימת",
    translation: "Did you ______ the lessons yesterday?",
  },
  {
    textBefore: "אני",
    blank: "______",
    textAfter: "את הדלת.",
    options: ["סגרתי", "סוגר", "סגרו", "אסגור"],
    correct: "סגרתי",
    translation: "I ______ the door.",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "כסף בקניון.",
    options: ["שילם", "משלם", "ישלם", "שילמו"],
    correct: "שילם",
    translation: "He ______ money at the mall.",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "את הסל כביסה.",
    options: ["ניקינו", "מנקים", "ינקו", "ניקית"],
    correct: "ניקינו",
    translation: "We ______ the laundry basket.",
  },
  {
    textBefore: "הילדה",
    blank: "______",
    textAfter: "צבעים יפים.",
    options: ["ציירה", "מציירת", "צייר", "תצייר"],
    correct: "ציירה",
    translation: "The girl ______ beautiful colors.",
  },
  {
    textBefore: "הוריי",
    blank: "______",
    textAfter: "מכונית חדשה.",
    options: ["קנו", "קונים", "קנתה", "יקנו"],
    correct: "קנו",
    translation: "My parents ______ a new car.",
  },
  {
    textBefore: "אתמול אתם",
    blank: "______",
    textAfter: "טלוויזיה?",
    options: ["צפיתם", "צופים", "יצפו", "צפינו"],
    correct: "צפיתם",
    translation: "Did you ______ television yesterday?",
  },
  {
    textBefore: "אביב",
    blank: "______",
    textAfter: "בערב.",
    options: ["נרדם", "נרדם", "מרדם", "ירדם"],
    correct: "נרדם",
    translation: "Aviv ______ in the evening.",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "על השולחן.",
    options: ["שמה", "שם", "שמו", "תשים"],
    correct: "שמה",
    translation: "She ______ on the table.",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "בגן החיות.",
    options: ["ביקרו", "מבקרים", "יבקרו", "ביקר"],
    correct: "ביקרו",
    translation: "They ______ at the zoo.",
  },
  {
    textBefore: "הן",
    blank: "______",
    textAfter: "מוזיקה.",
    options: ["שמעו", "שומעות", "ישמעו", "שמע"],
    correct: "שמעו",
    translation: "They ______ music.",
  },
  {
    textBefore: "דני",
    blank: "______",
    textAfter: "בית חדש.",
    options: ["בנה", "בונה", "יבנה", "בנו"],
    correct: "בנה",
    translation: "Danny ______ a new house.",
  },
  {
    textBefore: "הילדים",
    blank: "______",
    textAfter: "לגלוש בים.",
    options: ["למדו", "לומדים", "ילמדו", "למד"],
    correct: "למדו",
    translation: "The children ______ to surf in the sea.",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "לנו מתנה.",
    options: ["הביא", "מביא", "יביא", "הביאו"],
    correct: "הביא",
    translation: "He ______ us a gift.",
  },
  {
    textBefore: "את",
    blank: "______",
    textAfter: "לחברה שלך?",
    options: ["שלחת", "שולחת", "ישלח", "שלחו"],
    correct: "שלחת",
    translation: "Did you ______ to your friend?",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "שיעורי בית.",
    options: ["עשו", "עושים", "יעשו", "עשה"],
    correct: "עשו",
    translation: "They ______ homework.",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "מהחדר בשקט.",
    options: ["יצאה", "יוצאת", "יצא", "תצא"],
    correct: "יצאה",
    translation: "She ______ from the room quietly.",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "לאכול בחוץ.",
    options: ["יצאנו", "יוצאים", "נצא", "יצאה"],
    correct: "יצאנו",
    translation: "We ______ to eat out.",
  },
  {
    textBefore: "אתם",
    blank: "______",
    textAfter: "זר פרחים לאמא?",
    options: ["קניתם", "קונים", "תקנו", "קנה"],
    correct: "קניתם",
    translation: "Did you ______ a bouquet of flowers for Mom?",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "חברה חדשה.",
    options: ["פגשה", "פוגשת", "פגשו", "תפגוש"],
    correct: "פגשה",
    translation: "She ______ a new friend.",
  },
  {
    textBefore: "אתה",
    blank: "______",
    textAfter: "בספר החדש?",
    options: ["התעניינת", "מתעניין", "יתעניין", "התעניינה"],
    correct: "התעניינת",
    translation: "Were you ______ in the new book?",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "המבחן בהצלחה.",
    options: ["עברו", "עוברים", "יעברו", "עבר"],
    correct: "עברו",
    translation: "They ______ the test successfully.",
  },
  {
    textBefore: "אני",
    blank: "______",
    textAfter: "מכתב לסבתא.",
    options: ["כתבתי", "כותב", "יכתוב", "כתבת"],
    correct: "כתבתי",
    translation: "I ______ a letter to Grandma.",
  },
  {
    textBefore: "אתמול הילדה",
    blank: "______",
    textAfter: "על האופניים.",
    options: ["רכבה", "רוכבת", "יירכבו", "רכב"],
    correct: "רכבה",
    translation: "Yesterday the girl ______ on the bicycle.",
  },
  {
    textBefore: "בשנה שעברה הם",
    blank: "______",
    textAfter: "לחו\"ל.",
    options: ["טסו", "טסים", "יטוסו", "טס"],
    correct: "טסו",
    translation: "Last year they ______ abroad.",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "את הכוס.",
    options: ["שבר", "שובר", "ישבור", "שברו"],
    correct: "שבר",
    translation: "He ______ the glass.",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "עם אחותה.",
    options: ["שיחקה", "משחקת", "ישחקו", "שיחקו"],
    correct: "שיחקה",
    translation: "She ______ with her sister.",
  },
  {
    textBefore: "אנחנו",
    blank: "______",
    textAfter: "את החדר.",
    options: ["סידרנו", "מסדרים", "יסדרו", "סידרה"],
    correct: "סידרנו",
    translation: "We ______ the room.",
  },
  {
    textBefore: "הילד",
    blank: "______",
    textAfter: "לבד הביתה.",
    options: ["חזר", "חוזר", "יחזור", "חזרו"],
    correct: "חזר",
    translation: "The boy ______ home alone.",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "את המכנסיים.",
    options: ["לבשה", "לובשת", "לבשו", "תלבש"],
    correct: "לבשה",
    translation: "She ______ the pants.",
  },
  {
    textBefore: "דניאל",
    blank: "______",
    textAfter: "על החידה.",
    options: ["חשב", "חושב", "יחשוב", "חשבה"],
    correct: "חשב",
    translation: "Daniel ______ about the riddle.",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "את הכסף.",
    options: ["מצאו", "מוצאים", "ימצאו", "מצא"],
    correct: "מצאו",
    translation: "They ______ the money.",
  },
  {
    textBefore: "היא",
    blank: "______",
    textAfter: "עוגה טעימה.",
    options: ["אפתה", "אופה", "אפוי", "אפו"],
    correct: "אפתה",
    translation: "She ______ a delicious cake.",
  },
  {
    textBefore: "ההורים",
    blank: "______",
    textAfter: "לילדים מתנות.",
    options: ["קנו", "קונים", "יקנו", "קנה"],
    correct: "קנו",
    translation: "The parents ______ gifts for the children.",
  },
  {
    textBefore: "רוית",
    blank: "______",
    textAfter: "את השולחן.",
    options: ["ניקתה", "מנקה", "ניקו", "תנקה"],
    correct: "ניקתה",
    translation: "Ravit ______ the table.",
  },
  {
    textBefore: "הם",
    blank: "______",
    textAfter: "לסרט עם חברים.",
    options: ["הלכו", "הולכים", "ילכו", "הלך"],
    correct: "הלכו",
    translation: "They ______ to the movie with friends.",
  },
  {
    textBefore: "אתה",
    blank: "______",
    textAfter: "על השאלה הזאת?",
    options: ["חשבת", "חושב", "יחשוב", "חשבו"],
    correct: "חשבת",
    translation: "Did you ______ about this question?",
  },
  {
    textBefore: "הוא",
    blank: "______",
    textAfter: "הרבה מים אחרי הריצה.",
    options: ["שתה", "שותה", "שתו", "ישתה"],
    correct: "שתה",
    translation: "He ______ a lot of water after the run.",
  },
  {
    textBefore: "הילדים",
    blank: "______",
    textAfter: "את הגינה.",
    options: ["ניקו", "מנקים", "ינקו", "ניקתה"],
    correct: "ניקו",
    translation: "The children ______ the garden.",
  },
  {
    textBefore: "אמא",
    blank: "______",
    textAfter: "עוגה ליום הולדת.",
    options: ["אפיתה", "אופה", "יאפה", "אפה"],
    correct: "אפיתה",
    translation: "Mom ______ a cake for the birthday.",
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
          {/* תרגום באנגלית */}
          <div className="text-sm text-gray-500 italic mb-2 text-center" dir="ltr">
            ({q.translation})
          </div>
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
