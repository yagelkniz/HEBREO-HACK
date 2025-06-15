
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type TranslationsMap = {
  [hebrewWord: string]: string;
};

interface Props {
  text: string;
  translations: TranslationsMap;
}

export default function TranslatableText({ text, translations }: Props) {
  // פיצול לפי רווחים ושימור פסיק/נקודה
  const words = text.split(/(\s+)/);

  return (
    <span dir="rtl" className="leading-8 flex flex-wrap gap-y-[0.15em]">
      {words.map((rawWord, idx) => {
        // ניקיון תווים מסוימים לבדיקת תרגום
        const cleanWord = rawWord.replace(/[.,!?\"'־–;:]/g, "");
        const translate = translations[cleanWord];
        if (translate) {
          return (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <span
                  className="relative cursor-pointer font-semibold text-blue-900 px-1 transition hover:bg-blue-100 hover:underline rounded"
                  tabIndex={0}
                  aria-label={`תרגום: ${translate}`}
                >
                  {rawWord}
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-blue-100 text-blue-900 border-blue-400 font-bold"
              >
                {translate}
              </TooltipContent>
            </Tooltip>
          );
        }
        // מילות רווח לא "מפורשות"
        return <span key={idx}>{rawWord}</span>;
      })}
    </span>
  );
}
