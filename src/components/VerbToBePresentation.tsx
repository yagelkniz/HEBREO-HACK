
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  verbToBeConjugations, 
  exampleSentences, 
  practiceQuestions,
  type PracticeQuestion 
} from "./VerbToBePresentationData";

interface VerbToBePresentationProps {
  onBack: () => void;
}

export default function VerbToBePresentation({ onBack }: VerbToBePresentationProps) {
  const [currentSection, setCurrentSection] = useState<"intro" | "conjugation" | "examples" | "practice">("intro");
  const [currentTense, setCurrentTense] = useState<"past" | "present" | "future">("present");
  const [currentPracticeType, setCurrentPracticeType] = useState<"fill" | "translate" | "multiple">("fill");
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});

  const getCurrentQuestions = () => {
    return practiceQuestions.filter(q => q.type === currentPracticeType);
  };

  const handleAnswerSubmit = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    setShowAnswers(prev => ({ ...prev, [questionId]: true }));
  };

  const isCorrectAnswer = (questionId: number) => {
    const question = practiceQuestions.find(q => q.id === questionId);
    return userAnswers[questionId]?.trim().toLowerCase() === question?.answer.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={onBack}>
            ⬅ חזרה לתפריט הראשי
          </Button>
          <h1 className="text-3xl font-bold text-blue-800" dir="rtl">
            הפועל "להיות" - The Verb "To Be"
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {[
            { key: "intro", label: "הסבר", labelEn: "Explanation" },
            { key: "conjugation", label: "נטיות", labelEn: "Conjugation" },
            { key: "examples", label: "דוגמאות", labelEn: "Examples" },
            { key: "practice", label: "תרגול", labelEn: "Practice" }
          ].map(section => (
            <Button
              key={section.key}
              variant={currentSection === section.key ? "default" : "outline"}
              onClick={() => setCurrentSection(section.key as any)}
              className="px-4 py-2"
            >
              <span dir="rtl">{section.label}</span>
              <br />
              <span className="text-xs">{section.labelEn}</span>
            </Button>
          ))}
        </div>

        {/* Introduction Section */}
        {currentSection === "intro" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl" dir="rtl">
                מהו הפועל "להיות"?
                <br />
                <span className="text-lg text-gray-600">What is the verb "to be"?</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-blue-50 p-6 rounded-lg" dir="rtl">
                <h3 className="text-xl font-semibold mb-3">הפועל "להיות" הוא אחד הפעלים החשובים ביותר בעברית</h3>
                <p className="text-gray-700 mb-2">
                  הוא משמש כדי לתאר מצב, זהות או מיקום
                </p>
                <p className="text-gray-600 text-sm" dir="ltr">
                  The verb "to be" is one of the most important verbs in Hebrew. 
                  It's used to describe a state, identity, or location.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-green-50 p-4 rounded-lg" dir="rtl">
                  <h4 className="font-semibold text-green-800 mb-2">שימושים עיקריים:</h4>
                  <ul className="text-right space-y-1 text-sm">
                    <li>• תיאור מצב: "אני עייף"</li>
                    <li>• זהות: "היא מורה"</li>
                    <li>• מיקום: "הם בבית"</li>
                    <li>• גיל: "אני בן 25"</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Main Uses:</h4>
                  <ul className="text-left space-y-1 text-sm">
                    <li>• Describing state: "I am tired"</li>
                    <li>• Identity: "She is a teacher"</li>
                    <li>• Location: "They are at home"</li>
                    <li>• Age: "I am 25 years old"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conjugation Section */}
        {currentSection === "conjugation" && (
          <div>
            <div className="flex justify-center gap-2 mb-4">
              {[
                { key: "past", label: "עבר", labelEn: "Past" },
                { key: "present", label: "הווה", labelEn: "Present" },
                { key: "future", label: "עתיד", labelEn: "Future" }
              ].map(tense => (
                <Button
                  key={tense.key}
                  variant={currentTense === tense.key ? "default" : "outline"}
                  onClick={() => setCurrentTense(tense.key as any)}
                >
                  <span dir="rtl">{tense.label}</span>
                  <br />
                  <span className="text-xs">{tense.labelEn}</span>
                </Button>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-center" dir="rtl">
                  נטיית הפועל "להיות" בזמן {currentTense === "past" ? "עבר" : currentTense === "present" ? "הווה" : "עתיד"}
                  <br />
                  <span className="text-sm text-gray-600">
                    {currentTense === "past" ? "Past Tense" : currentTense === "present" ? "Present Tense" : "Future Tense"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right" dir="rtl">שם גוף</TableHead>
                      <TableHead className="text-center">Pronoun</TableHead>
                      <TableHead className="text-right" dir="rtl">צורת הפועל</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verbToBeConjugations[currentTense].map((conjugation, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-right font-medium" dir="rtl">
                          {conjugation.pronoun}
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          {conjugation.pronounEn}
                        </TableCell>
                        <TableCell className="text-right font-bold text-blue-700" dir="rtl">
                          {conjugation.form}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Examples Section */}
        {currentSection === "examples" && (
          <div>
            <div className="flex justify-center gap-2 mb-4">
              {[
                { key: "past", label: "עבר", labelEn: "Past" },
                { key: "present", label: "הווה", labelEn: "Present" },
                { key: "future", label: "עתיד", labelEn: "Future" }
              ].map(tense => (
                <Button
                  key={tense.key}
                  variant={currentTense === tense.key ? "default" : "outline"}
                  onClick={() => setCurrentTense(tense.key as any)}
                >
                  <span dir="rtl">{tense.label}</span>
                  <br />
                  <span className="text-xs">{tense.labelEn}</span>
                </Button>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-center" dir="rtl">
                  דוגמאות לשימוש בזמן {currentTense === "past" ? "עבר" : currentTense === "present" ? "הווה" : "עתיד"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exampleSentences[currentTense].map((example, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xl font-semibold text-blue-800 mb-2" dir="rtl">
                        {example.hebrew}
                      </p>
                      <p className="text-gray-600" dir="ltr">
                        {example.english}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Practice Section */}
        {currentSection === "practice" && (
          <div>
            <div className="flex justify-center gap-2 mb-4">
              {[
                { key: "fill", label: "השלמה", labelEn: "Fill-in" },
                { key: "translate", label: "תרגום", labelEn: "Translate" },
                { key: "multiple", label: "בחירה", labelEn: "Multiple Choice" }
              ].map(type => (
                <Button
                  key={type.key}
                  variant={currentPracticeType === type.key ? "default" : "outline"}
                  onClick={() => {
                    setCurrentPracticeType(type.key as any);
                    setUserAnswers({});
                    setShowAnswers({});
                  }}
                >
                  <span dir="rtl">{type.label}</span>
                  <br />
                  <span className="text-xs">{type.labelEn}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {getCurrentQuestions().map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <p className="text-lg font-medium mb-2" dir={question.type === "translate" ? "ltr" : "rtl"}>
                        {question.question}
                      </p>
                    </div>

                    {question.type === "multiple" && question.options ? (
                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className={`w-full text-right ${
                              showAnswers[question.id] 
                                ? (option === question.answer ? "bg-green-100 border-green-500" : "bg-gray-100")
                                : ""
                            }`}
                            onClick={() => handleAnswerSubmit(question.id, option)}
                            disabled={showAnswers[question.id]}
                            dir="rtl"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="flex-1 p-2 border rounded-md text-right"
                          placeholder={question.type === "translate" ? "תרגם לעברית..." : "השלם את המשפט..."}
                          dir="rtl"
                          onChange={(e) => setUserAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                          disabled={showAnswers[question.id]}
                        />
                        <Button
                          onClick={() => handleAnswerSubmit(question.id, userAnswers[question.id] || "")}
                          disabled={showAnswers[question.id]}
                        >
                          בדוק
                        </Button>
                      </div>
                    )}

                    {showAnswers[question.id] && (
                      <div className="mt-3">
                        <div className={`p-3 rounded-md ${
                          isCorrectAnswer(question.id) ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {isCorrectAnswer(question.id) ? "✅ נכון!" : "❌ לא נכון"}
                          <div className="mt-2 font-medium" dir="rtl">
                            תשובה נכונה: {question.answer}
                          </div>
                          {question.hebrew && (
                            <div className="mt-1 text-sm" dir="rtl">
                              משפט מלא: {question.hebrew}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
