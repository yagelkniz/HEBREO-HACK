import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import { prepositionSuffixLevels, PrepositionLevel } from "@/data/prepositionSuffixData";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function PrepositionSuffixPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [levelScores, setLevelScores] = useState<Record<string, number>>({});
  const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null);

  const isLevelUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevLevel = prepositionSuffixLevels[index - 1];
    return (levelScores[prevLevel.levelId] ?? 0) >= 80;
  };

  if (activeLevelIndex === null) {
    return (
      <LevelSelect
        levels={prepositionSuffixLevels}
        levelScores={levelScores}
        isLevelUnlocked={isLevelUnlocked}
        onSelect={setActiveLevelIndex}
        onBack={onBack}
        t={t}
        lang={lang}
      />
    );
  }

  return (
    <LevelQuiz
      level={prepositionSuffixLevels[activeLevelIndex]}
      lang={lang}
      t={t}
      onFinish={(score) => {
        setLevelScores((prev) => ({
          ...prev,
          [prepositionSuffixLevels[activeLevelIndex].levelId]: score,
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
  levels: PrepositionLevel[];
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
          {t("🔤 מילות יחס עם כינויים", "🔤 Prepositions with Suffixes")}
        </h1>
        <p className="text-center text-muted-foreground text-sm">
          {t(
            "תרגלו מילות יחס עם כינויי גוף: לי, איתך, עליו, אצלה...",
            "Practice prepositions with pronominal suffixes: לי, איתך, עליו, אצלה..."
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
                    {!unlocked && <Lock className="h-5 w-5 text-muted-foreground" />}
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
                      {lang === "he" ? level.descriptionHe : level.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {level.questions.length} {t("שאלות", "questions")}
                    </p>
                  </div>
                </div>
                {!unlocked && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {t("נדרש 80% בשלב הקודם כדי לפתוח", "Requires 80% on previous level to unlock")}
                  </p>
                )}
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
  level: PrepositionLevel;
  lang: string;
  t: (he: string, en: string) => string;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const questions = useMemo(() => shuffleArray(level.questions), [level]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const current = questions[currentIndex];
  const shuffledOptions = useMemo(() => shuffleArray([...current.options]), [current]);
  const isCorrect = selected === current.correct;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === current.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowTranslation(false);
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
            {percentage < 80 && (
              <p className="text-sm text-destructive">
                {t("נדרש 80% כדי לפתוח את השלב הבא", "Need 80% to unlock the next level")}
              </p>
            )}
            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentIndex(0);
                  setSelected(null);
                  setScore(0);
                  setIsComplete(false);
                  setShowTranslation(false);
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

  // Highlight the blank in the sentence
  const sentenceParts = current.sentence.split("___");

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

        {/* Progress */}
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
            {/* Sentence with blank */}
            <div className="text-2xl font-bold text-center leading-relaxed p-4 bg-muted/50 rounded-lg" dir="rtl">
              {sentenceParts[0]}
              <span className={cn(
                "inline-block min-w-16 px-2 mx-1 border-b-2 text-center transition-colors",
                selected
                  ? isCorrect
                    ? "border-green-500 text-green-700"
                    : "border-red-500 text-red-700"
                  : "border-primary text-primary"
              )}>
                {selected || "___"}
              </span>
              {sentenceParts[1]}
            </div>

            {/* Translation toggle */}
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? "🙈" : "👁️"} {t("תרגום", "Translation")}
              </Button>
              {showTranslation && (
                <p className="text-sm text-muted-foreground mt-1" dir="ltr">
                  {current.translation}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {shuffledOptions.map((option) => {
                const isThis = selected === option;
                const isCorrectOption = option === current.correct;
                let variant: "outline" | "default" | "destructive" = "outline";
                let extraClass = "text-lg py-6 font-semibold";

                if (selected) {
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
                    key={option}
                    variant={variant}
                    className={extraClass}
                    onClick={() => handleSelect(option)}
                    disabled={!!selected}
                  >
                    {selected && isCorrectOption && <CheckCircle2 className="h-5 w-5 ml-2 shrink-0" />}
                    {selected && isThis && !isCorrectOption && <XCircle className="h-5 w-5 ml-2 shrink-0" />}
                    {option}
                  </Button>
                );
              })}
            </div>

            {/* Feedback & Next */}
            {selected && (
              <div className="space-y-3">
                <div className={cn(
                  "p-3 rounded-lg text-center font-medium",
                  isCorrect
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                )}>
                  {isCorrect
                    ? t("נכון! כל הכבוד! 🎉", "Correct! Well done! 🎉")
                    : `${t("לא נכון. התשובה הנכונה:", "Incorrect. The correct answer:")} ${current.correct}`}
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
