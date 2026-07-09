import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Check, X, RotateCcw, Sparkles } from "lucide-react";
import { BinyanDrillData, Tense } from "./binyanDrillTypes";
import {
  StageAQuestion,
  StageBQuestion,
  TENSE_LABEL,
  buildStageAQuestions,
  buildStageBQuestions,
  removeNikud,
} from "./binyanDrillUtils";

interface BinyanDrillPracticeProps {
  data: BinyanDrillData;
  onBack: () => void;
}

type Phase = "intro" | "stageA" | "stageATransition" | "stageB" | "unitComplete";

const TENSE_GRADIENT: Record<Tense, string> = {
  past: "from-amber-400 to-orange-500",
  present: "from-emerald-400 to-teal-500",
  future: "from-indigo-500 to-purple-600",
};

export default function BinyanDrillPractice({ data, onBack }: BinyanDrillPracticeProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [tense, setTense] = useState<Tense | null>(null);
  const [showNikud, setShowNikud] = useState(true);

  const [stageAQuestions, setStageAQuestions] = useState<StageAQuestion[]>([]);
  const [stageAIndex, setStageAIndex] = useState(0);
  const [stageASelected, setStageASelected] = useState<number | null>(null);
  const [stageAScore, setStageAScore] = useState(0);

  const [stageBQuestions, setStageBQuestions] = useState<StageBQuestion[]>([]);
  const [stageBIndex, setStageBIndex] = useState(0);
  const [stageBSelected, setStageBSelected] = useState<number | null>(null);
  const [stageBScore, setStageBScore] = useState(0);

  const display = (nikudText: string) => (showNikud ? nikudText : removeNikud(nikudText));

  const startTense = (t: Tense) => {
    setTense(t);
    setStageAQuestions(buildStageAQuestions(data.verbs, t));
    setStageAIndex(0);
    setStageASelected(null);
    setStageAScore(0);
    setPhase("stageA");
  };

  const currentStageA = stageAQuestions[stageAIndex];

  const selectStageA = (idx: number) => {
    if (stageASelected !== null) return;
    setStageASelected(idx);
    if (idx === currentStageA.correctAnswer) setStageAScore((s) => s + 1);
  };

  const nextStageA = () => {
    if (stageAIndex < stageAQuestions.length - 1) {
      setStageAIndex((i) => i + 1);
      setStageASelected(null);
    } else {
      setPhase("stageATransition");
    }
  };

  const startStageB = () => {
    if (!tense) return;
    setStageBQuestions(buildStageBQuestions(data.sentences, tense));
    setStageBIndex(0);
    setStageBSelected(null);
    setStageBScore(0);
    setPhase("stageB");
  };

  const currentStageB = stageBQuestions[stageBIndex];

  const selectStageB = (idx: number) => {
    if (stageBSelected !== null) return;
    setStageBSelected(idx);
    if (idx === currentStageB.correctAnswer) setStageBScore((s) => s + 1);
  };

  const nextStageB = () => {
    if (stageBIndex < stageBQuestions.length - 1) {
      setStageBIndex((i) => i + 1);
      setStageBSelected(null);
    } else {
      setPhase("unitComplete");
    }
  };

  const retryTense = () => {
    if (tense) startTense(tense);
  };

  const totalQuestions = stageAQuestions.length + stageBQuestions.length;
  const totalScore = stageAScore + stageBScore;
  const totalPct = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  const Header = ({ onBackClick, title }: { onBackClick: () => void; title: string }) => (
    <div className="flex justify-between items-center mb-6">
      <Button variant="ghost" onClick={onBackClick} className="gap-2">
        <ArrowRight className="h-4 w-4" />
        חזרה לתפריט
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

  // ===== Intro: tense selection =====
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={onBack} title={data.binyanLabel} />

          <Card className="p-6 mb-6 bg-card/90 text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">בניין {display(data.binyanLabelNikud)}</h1>
            <p className="text-sm text-gray-500">{data.binyanDescription}</p>
          </Card>

          <Card className="p-4 mb-6 bg-card/90">
            <h2 className="font-bold text-lg mb-4 text-center">בחר/י זמן להתחלת התרגול</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["past", "present", "future"] as Tense[]).map((t) => (
                <button
                  key={t}
                  onClick={() => startTense(t)}
                  className={`group py-6 rounded-2xl text-white text-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all bg-gradient-to-br ${TENSE_GRADIENT[t]}`}
                >
                  {TENSE_LABEL[t]}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-card/90 text-sm text-muted-foreground text-center">
            כל זמן כולל שני שלבים: הטיה לפי גופים ({data.verbs.length} פעלים), ואחריו תרגול משפטים מחיי היומיום.
          </Card>
        </div>
      </div>
    );
  }

  // ===== Stage A: conjugation by person =====
  if (phase === "stageA" && currentStageA && tense) {
    const q = currentStageA;
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={onBack} title={`${data.binyanLabel} · ${TENSE_LABEL[tense]} · שלב א'`} />

          <Progress value={((stageAIndex + 1) / stageAQuestions.length) * 100} className="mb-4 h-2" />
          <p className="text-center text-sm text-gray-600 mb-4">
            שלב א׳ · שאלה {stageAIndex + 1} מתוך {stageAQuestions.length} | ציון: {stageAScore}
          </p>

          <Card className="p-6 bg-card/95">
            <div className="mb-4 text-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-br text-white ${TENSE_GRADIENT[tense]}`}
              >
                {TENSE_LABEL[tense]}
              </span>
            </div>

            <p className="text-lg mb-1 text-center text-gray-600">{display(q.verb.infinitiveNikud)}</p>
            <p className="text-center text-xs text-gray-400 mb-4">{q.verb.english}</p>

            <h2 className="text-xl font-bold text-center mb-6 text-foreground">
              גוף: <span className="text-primary">{q.person}</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {q.options.map((option, idx) => {
                const isCorrect = idx === q.correctAnswer;
                const isSelected = stageASelected === idx;
                let buttonClass = "p-4 text-lg transition-all ";
                if (stageASelected !== null) {
                  if (isCorrect) buttonClass += "bg-green-100 border-green-500 text-green-700 ";
                  else if (isSelected) buttonClass += "bg-red-100 border-red-500 text-red-700 ";
                }
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => selectStageA(idx)}
                    disabled={stageASelected !== null}
                  >
                    <span className="flex items-center gap-2">
                      {stageASelected !== null && isCorrect && <Check className="h-4 w-4 text-green-600" />}
                      {stageASelected !== null && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600" />}
                      {display(option)}
                    </span>
                  </Button>
                );
              })}
            </div>

            {stageASelected !== null && (
              <div className="mt-6 text-center">
                <p className={`mb-3 font-medium ${stageASelected === q.correctAnswer ? "text-green-700" : "text-red-700"}`}>
                  {stageASelected === q.correctAnswer
                    ? "נכון!"
                    : `לא נכון. הצורה הנכונה: ${display(q.correctForm)}`}
                </p>
                <Button onClick={nextStageA}>
                  {stageAIndex < stageAQuestions.length - 1 ? "שאלה הבאה" : "לשלב ב׳"}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // ===== Transition between stages =====
  if (phase === "stageATransition" && tense) {
    const pct = Math.round((stageAScore / stageAQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <Card className="p-8 max-w-md w-full text-center bg-card/95">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-primary mb-2">סיימת את שלב א׳!</h2>
          <p className="text-lg mb-1">
            {stageAScore} / {stageAQuestions.length} תשובות נכונות
          </p>
          <p className="text-primary mb-6">{pct}%</p>
          <p className="text-sm text-muted-foreground mb-6">
            עכשיו שלב ב׳: השלמת משפטים מחיי היומיום בזמן {TENSE_LABEL[tense]}.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={startStageB}>המשך לשלב ב׳</Button>
            <Button variant="outline" onClick={() => setPhase("intro")}>
              חזרה לבחירת זמן
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ===== Stage B: sentences =====
  if (phase === "stageB" && currentStageB && tense) {
    const q = currentStageB;
    const [before, after] = q.sentence.split("___");
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={onBack} title={`${data.binyanLabel} · ${TENSE_LABEL[tense]} · שלב ב'`} />

          <Progress value={((stageBIndex + 1) / stageBQuestions.length) * 100} className="mb-4 h-2" />
          <p className="text-center text-sm text-gray-600 mb-4">
            שלב ב׳ · שאלה {stageBIndex + 1} מתוך {stageBQuestions.length} | ציון: {stageBScore}
          </p>

          <Card className="p-6 bg-card/95">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-br text-white ${TENSE_GRADIENT[tense]}`}>
                {TENSE_LABEL[tense]}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground">
                {q.topic}
              </span>
            </div>

            <h2 className="text-xl font-bold text-center mb-6 text-foreground leading-relaxed">
              {before}
              <span className="inline-block mx-1 px-3 border-b-2 border-dashed border-primary text-primary">___</span>
              {after}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {q.options.map((option, idx) => {
                const isCorrect = idx === q.correctAnswer;
                const isSelected = stageBSelected === idx;
                let buttonClass = "p-4 text-lg transition-all ";
                if (stageBSelected !== null) {
                  if (isCorrect) buttonClass += "bg-green-100 border-green-500 text-green-700 ";
                  else if (isSelected) buttonClass += "bg-red-100 border-red-500 text-red-700 ";
                }
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => selectStageB(idx)}
                    disabled={stageBSelected !== null}
                  >
                    <span className="flex items-center gap-2">
                      {stageBSelected !== null && isCorrect && <Check className="h-4 w-4 text-green-600" />}
                      {stageBSelected !== null && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600" />}
                      {display(q.optionsNikud[idx])}
                    </span>
                  </Button>
                );
              })}
            </div>

            {stageBSelected !== null && (
              <div className="mt-6 text-center">
                <p className={`mb-1 font-medium ${stageBSelected === q.correctAnswer ? "text-green-700" : "text-red-700"}`}>
                  {stageBSelected === q.correctAnswer ? "נכון!" : "לא נכון."}
                </p>
                <p className="mb-1 text-foreground">{q.fullSentence}</p>
                <p className="mb-4 text-sm text-muted-foreground">{q.english}</p>
                <Button onClick={nextStageB}>
                  {stageBIndex < stageBQuestions.length - 1 ? "שאלה הבאה" : "סיום היחידה"}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // ===== Unit complete: small progress screen =====
  if (phase === "unitComplete" && tense) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <Card className="p-8 max-w-md w-full text-center bg-card/95">
          <div className="text-6xl mb-4">{totalPct >= 80 ? "🌟" : totalPct >= 60 ? "👍" : "💪"}</div>
          <h2 className="text-2xl font-bold text-primary mb-4">
            סיימת יחידה: {data.binyanLabel} · {TENSE_LABEL[tense]}
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-xl font-bold text-primary">
                {stageAScore}/{stageAQuestions.length}
              </div>
              <div className="text-xs text-muted-foreground">שלב א׳ · גופים</div>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <div className="text-xl font-bold text-primary">
                {stageBScore}/{stageBQuestions.length}
              </div>
              <div className="text-xs text-muted-foreground">שלב ב׳ · משפטים</div>
            </div>
          </div>
          <p className="text-lg text-primary mb-6">{totalPct}% הצלחה כוללת</p>

          <div className="flex flex-col gap-3">
            <Button onClick={retryTense}>
              <RotateCcw className="h-4 w-4 ml-2" />
              תרגל/י שוב את הזמן הזה
            </Button>
            <Button variant="outline" onClick={() => setPhase("intro")}>
              בחר/י זמן אחר
            </Button>
            <Button variant="ghost" onClick={onBack}>
              חזרה לתפריט הראשי
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
}
