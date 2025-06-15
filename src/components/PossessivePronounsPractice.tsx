
import React, { useState } from "react";
import questions from "./possessivePronounsQuestions.json";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  lang?: "he" | "en";
  onBack: () => void;
}

const PossessivePronounsPractice: React.FC<Props> = ({ lang = "he", onBack }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];

  // אפשרויות לשאלה הנוכחית
  const options = lang === "he" ? q.optionsHe : q.optionsEn;
  const correctAnswer = lang === "he" ? q.answerHe : q.answerEn;

  const handleCheck = () => {
    if (selected.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      setScore((s) => s + 1);
    }
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelected("");
    setShowAnswer(false);
    setCurrent((c) => c + 1);
  };

  if (current >= questions.length) {
    return (
      <div className="flex flex-col items-center gap-6 p-4">
        <h2 className="text-xl font-bold text-violet-900" dir="rtl">סיימת!</h2>
        <div className="text-lg" dir="rtl">
          צברת {score} מתוך {questions.length} נקודות.
        </div>
        <Button className="mt-4" onClick={onBack}>⬅ חזרה</Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 p-6 bg-background rounded-2xl shadow border">
      <div className="flex justify-end w-full">
        <Button variant="outline" onClick={onBack}>⬅ חזרה</Button>
      </div>
      <h2 className="text-2xl font-bold text-teal-900 mb-1" dir="rtl">
        תרגול מילות שייכות<br />
        <span className="text-base text-slate-700 font-normal" dir="ltr">Possessive Pronouns Practice</span>
      </h2>
      <div className="w-full bg-slate-50 rounded-xl shadow p-6 mb-2">
        <div className="mb-4" dir={lang === "he" ? "rtl" : "ltr"}>
          <span className="font-bold">{lang === "he" ? q.hebrewExample : q.englishExample}</span>
        </div>
        <RadioGroup
          className="flex flex-col gap-3 mb-3"
          value={selected}
          onValueChange={setSelected}
          dir={lang === "he" ? "rtl" : "ltr"}
        >
          {options.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer text-lg">
              <RadioGroupItem value={option} id={option} disabled={showAnswer} />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
        {!showAnswer ? (
          <Button className="w-full" onClick={handleCheck} disabled={!selected}>
            בדוק / Check
          </Button>
        ) : (
          <div className="mt-2 space-y-2">
            <div className="text-lg" dir={lang === "he" ? "rtl" : "ltr"}>
              תשובה נכונה:{" "}
              <span className="font-bold text-green-700">
                {correctAnswer}
              </span>
            </div>
            <Button className="w-full bg-teal-600 text-white" onClick={handleNext}>
              שאלה הבאה / Next Question
            </Button>
          </div>
        )}
      </div>
      <div className="text-base text-gray-500">שאלה {current + 1} מתוך {questions.length}</div>
    </div>
  );
};

export default PossessivePronounsPractice;
