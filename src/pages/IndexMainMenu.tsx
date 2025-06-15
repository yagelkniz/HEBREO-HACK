import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ListCheck } from "lucide-react";
import type { SetStateAction, Dispatch } from "react";

interface IndexMainMenuProps {
  setShowLinkingWords: (b: boolean) => void;
  setShowPronounsTable: (b: boolean) => void;
  setShowPossessivePronouns: (b: boolean) => void;
  setShowQuestionnaire: (b: boolean) => void;
  setSelectedPractice: (val: null | "verb" | "nounAdj") => void;
  setSelectedTextComp: Dispatch<SetStateAction<null | "food" | "animals-easy" | "food-order-medium" | "social-media" | "food-levels" | "countries-levels" | "movies-series-levels" | "places-food-easy">>;
  setShowEverydayHebrew: (b: boolean) => void;
}

export default function IndexMainMenu({
  setShowLinkingWords,
  setShowPronounsTable,
  setShowPossessivePronouns,
  setShowQuestionnaire,
  setSelectedPractice,
  setSelectedTextComp,
  setShowEverydayHebrew,
}: IndexMainMenuProps) {
  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" dir="rtl">
        איזה תרגול תרצה לתרגל?
      </h1>
      <div className="grid gap-6 w-full">
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300"
          onClick={() => setShowLinkingWords(true)}
        >
          <span className="text-3xl">🔗</span>
          <span dir="rtl">טבלת מילות קישור (קטגוריות ודוגמאות)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-indigo-100 text-indigo-900 border-indigo-300"
          onClick={() => setShowPronounsTable(true)}
        >
          <span className="text-3xl">👤</span>
          <span dir="rtl">טבלת שמות גוף (עברית-אנגלית)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-teal-100 text-teal-900 border-teal-300"
          onClick={() => setShowPossessivePronouns(true)}
        >
          <span className="text-3xl">🔗</span>
          <span dir="rtl">טבלת מילות שייכות (עברית-אנגלית)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-orange-100 text-orange-900 border-orange-300"
          onClick={() => setShowEverydayHebrew(true)}
        >
          <span className="text-3xl">🗣️</span>
          <span dir="rtl">עברית יומיומית – תרגול השלמת מילים</span>
          <ChevronRight className="text-orange-400" size={30} />
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-blue-900 border-blue-200"
          onClick={() => setSelectedPractice("verb")}
        >
          <span className="text-3xl">🕰️</span>
          <span dir="rtl">פעלים - זמן עבר/הווה/עתיד</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-pink-100 text-pink-900 border-pink-400"
          onClick={() => setSelectedPractice("nounAdj")}
        >
          <span className="text-3xl">📝</span>
          <span dir="rtl">שמות עצם + תואר</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-purple-100 text-purple-900 border-purple-300"
          onClick={() => setShowQuestionnaire(true)}
        >
          <span className="text-3xl">💬</span>
          <span dir="rtl">שאלון היכרות</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-yellow-100 text-yellow-900 border-yellow-300"
          onClick={() => setSelectedTextComp("food-levels")}
        >
          <span className="text-3xl">🥗</span>
          <span dir="rtl">הבנת הנקרא - אוכל (שלוש רמות)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-orange-200 text-orange-900 border-orange-300"
          onClick={() => setSelectedTextComp("food-order-medium")}
        >
          <span className="text-3xl">🍽️</span>
          <span dir="rtl">הבנת הנקרא - הזמנת אוכל (בינוני)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-green-100 text-green-900 border-green-200"
          onClick={() => setSelectedTextComp("animals-easy")}
        >
          <span className="text-3xl">🐾</span>
          <span dir="rtl">הבנת הנקרא - חיות (קל)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-blue-100 text-blue-900 border-blue-300"
          onClick={() => setSelectedTextComp("social-media")}
        >
          <span className="text-3xl">📱</span>
          <span dir="rtl">הבנת הנקרא - טלוויזיה ורשתות חברתיות</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-cyan-100 text-cyan-900 border-cyan-300"
          onClick={() => setSelectedTextComp("countries-levels")}
        >
          <span className="text-3xl">🌏</span>
          <span dir="rtl">הבנת הנקרא - מדינות (שלוש רמות)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-blue-50 text-blue-900 border-blue-400"
          onClick={() => setSelectedTextComp("movies-series-levels")}
        >
          <span className="text-3xl">📺</span>
          <span dir="rtl">הבנת הנקרא - טלוויזיה וסדרות (שלוש רמות)</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-sky-100 text-sky-900 border-sky-400"
          onClick={() => setSelectedTextComp("places-food-easy")}
        >
          <span className="text-3xl">🌊</span>
          <span dir="rtl">הבנת הנקרא - בילוי בים ואוכל (קל)</span>
        </button>
      </div>
    </div>
  );
}
