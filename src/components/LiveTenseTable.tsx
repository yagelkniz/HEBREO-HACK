import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Volume2 } from "lucide-react";
import { speakHebrew } from "@/lib/speakHebrew";

interface LiveTenseTableProps {
  onBack: () => void;
  lang: "he" | "en";
}

interface VerbEntry {
  infinitive: string;
  meaning: { he: string; en: string };
  past: { ani: string; ata: string; at: string; hu: string; hi: string; anachnu: string; atem: string; hem: string };
  present: { mS: string; fS: string; mP: string; fP: string };
  future: { ani: string; ata: string; at: string; hu: string; hi: string; anachnu: string; atem: string; hem: string };
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
];

export default function LiveTenseTable({ onBack, lang }: LiveTenseTableProps) {
  const [selected, setSelected] = useState(0);
  const isHe = lang === "he";
  const verb = VERBS[selected];

  const t = (he: string, en: string) => (isHe ? he : en);

  const Speak = ({ text }: { text: string }) => (
    <button onClick={(e) => { e.stopPropagation(); speakHebrew(text); }}
      className="ml-1 inline-flex opacity-60 hover:opacity-100 transition-opacity" aria-label="Listen">
      <Volume2 size={14} />
    </button>
  );

  const Cell = ({ text }: { text: string }) => (
    <TableCell className="text-base font-medium" dir="rtl">
      <button onClick={() => speakHebrew(text)} className="hover:text-purple-600 transition-colors text-right">
        {text}
      </button>
      <Speak text={text} />
    </TableCell>
  );

  return (
    <div dir={isHe ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4" style={{ fontFamily: "'Heebo', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
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
            <button key={v.infinitive} onClick={() => setSelected(i)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                selected === i
                  ? "bg-purple-600 text-white border-purple-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"
              }`}>
              {v.infinitive} {selected === i && <span className="opacity-80">· {v.meaning.en}</span>}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-purple-700" dir="rtl">{verb.infinitive}</div>
            <div className="text-sm text-gray-500">{verb.meaning.en}</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => speakHebrew(verb.infinitive)}>
            <Volume2 size={16} className="mr-1" /> {t("השמע", "Listen")}
          </Button>
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
                <TableRow><TableCell>{t("אני", "I")}</TableCell><Cell text={verb.past.ani} /><Cell text={verb.past.ani} /></TableRow>
                <TableRow><TableCell>{t("אתה / את", "you")}</TableCell><Cell text={verb.past.ata} /><Cell text={verb.past.at} /></TableRow>
                <TableRow><TableCell>{t("הוא / היא", "he / she")}</TableCell><Cell text={verb.past.hu} /><Cell text={verb.past.hi} /></TableRow>
                <TableRow><TableCell>{t("אנחנו", "we")}</TableCell><Cell text={verb.past.anachnu} /><Cell text={verb.past.anachnu} /></TableRow>
                <TableRow><TableCell>{t("אתם / הם", "you pl. / they")}</TableCell><Cell text={verb.past.atem} /><Cell text={verb.past.hem} /></TableRow>
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
                <TableRow><TableCell>{t("יחיד", "Singular")}</TableCell><Cell text={verb.present.mS} /><Cell text={verb.present.fS} /></TableRow>
                <TableRow><TableCell>{t("רבים", "Plural")}</TableCell><Cell text={verb.present.mP} /><Cell text={verb.present.fP} /></TableRow>
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
                <TableRow><TableCell>{t("אני", "I")}</TableCell><Cell text={verb.future.ani} /><Cell text={verb.future.ani} /></TableRow>
                <TableRow><TableCell>{t("אתה / את", "you")}</TableCell><Cell text={verb.future.ata} /><Cell text={verb.future.at} /></TableRow>
                <TableRow><TableCell>{t("הוא / היא", "he / she")}</TableCell><Cell text={verb.future.hu} /><Cell text={verb.future.hi} /></TableRow>
                <TableRow><TableCell>{t("אנחנו", "we")}</TableCell><Cell text={verb.future.anachnu} /><Cell text={verb.future.anachnu} /></TableRow>
                <TableRow><TableCell>{t("אתם / הם", "you pl. / they")}</TableCell><Cell text={verb.future.atem} /><Cell text={verb.future.hem} /></TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
}
