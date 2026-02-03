import React, { useState, useMemo } from "react";
import { Volume2, Eye, EyeOff, RotateCcw, Headphones, Play, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/shuffleArray";

// סיפור קצר על קניות בשוק
const listeningStories = [
  {
    id: "shuk-shopping",
    title: "קניות בשוק",
    titleEn: "Shopping at the Shuk",
    text: `בוקר טוב! היום אני הולך לשוק. אני צריך לקנות ירקות ופירות טריים.
בשוק יש הרבה דוכנים. אני ניגש לדוכן הראשון ושואל: "כמה עולים העגבניות?"
המוכר עונה: "עשרה שקלים לקילו."
אני אומר: "זה יקר מדי! אפשר בשמונה שקלים?"
המוכר מסכים ואני קונה קילו עגבניות, חצי קילו מלפפונים, וקילו תפוזים.
בסוף אני משלם עשרים וחמישה שקלים. המוכר נותן לי שקית גדולה ואני הולך הביתה שמח.`,
    textEn: `Good morning! Today I'm going to the market. I need to buy fresh vegetables and fruits.
At the market there are many stalls. I approach the first stall and ask: "How much are the tomatoes?"
The seller answers: "Ten shekels per kilo."
I say: "That's too expensive! Can I have it for eight shekels?"
The seller agrees and I buy a kilo of tomatoes, half a kilo of cucumbers, and a kilo of oranges.
In the end I pay twenty-five shekels. The seller gives me a big bag and I go home happy.`,
    questions: [
      {
        question: "לאן הולך הדובר בבוקר?",
        questionEn: "Where does the speaker go in the morning?",
        options: ["לסופרמרקט", "לשוק", "לבית קפה", "לעבודה"],
        answer: "לשוק"
      },
      {
        question: "כמה ביקש המוכר בהתחלה על העגבניות?",
        questionEn: "How much did the seller initially ask for tomatoes?",
        options: ["חמישה שקלים", "שמונה שקלים", "עשרה שקלים", "חמש עשרה שקלים"],
        answer: "עשרה שקלים"
      },
      {
        question: "מה הדובר לא קנה בשוק?",
        questionEn: "What did the speaker NOT buy at the market?",
        options: ["עגבניות", "מלפפונים", "תפוחים", "תפוזים"],
        answer: "תפוחים"
      },
      {
        question: "כמה שילם הדובר בסוף?",
        questionEn: "How much did the speaker pay in the end?",
        options: ["עשרים שקלים", "עשרים וחמישה שקלים", "שלושים שקלים", "חמש עשרה שקלים"],
        answer: "עשרים וחמישה שקלים"
      }
    ]
  },
  {
    id: "cafe-order",
    title: "הזמנה בבית קפה",
    titleEn: "Ordering at a Cafe",
    text: `אני נכנס לבית קפה קטן בתל אביב. המלצרית מחייכת ושואלת: "מה תרצה להזמין?"
אני עונה: "אני רוצה קפה הפוך גדול, בבקשה."
היא שואלת: "עם חלב רגיל או חלב שקדים?"
אני אומר: "חלב שקדים, בבקשה. ואפשר גם עוגת שוקולד?"
המלצרית כותבת את ההזמנה ואומרת: "בסדר גמור! זה יהיה ארבעים שקלים."
אני משלם ומחכה. אחרי חמש דקות, הקפה והעוגה מגיעים. הקפה חם וטעים והעוגה מתוקה מאוד.`,
    textEn: `I enter a small cafe in Tel Aviv. The waitress smiles and asks: "What would you like to order?"
I answer: "I'd like a large latte, please."
She asks: "With regular milk or almond milk?"
I say: "Almond milk, please. And can I also have chocolate cake?"
The waitress writes down the order and says: "Perfect! That will be forty shekels."
I pay and wait. After five minutes, the coffee and cake arrive. The coffee is hot and delicious and the cake is very sweet.`,
    questions: [
      {
        question: "איפה נמצא בית הקפה?",
        questionEn: "Where is the cafe located?",
        options: ["בירושלים", "בחיפה", "בתל אביב", "באילת"],
        answer: "בתל אביב"
      },
      {
        question: "איזה סוג חלב הדובר ביקש?",
        questionEn: "What type of milk did the speaker request?",
        options: ["חלב רגיל", "חלב סויה", "חלב שקדים", "בלי חלב"],
        answer: "חלב שקדים"
      },
      {
        question: "כמה זמן הדובר חיכה לקפה?",
        questionEn: "How long did the speaker wait for the coffee?",
        options: ["שתי דקות", "חמש דקות", "עשר דקות", "רבע שעה"],
        answer: "חמש דקות"
      },
      {
        question: "איך הייתה העוגה?",
        questionEn: "How was the cake?",
        options: ["חמוצה", "מלוחה", "מרה", "מתוקה מאוד"],
        answer: "מתוקה מאוד"
      }
    ]
  },
  {
    id: "bus-ride",
    title: "נסיעה באוטובוס",
    titleEn: "A Bus Ride",
    text: `אני עומד בתחנת אוטובוס וממתין לקו חמישים ואחת. היום חם מאוד והשמש חזקה.
אחרי עשר דקות האוטובוס מגיע. אני עולה ואומר לנהג: "שלום, כרטיס אחד לכיכר רבין, בבקשה."
הנהג אומר: "שישה שקלים."
אני משלם ויושב ליד החלון. האוטובוס מלא אנשים - יש סטודנטים, משפחות עם ילדים, ואנשים זקנים.
אחרי עשרים דקות, אני מגיע לתחנה שלי. אני יורד ואומר לנהג: "תודה רבה!"`,
    textEn: `I'm standing at the bus stop waiting for line 51. Today it's very hot and the sun is strong.
After ten minutes the bus arrives. I get on and say to the driver: "Hello, one ticket to Rabin Square, please."
The driver says: "Six shekels."
I pay and sit by the window. The bus is full of people - there are students, families with children, and elderly people.
After twenty minutes, I arrive at my stop. I get off and say to the driver: "Thank you very much!"`,
    questions: [
      {
        question: "לאיזה קו הדובר חיכה?",
        questionEn: "Which bus line was the speaker waiting for?",
        options: ["קו 15", "קו 41", "קו 51", "קו 61"],
        answer: "קו 51"
      },
      {
        question: "איך היה מזג האוויר?",
        questionEn: "How was the weather?",
        options: ["קר וגשום", "חם מאוד", "קריר ונעים", "מעונן"],
        answer: "חם מאוד"
      },
      {
        question: "כמה עלה הכרטיס?",
        questionEn: "How much did the ticket cost?",
        options: ["ארבעה שקלים", "חמישה שקלים", "שישה שקלים", "שמונה שקלים"],
        answer: "שישה שקלים"
      },
      {
        question: "כמה זמן ארכה הנסיעה?",
        questionEn: "How long did the ride take?",
        options: ["עשר דקות", "חמש עשרה דקות", "עשרים דקות", "חצי שעה"],
        answer: "עשרים דקות"
      }
    ]
  }
];

interface ListeningPracticeProps {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function ListeningPractice({ onBack, lang = "he" }: ListeningPracticeProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [hasListened, setHasListened] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState<{ [i: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [i: number]: "correct" | "incorrect" | null }>({});
  const [showQuestions, setShowQuestions] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentStory = listeningStories[currentStoryIndex];
  const questions = currentStory.questions;

  // Shuffle options for each question
  const shuffledQuestions = useMemo(() => {
    return questions.map((q, idx) => {
      const shuffledOptions = shuffleArray([...q.options]);
      return { ...q, options: shuffledOptions, originalIndex: idx };
    });
  }, [currentStory.id]);

  const t = (he: string, en: string) => (lang === "he" ? he : en);

  const playAudio = () => {
    if (isPlaying || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(currentStory.text);
    utterance.lang = "he-IL";
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1;
    
    utterance.onstart = () => {
      setIsPlaying(true);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setHasListened(true);
      setShowQuestions(true);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setHasListened(true);
      setShowQuestions(true);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setHasListened(true);
    setShowQuestions(true);
  };

  const checkAnswer = (qIdx: number, option: string) => {
    if (answers[qIdx]) return;
    
    const originalQuestion = questions[qIdx];
    const isCorrect = option === originalQuestion.answer;
    
    setAnswers(prev => ({ ...prev, [qIdx]: option }));
    setFeedbacks(prev => ({ ...prev, [qIdx]: isCorrect ? "correct" : "incorrect" }));
    
    if (Object.keys({ ...answers, [qIdx]: option }).length === questions.length) {
      setFinished(true);
    }
  };

  const nextStory = () => {
    if (currentStoryIndex < listeningStories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      resetQuiz();
    }
  };

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    window.speechSynthesis.cancel();
    setHasListened(false);
    setShowText(false);
    setIsPlaying(false);
    setAnswers({});
    setFeedbacks({});
    setShowQuestions(false);
    setFinished(false);
  };

  const correctCount = Object.values(feedbacks).filter(f => f === "correct").length;

  return (
    <div 
      className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4 md:p-8"
      dir="rtl"
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-sm text-blue-800 underline underline-offset-2"
          >
            ⬅ {t("חזרה לתפריט הראשי", "Back to Main Menu")}
          </button>
          <button
            onClick={resetQuiz}
            className="flex items-center gap-1 text-sm text-purple-700 hover:text-purple-900"
          >
            <RotateCcw className="w-4 h-4" />
            {t("התחל מחדש", "Start Over")}
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Headphones className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-purple-800">
              {t("הבנת הנשמע", "Listening Comprehension")}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {t("הקשיבו לסיפור וענו על השאלות", "Listen to the story and answer the questions")}
          </p>
        </div>

        {/* Story Navigation */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStory}
            disabled={currentStoryIndex === 0}
          >
            {t("הסיפור הקודם", "Previous")}
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentStoryIndex + 1} / {listeningStories.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextStory}
            disabled={currentStoryIndex === listeningStories.length - 1}
          >
            {t("הסיפור הבא", "Next")}
          </Button>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">
            {lang === "he" ? currentStory.title : currentStory.titleEn}
          </h2>

          {/* Play Audio Button */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <Button
              onClick={isPlaying ? stopAudio : playAudio}
              className={`flex items-center gap-2 px-8 py-6 text-lg rounded-full transition-all ${
                isPlaying 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
              size="lg"
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-6 h-6 animate-pulse" />
                  {t("עצור", "Stop")}
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  {t("הפעל את הסיפור", "Play Story")}
                </>
              )}
            </Button>
            
            {isPlaying && (
              <p className="text-sm text-purple-600 animate-pulse">
                {t("🎧 מנגן... הקשב בקשב רב", "🎧 Playing... Listen carefully")}
              </p>
            )}
          </div>

          {/* Show/Hide Text Toggle - only after listening */}
          {hasListened && (
            <div className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setShowText(!showText)}
                className="flex items-center gap-2 mx-auto"
              >
                {showText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showText 
                  ? t("הסתר טקסט", "Hide Text") 
                  : t("הצג טקסט", "Show Text")
                }
              </Button>
              
              {showText && (
                <div 
                  className="mt-4 p-4 bg-purple-50 rounded-xl text-lg text-right"
                  style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}
                  dir="rtl"
                >
                  {currentStory.text}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Questions Section */}
        {showQuestions && (
          <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6">
            <h3 className="text-lg font-bold text-purple-700 mb-4 text-center">
              {t("שאלות הבנה", "Comprehension Questions")}
            </h3>
            
            <div className="flex flex-col gap-4">
              {shuffledQuestions.map((q, i) => (
                <div 
                  key={i} 
                  className="bg-purple-50 rounded-xl p-4 border border-purple-100"
                >
                  <div className="font-semibold text-purple-900 mb-3 text-right">
                    {i + 1}. {lang === "he" ? q.question : q.questionEn}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => checkAnswer(q.originalIndex, opt)}
                        disabled={!!answers[q.originalIndex]}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                          answers[q.originalIndex] === opt
                            ? feedbacks[q.originalIndex] === "correct"
                              ? "bg-green-200 border-green-500 scale-105"
                              : "bg-red-200 border-red-500"
                            : answers[q.originalIndex] && opt === questions[q.originalIndex].answer
                              ? "bg-green-100 border-green-400"
                              : "bg-white border-gray-300 hover:bg-purple-100"
                        } ${answers[q.originalIndex] ? "cursor-default" : "cursor-pointer"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  
                  {answers[q.originalIndex] && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      {feedbacks[q.originalIndex] === "correct" ? (
                        <span className="text-green-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> {t("נכון!", "Correct!")}
                        </span>
                      ) : (
                        <span className="text-red-700 font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> {t("טעות", "Wrong")} - {t("התשובה הנכונה:", "Correct answer:")} {questions[q.originalIndex].answer}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Results */}
            {finished && (
              <div className="mt-6 text-center">
                <div className="text-2xl font-bold text-purple-700 mb-2">
                  {correctCount === questions.length 
                    ? t("מושלם! 🎉", "Perfect! 🎉")
                    : correctCount >= questions.length / 2
                      ? t("כל הכבוד! 👏", "Well done! 👏")
                      : t("נסה שוב 💪", "Try again 💪")
                  }
                </div>
                <div className="text-lg text-purple-600">
                  {t(`${correctCount} מתוך ${questions.length} תשובות נכונות`, `${correctCount} out of ${questions.length} correct`)}
                </div>
                <div className="flex gap-3 justify-center mt-4">
                  <Button onClick={resetQuiz} variant="outline">
                    <RotateCcw className="w-4 h-4 ml-2" />
                    {t("נסה שוב", "Try Again")}
                  </Button>
                  {currentStoryIndex < listeningStories.length - 1 && (
                    <Button onClick={nextStory}>
                      {t("הסיפור הבא", "Next Story")}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
