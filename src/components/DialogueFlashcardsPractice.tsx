import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Home, Volume2, RotateCw } from "lucide-react";
import { dialogueFlashcards } from "@/data/dialogueFlashcardsData";
import { shuffleArray } from "@/lib/shuffleArray";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function DialogueFlashcardsPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [showNikud, setShowNikud] = useState(true);
  const [category, setCategory] = useState<string | "all">("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<Set<number>>(new Set());

  const categories = useMemo(() => Array.from(new Set(dialogueFlashcards.map(c => c.category))), []);

  const cards = useMemo(() => {
    const filtered = category === "all" ? dialogueFlashcards : dialogueFlashcards.filter(c => c.category === category);
    return shuffleArray(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const card = cards[index];
  const removeNikud = (s: string) => s.replace(/[\u0591-\u05C7]/g, "");

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(removeNikud(text));
    u.lang = "he-IL";
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  const next = () => {
    setFlipped(false);
    setIndex(i => (i + 1) % cards.length);
  };
  const prev = () => {
    setFlipped(false);
    setIndex(i => (i - 1 + cards.length) % cards.length);
  };
  const markKnown = () => {
    setKnownIds(prev => new Set(prev).add(card.id));
    next();
  };
  const reset = () => {
    setKnownIds(new Set());
    setIndex(0);
    setFlipped(false);
  };

  if (!card) return null;

  const progressPct = (knownIds.size / cards.length) * 100;
  const allDone = knownIds.size === cards.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <Button variant="ghost" onClick={onBack} className="min-h-[48px]">
            <Home className="h-4 w-4 ml-2" />
            {t("חזרה לתפריט", "Back to Menu")}
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={reset} className="min-h-[40px]">
              <RotateCw className="h-3 w-3 ml-1" />
              {t("איפוס", "Reset")}
            </Button>
            <div className="flex items-center gap-2">
              <Checkbox id="nikud-d" checked={showNikud} onCheckedChange={(c) => setShowNikud(c === true)} />
              <label htmlFor="nikud-d" className="text-sm">{t("ניקוד", "Nikud")}</label>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-3 text-orange-900">
          🗨️ {t("שיחות יומיומיות - כרטיסיות", "Everyday Dialogue - Flashcards")}
        </h1>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => { setCategory("all"); setIndex(0); setFlipped(false); }}
            className={`px-3 py-2 rounded-full text-sm font-semibold min-h-[40px] ${category === "all" ? "bg-orange-500 text-white" : "bg-white text-orange-700 border border-orange-300"}`}
          >
            {t("הכל", "All")}
          </button>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => { setCategory(c); setIndex(0); setFlipped(false); }}
              className={`px-3 py-2 rounded-full text-sm font-semibold min-h-[40px] ${category === c ? "bg-orange-500 text-white" : "bg-white text-orange-700 border border-orange-300"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <Progress value={progressPct} className="mb-2 h-2" />
        <div className="text-sm text-center text-muted-foreground mb-4">
          {t("ידעת:", "Known:")} {knownIds.size} / {cards.length} · {t("כרטיס", "Card")} {index + 1}/{cards.length}
        </div>

        {/* Flashcard */}
        <div
          onClick={() => setFlipped(f => !f)}
          className="cursor-pointer bg-card text-card-foreground rounded-3xl shadow-2xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center border-4 border-orange-200 hover:border-orange-400 transition-all relative"
        >
          <span className="absolute top-3 right-3 text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
            {card.category}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); speak(card.hebrew); }}
            className="absolute top-3 left-3 p-2 rounded-full bg-orange-100 hover:bg-orange-200 min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Listen"
          >
            <Volume2 className="h-5 w-5 text-orange-700" />
          </button>

          {!flipped ? (
            <>
              <p className="text-3xl font-bold mb-3">
                {showNikud ? card.hebrewNikud : card.hebrew}
              </p>
              <p className="text-sm text-muted-foreground italic">{card.transliteration}</p>
              <p className="text-xs text-muted-foreground mt-6">{t("👆 לחץ להפיכה", "👆 Tap to flip")}</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold mb-3" dir="ltr">{card.english}</p>
              <p className="text-sm text-muted-foreground mb-2">📍 {card.context}</p>
              <p className="text-xs text-muted-foreground" dir="ltr">{card.contextEn}</p>
              <p className="text-xs text-muted-foreground mt-6">{t("👆 לחץ לחזרה", "👆 Tap to flip back")}</p>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center gap-3 mt-6">
          <Button onClick={prev} variant="outline" className="min-h-[48px] flex-1">
            ← {t("הקודם", "Previous")}
          </Button>
          <Button onClick={markKnown} className="bg-green-600 hover:bg-green-700 text-white min-h-[48px] flex-1">
            ✓ {t("יודע!", "Got it!")}
          </Button>
          <Button onClick={next} variant="outline" className="min-h-[48px] flex-1">
            {t("הבא", "Next")} →
          </Button>
        </div>

        {allDone && (
          <div className="mt-6 bg-green-100 border-2 border-green-400 rounded-2xl p-6 text-center">
            <p className="text-2xl font-bold text-green-800 mb-2">🎉 {t("כל הכבוד!", "Excellent!")}</p>
            <p className="text-green-700">{t("סיימת את כל הכרטיסיות בקטגוריה הזו!", "You completed all flashcards in this category!")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
