import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export interface ConjugationRow {
  pronoun: string;
  pronounEn: string;
  past: string;
  present: string;
  future: string;
}

export interface BinyanQuestion {
  id: number;
  tense: "past" | "present" | "future";
  sentence: string;
  sentenceEn: string;
  blank: string;
  options: string[];
  correct: string;
}

interface BinyanVerbPracticeProps {
  onBack: () => void;
  initialLevel?: "learn" | "easy" | "medium" | "hard";
  lang?: "he" | "en";
  titleHe: string;
  titleEn: string;
  subtitleHe: string;
  subtitleEn: string;
  explanationHe: string;
  explanationEn: string;
  conjugationTable: ConjugationRow[];
  questions: BinyanQuestion[];
}

type Phase = "table" | "past" | "present" | "future" | "results";
type TenseType = "past" | "present" | "future";

export default function BinyanVerbPractice({
  onBack,
  initialLevel = "learn",
  lang = "he",
  titleHe,
  titleEn,
  subtitleHe,
  subtitleEn,
  explanationHe,
  explanationEn,
  conjugationTable: table,
  questions,
}: BinyanVerbPracticeProps) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);

  const getInitialPhase = (): Phase => {
    if (initialLevel === "learn") return "table";
    return "past";
  };

  const [phase, setPhase] = useState<Phase>(getInitialPhase());
  const [showNikud, setShowNikud] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<{ tense: TenseType; correct: number; total: number }[]>([]);
  const [currentTenseResults, setCurrentTenseResults] = useState({ correct: 0, total: 0 });

  const removeNikud = (text: string) => text.replace(/[\u0591-\u05C7]/g, "");
  const displayText = (text: string) => (showNikud ? text : removeNikud(text));

  const shuffledQuestions = useMemo(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.map((q) => {
      const opts = [...q.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      return { ...q, options: opts };
    });
  }, [phase, questions]);

  const getQuestionsByTense = (tense: TenseType) => shuffledQuestions.filter((q) => q.tense === tense);

  // Filter questions based on difficulty level
  const getFilteredQuestions = (tense: TenseType) => {
    const tenseQuestions = getQuestionsByTense(tense);
    if (initialLevel === "easy") return tense === "present" ? tenseQuestions : [];
    if (initialLevel === "medium") return tense === "future" ? [] : tenseQuestions;
    return tenseQuestions; // hard or learn
  };

  // Determine which tenses are active based on level
  const activeTenses: TenseType[] = useMemo(() => {
    if (initialLevel === "easy") return ["present"];
    if (initialLevel === "medium") return ["past", "present"];
    return ["past", "present", "future"];
  }, [initialLevel]);

  const currentQuestions = phase !== "table" && phase !== "results" ? getFilteredQuestions(phase) : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentQuestion.correct) {
      setCurrentTenseResults((prev) => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setCurrentTenseResults((prev) => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const getNextPhase = (): Phase => {
    const currentIdx = activeTenses.indexOf(phase as TenseType);
    if (currentIdx < activeTenses.length - 1) {
      return activeTenses[currentIdx + 1];
    }
    return "results";
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setResults((prev) => [...prev, { tense: phase as TenseType, ...currentTenseResults }]);
      const next = getNextPhase();
      setPhase(next);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentTenseResults({ correct: 0, total: 0 });
    }
  };

  const startPractice = () => {
    setPhase(activeTenses[0]);
    setResults([]);
    setCurrentTenseResults({ correct: 0, total: 0 });
  };

  const resetPractice = () => {
    setPhase("table");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setResults([]);
    setCurrentTenseResults({ correct: 0, total: 0 });
  };

  const getTenseLabel = (tense: TenseType) => {
    switch (tense) {
      case "past": return "עבר";
      case "present": return "הווה";
      case "future": return "עתיד";
    }
  };

  // Table phase
  if (phase === "table") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ⬅ {t("חזרה לתפריט", "Back to Menu")}
          </Button>

          <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-2">{t(titleHe, titleEn)}</h1>
            <p className="text-center text-muted-foreground mb-2" dir="ltr">{t(subtitleHe, subtitleEn)}</p>
            <p className="text-center text-sm text-muted-foreground mb-4 bg-muted/50 rounded-lg p-3">
              {t(explanationHe, explanationEn)}
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Checkbox id="nikud" checked={showNikud} onCheckedChange={(checked) => setShowNikud(checked === true)} />
              <label htmlFor="nikud" className="text-sm">{t("הצג ניקוד", "Show Nikud")}</label>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr className="bg-secondary">
                    <th className="border border-border p-2 text-right">{t("גוף", "Pronoun")}</th>
                    <th className="border border-border p-2 bg-accent">{t("עבר", "Past")}</th>
                    <th className="border border-border p-2 bg-muted">{t("הווה", "Present")}</th>
                    <th className="border border-border p-2 bg-secondary">{t("עתיד", "Future")}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/50">
                      <td className="border border-border p-2 font-semibold text-right">
                        {row.pronoun}
                        <span className="text-xs text-muted-foreground block" dir="ltr">({row.pronounEn})</span>
                      </td>
                      <td className="border border-border p-2 bg-accent/30 text-lg">{displayText(row.past)}</td>
                      <td className="border border-border p-2 bg-muted/30 text-lg">{displayText(row.present)}</td>
                      <td className="border border-border p-2 bg-secondary/30 text-lg">{displayText(row.future)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center">
              <Button onClick={startPractice} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4">
                {t("התחל תרגול 🎯", "Start Practice 🎯")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results phase
  if (phase === "results") {
    const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
    const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
    const percentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4" dir="rtl">
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">🎉 {t("סיימת את התרגול!", "Practice Complete!")}</h2>

          <div className="space-y-4 mb-6">
            {results.map((r, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-semibold">{getTenseLabel(r.tense)}</span>
                <span className={r.correct === r.total ? "text-green-600" : "text-primary"}>
                  {r.correct} / {r.total}
                </span>
              </div>
            ))}
          </div>

          <div className="text-4xl font-bold mb-2">{percentage}%</div>
          <p className="text-muted-foreground mb-2">
            {totalCorrect} {t("מתוך", "out of")} {totalQuestions} {t("תשובות נכונות", "correct answers")}
          </p>
          <p className="text-lg mb-6">
            {percentage === 100 ? "🌟 מושלם!" : percentage >= 80 ? "💪 כל הכבוד!" : percentage >= 60 ? "👍 לא רע, תמשיך לתרגל!" : "🔄 כדאי לחזור על החומר"}
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={resetPractice} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t("תרגול מחדש", "Practice Again")}
            </Button>
            <Button variant="outline" onClick={onBack}>
              {t("חזרה לתפריט", "Back to Menu")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Skip empty tenses
  if (!currentQuestion) {
    const next = getNextPhase();
    if (next !== "results") {
      setPhase(next);
    } else {
      setPhase("results");
    }
    return null;
  }

  // Practice phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ⬅ {t("חזרה לתפריט", "Back to Menu")}
        </Button>

        <Progress value={((currentQuestionIndex + 1) / currentQuestions.length) * 100} className="mb-4 h-2" />

        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground">
              {t("זמן", "Tense:")} {getTenseLabel(phase as TenseType)}
            </span>
            <span className="text-muted-foreground">
              {t("שאלה", "Question")} {currentQuestionIndex + 1} / {currentQuestions.length}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 mb-4">
            <Checkbox id="nikud-practice" checked={showNikud} onCheckedChange={(checked) => setShowNikud(checked === true)} />
            <label htmlFor="nikud-practice" className="text-sm">{t("הצג ניקוד", "Show Nikud")}</label>
          </div>

          <div className="text-center mb-6">
            <p className="text-2xl font-semibold mb-2 text-right">{displayText(currentQuestion.sentence)}</p>
            <p className="text-muted-foreground" dir="ltr">{currentQuestion.sentenceEn}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = option === currentQuestion.correct;
              const isSelected = option === selectedAnswer;
              let buttonClass = "py-4 text-lg ";
              if (showFeedback) {
                if (isCorrect) buttonClass += "bg-green-500 hover:bg-green-500 text-white";
                else if (isSelected) buttonClass += "bg-destructive hover:bg-destructive text-destructive-foreground";
                else buttonClass += "bg-muted text-muted-foreground";
              } else {
                buttonClass += "bg-secondary hover:bg-secondary/80 text-secondary-foreground";
              }

              return (
                <Button key={idx} onClick={() => handleAnswer(option)} className={buttonClass} disabled={showFeedback}>
                  {displayText(option)}
                </Button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="text-center">
              <p className={`text-lg font-semibold mb-4 ${selectedAnswer === currentQuestion.correct ? "text-green-600" : "text-destructive"}`}>
                {selectedAnswer === currentQuestion.correct
                  ? t("✓ נכון!", "✓ Correct!")
                  : `${t("✗ התשובה הנכונה:", "✗ Correct answer:")} ${displayText(currentQuestion.correct)}`}
              </p>
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {currentQuestionIndex < currentQuestions.length - 1
                  ? t("הבא →", "Next →")
                  : phase === activeTenses[activeTenses.length - 1]
                  ? t("לתוצאות", "Results")
                  : `${t("לזמן", "To")} ${getTenseLabel(getNextPhase() as TenseType)}`}
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t("תשובות נכונות בזמן זה:", "Correct in this tense:")} {currentTenseResults.correct} / {currentTenseResults.total}
          </div>
        </div>
      </div>
    </div>
  );
}
