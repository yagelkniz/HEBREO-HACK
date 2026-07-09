import { shuffleArray } from "@/lib/shuffleArray";
import { DrillSentence, DrillVerb, Person, PERSONS, Tense } from "./binyanDrillTypes";

export const TENSE_LABEL: Record<Tense, string> = {
  past: "עבר",
  present: "הווה",
  future: "עתיד",
};

export const removeNikud = (text: string): string => text.replace(/[֑-ׇ]/g, "");

export interface StageAQuestion {
  verb: DrillVerb;
  tense: Tense;
  person: Person;
  correctForm: string;
  options: string[];
  correctAnswer: number;
}

/**
 * Builds one "which form fits this person?" question for a verb, drawing
 * distractors from the verb's other forms (other persons in the same tense,
 * and the same person in other tenses) so wrong answers stay plausible.
 */
export function buildStageAQuestion(verb: DrillVerb, tense: Tense, person: Person): StageAQuestion {
  const correctForm = verb.conjugations[tense][person];

  const pool = new Set<string>();
  PERSONS.forEach((p) => {
    if (p !== person) pool.add(verb.conjugations[tense][p]);
  });
  (["past", "present", "future"] as Tense[]).forEach((t) => {
    if (t !== tense) pool.add(verb.conjugations[t][person]);
  });
  pool.delete(correctForm);

  const distractors = shuffleArray(Array.from(pool)).slice(0, 3);
  const options = shuffleArray([correctForm, ...distractors]);

  return {
    verb,
    tense,
    person,
    correctForm,
    options,
    correctAnswer: options.indexOf(correctForm),
  };
}

export function buildStageAQuestions(verbs: DrillVerb[], tense: Tense): StageAQuestion[] {
  const questions = verbs.map((verb) => {
    const person = shuffleArray(PERSONS)[0];
    return buildStageAQuestion(verb, tense, person);
  });
  return shuffleArray(questions);
}

export interface StageBQuestion extends DrillSentence {
  /** Options reshuffled for this render, index-aligned with optionsNikud below */
  options: string[];
  optionsNikud: string[];
  correctAnswer: number;
}

/**
 * Picks all sentences for a tense and reshuffles each one's options so the
 * correct answer (always authored at index 0) isn't predictably placed.
 */
export function buildStageBQuestions(sentences: DrillSentence[], tense: Tense): StageBQuestion[] {
  const forTense = shuffleArray(sentences.filter((s) => s.tense === tense));
  return forTense.map((s) => {
    const order = shuffleArray(s.options.map((_, idx) => idx));
    return {
      ...s,
      options: order.map((i) => s.options[i]),
      optionsNikud: order.map((i) => s.optionsNikud[i]),
      correctAnswer: order.indexOf(s.correctAnswer),
    };
  });
}
