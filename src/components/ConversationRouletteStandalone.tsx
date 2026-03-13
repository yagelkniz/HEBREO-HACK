import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dices, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Keyword {
  he: string;
  en: string;
}

interface ConversationItem {
  question: string;
  keywords: Keyword[];
  linkingWords: Keyword[];
}

const conversationData: ConversationItem[] = [
  { question: "אם היית קם בבוקר ומגלה שאתה דובר עברית מושלמת, מה הדבר הראשון שהיית עושה?", keywords: [{ he: "שטף", en: "fluency" }, { he: "ביטחון", en: "confidence" }, { he: "הזדמנות", en: "opportunity" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כדי ש", en: "so that" }, { he: "קודם כל", en: "first of all" }] },
  { question: "איזה כוח-על היה הופך את העבודה או הלימודים שלך להרבה יותר קלים?", keywords: [{ he: "יתרון", en: "advantage" }, { he: "להתמודד", en: "to cope" }, { he: "יכולת", en: "ability" }], linkingWords: [{ he: "כי", en: "because" }, { he: "בזכות", en: "thanks to" }, { he: "למשל", en: "for example" }] },
  { question: "אם היית חייב לחיות בתוך סרט או סדרה לחודש אחד, איזה עולם היית בוחר?", keywords: [{ he: "מציאות מדומה", en: "virtual reality" }, { he: "עלילה", en: "plot" }, { he: "שחקן ראשי", en: "main actor" }], linkingWords: [{ he: "מצד אחד", en: "on one hand" }, { he: "מצד שני", en: "on the other hand" }, { he: "בגלל ש", en: "because" }] },
  { question: "אם היית יכול לחזור בזמן רק כדי לראות הופעה חיה של להקה או אמן, לאן היית נוסע?", keywords: [{ he: "מסע בזמן", en: "time travel" }, { he: "תקופה", en: "era" }, { he: "נוסטלגיה", en: "nostalgia" }], linkingWords: [{ he: "כדי", en: "in order to" }, { he: "דווקא", en: "specifically" }, { he: "אף על פי ש", en: "even though" }] },
  { question: "איזה חוק חברתי היית מבטל אם הייתה לך האפשרות?", keywords: [{ he: "נורמה", en: "norm" }, { he: "מוסכמה", en: "convention" }, { he: "לשנות", en: "to change" }], linkingWords: [{ he: "לכן", en: "therefore" }, { he: "למרות ש", en: "despite" }, { he: "בתנאי ש", en: "on condition that" }] },
  { question: "אם יכולת לשלוח הודעת טקסט אחת קצרה לעצמך של לפני עשר שנים, מה היית כותב?", keywords: [{ he: "תובנה", en: "insight" }, { he: "אזהרה", en: "warning" }, { he: "עבר", en: "past" }], linkingWords: [{ he: "כדי ש", en: "so that" }, { he: "במקום", en: "instead of" }, { he: "לפני ש", en: "before" }] },
  { question: "נניח שאתה מקים חברה מחר בבוקר. איזה מוצר או שירות היא הייתה מוכרת?", keywords: [{ he: "יזמות", en: "entrepreneurship" }, { he: "צורך", en: "need" }, { he: "פתרון", en: "solution" }], linkingWords: [{ he: "ראשית", en: "firstly" }, { he: "בשביל", en: "for / in order to" }, { he: "כלומר", en: "meaning / that is" }] },
  { question: "אם היית יכול לדעת את האמת המוחלטת לגבי תעלומה אחת בעולם, מה היית שואל?", keywords: [{ he: "תעלומה", en: "mystery" }, { he: "סוד", en: "secret" }, { he: "סקרנות", en: "curiosity" }], linkingWords: [{ he: "האם", en: "is it? / do?" }, { he: "אולי", en: "maybe" }, { he: "משום ש", en: "because" }] },
  { question: "אם היית חייב לאכול רק מאכל אחד כל החיים והוא לא היה פוגע בבריאותך, מה היית בוחר?", keywords: [{ he: "תזונה", en: "nutrition" }, { he: "הרגל", en: "habit" }, { he: "להתפשר", en: "to compromise" }], linkingWords: [{ he: "גם אם", en: "even if" }, { he: "בלי ש", en: "without" }, { he: "כל עוד", en: "as long as" }] },
  { question: "הציעו לך עכשיו חופשה ללא הגבלת זמן, אבל בלי אינטרנט בכלל. אתה לוקח אותה?", keywords: [{ he: "ניתוק", en: "disconnection" }, { he: "שלווה", en: "tranquility" }, { he: "טכנולוגיה", en: "technology" }], linkingWords: [{ he: "אבל", en: "but" }, { he: "למרות", en: "despite" }, { he: "אם כי", en: "although" }] },
  { question: "מה הכישרון הכי 'חסר תועלת' שלך שאתה ממש גאה בו?", keywords: [{ he: "כישרון", en: "talent" }, { he: "שימושי", en: "useful" }, { he: "גאווה", en: "pride" }], linkingWords: [{ he: "אף על פי ש", en: "even though" }, { he: "בכל זאת", en: "nevertheless" }, { he: "כמו", en: "like / as" }] },
  { question: "אם היו כותבים ספר על החיים שלך, מה היה שם הפרק של השנה הנוכחית?", keywords: [{ he: "כותרת", en: "title" }, { he: "תקופה", en: "period" }, { he: "התפתחות", en: "development" }], linkingWords: [{ he: "כי", en: "because" }, { he: "עד כה", en: "so far" }, { he: "אחרי ש", en: "after" }] },
  { question: "מה הדבר הכי ספונטני שעשית אי פעם ואיך זה נגמר?", keywords: [{ he: "ספונטניות", en: "spontaneity" }, { he: "החלטה רגעית", en: "snap decision" }, { he: "השלכות", en: "consequences" }], linkingWords: [{ he: "ואז", en: "and then" }, { he: "בסופו של דבר", en: "in the end" }, { he: "בלי ש", en: "without" }] },
  { question: "איזו טעות שעשית בעבר הפכה בסוף לדבר הכי טוב שקרה לך?", keywords: [{ he: "תפנית", en: "turning point" }, { he: "טעות", en: "mistake" }, { he: "להפיק לקחים", en: "to learn lessons" }], linkingWords: [{ he: "דווקא", en: "actually / specifically" }, { he: "בזכות", en: "thanks to" }, { he: "למרות ש", en: "despite" }] },
  { question: "על איזה נושא אתה יכול לדבר חצי שעה בלי להתכונן מראש בכלל?", keywords: [{ he: "מומחיות", en: "expertise" }, { he: "תשוקה", en: "passion" }, { he: "להרצות", en: "to lecture" }], linkingWords: [{ he: "בלי", en: "without" }, { he: "כי", en: "because" }, { he: "בנוגע ל", en: "regarding" }] },
  { question: "מהי העצה הכי גרועה שאי פעם קיבלת?", keywords: [{ he: "עצה", en: "advice" }, { he: "ניסיון", en: "experience" }, { he: "להקשיב", en: "to listen" }], linkingWords: [{ he: "למרות ש", en: "although" }, { he: "במקום", en: "instead of" }, { he: "כאשר", en: "when" }] },
  { question: "מה הדבר הכי אמיץ שעשית, שלא דרש שום כוח פיזי?", keywords: [{ he: "אומץ", en: "courage" }, { he: "פגיעות", en: "vulnerability" }, { he: "החלטה", en: "decision" }], linkingWords: [{ he: "אף על פי ש", en: "even though" }, { he: "בזמן ש", en: "while" }, { he: "כדי", en: "in order to" }] },
  { question: "מתי בפעם האחרונה שינית את דעתך לגבי משהו מהותי שממש האמנת בו?", keywords: [{ he: "גמישות מחשבתית", en: "open-mindedness" }, { he: "השקפה", en: "worldview" }, { he: "לשכנע", en: "to convince" }], linkingWords: [{ he: "עד ש", en: "until" }, { he: "בגלל", en: "because of" }, { he: "לעומת", en: "compared to" }] },
  { question: "איזה הרגל קטן ביומיום שלך משנה לך את כל מצב הרוח?", keywords: [{ he: "שגרה", en: "routine" }, { he: "מצב רוח", en: "mood" }, { he: "השפעה", en: "influence" }], linkingWords: [{ he: "בכל פעם ש", en: "every time that" }, { he: "בזכות", en: "thanks to" }, { he: "כמו כן", en: "likewise" }] },
  { question: "אם היית צריך ללמד אותי משהו חדש לגמרי ב-5 דקות, מה היית מלמד אותי?", keywords: [{ he: "להעביר ידע", en: "to transfer knowledge" }, { he: "מיומנות", en: "skill" }, { he: "להדריך", en: "to guide" }], linkingWords: [{ he: "קודם כל", en: "first of all" }, { he: "אחר כך", en: "afterwards" }, { he: "כלומר", en: "meaning" }] },
  { question: "מה הדבר שכולם אוהבים ואתה פשוט לא מבין את ההתלהבות ממנו?", keywords: [{ he: "אובר-רייטד", en: "overrated" }, { he: "טרנד", en: "trend" }, { he: "להתחבר", en: "to relate" }], linkingWords: [{ he: "לעומת זאת", en: "on the other hand" }, { he: "בניגוד ל", en: "in contrast to" }, { he: "אולם", en: "however" }] },
  { question: "איזה ריח ישר זורק אותך לזיכרון ילדות ספציפי?", keywords: [{ he: "חוש הריח", en: "sense of smell" }, { he: "טריגר", en: "trigger" }, { he: "זיכרון", en: "memory" }], linkingWords: [{ he: "כאשר", en: "when" }, { he: "מיד", en: "immediately" }, { he: "כאילו", en: "as if" }] },
  { question: "אם היית צריך לתאר את האישיות שלך דרך סוג של אוכל, מה היית?", keywords: [{ he: "מטפורה", en: "metaphor" }, { he: "מרקם", en: "texture" }, { he: "טעם", en: "taste" }], linkingWords: [{ he: "כמו", en: "like" }, { he: "כי", en: "because" }, { he: "מבחינת", en: "in terms of" }] },
  { question: "מה החוויה הכי מוזרה או מצחיקה שהייתה לך בגלל הבדלי תרבויות?", keywords: [{ he: "פער תרבותי", en: "cultural gap" }, { he: "אי הבנה", en: "misunderstanding" }, { he: "זר", en: "foreign" }], linkingWords: [{ he: "בגלל", en: "because of" }, { he: "בעוד ש", en: "while / whereas" }, { he: "מתברר ש", en: "it turns out that" }] },
  { question: "איזה שיר תמיד גורם לך להרגיש נוסטלגיה, ולאיזו תקופה הוא מחזיר אותך?", keywords: [{ he: "פסקול", en: "soundtrack" }, { he: "געגוע", en: "longing" }, { he: "תקופה", en: "period" }], linkingWords: [{ he: "בכל פעם ש", en: "every time that" }, { he: "כאילו", en: "as if" }, { he: "בזמן ש", en: "while" }] },
  { question: "מה הדבר שאתה הכי אוהב לבזבז עליו כסף בלי להרגיש אשמה?", keywords: [{ he: "פינוק", en: "treat" }, { he: "תקציב", en: "budget" }, { he: "רגשות אשם", en: "guilt" }], linkingWords: [{ he: "בלי ש", en: "without" }, { he: "אפילו אם", en: "even if" }, { he: "כי", en: "because" }] },
  { question: "אם היית חייב לעבור למדינה אחרת מחר, לפי מה היית בוחר לאן לטוס?", keywords: [{ he: "הגירה", en: "immigration" }, { he: "יעד", en: "destination" }, { he: "קריטריון", en: "criterion" }], linkingWords: [{ he: "בהתאם ל", en: "according to" }, { he: "בתנאי ש", en: "on condition that" }, { he: "קודם כל", en: "first of all" }] },
  { question: "אם היית יכול לבחור חיה אחת, אפילו פראית, שתלווה אותך לכל מקום כמו כלב, איזו חיה זו הייתה?", keywords: [{ he: "חיית מחמד", en: "pet" }, { he: "נאמנות", en: "loyalty" }, { he: "אקזוטי", en: "exotic" }], linkingWords: [{ he: "אפילו", en: "even" }, { he: "כמו", en: "like" }, { he: "משום ש", en: "because" }] },
  { question: "מה הדבר שחשבת שהוא ממש מסובך כשהיית קטן, והיום אתה מבין שהוא פשוט?", keywords: [{ he: "תפיסה", en: "perception" }, { he: "בגרות", en: "maturity" }, { he: "תמימות", en: "innocence" }], linkingWords: [{ he: "כש", en: "when" }, { he: "לעומת", en: "compared to" }, { he: "בעצם", en: "actually" }] },
  { question: "אם היית יכול להקשיב לשיחות של אנשים אחרים ברחוב בלי שהם ידעו, היית עושה את זה?", keywords: [{ he: "סקרנות", en: "curiosity" }, { he: "פרטיות", en: "privacy" }, { he: "גבולות", en: "boundaries" }], linkingWords: [{ he: "גם אם", en: "even if" }, { he: "אבל", en: "but" }, { he: "מבלי ש", en: "without" }] },
];

type AnimState = "idle" | "shuffling" | "revealed";

interface Props {
  onBack: () => void;
  lang: "he" | "en";
}

export default function ConversationRouletteStandalone({ onBack, lang }: Props) {
  const t = (en: string, he: string) => (lang === "he" ? he : en);

  const [currentItem, setCurrentItem] = useState<ConversationItem | null>(null);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [shuffleDisplay, setShuffleDisplay] = useState("");

  const pickRandom = useCallback(() => {
    if (animState === "shuffling") return;
    setAnimState("shuffling");

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        {/* Back button */}
        <Button variant="ghost" onClick={onBack}>
          <ArrowRight className="h-4 w-4 ml-2" />
          {t("Back to Main Menu", "חזרה לתפריט הראשי")}
        </Button>

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
                        style={{ animation: `pulse 0.6s ease-in-out ${i * 0.15}s infinite` }}
                      />
                    ))}
                  </div>
                  <p className="text-lg text-muted-foreground font-medium blur-[1px]">
                    {shuffleDisplay}
                  </p>
                </div>
              )}

              {animState === "revealed" && currentItem && (
                <div className="w-full space-y-6 animate-scale-in">
                  <p className="text-xl md:text-2xl font-semibold leading-[1.8] text-right text-foreground" style={{ whiteSpace: "pre-wrap" }}>
                    {currentItem.question}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    <span className="text-xs text-muted-foreground font-medium ml-2 self-center">
                      {t("Keywords:", "מילות מפתח:")}
                    </span>
                    {currentItem.keywords.map((kw) => (
                      <Badge key={kw.he} variant="secondary" className="text-sm px-3 py-1 font-medium">
                        {kw.he} <span className="text-muted-foreground text-xs mr-1">({kw.en})</span>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground font-medium ml-2 self-center">
                      {t("Linking Words:", "מילות קישור:")}
                    </span>
                    {currentItem.linkingWords.map((lw) => (
                      <Badge key={lw.he} variant="outline" className="text-sm px-3 py-1 font-medium border-primary/40 text-primary">
                        {lw.he} <span className="text-muted-foreground text-xs mr-1">({lw.en})</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

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

        <p className="text-center text-sm text-muted-foreground">
          {t(`${conversationData.length} questions available`, `${conversationData.length} שאלות זמינות`)}
        </p>
      </div>
    </div>
  );
}
