import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Home, Volume2 } from "lucide-react";
import { binyanimInActionExercises } from "@/data/binyanimInActionData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function BinyanimInActionPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [showNikud, setShowNikud] = useState(true);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const exercises = useMemo(() => shuffleArray(binyanimInActionExercises).map(e => ({
    ...e,
    options: shuffleArray(e.options),
  })), []);

  const ex = exercises[index];
  const removeNikud = (s: string) => s.replace(/[\u0591-\u05C7]/g, "");
  const d = (s: string) => (showNikud ? s : removeNikud(s));

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(removeNikud(text));
    u.lang = "he-IL";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  const handleAnswer = (a: string) => {
    if (showFeedback) return;
    setSelected(a);
    setShowFeedback(true);
    if (a === ex.correct) setScore(s => s + 1);
  };

  const next = () => {
    if (index < exercises.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-100 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 {t("סיימת!", "Complete!")}</h2>
          <div className="text-5xl font-bold mb-2 text-purple-700">{pct}%</div>
          <p className="text-muted-foreground mb-2">{score} / {exercises.length}</p>
          <p className="text-lg mb-6">
            {pct === 100 ? "🌟 שולט בבניינים!" : pct >= 80 ? "💪 מצוין!" : pct >= 60 ? "👍 ממשיך להשתפר!" : "🔄 נסה שוב!"}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button onClick={restart} className="bg-purple-600 hover:bg-purple-700 text-white min-h-[48px]">
              {t("תרגול מחדש", "Practice Again")}
            </Button>
            <Button variant="outline" onClick={onBack} className="min-h-[48px]">
              <Home className="h-4 w-4 ml-2" />
              {t("חזרה לתפריט", "Back to Menu")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-purple-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <Button variant="ghost" onClick={onBack} className="min-h-[48px]">
            <Home className="h-4 w-4 ml-2" />
            {t("חזרה לתפריט", "Back to Menu")}
          </Button>
          <div className="flex items-center gap-2">
            <Checkbox id="nikud-b" checked={showNikud} onCheckedChange={(c) => setShowNikud(c === true)} />
            <label htmlFor="nikud-b" className="text-sm">{t("ניקוד", "Nikud")}</label>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2 text-purple-900">
          🔄 {t("בניינים בפעולה", "Binyanim in Action")}
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-4">
          {t("הפוך משפט מבניין אחד לבניין אחר", "Transform a sentence from one binyan to another")}
        </p>

        <Progress value={((index + 1) / exercises.length) * 100} className="mb-4 h-2" />

        <div className="bg-card rounded-2xl shadow-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">
            {t("תרגיל", "Exercise")} {index + 1} / {exercises.length}
          </div>

          {/* Source sentence */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-1 rounded-full">
                {t("מקור", "Source")}: {ex.sourceBinyan}
              </span>
              <button onClick={() => speak(ex.sourceSentence)} className="p-2 rounded-full hover:bg-amber-100 min-h-[40px] min-w-[40px]">
                <Volume2 className="h-4 w-4 text-amber-700" />
              </button>
            </div>
            <p className="text-xl font-semibold text-right">{d(ex.sourceSentenceNikud)}</p>
          </div>

          {/* Arrow + Target */}
          <div className="text-center text-2xl mb-2">⬇️</div>
          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 mb-4">
            <span className="text-xs font-bold bg-purple-200 text-purple-900 px-2 py-1 rounded-full inline-block mb-2">
              {t("יעד", "Target")}: {ex.targetBinyan}
            </span>
            <p className="text-base font-medium">{ex.instruction}</p>
            <p className="text-xs text-muted-foreground mt-1" dir="ltr">{ex.instructionEn}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {ex.options.map((opt, i) => {
              const isCorrect = opt === ex.correct;
              const isSelected = opt === selected;
              let cls = "py-4 text-lg min-h-[48px] ";
              if (showFeedback) {
                if (isCorrect) cls += "bg-green-500 hover:bg-green-500 text-white";
                else if (isSelected) cls += "bg-destructive hover:bg-destructive text-destructive-foreground";
                else cls += "bg-muted text-muted-foreground";
              } else {
                cls += "bg-secondary hover:bg-secondary/80 text-secondary-foreground";
              }
              return (
                <Button key={i} onClick={() => handleAnswer(opt)} className={cls} disabled={showFeedback}>
                  {d(opt)}
                </Button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="text-center">
              <p className={`text-lg font-semibold mb-2 ${selected === ex.correct ? "text-green-600" : "text-destructive"}`}>
                {selected === ex.correct ? t("✓ נכון!", "✓ Correct!") : `${t("✗ התשובה הנכונה:", "✗ Correct:")} ${d(ex.correct)}`}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-right">
                <p className="font-semibold text-blue-900 mb-1">💡 {t("הסבר:", "Explanation:")}</p>
                <p className="text-blue-800">{lang === "he" ? ex.explanation : ex.explanationEn}</p>
              </div>
              <Button onClick={next} className="bg-purple-600 hover:bg-purple-700 text-white min-h-[48px]">
                {index < exercises.length - 1 ? t("הבא →", "Next →") : t("לתוצאות", "Results")}
              </Button>
            </div>
          )}

          <div className="mt-3 text-center text-sm text-muted-foreground">
            {t("תשובות נכונות:", "Correct:")} {score} / {index + (showFeedback ? 1 : 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
