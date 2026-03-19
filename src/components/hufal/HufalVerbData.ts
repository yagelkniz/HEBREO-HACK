import { ConjugationRow, BinyanQuestion } from "../binyanim/BinyanVerbPractice";

export const hufalExplanationHe = "בניין הופעל הוא הצורה הסבילה של בניין הפעיל. הוא מתאר פעולה שמישהו ביצע על הנושא (הנושא לא עשה את הפעולה בעצמו). לדוגמה: הילד הוּלְבַּשׁ (מישהו הלביש אותו), המנגינה הוּשְׁמְעָה (מישהו השמיע אותה).";

export const hufalExplanationEn = "Huf'al is the passive form of Hif'il. It describes an action performed on the subject (the subject didn't do it). Examples: הילד הוּלְבַּשׁ (the child was dressed by someone), המנגינה הוּשְׁמְעָה (the melody was played by someone).";

// Verb: הולבש (was dressed by someone) - passive of הלביש
export const hufalConjugationTable: ConjugationRow[] = [
  { pronoun: "אני", pronounEn: "I", past: "הוּלְבַּשְׁתִּי", present: "מוּלְבָּשׁ / מוּלְבֶּשֶׁת", future: "אוּלְבַּשׁ" },
  { pronoun: "אתה", pronounEn: "you (m)", past: "הוּלְבַּשְׁתָּ", present: "מוּלְבָּשׁ", future: "תּוּלְבַּשׁ" },
  { pronoun: "את", pronounEn: "you (f)", past: "הוּלְבַּשְׁתְּ", present: "מוּלְבֶּשֶׁת", future: "תּוּלְבְּשִׁי" },
  { pronoun: "הוא", pronounEn: "he", past: "הוּלְבַּשׁ", present: "מוּלְבָּשׁ", future: "יוּלְבַּשׁ" },
  { pronoun: "היא", pronounEn: "she", past: "הוּלְבְּשָׁה", present: "מוּלְבֶּשֶׁת", future: "תּוּלְבַּשׁ" },
  { pronoun: "אנחנו", pronounEn: "we", past: "הוּלְבַּשְׁנוּ", present: "מוּלְבָּשִׁים / מוּלְבָּשׁוֹת", future: "נוּלְבַּשׁ" },
  { pronoun: "אתם", pronounEn: "you (m.pl)", past: "הוּלְבַּשְׁתֶּם", present: "מוּלְבָּשִׁים", future: "תּוּלְבְּשׁוּ" },
  { pronoun: "אתן", pronounEn: "you (f.pl)", past: "הוּלְבַּשְׁתֶּן", present: "מוּלְבָּשׁוֹת", future: "תּוּלְבַּשְׁנָה" },
  { pronoun: "הם", pronounEn: "they (m)", past: "הוּלְבְּשׁוּ", present: "מוּלְבָּשִׁים", future: "יוּלְבְּשׁוּ" },
  { pronoun: "הן", pronounEn: "they (f)", past: "הוּלְבְּשׁוּ", present: "מוּלְבָּשׁוֹת", future: "תּוּלְבַּשְׁנָה" },
];

export const hufalQuestions: BinyanQuestion[] = [
  // Past
  { id: 1, tense: "past", sentence: "הילד ___ בבגדים חמים על ידי אמא.", sentenceEn: "The child was dressed in warm clothes by mom.", blank: "", options: ["הוּלְבַּשׁ", "הִלְבִּישׁ", "מוּלְבָּשׁ", "יוּלְבַּשׁ"], correct: "הוּלְבַּשׁ" },
  { id: 2, tense: "past", sentence: "המנגינה ___ ברמקולים.", sentenceEn: "The melody was played through the speakers.", blank: "", options: ["הוּשְׁמְעָה", "הִשְׁמִיעָה", "מוּשְׁמַעַת", "תּוּשְׁמַע"], correct: "הוּשְׁמְעָה" },
  { id: 3, tense: "past", sentence: "האורחים ___ למסיבה.", sentenceEn: "The guests were invited to the party.", blank: "", options: ["הוּזְמְנוּ", "הִזְמִינוּ", "מוּזְמָנִים", "יוּזְמְנוּ"], correct: "הוּזְמְנוּ" },
  { id: 4, tense: "past", sentence: "התלמיד ___ לכיתה אחרת.", sentenceEn: "The student was transferred to another class.", blank: "", options: ["הוּעְבַּר", "הֶעֱבִיר", "מוּעְבָּר", "יוּעְבַּר"], correct: "הוּעְבַּר" },
  { id: 5, tense: "past", sentence: "הסרט ___ בטלוויזיה אתמול.", sentenceEn: "The movie was shown on television yesterday.", blank: "", options: ["הוּקְרַן", "הִקְרִין", "מוּקְרָן", "יוּקְרַן"], correct: "הוּקְרַן" },
  { id: 6, tense: "past", sentence: "ההחלטה ___ על ידי הוועדה.", sentenceEn: "The decision was made by the committee.", blank: "", options: ["הוּחְלְטָה", "הֶחֱלִיטָה", "מוּחְלֶטֶת", "תּוּחְלַט"], correct: "הוּחְלְטָה" },
  // Present
  { id: 7, tense: "present", sentence: "הילד ___ יפה לבית הספר.", sentenceEn: "The child is dressed nicely for school.", blank: "", options: ["מוּלְבָּשׁ", "הוּלְבַּשׁ", "מַלְבִּישׁ", "יוּלְבַּשׁ"], correct: "מוּלְבָּשׁ" },
  { id: 8, tense: "present", sentence: "השיר ___ ברדיו כל יום.", sentenceEn: "The song is played on the radio every day.", blank: "", options: ["מוּשְׁמָע", "הוּשְׁמַע", "מַשְׁמִיעַ", "יוּשְׁמַע"], correct: "מוּשְׁמָע" },
  { id: 9, tense: "present", sentence: "כל העובדים ___ לישיבות.", sentenceEn: "All employees are invited to the meetings.", blank: "", options: ["מוּזְמָנִים", "הוּזְמְנוּ", "מַזְמִינִים", "יוּזְמְנוּ"], correct: "מוּזְמָנִים" },
  { id: 10, tense: "present", sentence: "המכתבים ___ בדואר.", sentenceEn: "The letters are delivered by mail.", blank: "", options: ["מוּעְבָּרִים", "הוּעְבְּרוּ", "מַעֲבִירִים", "יוּעְבְּרוּ"], correct: "מוּעְבָּרִים" },
  { id: 11, tense: "present", sentence: "הסרט ___ בקולנוע.", sentenceEn: "The movie is being screened at the cinema.", blank: "", options: ["מוּקְרָן", "הוּקְרַן", "מַקְרִין", "יוּקְרַן"], correct: "מוּקְרָן" },
  { id: 12, tense: "present", sentence: "ההחלטות ___ על ידי ההנהלה.", sentenceEn: "The decisions are made by the management.", blank: "", options: ["מוּחְלָטוֹת", "הוּחְלְטוּ", "מַחְלִיטוֹת", "תּוּחְלַטְנָה"], correct: "מוּחְלָטוֹת" },
  // Future
  { id: 13, tense: "future", sentence: "הילד ___ בבגדים חגיגיים מחר.", sentenceEn: "The child will be dressed in festive clothes tomorrow.", blank: "", options: ["יוּלְבַּשׁ", "הוּלְבַּשׁ", "מוּלְבָּשׁ", "הִלְבִּישׁ"], correct: "יוּלְבַּשׁ" },
  { id: 14, tense: "future", sentence: "ההודעה ___ מחר בבוקר.", sentenceEn: "The announcement will be made tomorrow morning.", blank: "", options: ["תּוּשְׁמַע", "הוּשְׁמְעָה", "מוּשְׁמַעַת", "הִשְׁמִיעָה"], correct: "תּוּשְׁמַע" },
  { id: 15, tense: "future", sentence: "כולם ___ לאירוע.", sentenceEn: "Everyone will be invited to the event.", blank: "", options: ["יוּזְמְנוּ", "הוּזְמְנוּ", "מוּזְמָנִים", "הִזְמִינוּ"], correct: "יוּזְמְנוּ" },
  { id: 16, tense: "future", sentence: "הסרט ___ בשבוע הבא.", sentenceEn: "The movie will be screened next week.", blank: "", options: ["יוּקְרַן", "הוּקְרַן", "מוּקְרָן", "הִקְרִין"], correct: "יוּקְרַן" },
  { id: 17, tense: "future", sentence: "התלמידים ___ לכיתה חדשה.", sentenceEn: "The students will be transferred to a new class.", blank: "", options: ["יוּעְבְּרוּ", "הוּעְבְּרוּ", "מוּעְבָּרִים", "הֶעֱבִירוּ"], correct: "יוּעְבְּרוּ" },
  { id: 18, tense: "future", sentence: "ההחלטה ___ בישיבה הבאה.", sentenceEn: "The decision will be made at the next meeting.", blank: "", options: ["תּוּחְלַט", "הוּחְלְטָה", "מוּחְלֶטֶת", "הֶחֱלִיטָה"], correct: "תּוּחְלַט" },
];
