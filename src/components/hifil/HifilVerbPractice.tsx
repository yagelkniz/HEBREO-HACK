import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { conjugationTable, hifilQuestions, HifilQuestion } from "./HifilVerbData";

interface HifilVerbPracticeProps {
  onBack: () => void;
  initialLevel?: "learn" | "easy" | "medium" | "hard";
  lang?: "he" | "en";
}

type Phase = "table" | "past" | "present" | "future" | "results";
type TenseType = "past" | "present" | "future";

export default function HifilVerbPractice({ onBack, initialLevel = "learn", lang = "he" }: HifilVerbPracticeProps) {
  // Determine initial phase based on level
  const getInitialPhase = (): Phase => {
    if (initialLevel === "learn") return "table";
    return "past"; // For easy/medium/hard, start with practice
  };
  
  const [phase, setPhase] = useState<Phase>(getInitialPhase());
  const [showNikud, setShowNikud] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<{ tense: TenseType; correct: number; total: number }[]>([]);
  const [currentTenseResults, setCurrentTenseResults] = useState({ correct: 0, total: 0 });

  const removeNikud = (text: string) => {
    return text.replace(/[\u0591-\u05C7]/g, "");
  };

  const displayText = (text: string) => (showNikud ? text : removeNikud(text));

  // Shuffle questions and options using Fisher-Yates algorithm
  const shuffledQuestions = useMemo(() => {
    // First shuffle all questions
    const shuffled = [...hifilQuestions].sort(() => Math.random() - 0.5);
    
    // Then shuffle options within each question
    return shuffled.map(q => {
      const shuffledOptions = [...q.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      return { ...q, options: shuffledOptions };
    });
  }, [phase]); // Re-shuffle when phase changes (new tense)

  const getQuestionsByTense = (tense: TenseType): HifilQuestion[] => {
    return shuffledQuestions.filter((q) => q.tense === tense);
  };

  const currentQuestions = phase !== "table" && phase !== "results" ? getQuestionsByTense(phase) : [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === currentQuestion.correct) {
      setCurrentTenseResults((prev) => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setCurrentTenseResults((prev) => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Save results for this tense
      setResults((prev) => [...prev, { tense: phase as TenseType, ...currentTenseResults }]);
      
      // Move to next phase
      if (phase === "past") {
        setPhase("present");
      } else if (phase === "present") {
        setPhase("future");
      } else {
        setPhase("results");
      }
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCurrentTenseResults({ correct: 0, total: 0 });
    }
  };

  const startPractice = () => {
    setPhase("past");
    setResults([]);
    setCurrentTenseResults({ correct: 0, total: 0 });
  };

  const resetPractice = () => {
    setPhase("table");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setResults([]);
    setCurrentTenseResults({ correct: 0, total: 0 });
  };

  const getTenseLabel = (tense: TenseType) => {
    switch (tense) {
      case "past": return "עבר";
      case "present": return "הווה";
      case "future": return "עתיד";
    }
  };

  // Render conjugation table
  if (phase === "table") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            ⬅ חזרה לתפריט הראשי
          </Button>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-2" dir="rtl">
              בניין הפעיל - הפועל "להלביש"
            </h1>
            <p className="text-center text-gray-600 mb-4" dir="rtl">
              Hif'il Pattern - The verb "to dress (someone)"
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Checkbox
                id="nikud"
                checked={showNikud}
                onCheckedChange={(checked) => setShowNikud(checked === true)}
              />
              <label htmlFor="nikud" className="text-sm">הצג ניקוד</label>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-center" dir="rtl">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border border-indigo-200 p-2">גוף</th>
                    <th className="border border-indigo-200 p-2 bg-amber-100">עבר</th>
                    <th className="border border-indigo-200 p-2 bg-green-100">הווה</th>
                    <th className="border border-indigo-200 p-2 bg-purple-100">עתיד</th>
                  </tr>
                </thead>
                <tbody>
                  {conjugationTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-semibold">
                        {row.pronoun}
                        <span className="text-xs text-gray-500 block">({row.pronounEn})</span>
                      </td>
                      <td className="border border-gray-200 p-2 bg-amber-50 text-lg">
                        {displayText(row.past)}
                      </td>
                      <td className="border border-gray-200 p-2 bg-green-50 text-lg">
                        {displayText(row.present)}
                      </td>
                      <td className="border border-gray-200 p-2 bg-purple-50 text-lg">
                        {displayText(row.future)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center">
              <Button onClick={startPractice} className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4">
                התחל תרגול 🎯
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render results
  if (phase === "results") {
    const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
    const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">🎉 סיימת את התרגול!</h2>
          
          <div className="space-y-4 mb-6" dir="rtl">
            {results.map((r, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">{getTenseLabel(r.tense)}</span>
                <span className={r.correct === r.total ? "text-green-600" : "text-blue-600"}>
                  {r.correct} / {r.total}
                </span>
              </div>
            ))}
          </div>

          <div className="text-4xl font-bold mb-2">{percentage}%</div>
          <p className="text-gray-600 mb-6">
            {totalCorrect} מתוך {totalQuestions} תשובות נכונות
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={resetPractice} className="bg-indigo-600 hover:bg-indigo-700">
              תרגול מחדש
            </Button>
            <Button variant="outline" onClick={onBack}>
              חזרה לתפריט
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render practice questions
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          ⬅ חזרה לתפריט הראשי
        </Button>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              phase === "past" ? "bg-amber-100 text-amber-800" :
              phase === "present" ? "bg-green-100 text-green-800" :
              "bg-purple-100 text-purple-800"
            }`}>
              זמן {getTenseLabel(phase)}
            </span>
            <span className="text-gray-600">
              שאלה {currentQuestionIndex + 1} / {currentQuestions.length}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 mb-4">
            <Checkbox
              id="nikud-practice"
              checked={showNikud}
              onCheckedChange={(checked) => setShowNikud(checked === true)}
            />
            <label htmlFor="nikud-practice" className="text-sm">הצג ניקוד</label>
          </div>

          <div className="text-center mb-6">
            <p className="text-2xl font-semibold mb-2" dir="rtl">
              {displayText(currentQuestion.sentence)}
            </p>
            <p className="text-gray-600">{currentQuestion.sentenceEn}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = option === currentQuestion.correct;
              const isSelected = option === selectedAnswer;
              
              let buttonClass = "py-4 text-lg ";
              if (showFeedback) {
                if (isCorrect) {
                  buttonClass += "bg-green-500 hover:bg-green-500 text-white";
                } else if (isSelected) {
                  buttonClass += "bg-red-500 hover:bg-red-500 text-white";
                } else {
                  buttonClass += "bg-gray-100 text-gray-400";
                }
              } else {
                buttonClass += "bg-indigo-100 hover:bg-indigo-200 text-indigo-800";
              }

              return (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={buttonClass}
                  disabled={showFeedback}
                >
                  {displayText(option)}
                </Button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="text-center">
              <p className={`text-lg font-semibold mb-4 ${selectedAnswer === currentQuestion.correct ? "text-green-600" : "text-red-600"}`}>
                {selectedAnswer === currentQuestion.correct ? "✓ נכון!" : `✗ התשובה הנכונה: ${displayText(currentQuestion.correct)}`}
              </p>
              <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700">
                {currentQuestionIndex < currentQuestions.length - 1 ? "הבא →" : 
                  phase === "future" ? "לתוצאות" : `לזמן ${getTenseLabel(phase === "past" ? "present" : "future")}`}
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-gray-500">
            תשובות נכונות בזמן זה: {currentTenseResults.correct} / {currentTenseResults.total}
          </div>
        </div>
      </div>
    </div>
  );
}
