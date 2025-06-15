
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const possessives = [
  {
    hebrew: "שלי",
    english: "My",
    translit: "sheli",
    hebrewExample: "זה הספר שלי.",
    englishExample: "This is my book.",
  },
  {
    hebrew: "שלך (זכר)",
    english: "Your (m. sg.)",
    translit: "shelkha",
    hebrewExample: "הכובע שלך יפה.",
    englishExample: "Your hat is nice.",
  },
  {
    hebrew: "שלך (נקבה)",
    english: "Your (f. sg.)",
    translit: "shelakh",
    hebrewExample: "המחברת שלך על השולחן.",
    englishExample: "Your notebook is on the table.",
  },
  {
    hebrew: "שלו",
    english: "His",
    translit: "shelo",
    hebrewExample: "התיק שלו על הכיסא.",
    englishExample: "His bag is on the chair.",
  },
  {
    hebrew: "שלה",
    english: "Her",
    translit: "shela",
    hebrewExample: "הטלפון שלה חדש.",
    englishExample: "Her phone is new.",
  },
  {
    hebrew: "שלנו",
    english: "Our",
    translit: "shelanu",
    hebrewExample: "הבית שלנו גדול.",
    englishExample: "Our house is big.",
  },
  {
    hebrew: "שלכם",
    english: "Your (m. pl.)",
    translit: "shelakhem",
    hebrewExample: "המבחנים שלכם קשים.",
    englishExample: "Your (m. pl.) exams are hard.",
  },
  {
    hebrew: "שלכן",
    english: "Your (f. pl.)",
    translit: "shelakhen",
    hebrewExample: "החברות שלכן נחמדות.",
    englishExample: "Your (f. pl.) friends are nice.",
  },
  {
    hebrew: "שלהם",
    english: "Their (m.)",
    translit: "shelahem",
    hebrewExample: "הספרים שלהם בספרייה.",
    englishExample: "Their (m.) books are in the library.",
  },
  {
    hebrew: "שלהן",
    english: "Their (f.)",
    translit: "shelahen",
    hebrewExample: "הדעות שלהן שונות.",
    englishExample: "Their (f.) opinions are different.",
  },
];

const PossessivePronounsTable = () => (
  <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow border p-4 md:p-8 mt-6">
    <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center" dir="rtl">
      מילות שייכות בעברית עם תרגום ודוגמאות
    </h2>
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
          {possessives.map((row, idx) => (
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

export default PossessivePronounsTable;
