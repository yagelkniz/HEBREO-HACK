
import { Button } from "@/components/ui/button";
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
import HebrewHouseholdItemsPractice from "@/components/HebrewHouseholdItemsPractice";
import VerbTenseSelector from "@/components/VerbTenseSelector";
import DaysAndPlacesVocabulary from "@/components/DaysAndPlacesVocabulary";
import { useIndexState } from "@/hooks/useIndexState";

interface IndexRouterProps {
  state: ReturnType<typeof useIndexState>;
}

export default function IndexRouter({ state }: IndexRouterProps) {
  const {
    lang,
    setLang,
    showLinkingWords,
    setShowLinkingWords,
    showLinkingWordsPractice,
    setShowLinkingWordsPractice,
    showPronounsTable,
    setShowPronounsTable,
    showPronounsMenu,
    setShowPronounsMenu,
    showPronounsPractice,
    setShowPronounsPractice,
    showPossessivePronouns,
    setShowPossessivePronouns,
    showPossessivePronounsMenu,
    setShowPossessivePronounsMenu,
    showPossessivePronounsPractice,
    setShowPossessivePronounsPractice,
    showEverydayHebrew,
    setShowEverydayHebrew,
    everydayHebrewCategory,
    setEverydayHebrewCategory,
    showQuestionnaire,
    selectedPractice,
    setSelectedPractice,
    verbTense,
    setVerbTense,
    selectedTextComp,
    showVerbToBePresentation,
    setShowVerbToBePresentation,
    showDaysAndPlacesVocab,
    setShowDaysAndPlacesVocab,
    resetToMainMenu,
  } = state;

  const t = (he: string, en: string) => (lang === "he" ? he : en);

  if (showDaysAndPlacesVocab) {
    return <DaysAndPlacesVocabulary onBack={() => setShowDaysAndPlacesVocab(false)} />;
  }

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

  if (selectedPractice === "household") {
    return <HebrewHouseholdItemsPractice onBack={() => setSelectedPractice(null)} />;
  }

  if (selectedPractice === "verb") {
    if (!verbTense) {
      return (
        <VerbTenseSelector 
          lang={lang}
          onBack={() => setSelectedPractice(null)}
          onSelectTense={setVerbTense}
        />
      );
    }

    if (verbTense === "present") {
      return <PresentTenseVerbPractice />;
    }
    if (verbTense === "past") {
      return <PastTenseVerbPractice />;
    }
    if (verbTense === "future") {
      return <FutureTenseVerbPractice />;
    }
  }

  if (selectedPractice === "nounAdj") {
    return <NounAdjectivePractice onBack={() => setSelectedPractice(null)} />;
  }

  if (showQuestionnaire) {
    return <InterviewQuestionnaire onBack={resetToMainMenu} />;
  }

  if (selectedTextComp === "food") {
    return <TextComprehensionFood />;
  }

  if (selectedTextComp === "animals-easy") {
    return <TextComprehensionAnimalsEasy />;
  }

  if (selectedTextComp === "food-order-medium") {
    return <TextComprehensionFoodOrderMedium />;
  }

  if (selectedTextComp === "social-media") {
    return <TextComprehensionSocialMedia />;
  }

  if (selectedTextComp === "food-levels") {
    return <TextComprehensionFoodLevels />;
  }

  if (selectedTextComp === "countries-levels") {
    return <TextComprehensionCountriesLevels />;
  }

  if (selectedTextComp === "movies-series-levels") {
    return <TextComprehensionMoviesAndSeriesLevels />;
  }

  if (selectedTextComp === "places-food-easy") {
    return <TextComprehensionPlacesFoodEasy />;
  }

  return null;
}
