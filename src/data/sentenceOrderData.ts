export interface SentenceOrderItem {
  id: string;
  targetSentence: string;
  translationEn: string;
  words: string[];
  correctOrder: string[];
}

export interface SentenceOrderLevel {
  levelId: string;
  title: string;
  instructions: { he: string; en: string };
  items: SentenceOrderItem[];
}

export const sentenceOrderLevels: SentenceOrderLevel[] = [
  {
    levelId: "beginner",
    title: "Beginner (הווה פשוט)",
    instructions: {
      he: "גררו את המילים למקום הנכון כדי ליצור משפט תקין.",
      en: "Drag the words into the correct order to form a correct sentence.",
    },
    items: [
      { id: "b01", targetSentence: "אני שותה קפה בבוקר.", translationEn: "I drink coffee in the morning.", words: ["בבוקר", "קפה", "אני", "שותה"], correctOrder: ["אני", "שותה", "קפה", "בבוקר"] },
      { id: "b02", targetSentence: "אנחנו הולכים לעבודה כל יום.", translationEn: "We go to work every day.", words: ["לעבודה", "כל", "הולכים", "אנחנו", "יום"], correctOrder: ["אנחנו", "הולכים", "לעבודה", "כל", "יום"] },
      { id: "b03", targetSentence: "היא גרה במקסיקו סיטי.", translationEn: "She lives in Mexico City.", words: ["סיטי", "במקסיקו", "גרה", "היא"], correctOrder: ["היא", "גרה", "במקסיקו", "סיטי"] },
      { id: "b04", targetSentence: "הוא עובד היום בבית.", translationEn: "He works at home today.", words: ["היום", "הוא", "בבית", "עובד"], correctOrder: ["הוא", "עובד", "היום", "בבית"] },
      { id: "b05", targetSentence: "אתה מדבר עברית טוב.", translationEn: "You speak Hebrew well.", words: ["טוב", "עברית", "מדבר", "אתה"], correctOrder: ["אתה", "מדבר", "עברית", "טוב"] },
      { id: "b06", targetSentence: "אני רוצה מים בבקשה.", translationEn: "I want water, please.", words: ["בבקשה", "מים", "אני", "רוצה"], correctOrder: ["אני", "רוצה", "מים", "בבקשה"] },
      { id: "b07", targetSentence: "אנחנו אוכלים ארוחת ערב ביחד.", translationEn: "We eat dinner together.", words: ["ביחד", "ארוחת", "אנחנו", "אוכלים", "ערב"], correctOrder: ["אנחנו", "אוכלים", "ארוחת", "ערב", "ביחד"] },
      { id: "b08", targetSentence: "הם לומדים עכשיו בספרייה.", translationEn: "They are studying now in the library.", words: ["עכשיו", "בספרייה", "לומדים", "הם"], correctOrder: ["הם", "לומדים", "עכשיו", "בספרייה"] },
      { id: "b09", targetSentence: "אני קונה לחם במכולת.", translationEn: "I buy bread at the grocery store.", words: ["במכולת", "לחם", "קונה", "אני"], correctOrder: ["אני", "קונה", "לחם", "במכולת"] },
      { id: "b10", targetSentence: "היא אוהבת מוזיקה ישראלית.", translationEn: "She likes Israeli music.", words: ["ישראלית", "מוזיקה", "אוהבת", "היא"], correctOrder: ["היא", "אוהבת", "מוזיקה", "ישראלית"] },
      { id: "b11", targetSentence: "אתם משחקים כדורגל בפארק.", translationEn: "You (pl.) play soccer in the park.", words: ["בפארק", "כדורגל", "משחקים", "אתם"], correctOrder: ["אתם", "משחקים", "כדורגל", "בפארק"] },
      { id: "b12", targetSentence: "הוא מבשל היום מרק חם.", translationEn: "He cooks hot soup today.", words: ["מרק", "היום", "מבשל", "חם", "הוא"], correctOrder: ["הוא", "מבשל", "היום", "מרק", "חם"] },
      { id: "b13", targetSentence: "אני פוגש חברים אחרי העבודה.", translationEn: "I meet friends after work.", words: ["אחרי", "חברים", "אני", "העבודה", "פוגש"], correctOrder: ["אני", "פוגש", "חברים", "אחרי", "העבודה"] },
      { id: "b14", targetSentence: "היא נוסעת באוטובוס לבית הספר.", translationEn: "She travels by bus to school.", words: ["לבית", "באוטובוס", "היא", "נוסעת", "הספר"], correctOrder: ["היא", "נוסעת", "באוטובוס", "לבית", "הספר"] },
      { id: "b15", targetSentence: "אנחנו שותים תה בערב.", translationEn: "We drink tea in the evening.", words: ["בערב", "אנחנו", "תה", "שותים"], correctOrder: ["אנחנו", "שותים", "תה", "בערב"] },
      { id: "b16", targetSentence: "הילד רוצה גלידה בקיץ.", translationEn: "The child wants ice cream in summer.", words: ["בקיץ", "גלידה", "הילד", "רוצה"], correctOrder: ["הילד", "רוצה", "גלידה", "בקיץ"] },
      { id: "b17", targetSentence: "אני שומע מוזיקה בדרך.", translationEn: "I listen to music on the way.", words: ["בדרך", "מוזיקה", "אני", "שומע"], correctOrder: ["אני", "שומע", "מוזיקה", "בדרך"] },
      { id: "b18", targetSentence: "הוא כותב מכתב לחבר.", translationEn: "He writes a letter to a friend.", words: ["לחבר", "מכתב", "הוא", "כותב"], correctOrder: ["הוא", "כותב", "מכתב", "לחבר"] },
      { id: "b19", targetSentence: "היא רואה סרט בטלוויזיה.", translationEn: "She watches a movie on TV.", words: ["בטלוויזיה", "סרט", "רואה", "היא"], correctOrder: ["היא", "רואה", "סרט", "בטלוויזיה"] },
      { id: "b20", targetSentence: "אנחנו לומדים עברית בכיתה.", translationEn: "We study Hebrew in class.", words: ["בכיתה", "עברית", "אנחנו", "לומדים"], correctOrder: ["אנחנו", "לומדים", "עברית", "בכיתה"] },
    ],
  },
  {
    levelId: "intermediate",
    title: "Intermediate (עבר + עתיד)",
    instructions: {
      he: "סדרו את המילים למשפט נכון. שימו לב לזמן הפועל ולמיקום תיאורי זמן/מקום.",
      en: "Arrange the words into a correct sentence. Pay attention to tense and time/place phrases.",
    },
    items: [
      { id: "i01", targetSentence: "אתמול פגשתי את דניאל בבית קפה.", translationEn: "Yesterday I met Daniel at a café.", words: ["בבית", "קפה", "אתמול", "את", "דניאל", "פגשתי"], correctOrder: ["אתמול", "פגשתי", "את", "דניאל", "בבית", "קפה"] },
      { id: "i02", targetSentence: "מחר אנחנו נלך לסופר אחרי העבודה.", translationEn: "Tomorrow we will go to the supermarket after work.", words: ["אחרי", "מחר", "אנחנו", "נלך", "העבודה", "לסופר"], correctOrder: ["מחר", "אנחנו", "נלך", "לסופר", "אחרי", "העבודה"] },
      { id: "i03", targetSentence: "בשבוע שעבר הם נסעו לטיול קצר.", translationEn: "Last week they went on a short trip.", words: ["קצר", "נסעו", "הם", "בשבוע", "לטיול", "שעבר"], correctOrder: ["בשבוע", "שעבר", "הם", "נסעו", "לטיול", "קצר"] },
      { id: "i04", targetSentence: "עוד מעט אני אשלח לך הודעה.", translationEn: "In a moment I will send you a message.", words: ["אשלח", "עוד", "לך", "מעט", "אני", "הודעה"], correctOrder: ["עוד", "מעט", "אני", "אשלח", "לך", "הודעה"] },
      { id: "i05", targetSentence: "לפני שעה הוא התקשר אליי מהעבודה.", translationEn: "An hour ago he called me from work.", words: ["מהעבודה", "לפני", "אליי", "התקשר", "הוא", "שעה"], correctOrder: ["לפני", "שעה", "הוא", "התקשר", "אליי", "מהעבודה"] },
      { id: "i06", targetSentence: "בערב אכלנו פיצה עם חברים.", translationEn: "In the evening we ate pizza with friends.", words: ["אכלנו", "בערב", "עם", "פיצה", "חברים"], correctOrder: ["בערב", "אכלנו", "פיצה", "עם", "חברים"] },
      { id: "i07", targetSentence: "בשנה הבאה היא תעבור לדירה חדשה.", translationEn: "Next year she will move to a new apartment.", words: ["בשנה", "היא", "לדירה", "חדשה", "הבאה", "תעבור"], correctOrder: ["בשנה", "הבאה", "היא", "תעבור", "לדירה", "חדשה"] },
      { id: "i08", targetSentence: "אתמול לא הספקנו להגיע בזמן.", translationEn: "Yesterday we didn't manage to arrive on time.", words: ["בזמן", "אתמול", "להגיע", "לא", "הספקנו"], correctOrder: ["אתמול", "לא", "הספקנו", "להגיע", "בזמן"] },
      { id: "i09", targetSentence: "מחר בבוקר אני אתחיל ללמוד ברצינות.", translationEn: "Tomorrow morning I will start studying seriously.", words: ["מחר", "ללמוד", "אתחיל", "ברצינות", "אני", "בבוקר"], correctOrder: ["מחר", "בבוקר", "אני", "אתחיל", "ללמוד", "ברצינות"] },
      { id: "i10", targetSentence: "לפני יומיים קנינו מתנה קטנה.", translationEn: "Two days ago we bought a small gift.", words: ["קנינו", "מתנה", "לפני", "קטנה", "יומיים"], correctOrder: ["לפני", "יומיים", "קנינו", "מתנה", "קטנה"] },
      { id: "i11", targetSentence: "בעוד שבוע אתם תסיימו את הקורס.", translationEn: "In a week you (pl.) will finish the course.", words: ["את", "בעוד", "הקורס", "תסיימו", "שבוע", "אתם"], correctOrder: ["בעוד", "שבוע", "אתם", "תסיימו", "את", "הקורס"] },
      { id: "i12", targetSentence: "בשעה שמונה יצאתי מהבית.", translationEn: "At eight o'clock I left home.", words: ["בשעה", "מהבית", "יצאתי", "שמונה"], correctOrder: ["בשעה", "שמונה", "יצאתי", "מהבית"] },
      { id: "i13", targetSentence: "מחר אני אפגוש אותך ליד התחנה.", translationEn: "Tomorrow I will meet you near the station.", words: ["מחר", "ליד", "התחנה", "אני", "אותך", "אפגוש"], correctOrder: ["מחר", "אני", "אפגוש", "אותך", "ליד", "התחנה"] },
      { id: "i14", targetSentence: "אתמול בלילה הם דיברו הרבה.", translationEn: "Last night they talked a lot.", words: ["הם", "אתמול", "בלילה", "הרבה", "דיברו"], correctOrder: ["אתמול", "בלילה", "הם", "דיברו", "הרבה"] },
      { id: "i15", targetSentence: "בעוד רגע אנחנו נצא מהמסעדה.", translationEn: "In a moment we will leave the restaurant.", words: ["מהמסעדה", "נצא", "אנחנו", "בעוד", "רגע"], correctOrder: ["בעוד", "רגע", "אנחנו", "נצא", "מהמסעדה"] },
      { id: "i16", targetSentence: "בחודש הבא הוא יתחיל עבודה חדשה.", translationEn: "Next month he will start a new job.", words: ["חדשה", "עבודה", "בחודש", "יתחיל", "הבא", "הוא"], correctOrder: ["בחודש", "הבא", "הוא", "יתחיל", "עבודה", "חדשה"] },
      { id: "i17", targetSentence: "לפני שבוע היא חגגה יום הולדת.", translationEn: "A week ago she celebrated a birthday.", words: ["יום", "היא", "לפני", "הולדת", "חגגה", "שבוע"], correctOrder: ["לפני", "שבוע", "היא", "חגגה", "יום", "הולדת"] },
      { id: "i18", targetSentence: "אתמול בצהריים אכלתי סלט גדול.", translationEn: "Yesterday at noon I ate a big salad.", words: ["גדול", "סלט", "בצהריים", "אתמול", "אכלתי"], correctOrder: ["אתמול", "בצהריים", "אכלתי", "סלט", "גדול"] },
      { id: "i19", targetSentence: "מחר בערב נבשל ארוחה מיוחדת.", translationEn: "Tomorrow evening we will cook a special meal.", words: ["מיוחדת", "ארוחה", "נבשל", "מחר", "בערב"], correctOrder: ["מחר", "בערב", "נבשל", "ארוחה", "מיוחדת"] },
      { id: "i20", targetSentence: "בשנה שעברה למדנו הרבה דברים חדשים.", translationEn: "Last year we learned many new things.", words: ["חדשים", "דברים", "הרבה", "בשנה", "למדנו", "שעברה"], correctOrder: ["בשנה", "שעברה", "למדנו", "הרבה", "דברים", "חדשים"] },
    ],
  },
  {
    levelId: "advanced",
    title: "Advanced (קישורים + משפטים מורכבים)",
    instructions: {
      he: "סדרו משפטים ארוכים יותר. שימו לב למילות קישור ולפסיקים.",
      en: "Arrange longer sentences. Pay attention to connectors and commas.",
    },
    items: [
      { id: "a01", targetSentence: "אם יש לך זמן, בוא ניפגש אחרי השיעור.", translationEn: "If you have time, let's meet after the lesson.", words: ["ניפגש", "השיעור", "אם", "אחרי", "יש", "זמן,", "לך", "בוא"], correctOrder: ["אם", "יש", "לך", "זמן,", "בוא", "ניפגש", "אחרי", "השיעור"] },
      { id: "a02", targetSentence: "כשהוא הגיע הביתה, הוא גילה ששכח את המפתח.", translationEn: "When he got home, he realized he forgot the key.", words: ["ששכח", "הביתה,", "הגיע", "כשהוא", "גילה", "את", "המפתח", "הוא"], correctOrder: ["כשהוא", "הגיע", "הביתה,", "הוא", "גילה", "ששכח", "את", "המפתח"] },
      { id: "a03", targetSentence: "אני אוהב את המקום הזה, כי האוכל פה תמיד טעים.", translationEn: "I like this place because the food here is always tasty.", words: ["תמיד", "פה", "הזה,", "טעים", "כי", "האוכל", "אני", "אוהב", "את", "המקום"], correctOrder: ["אני", "אוהב", "את", "המקום", "הזה,", "כי", "האוכל", "פה", "תמיד", "טעים"] },
      { id: "a04", targetSentence: "למרות שהיה מאוחר, הם החליטו להישאר עוד קצת.", translationEn: "Even though it was late, they decided to stay a bit longer.", words: ["עוד", "קצת", "למרות", "מאוחר,", "שהיה", "הם", "להישאר", "החליטו"], correctOrder: ["למרות", "שהיה", "מאוחר,", "הם", "החליטו", "להישאר", "עוד", "קצת"] },
      { id: "a05", targetSentence: "כדי שלא נאחר, כדאי שנצא עכשיו.", translationEn: "So that we won't be late, we should leave now.", words: ["כדי", "שנצא", "עכשיו", "שלא", "נאחר,", "כדאי"], correctOrder: ["כדי", "שלא", "נאחר,", "כדאי", "שנצא", "עכשיו"] },
      { id: "a06", targetSentence: "אני לא בטוח אם זה רעיון טוב, אבל אפשר לנסות.", translationEn: "I'm not sure if it's a good idea, but we can try.", words: ["אבל", "אפשר", "אם", "רעיון", "לנסות", "לא", "טוב,", "זה", "אני", "בטוח"], correctOrder: ["אני", "לא", "בטוח", "אם", "זה", "רעיון", "טוב,", "אבל", "אפשר", "לנסות"] },
      { id: "a07", targetSentence: "ברגע שנסיים, נשלח לך את כל הפרטים.", translationEn: "As soon as we finish, we'll send you all the details.", words: ["את", "כל", "ברגע", "שנסיים,", "הפרטים", "נשלח", "לך"], correctOrder: ["ברגע", "שנסיים,", "נשלח", "לך", "את", "כל", "הפרטים"] },
      { id: "a08", targetSentence: "הוא אמר שהוא יבוא, אבל בסוף הוא לא הגיע.", translationEn: "He said he would come, but in the end he didn't arrive.", words: ["בסוף", "אבל", "הוא", "אמר", "שהוא", "יבוא,", "לא", "הגיע"], correctOrder: ["הוא", "אמר", "שהוא", "יבוא,", "אבל", "בסוף", "הוא", "לא", "הגיע"] },
      { id: "a09", targetSentence: "אני חושב שכדאי שתדבר איתה לפני שאתה מחליט.", translationEn: "I think you should talk to her before you decide.", words: ["אני", "חושב", "שכדאי", "שתדבר", "איתה", "לפני", "שאתה", "מחליט"], correctOrder: ["אני", "חושב", "שכדאי", "שתדבר", "איתה", "לפני", "שאתה", "מחליט"] },
      { id: "a10", targetSentence: "אם אתה רוצה, אני יכול להסביר שוב בצורה אחרת.", translationEn: "If you want, I can explain again in a different way.", words: ["בצורה", "שוב", "אם", "רוצה,", "אחרת", "אתה", "אני", "יכול", "להסביר"], correctOrder: ["אם", "אתה", "רוצה,", "אני", "יכול", "להסביר", "שוב", "בצורה", "אחרת"] },
      { id: "a11", targetSentence: "כמו שסיכמנו, ניפגש ביום שלישי בערב.", translationEn: "As we agreed, we'll meet on Tuesday evening.", words: ["בערב", "ניפגש", "כמו", "ביום", "שלישי", "שסיכמנו,"], correctOrder: ["כמו", "שסיכמנו,", "ניפגש", "ביום", "שלישי", "בערב"] },
      { id: "a12", targetSentence: "אחרי שנאכל, נלך לטייל אם לא יהיה קר מדי.", translationEn: "After we eat, we'll go for a walk if it won't be too cold.", words: ["אחרי", "שנאכל,", "נלך", "לטייל", "אם", "לא", "יהיה", "קר", "מדי"], correctOrder: ["אחרי", "שנאכל,", "נלך", "לטייל", "אם", "לא", "יהיה", "קר", "מדי"] },
      { id: "a13", targetSentence: "כשהתחיל הגשם, כולם רצו פנימה מהר.", translationEn: "When the rain started, everyone ran inside quickly.", words: ["פנימה", "מהר", "כשהתחיל", "הגשם,", "כולם", "רצו"], correctOrder: ["כשהתחיל", "הגשם,", "כולם", "רצו", "פנימה", "מהר"] },
      { id: "a14", targetSentence: "גם אם זה קשה, חשוב לא לוותר על התרגול.", translationEn: "Even if it's hard, it's important not to give up on practice.", words: ["גם", "אם", "זה", "קשה,", "חשוב", "לא", "לוותר", "על", "התרגול"], correctOrder: ["גם", "אם", "זה", "קשה,", "חשוב", "לא", "לוותר", "על", "התרגול"] },
      { id: "a15", targetSentence: "אני אשמח לעזור, רק תגיד לי מה אתה צריך.", translationEn: "I'll be happy to help, just tell me what you need.", words: ["אני", "אשמח", "לעזור,", "רק", "תגיד", "לי", "מה", "אתה", "צריך"], correctOrder: ["אני", "אשמח", "לעזור,", "רק", "תגיד", "לי", "מה", "אתה", "צריך"] },
      { id: "a16", targetSentence: "בגלל שלא ישנתי טוב, הייתי עייף כל היום.", translationEn: "Because I didn't sleep well, I was tired all day.", words: ["בגלל", "שלא", "ישנתי", "טוב,", "הייתי", "עייף", "כל", "היום"], correctOrder: ["בגלל", "שלא", "ישנתי", "טוב,", "הייתי", "עייף", "כל", "היום"] },
      { id: "a17", targetSentence: "היא אמרה שהיא תגיע, אבל לבסוף ביטלה.", translationEn: "She said she would come, but eventually cancelled.", words: ["היא", "אמרה", "שהיא", "תגיע,", "אבל", "לבסוף", "ביטלה"], correctOrder: ["היא", "אמרה", "שהיא", "תגיע,", "אבל", "לבסוף", "ביטלה"] },
      { id: "a18", targetSentence: "למרות שהייתה שביתה, הם הגיעו לעבודה.", translationEn: "Despite the strike, they came to work.", words: ["למרות", "שהייתה", "שביתה,", "הם", "הגיעו", "לעבודה"], correctOrder: ["למרות", "שהייתה", "שביתה,", "הם", "הגיעו", "לעבודה"] },
      { id: "a19", targetSentence: "כשהוא יחזור מהטיול, הוא יספר לנו הכול.", translationEn: "When he returns from the trip, he'll tell us everything.", words: ["כשהוא", "יחזור", "מהטיול,", "הוא", "יספר", "לנו", "הכול"], correctOrder: ["כשהוא", "יחזור", "מהטיול,", "הוא", "יספר", "לנו", "הכול"] },
      { id: "a20", targetSentence: "אפילו שהוא לא הכיר אותם, הוא עזר להם.", translationEn: "Even though he didn't know them, he helped them.", words: ["אפילו", "שהוא", "לא", "הכיר", "אותם,", "הוא", "עזר", "להם"], correctOrder: ["אפילו", "שהוא", "לא", "הכיר", "אותם,", "הוא", "עזר", "להם"] },
    ],
  },
];
