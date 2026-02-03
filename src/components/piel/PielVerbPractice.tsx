import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { pielVerbs, pielQuestions, verbCategories, PielVerb, PielQuestion } from "./PielVerbData";
import { ArrowRight, Check, X, RotateCcw, BookOpen, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface PielVerbPracticeProps {
  onBack: () => void;
}

type Phase = "menu" | "table" | "quiz";
type Difficulty = "easy" | "medium" | "hard";

const removeNikud = (text: string): string => {
  return text.replace(/[\u0591-\u05C7]/g, "");
};

export default function PielVerbPractice({ onBack }: PielVerbPracticeProps) {
  const [phase, setPhase] = useState<Phase>("menu");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [showNikud, setShowNikud] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
  const [selectedVerb, setSelectedVerb] = useState<PielVerb | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(verbCategories.map(c => c.title));
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedTense, setSelectedTense] = useState<"all" | "past" | "present" | "future">("all");

  const questionsPerDifficulty = { easy: 10, medium: 18, hard: 30 };

  const quizQuestions = useMemo(() => {
    let filtered = [...pielQuestions];
    if (selectedTense !== "all") {
      filtered = filtered.filter(q => q.tense === selectedTense);
    }
    // Shuffle questions
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    
    // Shuffle options for each question
    return shuffled.slice(0, questionsPerDifficulty[difficulty]).map(q => {
      const optionIndices = q.options.map((_, idx) => idx);
      // Fisher-Yates shuffle
      for (let i = optionIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionIndices[i], optionIndices[j]] = [optionIndices[j], optionIndices[i]];
      }
      
      return {
        ...q,
        options: optionIndices.map(i => q.options[i]),
        optionsNikud: optionIndices.map(i => q.optionsNikud[i]),
        correctAnswer: optionIndices.indexOf(q.correctAnswer)
      };
    });
  }, [difficulty, selectedTense]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => 
      prev.includes(title) ? prev.filter(c => c !== title) : [...prev, title]
    );
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const startQuiz = (tense: "all" | "past" | "present" | "future") => {
    setSelectedTense(tense);
    resetQuiz();
    setPhase("quiz");
  };

  const renderVerbTable = (verb: PielVerb) => {
    const pronouns = ["אני", "אתה", "את", "הוא", "היא", "אנחנו", "אתם", "אתן", "הם", "הן"];
    const presentPronouns = ["אני (ז)", "אני (נ)", "אתה", "את", "הוא", "היא", "אנחנו (ז)", "אנחנו (נ)", "אתם", "אתן", "הם", "הן"];
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-purple-100">
              <th className="border border-purple-300 p-2 text-right">גוף</th>
              <th className="border border-purple-300 p-2">עבר</th>
              <th className="border border-purple-300 p-2">הווה</th>
              <th className="border border-purple-300 p-2">עתיד</th>
            </tr>
          </thead>
          <tbody>
            {pronouns.map((pronoun, idx) => {
              const presentKey = presentPronouns[idx] || pronoun;
              return (
                <tr key={pronoun} className={idx % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                  <td className="border border-purple-200 p-2 font-medium text-right">{pronoun}</td>
                  <td className="border border-purple-200 p-2 text-center">
                    {showNikud ? verb.conjugations.past[pronoun] : removeNikud(verb.conjugations.past[pronoun] || "")}
                  </td>
                  <td className="border border-purple-200 p-2 text-center">
                    {showNikud ? verb.conjugations.present[presentKey] : removeNikud(verb.conjugations.present[presentKey] || "")}
                  </td>
                  <td className="border border-purple-200 p-2 text-center">
                    {showNikud ? verb.conjugations.future[pronoun] : removeNikud(verb.conjugations.future[pronoun] || "")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // Menu phase
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowRight className="h-4 w-4" />
              חזרה לתפריט
            </Button>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <span>ניקוד</span>
                <Switch checked={showNikud} onCheckedChange={setShowNikud} />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <span>English</span>
                <Switch checked={showEnglish} onCheckedChange={setShowEnglish} />
              </label>
            </div>
          </div>

          <Card className="p-6 mb-6 bg-white/90">
            <h1 className="text-3xl font-bold text-purple-800 mb-2 text-center">בניין פיעל</h1>
            <p className="text-center text-gray-600 mb-4">Pi'el Pattern - Active Intensive</p>
            <p className="text-center text-sm text-gray-500">
              בניין פיעל משמש לפעולות אינטנסיביות, גורמות או מעבר. המאפיין העיקרי: דגש חזק באות האמצעית.
            </p>
          </Card>

          {/* Difficulty Selection */}
          <Card className="p-4 mb-6 bg-white/90">
            <h2 className="font-bold text-lg mb-3 text-center">בחר רמה:</h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {(["easy", "medium", "hard"] as Difficulty[]).map(d => (
                <Button
                  key={d}
                  variant={difficulty === d ? "default" : "outline"}
                  onClick={() => setDifficulty(d)}
                  className={difficulty === d ? "bg-purple-600" : ""}
                >
                  {d === "easy" ? "קל (10)" : d === "medium" ? "בינוני (18)" : "קשה (30)"}
                </Button>
              ))}
            </div>
          </Card>

          {/* Quiz Options */}
          <Card className="p-4 mb-6 bg-white/90">
            <h2 className="font-bold text-lg mb-3 flex items-center gap-2 justify-center">
              <HelpCircle className="h-5 w-5" />
              תרגול שאלות
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button onClick={() => startQuiz("all")} className="bg-purple-600 hover:bg-purple-700">
                כל הזמנים
              </Button>
              <Button onClick={() => startQuiz("past")} variant="outline" className="border-purple-400 text-purple-700">
                עבר
              </Button>
              <Button onClick={() => startQuiz("present")} variant="outline" className="border-purple-400 text-purple-700">
                הווה
              </Button>
              <Button onClick={() => startQuiz("future")} variant="outline" className="border-purple-400 text-purple-700">
                עתיד
              </Button>
            </div>
          </Card>

          {/* Verb Categories */}
          {verbCategories.map(category => (
            <Card key={category.title} className="mb-4 bg-white/90 overflow-hidden">
              <button
                onClick={() => toggleCategory(category.title)}
                className="w-full p-4 flex justify-between items-center hover:bg-purple-50 transition-colors"
              >
                <div>
                  <h2 className="font-bold text-lg text-purple-800">{category.title}</h2>
                  {showEnglish && <p className="text-sm text-gray-500">{category.titleEn}</p>}
                </div>
                {expandedCategories.includes(category.title) ? (
                  <ChevronUp className="h-5 w-5 text-purple-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-600" />
                )}
              </button>
              
              {expandedCategories.includes(category.title) && (
                <div className="p-4 pt-0 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.verbs.map(verbInf => {
                    const verb = pielVerbs.find(v => v.infinitive === verbInf);
                    if (!verb) return null;
                    return (
                      <Button
                        key={verbInf}
                        variant="outline"
                        onClick={() => {
                          setSelectedVerb(verb);
                          setPhase("table");
                        }}
                        className="flex flex-col h-auto py-3 border-purple-200 hover:bg-purple-50"
                      >
                        <span className="text-lg font-medium">
                          {showNikud ? verb.infinitiveNikud : verb.infinitive}
                        </span>
                        {showEnglish && (
                          <span className="text-xs text-gray-500">{verb.english}</span>
                        )}
                      </Button>
                    );
                  })}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Table phase
  if (phase === "table" && selectedVerb) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={() => setPhase("menu")} className="gap-2">
              <ArrowRight className="h-4 w-4" />
              חזרה
            </Button>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <span>ניקוד</span>
                <Switch checked={showNikud} onCheckedChange={setShowNikud} />
              </label>
            </div>
          </div>

          <Card className="p-6 bg-white/90">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-purple-800">
                {showNikud ? selectedVerb.infinitiveNikud : selectedVerb.infinitive}
              </h1>
              <p className="text-gray-600">{selectedVerb.english}</p>
              <p className="text-sm text-purple-600">שורש: {selectedVerb.root}</p>
            </div>
            
            {renderVerbTable(selectedVerb)}
            
            <div className="mt-6 flex justify-center">
              <Button onClick={() => setPhase("menu")} className="bg-purple-600">
                <BookOpen className="h-4 w-4 ml-2" />
                חזרה לרשימה
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz phase
  if (phase === "quiz") {
    if (quizComplete) {
      const percentage = Math.round((score / quizQuestions.length) * 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4" dir="rtl">
          <Card className="p-8 max-w-md w-full text-center bg-white/95">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">סיימת את התרגול!</h2>
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🌟" : percentage >= 60 ? "👍" : "💪"}
            </div>
            <p className="text-xl mb-2">
              {score} / {quizQuestions.length} תשובות נכונות
            </p>
            <p className="text-lg text-purple-600 mb-6">{percentage}%</p>
            <div className="flex flex-col gap-3">
              <Button onClick={resetQuiz} className="bg-purple-600">
                <RotateCcw className="h-4 w-4 ml-2" />
                נסה שוב
              </Button>
              <Button variant="outline" onClick={() => setPhase("menu")}>
                חזרה לתפריט
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4" dir="rtl">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" onClick={() => setPhase("menu")} className="gap-2">
              <ArrowRight className="h-4 w-4" />
              חזרה
            </Button>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <span>ניקוד</span>
                <Switch checked={showNikud} onCheckedChange={setShowNikud} />
              </label>
            </div>
          </div>

          <Progress 
            value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} 
            className="mb-4 h-2"
          />
          
          <p className="text-center text-sm text-gray-600 mb-4">
            שאלה {currentQuestionIndex + 1} מתוך {quizQuestions.length} | ציון: {score}
          </p>

          <Card className="p-6 bg-white/95">
            <div className="mb-4 text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                currentQuestion.tense === "past" ? "bg-orange-100 text-orange-700" :
                currentQuestion.tense === "present" ? "bg-green-100 text-green-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {currentQuestion.tense === "past" ? "עבר" : 
                 currentQuestion.tense === "present" ? "הווה" : "עתיד"}
              </span>
            </div>
            
            <p className="text-lg mb-2 text-center text-gray-600">
              {showNikud ? currentQuestion.verbNikud : currentQuestion.verb}
            </p>
            
            <h2 className="text-xl font-bold text-center mb-6 text-purple-900">
              {showNikud ? currentQuestion.questionNikud : removeNikud(currentQuestion.question)}
            </h2>

            {showEnglish && (
              <p className="text-center text-sm text-gray-500 mb-4">{currentQuestion.english}</p>
            )}

            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isCorrect = idx === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === idx;
                
                let buttonClass = "p-4 text-lg transition-all ";
                if (showResult) {
                  if (isCorrect) {
                    buttonClass += "bg-green-100 border-green-500 text-green-700 ";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "bg-red-100 border-red-500 text-red-700 ";
                  }
                }
                
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showResult}
                  >
                    <span className="flex items-center gap-2">
                      {showResult && isCorrect && <Check className="h-4 w-4 text-green-600" />}
                      {showResult && isSelected && !isCorrect && <X className="h-4 w-4 text-red-600" />}
                      {showNikud ? currentQuestion.optionsNikud[idx] : option}
                    </span>
                  </Button>
                );
              })}
            </div>

            {showResult && (
              <div className="mt-6 text-center">
                <Button onClick={handleNextQuestion} className="bg-purple-600">
                  {currentQuestionIndex < quizQuestions.length - 1 ? "שאלה הבאה" : "סיום"}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
