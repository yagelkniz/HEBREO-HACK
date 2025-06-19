
import { useState } from "react";
import { Button } from "@/components/ui/button";
import IndexMainMenu from "./IndexMainMenu";
import LinkingWordsTable from "@/components/LinkingWordsTable";
import PronounsTable from "@/components/PronounsTable";
import PronounsMenu from "@/components/PronounsMenu";
import PronounsPractice from "@/components/PronounsPractice";
import PossessivePronounsTable from "@/components/PossessivePronounsTable";
import PossessivePronounsMenu from "@/components/PossessivePronounsMenu";
import PossessivePronounsPractice from "@/components/PossessivePronounsPractice";
import EverydayHebrewCategorySelect from "@/components/EverydayHebrewCategorySelect";
import EverydayHebrewPractice from "@/components/EverydayHebrewPractice";
import LinkingWordsPractice from "@/components/LinkingWordsPractice";
import PresentTenseVerbPractice from "@/components/PresentTenseVerbPractice";
import PastTenseVerbPractice from "@/components/PastTenseVerbPractice";
import FutureTenseVerbPractice from "@/components/FutureTenseVerbPractice";
import NounAdjectivePractice from "@/components/NounAdjectivePractice";
import InterviewQuestionnaire from "@/components/InterviewQuestionnaire";
import TextComprehensionFood from "@/components/TextComprehensionFood";
import TextComprehensionAnimalsEasy from "@/components/TextComprehensionAnimalsEasy";
import TextComprehensionFoodOrderMedium from "@/components/TextComprehensionFoodOrderMedium";
import TextComprehensionSocialMedia from "@/components/TextComprehensionSocialMedia";
import TextComprehensionFoodLevels from "@/components/TextComprehensionFoodLevels";
import TextComprehensionCountriesLevels from "@/components/TextComprehensionCountriesLevels";
import TextComprehensionMoviesAndSeriesLevels from "@/components/TextComprehensionMoviesAndSeriesLevels";
import TextComprehensionPlacesFoodEasy from "@/components/TextComprehensionPlacesFoodEasy";
import VerbToBePresentation from "@/components/VerbToBePresentation";

export default function Index() {
  const [lang, setLang] = useState<"he" | "en">("he");
  const [showLinkingWords, setShowLinkingWords] = useState(false);
  const [showLinkingWordsPractice, setShowLinkingWordsPractice] = useState(false);
  const [showPronounsTable, setShowPronounsTable] = useState(false);
  const [showPronounsMenu, setShowPronounsMenu] = useState(false);
  const [showPronounsPractice, setShowPronounsPractice] = useState(false);
  const [showPossessivePronouns, setShowPossessivePronouns] = useState(false);
  const [showPossessivePronounsMenu, setShowPossessivePronounsMenu] = useState(false);
  const [showPossessivePronounsPractice, setShowPossessivePronounsPractice] = useState(false);
  const [showEverydayHebrew, setShowEverydayHebrew] = useState(false);
  const [everydayHebrewCategory, setEverydayHebrewCategory] = useState<"restaurant" | "supermarket" | "transportation" | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState<null | "verb" | "nounAdj">(null);
  const [verbTense, setVerbTense] = useState<"present" | "past" | "future" | null>(null);
  const [selectedTextComp, setSelectedTextComp] = useState<null | "food" | "animals-easy" | "food-order-medium" | "social-media" | "food-levels" | "countries-levels" | "movies-series-levels" | "places-food-easy">(null);
  const [showVerbToBePresentation, setShowVerbToBePresentation] = useState(false);

  const resetToMainMenu = () => {
    setShowLinkingWords(false);
    setShowLinkingWordsPractice(false);
    setShowPronounsTable(false);
    setShowPronounsMenu(false);
    setShowPronounsPractice(false);
    setShowPossessivePronouns(false);
    setShowPossessivePronounsMenu(false);
    setShowPossessivePronounsPractice(false);
    setShowEverydayHebrew(false);
    setEverydayHebrewCategory(null);
    setShowQuestionnaire(false);
    setSelectedPractice(null);
    setVerbTense(null);
    setSelectedTextComp(null);
    setShowVerbToBePresentation(false);
  };

  const t = (he: string, en: string) => (lang === "he" ? he : en);

  if (showVerbToBePresentation) {
    return <VerbToBePresentation onBack={() => setShowVerbToBePresentation(false)} />;
  }

  if (showLinkingWordsPractice) {
    return <LinkingWordsPractice lang={lang} onBack={() => setShowLinkingWordsPractice(false)} />;
  }

  if (showLinkingWords) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={resetToMainMenu}>
              ⬅ {t("חזרה לתפריט הראשי", "Back to Main Menu")}
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setLang(lang === "he" ? "en" : "he")}
              >
                {lang === "he" ? "English" : "עברית"}
              </Button>
              <Button 
                variant="default" 
                onClick={() => setShowLinkingWordsPractice(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                🏃‍♂️ {t("תרגול מילות קישור", "Linking Words Practice")}
              </Button>
            </div>
          </div>
          <LinkingWordsTable />
        </div>
      </div>
    );
  }

  if (showPronounsTable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={resetToMainMenu}>
              ⬅ {t("חזרה לתפריט הראשי", "Back to Main Menu")}
            </Button>
            <Button 
              variant="default" 
              onClick={() => setShowPronounsMenu(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              🏃‍♂️ {t("תרגול שמות גוף", "Pronouns Practice")}
            </Button>
          </div>
          <PronounsTable />
        </div>
      </div>
    );
  }

  if (showPronounsMenu) {
    return (
      <PronounsMenu
        onBack={() => {
          setShowPronounsMenu(false);
          setShowPronounsTable(true);
        }}
      />
    );
  }

  if (showPronounsPractice) {
    return <PronounsPractice onBack={() => setShowPronounsPractice(false)} />;
  }

  if (showPossessivePronouns) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={resetToMainMenu}>
              ⬅ {t("חזרה לתפריט הראשי", "Back to Main Menu")}
            </Button>
            <Button 
              variant="default" 
              onClick={() => setShowPossessivePronounsMenu(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              🏃‍♂️ {t("תרגול מילות שייכות", "Possessive Pronouns Practice")}
            </Button>
          </div>
          <PossessivePronounsTable />
        </div>
      </div>
    );
  }

  if (showPossessivePronounsMenu) {
    return (
      <PossessivePronounsMenu
        onBack={() => {
          setShowPossessivePronounsMenu(false);
          setShowPossessivePronouns(true);
        }}
      />
    );
  }

  if (showPossessivePronounsPractice) {
    return <PossessivePronounsPractice onBack={() => setShowPossessivePronounsPractice(false)} />;
  }

  if (showEverydayHebrew) {
    if (!everydayHebrewCategory) {
      return (
        <EverydayHebrewCategorySelect 
          onBack={resetToMainMenu}
          onSelect={(category) => setEverydayHebrewCategory(category)}
        />
      );
    }
    return (
      <EverydayHebrewPractice 
        category={everydayHebrewCategory}
        onBack={() => setEverydayHebrewCategory(null)}
      />
    );
  }

  if (selectedPractice === "verb") {
    if (!verbTense) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedPractice(null)}
              className="mb-4"
            >
              ⬅ {t("חזרה", "Back")}
            </Button>
            <h2 className="text-2xl font-bold mb-6 text-center" dir={lang === "he" ? "rtl" : "ltr"}>
              {t("בחר זמן לתרגול", "Choose tense to practice")}
            </h2>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setVerbTense("present")}
                className="py-6 text-xl bg-blue-500 hover:bg-blue-600"
              >
                {t("זמן הווה", "Present tense")}
              </Button>
              <Button
                onClick={() => setVerbTense("past")}
                className="py-6 text-xl bg-green-500 hover:bg-green-600"
              >
                {t("זמן עבר", "Past tense")}
              </Button>
              <Button
                onClick={() => setVerbTense("future")}
                className="py-6 text-xl bg-purple-500 hover:bg-purple-600"
              >
                {t("זמן עתיד", "Future tense")}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (verbTense === "present") {
      return <PresentTenseVerbPractice onBack={() => setVerbTense(null)} />;
    }
    if (verbTense === "past") {
      return <PastTenseVerbPractice onBack={() => setVerbTense(null)} />;
    }
    if (verbTense === "future") {
      return <FutureTenseVerbPractice onBack={() => setVerbTense(null)} />;
    }
  }

  if (selectedPractice === "nounAdj") {
    return <NounAdjectivePractice onBack={() => setSelectedPractice(null)} />;
  }

  if (showQuestionnaire) {
    return <InterviewQuestionnaire onBack={resetToMainMenu} />;
  }

  if (selectedTextComp === "food") {
    return <TextComprehensionFood onBack={() => setSelectedTextComp(null)} />;
  }

  if (selectedTextComp === "animals-easy") {
    return <TextComprehensionAnimalsEasy onBack={() => setSelectedTextComp(null)} />;
  }

  if (selectedTextComp === "food-order-medium") {
    return <TextComprehensionFoodOrderMedium onBack={() => setSelectedTextComp(null)} />;
  }

  if (selectedTextComp === "social-media") {
    return <TextComprehensionSocialMedia onBack={() => setSelectedTextComp(null)} />;
  }

  if (selectedTextComp === "food-levels") {
    return <TextComprehensionFoodLevels onBack={() => setSelectedTextComp(null)} />;
  }

  if (selectedTextComp === "countries-levels") {
    return <TextComprehensionCountriesLevels onBack={() => setSelectedTextComp(null)} />;
  }

  if (selectedTextComp === "movies-series-levels") {
    return <TextComprehensionMoviesAndSeriesLevels onBack={() => setSelectedTextComp(null)} />;
  }

  if (selectedTextComp === "places-food-easy") {
    return <TextComprehensionPlacesFoodEasy onBack={() => setSelectedTextComp(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <IndexMainMenu 
        lang={lang}
        setLang={setLang}
        setShowLinkingWords={setShowLinkingWords}
        setShowPronounsTable={setShowPronounsTable}
        setShowPossessivePronouns={setShowPossessivePronouns}
        setShowQuestionnaire={setShowQuestionnaire}
        setSelectedPractice={setSelectedPractice}
        setSelectedTextComp={setSelectedTextComp}
        setShowEverydayHebrew={setShowEverydayHebrew}
        setShowVerbToBePresentation={setShowVerbToBePresentation}
      />
    </div>
  );
}
