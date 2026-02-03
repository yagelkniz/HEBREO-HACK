import React, { useState, useRef, useMemo } from "react";
import questionsData from "./singularPluralQuestions.json";
import { shuffleArray } from "@/lib/shuffleArray";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// תמונות איור רלוונטיות (תוכל להחליף לסטוקים משלך)
const illustrations = [
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901", // חתול
  "https://images.unsplash.com/photo-1493962853295-0fd70327578a", // שור
  "https://images.unsplash.com/photo-1441057206919-63d19fac2369", // פינגווינים
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843", // עץ
  "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9", // עצים
  "https://images.unsplash.com/photo-1473091534298-04dcbce3278c", // שולחן
];

interface SingularPluralQuestion {
  id: number;
  he: {
    question: string;
    options: string[];
    hint: string;
  };
  en: {
    question: string[];
    options: string[];
    hint: string;
  };
  answer: string;
}

type Lang = "he" | "en";

function buildDistractors(word: string, answer: string): string[] {
  // בניית הסחות מכוונות על בסיס סיומות "ים" או "ות", תמיד מבולבל :-)
  const base = word.replace(/ים$|ות$/, "");
  let pluralYim = base + "ים";
  let pluralVot = base + "ות";
  // תמיד יחיד, רבים עם סיומת ניגודית וסיומת מתאימה
  // אם התשובה היא ב-ים, אחת מהאופציות (ולפעמים התשובה) תהיה גם ב-ות, ולהיפך
  if (answer.endsWith("ים")) pluralYim = answer;
  if (answer.endsWith("ות")) pluralVot = answer;
  // מציגים גם את הסיומת הלא נכונה בכוונה
  const distractorEnding = answer.endsWith("ים") ? pluralVot : pluralYim;
  const options: string[] = [base, answer, distractorEnding];
  // מסירים כפילויות למקרה של מילה חריגה
  return Array.from(new Set(options));
}

export default function SingularPluralPractice({
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
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false); // מצב סיכום

  const questions = questionsData as unknown as SingularPluralQuestion[];

  // בניית נתוני השאלה
  const q: SingularPluralQuestion = questions[step];

  // חילוץ המילה לשאלה
  const match = q.he.question.match(/'([^']+)'/);
  const baseWord = match ? match[1] : "";
  const baseDistractors = buildDistractors(baseWord, q.answer);
  
  // Shuffle options for current question
  const heOptions = useMemo(() => {
    return shuffleArray([...baseDistractors]);
  }, [step, baseDistractors.join(',')]);

  // לאנגלית: קישור החכם המקורי
  const enRawOptions = q.en.options.map(opt => opt.replace(/.*\(([^)]+)\).*/, "$1"));
  function findEnglishForHebrew(opt: string): string {
    const idx = q.he.options.indexOf(opt);
    if (idx !== -1 && q.en.options[idx]) {
      return q.en.options[idx].replace(/.*\(([^)]+)\).*/, "$1");
    }
    if (opt.endsWith("ים") && enRawOptions.find(x => x.endsWith("s"))) return enRawOptions.find(x => x.endsWith("s")) as string;
    if (opt.endsWith("ות") && enRawOptions.find(x => x.endsWith("s"))) return enRawOptions.find(x => x.endsWith("s")) as string;
    if (!opt.endsWith("ים") && !opt.endsWith("ות") && enRawOptions.find(x => !x.endsWith("s"))) return enRawOptions.find(x => !x.endsWith("s")) as string;
    return opt;
  }
  const joinedOptions = heOptions.map((heOpt) => `${heOpt} (${findEnglishForHebrew(heOpt)})`);

  // איור: שומר על רצף אחיד (קשור לשאלה)
  const illustration = illustrations[step % illustrations.length];

  // רפרנס לאודיו (פידבק)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- צלילים חדשים: מאוזן והרמוני --- //
  function playFeedback(isCorrect: boolean) {
    if (window.AudioContext || (window as any).webkitAudioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      // תשובה נכונה: הרמוניה שמחה (C+G)
      if (isCorrect) {
        const o1 = ctx.createOscillator();
        const o2 = ctx.createOscillator();
        const gain = ctx.createGain();
        o1.type = "sine";
        o2.type = "triangle";
        o1.frequency.value = 523.25; // C5
        o2.frequency.value = 783.99; // G5
        o1.connect(gain);
        o2.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.13;
        o1.start();
        o2.start(ctx.currentTime + 0.05);
        o1.stop(ctx.currentTime + 0.27);
        o2.stop(ctx.currentTime + 0.33);
        setTimeout(() => ctx.close(), 400);
      } else {
        // תשובה שגויה: ביפ נמוך רך וסיום עם nhẹ vibrato
        const o = ctx.createOscillator();
        const gain = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 220; // A3 (נמוך)
        gain.gain.value = 0.13;
        o.connect(gain);
        gain.connect(ctx.destination);
        o.start();
        setTimeout(() => { o.frequency.setValueAtTime(180, ctx.currentTime + 0.12); }, 120);
        o.stop(ctx.currentTime + 0.30);
        setTimeout(() => ctx.close(), 360);
      }
    }
  }

  function handleOption(idx: number) {
    setSelected(idx);
    setShowFeedback(true);
    const correct = idx === getCorrectOptionIdx();
    playFeedback(correct);
    if (correct) setScore((s) => s + 1);
  }

  function nextQuestion() {
    setSelected(null);
    setShowFeedback(false);
    setShowTranslation(false);
    setShowHint(false);
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  }

  function restartPractice() {
    setStep(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setShowTranslation(false);
    setShowHint(false);
    setShowSummary(false);
  }

  const t = (h: string, e: string) => (lang === "he" ? h : e);

  function getCorrectOptionIdx() {
    return heOptions.findIndex(opt => opt === q.answer);
  }

  // אם מציגים סיכום
  if (showSummary) {
    const remarks = score === questions.length
      ? t("כל הכבוד! הצלחת בכל התרגיל! 😊", "Amazing! You got everything right!")
      : score > questions.length * 0.7
        ? t("מצוין! יש עוד קצת להשתפר.", "Great job! There's some room to improve.")
        : t("מוזמן לנסות שוב כדי להשתפר!", "Try again to improve your score!");
    return (
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-4 md:p-8 gap-6 min-h-[60dvh] animate-fade-in">
        <div className="text-3xl md:text-4xl font-bold mt-3 mb-2 text-green-700 dark:text-green-400 animate-[bounce_1s]">
          {t("סיימת את התרגול!", "Practice Complete!")}
        </div>
        <div className="text-xl font-semibold mt-2 mb-4">
          {t(
            `ענית נכון על ${score} מתוך ${questions.length} שאלות.`,
            `You answered ${score} out of ${questions.length} correctly.`
          )}
        </div>
        <div className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2">
          {remarks}
        </div>
        <Button variant="secondary" onClick={restartPractice} className="text-base md:text-lg mt-1 animate-pulse">
          {t("נסה שוב", "Try Again")}
        </Button>
        <Button variant="ghost" onClick={onBack} className="mt-2">
          ⬅ {t("חזרה", "Back")}
        </Button>
      </div>
    );
  }

  // עיצוב רספונסיבי, מינימום ריווח בכפתורים
  return (
    <div className="flex flex-col items-center max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow p-4 md:p-8 gap-4 md:gap-6 min-h-[70dvh]">
      {/* מד התקדמות - PROGRESS BAR */}
      <div className="w-full mb-1">
        <Progress value={((step + 1) / questions.length) * 100} />
        <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
          <span>{t("התקדמות", "Progress")}</span>
          <span>
            {t(`שאלה ${step + 1} מתוך ${questions.length}`, `Question ${step + 1} of ${questions.length}`)}
          </span>
        </div>
      </div>
      {/* איור שאלה */}
      <div className="mb-0 mt-2">
        <img
          src={illustration}
          alt="אילוסטרציה"
          className="rounded-xl w-[88px] md:w-[120px] mx-auto shadow border bg-gray-100 object-cover aspect-square"
          style={{ maxHeight: 120 }}
        />
      </div>
      {/* כפתור חזור */}
      <div className="self-end">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה", "Back")}
        </Button>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2" dir={lang === "he" ? "rtl" : "ltr"}>
        {t("יחיד/רבים + זכר/נקבה", "Singular/Plural + Gender")}
      </h2>
      <div className="mb-2 flex flex-row items-center" dir={lang === "he" ? "rtl" : "ltr"}>
        <span>{showTranslation ? q.en.question : q.he.question}</span>
        <Button
          variant="link"
          size="sm"
          className="ml-2"
          onClick={() => setShowTranslation((b) => !b)}
        >
          {showTranslation
            ? t("הסתר אנגלית", "Hide English")
            : t("הצג אנגלית", "Show English")}
        </Button>
      </div>
      {/* כפתורי בחירה */}
      <div className="flex flex-col gap-3 w-full transition-all">
        {joinedOptions.map((opt, idx) => {
          let ani = "";
          if (showFeedback) {
            if (selected === idx && idx === getCorrectOptionIdx()) ani = "animate-bounce";
            else if (selected === idx && idx !== getCorrectOptionIdx()) ani = "animate-shake";
          }
          return (
            <Button
              key={idx}
              variant={selected === idx ? "default" : "outline"}
              onClick={() => !showFeedback && handleOption(idx)}
              className={`w-full text-xl py-4 md:py-4 transition-all duration-300 ${ani}`}
              disabled={showFeedback}
            >
              {opt}
            </Button>
          );
        })}
      </div>
      {/* פידבק לתשובה */}
      {showFeedback && (
        <div
          className={`rounded-xl p-4 w-full text-lg font-bold mt-2 ${
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
          {/* כפתור למד עוד/הצג רמז */}
          <Button
            variant="link"
            size="sm"
            className="ml-3"
            onClick={() => setShowHint((show) => !show)}
          >
            {showHint ? t("הסתר הסבר", "Hide hint") : t("למד עוד / רמז", "Learn More / Hint")}
          </Button>
          {showHint && (
            <div className="mt-2 text-base font-normal">
              {t(
                `הסבר: ${q.he.hint}`,
                `Explanation: ${q.en.hint}`
              )}
            </div>
          )}
        </div>
      )}
      {/* המשך/שאלה הבאה */}
      <div className="flex justify-between w-full mt-4">
        <span className="text-gray-500 text-sm md:text-base">
          {t(`שאלה ${step + 1} מתוך ${questions.length}`, `Question ${step + 1} of ${questions.length}`)}
        </span>
        {showFeedback && (
          <Button variant="secondary" onClick={nextQuestion} className="text-base md:text-lg">
            {t("המשך", "Next")}
          </Button>
        )}
      </div>
    </div>
  );
}

// --- אנימציה shake מותאמת אישית --- //
/*
  יש להוסיף להגדרות Tailwind בקובץ tailwind.config.ts:
  theme: {
    extend: {
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translateX(-2px)' },
          '20%, 80%': { transform: 'translateX(4px)' },
          '30%, 50%, 70%': { transform: 'translateX(-6px)' },
          '40%, 60%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        shake: 'shake 0.4s linear',
      }
    }
  }
*/
