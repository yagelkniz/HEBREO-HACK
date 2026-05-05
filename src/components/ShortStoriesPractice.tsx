import { useState } from "react";
import { Button } from "@/components/ui/button";
import { shortStories, ShortStory } from "@/data/shortStoriesData";

interface Props { onBack: () => void; lang: "he" | "en"; }

export default function ShortStoriesPractice({ onBack, lang }: Props) {
    const [selectedStory, setSelectedStory] = useState<ShortStory | null>(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showTrans, setShowTrans] = useState(false);
    const [showVocab, setShowVocab] = useState(false);
    const [done, setDone] = useState(false);

  const t = (he: string, en: string) => lang === "he" ? he : en;

  const levelStyle = (l: string) => l === "easy"
      ? "bg-green-100 text-green-700 border-green-300"
        : l === "medium"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
        : "bg-red-100 text-red-700 border-red-300";

  const levelLabel = (l: string) => l === "easy" ? t("קל","Easy") : l === "medium" ? t("בינוני","Medium") : t("קשה","Hard");

  const reset = () => { setCurrentQ(0); setSelected(null); setScore(0); setShowResult(false); setDone(false); setShowTrans(false); setShowVocab(false); };

  const handleAnswer = (opt: string) => {
        if (selected) return;
        setSelected(opt);
        if (opt === selectedStory!.questions[currentQ].answer) setScore(s => s + 1);
        setShowResult(true);
  };

  const handleNext = () => {
        if (currentQ + 1 < selectedStory!.questions.length) {
                setCurrentQ(q => q + 1); setSelected(null); setShowResult(false);
        } else setDone(true);
  };

  if (!selectedStory) return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
              <div className="max-w-3xl mx-auto">
                      <div className="flex justify-between items-center mb-6">
                                <Button variant="ghost" onClick={onBack}>{t("חזרה לתפריט","Back to Menu")}</Button>Button>
                                <h1 className="text-2xl font-bold text-indigo-800">{t("סיפורים קצרים","Short Stories")}</h1>h1>
                                <div/>
                      </div>div>
                      <div className="grid gap-4">
                        {shortStories.map(story => (
                      <button key={story.id} onClick={() => { setSelectedStory(story); reset(); }}
                                      className="bg-white rounded-xl p-5 shadow hover:shadow-md border-2 border-transparent hover:border-indigo-300 transition text-right w-full">
                                    <div className="flex justify-between items-start">
                                                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${levelStyle(story.level)}`}>{levelLabel(story.level)}</span>span>
                                                    <div><h2 className="text-xl font-bold text-indigo-900">{story.titleHe}</h2>h2>
                                                                    <p className="text-sm text-gray-500">{story.titleEn}</p>p></div>div>
                                    </div>div>
                                    <p className="text-gray-500 text-sm mt-2">{story.questions.length} {t("שאלות","questions")} • {story.vocab.length} {t("מילים חדשות","new words")}</p>p>
                      </button>button>
                    ))}
                      </div>div>
              </div>div>
        </div>div>
      );
  
    if (done) {
          const total = selectedStory.questions.length;
          const pct = Math.round((score / total) * 100);
          return (
                  <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
                          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                                    <div className="text-5xl mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</div>div>
                                    <h2 className="text-2xl font-bold text-indigo-800 mb-2">{t("סיימת!","Done!")}</h2>h2>
                                    <p className="text-gray-600 mb-4">{selectedStory.titleHe}</p>p>
                                    <div className="text-4xl font-bold text-indigo-700 mb-2">{score}/{total}</div>div>
                                    <p className="text-gray-500 mb-6">{pct}%</p>p>
                                    <div className="flex gap-3 justify-center flex-wrap">
                                                <Button onClick={reset} className="bg-indigo-600 hover:bg-indigo-700">{t("שוב","Again")}</Button>Button>
                                                <Button variant="outline" onClick={() => { setSelectedStory(null); reset(); }}>{t("סיפור אחר","Other Story")}</Button>Button>
                                                <Button variant="ghost" onClick={onBack}>{t("תפריט","Menu")}</Button>Button>
                                    </div>div>
                          </div>div>
                  </div>div>
                );
    }
  
    const q = selectedStory.questions[currentQ];
    return (
          <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between items-center mb-4">
                                  <Button variant="ghost" size="sm" onClick={() => { setSelectedStory(null); reset(); }}>{t("סיפורים","Stories")}</Button>Button>
                                  <span className="text-sm text-gray-500">{t("שאלה","Q")} {currentQ + 1}/{selectedStory.questions.length} • {t("ניקוד:","Score:")} {score}</span>span>
                        </div>div>
                        <div className="bg-white rounded-2xl shadow p-6 mb-4">
                                  <div className="flex justify-between items-start mb-3">
                                              <span className={`text-xs px-2 py-1 rounded-full border font-medium ${levelStyle(selectedStory.level)}`}>{levelLabel(selectedStory.level)}</span>span>
                                              <h2 className="text-xl font-bold text-indigo-900">{selectedStory.titleHe}</h2>h2>
                                  </div>div>
                                  <div className="bg-indigo-50 rounded-xl p-4 text-indigo-900 leading-8 text-lg whitespace-pre-line mb-3">{selectedStory.text}</div>div>
                                  <div className="flex gap-2 flex-wrap">
                                              <Button variant="outline" size="sm" onClick={() => setShowTrans(v => !v)}>
                                                {showTrans ? t("הסתר תרגום","Hide Translation") : t("הצג תרגום","Show Translation")}
                                              </Button>Button>
                                              <Button variant="outline" size="sm" onClick={() => setShowVocab(v => !v)}>
                                                {showVocab ? t("הסתר מילים","Hide Vocab") : t("מילים חדשות","New Words")}
                                              </Button>Button>
                                  </div>div>
                          {showTrans && <div className="mt-3 bg-gray-50 rounded-xl p-4 text-gray-700 text-sm whitespace-pre-line" dir="ltr">{selectedStory.translation}</div>div>}
                          {showVocab && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {selectedStory.vocab.map((v, i) => (
                                          <div key={i} className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-sm flex justify-between">
                                                            <span className="text-gray-500 text-xs">{v.english}</span>span>
                                                            <span className="font-bold text-indigo-800">{v.hebrew}</span>span>
                                          </div>div>
                                        ))}
                        </div>div>
                                  )}
                        </div>div>
                        <div className="bg-white rounded-2xl shadow p-6">
                                  <p className="text-lg font-bold text-indigo-900 mb-1">{q.question}</p>p>
                                  <p className="text-sm text-gray-500 mb-4">{q.questionEn}</p>p>
                                  <div className="grid grid-cols-2 gap-3">
                                    {q.options.map(opt => {
                          let s = "border-2 border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300";
                          if (selected) {
                                            if (opt === q.answer) s = "border-2 border-green-500 bg-green-50";
                                            else if (opt === selected) s = "border-2 border-red-400 bg-red-50";
                                            else s = "border-2 border-gray-200 bg-gray-50 opacity-50";
                          }
                          return (
                                            <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!selected}
                                                                className={`rounded-xl p-3 text-right font-medium transition ${s}`}>{opt}</button>button>
                                          );
          })}
                                  </div>div>
                          {showResult && (
                        <div className="mt-4 text-center">
                                      <p className={`font-bold text-lg ${selected === q.answer ? "text-green-600" : "text-red-600"}`}>
                                        {selected === q.answer ? t("נכון!","Correct!") : `${t("תשובה נכונה:","Correct:")} ${q.answer}`}
                                      </p>p>
                                      <Button onClick={handleNext} className="mt-3 bg-indigo-600 hover:bg-indigo-700">
                                        {currentQ + 1 < selectedStory.questions.length ? t("שאלה הבאה","Next Question") : t("סיום","Finish")}
                                      </Button>Button>
                        </div>div>
                                  )}
                        </div>div>
                </div>div>
          </div>div>
        );
}</div>
