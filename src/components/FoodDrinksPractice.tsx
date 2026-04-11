import VocabPracticeModule from "@/components/VocabPracticeModule";
import { foodDrinksWords, foodDrinksQuestions } from "@/data/foodDrinksData";

interface Props { onBack: () => void; lang?: "he" | "en"; }

export default function FoodDrinksPractice({ onBack, lang = "he" }: Props) {
  return <VocabPracticeModule onBack={onBack} lang={lang} titleHe="אוכל ושתייה" titleEn="Food & Drinks" emoji="🍽️" words={foodDrinksWords} questions={foodDrinksQuestions} />;
}
