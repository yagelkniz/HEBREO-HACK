import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  hebrewLetters, nikudMarks, syllableGroups, shortCombos, firstWords, shortSentences,
  encouragements, stageNames,
  type HebrewLetter, type NikudMark, type SyllableGroup, type ShortCombo, type FirstWord, type ShortSentence,
} from "@/data/alphabetCourseData";

// ─── localStorage helpers ───
const STORAGE_KEY = "alphabet-course-progress";
interface CourseProgress { stage: number; index: number; }
function loadProgress(): CourseProgress {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : { stage: 0, index: 0 }; } catch { return { stage: 0, index: 0 }; }
}
function saveProgress(p: CourseProgress) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

// ─── TTS ───
function speak(text: string, rate = 0.7) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "he-IL";
  u.rate = rate;
  u.pitch = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const hv = voices.find(v => v.lang.startsWith("he"));
  if (hv) u.voice = hv;
  window.speechSynthesis.speak(u);
}

// ─── Encouragement ───
function randomEncouragement() {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}

// ─── Speed slider labels ───
const speedLabels: Record<string, string> = { "0.5": "מאוד לאט 🐢", "0.7": "לאט", "0.85": "רגיל", "1": "מהיר 🐇" };

interface Props { onBack: () => void; }

export default function AlphabetCourse({ onBack }: Props) {
  const [stage, setStage] = useState(0);
  const [index, setIndex] = useState(0);
  const [speed, setSpeed] = useState(0.7);
  const [encouragement, setEncouragement] = useState("");
  const [highlightWord, setHighlightWord] = useState(-1);

  // Load progress on mount
  useEffect(() => {
    const p = loadProgress();
    setStage(p.stage);
    setIndex(p.index);
    // Load voices
    window.speechSynthesis.getVoices();
  }, []);

  // Save progress on change
  useEffect(() => { saveProgress({ stage, index }); }, [stage, index]);

  const stageLengths = [hebrewLetters.length, nikudMarks.length, syllableGroups.length, shortCombos.length, firstWords.length, shortSentences.length];
  const totalItems = stageLengths[stage] || 1;
  const progressPercent = ((index + 1) / totalItems) * 100;

  const goNext = useCallback(() => {
    if (index < totalItems - 1) {
      setIndex(i => i + 1);
      setEncouragement(Math.random() > 0.6 ? randomEncouragement() : "");
      setHighlightWord(-1);
    } else if (stage < 5) {
      setStage(s => s + 1);
      setIndex(0);
      setEncouragement("כל הכבוד! סיימת שלב! 🎉");
      setHighlightWord(-1);
    }
  }, [index, totalItems, stage]);

  const goPrev = useCallback(() => {
    if (index > 0) { setIndex(i => i - 1); setHighlightWord(-1); }
    else if (stage > 0) { setStage(s => s - 1); setIndex(stageLengths[stage - 1] - 1); setHighlightWord(-1); }
  }, [index, stage, stageLengths]);

  const goToStage = (s: number) => { setStage(s); setIndex(0); setHighlightWord(-1); setEncouragement(""); };

  const resetProgress = () => {
    if (confirm("האם לאפס את כל ההתקדמות?")) {
      setStage(0); setIndex(0); setHighlightWord(-1);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Sentence word-by-word highlight + speech
  const playSentence = (sentence: ShortSentence) => {
    speak(sentence.sentenceWithNikud, speed);
    // Simulate word-by-word highlight
    sentence.words.forEach((_, i) => {
      setTimeout(() => setHighlightWord(i), i * 800);
    });
    setTimeout(() => setHighlightWord(-1), sentence.words.length * 800 + 500);
  };

  const isLastItem = index >= totalItems - 1 && stage >= 5;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-sky-50 flex flex-col" style={{ fontFamily: "'Rubik', 'Heebo', sans-serif" }}>
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-base font-bold">
          ← חזרה
        </Button>
        <div className="flex-1 text-center">
          <span className="text-sm text-muted-foreground">שלב {stage + 1} מתוך 6 — {stageNames[stage]}</span>
          <span className="mx-2 text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">{index + 1} מתוך {totalItems}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={resetProgress} className="text-xs text-muted-foreground">
          🔄 אפס
        </Button>
      </div>

      {/* Progress bar */}
      <div className="px-4 pt-2">
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Stage tabs */}
      <div className="flex gap-1 px-4 pt-3 pb-1 overflow-x-auto">
        {stageNames.map((name, i) => (
          <button key={i} onClick={() => goToStage(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${i === stage ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
            {i + 1}. {name}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-lg">
          {stage === 0 && <LetterCard letter={hebrewLetters[index]} speed={speed} />}
          {stage === 1 && <NikudCard nikud={nikudMarks[index]} speed={speed} />}
          {stage === 2 && <SyllableCard group={syllableGroups[index]} speed={speed} />}
          {stage === 3 && <ComboCard combo={shortCombos[index]} speed={speed} />}
          {stage === 4 && <WordCard word={firstWords[index]} speed={speed} />}
          {stage === 5 && <SentenceCard sentence={shortSentences[index]} speed={speed} highlightWord={highlightWord} onPlay={playSentence} />}
        </div>
      </div>

      {/* Encouragement */}
      {encouragement && (
        <div className="text-center text-lg font-bold text-amber-600 animate-bounce pb-2">{encouragement}</div>
      )}

      {/* Bottom controls */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-border px-4 py-3">
        {/* Speed slider */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-xs text-muted-foreground">🐢</span>
          <input type="range" min="0.5" max="1" step="0.15" value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))}
            className="w-32 accent-primary" />
          <span className="text-xs text-muted-foreground">🐇</span>
          <span className="text-xs text-muted-foreground mr-2">
            {speedLabels[speed.toFixed(2)] || speedLabels[speed.toFixed(1)] || `${speed.toFixed(1)}x`}
          </span>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={goPrev} disabled={stage === 0 && index === 0} className="min-w-[100px]">
            → הקודם
          </Button>
          <Button onClick={goNext} disabled={isLastItem} className="min-w-[100px]">
            הבא ←
          </Button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// STAGE 1: Letter Card
// ═══════════════════════════════════
function LetterCard({ letter, speed }: { letter: HebrewLetter; speed: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center space-y-5 animate-in fade-in duration-300">
      {letter.isFinal && <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">אות סופית</span>}
      <div className="text-[120px] leading-none font-serif text-foreground" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>
        {letter.letter}
      </div>
      <div className="text-xl font-semibold text-foreground">שם האות: <span className="text-primary">{letter.nameWithNikud}</span> <span className="text-muted-foreground font-mono">({letter.nameTransliteration})</span></div>
      <div className="text-muted-foreground">צליל: <span className="font-mono font-bold">"{letter.sound}"</span> — {letter.soundExample}</div>
      <Button variant="outline" size="lg" onClick={() => speak(letter.nameWithNikud, speed)} className="gap-2">
        🔊 שמע את הצליל
      </Button>
      <div className="border-t border-border pt-4 mt-4">
        <div className="text-sm text-muted-foreground mb-2">מילה לדוגמה:</div>
        <div className="text-4xl font-bold mb-1" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>{letter.exampleWordNikud}</div>
        <div className="text-muted-foreground">{letter.exampleTransliteration} — {letter.exampleTranslation}</div>
        <Button variant="ghost" size="sm" onClick={() => speak(letter.exampleWordNikud, speed)} className="mt-2">
          🔊 שמע את המילה
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// STAGE 2: Nikud Card
// ═══════════════════════════════════
function NikudCard({ nikud, speed }: { nikud: NikudMark; speed: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center space-y-5 animate-in fade-in duration-300">
      <div className="text-lg font-semibold text-muted-foreground">הניקוד: <span className="text-primary text-xl">{nikud.nameWithNikud}</span></div>
      <div className="text-[96px] leading-none font-serif text-foreground" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>
        {nikud.letterExample}
      </div>
      <div className="text-muted-foreground">צליל: <span className="font-mono font-bold">"{nikud.sound}"</span> — {nikud.soundExample}</div>
      <Button variant="outline" size="lg" onClick={() => speak(nikud.letterExample, speed)} className="gap-2">
        🔊 שמע
      </Button>
      <div className="border-t border-border pt-4">
        <div className="text-sm text-muted-foreground mb-3">דוגמאות:</div>
        <div className="flex justify-center gap-6 flex-wrap">
          {nikud.examples.map((ex, i) => (
            <button key={i} onClick={() => speak(ex.word, speed)}
              className="text-center hover:scale-105 transition-transform cursor-pointer">
              <div className="text-3xl font-bold" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>{ex.word}</div>
              <div className="text-xs text-muted-foreground">{ex.transliteration}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// STAGE 3: Syllable Card
// ═══════════════════════════════════
function SyllableCard({ group, speed }: { group: SyllableGroup; speed: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center space-y-5 animate-in fade-in duration-300">
      <div className="text-lg font-semibold text-muted-foreground">
        האות <span className="text-primary text-2xl mx-1" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>{group.letter}</span> ({group.letterName}) + ניקוד
      </div>
      <div className="grid grid-cols-5 gap-3">
        {group.syllables.map((s, i) => (
          <button key={i} onClick={() => speak(s.syllable, speed)}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border hover:border-primary hover:shadow-md transition-all cursor-pointer hover:scale-105">
            <div className="text-5xl font-bold" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>{s.syllable}</div>
            <div className="text-xs text-muted-foreground">{s.nikudName}</div>
            <div className="text-sm font-mono font-bold text-primary">{s.sound}</div>
          </button>
        ))}
      </div>
      <Button variant="outline" onClick={() => {
        group.syllables.forEach((s, i) => setTimeout(() => speak(s.syllable, speed), i * 1200));
      }} className="gap-2">
        🔊 שמע הכל ברצף
      </Button>
    </div>
  );
}

// ═══════════════════════════════════
// STAGE 3.5: Short Combo Card
// ═══════════════════════════════════
function ComboCard({ combo, speed }: { combo: ShortCombo; speed: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center space-y-5 animate-in fade-in duration-300">
      <div className="text-sm text-muted-foreground">צירוף קצר</div>
      <div className="text-[110px] leading-none font-bold text-foreground" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>
        {combo.combo}
      </div>
      <div className="text-2xl font-mono font-bold text-primary">{combo.transliteration}</div>
      <div className="inline-block bg-amber-50 text-amber-800 text-sm font-medium px-3 py-1.5 rounded-full">{combo.note}</div>
      {combo.meaning && (
        <div className="text-base text-muted-foreground">משמעות: <span className="font-bold text-foreground">{combo.meaning}</span></div>
      )}
      <div className="flex gap-3 justify-center">
        <Button variant="outline" size="lg" onClick={() => speak(combo.combo, speed)} className="gap-2">
          🔊 שמע
        </Button>
        <Button variant="ghost" size="lg" onClick={() => speak(combo.combo, Math.max(0.5, speed - 0.2))} className="gap-2">
          🐢 לאט
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// STAGE 4: Word Card
// ═══════════════════════════════════
function WordCard({ word, speed }: { word: FirstWord; speed: number }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center space-y-5 animate-in fade-in duration-300">
      <div className="text-[80px] leading-none font-bold" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>
        {word.wordWithNikud}
      </div>
      <div className="text-lg text-muted-foreground">תעתיק: <span className="font-mono font-bold">{word.transliteration}</span></div>
      <div className="text-lg text-muted-foreground">תרגום: <span className="font-bold text-foreground">{word.translation}</span></div>
      <div className="flex gap-3 justify-center">
        <Button variant="outline" size="lg" onClick={() => speak(word.wordWithNikud, speed)} className="gap-2">
          🔊 שמע את המילה
        </Button>
        <Button variant="ghost" size="lg" onClick={() => speak(word.wordWithNikud, speed)} className="gap-2">
          🔁 שוב
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════
// STAGE 5: Sentence Card
// ═══════════════════════════════════
function SentenceCard({ sentence, speed, highlightWord, onPlay }: { sentence: ShortSentence; speed: number; highlightWord: number; onPlay: (s: ShortSentence) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center space-y-5 animate-in fade-in duration-300">
      <div className="flex flex-wrap justify-center gap-3 text-4xl md:text-5xl font-bold leading-relaxed" style={{ fontFamily: "'Frank Ruhl Libre', 'Noto Serif Hebrew', serif" }}>
        {sentence.words.map((w, i) => (
          <span key={i} className={`transition-colors duration-200 px-1 rounded ${i === highlightWord ? "bg-amber-200 text-amber-900" : "text-foreground"}`}>
            {w}
          </span>
        ))}
      </div>
      <div className="text-muted-foreground">תעתיק: <span className="font-mono">{sentence.transliteration}</span></div>
      <div className="text-lg font-semibold text-foreground">{sentence.translation}</div>
      <div className="flex gap-3 justify-center">
        <Button variant="outline" size="lg" onClick={() => onPlay(sentence)} className="gap-2">
          🔊 שמע את המשפט
        </Button>
        <Button variant="ghost" size="lg" onClick={() => speak(sentence.sentenceWithNikud, Math.max(0.5, speed - 0.2))} className="gap-2">
          🐢 לאט
        </Button>
      </div>
    </div>
  );
}
