export interface ConnectorGlossaryItem {
  termHe: string;
  meaningEn: string;
  exampleHe: string;
  exampleEn: string;
}

export interface ConnectorGlossary {
  titleHe: string;
  titleEn: string;
  items: ConnectorGlossaryItem[];
  ctaHe: string;
  ctaEn: string;
}

export interface ConnectorQuestion {
  id: string;
  promptHe: string;
  promptEn: string;
  optionsHe: string[];
  correctIndex: number;
  rationaleHe: string;
  rationaleEn: string;
}

export interface ConnectorLevel {
  levelId: "beginner" | "intermediate" | "advanced";
  titleHe: string;
  titleEn: string;
  descriptionHe: string;
  descriptionEn: string;
  glossary: ConnectorGlossary;
  questions: ConnectorQuestion[];
}

export const connectorLevels: ConnectorLevel[] = [
  // ─── BEGINNER ───
  {
    levelId: "beginner",
    titleHe: "🟢 מתחילים – זיהוי משמעות",
    titleEn: "🟢 Beginner – Meaning Recognition",
    descriptionHe: "בחר את מילת הקישור הנכונה לפי ההקשר",
    descriptionEn: "Choose the correct connector based on context",
    glossary: {
      titleHe: "מקרא – מילות קישור בסיסיות",
      titleEn: "Glossary – Basic Connectors",
      items: [
        { termHe: "כי", meaningEn: "Because (introduces a reason clause)", exampleHe: "אני עייף כי עבדתי הרבה.", exampleEn: "I'm tired because I worked a lot." },
        { termHe: "אבל", meaningEn: "But (contrast between two ideas)", exampleHe: "רציתי לבוא, אבל לא היה לי זמן.", exampleEn: "I wanted to come, but I didn't have time." },
        { termHe: "אם", meaningEn: "If (condition)", exampleHe: "אם ירד גשם, ניקח מטריה.", exampleEn: "If it rains, we'll take an umbrella." },
        { termHe: "כש", meaningEn: "When (describes timing)", exampleHe: "כשהגעתי, הוא כבר ישן.", exampleEn: "When I arrived, he was already sleeping." },
        { termHe: "בגלל", meaningEn: "Because of (+ noun, not clause)", exampleHe: "בגלל הגשם נשארנו בבית.", exampleEn: "Because of the rain we stayed home." },
        { termHe: "אז", meaningEn: "So / Then (result)", exampleHe: "לא היה אוכל, אז הזמנו.", exampleEn: "There was no food, so we ordered." },
        { termHe: "למרות", meaningEn: "Despite / Although", exampleHe: "למרות הקור, יצאנו לטייל.", exampleEn: "Despite the cold, we went for a walk." },
        { termHe: "כדי ש", meaningEn: "In order to / So that (purpose)", exampleHe: "באתי מוקדם כדי שנדבר.", exampleEn: "I came early so that we could talk." },
      ],
      ctaHe: "יאללה מתחילים!",
      ctaEn: "Let's start!",
    },
    questions: [
      { id: "b01", promptHe: "אני נשאר בבית ___ אני עייף.", promptEn: "I stay home ___ I'm tired.", optionsHe: ["כי", "אבל", "אם", "אז"], correctIndex: 0, rationaleHe: "\"כי\" נותן סיבה. \"אבל\" מביע ניגוד, לא סיבה.", rationaleEn: "'כי' gives a reason. 'אבל' expresses contrast, not reason." },
      { id: "b02", promptHe: "רציתי לבוא ___ לא היה לי זמן.", promptEn: "I wanted to come ___ I didn't have time.", optionsHe: ["כי", "אבל", "אז", "כש"], correctIndex: 1, rationaleHe: "\"אבל\" מביע ניגוד בין הרצון למציאות.", rationaleEn: "'אבל' expresses contrast between desire and reality." },
      { id: "b03", promptHe: "___ ירד גשם, נשארנו בבית.", promptEn: "___ it rained, we stayed home.", optionsHe: ["אם", "כש", "אבל", "כדי ש"], correctIndex: 1, rationaleHe: "\"כש\" מתאר מתי קרה משהו (עבר). \"אם\" לתנאי, לא לאירוע שכבר קרה.", rationaleEn: "'כש' describes when something happened (past). 'אם' is for conditions, not past events." },
      { id: "b04", promptHe: "לא היה אוכל בבית, ___ הזמנו פיצה.", promptEn: "There was no food at home, ___ we ordered pizza.", optionsHe: ["כי", "אבל", "אז", "למרות"], correctIndex: 2, rationaleHe: "\"אז\" מביע תוצאה. \"כי\" נותן סיבה – הכיוון הפוך.", rationaleEn: "'אז' expresses result. 'כי' gives reason – opposite direction." },
      { id: "b05", promptHe: "___ תרצה, תבוא אלינו לארוחת ערב.", promptEn: "___ you want, come to us for dinner.", optionsHe: ["כש", "אם", "כי", "אז"], correctIndex: 1, rationaleHe: "\"אם\" מביע תנאי – אולי כן, אולי לא.", rationaleEn: "'אם' expresses a condition – maybe yes, maybe no." },
      { id: "b06", promptHe: "הוא לא בא ___ הגשם.", promptEn: "He didn't come ___ the rain.", optionsHe: ["כי", "בגלל", "אבל", "כש"], correctIndex: 1, rationaleHe: "\"בגלל\" בא לפני שם עצם (הגשם). \"כי\" בא לפני משפט שלם.", rationaleEn: "'בגלל' comes before a noun. 'כי' comes before a full clause." },
      { id: "b07", promptHe: "אני אוהב קפה ___ לא אוהב תה.", promptEn: "I like coffee ___ I don't like tea.", optionsHe: ["כי", "אז", "אבל", "כדי ש"], correctIndex: 2, rationaleHe: "\"אבל\" מראה ניגוד בין שתי העדפות.", rationaleEn: "'אבל' shows contrast between two preferences." },
      { id: "b08", promptHe: "באתי מוקדם ___ נדבר לפני הפגישה.", promptEn: "I came early ___ we talk before the meeting.", optionsHe: ["כי", "כדי ש", "אבל", "אז"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה – בשביל מה באתי מוקדם.", rationaleEn: "'כדי ש' expresses purpose – why I came early." },
      { id: "b09", promptHe: "___ הקור, יצאנו לטייל.", promptEn: "___ the cold, we went for a walk.", optionsHe: ["בגלל", "למרות", "כי", "אם"], correctIndex: 1, rationaleHe: "\"למרות\" מביע ויתור – למרות שהיה קר, בכל זאת יצאנו.", rationaleEn: "'למרות' expresses concession – despite the cold, we still went." },
      { id: "b10", promptHe: "הוא הלך לישון ___ הוא היה עייף מאוד.", promptEn: "He went to sleep ___ he was very tired.", optionsHe: ["אבל", "כי", "למרות", "אז"], correctIndex: 1, rationaleHe: "\"כי\" נותן את הסיבה שהלך לישון.", rationaleEn: "'כי' gives the reason he went to sleep." },
      { id: "b11", promptHe: "קנינו אוכל ___ הזמנו חברים.", promptEn: "We bought food ___ we invited friends.", optionsHe: ["אבל", "כדי ש", "כי", "אז"], correctIndex: 2, rationaleHe: "\"כי\" נותן את הסיבה – הסיבה שקנינו אוכל.", rationaleEn: "'כי' gives reason – why we bought food." },
      { id: "b12", promptHe: "היא לא ענתה לטלפון, ___ שלחתי לה הודעה.", promptEn: "She didn't answer the phone, ___ I sent her a message.", optionsHe: ["כי", "אבל", "אז", "למרות"], correctIndex: 2, rationaleHe: "\"אז\" מביע תוצאה – מה עשיתי בעקבות זה.", rationaleEn: "'אז' expresses result – what I did as a consequence." },
      { id: "b13", promptHe: "הוא רוצה ללמוד עברית ___ הוא גר בישראל.", promptEn: "He wants to learn Hebrew ___ he lives in Israel.", optionsHe: ["אבל", "כי", "אם", "כש"], correctIndex: 1, rationaleHe: "\"כי\" נותן סיבה – למה הוא רוצה ללמוד.", rationaleEn: "'כי' gives reason – why he wants to learn." },
      { id: "b14", promptHe: "___ הגעתי הביתה, הכנתי ארוחת ערב.", promptEn: "___ I got home, I made dinner.", optionsHe: ["אם", "כש", "כדי ש", "אבל"], correctIndex: 1, rationaleHe: "\"כש\" מתאר את הזמן – מתי הכנתי ארוחת ערב.", rationaleEn: "'כש' describes timing – when I made dinner." },
      { id: "b15", promptHe: "הוא עובד הרבה ___ הוא לא מרוויח הרבה.", promptEn: "He works a lot ___ he doesn't earn much.", optionsHe: ["כי", "אז", "אבל", "כדי ש"], correctIndex: 2, rationaleHe: "\"אבל\" מראה ניגוד בין מאמץ לתוצאה.", rationaleEn: "'אבל' shows contrast between effort and result." },
      { id: "b16", promptHe: "היא תרגלה הרבה ___ תצליח במבחן.", promptEn: "She practiced a lot ___ she would pass the test.", optionsHe: ["כי", "כדי ש", "אבל", "כש"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה – בשביל מה תרגלה.", rationaleEn: "'כדי ש' expresses purpose – why she practiced." },
      { id: "b17", promptHe: "___ הגענו, הם כבר אכלו.", promptEn: "___ we arrived, they had already eaten.", optionsHe: ["אם", "כש", "כי", "אז"], correctIndex: 1, rationaleHe: "\"כש\" מתאר מתי הגענו. \"אם\" לתנאי, לא לעבר.", rationaleEn: "'כש' describes when we arrived. 'אם' is for conditions, not past." },
      { id: "b18", promptHe: "הוא לא לומד ___ הוא עצלן.", promptEn: "He doesn't study ___ he is lazy.", optionsHe: ["אבל", "כי", "אז", "למרות"], correctIndex: 1, rationaleHe: "\"כי\" נותן סיבה – למה הוא לא לומד.", rationaleEn: "'כי' gives the reason – why he doesn't study." },
      { id: "b19", promptHe: "אני רוצה לנסוע ___ אין לי כסף.", promptEn: "I want to travel ___ I have no money.", optionsHe: ["כי", "אז", "אבל", "כדי ש"], correctIndex: 2, rationaleHe: "\"אבל\" מביע ניגוד – רוצה אבל לא יכול.", rationaleEn: "'אבל' expresses contrast – wants to but can't." },
      { id: "b20", promptHe: "לא היו מקומות, ___ עמדנו.", promptEn: "There were no seats, ___ we stood.", optionsHe: ["כי", "אבל", "אז", "למרות"], correctIndex: 2, rationaleHe: "\"אז\" מביע תוצאה – מה קרה בעקבות חוסר מקומות.", rationaleEn: "'אז' expresses result – what happened due to no seats." },
    ],
  },

  // ─── INTERMEDIATE ───
  {
    levelId: "intermediate",
    titleHe: "🟡 בינוני – לוגיקה דקדוקית",
    titleEn: "🟡 Intermediate – Grammar Logic",
    descriptionHe: "זהה טעויות נפוצות ובחר את המשפט הנכון",
    descriptionEn: "Identify common mistakes and choose the correct sentence",
    glossary: {
      titleHe: "מקרא – טעויות נפוצות",
      titleEn: "Glossary – Common Mistakes",
      items: [
        { termHe: "❌ למרות ש... אבל", meaningEn: "WRONG: You can't use both. Use only למרות ש without אבל.", exampleHe: "❌ למרות שירד גשם אבל יצאנו. ✅ למרות שירד גשם, יצאנו.", exampleEn: "❌ Although it rained but we went. ✅ Although it rained, we went." },
        { termHe: "❌ בגלל + משפט", meaningEn: "WRONG: בגלל takes a noun, not a clause. Use בגלל ש for clauses.", exampleHe: "❌ בגלל אני עייף. ✅ בגלל שאני עייף.", exampleEn: "❌ Because of I'm tired. ✅ Because I'm tired." },
        { termHe: "❌ כי אם", meaningEn: "WRONG: כי (because) and אם (if) are different connectors.", exampleHe: "❌ אני בא כי אם יש זמן. ✅ אני בא אם יש זמן.", exampleEn: "❌ I come because if there's time. ✅ I come if there's time." },
        { termHe: "כדי ש vs כי", meaningEn: "כדי ש = purpose (in order to). כי = reason (because).", exampleHe: "באתי כדי שנדבר (מטרה) ≠ באתי כי רציתי (סיבה)", exampleEn: "I came so we could talk (purpose) ≠ I came because I wanted to (reason)" },
        { termHe: "אז vs לכן", meaningEn: "Both mean 'so/therefore'. אז is more spoken, לכן is more formal.", exampleHe: "אז מה עושים? (דיבור) / לכן החלטתי (כתיבה)", exampleEn: "'So what do we do?' (spoken) / 'Therefore I decided' (written)" },
      ],
      ctaHe: "יאללה, בואו נתרגל!",
      ctaEn: "Let's practice!",
    },
    questions: [
      { id: "i01", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["למרות שירד גשם, יצאנו לטייל.", "למרות שירד גשם אבל יצאנו לטייל.", "למרות ירד גשם, יצאנו לטייל.", "למרות כי ירד גשם, יצאנו."], correctIndex: 0, rationaleHe: "אחרי \"למרות ש\" לא מוסיפים \"אבל\" – זה כפילות. הוויתור כבר מובע.", rationaleEn: "After 'למרות ש' you don't add 'אבל' – it's redundant." },
      { id: "i02", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["בגלל שאני עייף, הלכתי לישון.", "בגלל אני עייף, הלכתי לישון.", "כי בגלל אני עייף, הלכתי.", "בגלל עייף, הלכתי לישון."], correctIndex: 0, rationaleHe: "\"בגלל\" לבד בא לפני שם עצם. לפני משפט שלם צריך \"בגלל ש\".", rationaleEn: "'בגלל' alone takes a noun. Before a clause, use 'בגלל ש'." },
      { id: "i03", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["אני בא אם יש לי זמן.", "אני בא כי אם יש לי זמן.", "אני בא למרות אם יש זמן.", "אני בא בגלל אם יש זמן."], correctIndex: 0, rationaleHe: "\"כי\" ו\"אם\" הם מילות קישור נפרדות. לא משלבים ביניהן.", rationaleEn: "'כי' and 'אם' are separate connectors. Don't combine them." },
      { id: "i04", promptHe: "השלם: ___ שהיא חולה, היא באה לעבודה.", promptEn: "Complete: ___ she is sick, she came to work.", optionsHe: ["למרות", "בגלל", "כי", "אז"], correctIndex: 0, rationaleHe: "\"למרות\" מביע ויתור – היא באה למרות שהיא חולה.", rationaleEn: "'למרות' expresses concession – she came despite being sick." },
      { id: "i05", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["הוא לא בא בגלל הגשם.", "הוא לא בא בגלל ש הגשם.", "הוא לא בא למרות הגשם בא.", "הוא לא בא כי בגלל גשם."], correctIndex: 0, rationaleHe: "\"בגלל\" + שם עצם (הגשם). זה השימוש הנכון.", rationaleEn: "'בגלל' + noun (the rain). That's the correct usage." },
      { id: "i06", promptHe: "השלם: היא למדה הרבה ___ תצליח במבחן.", promptEn: "Complete: She studied a lot ___ she would pass the test.", optionsHe: ["כי", "כדי ש", "אבל", "כש"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה – בשביל מה היא למדה. \"כי\" מביע סיבה, לא מטרה.", rationaleEn: "'כדי ש' expresses purpose. 'כי' expresses reason, not purpose." },
      { id: "i07", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["כשהגעתי, הוא כבר הלך.", "אם הגעתי, הוא כבר הלך.", "כי הגעתי, הוא כבר הלך.", "למרות הגעתי, הוא הלך."], correctIndex: 0, rationaleHe: "\"כש\" מתאר עבר – מתי שהגעתי. \"אם\" לתנאי עתידי.", rationaleEn: "'כש' describes past timing. 'אם' is for future conditions." },
      { id: "i08", promptHe: "השלם: אני לא אוהב גלידה, ___ אני אוכל אותה לפעמים.", promptEn: "Complete: I don't like ice cream, ___ I eat it sometimes.", optionsHe: ["כי", "אז", "אבל", "כדי ש"], correctIndex: 2, rationaleHe: "\"אבל\" מביע ניגוד – לא אוהב, בכל זאת אוכל.", rationaleEn: "'אבל' expresses contrast – don't like it, but still eat it." },
      { id: "i09", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["הוא הזמין אוכל כי היה רעב.", "הוא הזמין אוכל בגלל היה רעב.", "הוא הזמין אוכל למרות היה רעב.", "הוא הזמין כי בגלל רעב."], correctIndex: 0, rationaleHe: "\"כי\" + משפט שלם (היה רעב). \"בגלל\" לבד דורש שם עצם.", rationaleEn: "'כי' + full clause. 'בגלל' alone requires a noun." },
      { id: "i10", promptHe: "השלם: ___  ההורים שלה גרים רחוק, היא מתגעגעת.", promptEn: "Complete: ___ her parents live far, she misses them.", optionsHe: ["למרות ש", "בגלל ש", "אם", "אז"], correctIndex: 1, rationaleHe: "\"בגלל ש\" נותן סיבה + משפט. המרחק הוא הסיבה להתגעגעות.", rationaleEn: "'בגלל ש' gives reason + clause. The distance causes the missing." },
      { id: "i11", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["אם תלמד, תצליח.", "כש תלמד, תצליח.", "כי תלמד, תצליח.", "בגלל תלמד, תצליח."], correctIndex: 0, rationaleHe: "\"אם\" מביע תנאי עתידי – אם תעשה X, יקרה Y.", rationaleEn: "'אם' expresses future condition – if you do X, Y will happen." },
      { id: "i12", promptHe: "השלם: אין לי כסף, ___ אני לא יכול לקנות את זה.", promptEn: "Complete: I have no money, ___ I can't buy it.", optionsHe: ["כי", "אבל", "אז", "כדי ש"], correctIndex: 2, rationaleHe: "\"אז\" מביע תוצאה – מה קורה בעקבות חוסר הכסף.", rationaleEn: "'אז' expresses the result of having no money." },
      { id: "i13", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["היא שרה כדי שכולם ישמעו.", "היא שרה כי כדי ששמעו.", "היא שרה בגלל שכדי ישמעו.", "היא שרה למרות כדי ישמעו."], correctIndex: 0, rationaleHe: "\"כדי ש\" + פועל בעתיד/סובג'ונקטיב – מביע מטרה.", rationaleEn: "'כדי ש' + subjunctive verb – expresses purpose." },
      { id: "i14", promptHe: "השלם: ___ שלא ישנתי טוב, הרגשתי בסדר.", promptEn: "Complete: ___ I didn't sleep well, I felt okay.", optionsHe: ["בגלל", "למרות", "כי", "אז"], correctIndex: 1, rationaleHe: "\"למרות\" מביע ויתור – למרות שינה גרועה, בכל זאת בסדר.", rationaleEn: "'למרות' expresses concession – despite bad sleep, still okay." },
      { id: "i15", promptHe: "השלם: שמתי שעון מעורר ___ לא אאחר.", promptEn: "Complete: I set an alarm ___ I won't be late.", optionsHe: ["כי", "כדי ש", "אבל", "בגלל"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה – בשביל מה שמתי שעון.", rationaleEn: "'כדי ש' expresses purpose – why I set an alarm." },
      { id: "i16", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["למרות שהם עשירים, הם חיים בפשטות.", "למרות שהם עשירים אבל הם חיים בפשטות.", "למרות הם עשירים, הם חיים.", "בגלל שהם עשירים למרות חיים."], correctIndex: 0, rationaleHe: "אחרי \"למרות ש\" לא מוסיפים \"אבל\". הוויתור כבר מובע.", rationaleEn: "After 'למרות ש' you don't add 'אבל'. The concession is already expressed." },
      { id: "i17", promptHe: "השלם: ___ שהמשחק היה משעמם, נשארנו עד הסוף.", promptEn: "Complete: ___ the game was boring, we stayed until the end.", optionsHe: ["בגלל", "למרות", "כי", "אז"], correctIndex: 1, rationaleHe: "\"למרות\" מביע ויתור – נשארנו למרות שהיה משעמם.", rationaleEn: "'למרות' – stayed despite it being boring." },
      { id: "i18", promptHe: "איזה משפט נכון?", promptEn: "Which sentence is correct?", optionsHe: ["בגלל שהתאחרתי, פספסתי את האוטובוס.", "בגלל התאחרתי, פספסתי.", "כי בגלל התאחרתי פספסתי.", "למרות התאחרתי פספסתי."], correctIndex: 0, rationaleHe: "\"בגלל ש\" + משפט שלם. בלי \"ש\" צריך שם עצם.", rationaleEn: "'בגלל ש' + full clause. Without 'ש' you need a noun." },
      { id: "i19", promptHe: "השלם: הוא רוצה לחסוך כסף ___ יוכל לנסוע.", promptEn: "Complete: He wants to save money ___ he can travel.", optionsHe: ["כי", "כדי ש", "אבל", "כש"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה – בשביל מה חוסך.", rationaleEn: "'כדי ש' expresses purpose – why he saves." },
      { id: "i20", promptHe: "השלם: הם נסעו ___ הגשם הכבד.", promptEn: "Complete: They drove ___ the heavy rain.", optionsHe: ["כי", "למרות", "בגלל", "אז"], correctIndex: 1, rationaleHe: "\"למרות\" מביע ויתור – נסעו למרות הגשם.", rationaleEn: "'למרות' – drove despite the rain." },
    ],
  },

  // ─── ADVANCED ───
  {
    levelId: "advanced",
    titleHe: "🔴 מתקדמים – ניואנסים וטון",
    titleEn: "🔴 Advanced – Nuance & Tone",
    descriptionHe: "הבדלים עדינים בין מילות קישור דומות",
    descriptionEn: "Subtle differences between similar connectors",
    glossary: {
      titleHe: "מקרא – הבדלים עדינים",
      titleEn: "Glossary – Subtle Differences",
      items: [
        { termHe: "כי vs בגלל ש", meaningEn: "Both = 'because', but כי is more spoken/natural, בגלל ש is more formal/emphatic.", exampleHe: "לא באתי כי הייתי עייף (טבעי) / לא באתי בגלל שהייתי עייף (מודגש)", exampleEn: "Didn't come because I was tired (natural) / Didn't come because of being tired (emphatic)" },
        { termHe: "למרות vs אבל", meaningEn: "למרות ש starts a concession clause. אבל separates two contrasting independent clauses.", exampleHe: "למרות שירד גשם, יצאנו. / ירד גשם, אבל יצאנו.", exampleEn: "Although it rained, we went. / It rained, but we went." },
        { termHe: "כש vs אם", meaningEn: "כש = when (past/certain). אם = if (uncertain condition).", exampleHe: "כשהגעתי ראיתי (עבר) / אם אגיע אראה (תנאי)", exampleEn: "When I arrived I saw (past) / If I arrive I'll see (condition)" },
        { termHe: "אז vs ולכן", meaningEn: "Both = result. אז = spoken/casual. ולכן = written/formal.", exampleHe: "אז מה עושים? (דיבור) / ולכן ההחלטה בוטלה (כתיבה)", exampleEn: "'So what do we do?' (spoken) / 'And therefore the decision was cancelled' (written)" },
        { termHe: "כדי ש vs ש", meaningEn: "כדי ש = clear purpose. ש can be ambiguous (that/so that).", exampleHe: "באתי כדי שנדבר (ברור) / באתי שנדבר (מקוצר)", exampleEn: "I came so we could talk (clear) / I came that we'd talk (shortened)" },
      ],
      ctaHe: "יאללה, בואו נראה מה אתם יודעים!",
      ctaEn: "Let's see what you know!",
    },
    questions: [
      { id: "a01", promptHe: "מה הכי טבעי בדיבור? \"לא באתי ___\"", promptEn: "Most natural in speech? 'I didn't come ___'", optionsHe: ["כי הייתי חולה.", "בגלל שהייתי חולה.", "מכיוון שהייתי חולה.", "עקב מחלה."], correctIndex: 0, rationaleHe: "\"כי\" הכי טבעי בדיבור יומיומי. \"בגלל ש\" יותר מודגש, \"מכיוון ש\" ו\"עקב\" – שפה כתובה.", rationaleEn: "'כי' is most natural in everyday speech. Others are more formal." },
      { id: "a02", promptHe: "מה ההבדל? בחר את הנכון: \"___ שהיה חם, הוא לבש מעיל.\"", promptEn: "Choose correct: '___ it was hot, he wore a coat.'", optionsHe: ["למרות", "בגלל", "כי", "אז"], correctIndex: 0, rationaleHe: "\"למרות\" מביע ויתור – לא הגיוני ללבוש מעיל בחום, אבל הוא עשה את זה.", rationaleEn: "'למרות' expresses concession – wearing a coat in heat is illogical but he did it." },
      { id: "a03", promptHe: "בחר את המשפט הכי ישראלי:", promptEn: "Choose the most Israeli sentence:", optionsHe: ["לא היה לי כסף אז לא קניתי.", "לא היה לי כסף ולכן לא רכשתי.", "בהעדר כסף לא ביצעתי רכישה.", "מאחר ולא היה לי כסף, לא קניתי."], correctIndex: 0, rationaleHe: "\"אז\" הכי טבעי בעברית מדוברת. \"ולכן\" יותר פורמלי, השאר – שפה בירוקרטית.", rationaleEn: "'אז' is most natural in spoken Hebrew. Others are formal/bureaucratic." },
      { id: "a04", promptHe: "\"___ תגיע מוקדם, תוכל לבחור מקום.\" – מה מתאים?", promptEn: "'___ you arrive early, you can choose a seat.' – what fits?", optionsHe: ["כש", "אם", "כי", "למרות ש"], correctIndex: 1, rationaleHe: "\"אם\" מביע תנאי – אולי תגיע, אולי לא. \"כש\" היה מתאים אם זה ודאי.", rationaleEn: "'אם' expresses condition – maybe yes, maybe no. 'כש' would work if it's certain." },
      { id: "a05", promptHe: "\"___ הגענו למסעדה, כבר לא היה מקום.\" – מה מתאים?", promptEn: "'___ we arrived at the restaurant, there was no more room.' – what fits?", optionsHe: ["אם", "כש", "כדי ש", "אבל"], correctIndex: 1, rationaleHe: "\"כש\" מתאר אירוע בעבר – הגענו וראינו שאין מקום.", rationaleEn: "'כש' describes a past event – we arrived and saw no room." },
      { id: "a06", promptHe: "\"הוא עובד הרבה ___ שהילדים שלו יוכלו ללמוד.\"", promptEn: "'He works a lot ___ his children can study.'", optionsHe: ["כי", "כדי ש", "אז", "בגלל ש"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה. \"כי\" היה נותן סיבה אישית, לא מטרה.", rationaleEn: "'כדי ש' expresses purpose. 'כי' would give a personal reason, not purpose." },
      { id: "a07", promptHe: "מה ההבדל? \"ירד גשם ___ נשארנו בבית.\" – בחר את הגרסה הדיבורית:", promptEn: "Spoken version: 'It rained ___ we stayed home.'", optionsHe: ["ולכן", "אז", "על כן", "לפיכך"], correctIndex: 1, rationaleHe: "\"אז\" הכי טבעי בדיבור. \"ולכן\"/\"על כן\"/\"לפיכך\" – רשמי עד בירוקרטי.", rationaleEn: "'אז' is most natural in speech. Others range from formal to bureaucratic." },
      { id: "a08", promptHe: "\"___ שהוא עשיר, הוא חי בצורה פשוטה.\"", promptEn: "'___ he is rich, he lives simply.'", optionsHe: ["בגלל", "למרות", "כי", "אם"], correctIndex: 1, rationaleHe: "\"למרות\" מביע ויתור – עשיר אבל חי פשוט. \"בגלל\" היה הגיוני הפוך.", rationaleEn: "'למרות' – rich but lives simply. 'בגלל' would make the opposite logical connection." },
      { id: "a09", promptHe: "בחר את המשפט הטבעי ביותר:", promptEn: "Choose the most natural sentence:", optionsHe: ["היא הלכה לרופא כי כאב לה הראש.", "היא הלכה לרופא בגלל שכאב לה הראש.", "היא הלכה לרופא עקב כאב ראש.", "היא הלכה לרופא מכיוון שכאב לה הראש."], correctIndex: 0, rationaleHe: "\"כי\" הכי טבעי ופשוט בדיבור. השאר – דרגות שונות של פורמליות.", rationaleEn: "'כי' is most natural and simple in speech. Others are varying degrees of formal." },
      { id: "a10", promptHe: "\"לקחתי מטריה ___ לא אירטב.\"", promptEn: "'I took an umbrella ___ I won't get wet.'", optionsHe: ["כי", "כדי ש", "אבל", "אז"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה – בשביל מה לקחתי מטריה. \"כי\" היה נותן סיבה.", rationaleEn: "'כדי ש' expresses purpose. 'כי' would give a reason." },
      { id: "a11", promptHe: "\"___ שלא אכלתי כל היום, לא הייתי רעב.\"", promptEn: "'___ I didn't eat all day, I wasn't hungry.'", optionsHe: ["בגלל", "למרות", "כי", "אם"], correctIndex: 1, rationaleHe: "\"למרות\" – לא אכלתי אבל לא הייתי רעב. זה לא צפוי, זה ויתור.", rationaleEn: "'למרות' – didn't eat but wasn't hungry. It's unexpected, so concession." },
      { id: "a12", promptHe: "בחר הנכון: \"הוא ___ לא סיפר לאף אחד.\"", promptEn: "Choose: 'He ___ didn't tell anyone.'", optionsHe: ["ידע אבל", "ידע כי", "ידע למרות", "ידע אז"], correctIndex: 0, rationaleHe: "\"אבל\" מביע ניגוד – ידע אבל לא סיפר. \"כי\" היה משנה את המשמעות.", rationaleEn: "'אבל' – knew but didn't tell. 'כי' would change the meaning." },
      { id: "a13", promptHe: "מה עדיף בהודעת וואטסאפ? \"לא אגיע ___\"", promptEn: "Better for WhatsApp? 'I won't come ___'", optionsHe: ["כי אני חולה.", "מכיוון שאני חולה.", "עקב מחלתי.", "בגלל שחליתי."], correctIndex: 0, rationaleHe: "\"כי\" הכי טבעי בהודעה. \"מכיוון ש\" ו\"עקב\" רשמיים מדי.", rationaleEn: "'כי' is most natural for a message. Others are too formal." },
      { id: "a14", promptHe: "\"___ תסיים את העבודה, תוכל לצאת.\"", promptEn: "'___ you finish work, you can leave.'", optionsHe: ["כש", "אם", "כי", "למרות ש"], correctIndex: 0, rationaleHe: "\"כש\" – כאן מדובר במשהו שבטוח יקרה (תסיים). \"אם\" היה מתאים אם לא בטוח.", rationaleEn: "'כש' – here it's certain (you will finish). 'אם' would work if uncertain." },
      { id: "a15", promptHe: "\"קניתי מתנה ___ היום יום ההולדת שלה.\"", promptEn: "'I bought a gift ___ today is her birthday.'", optionsHe: ["אבל", "כי", "למרות ש", "כדי ש"], correctIndex: 1, rationaleHe: "\"כי\" נותן סיבה – למה קניתי מתנה. \"כדי ש\" היה מביע מטרה, לא סיבה.", rationaleEn: "'כי' gives reason – why I bought a gift. 'כדי ש' would express purpose, not reason." },
      { id: "a16", promptHe: "\"___ שהוא ניסה, הוא לא הצליח לפתור את הבעיה.\"", promptEn: "'___ he tried, he couldn't solve the problem.'", optionsHe: ["בגלל", "למרות", "כי", "כדי ש"], correctIndex: 1, rationaleHe: "\"למרות\" מביע ויתור – ניסה אבל לא הצליח.", rationaleEn: "'למרות' – tried but couldn't." },
      { id: "a17", promptHe: "מה הכי טבעי? \"הוא עזב את העבודה ___\"", promptEn: "Most natural? 'He left work ___'", optionsHe: ["כי לא היה מרוצה.", "מכיוון שלא היה מרוצה.", "עקב חוסר שביעות רצון.", "בגלל שלא היה מרוצה."], correctIndex: 0, rationaleHe: "\"כי\" הכי טבעי בדיבור. השאר יותר פורמליים.", rationaleEn: "'כי' is most natural in speech. Others are more formal." },
      { id: "a18", promptHe: "\"___ שנסיים לאכול, נלך לטייל.\"", promptEn: "'___ we finish eating, we'll go for a walk.'", optionsHe: ["אם", "כש", "כי", "בגלל ש"], correctIndex: 1, rationaleHe: "\"כש\" – מדובר במשהו ודאי (נסיים). \"אם\" היה מתאים לתנאי לא ודאי.", rationaleEn: "'כש' – it's certain we'll finish. 'אם' would be for uncertainty." },
      { id: "a19", promptHe: "\"היא דיברה לאט ___ כולם יבינו.\"", promptEn: "'She spoke slowly ___ everyone would understand.'", optionsHe: ["כי", "כדי ש", "אבל", "אז"], correctIndex: 1, rationaleHe: "\"כדי ש\" מביע מטרה – בשביל מה דיברה לאט.", rationaleEn: "'כדי ש' – purpose of speaking slowly." },
      { id: "a20", promptHe: "בחר את הגרסה הכי מתאימה להודעה לחבר:", promptEn: "Best for a text to a friend:", optionsHe: ["אני לא יכול לבוא כי אני עובד.", "אינני יכול להגיע מכיוון שאני עובד.", "עקב עבודתי, לא אוכל להגיע.", "לא אוכל לבוא בגלל שאני עובד."], correctIndex: 0, rationaleHe: "\"כי\" הכי טבעי וחברי. השאר פורמליים מדי להודעה.", rationaleEn: "'כי' is most natural for a friendly text." },
    ],
  },
];
