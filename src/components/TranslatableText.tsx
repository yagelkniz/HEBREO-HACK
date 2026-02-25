import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Volume2 } from "lucide-react";
import { speakHebrew } from "@/lib/speakHebrew";
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
    <span 
      dir="rtl" 
      className="leading-loose text-lg md:text-xl whitespace-pre-wrap text-right block"
      style={{ lineHeight: '1.8' }}
    >
      {words.map((rawWord, idx) => {
        // ניקיון תווים מסוימים לבדיקת תרגום
        const cleanWord = rawWord.replace(/[.,!?\"'־–;:]/g, "");
        const translate = translations[cleanWord];
        if (translate) {
          return (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <span
                  className="relative cursor-pointer font-semibold text-blue-900 px-1 transition hover:bg-blue-100 hover:underline rounded inline-flex items-center gap-0.5"
                  tabIndex={0}
                  aria-label={`תרגום: ${translate}`}
                  onClick={() => speakHebrew(cleanWord)}
                >
                  {rawWord}
                  <Volume2 className="inline w-3.5 h-3.5 opacity-50 hover:opacity-100 text-blue-400" />
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-blue-100 text-blue-900 border-blue-400 font-bold"
                dir="ltr"
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
