import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RotateCcw, Shuffle, Eye, EyeOff, Volume2, CheckCircle2, Languages } from "lucide-react";
import {
  hospitalReadingText,
  hospitalReadingTranslation,
  hospitalQuestions,
  hospitalVocab,
} from "@/data/hospitalReadingData";
import { shuffleArray } from "@/lib/shuffleArray";
import { speakHebrew } from "@/lib/speakHebrew";
import { cn } from "@/lib/utils";

interface Props {
  onBack: () => void;
  lang: "he" | "en";
}

/**
 * Live Zoom Reading Comprehension — Hospital
 * Teacher-controlled reading session: sticky header, big readable text,
 * vocab reveal, question-by-question reveal with shuffle + reset, progress.
 */
export default function HospitalReadingPractice({ onBack, lang }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);

  // Session controls
  const [shuffleOn, setShuffleOn] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const [sessionKey, setSessionKey] = useState(0); // bump to reshuffle / reset reveals

  // Per-question reveal state (teacher reveals answer after student tries)
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [covered, setCovered] = useState<Record<number, boolean>>({});

  const questions = useMemo(() => {
    const base = hospitalQuestions.map((q, i) => ({ ...q, _origIdx: i }));
    if (!shuffleOn) return base.map(q => ({ ...q, options: [...q.options] }));
    return shuffleArray(base).map(q => ({ ...q, options: shuffleArray(q.options) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffleOn, sessionKey]);

  const total = questions.length;
  const coveredCount = Object.values(covered).filter(Boolean).length;

  const handleReset = useCallback(() => {
    setRevealed({});
    setCovered({});
    setShowTranslation(false);
    setShowVocab(false);
    setSessionKey(k => k + 1);
  }, []);

  const toggleReveal = (idx: number) => {
    setRevealed(prev => ({ ...prev, [idx]: !prev[idx] }));
    setCovered(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Sticky teacher header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border premium-shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 min-h-[44px]">
            <ArrowLeft className="w-4 h-4" />
            {t("חזרה לתפריט", "Back to Menu")}
          </Button>

          <div className="flex-1 flex items-center gap-2 min-w-0">
            <span className="text-2xl">🏥</span>
            <h1 className="text-base sm:text-lg font-bold text-foreground truncate">
              {t("בבית החולים", "At the Hospital")}
            </h1>
            <span className="text-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
              {t("קל", "Easy")}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-muted/60 rounded-full px-3 py-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold tabular-nums">
                {coveredCount} / {total}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-muted/60 rounded-full px-3 py-1.5">
              <Shuffle className="w-4 h-4 text-primary" />
              <Label htmlFor="shuffle" className="text-xs font-medium cursor-pointer select-none">
                {t("ערבב", "Shuffle")}
              </Label>
              <Switch id="shuffle" checked={shuffleOn} onCheckedChange={(v) => { setShuffleOn(v); handleReset(); }} />
            </div>

            <Button variant="outline" size="sm" onClick={handleReset} className="gap-1 min-h-[44px]">
              <RotateCcw className="w-4 h-4" />
              {t("התחל מחדש", "Reset")}
            </Button>
          </div>
        </div>
      </header>

      <main key={sessionKey} className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 animate-fade-in">
        {/* Reading passage */}
        <Card className="glass-card premium-shadow overflow-hidden animate-scale-in">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                📖 {t("קטע קריאה", "Reading Passage")}
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => speakHebrew(hospitalReadingText, 0.8)} className="gap-1">
                  <Volume2 className="w-4 h-4" />
                  {t("האזן", "Listen")}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowTranslation(s => !s)} className="gap-1">
                  <Languages className="w-4 h-4" />
                  {showTranslation ? t("הסתר תרגום", "Hide") : t("תרגום", "Translate")}
                </Button>
              </div>
            </div>

            <p
              className="text-xl sm:text-2xl text-foreground font-medium whitespace-pre-wrap text-right"
              style={{ lineHeight: 1.9, fontFamily: "Rubik, Heebo, sans-serif" }}
              dir="rtl"
            >
              {hospitalReadingText}
            </p>

            {showTranslation && (
              <div className="mt-5 pt-5 border-t border-border animate-fade-in">
                <p
                  className="text-base text-muted-foreground whitespace-pre-wrap"
                  dir="ltr"
                  style={{ lineHeight: 1.7 }}
                >
                  {hospitalReadingTranslation}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vocabulary panel */}
        <Card className="glass-card premium-shadow animate-fade-in">
          <CardContent className="p-5 sm:p-6">
            <button
              onClick={() => setShowVocab(s => !s)}
              className="w-full flex items-center justify-between gap-2 text-right group min-h-[44px]"
            >
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                📚 {t("מילון", "Vocabulary")}
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {hospitalVocab.length}
                </span>
              </h2>
              {showVocab ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
            </button>

            {showVocab && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
                {hospitalVocab.map((v) => (
                  <button
                    key={v.hebrew}
                    onClick={() => speakHebrew(v.hebrew)}
                    className="flex items-center justify-between bg-muted/50 hover:bg-muted transition-colors p-3 rounded-lg text-right min-h-[48px] group"
                  >
                    <span className="font-bold text-foreground flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      {v.hebrew}
                    </span>
                    <span className="text-sm text-muted-foreground" dir="ltr">{v.english}</span>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Questions list — teacher walks through, reveals answers */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              ❓ {t("שאלות הבנה", "Comprehension Questions")}
            </h2>
            <span className="text-sm text-muted-foreground">
              {t(`כיסיתם ${coveredCount} מתוך ${total}`, `Covered ${coveredCount} of ${total}`)}
            </span>
          </div>

          {questions.map((q, idx) => {
            const isRevealed = !!revealed[idx];
            const isCovered = !!covered[idx];
            return (
              <Card
                key={`${sessionKey}-${q._origIdx}`}
                className={cn(
                  "glass-card transition-all animate-fade-in",
                  isCovered && "ring-1 ring-primary/30",
                )}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 text-right">
                        <p className="text-lg font-semibold text-foreground" dir="rtl">{q.question}</p>
                        {lang === "en" && (
                          <p className="text-sm text-muted-foreground mt-1" dir="ltr">{q.questionEn}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={isRevealed ? "secondary" : "default"}
                      size="sm"
                      onClick={() => toggleReveal(idx)}
                      className="gap-1 min-h-[44px] shrink-0"
                    >
                      {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {isRevealed ? t("הסתר", "Hide") : t("חשוף", "Reveal")}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt) => {
                      const isCorrect = opt === q.answer;
                      return (
                        <div
                          key={opt}
                          onClick={() => speakHebrew(opt)}
                          className={cn(
                            "p-3 rounded-lg border text-right cursor-pointer transition-all min-h-[48px] flex items-center justify-between gap-2",
                            isRevealed && isCorrect
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold"
                              : "bg-muted/40 border-border hover:bg-muted",
                          )}
                          dir="rtl"
                        >
                          <span>{opt}</span>
                          {isRevealed && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-scale-in" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <div className="text-center text-xs text-muted-foreground py-4">
          {t("מצב שיעור חי — המורה שולט בקצב", "Live lesson mode — teacher controls the pace")}
        </div>
      </main>
    </div>
  );
}
