
import React, { useState, useMemo } from "react";
import questionsRaw from "./linkingWordsQuestions.json";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/shuffleArray";

interface LinkingWordsQuestion {
  question: string;
  options: string[];
  answer: string;
  category: string;
  translation: string;
}

type Lang = "he" | "en";

export default function LinkingWordsPractice({
  lang = "he",
  onBack,
}: {
  lang?: Lang;
  onBack?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // Shuffle options for each question
  const questions = useMemo(() => {
    return (questionsRaw as LinkingWordsQuestion[]).map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
  }, []);

  const q = questions[step];

  // Add safety check
  if (!q) {
    return <div>טוען שאלות...</div>;
  }

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

  const correctOptionIdx = useMemo(() => {
    return q ? q.options.findIndex(opt => opt === q.answer) : -1;
  }, [q]);

  return (
    <div className="flex flex-col items-center max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-8 gap-6 min-h-[60vh]" dir="rtl">
      <div className="self-start">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה", "Back")}
        </Button>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2 text-right">
        {t("תרגול מילות קישור", "Linking Words Practice")}
      </h2>
      <div className="text-sm bg-blue-100 text-blue-900 px-3 py-1 rounded-full mb-2">
        {t(`קטגוריה: ${q.category}`, `Category: ${q.category}`)}
      </div>
      <div className="mb-2 text-right w-full">
        {showTranslation ? (
          <span dir="ltr">{q.translation}</span>
        ) : (
          <span>{q.question}</span>
        )}
        <Button
          variant="link"
          size="sm"
          className="mr-2"
          onClick={() => setShowTranslation((b) => !b)}
        >
          {showTranslation
            ? t("הסתר תרגום", "Hide translation")
            : t("הצג תרגום", "Show translation")}
        </Button>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {q.options.map((opt, idx) => (
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
          className={`rounded-xl p-4 w-full text-lg font-bold text-right ${
            selected === correctOptionIdx
              ? "bg-green-100 text-green-900"
              : "bg-red-100 text-red-900"
          }`}
        >
          {selected === correctOptionIdx
            ? t("נכון! מעולה!", "Correct! Well done!")
            : t(
                `לא נכון. התשובה: ${q.answer}`,
                `Incorrect. The answer: ${q.answer}`
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
