import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// עדכון הקטגוריות עם label באנגלית
const categories = [
  {
    key: "addition",
    label: "הוספה",
    englishLabel: "Addition",
    emoji: "🟩",
    color: "bg-green-100 text-green-900 border-green-300",
    rows: [
      {
        hebrew: "גם",
        translit: "gam",
        english: "also",
        hebrewExample: "אני אוהב קפה וגם תה.",
        englishExample: "I like coffee and also tea.",
      },
      {
        hebrew: "בנוסף",
        translit: "benosaf",
        english: "in addition",
        hebrewExample: "בנוסף למה שאמרת, יש עוד בעיה.",
        englishExample: "In addition to what you said, there is another problem.",
      },
      {
        hebrew: "כמו כן",
        translit: "kmo ken",
        english: "likewise",
        hebrewExample: "הוא הגיע בזמן, כמו כן היא.",
        englishExample: "He arrived on time, likewise she did.",
      },
    ],
  },
  {
    key: "contrast",
    label: "ניגוד",
    englishLabel: "Contrast",
    emoji: "🟦",
    color: "bg-blue-100 text-blue-900 border-blue-300",
    rows: [
      {
        hebrew: "אבל",
        translit: "aval",
        english: "but",
        hebrewExample: "רציתי לבוא, אבל איחרתי.",
        englishExample: "I wanted to come, but I was late.",
      },
      {
        hebrew: "לעומת זאת",
        translit: "le’umat zot",
        english: "on the other hand",
        hebrewExample: "הוא שקט, לעומת זאת אחיו רועש.",
        englishExample: "He is quiet, on the other hand his brother is loud.",
      },
      {
        hebrew: "עם זאת",
        translit: "im zot",
        english: "however",
        hebrewExample: "זה יקר, עם זאת זה איכותי.",
        englishExample: "It’s expensive, however it’s high quality.",
      },
    ],
  },
  {
    key: "cause",
    label: "סיבה ותוצאה",
    englishLabel: "Cause and Effect",
    emoji: "🟨",
    color: "bg-yellow-100 text-yellow-900 border-yellow-300",
    rows: [
      {
        hebrew: "בגלל",
        translit: "biglal",
        english: "because of",
        hebrewExample: "איחרתי בגלל הגשם.",
        englishExample: "I was late because of the rain.",
      },
      {
        hebrew: "לכן",
        translit: "lakhen",
        english: "therefore",
        hebrewExample: "עבדתי קשה, לכן הצלחתי.",
        englishExample: "I worked hard, therefore I succeeded.",
      },
      {
        hebrew: "משום כך",
        translit: "mishum kach",
        english: "for that reason",
        hebrewExample: "היה עומס, משום כך יצאנו מוקדם.",
        englishExample: "There was traffic, for that reason we left early.",
      },
    ],
  },
  {
    key: "condition",
    label: "תנאי",
    englishLabel: "Condition",
    emoji: "🟧",
    color: "bg-orange-100 text-orange-900 border-orange-300",
    rows: [
      {
        hebrew: "אם",
        translit: "im",
        english: "if",
        hebrewExample: "אם תבוא – אשמח.",
        englishExample: "If you come – I’ll be happy.",
      },
      {
        hebrew: "במקרה ש",
        translit: "bemikreh she",
        english: "in case",
        hebrewExample: "במקרה שתאחר, תודיע.",
        englishExample: "In case you are late, let me know.",
      },
      {
        hebrew: "אלא אם כן",
        translit: "ela im ken",
        english: "unless",
        hebrewExample: "נלך אלא אם כן ירד גשם.",
        englishExample: "We'll go unless it rains.",
      },
    ],
  },
  {
    key: "time",
    label: "זמן",
    englishLabel: "Time",
    emoji: "🟥",
    color: "bg-red-100 text-red-900 border-red-300",
    rows: [
      {
        hebrew: "כאשר",
        translit: "ka’asher",
        english: "when",
        hebrewExample: "כאשר אני לומד – אני מרוכז.",
        englishExample: "When I study – I’m focused.",
      },
      {
        hebrew: "בזמן ש",
        translit: "bizman she",
        english: "while",
        hebrewExample: "בזמן שהיא בישלה, הוא ניקה.",
        englishExample: "While she cooked, he cleaned.",
      },
      {
        hebrew: "לפני ש",
        translit: "lifnei she",
        english: "before",
        hebrewExample: "לפני שאתה הולך – תגיד שלום.",
        englishExample: "Before you leave – say goodbye.",
      },
    ],
  },
  {
    key: "purpose",
    label: "מטרה",
    englishLabel: "Purpose",
    emoji: "🟪",
    color: "bg-purple-100 text-purple-900 border-purple-300",
    rows: [
      {
        hebrew: "כדי",
        translit: "kedei",
        english: "in order to",
        hebrewExample: "אני לומד כדי להצליח.",
        englishExample: "I study in order to succeed.",
      },
      {
        hebrew: "בשביל",
        translit: "bishvil",
        english: "for (the sake of)",
        hebrewExample: "הוא עשה את זה בשביל חברו.",
        englishExample: "He did it for his friend.",
      },
      {
        hebrew: "על מנת",
        translit: "al menat",
        english: "so that",
        hebrewExample: "על מנת להבין – צריך לקרוא שוב.",
        englishExample: "So that you understand – you must read again.",
      },
    ],
  },
  {
    key: "everyday",
    label: "עברית יומיומית",
    englishLabel: "Everyday Hebrew",
    emoji: "🟫",
    color: "bg-stone-100 text-stone-900 border-stone-300",
    rows: [
      {
        hebrew: "בסדר",
        translit: "beseder",
        english: "okay / fine",
        hebrewExample: "הכול בסדר, תודה.",
        englishExample: "Everything is okay, thanks.",
      },
      {
        hebrew: "אפשר",
        translit: "efshar",
        english: "may I / can I",
        hebrewExample: "אפשר לקבל כוס מים?",
        englishExample: "May I get a glass of water?",
      },
      {
        hebrew: "תודה",
        translit: "toda",
        english: "thank you",
        hebrewExample: "תודה על העזרה.",
        englishExample: "Thank you for the help.",
      },
      {
        hebrew: "סליחה",
        translit: "slikha",
        english: "sorry / excuse me",
        hebrewExample: "סליחה, אפשר לעבור?",
        englishExample: "Excuse me, may I pass?",
      },
      {
        hebrew: "בבקשה",
        translit: "bevakasha",
        english: "please / here you go",
        hebrewExample: "תיכנס, בבקשה.",
        englishExample: "Come in, please.",
      },
      {
        hebrew: "מה נשמע?",
        translit: "ma nishma?",
        english: "how's it going?",
        hebrewExample: "היי! מה נשמע?",
        englishExample: "Hi! How's it going?",
      },
      {
        hebrew: "אין בעיה",
        translit: "ein be'aya",
        english: "no problem",
        hebrewExample: "אין בעיה, אעשה זאת.",
        englishExample: "No problem, I'll do it.",
      },
    ]
  }
];

const LinkingWordsTable = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

  const currentCat = categories.find((c) => c.key === selectedCategory)!;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border p-4 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-3 text-center" dir="rtl">
        מילות קישור לפי קטגוריות – עברית, תרגום, תעתיק ודוגמאות
      </h2>
      {/* טאבים – קטגוריות */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-bold text-lg transition focus:outline-none",
              cat.key === selectedCategory
                ? `${cat.color} ring-2 ring-offset-2`
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
            )}
            onClick={() => setSelectedCategory(cat.key)}
            aria-current={cat.key === selectedCategory}
            title={`${cat.label} (${cat.englishLabel})`}
          >
            <span className="text-xl">{cat.emoji}</span>
            <span dir="rtl">
              {cat.label} <span className="text-gray-500 text-base">({cat.englishLabel})</span>
            </span>
          </button>
        ))}
      </div>
      {/* כותרת קטגוריה עם תרגום */}
      <div className="text-xl font-bold my-3 flex justify-center items-center gap-2">
        <span className="text-2xl">{currentCat.emoji}</span>
        <span dir="rtl">
          {currentCat.label} <span className="text-gray-600 text-lg">({currentCat.englishLabel})</span>
        </span>
      </div>
      {/* טבלה */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg text-right" dir="rtl">עברית</TableHead>
              <TableHead className="text-lg text-left">English</TableHead>
              <TableHead className="text-lg text-left">Transliteration</TableHead>
              <TableHead className="text-lg text-right" dir="rtl">דוגמה בעברית</TableHead>
              <TableHead className="text-lg text-left">English Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCat.rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-bold text-lg text-blue-900" dir="rtl">{row.hebrew}</TableCell>
                <TableCell>{row.english}</TableCell>
                <TableCell className="font-mono">{row.translit}</TableCell>
                <TableCell dir="rtl">{row.hebrewExample}</TableCell>
                <TableCell>{row.englishExample}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LinkingWordsTable;
