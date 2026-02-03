import React, { useState, useMemo, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, CheckCircle2, XCircle, RotateCcw, Lightbulb, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { shuffleArray } from "@/lib/shuffleArray";
import {
  fillInBlankQuestions,
  identifyBinyanQuestions,
  errorCorrectionQuestions,
  findRootQuestions,
} from "@/data/hebrewFlow/exercises";
import { binyanim } from "@/data/hebrewFlow/binyanim";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

type ExerciseType = "fill-blank" | "identify-binyan" | "error-correction" | "find-root";

export default function PracticeArena() {
  const { lang, t } = useOutletContext<LayoutContext>() || { lang: "en", t: (en: string) => en };
  const [showNikud, setShowNikud] = useState(true);
  const [exerciseType, setExerciseType] = useState<ExerciseType>("fill-blank");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Shuffle questions on mount/type change
  const questions = useMemo(() => {
    switch (exerciseType) {
      case "fill-blank":
        return shuffleArray(fillInBlankQuestions);
      case "identify-binyan":
        return shuffleArray(identifyBinyanQuestions);
      case "error-correction":
        return shuffleArray(errorCorrectionQuestions);
      case "find-root":
        return shuffleArray(findRootQuestions);
      default:
        return [];
    }
  }, [exerciseType]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = useCallback((answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    let isCorrect = false;
    switch (exerciseType) {
      case "fill-blank":
        isCorrect = answer === (currentQuestion as typeof fillInBlankQuestions[0]).correctAnswer;
        break;
      case "identify-binyan":
        isCorrect = answer === (currentQuestion as typeof identifyBinyanQuestions[0]).correctBinyan;
        break;
      case "error-correction":
        isCorrect = answer === (currentQuestion as typeof errorCorrectionQuestions[0]).correctSentence;
        break;
      case "find-root":
        isCorrect = answer === (currentQuestion as typeof findRootQuestions[0]).correctRoot;
        break;
    }
    
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  }, [exerciseType, currentQuestion]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setShowHint(false);
    setIsComplete(false);
  };

  const handleTypeChange = (type: ExerciseType) => {
    setExerciseType(type);
    resetPractice();
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {t("Practice Complete!", "התרגול הושלם!")}
            </CardTitle>
            <CardDescription>
              {t("Great job! Here are your results:", "עבודה מצוינת! הנה התוצאות שלך:")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">
              {score} / {questions.length} {t("correct", "נכון")}
            </p>
            <Progress value={percentage} className="h-3" />
          </CardContent>
          <CardFooter className="justify-center gap-4">
            <Button onClick={resetPractice} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              {t("Try Again", "נסה שוב")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            {t("Practice Arena", "אזור תרגול")}
          </h1>
          <p className="text-muted-foreground">
            {t("Test your Hebrew grammar knowledge", "בחן את הידע שלך בדקדוק עברי")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="nikud" checked={showNikud} onCheckedChange={setShowNikud} />
            <Label htmlFor="nikud">{t("Niqqud", "ניקוד")}</Label>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {score} / {questions.length}
          </Badge>
        </div>
      </div>

      {/* Exercise Type Tabs */}
      <Tabs value={exerciseType} onValueChange={(v) => handleTypeChange(v as ExerciseType)}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="fill-blank" className="text-xs md:text-sm">
            {t("Fill in Blank", "השלם חסר")}
          </TabsTrigger>
          <TabsTrigger value="identify-binyan" className="text-xs md:text-sm">
            {t("Identify Binyan", "זהה בניין")}
          </TabsTrigger>
          <TabsTrigger value="error-correction" className="text-xs md:text-sm">
            {t("Fix Errors", "תקן שגיאות")}
          </TabsTrigger>
          <TabsTrigger value="find-root" className="text-xs md:text-sm">
            {t("Find Root", "מצא שורש")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Progress */}
      <Progress value={progress} className="h-2" />

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              {t("Question", "שאלה")} {currentIndex + 1} / {questions.length}
            </Badge>
            {!showResult && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(true)}
                disabled={showHint}
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {t("Hint", "רמז")}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Render question based on type */}
          {exerciseType === "fill-blank" && currentQuestion && (
            <FillInBlankExercise
              question={currentQuestion as typeof fillInBlankQuestions[0]}
              showNikud={showNikud}
              lang={lang}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              showHint={showHint}
              onAnswer={handleAnswer}
            />
          )}
          {exerciseType === "identify-binyan" && currentQuestion && (
            <IdentifyBinyanExercise
              question={currentQuestion as typeof identifyBinyanQuestions[0]}
              showNikud={showNikud}
              lang={lang}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswer={handleAnswer}
            />
          )}
          {exerciseType === "error-correction" && currentQuestion && (
            <ErrorCorrectionExercise
              question={currentQuestion as typeof errorCorrectionQuestions[0]}
              showNikud={showNikud}
              lang={lang}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswer={handleAnswer}
            />
          )}
          {exerciseType === "find-root" && currentQuestion && (
            <FindRootExercise
              question={currentQuestion as typeof findRootQuestions[0]}
              showNikud={showNikud}
              lang={lang}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswer={handleAnswer}
            />
          )}
        </CardContent>
        {showResult && (
          <CardFooter className="justify-end">
            <Button onClick={handleNext}>
              {currentIndex < questions.length - 1 ? (
                <>
                  {t("Next", "הבא")}
                  <ArrowRight className={cn("h-4 w-4", lang === "he" ? "mr-2 rotate-180" : "ml-2")} />
                </>
              ) : (
                t("See Results", "ראה תוצאות")
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

// Fill in Blank Exercise Component
interface FillInBlankExerciseProps {
  question: typeof fillInBlankQuestions[0];
  showNikud: boolean;
  lang: "he" | "en";
  selectedAnswer: string | null;
  showResult: boolean;
  showHint: boolean;
  onAnswer: (answer: string) => void;
}

function FillInBlankExercise({
  question,
  showNikud,
  lang,
  selectedAnswer,
  showResult,
  showHint,
  onAnswer,
}: FillInBlankExerciseProps) {
  const t = (en: string, he: string) => (lang === "he" ? he : en);
  const isCorrect = selectedAnswer === question.correctAnswer;
  
  // Shuffle options once when question changes - use question.id AND ensure re-shuffle on each question
  const shuffledOptions = useMemo(() => {
    const options = [...question.options];
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [question.id, question.options]);

  return (
    <div className="space-y-6" dir="rtl">
      <p className="text-2xl font-medium text-center leading-relaxed text-right">
        {showNikud ? question.sentenceWithNikud : question.sentence}
      </p>
      
      {showHint && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
          <p className="text-sm text-amber-800 text-right">
            💡 {lang === "he" ? question.hintHe : question.hint}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option) => {
          const isSelected = selectedAnswer === option.text;
          const isCorrectAnswer = option.text === question.correctAnswer;
          
          return (
            <Button
              key={option.text}
              variant={isSelected ? (showResult ? (isCorrect ? "default" : "destructive") : "default") : "outline"}
              className={cn(
                "h-14 text-lg relative",
                showResult && isCorrectAnswer && "ring-2 ring-green-500 bg-green-50"
              )}
              onClick={() => !showResult && onAnswer(option.text)}
              disabled={showResult}
            >
              {showNikud ? option.textWithNikud : option.text}
              {showResult && isSelected && (
                isCorrect ? 
                  <CheckCircle2 className="h-5 w-5 absolute left-2 text-green-600" /> :
                  <XCircle className="h-5 w-5 absolute left-2" />
              )}
            </Button>
          );
        })}
      </div>

      {showResult && (
        <div className={cn(
          "p-4 rounded-lg text-right",
          isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        )}>
          <p className={cn("font-medium", isCorrect ? "text-green-800" : "text-red-800")}>
            {isCorrect ? t("Correct!", "נכון!") : t("Incorrect", "לא נכון")}
          </p>
          {!isCorrect && (
            <p className="text-sm mt-1">
              {t("Correct answer:", "התשובה הנכונה:")} {showNikud ? question.correctAnswerWithNikud : question.correctAnswer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Identify Binyan Exercise Component
interface IdentifyBinyanExerciseProps {
  question: typeof identifyBinyanQuestions[0];
  showNikud: boolean;
  lang: "he" | "en";
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswer: (answer: string) => void;
}

function IdentifyBinyanExercise({
  question,
  showNikud,
  lang,
  selectedAnswer,
  showResult,
  onAnswer,
}: IdentifyBinyanExerciseProps) {
  const t = (en: string, he: string) => (lang === "he" ? he : en);
  const isCorrect = selectedAnswer === question.correctBinyan;
  
  // Fisher-Yates shuffle for options
  const shuffledOptions = useMemo(() => {
    const options = [...question.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [question.id, question.options]);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <p className="text-muted-foreground mb-2 text-right">
          {t("Which Binyan is this verb?", "לאיזה בניין שייך הפועל הזה?")}
        </p>
        <p className="text-4xl font-bold">
          {showNikud ? question.wordWithNikud : question.word}
        </p>
        <p className="text-muted-foreground mt-2">({question.meaning})</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option) => {
          const binyan = binyanim.find((b) => b.id === option);
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === question.correctBinyan;
          
          return (
            <Button
              key={option}
              variant={isSelected ? (showResult ? (isCorrect ? "default" : "destructive") : "default") : "outline"}
              className={cn(
                "h-16 flex flex-col gap-1 relative",
                showResult && isCorrectAnswer && "ring-2 ring-green-500 bg-green-50"
              )}
              onClick={() => !showResult && onAnswer(option)}
              disabled={showResult}
            >
              <span className="font-bold">{binyan?.nameWithNikud}</span>
              <span className="text-xs text-muted-foreground">{binyan?.name}</span>
            </Button>
          );
        })}
      </div>

      {showResult && (
        <div className={cn(
          "p-4 rounded-lg text-right",
          isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        )}>
          <p className={cn("font-medium", isCorrect ? "text-green-800" : "text-red-800")}>
            {isCorrect ? t("Correct!", "נכון!") : t("Incorrect", "לא נכון")}
          </p>
          <p className="text-sm mt-1">
            {t("Root:", "שורש:")} {question.root}
          </p>
        </div>
      )}
    </div>
  );
}

// Error Correction Exercise Component
interface ErrorCorrectionExerciseProps {
  question: typeof errorCorrectionQuestions[0];
  showNikud: boolean;
  lang: "he" | "en";
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswer: (answer: string) => void;
}

function ErrorCorrectionExercise({
  question,
  showNikud,
  lang,
  selectedAnswer,
  showResult,
  onAnswer,
}: ErrorCorrectionExerciseProps) {
  const t = (en: string, he: string) => (lang === "he" ? he : en);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    // Normalize for comparison
    const normalized = userInput.replace(/[\u0591-\u05C7]/g, "").trim();
    const correct = question.correctSentence.replace(/[\u0591-\u05C7]/g, "").trim();
    onAnswer(normalized === correct ? question.correctSentence : userInput);
  };

  const isCorrect = selectedAnswer === question.correctSentence || 
    selectedAnswer?.replace(/[\u0591-\u05C7]/g, "").trim() === question.correctSentence.replace(/[\u0591-\u05C7]/g, "").trim();

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <Badge variant="destructive" className="mb-4">
          {t(`Error: ${question.errorType}`, `שגיאה: ${
            question.errorType === "gender" ? "מין" :
            question.errorType === "number" ? "מספר" :
            question.errorType === "tense" ? "זמן" : "בניין"
          }`)}
        </Badge>
        <p className="text-muted-foreground mb-2 text-right">
          {t("Find and fix the error in this sentence:", "מצא ותקן את השגיאה במשפט הזה:")}
        </p>
        <p className="text-2xl font-medium p-4 rounded-lg bg-red-50 border border-red-200 text-right">
          {showNikud ? question.incorrectSentenceWithNikud : question.incorrectSentence}
        </p>
      </div>

      {!showResult ? (
        <div className="space-y-3">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t("Type the corrected sentence here...", "הקלד את המשפט המתוקן כאן...")}
            className="w-full p-4 text-lg rounded-lg border focus:ring-2 focus:ring-primary text-right"
            rows={2}
          />
          <Button onClick={handleSubmit} className="w-full" disabled={!userInput.trim()}>
            {t("Check Answer", "בדוק תשובה")}
          </Button>
        </div>
      ) : (
        <div className={cn(
          "p-4 rounded-lg text-right",
          isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        )}>
          <p className={cn("font-medium", isCorrect ? "text-green-800" : "text-red-800")}>
            {isCorrect ? t("Correct!", "נכון!") : t("Incorrect", "לא נכון")}
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="font-medium">{t("Correct:", "נכון:")}</span> {showNikud ? question.correctSentenceWithNikud : question.correctSentence}
            </p>
            <p className="text-sm text-muted-foreground">
              {lang === "he" ? question.explanationHe : question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Find Root Exercise Component
interface FindRootExerciseProps {
  question: typeof findRootQuestions[0];
  showNikud: boolean;
  lang: "he" | "en";
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswer: (answer: string) => void;
}

function FindRootExercise({
  question,
  showNikud,
  lang,
  selectedAnswer,
  showResult,
  onAnswer,
}: FindRootExerciseProps) {
  const t = (en: string, he: string) => (lang === "he" ? he : en);
  const isCorrect = selectedAnswer === question.correctRoot;
  
  // Fisher-Yates shuffle for options
  const shuffledOptions = useMemo(() => {
    const options = [...question.rootOptions];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [question.id, question.rootOptions]);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <p className="text-muted-foreground mb-2 text-right">
          {t("Find the root (שורש) of this word:", "מצא את השורש של המילה הזו:")}
        </p>
        <p className="text-4xl font-bold">
          {showNikud ? question.conjugatedWordWithNikud : question.conjugatedWord}
        </p>
        <p className="text-muted-foreground mt-2">
          ({lang === "he" ? question.meaningHe : question.meaning})
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shuffledOptions.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === question.correctRoot;
          
          return (
            <Button
              key={option}
              variant={isSelected ? (showResult ? (isCorrect ? "default" : "destructive") : "default") : "outline"}
              className={cn(
                "h-14 text-xl font-mono relative",
                showResult && isCorrectAnswer && "ring-2 ring-green-500 bg-green-50"
              )}
              onClick={() => !showResult && onAnswer(option)}
              disabled={showResult}
            >
              {option}
            </Button>
          );
        })}
      </div>

      {showResult && (
        <div className={cn(
          "p-4 rounded-lg text-right",
          isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        )}>
          <p className={cn("font-medium", isCorrect ? "text-green-800" : "text-red-800")}>
            {isCorrect ? t("Correct!", "נכון!") : t("Incorrect", "לא נכון")}
          </p>
          <p className="text-sm mt-1">
            {t("Root:", "שורש:")} {question.correctRoot} | {t("Binyan:", "בניין:")} {binyanim.find(b => b.id === question.correctBinyan)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
