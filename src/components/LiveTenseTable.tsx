import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Volume2, Eye, EyeOff, RotateCcw, Star } from "lucide-react";
import { speakHebrew } from "@/lib/speakHebrew";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LiveTenseTableProps {
  onBack: () => void;
  lang: "he" | "en";
}

interface VerbEntry {
  infinitive: string;
  meaning: { he: string; en: string };
  enBases?: { past: string; present: string; future: string };
  past: { ani: string; ata: string; at: string; hu: string; hi: string; anachnu: string; atem: string; hem: string };
  present: { mS: string; fS: string; mP: string; fP: string };
  future: { ani: string; ata: string; at: string; hu: string; hi: string; anachnu: string; atem: string; hem: string };
}

const EN_BASES: Record<string, { past: string; present: string; future: string }> = {
  "לאכול": { past: "ate", present: "eat", future: "eat" },
  "ללמוד": { past: "learned", present: "learn", future: "learn" },
  "לכתוב": { past: "wrote", present: "write", future: "write" },
  "לדבר":  { past: "spoke", present: "speak", future: "speak" },
  "לרוץ":  { past: "ran", present: "run", future: "run" },
  "לשתות": { past: "drank", present: "drink", future: "drink" },
  "לישון": { past: "slept", present: "sleep", future: "sleep" },
  "לקרוא": { past: "read", present: "read", future: "read" },
  "ללכת":  { past: "went", present: "go", future: "go" },
  "לבוא":  { past: "came", present: "come", future: "come" },
  "לראות": { past: "saw", present: "see", future: "see" },
  "לעשות": { past: "did", present: "do", future: "do" },
};

const SUBJECTS: Record<string, string> = {
  ani: "I", ata: "you (m.)", at: "you (f.)", hu: "he", hi: "she",
  anachnu: "we", atem: "you (pl.)", hem: "they",
};

const PRESENT_LABEL: Record<string, string> = {
  mS: "(m. sg.)", fS: "(f. sg.)", mP: "(m. pl.)", fP: "(f. pl.)",
};

function translateSlot(verb: VerbEntry, id: string): string {
  const bases = EN_BASES[verb.infinitive];
  if (!bases) return "";
  const [tense, slot] = id.split(".");
  if (tense === "past") {
    const subj = SUBJECTS[slot] ?? "";
    return `${subj} ${bases.past}`;
  }
  if (tense === "future") {
    const subj = SUBJECTS[slot] ?? "";
    return `${subj} will ${bases.future}`;
  }
  if (tense === "present") {
    return `${bases.present} ${PRESENT_LABEL[slot] ?? ""}`.trim();
  }
  return "";
}

const VERBS: VerbEntry[] = [
  {
    infinitive: "לאכול",
    meaning: { he: "לאכול", en: "to eat" },
    past: { ani: "אכלתי", ata: "אכלת", at: "אכלת", hu: "אכל", hi: "אכלה", anachnu: "אכלנו", atem: "אכלתם", hem: "אכלו" },
    present: { mS: "אוכל", fS: "אוכלת", mP: "אוכלים", fP: "אוכלות" },
    future: { ani: "אוכל", ata: "תאכל", at: "תאכלי", hu: "יאכל", hi: "תאכל", anachnu: "נאכל", atem: "תאכלו", hem: "יאכלו" },
  },
  {
    infinitive: "ללמוד",
    meaning: { he: "ללמוד", en: "to learn / study" },
    past: { ani: "למדתי", ata: "למדת", at: "למדת", hu: "למד", hi: "למדה", anachnu: "למדנו", atem: "למדתם", hem: "למדו" },
    present: { mS: "לומד", fS: "לומדת", mP: "לומדים", fP: "לומדות" },
    future: { ani: "אלמד", ata: "תלמד", at: "תלמדי", hu: "ילמד", hi: "תלמד", anachnu: "נלמד", atem: "תלמדו", hem: "ילמדו" },
  },
  {
    infinitive: "לכתוב",
    meaning: { he: "לכתוב", en: "to write" },
    past: { ani: "כתבתי", ata: "כתבת", at: "כתבת", hu: "כתב", hi: "כתבה", anachnu: "כתבנו", atem: "כתבתם", hem: "כתבו" },
    present: { mS: "כותב", fS: "כותבת", mP: "כותבים", fP: "כותבות" },
    future: { ani: "אכתוב", ata: "תכתוב", at: "תכתבי", hu: "יכתוב", hi: "תכתוב", anachnu: "נכתוב", atem: "תכתבו", hem: "יכתבו" },
  },
  {
    infinitive: "לדבר",
    meaning: { he: "לדבר", en: "to speak" },
    past: { ani: "דיברתי", ata: "דיברת", at: "דיברת", hu: "דיבר", hi: "דיברה", anachnu: "דיברנו", atem: "דיברתם", hem: "דיברו" },
    present: { mS: "מדבר", fS: "מדברת", mP: "מדברים", fP: "מדברות" },
    future: { ani: "אדבר", ata: "תדבר", at: "תדברי", hu: "ידבר", hi: "תדבר", anachnu: "נדבר", atem: "תדברו", hem: "ידברו" },
  },
  {
    infinitive: "לרוץ",
    meaning: { he: "לרוץ", en: "to run" },
    past: { ani: "רצתי", ata: "רצת", at: "רצת", hu: "רץ", hi: "רצה", anachnu: "רצנו", atem: "רצתם", hem: "רצו" },
    present: { mS: "רץ", fS: "רצה", mP: "רצים", fP: "רצות" },
    future: { ani: "ארוץ", ata: "תרוץ", at: "תרוצי", hu: "ירוץ", hi: "תרוץ", anachnu: "נרוץ", atem: "תרוצו", hem: "ירוצו" },
  },
  {
    infinitive: "לשתות",
    meaning: { he: "לשתות", en: "to drink" },
    past: { ani: "שתיתי", ata: "שתית", at: "שתית", hu: "שתה", hi: "שתתה", anachnu: "שתינו", atem: "שתיתם", hem: "שתו" },
    present: { mS: "שותה", fS: "שותה", mP: "שותים", fP: "שותות" },
    future: { ani: "אשתה", ata: "תשתה", at: "תשתי", hu: "ישתה", hi: "תשתה", anachnu: "נשתה", atem: "תשתו", hem: "ישתו" },
  },
  {
    infinitive: "לישון",
    meaning: { he: "לישון", en: "to sleep" },
    past: { ani: "ישנתי", ata: "ישנת", at: "ישנת", hu: "ישן", hi: "ישנה", anachnu: "ישנו", atem: "ישנתם", hem: "ישנו" },
    present: { mS: "ישן", fS: "ישנה", mP: "ישנים", fP: "ישנות" },
    future: { ani: "אישן", ata: "תישן", at: "תישני", hu: "יישן", hi: "תישן", anachnu: "נישן", atem: "תישנו", hem: "יישנו" },
  },
  {
    infinitive: "לקרוא",
    meaning: { he: "לקרוא", en: "to read" },
    past: { ani: "קראתי", ata: "קראת", at: "קראת", hu: "קרא", hi: "קראה", anachnu: "קראנו", atem: "קראתם", hem: "קראו" },
    present: { mS: "קורא", fS: "קוראת", mP: "קוראים", fP: "קוראות" },
    future: { ani: "אקרא", ata: "תקרא", at: "תקראי", hu: "יקרא", hi: "תקרא", anachnu: "נקרא", atem: "תקראו", hem: "יקראו" },
  },
  {
    infinitive: "ללכת",
    meaning: { he: "ללכת", en: "to go / walk" },
    past: { ani: "הלכתי", ata: "הלכת", at: "הלכת", hu: "הלך", hi: "הלכה", anachnu: "הלכנו", atem: "הלכתם", hem: "הלכו" },
    present: { mS: "הולך", fS: "הולכת", mP: "הולכים", fP: "הולכות" },
    future: { ani: "אלך", ata: "תלך", at: "תלכי", hu: "ילך", hi: "תלך", anachnu: "נלך", atem: "תלכו", hem: "ילכו" },
  },
  {
    infinitive: "לבוא",
    meaning: { he: "לבוא", en: "to come" },
    past: { ani: "באתי", ata: "באת", at: "באת", hu: "בא", hi: "באה", anachnu: "באנו", atem: "באתם", hem: "באו" },
    present: { mS: "בא", fS: "באה", mP: "באים", fP: "באות" },
    future: { ani: "אבוא", ata: "תבוא", at: "תבואי", hu: "יבוא", hi: "תבוא", anachnu: "נבוא", atem: "תבואו", hem: "יבואו" },
  },
  {
    infinitive: "לראות",
    meaning: { he: "לראות", en: "to see" },
    past: { ani: "ראיתי", ata: "ראית", at: "ראית", hu: "ראה", hi: "ראתה", anachnu: "ראינו", atem: "ראיתם", hem: "ראו" },
    present: { mS: "רואה", fS: "רואה", mP: "רואים", fP: "רואות" },
    future: { ani: "אראה", ata: "תראה", at: "תראי", hu: "יראה", hi: "תראה", anachnu: "נראה", atem: "תראו", hem: "יראו" },
  },
  {
    infinitive: "לעשות",
    meaning: { he: "לעשות", en: "to do / make" },
    past: { ani: "עשיתי", ata: "עשית", at: "עשית", hu: "עשה", hi: "עשתה", anachnu: "עשינו", atem: "עשיתם", hem: "עשו" },
    present: { mS: "עושה", fS: "עושה", mP: "עושים", fP: "עושות" },
    future: { ani: "אעשה", ata: "תעשה", at: "תעשי", hu: "יעשה", hi: "תעשה", anachnu: "נעשה", atem: "תעשו", hem: "יעשו" },
  },
];


// All cell IDs in a stable order (used to pick which to hide in practice mode)
const ALL_CELL_IDS = [
  "past.ani.m", "past.ani.f", "past.ata", "past.at", "past.hu", "past.hi", "past.anachnu.m", "past.anachnu.f", "past.atem", "past.hem",
  "present.mS", "present.fS", "present.mP", "present.fP",
  "future.ani.m", "future.ani.f", "future.ata", "future.at", "future.hu", "future.hi", "future.anachnu.m", "future.anachnu.f", "future.atem", "future.hem",
];
const HIDE_RATIO = 0.4;

function pickHiddenSet(seed: number): Set<string> {
  // Deterministic shuffle based on seed so reshuffling re-renders consistently
  const shuffled = [...ALL_CELL_IDS].sort(() => Math.random() - 0.5);
  const count = Math.round(shuffled.length * HIDE_RATIO);
  return new Set(shuffled.slice(0, count));
}

export default function LiveTenseTable({ onBack, lang }: LiveTenseTableProps) {
  const [selected, setSelected] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [hardMarked, setHardMarked] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem("liveTenseTable.hardMarked");
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  });

  function toggleHard(key: string) {
    setHardMarked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      try { localStorage.setItem("liveTenseTable.hardMarked", JSON.stringify([...next])); } catch {}
      return next;
    });
  }
  const isHe = lang === "he";
  const verb = VERBS[selected];

  const t = (he: string, en: string) => (isHe ? he : en);

  const hiddenSet = useMemo(() => (practiceMode ? pickHiddenSet(sessionKey) : new Set<string>()), [practiceMode, sessionKey, selected]);

  function handleReshuffle() {
    setSessionKey((k) => k + 1);
    setRevealed(new Set());
  }

  function toggleReveal(id: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const Speak = ({ text }: { text: string }) => (
    <button onClick={(e) => { e.stopPropagation(); speakHebrew(text); }}
      className="ml-1 inline-flex opacity-60 hover:opacity-100 transition-opacity" aria-label="Listen">
      <Volume2 size={14} />
    </button>
  );

  function toggleHighlight(id: string) {
    setHighlighted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const Cell = ({ text, id }: { text: string; id: string }) => {
    const isHidden = hiddenSet.has(id) && !revealed.has(id);
    const isHi = highlighted.has(id);
    if (isHidden) {
      return (
        <TableCell className="text-base font-medium" dir="rtl">
          <button
            onClick={() => toggleReveal(id)}
            className="px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold border border-amber-300 transition-colors min-h-[36px] min-w-[60px]"
            aria-label={t("חשוף תשובה", "Reveal answer")}
          >
            ❓
          </button>
        </TableCell>
      );
    }
    const hardKey = `${verb.infinitive}|${id}`;
    const isHard = hardMarked.has(hardKey);
    return (
      <TableCell
        className={`text-base font-medium transition-colors cursor-pointer ${isHi ? "bg-yellow-200" : ""} ${isHard ? "ring-2 ring-inset ring-rose-300" : ""}`}
        dir="rtl"
        onClick={() => toggleHighlight(id)}
        title={translateSlot(verb, id) || t("לחצו לסימון בצהוב", "Click to highlight yellow")}
      >
        <button onClick={(e) => { e.stopPropagation(); speakHebrew(text); }} className="hover:text-purple-600 transition-colors text-right">
          {text}
        </button>
        <Speak text={text} />
        <button
          onClick={(e) => { e.stopPropagation(); toggleHard(hardKey); }}
          className={`ml-1 inline-flex transition-all ${isHard ? "text-amber-500" : "text-gray-300 hover:text-amber-400"}`}
          title={t("סמן כקשה לתלמיד", "Mark as hard for student")}
          aria-label={t("סמן כקשה", "Mark as hard")}
        >
          <Star size={14} fill={isHard ? "currentColor" : "none"} />
        </button>
        {hiddenSet.has(id) && revealed.has(id) && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleReveal(id); }}
            className="ml-1 inline-flex opacity-50 hover:opacity-100"
            title={t("הסתר שוב", "Hide again")}
          >
            <EyeOff size={12} />
          </button>
        )}
      </TableCell>
    );
  };

  return (
    <div dir={isHe ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Button variant="ghost" onClick={onBack}>⬅ {t("חזרה לתפריט", "Back to Menu")}</Button>
          <h1 className="text-xl md:text-2xl font-bold text-purple-700 flex items-center gap-2">
            📋 {t("טבלת זמנים חיה", "Live Tense Table")}
          </h1>
          <div className="w-24" />
        </div>

        <p className="text-sm text-gray-600 mb-4 text-center">
          {t("בחרו פועל וצפו בכל הנטיות בעבר, הווה ועתיד. לחצו על כל מילה כדי לשמוע אותה.",
             "Pick a verb and see all conjugations in past, present and future. Tap any word to hear it.")}
        </p>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {VERBS.map((v, i) => (
            <button key={v.infinitive} onClick={() => { setSelected(i); setRevealed(new Set()); }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                selected === i
                  ? "bg-purple-600 text-white border-purple-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"
              }`}>
              {v.infinitive} {selected === i && <span className="opacity-80">· {v.meaning.en}</span>}
            </button>
          ))}
        </div>

        {/* Practice mode controls */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 mb-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${practiceMode ? "bg-amber-50 border border-amber-200" : ""}`}>
              <Switch
                id="practice-mode"
                checked={practiceMode}
                onCheckedChange={(v) => { setPracticeMode(v); setRevealed(new Set()); setSessionKey((k) => k + 1); }}
              />
              <Label htmlFor="practice-mode" className="cursor-pointer font-semibold flex items-center gap-1">
                {practiceMode ? <EyeOff size={16} /> : <Eye size={16} />}
                {t("מצב תרגול 🔴 קשה", "Practice Mode 🔴 Hard")}
              </Label>
            </div>
            {practiceMode && (
              <span className="text-xs text-gray-500">
                {t("~40% מהתאים מוסתרים — לחצו ❓ לחשיפה", "~40% of cells hidden — tap ❓ to reveal")}
              </span>
            )}
          </div>
          {practiceMode && (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="default"
                size="sm"
                onClick={() => setRevealed(new Set(ALL_CELL_IDS))}
                className="min-h-[44px] bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                👁️ {t("גלה תשובה", "Reveal Answer")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleReshuffle} className="min-h-[44px]">
                <RotateCcw size={14} className="mr-1" /> {t("ערבב מחדש", "Reshuffle")}
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="text-2xl font-bold text-purple-700" dir="rtl">{verb.infinitive}</div>
            <div className="text-sm text-gray-500">{verb.meaning.en}</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => speakHebrew(verb.infinitive)} className="min-h-[44px]">
              <Volume2 size={16} className="mr-1" /> {t("השמע", "Listen")}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                const p = verb.past, pr = verb.present, f = verb.future;
                const fullText = [
                  "עבר.",
                  `אני ${p.ani}.`, `אתה ${p.ata}.`, `את ${p.at}.`,
                  `הוא ${p.hu}.`, `היא ${p.hi}.`,
                  `אנחנו ${p.anachnu}.`, `אתם ${p.atem}.`, `הם ${p.hem}.`,
                  "הווה.",
                  `${pr.mS}. ${pr.fS}. ${pr.mP}. ${pr.fP}.`,
                  "עתיד.",
                  `אני ${f.ani}.`, `אתה ${f.ata}.`, `את ${f.at}.`,
                  `הוא ${f.hu}.`, `היא ${f.hi}.`,
                  `אנחנו ${f.anachnu}.`, `אתם ${f.atem}.`, `הם ${f.hem}.`,
                ].join(" ");
                speakHebrew(fullText, 0.9);
              }}
              className="min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white"
            >
              🔊 {t("קרא בקול", "Read Aloud")}
            </Button>
          </div>
        </div>

        {/* Past */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-purple-600 mb-2">{t("עבר", "Past")}</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-right">{t("גוף", "Person")}</TableHead>
                  <TableHead className="text-right">{t("זכר", "Masculine")}</TableHead>
                  <TableHead className="text-right">{t("נקבה", "Feminine")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>{t("אני", "I")}</TableCell><Cell text={verb.past.ani} id="past.ani.m" /><Cell text={verb.past.ani} id="past.ani.f" /></TableRow>
                <TableRow><TableCell>{t("אתה / את", "you")}</TableCell><Cell text={verb.past.ata} id="past.ata" /><Cell text={verb.past.at} id="past.at" /></TableRow>
                <TableRow><TableCell>{t("הוא / היא", "he / she")}</TableCell><Cell text={verb.past.hu} id="past.hu" /><Cell text={verb.past.hi} id="past.hi" /></TableRow>
                <TableRow><TableCell>{t("אנחנו", "we")}</TableCell><Cell text={verb.past.anachnu} id="past.anachnu.m" /><Cell text={verb.past.anachnu} id="past.anachnu.f" /></TableRow>
                <TableRow><TableCell>{t("אתם / אתן / הם / הן", "you pl. / they")}</TableCell><Cell text={verb.past.atem} id="past.atem" /><Cell text={verb.past.hem} id="past.hem" /></TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Present */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-purple-600 mb-2">{t("הווה", "Present")}</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-right">{t("מספר", "Number")}</TableHead>
                  <TableHead className="text-right">{t("זכר", "Masculine")}</TableHead>
                  <TableHead className="text-right">{t("נקבה", "Feminine")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>{t("יחיד", "Singular")}</TableCell><Cell text={verb.present.mS} id="present.mS" /><Cell text={verb.present.fS} id="present.fS" /></TableRow>
                <TableRow><TableCell>{t("רבים", "Plural")}</TableCell><Cell text={verb.present.mP} id="present.mP" /><Cell text={verb.present.fP} id="present.fP" /></TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Future */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-purple-600 mb-2">{t("עתיד", "Future")}</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead className="text-right">{t("גוף", "Person")}</TableHead>
                  <TableHead className="text-right">{t("זכר", "Masculine")}</TableHead>
                  <TableHead className="text-right">{t("נקבה", "Feminine")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>{t("אני", "I")}</TableCell><Cell text={verb.future.ani} id="future.ani.m" /><Cell text={verb.future.ani} id="future.ani.f" /></TableRow>
                <TableRow><TableCell>{t("אתה / את", "you")}</TableCell><Cell text={verb.future.ata} id="future.ata" /><Cell text={verb.future.at} id="future.at" /></TableRow>
                <TableRow><TableCell>{t("הוא / היא", "he / she")}</TableCell><Cell text={verb.future.hu} id="future.hu" /><Cell text={verb.future.hi} id="future.hi" /></TableRow>
                <TableRow><TableCell>{t("אנחנו", "we")}</TableCell><Cell text={verb.future.anachnu} id="future.anachnu.m" /><Cell text={verb.future.anachnu} id="future.anachnu.f" /></TableRow>
                <TableRow><TableCell>{t("אתם / אתן / הם / הן", "you pl. / they")}</TableCell><Cell text={verb.future.atem} id="future.atem" /><Cell text={verb.future.hem} id="future.hem" /></TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
}
