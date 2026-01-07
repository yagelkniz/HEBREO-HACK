import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X, Lightbulb } from "lucide-react";
import {
  easyQuestions,
  mediumQuestions,
  hardQuestions,
  type OddOneOutQuestion,
} from "./oddOneOutData";

type Level = "easy" | "medium" | "hard";

interface OddOneOutGameProps {
  onBack: () => void;
}

export default function OddOneOutGame({ onBack }: OddOneOutGameProps) {
  const [level, setLevel] = useState<Level | null>(null);
  const [showNikud, setShowNikud] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const getQuestions = (): OddOneOutQuestion[] => {
    switch (level) {
      case "easy":
        return easyQuestions;
      case "medium":
        return mediumQuestions;
      case "hard":
        return hardQuestions;
      default:
        return [];
    }
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === currentQuestion.oddIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  // Level selection screen
  if (!level) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            חזרה
          </Button>
          <h1 className="text-2xl font-bold text-primary">מה יוצא דופן?</h1>
        </div>

        <div className="mb-8 p-6 bg-muted rounded-xl text-center">
          <p className="text-lg mb-2">🎯 איך משחקים?</p>
          <p className="text-muted-foreground">
            בכל שאלה יופיעו 4 מילים. שלוש מהן שייכות לאותה קבוצה ואחת יוצאת דופן.
            מצא את המילה שלא מתאימה!
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm font-medium">ניקוד:</span>
          <Button
            variant={showNikud ? "default" : "outline"}
            size="sm"
            onClick={() => setShowNikud(true)}
          >
            עם ניקוד
          </Button>
          <Button
            variant={!showNikud ? "default" : "outline"}
            size="sm"
            onClick={() => setShowNikud(false)}
          >
            בלי ניקוד
          </Button>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">בחר רמה</h2>
        <div className="grid gap-4">
          <button
            className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-green-100 text-green-900 border-green-300 hover:bg-green-200 transition-colors"
            onClick={() => setLevel("easy")}
          >
            🟢 קל ({easyQuestions.length} שאלות)
          </button>
          <button
            className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-yellow-100 text-yellow-900 border-yellow-300 hover:bg-yellow-200 transition-colors"
            onClick={() => setLevel("medium")}
          >
            🟡 בינוני ({mediumQuestions.length} שאלות)
          </button>
          <button
            className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-red-100 text-red-900 border-red-300 hover:bg-red-200 transition-colors"
            onClick={() => setLevel("hard")}
          >
            🔴 קשה ({hardQuestions.length} שאלות)
          </button>
        </div>
      </div>
    );
  }

  // Finished screen
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => {
              setLevel(null);
              resetGame();
            }}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לרמות
          </Button>
          <h1 className="text-2xl font-bold text-primary">סיימת!</h1>
        </div>

        <div className="p-8 bg-muted rounded-xl text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🏆" : percentage >= 60 ? "👏" : "💪"}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {score}/{questions.length}
          </h2>
          <p className="text-xl text-muted-foreground mb-6">{percentage}% הצלחה</p>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={resetGame}>נסה שוב</Button>
            <Button
              variant="outline"
              onClick={() => {
                setLevel(null);
                resetGame();
              }}
            >
              בחר רמה אחרת
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => {
            setLevel(null);
            resetGame();
          }}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה לרמות
        </Button>
        <h1 className="text-2xl font-bold text-primary">
          מה יוצא דופן? -{" "}
          {level === "easy" ? "קל" : level === "medium" ? "בינוני" : "קשה"}
        </h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">ניקוד:</span>
          <Button
            variant={showNikud ? "default" : "outline"}
            size="sm"
            onClick={() => setShowNikud(true)}
          >
            עם ניקוד
          </Button>
          <Button
            variant={!showNikud ? "default" : "outline"}
            size="sm"
            onClick={() => setShowNikud(false)}
          >
            בלי ניקוד
          </Button>
        </div>
        <div className="text-lg font-semibold">
          שאלה {currentIndex + 1}/{questions.length}
        </div>
      </div>

      <div className="mb-4 text-center">
        <span className="text-sm text-muted-foreground">
          ניקוד: {score}/{currentIndex}
        </span>
      </div>

      <div className="p-6 bg-muted rounded-xl mb-6">
        <p className="text-center text-lg mb-6">בחר את המילה שלא מתאימה לקבוצה:</p>
        
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.words.map((word, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.oddIndex;
            
            let bgClass = "bg-background hover:bg-accent";
            if (showResult) {
              if (isCorrect) {
                bgClass = "bg-green-100 border-green-500";
              } else if (isSelected && !isCorrect) {
                bgClass = "bg-red-100 border-red-500";
              }
            } else if (isSelected) {
              bgClass = "bg-primary/10 border-primary";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={`p-6 text-2xl font-bold rounded-xl border-2 transition-all ${bgClass}`}
              >
                <span>{showNikud ? word.withNikud : word.word}</span>
                {showResult && isCorrect && (
                  <Check className="inline-block mr-2 h-5 w-5 text-green-600" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <X className="inline-block mr-2 h-5 w-5 text-red-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <div className={`p-4 rounded-xl mb-6 ${
          selectedAnswer === currentQuestion.oddIndex
            ? "bg-green-100 border-2 border-green-300"
            : "bg-red-100 border-2 border-red-300"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {selectedAnswer === currentQuestion.oddIndex ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-bold text-green-800">נכון!</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600" />
                <span className="font-bold text-red-800">לא נכון</span>
              </>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            {showExplanation ? "הסתר הסבר" : "הצג הסבר"}
          </Button>
          
          {showExplanation && (
            <div className="mt-3 p-3 bg-background rounded-lg">
              <p className="font-medium">{currentQuestion.explanation}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {currentQuestion.explanationEn}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!showResult ? (
          <Button
            onClick={handleCheck}
            disabled={selectedAnswer === null}
            size="lg"
          >
            בדוק
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg">
            {currentIndex < questions.length - 1 ? "הבא" : "סיים"}
          </Button>
        )}
      </div>
    </div>
  );
}
