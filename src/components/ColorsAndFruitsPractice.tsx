import React, { useState, useMemo } from "react";
import { Palette, Apple, CheckCircle } from "lucide-react";
import {
  colorsVocabulary,
  fruitsVocabulary,
  stories,
  questions,
  colorQuestions,
  fruitQuestions,
  colorFruitMatchQuestions,
  Question
} from "./colorsAndFruitsData";

const levels = [
  { key: "easy", label: "קל" },
  { key: "medium", label: "בינוני" },
  { key: "hard", label: "קשה" }
] as const;

type LevelKey = typeof levels[number]["key"];
type Phase = "vocab" | "colorQuiz" | "fruitQuiz" | "matchQuiz" | "story" | "storyQuestions";

interface ColorsAndFruitsPracticeProps {
  onBack: () => void;
}

// Shuffle array utility
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ColorsAndFruitsPractice({ onBack }: ColorsAndFruitsPracticeProps) {
  const [level, setLevel] = useState<LevelKey | null>(null);
  const [phase, setPhase] = useState<Phase>("vocab");
  const [showNikud, setShowNikud] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedback, setFeedback] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});

  // Get shuffled questions based on level
  const colorQs = useMemo(() => {
    const count = level === "easy" ? 5 : level === "medium" ? 8 : 10;
    return shuffleArray(colorQuestions).slice(0, count);
  }, [level]);

  const fruitQs = useMemo(() => {
    const count = level === "easy" ? 5 : level === "medium" ? 8 : 10;
    return shuffleArray(fruitQuestions).slice(0, count);
  }, [level]);

  const matchQs = useMemo(() => {
    const count = level === "easy" ? 4 : level === "medium" ? 6 : 10;
    return shuffleArray(colorFruitMatchQuestions).slice(0, count);
  }, [level]);

  const storyQs = level ? questions[level] : [];
  const story = level ? stories[level] : null;

  const getCurrentQuestions = (): Question[] => {
    switch (phase) {
      case "colorQuiz": return colorQs;
      case "fruitQuiz": return fruitQs;
      case "matchQuiz": return matchQs;
      case "storyQuestions": return storyQs;
      default: return [];
    }
  };

  function handleAnswer(qIdx: number, option: string) {
    if (answers[qIdx]) return;
    const qs = getCurrentQuestions();
    setAnswers(prev => ({ ...prev, [qIdx]: option }));
    setFeedback(prev => ({
      ...prev,
      [qIdx]: option === qs[qIdx].answer ? "correct" : "incorrect"
    }));
  }

  function resetAnswers() {
    setAnswers({});
    setFeedback({});
  }

  function resetPractice() {
    setLevel(null);
    setPhase("vocab");
    resetAnswers();
  }

  function nextPhase() {
    resetAnswers();
    const phases: Phase[] = ["vocab", "colorQuiz", "fruitQuiz", "matchQuiz", "story", "storyQuestions"];
    const currentIndex = phases.indexOf(phase);
    if (currentIndex < phases.length - 1) {
      setPhase(phases[currentIndex + 1]);
    }
  }

  function prevPhase() {
    resetAnswers();
    const phases: Phase[] = ["vocab", "colorQuiz", "fruitQuiz", "matchQuiz", "story", "storyQuestions"];
    const currentIndex = phases.indexOf(phase);
    if (currentIndex > 0) {
      setPhase(phases[currentIndex - 1]);
    }
  }

  const currentQs = getCurrentQuestions();
  const correctCount = Object.values(feedback).filter(f => f === "correct").length;
  const totalQuestions = currentQs.length;
  const finished = Object.keys(answers).length === totalQuestions && totalQuestions > 0;

  const phaseLabels: Record<Phase, string> = {
    vocab: "אוצר מילים",
    colorQuiz: "תרגול צבעים",
    fruitQuiz: "תרגול פירות",
    matchQuiz: "התאמה",
    story: "סיפור",
    storyQuestions: "שאלות הבנה"
  };

  // Level selection
  if (!level) {
    return (
      <div className="flex flex-col items-center py-10 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-lg mx-auto mt-8">
        <button
          onClick={onBack}
          className="self-start text-sm text-blue-800 underline underline-offset-2 mb-2"
        >
          ⬅ חזרה לתפריט הראשי
        </button>
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2 mb-3" dir="rtl">
          <Palette className="text-pink-500" />
          <Apple className="text-green-500" />
          צבעים ופירות
        </h2>
        <div className="text-lg font-medium text-gray-700 mb-2" dir="rtl">
          בחר רמת קושי:
        </div>
        <div className="flex gap-4 w-full flex-wrap justify-center">
          {levels.map(({ key, label }) => (
            <button
              key={key}
              className="bg-pink-200 hover:bg-pink-300 transition-all px-7 py-3 rounded-xl border-2 border-pink-400 text-xl font-bold text-pink-900 shadow"
              onClick={() => setLevel(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex gap-2 items-center text-base cursor-pointer mt-4" dir="rtl">
          <input
            type="checkbox"
            checked={showNikud}
            onChange={() => setShowNikud(v => !v)}
            className="accent-pink-500 w-4 h-4"
          />
          הצג ניקוד
        </label>
      </div>
    );
  }

  // Progress bar
  const phases: Phase[] = ["vocab", "colorQuiz", "fruitQuiz", "matchQuiz", "story", "storyQuestions"];
  const currentPhaseIndex = phases.indexOf(phase);

  const ProgressBar = () => (
    <div className="w-full flex items-center gap-1 mb-4">
      {phases.map((p, i) => (
        <div
          key={p}
          className={`flex-1 h-2 rounded-full transition-all ${
            i <= currentPhaseIndex ? "bg-pink-500" : "bg-pink-200"
          }`}
        />
      ))}
    </div>
  );

  const NavButtons = () => (
    <div className="self-start flex gap-4 flex-wrap">
      <button onClick={onBack} className="text-sm text-blue-800 underline underline-offset-2">
        ⬅ חזרה לתפריט הראשי
      </button>
      <button onClick={resetPractice} className="text-sm text-blue-800 underline underline-offset-2">
        ← לרמות
      </button>
      {currentPhaseIndex > 0 && (
        <button onClick={prevPhase} className="text-sm text-blue-800 underline underline-offset-2">
          ← {phaseLabels[phases[currentPhaseIndex - 1]]}
        </button>
      )}
    </div>
  );

  // Vocabulary phase
  if (phase === "vocab") {
    return (
      <div className="flex flex-col items-center py-8 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-2xl mx-auto mt-8">
        <NavButtons />
        <ProgressBar />
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2" dir="rtl">
          <Palette className="text-pink-500" /> אוצר מילים: צבעים
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
          {colorsVocabulary.map((word, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-pink-200 shadow text-center">
              <div className="text-xl font-bold text-pink-700" dir="rtl">
                {showNikud ? word.hebrewWithNikud : word.hebrew}
              </div>
              <div className="text-sm text-gray-600">{word.english}</div>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2 mt-4" dir="rtl">
          <Apple className="text-green-500" /> אוצר מילים: פירות
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-full">
          {fruitsVocabulary.map((word, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-green-200 shadow text-center">
              <div className="text-xl font-bold text-green-700" dir="rtl">
                {showNikud ? word.hebrewWithNikud : word.hebrew}
              </div>
              <div className="text-sm text-gray-600">{word.english}</div>
            </div>
          ))}
        </div>
        <label className="flex gap-2 items-center text-base cursor-pointer mt-2" dir="rtl">
          <input
            type="checkbox"
            checked={showNikud}
            onChange={() => setShowNikud(v => !v)}
            className="accent-pink-500 w-4 h-4"
          />
          הצג ניקוד
        </label>
        <button
          onClick={nextPhase}
          className="mt-4 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow transition-all"
        >
          המשך לתרגול צבעים ←
        </button>
      </div>
    );
  }

  // Quiz phases (colorQuiz, fruitQuiz, matchQuiz, storyQuestions)
  if (["colorQuiz", "fruitQuiz", "matchQuiz", "storyQuestions"].includes(phase)) {
    const phaseTitle = {
      colorQuiz: "🎨 תרגול צבעים",
      fruitQuiz: "🍎 תרגול פירות",
      matchQuiz: "🔗 התאמת צבעים לפירות",
      storyQuestions: "❓ שאלות הבנה על הסיפור"
    }[phase];

    const nextButtonText = {
      colorQuiz: "המשך לתרגול פירות ←",
      fruitQuiz: "המשך להתאמה ←",
      matchQuiz: "המשך לסיפור ←",
      storyQuestions: "סיום"
    }[phase];

    return (
      <div className="flex flex-col items-center py-8 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-2xl mx-auto mt-8">
        <NavButtons />
        <ProgressBar />
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2" dir="rtl">
          {phaseTitle} - רמת {levels.find(l => l.key === level)?.label}
        </h2>
        <div className="flex flex-col gap-4 w-full">
          {currentQs.map((q, i) => (
            <div 
              key={i} 
              className={`w-full bg-white border rounded-xl p-4 shadow transition-all duration-300 ${
                feedback[i] === "correct" ? "border-green-400 animate-bounce-once" : 
                feedback[i] === "incorrect" ? "border-red-400 animate-shake" : "border-pink-200"
              }`}
            >
              <div className="font-semibold text-md mb-3" dir={q.question.startsWith("What") ? "ltr" : "rtl"}>
                {i + 1}. {q.question}
              </div>
              <div className="flex flex-wrap gap-2">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(i, opt)}
                    className={`px-4 py-2 rounded-xl text-base font-medium border transition-all duration-200
                      ${answers[i] === opt
                        ? feedback[i] === "correct"
                          ? "bg-green-200 border-green-500 scale-105"
                          : "bg-red-200 border-red-500 scale-95"
                        : "bg-white border-gray-300 hover:bg-pink-100"
                      }`}
                    disabled={!!answers[i]}
                    dir={opt.match(/[א-ת]/) ? "rtl" : "ltr"}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {answers[i] && (
                <div className="mt-2">
                  {feedback[i] === "correct" ? (
                    <span className="text-green-700 font-bold flex items-center gap-1">
                      <CheckCircle className="w-5 h-5" /> תשובה נכונה!
                    </span>
                  ) : (
                    <span className="text-red-700 font-bold">❌ טעות - התשובה הנכונה: {q.answer}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col items-center gap-3 w-full">
          <div className="font-bold text-lg text-pink-900 bg-pink-100 px-5 py-2 rounded shadow" dir="rtl">
            ניקוד: {correctCount} / {totalQuestions}
          </div>
          {finished && (
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => {
                  resetAnswers();
                }}
                className="px-4 py-2 rounded-lg bg-pink-300 hover:bg-pink-400 text-pink-900 font-semibold"
              >
                🔄 נסה שוב
              </button>
              {phase !== "storyQuestions" ? (
                <button
                  onClick={nextPhase}
                  className="px-6 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-bold"
                >
                  {nextButtonText}
                </button>
              ) : (
                <button
                  onClick={resetPractice}
                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold"
                >
                  🎉 סיום - בחר רמה אחרת
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Story phase
  if (phase === "story") {
    return (
      <div className="flex flex-col items-center py-8 px-4 gap-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-lg border-2 border-pink-300 max-w-2xl mx-auto mt-8">
        <NavButtons />
        <ProgressBar />
        <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2" dir="rtl">
          📖 סיפור - רמת {levels.find(l => l.key === level)?.label}
        </h2>
        <div className="rounded-xl border px-5 py-4 bg-white text-lg leading-8 shadow-sm w-full" dir="rtl">
          {showNikud ? story?.textWithNikud : story?.text}
        </div>
        {showTranslation && (
          <div className="rounded-xl border px-5 py-3 bg-gray-100 text-base text-gray-700 w-full" dir="ltr">
            {story?.translation}
          </div>
        )}
        <div className="flex gap-4 flex-wrap justify-center">
          <label className="flex gap-2 items-center text-base cursor-pointer" dir="rtl">
            <input
              type="checkbox"
              checked={showNikud}
              onChange={() => setShowNikud(v => !v)}
              className="accent-pink-500 w-4 h-4"
            />
            ניקוד
          </label>
          <label className="flex gap-2 items-center text-base cursor-pointer" dir="rtl">
            <input
              type="checkbox"
              checked={showTranslation}
              onChange={() => setShowTranslation(v => !v)}
              className="accent-blue-500 w-4 h-4"
            />
            Show English
          </label>
        </div>
        <button
          onClick={nextPhase}
          className="mt-4 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg shadow transition-all"
        >
          המשך לשאלות הבנה ←
        </button>
      </div>
    );
  }

  return null;
}
