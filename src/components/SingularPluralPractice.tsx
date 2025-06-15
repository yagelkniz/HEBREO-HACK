
import React, { useState, useRef } from "react";
import questions from "./singularPluralQuestions.json";
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
    question: string;
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

  // בניית נתוני השאלה
  const q: SingularPluralQuestion = (questions as SingularPluralQuestion[])[step];

  // חילוץ המילה לשאלה
  const match = q.he.question.match(/'([^']+)'/);
  const baseWord = match ? match[1] : "";
  const heOptions = buildDistractors(baseWord, q.answer);

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

  function playFeedback(isCorrect: boolean) {
    // דמו: בחר סאונד אחר לנכון/לא נכון
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    // קוד לדוג׳: (צריך להוסיף קובצי סאונד בסביבה אמיתית)
    // new Audio(isCorrect ? "correct.mp3" : "wrong.mp3").play();
    // דמו: נשתמש באפקט תדר-דמיוני
    try {
      if (window.AudioContext || (window as any).webkitAudioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = isCorrect ? 880 : 320;
        o.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.25);
      }
    } catch (e) { }
  }

  function handleOption(idx: number) {
    setSelected(idx);
    setShowFeedback(true);
    playFeedback(idx === getCorrectOptionIdx());
  }

  function next() {
    setSelected(null);
    setShowFeedback(false);
    setShowTranslation(false);
    setShowHint(false);
    setStep((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  }

  const t = (h: string, e: string) => (lang === "he" ? h : e);

  function getCorrectOptionIdx() {
    return heOptions.findIndex(opt => opt === q.answer);
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
      {/* דגש רספונסיבי לכפתורים */}
      <div className="flex flex-col gap-3 w-full transition-all">
        {joinedOptions.map((opt, idx) => (
          <Button
            key={idx}
            variant={selected === idx ? "default" : "outline"}
            onClick={() => !showFeedback && handleOption(idx)}
            className="w-full text-xl py-4 md:py-4"
            disabled={showFeedback}
          >
            {opt}
          </Button>
        ))}
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
          <Button variant="secondary" onClick={next} className="text-base md:text-lg">
            {t("המשך", "Next")}
          </Button>
        )}
      </div>
    </div>
  );
}
