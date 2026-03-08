import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import { sentenceOrderLevels, SentenceOrderLevel, SentenceOrderItem } from "@/data/sentenceOrderData";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function SentenceOrderPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);

  // Level scores: levelId -> percentage
  const [levelScores, setLevelScores] = useState<Record<string, number>>({});
  const [activeLevelIndex, setActiveLevelIndex] = useState<number | null>(null);

  const isLevelUnlocked = (_index: number) => true;

  if (activeLevelIndex === null) {
    return <LevelSelect
      levels={sentenceOrderLevels}
      levelScores={levelScores}
      isLevelUnlocked={isLevelUnlocked}
      onSelect={setActiveLevelIndex}
      onBack={onBack}
      t={t}
      lang={lang}
    />;
  }

  return (
    <LevelPractice
      level={sentenceOrderLevels[activeLevelIndex]}
      lang={lang}
      t={t}
      onFinish={(score) => {
        setLevelScores((prev) => ({ ...prev, [sentenceOrderLevels[activeLevelIndex].levelId]: score }));
        setActiveLevelIndex(null);
      }}
      onBack={() => setActiveLevelIndex(null)}
    />
  );
}

// ─── Level Select ───
function LevelSelect({
  levels, levelScores, isLevelUnlocked, onSelect, onBack, t, lang,
}: {
  levels: SentenceOrderLevel[];
  levelScores: Record<string, number>;
  isLevelUnlocked: (i: number) => boolean;
  onSelect: (i: number) => void;
  onBack: () => void;
  t: (he: string, en: string) => string;
  lang: string;
}) {
  const levelColors = [
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
          {t("🧩 סדר את המשפט", "🧩 Sentence Order")}
        </h1>
        <p className="text-center text-muted-foreground text-sm">
          {t("סדרו את המילים ליצירת משפט עברי תקין", "Arrange the words to form a correct Hebrew sentence")}
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
                    ? `${levelColors[i]} hover:scale-[1.02] cursor-pointer shadow-sm`
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
                    <h3 className="font-bold text-lg">{level.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {lang === "he" ? level.instructions.he : level.instructions.en}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {level.items.length} {t("משפטים", "sentences")}
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

// ─── Level Practice ───
function LevelPractice({
  level, lang, t, onFinish, onBack,
}: {
  level: SentenceOrderLevel;
  lang: string;
  t: (he: string, en: string) => string;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const items = useMemo(() => shuffleArray(level.items), [level]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentItem = items[currentIndex];

  const shuffledWords = useMemo(
    () => shuffleArray([...currentItem.words]),
    [currentItem]
  );

  const remainingWords = shuffledWords.filter(
    (w, i) => {
      // Count how many times this word appears in shuffledWords up to index i
      const countInShuffled = shuffledWords.slice(0, i + 1).filter((x) => x === w).length;
      // Count how many times it's been selected
      const countSelected = selectedWords.filter((x) => x === w).length;
      return countInShuffled > countSelected;
    }
  );

  const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentItem.correctOrder);
  const progress = ((currentIndex + 1) / items.length) * 100;

  const handleWordClick = (word: string, fromSentence: boolean) => {
    if (showResult) return;
    if (fromSentence) {
      // Remove last occurrence of this word
      const idx = selectedWords.lastIndexOf(word);
      if (idx !== -1) {
        setSelectedWords((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
      }
    } else {
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const checkAnswer = () => {
    if (isCorrect) setScore((s) => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedWords([]);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    const percentage = Math.round((score / items.length) * 100);
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
              {score} / {items.length} {t("נכון", "correct")}
            </p>
            <Progress value={percentage} className="h-3" />
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={() => {
                setCurrentIndex(0);
                setSelectedWords([]);
                setShowResult(false);
                setScore(0);
                setIsComplete(false);
              }}>
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

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">{level.title}</Badge>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-2" />
          <Badge variant="secondary">
            {currentIndex + 1} / {items.length}
          </Badge>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {t("סדרו את המילים למשפט נכון", "Arrange the words into a correct sentence")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sentence Building Area */}
            <div
              className={cn(
                "min-h-20 p-4 rounded-lg border-2 border-dashed transition-colors",
                selectedWords.length > 0 ? "border-primary bg-primary/5" : "border-muted"
              )}
            >
              {selectedWords.length > 0 ? (
                <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
                  {selectedWords.map((word, idx) => (
                    <Button
                      key={`selected-${idx}`}
                      variant="default"
                      className="text-lg cursor-pointer"
                      onClick={() => handleWordClick(word, true)}
                      disabled={showResult}
                    >
                      {word}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  {t("לחצו על המילים למטה לבניית המשפט", "Click the words below to build the sentence")}
                </p>
              )}
            </div>

            {/* Available Words */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                {t("מילים זמינות:", "Available words:")}
              </p>
              <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
                {remainingWords.map((word, idx) => (
                  <Button
                    key={`avail-${idx}`}
                    variant="outline"
                    className="text-lg"
                    onClick={() => handleWordClick(word, false)}
                    disabled={showResult}
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>

            {/* Check / Result */}
            {!showResult ? (
              <Button
                className="w-full"
                onClick={checkAnswer}
                disabled={selectedWords.length !== currentItem.correctOrder.length}
              >
                {t("בדוק משפט", "Check Sentence")}
              </Button>
            ) : (
              <div className="space-y-4">
                <div className={cn(
                  "p-4 rounded-lg flex items-center gap-3",
                  isCorrect
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                )}>
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">
                      {isCorrect ? t("נכון!", "Correct!") : t("לא בדיוק", "Not quite right")}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm mt-1" dir="rtl">
                        {t("סדר נכון:", "Correct order:")}{" "}
                        {currentItem.correctOrder.join(" ")}
                      </p>
                    )}
                  </div>
                </div>
                <Button className="w-full" onClick={handleNext}>
                  {currentIndex < items.length - 1
                    ? t("הבא", "Next")
                    : t("ראה תוצאות", "See Results")}
                  {lang === "he" ? (
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
