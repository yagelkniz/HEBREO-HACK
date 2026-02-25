export interface PronounGlossaryItem {
  termHe: string;
  meaningEn: string;
}

export interface PronounGlossaryScreen {
  titleHe: string;
  titleEn: string;
  items: PronounGlossaryItem[];
  ctaHe: string;
  ctaEn: string;
}

export interface PronounQuestion {
  id: string;
  promptHe: string;
  optionsHe: string[];
  correctIndex: number;
}

export interface PronounLevel {
  levelId: string;
  title: string;
  titleHe: string;
  descriptionHe: string;
  descriptionEn: string;
  glossaryScreen: PronounGlossaryScreen;
  items: PronounQuestion[];
}

export const pronounLevels: PronounLevel[] = [
  {
    levelId: "beginner",
    title: "Beginner – Basic Pronouns",
    titleHe: "מתחילים – שמות גוף בסיסיים",
    descriptionHe: "זיהוי שמות גוף בסיסיים במשפטים פשוטים",
    descriptionEn: "Identify basic subject pronouns in simple sentences",
    glossaryScreen: {
      titleHe: "מקרא לפני התרגול",
      titleEn: "Glossary Before Practice",
      items: [
        { termHe: "אני", meaningEn: "I" },
        { termHe: "אתה", meaningEn: "You (male singular)" },
        { termHe: "את", meaningEn: "You (female singular)" },
        { termHe: "הוא", meaningEn: "He" },
        { termHe: "היא", meaningEn: "She" },
        { termHe: "אנחנו", meaningEn: "We" },
        { termHe: "אתם", meaningEn: "You (male plural)" },
        { termHe: "הם", meaningEn: "They (male/mixed)" },
      ],
      ctaHe: "יאללה מתחילים",
      ctaEn: "Start",
    },
    items: [
      { id: "b01", promptHe: "___ שותה קפה בבוקר. (I drink coffee)", optionsHe: ["אני", "הוא", "אתם", "היא"], correctIndex: 0 },
      { id: "b02", promptHe: "___ גרה בתל אביב. (She lives in Tel Aviv)", optionsHe: ["היא", "הוא", "אני", "אתה"], correctIndex: 0 },
      { id: "b03", promptHe: "___ הולך לעבודה עכשיו. (He goes to work)", optionsHe: ["הוא", "אני", "את", "אנחנו"], correctIndex: 0 },
      { id: "b04", promptHe: "___ לומדים עברית. (We study Hebrew)", optionsHe: ["אנחנו", "הם", "אני", "אתה"], correctIndex: 0 },
      { id: "b05", promptHe: "___ משחקים כדורגל. (They play soccer)", optionsHe: ["הם", "אני", "היא", "את"], correctIndex: 0 },
      { id: "b06", promptHe: "___ רוצה מים? (You male want water?)", optionsHe: ["אתה", "הוא", "אנחנו", "הם"], correctIndex: 0 },
      { id: "b07", promptHe: "___ רוצה קפה? (You female want coffee?)", optionsHe: ["את", "אתה", "היא", "הם"], correctIndex: 0 },
      { id: "b08", promptHe: "___ עובדים היום. (You plural male work today)", optionsHe: ["אתם", "אני", "הוא", "את"], correctIndex: 0 },
      { id: "b09", promptHe: "שלום, שמי אלון. ___ גר בירושלים.", optionsHe: ["אני", "אתה", "הוא", "הם"], correctIndex: 0 },
      { id: "b10", promptHe: "דני גר לבד בתל אביב. ___ שותה קפה כל בוקר.", optionsHe: ["הוא", "אתה", "אני", "היא"], correctIndex: 0 },
      { id: "b11", promptHe: "רותי אוהבת לטייל. ___ מטיילת כל שבת.", optionsHe: ["היא", "אני", "את", "אנחנו"], correctIndex: 0 },
      { id: "b12", promptHe: "הילדים בכיתה. ___ לומדים לקרוא.", optionsHe: ["הם", "אנחנו", "אתם", "אני"], correctIndex: 0 },
      { id: "b13", promptHe: "___ אוכלים ארוחת ערב ביחד. (We eat dinner together)", optionsHe: ["אנחנו", "הם", "אתם", "הוא"], correctIndex: 0 },
      { id: "b14", promptHe: "___ קונה פירות בשוק. (I buy fruit at the market)", optionsHe: ["אני", "היא", "אתה", "הם"], correctIndex: 0 },
      { id: "b15", promptHe: "אבא שלי עובד בבנק. ___ קם מוקדם כל יום.", optionsHe: ["הוא", "אני", "אתה", "אנחנו"], correctIndex: 0 },
    ],
  },
  {
    levelId: "intermediate",
    title: "Intermediate – Identify by Verb",
    titleHe: "בינוני – זיהוי לפי פועל",
    descriptionHe: "זהו את שם הגוף הנכון לפי צורת הפועל",
    descriptionEn: "Identify the correct pronoun based on verb conjugation",
    glossaryScreen: {
      titleHe: "מקרא לפני התרגול",
      titleEn: "Glossary Before Practice",
      items: [
        { termHe: "סיומת -ת", meaningEn: "Often feminine singular (e.g., הולכת)" },
        { termHe: "סיומת -ים", meaningEn: "Often masculine plural (e.g., הולכים)" },
        { termHe: "סיומת -ות", meaningEn: "Often feminine plural (e.g., הולכות)" },
      ],
      ctaHe: "יאללה מתחילים",
      ctaEn: "Start",
    },
    items: [
      { id: "i01", promptHe: "___ הולכת לבית ספר.", optionsHe: ["היא", "הוא", "הם", "אנחנו"], correctIndex: 0 },
      { id: "i02", promptHe: "___ הולכים לסרט.", optionsHe: ["הם", "היא", "את", "אני"], correctIndex: 0 },
      { id: "i03", promptHe: "___ מדברת מהר.", optionsHe: ["את", "אתה", "הם", "אנחנו"], correctIndex: 0 },
      { id: "i04", promptHe: "___ מדבר מהר.", optionsHe: ["אתה", "היא", "את", "הן"], correctIndex: 0 },
      { id: "i05", promptHe: "___ גרות בירושלים.", optionsHe: ["הן", "הם", "הוא", "אני"], correctIndex: 0 },
      { id: "i06", promptHe: "שירה וטל מדברות בטלפון. ___ לא נפגשו הרבה זמן.", optionsHe: ["הן", "אתן", "אנחנו", "הם"], correctIndex: 0 },
      { id: "i07", promptHe: "___ אוהבת לבשל עם סבתא שלי.", optionsHe: ["אני", "היא", "את", "הן"], correctIndex: 0 },
      { id: "i08", promptHe: "יוני ודורון, ___ הולכים לשוק בערב?", optionsHe: ["אתם", "אנחנו", "הם", "אני"], correctIndex: 0 },
      { id: "i09", promptHe: "הבנות משחקות כדורגל. ___ ממש טובות בזה.", optionsHe: ["הן", "אתן", "אנחנו", "הם"], correctIndex: 0 },
      { id: "i10", promptHe: "מיכל ואני לומדות עברית. ___ עושות שיעורים כל יום.", optionsHe: ["אנחנו", "הן", "אתן", "הם"], correctIndex: 0 },
      { id: "i11", promptHe: "דוד מספר על אשתו: ___ מאוד אוהבת פרחים.", optionsHe: ["היא", "את", "אני", "הוא"], correctIndex: 0 },
      { id: "i12", promptHe: "דני, ___ עובד מחר בבוקר?", optionsHe: ["אתה", "הוא", "אני", "היא"], correctIndex: 0 },
      { id: "i13", promptHe: "שירה, ___ רוצה לשתות משהו?", optionsHe: ["את", "היא", "אני", "אתה"], correctIndex: 0 },
      { id: "i14", promptHe: "טל ודני אוהבים לרקוד. ___ רוקדים בכל יום שישי.", optionsHe: ["הם", "אנחנו", "אתם", "הן"], correctIndex: 0 },
      { id: "i15", promptHe: "אורי ואני רצים בפארק. ___ רצים כל בוקר.", optionsHe: ["אנחנו", "הם", "אתם", "אתה"], correctIndex: 0 },
    ],
  },
  {
    levelId: "advanced",
    title: "Advanced – Full Mix",
    titleHe: "מתקדם – ערבוב מלא",
    descriptionHe: "ערבוב כל שמות הגוף כולל הן ואתן",
    descriptionEn: "Full mix of all pronouns including feminine plural forms",
    glossaryScreen: {
      titleHe: "מקרא לפני התרגול",
      titleEn: "Glossary Before Practice",
      items: [
        { termHe: "הן", meaningEn: "They (female plural)" },
        { termHe: "אתן", meaningEn: "You (female plural)" },
        { termHe: "הם", meaningEn: "They (male/mixed plural)" },
      ],
      ctaHe: "יאללה מתחילים",
      ctaEn: "Start",
    },
    items: [
      { id: "a01", promptHe: "___ תסיימו את העבודה מחר. (You plural male)", optionsHe: ["אתם", "הם", "אנחנו", "אתן"], correctIndex: 0 },
      { id: "a02", promptHe: "___ תסיימנה את העבודה מחר. (You plural female)", optionsHe: ["אתן", "אתם", "הם", "אני"], correctIndex: 0 },
      { id: "a03", promptHe: "___ ילכו לים בערב. (They male)", optionsHe: ["הם", "הן", "אנחנו", "אתה"], correctIndex: 0 },
      { id: "a04", promptHe: "___ תלכנה לים בערב. (They female)", optionsHe: ["הן", "הם", "אני", "את"], correctIndex: 0 },
      { id: "a05", promptHe: "רותי ודנה, ___ גרות ליד הים?", optionsHe: ["אתן", "הן", "אנחנו", "הם"], correctIndex: 0 },
      { id: "a06", promptHe: "מיכל ויואב, ___ כבר אכלתם ארוחת ערב?", optionsHe: ["אתם", "הם", "אנחנו", "אתן"], correctIndex: 0 },
      { id: "a07", promptHe: "יעל ושרה, למה ___ לא באות למסיבה?", optionsHe: ["אתן", "הן", "את", "אנחנו"], correctIndex: 0 },
      { id: "a08", promptHe: "רחל ולאה, ___ יודעות את התשובה?", optionsHe: ["אתן", "הן", "אנחנו", "הם"], correctIndex: 0 },
      { id: "a09", promptHe: "הסטודנטים לומדים למבחן. ___ מתכוננים כבר שבוע.", optionsHe: ["הם", "אנחנו", "אתם", "הן"], correctIndex: 0 },
      { id: "a10", promptHe: "אמא שלי ואני אופות עוגות. ___ מאוד נהנות ביחד.", optionsHe: ["אנחנו", "הן", "אתן", "הם"], correctIndex: 0 },
      { id: "a11", promptHe: "החתול ישן על הספה. ___ ישן הרבה שעות.", optionsHe: ["הוא", "היא", "אני", "הם"], correctIndex: 0 },
      { id: "a12", promptHe: "התלמיד שואל את המורה: ___ יכולה לעזור לי?", optionsHe: ["את", "היא", "אני", "אתה"], correctIndex: 0 },
      { id: "a13", promptHe: "היי, אני לירון. ___ באתי ללמוד עברית.", optionsHe: ["אני", "היא", "את", "הוא"], correctIndex: 0 },
      { id: "a14", promptHe: "___ קוראות ספר ביחד. (They female read)", optionsHe: ["הן", "הם", "אנחנו", "אתם"], correctIndex: 0 },
      { id: "a15", promptHe: "___ נוסעים לחיפה מחר. (We travel to Haifa)", optionsHe: ["אנחנו", "הם", "אתם", "אתה"], correctIndex: 0 },
    ],
  },
];
