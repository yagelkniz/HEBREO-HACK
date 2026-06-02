import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Home, RotateCcw, Lock, Check, X, Share2 } from "lucide-react";

// ============ DATA ============
const VERB_DATA = [
  { hebrew: "כָּתַב", binyan: "פָּעַל", root: "כ.ת.ב", english: "wrote", passive: "נִכְתַּב", passiveBinyan: "נִפְעַל" },
  { hebrew: "שָׁלַח", binyan: "פָּעַל", root: "ש.ל.ח", english: "sent", passive: "נִשְׁלַח", passiveBinyan: "נִפְעַל" },
  { hebrew: "לִמֵּד", binyan: "פִּעֵל", root: "ל.מ.ד", english: "taught", passive: "לֻמַּד", passiveBinyan: "פֻּעַל" },
  { hebrew: "תִּקֵּן", binyan: "פִּעֵל", root: "ת.ק.נ", english: "corrected", passive: "תֻּקַּן", passiveBinyan: "פֻּעַל" },
  { hebrew: "הִזְמִין", binyan: "הִפְעִיל", root: "ז.מ.נ", english: "invited", passive: "הוּזְמַן", passiveBinyan: "הָפְעַל" },
  { hebrew: "הֶעֱבִיר", binyan: "הִפְעִיל", root: "ע.ב.ר", english: "transferred", passive: "הוּעְבַּר", passiveBinyan: "הָפְעַל" },
];

type BinyanKey = "פָּעַל" | "פִּעֵל" | "הִפְעִיל" | "נִפְעַל" | "פֻּעַל" | "הָפְעַל";

const BINYAN_COLORS: Record<BinyanKey, { bg: string; text: string; border: string; ring: string; soft: string; hex: string }> = {
  "פָּעַל": { bg: "bg-blue-500", text: "text-blue-700", border: "border-blue-400", ring: "ring-blue-400", soft: "bg-blue-50", hex: "#3b82f6" },
  "פִּעֵל": { bg: "bg-purple-500", text: "text-purple-700", border: "border-purple-400", ring: "ring-purple-400", soft: "bg-purple-50", hex: "#a855f7" },
  "הִפְעִיל": { bg: "bg-green-500", text: "text-green-700", border: "border-green-400", ring: "ring-green-400", soft: "bg-green-50", hex: "#22c55e" },
  "נִפְעַל": { bg: "bg-orange-500", text: "text-orange-700", border: "border-orange-400", ring: "ring-orange-400", soft: "bg-orange-50", hex: "#f97316" },
  "פֻּעַל": { bg: "bg-rose-500", text: "text-rose-700", border: "border-rose-400", ring: "ring-rose-400", soft: "bg-rose-50", hex: "#f43f5e" },
  "הָפְעַל": { bg: "bg-teal-500", text: "text-teal-700", border: "border-teal-400", ring: "ring-teal-400", soft: "bg-teal-50", hex: "#14b8a6" },
};

const ALL_BINYANIM: BinyanKey[] = ["פָּעַל", "פִּעֵל", "הִפְעִיל", "נִפְעַל", "פֻּעַל", "הָפְעַל"];

const STORY: { text: string; binyan: BinyanKey; root: string; english: string }[] = [
  { text: "המורה ", binyan: null as any, root: "", english: "" },
  { text: "כָּתַב", binyan: "פָּעַל", root: "כ.ת.ב", english: "wrote" },
  { text: " את השיעור על הלוח. התלמידים ", binyan: null as any, root: "", english: "" },
  { text: "לָמְדוּ", binyan: "פָּעַל", root: "ל.מ.ד", english: "learned" },
  { text: " בקשב רב. המורה ", binyan: null as any, root: "", english: "" },
  { text: "לִמֵּד", binyan: "פִּעֵל", root: "ל.מ.ד", english: "taught" },
  { text: " אותם דקדוק עברי. הוא ", binyan: null as any, root: "", english: "" },
  { text: "תִּקֵּן", binyan: "פִּעֵל", root: "ת.ק.נ", english: "corrected" },
  { text: " את הטעויות בסבלנות. המנהל ", binyan: null as any, root: "", english: "" },
  { text: "הִזְמִין", binyan: "הִפְעִיל", root: "ז.מ.נ", english: "invited" },
  { text: " מורה אורח לשיעור. המורה ", binyan: null as any, root: "", english: "" },
  { text: "הֶעֱבִיר", binyan: "הִפְעִיל", root: "ע.ב.ר", english: "delivered" },
  { text: " את השיעור בהתלהבות. כל המילים ", binyan: null as any, root: "", english: "" },
  { text: "נִכְתְּבוּ", binyan: "נִפְעַל", root: "כ.ת.ב", english: "were written" },
  { text: " במחברת. שיעורי הבית ", binyan: null as any, root: "", english: "" },
  { text: "נִשְׁלְחוּ", binyan: "נִפְעַל", root: "ש.ל.ח", english: "were sent" },
  { text: " לתלמידים. הציונים ", binyan: null as any, root: "", english: "" },
  { text: "תֻּקְּנוּ", binyan: "פֻּעַל", root: "ת.ק.נ", english: "were corrected" },
  { text: " בערב. החומר ", binyan: null as any, root: "", english: "" },
  { text: "לֻמַּד", binyan: "פֻּעַל", root: "ל.מ.ד", english: "was taught" },
  { text: " שוב בבית. המורה האורח ", binyan: null as any, root: "", english: "" },
  { text: "הוּזְמַן", binyan: "הָפְעַל", root: "ז.מ.נ", english: "was invited" },
  { text: " שוב לשבוע הבא. הידע ", binyan: null as any, root: "", english: "" },
  { text: "הוּעְבַּר", binyan: "הָפְעַל", root: "ע.ב.ר", english: "was transferred" },
  { text: " מהמורה לתלמידים.", binyan: null as any, root: "", english: "" },
];

const STORY_EN = "The teacher wrote the lesson on the board. The students learned attentively. The teacher taught them Hebrew grammar. He corrected the mistakes patiently. The principal invited a guest teacher to the class. The teacher delivered the lesson with enthusiasm. All the words were written in the notebook. The homework was sent to the students. The grades were corrected in the evening. The material was taught again at home. The guest teacher was invited again next week. The knowledge was transferred from teacher to students.";

const TABLE_ROWS: { binyan: BinyanKey; type: "active" | "passive"; example: string; root: string; meaning: string }[] = [
  { binyan: "פָּעַל", type: "active", example: "כָּתַב", root: "כ.ת.ב", meaning: "כתב" },
  { binyan: "פִּעֵל", type: "active", example: "לִמֵּד", root: "ל.מ.ד", meaning: "לימד" },
  { binyan: "הִפְעִיל", type: "active", example: "הִזְמִין", root: "ז.מ.נ", meaning: "הזמין" },
  { binyan: "נִפְעַל", type: "passive", example: "נִכְתַּב", root: "כ.ת.ב", meaning: "נכתב" },
  { binyan: "פֻּעַל", type: "passive", example: "לֻמַּד", root: "ל.מ.ד", meaning: "לומד (סביל)" },
  { binyan: "הָפְעַל", type: "passive", example: "הוּזְמַן", root: "ז.מ.נ", meaning: "הוזמן" },
];

// Fisher-Yates
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stripNikud(s: string) { return s.replace(/[\u0591-\u05C7]/g, ""); }
function normalizeAns(s: string) { return stripNikud(s).trim(); }

// ============ MAIN COMPONENT ============
export default function ActivePassive() {
  const [step, setStep] = useState(1);
  const [unlocked, setUnlocked] = useState(1);
  const [quizScore, setQuizScore] = useState(0);
  const [exercisesDone, setExercisesDone] = useState<Set<string>>(new Set());

  const goStep = (n: number) => { if (n <= unlocked) setStep(n); };
  const unlock = (n: number) => setUnlocked(u => Math.max(u, n));

  const reset = () => {
    setStep(1); setUnlocked(1); setQuizScore(0); setExercisesDone(new Set());
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-purple-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <button onClick={() => { window.location.hash = "#/"; }}
            className="flex items-center gap-1 text-sm font-medium text-purple-700 hover:text-purple-900 px-3 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 transition">
            <Home size={16} /> תפריט
          </button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-800">⚡ פעיל וסביל</h1>
            <p className="text-xs text-gray-500">שלב {step} מתוך 5</p>
          </div>
          <button onClick={reset} title="התחל מחדש"
            className="p-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 transition">
            <RotateCcw size={16} />
          </button>
        </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => goStep(n)} disabled={n > unlocked}
                className={`flex-1 h-2 rounded-full transition-all ${
                  n === step ? "bg-purple-500" : n < step || n <= unlocked ? "bg-purple-300" : "bg-gray-200"
                }`} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-gray-500 font-medium">
            {["📖 סיפור", "📊 טבלה", "🧠 מבחן", "✏️ תרגול", "🎉 סיום"].map((label, i) => (
              <button key={i} onClick={() => goStep(i + 1)} disabled={i + 1 > unlocked}
                className={`flex items-center gap-0.5 ${i + 1 > unlocked ? "opacity-40" : ""} ${step === i + 1 ? "text-purple-700 font-bold" : ""}`}>
                {i + 1 > unlocked && <Lock size={9} />} {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-20">
        {step === 1 && <Step1Story onNext={() => { unlock(2); setStep(2); }} />}
        {step === 2 && <Step2Table onNext={() => { unlock(3); setStep(3); }} />}
        {step === 3 && <Step3Quiz onPass={(s) => { setQuizScore(s); unlock(4); setStep(4); }} />}
        {step === 4 && <Step4Exercises done={exercisesDone} setDone={setExercisesDone} onNext={() => { unlock(5); setStep(5); }} />}
        {step === 5 && <Step5Done quizScore={quizScore} exercisesCount={exercisesDone.size} onRestart={reset} onStory={() => setStep(1)} />}
      </main>
    </div>
  );
}

// ============ STEP 1 — STORY ============
function Step1Story({ onNext }: { onNext: () => void }) {
  const [showTrans, setShowTrans] = useState(false);
  const [tooltip, setTooltip] = useState<number | null>(null);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => { const t = setTimeout(() => setCanContinue(true), 15000); return () => clearTimeout(t); }, []);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100">
        <h3 className="text-sm font-bold text-gray-700 mb-2">🎨 מקרא צבעים</h3>
        <div className="grid grid-cols-2 gap-2">
          {ALL_BINYANIM.map(b => (
            <div key={b} className="flex items-center gap-2 text-sm">
              <span className={`w-3 h-3 rounded-full ${BINYAN_COLORS[b].bg}`} />
              <span className={`font-bold ${BINYAN_COLORS[b].text}`}>{b}</span>
              <span className="text-xs text-gray-400">
                ({TABLE_ROWS.find(r => r.binyan === b)?.type === "active" ? "פעיל" : "סביל"})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">📖 יום בבית הספר</h2>
          <button onClick={() => setShowTrans(s => !s)}
            className="text-xs px-3 py-1.5 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium">
            {showTrans ? "הסתר תרגום" : "הצג תרגום"}
          </button>
        </div>
        <p className="text-xl leading-loose text-gray-800" style={{ lineHeight: 2 }}>
          {STORY.map((seg, i) => {
            if (!seg.binyan) return <span key={i}>{seg.text}</span>;
            const c = BINYAN_COLORS[seg.binyan];
            return (
              <span key={i} className="relative inline-block">
                <button onClick={() => setTooltip(tooltip === i ? null : i)}
                  className={`font-bold ${c.text} underline decoration-2 decoration-dotted underline-offset-4 cursor-pointer hover:scale-110 transition-transform inline-block px-0.5`}>
                  {seg.text}
                </button>
                {tooltip === i && (
                  <span className={`absolute z-20 top-full mt-2 right-1/2 translate-x-1/2 w-44 ${c.soft} border-2 ${c.border} rounded-xl p-2 text-sm shadow-lg text-right`}>
                    <span className={`block font-bold ${c.text}`}>{seg.binyan}</span>
                    <span className="block text-xs text-gray-600">שורש: {seg.root}</span>
                    <span className="block text-xs text-gray-600">{seg.english}</span>
                  </span>
                )}
              </span>
            );
          })}
        </p>
        {showTrans && (
          <p dir="ltr" className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 italic text-left">
            {STORY_EN}
          </p>
        )}
      </div>

      <button onClick={onNext} disabled={!canContinue}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2">
        {canContinue ? "המשך" : "קרא את הסיפור..."} <ArrowRight size={18} />
      </button>
    </div>
  );
}

// ============ STEP 2 — TABLE ============
function Step2Table({ onNext }: { onNext: () => void }) {
  const [clicked, setClicked] = useState<Set<BinyanKey>>(new Set());
  const [selected, setSelected] = useState<BinyanKey | null>(null);

  const click = (b: BinyanKey) => {
    setSelected(b);
    setClicked(s => new Set(s).add(b));
  };

  const PAIRS: [BinyanKey, BinyanKey, string, string][] = [
    ["פָּעַל", "נִפְעַל", "כָּתַב", "נִכְתַּב"],
    ["פִּעֵל", "פֻּעַל", "לִמֵּד", "לֻמַּד"],
    ["הִפְעִיל", "הָפְעַל", "הִזְמִין", "הוּזְמַן"],
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100">
        <h2 className="text-xl font-bold text-gray-800 mb-1">📊 הטבלה החיה</h2>
        <p className="text-xs text-gray-500 mb-3">לחצו על שורה כדי לראות הופעות בסיפור • הקליקו על לפחות 3 שורות</p>

        {/* Active section */}
        <div className="rounded-xl overflow-hidden border-2 border-green-200 mb-3">
          <div className="bg-green-50 px-3 py-2 text-sm font-bold text-green-800">
            פעיל — הנושא עושה את הפעולה
          </div>
          {TABLE_ROWS.filter(r => r.type === "active").map(r => (
            <TableRow key={r.binyan} row={r} active={selected === r.binyan} onClick={() => click(r.binyan)} />
          ))}
        </div>

        {/* Passive section */}
        <div className="rounded-xl overflow-hidden border-2 border-orange-200">
          <div className="bg-orange-50 px-3 py-2 text-sm font-bold text-orange-800">
            סביל — הפעולה נעשית לנושא
          </div>
          {TABLE_ROWS.filter(r => r.type === "passive").map(r => (
            <TableRow key={r.binyan} row={r} active={selected === r.binyan} onClick={() => click(r.binyan)} />
          ))}
        </div>

        {/* Preview */}
        {selected && (
          <div className={`mt-3 p-3 rounded-xl ${BINYAN_COLORS[selected].soft} border-2 ${BINYAN_COLORS[selected].border}`}>
            <p className="text-xs text-gray-600 mb-1">הופעות של <b className={BINYAN_COLORS[selected].text}>{selected}</b> בסיפור:</p>
            <p className="text-base leading-relaxed">
              {STORY.filter(s => s.binyan === selected).map((s, i) => (
                <span key={i} className={`inline-block ml-2 font-bold ${BINYAN_COLORS[selected].text}`}>
                  {s.text}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>

      {/* Pairs */}
      <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100">
        <h3 className="text-sm font-bold text-gray-700 mb-3">🔄 זוגות פעיל ↔ סביל</h3>
        <div className="space-y-2">
          {PAIRS.map(([a, p, av, pv], i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex-1 p-3 rounded-xl ${BINYAN_COLORS[a].soft} border-2 ${BINYAN_COLORS[a].border} text-center`}>
                <div className={`text-xs font-bold ${BINYAN_COLORS[a].text}`}>{a}</div>
                <div className="text-lg font-bold text-gray-800">{av}</div>
              </div>
              <span className="text-2xl">↔</span>
              <div className={`flex-1 p-3 rounded-xl ${BINYAN_COLORS[p].soft} border-2 ${BINYAN_COLORS[p].border} text-center`}>
                <div className={`text-xs font-bold ${BINYAN_COLORS[p].text}`}>{p}</div>
                <div className="text-lg font-bold text-gray-800">{pv}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onNext} disabled={clicked.size < 3}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2">
        {clicked.size < 3 ? `לחצו על ${3 - clicked.size} שורות נוספות` : "המשך"} <ArrowRight size={18} />
      </button>
    </div>
  );
}

function TableRow({ row, active, onClick }: { row: typeof TABLE_ROWS[0]; active: boolean; onClick: () => void }) {
  const c = BINYAN_COLORS[row.binyan];
  return (
    <button onClick={onClick}
      className={`w-full grid grid-cols-[1fr,auto,1fr,auto] gap-2 px-3 py-2.5 text-right border-t border-gray-100 transition-all ${active ? `${c.soft} ring-2 ${c.ring}` : "bg-white hover:bg-gray-50"}`}>
      <div className={`font-bold ${c.text} flex items-center gap-2`}>
        <span className={`w-2 h-2 rounded-full ${c.bg}`} /> {row.binyan}
      </div>
      <div className="text-lg font-bold text-gray-800">{row.example}</div>
      <div className="text-xs text-gray-500 self-center">{row.root}</div>
      <div className="text-xs text-gray-400 self-center">{row.meaning}</div>
    </button>
  );
}

// ============ STEP 3 — QUIZ ============
type Q = { sentence: string; verb: string; answer: BinyanKey; type: "identify" } | { prompt: string; verb: string; answer: string; binyan: BinyanKey; type: "flip" };

function buildQuestions(): Q[] {
  const identify: Q[] = [
    { type: "identify", sentence: "המורה ___ את השיעור על הלוח.", verb: "כָּתַב", answer: "פָּעַל" },
    { type: "identify", sentence: "המורה ___ את התלמידים דקדוק.", verb: "לִמֵּד", answer: "פִּעֵל" },
    { type: "identify", sentence: "המנהל ___ מורה אורח.", verb: "הִזְמִין", answer: "הִפְעִיל" },
    { type: "identify", sentence: "כל המילים ___ במחברת.", verb: "נִכְתְּבוּ", answer: "נִפְעַל" },
    { type: "identify", sentence: "הציונים ___ בערב.", verb: "תֻּקְּנוּ", answer: "פֻּעַל" },
    { type: "identify", sentence: "המורה ___ שוב לשבוע הבא.", verb: "הוּזְמַן", answer: "הָפְעַל" },
    { type: "identify", sentence: "המורה ___ את הטעויות.", verb: "תִּקֵּן", answer: "פִּעֵל" },
    { type: "identify", sentence: "החומר ___ שוב בבית.", verb: "לֻמַּד", answer: "פֻּעַל" },
    { type: "identify", sentence: "שיעורי הבית ___ לתלמידים.", verb: "נִשְׁלְחוּ", answer: "נִפְעַל" },
    { type: "identify", sentence: "הידע ___ מהמורה לתלמידים.", verb: "הוּעְבַּר", answer: "הָפְעַל" },
  ];
  return shuffle(identify).slice(0, 7).concat([
    { type: "flip", prompt: "מה הצורה הסבילה של כָּתַב?", verb: "כָּתַב", answer: "נִכְתַּב", binyan: "נִפְעַל" },
    { type: "flip", prompt: "מה הצורה הסבילה של לִמֵּד?", verb: "לִמֵּד", answer: "לֻמַּד", binyan: "פֻּעַל" },
    { type: "flip", prompt: "מה הצורה הסבילה של הִזְמִין?", verb: "הִזְמִין", answer: "הוּזְמַן", binyan: "הָפְעַל" },
  ]);
}

function Step3Quiz({ onPass }: { onPass: (score: number) => void }) {
  const [questions, setQuestions] = useState<Q[]>(() => buildQuestions());
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [flipInput, setFlipInput] = useState("");

  const q = questions[idx];
  const flipChoices = useMemo<string[]>(() => {
    if (q?.type !== "flip") return [];
    const wrong = VERB_DATA.filter(v => v.passive !== q.answer).map(v => v.passive);
    return shuffle([q.answer, ...shuffle(wrong).slice(0, 3)]);
  }, [idx, questions]);

  const identifyChoices = useMemo<BinyanKey[]>(() => {
    if (q?.type !== "identify") return [];
    const wrong = ALL_BINYANIM.filter(b => b !== q.answer);
    return shuffle([q.answer, ...shuffle(wrong).slice(0, 3)]);
  }, [idx, questions]);

  const submit = (ans: string) => {
    const correct = q.type === "identify" ? ans === q.answer : ans === q.answer;
    setShowResult(correct);
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, ans]);
    setTimeout(() => {
      setShowResult(null);
      setFlipInput("");
      if (idx + 1 >= questions.length) {
        // done
        const finalScore = score + (correct ? 1 : 0);
        if (finalScore >= 7) {
          setTimeout(() => onPass(finalScore), 800);
        } else {
          setTimeout(() => {
            alert(`קיבלת ${finalScore}/10. בוא ננסה שוב!`);
            setQuestions(buildQuestions()); setIdx(0); setScore(0); setAnswers([]);
          }, 600);
        }
      } else {
        setIdx(i => i + 1);
      }
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">🧠 מבחן זיהוי</h2>
          <span className="text-sm font-bold text-purple-600">{idx + 1}/{questions.length} • ⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md border border-purple-100">
        {q.type === "identify" ? (
          <>
            <p className="text-sm text-gray-500 mb-2">באיזה בניין הפועל המסומן?</p>
            <p className="text-xl text-gray-800 leading-relaxed mb-1">
              {q.sentence.split("___").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <b className="text-purple-600 underline decoration-dotted">{q.verb}</b>}
                </span>
              ))}
            </p>
            <div className="grid grid-cols-2 gap-2 mt-5">
              {identifyChoices.map(opt => {
                const c = BINYAN_COLORS[opt];
                const isAns = showResult !== null && opt === q.answer;
                const isPick = showResult !== null && answers[answers.length - 1] === opt;
                return (
                  <button key={opt} onClick={() => showResult === null && submit(opt)}
                    disabled={showResult !== null}
                    className={`py-3 rounded-xl font-bold text-lg border-2 transition-all ${
                      isAns ? `${c.bg} text-white ${c.border}` :
                      isPick && !showResult ? "bg-red-500 text-white border-red-500" :
                      `${c.soft} ${c.text} ${c.border} hover:scale-[1.02]`
                    }`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-2">{q.prompt}</p>
            <p className="text-3xl font-bold text-center text-purple-700 my-4">{q.verb}</p>
            <div className="grid grid-cols-2 gap-2">
              {flipChoices.map(opt => {
                const isAns = showResult !== null && opt === q.answer;
                const isPick = showResult !== null && answers[answers.length - 1] === opt;
                return (
                  <button key={opt} onClick={() => showResult === null && submit(opt)}
                    disabled={showResult !== null}
                    className={`py-3 rounded-xl font-bold text-lg border-2 transition-all ${
                      isAns ? "bg-green-500 text-white border-green-500" :
                      isPick && !showResult ? "bg-red-500 text-white border-red-500" :
                      "bg-purple-50 text-purple-700 border-purple-200 hover:scale-[1.02]"
                    }`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {showResult !== null && (
          <div className={`mt-4 p-3 rounded-xl flex items-center justify-center gap-2 font-bold ${showResult ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {showResult ? <><Check size={20} /> נכון!</> : <><X size={20} /> התשובה: {q.answer}</>}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ STEP 4 — EXERCISES ============
function Step4Exercises({ done, setDone, onNext }: { done: Set<string>; setDone: (s: Set<string>) => void; onNext: () => void }) {
  const [tab, setTab] = useState<"A" | "B" | "C">("A");

  const markDone = (t: string) => { const n = new Set(done); n.add(t); setDone(n); };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100">
        <h2 className="text-lg font-bold text-gray-800 mb-1">✏️ תרגילים</h2>
        <p className="text-xs text-gray-500 mb-3">השלימו 2 מתוך 3 משימות • הושלמו: {done.size}/3</p>
        <div className="grid grid-cols-3 gap-2">
          {(["A", "B", "C"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`py-2 rounded-xl text-sm font-bold transition-all ${tab === t ? "bg-purple-500 text-white" : "bg-purple-50 text-purple-700"} ${done.has(t) ? "ring-2 ring-green-400" : ""}`}>
              {done.has(t) && "✓ "}{t === "A" ? "השלמה" : t === "B" ? "פעיל↔סביל" : "מיון"}
            </button>
          ))}
        </div>
      </div>

      {tab === "A" && <TabA onDone={() => markDone("A")} />}
      {tab === "B" && <TabB onDone={() => markDone("B")} />}
      {tab === "C" && <TabC onDone={() => markDone("C")} />}

      <button onClick={onNext} disabled={done.size < 2}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2">
        {done.size < 2 ? `השלימו ${2 - done.size} משימות נוספות` : "סיים"} <ArrowRight size={18} />
      </button>
    </div>
  );
}

function TabA({ onDone }: { onDone: () => void }) {
  const items = [
    { sentence: "המורה ____ את השיעור על הלוח.", root: "כ.ת.ב", binyan: "פָּעַל" as BinyanKey, answer: "כָּתַב" },
    { sentence: "המורה ____ אותם דקדוק עברי.", root: "ל.מ.ד", binyan: "פִּעֵל" as BinyanKey, answer: "לִמֵּד" },
    { sentence: "המנהל ____ מורה אורח לשיעור.", root: "ז.מ.נ", binyan: "הִפְעִיל" as BinyanKey, answer: "הִזְמִין" },
    { sentence: "המורה ____ את הטעויות בסבלנות.", root: "ת.ק.נ", binyan: "פִּעֵל" as BinyanKey, answer: "תִּקֵּן" },
    { sentence: "כל המילים ____ במחברת.", root: "כ.ת.ב", binyan: "נִפְעַל" as BinyanKey, answer: "נִכְתְּבוּ" },
    { sentence: "החומר ____ שוב בבית.", root: "ל.מ.ד", binyan: "פֻּעַל" as BinyanKey, answer: "לֻמַּד" },
    { sentence: "המורה האורח ____ שוב לשבוע הבא.", root: "ז.מ.נ", binyan: "הָפְעַל" as BinyanKey, answer: "הוּזְמַן" },
    { sentence: "המורה ____ את השיעור בהתלהבות.", root: "ע.ב.ר", binyan: "הִפְעִיל" as BinyanKey, answer: "הֶעֱבִיר" },
  ];
  const [vals, setVals] = useState<string[]>(items.map(() => ""));
  const [checked, setChecked] = useState(false);

  const check = () => {
    setChecked(true);
    const correct = items.filter((it, i) => normalizeAns(vals[i]) === normalizeAns(it.answer)).length;
    if (correct >= 6) onDone();
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100 space-y-3">
      {items.map((it, i) => {
        const c = BINYAN_COLORS[it.binyan];
        const isCorrect = checked && normalizeAns(vals[i]) === normalizeAns(it.answer);
        const isWrong = checked && vals[i] && !isCorrect;
        return (
          <div key={i} className="border-b border-gray-100 pb-3 last:border-0">
            <p className="text-base text-gray-800 mb-1">{i + 1}. {it.sentence}</p>
            <div className="flex items-center gap-2 mb-1.5">
              <input value={vals[i]} onChange={e => { const n = [...vals]; n[i] = e.target.value; setVals(n); }}
                disabled={checked}
                className={`flex-1 px-3 py-2 rounded-xl border-2 text-lg text-right ${
                  isCorrect ? "border-green-400 bg-green-50" :
                  isWrong ? "border-red-400 bg-red-50" :
                  "border-gray-200 focus:border-purple-400"
                } outline-none`} placeholder="הקלידו..." />
              {isCorrect && <Check className="text-green-500" size={20} />}
              {isWrong && <span className="text-xs text-red-600 font-bold">{it.answer}</span>}
            </div>
            <p className="text-xs text-gray-500">שורש: <b>{it.root}</b> • בניין: <b className={c.text}>{it.binyan}</b></p>
          </div>
        );
      })}
      <button onClick={check} disabled={checked}
        className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl disabled:opacity-50">
        {checked ? "✓ נבדק" : "בדוק תשובות"}
      </button>
    </div>
  );
}

function TabB({ onDone }: { onDone: () => void }) {
  const pairs = VERB_DATA.map(v => ({ from: v.hebrew, fromB: v.binyan as BinyanKey, to: v.passive, toB: v.passiveBinyan as BinyanKey }));
  const [vals, setVals] = useState<string[]>(pairs.map(() => ""));
  const [checked, setChecked] = useState(false);

  const check = () => {
    setChecked(true);
    const correct = pairs.filter((p, i) => normalizeAns(vals[i]) === normalizeAns(p.to)).length;
    if (correct >= 5) onDone();
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100 space-y-3">
      <p className="text-xs text-gray-500">הקלידו את הצורה הסבילה של כל פועל פעיל</p>
      {pairs.map((p, i) => {
        const cF = BINYAN_COLORS[p.fromB], cT = BINYAN_COLORS[p.toB];
        const isCorrect = checked && normalizeAns(vals[i]) === normalizeAns(p.to);
        const isWrong = checked && vals[i] && !isCorrect;
        return (
          <div key={i} className="flex items-center gap-2">
            <div className={`flex-1 p-2.5 rounded-xl ${cF.soft} border-2 ${cF.border} text-center`}>
              <div className={`text-[10px] font-bold ${cF.text}`}>{p.fromB}</div>
              <div className="text-base font-bold">{p.from}</div>
            </div>
            <span className="text-xl">→</span>
            <div className="flex-1">
              <div className={`text-[10px] font-bold ${cT.text} text-center mb-1`}>{p.toB}</div>
              <input value={vals[i]} onChange={e => { const n = [...vals]; n[i] = e.target.value; setVals(n); }}
                disabled={checked}
                className={`w-full px-2 py-1.5 rounded-lg border-2 text-base text-center font-bold ${
                  isCorrect ? "border-green-400 bg-green-50" :
                  isWrong ? "border-red-400 bg-red-50" :
                  "border-gray-200 focus:border-purple-400"
                } outline-none`} placeholder="..." />
              {isWrong && <div className="text-[10px] text-red-600 text-center mt-0.5">{p.to}</div>}
            </div>
          </div>
        );
      })}
      <button onClick={check} disabled={checked}
        className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl disabled:opacity-50">
        {checked ? "✓ נבדק" : "בדוק"}
      </button>
    </div>
  );
}

function TabC({ onDone }: { onDone: () => void }) {
  const allVerbs: { verb: string; binyan: BinyanKey }[] = [
    { verb: "כָּתַב", binyan: "פָּעַל" }, { verb: "שָׁלַח", binyan: "פָּעַל" },
    { verb: "לִמֵּד", binyan: "פִּעֵל" }, { verb: "תִּקֵּן", binyan: "פִּעֵל" },
    { verb: "הִזְמִין", binyan: "הִפְעִיל" }, { verb: "הֶעֱבִיר", binyan: "הִפְעִיל" },
    { verb: "נִכְתַּב", binyan: "נִפְעַל" }, { verb: "נִשְׁלַח", binyan: "נִפְעַל" },
    { verb: "לֻמַּד", binyan: "פֻּעַל" }, { verb: "תֻּקַּן", binyan: "פֻּעַל" },
    { verb: "הוּזְמַן", binyan: "הָפְעַל" }, { verb: "הוּעְבַּר", binyan: "הָפְעַל" },
  ];
  const [shuffled] = useState(() => shuffle(allVerbs));
  const [placed, setPlaced] = useState<Record<string, BinyanKey | null>>(() => Object.fromEntries(shuffled.map(v => [v.verb, null])));
  const [checked, setChecked] = useState(false);

  const setBin = (verb: string, b: BinyanKey) => {
    if (checked) return;
    setPlaced(p => ({ ...p, [verb]: b }));
  };

  const check = () => {
    setChecked(true);
    const correct = shuffled.filter(v => placed[v.verb] === v.binyan).length;
    if (correct >= 10) onDone();
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md border border-purple-100 space-y-3">
      <p className="text-xs text-gray-500">לחצו על כל פועל ובחרו את הבניין הנכון</p>
      <div className="grid grid-cols-2 gap-2">
        {shuffled.map(v => {
          const pick = placed[v.verb];
          const c = pick ? BINYAN_COLORS[pick] : null;
          const isCorrect = checked && pick === v.binyan;
          const isWrong = checked && pick && pick !== v.binyan;
          return (
            <div key={v.verb} className={`p-2 rounded-xl border-2 transition-all ${
              isCorrect ? "border-green-400 bg-green-50" :
              isWrong ? "border-red-400 bg-red-50" :
              c ? `${c.border} ${c.soft}` : "border-gray-200 bg-white"
            }`}>
              <div className="text-lg font-bold text-center mb-1.5">{v.verb}</div>
              <div className="grid grid-cols-3 gap-1">
                {ALL_BINYANIM.map(b => (
                  <button key={b} onClick={() => setBin(v.verb, b)} disabled={checked}
                    className={`text-[10px] py-1 rounded ${pick === b ? `${BINYAN_COLORS[b].bg} text-white font-bold` : "bg-gray-100 text-gray-600"}`}>
                    {b}
                  </button>
                ))}
              </div>
              {isWrong && <div className="text-[10px] text-red-600 text-center mt-1">נכון: {v.binyan}</div>}
            </div>
          );
        })}
      </div>
      <button onClick={check} disabled={checked}
        className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl disabled:opacity-50">
        {checked ? "✓ נבדק" : "בדוק"}
      </button>
    </div>
  );
}

// ============ STEP 5 — DONE ============
function Step5Done({ quizScore, exercisesCount, onRestart, onStory }: { quizScore: number; exercisesCount: number; onRestart: () => void; onStory: () => void }) {
  const [confetti, setConfetti] = useState<{ x: number; y: number; emoji: string; delay: number }[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 100,
      y: -10 - Math.random() * 30,
      emoji: ["⚡", "🎉", "⭐", "✨", "🏆"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 1.5,
    }));
    setConfetti(items);
  }, []);

  const share = () => {
    const text = `⚡ סיימתי את היחידה "פעיל וסביל" בעברית!\n📊 ציון מבחן: ${quizScore}/10\n✏️ תרגילים: ${exercisesCount}/3\n#למידת_עברית`;
    navigator.clipboard.writeText(text);
    alert("✅ התוצאה הועתקה!");
  };

  return (
    <div className="space-y-4 relative">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((c, i) => (
          <div key={i} className="absolute text-2xl" style={{
            left: `${c.x}%`, top: `${c.y}%`,
            animation: `fall 2.5s ${c.delay}s ease-in forwards`,
          }}>{c.emoji}</div>
        ))}
      </div>
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style>

      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center shadow-lg">
        <div className="text-6xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold mb-1">כל הכבוד!</h2>
        <p className="text-white/90">סיימת את היחידה "פעיל וסביל"!</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{quizScore}/10</div>
            <div className="text-xs">ציון מבחן</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{exercisesCount}/3</div>
            <div className="text-xs">תרגילים</div>
          </div>
        </div>
      </div>

      {/* Reference card */}
      <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-purple-200">
        <h3 className="text-base font-bold text-gray-800 mb-3 text-center">📋 כרטיס סיכום</h3>
        <div className="space-y-3">
          <div>
            <div className="text-xs font-bold text-green-700 mb-1.5 px-2">פעיל — הנושא עושה את הפעולה</div>
            <div className="grid grid-cols-3 gap-1.5">
              {TABLE_ROWS.filter(r => r.type === "active").map(r => {
                const c = BINYAN_COLORS[r.binyan];
                return (
                  <div key={r.binyan} className={`p-2 rounded-lg ${c.soft} border-2 ${c.border} text-center`}>
                    <div className={`text-[10px] font-bold ${c.text}`}>{r.binyan}</div>
                    <div className="text-sm font-bold">{r.example}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-orange-700 mb-1.5 px-2">סביל — הפעולה נעשית לנושא</div>
            <div className="grid grid-cols-3 gap-1.5">
              {TABLE_ROWS.filter(r => r.type === "passive").map(r => {
                const c = BINYAN_COLORS[r.binyan];
                return (
                  <div key={r.binyan} className={`p-2 rounded-lg ${c.soft} border-2 ${c.border} text-center`}>
                    <div className={`text-[10px] font-bold ${c.text}`}>{r.binyan}</div>
                    <div className="text-sm font-bold">{r.example}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button onClick={share} className="py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1">
          <Share2 size={14} /> שתף
        </button>
        <button onClick={onStory} className="py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl text-sm">
          📖 לסיפור
        </button>
        <button onClick={onRestart} className="py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1">
          <RotateCcw size={14} /> מחדש
        </button>
      </div>
    </div>
  );
}
