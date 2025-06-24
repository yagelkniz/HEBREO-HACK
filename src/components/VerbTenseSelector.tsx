
import { Button } from "@/components/ui/button";

interface VerbTenseSelectorProps {
  lang: "he" | "en";
  onBack: () => void;
  onSelectTense: (tense: "present" | "past" | "future") => void;
}

export default function VerbTenseSelector({ lang, onBack, onSelectTense }: VerbTenseSelectorProps) {
  const t = (he: string, en: string) => (lang === "he" ? he : en);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          ⬅ {t("חזרה", "Back")}
        </Button>
        <h2 className="text-2xl font-bold mb-6 text-center" dir={lang === "he" ? "rtl" : "ltr"}>
          {t("בחר זמן לתרגול", "Choose tense to practice")}
        </h2>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => onSelectTense("present")}
            className="py-6 text-xl bg-blue-500 hover:bg-blue-600"
          >
            {t("זמן הווה", "Present tense")}
          </Button>
          <Button
            onClick={() => onSelectTense("past")}
            className="py-6 text-xl bg-green-500 hover:bg-green-600"
          >
            {t("זמן עבר", "Past tense")}
          </Button>
          <Button
            onClick={() => onSelectTense("future")}
            className="py-6 text-xl bg-purple-500 hover:bg-purple-600"
          >
            {t("זמן עתיד", "Future tense")}
          </Button>
        </div>
      </div>
    </div>
  );
}
