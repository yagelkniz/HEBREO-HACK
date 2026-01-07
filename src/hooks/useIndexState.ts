
import { useState } from "react";

export const useIndexState = () => {
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
  const [selectedPractice, setSelectedPractice] = useState<null | "verb" | "nounAdj" | "household">(null);
  const [verbTense, setVerbTense] = useState<"present" | "past" | "future" | null>(null);
  const [selectedTextComp, setSelectedTextComp] = useState<null | "food" | "animals-easy" | "food-order-medium" | "social-media" | "food-levels" | "countries-levels" | "movies-series-levels" | "places-food-easy">(null);
  const [showVerbToBePresentation, setShowVerbToBePresentation] = useState(false);
  const [showDaysAndPlacesVocab, setShowDaysAndPlacesVocab] = useState(false);
  const [showQuestionWords, setShowQuestionWords] = useState(false);
  const [showOddOneOut, setShowOddOneOut] = useState(false);

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
    setShowDaysAndPlacesVocab(false);
    setShowQuestionWords(false);
    setShowOddOneOut(false);
  };

  return {
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
    setShowQuestionnaire,
    selectedPractice,
    setSelectedPractice,
    verbTense,
    setVerbTense,
    selectedTextComp,
    setSelectedTextComp,
    showVerbToBePresentation,
    setShowVerbToBePresentation,
    showDaysAndPlacesVocab,
    setShowDaysAndPlacesVocab,
    showQuestionWords,
    setShowQuestionWords,
    showOddOneOut,
    setShowOddOneOut,
    resetToMainMenu,
  };
};
