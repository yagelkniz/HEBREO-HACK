import VocabPracticeModule from "@/components/VocabPracticeModule";
import { professionsWords, professionsQuestions } from "@/data/professionsData";

interface Props { onBack: () => void; lang?: "he" | "en"; }

export default function ProfessionsPractice({ onBack, lang = "he" }: Props) {
  return <VocabPracticeModule onBack={onBack} lang={lang} titleHe="מקצועות" titleEn="Professions" emoji="👨‍⚕️" words={professionsWords} questions={professionsQuestions} />;
}
