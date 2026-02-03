import IndexMainMenu from "./IndexMainMenu";
import IndexRouter from "@/components/IndexRouter";
import VerbPatternsMenu from "@/components/VerbPatternsMenu";
import { useIndexState } from "@/hooks/useIndexState";

export default function Index() {
  const state = useIndexState();

  // Check if we should show a specific route/component
  const shouldShowRouter = 
    state.showLinkingWords ||
    state.showLinkingWordsPractice ||
    state.showPronounsTable ||
    state.showPronounsMenu ||
    state.showPronounsPractice ||
    state.showPossessivePronouns ||
    state.showPossessivePronounsMenu ||
    state.showPossessivePronounsPractice ||
    state.showEverydayHebrew ||
    state.showQuestionnaire ||
    state.selectedPractice ||
    state.selectedTextComp ||
    state.showVerbToBePresentation ||
    state.showDaysAndPlacesVocab ||
    state.showQuestionWords ||
    state.showOddOneOut ||
    state.showEmotions ||
    state.showLinkingWordsLevels ||
    state.showVerbMemoryGame ||
    state.showColorsAndFruits ||
    state.showHifilVerb ||
    state.showPielVerb ||
    state.selectedVerbPattern;

  // Show Verb Patterns Menu
  if (state.showVerbPatternsMenu && !state.selectedVerbPattern) {
    return (
      <VerbPatternsMenu
        lang={state.lang}
        onBack={state.resetToMainMenu}
        onSelectPattern={(pattern, level) => {
          state.setSelectedVerbPattern({ pattern, level });
        }}
      />
    );
  }

  if (shouldShowRouter) {
    return <IndexRouter state={state} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <IndexMainMenu 
        lang={state.lang}
        setLang={state.setLang}
        setShowLinkingWords={state.setShowLinkingWords}
        setShowPronounsTable={state.setShowPronounsTable}
        setShowPossessivePronouns={state.setShowPossessivePronouns}
        setShowQuestionnaire={state.setShowQuestionnaire}
        setSelectedPractice={state.setSelectedPractice}
        setSelectedTextComp={state.setSelectedTextComp}
        setShowEverydayHebrew={state.setShowEverydayHebrew}
        setShowVerbToBePresentation={state.setShowVerbToBePresentation}
        setShowDaysAndPlacesVocab={state.setShowDaysAndPlacesVocab}
        setShowQuestionWords={state.setShowQuestionWords}
        setShowOddOneOut={state.setShowOddOneOut}
        setShowEmotions={state.setShowEmotions}
        setShowLinkingWordsLevels={state.setShowLinkingWordsLevels}
        setShowVerbMemoryGame={state.setShowVerbMemoryGame}
        setShowColorsAndFruits={state.setShowColorsAndFruits}
        setShowVerbPatternsMenu={state.setShowVerbPatternsMenu}
      />
    </div>
  );
}
