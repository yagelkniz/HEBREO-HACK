
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import PronounsTable from "./PronounsTable";
import PronounsPractice from "./PronounsPractice";

interface PronounsMenuProps {
  onBack?: () => void;
  lang?: "he" | "en";
}

export default function PronounsMenu({ onBack, lang: parentLang }: PronounsMenuProps) {
  const [showPractice, setShowPractice] = useState(false);
  const [lang, setLang] = useState<"he" | "en">(parentLang || "he");

  const t = (he: string, en: string) => (lang === "he" ? he : en);

  if (showPractice) {
    return (
      <PronounsPractice
        lang={lang}
        onBack={() => setShowPractice(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-4 p-6 bg-background rounded-2xl shadow border">
      <div className="flex justify-between w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLang(lang === "he" ? "en" : "he")}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          {lang === "he" ? "English" : "עברית"}
        </Button>
        <Button variant="outline" onClick={onBack}>
          ⬅ {t("חזרה", "Back")}
        </Button>
      </div>
      <h2 className="text-2xl font-bold mb-1 text-indigo-900" dir={lang === "he" ? "rtl" : "ltr"}>
        {t("טבלת שמות גוף (עברית-אנגלית)", "Pronouns Table (Hebrew–English)")}
      </h2>
      <div className="flex flex-col gap-4 w-full">
        <Button
          className="w-full text-lg py-4 bg-indigo-100 text-indigo-900 border-indigo-300"
          variant="outline"
          onClick={() => setShowPractice(false)}
        >
          {t("צפיה בטבלה", "View Table")}
        </Button>
        <Button
          className="w-full text-lg py-4 bg-violet-100 text-violet-900 border-violet-300"
          variant="outline"
          onClick={() => setShowPractice(true)}
        >
          {t("תרגול", "Practice")}
        </Button>
      </div>
      {!showPractice && (
        <div className="w-full flex justify-center">
          <PronounsTable />
        </div>
      )}
    </div>
  );
}
