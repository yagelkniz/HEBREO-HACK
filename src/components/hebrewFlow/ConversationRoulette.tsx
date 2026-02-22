import React, { useState, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dices, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutContext {
  lang: "he" | "en";
  t: (en: string, he: string) => string;
}

interface ConversationItem {
  question: string;
  keywords: string[];
}

const conversationData: ConversationItem[] = [
  { question: "אם היית קם בבוקר ומגלה שאתה דובר עברית מושלמת, מה הדבר הראשון שהיית עושה?", keywords: ["שטף", "ביטחון", "הזדמנות"] },
  { question: "איזה כוח-על היה הופך את העבודה או הלימודים שלך להרבה יותר קלים?", keywords: ["יתרון", "להתמודד", "יכולת"] },
  { question: "אם היית חייב לחיות בתוך סרט או סדרה לחודש אחד, איזה עולם היית בוחר?", keywords: ["מציאות מדומה", "עלילה", "שחקן ראשי"] },
  { question: "אם היית יכול לחזור בזמן רק כדי לראות הופעה חיה של להקה או אמן, לאן היית נוסע?", keywords: ["מסע בזמן", "תקופה", "נוסטלגיה"] },
  { question: "איזה חוק חברתי היית מבטל אם הייתה לך האפשרות?", keywords: ["נורמה", "מוסכמה", "לשנות"] },
  { question: "אם יכולת לשלוח הודעת טקסט אחת קצרה לעצמך של לפני עשר שנים, מה היית כותב?", keywords: ["תובנה", "אזהרה", "עבר"] },
  { question: "נניח שאתה מקים חברה מחר בבוקר. איזה מוצר או שירות היא הייתה מוכרת?", keywords: ["יזמות", "צורך", "פתרון"] },
  { question: "אם היית יכול לדעת את האמת המוחלטת לגבי תעלומה אחת בעולם, מה היית שואל?", keywords: ["תעלומה", "סוד", "סקרנות"] },
  { question: "אם היית חייב לאכול רק מאכל אחד כל החיים והוא לא היה פוגע בבריאותך, מה היית בוחר?", keywords: ["תזונה", "הרגל", "להתפשר"] },
  { question: "הציעו לך עכשיו חופשה ללא הגבלת זמן, אבל בלי אינטרנט בכלל. אתה לוקח אותה?", keywords: ["ניתוק", "שלווה", "טכנולוגיה"] },
  { question: "מה הכישרון הכי 'חסר תועלת' שלך שאתה ממש גאה בו?", keywords: ["כישרון", "שימושי", "גאווה"] },
  { question: "אם היו כותבים ספר על החיים שלך, מה היה שם הפרק של השנה הנוכחית?", keywords: ["כותרת", "תקופה", "התפתחות"] },
  { question: "מה הדבר הכי ספונטני שעשית אי פעם ואיך זה נגמר?", keywords: ["ספונטניות", "החלטה רגעית", "השלכות"] },
  { question: "איזו טעות שעשית בעבר הפכה בסוף לדבר הכי טוב שקרה לך?", keywords: ["תפנית", "טעות", "להפיק לקחים"] },
  { question: "על איזה נושא אתה יכול לדבר חצי שעה בלי להתכונן מראש בכלל?", keywords: ["מומחיות", "תשוקה", "להרצות"] },
  { question: "מהי העצה הכי גרועה שאי פעם קיבלת?", keywords: ["עצה", "ניסיון", "להקשיב"] },
  { question: "מה הדבר הכי אמיץ שעשית, שלא דרש שום כוח פיזי?", keywords: ["אומץ", "פגיעות", "החלטה"] },
  { question: "מתי בפעם האחרונה שינית את דעתך לגבי משהו מהותי שממש האמנת בו?", keywords: ["גמישות מחשבתית", "השקפה", "לשכנע"] },
  { question: "איזה הרגל קטן ביומיום שלך משנה לך את כל מצב הרוח?", keywords: ["שגרה", "מצב רוח", "השפעה"] },
  { question: "אם היית צריך ללמד אותי משהו חדש לגמרי ב-5 דקות, מה היית מלמד אותי?", keywords: ["להעביר ידע", "מיומנות", "להדריך"] },
  { question: "מה הדבר שכולם אוהבים ואתה פשוט לא מבין את ההתלהבות ממנו?", keywords: ["אובר-רייטד", "טרנד", "להתחבר"] },
  { question: "איזה ריח ישר זורק אותך לזיכרון ילדות ספציפי?", keywords: ["חוש הריח", "טריגר", "זיכרון"] },
  { question: "אם היית צריך לתאר את האישיות שלך דרך סוג של אוכל, מה היית?", keywords: ["מטפורה", "מרקם", "טעם"] },
  { question: "מה החוויה הכי מוזרה או מצחיקה שהייתה לך בגלל הבדלי תרבויות?", keywords: ["פער תרבותי", "אי הבנה", "זר"] },
  { question: "איזה שיר תמיד גורם לך להרגיש נוסטלגיה, ולאיזו תקופה הוא מחזיר אותך?", keywords: ["פסקול", "געגוע", "תקופה"] },
  { question: "מה הדבר שאתה הכי אוהב לבזבז עליו כסף בלי להרגיש אשמה?", keywords: ["פינוק", "תקציב", "רגשות אשם"] },
  { question: "אם היית חייב לעבור למדינה אחרת מחר, לפי מה היית בוחר לאן לטוס?", keywords: ["הגירה", "יעד", "קריטריון"] },
  { question: "אם היית יכול לבחור חיה אחת, אפילו פראית, שתלווה אותך לכל מקום כמו כלב, איזו חיה זו הייתה?", keywords: ["חיית מחמד", "נאמנות", "אקזוטי"] },
  { question: "מה הדבר שחשבת שהוא ממש מסובך כשהיית קטן, והיום אתה מבין שהוא פשוט?", keywords: ["תפיסה", "בגרות", "תמימות"] },
  { question: "אם היית יכול להקשיב לשיחות של אנשים אחרים ברחוב בלי שהם ידעו, היית עושה את זה?", keywords: ["סקרנות", "פרטיות", "גבולות"] },
];

type AnimState = "idle" | "shuffling" | "revealed";

export default function ConversationRoulette() {
  const context = useOutletContext<LayoutContext>();
  const lang = context?.lang ?? "he";
  const t = context?.t ?? ((en: string, he: string) => (lang === "he" ? he : en));

  const [currentItem, setCurrentItem] = useState<ConversationItem | null>(null);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [shuffleDisplay, setShuffleDisplay] = useState<string>("");

  const pickRandom = useCallback(() => {
    if (animState === "shuffling") return;

    setAnimState("shuffling");

    // Rapid shuffle visual effect
    let count = 0;
    const totalFlicks = 12;
    const interval = setInterval(() => {
      const rand = conversationData[Math.floor(Math.random() * conversationData.length)];
      setShuffleDisplay(rand.question.slice(0, 40) + "...");
      count++;
      if (count >= totalFlicks) {
        clearInterval(interval);
        const final = conversationData[Math.floor(Math.random() * conversationData.length)];
        setCurrentItem(final);
        setShuffleDisplay("");
        setAnimState("revealed");
      }
    }, 80);
  }, [animState]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <MessageCircle className="h-4 w-4" />
          {t("Conversation Roulette", "רולטת שיחה")}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("Spin for a Conversation Starter", "סובב וקבל שאלה לשיחה")}
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {t(
            "Practice spontaneous Hebrew speaking with random, thought-provoking questions. Use the keywords to build your answer!",
            "תרגלו דיבור עברי ספונטני עם שאלות אקראיות ומעוררות מחשבה. השתמשו במילות המפתח כדי לבנות את התשובה!"
          )}
        </p>
      </div>

      {/* Roulette Card */}
      <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
        <CardContent className="p-0">
          {/* Shuffle / Question Display Area */}
          <div className="min-h-[240px] flex items-center justify-center p-8 relative bg-gradient-to-br from-primary/5 to-muted/30">
            {animState === "idle" && !currentItem && (
              <div className="text-center space-y-3 animate-fade-in">
                <Dices className="h-16 w-16 mx-auto text-muted-foreground/40" />
                <p className="text-muted-foreground text-lg">
                  {t("Press the button to get a question!", "לחצו על הכפתור כדי לקבל שאלה!")}
                </p>
              </div>
            )}

            {animState === "shuffling" && (
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-primary"
                      style={{
                        animation: `pulse 0.6s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-lg text-muted-foreground font-medium transition-all duration-75 blur-[1px]">
                  {shuffleDisplay}
                </p>
              </div>
            )}

            {animState === "revealed" && currentItem && (
              <div className="w-full space-y-6 animate-scale-in">
                <p
                  className="text-xl md:text-2xl font-semibold leading-[1.8] text-right text-foreground"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {currentItem.question}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 justify-end">
                  <span className="text-xs text-muted-foreground font-medium ml-2 self-center">
                    {t("Keywords:", "מילות מפתח:")}
                  </span>
                  {currentItem.keywords.map((kw) => (
                    <Badge
                      key={kw}
                      variant="secondary"
                      className="text-sm px-3 py-1 font-medium"
                    >
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="p-6 border-t bg-card flex justify-center">
            <Button
              size="lg"
              onClick={pickRandom}
              disabled={animState === "shuffling"}
              className="gap-2 text-base px-8 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Dices className={cn("h-5 w-5", animState === "shuffling" && "animate-spin")} />
              {animState === "idle" && !currentItem
                ? t("Get a Question", "קבל שאלה")
                : t("Next Question", "שאלה הבאה")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Counter */}
      <p className="text-center text-sm text-muted-foreground">
        {t(`${conversationData.length} questions available`, `${conversationData.length} שאלות זמינות`)}
      </p>
    </div>
  );
}
