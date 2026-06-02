import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Lock, CheckCircle2, Share2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

// ----------------------------- Types -----------------------------
type Vocab = { hebrew: string; english: string };
type QuizQ = { word: string; correct: string; wrong: string[] };
type Blank = { sentence: string; answer: string }; // sentence uses ___
type Comp = { question: string; options: string[]; correct: number };

interface Location {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind color base e.g. "blue", "amber"
  accent: string; // hex for SVG pin and accents
  coords: { x: number; y: number }; // % of SVG viewBox 0-100
  story: string[];
  vocabulary: Vocab[];
  quizQuestions: QuizQ[];
  blanks: Blank[];
  matching: Vocab[];
  comprehension: Comp[];
  funFact: string;
  completionEmoji: string;
}

// ----------------------------- Data -----------------------------
const LOCATIONS: Location[] = [
  {
    id: "tlv",
    name: "תל אביב",
    emoji: "🏖️",
    color: "blue",
    accent: "#2563eb",
    coords: { x: 30, y: 38 },
    story: [
      "**עולה** **חדש** הגיע ל**תל אביב** בפעם הראשונה בחייו.",
      "הוא יצא מהמטוס והרגיש את ה**חום** של הקיץ הישראלי.",
      "מיד הלך ל**חוף** הים והסתכל על הגלים הכחולים.",
      "ה**עיר** הייתה מלאה ב**אנשים**, ב**מוזיקה** וב**תחבורה** רועשת.",
      "הוא ישב בבית **קפה** קטן ב**רחוב** דיזנגוף.",
      "ראה **בניין** גבוה לבן וזקנה מוכרת ירקות ב**שוק** הכרמל.",
      "הריחות, הצבעים והקולות בלבלו אותו לרגע.",
      "הוא הוציא את הטלפון והתקשר לאמא שלו.",
      "\"אמא, אני בתל אביב!\" אמר בהתרגשות.",
      "\"הכול חדש, הכול מהיר, וזה מדהים.\"",
    ],
    vocabulary: [
      { hebrew: "עיר", english: "city" },
      { hebrew: "חוף", english: "beach" },
      { hebrew: "קפה", english: "coffee" },
      { hebrew: "רחוב", english: "street" },
      { hebrew: "בניין", english: "building" },
      { hebrew: "תחבורה", english: "transport" },
      { hebrew: "שוק", english: "market" },
      { hebrew: "מוזיקה", english: "music" },
      { hebrew: "אנשים", english: "people" },
      { hebrew: "חדש", english: "new" },
    ],
    quizQuestions: [
      { word: "עיר", correct: "city", wrong: ["country", "village", "road"] },
      { word: "חוף", correct: "beach", wrong: ["river", "mountain", "field"] },
      { word: "קפה", correct: "coffee", wrong: ["tea", "juice", "milk"] },
      { word: "רחוב", correct: "street", wrong: ["bridge", "park", "alley"] },
      { word: "בניין", correct: "building", wrong: ["tree", "car", "shop"] },
      { word: "תחבורה", correct: "transport", wrong: ["traffic", "tourism", "trade"] },
      { word: "שוק", correct: "market", wrong: ["mall", "stadium", "school"] },
      { word: "אנשים", correct: "people", wrong: ["animals", "children", "tourists"] },
    ],
    blanks: [
      { sentence: "העולה החדש הגיע ל___ אביב.", answer: "תל" },
      { sentence: "הוא הלך לראות את ה___.", answer: "חוף" },
      { sentence: "הוא ישב בבית ___ ברחוב דיזנגוף.", answer: "קפה" },
      { sentence: "הוא ראה ___ גבוה לבן.", answer: "בניין" },
      { sentence: "הוא התקשר ל___ שלו.", answer: "אמא" },
    ],
    matching: [
      { hebrew: "עיר", english: "city" },
      { hebrew: "חוף", english: "beach" },
      { hebrew: "קפה", english: "coffee" },
      { hebrew: "רחוב", english: "street" },
      { hebrew: "בניין", english: "building" },
      { hebrew: "שוק", english: "market" },
      { hebrew: "מוזיקה", english: "music" },
      { hebrew: "אנשים", english: "people" },
    ],
    comprehension: [
      {
        question: "למה העולה החדש מתקשר לאמא שלו?",
        options: ["כי הוא רעב", "כי הוא נרגש", "כי הוא אבוד", "כי הוא עייף"],
        correct: 1,
      },
      {
        question: "איפה הוא ישב בעיר?",
        options: ["במוזיאון", "בבית קפה ברחוב דיזנגוף", "בנמל", "בבית מלון"],
        correct: 1,
      },
      {
        question: "מה הוא הרגיש כשיצא מהמטוס?",
        options: ["קור", "גשם", "חום", "רוח"],
        correct: 2,
      },
    ],
    funFact: "תל אביב נקראת \"העיר שלא ישנה אף פעם\" — היא חיה 24 שעות ביממה.",
    completionEmoji: "🏖️",
  },
  {
    id: "jlm",
    name: "ירושלים",
    emoji: "🕌",
    color: "amber",
    accent: "#d97706",
    coords: { x: 45, y: 52 },
    story: [
      "משפחה הגיעה לראשונה ל**עיר עתיקה** של ירושלים.",
      "הם נכנסו דרך שער יפו והרגישו את ה**היסטוריה** באוויר.",
      "ההורים הראו לילדים את ה**כותל** המערבי.",
      "אנשים עמדו ליד ה**אבן** הגדולה ועשו **תפילה** שקטה.",
      "אחר כך הלכו ל**שוק** של הרובע המוסלמי.",
      "ריחות של תבלינים, קפה ולחם מילאו את האוויר.",
      "הם עברו דרך ה**שכונה** הנוצרית וראו **כנסייה** עתיקה.",
      "לידה עמד **מסגד** עם כיפת זהב.",
      "ולא רחוק משם נמצא **בית כנסת** קטן ויפה.",
      "הילדים אמרו: \"כאן הכול מספר סיפור.\"",
    ],
    vocabulary: [
      { hebrew: "עיר עתיקה", english: "old city" },
      { hebrew: "כותל", english: "Western Wall" },
      { hebrew: "שוק", english: "market" },
      { hebrew: "תפילה", english: "prayer" },
      { hebrew: "היסטוריה", english: "history" },
      { hebrew: "אבן", english: "stone" },
      { hebrew: "שכונה", english: "neighborhood" },
      { hebrew: "מסגד", english: "mosque" },
      { hebrew: "כנסייה", english: "church" },
      { hebrew: "בית כנסת", english: "synagogue" },
    ],
    quizQuestions: [
      { word: "כותל", correct: "Western Wall", wrong: ["gate", "tower", "bridge"] },
      { word: "תפילה", correct: "prayer", wrong: ["song", "story", "speech"] },
      { word: "אבן", correct: "stone", wrong: ["sand", "wood", "metal"] },
      { word: "שכונה", correct: "neighborhood", wrong: ["country", "city", "garden"] },
      { word: "מסגד", correct: "mosque", wrong: ["church", "synagogue", "temple"] },
      { word: "כנסייה", correct: "church", wrong: ["mosque", "school", "museum"] },
      { word: "בית כנסת", correct: "synagogue", wrong: ["church", "mosque", "library"] },
      { word: "היסטוריה", correct: "history", wrong: ["geography", "story", "memory"] },
    ],
    blanks: [
      { sentence: "המשפחה הגיעה ל___ עתיקה.", answer: "עיר" },
      { sentence: "הם הראו לילדים את ה___ המערבי.", answer: "כותל" },
      { sentence: "אנשים עשו ___ שקטה ליד האבן.", answer: "תפילה" },
      { sentence: "ב___ של הרובע היו ריחות של תבלינים.", answer: "שוק" },
      { sentence: "ליד הכנסייה עמד ___ עם כיפת זהב.", answer: "מסגד" },
    ],
    matching: [
      { hebrew: "כותל", english: "Western Wall" },
      { hebrew: "תפילה", english: "prayer" },
      { hebrew: "אבן", english: "stone" },
      { hebrew: "שכונה", english: "neighborhood" },
      { hebrew: "מסגד", english: "mosque" },
      { hebrew: "כנסייה", english: "church" },
      { hebrew: "בית כנסת", english: "synagogue" },
      { hebrew: "היסטוריה", english: "history" },
    ],
    comprehension: [
      {
        question: "דרך איזה שער המשפחה נכנסה לעיר העתיקה?",
        options: ["שער שכם", "שער יפו", "שער הזהב", "שער האריות"],
        correct: 1,
      },
      {
        question: "מה ראו ההורים והילדים קודם כל?",
        options: ["את הכנסייה", "את המסגד", "את הכותל", "את השוק"],
        correct: 2,
      },
      {
        question: "מה מילא את האוויר בשוק?",
        options: ["ריחות של תבלינים וקפה", "מוזיקה רועשת", "קור וגשם", "אבק"],
        correct: 0,
      },
    ],
    funFact: "בירושלים יש למעלה מ-2,000 אתרי עתיקות בעיר העתיקה בלבד.",
    completionEmoji: "🕌",
  },
  {
    id: "hfa",
    name: "חיפה",
    emoji: "🌸",
    color: "purple",
    accent: "#9333ea",
    coords: { x: 32, y: 18 },
    story: [
      "**סטודנט**ית עלתה על ה**רכבל** של הכרמלית בחיפה.",
      "היא נסעה ל**למעלה**, אל פסגת ה**הר**.",
      "מהחלון ראתה את ה**ים** הכחול של הים התיכון.",
      "כשירדה מהרכבל פגשה את הגנים הבהאיים.",
      "ה**גן** היה מלא **פרחים** בכל הצבעים.",
      "המראה היה ה**נוף** הכי **יפה** שהיא ראתה אי פעם.",
      "למטה היא ראתה את ה**נמל** עם אוניות ענק.",
      "אנשים צילמו, ילדים רצו, וציפורים שרו.",
      "היא ישבה על ספסל וכתבה במחברת שלה.",
      "\"חיפה היא העיר היפה ביותר בישראל,\" כתבה.",
    ],
    vocabulary: [
      { hebrew: "הר", english: "mountain" },
      { hebrew: "ים", english: "sea" },
      { hebrew: "גן", english: "garden" },
      { hebrew: "רכבל", english: "cable car" },
      { hebrew: "נמל", english: "port" },
      { hebrew: "נוף", english: "view" },
      { hebrew: "סטודנט", english: "student" },
      { hebrew: "פרחים", english: "flowers" },
      { hebrew: "למעלה", english: "above" },
      { hebrew: "יפה", english: "beautiful" },
    ],
    quizQuestions: [
      { word: "הר", correct: "mountain", wrong: ["hill", "valley", "river"] },
      { word: "ים", correct: "sea", wrong: ["lake", "river", "pond"] },
      { word: "גן", correct: "garden", wrong: ["forest", "park", "field"] },
      { word: "רכבל", correct: "cable car", wrong: ["train", "bus", "boat"] },
      { word: "נמל", correct: "port", wrong: ["airport", "station", "market"] },
      { word: "נוף", correct: "view", wrong: ["picture", "window", "mirror"] },
      { word: "פרחים", correct: "flowers", wrong: ["trees", "leaves", "fruits"] },
      { word: "יפה", correct: "beautiful", wrong: ["ugly", "big", "small"] },
    ],
    blanks: [
      { sentence: "הסטודנטית עלתה על ה___ של הכרמלית.", answer: "רכבל" },
      { sentence: "היא נסעה אל פסגת ה___.", answer: "הר" },
      { sentence: "מהחלון ראתה את ה___ הכחול.", answer: "ים" },
      { sentence: "הגן היה מלא ___ בכל הצבעים.", answer: "פרחים" },
      { sentence: "למטה היא ראתה את ה___ עם אוניות.", answer: "נמל" },
    ],
    matching: [
      { hebrew: "הר", english: "mountain" },
      { hebrew: "ים", english: "sea" },
      { hebrew: "גן", english: "garden" },
      { hebrew: "רכבל", english: "cable car" },
      { hebrew: "נמל", english: "port" },
      { hebrew: "נוף", english: "view" },
      { hebrew: "פרחים", english: "flowers" },
      { hebrew: "יפה", english: "beautiful" },
    ],
    comprehension: [
      {
        question: "במה הסטודנטית נסעה לפסגת ההר?",
        options: ["באוטובוס", "ברכבל הכרמלית", "ברכבת", "במונית"],
        correct: 1,
      },
      {
        question: "מה היא ראתה בגנים הבהאיים?",
        options: ["חיות בר", "פרחים בכל הצבעים", "אוניות", "מטוסים"],
        correct: 1,
      },
      {
        question: "מה היא עשתה על הספסל?",
        options: ["אכלה", "ישנה", "כתבה במחברת", "צילמה"],
        correct: 2,
      },
    ],
    funFact: "הגנים הבהאיים בחיפה הם אתר מורשת עולמית של אונסק\"ו.",
    completionEmoji: "🌸",
  },
  {
    id: "ds",
    name: "ים המלח",
    emoji: "🧖",
    color: "teal",
    accent: "#0d9488",
    coords: { x: 53, y: 65 },
    story: [
      "תייר מאמריקה הגיע לראשונה ל**ים המלח**.",
      "הוא ידע שזה המקום ה**נמוך** ביותר על פני כדור הארץ.",
      "ה**חום** היה כבד וה**מדבר** סביבו שתק.",
      "הוא נכנס למים ב**גוף** מלא ופחד קצת.",
      "אבל אז קרה משהו **ייחודי** — הוא התחיל **לצוף**!",
      "ה**מלח** במים אינו מאפשר לאדם לטבוע.",
      "הוא צחק בקול ולקח **בוץ** שחור מהחוף.",
      "הוא מרח את הבוץ על הפנים והידיים.",
      "כולם אומרים שהבוץ טוב ל**בריאות** העור.",
      "ה**טבע** במקום הזה באמת מיוחד וקסום.",
    ],
    vocabulary: [
      { hebrew: "מלח", english: "salt" },
      { hebrew: "לצוף", english: "to float" },
      { hebrew: "בוץ", english: "mud" },
      { hebrew: "נמוך", english: "low" },
      { hebrew: "מדבר", english: "desert" },
      { hebrew: "חום", english: "heat" },
      { hebrew: "ייחודי", english: "unique" },
      { hebrew: "טבע", english: "nature" },
      { hebrew: "גוף", english: "body" },
      { hebrew: "בריאות", english: "health" },
    ],
    quizQuestions: [
      { word: "מלח", correct: "salt", wrong: ["sugar", "pepper", "spice"] },
      { word: "לצוף", correct: "to float", wrong: ["to sink", "to swim", "to dive"] },
      { word: "בוץ", correct: "mud", wrong: ["sand", "stone", "clay"] },
      { word: "נמוך", correct: "low", wrong: ["high", "wide", "deep"] },
      { word: "מדבר", correct: "desert", wrong: ["forest", "jungle", "valley"] },
      { word: "חום", correct: "heat", wrong: ["cold", "wind", "rain"] },
      { word: "ייחודי", correct: "unique", wrong: ["common", "boring", "simple"] },
      { word: "בריאות", correct: "health", wrong: ["wealth", "beauty", "luck"] },
    ],
    blanks: [
      { sentence: "התייר הגיע ל___ המלח.", answer: "ים" },
      { sentence: "זה המקום הכי ___ בעולם.", answer: "נמוך" },
      { sentence: "הוא נכנס למים והתחיל ___.", answer: "לצוף" },
      { sentence: "הוא מרח ___ שחור על הפנים.", answer: "בוץ" },
      { sentence: "הבוץ טוב ל___ של העור.", answer: "בריאות" },
    ],
    matching: [
      { hebrew: "מלח", english: "salt" },
      { hebrew: "לצוף", english: "to float" },
      { hebrew: "בוץ", english: "mud" },
      { hebrew: "נמוך", english: "low" },
      { hebrew: "מדבר", english: "desert" },
      { hebrew: "חום", english: "heat" },
      { hebrew: "טבע", english: "nature" },
      { hebrew: "בריאות", english: "health" },
    ],
    comprehension: [
      {
        question: "מה מיוחד בים המלח?",
        options: ["יש בו דגים גדולים", "אי אפשר לטבוע בו", "המים שלו קרים מאוד", "יש בו אלמוגים"],
        correct: 1,
      },
      {
        question: "למה התייר מרח בוץ על הפנים?",
        options: ["כי היה משעמם", "כי זה טוב לבריאות העור", "כדי להתחפש", "כי היה קר"],
        correct: 1,
      },
      {
        question: "מה היה סביב ים המלח?",
        options: ["יער", "עיר גדולה", "מדבר שקט", "שדה ירוק"],
        correct: 2,
      },
    ],
    funFact: "ים המלח נמצא 430 מטר מתחת לפני הים — המקום היבשתי הנמוך בעולם.",
    completionEmoji: "🧖",
  },
  {
    id: "elt",
    name: "אילת",
    emoji: "🐠",
    color: "orange",
    accent: "#ea580c",
    coords: { x: 45, y: 92 },
    story: [
      "משפחה הגיעה ל**חופשה** באילת בקיץ.",
      "ה**שמש** הייתה חזקה והאוויר היה מאוד **חם**.",
      "ה**ילדים** רצו ישר ל**מים** של ים סוף.",
      "הם לבשו משקפי **צלילה** ומסכות.",
      "מתחת למים ראו עולם שלם של **דגים** קטנים.",
      "ה**אלמוגים** היו בצבע **אדום**, ורוד וצהוב.",
      "המים היו **כחול** בהיר ושקופים כמו זכוכית.",
      "אבא הראה לילדים דג גדול עם פסים.",
      "אמא צילמה הכול במצלמה מתחת למים.",
      "בסוף היום הילדים אמרו: \"אנחנו לא רוצים לחזור הביתה!\"",
    ],
    vocabulary: [
      { hebrew: "אלמוגים", english: "coral" },
      { hebrew: "דגים", english: "fish" },
      { hebrew: "צלילה", english: "diving" },
      { hebrew: "אדום", english: "red" },
      { hebrew: "כחול", english: "blue" },
      { hebrew: "חופשה", english: "vacation" },
      { hebrew: "ילדים", english: "children" },
      { hebrew: "חם", english: "hot" },
      { hebrew: "מים", english: "water" },
      { hebrew: "שמש", english: "sun" },
    ],
    quizQuestions: [
      { word: "אלמוגים", correct: "coral", wrong: ["shells", "rocks", "plants"] },
      { word: "דגים", correct: "fish", wrong: ["birds", "snakes", "turtles"] },
      { word: "צלילה", correct: "diving", wrong: ["sailing", "fishing", "surfing"] },
      { word: "אדום", correct: "red", wrong: ["green", "yellow", "black"] },
      { word: "כחול", correct: "blue", wrong: ["white", "purple", "pink"] },
      { word: "חופשה", correct: "vacation", wrong: ["work", "school", "trip"] },
      { word: "ילדים", correct: "children", wrong: ["adults", "parents", "tourists"] },
      { word: "שמש", correct: "sun", wrong: ["moon", "star", "cloud"] },
    ],
    blanks: [
      { sentence: "המשפחה הגיעה ל___ באילת.", answer: "חופשה" },
      { sentence: "ה___ הייתה חזקה מאוד.", answer: "שמש" },
      { sentence: "הם ראו ___ קטנים מתחת למים.", answer: "דגים" },
      { sentence: "ה___ היו בצבע אדום וורוד.", answer: "אלמוגים" },
      { sentence: "המים היו בצבע ___ בהיר.", answer: "כחול" },
    ],
    matching: [
      { hebrew: "אלמוגים", english: "coral" },
      { hebrew: "דגים", english: "fish" },
      { hebrew: "צלילה", english: "diving" },
      { hebrew: "אדום", english: "red" },
      { hebrew: "כחול", english: "blue" },
      { hebrew: "חופשה", english: "vacation" },
      { hebrew: "חם", english: "hot" },
      { hebrew: "שמש", english: "sun" },
    ],
    comprehension: [
      {
        question: "מה הילדים רצו לעשות מיד כשהגיעו?",
        options: ["לאכול גלידה", "להיכנס למים", "לישון", "לקנות מזכרות"],
        correct: 1,
      },
      {
        question: "מה ראו מתחת למים?",
        options: ["צוללת", "דגים ואלמוגים", "כרישים", "מטבעות זהב"],
        correct: 1,
      },
      {
        question: "מה הילדים אמרו בסוף היום?",
        options: ["אנחנו רעבים", "אנחנו עייפים", "אנחנו לא רוצים לחזור הביתה", "אנחנו רוצים גלידה"],
        correct: 2,
      },
    ],
    funFact: "באילת אפשר לראות יותר מ-1,200 מינים של דגים בשונית האלמוגים.",
    completionEmoji: "🐠",
  },
];

// ----------------------------- Utils -----------------------------
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const STORAGE_KEY = "map_of_israel_progress_v1";

function loadProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveProgress(p: Record<string, boolean>) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

// ----------------------------- Story renderer -----------------------------
function StoryLine({ line, vocab }: { line: string; vocab: Vocab[] }) {
  // Replace **word** with highlight, attach tooltip via title
  const parts: Array<{ text: string; bold: boolean }> = [];
  const regex = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(line))) {
    if (m.index > last) parts.push({ text: line.slice(last, m.index), bold: false });
    parts.push({ text: m[1], bold: true });
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push({ text: line.slice(last), bold: false });

  const findEn = (heb: string) =>
    vocab.find((v) => heb.includes(v.hebrew) || v.hebrew.includes(heb))?.english;

  return (
    <p className="mb-2" style={{ lineHeight: 1.9, fontSize: 19 }}>
      {parts.map((p, i) =>
        p.bold ? (
          <button
            key={i}
            onClick={() => {
              const en = findEn(p.text);
              if (en) toast(`${p.text} = ${en}`);
            }}
            className="font-bold text-primary underline decoration-dotted underline-offset-4 hover:bg-primary/10 rounded px-1 transition"
          >
            {p.text}
          </button>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </p>
  );
}

// ----------------------------- Step 1: Read -----------------------------
function StepRead({ loc, onNext }: { loc: Location; onNext: () => void }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEnabled(true), 10000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span>📖</span> קראו על {loc.name}
      </h2>
      <Card className="p-6 bg-white/90 backdrop-blur border-2" style={{ borderColor: loc.accent + "40" }}>
        {loc.story.map((line, i) => (
          <StoryLine key={i} line={line} vocab={loc.vocabulary} />
        ))}
        <p className="text-xs text-muted-foreground mt-4">💡 לחצו על מילה מודגשת לתרגום</p>
      </Card>
      <div className="flex justify-end">
        <Button
          onClick={() => (enabled ? onNext() : setEnabled(true))}
          size="lg"
          className="text-white font-bold"
          style={{ background: loc.accent }}
        >
          {enabled ? "המשך ←" : "המשך ← (קראו רגע...)"}
        </Button>
      </div>
    </div>
  );
}

// ----------------------------- Step 2: Vocab Quiz -----------------------------
function StepQuiz({ loc, onPass, onFail }: { loc: Location; onPass: (score: number) => void; onFail: (score: number) => void }) {
  const [questions, setQuestions] = useState(() => shuffle(loc.quizQuestions));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const options = useMemo(() => shuffle([q.correct, ...q.wrong]), [q]);

  const choose = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx(idx + 1);
        setPicked(null);
      } else {
        setDone(true);
      }
    }, 800);
  };

  const retry = () => {
    setQuestions(shuffle(loc.quizQuestions));
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  if (done) {
    const passed = score >= 6;
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">🧠 מבחן מילים — תוצאה</h2>
        <Card className="p-8 bg-white">
          <div className="text-6xl mb-3">{passed ? "🎉" : "💪"}</div>
          <div className="text-3xl font-bold mb-2" style={{ color: loc.accent }}>
            {score} / {questions.length}
          </div>
          <p className="text-lg mb-4">
            {passed
              ? loc.id === "elt"
                ? "כל הכבוד! אתם מוכנים לצלול! 🤿"
                : loc.id === "tlv"
                ? "מצוין! אתם כבר תל אביבים אמיתיים! ☕"
                : loc.id === "jlm"
                ? "נהדר! אתם יודעים את העיר העתיקה! 🕌"
                : loc.id === "hfa"
                ? "יופי! הנוף שלכם מהמם! 🌸"
                : "מעולה! אתם צפים מעל הכול! 🧖"
              : "כמעט הצלחתם — צריך לפחות 6 מתוך 8."}
          </p>
          {passed ? (
            <Button onClick={() => onPass(score)} size="lg" className="text-white" style={{ background: loc.accent }}>
              המשך לתרגילים ←
            </Button>
          ) : (
            <div className="flex gap-2 justify-center">
              <Button onClick={retry} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" /> נסה שוב
              </Button>
              <Button onClick={() => onFail(score)} variant="ghost" size="lg">
                חזרה לקריאה
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">🧠 מבחן מילים</h2>
      <Progress value={((idx + 1) / questions.length) * 100} className="h-2" />
      <p className="text-sm text-muted-foreground text-center">
        שאלה {idx + 1} מתוך {questions.length}
      </p>
      <Card className="p-8 bg-white text-center">
        <p className="text-sm text-muted-foreground mb-2">מה הפירוש באנגלית?</p>
        <div className="text-4xl font-bold mb-6" style={{ color: loc.accent }}>
          {q.word}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((opt) => {
            const isCorrect = opt === q.correct;
            const isPicked = picked === opt;
            const reveal = picked !== null;
            return (
              <button
                key={opt}
                onClick={() => choose(opt)}
                disabled={!!picked}
                className={`p-4 rounded-xl border-2 text-lg font-medium transition ${
                  reveal && isCorrect
                    ? "bg-green-100 border-green-500 text-green-800"
                    : reveal && isPicked
                    ? "bg-red-100 border-red-500 text-red-800"
                    : "bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ----------------------------- Step 3: Exercises -----------------------------
function normalize(s: string) {
  return s.replace(/[\s.,!?"׳']/g, "").trim();
}

function ExBlanks({ loc, onComplete }: { loc: Location; onComplete: () => void }) {
  const [answers, setAnswers] = useState<string[]>(loc.blanks.map(() => ""));
  const [checked, setChecked] = useState(false);

  const correctCount = loc.blanks.filter((b, i) => normalize(b.answer) === normalize(answers[i])).length;

  return (
    <div className="space-y-3">
      {loc.blanks.map((b, i) => {
        const ok = checked && normalize(b.answer) === normalize(answers[i]);
        const bad = checked && !ok && answers[i];
        return (
          <Card key={i} className="p-4 bg-white">
            <p className="mb-2 text-lg" style={{ lineHeight: 1.8 }}>
              {b.sentence.split("___").map((part, j, arr) => (
                <span key={j}>
                  {part}
                  {j < arr.length - 1 && (
                    <Input
                      value={answers[i]}
                      onChange={(e) => {
                        const next = [...answers];
                        next[i] = e.target.value;
                        setAnswers(next);
                      }}
                      dir="rtl"
                      className={`inline-block w-32 mx-2 text-center ${ok ? "border-green-500 bg-green-50" : bad ? "border-red-500 bg-red-50" : ""}`}
                    />
                  )}
                </span>
              ))}
            </p>
            {checked && !ok && <p className="text-sm text-muted-foreground">תשובה נכונה: <b>{b.answer}</b></p>}
          </Card>
        );
      })}
      <div className="flex justify-between items-center">
        <div className="text-sm">
          {checked && (
            <span className="font-bold" style={{ color: loc.accent }}>
              {correctCount} / {loc.blanks.length} נכונות
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setChecked(false); setAnswers(loc.blanks.map(() => "")); }}>נקה</Button>
          <Button
            onClick={() => {
              setChecked(true);
              if (correctCount >= Math.ceil(loc.blanks.length * 0.6)) onComplete();
            }}
            style={{ background: loc.accent }}
            className="text-white"
          >
            בדוק תשובות
          </Button>
        </div>
      </div>
    </div>
  );
}

function ExMatching({ loc, onComplete }: { loc: Location; onComplete: () => void }) {
  const [heCol] = useState(() => shuffle(loc.matching));
  const [enCol] = useState(() => shuffle(loc.matching));
  const [pickedHe, setPickedHe] = useState<string | null>(null);
  const [pickedEn, setPickedEn] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({}); // hebrew -> english

  useEffect(() => {
    if (pickedHe && pickedEn) {
      const correct = loc.matching.find((v) => v.hebrew === pickedHe)?.english === pickedEn;
      if (correct) {
        setMatched((m) => ({ ...m, [pickedHe]: pickedEn }));
        setTimeout(() => { setPickedHe(null); setPickedEn(null); }, 300);
      } else {
        setTimeout(() => { setPickedHe(null); setPickedEn(null); }, 500);
      }
    }
  }, [pickedHe, pickedEn, loc.matching]);

  useEffect(() => {
    if (Object.keys(matched).length === loc.matching.length) onComplete();
  }, [matched, loc.matching.length, onComplete]);

  const colors = ["bg-blue-100", "bg-pink-100", "bg-yellow-100", "bg-green-100", "bg-purple-100", "bg-orange-100", "bg-teal-100", "bg-rose-100"];
  const colorOf = (heb: string) => colors[loc.matching.findIndex((v) => v.hebrew === heb) % colors.length];

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground text-center">
        חברו בין כל מילה בעברית לתרגום שלה באנגלית — {Object.keys(matched).length} / {loc.matching.length}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {heCol.map((v) => {
            const isMatched = !!matched[v.hebrew];
            const isPicked = pickedHe === v.hebrew;
            return (
              <button
                key={v.hebrew}
                disabled={isMatched}
                onClick={() => setPickedHe(v.hebrew)}
                className={`w-full p-3 rounded-xl border-2 font-bold text-lg transition ${
                  isMatched ? `${colorOf(v.hebrew)} border-green-500 opacity-70` : isPicked ? "border-purple-500 bg-purple-50" : "bg-white border-gray-200 hover:border-purple-300"
                }`}
              >
                {v.hebrew} {isMatched && "✓"}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {enCol.map((v) => {
            const matchedHeb = Object.entries(matched).find(([, en]) => en === v.english)?.[0];
            const isMatched = !!matchedHeb;
            const isPicked = pickedEn === v.english;
            return (
              <button
                key={v.english}
                disabled={isMatched}
                onClick={() => setPickedEn(v.english)}
                className={`w-full p-3 rounded-xl border-2 font-medium text-base transition ${
                  isMatched ? `${colorOf(matchedHeb!)} border-green-500 opacity-70` : isPicked ? "border-purple-500 bg-purple-50" : "bg-white border-gray-200 hover:border-purple-300"
                }`}
                dir="ltr"
              >
                {v.english} {isMatched && "✓"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ExComp({ loc, onComplete }: { loc: Location; onComplete: () => void }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = Object.keys(picked).length === loc.comprehension.length;
  const correctCount = loc.comprehension.filter((q, i) => picked[i] === q.correct).length;

  return (
    <div className="space-y-3">
      {loc.comprehension.map((q, i) => (
        <Card key={i} className="p-4 bg-white">
          <p className="font-bold mb-3 text-lg">{i + 1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, j) => {
              const isPicked = picked[i] === j;
              const ok = submitted && j === q.correct;
              const bad = submitted && isPicked && j !== q.correct;
              return (
                <button
                  key={j}
                  onClick={() => !submitted && setPicked((p) => ({ ...p, [i]: j }))}
                  disabled={submitted}
                  className={`w-full text-right p-3 rounded-lg border-2 transition ${
                    ok ? "bg-green-100 border-green-500" : bad ? "bg-red-100 border-red-500" : isPicked ? "bg-purple-50 border-purple-400" : "bg-white border-gray-200 hover:border-purple-300"
                  }`}
                >
                  {["א.", "ב.", "ג.", "ד."][j]} {opt}
                </button>
              );
            })}
          </div>
        </Card>
      ))}
      <div className="flex justify-between items-center">
        {submitted && (
          <span className="font-bold" style={{ color: loc.accent }}>
            {correctCount} / {loc.comprehension.length} נכונות
          </span>
        )}
        <Button
          disabled={!allAnswered || submitted}
          onClick={() => {
            setSubmitted(true);
            if (correctCount >= 2) onComplete();
          }}
          className="text-white mr-auto"
          style={{ background: loc.accent }}
        >
          בדוק תשובות
        </Button>
      </div>
    </div>
  );
}

function StepExercises({ loc, onNext }: { loc: Location; onNext: () => void }) {
  const [completed, setCompleted] = useState<Record<"a" | "b" | "c", boolean>>({ a: false, b: false, c: false });
  const completedCount = Object.values(completed).filter(Boolean).length;
  const canContinue = completedCount >= 2;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">✏️ תרגילים</h2>
      <p className="text-sm text-muted-foreground">השלימו לפחות 2 מתוך 3 כדי להמשיך · הושלמו {completedCount} / 3</p>
      <Tabs defaultValue="a">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="a">השלמת משפטים {completed.a && "✓"}</TabsTrigger>
          <TabsTrigger value="b">חיבור מילים {completed.b && "✓"}</TabsTrigger>
          <TabsTrigger value="c">שאלות הבנה {completed.c && "✓"}</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="mt-4">
          <ExBlanks loc={loc} onComplete={() => setCompleted((c) => ({ ...c, a: true }))} />
        </TabsContent>
        <TabsContent value="b" className="mt-4">
          <ExMatching loc={loc} onComplete={() => setCompleted((c) => ({ ...c, b: true }))} />
        </TabsContent>
        <TabsContent value="c" className="mt-4">
          <ExComp loc={loc} onComplete={() => setCompleted((c) => ({ ...c, c: true }))} />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
        <Button
          disabled={!canContinue}
          onClick={onNext}
          size="lg"
          className="text-white font-bold"
          style={{ background: canContinue ? loc.accent : undefined }}
        >
          {canContinue ? "המשך ←" : `נשארו ${2 - completedCount} תרגילים`}
        </Button>
      </div>
    </div>
  );
}

// ----------------------------- Step 4: Celebration -----------------------------
function StepCelebrate({ loc, quizScore, onBack }: { loc: Location; quizScore: number; onBack: () => void }) {
  const [confetti, setConfetti] = useState<Array<{ x: number; delay: number; emoji: string }>>([]);
  useEffect(() => {
    const items = Array.from({ length: 24 }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      emoji: i % 3 === 0 ? loc.completionEmoji : ["✨", "🎉", "⭐"][i % 3],
    }));
    setConfetti(items);
  }, [loc]);

  const share = async () => {
    const text = `סיימתי את היחידה "${loc.name}" במפת ישראל! ${loc.completionEmoji} ציון מבחן: ${quizScore}/8`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("הועתק ללוח!");
    } catch {
      toast.error("לא הצלחתי להעתיק");
    }
  };

  return (
    <div className="relative space-y-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {confetti.map((c, i) => (
          <div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${c.x}%`,
              top: "-40px",
              animation: `mapfall 2.5s ease-in ${c.delay}s forwards`,
            }}
          >
            {c.emoji}
          </div>
        ))}
      </div>
      <style>{`@keyframes mapfall { to { transform: translateY(110vh) rotate(540deg); opacity: 0; } }`}</style>

      <Card className="p-8 text-center bg-white relative z-10 border-2" style={{ borderColor: loc.accent }}>
        <div className="text-7xl mb-3">{loc.completionEmoji}</div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: loc.accent }}>
          ביקרת ב{loc.name}!
        </h2>
        <p className="text-lg text-muted-foreground mb-4" style={{ lineHeight: 1.7 }}>
          מבחן מילים: <b>{quizScore}/8</b> · תרגילים: ✓
        </p>
        <Card className="p-4 my-4 bg-gradient-to-br from-purple-50 to-pink-50 border-0">
          <p className="text-sm font-bold text-purple-700 mb-1">✨ ידעת ש...</p>
          <p className="text-base" style={{ lineHeight: 1.7 }}>{loc.funFact}</p>
        </Card>
        <div className="flex gap-2 justify-center flex-wrap">
          <Button onClick={onBack} size="lg" className="text-white" style={{ background: loc.accent }}>
            חזרה למפה ←
          </Button>
          <Button onClick={share} variant="outline" size="lg" className="gap-2">
            <Share2 className="h-4 w-4" /> שתף
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ----------------------------- Location module wrapper -----------------------------
type Step = "read" | "quiz" | "exercises" | "done";

function LocationModule({ loc, onClose, onComplete }: { loc: Location; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<Step>("read");
  const [quizScore, setQuizScore] = useState(0);
  const [exDone, setExDone] = useState(false);

  const stepNumber = step === "read" ? 1 : step === "quiz" ? 2 : step === "exercises" ? 3 : 4;

  return (
    <div dir="rtl" className="min-h-screen p-4 md:p-6 animate-fade-in" style={{ background: `linear-gradient(135deg, ${loc.accent}15, #fff 60%, ${loc.accent}10)` }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" onClick={onClose} className="gap-2">
            <ArrowRight className="h-4 w-4" /> חזרה למפה
          </Button>
          <Badge className="text-white text-base px-3 py-1" style={{ background: loc.accent }}>
            {loc.emoji} {loc.name}
          </Badge>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-6 justify-center">
          {[1, 2, 3, 4].map((n) => {
            const reached = n <= stepNumber;
            return (
              <div
                key={n}
                className={`h-2 flex-1 rounded-full transition ${reached ? "" : "bg-gray-200"}`}
                style={reached ? { background: loc.accent } : undefined}
              />
            );
          })}
        </div>

        {step === "read" && <StepRead loc={loc} onNext={() => setStep("quiz")} />}
        {step === "quiz" && (
          <StepQuiz
            loc={loc}
            onPass={(s) => { setQuizScore(s); setStep("exercises"); }}
            onFail={(s) => { setQuizScore(s); setStep("read"); }}
          />
        )}
        {step === "exercises" && (
          <StepExercises loc={loc} onNext={() => { setExDone(true); setStep("done"); }} />
        )}
        {step === "done" && exDone && (
          <StepCelebrate loc={loc} quizScore={quizScore} onBack={() => { onComplete(); onClose(); }} />
        )}
      </div>
    </div>
  );
}

// ----------------------------- Map view -----------------------------
function IsraelMap({ progress, onPick }: { progress: Record<string, boolean>; onPick: (loc: Location) => void }) {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[2/3]">
      <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-lg">
        {/* Sea (Mediterranean) */}
        <rect x="0" y="0" width="100" height="150" fill="#dbeafe" />
        {/* Israel land — simplified silhouette */}
        <path
          d="M28 5 L42 6 L48 12 L55 18 L58 26 L52 34 L55 42 L60 48 L58 56 L55 65 L52 75 L48 85 L45 95 L42 105 L40 115 L42 125 L45 135 L42 142 L38 145 L34 142 L30 132 L28 120 L26 108 L24 95 L22 82 L20 70 L18 58 L17 48 L18 38 L20 28 L22 18 L25 10 Z"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="0.6"
        />
        {/* Sea of Galilee */}
        <ellipse cx="50" cy="22" rx="3" ry="4" fill="#93c5fd" />
        {/* Dead Sea */}
        <ellipse cx="50" cy="65" rx="2.5" ry="6" fill="#5eead4" opacity="0.8" />
        {/* Red Sea tip at bottom */}
        <path d="M30 145 L50 145 L45 150 L35 150 Z" fill="#fca5a5" opacity="0.6" />
      </svg>

      {/* Pins overlay */}
      {LOCATIONS.map((loc) => {
        const done = !!progress[loc.id];
        return (
          <button
            key={loc.id}
            onClick={() => onPick(loc)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
            aria-label={loc.name}
          >
            <div className="relative">
              {!done && (
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: loc.accent, opacity: 0.4 }}
                />
              )}
              <div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center text-2xl border-4 border-white shadow-lg transition-transform group-hover:scale-110 ${done ? "" : ""}`}
                style={{ background: done ? loc.accent : "#fff", color: done ? "#fff" : loc.accent, borderColor: done ? "#fff" : loc.accent }}
              >
                {done ? <CheckCircle2 className="h-6 w-6" /> : loc.emoji}
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-xs font-bold bg-white/95 px-2 py-0.5 rounded-full shadow border" style={{ color: loc.accent, borderColor: loc.accent + "60" }}>
                {loc.name}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ----------------------------- Main page -----------------------------
export default function MapOfIsrael() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<Location | null>(null);

  useEffect(() => { setProgress(loadProgress()); }, []);

  const doneCount = Object.values(progress).filter(Boolean).length;
  const allDone = doneCount === LOCATIONS.length;

  const markDone = (id: string) => {
    const next = { ...progress, [id]: true };
    setProgress(next);
    saveProgress(next);
  };

  const resetAll = () => {
    setProgress({});
    saveProgress({});
    toast.success("האיפוס בוצע");
  };

  if (active) {
    return (
      <LocationModule
        loc={active}
        onClose={() => setActive(null)}
        onComplete={() => markDone(active.id)}
      />
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-amber-50 via-blue-50 to-emerald-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <a href="#/" >
            <Button variant="outline" className="gap-2">
              <ArrowRight className="h-4 w-4" /> חזרה לתפריט
            </Button>
          </a>
          <Button variant="ghost" size="sm" onClick={resetAll} className="gap-1" aria-label="איפוס">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-amber-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            🗺️ מפת ישראל
          </h1>
          <p className="text-base md:text-lg text-muted-foreground" style={{ lineHeight: 1.7 }}>
            לחצו על נקודה במפה כדי ללמוד על המקום, אוצר מילים וסיפור קצר.
          </p>
          <div className="mt-3 inline-block bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow border-2 border-amber-200">
            <span className="font-bold text-amber-700">
              ביקרת ב־{doneCount} מתוך {LOCATIONS.length} מקומות
            </span>
          </div>
        </div>

        {allDone && (
          <Card className="p-6 mb-6 text-center bg-gradient-to-r from-blue-100 via-amber-100 to-emerald-100 border-2 border-amber-300">
            <div className="text-5xl mb-2">🇮🇱</div>
            <h2 className="text-2xl font-bold mb-1">סיירת ישראל!</h2>
            <p className="text-base" style={{ lineHeight: 1.7 }}>
              כל הכבוד — סיימת את כל חמשת המקומות במפה. אתם מומחים אמיתיים לעברית בשטח!
            </p>
          </Card>
        )}

        <Card className="p-4 md:p-6 bg-white/70 backdrop-blur shadow-xl border-2 border-amber-100">
          <IsraelMap progress={progress} onPick={setActive} />
        </Card>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">
          {LOCATIONS.map((loc) => {
            const done = !!progress[loc.id];
            return (
              <button
                key={loc.id}
                onClick={() => setActive(loc)}
                className={`p-3 rounded-xl border-2 bg-white text-center transition hover:-translate-y-0.5 ${done ? "opacity-90" : ""}`}
                style={{ borderColor: loc.accent + "60" }}
              >
                <div className="text-2xl mb-1">{done ? "✅" : loc.emoji}</div>
                <div className="text-sm font-bold" style={{ color: loc.accent }}>{loc.name}</div>
                {done && <div className="text-[10px] text-muted-foreground mt-0.5">הושלם</div>}
                {!done && <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center justify-center gap-1"><Lock className="h-3 w-3" /> טרם בוקר</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
