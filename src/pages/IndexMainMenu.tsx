import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import type { SetStateAction, Dispatch } from "react";
import menuText from "@/i18n/menu";

interface IndexMainMenuProps {
  lang: "he" | "en";
  setLang: (lang: "he" | "en") => void;
  setShowLinkingWords: (b: boolean) => void;
  setShowPronounsMenu: (b: boolean) => void;
  setShowPossessivePronouns: (b: boolean) => void;
  setShowQuestionnaire: (b: boolean) => void;
  setSelectedPractice: (val: null | "verb" | "nounAdj" | "household") => void;
  setSelectedTextComp: Dispatch<SetStateAction<null | "food" | "animals-easy" | "food-order-medium" | "social-media" | "food-levels" | "countries-levels" | "movies-series-levels" | "places-food-easy" | "hospital" | "airport" | "news">>;
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
  setShowPronounSuffixReflexive: (b: boolean) => void;
  setShowBeginnerHebrew: (b: boolean) => void;
  setShowNumbers: (b: boolean) => void;
  setShowMonths: (b: boolean) => void;
  setShowAdjectives: (b: boolean) => void;
  setShowCityVocab: (b: boolean) => void;
  setShowShopping: (b: boolean) => void;
  setShowFamily: (b: boolean) => void;
  setShowQuickQuiz: (b: boolean) => void;
  setShowGenderFlip: (b: boolean) => void;
  setShowSongLyrics: (b: boolean) => void;
  setShowAlphabetCourse: (b: boolean) => void;
  setShowProfessions: (b: boolean) => void;
  setShowFoodDrinks: (b: boolean) => void;
  setShowWeather: (b: boolean) => void;
  setShowBodyHealth: (b: boolean) => void;
}

interface MenuItemProps {
  emoji: string;
  label: string;
  onClick: () => void;
  colorClass: string;
  lang: "he" | "en";
  difficulty?: "beginner" | "intermediate" | "advanced";
}

function MenuItem({ emoji, label, onClick, colorClass, lang, difficulty }: MenuItemProps) {
  const diffLabel = difficulty === "beginner" ? (lang === "he" ? "מתחיל" : "Beginner")
    : difficulty === "intermediate" ? (lang === "he" ? "בינוני" : "Intermediate")
    : difficulty === "advanced" ? (lang === "he" ? "מתקדם" : "Advanced") : null;
  const diffColor = difficulty === "beginner" ? "bg-green-200 text-green-800"
    : difficulty === "intermediate" ? "bg-yellow-200 text-yellow-800"
    : difficulty === "advanced" ? "bg-red-200 text-red-800" : "";

  return (
    <button
      className={`relative flex flex-col items-center justify-center gap-2 p-4 font-bold text-base rounded-xl border-2 shadow hover:scale-105 transition-transform focus:outline-none ${colorClass}`}
      onClick={onClick}
    >
      {diffLabel && (
        <span className={`absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${diffColor}`}>
          {diffLabel}
        </span>
      )}
      <span className="text-2xl">{emoji}</span>
      <span className="text-center leading-tight text-sm" dir={lang === "he" ? "rtl" : "ltr"}>
        {label}
      </span>
    </button>
  );
}

export default function IndexMainMenu(props: IndexMainMenuProps) {
  const { lang, setLang } = props;
  const t = menuText[lang];

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-4xl mx-auto px-4">
      {/* Alphabet Course — Top Banner */}
      <div className="w-full relative">
        <button
          onClick={() => props.setShowAlphabetCourse(true)}
          className="w-full text-right p-6 rounded-2xl border-2 border-emerald-300 bg-gradient-to-l from-emerald-50 to-amber-50 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
        >
          <span className="absolute top-3 left-3 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full">חדש! ✨</span>
          <div className="text-2xl font-bold text-emerald-800 mb-1">📖 קריאה מאפס — לימוד האלף-בית</div>
          <div className="text-sm text-muted-foreground">למד לקרוא עברית מהאות הראשונה — מושלם למתחילים מוחלטים</div>
          <div className="mt-3 inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold">התחל את המסע ←</div>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-primary" dir={lang === "he" ? "rtl" : "ltr"}>
          {t.mainTitle}
        </h1>
        <Button variant="outline" size="sm" onClick={() => setLang(lang === "he" ? "en" : "he")} className="flex items-center gap-2">
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
          <MenuItem emoji="🌱" label={lang === "he" ? "עברית למתחילים" : "Beginner Hebrew"} onClick={() => props.setShowBeginnerHebrew(true)} colorClass="bg-lime-100 text-lime-900 border-lime-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="📚" label={lang === "he" ? 'הפועל "להיות"' : 'Verb "To Be"'} onClick={() => props.setShowVerbToBePresentation(true)} colorClass="bg-emerald-100 text-emerald-900 border-emerald-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="📅" label={lang === "he" ? "ימים ומקומות" : "Days & Places"} onClick={() => props.setShowDaysAndPlacesVocab(true)} colorClass="bg-violet-100 text-violet-900 border-violet-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="❓" label={lang === "he" ? "מילות שאלה" : "Question Words"} onClick={() => props.setShowQuestionWords(true)} colorClass="bg-amber-100 text-amber-900 border-amber-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="👤" label={t.pronouns} onClick={() => props.setShowPronounsMenu(true)} colorClass="bg-indigo-100 text-indigo-900 border-indigo-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="🤝" label={t.possessivePronouns} onClick={() => props.setShowPossessivePronouns(true)} colorClass="bg-teal-100 text-teal-900 border-teal-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🔀" label={t.linkingWords} onClick={() => props.setShowLinkingWords(true)} colorClass="bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🔤" label={lang === "he" ? "מילות יחס + כינויים" : "Preposition Suffixes"} onClick={() => props.setShowPrepositionSuffix(true)} colorClass="bg-gradient-to-br from-sky-100 to-violet-100 text-sky-900 border-sky-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🪞" label={lang === "he" ? "כינויי יחס + רפלקסיב" : "Pronoun Suffixes + Reflexive"} onClick={() => props.setShowPronounSuffixReflexive(true)} colorClass="bg-gradient-to-br from-amber-100 to-rose-100 text-amber-900 border-amber-300" lang={lang} difficulty="advanced" />
          <MenuItem emoji="🔢" label={lang === "he" ? "מספרים בעברית" : "Hebrew Numbers"} onClick={() => props.setShowNumbers(true)} colorClass="bg-blue-100 text-blue-900 border-blue-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="🗓️" label={lang === "he" ? "חודשי השנה" : "Months of the Year"} onClick={() => props.setShowMonths(true)} colorClass="bg-cyan-100 text-cyan-900 border-cyan-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="🌈" label={lang === "he" ? "תארים נפוצים" : "Common Adjectives"} onClick={() => props.setShowAdjectives(true)} colorClass="bg-gradient-to-br from-yellow-100 to-pink-100 text-yellow-900 border-yellow-300" lang={lang} difficulty="beginner" />
        </div>
      </div>

      {/* תרגול אוצר מילים */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-muted-foreground mb-3" dir={lang === "he" ? "rtl" : "ltr"}>
          {lang === "he" ? "🎯 תרגול אוצר מילים" : "🎯 Vocabulary Practice"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MenuItem emoji="😊" label={lang === "he" ? "רגשות" : "Emotions"} onClick={() => props.setShowEmotions(true)} colorClass="bg-pink-100 text-pink-900 border-pink-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="📎" label={lang === "he" ? "מילות קישור" : "Linking Words"} onClick={() => props.setShowLinkingWordsLevels(true)} colorClass="bg-cyan-100 text-cyan-900 border-cyan-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🏠" label={lang === "he" ? "כלי בית" : "Household"} onClick={() => props.setSelectedPractice("household")} colorClass="bg-red-100 text-red-900 border-red-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="🗣️" label={t.everydayHebrew} onClick={() => props.setShowEverydayHebrew(true)} colorClass="bg-orange-100 text-orange-900 border-orange-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🎨" label={lang === "he" ? "צבעים ופירות" : "Colors & Fruits"} onClick={() => props.setShowColorsAndFruits(true)} colorClass="bg-gradient-to-br from-pink-100 to-green-100 text-pink-900 border-pink-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="🏙️" label={lang === "he" ? "בעיר" : "In the City"} onClick={() => props.setShowCityVocab(true)} colorClass="bg-slate-100 text-slate-900 border-slate-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🛒" label={lang === "he" ? "קניות" : "Shopping"} onClick={() => props.setShowShopping(true)} colorClass="bg-emerald-100 text-emerald-900 border-emerald-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="👨‍👩‍👧" label={lang === "he" ? "משפחה" : "Family"} onClick={() => props.setShowFamily(true)} colorClass="bg-rose-100 text-rose-900 border-rose-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="👨‍⚕️" label={lang === "he" ? "מקצועות" : "Professions"} onClick={() => props.setShowProfessions(true)} colorClass="bg-blue-100 text-blue-900 border-blue-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🍽️" label={lang === "he" ? "אוכל ושתייה" : "Food & Drinks"} onClick={() => props.setShowFoodDrinks(true)} colorClass="bg-amber-100 text-amber-900 border-amber-300" lang={lang} difficulty="beginner" />
          <MenuItem emoji="🌤️" label={lang === "he" ? "מזג אוויר" : "Weather"} onClick={() => props.setShowWeather(true)} colorClass="bg-sky-100 text-sky-900 border-sky-300" lang={lang} difficulty="intermediate" />
          <MenuItem emoji="🏥" label={lang === "he" ? "גוף ובריאות" : "Body & Health"} onClick={() => props.setShowBodyHealth(true)} colorClass="bg-red-100 text-red-900 border-red-300" lang={lang} difficulty="beginner" />
        </div>
      </div>

      {/* משחקים ותרגול */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-muted-foreground mb-3" dir={lang === "he" ? "rtl" : "ltr"}>
          {lang === "he" ? "🎮 משחקים ותרגול" : "🎮 Games & Practice"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MenuItem emoji="🧠" label={lang === "he" ? "משחק זיכרון" : "Memory Game"} onClick={() => props.setShowVerbMemoryGame(true)} colorClass="bg-purple-100 text-purple-900 border-purple-300" lang={lang} />
          <MenuItem emoji="🎯" label={lang === "he" ? "מה יוצא דופן?" : "Odd One Out"} onClick={() => props.setShowOddOneOut(true)} colorClass="bg-rose-100 text-rose-900 border-rose-300" lang={lang} />
          <MenuItem emoji="🕰️" label={t.verbs} onClick={() => props.setSelectedPractice("verb")} colorClass="bg-blue-100 text-blue-900 border-blue-200" lang={lang} />
          <MenuItem emoji="📝" label={t.nouns} onClick={() => props.setSelectedPractice("nounAdj")} colorClass="bg-pink-100 text-pink-900 border-pink-400" lang={lang} />
          <MenuItem emoji="🔠" label={lang === "he" ? "בניינים בעברית" : "Verb Patterns"} onClick={() => props.setShowVerbPatternsMenu(true)} colorClass="bg-gradient-to-br from-amber-100 to-purple-100 text-amber-900 border-amber-300" lang={lang} />
          <MenuItem emoji="🎲" label={lang === "he" ? "רולטת שיחה" : "Conversation Roulette"} onClick={() => props.setShowConversationRoulette(true)} colorClass="bg-gradient-to-br from-orange-100 to-rose-100 text-orange-900 border-orange-300" lang={lang} />
          <MenuItem emoji="🧩" label={lang === "he" ? "סדר את המשפט" : "Sentence Order"} onClick={() => props.setShowSentenceOrder(true)} colorClass="bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-900 border-emerald-300" lang={lang} />
          <MenuItem emoji="🗣️" label={lang === "he" ? "סלנג ישראלי" : "Israeli Slang"} onClick={() => props.setShowHebrewSlang(true)} colorClass="bg-gradient-to-br from-yellow-100 to-orange-100 text-orange-900 border-orange-300" lang={lang} />
          <MenuItem emoji="🎭" label={lang === "he" ? "סימולציית שיחה" : "Role-Play"} onClick={() => props.setShowRolePlay(true)} colorClass="bg-gradient-to-br from-rose-100 to-purple-100 text-rose-900 border-rose-300" lang={lang} />
          <MenuItem emoji="🔧" label={lang === "he" ? "תיקון מילות קישור" : "Connector Fix"} onClick={() => props.setShowConnectorCorrection(true)} colorClass="bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-900 border-teal-300" lang={lang} difficulty="advanced" />
          <MenuItem emoji="💬" label={t.questionnaire} onClick={() => props.setShowQuestionnaire(true)} colorClass="bg-purple-100 text-purple-900 border-purple-300" lang={lang} />
          {/* New game exercises */}
          <MenuItem emoji="⚡" label={lang === "he" ? "מבחן מהיר" : "Quick Quiz"} onClick={() => props.setShowQuickQuiz(true)} colorClass="bg-gradient-to-br from-red-100 to-yellow-100 text-red-900 border-red-300" lang={lang} />
          <MenuItem emoji="🔄" label={lang === "he" ? "הפוך את המשפט" : "Gender Flip"} onClick={() => props.setShowGenderFlip(true)} colorClass="bg-gradient-to-br from-blue-100 to-pink-100 text-blue-900 border-blue-300" lang={lang} />
          <MenuItem emoji="🎵" label={lang === "he" ? "פזמון קצר" : "Song Lyrics"} onClick={() => props.setShowSongLyrics(true)} colorClass="bg-gradient-to-br from-violet-100 to-pink-100 text-violet-900 border-violet-300" lang={lang} />
        </div>
      </div>

      {/* הבנת הנקרא והנשמע */}
      <div className="w-full">
        <h2 className="text-lg font-semibold text-muted-foreground mb-3" dir={lang === "he" ? "rtl" : "ltr"}>
          {lang === "he" ? "📖 הבנת הנקרא והנשמע" : "📖 Reading & Listening"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MenuItem emoji="🎧" label={lang === "he" ? "הבנת הנשמע" : "Listening"} onClick={() => props.setShowListeningPractice(true)} colorClass="bg-purple-100 text-purple-900 border-purple-300" lang={lang} />
          <MenuItem emoji="🥗" label={t.foodComp} onClick={() => props.setSelectedTextComp("food-levels")} colorClass="bg-yellow-100 text-yellow-900 border-yellow-300" lang={lang} />
          <MenuItem emoji="🍽️" label={t.foodOrder} onClick={() => props.setSelectedTextComp("food-order-medium")} colorClass="bg-orange-200 text-orange-900 border-orange-300" lang={lang} />
          <MenuItem emoji="🐾" label={t.animalsEasy} onClick={() => props.setSelectedTextComp("animals-easy")} colorClass="bg-green-100 text-green-900 border-green-200" lang={lang} />
          <MenuItem emoji="📱" label={t.socialMedia} onClick={() => props.setSelectedTextComp("social-media")} colorClass="bg-blue-100 text-blue-900 border-blue-300" lang={lang} />
          <MenuItem emoji="🌏" label={t.countries} onClick={() => props.setSelectedTextComp("countries-levels")} colorClass="bg-cyan-100 text-cyan-900 border-cyan-300" lang={lang} />
          <MenuItem emoji="📺" label={t.movies} onClick={() => props.setSelectedTextComp("movies-series-levels")} colorClass="bg-blue-50 text-blue-900 border-blue-400" lang={lang} />
          <MenuItem emoji="🌊" label={t.placesFoodEasy} onClick={() => props.setSelectedTextComp("places-food-easy")} colorClass="bg-sky-100 text-sky-900 border-sky-400" lang={lang} />
          {/* New reading exercises */}
          <MenuItem emoji="🏥" label={lang === "he" ? "בבית החולים (קל)" : "Hospital (Easy)"} onClick={() => props.setSelectedTextComp("hospital")} colorClass="bg-red-100 text-red-900 border-red-300" lang={lang} />
          <MenuItem emoji="✈️" label={lang === "he" ? "בשדה התעופה (בינוני)" : "Airport (Medium)"} onClick={() => props.setSelectedTextComp("airport")} colorClass="bg-indigo-100 text-indigo-900 border-indigo-300" lang={lang} />
          <MenuItem emoji="📰" label={lang === "he" ? "כתבה עכשווית (קשה)" : "News Article (Hard)"} onClick={() => props.setSelectedTextComp("news")} colorClass="bg-gray-100 text-gray-900 border-gray-300" lang={lang} />
        </div>
      </div>
    </div>
  );
}
