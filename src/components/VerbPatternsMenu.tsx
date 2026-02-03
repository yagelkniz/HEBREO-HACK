import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, BookOpen, Brain, Trophy } from "lucide-react";

interface VerbPatternsMenuProps {
  lang: "he" | "en";
  onBack: () => void;
  onSelectPattern: (pattern: string, level: string) => void;
}

interface PatternCardProps {
  nameHe: string;
  nameEn: string;
  descHe: string;
  descEn: string;
  exampleHe: string;
  exampleEn: string;
  emoji: string;
  colorClass: string;
  levels: { id: string; labelHe: string; labelEn: string; icon: React.ReactNode }[];
  lang: "he" | "en";
  onSelectLevel: (level: string) => void;
}

function PatternCard({
  nameHe,
  nameEn,
  descHe,
  descEn,
  exampleHe,
  exampleEn,
  emoji,
  colorClass,
  levels,
  lang,
  onSelectLevel,
}: PatternCardProps) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);

  return (
    <Card className={`${colorClass} border-2 shadow-lg hover:shadow-xl transition-shadow`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl" dir={lang === "he" ? "rtl" : "ltr"}>
          <span className="text-2xl">{emoji}</span>
          <span>{t(nameHe, nameEn)}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground" dir={lang === "he" ? "rtl" : "ltr"}>
          {t(descHe, descEn)}
        </p>
        <Badge variant="secondary" className="w-fit mt-1">
          {t(exampleHe, exampleEn)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <Button
              key={level.id}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 hover:scale-105 transition-transform"
              onClick={() => onSelectLevel(level.id)}
            >
              {level.icon}
              <span>{t(level.labelHe, level.labelEn)}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function VerbPatternsMenu({ lang, onBack, onSelectPattern }: VerbPatternsMenuProps) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);

  const levels = [
    { id: "learn", labelHe: "📖 לימוד", labelEn: "📖 Learn", icon: <BookOpen className="h-4 w-4" /> },
    { id: "easy", labelHe: "🟢 קל", labelEn: "🟢 Easy", icon: null },
    { id: "medium", labelHe: "🟡 בינוני", labelEn: "🟡 Medium", icon: null },
    { id: "hard", labelHe: "🔴 קשה", labelEn: "🔴 Hard", icon: null },
  ];

  const patterns = [
    {
      id: "paal",
      nameHe: "בניין פָּעַל",
      nameEn: "Pa'al Pattern",
      descHe: "הבניין הבסיסי ביותר - פעולות פשוטות",
      descEn: "The most basic pattern - simple actions",
      exampleHe: "לכתוב, לשמוע, ללמוד",
      exampleEn: "to write, to hear, to learn",
      emoji: "✍️",
      colorClass: "bg-blue-50 border-blue-200",
      available: true,
    },
    {
      id: "piel",
      nameHe: "בניין פִּעֵל",
      nameEn: "Pi'el Pattern",
      descHe: "פעולות אינטנסיביות ותקשורת",
      descEn: "Intensive actions and communication",
      exampleHe: "לדבר, לספר, לבקש",
      exampleEn: "to speak, to tell, to ask",
      emoji: "🗣️",
      colorClass: "bg-purple-50 border-purple-200",
      available: true,
    },
    {
      id: "hifil",
      nameHe: "בניין הִפְעִיל",
      nameEn: "Hif'il Pattern",
      descHe: "גרימה לפעולה - לגרום למישהו לעשות משהו",
      descEn: "Causative - making someone do something",
      exampleHe: "להלביש, להשמיע, להראות",
      exampleEn: "to dress someone, to play (music), to show",
      emoji: "👔",
      colorClass: "bg-amber-50 border-amber-200",
      available: true,
    },
    {
      id: "hitpael",
      nameHe: "בניין הִתְפַּעֵל",
      nameEn: "Hitpa'el Pattern",
      descHe: "פעולות רפלקסיביות - לעשות לעצמך",
      descEn: "Reflexive actions - doing to yourself",
      exampleHe: "להתלבש, להתרחץ, להתארגן",
      exampleEn: "to get dressed, to wash oneself, to get organized",
      emoji: "🪞",
      colorClass: "bg-teal-50 border-teal-200",
      available: false,
    },
    {
      id: "nifal",
      nameHe: "בניין נִפְעַל",
      nameEn: "Nif'al Pattern",
      descHe: "פעולות סבילות - קורה לך",
      descEn: "Passive actions - happens to you",
      exampleHe: "נשבר, נפתח, נסגר",
      exampleEn: "was broken, was opened, was closed",
      emoji: "🔓",
      colorClass: "bg-rose-50 border-rose-200",
      available: false,
    },
    {
      id: "hufal",
      nameHe: "בניין הֻפְעַל",
      nameEn: "Huf'al Pattern",
      descHe: "סביל של הפעיל",
      descEn: "Passive of Hif'il",
      exampleHe: "הולבש, הושמע, הוזמן",
      exampleEn: "was dressed, was played, was invited",
      emoji: "📦",
      colorClass: "bg-gray-50 border-gray-200",
      available: false,
    },
    {
      id: "pual",
      nameHe: "בניין פֻּעַל",
      nameEn: "Pu'al Pattern",
      descHe: "סביל של פיעל",
      descEn: "Passive of Pi'el",
      exampleHe: "סופר, בושל, תוקן",
      exampleEn: "was told, was cooked, was fixed",
      emoji: "📋",
      colorClass: "bg-indigo-50 border-indigo-200",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-1">
            {lang === "he" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {t("חזרה לתפריט", "Back to Menu")}
          </Button>
          <h1 className="text-2xl font-bold text-primary" dir={lang === "he" ? "rtl" : "ltr"}>
            {t("🔠 בניינים בעברית", "🔠 Hebrew Verb Patterns")}
          </h1>
        </div>

        {/* Intro */}
        <Card className="mb-6 bg-white/80">
          <CardContent className="pt-4">
            <p className="text-center text-muted-foreground" dir={lang === "he" ? "rtl" : "ltr"}>
              {t(
                "בחר בניין ורמת קושי. כל בניין כולל טבלת הטיות ותרגול אינטראקטיבי.",
                "Choose a pattern and difficulty level. Each pattern includes conjugation tables and interactive practice."
              )}
            </p>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-green-100 text-green-800">🟢</Badge>
            <span>{t("קל - הווה בלבד", "Easy - Present only")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">🟡</Badge>
            <span>{t("בינוני - עבר והווה", "Medium - Past & Present")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-red-100 text-red-800">🔴</Badge>
            <span>{t("קשה - כל הזמנים", "Hard - All tenses")}</span>
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patterns.map((pattern) => (
            <div key={pattern.id} className="relative">
              {!pattern.available && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {t("🔜 בקרוב", "🔜 Coming Soon")}
                  </Badge>
                </div>
              )}
              <PatternCard
                nameHe={pattern.nameHe}
                nameEn={pattern.nameEn}
                descHe={pattern.descHe}
                descEn={pattern.descEn}
                exampleHe={pattern.exampleHe}
                exampleEn={pattern.exampleEn}
                emoji={pattern.emoji}
                colorClass={pattern.colorClass}
                levels={levels}
                lang={lang}
                onSelectLevel={(level) => onSelectPattern(pattern.id, level)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
