import { shuffleArray } from "@/lib/shuffleArray";
import { Adjective, AdjSentence, FORM_LABEL, Gender, GNumber } from "./adjectivesDrillTypes";

export const removeNikud = (text: string): string => text.replace(/[֑-ׇ]/g, "");

export const formOf = (adj: Adjective, gender: Gender, number: GNumber): string => {
  if (gender === "m" && number === "s") return adj.ms;
  if (gender === "f" && number === "s") return adj.fs;
  if (gender === "m" && number === "p") return adj.mp;
  return adj.fp;
};

export interface OppositeQuestion {
  adjective: Adjective;
  correctForm: string;
  options: string[];
  correctAnswer: number;
}

export function buildOppositeQuestions(pool: Adjective[], count: number): OppositeQuestion[] {
  const picked = shuffleArray(pool).slice(0, Math.min(count, pool.length));
  return picked.map((adj) => {
    const opposite = pool.find((a) => a.id === adj.oppositeId) ?? pool.find((a) => a.id !== adj.id)!;
    const distractorPool = pool.filter((a) => a.id !== adj.id && a.id !== opposite.id);
    const distractors = shuffleArray(distractorPool).slice(0, 3).map((a) => a.ms);
    const options = shuffleArray([opposite.ms, ...distractors]);
    return {
      adjective: adj,
      correctForm: opposite.ms,
      options,
      correctAnswer: options.indexOf(opposite.ms),
    };
  });
}

export interface InflectionQuestion {
  adjective: Adjective;
  gender: Gender;
  number: GNumber;
  correctForm: string;
  options: string[];
  correctAnswer: number;
}

const TARGETS: { gender: Gender; number: GNumber }[] = [
  { gender: "f", number: "s" },
  { gender: "m", number: "p" },
  { gender: "f", number: "p" },
];

export function buildInflectionQuestions(pool: Adjective[], count: number): InflectionQuestion[] {
  const picked = shuffleArray(pool).slice(0, Math.min(count, pool.length));
  return picked.map((adj) => {
    const target = TARGETS[Math.floor(Math.random() * TARGETS.length)];
    const correctForm = formOf(adj, target.gender, target.number);
    const wrongForms = (["ms", "fs", "mp", "fp"] as const)
      .filter((k) => !(k[0] === target.gender && (k[1] === target.number)))
      .map((k) => (k === "ms" ? adj.ms : k === "fs" ? adj.fs : k === "mp" ? adj.mp : adj.fp))
      .filter((f) => f !== correctForm);
    const distractorPool = shuffleArray(Array.from(new Set(wrongForms)));
    let distractors = distractorPool.slice(0, 3);
    if (distractors.length < 3) {
      const other = pool.filter((a) => a.id !== adj.id);
      const extra = shuffleArray(other).map((a) => formOf(a, target.gender, target.number));
      for (const f of extra) {
        if (distractors.length >= 3) break;
        if (!distractors.includes(f) && f !== correctForm) distractors.push(f);
      }
    }
    const options = shuffleArray([correctForm, ...distractors.slice(0, 3)]);
    return {
      adjective: adj,
      gender: target.gender,
      number: target.number,
      correctForm,
      options,
      correctAnswer: options.indexOf(correctForm),
    };
  });
}

export interface SentenceQuestion extends AdjSentence {
  adjective: Adjective;
  correctForm: string;
  options: string[];
  correctAnswer: number;
}

export function buildSentenceQuestions(sentences: AdjSentence[], adjectives: Adjective[], count: number): SentenceQuestion[] {
  const picked = shuffleArray(sentences).slice(0, Math.min(count, sentences.length));
  return picked
    .map((s) => {
      const adjective = adjectives.find((a) => a.id === s.adjectiveId);
      if (!adjective) return null;
      const correctForm = formOf(adjective, s.gender, s.number);
      const otherForms = (["ms", "fs", "mp", "fp"] as const)
        .map((k) => (k === "ms" ? adjective.ms : k === "fs" ? adjective.fs : k === "mp" ? adjective.mp : adjective.fp))
        .filter((f) => f !== correctForm);
      const options = shuffleArray([correctForm, ...otherForms]);
      return {
        ...s,
        adjective,
        correctForm,
        options,
        correctAnswer: options.indexOf(correctForm),
      } as SentenceQuestion;
    })
    .filter((q): q is SentenceQuestion => q !== null);
}

export { FORM_LABEL };
