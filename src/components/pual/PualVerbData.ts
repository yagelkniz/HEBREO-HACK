import { ConjugationRow, BinyanQuestion } from "../binyanim/BinyanVerbPractice";

export const pualExplanationHe = "בניין פועל הוא הצורה הסבילה של בניין פיעל. הוא מתאר פעולה שנעשתה לנושא על ידי מישהו אחר. לדוגמה: הסיפור סוּפַּר (מישהו סיפר אותו), האוכל בּוּשַּׁל (מישהו בישל אותו), המכשיר תּוּקַּן (מישהו תיקן אותו).";

export const pualExplanationEn = "Pu'al is the passive form of Pi'el. It describes an action done to the subject by someone else. Examples: הסיפור סוּפַּר (the story was told), האוכל בּוּשַּׁל (the food was cooked), המכשיר תּוּקַּן (the device was fixed).";

// Verb: סופר (was told) - passive of סיפר
export const pualConjugationTable: ConjugationRow[] = [
  { pronoun: "אני", pronounEn: "I", past: "סוּפַּרְתִּי", present: "מְסוּפָּר / מְסוּפֶּרֶת", future: "אֲסוּפַּר" },
  { pronoun: "אתה", pronounEn: "you (m)", past: "סוּפַּרְתָּ", present: "מְסוּפָּר", future: "תְּסוּפַּר" },
  { pronoun: "את", pronounEn: "you (f)", past: "סוּפַּרְתְּ", present: "מְסוּפֶּרֶת", future: "תְּסוּפְּרִי" },
  { pronoun: "הוא", pronounEn: "he", past: "סוּפַּר", present: "מְסוּפָּר", future: "יְסוּפַּר" },
  { pronoun: "היא", pronounEn: "she", past: "סוּפְּרָה", present: "מְסוּפֶּרֶת", future: "תְּסוּפַּר" },
  { pronoun: "אנחנו", pronounEn: "we", past: "סוּפַּרְנוּ", present: "מְסוּפָּרִים / מְסוּפָּרוֹת", future: "נְסוּפַּר" },
  { pronoun: "אתם", pronounEn: "you (m.pl)", past: "סוּפַּרְתֶּם", present: "מְסוּפָּרִים", future: "תְּסוּפְּרוּ" },
  { pronoun: "אתן", pronounEn: "you (f.pl)", past: "סוּפַּרְתֶּן", present: "מְסוּפָּרוֹת", future: "תְּסוּפַּרְנָה" },
  { pronoun: "הם", pronounEn: "they (m)", past: "סוּפְּרוּ", present: "מְסוּפָּרִים", future: "יְסוּפְּרוּ" },
  { pronoun: "הן", pronounEn: "they (f)", past: "סוּפְּרוּ", present: "מְסוּפָּרוֹת", future: "תְּסוּפַּרְנָה" },
];

export const pualQuestions: BinyanQuestion[] = [
  // Past
  { id: 1, tense: "past", sentence: "הסיפור ___ לכל הילדים.", sentenceEn: "The story was told to all the children.", blank: "", options: ["סוּפַּר", "סִפֵּר", "מְסוּפָּר", "יְסוּפַּר"], correct: "סוּפַּר" },
  { id: 2, tense: "past", sentence: "האוכל ___ על ידי השף.", sentenceEn: "The food was cooked by the chef.", blank: "", options: ["בּוּשַּׁל", "בִּשֵּׁל", "מְבוּשָּׁל", "יְבוּשַּׁל"], correct: "בּוּשַּׁל" },
  { id: 3, tense: "past", sentence: "המכשיר ___ אתמול.", sentenceEn: "The device was fixed yesterday.", blank: "", options: ["תּוּקַּן", "תִּקֵּן", "מְתוּקָּן", "יְתוּקַּן"], correct: "תּוּקַּן" },
  { id: 4, tense: "past", sentence: "השיר ___ בקול רם.", sentenceEn: "The song was sung loudly.", blank: "", options: ["שׁוּרַר", "שִׁרֵר", "מְשׁוּרָר", "יְשׁוּרַר"], correct: "שׁוּרַר" },
  { id: 5, tense: "past", sentence: "הבית ___ מחדש.", sentenceEn: "The house was renovated.", blank: "", options: ["שׁוּפַּץ", "שִׁפֵּץ", "מְשׁוּפָּץ", "יְשׁוּפַּץ"], correct: "שׁוּפַּץ" },
  { id: 6, tense: "past", sentence: "הילדים ___ ביד חמה.", sentenceEn: "The children were received warmly.", blank: "", options: ["קוּבְּלוּ", "קִבְּלוּ", "מְקוּבָּלִים", "יְקוּבְּלוּ"], correct: "קוּבְּלוּ" },
  // Present
  { id: 7, tense: "present", sentence: "הסיפור הזה ___ בכל מקום.", sentenceEn: "This story is told everywhere.", blank: "", options: ["מְסוּפָּר", "סוּפַּר", "סִפֵּר", "יְסוּפַּר"], correct: "מְסוּפָּר" },
  { id: 8, tense: "present", sentence: "האוכל ___ היטב.", sentenceEn: "The food is well-cooked.", blank: "", options: ["מְבוּשָּׁל", "בּוּשַּׁל", "בִּשֵּׁל", "יְבוּשַּׁל"], correct: "מְבוּשָּׁל" },
  { id: 9, tense: "present", sentence: "המכונית ___ ומוכנה.", sentenceEn: "The car is fixed and ready.", blank: "", options: ["מְתוּקֶּנֶת", "תּוּקְּנָה", "תִּקְּנָה", "תְּתוּקַּן"], correct: "מְתוּקֶּנֶת" },
  { id: 10, tense: "present", sentence: "הדירה ___ ומודרנית.", sentenceEn: "The apartment is renovated and modern.", blank: "", options: ["מְשׁוּפֶּצֶת", "שׁוּפְּצָה", "שִׁפְּצָה", "תְּשׁוּפַּץ"], correct: "מְשׁוּפֶּצֶת" },
  { id: 11, tense: "present", sentence: "השירים ___ בכל הארץ.", sentenceEn: "The songs are sung across the country.", blank: "", options: ["מְשׁוּרָרִים", "שׁוּרְרוּ", "שִׁרְרוּ", "יְשׁוּרְרוּ"], correct: "מְשׁוּרָרִים" },
  { id: 12, tense: "present", sentence: "החוקים ___ על ידי כולם.", sentenceEn: "The rules are accepted by everyone.", blank: "", options: ["מְקוּבָּלִים", "קוּבְּלוּ", "קִבְּלוּ", "יְקוּבְּלוּ"], correct: "מְקוּבָּלִים" },
  // Future
  { id: 13, tense: "future", sentence: "הסיפור ___ מחר בשיעור.", sentenceEn: "The story will be told tomorrow in class.", blank: "", options: ["יְסוּפַּר", "סוּפַּר", "מְסוּפָּר", "סִפֵּר"], correct: "יְסוּפַּר" },
  { id: 14, tense: "future", sentence: "האוכל ___ לפני האירוע.", sentenceEn: "The food will be cooked before the event.", blank: "", options: ["יְבוּשַּׁל", "בּוּשַּׁל", "מְבוּשָּׁל", "בִּשֵּׁל"], correct: "יְבוּשַּׁל" },
  { id: 15, tense: "future", sentence: "המזגן ___ בשבוע הבא.", sentenceEn: "The AC will be fixed next week.", blank: "", options: ["יְתוּקַּן", "תּוּקַּן", "מְתוּקָּן", "תִּקֵּן"], correct: "יְתוּקַּן" },
  { id: 16, tense: "future", sentence: "הבניין ___ בקרוב.", sentenceEn: "The building will be renovated soon.", blank: "", options: ["יְשׁוּפַּץ", "שׁוּפַּץ", "מְשׁוּפָּץ", "שִׁפֵּץ"], correct: "יְשׁוּפַּץ" },
  { id: 17, tense: "future", sentence: "השיר ___ בהופעה.", sentenceEn: "The song will be sung at the show.", blank: "", options: ["יְשׁוּרַר", "שׁוּרַר", "מְשׁוּרָר", "שִׁרֵר"], correct: "יְשׁוּרַר" },
  { id: 18, tense: "future", sentence: "ההצעה ___ על ידי הוועדה.", sentenceEn: "The proposal will be accepted by the committee.", blank: "", options: ["תְּקוּבַּל", "קוּבְּלָה", "מְקוּבֶּלֶת", "קִבְּלָה"], correct: "תְּקוּבַּל" },
];
