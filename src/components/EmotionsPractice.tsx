import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X, BookOpen, HelpCircle } from "lucide-react";
import {
  emotionsVocabulary,
  easyStory,
  easyQuestions as easyQuestionsRaw,
  mediumStory,
  mediumQuestions as mediumQuestionsRaw,
  hardStory,
  hardQuestions as hardQuestionsRaw,
  type EmotionStory,
  type EmotionQuestion,
} from "./emotionsData";
import { shuffleArray } from "@/lib/shuffleArray";

type Level = "easy" | "medium" | "hard";
type Phase = "vocabulary" | "story" | "questions";

interface EmotionsPracticeProps {
  onBack: () => void;
}

export default function EmotionsPractice({ onBack }: EmotionsPracticeProps) {
  const [level, setLevel] = useState<Level | null>(null);
  const [phase, setPhase] = useState<Phase>("vocabulary");
  const [showNikud, setShowNikud] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<{ [id: number]: number }>({});
  const [feedback, setFeedback] = useState<{ [id: number]: "correct" | "incorrect" }>({});
  const [shuffleKey, setShuffleKey] = useState(0);

  const getStory = (): EmotionStory => {
    switch (level) {
      case "easy":
        return easyStory;
      case "medium":
        return mediumStory;
      case "hard":
        return hardStory;
      default:
        return easyStory;
    }
  };

  const getQuestionsRaw = (): EmotionQuestion[] => {
    switch (level) {
      case "easy":
        return easyQuestionsRaw;
      case "medium":
        return mediumQuestionsRaw;
      case "hard":
        return hardQuestionsRaw;
      default:
        return [];
    }
  };

  // Shuffle options within each question, tracking correct answer position
  const questions = useMemo(() => {
    return getQuestionsRaw().map(q => {
      const correctOption = q.options[q.answerIndex];
      const shuffledOptions = shuffleArray([...q.options]);
      const newAnswerIndex = shuffledOptions.findIndex(
        opt => opt.text === correctOption.text
      );
      return { ...q, options: shuffledOptions, answerIndex: newAnswerIndex };
    });
  }, [level, shuffleKey]);

  const story = getStory();

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setFeedback((prev) => ({
        ...prev,
        [questionId]: answerIndex === question.answerIndex ? "correct" : "incorrect",
      }));
    }
  };

  const correctCount = Object.values(feedback).filter((f) => f === "correct").length;
  const totalAnswered = Object.keys(feedback).length;

  const resetPractice = () => {
    setPhase("vocabulary");
    setAnswers({});
    setFeedback({});
    setShowTranslation(false);
    setShuffleKey(k => k + 1);
  };

  const getLevelName = () => {
    switch (level) {
      case "easy":
        return "קל";
      case "medium":
        return "בינוני";
      case "hard":
        return "קשה";
      default:
        return "";
    }
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
          <h1 className="text-2xl font-bold text-primary">רגשות</h1>
        </div>

        <div className="mb-8 p-6 bg-muted rounded-xl text-center">
          <p className="text-lg mb-2">😊 איך זה עובד?</p>
          <p className="text-muted-foreground">
            1. קודם תראה מילון רגשות<br />
            2. אחר כך תקרא סיפור קצר<br />
            3. בסוף תענה על שאלות הבנה
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
            🟢 קל - סיפור פשוט ({easyQuestionsRaw.length} שאלות)
          </button>
          <button
            className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-yellow-100 text-yellow-900 border-yellow-300 hover:bg-yellow-200 transition-colors"
            onClick={() => setLevel("medium")}
          >
            🟡 בינוני - סיפור ארוך יותר ({mediumQuestionsRaw.length} שאלות)
          </button>
          <button
            className="w-full py-6 text-xl font-bold rounded-xl border-2 bg-red-100 text-red-900 border-red-300 hover:bg-red-200 transition-colors"
            onClick={() => setLevel("hard")}
          >
            🔴 קשה - סיפור מורכב ({hardQuestionsRaw.length} שאלות)
          </button>
        </div>
      </div>
    );
  }

  // Vocabulary phase
  if (phase === "vocabulary") {
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
          <h1 className="text-2xl font-bold text-primary">מילון רגשות</h1>
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

        <div className="grid gap-3 mb-6">
          {emotionsVocabulary.map((emotion, idx) => (
            <div
              key={idx}
              className="p-4 bg-muted rounded-xl border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-2xl font-bold text-primary">
                    {showNikud ? emotion.withNikud : emotion.word}
                  </span>
                  <span className="text-lg text-muted-foreground mr-3">
                    {emotion.meaning}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-foreground">
                  {emotion.example}
                </span>
                <span className="text-muted-foreground mr-2">
                  ({emotion.exampleTranslation})
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setPhase("story")} size="lg" className="gap-2">
            <BookOpen className="h-5 w-5" />
            המשך לסיפור
          </Button>
        </div>
      </div>
    );
  }

  // Story phase
  if (phase === "story") {
    return (
      <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setPhase("vocabulary")}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה למילון
          </Button>
          <h1 className="text-2xl font-bold text-primary">
            {story.title} ({getLevelName()})
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            {showTranslation ? "הסתר תרגום" : "הצג תרגום"}
          </Button>
        </div>

        <div className="p-6 bg-muted rounded-xl mb-6">
          <p className="text-xl leading-relaxed whitespace-pre-line">
            {showNikud ? story.textWithNikud : story.text}
          </p>
          
          {showTranslation && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {story.translation}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setPhase("questions")} size="lg" className="gap-2">
            <HelpCircle className="h-5 w-5" />
            המשך לשאלות
          </Button>
        </div>
      </div>
    );
  }

  // Questions phase
  return (
    <div className="w-full max-w-2xl mx-auto p-4" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => setPhase("story")}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה לסיפור
        </Button>
        <h1 className="text-2xl font-bold text-primary">
          שאלות - {getLevelName()}
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
            <div className="text-lg font-semibold mb-4">
              {q.id}. {showNikud ? q.questionWithNikud : q.question}
            </div>
            <div className="space-y-2">
              {q.options.map((option, idx) => {
                const isSelected = answers[q.id] === idx;
                const isCorrect = idx === q.answerIndex;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(q.id, idx)}
                    disabled={!!feedback[q.id]}
                    className={`w-full p-3 text-right rounded-lg border-2 transition-all flex items-center justify-between ${
                      feedback[q.id]
                        ? isCorrect
                          ? "bg-green-100 border-green-400"
                          : isSelected
                          ? "bg-red-100 border-red-400"
                          : "bg-background border-border"
                        : isSelected
                        ? "bg-primary/10 border-primary"
                        : "bg-background border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="text-lg">
                      {showNikud ? option.withNikud : option.text}
                    </span>
                    {feedback[q.id] && isCorrect && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                    {feedback[q.id] && isSelected && !isCorrect && (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </button>
                );
              })}
            </div>
            {feedback[q.id] && (
              <div className={`mt-3 p-2 rounded text-sm ${
                feedback[q.id] === "correct" ? "text-green-700" : "text-red-700"
              }`}>
                {q.explanation}
              </div>
            )}
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
