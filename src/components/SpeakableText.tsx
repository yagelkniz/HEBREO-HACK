import React from "react";
import { Volume2 } from "lucide-react";
import { speakHebrew } from "@/lib/speakHebrew";
import { cn } from "@/lib/utils";

interface SpeakableTextProps {
  text: string;
  /** Display text (if different from spoken text, e.g. with nikud) */
  display?: string;
  rate?: number;
  className?: string;
  iconSize?: number;
  /** Render as inline span (default) or block div */
  as?: "span" | "div";
  children?: React.ReactNode;
}

export default function SpeakableText({
  text,
  display,
  rate = 0.85,
  className,
  iconSize = 16,
  as: Tag = "span",
  children,
}: SpeakableTextProps) {
  return (
    <Tag
      role="button"
      tabIndex={0}
      className={cn(
        "inline-flex items-center gap-1 cursor-pointer rounded px-1 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      onClick={() => speakHebrew(text, rate)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          speakHebrew(text, rate);
        }
      }}
      aria-label={`Pronounce: ${text}`}
    >
      {children ?? <span>{display ?? text}</span>}
      <Volume2
        className="shrink-0 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity"
        size={iconSize}
      />
    </Tag>
  );
}
