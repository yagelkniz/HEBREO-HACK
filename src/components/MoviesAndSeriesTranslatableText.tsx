
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Volume2 } from "lucide-react";

import { speakHebrew } from "@/lib/speakHebrew";

const speakWord = (word: string) => speakHebrew(word);

// מזהה מחרוזות כמו "מילה (פירוש באנגלית)" או סתם מילה רגילה
const wordRegex = /([א-תa-zA-Z"׳"\-’'.]+?)\s*\(([^)]+)\)|([^\s]+)/g;

// text is regular reading text as appears in MoviesAndSeriesReadingData
// תצוגה מעניקה לכל מילה שיש לה פירוש tooltip + אפשרות לקריאה (אייקון רמקול קטן)
export default function MoviesAndSeriesTranslatableText({ text }: { text: string }) {
  // אינדקס רץ למפתחי react
  let idx = 0;
  // מפצל לחלקים לפי regex: [עברית] ([פירוש באנגלית])   או   מילים רגילות
  const parts: { 
    word: string;
    english?: string;
  }[] = [];

  let match;
  while ((match = wordRegex.exec(text))) {
    if (match[1] && match[2]) {
      // בזיהוי מילה עם פירוש
      parts.push({ word: match[1], english: match[2] });
    } else if (match[3]) {
      // מילה רגילה (ללא פירוש)
      parts.push({ word: match[3] });
    }
  }

  return (
    <span 
      dir="rtl" 
      className="leading-loose text-lg md:text-xl whitespace-pre-wrap text-right block"
      style={{ lineHeight: '1.8' }}
    >
      {parts.map((part, i) =>
        part.english ? (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                className="relative cursor-pointer font-semibold text-blue-900 px-1 transition hover:bg-blue-100 hover:underline rounded inline-flex items-center group"
                aria-label={`פירוש: ${part.english}`}
                onClick={() => speakWord(part.word)}
                style={{ outline: "none" }}
              >
                <span>{part.word}</span>
                <Volume2
                  className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-95 text-blue-300"
                  aria-label="לשמוע"
                  tabIndex={-1}
                  onClick={e => {
                    e.stopPropagation();
                    speakWord(part.word);
                  }}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="bg-blue-100 text-blue-900 border-blue-400 font-bold"
              dir="ltr"
            >
              {part.english}
            </TooltipContent>
          </Tooltip>
        ) : (
          <span key={i} className="px-[0.1em]">{part.word}</span>
        )
      )}
    </span>
  );
}
