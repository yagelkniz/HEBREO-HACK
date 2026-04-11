import VocabPracticeModule from "@/components/VocabPracticeModule";
import { bodyHealthWords, bodyHealthQuestions } from "@/data/bodyHealthData";

interface Props { onBack: () => void; lang?: "he" | "en"; }

export default function BodyHealthPractice({ onBack, lang = "he" }: Props) {
  return <VocabPracticeModule onBack={onBack} lang={lang} titleHe="גוף האדם ובריאות" titleEn="Body & Health" emoji="🏥" words={bodyHealthWords} questions={bodyHealthQuestions} />;
}
