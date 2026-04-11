import VocabPracticeModule from "@/components/VocabPracticeModule";
import { weatherWords, weatherQuestions } from "@/data/weatherData";

interface Props { onBack: () => void; lang?: "he" | "en"; }

export default function WeatherPractice({ onBack, lang = "he" }: Props) {
  return <VocabPracticeModule onBack={onBack} lang={lang} titleHe="מזג אוויר ועונות" titleEn="Weather & Seasons" emoji="🌤️" words={weatherWords} questions={weatherQuestions} />;
}
