import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Check, X, RotateCcw, Sparkles, Grid3x3, Shuffle, BookOpen, SkipForward } from "lucide-react";
import { BinyanDrillData, DrillVerb, Person, PERSONS, Story, Tense } from "./binyanDrillTypes";
import {
  StageAQuestion,
  StageBQuestion,
  TENSE_LABEL,
  buildStageAQuestion,
  buildStageAQuestions,
  buildStageBQuestions,
  removeNikud,
} from "./binyanDrillUtils";

interface BinyanDrillPracticeProps {
  data: BinyanDrillData;
  onBack: () => void;
}

type Phase =
  | "intro"
  | "stageA"
  | "stageATransition"
  | "stageB"
  | "unitComplete"
  | "crossTableSetup"
  | "crossTable"
  | "storyTenseSelect"
  | "story"
  | "storySummary";

type BlankStatus = "correct" | "wrong" | "skipped";

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

  // Cross-table drill: one verb x all 10 persons, filled cell by cell.
  const [crossTense, setCrossTense] = useState<Tense>("past");
  const [crossVerb, setCrossVerb] = useState<DrillVerb | null>(null);
  const [openPerson, setOpenPerson] = useState<Person | null>(null);
  const [crossAnswers, setCrossAnswers] = useState<Partial<Record<Person, number>>>({});

  const display = (nikudText: string) => (showNikud ? nikudText : removeNikud(nikudText));

  const crossTableQuestions = useMemo(() => {
    if (!crossVerb) return null;
    const map = {} as Record<Person, StageAQuestion>;
    PERSONS.forEach((p) => {
      map[p] = buildStageAQuestion(crossVerb, crossTense, p);
    });
    return map;
  }, [crossVerb, crossTense]);

  const pickRandomVerb = (excludeInfinitive?: string) => {
    const pool = excludeInfinitive ? data.verbs.filter((v) => v.infinitive !== excludeInfinitive) : data.verbs;
    const verb = pool[Math.floor(Math.random() * pool.length)] ?? data.verbs[0];
    setCrossVerb(verb);
    setOpenPerson(null);
    setCrossAnswers({});
    setPhase("crossTable");
  };

  const chooseCrossVerb = (verb: DrillVerb) => {
    setCrossVerb(verb);
    setOpenPerson(null);
    setCrossAnswers({});
    setPhase("crossTable");
  };

  const answerCross = (person: Person, idx: number) => {
    setCrossAnswers((prev) => ({ ...prev, [person]: idx }));
    setOpenPerson(null);
  };

  const crossFilledCount = Object.keys(crossAnswers).length;

  // Story cloze drill: one hand-authored story per tense (only present for
  // binyanim that have data.stories), filled in one verb at a time by typing.
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [storyResults, setStoryResults] = useState<Record<number, BlankStatus>>({});
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [pendingWrongIndex, setPendingWrongIndex] = useState<number | null>(null);
  const [storyInput, setStoryInput] = useState("");

  const storyVerbForm = (sentence: Story["sentences"][number]): string => {
    const verb = data.verbs.find((v) => v.infinitive === sentence.verbInfinitive);
    return verb ? verb.conjugations[currentStory!.tense][sentence.person] : "";
  };

  const pickStory = (t: Tense) => {
    const story = data.stories?.find((s) => s.tense === t) ?? null;
    setCurrentStory(story);
    setStoryResults({});
    setActiveStoryIndex(null);
    setPendingWrongIndex(null);
    setStoryInput("");
    setPhase("story");
  };

  const openStoryBlank = (idx: number) => {
    if (storyResults[idx]) return;
    setActiveStoryIndex(idx);
    setPendingWrongIndex(null);
    setStoryInput("");
  };

  // Typed answers are compared leniently: nikud'd forms strip to "defective"
  // spelling (e.g. חִפֵּשׂ -> חפש), but students normally type the "plene"
  // spelling (חיפש) since they never see nikud on a keyboard. Dropping internal
  // ו/י from both sides after stripping nikud accepts either spelling without
  // needing to hand-author a second plain-spelling field for every story verb.
  const normalizeForCompare = (text: string) => removeNikud(text).replace(/[וי]/g, "").trim();

  const checkStoryAnswer = (idx: number) => {
    if (!currentStory) return;
    const correctForm = storyVerbForm(currentStory.sentences[idx]);
    const ok = normalizeForCompare(storyInput) === normalizeForCompare(correctForm);
    if (ok) {
      setStoryResults((prev) => ({ ...prev, [idx]: "correct" }));
      setActiveStoryIndex(null);
    } else {
      setPendingWrongIndex(idx);
    }
  };

  const retryStoryAnswer = (idx: number) => {
    setPendingWrongIndex(null);
    setActiveStoryIndex(idx);
    setStoryInput("");
  };

  const acceptStoryWrong = (idx: number) => {
    setStoryResults((prev) => ({ ...prev, [idx]: "wrong" }));
    setPendingWrongIndex(null);
  };

  const skipStoryBlank = (idx: number) => {
    setStoryResults((prev) => ({ ...prev, [idx]: "skipped" }));
    setActiveStoryIndex(null);
    setPendingWrongIndex(null);
  };

  const storyFilledCount = currentStory ? Object.keys(storyResults).length : 0;
  const storyDone = currentStory !== null && storyFilledCount === currentStory.sentences.length;
  const storyCorrectCount = Object.values(storyResults).filter((s) => s === "correct").length;
  const storyHardVerbs = currentStory
    ? currentStory.sentences
        .map((s, i) => ({ s, i }))
        .filter(({ i }) => storyResults[i] === "wrong" || storyResults[i] === "skipped")
        .map(({ s, i }) => ({ infinitive: s.verbInfinitive, correctForm: storyVerbForm(s), status: storyResults[i] }))
    : [];

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

          <Card className="p-4 mb-6 bg-card/90 text-sm text-muted-foreground text-center">
            כל זמן כולל שני שלבים: הטיה לפי גופים ({data.verbs.length} פעלים), ואחריו תרגול משפטים מחיי היומיום.
          </Card>

          <Card className={`p-4 bg-card/90 ${data.stories?.length ? "mb-6" : ""}`}>
            <button
              onClick={() => setPhase("crossTableSetup")}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-right"
            >
              <span className="shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                <Grid3x3 className="h-5 w-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-bold text-foreground">תרגול נוסף: טבלת הצלבה</span>
                <span className="block text-xs text-muted-foreground">בחרו פועל וזמן, ומלאו את כל 10 הגופים תא אחרי תא</span>
              </span>
              <ArrowLeft className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          </Card>

          {data.stories && data.stories.length > 0 && (
            <Card className="p-4 bg-card/90">
              <button
                onClick={() => setPhase("storyTenseSelect")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-right"
              >
                <span className="shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-foreground">תרגול נוסף: סיפור</span>
                  <span className="block text-xs text-muted-foreground">קראו סיפור קצר והשלימו את הפעלים לפי הזמן שבחרתם</span>
                </span>
                <ArrowLeft className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            </Card>
          )}
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

  // ===== Cross-table setup: pick tense + verb =====
  if (phase === "crossTableSetup") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={() => setPhase("intro")} title={`${data.binyanLabel} · טבלת הצלבה`} />

          <Card className="p-6 mb-6 bg-card/90 text-center">
            <h1 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
              <Grid3x3 className="h-6 w-6" />
              טבלת הצלבה
            </h1>
            <p className="text-sm text-gray-500">בחרו זמן ופועל, ואז מלאו תא אחרי תא את כל 10 הגופים.</p>
          </Card>

          <Card className="p-4 mb-6 bg-card/90">
            <h2 className="font-bold text-base mb-3 text-center">זמן</h2>
            <div className="grid grid-cols-3 gap-3">
              {(["past", "present", "future"] as Tense[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setCrossTense(t)}
                  className={`py-3 rounded-xl text-white font-bold shadow-sm active:scale-95 transition-all bg-gradient-to-br ${TENSE_GRADIENT[t]} ${crossTense === t ? "ring-4 ring-primary/40" : "opacity-70"}`}
                >
                  {TENSE_LABEL[t]}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4 mb-6 bg-card/90">
            <Button className="w-full mb-4" onClick={() => pickRandomVerb()}>
              <Shuffle className="h-4 w-4 ml-2" />
              פועל אקראי
            </Button>
            <h2 className="font-bold text-base mb-3 text-center">או בחרו פועל</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-80 overflow-y-auto">
              {data.verbs.map((v) => (
                <Button key={v.infinitive} variant="outline" className="py-3 h-auto flex-col" onClick={() => chooseCrossVerb(v)}>
                  <span className="text-base">{display(v.infinitiveNikud)}</span>
                  <span className="text-[11px] text-muted-foreground">{v.english}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ===== Cross-table: fill all 10 persons for one verb =====
  if (phase === "crossTable" && crossVerb && crossTableQuestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={() => setPhase("intro")} title={`${data.binyanLabel} · טבלת הצלבה`} />

          <Card className="p-4 mb-4 bg-card/95 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className={`inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-br text-white ${TENSE_GRADIENT[crossTense]}`}>
                {TENSE_LABEL[crossTense]}
              </span>
              <h2 className="text-2xl font-bold text-primary">{display(crossVerb.infinitiveNikud)}</h2>
            </div>
            <p className="text-xs text-muted-foreground">{crossVerb.english}</p>
          </Card>

          <p className="text-center text-sm text-gray-600 mb-3">מולאו {crossFilledCount} מתוך 10 גופים</p>
          <Progress value={(crossFilledCount / 10) * 100} className="mb-4 h-2" />

          <Card className="p-3 bg-card/95 mb-4">
            <div className="space-y-2">
              {PERSONS.map((person) => {
                const q = crossTableQuestions[person];
                const answered = crossAnswers[person];
                const isOpen = openPerson === person;
                return (
                  <div key={person} className="rounded-xl border border-border overflow-hidden">
                    <button
                      onClick={() => {
                        if (answered !== undefined) return;
                        setOpenPerson(isOpen ? null : person);
                      }}
                      className={`w-full flex items-center justify-between p-3 transition-colors ${
                        answered !== undefined
                          ? answered === q.correctAnswer
                            ? "bg-green-50"
                            : "bg-red-50"
                          : isOpen
                          ? "bg-muted"
                          : "bg-background hover:bg-muted"
                      }`}
                    >
                      <span className="font-bold text-primary">{person}</span>
                      {answered !== undefined ? (
                        <span className="flex items-center gap-2">
                          {answered === q.correctAnswer ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <X className="h-4 w-4 text-red-600" />
                          )}
                          <span className={answered === q.correctAnswer ? "text-green-700" : "text-red-700"}>
                            {display(q.correctForm)}
                          </span>
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">{isOpen ? "בחר/י תשובה" : "לחצו למילוי"}</span>
                      )}
                    </button>
                    {isOpen && answered === undefined && (
                      <div className="grid grid-cols-2 gap-2 p-3 pt-0 bg-muted/40">
                        {q.options.map((option, idx) => (
                          <Button key={idx} variant="outline" size="sm" onClick={() => answerCross(person, idx)}>
                            {display(option)}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Button onClick={() => pickRandomVerb(crossVerb.infinitive)}>
              <Shuffle className="h-4 w-4 ml-2" />
              פועל אקראי
            </Button>
            <Button variant="outline" onClick={() => setPhase("crossTableSetup")}>
              בחר/י פועל וזמן אחר
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ===== Story: pick tense =====
  if (phase === "storyTenseSelect") {
    const availableTenses = (["past", "present", "future"] as Tense[]).filter((t) =>
      data.stories?.some((s) => s.tense === t)
    );
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={() => setPhase("intro")} title={`${data.binyanLabel} · סיפור`} />

          <Card className="p-6 mb-6 bg-card/90 text-center">
            <h1 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6" />
              תרגול סיפור
            </h1>
            <p className="text-sm text-gray-500">בחרו זמן. הסיפור משתמש רק בפעלים של בניין {data.binyanLabel}.</p>
          </Card>

          <Card className="p-4 bg-card/90">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {availableTenses.map((t) => (
                <button
                  key={t}
                  onClick={() => pickStory(t)}
                  className={`py-6 rounded-2xl text-white text-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all bg-gradient-to-br ${TENSE_GRADIENT[t]}`}
                >
                  {TENSE_LABEL[t]}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // ===== Story: read + fill in the verbs =====
  if (phase === "story" && currentStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <div className="max-w-2xl mx-auto">
          <Header onBackClick={() => setPhase("intro")} title={`${data.binyanLabel} · ${TENSE_LABEL[currentStory.tense]} · סיפור`} />

          <div className="mb-4 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-br text-white ${TENSE_GRADIENT[currentStory.tense]}`}>
              {TENSE_LABEL[currentStory.tense]}
            </span>
          </div>

          <p className="text-center text-sm text-gray-600 mb-3">
            הושלמו {storyFilledCount} מתוך {currentStory.sentences.length} פעלים
          </p>
          <Progress value={(storyFilledCount / currentStory.sentences.length) * 100} className="mb-4 h-2" />

          <Card className="p-6 bg-card/95 mb-4">
            <h2 className="text-lg font-bold text-primary mb-4 text-center">{currentStory.title}</h2>
            <p className="text-xl leading-[2.6] text-foreground text-right">
              {currentStory.sentences.map((sentence, i) => {
                const verb = data.verbs.find((v) => v.infinitive === sentence.verbInfinitive);
                const correctForm = storyVerbForm(sentence);
                const status = storyResults[i];

                let blank: JSX.Element;
                if (status === "correct") {
                  blank = <span className="mx-1 font-bold text-green-700">{display(correctForm)}</span>;
                } else if (status === "wrong") {
                  blank = <span className="mx-1 font-bold text-red-700">{display(correctForm)}</span>;
                } else if (status === "skipped") {
                  blank = <span className="mx-1 font-bold text-amber-700">{display(correctForm)}</span>;
                } else if (pendingWrongIndex === i) {
                  blank = (
                    <span className="inline-flex flex-wrap items-center gap-2 align-middle mx-1 bg-red-50 border border-red-200 rounded-lg px-2 py-1 text-sm">
                      <span className="text-red-700">
                        לא נכון. הצורה הנכונה: <b>{display(correctForm)}</b>
                      </span>
                      <button onClick={() => retryStoryAnswer(i)} className="text-primary underline font-medium">
                        נסה שוב
                      </button>
                      <button onClick={() => acceptStoryWrong(i)} className="text-muted-foreground underline">
                        המשך
                      </button>
                    </span>
                  );
                } else if (activeStoryIndex === i) {
                  blank = (
                    <span className="inline-flex items-center gap-1 align-middle mx-1">
                      <input
                        autoFocus
                        dir="rtl"
                        value={storyInput}
                        onChange={(e) => setStoryInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") checkStoryAnswer(i);
                        }}
                        className="w-28 px-2 py-1 rounded-lg border-2 border-primary text-center text-base focus:outline-none"
                        placeholder={verb ? display(verb.infinitiveNikud) : ""}
                      />
                      <button onClick={() => checkStoryAnswer(i)} className="text-xs px-2 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium">
                        בדוק
                      </button>
                      <button onClick={() => skipStoryBlank(i)} className="text-xs px-2 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium">
                        דלג לתשובה
                      </button>
                    </span>
                  );
                } else {
                  blank = (
                    <span className="inline-flex items-center gap-1 align-middle mx-1">
                      <button
                        onClick={() => openStoryBlank(i)}
                        className="px-2 py-0.5 rounded-lg bg-teal-50 border-2 border-dashed border-teal-400 text-teal-700 font-bold hover:bg-teal-100 transition-colors"
                      >
                        [{verb ? display(verb.infinitiveNikud) : sentence.verbInfinitive}]
                      </button>
                      <button
                        onClick={() => skipStoryBlank(i)}
                        title="דלג לתשובה"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <SkipForward className="h-4 w-4" />
                      </button>
                    </span>
                  );
                }

                return (
                  <span key={i}>
                    {i > 0 ? " " : ""}
                    {sentence.before}
                    {blank}
                    {sentence.after}
                  </span>
                );
              })}
            </p>
          </Card>

          {storyDone && (
            <Button className="w-full" onClick={() => setPhase("storySummary")}>
              <Sparkles className="h-4 w-4 ml-2" />
              לסיכום
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ===== Story summary =====
  if (phase === "storySummary" && currentStory) {
    const total = currentStory.sentences.length;
    const pct = total > 0 ? Math.round((storyCorrectCount / total) * 100) : 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-accent flex items-center justify-center p-4" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif" }}>
        <Card className="p-8 max-w-md w-full text-center bg-card/95">
          <div className="text-6xl mb-4">{pct >= 80 ? "🌟" : pct >= 60 ? "👍" : "💪"}</div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            סיימתם את הסיפור: {currentStory.title}
          </h2>
          <p className="text-lg mb-1">
            {storyCorrectCount} / {total} פעלים נכונים בפעם הראשונה
          </p>
          <p className="text-primary mb-6">{pct}%</p>

          {storyHardVerbs.length > 0 && (
            <div className="mb-6 text-right">
              <h3 className="font-bold text-sm text-muted-foreground mb-2 text-center">פעלים שכדאי לחזור עליהם</h3>
              <div className="space-y-1">
                {storyHardVerbs.map(({ infinitive, correctForm, status }, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2 text-sm">
                    <span className={status === "skipped" ? "text-amber-700" : "text-red-700"}>
                      {status === "skipped" ? "דילוג" : "טעות"}
                    </span>
                    <span className="font-medium text-foreground">
                      {display(correctForm)} <span className="text-muted-foreground">({infinitive})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button onClick={() => pickStory(currentStory.tense)}>
              <RotateCcw className="h-4 w-4 ml-2" />
              נסה שוב את הסיפור הזה
            </Button>
            <Button variant="outline" onClick={() => setPhase("storyTenseSelect")}>
              סיפור בזמן אחר
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
