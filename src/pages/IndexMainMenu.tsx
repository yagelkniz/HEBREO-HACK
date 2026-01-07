import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ListCheck, Globe } from "lucide-react";
import type { SetStateAction, Dispatch } from "react";
import menuText from "@/i18n/menu";

interface IndexMainMenuProps {
  lang: "he" | "en";
  setLang: (lang: "he" | "en") => void;
  setShowLinkingWords: (b: boolean) => void;
  setShowPronounsTable: (b: boolean) => void;
  setShowPossessivePronouns: (b: boolean) => void;
  setShowQuestionnaire: (b: boolean) => void;
  setSelectedPractice: (val: null | "verb" | "nounAdj" | "household") => void;
  setSelectedTextComp: Dispatch<SetStateAction<null | "food" | "animals-easy" | "food-order-medium" | "social-media" | "food-levels" | "countries-levels" | "movies-series-levels" | "places-food-easy">>;
  setShowEverydayHebrew: (b: boolean) => void;
  setShowVerbToBePresentation: (b: boolean) => void;
  setShowDaysAndPlacesVocab: (b: boolean) => void;
  setShowQuestionWords: (b: boolean) => void;
}

export default function IndexMainMenu({
  lang,
  setLang,
  setShowLinkingWords,
  setShowPronounsTable,
  setShowPossessivePronouns,
  setShowQuestionnaire,
  setSelectedPractice,
  setSelectedTextComp,
  setShowEverydayHebrew,
  setShowVerbToBePresentation,
  setShowDaysAndPlacesVocab,
  setShowQuestionWords,
}: IndexMainMenuProps) {
  const t = menuText[lang];

  return (
    <div className="flex flex-col gap-8 items-center w-full max-w-md mx-auto">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
          {t.mainTitle}
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLang(lang === "he" ? "en" : "he")}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          {lang === "he" ? "English" : "עברית"}
        </Button>
      </div>
      <div className="grid gap-6 w-full">
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-emerald-100 text-emerald-900 border-emerald-300"
          onClick={() => setShowVerbToBePresentation(true)}
        >
          <span className="text-3xl">📚</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>
            {lang === "he" ? 'הפועל "להיות"' : 'Verb "To Be"'}
          </span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-violet-100 text-violet-900 border-violet-300"
          onClick={() => setShowDaysAndPlacesVocab(true)}
        >
          <span className="text-3xl">📅</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>
            {lang === "he" ? "ימים ומקומות" : "Days and Places"}
          </span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-amber-100 text-amber-900 border-amber-300"
          onClick={() => setShowQuestionWords(true)}
        >
          <span className="text-3xl">❓</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>
            {lang === "he" ? "מילות שאלה" : "Question Words"}
          </span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-red-100 text-red-900 border-red-300"
          onClick={() => setSelectedPractice("household")}
        >
          <span className="text-3xl">🏠</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>
            {lang === "he" ? "כלי בית" : "Household Items"}
          </span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300"
          onClick={() => setShowLinkingWords(true)}
        >
          <span className="text-3xl">🔗</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.linkingWords}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-indigo-100 text-indigo-900 border-indigo-300"
          onClick={() => setShowPronounsTable(true)}
        >
          <span className="text-3xl">👤</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.pronouns}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-teal-100 text-teal-900 border-teal-300"
          onClick={() => setShowPossessivePronouns(true)}
        >
          <span className="text-3xl">🔗</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.possessivePronouns}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-orange-100 text-orange-900 border-orange-300"
          onClick={() => setShowEverydayHebrew(true)}
        >
          <span className="text-3xl">🗣️</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.everydayHebrew}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 text-blue-900 border-blue-200"
          onClick={() => setSelectedPractice("verb")}
        >
          <span className="text-3xl">🕰️</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.verbs}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-pink-100 text-pink-900 border-pink-400"
          onClick={() => setSelectedPractice("nounAdj")}
        >
          <span className="text-3xl">📝</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.nouns}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-purple-100 text-purple-900 border-purple-300"
          onClick={() => setShowQuestionnaire(true)}
        >
          <span className="text-3xl">💬</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.questionnaire}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-yellow-100 text-yellow-900 border-yellow-300"
          onClick={() => setSelectedTextComp("food-levels")}
        >
          <span className="text-3xl">🥗</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.foodComp}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-orange-200 text-orange-900 border-orange-300"
          onClick={() => setSelectedTextComp("food-order-medium")}
        >
          <span className="text-3xl">🍽️</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.foodOrder}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-green-100 text-green-900 border-green-200"
          onClick={() => setSelectedTextComp("animals-easy")}
        >
          <span className="text-3xl">🐾</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.animalsEasy}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-blue-100 text-blue-900 border-blue-300"
          onClick={() => setSelectedTextComp("social-media")}
        >
          <span className="text-3xl">📱</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.socialMedia}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-cyan-100 text-cyan-900 border-cyan-300"
          onClick={() => setSelectedTextComp("countries-levels")}
        >
          <span className="text-3xl">🌏</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.countries}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-blue-50 text-blue-900 border-blue-400"
          onClick={() => setSelectedTextComp("movies-series-levels")}
        >
          <span className="text-3xl">📺</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.movies}</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-6 font-bold text-2xl rounded-xl border-2 shadow hover-scale focus:outline-none bg-sky-100 text-sky-900 border-sky-400"
          onClick={() => setSelectedTextComp("places-food-easy")}
        >
          <span className="text-3xl">🌊</span>
          <span dir={lang === "he" ? "rtl" : "ltr"}>{t.placesFoodEasy}</span>
        </button>
      </div>
    </div>
  );
}
