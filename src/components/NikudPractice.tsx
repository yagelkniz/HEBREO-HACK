import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/shuffleArray";

interface NikudMark {
  symbol: string;        // letter + nikud example (using bet ב)
  isolatedSymbol: string; // just the nikud over a placeholder
  name: string;
  nameEn: string;
  sound: string;         // "a", "e", "i", "o", "u", silent
  soundLabel: string;    // label like "AH"
  description: string;
  exampleWord: string;
  exampleTranslit: string;
  exampleEn: string;
  color: string;         // tailwind bg color class
  textColor: string;
}

const NIKUD: NikudMark[] = [
  {
    symbol: "בָּ", isolatedSymbol: "ָ",
    name: "קָמָץ", nameEn: "Kamatz",
    sound: "a", soundLabel: "AH",
    description: "Open 'AH' sound, like 'a' in 'father'. A small T-shaped mark below the letter.",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-rose-100", textColor: "text-rose-700",
  },
  {
    symbol: "בַּ", isolatedSymbol: "ַ",
    name: "פַּתָּח", nameEn: "Patach",
    sound: "a", soundLabel: "AH",
    description: "Open 'AH' sound, identical to Kamatz in modern Israeli pronunciation. A short horizontal line below the letter.",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-orange-100", textColor: "text-orange-700",
  },
  {
    symbol: "בֵּ", isolatedSymbol: "ֵ",
    name: "צֵירֵי", nameEn: "Tzere",
    sound: "e", soundLabel: "EH",
    description: "Long 'EH' sound, like 'e' in 'bed'. Two horizontal dots below the letter.",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-amber-100", textColor: "text-amber-700",
  },
  {
    symbol: "בֶּ", isolatedSymbol: "ֶ",
    name: "סֶגּוֹל", nameEn: "Segol",
    sound: "e", soundLabel: "EH",
    description: "Short 'EH' sound, like 'e' in 'bet'. Three dots in a triangle below the letter.",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-yellow-100", textColor: "text-yellow-700",
  },
  {
    symbol: "בִּ", isolatedSymbol: "ִ",
    name: "חִירִיק", nameEn: "Hirik",
    sound: "i", soundLabel: "EE",
    description: "'EE' sound, like 'ee' in 'see'. A single dot below the letter (sometimes followed by yod).",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-lime-100", textColor: "text-lime-700",
  },
  {
    symbol: "בֹּ", isolatedSymbol: "ֹ",
    name: "חוֹלָם", nameEn: "Holam",
    sound: "o", soundLabel: "OH",
    description: "'OH' sound, like 'o' in 'go'. A single dot above the letter (or above vav).",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-emerald-100", textColor: "text-emerald-700",
  },
  {
    symbol: "בֻּ", isolatedSymbol: "ֻ",
    name: "קֻבּוּץ", nameEn: "Kubutz",
    sound: "u", soundLabel: "OO",
    description: "'OO' sound, like 'oo' in 'food'. Three diagonal dots below the letter.",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-teal-100", textColor: "text-teal-700",
  },
  {
    symbol: "בּוּ", isolatedSymbol: "וּ",
    name: "שׁוּרוּק", nameEn: "Shuruk",
    sound: "u", soundLabel: "OO",
    description: "'OO' sound, identical to Kubutz. A dot inside the letter vav.",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-cyan-100", textColor: "text-cyan-700",
  },
  {
    symbol: "בְּ", isolatedSymbol: "ְ",
    name: "שְׁוָא", nameEn: "Shva",
    sound: "silent", soundLabel: "Silent / 'e'",
    description: "Usually silent (no vowel), sometimes a short 'eh'. Two vertical dots below the letter.",
    exampleWord: "", exampleTranslit: "", exampleEn: "",
    color: "bg-sky-100", textColor: "text-sky-700",
  },
];

// Quiz: identify the nikud sound
interface QuizQuestion {
  letterWithNikud: string;
  correctSound: string; // soundLabel
  options: string[];
  hebrewName: string;
}

const QUIZ_BASE: QuizQuestion[] = [
  { letterWithNikud: "בָּ", correctSound: "AH", options: ["AH", "EH", "EE", "OO"], hebrewName: "קָמָץ" },
  { letterWithNikud: "בֵּ", correctSound: "EH", options: ["AH", "EH", "OH", "OO"], hebrewName: "צֵירֵי" },
  { letterWithNikud: "בִּ", correctSound: "EE", options: ["EE", "EH", "AH", "OO"], hebrewName: "חִירִיק" },
  { letterWithNikud: "בֹּ", correctSound: "OH", options: ["OH", "OO", "AH", "EE"], hebrewName: "חוֹלָם" },
  { letterWithNikud: "בּוּ", correctSound: "OO", options: ["OO", "OH", "EE", "AH"], hebrewName: "שׁוּרוּק" },
  { letterWithNikud: "בֶּ", correctSound: "EH", options: ["EH", "AH", "EE", "OH"], hebrewName: "סֶגּוֹל" },
  { letterWithNikud: "בַּ", correctSound: "AH", options: ["AH", "EH", "OH", "OO"], hebrewName: "פַּתָּח" },
  { letterWithNikud: "בֻּ", correctSound: "OO", options: ["OO", "OH", "AH", "EE"], hebrewName: "קֻבּוּץ" },
  { letterWithNikud: "בְּ", correctSound: "Silent", options: ["Silent", "AH", "EE", "OO"], hebrewName: "שְׁוָא" },
];

interface Props {
  onBack: () => void;
  lang: "he" | "en";
}

export default function NikudPractice({ onBack, lang }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [phase, setPhase] = useState<"learn" | "quiz">("learn");
  const [questions] = useState(() => shuffleArray(QUIZ_BASE).map(q => ({ ...q, options: shuffleArray([...q.options]) })));
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[qIdx];

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === current.correctSound) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx(i => i + 1);
      setSelected(null);
    }
  };

  const restartQuiz = () => {
    setQIdx(0); setSelected(null); setScore(0); setDone(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-amber-50 p-4" style={{ fontFamily: "'Rubik', 'Heebo', sans-serif" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-2 z-10 bg-white/80 backdrop-blur rounded-2xl px-4 py-3 shadow-sm">
          <Button variant="ghost" onClick={onBack}>← {t("חזרה לתפריט", "Back to Menu")}</Button>
          <h1 className="text-xl md:text-2xl font-extrabold text-violet-700">
            {t("ניקוד עברי", "Hebrew Nikud (Vowels)")}
          </h1>
          <div className="flex gap-2">
            <Button size="sm" variant={phase === "learn" ? "default" : "outline"} onClick={() => setPhase("learn")}>📖 {t("לימוד", "Learn")}</Button>
            <Button size="sm" variant={phase === "quiz" ? "default" : "outline"} onClick={() => { setPhase("quiz"); restartQuiz(); }}>🎯 {t("תרגול", "Quiz")}</Button>
          </div>
        </div>

        {phase === "learn" && (
          <div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-5 mb-6 shadow-sm border border-violet-200">
              <h2 className="text-lg font-bold text-violet-800 mb-2">{t("מה זה ניקוד?", "What is Nikud?")}</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t(
                  "הניקוד הוא מערכת של נקודות וקווים מתחת או מעל האותיות, שמסמנת את התנועות (a, e, i, o, u). בעברית מודרנית הוא משמש בעיקר לילדים, לשירה, וללימוד.",
                  "Nikud is a system of dots and lines below or above letters that mark the vowels (a, e, i, o, u). In modern Hebrew it is used mainly for children, poetry, and learning."
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {NIKUD.map((n, i) => (
                <div key={i} className={`${n.color} rounded-2xl p-5 shadow-md border-2 border-white hover:scale-[1.02] transition-transform`}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className={`text-6xl font-bold ${n.textColor}`} style={{ fontFamily: "'Frank Ruhl Libre', serif", lineHeight: 1.4 }}>
                      {n.symbol}
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-extrabold ${n.textColor}`}>{n.name}</div>
                      <div className="text-xs text-slate-600">{n.nameEn}</div>
                    </div>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full bg-white/70 ${n.textColor} font-bold text-sm mb-2`}>
                    "{n.soundLabel}"
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{n.description}</p>

                </div>
              ))}
            </div>

            {/* Quick reference */}
            <div className="mt-6 bg-white/80 backdrop-blur rounded-2xl p-5 shadow-sm border border-violet-200">
              <h3 className="font-bold text-violet-800 mb-3">{t("סיכום מהיר לפי צליל", "Quick reference by sound")}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-sm">
                <div className="bg-rose-100 rounded-xl p-3"><div className="font-bold text-rose-700 text-lg">AH</div><div className="text-xs">קָמָץ · פַּתָּח</div></div>
                <div className="bg-amber-100 rounded-xl p-3"><div className="font-bold text-amber-700 text-lg">EH</div><div className="text-xs">צֵירֵי · סֶגּוֹל</div></div>
                <div className="bg-lime-100 rounded-xl p-3"><div className="font-bold text-lime-700 text-lg">EE</div><div className="text-xs">חִירִיק</div></div>
                <div className="bg-emerald-100 rounded-xl p-3"><div className="font-bold text-emerald-700 text-lg">OH</div><div className="text-xs">חוֹלָם</div></div>
                <div className="bg-cyan-100 rounded-xl p-3"><div className="font-bold text-cyan-700 text-lg">OO</div><div className="text-xs">קֻבּוּץ · שׁוּרוּק</div></div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Button size="lg" onClick={() => { setPhase("quiz"); restartQuiz(); }} className="bg-violet-600 hover:bg-violet-700">
                🎯 {t("בוא נתרגל!", "Let's practice!")}
              </Button>
            </div>
          </div>
        )}

        {phase === "quiz" && !done && (
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-violet-200 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
              <span>{t("שאלה", "Question")} {qIdx + 1} / {questions.length}</span>
              <span>⭐ {score}</span>
            </div>
            <div className="text-center mb-6">
              <p className="text-slate-600 mb-3">{t("איזה צליל יש לאות הזאת?", "What sound does this letter make?")}</p>
              <div className="text-[120px] leading-none font-bold text-violet-700 my-4" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
                {current.letterWithNikud}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {current.options.map(opt => {
                const isCorrect = opt === current.correctSound;
                const isSelected = selected === opt;
                let cls = "bg-slate-50 hover:bg-violet-50 border-slate-200";
                if (selected) {
                  if (isCorrect) cls = "bg-green-100 border-green-500 text-green-800";
                  else if (isSelected) cls = "bg-red-100 border-red-500 text-red-800";
                  else cls = "bg-slate-50 border-slate-200 opacity-60";
                }
                return (
                  <button key={opt} disabled={!!selected} onClick={() => handleSelect(opt)}
                    className={`${cls} border-2 rounded-2xl p-4 font-bold text-xl transition-all`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {selected && (
              <div className="mt-5 text-center">
                <p className={`mb-3 font-semibold ${selected === current.correctSound ? "text-green-700" : "text-red-700"}`}>
                  {selected === current.correctSound
                    ? t(`כל הכבוד! זה ${current.hebrewName}`, `Correct! This is ${current.hebrewName}`)
                    : t(`כמעט! התשובה הנכונה: ${current.correctSound} (${current.hebrewName})`, `Almost! Correct: ${current.correctSound} (${current.hebrewName})`)}
                </p>
                <Button onClick={handleNext} size="lg" className="bg-violet-600 hover:bg-violet-700">
                  {qIdx + 1 >= questions.length ? t("סיום", "Finish") : t("הבא ←", "Next →")}
                </Button>
              </div>
            )}
          </div>
        )}

        {phase === "quiz" && done && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-violet-200 max-w-md mx-auto text-center">
            <div className="text-6xl mb-3">{score === questions.length ? "🏆" : score >= questions.length / 2 ? "🎉" : "💪"}</div>
            <h2 className="text-2xl font-extrabold text-violet-800 mb-2">{t("סיימת!", "Done!")}</h2>
            <p className="text-lg text-slate-700 mb-5">
              {t("ציון:", "Score:")} <span className="font-bold text-violet-700">{score} / {questions.length}</span>
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={restartQuiz} variant="outline">🔄 {t("שוב", "Again")}</Button>
              <Button onClick={() => setPhase("learn")} variant="outline">📖 {t("חזרה ללימוד", "Back to learn")}</Button>
              <Button onClick={onBack} className="bg-violet-600 hover:bg-violet-700">{t("תפריט", "Menu")}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
