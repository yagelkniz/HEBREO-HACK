import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import questions from "./possessivePronounsQuestions.json";

interface PossessivePronounQuestion {
  id: number;
  he: {
    question: string;
    options: string[];
    hint: string;
  };
  en: {
    question: string;
    options: string[];
    hint: string;
  };
  answer: string;
}

type Lang = "he" | "en";

interface PossessivePronounsPracticeProps {
  lang?: Lang;
  onBack?: () => void;
}

export default function PossessivePronounsPractice({
  lang = "he",
  onBack,
}: PossessivePronounsPracticeProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const q: PossessivePronounQuestion = (questions as PossessivePronounQuestion[])[step];

  function handleOption(idx: number) {
    setSelected(idx);
    setShowFeedback(true);
  }

  function next() {
    setSelected(null);
    setShowFeedback(false);
    setShowTranslation(false);
    setStep((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  }

  const t = (h: string, e: string) => (lang === "he" ? h : e);

  function getCorrectOptionIdx() {
    // התאמה לפי אופציות בעברית בלבד — זו תשובה נכונה לכל שפה
    return q.he.options.findIndex(opt => opt === q.answer);
  }

  // מציגים את האופציות — תמיד גם בעברית וגם באנגלית לפרנטיה
  const joinedOptions = q.he.options.map((heOpt, idx) => {
    const enOpt = q.en.options[idx];
    return `${heOpt} (${enOpt})`;
  });

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8 gap-6 min-h-[60vh]">
      <div className="self-end">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה", "Back")}
        </Button>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
        {t("תרגול מילות שייכות", "Possessive Pronouns Practice")}
      </h2>
      <div className="mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
        {showTranslation ? (
          <span>{q.en.question}</span>
        ) : (
          <span>{q.he.question}</span>
        )}
        <Button
          variant="link"
          size="sm"
          className="ml-2"
          onClick={() => setShowTranslation((b) => !b)}
        >
          {showTranslation
            ? t("הסתר תרגום", "Hide translation")
            : t("הצג תרגום", "Show translation")}
        </Button>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {joinedOptions.map((opt, idx) => (
          <Button
            key={idx}
            variant={selected === idx ? "default" : "outline"}
            onClick={() => !showFeedback && handleOption(idx)}
            className="w-full text-xl py-4"
            disabled={showFeedback}
          >
            {opt}
          </Button>
        ))}
      </div>
      {showFeedback && (
        <div
          className={`rounded-xl p-4 w-full text-lg font-bold ${
            selected === getCorrectOptionIdx()
              ? "bg-green-100 text-green-900"
              : "bg-red-100 text-red-900"
          }`}
        >
          {selected === getCorrectOptionIdx()
            ? t("נכון! מעולה!", "Correct! Well done!")
            : t(
                `לא נכון. התשובה: ${joinedOptions[getCorrectOptionIdx()]} (${q.he.hint})`,
                `Incorrect. The answer: ${joinedOptions[getCorrectOptionIdx()]} (${q.en.hint})`
              )}
        </div>
      )}
      <div className="flex justify-between w-full mt-4">
        <span className="text-gray-500 text-sm">
          {t(`שאלה ${step + 1} מתוך ${questions.length}`, `Question ${step + 1} of ${questions.length}`)}
        </span>
        {showFeedback && (
          <Button variant="secondary" onClick={next}>
            {t("המשך", "Next")}
          </Button>
        )}
      </div>
    </div>
  );
}
