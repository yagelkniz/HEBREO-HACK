import { ConjugationRow, BinyanQuestion } from "../binyanim/BinyanVerbPractice";

export const nifalExplanationHe = "בניין נפעל משמש בעיקר לפעולות סבילות (הפעולה קורה לנושא, לא שהנושא עושה אותה), לפעולות שקורות מאליהן, ולפעולות הדדיות. לדוגמה: הדלת נפתחה (מאליה), הספר נכתב (על ידי מישהו), הם נפגשו (אחד עם השני).";

export const nifalExplanationEn = "Nif'al is used for passive actions (something happens to the subject), actions that happen by themselves, and reciprocal actions. Examples: הדלת נפתחה (the door opened by itself), הספר נכתב (the book was written), הם נפגשו (they met each other).";

// Verb: להיפתח / נפתח (to be opened / to open by itself)
export const nifalConjugationTable: ConjugationRow[] = [
  { pronoun: "אני", pronounEn: "I", past: "נִפְתַּחְתִּי", present: "נִפְתָּח / נִפְתַּחַת", future: "אֶפָּתַח" },
  { pronoun: "אתה", pronounEn: "you (m)", past: "נִפְתַּחְתָּ", present: "נִפְתָּח", future: "תִּפָּתַח" },
  { pronoun: "את", pronounEn: "you (f)", past: "נִפְתַּחְתְּ", present: "נִפְתַּחַת", future: "תִּפָּתְחִי" },
  { pronoun: "הוא", pronounEn: "he", past: "נִפְתַּח", present: "נִפְתָּח", future: "יִפָּתַח" },
  { pronoun: "היא", pronounEn: "she", past: "נִפְתְּחָה", present: "נִפְתַּחַת", future: "תִּפָּתַח" },
  { pronoun: "אנחנו", pronounEn: "we", past: "נִפְתַּחְנוּ", present: "נִפְתָּחִים / נִפְתָּחוֹת", future: "נִפָּתַח" },
  { pronoun: "אתם", pronounEn: "you (m.pl)", past: "נִפְתַּחְתֶּם", present: "נִפְתָּחִים", future: "תִּפָּתְחוּ" },
  { pronoun: "אתן", pronounEn: "you (f.pl)", past: "נִפְתַּחְתֶּן", present: "נִפְתָּחוֹת", future: "תִּפָּתַחְנָה" },
  { pronoun: "הם", pronounEn: "they (m)", past: "נִפְתְּחוּ", present: "נִפְתָּחִים", future: "יִפָּתְחוּ" },
  { pronoun: "הן", pronounEn: "they (f)", past: "נִפְתְּחוּ", present: "נִפְתָּחוֹת", future: "תִּפָּתַחְנָה" },
];

export const nifalQuestions: BinyanQuestion[] = [
  // Past
  { id: 1, tense: "past", sentence: "הדלת ___ ברוח חזקה.", sentenceEn: "The door was opened by a strong wind.", blank: "", options: ["נִפְתְּחָה", "פָּתְחָה", "תִּפָּתַח", "נִפְתַּחַת"], correct: "נִפְתְּחָה" },
  { id: 2, tense: "past", sentence: "הכוס ___ כשנפלה.", sentenceEn: "The glass broke when it fell.", blank: "", options: ["נִשְׁבְּרָה", "שָׁבְרָה", "תִּשָּׁבֵר", "נִשְׁבֶּרֶת"], correct: "נִשְׁבְּרָה" },
  { id: 3, tense: "past", sentence: "הם ___ בקפה אתמול.", sentenceEn: "They met at the café yesterday.", blank: "", options: ["נִפְגְּשׁוּ", "פָּגְשׁוּ", "יִפָּגְשׁוּ", "נִפְגָּשִׁים"], correct: "נִפְגְּשׁוּ" },
  { id: 4, tense: "past", sentence: "המכתב ___ בדואר.", sentenceEn: "The letter was sent by mail.", blank: "", options: ["נִשְׁלַח", "שָׁלַח", "יִשָּׁלַח", "נִשְׁלָח"], correct: "נִשְׁלַח" },
  { id: 5, tense: "past", sentence: "החנות ___ בשעה תשע.", sentenceEn: "The store was closed at nine o'clock.", blank: "", options: ["נִסְגְּרָה", "סָגְרָה", "תִּסָּגֵר", "נִסְגֶּרֶת"], correct: "נִסְגְּרָה" },
  { id: 6, tense: "past", sentence: "הספר ___ בשנת 2020.", sentenceEn: "The book was written in 2020.", blank: "", options: ["נִכְתַּב", "כָּתַב", "יִכָּתֵב", "נִכְתָּב"], correct: "נִכְתַּב" },
  // Present
  { id: 7, tense: "present", sentence: "הדלת ___ כל בוקר בשמונה.", sentenceEn: "The door opens every morning at eight.", blank: "", options: ["נִפְתַּחַת", "פּוֹתַחַת", "תִּפָּתַח", "נִפְתְּחָה"], correct: "נִפְתַּחַת" },
  { id: 8, tense: "present", sentence: "השפה הזו ___ רק באירופה.", sentenceEn: "This language is spoken only in Europe.", blank: "", options: ["נִשְׁמַעַת", "שׁוֹמַעַת", "תִּשָּׁמַע", "נִשְׁמְעָה"], correct: "נִשְׁמַעַת" },
  { id: 9, tense: "present", sentence: "המכוניות ___ בבית החרושת.", sentenceEn: "The cars are built in the factory.", blank: "", options: ["נִבְנוֹת", "בּוֹנוֹת", "תִּבָּנֶינָה", "נִבְנוּ"], correct: "נִבְנוֹת" },
  { id: 10, tense: "present", sentence: "הבעיה ___ מאליה.", sentenceEn: "The problem solves itself.", blank: "", options: ["נִפְתֶּרֶת", "פּוֹתֶרֶת", "תִּפָּתֵר", "נִפְתְּרָה"], correct: "נִפְתֶּרֶת" },
  { id: 11, tense: "present", sentence: "הילדים ___ בגן בכל יום.", sentenceEn: "The children meet at the kindergarten every day.", blank: "", options: ["נִפְגָּשִׁים", "פּוֹגְשִׁים", "יִפָּגְשׁוּ", "נִפְגְּשׁוּ"], correct: "נִפְגָּשִׁים" },
  { id: 12, tense: "present", sentence: "ההודעה ___ בכל יום.", sentenceEn: "The message is sent every day.", blank: "", options: ["נִשְׁלַחַת", "שׁוֹלַחַת", "תִּשָּׁלַח", "נִשְׁלְחָה"], correct: "נִשְׁלַחַת" },
  // Future
  { id: 13, tense: "future", sentence: "המוזיאון ___ מחר.", sentenceEn: "The museum will open tomorrow.", blank: "", options: ["יִפָּתַח", "נִפְתַּח", "פּוֹתֵחַ", "נִפְתָּח"], correct: "יִפָּתַח" },
  { id: 14, tense: "future", sentence: "הבניין ___ בעוד שנה.", sentenceEn: "The building will be built in a year.", blank: "", options: ["יִבָּנֶה", "נִבְנָה", "בּוֹנֶה", "נִבְנֶה"], correct: "יִבָּנֶה" },
  { id: 15, tense: "future", sentence: "אנחנו ___ מחר בערב.", sentenceEn: "We will meet tomorrow evening.", blank: "", options: ["נִפָּגֵשׁ", "נִפְגַּשְׁנוּ", "נִפְגָּשִׁים", "יִפָּגְשׁוּ"], correct: "נִפָּגֵשׁ" },
  { id: 16, tense: "future", sentence: "ההודעה ___ מחר.", sentenceEn: "The message will be sent tomorrow.", blank: "", options: ["תִּשָּׁלַח", "נִשְׁלְחָה", "נִשְׁלַחַת", "יִשָּׁלַח"], correct: "תִּשָּׁלַח" },
  { id: 17, tense: "future", sentence: "הכוסות ___ אם לא תיזהרו.", sentenceEn: "The glasses will break if you're not careful.", blank: "", options: ["יִשָּׁבְרוּ", "נִשְׁבְּרוּ", "נִשְׁבָּרִים", "שׁוֹבְרִים"], correct: "יִשָּׁבְרוּ" },
  { id: 18, tense: "future", sentence: "החנות ___ בשעה עשר.", sentenceEn: "The store will close at ten.", blank: "", options: ["תִּסָּגֵר", "נִסְגְּרָה", "נִסְגֶּרֶת", "יִסָּגֵר"], correct: "תִּסָּגֵר" },
];
