import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import { pronounLevels, PronounLevel, PronounGlossaryScreen } from "@/data/pronounsLevelData";

interface Props {
  onBack?: () => void;
  lang?: "he" | "en";
}

export default function PronounsPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [levelScores, setLevelScores] = useState<Record<string, number>>({});
  const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null);

  const isLevelUnlocked = (_index: number) => true;

  if (activeLevelIndex === null) {
    return (
      <LevelSelect
        levels={pronounLevels}
        levelScores={levelScores}
        isLevelUnlocked={isLevelUnlocked}
        onSelect={setActiveLevelIndex}
        onBack={onBack ?? (() => {})}
        t={t}
        lang={lang}
      />
    );
  }

  return (
    <LevelQuiz
      level={pronounLevels[activeLevelIndex]}
      lang={lang}
      t={t}
      onFinish={(score) => {
        setLevelScores((prev) => ({
          ...prev,
          [pronounLevels[activeLevelIndex].levelId]: score,
        }));
        setActiveLevelIndex(null);
      }}
      onBack={() => setActiveLevelIndex(null)}
    />
  );
}

/* ─── Level Select ─── */
function LevelSelect({
  levels, levelScores, isLevelUnlocked, onSelect, onBack, t, lang,
}: {
  levels: PronounLevel[];
  levelScores: Record<string, number>;
  isLevelUnlocked: (i: number) => boolean;
  onSelect: (i: number) => void;
  onBack: () => void;
  t: (he: string, en: string) => string;
  lang: string;
}) {
  const colors = [
    "border-emerald-300 bg-emerald-50",
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
          {t("👤 תרגול שמות גוף", "👤 Pronouns Practice")}
        </h1>
        <p className="text-center text-muted-foreground text-sm">
          {t(
            "תרגלו זיהוי שמות גוף נכונים במשפטים עבריים",
            "Practice identifying correct Hebrew subject pronouns"
          )}
        </p>

        <div className="space-y-4">
          {levels.map((level, i) => {
            const unlocked = isLevelUnlocked(i);
            const score = levelScores[level.levelId];
            return (
              <button
                key={level.levelId}
                disabled={!unlocked}
                onClick={() => unlocked && onSelect(i)}
                className={cn(
                  "w-full p-5 rounded-xl border-2 text-right transition-all",
                  unlocked
                    ? `${colors[i]} hover:scale-[1.02] cursor-pointer shadow-sm`
                    : "border-muted bg-muted/30 opacity-60 cursor-not-allowed"
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
                      {lang === "he" ? level.titleHe : level.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lang === "he" ? level.descriptionHe : level.descriptionEn}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {level.items.length} {t("שאלות", "questions")}
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

/* ─── Level Quiz ─── */
function LevelQuiz({
  level, lang, t, onFinish, onBack,
}: {
  level: PronounLevel;
  lang: string;
  t: (he: string, en: string) => string;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const [showGlossary, setShowGlossary] = useState(true);
  const questions = useMemo(() => shuffleArray(level.items), [level]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const current = questions[currentIndex];
  const shuffledIndices = useMemo(() => shuffleArray([0, 1, 2, 3]), [current]);
  const isCorrect = selected === current.correctIndex;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (showGlossary) {
    return (
      <GlossaryView
        glossary={level.glossaryScreen}
        levelTitle={lang === "he" ? level.titleHe : level.title}
        lang={lang}
        t={t}
        onStart={() => setShowGlossary(false)}
        onBack={onBack}
      />
    );
  }

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {t("סיום שלב!", "Level Complete!")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">
              {score} / {questions.length} {t("נכון", "correct")}
            </p>
            <Progress value={percentage} className="h-3" />
            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0);
                  setSelected(null);
                  setScore(0);
                  setIsComplete(false);
                  setShowGlossary(true);
                }}
              >
                <RotateCcw className="h-4 w-4 ml-2" />
                {t("נסה שוב", "Try Again")}
              </Button>
              <Button onClick={() => onFinish(percentage)}>
                {t("חזרה לשלבים", "Back to Levels")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Highlight the blank
  const promptParts = current.promptHe.split("___");

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">
            {lang === "he" ? level.titleHe : level.title}
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-2" />
          <Badge variant="secondary">
            {currentIndex + 1} / {questions.length}
          </Badge>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-center">
              {t("השלם את המשפט:", "Complete the sentence:")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-2xl font-bold text-center leading-relaxed p-4 bg-muted/50 rounded-lg">
              {promptParts[0]}
              <span className={cn(
                "inline-block min-w-16 px-2 mx-1 border-b-2 text-center transition-colors",
                selected !== null
                  ? isCorrect
                    ? "border-green-500 text-green-700"
                    : "border-red-500 text-red-700"
                  : "border-primary text-primary"
              )}>
                {selected !== null ? current.optionsHe[selected] : "___"}
              </span>
              {promptParts[1] || ""}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {shuffledIndices.map((optIdx) => {
                const isThis = selected === optIdx;
                const isCorrectOption = optIdx === current.correctIndex;
                let extraClass = "text-lg py-6 font-semibold";

                if (selected !== null) {
                  if (isCorrectOption) {
                    extraClass += " bg-green-100 border-green-400 text-green-800";
                  } else if (isThis && !isCorrectOption) {
                    extraClass += " bg-red-100 border-red-400 text-red-800";
                  } else {
                    extraClass += " opacity-50";
                  }
                } else {
                  extraClass += " hover:bg-primary/10 hover:border-primary";
                }

                return (
                  <Button
                    key={optIdx}
                    variant="outline"
                    className={extraClass}
                    onClick={() => handleSelect(optIdx)}
                    disabled={selected !== null}
                  >
                    {selected !== null && isCorrectOption && <CheckCircle2 className="h-5 w-5 ml-2 shrink-0" />}
                    {selected !== null && isThis && !isCorrectOption && <XCircle className="h-5 w-5 ml-2 shrink-0" />}
                    {current.optionsHe[optIdx]}
                  </Button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="space-y-3">
                <div className={cn(
                  "p-3 rounded-lg text-center font-medium",
                  isCorrect
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                )}>
                  {isCorrect
                    ? t("נכון! כל הכבוד! 🎉", "Correct! Well done! 🎉")
                    : `${t("לא נכון. התשובה:", "Incorrect. The answer:")} ${current.optionsHe[current.correctIndex]}`}
                </div>
                <Button className="w-full" onClick={handleNext}>
                  {currentIndex < questions.length - 1
                    ? t("הבא", "Next")
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
  glossary: PronounGlossaryScreen;
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
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-muted-foreground" dir="ltr">{item.meaningEn}</span>
                <span className="font-bold text-lg text-primary">{item.termHe}</span>
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
