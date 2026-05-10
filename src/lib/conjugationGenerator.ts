// Conjugation generator for the 7 Hebrew binyanim.
// Produces regular (gizra shlema) modern conversational forms without nikud.
// Irregular roots (גרוניות, ל"ה, פ"נ etc.) will not always match — show a
// disclaimer in the UI.

export type Binyan = "paal" | "piel" | "hifil" | "hitpael" | "nifal" | "hufal" | "pual";

export const PRONOUNS_HE = [
  "אני",
  "אתה",
  "את",
  "הוא",
  "היא",
  "אנחנו",
  "אתם",
  "אתן",
  "הם",
  "הן",
] as const;

export const PRONOUNS_EN = [
  "I",
  "you (m)",
  "you (f)",
  "he",
  "she",
  "we",
  "you (m.pl)",
  "you (f.pl)",
  "they (m)",
  "they (f)",
] as const;

export type Tense = "past" | "present" | "future";

export interface ConjugationSet {
  past: string[];     // 10 forms aligned with PRONOUNS_HE
  present: string[];  // 4 forms: m.s, f.s, m.pl, f.pl
  future: string[];   // 10 forms aligned with PRONOUNS_HE
}

export const PRESENT_LABELS_HE = ["יחיד (ז)", "יחידה (נ)", "רבים (ז)", "רבות (נ)"];
export const PRESENT_LABELS_EN = ["m.sg", "f.sg", "m.pl", "f.pl"];

function paal(r: string[]): ConjugationSet {
  const [a, b, c] = r;
  const stem = a + b + c; // e.g. כתב
  return {
    past: [
      stem + "תי", // אני
      stem + "ת",  // אתה
      stem + "ת",  // את
      stem,         // הוא
      stem + "ה",  // היא
      stem + "נו", // אנחנו
      stem + "תם", // אתם
      stem + "תן", // אתן
      stem + "ו",  // הם
      stem + "ו",  // הן
    ],
    present: [
      a + "ו" + b + c,        // כותב
      a + "ו" + b + c + "ת",  // כותבת
      a + "ו" + b + c + "ים", // כותבים
      a + "ו" + b + c + "ות", // כותבות
    ],
    future: [
      "א" + a + b + "ו" + c, // אכתוב
      "ת" + a + b + "ו" + c,
      "ת" + a + b + c + "י",
      "י" + a + b + "ו" + c,
      "ת" + a + b + "ו" + c,
      "נ" + a + b + "ו" + c,
      "ת" + a + b + c + "ו",
      "ת" + a + b + c + "ו",
      "י" + a + b + c + "ו",
      "י" + a + b + c + "ו",
    ],
  };
}

function piel(r: string[]): ConjugationSet {
  const [a, b, c] = r;
  const pastStem = a + "י" + b + c; // דיבר
  const baseNoYod = a + b + c;       // דבר
  return {
    past: [
      pastStem + "תי",
      pastStem + "ת",
      pastStem + "ת",
      pastStem,
      pastStem + "ה",
      pastStem + "נו",
      pastStem + "תם",
      pastStem + "תן",
      pastStem + "ו",
      pastStem + "ו",
    ],
    present: [
      "מ" + baseNoYod,
      "מ" + baseNoYod + "ת",
      "מ" + baseNoYod + "ים",
      "מ" + baseNoYod + "ות",
    ],
    future: [
      "א" + baseNoYod,
      "ת" + baseNoYod,
      "ת" + baseNoYod + "י",
      "י" + baseNoYod,
      "ת" + baseNoYod,
      "נ" + baseNoYod,
      "ת" + baseNoYod + "ו",
      "ת" + baseNoYod + "ו",
      "י" + baseNoYod + "ו",
      "י" + baseNoYod + "ו",
    ],
  };
}

function pual(r: string[]): ConjugationSet {
  const [a, b, c] = r;
  const stem = a + "ו" + b + c; // סופר
  return {
    past: [
      stem + "תי",
      stem + "ת",
      stem + "ת",
      stem,
      stem + "ה",
      stem + "נו",
      stem + "תם",
      stem + "תן",
      stem + "ו",
      stem + "ו",
    ],
    present: ["מ" + stem, "מ" + stem + "ת", "מ" + stem + "ים", "מ" + stem + "ות"],
    future: [
      "א" + stem,
      "ת" + stem,
      "ת" + stem + "י",
      "י" + stem,
      "ת" + stem,
      "נ" + stem,
      "ת" + stem + "ו",
      "ת" + stem + "ו",
      "י" + stem + "ו",
      "י" + stem + "ו",
    ],
  };
}

function hifil(r: string[]): ConjugationSet {
  const [a, b, c] = r;
  const pastShort = "ה" + a + b + c;        // הלבש (suffix forms)
  const pastFull = "ה" + a + b + "י" + c;   // הלביש
  const baseFull = a + b + "י" + c;          // לביש
  const baseShort = a + b + c;               // לבש
  return {
    past: [
      pastShort + "תי",
      pastShort + "ת",
      pastShort + "ת",
      pastFull,
      pastFull + "ה",
      pastShort + "נו",
      pastShort + "תם",
      pastShort + "תן",
      pastFull + "ו",
      pastFull + "ו",
    ],
    present: [
      "מ" + baseFull,
      "מ" + baseShort + "ה",
      "מ" + baseFull + "ים",
      "מ" + baseFull + "ות",
    ],
    future: [
      "א" + baseFull,
      "ת" + baseFull,
      "ת" + baseFull + "י",
      "י" + baseFull,
      "ת" + baseFull,
      "נ" + baseFull,
      "ת" + baseFull + "ו",
      "ת" + baseFull + "ו",
      "י" + baseFull + "ו",
      "י" + baseFull + "ו",
    ],
  };
}

function hufal(r: string[]): ConjugationSet {
  const [a, b, c] = r;
  const stem = "הו" + a + b + c; // הולבש
  const future = "ו" + a + b + c; // ולבש (after prefix)
  const present = "מו" + a + b + c; // מולבש
  return {
    past: [
      stem + "תי",
      stem + "ת",
      stem + "ת",
      stem,
      stem + "ה",
      stem + "נו",
      stem + "תם",
      stem + "תן",
      stem + "ו",
      stem + "ו",
    ],
    present: [present, present + "ת", present + "ים", present + "ות"],
    future: [
      "א" + future,
      "ת" + future,
      "ת" + future + "י",
      "י" + future,
      "ת" + future,
      "נ" + future,
      "ת" + future + "ו",
      "ת" + future + "ו",
      "י" + future + "ו",
      "י" + future + "ו",
    ],
  };
}

function hitpael(r: string[]): ConjugationSet {
  const [a, b, c] = r;
  const stem = "הת" + a + b + c; // התלבש
  const fut = "ת" + a + b + c;   // תלבש (after prefix)
  const pres = "מת" + a + b + c; // מתלבש
  return {
    past: [
      stem + "תי",
      stem + "ת",
      stem + "ת",
      stem,
      stem + "ה",
      stem + "נו",
      stem + "תם",
      stem + "תן",
      stem + "ו",
      stem + "ו",
    ],
    present: [pres, pres + "ת", pres + "ים", pres + "ות"],
    future: [
      "א" + fut,
      "ת" + fut,
      "ת" + fut + "י",
      "י" + fut,
      "ת" + fut,
      "נ" + fut,
      "ת" + fut + "ו",
      "ת" + fut + "ו",
      "י" + fut + "ו",
      "י" + fut + "ו",
    ],
  };
}

function nifal(r: string[]): ConjugationSet {
  const [a, b, c] = r;
  const past = "נ" + a + b + c;   // נפתח
  const fut = "י" + a + b + c;    // יפתח base after prefix → ייפתח, תיפתח...
  const pres = "נ" + a + b + c;   // נפתח (same as past 3ms)
  return {
    past: [
      past + "תי",
      past + "ת",
      past + "ת",
      past,
      past + "ה",
      past + "נו",
      past + "תם",
      past + "תן",
      past + "ו",
      past + "ו",
    ],
    present: [pres, pres + "ת", pres + "ים", pres + "ות"],
    future: [
      "א" + fut,
      "ת" + fut,
      "ת" + fut + "י",
      "י" + fut,
      "ת" + fut,
      "נ" + fut,
      "ת" + fut + "ו",
      "ת" + fut + "ו",
      "י" + fut + "ו",
      "י" + fut + "ו",
    ],
  };
}

const generators: Record<Binyan, (r: string[]) => ConjugationSet> = {
  paal,
  piel,
  pual,
  hifil,
  hufal,
  hitpael,
  nifal,
};

export const BINYAN_META: Record<Binyan, { he: string; en: string; example: string }> = {
  paal: { he: "פָּעַל", en: "Pa'al", example: "כ-ת-ב" },
  piel: { he: "פִּעֵל", en: "Pi'el", example: "ד-ב-ר" },
  pual: { he: "פֻּעַל", en: "Pu'al", example: "ס-פ-ר" },
  hifil: { he: "הִפְעִיל", en: "Hif'il", example: "ל-ב-ש" },
  hufal: { he: "הֻפְעַל", en: "Huf'al", example: "ל-ב-ש" },
  hitpael: { he: "הִתְפַּעֵל", en: "Hitpa'el", example: "ל-ב-ש" },
  nifal: { he: "נִפְעַל", en: "Nif'al", example: "פ-ת-ח" },
};

export function generateConjugation(root: string[], binyan: Binyan): ConjugationSet {
  if (root.length !== 3 || root.some((l) => !l)) {
    throw new Error("Root must have exactly 3 letters");
  }
  return generators[binyan](root);
}

export function parseRoot(input: string): string[] | null {
  // Accept "כתב", "כ-ת-ב", "כ ת ב"
  const cleaned = input.replace(/[-\s.]/g, "").trim();
  const letters = Array.from(cleaned);
  if (letters.length !== 3) return null;
  if (!letters.every((l) => /[\u0590-\u05FF]/.test(l))) return null;
  return letters;
}
