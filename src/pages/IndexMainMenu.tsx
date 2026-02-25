import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
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
  setShowOddOneOut: (b: boolean) => void;
  setShowEmotions: (b: boolean) => void;
  setShowLinkingWordsLevels: (b: boolean) => void;
  setShowVerbMemoryGame: (b: boolean) => void;
  setShowColorsAndFruits: (b: boolean) => void;
  setShowVerbPatternsMenu: (b: boolean) => void;
  setShowListeningPractice: (b: boolean) => void;
  setShowConversationRoulette: (b: boolean) => void;
  setShowSentenceOrder: (b: boolean) => void;
  setShowPrepositionSuffix: (b: boolean) => void;
  setShowHebrewSlang: (b: boolean) => void;
  setShowRolePlay: (b: boolean) => void;
  setShowConnectorCorrection: (b: boolean) => void;
}

interface MenuItemProps {
  emoji: string;
  label: string;
  onClick: () => void;
  colorClass: string;
  lang: "he" | "en";
}

function MenuItem({ emoji, label, onClick, colorClass, lang }: MenuItemProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center gap-2 p-4 font-bold text-base rounded-xl border-2 shadow hover:scale-105 transition-transform focus:outline-none ${colorClass}`}
      onClick={onClick}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-center leading-tight text-sm" dir={lang === "he" ? "rtl" : "ltr"}>
        {label}
      </span>
    </button>
  );
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
  setShowOddOneOut,
  setShowEmotions,
  setShowLinkingWordsLevels,
  setShowVerbMemoryGame,
  setShowColorsAndFruits,
  setShowVerbPatternsMenu,
  setShowListeningPractice,
  setShowConversationRoulette,
  setShowSentenceOrder,
  setShowPrepositionSuffix,
  setShowHebrewSlang,
  setShowRolePlay,
  setShowConnectorCorrection,
}: IndexMainMenuProps) {
  const t = menuText[lang];

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-primary" dir={lang === "he" ? "rtl" : "ltr"}>
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

      {/* לימוד בסיסי */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-muted-foreground mb-3" dir={lang === "he" ? "rtl" : "ltr"}>
          {lang === "he" ? "📖 לימוד בסיסי" : "📖 Basic Learning"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MenuItem
            emoji="📚"
            label={lang === "he" ? 'הפועל "להיות"' : 'Verb "To Be"'}
            onClick={() => setShowVerbToBePresentation(true)}
            colorClass="bg-emerald-100 text-emerald-900 border-emerald-300"
            lang={lang}
          />
          <MenuItem
            emoji="📅"
            label={lang === "he" ? "ימים ומקומות" : "Days & Places"}
            onClick={() => setShowDaysAndPlacesVocab(true)}
            colorClass="bg-violet-100 text-violet-900 border-violet-300"
            lang={lang}
          />
          <MenuItem
            emoji="❓"
            label={lang === "he" ? "מילות שאלה" : "Question Words"}
            onClick={() => setShowQuestionWords(true)}
            colorClass="bg-amber-100 text-amber-900 border-amber-300"
            lang={lang}
          />
          <MenuItem
            emoji="👤"
            label={t.pronouns}
            onClick={() => setShowPronounsTable(true)}
            colorClass="bg-indigo-100 text-indigo-900 border-indigo-300"
            lang={lang}
          />
          <MenuItem
            emoji="🔗"
            label={t.possessivePronouns}
            onClick={() => setShowPossessivePronouns(true)}
            colorClass="bg-teal-100 text-teal-900 border-teal-300"
            lang={lang}
          />
          <MenuItem
            emoji="🔗"
            label={t.linkingWords}
            onClick={() => setShowLinkingWords(true)}
            colorClass="bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300"
            lang={lang}
          />
          <MenuItem
            emoji="🔤"
            label={lang === "he" ? "מילות יחס + כינויים" : "Preposition Suffixes"}
            onClick={() => setShowPrepositionSuffix(true)}
            colorClass="bg-gradient-to-br from-sky-100 to-violet-100 text-sky-900 border-sky-300"
            lang={lang}
          />
        </div>
      </div>

      {/* תרגול אוצר מילים */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-muted-foreground mb-3" dir={lang === "he" ? "rtl" : "ltr"}>
          {lang === "he" ? "🎯 תרגול אוצר מילים" : "🎯 Vocabulary Practice"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MenuItem
            emoji="😊"
            label={lang === "he" ? "רגשות" : "Emotions"}
            onClick={() => setShowEmotions(true)}
            colorClass="bg-pink-100 text-pink-900 border-pink-300"
            lang={lang}
          />
          <MenuItem
            emoji="🔗"
            label={lang === "he" ? "מילות קישור" : "Linking Words"}
            onClick={() => setShowLinkingWordsLevels(true)}
            colorClass="bg-cyan-100 text-cyan-900 border-cyan-300"
            lang={lang}
          />
          <MenuItem
            emoji="🏠"
            label={lang === "he" ? "כלי בית" : "Household"}
            onClick={() => setSelectedPractice("household")}
            colorClass="bg-red-100 text-red-900 border-red-300"
            lang={lang}
          />
          <MenuItem
            emoji="🗣️"
            label={t.everydayHebrew}
            onClick={() => setShowEverydayHebrew(true)}
            colorClass="bg-orange-100 text-orange-900 border-orange-300"
            lang={lang}
          />
          <MenuItem
            emoji="🎨"
            label={lang === "he" ? "צבעים ופירות" : "Colors & Fruits"}
            onClick={() => setShowColorsAndFruits(true)}
            colorClass="bg-gradient-to-br from-pink-100 to-green-100 text-pink-900 border-pink-300"
            lang={lang}
          />
        </div>
      </div>

      {/* משחקים ותרגול */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-muted-foreground mb-3" dir={lang === "he" ? "rtl" : "ltr"}>
          {lang === "he" ? "🎮 משחקים ותרגול" : "🎮 Games & Practice"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MenuItem
            emoji="🧠"
            label={lang === "he" ? "משחק זיכרון" : "Memory Game"}
            onClick={() => setShowVerbMemoryGame(true)}
            colorClass="bg-purple-100 text-purple-900 border-purple-300"
            lang={lang}
          />
          <MenuItem
            emoji="🎯"
            label={lang === "he" ? "מה יוצא דופן?" : "Odd One Out"}
            onClick={() => setShowOddOneOut(true)}
            colorClass="bg-rose-100 text-rose-900 border-rose-300"
            lang={lang}
          />
          <MenuItem
            emoji="🕰️"
            label={t.verbs}
            onClick={() => setSelectedPractice("verb")}
            colorClass="bg-blue-100 text-blue-900 border-blue-200"
            lang={lang}
          />
          <MenuItem
            emoji="📝"
            label={t.nouns}
            onClick={() => setSelectedPractice("nounAdj")}
            colorClass="bg-pink-100 text-pink-900 border-pink-400"
            lang={lang}
          />
          <MenuItem
            emoji="🔠"
            label={lang === "he" ? "בניינים בעברית" : "Verb Patterns"}
            onClick={() => setShowVerbPatternsMenu(true)}
            colorClass="bg-gradient-to-br from-amber-100 to-purple-100 text-amber-900 border-amber-300"
            lang={lang}
          />
          <MenuItem
            emoji="🎲"
            label={lang === "he" ? "רולטת שיחה" : "Conversation Roulette"}
            onClick={() => setShowConversationRoulette(true)}
            colorClass="bg-gradient-to-br from-orange-100 to-rose-100 text-orange-900 border-orange-300"
            lang={lang}
          />
          <MenuItem
            emoji="🧩"
            label={lang === "he" ? "סדר את המשפט" : "Sentence Order"}
            onClick={() => setShowSentenceOrder(true)}
            colorClass="bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-900 border-emerald-300"
            lang={lang}
          />
          <MenuItem
            emoji="🗣️"
            label={lang === "he" ? "סלנג ישראלי" : "Israeli Slang"}
            onClick={() => setShowHebrewSlang(true)}
            colorClass="bg-gradient-to-br from-yellow-100 to-orange-100 text-orange-900 border-orange-300"
            lang={lang}
          />
          <MenuItem
            emoji="🎭"
            label={lang === "he" ? "סימולציית שיחה" : "Role-Play"}
            onClick={() => setShowRolePlay(true)}
            colorClass="bg-gradient-to-br from-rose-100 to-purple-100 text-rose-900 border-rose-300"
            lang={lang}
          />
          <MenuItem
            emoji="🔗"
            label={lang === "he" ? "תיקון מילות קישור" : "Connector Fix"}
            onClick={() => setShowConnectorCorrection(true)}
            colorClass="bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-900 border-teal-300"
            lang={lang}
          />
          <MenuItem
            emoji="💬"
            label={t.questionnaire}
            onClick={() => setShowQuestionnaire(true)}
            colorClass="bg-purple-100 text-purple-900 border-purple-300"
            lang={lang}
          />
        </div>
      </div>

      {/* הבנת הנקרא והנשמע */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-muted-foreground mb-3" dir={lang === "he" ? "rtl" : "ltr"}>
          {lang === "he" ? "📖 הבנת הנקרא והנשמע" : "📖 Reading & Listening"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MenuItem
            emoji="🎧"
            label={lang === "he" ? "הבנת הנשמע" : "Listening"}
            onClick={() => setShowListeningPractice(true)}
            colorClass="bg-purple-100 text-purple-900 border-purple-300"
            lang={lang}
          />
          <MenuItem
            emoji="🥗"
            label={t.foodComp}
            onClick={() => setSelectedTextComp("food-levels")}
            colorClass="bg-yellow-100 text-yellow-900 border-yellow-300"
            lang={lang}
          />
          <MenuItem
            emoji="🍽️"
            label={t.foodOrder}
            onClick={() => setSelectedTextComp("food-order-medium")}
            colorClass="bg-orange-200 text-orange-900 border-orange-300"
            lang={lang}
          />
          <MenuItem
            emoji="🐾"
            label={t.animalsEasy}
            onClick={() => setSelectedTextComp("animals-easy")}
            colorClass="bg-green-100 text-green-900 border-green-200"
            lang={lang}
          />
          <MenuItem
            emoji="📱"
            label={t.socialMedia}
            onClick={() => setSelectedTextComp("social-media")}
            colorClass="bg-blue-100 text-blue-900 border-blue-300"
            lang={lang}
          />
          <MenuItem
            emoji="🌏"
            label={t.countries}
            onClick={() => setSelectedTextComp("countries-levels")}
            colorClass="bg-cyan-100 text-cyan-900 border-cyan-300"
            lang={lang}
          />
          <MenuItem
            emoji="📺"
            label={t.movies}
            onClick={() => setSelectedTextComp("movies-series-levels")}
            colorClass="bg-blue-50 text-blue-900 border-blue-400"
            lang={lang}
          />
          <MenuItem
            emoji="🌊"
            label={t.placesFoodEasy}
            onClick={() => setSelectedTextComp("places-food-easy")}
            colorClass="bg-sky-100 text-sky-900 border-sky-400"
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
