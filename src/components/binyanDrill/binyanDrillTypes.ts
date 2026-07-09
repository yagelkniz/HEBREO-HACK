// Shared shape for the "binyan drill" pilot module family.
// To add another binyan (hifil, hitpael, nifal...), create a new data file that
// exports a BinyanDrillData matching this shape, plus a thin page that renders
// <BinyanDrillPractice data={...} /> with the new binyan's labels.

export type Tense = "past" | "present" | "future";

// The 10 persons drilled in this module. Gender-ambiguous forms (אני / אנחנו)
// default to the masculine conjugation for present tense, matching common
// classroom shorthand for pronoun-drill exercises.
export type Person = "אני" | "אתה" | "את" | "הוא" | "היא" | "אנחנו" | "אתם" | "אתן" | "הם" | "הן";

export const PERSONS: Person[] = ["אני", "אתה", "את", "הוא", "היא", "אנחנו", "אתם", "אתן", "הם", "הן"];

export interface DrillVerb {
  infinitive: string;
  infinitiveNikud: string;
  english: string;
  root: string;
  conjugations: Record<Tense, Record<Person, string>>;
}

export interface DrillSentence {
  id: string;
  tense: Tense;
  topic: string;
  /** Plain Hebrew sentence with the missing verb replaced by "___" */
  sentence: string;
  /** Fully vocalized correct form of the missing verb */
  correctFormNikud: string;
  /** Plain-spelling correct form of the missing verb */
  correctForm: string;
  /** 4 plain-spelling options (index-aligned with optionsNikud), as authored */
  options: string[];
  /** 4 vocalized options, index-aligned with options */
  optionsNikud: string[];
  /** Index into options/optionsNikud that is correct, as authored (pre-shuffle) */
  correctAnswer: number;
  /** Full sentence with the correct form filled in, for feedback */
  fullSentence: string;
  english: string;
}

export interface StorySentence {
  /** Plain text before the blank */
  before: string;
  /** Plain text after the blank, through the sentence's punctuation */
  after: string;
  /** Which verb (by infinitive, must exist in this binyan's verbs list) and person is expected */
  verbInfinitive: string;
  person: Person;
}

export interface Story {
  id: string;
  tense: Tense;
  title: string;
  sentences: StorySentence[];
}

export interface BinyanDrillData {
  binyanKey: string;
  binyanLabel: string;
  binyanLabelNikud: string;
  binyanDescription: string;
  verbs: DrillVerb[];
  sentences: DrillSentence[];
  /** Optional "story" cloze-drill content (one story per tense). Only binyanim
   *  with hand-authored stories show the story entry point on the intro screen. */
  stories?: Story[];
}
