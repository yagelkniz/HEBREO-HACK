import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Volume2, BookOpen, Award, RotateCcw, Eye, EyeOff } from "lucide-react";
import { vocabularyData, easyQuestions, mediumQuestions, hardQuestions, FillQuestion, VocabularyCategory } from "./DaysAndPlacesData";
import { shuffleArray } from "@/lib/shuffleArray";

type Phase = "menu" | "vocab" | "easy" | "medium" | "hard" | "results";
type CategoryKey = "days" | "places" | "all";

interface DaysAndPlacesPracticeProps {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function DaysAndPlacesPractice({ onBack, lang = "he" }: DaysAndPlacesPracticeProps) {
  const [phase, setPhase] = useState<Phase>("menu");
  const [category, setCategory] = useState<CategoryKey>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showNikud, setShowNikud] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [vocabCategoryIndex, setVocabCategoryIndex] = useState(0);

  const t = (he: string, en: string) => (lang === "he" ? he : en);

  // Get questions based on difficulty with proper Fisher-Yates shuffle
  const questions = useMemo(() => {
    let baseQuestions: FillQuestion[] = [];
    if (phase === "easy") baseQuestions = easyQuestions;
    else if (phase === "medium") baseQuestions = mediumQuestions;
    else if (phase === "hard") baseQuestions = hardQuestions;

    // Fisher-Yates shuffle for questions
    const shuffledQuestions = [...baseQuestions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }

    // Fisher-Yates shuffle for each question's options
    return shuffledQuestions.map(q => {
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      return { ...q, options: shuffledOptions };
    });
  }, [phase]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handlePronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'he-IL';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentQuestion.answer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setPhase("results");
    }
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setPhase("menu");
  };

  const getStars = () => {
    const percentage = (correctCount / questions.length) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  };

  // MENU PHASE
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4" dir="rtl">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4 flex-row-reverse">
            ⬅ {t("חזרה לתפריט", "Back to Menu")}
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-2 text-right">
              {t("ימים ומקומות", "Days and Places")}
            </h1>
            <p className="text-amber-600 text-right">
              {t("לימוד ותרגול אוצר מילים", "Learn and practice vocabulary")}
            </p>
          </div>

          {/* Vocabulary Learning */}
          <Card className="mb-6 border-2 border-amber-200 bg-white/80">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 flex-row-reverse">
                <BookOpen className="w-8 h-8 text-amber-600" />
                <h2 className="text-xl font-bold text-amber-800 text-right">
                  {t("לימוד אוצר מילים", "Vocabulary Learning")}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {vocabularyData.map((cat, idx) => (
                  <Button
                    key={cat.key}
                    onClick={() => { setVocabCategoryIndex(idx); setPhase("vocab"); }}
                    className="py-4 bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300"
                    variant="outline"
                  >
                    <span>{cat.nameHe}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Practice Levels */}
          <Card className="border-2 border-orange-200 bg-white/80">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 flex-row-reverse">
                <Award className="w-8 h-8 text-orange-600" />
                <h2 className="text-xl font-bold text-orange-800 text-right">
                  {t("תרגול השלמה", "Fill-in Practice")}
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setPhase("easy")}
                  className="py-5 text-lg bg-green-500 hover:bg-green-600 text-white"
                >
                  🟢 {t("קל - 10 שאלות", "Easy - 10 questions")}
                </Button>
                <Button
                  onClick={() => setPhase("medium")}
                  className="py-5 text-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  🟡 {t("בינוני - 12 שאלות", "Medium - 12 questions")}
                </Button>
                <Button
                  onClick={() => setPhase("hard")}
                  className="py-5 text-lg bg-red-500 hover:bg-red-600 text-white"
                >
                  🔴 {t("קשה - 12 שאלות", "Hard - 12 questions")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // VOCABULARY PHASE
  if (phase === "vocab") {
    const currentCat = vocabularyData[vocabCategoryIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={() => setPhase("menu")}>
              ⬅ {t("חזרה", "Back")}
            </Button>
            <h1 className="text-2xl font-bold text-amber-800">{currentCat.nameHe}</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNikud(!showNikud)}
              className="mr-auto"
            >
              {showNikud ? <Eye className="w-4 h-4 ml-1" /> : <EyeOff className="w-4 h-4 ml-1" />}
              {t("ניקוד", "Nikud")}
            </Button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-6">
            {vocabularyData.map((cat, idx) => (
              <Button
                key={cat.key}
                variant={vocabCategoryIndex === idx ? "default" : "outline"}
                onClick={() => setVocabCategoryIndex(idx)}
                className={vocabCategoryIndex === idx ? "bg-amber-600" : ""}
              >
                {cat.nameHe}
              </Button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {currentCat.words.map((word, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePronunciation(word.hebrew)}
                      className="p-1"
                    >
                      <Volume2 className="h-5 w-5 text-amber-600" />
                    </Button>
                    <h3 className="text-xl font-bold text-right">
                      {showNikud ? word.hebrewWithNikud : word.hebrew}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 italic text-center my-1">
                    {word.transliteration}
                  </p>
                  <p className="text-md font-medium text-amber-700 text-center">
                    {word.english}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button onClick={() => setPhase("menu")} className="bg-amber-600 hover:bg-amber-700">
              {t("עבור לתרגול", "Go to Practice")} →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS PHASE
  if (phase === "results") {
    const stars = getStars();
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 flex items-center justify-center" dir="rtl">
        <Card className="max-w-md w-full border-2 border-amber-300 bg-white/95">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">
              {stars === 3 ? "🏆" : stars === 2 ? "🥈" : stars === 1 ? "🥉" : "💪"}
            </div>
            <h2 className="text-2xl font-bold text-amber-800 mb-2">
              {t("כל הכבוד!", "Great job!")}
            </h2>
            <div className="text-5xl mb-4">
              {"⭐".repeat(stars)}{"☆".repeat(3 - stars)}
            </div>
            <p className="text-xl mb-4">
              {correctCount} / {questions.length} {t("תשובות נכונות", "correct answers")}
            </p>
            <p className="text-lg text-amber-600 mb-6">
              {percentage}%
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={resetPractice} className="bg-amber-600 hover:bg-amber-700">
                <RotateCcw className="w-4 h-4 ml-2" />
                {t("נסה שוב", "Try Again")}
              </Button>
              <Button variant="outline" onClick={onBack}>
                {t("חזרה לתפריט", "Back to Menu")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // PRACTICE PHASE (easy/medium/hard)
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => setPhase("menu")}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              {showTranslation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="mr-1">EN</span>
            </Button>
            <span className="text-sm font-medium text-amber-700">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-3 bg-amber-200" />

        <Card className="border-2 border-amber-300 bg-white/95 mb-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                phase === "easy" ? "bg-green-100 text-green-700" :
                phase === "medium" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {phase === "easy" ? t("קל", "Easy") : 
                 phase === "medium" ? t("בינוני", "Medium") : 
                 t("קשה", "Hard")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePronunciation(currentQuestion.sentence.replace("___", currentQuestion.answer))}
              >
                <Volume2 className="w-5 h-5 text-amber-600" />
              </Button>
            </div>

            <div className="text-xl font-medium text-center mb-2 leading-relaxed text-right">
              {currentQuestion.sentence.split("___").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="inline-block w-20 border-b-2 border-amber-400 mx-1">
                      {showFeedback && selectedAnswer === currentQuestion.answer ? (
                        <span className="text-green-600 font-bold">{currentQuestion.answer}</span>
                      ) : showFeedback ? (
                        <span className="text-red-500 line-through">{selectedAnswer}</span>
                      ) : null}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {showTranslation && (
              <p className="text-sm text-gray-500 text-center mt-2 italic" dir="ltr">
                {currentQuestion.translation}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {currentQuestion.options.map((option) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = selectedAnswer === option;
            
            return (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={`py-6 text-lg transition-all duration-300 ${
                  showFeedback
                    ? isCorrect
                      ? "bg-green-500 hover:bg-green-500 text-white scale-105"
                      : isSelected
                        ? "bg-red-400 hover:bg-red-400 text-white scale-95"
                        : "bg-gray-200 text-gray-500"
                    : "bg-white hover:bg-amber-100 text-amber-800 border-2 border-amber-300"
                }`}
              >
                {option}
              </Button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="text-center">
            <div className={`text-xl font-bold mb-3 ${
              selectedAnswer === currentQuestion.answer ? "text-green-600" : "text-red-500"
            }`}>
              {selectedAnswer === currentQuestion.answer 
                ? t("נכון! 🎉", "Correct! 🎉")
                : t("לא נכון. התשובה: ", "Incorrect. Answer: ") + currentQuestion.answer
              }
            </div>
            <Button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700 px-8">
              {currentIndex < questions.length - 1 
                ? t("הבא", "Next") + " →"
                : t("סיום", "Finish")
              }
            </Button>
          </div>
        )}

        {/* Score display */}
        <div className="mt-6 text-center">
          <span className="bg-amber-100 px-4 py-2 rounded-full text-amber-800 font-medium">
            ✓ {correctCount} / {currentIndex + (showFeedback ? 1 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
