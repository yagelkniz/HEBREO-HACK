import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Check, X, RotateCcw, Layers, Shuffle } from "lucide-react";
import { ADJ_CATEGORIES, AdjCategoryId, FORM_LABEL } from "./adjectivesDrillTypes";
import { adjectives, adjSentences } from "./AdjectivesDrillData";
import {
  InflectionQuestion,
  OppositeQuestion,
  SentenceQuestion,
  buildInflectionQuestions,
  buildOppositeQuestions,
  buildSentenceQuestions,
  removeNikud,
} from "./adjectivesDrillUtils";

interface AdjectivesDrillPracticeProps {
  onBack: () => void;
}

type Phase = "categorySelect" | "flashcards" | "opposites" | "inflection" | "sentences" | "complete";

const QUIZ_LEN = 10;

export default function AdjectivesDrillPractice({ onBack }: AdjectivesDrillPracticeProps) {
  const [phase, setPhase] = useState<Phase>("categorySelect");
  const [category, setCategory] = useState<AdjCategoryId | "all">("all");
  const [showNikud, setShowNikud] = useState(true);
  const [flashIndex, setFlashIndex] = useState(0);

  const [oppQuestions, setOppQuestions] = useState<OppositeQuestion[]>([]);
  const [oppIndex, setOppIndex] = useState(0);
  const [oppSelected, setOppSelected] = useState<number | null>(null);
  const [oppScore, setOppScore] = useState(0);

  const [inflQuestions, setInflQuestions] = useState<InflectionQuestion[]>([]);
  const [inflIndex, setInflIndex] = useState(0);
  const [inflSelected, setInflSelected] = useState<number | null>(null);
  const [inflScore, setInflScore] = useState(0);

  const [sentQuestions, setSentQuestions] = useState<SentenceQuestion[]>([]);
  const [sentIndex, setSentIndex] = useState(0);
  const [sentSelected, setSentSelected] = useState<number | null>(null);
  const [sentScore, setSentScore] = useState(0);

  const display = (nikudText: string) => (showNikud ? nikudText : removeNikud(nikudText));

  const pool = useMemo(
    () => (category === "all" ? adjectives : adjectives.filter((a) => a.category === category)),
    [category]
  );
  const sentencePool = useMemo(
    () => (category === "all" ? adjSentences : adjSentences.filter((s) => s.category === category)),
    [category]
  );

  const chooseCategory = (c: AdjCategoryId | "all") => {
    setCategory(c);
    setFlashIndex(0);
    setPhase("flashcards");
  };

  const startOpposites = () => {
    setOppQuestions(buildOppositeQuestions(pool, QUIZ_LEN));
    setOppIndex(0);
    setOppSelected(null);
    setOppScore(0);
    setPhase("opposites");
  };

  const selectOpp = (idx: number) => {
    if (oppSelected !== null) return;
    setOppSelected(idx);
    if (idx === oppQuestions[oppIndex].correctAnswer) setOppScore((s) => s + 1);
  };

  const nextOpp = () => {
    if (oppIndex < oppQuestions.length - 1) {
      setOppIndex((i) => i + 1);
      setOppSelected(null);
    } else {
      startInflection();
    }
  };

  const startInflection = () => {
    const usablePool = pool.length >= 4 ? pool : adjectives;
    setInflQuestions(buildInflectionQuestions(usablePool, QUIZ_LEN));
    setInflIndex(0);
    setInflSelected(null);
    setInflScore(0);
    setPhase("inflection");
  };

  const selectInfl = (idx: number) => {
    if (inflSelected !== null) return;
    setInflSelected(idx);
    if (idx === inflQuestions[inflIndex].correctAnswer) setInflScore((s) => s + 1);
  };

  const nextInfl = () => {
    if (inflIndex < inflQuestions.length - 1) {
      setInflIndex((i) => i + 1);
      setInflSelected(null);
    } else {
      startSentences();
    }
  };

  const startSentences = () => {
    const usablePool = sentencePool.length >= 4 ? sentencePool : adjSentences;
    setSentQuestions(buildSentenceQuestions(usablePool, adjectives, QUIZ_LEN));
    setSentIndex(0);
    setSentSelected(null);
    setSentScore(0);
    setPhase("sentences");
  };

  const selectSent = (idx: number) => {
    if (sentSelected !== null) return;
    setSentSelected(idx);
    if (idx === sentQuestions[sentIndex].correctAnswer) setSentScore((s) => s + 1);
  };

  const nextSent = () => {
    if (sentIndex < sentQuestions.length - 1) {
      setSentIndex((i) => i + 1);
      setSentSelected(null);
    } else {
      setPhase("complete");
    }
  };

  const totalQuestions = oppQuestions.length + inflQuestions.length + sentQuestions.length;
  const totalScore = oppScore + inflScore + sentScore;
  const totalPct = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  const categoryTitle = category === "all" ? "כל הקטגוריות" : ADJ_CATEGORIES.find((c) => c.id === category)!.title;

  const Header = ({ onBackClick, title }: { onBackClick: () => void; title: string }) => (
    <div className="flex justify-between items-center mb-6">
      <Button variant="ghost" onClick={onBackClick} className="gap-2">
        <ArrowRight className="h-4 w-4" />
        חזרה
      </Button>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground hidden sm:inline">{title}</span>
        <label className="flex items-center gap-2 text-sm">
          <span>ניקוד</span>
          <Switch checked={showNikud} onCheckedChange={setShowNikud} />
        </label>
      </div>
    </div>
  );

  // ===== Category select =====
  if (phase === "categorySelect") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={onBack} title="תרגול שמות תואר" />

          <Card className="p-6 mb-6 bg-card/90 text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">תרגול שמות תואר</h1>
            <p className="text-sm text-gray-500">50 זוגות ניגודים בעברית, מחולקים ל-5 קטגוריות. בחרו קטגוריה כדי להתחיל.</p>
          </Card>

          <Card className="p-4 bg-card/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => chooseCategory("all")}
                className="py-5 rounded-2xl text-white text-lg font-bold shadow-md hover:shadow-lg active:scale-95 transition-all bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500"
              >
                הכל (50 זוגות)
              </button>
              {ADJ_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => chooseCategory(c.id)}
                  className="py-5 rounded-2xl bg-card border-2 border-border hover:border-primary text-foreground font-bold shadow-sm active:scale-95 transition-all"
                >
                  {c.title}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ===== Flashcards =====
  if (phase === "flashcards") {
    const adj = pool[flashIndex];
    const opposite = pool.find((a) => a.id === adj.oppositeId) ?? adjectives.find((a) => a.id === adj.oppositeId)!;
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={() => setPhase("categorySelect")} title={`שמות תואר · ${categoryTitle} · היכרות`} />

          <p className="text-center text-sm text-gray-600 mb-3">
            כרטיס {flashIndex + 1} מתוך {pool.length}
          </p>
          <Progress value={((flashIndex + 1) / pool.length) * 100} className="mb-4 h-2" />

          <div className="grid grid-cols-2 gap-3 mb-4">
            {[adj, opposite].map((a, i) => (
              <Card key={a.id} className="p-4 bg-card/95 text-center">
                <div className="text-4xl mb-2">{a.emoji}</div>
                <div className="text-2xl font-bold text-primary mb-1">{display(a.ms)}</div>
                <div className="text-xs text-muted-foreground mb-3">{a.english}</div>
                <div className="text-xs space-y-1 text-foreground">
                  <div>{FORM_LABEL.fs}: {display(a.fs)}</div>
                  <div>{FORM_LABEL.mp}: {display(a.mp)}</div>
                  <div>{FORM_LABEL.fp}: {display(a.fp)}</div>
                </div>
                {i === 0 && <div className="mt-3 text-[11px] text-muted-foreground">↔ הפך: {display(opposite.ms)}</div>}
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              disabled={flashIndex === 0}
              onClick={() => setFlashIndex((i) => Math.max(0, i - 1))}
            >
              הקודם
            </Button>
            {flashIndex < pool.length - 1 ? (
              <Button className="flex-1" onClick={() => setFlashIndex((i) => Math.min(pool.length - 1, i + 1))}>
                הבא
              </Button>
            ) : (
              <Button className="flex-1" onClick={startOpposites}>
                <Layers className="h-4 w-4 ml-2" />
                התחלת תרגול
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== Opposites matching =====
  if (phase === "opposites" && oppQuestions[oppIndex]) {
    const q = oppQuestions[oppIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={onBack} title={`שמות תואר · ${categoryTitle} · ניגודים`} />

          <Progress value={((oppIndex + 1) / oppQuestions.length) * 100} className="mb-4 h-2" />
          <p className="text-center text-sm text-gray-600 mb-4">
            שלב 1 · ניגודים · שאלה {oppIndex + 1} מתוך {oppQuestions.length} | ציון: {oppScore}
          </p>

          <Card className="p-6 bg-card/95">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{q.adjective.emoji}</div>
              <p className="text-sm text-muted-foreground mb-1">מה ההפך מ...</p>
              <h2 className="text-2xl font-bold text-primary">{display(q.adjective.ms)}</h2>
              <p className="text-xs text-muted-foreground">{q.adjective.english}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {q.options.map((option, idx) => {
                const isCorrect = idx === q.correctAnswer;
                const isSelected = oppSelected === idx;
                let cls = "p-4 text-lg transition-all ";
                if (oppSelected !== null) {
                  if (isCorrect) cls += "bg-green-100 border-green-500 text-green-700 ";
                  else if (isSelected) cls += "bg-red-100 border-red-500 text-red-700 ";
                }
                return (
                  <Button key={idx} variant="outline" className={cls} onClick={() => selectOpp(idx)} disabled={oppSelected !== null}>
                    <span className="flex items-center gap-2">
                      {oppSelected !== null && isCorrect && <Check className="h-4 w-4 text-green-600" />}
                      {oppSelected !== null && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600" />}
                      {display(option)}
                    </span>
                  </Button>
                );
              })}
            </div>

            {oppSelected !== null && (
              <div className="mt-6 text-center">
                <p className={`mb-1 font-medium ${oppSelected === q.correctAnswer ? "text-green-700" : "text-red-700"}`}>
                  {oppSelected === q.correctAnswer ? "נכון!" : "לא נכון."}
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {display(q.adjective.ms)} הוא ההפך מ־{display(q.correctForm)}
                </p>
                <Button onClick={nextOpp}>{oppIndex < oppQuestions.length - 1 ? "שאלה הבאה" : "לשלב הבא"}</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // ===== Inflection (gender / number) =====
  if (phase === "inflection" && inflQuestions[inflIndex]) {
    const q = inflQuestions[inflIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={onBack} title={`שמות תואר · ${categoryTitle} · הטיה`} />

          <Progress value={((inflIndex + 1) / inflQuestions.length) * 100} className="mb-4 h-2" />
          <p className="text-center text-sm text-gray-600 mb-4">
            שלב 2 · הטיה · שאלה {inflIndex + 1} מתוך {inflQuestions.length} | ציון: {inflScore}
          </p>

          <Card className="p-6 bg-card/95">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{q.adjective.emoji}</div>
              <h2 className="text-2xl font-bold text-primary mb-2">{display(q.adjective.ms)}</h2>
              <p className="text-xs text-muted-foreground mb-2">{q.adjective.english}</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground">
                הטו/י ל: {FORM_LABEL[`${q.gender}${q.number}`]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {q.options.map((option, idx) => {
                const isCorrect = idx === q.correctAnswer;
                const isSelected = inflSelected === idx;
                let cls = "p-4 text-lg transition-all ";
                if (inflSelected !== null) {
                  if (isCorrect) cls += "bg-green-100 border-green-500 text-green-700 ";
                  else if (isSelected) cls += "bg-red-100 border-red-500 text-red-700 ";
                }
                return (
                  <Button key={idx} variant="outline" className={cls} onClick={() => selectInfl(idx)} disabled={inflSelected !== null}>
                    <span className="flex items-center gap-2">
                      {inflSelected !== null && isCorrect && <Check className="h-4 w-4 text-green-600" />}
                      {inflSelected !== null && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600" />}
                      {display(option)}
                    </span>
                  </Button>
                );
              })}
            </div>

            {inflSelected !== null && (
              <div className="mt-6 text-center">
                <p className={`mb-4 font-medium ${inflSelected === q.correctAnswer ? "text-green-700" : "text-red-700"}`}>
                  {inflSelected === q.correctAnswer
                    ? "נכון!"
                    : `לא נכון. הצורה הנכונה (${FORM_LABEL[`${q.gender}${q.number}`]}): ${display(q.correctForm)}`}
                </p>
                <Button onClick={nextInfl}>{inflIndex < inflQuestions.length - 1 ? "שאלה הבאה" : "לשלב הבא"}</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // ===== Sentence completion =====
  if (phase === "sentences" && sentQuestions[sentIndex]) {
    const q = sentQuestions[sentIndex];
    const [before, after] = q.template.split("___");
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={onBack} title={`שמות תואר · ${categoryTitle} · משפטים`} />

          <Progress value={((sentIndex + 1) / sentQuestions.length) * 100} className="mb-4 h-2" />
          <p className="text-center text-sm text-gray-600 mb-4">
            שלב 3 · משפטים · שאלה {sentIndex + 1} מתוך {sentQuestions.length} | ציון: {sentScore}
          </p>

          <Card className="p-6 bg-card/95">
            <h2 className="text-xl font-bold text-center mb-6 text-foreground leading-relaxed">
              {before}
              <span className="inline-block mx-1 px-3 border-b-2 border-dashed border-primary text-primary">___</span>
              {after}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {q.options.map((option, idx) => {
                const isCorrect = idx === q.correctAnswer;
                const isSelected = sentSelected === idx;
                let cls = "p-4 text-lg transition-all ";
                if (sentSelected !== null) {
                  if (isCorrect) cls += "bg-green-100 border-green-500 text-green-700 ";
                  else if (isSelected) cls += "bg-red-100 border-red-500 text-red-700 ";
                }
                return (
                  <Button key={idx} variant="outline" className={cls} onClick={() => selectSent(idx)} disabled={sentSelected !== null}>
                    <span className="flex items-center gap-2">
                      {sentSelected !== null && isCorrect && <Check className="h-4 w-4 text-green-600" />}
                      {sentSelected !== null && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600" />}
                      {display(option)}
                    </span>
                  </Button>
                );
              })}
            </div>

            {sentSelected !== null && (
              <div className="mt-6 text-center">
                <p className={`mb-1 font-medium ${sentSelected === q.correctAnswer ? "text-green-700" : "text-red-700"}`}>
                  {sentSelected === q.correctAnswer ? "נכון!" : "לא נכון."}
                </p>
                <p className="mb-1 text-foreground">{q.template.replace("___", q.correctForm)}</p>
                <p className="mb-4 text-sm text-muted-foreground">{q.english}</p>
                <Button onClick={nextSent}>{sentIndex < sentQuestions.length - 1 ? "שאלה הבאה" : "סיום"}</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // ===== Complete: progress screen =====
  if (phase === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <Card className="p-8 max-w-md w-full text-center bg-card/95">
          <div className="text-6xl mb-4">{totalPct >= 80 ? "🌟" : totalPct >= 60 ? "👍" : "💪"}</div>
          <h2 className="text-2xl font-bold text-primary mb-4">סיימת: שמות תואר · {categoryTitle}</h2>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-lg font-bold text-primary">{oppScore}/{oppQuestions.length}</div>
              <div className="text-[11px] text-muted-foreground">ניגודים</div>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-lg font-bold text-primary">{inflScore}/{inflQuestions.length}</div>
              <div className="text-[11px] text-muted-foreground">הטיה</div>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-lg font-bold text-primary">{sentScore}/{sentQuestions.length}</div>
              <div className="text-[11px] text-muted-foreground">משפטים</div>
            </div>
          </div>
          <p className="text-lg text-primary mb-6">{totalPct}% הצלחה כוללת</p>

          <div className="flex flex-col gap-3">
            <Button onClick={startOpposites}>
              <RotateCcw className="h-4 w-4 ml-2" />
              תרגל/י שוב את הקטגוריה הזו
            </Button>
            <Button variant="outline" onClick={() => setPhase("categorySelect")}>
              <Shuffle className="h-4 w-4 ml-2" />
              בחר/י קטגוריה אחרת
            </Button>
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 ml-2" />
              חזרה לתפריט הראשי
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
