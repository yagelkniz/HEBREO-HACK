import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, Volume2, Sparkles, RotateCcw } from "lucide-react";
import {
  generateConjugation,
  parseRoot,
  BINYAN_META,
  PRONOUNS_HE,
  PRONOUNS_EN,
  PRESENT_LABELS_HE,
  PRESENT_LABELS_EN,
  type Binyan,
  type ConjugationSet,
} from "@/lib/conjugationGenerator";
import { speakHebrew } from "@/lib/speakHebrew";

interface Props {
  lang: "he" | "en";
  onBack: () => void;
}

const PRESETS: { rootInput: string; binyan: Binyan; labelHe: string; labelEn: string }[] = [
  { rootInput: "כ-ת-ב", binyan: "paal", labelHe: "לכתוב (פעל)", labelEn: "to write (Pa'al)" },
  { rootInput: "ל-מ-ד", binyan: "paal", labelHe: "ללמוד (פעל)", labelEn: "to learn (Pa'al)" },
  { rootInput: "ד-ב-ר", binyan: "piel", labelHe: "לדבר (פיעל)", labelEn: "to speak (Pi'el)" },
  { rootInput: "ל-ב-ש", binyan: "hifil", labelHe: "להלביש (הפעיל)", labelEn: "to dress someone (Hif'il)" },
  { rootInput: "ל-ב-ש", binyan: "hitpael", labelHe: "להתלבש (התפעל)", labelEn: "to get dressed (Hitpa'el)" },
  { rootInput: "פ-ת-ח", binyan: "nifal", labelHe: "להיפתח (נפעל)", labelEn: "to be opened (Nif'al)" },
  { rootInput: "ל-ב-ש", binyan: "hufal", labelHe: "הולבש (הופעל)", labelEn: "was dressed (Huf'al)" },
  { rootInput: "ס-פ-ר", binyan: "pual", labelHe: "סופר (פועל)", labelEn: "was told (Pu'al)" },
];

const BINYAN_OPTIONS: Binyan[] = ["paal", "piel", "hifil", "hitpael", "nifal", "hufal", "pual"];

export default function ConjugationGenerator({ lang, onBack }: Props) {
  const isHe = lang === "he";
  const t = (he: string, en: string) => (isHe ? he : en);

  const [rootInput, setRootInput] = useState("כ-ת-ב");
  const [binyan, setBinyan] = useState<Binyan>("paal");
  const [conjugation, setConjugation] = useState<ConjugationSet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shownRoot, setShownRoot] = useState<string[] | null>(null);
  const [shownBinyan, setShownBinyan] = useState<Binyan | null>(null);

  function handleGenerate(rootOverride?: string, binyanOverride?: Binyan) {
    const inp = rootOverride ?? rootInput;
    const b = binyanOverride ?? binyan;
    const root = parseRoot(inp);
    if (!root) {
      setError(t("יש להזין שורש בן 3 אותיות עבריות", "Please enter a 3-letter Hebrew root"));
      setConjugation(null);
      return;
    }
    setError(null);
    setConjugation(generateConjugation(root, b));
    setShownRoot(root);
    setShownBinyan(b);
  }

  function handlePreset(p: typeof PRESETS[number]) {
    setRootInput(p.rootInput);
    setBinyan(p.binyan);
    handleGenerate(p.rootInput, p.binyan);
  }

  function handleReset() {
    setConjugation(null);
    setShownRoot(null);
    setShownBinyan(null);
    setError(null);
  }

  const tenseLabels = useMemo(
    () => [
      { key: "past" as const, he: "עבר", en: "Past", emoji: "⏪" },
      { key: "present" as const, he: "הווה", en: "Present", emoji: "▶️" },
      { key: "future" as const, he: "עתיד", en: "Future", emoji: "⏩" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir={isHe ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sticky top-0 z-20 bg-background/80 backdrop-blur rounded-xl p-3 border shadow-sm">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-1 min-h-[48px]">
            {isHe ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {t("חזרה לתפריט", "Back to Menu")}
          </Button>
          <h1 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {t("מחולל הטיות פעלים", "Verb Conjugation Generator")}
          </h1>
          <Button variant="outline" onClick={handleReset} className="min-h-[48px]" title={t("איפוס", "Reset")}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Intro */}
        <Card className="mb-4 bg-white/80">
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              {t(
                "הזן/י שורש בן 3 אותיות (למשל כ-ת-ב) ובחר/י בניין. נייצר טבלת הטיות לעבר, הווה ועתיד. שים/י לב: המחולל מתאים לשורשים שלמים — שורשים עם אותיות גרוניות (א/ה/ח/ע) או נחים עשויים לחרוג מהדפוס.",
                "Enter a 3-letter root (e.g. כ-ת-ב) and pick a binyan. We'll generate past, present, and future. Note: works best for regular (shlema) roots — guttural or weak roots may differ."
              )}
            </p>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{t("בחירת שורש ובניין", "Root & Binyan")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-3">
              <div className="md:col-span-1">
                <label className="text-sm font-semibold mb-1 block">{t("שורש", "Root")}</label>
                <Input
                  dir="rtl"
                  value={rootInput}
                  onChange={(e) => setRootInput(e.target.value)}
                  placeholder="כ-ת-ב"
                  className="text-2xl font-bold text-center min-h-[48px]"
                  style={{ fontFamily: "Rubik, Heebo, sans-serif" }}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold mb-1 block">{t("בניין", "Binyan")}</label>
                <div className="flex flex-wrap gap-2">
                  {BINYAN_OPTIONS.map((b) => (
                    <Button
                      key={b}
                      variant={binyan === b ? "default" : "outline"}
                      size="sm"
                      className="min-h-[44px]"
                      onClick={() => setBinyan(b)}
                    >
                      {BINYAN_META[b].he} {!isHe && `(${BINYAN_META[b].en})`}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button onClick={() => handleGenerate()} size="lg" className="w-full min-h-[52px] text-lg">
              📊 {t("הצג טבלה", "Show Table")}
            </Button>

            {error && (
              <div className="text-destructive text-sm font-semibold">{error}</div>
            )}

            <div>
              <p className="text-xs text-muted-foreground mb-2">{t("דוגמאות מהירות:", "Quick examples:")}</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePreset(p)}
                    className="text-xs"
                  >
                    {t(p.labelHe, p.labelEn)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        {conjugation && shownRoot && shownBinyan && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 flex-wrap">
                <span>{t("טבלת הטיות:", "Conjugation:")}</span>
                <Badge variant="default" className="text-base">{shownRoot.join("-")}</Badge>
                <Badge variant="secondary" className="text-base">{BINYAN_META[shownBinyan].he}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {tenseLabels.map((tense) => {
                  const forms = conjugation[tense.key];
                  const labels = tense.key === "present"
                    ? (isHe ? PRESENT_LABELS_HE : PRESENT_LABELS_EN)
                    : (isHe ? PRONOUNS_HE : PRONOUNS_EN);
                  return (
                    <div key={tense.key} className="border rounded-xl overflow-hidden">
                      <div className="bg-primary/10 p-3 font-bold text-center text-lg">
                        {tense.emoji} {t(tense.he, tense.en)}
                      </div>
                      <div className="divide-y">
                        {forms.map((form, idx) => (
                          <button
                            key={idx}
                            onClick={() => speakHebrew(form)}
                            className="w-full flex items-center justify-between gap-2 p-2 hover:bg-accent transition-colors text-right"
                            dir="rtl"
                          >
                            <Volume2 className="h-4 w-4 text-muted-foreground shrink-0" />
                            <div className="flex-1 flex items-center justify-between gap-3">
                              <span className="text-xs text-muted-foreground" dir={isHe ? "rtl" : "ltr"}>
                                {labels[idx]}
                              </span>
                              <span
                                className="text-lg font-semibold"
                                style={{ fontFamily: "Rubik, Heebo, sans-serif", lineHeight: 1.6 }}
                              >
                                {form}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                {t(
                  "💡 לחיצה על כל צורה משמיעה את הפועל בעברית.",
                  "💡 Click any form to hear it in Hebrew."
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
