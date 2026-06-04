// Comprehensive conjugation map for the 60 Piel & Hiphil verbs used in
// PielHiphilBrowser. Forms are given without nikud, in modern Israeli
// spelling. Each verb returns:
//   past[8]    -> אני, אתה, את, הוא, היא, אנחנו, אתם/אתן, הם/הן
//   present[4] -> m.sg, f.sg, m.pl, f.pl
//   future[8]  -> same order as past
// The UI maps a selected pronoun to the right index, and for present
// tense picks the right gender form per pronoun.

export type Tense = "past" | "present" | "future";

export interface Conjugation {
  past: string[];     // length 8
  present: string[];  // length 4 [ms, fs, mp, fp]
  future: string[];   // length 8
}

const unfinal = (s: string) =>
  s
    .replace(/ם$/, "מ")
    .replace(/ן$/, "נ")
    .replace(/ץ$/, "צ")
    .replace(/ף$/, "פ")
    .replace(/ך$/, "כ");

// ---------- Piel: regular pattern ----------
// p = past 3ms stem (e.g. "דיבר"); f = future/present base (e.g. "דבר")
const piel = (p: string, f: string): Conjugation => {
  const up = unfinal(p);
  const uf = unfinal(f);
  return {
    past: [
      up + "תי",
      up + "ת",
      up + "ת",
      p,
      up + "ה",
      up + "נו",
      up + "תם",
      up + "ו",
    ],
    present: ["מ" + f, "מ" + uf + "ת", "מ" + uf + "ים", "מ" + uf + "ות"],
    future: [
      "א" + f,
      "ת" + f,
      "ת" + uf + "י",
      "י" + f,
      "ת" + f,
      "נ" + f,
      "ת" + uf + "ו",
      "י" + uf + "ו",
    ],
  };
};

// ---------- Piel: ל"ה (final ה) pattern ----------
// s3 = past stem before yud (e.g. "ניס"); sb = present/future base (e.g. "נס")
const pielLH = (s3: string, sb: string): Conjugation => ({
  past: [
    s3 + "יתי",
    s3 + "ית",
    s3 + "ית",
    s3 + "ה",
    s3 + "תה",
    s3 + "ינו",
    s3 + "יתם",
    s3 + "ו",
  ],
  present: ["מ" + sb + "ה", "מ" + sb + "ה", "מ" + sb + "ים", "מ" + sb + "ות"],
  future: [
    "א" + sb + "ה",
    "ת" + sb + "ה",
    "ת" + sb + "י",
    "י" + sb + "ה",
    "ת" + sb + "ה",
    "נ" + sb + "ה",
    "ת" + sb + "ו",
    "י" + sb + "ו",
  ],
});

// ---------- Hiphil: regular pattern ----------
// pf = past 3ms full form (e.g. "הסביר"), ps = past short stem (e.g. "הסבר", non-final),
// fb = future base (e.g. "סביר"), pms = present m.sg (e.g. "מסביר")
const hifil = (
  pf: string,
  ps: string,
  fb: string,
  pms: string
): Conjugation => {
  const upf = unfinal(pf);
  const ufb = unfinal(fb);
  const upms = unfinal(pms);
  return {
    past: [
      ps + "תי",
      ps + "ת",
      ps + "ת",
      pf,
      upf + "ה",
      ps + "נו",
      ps + "תם",
      upf + "ו",
    ],
    present: [pms, upms + "ה", upms + "ים", upms + "ות"],
    future: [
      "א" + fb,
      "ת" + fb,
      "ת" + ufb + "י",
      "י" + fb,
      "ת" + fb,
      "נ" + fb,
      "ת" + ufb + "ו",
      "י" + ufb + "ו",
    ],
  };
};

// ---------- Hiphil: ל"ה pattern ----------
const hifilLH = (s3: string, fb: string): Conjugation => ({
  past: [
    s3 + "יתי",
    s3 + "ית",
    s3 + "ית",
    s3 + "ה",
    s3 + "תה",
    s3 + "ינו",
    s3 + "יתם",
    s3 + "ו",
  ],
  present: ["מ" + fb + "ה", "מ" + fb + "ה", "מ" + fb + "ים", "מ" + fb + "ות"],
  future: [
    "א" + fb + "ה",
    "ת" + fb + "ה",
    "ת" + fb + "י",
    "י" + fb + "ה",
    "ת" + fb + "ה",
    "נ" + fb + "ה",
    "ת" + fb + "ו",
    "י" + fb + "ו",
  ],
});

export const CONJUGATIONS: Record<string, Conjugation> = {
  // ============ Piel (30) ============
  "לדבר": piel("דיבר", "דבר"),
  "לספר": piel("סיפר", "ספר"),
  "לחפש": piel("חיפש", "חפש"),
  "לבקש": piel("ביקש", "בקש"),
  "לקבל": piel("קיבל", "קבל"),
  "לשלם": piel("שילם", "שלם"),
  "לסיים": piel("סיים", "סיים"),
  "ללמד": piel("לימד", "למד"),
  "לבקר": piel("ביקר", "בקר"),
  "לסדר": piel("סידר", "סדר"),
  "לאבד": piel("איבד", "אבד"),
  "לאחר": piel("איחר", "אחר"),
  "למהר": piel("מיהר", "מהר"),
  "לטייל": piel("טייל", "טייל"),
  "לצייר": piel("צייר", "צייר"),
  "לנגן": piel("ניגן", "נגן"),
  "לחבר": piel("חיבר", "חבר"),
  "לבשל": piel("בישל", "בשל"),
  "לצלם": piel("צילם", "צלם"),
  "לשחק": piel("שיחק", "שחק"),
  "לתקן": piel("תיקן", "תקן"),
  "לכבד": piel("כיבד", "כבד"),
  "לקוות": pielLH("קיוו", "קוו"),
  "לנסות": pielLH("ניס", "נס"),
  "לשנות": pielLH("שינ", "שנ"),
  "לחכות": pielLH("חיכ", "חכ"),
  "לנקות": pielLH("ניק", "נק"),
  "לשקר": piel("שיקר", "שקר"),
  "לוותר": piel("ויתר", "וותר"),
  "לנצח": piel("ניצח", "נצח"),

  // ============ Hiphil (30) ============
  "להרגיש": hifil("הרגיש", "הרגש", "רגיש", "מרגיש"),
  "להתחיל": hifil("התחיל", "התחל", "תחיל", "מתחיל"),
  "להזמין": hifil("הזמין", "הזמנ", "זמין", "מזמין"),
  "להסביר": hifil("הסביר", "הסבר", "סביר", "מסביר"),
  "להבין": hifil("הבין", "הבנ", "בין", "מבין"),
  "להסכים": hifil("הסכים", "הסכמ", "סכים", "מסכים"),
  "להקשיב": hifil("הקשיב", "הקשב", "קשיב", "מקשיב"),
  "להמליץ": hifil("המליץ", "המלצ", "מליץ", "ממליץ"),
  "להאמין": hifil("האמין", "האמנ", "אמין", "מאמין"),
  "להדליק": hifil("הדליק", "הדלק", "דליק", "מדליק"),
  "להפסיק": hifil("הפסיק", "הפסק", "פסיק", "מפסיק"),
  "להמשיך": hifil("המשיך", "המשכ", "משיך", "ממשיך"),
  "להחליט": hifil("החליט", "החלט", "חליט", "מחליט"),
  "להצליח": hifil("הצליח", "הצלח", "צליח", "מצליח"),
  "להגיע": hifil("הגיע", "הגע", "גיע", "מגיע"),
  "להכיר": hifil("הכיר", "הכר", "כיר", "מכיר"),
  "להבטיח": hifil("הבטיח", "הבטח", "בטיח", "מבטיח"),
  "להזכיר": hifil("הזכיר", "הזכר", "זכיר", "מזכיר"),
  "להעדיף": hifil("העדיף", "העדפ", "עדיף", "מעדיף"),
  "להחליף": hifil("החליף", "החלפ", "חליף", "מחליף"),
  "להעביר": hifil("העביר", "העבר", "עביר", "מעביר"),
  "להשאיר": hifil("השאיר", "השאר", "שאיר", "משאיר"),
  "להחזיר": hifil("החזיר", "החזר", "חזיר", "מחזיר"),
  "להראות": hifilLH("הרא", "רא"),
  "להלוות": hifilLH("הלוו", "לוו"),
  "להוסיף": hifil("הוסיף", "הוספ", "וסיף", "מוסיף"),
  "להוריד": hifil("הוריד", "הורד", "וריד", "מוריד"),
  "להוציא": hifil("הוציא", "הוצא", "וציא", "מוציא"),
  "להופיע": hifil("הופיע", "הופע", "ופיע", "מופיע"),
  "להכין": hifil("הכין", "הכנ", "כין", "מכין"),
};

// Pronoun mapping for past/future (indices 0..7)
export const PRONOUNS = [
  { he: "אני", en: "I" },
  { he: "אתה", en: "you (m.sg)" },
  { he: "את", en: "you (f.sg)" },
  { he: "הוא", en: "he" },
  { he: "היא", en: "she" },
  { he: "אנחנו", en: "we" },
  { he: "אתם/אתן", en: "you (pl)" },
  { he: "הם/הן", en: "they" },
] as const;

// For present tense, map each pronoun to its present-form index
// 0=m.sg, 1=f.sg, 2=m.pl, 3=f.pl
export const PRESENT_INDEX_BY_PRONOUN = [0, 0, 1, 0, 1, 2, 2, 2];

export function getConjugatedForm(
  verb: string,
  tense: Tense,
  pronounIdx: number
): string {
  const c = CONJUGATIONS[verb];
  if (!c) return "—";
  if (tense === "present") {
    return c.present[PRESENT_INDEX_BY_PRONOUN[pronounIdx]];
  }
  return c[tense][pronounIdx];
}
