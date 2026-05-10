import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Trophy, Target, Zap } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Pair { he: string; en: string; emoji: string; }
interface MatchingGamePracticeProps {
  lang?: "he" | "en";
  onBack: () => void;
}

// ── Vocabulary data ────────────────────────────────────────────────────────
const CATEGORIES: Record<string, { label: string; labelHe: string; emoji: string; pairs: Pair[] }> = {
  family: {
    label: "Family", labelHe: "משפחה", emoji: "👨‍👩‍👧",
    pairs: [
      { he: "אַבָּא", en: "Dad", emoji: "👨" },
      { he: "אִמָּא", en: "Mom", emoji: "👩" },
      { he: "אָח", en: "Brother", emoji: "👦" },
      { he: "אָחוֹת", en: "Sister", emoji: "👧" },
      { he: "סָבָא", en: "Grandpa", emoji: "👴" },
      { he: "סָבְתָא", en: "Grandma", emoji: "👵" },
    ],
  },
  food: {
    label: "Food", labelHe: "אוכל", emoji: "🍎",
    pairs: [
      { he: "לֶחֶם", en: "Bread", emoji: "🍞" },
      { he: "מַיִם", en: "Water", emoji: "💧" },
      { he: "תַּפּוּחַ", en: "Apple", emoji: "🍎" },
      { he: "עוּגָה", en: "Cake", emoji: "🎂" },
      { he: "חָלָב", en: "Milk", emoji: "🥛" },
      { he: "בֵּיצָה", en: "Egg", emoji: "🥚" },
    ],
  },
  home: {
    label: "Home", labelHe: "בית", emoji: "🏠",
    pairs: [
      { he: "שֻׁלְחָן", en: "Table", emoji: "🪑" },
      { he: "כִּסֵּא", en: "Chair", emoji: "💺" },
      { he: "מִיטָּה", en: "Bed", emoji: "🛏️" },
      { he: "דֶּלֶת", en: "Door", emoji: "🚪" },
      { he: "חַלּוֹן", en: "Window", emoji: "🪟" },
      { he: "מִטְבָּח", en: "Kitchen", emoji: "🍳" },
    ],
  },
  city: {
    label: "City", labelHe: "עיר", emoji: "🏙️",
    pairs: [
      { he: "רְחוֹב", en: "Street", emoji: "🛣️" },
      { he: "חֲנוּת", en: "Shop", emoji: "🏪" },
      { he: "בֵּית סֵפֶר", en: "School", emoji: "🏫" },
      { he: "בֵּית חוֹלִים", en: "Hospital", emoji: "🏥" },
      { he: "פַּארְק", en: "Park", emoji: "🌳" },
      { he: "תַּחֲנָה", en: "Station", emoji: "🚉" },
    ],
  },
  weather: {
    label: "Weather", labelHe: "מזג אוויר", emoji: "☀️",
    pairs: [
      { he: "שֶׁמֶשׁ", en: "Sun", emoji: "☀️" },
      { he: "גֶּשֶׁם", en: "Rain", emoji: "🌧️" },
      { he: "רוּחַ", en: "Wind", emoji: "💨" },
      { he: "שֶׁלֶג", en: "Snow", emoji: "❄️" },
      { he: "עָנָן", en: "Cloud", emoji: "☁️" },
      { he: "בָּרָק", en: "Lightning", emoji: "⚡" },
    ],
  },
};

const CATEGORY_KEYS = Object.keys(CATEGORIES);

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function MatchingGamePractice({ lang = "he", onBack }: MatchingGamePracticeProps) {
  const isHe = lang === "he";

  const [categoryKey, setCategoryKey] = useState<string>("family");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedHe, setSelectedHe] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [shakeCard, setShakeCard] = useState<string | null>(null);
  const [flashCard, setFlashCard] = useState<string | null>(null);
  const [roundDone, setRoundDone] = useState(false);

  const category = CATEGORIES[categoryKey];
  const pairs = useMemo(() => category.pairs, [categoryKey]);

  const heCards = useMemo(() => shuffle(pairs.map(p => p.he)), [pairs, roundDone]);
  const enCards = useMemo(() => shuffle(pairs.map(p => p.en)), [pairs, roundDone]);

  const accuracy = attempts === 0 ? 100 : Math.round((matched.size / attempts) * 100);

  const handleHeClick = useCallback((word: string) => {
    if (matched.has(word) || shakeCard || flashCard) return;
    setSelectedHe(word === selectedHe ? null : word);
  }, [selectedHe, matched, shakeCard, flashCard]);

  const handleEnClick = useCallback((enWord: string) => {
    if (!selectedHe || shakeCard || flashCard) return;
    const pair = pairs.find(p => p.he === selectedHe);
    if (!pair) return;

    setAttempts(a => a + 1);

    if (pair.en === enWord) {
      // ✅ Correct
      setFlashCard(selectedHe);
      setTimeout(() => {
        setMatched(prev => {
          const next = new Set(prev);
          next.add(selectedHe);
          if (next.size === pairs.length) setRoundDone(true);
          return next;
        });
        setScore(s => s + 10);
        setSelectedHe(null);
        setFlashCard(null);
      }, 600);
    } else {
      // ❌ Wrong
      setShakeCard(selectedHe);
      setTimeout(() => {
        setShakeCard(null);
        setSelectedHe(null);
      }, 600);
    }
  }, [selectedHe, pairs, shakeCard, flashCard]);

  const handleNewRound = useCallback(() => {
    const nextIdx = (CATEGORY_KEYS.indexOf(categoryKey) + 1) % CATEGORY_KEYS.length;
    setCategoryKey(CATEGORY_KEYS[nextIdx]);
    setMatched(new Set());
    setSelectedHe(null);
    setRoundDone(false);
    setAttempts(0);
  }, [categoryKey]);

  const handleCategorySelect = (key: string) => {
    setCategoryKey(key);
    setMatched(new Set());
    setSelectedHe(null);
    setRoundDone(false);
    setAttempts(0);
  };

  return (
    <div dir={isHe ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-['Heebo']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap');
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)}
        }
        @keyframes flash-green {
          0%,100%{background:#dcfce7;border-color:#22c55e;transform:scale(1)} 50%{background:#bbf7d0;border-color:#16a34a;transform:scale(1.05)}
        }
        .shake { animation: shake 0.5s ease; }
        .flash-green { animation: flash-green 0.55s ease; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-purple-700 text-sm font-medium transition-colors">
            <ArrowLeft size={18} className={isHe ? "rotate-180" : ""} />
            {isHe ? "חזרה" : "Back"}
          </button>
          <h1 className="text-base font-bold text-purple-700">
            🃏 {isHe ? "משחק התאמה" : "Matching Game"}
          </h1>
          {/* Teacher note */}
          <div className="text-xs text-gray-400 italic">{isHe ? "מצב מורה" : "Teacher Mode"}</div>
        </div>
      </header>

      {/* Teacher guidance banner */}
      <div className="max-w-2xl mx-auto px-4 pt-3">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 flex items-start gap-2 text-sm text-amber-800 mb-3">
          <span className="text-lg mt-0.5">💡</span>
          <span>{isHe
            ? "מצב מורה: הצג את הכרטיסיות לתלמיד ותן לו להצביע. לחץ על הכרטיסיה בעברית שהתלמיד בחר, ואז על התרגום שהוא אמר."
            : "Teacher Mode: Show cards to student and let them point/say. Click the Hebrew card the student chose, then the English translation they said."}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-2xl mx-auto px-4 mb-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <Trophy size={14}/>, label: isHe ? "ניקוד" : "Score", value: score, color: "purple" },
            { icon: <Target size={14}/>, label: isHe ? "ניסיונות" : "Attempts", value: attempts, color: "blue" },
            { icon: <Zap size={14}/>, label: isHe ? "דיוק" : "Accuracy", value: accuracy + "%", color: "green" },
          ].map((s, i) => (
            <div key={i} className={`bg-white rounded-xl border border-gray-100 shadow-sm p-2 flex items-center gap-2`}>
              <span className={`text-${s.color}-500`}>{s.icon}</span>
              <div>
                <div className={`text-sm font-bold text-${s.color}-600`}>{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category selector */}
      <div className="max-w-2xl mx-auto px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_KEYS.map(k => {
            const cat = CATEGORIES[k];
            return (
              <button key={k} onClick={() => handleCategorySelect(k)}
                className={`flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${categoryKey === k ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-600 border-gray-200 hover:border-purple-400 hover:text-purple-600"}`}>
                <span>{cat.emoji}</span>
                <span>{isHe ? cat.labelHe : cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category title */}
      <div className="max-w-2xl mx-auto px-4 mb-3 text-center">
        <span className="text-2xl">{category.emoji}</span>
        <h2 className="text-base font-bold text-gray-700">{isHe ? category.labelHe : category.label}</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {matched.size}/{pairs.length} {isHe ? "התאמות" : "matched"}
        </p>
      </div>

      {/* Round complete */}
      {roundDone && (
        <div className="max-w-2xl mx-auto px-4 mb-4">
          <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-4 text-center">
            <div className="text-3xl mb-1">🎉</div>
            <p className="font-bold text-green-700 text-base">{isHe ? "כל הכבוד! סיבוב הושלם!" : "Round Complete!"}</p>
            <p className="text-sm text-green-600 mb-3">{isHe ? `ניקוד: ${score} | דיוק: ${accuracy}%` : `Score: ${score} | Accuracy: ${accuracy}%`}</p>
            <Button onClick={handleNewRound} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 gap-2">
              <RotateCcw size={14} />
              {isHe ? "סיבוב חדש" : "New Round"}
            </Button>
          </div>
        </div>
      )}

      {/* Cards grid */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Hebrew column */}
          <div className="space-y-2">
            <div className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              🇮🇱 {isHe ? "עברית" : "Hebrew"}
            </div>
            {heCards.map(word => {
              const pair = pairs.find(p => p.he === word)!;
              const isMatched = matched.has(word);
              const isSelected = selectedHe === word;
              const isShaking = shakeCard === word;
              const isFlashing = flashCard === word;
              return (
                <button
                  key={word}
                  onClick={() => handleHeClick(word)}
                  disabled={isMatched}
                  className={`
                    w-full p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200
                    flex items-center gap-2
                    ${isMatched ? "bg-green-100 border-green-400 text-green-700 cursor-default opacity-70" : ""}
                    ${isSelected && !isMatched ? "bg-purple-100 border-purple-500 text-purple-700 scale-105 shadow-md" : ""}
                    ${!isSelected && !isMatched ? "bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50" : ""}
                    ${isShaking ? "shake" : ""}
                    ${isFlashing ? "flash-green" : ""}
                  `}
                >
                  <span className="text-lg">{pair.emoji}</span>
                  <span className="font-bold">{word}</span>
                  {isMatched && <span className="ml-auto text-green-500">✓</span>}
                  {isShaking && <span className="ml-auto text-red-500">✗</span>}
                </button>
              );
            })}
          </div>

          {/* English column */}
          <div className="space-y-2">
            <div className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              🇬🇧 {isHe ? "אנגלית" : "English"}
            </div>
            {enCards.map(word => {
              const pair = pairs.find(p => p.en === word)!;
              const isMatchedByHe = matched.has(pair.he);
              return (
                <button
                  key={word}
                  onClick={() => handleEnClick(word)}
                  disabled={isMatchedByHe || !selectedHe}
                  className={`
                    w-full p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200
                    flex items-center gap-2
                    ${isMatchedByHe ? "bg-green-100 border-green-400 text-green-700 cursor-default opacity-70" : ""}
                    ${!isMatchedByHe && selectedHe ? "bg-white border-blue-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:scale-105 cursor-pointer" : ""}
                    ${!isMatchedByHe && !selectedHe ? "bg-gray-50 border-gray-100 text-gray-400 cursor-default" : ""}
                  `}
                >
                  <span className="text-lg">{pair.emoji}</span>
                  <span>{word}</span>
                  {isMatchedByHe && <span className="ml-auto text-green-500">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint when Hebrew is selected */}
        {selectedHe && !roundDone && (
          <div className="mt-4 text-center text-sm text-purple-600 bg-purple-50 rounded-xl py-2 px-4 border border-purple-100">
            {isHe
              ? `בחרת: "${selectedHe}" — עכשיו בחר את התרגום שהתלמיד אמר`
              : `Selected: "${selectedHe}" — now tap the translation the student said`}
          </div>
        )}
      </div>
    </div>
  );
}