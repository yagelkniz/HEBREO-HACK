export interface VocabularyWord {
  hebrew: string;
  hebrewWithNikud: string;
  transliteration: string;
  english: string;
}

export interface VocabularyCategory {
  key: string;
  nameHe: string;
  nameEn: string;
  words: VocabularyWord[];
}

export const vocabularyData: VocabularyCategory[] = [
  {
    key: "days",
    nameHe: "ימים ושבוע",
    nameEn: "Days and Week",
    words: [
      { hebrew: "יום ראשון", hebrewWithNikud: "יוֹם רִאשׁוֹן", transliteration: "yom rishon", english: "Sunday" },
      { hebrew: "יום שני", hebrewWithNikud: "יוֹם שֵׁנִי", transliteration: "yom sheni", english: "Monday" },
      { hebrew: "יום שלישי", hebrewWithNikud: "יוֹם שְׁלִישִׁי", transliteration: "yom shlishi", english: "Tuesday" },
      { hebrew: "יום רביעי", hebrewWithNikud: "יוֹם רְבִיעִי", transliteration: "yom revi'i", english: "Wednesday" },
      { hebrew: "יום חמישי", hebrewWithNikud: "יוֹם חֲמִישִׁי", transliteration: "yom chamishi", english: "Thursday" },
      { hebrew: "יום שישי", hebrewWithNikud: "יוֹם שִׁישִׁי", transliteration: "yom shishi", english: "Friday" },
      { hebrew: "שבת", hebrewWithNikud: "שַׁבָּת", transliteration: "shabbat", english: "Saturday" },
      { hebrew: "שבוע", hebrewWithNikud: "שָׁבוּעַ", transliteration: "shavua", english: "week" },
      { hebrew: "יום", hebrewWithNikud: "יוֹם", transliteration: "yom", english: "day" },
      { hebrew: "היום", hebrewWithNikud: "הַיּוֹם", transliteration: "hayom", english: "today" },
      { hebrew: "אתמול", hebrewWithNikud: "אֶתְמוֹל", transliteration: "etmol", english: "yesterday" },
      { hebrew: "מחר", hebrewWithNikud: "מָחָר", transliteration: "machar", english: "tomorrow" },
      { hebrew: "בוקר", hebrewWithNikud: "בֹּקֶר", transliteration: "boker", english: "morning" },
      { hebrew: "צהריים", hebrewWithNikud: "צָהֳרַיִם", transliteration: "tsohorayim", english: "noon" },
      { hebrew: "ערב", hebrewWithNikud: "עֶרֶב", transliteration: "erev", english: "evening" },
      { hebrew: "לילה", hebrewWithNikud: "לַיְלָה", transliteration: "layla", english: "night" }
    ]
  },
  {
    key: "places",
    nameHe: "מקומות נפוצים",
    nameEn: "Common Places",
    words: [
      { hebrew: "בית", hebrewWithNikud: "בַּיִת", transliteration: "bayit", english: "house/home" },
      { hebrew: "בית ספר", hebrewWithNikud: "בֵּית סֵפֶר", transliteration: "beit sefer", english: "school" },
      { hebrew: "בית חולים", hebrewWithNikud: "בֵּית חוֹלִים", transliteration: "beit cholim", english: "hospital" },
      { hebrew: "חנות", hebrewWithNikud: "חֲנוּת", transliteration: "chanut", english: "shop/store" },
      { hebrew: "סופרמרקט", hebrewWithNikud: "סוּפֶּרְמַרְקֶט", transliteration: "supermarket", english: "supermarket" },
      { hebrew: "מסעדה", hebrewWithNikud: "מִסְעָדָה", transliteration: "mis'ada", english: "restaurant" },
      { hebrew: "בית קפה", hebrewWithNikud: "בֵּית קָפֶה", transliteration: "beit kafe", english: "coffee shop" },
      { hebrew: "פארק", hebrewWithNikud: "פַּארְק", transliteration: "park", english: "park" },
      { hebrew: "תחנת אוטובוס", hebrewWithNikud: "תַּחֲנַת אוֹטוֹבּוּס", transliteration: "tachanat autobus", english: "bus station" },
      { hebrew: "תחנת רכבת", hebrewWithNikud: "תַּחֲנַת רַכֶּבֶת", transliteration: "tachanat rakevet", english: "train station" },
      { hebrew: "בנק", hebrewWithNikud: "בַּנְק", transliteration: "bank", english: "bank" },
      { hebrew: "דואר", hebrewWithNikud: "דֹּאַר", transliteration: "do'ar", english: "post office" },
      { hebrew: "תיאטרון", hebrewWithNikud: "תֵּאַטְרוֹן", transliteration: "te'atron", english: "theater" },
      { hebrew: "קולנוע", hebrewWithNikud: "קוֹלְנוֹעַ", transliteration: "kolno'a", english: "cinema" },
      { hebrew: "חוף", hebrewWithNikud: "חוֹף", transliteration: "chof", english: "beach" },
      { hebrew: "הר", hebrewWithNikud: "הַר", transliteration: "har", english: "mountain" },
      { hebrew: "עיר", hebrewWithNikud: "עִיר", transliteration: "ir", english: "city" },
      { hebrew: "כפר", hebrewWithNikud: "כְּפָר", transliteration: "kfar", english: "village" },
      { hebrew: "רחוב", hebrewWithNikud: "רְחוֹב", transliteration: "rechov", english: "street" },
      { hebrew: "שוק", hebrewWithNikud: "שׁוּק", transliteration: "shuk", english: "market" }
    ]
  }
];

// Fill-in-the-blank questions for practice
export interface FillQuestion {
  sentence: string;
  answer: string;
  options: string[];
  translation: string;
}

export const easyQuestions: FillQuestion[] = [
  // Days - simple matching
  { sentence: "היום יום ___. מחר יום שני.", answer: "ראשון", options: ["ראשון", "שני", "שלישי", "רביעי"], translation: "Today is ___. Tomorrow is Monday." },
  { sentence: "אני הולך לבית ___ כל בוקר.", answer: "ספר", options: ["ספר", "חולים", "קפה", "כנסת"], translation: "I go to ___ every morning." },
  { sentence: "בשבת אני נח בבית. שבת זה יום ___.", answer: "שביעי", options: ["שביעי", "ראשון", "שני", "חמישי"], translation: "On Saturday I rest at home. Saturday is the ___ day." },
  { sentence: "אני קונה לחם ב___.", answer: "חנות", options: ["חנות", "בנק", "פארק", "הר"], translation: "I buy bread at the ___." },
  { sentence: "אחרי יום חמישי בא יום ___.", answer: "שישי", options: ["שישי", "רביעי", "שלישי", "שני"], translation: "After Thursday comes ___." },
  { sentence: "הילדים משחקים ב___.", answer: "פארק", options: ["פארק", "בנק", "דואר", "בית חולים"], translation: "The children play in the ___." },
  { sentence: "אני אוכל ארוחת ___ בשמונה.", answer: "בוקר", options: ["בוקר", "ערב", "צהריים", "לילה"], translation: "I eat ___ at eight." },
  { sentence: "אנחנו רואים סרט ב___.", answer: "קולנוע", options: ["קולנוע", "בנק", "דואר", "חנות"], translation: "We watch a movie at the ___." },
  { sentence: "הרופא עובד ב___.", answer: "בית חולים", options: ["בית חולים", "בית ספר", "בית קפה", "בנק"], translation: "The doctor works at the ___." },
  { sentence: "___ טוב! איך אתה?", answer: "בוקר", options: ["בוקר", "לילה", "ערב", "צהריים"], translation: "Good ___! How are you?" },
];

export const mediumQuestions: FillQuestion[] = [
  { sentence: "ביום ___ אני הולך לשוק לקנות ירקות טריים.", answer: "שישי", options: ["שישי", "ראשון", "רביעי", "שלישי"], translation: "On ___ I go to the market to buy fresh vegetables." },
  { sentence: "אתמול הייתי ב___ וקניתי בגדים חדשים.", answer: "חנות", options: ["חנות", "פארק", "הר", "חוף"], translation: "Yesterday I was at the ___ and bought new clothes." },
  { sentence: "מחר ב___ יש לי פגישה חשובה.", answer: "בוקר", options: ["בוקר", "אתמול", "שבוע", "יום"], translation: "Tomorrow ___ I have an important meeting." },
  { sentence: "בכל ___ אנחנו מבקרים את סבא וסבתא.", answer: "שבת", options: ["שבת", "בוקר", "ערב", "צהריים"], translation: "Every ___ we visit grandma and grandpa." },
  { sentence: "אני גר ב___ קטנה ליד הים.", answer: "עיר", options: ["עיר", "הר", "רחוב", "בנק"], translation: "I live in a small ___ near the sea." },
  { sentence: "ב___ אני שולח מכתבים למשפחה.", answer: "דואר", options: ["דואר", "בנק", "חנות", "מסעדה"], translation: "At the ___ I send letters to family." },
  { sentence: "השבוע יש שבעה ___.", answer: "ימים", options: ["ימים", "שעות", "דקות", "חודשים"], translation: "The week has seven ___." },
  { sentence: "אנחנו אוהבים לטייל ב___ בסוף השבוע.", answer: "הר", options: ["הר", "בנק", "דואר", "בית ספר"], translation: "We like to hike in the ___ on the weekend." },
  { sentence: "ה___ סגור בלילה.", answer: "סופרמרקט", options: ["סופרמרקט", "לילה", "ערב", "בוקר"], translation: "The ___ is closed at night." },
  { sentence: "אני שותה קפה ב___ כל בוקר.", answer: "בית קפה", options: ["בית קפה", "בית ספר", "בית חולים", "בנק"], translation: "I drink coffee at the ___ every morning." },
  { sentence: "ה___ מגיע בזמן לתחנה.", answer: "אוטובוס", options: ["אוטובוס", "חנות", "בנק", "פארק"], translation: "The ___ arrives on time to the station." },
  { sentence: "ביום ___ אני עובד עד מאוחר.", answer: "רביעי", options: ["רביעי", "שבת", "בוקר", "לילה"], translation: "On ___ I work until late." },
];

export const hardQuestions: FillQuestion[] = [
  { sentence: "ביום ___ בצהריים אני נפגש עם חברים במסעדה ליד ה___.", answer: "שלישי", options: ["שלישי", "בוקר", "ערב", "לילה"], translation: "On ___ at noon I meet friends at a restaurant near the ___." },
  { sentence: "אתמול ב___ הלכתי ל___ לראות הצגה.", answer: "ערב", options: ["ערב", "בוקר", "יום", "שבוע"], translation: "Yesterday ___ I went to the ___ to see a show." },
  { sentence: "ה___ נמצא ברחוב הראשי, ליד ה___.", answer: "בנק", options: ["בנק", "פארק", "הר", "כפר"], translation: "The ___ is on the main street, next to the ___." },
  { sentence: "מ___ עד יום שישי אני עובד, וב___ אני נח.", answer: "יום ראשון", options: ["יום ראשון", "יום שני", "שבת", "מחר"], translation: "From ___ to Friday I work, and on ___ I rest." },
  { sentence: "ב___ הזה יש הרבה חנויות ומסעדות טובות.", answer: "רחוב", options: ["רחוב", "הר", "חוף", "כפר"], translation: "On this ___ there are many shops and good restaurants." },
  { sentence: "אחרי ה___ אני תמיד עייף ורוצה ללכת ל___.", answer: "עבודה", options: ["עבודה", "בוקר", "ערב", "שבת"], translation: "After ___ I'm always tired and want to go ___." },
  { sentence: "ב___ שלנו יש בית ספר, סופרמרקט ופארק גדול.", answer: "שכונה", options: ["שכונה", "הר", "חוף", "מדבר"], translation: "In our ___ there's a school, supermarket and big park." },
  { sentence: "כל ___ אני קם בשש ב___ והולך לעבודה.", answer: "יום", options: ["יום", "שבוע", "חודש", "שנה"], translation: "Every ___ I wake up at six in the ___ and go to work." },
  { sentence: "הילדים חוזרים מ___ ב___ והולכים לפארק.", answer: "בית ספר", options: ["בית ספר", "בית חולים", "בנק", "דואר"], translation: "The children return from ___ in the ___ and go to the park." },
  { sentence: "ביום ___ אין לימודים כי זה סוף ה___.", answer: "שבת", options: ["שבת", "ראשון", "שני", "שלישי"], translation: "On ___ there are no classes because it's the end of the ___." },
  { sentence: "אני אוהב לשבת ב___ ולקרוא ספר ב___ שקט.", answer: "בית קפה", options: ["בית קפה", "בית חולים", "בנק", "תחנה"], translation: "I like to sit at the ___ and read a book on a quiet ___." },
  { sentence: "ה___ פתוח מיום ראשון עד יום ___ משמונה עד שש.", answer: "סופרמרקט", options: ["סופרמרקט", "פארק", "חוף", "הר"], translation: "The ___ is open from Sunday to ___ from eight to six." },
];
