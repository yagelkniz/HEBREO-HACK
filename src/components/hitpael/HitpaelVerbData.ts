import { ConjugationRow, BinyanQuestion } from "../binyanim/BinyanVerbPractice";

export const hitpaelExplanationHe = "בניין התפעל משמש בעיקר לפעולות רפלקסיביות (שהאדם עושה לעצמו), פעולות הדדיות (שני אנשים עושים זה לזה), או תהליכים פנימיים. לדוגמה: להתלבש (לעצמך), להתכתב (אחד עם השני), להתרגש (תחושה פנימית).";

export const hitpaelExplanationEn = "Hitpa'el is used for reflexive actions (doing to oneself), reciprocal actions (doing to each other), or internal processes. Examples: להתלבש (dress oneself), להתכתב (correspond with each other), להתרגש (get excited).";

export const hitpaelConjugationTable: ConjugationRow[] = [
  { pronoun: "אני", pronounEn: "I", past: "הִתְלַבַּשְׁתִּי", present: "מִתְלַבֵּשׁ / מִתְלַבֶּשֶׁת", future: "אֶתְלַבֵּשׁ" },
  { pronoun: "אתה", pronounEn: "you (m)", past: "הִתְלַבַּשְׁתָּ", present: "מִתְלַבֵּשׁ", future: "תִּתְלַבֵּשׁ" },
  { pronoun: "את", pronounEn: "you (f)", past: "הִתְלַבַּשְׁתְּ", present: "מִתְלַבֶּשֶׁת", future: "תִּתְלַבְּשִׁי" },
  { pronoun: "הוא", pronounEn: "he", past: "הִתְלַבֵּשׁ", present: "מִתְלַבֵּשׁ", future: "יִתְלַבֵּשׁ" },
  { pronoun: "היא", pronounEn: "she", past: "הִתְלַבְּשָׁה", present: "מִתְלַבֶּשֶׁת", future: "תִּתְלַבֵּשׁ" },
  { pronoun: "אנחנו", pronounEn: "we", past: "הִתְלַבַּשְׁנוּ", present: "מִתְלַבְּשִׁים / מִתְלַבְּשׁוֹת", future: "נִתְלַבֵּשׁ" },
  { pronoun: "אתם", pronounEn: "you (m.pl)", past: "הִתְלַבַּשְׁתֶּם", present: "מִתְלַבְּשִׁים", future: "תִּתְלַבְּשׁוּ" },
  { pronoun: "אתן", pronounEn: "you (f.pl)", past: "הִתְלַבַּשְׁתֶּן", present: "מִתְלַבְּשׁוֹת", future: "תִּתְלַבֵּשְׁנָה" },
  { pronoun: "הם", pronounEn: "they (m)", past: "הִתְלַבְּשׁוּ", present: "מִתְלַבְּשִׁים", future: "יִתְלַבְּשׁוּ" },
  { pronoun: "הן", pronounEn: "they (f)", past: "הִתְלַבְּשׁוּ", present: "מִתְלַבְּשׁוֹת", future: "תִּתְלַבֵּשְׁנָה" },
];

export const hitpaelQuestions: BinyanQuestion[] = [
  // Past
  { id: 1, tense: "past", sentence: "אני ___ מהר לפני העבודה.", sentenceEn: "I got dressed quickly before work.", blank: "", options: ["הִתְלַבַּשְׁתִּי", "מִתְלַבֵּשׁ", "אֶתְלַבֵּשׁ", "הִתְלַבֵּשׁ"], correct: "הִתְלַבַּשְׁתִּי" },
  { id: 2, tense: "past", sentence: "הוא ___ לקראת האירוע.", sentenceEn: "He got dressed for the event.", blank: "", options: ["הִתְלַבֵּשׁ", "מִתְלַבֵּשׁ", "יִתְלַבֵּשׁ", "הִתְלַבַּשְׁתִּי"], correct: "הִתְלַבֵּשׁ" },
  { id: 3, tense: "past", sentence: "הם ___ בבגדים חגיגיים.", sentenceEn: "They got dressed in festive clothes.", blank: "", options: ["הִתְלַבְּשׁוּ", "מִתְלַבְּשִׁים", "יִתְלַבְּשׁוּ", "הִתְלַבַּשְׁתֶּם"], correct: "הִתְלַבְּשׁוּ" },
  { id: 4, tense: "past", sentence: "הילדים ___ מהאירוע מאוד.", sentenceEn: "The children got excited from the event.", blank: "", options: ["הִתְרַגְּשׁוּ", "מִתְרַגְּשִׁים", "יִתְרַגְּשׁוּ", "הִתְרַגַּשְׁתִּי"], correct: "הִתְרַגְּשׁוּ" },
  { id: 5, tense: "past", sentence: "את ___ לפגישה?", sentenceEn: "Did you (f) get ready for the meeting?", blank: "", options: ["הִתְכּוֹנַנְתְּ", "מִתְכּוֹנֶנֶת", "תִּתְכּוֹנְנִי", "הִתְכּוֹנֵן"], correct: "הִתְכּוֹנַנְתְּ" },
  { id: 6, tense: "past", sentence: "אנחנו ___ לפני שיצאנו.", sentenceEn: "We showered before we left.", blank: "", options: ["הִתְרַחַצְנוּ", "מִתְרַחֲצִים", "נִתְרַחֵץ", "הִתְרַחֲצוּ"], correct: "הִתְרַחַצְנוּ" },
  // Present
  { id: 7, tense: "present", sentence: "אני ___ כל יום בשש.", sentenceEn: "I get dressed every day at six.", blank: "", options: ["מִתְלַבֵּשׁ", "הִתְלַבַּשְׁתִּי", "אֶתְלַבֵּשׁ", "הִתְלַבֵּשׁ"], correct: "מִתְלַבֵּשׁ" },
  { id: 8, tense: "present", sentence: "הוא ___ מהסרט.", sentenceEn: "He is excited from the movie.", blank: "", options: ["מִתְרַגֵּשׁ", "הִתְרַגֵּשׁ", "יִתְרַגֵּשׁ", "מִתְרַגֶּשֶׁת"], correct: "מִתְרַגֵּשׁ" },
  { id: 9, tense: "present", sentence: "היא ___ לחתונה.", sentenceEn: "She is getting dressed for the wedding.", blank: "", options: ["מִתְלַבֶּשֶׁת", "הִתְלַבְּשָׁה", "תִּתְלַבֵּשׁ", "מִתְלַבֵּשׁ"], correct: "מִתְלַבֶּשֶׁת" },
  { id: 10, tense: "present", sentence: "הם ___ במגרש.", sentenceEn: "They are warming up at the field.", blank: "", options: ["מִתְחַמְּמִים", "הִתְחַמְּמוּ", "יִתְחַמְּמוּ", "מִתְחַמֶּמֶת"], correct: "מִתְחַמְּמִים" },
  { id: 11, tense: "present", sentence: "אנחנו ___ למבחן.", sentenceEn: "We are preparing for the exam.", blank: "", options: ["מִתְכּוֹנְנִים", "הִתְכּוֹנַנּוּ", "נִתְכּוֹנֵן", "מִתְכּוֹנֵן"], correct: "מִתְכּוֹנְנִים" },
  { id: 12, tense: "present", sentence: "היא ___ בראי כל בוקר.", sentenceEn: "She looks at herself in the mirror every morning.", blank: "", options: ["מִסְתַּכֶּלֶת", "הִסְתַּכְּלָה", "תִּסְתַּכֵּל", "מִסְתַּכֵּל"], correct: "מִסְתַּכֶּלֶת" },
  // Future
  { id: 13, tense: "future", sentence: "אני ___ מהר מחר.", sentenceEn: "I will get dressed quickly tomorrow.", blank: "", options: ["אֶתְלַבֵּשׁ", "הִתְלַבַּשְׁתִּי", "מִתְלַבֵּשׁ", "יִתְלַבֵּשׁ"], correct: "אֶתְלַבֵּשׁ" },
  { id: 14, tense: "future", sentence: "הם ___ בבגדי ספורט.", sentenceEn: "They will get dressed in sportswear.", blank: "", options: ["יִתְלַבְּשׁוּ", "הִתְלַבְּשׁוּ", "מִתְלַבְּשִׁים", "נִתְלַבֵּשׁ"], correct: "יִתְלַבְּשׁוּ" },
  { id: 15, tense: "future", sentence: "אנחנו ___ למסיבה.", sentenceEn: "We will get ready for the party.", blank: "", options: ["נִתְכּוֹנֵן", "הִתְכּוֹנַנּוּ", "מִתְכּוֹנְנִים", "יִתְכּוֹנְנוּ"], correct: "נִתְכּוֹנֵן" },
  { id: 16, tense: "future", sentence: "את ___ מההפתעה.", sentenceEn: "You (f) will be excited by the surprise.", blank: "", options: ["תִּתְרַגְּשִׁי", "הִתְרַגַּשְׁתְּ", "מִתְרַגֶּשֶׁת", "אֶתְרַגֵּשׁ"], correct: "תִּתְרַגְּשִׁי" },
  { id: 17, tense: "future", sentence: "הוא ___ אחרי האימון.", sentenceEn: "He will shower after the workout.", blank: "", options: ["יִתְרַחֵץ", "הִתְרַחֵץ", "מִתְרַחֵץ", "נִתְרַחֵץ"], correct: "יִתְרַחֵץ" },
  { id: 18, tense: "future", sentence: "היא ___ בקורס חדש.", sentenceEn: "She will enroll in a new course.", blank: "", options: ["תִּשְׁתַּלֵּב", "הִשְׁתַּלְּבָה", "מִשְׁתַּלֶּבֶת", "יִשְׁתַּלֵּב"], correct: "תִּשְׁתַּלֵּב" },
];
