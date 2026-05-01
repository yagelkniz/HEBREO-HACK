import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Home, Volume2 } from "lucide-react";
import { ordinalNumbers, ordinalQuestions } from "@/data/ordinalNumbersData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

type Phase = "learn" | "quiz" | "results";

export default function OrdinalNumbersPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [phase, setPhase] = useState<Phase>("learn");
  const [showNikud, setShowNikud] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const removeNikud = (s: string) => s.replace(/[\u0591-\u05C7]/g, "");
  const d = (s: string) => (showNikud ? s : removeNikud(s));

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(removeNikud(text));
    u.lang = "he-IL";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  };

  const shuffledQs = useMemo(() => {
    return shuffleArray(ordinalQuestions).map(q => ({ ...q, options: shuffleArray(q.options) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const question = shuffledQs[currentQ];

  const handleAnswer = (a: string) => {
    if (showFeedback) return;
    setSelected(a);
    setShowFeedback(true);
    if (a === question.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQ < shuffledQs.length - 1) {
      setCurrentQ(i => i + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setPhase("results");
    }
  };

  if (phase === "learn") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <Button variant="ghost" onClick={onBack} className="min-h-[48px]">
              <Home className="h-4 w-4 ml-2" />
              {t("חזרה לתפריט", "Back to Menu")}
            </Button>
            <div className="flex items-center gap-2">
              <Checkbox id="nikud-o" checked={showNikud} onCheckedChange={(c) => setShowNikud(c === true)} />
              <label htmlFor="nikud-o" className="text-sm">{t("ניקוד", "Nikud")}</label>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-2 text-blue-900">
              🥇 {t("מספרים סודרים", "Ordinal Numbers")}
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              {t("ראשון, שני, שלישי... — בזכר ובנקבה", "First, second, third... — masculine & feminine")}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-blue-900">
                    <th className="p-3 border border-blue-200">#</th>
                    <th className="p-3 border border-blue-200">{t("זכר ♂", "Masculine ♂")}</th>
                    <th className="p-3 border border-blue-200">{t("נקבה ♀", "Feminine ♀")}</th>
                    <th className="p-3 border border-blue-200">{t("אנגלית", "English")}</th>
                  </tr>
                </thead>
                <tbody>
                  {ordinalNumbers.map(o => (
                    <tr key={o.number} className="hover:bg-blue-50">
                      <td className="p-3 border border-blue-100 text-center font-bold text-blue-700">{o.number}</td>
                      <td className="p-3 border border-blue-100">
                        <div className="flex items-center justify-between gap-2">
                          <button onClick={() => speak(o.masculineHe)} className="p-2 rounded-full hover:bg-blue-100 min-h-[40px] min-w-[40px]">
                            <Volume2 className="h-4 w-4 text-blue-700" />
                          </button>
                          <div className="text-right flex-1">
                            <div className="text-lg font-semibold">{d(o.masculineNikud)}</div>
                            <div className="text-xs text-muted-foreground" dir="ltr">{o.masculineTrans}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 border border-blue-100">
                        <div className="flex items-center justify-between gap-2">
                          <button onClick={() => speak(o.feminineHe)} className="p-2 rounded-full hover:bg-pink-100 min-h-[40px] min-w-[40px]">
                            <Volume2 className="h-4 w-4 text-pink-700" />
                          </button>
                          <div className="text-right flex-1">
                            <div className="text-lg font-semibold">{d(o.feminineNikud)}</div>
                            <div className="text-xs text-muted-foreground" dir="ltr">{o.feminineTrans}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 border border-blue-100 text-center" dir="ltr">{o.english}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 text-sm">
              <p className="font-semibold text-amber-900 mb-1">💡 {t("חוק חשוב:", "Important rule:")}</p>
              <p className="text-amber-800">
                {t(
                  "המספר הסודר חייב להתאים במין למילה שהוא מתאר. לדוגמה: \"קומה שלישית\" (קומה - נקבה), \"שיעור שלישי\" (שיעור - זכר).",
                  "The ordinal must match the gender of the noun. E.g., 'the third floor' uses feminine because 'floor' (קומה) is feminine."
                )}
              </p>
            </div>

            <div className="text-center mt-6">
              <Button onClick={() => { setPhase("quiz"); setCurrentQ(0); setScore(0); }} className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 min-h-[48px]">
                {t("התחל תרגול 🎯", "Start Practice 🎯")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const pct = Math.round((score / shuffledQs.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-card rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 {t("סיימת!", "Complete!")}</h2>
          <div className="text-5xl font-bold mb-2 text-blue-700">{pct}%</div>
          <p className="text-muted-foreground mb-2">{score} / {shuffledQs.length}</p>
          <p className="text-lg mb-6">
            {pct === 100 ? "🌟 מושלם!" : pct >= 80 ? "💪 כל הכבוד!" : pct >= 60 ? "👍 לא רע!" : "🔄 נסה שוב!"}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button onClick={() => { setPhase("learn"); setCurrentQ(0); setScore(0); }} className="bg-blue-600 hover:bg-blue-700 text-white min-h-[48px]">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <Button variant="ghost" onClick={onBack} className="min-h-[48px]">
            <Home className="h-4 w-4 ml-2" />
            {t("חזרה לתפריט", "Back to Menu")}
          </Button>
          <div className="flex items-center gap-2">
            <Checkbox id="nikud-oq" checked={showNikud} onCheckedChange={(c) => setShowNikud(c === true)} />
            <label htmlFor="nikud-oq" className="text-sm">{t("ניקוד", "Nikud")}</label>
          </div>
        </div>

        <Progress value={((currentQ + 1) / shuffledQs.length) * 100} className="mb-4 h-2" />

        <div className="bg-card rounded-2xl shadow-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">
            {t("שאלה", "Q")} {currentQ + 1} / {shuffledQs.length}
          </div>

          <div className="text-center mb-6">
            <p className="text-2xl font-semibold mb-2">{d(question.sentence)}</p>
            <p className="text-muted-foreground" dir="ltr">{question.sentenceEn}</p>
            {question.hint && (
              <p className="text-sm text-amber-700 mt-2">💡 {question.hint}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {question.options.map((opt, i) => {
              const isCorrect = opt === question.correct;
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
              <p className={`text-lg font-semibold mb-4 ${selected === question.correct ? "text-green-600" : "text-destructive"}`}>
                {selected === question.correct ? t("✓ נכון!", "✓ Correct!") : `${t("✗ התשובה הנכונה:", "✗ Correct:")} ${d(question.correct)}`}
              </p>
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white min-h-[48px]">
                {currentQ < shuffledQs.length - 1 ? t("הבא →", "Next →") : t("לתוצאות", "Results")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
