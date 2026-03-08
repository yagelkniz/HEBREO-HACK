import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowLeft, Trophy, RotateCcw, CheckCircle2, XCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import { connectorLevels, ConnectorLevel, ConnectorQuestion, ConnectorGlossary } from "@/data/connectorCorrectionData";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function ConnectorCorrectionPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const isUnlocked = (_idx: number) => true;

  if (selectedLevel === null) {
    return (
      <LevelSelect
        levels={connectorLevels}
        scores={scores}
        isUnlocked={isUnlocked}
        onSelect={setSelectedLevel}
        onBack={onBack}
        t={t}
        lang={lang}
      />
    );
  }

  return (
    <LevelPlay
      level={connectorLevels[selectedLevel]}
      lang={lang}
      t={t}
      onFinish={(score) => {
        setScores((prev) => ({ ...prev, [connectorLevels[selectedLevel].levelId]: score }));
        setSelectedLevel(null);
      }}
      onBack={() => setSelectedLevel(null)}
    />
  );
}

/* ─── Level Select ─── */
function LevelSelect({
  levels, scores, isUnlocked, onSelect, onBack, t, lang,
}: {
  levels: ConnectorLevel[];
  scores: Record<string, number>;
  isUnlocked: (i: number) => boolean;
  onSelect: (i: number) => void;
  onBack: () => void;
  t: (he: string, en: string) => string;
  lang: string;
}) {
  const colors = [
    "border-green-300 bg-green-50",
    "border-amber-300 bg-amber-50",
    "border-red-300 bg-red-50",
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה לתפריט הראשי", "Back to Main Menu")}
        </Button>

        <h1 className="text-2xl font-bold text-primary text-center">
          {t("🔗 תיקון מילות קישור", "🔗 Connector Correction")}
        </h1>
        <p className="text-center text-muted-foreground text-sm">
          {t("תרגול מתקדם – זהה טעויות נפוצות במילות קישור!", "Advanced practice – identify common connector mistakes!")}
        </p>


        <div className="space-y-4">
          {levels.map((level, i) => {
            const unlocked = isUnlocked(i);
            const score = scores[level.levelId];
            return (
              <button
                key={level.levelId}
                onClick={() => unlocked && onSelect(i)}
                disabled={!unlocked}
                className={cn(
                  "w-full p-5 rounded-xl border-2 text-right transition-all shadow-sm",
                  unlocked
                    ? `${colors[i]} hover:scale-[1.02] cursor-pointer`
                    : "bg-muted/30 border-muted cursor-not-allowed opacity-60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    
                    {score !== undefined && (
                      <Badge variant={score >= 80 ? "default" : "secondary"}>
                        {score}%
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {lang === "he" ? level.titleHe : level.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lang === "he" ? level.descriptionHe : level.descriptionEn} • {level.questions.length} {t("שאלות", "questions")}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Level Play ─── */
function LevelPlay({
  level, lang, t, onFinish, onBack,
}: {
  level: ConnectorLevel;
  lang: string;
  t: (he: string, en: string) => string;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const [showGlossary, setShowGlossary] = useState(true);
  const [qIndex, setQIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const shuffledQuestions = useMemo(() => {
    return level.questions.map((q) => {
      const indices = q.optionsHe.map((_, i) => i);
      const shuffled = shuffleArray(indices);
      return {
        ...q,
        shuffledIndices: shuffled,
        shuffledOptions: shuffled.map((i) => q.optionsHe[i]),
        correctShuffledIdx: shuffled.indexOf(q.correctIndex),
      };
    });
  }, [level]);

  const current = shuffledQuestions[qIndex];
  const progress = ((qIndex + 1) / shuffledQuestions.length) * 100;
  const isCorrect = selectedIdx === current.correctShuffledIdx;

  if (showGlossary) {
    return (
      <GlossaryView
        glossary={level.glossary}
        levelTitle={lang === "he" ? level.titleHe : level.titleEn}
        lang={lang}
        t={t}
        onStart={() => setShowGlossary(false)}
        onBack={onBack}
      />
    );
  }

  if (finished) {
    const score = Math.round((correctCount / shuffledQuestions.length) * 100);
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {t("סיום רמה!", "Level Complete!")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-5xl font-bold text-primary">{score}%</div>
            <p className="text-muted-foreground">
              {correctCount}/{shuffledQuestions.length} {t("תשובות נכונות", "correct answers")}
            </p>
            <Progress value={score} className="h-3" />

            {score >= 80 ? (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 font-medium">
                🎉 {t("כל הכבוד!", "Great job!")}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                💪 {t("נסה שוב לשפר את הציון!", "Try again to improve your score!")}
              </div>
            )}

            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setQIndex(0);
                  setSelectedIdx(null);
                  setCorrectCount(0);
                  setFinished(false);
                  setShowGlossary(true);
                }}
              >
                <RotateCcw className="h-4 w-4 ml-2" />
                {t("נסה שוב", "Try Again")}
              </Button>
              <Button onClick={() => onFinish(score)}>
                {t("חזרה לרמות", "Back to Levels")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    if (idx === current.correctShuffledIdx) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (qIndex < shuffledQuestions.length - 1) {
      setQIndex((i) => i + 1);
      setSelectedIdx(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">
            {lang === "he" ? level.titleHe : level.titleEn}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-2" />
          <Badge variant="secondary">
            {qIndex + 1} / {shuffledQuestions.length}
          </Badge>
        </div>

        <Card>
          <CardContent className="space-y-5 pt-6">
            <p className="text-lg font-semibold text-center leading-relaxed">
              {lang === "he" ? current.promptHe : current.promptEn}
            </p>

            <div className="space-y-3">
              {current.shuffledOptions.map((option, idx) => {
                let cls = "text-base py-4 font-medium text-right justify-start w-full whitespace-normal h-auto";

                if (selectedIdx !== null) {
                  if (idx === current.correctShuffledIdx) {
                    cls += " bg-green-100 border-green-400 text-green-800";
                  } else if (idx === selectedIdx) {
                    cls += " bg-red-100 border-red-400 text-red-800";
                  } else {
                    cls += " opacity-40";
                  }
                } else {
                  cls += " hover:bg-primary/10 hover:border-primary";
                }

                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={cls}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedIdx !== null}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {selectedIdx !== null && idx === current.correctShuffledIdx && (
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                      )}
                      {selectedIdx !== null && idx === selectedIdx && idx !== current.correctShuffledIdx && (
                        <XCircle className="h-5 w-5 text-red-600 shrink-0" />
                      )}
                      <span className="flex-1">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>

            {selectedIdx !== null && (
              <div className="space-y-3">
                <div className={cn(
                  "p-4 rounded-lg border text-sm leading-relaxed",
                  isCorrect
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                )}>
                  <div className="font-bold text-base mb-1">
                    {isCorrect ? t("נכון! 🎉", "Correct! 🎉") : t("לא נכון ❌", "Incorrect ❌")}
                  </div>
                  <p>{lang === "he" ? current.rationaleHe : current.rationaleEn}</p>
                </div>
                <Button className="w-full" onClick={handleNext}>
                  {qIndex < shuffledQuestions.length - 1
                    ? t("שאלה הבאה", "Next Question")
                    : t("ראה תוצאות", "See Results")}
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ─── Glossary View ─── */
function GlossaryView({
  glossary, levelTitle, lang, t, onStart, onBack,
}: {
  glossary: ConnectorGlossary;
  levelTitle: string;
  lang: string;
  t: (he: string, en: string) => string;
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">{levelTitle}</Badge>
        </div>

        <Card>
          <CardHeader className="text-center pb-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-xl">
              {lang === "he" ? glossary.titleHe : glossary.titleEn}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("כדאי לקרוא לפני שמתחילים 👇", "Read before you start 👇")}
            </p>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto">
            {glossary.items.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-baseline gap-2 justify-between">
                  <span className="font-bold text-base text-primary">{item.termHe}</span>
                  <span className="text-xs text-muted-foreground">{item.meaningEn}</span>
                </div>
                <div className="mt-2 text-sm bg-muted/50 rounded p-2">
                  <p className="font-medium">{item.exampleHe}</p>
                  <p className="text-muted-foreground text-xs mt-0.5" dir="ltr">{item.exampleEn}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full text-lg py-6 font-bold" onClick={onStart}>
          {lang === "he" ? glossary.ctaHe : glossary.ctaEn}
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Button>
      </div>
    </div>
  );
}
