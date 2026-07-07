import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, Volume2, Check, X, RefreshCw, Shuffle, Settings2, Timer } from "lucide-react";
import { speakHebrew } from "@/lib/speakHebrew";
import {
  CONJUGATIONS,
  getConjugatedForm,
  PRONOUNS,
  type Tense,
} from "@/data/pielHiphilConjugations";
import { shuffleArray } from "@/lib/shuffleArray";

type Binyan = "piel" | "hiphil";
type BinyanFilter = "piel" | "hiphil" | "both";

const ALL_VERBS: { hebrew: string; binyan: Binyan }[] = Object.keys(CONJUGATIONS).map((h) => ({
  hebrew: h,
  binyan: h.startsWith("לה") ? "hiphil" : "piel",
}));

const TENSE_LABEL: Record<Tense, string> = {
  past: "עבר",
  present: "הווה",
  future: "עתיד",
};

const TENSE_COLOR: Record<Tense, string> = {
  past: "from-amber-400 to-orange-500",
  present: "from-emerald-400 to-teal-500",
  future: "from-indigo-500 to-purple-600",
};

// Strip Hebrew nikud (U+0591–U+05C7) and normalize
const stripNikud = (s: string) =>
  s.replace(/[\u0591-\u05C7]/g, "").replace(/\s+/g, "").trim();

interface Round {
  verb: string;
  binyan: Binyan;
  srcTense: Tense;
  srcPronoun: number;
  tgtTense: Tense;
  tgtPronoun: number;
}

export default function TenseSwitch() {
  // Settings
  const [binyanFilter, setBinyanFilter] = useState<BinyanFilter>("both");
  const [enabledTenses, setEnabledTenses] = useState<Record<Tense, boolean>>({
    past: true,
    present: true,
    future: true,
  });
  const [personSwitch, setPersonSwitch] = useState(true);
  const [typingMode, setTypingMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Session state
  const [pool, setPool] = useState<string[]>([]);
  const [round, setRound] = useState<Round | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(0);

  // Typing mode
  const [typed, setTyped] = useState("");
  const [typedResult, setTypedResult] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const enabledTenseKeys = useMemo(
    () => (Object.keys(enabledTenses) as Tense[]).filter((t) => enabledTenses[t]),
    [enabledTenses]
  );

  const filteredVerbs = useMemo(() => {
    return ALL_VERBS.filter((v) =>
      binyanFilter === "both" ? true : v.binyan === binyanFilter
    ).map((v) => v.hebrew);
  }, [binyanFilter]);

  const canPlay = enabledTenseKeys.length >= 2 && filteredVerbs.length > 0;

  const buildRound = useCallback(
    (verb: string): Round => {
      const binyan: Binyan = verb.startsWith("לה") ? "hiphil" : "piel";
      const tenses = enabledTenseKeys;
      const srcTense = tenses[Math.floor(Math.random() * tenses.length)];
      let tgtTense = tenses[Math.floor(Math.random() * tenses.length)];
      // prefer a different target tense
      if (tenses.length > 1) {
        let guard = 0;
        while (tgtTense === srcTense && guard < 10) {
          tgtTense = tenses[Math.floor(Math.random() * tenses.length)];
          guard++;
        }
      }
      const srcPronoun = Math.floor(Math.random() * PRONOUNS.length);
      let tgtPronoun = srcPronoun;
      if (personSwitch && Math.random() < 0.6) {
        let guard = 0;
        while (tgtPronoun === srcPronoun && guard < 10) {
          tgtPronoun = Math.floor(Math.random() * PRONOUNS.length);
          guard++;
        }
      }
      return { verb, binyan, srcTense, srcPronoun, tgtTense, tgtPronoun };
    },
    [enabledTenseKeys, personSwitch]
  );

  const nextRound = useCallback(() => {
    if (!canPlay) return;
    setRevealed(false);
    setTyped("");
    setTypedResult(null);
    let currentPool = pool;
    if (currentPool.length === 0) {
      currentPool = shuffleArray(filteredVerbs);
    }
    const [next, ...rest] = currentPool;
    setPool(rest);
    setRound(buildRound(next));
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [pool, filteredVerbs, buildRound, canPlay]);

  // Init / reset when settings change
  useEffect(() => {
    setPool(shuffleArray(filteredVerbs));
    setRound(null);
    setRevealed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binyanFilter]);

  useEffect(() => {
    if (canPlay && !round) nextRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canPlay, filteredVerbs]);

  const srcForm = useMemo(() => {
    if (!round) return "";
    return getConjugatedForm(round.verb, round.srcTense, round.srcPronoun);
  }, [round]);

  const answer = useMemo(() => {
    if (!round) return "";
    return getConjugatedForm(round.verb, round.tgtTense, round.tgtPronoun);
  }, [round]);

  const markCorrect = () => {
    setCorrect((c) => c + 1);
    setStreak((s) => s + 1);
    setAnswered((a) => a + 1);
    nextRound();
  };
  const markWrong = () => {
    setWrong((w) => w + 1);
    setStreak(0);
    setAnswered((a) => a + 1);
    nextRound();
  };

  const checkTyped = () => {
    if (!round || !typed.trim()) return;
    const ok = stripNikud(typed) === stripNikud(answer);
    setTypedResult(ok ? "correct" : "wrong");
    setRevealed(true);
    if (ok) {
      setCorrect((c) => c + 1);
      setStreak((s) => s + 1);
    } else {
      setWrong((w) => w + 1);
      setStreak(0);
    }
    setAnswered((a) => a + 1);
  };

  const resetSession = () => {
    setCorrect(0);
    setWrong(0);
    setStreak(0);
    setAnswered(0);
    setPool(shuffleArray(filteredVerbs));
    setRound(null);
    setRevealed(false);
    setTyped("");
    setTypedResult(null);
    setTimeout(nextRound, 0);
  };

  const total = answered;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      style={{ fontFamily: "'Heebo', sans-serif" }}
    >
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => (window.location.hash = "#/")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              חזרה
            </button>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-purple-600" />
              <h1 className="text-base sm:text-lg font-bold text-gray-800">
                משחק הזמנים – פיעל והפעיל
              </h1>
            </div>
            <button
              onClick={() => setShowSettings((s) => !s)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showSettings
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
              aria-label="הגדרות"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>

          {/* Scoreboard */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 py-2">
              <div className="text-xl font-bold text-emerald-700">{correct}</div>
              <div className="text-[10px] text-emerald-800/70 font-semibold">נכון</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 py-2">
              <div className="text-xl font-bold text-rose-700">{wrong}</div>
              <div className="text-[10px] text-rose-800/70 font-semibold">טעות</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 py-2">
              <div className="text-xl font-bold text-orange-700">🔥 {streak}</div>
              <div className="text-[10px] text-orange-800/70 font-semibold">רצף</div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 py-2">
              <div className="text-xl font-bold text-purple-700">{pct}%</div>
              <div className="text-[10px] text-purple-800/70 font-semibold">דיוק</div>
            </div>
          </div>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="border-t border-purple-100 bg-white/95 backdrop-blur">
            <div className="max-w-3xl mx-auto px-4 py-3 space-y-3">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1.5">בניין</div>
                <div className="flex gap-2">
                  {([
                    { k: "piel", l: "פִּעֵל" },
                    { k: "hiphil", l: "הִפְעִיל" },
                    { k: "both", l: "שניהם" },
                  ] as { k: BinyanFilter; l: string }[]).map((b) => (
                    <button
                      key={b.k}
                      onClick={() => setBinyanFilter(b.k)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        binyanFilter === b.k
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {b.l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1.5">
                  זמנים פעילים (לפחות 2)
                </div>
                <div className="flex gap-2">
                  {(["past", "present", "future"] as Tense[]).map((t) => {
                    const on = enabledTenses[t];
                    const count = Object.values(enabledTenses).filter(Boolean).length;
                    const disable = on && count <= 2;
                    return (
                      <button
                        key={t}
                        disabled={disable}
                        onClick={() =>
                          setEnabledTenses((prev) => ({ ...prev, [t]: !prev[t] }))
                        }
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          on
                            ? "bg-gradient-to-br text-white shadow-md " + TENSE_COLOR[t]
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        } ${disable ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        {TENSE_LABEL[t]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={personSwitch}
                    onChange={(e) => setPersonSwitch(e.target.checked)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700">החלפת גוף</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={typingMode}
                    onChange={(e) => setTypingMode(e.target.checked)}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700">מצב הקלדה</span>
                </label>
              </div>

              <button
                onClick={resetSession}
                className="w-full py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> אפס סשן
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {!canPlay ? (
          <div className="text-center py-20 text-gray-500">
            צריך לפחות 2 זמנים פעילים כדי לשחק. פתחו הגדרות ⚙️
          </div>
        ) : !round ? (
          <div className="text-center py-20 text-gray-400">טוען...</div>
        ) : (
          <>
            {/* Source card */}
            <div className="rounded-3xl bg-white shadow-lg border border-purple-100 overflow-hidden">
              <div
                className={`px-5 py-3 text-white bg-gradient-to-br ${TENSE_COLOR[round.srcTense]}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                    נתון · {TENSE_LABEL[round.srcTense]} · {PRONOUNS[round.srcPronoun].he}
                  </span>
                  <span className="text-[10px] font-bold bg-white/25 px-2 py-0.5 rounded-md">
                    {round.binyan === "piel" ? "פִּעֵל" : "הִפְעִיל"}
                  </span>
                </div>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-gray-400 mb-1">{PRONOUNS[round.srcPronoun].he}</p>
                <p
                  key={`src-${round.verb}-${round.srcTense}-${round.srcPronoun}`}
                  className="text-4xl sm:text-5xl font-bold text-gray-900 animate-in fade-in zoom-in-95 duration-200"
                >
                  {srcForm}
                </p>
                <p className="text-xs text-gray-400 mt-3">שם הפועל: {round.verb}</p>
              </div>
            </div>

            {/* Target instruction */}
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white p-4 shadow-md text-center">
              <div className="text-xs uppercase tracking-widest opacity-80 mb-1">
                המירו ל
              </div>
              <div className="text-2xl font-bold flex items-center justify-center gap-2 flex-wrap">
                <Shuffle className="w-5 h-5 opacity-80" />
                <span>{TENSE_LABEL[round.tgtTense]}</span>
                {round.tgtPronoun !== round.srcPronoun && (
                  <>
                    <span className="opacity-60">·</span>
                    <span>{PRONOUNS[round.tgtPronoun].he}</span>
                  </>
                )}
              </div>
            </div>

            {/* Typing mode input */}
            {typingMode && (
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    dir="rtl"
                    type="text"
                    value={typed}
                    onChange={(e) => setTyped(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") checkTyped();
                    }}
                    disabled={revealed}
                    placeholder="הקלד את הצורה המומרת..."
                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-lg text-right focus:outline-none transition-colors ${
                      typedResult === "correct"
                        ? "border-emerald-400 bg-emerald-50"
                        : typedResult === "wrong"
                        ? "border-rose-400 bg-rose-50"
                        : "border-purple-200 bg-white focus:border-purple-500"
                    }`}
                  />
                  {!revealed && (
                    <button
                      onClick={checkTyped}
                      className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 active:scale-95 transition"
                    >
                      בדוק
                    </button>
                  )}
                </div>
                {typedResult && (
                  <div
                    className={`mt-2 text-sm font-semibold ${
                      typedResult === "correct" ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {typedResult === "correct" ? "✓ נכון!" : `✗ הצורה הנכונה: ${answer}`}
                  </div>
                )}
              </div>
            )}

            {/* Answer reveal / actions */}
            <div className="mt-6">
              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="w-full py-5 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xl font-bold shadow-lg hover:shadow-xl active:scale-[0.98] transition"
                >
                  👀 הצג תשובה
                </button>
              ) : (
                <div className="rounded-3xl bg-white shadow-lg border-2 border-emerald-200 overflow-hidden">
                  <div className="px-5 py-2 bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-semibold uppercase tracking-wider text-center">
                    התשובה הנכונה · {TENSE_LABEL[round.tgtTense]} · {PRONOUNS[round.tgtPronoun].he}
                  </div>
                  <div className="px-6 py-6 text-center">
                    <button
                      onClick={() => speakHebrew(answer, 0.85)}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition active:scale-95"
                    >
                      <Volume2 className="w-6 h-6 text-emerald-600" />
                      <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                        {answer}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Teacher scoring buttons */}
            {revealed && !typingMode && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={markWrong}
                  className="py-4 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold text-lg shadow-md hover:shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" /> טעות
                </button>
                <button
                  onClick={markCorrect}
                  className="py-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg shadow-md hover:shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" /> נכון
                </button>
              </div>
            )}

            {/* Next */}
            <div className="mt-4">
              <button
                onClick={nextRound}
                className="w-full py-4 rounded-2xl bg-white border-2 border-purple-300 text-purple-700 font-bold text-lg hover:bg-purple-50 active:scale-[0.98] transition flex items-center justify-center gap-2"
              >
                הבא <Shuffle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              נותרו בערמה: {pool.length} / {filteredVerbs.length}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
