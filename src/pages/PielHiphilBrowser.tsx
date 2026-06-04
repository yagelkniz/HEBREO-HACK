import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, Volume2, ArrowLeft, BookOpen, X } from "lucide-react";
import { speakHebrew } from "@/lib/speakHebrew";
import {
  getConjugatedForm,
  PRONOUNS,
  type Tense,
} from "@/data/pielHiphilConjugations";

type Binyan = "piel" | "hiphil";

interface VerbEntry {
  hebrew: string;
  root: string;
  binyan: Binyan;
  english: string;
}

const VERBS: VerbEntry[] = [
  // ===== Piel (30 verbs) =====
  { hebrew: "לדבר", root: "ד-ב-ר", binyan: "piel", english: "To speak / talk" },
  { hebrew: "לספר", root: "ס-פ-ר", binyan: "piel", english: "To tell" },
  { hebrew: "לחפש", root: "ח-פ-ש", binyan: "piel", english: "To search" },
  { hebrew: "לבקש", root: "ב-ק-ש", binyan: "piel", english: "To request" },
  { hebrew: "לקבל", root: "ק-ב-ל", binyan: "piel", english: "To receive" },
  { hebrew: "לשלם", root: "ש-ל-מ", binyan: "piel", english: "To pay" },
  { hebrew: "לסיים", root: "ס-י-מ", binyan: "piel", english: "To finish" },
  { hebrew: "ללמד", root: "ל-מ-ד", binyan: "piel", english: "To teach" },
  { hebrew: "לבקר", root: "ב-ק-ר", binyan: "piel", english: "To visit" },
  { hebrew: "לסדר", root: "ס-ד-ר", binyan: "piel", english: "To arrange" },
  { hebrew: "לאבד", root: "א-ב-ד", binyan: "piel", english: "To lose" },
  { hebrew: "לאחר", root: "א-ח-ר", binyan: "piel", english: "To delay" },
  { hebrew: "למהר", root: "מ-ה-ר", binyan: "piel", english: "To hurry" },
  { hebrew: "לטייל", root: "ט-י-ל", binyan: "piel", english: "To travel" },
  { hebrew: "לצייר", root: "צ-י-ר", binyan: "piel", english: "To draw" },
  { hebrew: "לנגן", root: "נ-ג-נ", binyan: "piel", english: "To play (instrument)" },
  { hebrew: "לחבר", root: "ח-ב-ר", binyan: "piel", english: "To connect" },
  { hebrew: "לבשל", root: "ב-ש-ל", binyan: "piel", english: "To cook" },
  { hebrew: "לצלם", root: "צ-ל-מ", binyan: "piel", english: "To photograph" },
  { hebrew: "לשחק", root: "ש-ח-ק", binyan: "piel", english: "To play" },
  { hebrew: "לתקן", root: "ת-ק-נ", binyan: "piel", english: "To fix" },
  { hebrew: "לכבד", root: "כ-ב-ד", binyan: "piel", english: "To respect" },
  { hebrew: "לקוות", root: "ק-ו-ה", binyan: "piel", english: "To hope" },
  { hebrew: "לנסות", root: "נ-ס-ה", binyan: "piel", english: "To try" },
  { hebrew: "לשנות", root: "ש-נ-ה", binyan: "piel", english: "To change" },
  { hebrew: "לחכות", root: "ח-כ-ה", binyan: "piel", english: "To wait" },
  { hebrew: "לנקות", root: "נ-ק-ה", binyan: "piel", english: "To clean" },
  { hebrew: "לשקר", root: "ש-ק-ר", binyan: "piel", english: "To lie" },
  { hebrew: "לוותר", root: "ו-ת-ר", binyan: "piel", english: "To give up" },
  { hebrew: "לנצח", root: "נ-צ-ח", binyan: "piel", english: "To win" },

  // ===== Hiphil (30 verbs) =====
  { hebrew: "להרגיש", root: "ר-ג-ש", binyan: "hiphil", english: "To feel" },
  { hebrew: "להתחיל", root: "ת-ח-ל", binyan: "hiphil", english: "To start" },
  { hebrew: "להזמין", root: "ז-מ-נ", binyan: "hiphil", english: "To invite" },
  { hebrew: "להסביר", root: "ס-ב-ר", binyan: "hiphil", english: "To explain" },
  { hebrew: "להבין", root: "ב-י-נ", binyan: "hiphil", english: "To understand" },
  { hebrew: "להסכים", root: "ס-כ-מ", binyan: "hiphil", english: "To agree" },
  { hebrew: "להקשיב", root: "ק-ש-ב", binyan: "hiphil", english: "To listen" },
  { hebrew: "להמליץ", root: "מ-ל-צ", binyan: "hiphil", english: "To recommend" },
  { hebrew: "להאמין", root: "א-מ-נ", binyan: "hiphil", english: "To believe" },
  { hebrew: "להדליק", root: "ד-ל-ק", binyan: "hiphil", english: "To light / turn on" },
  { hebrew: "להפסיק", root: "פ-ס-ק", binyan: "hiphil", english: "To stop" },
  { hebrew: "להמשיך", root: "מ-ש-כ", binyan: "hiphil", english: "To continue" },
  { hebrew: "להחליט", root: "ח-ל-ט", binyan: "hiphil", english: "To decide" },
  { hebrew: "להצליח", root: "צ-ל-ח", binyan: "hiphil", english: "To succeed" },
  { hebrew: "להגיע", root: "נ-ג-ע", binyan: "hiphil", english: "To arrive" },
  { hebrew: "להכיר", root: "נ-כ-ר", binyan: "hiphil", english: "To know (person)" },
  { hebrew: "להבטיח", root: "ב-ט-ח", binyan: "hiphil", english: "To promise" },
  { hebrew: "להזכיר", root: "ז-כ-ר", binyan: "hiphil", english: "To remind" },
  { hebrew: "להעדיף", root: "ע-ד-פ", binyan: "hiphil", english: "To prefer" },
  { hebrew: "להחליף", root: "ח-ל-פ", binyan: "hiphil", english: "To replace" },
  { hebrew: "להעביר", root: "ע-ב-ר", binyan: "hiphil", english: "To transfer" },
  { hebrew: "להשאיר", root: "ש-א-ר", binyan: "hiphil", english: "To leave behind" },
  { hebrew: "להחזיר", root: "ח-ז-ר", binyan: "hiphil", english: "To return" },
  { hebrew: "להראות", root: "ר-א-ה", binyan: "hiphil", english: "To show" },
  { hebrew: "להלוות", root: "ל-ו-ה", binyan: "hiphil", english: "To lend" },
  { hebrew: "להוסיף", root: "י-ס-פ", binyan: "hiphil", english: "To add" },
  { hebrew: "להוריד", root: "י-ר-ד", binyan: "hiphil", english: "To lower / download" },
  { hebrew: "להוציא", root: "י-צ-א", binyan: "hiphil", english: "To take out" },
  { hebrew: "להופיע", root: "י-פ-ע", binyan: "hiphil", english: "To appear" },
  { hebrew: "להכין", root: "כ-ו-נ", binyan: "hiphil", english: "To prepare" },
];

const pielAccent = {
  badge: "bg-teal-100 text-teal-700 border-teal-200",
  cardBorder: "border-teal-100",
  cardHover: "hover:border-teal-300 hover:shadow-teal-100",
  icon: "text-teal-500",
};

const hiphilAccent = {
  badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
  cardBorder: "border-indigo-100",
  cardHover: "hover:border-indigo-300 hover:shadow-indigo-100",
  icon: "text-indigo-500",
};

export default function PielHiphilBrowser() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Binyan>("all");
  const [totalSeen, setTotalSeen] = useState(() => {
    try {
      const s = localStorage.getItem("piel_hiphil_seen_count");
      return s ? parseInt(s, 10) : 0;
    } catch { return 0; }
  });

  // Conjugator modal state
  const [activeVerb, setActiveVerb] = useState<VerbEntry | null>(null);
  const [tense, setTense] = useState<Tense>("present");
  const [pronounIdx, setPronounIdx] = useState<number>(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return VERBS.filter((v) => {
      const matchesFilter = filter === "all" || v.binyan === filter;
      if (!q) return matchesFilter;
      const matchesSearch =
        v.hebrew.includes(q) ||
        v.root.includes(q) ||
        v.english.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  const counts = useMemo(() => {
    return {
      all: VERBS.length,
      piel: VERBS.filter((v) => v.binyan === "piel").length,
      hiphil: VERBS.filter((v) => v.binyan === "hiphil").length,
    };
  }, []);

  const handleCardClick = useCallback((verb: VerbEntry) => {
    speakHebrew(verb.hebrew, 0.85);
    setActiveVerb(verb);
    setTense("present");
    setPronounIdx(0);
    setTotalSeen((prev) => {
      const next = prev + 1;
      try { localStorage.setItem("piel_hiphil_seen_count", String(next)); } catch {}
      return next;
    });
  }, []);

  const closeModal = useCallback(() => setActiveVerb(null), []);

  // Close on ESC
  useEffect(() => {
    if (!activeVerb) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVerb, closeModal]);

  const conjugated = useMemo(() => {
    if (!activeVerb) return "";
    return getConjugatedForm(activeVerb.hebrew, tense, pronounIdx);
  }, [activeVerb, tense, pronounIdx]);

  const accentFor = (b: Binyan) => (b === "piel" ? pielAccent : hiphilAccent);

  const binyanLabel = (b: Binyan) => (b === "piel" ? "פִּעֵל" : "הִפְעִיל");

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50" style={{ fontFamily: "'Heebo', sans-serif" }}>
      {/* ===== Sticky Header ===== */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          {/* Top row: back + title */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => { window.location.hash = "#/"; }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              חזרה
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <h1 className="text-lg font-bold text-gray-800">
                פעלים בבנייני פיעל והפעיל
              </h1>
            </div>
            <div className="w-16" />
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-3">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חפש פועל, שורש או תרגום..."
              className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300 transition-all shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 pb-1">
            {(["all", "piel", "hiphil"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === key
                    ? key === "all"
                      ? "bg-gray-800 text-white shadow-md"
                      : key === "piel"
                      ? "bg-teal-600 text-white shadow-md shadow-teal-100"
                      : "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {key === "all" ? "הכל" : key === "piel" ? `פִּעֵל (${counts.piel})` : `הִפְעִיל (${counts.hiphil})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Stats row */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filtered.length} מתוך {counts.all} פעלים
          </p>
          {totalSeen > 0 && (
            <p className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              🔊 {totalSeen} פעלים הושמעו
            </p>
          )}
        </div>

        {/* Card Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-lg font-medium">לא נמצאו תוצאות</p>
            <p className="text-sm">נסה לחפש מחדש</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((verb, i) => {
              const accent = accentFor(verb.binyan);
              return (
                <button
                  key={`${verb.binyan}-${verb.hebrew}`}
                  onClick={() => handleCardClick(verb)}
                  className={`group relative flex flex-col items-center justify-center gap-1 p-4 md:p-5 rounded-2xl bg-white border ${accent.cardBorder} shadow-sm ${accent.cardHover} hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 text-center cursor-pointer`}
                  style={{ animationDelay: `${i * 20}ms` }}
                >
                  {/* Binyan badge */}
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${accent.badge}`}
                  >
                    {binyanLabel(verb.binyan)}
                  </span>

                  {/* Audio icon */}
                  <Volume2
                    className={`absolute top-2 right-2 w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity ${accent.icon}`}
                  />

                  {/* Hebrew verb */}
                  <span className="text-xl md:text-2xl font-bold text-gray-800 leading-tight mt-2">
                    {verb.hebrew}
                  </span>

                  {/* Root */}
                  <span className="text-xs md:text-sm text-gray-500 font-mono tracking-wide">
                    ({verb.root})
                  </span>

                  {/* English */}
                  <span className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                    {verb.english}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </main>

      {/* ===== Footer hint ===== */}
      <footer className="text-center py-6 text-xs text-gray-400">
        לחץ על כרטיס כדי לפתוח את מחולל ההטיות
      </footer>

      {/* ===== Conjugator Modal ===== */}
      {activeVerb && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4"
          onClick={closeModal}
        >
          <div
            dir="rtl"
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Heebo', sans-serif" }}
          >
            {/* Header */}
            <div
              className={`px-5 pt-5 pb-4 ${
                activeVerb.binyan === "piel"
                  ? "bg-gradient-to-br from-teal-50 via-cyan-50 to-white"
                  : "bg-gradient-to-br from-indigo-50 via-violet-50 to-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${accentFor(activeVerb.binyan).badge}`}
                  >
                    {binyanLabel(activeVerb.binyan)}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-800 mt-2 leading-tight">
                    {activeVerb.hebrew}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    שורש: <span className="font-mono">{activeVerb.root}</span> · {activeVerb.english}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white/70 hover:bg-white text-gray-500 hover:text-gray-800 transition-colors shadow-sm"
                  aria-label="סגור"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Result display */}
            <div className="px-5 py-6 bg-white border-b border-gray-100">
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                  {tense === "past" ? "עבר" : tense === "present" ? "הווה" : "עתיד"}
                  {" · "}
                  {PRONOUNS[pronounIdx].he}
                </p>
                <button
                  onClick={() => speakHebrew(conjugated, 0.85)}
                  className={`group inline-flex items-center gap-3 px-6 py-3 rounded-2xl transition-all active:scale-[0.98] ${
                    activeVerb.binyan === "piel"
                      ? "bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100"
                      : "bg-gradient-to-br from-indigo-50 to-violet-50 hover:from-indigo-100 hover:to-violet-100"
                  }`}
                  title="השמע"
                >
                  <Volume2 className={`w-5 h-5 ${accentFor(activeVerb.binyan).icon} opacity-60 group-hover:opacity-100 transition`} />
                  <span
                    key={`${tense}-${pronounIdx}`}
                    className="text-4xl md:text-5xl font-bold text-gray-900 animate-in fade-in zoom-in-95 duration-200"
                  >
                    {conjugated}
                  </span>
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="px-5 py-4 overflow-y-auto">
              {/* Tense */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">זמן</p>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { key: "past", label: "עבר" },
                    { key: "present", label: "הווה" },
                    { key: "future", label: "עתיד" },
                  ] as const).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTense(t.key)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        tense === t.key
                          ? activeVerb.binyan === "piel"
                            ? "bg-teal-600 text-white shadow-md shadow-teal-200"
                            : "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pronoun */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">גוף</p>
                <div className="grid grid-cols-4 gap-2">
                  {PRONOUNS.map((p, i) => (
                    <button
                      key={p.he}
                      onClick={() => setPronounIdx(i)}
                      className={`py-2.5 px-2 rounded-xl text-sm font-semibold transition-all ${
                        pronounIdx === i
                          ? activeVerb.binyan === "piel"
                            ? "bg-teal-100 text-teal-800 ring-2 ring-teal-400"
                            : "bg-indigo-100 text-indigo-800 ring-2 ring-indigo-400"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                      }`}
                    >
                      {p.he}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
