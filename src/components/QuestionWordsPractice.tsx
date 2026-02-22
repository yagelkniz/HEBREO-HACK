import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ArrowRight, Check, X } from "lucide-react";
import {
  questionWordsVocabulary,
  easyQuestions,
  mediumQuestions,
  hardQuestions,
  type QuestionWordQuestion,
} from "./questionWordsData";
import { shuffleArray } from "@/lib/shuffleArray";

type Level = "easy" | "medium" | "hard";

interface QuestionWordsPracticeProps {
  onBack: () => void;
}

export default function QuestionWordsPractice({ onBack }: QuestionWordsPracticeProps) {
  const [level, setLevel] = useState<Level | null>(null);
  const [showNikud, setShowNikud] = useState(true);
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const [feedback, setFeedback] = useState<{ [id: number]: "correct" | "incorrect" }>({});
  const [showVocab, setShowVocab] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const getQuestionsRaw = (): QuestionWordQuestion[] => {
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

  // Shuffle options for each question
  const questions = useMemo(() => {
    return getQuestionsRaw().map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, [level, shuffleKey]);
  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setFeedback((prev) => ({
        ...prev,
        [questionId]: answer === question.answer ? "correct" : "incorrect",
      }));
    }
  };

  const correctCount = Object.values(feedback).filter((f) => f === "correct").length;
  const totalAnswered = Object.keys(feedback).length;

  const resetPractice = () => {
    setAnswers({});
    setFeedback({});
    setShuffleKey(k => k + 1);
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
          <h1 className="text-2xl font-bold text-primary">מילות שאלה</h1>
        </div>

        {/* Vocabulary reference */}
        <div className="mb-8 p-4 bg-muted rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">מילות שאלה נפוצות</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVocab(!showVocab)}
            >
              {showVocab ? "הסתר" : "הצג"}
            </Button>
          </div>
          {showVocab && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {questionWordsVocabulary.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-background p-3 rounded-lg border text-center"
                >
                  <div className="text-xl font-bold text-primary">
                    {showNikud ? item.withNikud : item.word}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.meaning}</div>
                </div>
              ))}
            </div>
          )}
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
          <span className="mx-2 text-muted-foreground">|</span>
          <Button
            variant={showTranslation ? "default" : "outline"}
            size="sm"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? <Eye className="w-4 h-4 ml-1" /> : <EyeOff className="w-4 h-4 ml-1" />}
            EN
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

  // Practice screen
  return (
    <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => {
            setLevel(null);
            resetPractice();
          }}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה לרמות
        </Button>
        <h1 className="text-2xl font-bold text-primary">
          מילות שאלה -{" "}
          {level === "easy" ? "קל" : level === "medium" ? "בינוני" : "קשה"}
        </h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 flex-wrap">
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
          <span className="mx-1 text-muted-foreground">|</span>
          <Button
            variant={showTranslation ? "default" : "outline"}
            size="sm"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? <Eye className="w-4 h-4 ml-1" /> : <EyeOff className="w-4 h-4 ml-1" />}
            EN
          </Button>
        </div>
        <div className="text-lg font-semibold">
          {correctCount}/{questions.length} נכון
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`p-4 rounded-xl border-2 ${
              feedback[q.id] === "correct"
                ? "bg-green-50 border-green-300"
                : feedback[q.id] === "incorrect"
                ? "bg-red-50 border-red-300"
                : "bg-background border-border"
            }`}
          >
            <div className="text-xl font-semibold mb-2">
              {showNikud ? q.sentenceWithNikud : q.sentence}
            </div>
            {showTranslation && (
              <div className="text-sm text-muted-foreground mb-4">
                {q.translation}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {q.options.map((option) => (
                <Button
                  key={option}
                  variant={
                    answers[q.id] === option
                      ? feedback[q.id] === "correct"
                        ? "default"
                        : "destructive"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleAnswer(q.id, option)}
                  disabled={!!feedback[q.id]}
                  className="text-lg"
                >
                  {option}
                  {feedback[q.id] && option === q.answer && (
                    <Check className="h-4 w-4 mr-1 text-green-600" />
                  )}
                  {feedback[q.id] === "incorrect" && answers[q.id] === option && (
                    <X className="h-4 w-4 mr-1" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {totalAnswered === questions.length && (
        <div className="mt-8 p-6 bg-muted rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-2">סיימת!</h2>
          <p className="text-lg mb-4">
            התוצאה שלך: {correctCount}/{questions.length} (
            {Math.round((correctCount / questions.length) * 100)}%)
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={resetPractice}>נסה שוב</Button>
            <Button
              variant="outline"
              onClick={() => {
                setLevel(null);
                resetPractice();
              }}
            >
              בחר רמה אחרת
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
