import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TreeDeciduous, Volume2, Lightbulb, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { speakHebrew } from "@/lib/speakHebrew";
import { commonRoots } from "@/data/hebrewFlow/binyanim";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

export default function RootsConcept() {
  const { lang, t } = useOutletContext<LayoutContext>() || { lang: "en", t: (en: string) => en };
  const [showNikud, setShowNikud] = useState(true);

  const speak = (text: string) => speakHebrew(text, 0.8);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TreeDeciduous className="h-7 w-7 text-primary" />
            {t("The Shoresh (Root)", "השורש")}
          </h1>
          <p className="text-muted-foreground">
            {t(
              "Understanding Hebrew roots is the key to unlocking vocabulary",
              "הבנת שורשים היא המפתח לפתיחת אוצר המילים העברי"
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="nikud" checked={showNikud} onCheckedChange={setShowNikud} />
          <Label htmlFor="nikud">{t("Niqqud", "ניקוד")}</Label>
        </div>
      </div>

      {/* Concept Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            {t("What is a Shoresh?", "מהו שורש?")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={lang === "he" ? "text-right" : ""}>
            {t(
              "In Hebrew, most words are built from a root (שורש - Shoresh) of 3 or 4 consonants. This root carries the core meaning, and different patterns (called Mishkalim for nouns and Binyanim for verbs) transform it into specific words.",
              "בעברית, רוב המילים בנויות משורש של 3 או 4 עיצורים. השורש נושא את המשמעות המרכזית, ודפוסים שונים (משקלים לשמות ובניינים לפעלים) הופכים אותו למילים ספציפיות."
            )}
          </p>
          
          <div className="p-4 rounded-lg bg-primary/5 border">
            <h4 className="font-semibold mb-2">
              {t("Example: Root כ-ת-ב (K-T-V) = 'write'", "דוגמה: שורש כ-ת-ב = 'כתיבה'")}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
              {[
                { word: "כָּתַב", meaning: "wrote (he)" },
                { word: "כּוֹתֵב", meaning: "writes (he)" },
                { word: "מִכְתָּב", meaning: "letter" },
                { word: "כְּתָב", meaning: "handwriting" },
              ].map((item) => (
                <div key={item.word} className="p-2 rounded bg-background text-center">
                  <p className="font-bold text-lg" dir="rtl">{item.word}</p>
                  <p className="text-xs text-muted-foreground">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Root Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {t("Common Roots", "שורשים נפוצים")}
          </CardTitle>
          <CardDescription>
            {t("Click on a root to see its various forms", "לחץ על שורש לראות את הצורות השונות שלו")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={commonRoots[0]?.letters}>
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
              {commonRoots.map((root) => (
                <TabsTrigger
                  key={root.letters}
                  value={root.letters}
                  className="border font-mono text-lg"
                  dir="rtl"
                >
                  {root.lettersSpaced}
                </TabsTrigger>
              ))}
            </TabsList>

            {commonRoots.map((root) => (
              <TabsContent key={root.letters} value={root.letters} className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <h3 className="text-2xl font-bold font-mono" dir="rtl">
                      {root.lettersSpaced}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("Core meaning:", "משמעות ליבה:")} {root.meaning} / {root.meaningHe}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {root.binyanForms.map((form) => (
                    <div
                      key={form.binyanId}
                      className="p-4 rounded-lg border bg-background"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge>{form.binyanId.toUpperCase()}</Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold" dir="rtl">
                            {showNikud ? form.infinitiveWithNikud : form.infinitive}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => speak(form.infinitive)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lang === "he" ? form.meaningHe : form.meaning}
                      </p>

                      {form.conjugations.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-xs text-muted-foreground mb-2">
                            {t("Present tense examples:", "דוגמאות בהווה:")}
                          </p>
                          <div className="flex flex-wrap gap-2" dir="rtl">
                            {form.conjugations
                              .find((c) => c.tense === "present")
                              ?.forms.slice(0, 4)
                              .map((f, i) => (
                                <Badge key={i} variant="outline" className="font-mono">
                                  {showNikud ? f.formWithNikud : f.form}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            {t("Learning Tips", "טיפים ללימוד")}
          </h3>
          <ul className={cn("space-y-2 text-sm", lang === "he" ? "text-right" : "")}>
            <li>• {t("Look for 3-letter patterns in new words", "חפש דפוסים של 3 אותיות במילים חדשות")}</li>
            <li>• {t("Connect words with the same root to build vocabulary", "חבר מילים עם אותו שורש לבניית אוצר מילים")}</li>
            <li>• {t("Remember that vowels change, but root consonants stay", "זכור שתנועות משתנות, אבל עיצורי השורש נשארים")}</li>
            <li>• {t("Practice identifying roots in everyday Hebrew", "תרגל זיהוי שורשים בעברית יומיומית")}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
