import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, X, Sparkles, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  coreVerbs,
  infinitiveVerbs,
  nouns,
  adjectives,
  sentenceBuilderVerbs,
  sentenceBuilderObjects,
  practiceQuestions,
} from "@/data/beginnerHebrewData";

interface Props {
  onBack: () => void;
}

export default function BeginnerHebrewPractice({ onBack }: Props) {
  const [showNikud, setShowNikud] = useState(true);
  const [showEn, setShowEn] = useState(false);
  const [selectedInfinitive, setSelectedInfinitive] = useState<number | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<number | null>(null);
  const [selectedObject, setSelectedObject] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const w = (text: string, nikud: string) => (showNikud ? nikud : text);

  const handleAnswer = (qId: string, optIndex: number) => {
    if (checked[qId]) return;
    setAnswers((a) => ({ ...a, [qId]: optIndex }));
  };

  const checkAnswer = (qId: string) => {
    setChecked((c) => ({ ...c, [qId]: true }));
  };

  const builtSentence = () => {
    if (selectedVerb === null || selectedObject === null) return null;
    const verb = sentenceBuilderVerbs[selectedVerb];
    const obj = sentenceBuilderObjects[selectedObject];
    return {
      text: `אני ${verb.text} ${obj.text}`,
      textNikud: `אֲנִי ${verb.textNikud} ${obj.textNikud}`,
      en: `I ${verb.en} ${obj.en}`,
    };
  };

  const sentence = builtSentence();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* Top bar */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            <ArrowRight className="h-4 w-4 ml-1 rotate-180" />
            חזרה
          </Button>
          <div className="flex gap-2">
            <Button
              variant={showNikud ? "default" : "outline"}
              size="sm"
              onClick={() => setShowNikud(!showNikud)}
              className="rounded-full px-4"
            >
              {showNikud ? "הסתר ניקוד" : "הצג ניקוד"}
            </Button>
            <Button
              variant={showEn ? "default" : "outline"}
              size="sm"
              onClick={() => setShowEn(!showEn)}
              className="rounded-full px-4"
            >
              <Globe className="h-4 w-4 ml-1" />
              EN
            </Button>
          </div>
        </div>

        {/* 1. Header */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            עברית למתחילים
          </h1>
          <p className="text-lg text-muted-foreground">
            לומדים מילים ומשפטים קלים שלב אחר שלב
          </p>
          {showEn && (
            <p className="text-sm text-muted-foreground" dir="ltr">
              Learning words and simple sentences step by step
            </p>
          )}
        </header>

        {/* 2. Core Verbs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            פעלים חשובים להתחלה
            {showEn && <span className="text-sm font-normal text-muted-foreground mr-2" dir="ltr"> — Important starter verbs</span>}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreVerbs.map((verb, i) => (
              <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {w(verb.word, verb.wordNikud)}
                    </span>
                    {showEn && (
                      <span className="text-sm text-muted-foreground" dir="ltr">({verb.wordEn})</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{verb.meaning}</p>
                  {showEn && (
                    <p className="text-xs text-muted-foreground" dir="ltr">{verb.meaningEn}</p>
                  )}
                  <div className="space-y-1.5 pt-2 border-t border-border">
                    {verb.examples.map((ex, j) => (
                      <div key={j}>
                        <p className="text-base text-foreground leading-relaxed">
                          {w(ex.text, ex.textNikud)}
                        </p>
                        {showEn && (
                          <p className="text-xs text-muted-foreground" dir="ltr">{ex.en}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 3. Infinitives */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            שמות פועל קלים
            {showEn && <span className="text-sm font-normal text-muted-foreground mr-2" dir="ltr"> — Easy infinitives</span>}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {infinitiveVerbs.map((inf, i) => (
              <button
                key={i}
                onClick={() => setSelectedInfinitive(selectedInfinitive === i ? null : i)}
                className={cn(
                  "px-5 py-3 rounded-xl text-lg font-semibold border-2 transition-all flex flex-col items-center gap-0.5",
                  selectedInfinitive === i
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                    : "bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow"
                )}
              >
                <span>{w(inf.word, inf.wordNikud)}</span>
                {showEn && (
                  <span className={cn("text-xs", selectedInfinitive === i ? "text-primary-foreground/70" : "text-muted-foreground")} dir="ltr">
                    {inf.wordEn}
                  </span>
                )}
              </button>
            ))}
          </div>
          {selectedInfinitive !== null && (
            <div className="text-center p-4 bg-accent rounded-xl animate-in fade-in-50 duration-300 space-y-1">
              <p className="text-xl text-accent-foreground font-medium">
                {w(
                  infinitiveVerbs[selectedInfinitive].exampleSentence,
                  infinitiveVerbs[selectedInfinitive].exampleSentenceNikud
                )}
              </p>
              {showEn && (
                <p className="text-sm text-muted-foreground" dir="ltr">
                  {infinitiveVerbs[selectedInfinitive].exampleSentenceEn}
                </p>
              )}
            </div>
          )}
        </section>

        {/* 4. Nouns & Adjectives */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            שמות עצם ותארים
            {showEn && <span className="text-sm font-normal text-muted-foreground mr-2" dir="ltr"> — Nouns & Adjectives</span>}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-muted-foreground">שמות עצם {showEn && <span className="text-xs" dir="ltr">(Nouns)</span>}</h3>
              <div className="flex flex-wrap gap-2">
                {nouns.map((n, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-base px-4 py-2 rounded-lg font-medium flex flex-col items-center gap-0.5"
                  >
                    <span>{w(n.word, n.wordNikud)}</span>
                    {showEn && <span className="text-[10px] text-muted-foreground font-normal" dir="ltr">{n.en}</span>}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-muted-foreground">תארים {showEn && <span className="text-xs" dir="ltr">(Adjectives)</span>}</h3>
              <div className="flex flex-wrap gap-2">
                {adjectives.map((a, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-base px-4 py-2 rounded-lg font-medium flex flex-col items-center gap-0.5"
                  >
                    <span>{w(a.word, a.wordNikud)}</span>
                    {showEn && <span className="text-[10px] text-muted-foreground font-normal" dir="ltr">{a.en}</span>}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Sentence Builder */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            בונים משפט
            {showEn && <span className="text-sm font-normal text-muted-foreground mr-2" dir="ltr"> — Build a sentence</span>}
          </h2>

          <Card className="border-border">
            <CardContent className="p-6 space-y-5">
              {/* Subject */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">נושא: {showEn && <span dir="ltr">(Subject)</span>}</p>
                <Badge className="text-lg px-5 py-2 rounded-lg bg-primary text-primary-foreground">
                  {w("אני", "אֲנִי")} {showEn && <span className="text-xs opacity-70 mr-1" dir="ltr">(I)</span>}
                </Badge>
              </div>

              {/* Verb */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">פועל: {showEn && <span dir="ltr">(Verb)</span>}</p>
                <div className="flex flex-wrap gap-2">
                  {sentenceBuilderVerbs.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVerb(selectedVerb === i ? null : i)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-base font-semibold border-2 transition-all flex flex-col items-center gap-0.5",
                        selectedVerb === i
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-card-foreground border-border hover:border-primary/40"
                      )}
                    >
                      <span>{w(v.text, v.textNikud)}</span>
                      {showEn && (
                        <span className={cn("text-[10px]", selectedVerb === i ? "text-primary-foreground/70" : "text-muted-foreground")} dir="ltr">{v.en}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Object */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">השלמה: {showEn && <span dir="ltr">(Complement)</span>}</p>
                <div className="flex flex-wrap gap-2">
                  {sentenceBuilderObjects.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedObject(selectedObject === i ? null : i)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all flex flex-col items-center gap-0.5",
                        selectedObject === i
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-card-foreground border-border hover:border-primary/40"
                      )}
                    >
                      <span>{w(o.text, o.textNikud)}</span>
                      {showEn && (
                        <span className={cn("text-[10px]", selectedObject === i ? "text-primary-foreground/70" : "text-muted-foreground")} dir="ltr">{o.en}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              {sentence && (
                <div className="mt-4 p-5 bg-accent rounded-xl text-center animate-in fade-in-50 duration-300 space-y-1">
                  <Sparkles className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-accent-foreground">
                    {w(sentence.text, sentence.textNikud)}
                  </p>
                  {showEn && (
                    <p className="text-sm text-muted-foreground" dir="ltr">{sentence.en}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* 6. Practice */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            תרגול קצר
            {showEn && <span className="text-sm font-normal text-muted-foreground mr-2" dir="ltr"> — Quick practice</span>}
          </h2>
          <div className="space-y-4">
            {practiceQuestions.map((q) => {
              const answered = answers[q.id] !== undefined;
              const isChecked = checked[q.id];
              const isCorrect = answers[q.id] === q.correctIndex;

              return (
                <Card key={q.id} className="border-border">
                  <CardContent className="p-5 space-y-3">
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      {w(q.question, q.questionNikud)}
                    </p>
                    {showEn && (
                      <p className="text-sm text-muted-foreground" dir="ltr">{q.questionEn}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt, oi) => {
                        const isSelected = answers[q.id] === oi;
                        const showCorrect = isChecked && oi === q.correctIndex;
                        const showWrong = isChecked && isSelected && !isCorrect;

                        return (
                          <button
                            key={oi}
                            onClick={() => handleAnswer(q.id, oi)}
                            disabled={isChecked}
                            className={cn(
                              "px-4 py-2 rounded-lg text-base font-medium border-2 transition-all flex flex-col items-center gap-0.5",
                              showCorrect
                                ? "bg-green-100 border-green-500 text-green-800"
                                : showWrong
                                ? "bg-destructive/10 border-destructive text-destructive"
                                : isSelected
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card text-card-foreground border-border hover:border-primary/40",
                              isChecked && "cursor-default"
                            )}
                          >
                            <span>{w(opt.text, opt.textNikud)}</span>
                            {showEn && (
                              <span className={cn(
                                "text-[10px]",
                                showCorrect ? "text-green-600" : showWrong ? "text-destructive" : isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                              )} dir="ltr">{opt.en}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {answered && !isChecked && (
                      <Button size="sm" onClick={() => checkAnswer(q.id)}>
                        בדיקה
                      </Button>
                    )}
                    {isChecked && (
                      <div className={cn(
                        "flex items-center gap-2 text-sm font-medium pt-1",
                        isCorrect ? "text-green-700" : "text-destructive"
                      )}>
                        {isCorrect ? (
                          <><Check className="h-4 w-4" /> {showEn ? "Well done! Correct!" : "כל הכבוד! נכון מאוד!"}</>
                        ) : (
                          <><X className="h-4 w-4" /> {showEn ? "Try again — correct answer is marked" : "נסו שוב – התשובה הנכונה מסומנת"}</>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Footer spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
