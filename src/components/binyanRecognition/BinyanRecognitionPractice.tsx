import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, RotateCcw, Lightbulb } from "lucide-react";
import { binyanRecognitionQuestions, type BinyanRecognitionQuestion } from "./BinyanRecognitionData";
import { shuffleArray } from "@/lib/shuffleArray";

interface BinyanRecognitionPracticeProps {
  onBack: () => void;
}

export default function BinyanRecognitionPractice({ onBack }: BinyanRecognitionPracticeProps) {
  const [shuffleKey, setShuffleKey] = useState(0);

  const questions = useMemo(() => {
    return shuffleArray(binyanRecognitionQuestions).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options.map((opt, i) => ({ text: opt, originalIndex: i }))),
    }));
  }, [shuffleKey]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const progress = ((answeredCount) / questions.length) * 100;

  function handleSelect(originalIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(originalIndex);
    setAnsweredCount((c) => c + 1);
    if (originalIndex === current.correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowRationale(false);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowRationale(false);
    setCorrectCount(0);
    setAnsweredCount(0);
    setFinished(false);
    setShuffleKey((k) => k + 1);
  }

  if (finished) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center">
          <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4">
            <span className="text-5xl">{percentage >= 80 ? "🏆" : percentage >= 50 ? "👍" : "💪"}</span>
            <h2 className="text-2xl font-bold text-foreground">סיימת את התרגול!</h2>
            <p className="text-lg text-muted-foreground">
              ענית נכון על {correctCount} מתוך {questions.length} שאלות ({percentage}%)
            </p>
            <Progress value={percentage} className="w-full max-w-xs h-3" />
            <div className="flex gap-3 mt-4">
              <Button onClick={handleRestart} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                תרגול מחדש
              </Button>
              <Button onClick={onBack}>חזרה לתפריט</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCorrect = selectedOption === current.correctIndex;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4" />
            חזרה
          </Button>
          <h1 className="text-xl font-bold text-primary">🔍 זיהוי בניינים</h1>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-6">
          <Progress value={progress} className="flex-1 h-3" />
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Question Card */}
        <Card className="mb-4">
          <CardContent className="pt-6">
            <p className="text-lg font-semibold text-foreground leading-relaxed mb-6">
              {current.question}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {current.shuffledOptions.map((opt) => {
                let optClass = "border-2 border-border bg-card hover:bg-accent transition-colors";
                if (selectedOption !== null) {
                  if (opt.originalIndex === current.correctIndex) {
                    optClass = "border-2 border-green-500 bg-green-50 text-green-900";
                  } else if (opt.originalIndex === selectedOption) {
                    optClass = "border-2 border-destructive bg-red-50 text-destructive";
                  } else {
                    optClass = "border-2 border-border bg-muted opacity-60";
                  }
                }
                return (
                  <button
                    key={opt.originalIndex}
                    onClick={() => handleSelect(opt.originalIndex)}
                    disabled={selectedOption !== null}
                    className={`rounded-xl px-4 py-3 text-base font-medium text-right transition-all ${optClass}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        {selectedOption !== null && (
          <div className="space-y-3">
            <div className={`rounded-xl px-4 py-3 text-base font-semibold ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {isCorrect ? "✅ תשובה נכונה!" : "❌ תשובה שגויה"}
            </div>

            {!isCorrect && !showRationale && (
              <Button variant="outline" size="sm" onClick={() => setShowRationale(true)} className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                הצג הסבר
              </Button>
            )}

            {(showRationale || isCorrect) && (
              <Card className="bg-accent/50 border-accent">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm text-foreground leading-relaxed flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {current.rationale}
                  </p>
                </CardContent>
              </Card>
            )}

            <Button onClick={handleNext} className="w-full">
              {currentIndex + 1 >= questions.length ? "סיום" : "שאלה הבאה ←"}
            </Button>
          </div>
        )}

        {/* Score */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {correctCount} נכונות מתוך {answeredCount} תשובות
        </div>
      </div>
    </div>
  );
}
