import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { shuffleArray } from "@/lib/shuffleArray";
import { speakHebrew } from "@/lib/speakHebrew";
import { Volume2 } from "lucide-react";

interface Props { onBack: () => void; lang: "he" | "en"; }

type Verb = {
  inf: string;
  infEn: string;
  meaning: string;
  emoji: string;
  forms: { pronoun: string; verb: string; example: string; exampleEn: string }[];
};

const verbs: Verb[] = [
  {
    inf: "לרצות", infEn: "to want", meaning: "Want", emoji: "💭",
    forms: [
      { pronoun: "אני", verb: "רוצה", example: "אני רוצה קפה.", exampleEn: "I want coffee." },
      { pronoun: "אתה", verb: "רוצה", example: "אתה רוצה לאכול?", exampleEn: "Do you (m) want to eat?" },
      { pronoun: "את", verb: "רוצה", example: "את רוצה ללכת איתי?", exampleEn: "Do you (f) want to come with me?" },
      { pronoun: "הוא", verb: "רוצה", example: "הוא רוצה לישון.", exampleEn: "He wants to sleep." },
      { pronoun: "היא", verb: "רוצה", example: "היא רוצה לטייל.", exampleEn: "She wants to travel." },
      { pronoun: "אנחנו", verb: "רוצים", example: "אנחנו רוצים לנוח.", exampleEn: "We want to rest." },
      { pronoun: "אתם", verb: "רוצים", example: "אתם רוצים פיצה?", exampleEn: "Do you (pl) want pizza?" },
      { pronoun: "הם", verb: "רוצים", example: "הם רוצים לראות סרט.", exampleEn: "They want to watch a movie." },
    ],
  },
  {
    inf: "להיות צריך", infEn: "to need", meaning: "Need", emoji: "✅",
    forms: [
      { pronoun: "אני", verb: "צריך / צריכה", example: "אני צריך לעבוד.", exampleEn: "I need to work." },
      { pronoun: "אתה", verb: "צריך", example: "אתה צריך עזרה?", exampleEn: "Do you (m) need help?" },
      { pronoun: "את", verb: "צריכה", example: "את צריכה לישון.", exampleEn: "You (f) need to sleep." },
      { pronoun: "הוא", verb: "צריך", example: "הוא צריך כסף.", exampleEn: "He needs money." },
      { pronoun: "היא", verb: "צריכה", example: "היא צריכה ללכת.", exampleEn: "She needs to go." },
      { pronoun: "אנחנו", verb: "צריכים", example: "אנחנו צריכים זמן.", exampleEn: "We need time." },
      { pronoun: "אתם", verb: "צריכים", example: "אתם צריכים מפתח?", exampleEn: "Do you (pl) need a key?" },
      { pronoun: "הם", verb: "צריכים", example: "הם צריכים לנוח.", exampleEn: "They need to rest." },
    ],
  },
  {
    inf: "יכול", infEn: "can / be able to", meaning: "Can", emoji: "💪",
    forms: [
      { pronoun: "אני", verb: "יכול / יכולה", example: "אני יכול לעזור.", exampleEn: "I can help." },
      { pronoun: "אתה", verb: "יכול", example: "אתה יכול לבוא?", exampleEn: "Can you (m) come?" },
      { pronoun: "את", verb: "יכולה", example: "את יכולה לדבר?", exampleEn: "Can you (f) talk?" },
      { pronoun: "הוא", verb: "יכול", example: "הוא יכול לנהוג.", exampleEn: "He can drive." },
      { pronoun: "היא", verb: "יכולה", example: "היא יכולה לשיר.", exampleEn: "She can sing." },
      { pronoun: "אנחנו", verb: "יכולים", example: "אנחנו יכולים לחכות.", exampleEn: "We can wait." },
      { pronoun: "אתם", verb: "יכולים", example: "אתם יכולים לשבת.", exampleEn: "You (pl) can sit." },
      { pronoun: "הם", verb: "יכולים", example: "הם יכולים לשחק.", exampleEn: "They can play." },
    ],
  },
  {
    inf: "לאהוב", infEn: "to love / like", meaning: "Love / Like", emoji: "❤️",
    forms: [
      { pronoun: "אני", verb: "אוהב / אוהבת", example: "אני אוהב מוזיקה.", exampleEn: "I love music." },
      { pronoun: "אתה", verb: "אוהב", example: "אתה אוהב כדורגל?", exampleEn: "Do you (m) like football?" },
      { pronoun: "את", verb: "אוהבת", example: "את אוהבת לרקוד.", exampleEn: "You (f) love to dance." },
      { pronoun: "הוא", verb: "אוהב", example: "הוא אוהב חתולים.", exampleEn: "He loves cats." },
      { pronoun: "היא", verb: "אוהבת", example: "היא אוהבת לקרוא.", exampleEn: "She loves to read." },
      { pronoun: "אנחנו", verb: "אוהבים", example: "אנחנו אוהבים לטייל.", exampleEn: "We love to travel." },
      { pronoun: "אתם", verb: "אוהבים", example: "אתם אוהבים חומוס?", exampleEn: "Do you (pl) like hummus?" },
      { pronoun: "הם", verb: "אוהבים", example: "הם אוהבים את הים.", exampleEn: "They love the sea." },
    ],
  },
];

type QQ = { sentence: string; options: string[]; answer: string; en: string; explain: string };

const quizQuestions: QQ[] = [
  { sentence: "אני ___ קפה בבוקר.", options: ["רוצה", "רוצים", "רוצות"], answer: "רוצה", en: "I ___ coffee in the morning.", explain: "אני (יחיד) → רוצה" },
  { sentence: "היא ___ ללכת הביתה.", options: ["צריך", "צריכה", "צריכים"], answer: "צריכה", en: "She ___ to go home.", explain: "היא (נקבה יחיד) → צריכה" },
  { sentence: "אנחנו ___ לעזור לך.", options: ["יכול", "יכולה", "יכולים"], answer: "יכולים", en: "We ___ help you.", explain: "אנחנו (רבים) → יכולים" },
  { sentence: "את ___ שוקולד?", options: ["אוהב", "אוהבת", "אוהבים"], answer: "אוהבת", en: "Do you (f) like chocolate?", explain: "את (נקבה יחיד) → אוהבת" },
  { sentence: "הוא ___ לישון מוקדם.", options: ["רוצה", "רוצים", "רוצות"], answer: "רוצה", en: "He ___ to sleep early.", explain: "הוא (יחיד) → רוצה" },
  { sentence: "הם ___ ללמוד עברית.", options: ["צריך", "צריכה", "צריכים"], answer: "צריכים", en: "They ___ to learn Hebrew.", explain: "הם (רבים) → צריכים" },
  { sentence: "אתה ___ לבוא איתי?", options: ["יכול", "יכולה", "יכולים"], answer: "יכול", en: "Can you (m) come with me?", explain: "אתה (זכר יחיד) → יכול" },
  { sentence: "אתם ___ פיצה?", options: ["אוהב", "אוהבת", "אוהבים"], answer: "אוהבים", en: "Do you (pl) like pizza?", explain: "אתם (רבים) → אוהבים" },
  { sentence: "היא ___ לטייל בעולם.", options: ["רוצה", "רוצים", "רוצות"], answer: "רוצה", en: "She ___ to travel the world.", explain: "היא → רוצה" },
  { sentence: "אנחנו ___ מים.", options: ["צריך", "צריכה", "צריכים"], answer: "צריכים", en: "We ___ water.", explain: "אנחנו → צריכים" },
  { sentence: "את ___ לנהוג?", options: ["יכול", "יכולה", "יכולים"], answer: "יכולה", en: "Can you (f) drive?", explain: "את → יכולה" },
  { sentence: "הוא ___ את הכלב שלו.", options: ["אוהב", "אוהבת", "אוהבים"], answer: "אוהב", en: "He loves his dog.", explain: "הוא → אוהב" },
];

export default function ModalVerbsPractice({ onBack, lang }: Props) {
  const [phase, setPhase] = useState<"learn" | "quiz">("learn");
  const [activeVerb, setActiveVerb] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  const questions = useMemo(
    () => shuffleArray(quizQuestions).map(q => ({ ...q, options: shuffleArray(q.options) })),
    []
  );

  if (phase === "learn") {
    const v = verbs[activeVerb];
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה לתפריט", "Back to Menu")}</Button>
          <h1 className="text-2xl font-bold text-primary mb-2">
            🎯 {t("פעלים מודאליים", "Modal Verbs")}: רוצה · צריך · יכול · אוהב
          </h1>
          <p className="text-muted-foreground mb-4">
            {t("הטיות לפי שמות הגוף עם דוגמאות", "Conjugations by pronoun with examples")}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {verbs.map((vv, i) => (
              <Button
                key={vv.inf}
                variant={i === activeVerb ? "default" : "outline"}
                onClick={() => setActiveVerb(i)}
                className="text-base"
              >
                {vv.emoji} {vv.inf} ({vv.infEn})
              </Button>
            ))}
          </div>

          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-3">
                {v.emoji} {v.inf} — {v.infEn}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-2 border">{t("שם גוף", "Pronoun")}</th>
                      <th className="p-2 border">{t("צורה", "Form")}</th>
                      <th className="p-2 border">{t("דוגמה", "Example")}</th>
                      <th className="p-2 border">{t("תרגום", "Translation")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {v.forms.map(f => (
                      <tr key={f.pronoun} className="hover:bg-muted/40">
                        <td className="p-2 border font-bold text-primary">{f.pronoun}</td>
                        <td className="p-2 border font-semibold">{f.verb}</td>
                        <td className="p-2 border">
                          <button
                            onClick={() => speakHebrew(f.example)}
                            className="inline-flex items-center gap-1 hover:text-primary"
                          >
                            <Volume2 className="w-4 h-4 opacity-60" />
                            {f.example}
                          </button>
                        </td>
                        <td className="p-2 border text-sm text-muted-foreground" dir="ltr">{f.exampleEn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Button onClick={() => setPhase("quiz")} className="w-full text-lg py-6">
            🎯 {t("התחל תרגול", "Start Practice")}
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const total = questions.length;
  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore(s => s + 1);
  };
  const next = () => { setSelected(null); setCurrent(c => c + 1); };

  if (current >= total) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">{t("כל הכבוד!", "Great Job!")}</h2>
            <p className="text-lg mb-4">{t(`${score} מתוך ${total}`, `${score} out of ${total}`)}</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button onClick={() => { setCurrent(0); setSelected(null); setScore(0); }}>
                {t("נסה שוב", "Try Again")}
              </Button>
              <Button variant="outline" onClick={() => { setPhase("learn"); setCurrent(0); setSelected(null); setScore(0); }}>
                {t("חזרה לטבלאות", "Back to Tables")}
              </Button>
              <Button variant="outline" onClick={onBack}>{t("תפריט", "Menu")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">⬅ {t("חזרה", "Back")}</Button>
        <Progress value={(current / total) * 100} className="mb-4" />
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">{q.sentence}</h2>
            <p className="text-sm text-muted-foreground mb-4" dir="ltr">{q.en}</p>
            <div className="grid grid-cols-3 gap-3">
              {q.options.map(opt => (
                <Button
                  key={opt}
                  variant={selected ? (opt === q.answer ? "default" : opt === selected ? "destructive" : "outline") : "outline"}
                  className={`h-auto py-3 text-lg ${selected && opt === q.answer ? "bg-green-600 hover:bg-green-600" : ""}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                >
                  {opt}
                </Button>
              ))}
            </div>
            {selected && (
              <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                <span className="font-bold">💡 </span>{q.explain}
              </div>
            )}
            {selected && (
              <Button onClick={current < total - 1 ? next : () => setCurrent(total)} className="w-full mt-4">
                {current < total - 1 ? t("הבא", "Next") : t("סיום", "Finish")}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
