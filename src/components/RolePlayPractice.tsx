import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw, ArrowLeft, MessageCircle, User, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { rolePlayScenarios, RolePlayScenario, RolePlayOption, GlossaryScreen } from "@/data/rolePlayData";

interface Props {
  onBack: () => void;
  lang?: "he" | "en";
}

export default function RolePlayPractice({ onBack, lang = "he" }: Props) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [scenarioScores, setScenarioScores] = useState<Record<string, number>>({});

  if (activeScenario === null) {
    return (
      <ScenarioSelect
        scenarios={rolePlayScenarios}
        scores={scenarioScores}
        onSelect={setActiveScenario}
        onBack={onBack}
        t={t}
        lang={lang}
      />
    );
  }

  return (
    <ScenarioPlay
      scenario={rolePlayScenarios[activeScenario]}
      lang={lang}
      t={t}
      onFinish={(score) => {
        setScenarioScores((prev) => ({
          ...prev,
          [rolePlayScenarios[activeScenario].scenarioId]: score,
        }));
        setActiveScenario(null);
      }}
      onBack={() => setActiveScenario(null)}
    />
  );
}

/* ─── Scenario Select ─── */
function ScenarioSelect({
  scenarios, scores, onSelect, onBack, t, lang,
}: {
  scenarios: RolePlayScenario[];
  scores: Record<string, number>;
  onSelect: (i: number) => void;
  onBack: () => void;
  t: (he: string, en: string) => string;
  lang: string;
}) {
  const icons = ["📱", "🍽️", "💼"];
  const colors = [
    "border-sky-300 bg-sky-50",
    "border-amber-300 bg-amber-50",
    "border-violet-300 bg-violet-50",
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack}>
          ⬅ {t("חזרה לתפריט הראשי", "Back to Main Menu")}
        </Button>

        <h1 className="text-2xl font-bold text-primary text-center">
          {t("🎭 סימולציית שיחה", "🎭 Conversation Role-Play")}
        </h1>
        <p className="text-center text-muted-foreground text-sm">
          {t(
            "בחרו תרחיש ותגיבו בצורה הכי טבעית וישראלית!",
            "Choose a scenario and respond as naturally as possible!"
          )}
        </p>

        <div className="space-y-4">
          {scenarios.map((scenario, i) => {
            const score = scores[scenario.scenarioId];
            return (
              <button
                key={scenario.scenarioId}
                onClick={() => onSelect(i)}
                className={cn(
                  "w-full p-5 rounded-xl border-2 text-right transition-all",
                  `${colors[i]} hover:scale-[1.02] cursor-pointer shadow-sm`
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {score !== undefined && (
                      <Badge variant={score >= 70 ? "default" : "secondary"}>
                        {score}%
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2 justify-end">
                      <span>{icons[i]}</span>
                      <span>{lang === "he" ? scenario.title : scenario.titleEn}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      🎯 {lang === "he" ? scenario.goal : scenario.goalEn}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      🎭 {lang === "he" ? scenario.characterTone : scenario.characterToneEn} • {scenario.steps.length} {t("שלבים", "steps")}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Scenario Play ─── */
function ScenarioPlay({
  scenario, lang, t, onFinish, onBack,
}: {
  scenario: RolePlayScenario;
  lang: string;
  t: (he: string, en: string) => string;
  onFinish: (score: number) => void;
  onBack: () => void;
}) {
  const [showGlossary, setShowGlossary] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<RolePlayOption | null>(null);
  const [totalNaturalness, setTotalNaturalness] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [choices, setChoices] = useState<{ step: string; option: RolePlayOption }[]>([]);

  const step = scenario.steps[stepIndex];
  const progress = ((stepIndex + 1) / scenario.steps.length) * 100;

  const handleSelect = (option: RolePlayOption) => {
    if (selected) return;
    setSelected(option);
    setTotalNaturalness((prev) => prev + option.naturalness);
    setChoices((prev) => [...prev, { step: step.id, option }]);
  };

  const handleNext = () => {
    if (stepIndex < scenario.steps.length - 1) {
      setStepIndex((i) => i + 1);
      setSelected(null);
    } else {
      setIsComplete(true);
    }
  };

  const getNaturalnessColor = (n: number) => {
    if (n >= 80) return "text-green-700 bg-green-50 border-green-200";
    if (n >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-red-700 bg-red-50 border-red-200";
  };

  const getNaturalnessLabel = (n: number) => {
    if (n >= 80) return t("טבעי מאוד 🔥", "Very Natural 🔥");
    if (n >= 50) return t("סביר 🤔", "Decent 🤔");
    return t("לא טבעי ❌", "Unnatural ❌");
  };

  if (showGlossary) {
    return (
      <GlossaryView
        glossary={scenario.glossaryScreen}
        scenarioTitle={lang === "he" ? scenario.title : scenario.titleEn}
        lang={lang}
        t={t}
        onStart={() => setShowGlossary(false)}
        onBack={onBack}
      />
    );
  }

  if (isComplete) {
    const avgScore = Math.round(totalNaturalness / scenario.steps.length);
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {t("סיום תרחיש!", "Scenario Complete!")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-5xl font-bold text-primary">{avgScore}%</div>
            <p className="text-muted-foreground">
              {t("ציון טבעיות ממוצע", "Average naturalness score")}
            </p>
            <Progress value={avgScore} className="h-3" />

            {/* Summary of choices */}
            <div className="space-y-2 text-right">
              {choices.map((c, i) => (
                <div key={i} className={cn("p-2 rounded border text-sm", getNaturalnessColor(c.option.naturalness))}>
                  <span className="font-medium">{c.option.text}</span>
                  <span className="mr-2 text-xs">({c.option.naturalness}%)</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStepIndex(0);
                  setSelected(null);
                  setTotalNaturalness(0);
                  setIsComplete(false);
                  setChoices([]);
                }}
              >
                <RotateCcw className="h-4 w-4 ml-2" />
                {t("נסה שוב", "Try Again")}
              </Button>
              <Button onClick={() => onFinish(avgScore)}>
                {t("חזרה לתרחישים", "Back to Scenarios")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">
            {lang === "he" ? scenario.title : scenario.titleEn}
          </Badge>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-2" />
          <Badge variant="secondary">
            {stepIndex + 1} / {scenario.steps.length}
          </Badge>
        </div>

        {/* Goal reminder */}
        <div className="text-center text-sm text-muted-foreground">
          🎯 {lang === "he" ? scenario.goal : scenario.goalEn}
        </div>

        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* NPC message bubble */}
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tr-none p-4 text-base font-medium whitespace-pre-line flex-1">
                {step.npcLine}
              </div>
            </div>

            {/* Player options */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                {t("מה תגיד/י?", "What would you say?")}
              </p>
              {step.options.map((option, idx) => {
                const isThis = selected === option;
                const isBest = selected && option.naturalness >= Math.max(...step.options.map(o => o.naturalness));

                let extraClass = "text-base py-4 font-medium text-right justify-start w-full";

                if (selected) {
                  if (isBest) {
                    extraClass += " bg-green-100 border-green-400 text-green-800";
                  } else if (isThis && !isBest) {
                    const color = option.naturalness >= 50 ? " bg-amber-100 border-amber-400 text-amber-800" : " bg-red-100 border-red-400 text-red-800";
                    extraClass += color;
                  } else {
                    extraClass += " opacity-40";
                  }
                } else {
                  extraClass += " hover:bg-primary/10 hover:border-primary";
                }

                return (
                  <Button
                    key={idx}
                    variant="outline"
                    className={extraClass}
                    onClick={() => handleSelect(option)}
                    disabled={!!selected}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1">{option.text}</span>
                      {selected && (
                        <Badge variant="outline" className={cn("text-xs shrink-0", getNaturalnessColor(option.naturalness))}>
                          {option.naturalness}%
                        </Badge>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Feedback */}
            {selected && (
              <div className="space-y-3">
                <div className={cn("p-4 rounded-lg border text-center", getNaturalnessColor(selected.naturalness))}>
                  <div className="font-bold text-lg mb-1">
                    {getNaturalnessLabel(selected.naturalness)}
                  </div>
                  <p className="text-sm">{selected.feedback}</p>
                </div>
                <Button className="w-full" onClick={handleNext}>
                  {stepIndex < scenario.steps.length - 1
                    ? t("המשך שיחה", "Continue Conversation")
                    : t("ראה תוצאות", "See Results")}
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ─── Glossary View ─── */
function GlossaryView({
  glossary, scenarioTitle, lang, t, onStart, onBack,
}: {
  glossary: GlossaryScreen;
  scenarioTitle: string;
  lang: string;
  t: (he: string, en: string) => string;
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            ⬅ {t("חזרה", "Back")}
          </Button>
          <Badge variant="outline">{scenarioTitle}</Badge>
        </div>

        <Card>
          <CardHeader className="text-center pb-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-xl">
              {lang === "he" ? glossary.titleHe : glossary.titleEn}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("כדאי לקרוא לפני שמתחילים 👇", "Read before you start 👇")}
            </p>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto">
            {glossary.items.map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-baseline gap-2 justify-between">
                  <span className="font-bold text-base text-primary">{item.termHe}</span>
                  <span className="text-xs text-muted-foreground">{item.termEn}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1" dir="ltr">
                  {item.meaningEn}
                </p>
                <div className="mt-2 text-sm bg-muted/50 rounded p-2">
                  <p className="font-medium">{item.exampleHe}</p>
                  <p className="text-muted-foreground text-xs mt-0.5" dir="ltr">{item.exampleEn}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button className="w-full text-lg py-6 font-bold" onClick={onStart}>
          {lang === "he" ? glossary.ctaHe : glossary.ctaEn}
          <ArrowLeft className="h-5 w-5 mr-2" />
        </Button>
      </div>
    </div>
  );
}
