import React, { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import PastTenseVerbPractice from "@/components/PastTenseVerbPractice";
import PresentTenseVerbPractice from "@/components/PresentTenseVerbPractice";
import NounAdjectivePractice from "@/components/NounAdjectivePractice";
import TextComprehensionFood from "@/components/TextComprehensionFood";
import TextComprehensionAnimalsEasy from "@/components/TextComprehensionAnimalsEasy";
import TextComprehensionFoodOrderMedium from "@/components/TextComprehensionFoodOrderMedium";
import TextComprehensionSocialMedia from "@/components/TextComprehensionSocialMedia";
import TextComprehensionCountriesLevels from "@/components/TextComprehensionCountriesLevels";

// Add lazy import for food levels
const LazyTextComprehensionFoodLevels = React.lazy(() =>
  import("@/components/TextComprehensionFoodLevels")
);
const LazyTextComprehensionCountriesLevels = React.lazy(() =>
  import("@/components/TextComprehensionCountriesLevels")
);

const tenseOptions = [
  {
    label: "עבר",
    color: "bg-blue-100 text-blue-900 border-blue-400",
    value: "past",
    emoji: "⏪",
  },
  {
    label: "הווה",
    color: "bg-green-100 text-green-900 border-green-400",
    value: "present",
    emoji: "⏺️",
  },
  {
    label: "עתיד",
    color: "bg-yellow-100 text-yellow-900 border-yellow-400",
    value: "future",
    emoji: "⏩",
  },
];

const practiceOptions = [
  {
    label: "פעלים - זמן עבר/הווה/עתיד",
    value: "verb",
    color: "bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-blue-900 border-blue-200",
    emoji: "🕰️"
  },
  {
    label: "שמות עצם + תואר",
    value: "nounAdj",
    color: "bg-pink-100 text-pink-900 border-pink-400",
    emoji: "📝"
  }
];

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedPractice, setSelectedPractice] = useState<null | "verb" | "nounAdj">(null);
  const [selectedTense, setSelectedTense] = useState<null | "past" | "present" | "future">(null);
  const [selectedTextComp, setSelectedTextComp] = useState<
    null | "food" | "animals-easy" | "food-order-medium" | "social-media" | "food-levels" | "countries-levels"
  >(null);

  function handleBack() {
    if (selectedTextComp) setSelectedTextComp(null);
    else if (selectedTense) setSelectedTense(null);
    else setSelectedPractice(null);
  }

  // מסך פתיחה – קודם מוצג, ורק אחרי לחיצה יוסתר
  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-900/80 px-6 py-10 max-w-md w-full flex flex-col items-center gap-7 border-2 border-blue-100">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-0" dir="rtl">
            הגעתם לאפליקציה עברית עם עילי
          </h1>
          <div className="text-xl text-slate-700 font-semibold" dir="rtl">
            מתרגלים, לומדים ונהנים.<br />
            והכל בחינם!
          </div>
          <div className="w-full h-px bg-gradient-to-r from-blue-200 via-purple-200 to-yellow-200 my-2" />
          <div className="text-lg text-gray-700 text-center" dir="ltr">
            Welcome to <span className="font-bold text-blue-800">'Hebrew with Eli'</span> –<br />
            learn, practice and enjoy!<br />
            And it's all <span className="font-bold">free</span>!
          </div>
          <Button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl py-3"
            onClick={() => setShowWelcome(false)}
          >
            לתפריט הראשי
          </Button>
        </div>
      </div>
    );
  }

  if (selectedTextComp) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
        </div>
        {selectedTextComp === "food" && <TextComprehensionFood />}
        {selectedTextComp === "animals-easy" && <TextComprehensionAnimalsEasy />}
        {selectedTextComp === "food-order-medium" && (
          <TextComprehensionFoodOrderMedium />
        )}
        {selectedTextComp === "social-media" && <TextComprehensionSocialMedia />}
        {selectedTextComp === "food-levels" && (
          <Suspense fallback={<div>טוען...</div>}>
            <LazyTextComprehensionFoodLevels />
          </Suspense>
        )}
        {selectedTextComp === "countries-levels" && (
          <Suspense fallback={<div>טוען...</div>}>
            <LazyTextComprehensionCountriesLevels />
          </Suspense>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {!selectedPractice && (
        <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" dir="rtl">
            איזה תרגול תרצה לתרגל?
          </h1>
          <div className="grid gap-6 w-full">
            {practiceOptions.map((option) => (
              <button
                key={option.value}
                className={`w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none ${option.color}`}
                onClick={() => setSelectedPractice(option.value as any)}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span dir="rtl">{option.label}</span>
              </button>
            ))}
            {/* כפתור חדש לתרגול הבנת הנקרא - אוכל (בשלוש רמות) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-yellow-100 text-yellow-900 border-yellow-300"
              onClick={() => setSelectedTextComp("food-levels")}
            >
              <span className="text-3xl">🥗</span>
              <span dir="rtl">הבנת הנקרא - אוכל (שלוש רמות)</span>
            </button>
            {/* כפתור חדש לתרגול הבנת הנקרא - אוכל (בינוני) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-orange-200 text-orange-900 border-orange-300"
              onClick={() => setSelectedTextComp("food-order-medium")}
            >
              <span className="text-3xl">🍽️</span>
              <span dir="rtl">הבנת הנקרא - הזמנת אוכל (בינוני)</span>
            </button>
            {/* כפתור חדש לתרגול הבנת הנקרא - חיות (קל) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-green-100 text-green-900 border-green-200"
              onClick={() => setSelectedTextComp("animals-easy")}
            >
              <span className="text-3xl">🐾</span>
              <span dir="rtl">הבנת הנקרא - חיות (קל)</span>
            </button>
            {/* כפתור חדש לתרגול הבנת הנקרא - טלוויזיה ורשתות חברתיות */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-blue-100 text-blue-900 border-blue-300"
              onClick={() => setSelectedTextComp("social-media")}
            >
              <span className="text-3xl">📱</span>
              <span dir="rtl">הבנת הנקרא - טלוויזיה ורשתות חברתיות</span>
            </button>
            {/* כפתור חדש: מדינות (שלוש רמות) */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-cyan-100 text-cyan-900 border-cyan-300"
              onClick={() => setSelectedTextComp("countries-levels")}
            >
              <span className="text-3xl">🌏</span>
              <span dir="rtl">הבנת הנקרא - מדינות (שלוש רמות)</span>
            </button>
          </div>
        </div>
      )}
      {selectedPractice === "verb" && !selectedTense && (
        <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" dir="rtl">
            איזה זמן תרצה לתרגל?
          </h1>
          <div className="grid gap-6 w-full">
            {tenseOptions.map((option) => (
              <button
                key={option.value}
                className={`w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none ${option.color}`}
                onClick={() => setSelectedTense(option.value as any)}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span dir="rtl">{option.label}</span>
              </button>
            ))}
          </div>
          <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
        </div>
      )}
      {selectedPractice === "verb" && selectedTense === "present" && (
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
          </div>
          <PresentTenseVerbPractice />
        </div>
      )}
      {selectedPractice === "verb" && selectedTense === "past" && (
        <div className="w-full">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
          </div>
          <PastTenseVerbPractice />
        </div>
      )}
      {selectedPractice === "verb" && selectedTense === "future" && (
        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex justify-end w-full mb-4">
            <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
          </div>
          <span className="text-3xl mt-10 mb-4">⏩</span>
          <div className="font-bold text-xl text-yellow-700" dir="rtl">
            תרגול עתיד יתווסף בקרוב!
          </div>
        </div>
      )}
      {selectedPractice === "nounAdj" && (
        <div className="w-full">
          <NounAdjectivePractice onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default Index;
