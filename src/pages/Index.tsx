import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PastTenseVerbPractice from "@/components/PastTenseVerbPractice";
import PresentTenseVerbPractice from "@/components/PresentTenseVerbPractice";
import NounAdjectivePractice from "@/components/NounAdjectivePractice";
import TextComprehensionFood from "@/components/TextComprehensionFood";

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
  const [selectedPractice, setSelectedPractice] = useState<null | "verb" | "nounAdj">(null);
  const [selectedTense, setSelectedTense] = useState<null | "past" | "present" | "future">(null);
  const [selectedTextComp, setSelectedTextComp] = useState<null | "food">(null);

  function handleBack() {
    if (selectedTextComp) setSelectedTextComp(null);
    else if (selectedTense) setSelectedTense(null);
    else setSelectedPractice(null);
  }

  if (selectedTextComp) {
    return (
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleBack}>⬅ חזרה</Button>
        </div>
        {selectedTextComp==="food" && <TextComprehensionFood />}
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
            {/* כפתור חדש לתרגול הבנת הנקרא - אוכל */}
            <button
              className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow transition hover:scale-105 focus:outline-none bg-orange-100 text-orange-900 border-orange-200"
              onClick={() => setSelectedTextComp("food")}
            >
              <span className="text-3xl">🍽️</span>
              <span dir="rtl">הבנת הנקרא - אוכל</span>
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
