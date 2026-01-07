export interface ConjugationRow {
  pronoun: string;
  pronounEn: string;
  past: string;
  present: string;
  future: string;
}

export interface HifilQuestion {
  id: number;
  tense: "past" | "present" | "future";
  sentence: string;
  sentenceEn: string;
  blank: string;
  options: string[];
  correct: string;
}

export const conjugationTable: ConjugationRow[] = [
  { pronoun: "אני", pronounEn: "I", past: "הִלְבַּשְׁתִּי", present: "מַלְבִּיש / מַלְבִּישָׁה", future: "אַלְבִּישׁ" },
  { pronoun: "אתה", pronounEn: "you (m)", past: "הִלְבַּשְׁתָּ", present: "מַלְבִּישׁ", future: "תַּלְבִּישׁ" },
  { pronoun: "את", pronounEn: "you (f)", past: "הִלְבַּשְׁתְּ", present: "מַלְבִּישָׁה", future: "תַּלְבִּישִׁי" },
  { pronoun: "הוא", pronounEn: "he", past: "הִלְבִּישׁ", present: "מַלְבִּישׁ", future: "יַלְבִּישׁ" },
  { pronoun: "היא", pronounEn: "she", past: "הִלְבִּישָׁה", present: "מַלְבִּישָׁה", future: "תַּלְבִּישׁ" },
  { pronoun: "אנחנו", pronounEn: "we", past: "הִלְבַּשְׁנוּ", present: "מַלְבִּישִׁים / מַלְבִּישׁוֹת", future: "נַלְבִּישׁ" },
  { pronoun: "אתם", pronounEn: "you (m.pl)", past: "הִלְבַּשְׁתֶּם", present: "מַלְבִּישִׁים", future: "תַּלְבִּישׁוּ" },
  { pronoun: "אתן", pronounEn: "you (f.pl)", past: "הִלְבַּשְׁתֶּן", present: "מַלְבִּישׁוֹת", future: "תַּלְבֵּשְׁנָה" },
  { pronoun: "הם", pronounEn: "they (m)", past: "הִלְבִּישׁוּ", present: "מַלְבִּישִׁים", future: "יַלְבִּישׁוּ" },
  { pronoun: "הן", pronounEn: "they (f)", past: "הִלְבִּישׁוּ", present: "מַלְבִּישׁוֹת", future: "תַּלְבֵּשְׁנָה" },
];

export const hifilQuestions: HifilQuestion[] = [
  // Past tense questions
  { id: 1, tense: "past", sentence: "אני ___ את הילד בבוקר.", sentenceEn: "I dressed the child in the morning.", blank: "הִלְבַּשְׁתִּי", options: ["הִלְבַּשְׁתִּי", "מַלְבִּישׁ", "אַלְבִּישׁ", "הִלְבִּישׁ"], correct: "הִלְבַּשְׁתִּי" },
  { id: 2, tense: "past", sentence: "אתה ___ את התינוק אתמול.", sentenceEn: "You dressed the baby yesterday.", blank: "הִלְבַּשְׁתָּ", options: ["הִלְבַּשְׁתָּ", "תַּלְבִּישׁ", "מַלְבִּישׁ", "הִלְבַּשְׁתִּי"], correct: "הִלְבַּשְׁתָּ" },
  { id: 3, tense: "past", sentence: "את ___ את הבובה.", sentenceEn: "You (f) dressed the doll.", blank: "הִלְבַּשְׁתְּ", options: ["הִלְבַּשְׁתְּ", "מַלְבִּישָׁה", "תַּלְבִּישִׁי", "הִלְבִּישָׁה"], correct: "הִלְבַּשְׁתְּ" },
  { id: 4, tense: "past", sentence: "הוא ___ את הילדים לפני בית הספר.", sentenceEn: "He dressed the children before school.", blank: "הִלְבִּישׁ", options: ["הִלְבִּישׁ", "מַלְבִּישׁ", "יַלְבִּישׁ", "הִלְבַּשְׁתָּ"], correct: "הִלְבִּישׁ" },
  { id: 5, tense: "past", sentence: "היא ___ את התינוקת בבגדים חמים.", sentenceEn: "She dressed the baby girl in warm clothes.", blank: "הִלְבִּישָׁה", options: ["הִלְבִּישָׁה", "מַלְבִּישָׁה", "תַּלְבִּישׁ", "הִלְבַּשְׁתְּ"], correct: "הִלְבִּישָׁה" },
  { id: 6, tense: "past", sentence: "אנחנו ___ את כל הילדים להצגה.", sentenceEn: "We dressed all the children for the show.", blank: "הִלְבַּשְׁנוּ", options: ["הִלְבַּשְׁנוּ", "נַלְבִּישׁ", "מַלְבִּישִׁים", "הִלְבִּישׁוּ"], correct: "הִלְבַּשְׁנוּ" },
  { id: 7, tense: "past", sentence: "אתם ___ את התלמידים לטיול.", sentenceEn: "You (m.pl) dressed the students for the trip.", blank: "הִלְבַּשְׁתֶּם", options: ["הִלְבַּשְׁתֶּם", "תַּלְבִּישׁוּ", "מַלְבִּישִׁים", "הִלְבַּשְׁנוּ"], correct: "הִלְבַּשְׁתֶּם" },
  { id: 8, tense: "past", sentence: "הם ___ את הבובות בחנות.", sentenceEn: "They dressed the dolls in the store.", blank: "הִלְבִּישׁוּ", options: ["הִלְבִּישׁוּ", "יַלְבִּישׁוּ", "מַלְבִּישִׁים", "הִלְבַּשְׁתֶּם"], correct: "הִלְבִּישׁוּ" },
  
  // Present tense questions
  { id: 9, tense: "present", sentence: "אני ___ את הילד כל בוקר.", sentenceEn: "I dress the child every morning.", blank: "מַלְבִּיש/ה", options: ["מַלְבִּישׁ", "הִלְבַּשְׁתִּי", "אַלְבִּישׁ", "הִלְבִּישׁ"], correct: "מַלְבִּישׁ" },
  { id: 10, tense: "present", sentence: "אתה ___ את התינוק עכשיו.", sentenceEn: "You are dressing the baby now.", blank: "מַלְבִּישׁ", options: ["מַלְבִּישׁ", "הִלְבַּשְׁתָּ", "תַּלְבִּישׁ", "יַלְבִּישׁ"], correct: "מַלְבִּישׁ" },
  { id: 11, tense: "present", sentence: "את ___ את הבת שלך יפה.", sentenceEn: "You (f) dress your daughter nicely.", blank: "מַלְבִּישָׁה", options: ["מַלְבִּישָׁה", "הִלְבַּשְׁתְּ", "תַּלְבִּישִׁי", "מַלְבִּישׁ"], correct: "מַלְבִּישָׁה" },
  { id: 12, tense: "present", sentence: "הוא ___ את הילדים בזהירות.", sentenceEn: "He dresses the children carefully.", blank: "מַלְבִּישׁ", options: ["מַלְבִּישׁ", "הִלְבִּישׁ", "יַלְבִּישׁ", "מַלְבִּישָׁה"], correct: "מַלְבִּישׁ" },
  { id: 13, tense: "present", sentence: "היא ___ את התינוק בכל יום.", sentenceEn: "She dresses the baby every day.", blank: "מַלְבִּישָׁה", options: ["מַלְבִּישָׁה", "הִלְבִּישָׁה", "תַּלְבִּישׁ", "מַלְבִּישׁ"], correct: "מַלְבִּישָׁה" },
  { id: 14, tense: "present", sentence: "אנחנו ___ את הילדים לבית הספר.", sentenceEn: "We dress the children for school.", blank: "מַלְבִּישִׁים", options: ["מַלְבִּישִׁים", "הִלְבַּשְׁנוּ", "נַלְבִּישׁ", "מַלְבִּישׁוֹת"], correct: "מַלְבִּישִׁים" },
  { id: 15, tense: "present", sentence: "הם ___ את הדוגמניות לתצוגה.", sentenceEn: "They dress the models for the show.", blank: "מַלְבִּישִׁים", options: ["מַלְבִּישִׁים", "הִלְבִּישׁוּ", "יַלְבִּישׁוּ", "מַלְבִּישׁוֹת"], correct: "מַלְבִּישִׁים" },
  { id: 16, tense: "present", sentence: "הן ___ את הבובות בחנות.", sentenceEn: "They (f) dress the dolls in the store.", blank: "מַלְבִּישׁוֹת", options: ["מַלְבִּישׁוֹת", "הִלְבִּישׁוּ", "תַּלְבֵּשְׁנָה", "מַלְבִּישִׁים"], correct: "מַלְבִּישׁוֹת" },
  
  // Future tense questions
  { id: 17, tense: "future", sentence: "אני ___ את הילד מחר בבוקר.", sentenceEn: "I will dress the child tomorrow morning.", blank: "אַלְבִּישׁ", options: ["אַלְבִּישׁ", "הִלְבַּשְׁתִּי", "מַלְבִּישׁ", "יַלְבִּישׁ"], correct: "אַלְבִּישׁ" },
  { id: 18, tense: "future", sentence: "אתה ___ את התינוק אחרי האמבטיה.", sentenceEn: "You will dress the baby after the bath.", blank: "תַּלְבִּישׁ", options: ["תַּלְבִּישׁ", "הִלְבַּשְׁתָּ", "מַלְבִּישׁ", "אַלְבִּישׁ"], correct: "תַּלְבִּישׁ" },
  { id: 19, tense: "future", sentence: "את ___ את הילדה לחתונה.", sentenceEn: "You (f) will dress the girl for the wedding.", blank: "תַּלְבִּישִׁי", options: ["תַּלְבִּישִׁי", "הִלְבַּשְׁתְּ", "מַלְבִּישָׁה", "תַּלְבִּישׁ"], correct: "תַּלְבִּישִׁי" },
  { id: 20, tense: "future", sentence: "הוא ___ את הבן שלו לבד.", sentenceEn: "He will dress his son by himself.", blank: "יַלְבִּישׁ", options: ["יַלְבִּישׁ", "הִלְבִּישׁ", "מַלְבִּישׁ", "תַּלְבִּישׁ"], correct: "יַלְבִּישׁ" },
  { id: 21, tense: "future", sentence: "היא ___ את התינוקת בשמלה חדשה.", sentenceEn: "She will dress the baby girl in a new dress.", blank: "תַּלְבִּישׁ", options: ["תַּלְבִּישׁ", "הִלְבִּישָׁה", "מַלְבִּישָׁה", "יַלְבִּישׁ"], correct: "תַּלְבִּישׁ" },
  { id: 22, tense: "future", sentence: "אנחנו ___ את כולם להצגה.", sentenceEn: "We will dress everyone for the show.", blank: "נַלְבִּישׁ", options: ["נַלְבִּישׁ", "הִלְבַּשְׁנוּ", "מַלְבִּישִׁים", "יַלְבִּישׁוּ"], correct: "נַלְבִּישׁ" },
  { id: 23, tense: "future", sentence: "אתם ___ את הילדים מהר.", sentenceEn: "You (m.pl) will dress the children quickly.", blank: "תַּלְבִּישׁוּ", options: ["תַּלְבִּישׁוּ", "הִלְבַּשְׁתֶּם", "מַלְבִּישִׁים", "נַלְבִּישׁ"], correct: "תַּלְבִּישׁוּ" },
  { id: 24, tense: "future", sentence: "הם ___ את השחקנים לפני ההופעה.", sentenceEn: "They will dress the actors before the show.", blank: "יַלְבִּישׁוּ", options: ["יַלְבִּישׁוּ", "הִלְבִּישׁוּ", "מַלְבִּישִׁים", "תַּלְבִּישׁוּ"], correct: "יַלְבִּישׁוּ" },
];
