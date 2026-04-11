import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Home } from "lucide-react";

interface VocabWord {
  hebrew: string;
  hebrewNikud: string;
  english: string;
  transliteration: string;
  gender: "m" | "f";
  exampleHe: string;
  exampleEn: string;
}

interface FillBlankQuestion {
  id: number;
  sentence: string;
  sentenceEn: string;
  blank: string;
  options: string[];
  correct: string;
}

interface VocabPracticeModuleProps {
  onBack: () => void;
  lang?: "he" | "en";
  titleHe: string;
  titleEn: string;
  emoji: string;
  words: VocabWord[];
  questions: FillBlankQuestion[];
}

type Phase = "words" | "quiz" | "results";

export default function VocabPracticeModule({
  onBack,
  lang = "he",
  titleHe,
  titleEn,
  emoji,
  words,
  questions,
}: VocabPracticeModuleProps) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [phase, setPhase] = useState<Phase>("words");
  const [showNikud, setShowNikud] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const removeNikud = (text: string) => text.replace(/[\u0591-\u05C7]/g, "");
  const d = (text: string) => (showNikud ? text : removeNikud(text));

  const shuffledQs = useMemo(() => {
    return [...questions].sort(() => Math.random() - 0.5).map((q) => {
      const opts = [...q.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      return { ...q, options: opts };
    });
  }, [phase, questions]);

  const question = shuffledQs[currentQ];

  const handleAnswer = (ans: string) => {
    if (showFeedback) return;
    setSelected(ans);
    setShowFeedback(true);
    if (ans === question.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < shuffledQs.length - 1) {
      setCurrentQ((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setPhase("results");
    }
  };

  const speakHebrew = (text: string) => {
    const u = new SpeechSynthesisUtterance(removeNikud(text));
    u.lang = "he-IL";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  // Word list phase
  if (phase === "words") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" onClick={onBack}>⬅ {t("חזרה לתפריט", "Back to Menu")}</Button>
            <div className="flex items-center gap-2">
              <Checkbox id="nikud" checked={showNikud} onCheckedChange={(c) => setShowNikud(c === true)} />
              <label htmlFor="nikud" className="text-sm">{t("ניקוד", "Nikud")}</label>
            </div>
          </div>

          <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-6">{emoji} {t(titleHe, titleEn)}</h1>

            <div className="grid gap-3">
              {words.map((w, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <button onClick={() => speakHebrew(w.hebrew)} className="text-lg hover:scale-110 transition-transform">🔊</button>
                    <div>
                      <span className="text-lg font-bold">{d(w.hebrewNikud)}</span>
                      <span className="text-xs text-muted-foreground mr-2">({w.transliteration})</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium">{w.english}</span>
                    <span className="text-xs text-muted-foreground block" dir="ltr">{w.gender === "m" ? "♂ זכר" : "♀ נקבה"}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button onClick={() => { setPhase("quiz"); setCurrentQ(0); setScore(0); setSelected(null); setShowFeedback(false); }} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4">
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
    const pct = Math.round((score / shuffledQs.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4" dir="rtl">
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 {t("סיימת!", "Complete!")}</h2>
          <div className="text-5xl font-bold mb-2">{pct}%</div>
          <p className="text-muted-foreground mb-2">{score} {t("מתוך", "out of")} {shuffledQs.length} {t("תשובות נכונות", "correct")}</p>
          <p className="text-lg mb-6">
            {pct === 100 ? "🌟 מושלם!" : pct >= 80 ? "💪 כל הכבוד!" : pct >= 60 ? "👍 לא רע!" : "🔄 נסה שוב!"}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => { setPhase("words"); setCurrentQ(0); setScore(0); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {t("תרגול מחדש", "Practice Again")}
            </Button>
            <Button variant="outline" onClick={onBack}>
              <Home className="h-4 w-4 ml-2" />
              {t("חזרה לתפריט", "Back to Menu")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={onBack}>⬅ {t("חזרה לתפריט", "Back to Menu")}</Button>
          <div className="flex items-center gap-2">
            <Checkbox id="nikud-q" checked={showNikud} onCheckedChange={(c) => setShowNikud(c === true)} />
            <label htmlFor="nikud-q" className="text-sm">{t("ניקוד", "Nikud")}</label>
          </div>
        </div>

        <Progress value={((currentQ + 1) / shuffledQs.length) * 100} className="mb-4 h-2" />

        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">{t("שאלה", "Q")} {currentQ + 1} / {shuffledQs.length}</span>
          </div>

          <div className="text-center mb-6">
            <p className="text-2xl font-semibold mb-2 text-right">{d(question.sentence)}</p>
            <p className="text-muted-foreground" dir="ltr">{question.sentenceEn}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {question.options.map((opt, i) => {
              const isCorrect = opt === question.correct;
              const isSelected = opt === selected;
              let cls = "py-4 text-lg ";
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
                {selected === question.correct
                  ? t("✓ נכון!", "✓ Correct!")
                  : `${t("✗ התשובה הנכונה:", "✗ Correct:")} ${d(question.correct)}`}
              </p>
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {currentQ < shuffledQs.length - 1 ? t("הבא →", "Next →") : t("לתוצאות", "Results")}
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {t("תשובות נכונות:", "Correct:")} {score} / {currentQ + (showFeedback ? 1 : 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
