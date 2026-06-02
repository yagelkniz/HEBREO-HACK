import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dices, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Keyword {
  he: string;
  en: string;
}

interface ConversationItem {
  question: string;
  keywords: Keyword[];
  linkingWords: Keyword[];
}

const conversationData: ConversationItem[] = [
  { question: "אם היית קם בבוקר ומגלה שאתה דובר עברית מושלמת, מה הדבר הראשון שהיית עושה?", keywords: [{ he: "שטף", en: "fluency" }, { he: "ביטחון", en: "confidence" }, { he: "הזדמנות", en: "opportunity" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כדי ש", en: "so that" }, { he: "קודם כל", en: "first of all" }] },
  { question: "איזה כוח-על היה הופך את העבודה או הלימודים שלך להרבה יותר קלים?", keywords: [{ he: "יתרון", en: "advantage" }, { he: "להתמודד", en: "to cope" }, { he: "יכולת", en: "ability" }], linkingWords: [{ he: "כי", en: "because" }, { he: "בזכות", en: "thanks to" }, { he: "למשל", en: "for example" }] },
  { question: "אם היית חייב לחיות בתוך סרט או סדרה לחודש אחד, איזה עולם היית בוחר?", keywords: [{ he: "מציאות מדומה", en: "virtual reality" }, { he: "עלילה", en: "plot" }, { he: "שחקן ראשי", en: "main actor" }], linkingWords: [{ he: "מצד אחד", en: "on one hand" }, { he: "מצד שני", en: "on the other hand" }, { he: "בגלל ש", en: "because" }] },
  { question: "אם היית יכול לחזור בזמן רק כדי לראות הופעה חיה של להקה או אמן, לאן היית נוסע?", keywords: [{ he: "מסע בזמן", en: "time travel" }, { he: "תקופה", en: "era" }, { he: "נוסטלגיה", en: "nostalgia" }], linkingWords: [{ he: "כדי", en: "in order to" }, { he: "דווקא", en: "specifically" }, { he: "אף על פי ש", en: "even though" }] },
  { question: "איזה חוק חברתי היית מבטל אם הייתה לך האפשרות?", keywords: [{ he: "נורמה", en: "norm" }, { he: "מוסכמה", en: "convention" }, { he: "לשנות", en: "to change" }], linkingWords: [{ he: "לכן", en: "therefore" }, { he: "למרות ש", en: "despite" }, { he: "בתנאי ש", en: "on condition that" }] },
  { question: "אם יכולת לשלוח הודעת טקסט אחת קצרה לעצמך של לפני עשר שנים, מה היית כותב?", keywords: [{ he: "תובנה", en: "insight" }, { he: "אזהרה", en: "warning" }, { he: "עבר", en: "past" }], linkingWords: [{ he: "כדי ש", en: "so that" }, { he: "במקום", en: "instead of" }, { he: "לפני ש", en: "before" }] },
  { question: "נניח שאתה מקים חברה מחר בבוקר. איזה מוצר או שירות היא הייתה מוכרת?", keywords: [{ he: "יזמות", en: "entrepreneurship" }, { he: "צורך", en: "need" }, { he: "פתרון", en: "solution" }], linkingWords: [{ he: "ראשית", en: "firstly" }, { he: "בשביל", en: "for / in order to" }, { he: "כלומר", en: "meaning / that is" }] },
  { question: "אם היית יכול לדעת את האמת המוחלטת לגבי תעלומה אחת בעולם, מה היית שואל?", keywords: [{ he: "תעלומה", en: "mystery" }, { he: "סוד", en: "secret" }, { he: "סקרנות", en: "curiosity" }], linkingWords: [{ he: "האם", en: "is it? / do?" }, { he: "אולי", en: "maybe" }, { he: "משום ש", en: "because" }] },
  { question: "אם היית חייב לאכול רק מאכל אחד כל החיים והוא לא היה פוגע בבריאותך, מה היית בוחר?", keywords: [{ he: "תזונה", en: "nutrition" }, { he: "הרגל", en: "habit" }, { he: "להתפשר", en: "to compromise" }], linkingWords: [{ he: "גם אם", en: "even if" }, { he: "בלי ש", en: "without" }, { he: "כל עוד", en: "as long as" }] },
  { question: "הציעו לך עכשיו חופשה ללא הגבלת זמן, אבל בלי אינטרנט בכלל. אתה לוקח אותה?", keywords: [{ he: "ניתוק", en: "disconnection" }, { he: "שלווה", en: "tranquility" }, { he: "טכנולוגיה", en: "technology" }], linkingWords: [{ he: "אבל", en: "but" }, { he: "למרות", en: "despite" }, { he: "אם כי", en: "although" }] },
  { question: "מה הכישרון הכי 'חסר תועלת' שלך שאתה ממש גאה בו?", keywords: [{ he: "כישרון", en: "talent" }, { he: "שימושי", en: "useful" }, { he: "גאווה", en: "pride" }], linkingWords: [{ he: "אף על פי ש", en: "even though" }, { he: "בכל זאת", en: "nevertheless" }, { he: "כמו", en: "like / as" }] },
  { question: "אם היו כותבים ספר על החיים שלך, מה היה שם הפרק של השנה הנוכחית?", keywords: [{ he: "כותרת", en: "title" }, { he: "תקופה", en: "period" }, { he: "התפתחות", en: "development" }], linkingWords: [{ he: "כי", en: "because" }, { he: "עד כה", en: "so far" }, { he: "אחרי ש", en: "after" }] },
  { question: "מה הדבר הכי ספונטני שעשית אי פעם ואיך זה נגמר?", keywords: [{ he: "ספונטניות", en: "spontaneity" }, { he: "החלטה רגעית", en: "snap decision" }, { he: "השלכות", en: "consequences" }], linkingWords: [{ he: "ואז", en: "and then" }, { he: "בסופו של דבר", en: "in the end" }, { he: "בלי ש", en: "without" }] },
  { question: "איזו טעות שעשית בעבר הפכה בסוף לדבר הכי טוב שקרה לך?", keywords: [{ he: "תפנית", en: "turning point" }, { he: "טעות", en: "mistake" }, { he: "להפיק לקחים", en: "to learn lessons" }], linkingWords: [{ he: "דווקא", en: "actually / specifically" }, { he: "בזכות", en: "thanks to" }, { he: "למרות ש", en: "despite" }] },
  { question: "על איזה נושא אתה יכול לדבר חצי שעה בלי להתכונן מראש בכלל?", keywords: [{ he: "מומחיות", en: "expertise" }, { he: "תשוקה", en: "passion" }, { he: "להרצות", en: "to lecture" }], linkingWords: [{ he: "בלי", en: "without" }, { he: "כי", en: "because" }, { he: "בנוגע ל", en: "regarding" }] },
  { question: "מהי העצה הכי גרועה שאי פעם קיבלת?", keywords: [{ he: "עצה", en: "advice" }, { he: "ניסיון", en: "experience" }, { he: "להקשיב", en: "to listen" }], linkingWords: [{ he: "למרות ש", en: "although" }, { he: "במקום", en: "instead of" }, { he: "כאשר", en: "when" }] },
  { question: "מה הדבר הכי אמיץ שעשית, שלא דרש שום כוח פיזי?", keywords: [{ he: "אומץ", en: "courage" }, { he: "פגיעות", en: "vulnerability" }, { he: "החלטה", en: "decision" }], linkingWords: [{ he: "אף על פי ש", en: "even though" }, { he: "בזמן ש", en: "while" }, { he: "כדי", en: "in order to" }] },
  { question: "מתי בפעם האחרונה שינית את דעתך לגבי משהו מהותי שממש האמנת בו?", keywords: [{ he: "גמישות מחשבתית", en: "open-mindedness" }, { he: "השקפה", en: "worldview" }, { he: "לשכנע", en: "to convince" }], linkingWords: [{ he: "עד ש", en: "until" }, { he: "בגלל", en: "because of" }, { he: "לעומת", en: "compared to" }] },
  { question: "איזה הרגל קטן ביומיום שלך משנה לך את כל מצב הרוח?", keywords: [{ he: "שגרה", en: "routine" }, { he: "מצב רוח", en: "mood" }, { he: "השפעה", en: "influence" }], linkingWords: [{ he: "בכל פעם ש", en: "every time that" }, { he: "בזכות", en: "thanks to" }, { he: "כמו כן", en: "likewise" }] },
  { question: "אם היית צריך ללמד אותי משהו חדש לגמרי ב-5 דקות, מה היית מלמד אותי?", keywords: [{ he: "להעביר ידע", en: "to transfer knowledge" }, { he: "מיומנות", en: "skill" }, { he: "להדריך", en: "to guide" }], linkingWords: [{ he: "קודם כל", en: "first of all" }, { he: "אחר כך", en: "afterwards" }, { he: "כלומר", en: "meaning" }] },
  { question: "מה הדבר שכולם אוהבים ואתה פשוט לא מבין את ההתלהבות ממנו?", keywords: [{ he: "אובר-רייטד", en: "overrated" }, { he: "טרנד", en: "trend" }, { he: "להתחבר", en: "to relate" }], linkingWords: [{ he: "לעומת זאת", en: "on the other hand" }, { he: "בניגוד ל", en: "in contrast to" }, { he: "אולם", en: "however" }] },
  { question: "איזה ריח ישר זורק אותך לזיכרון ילדות ספציפי?", keywords: [{ he: "חוש הריח", en: "sense of smell" }, { he: "טריגר", en: "trigger" }, { he: "זיכרון", en: "memory" }], linkingWords: [{ he: "כאשר", en: "when" }, { he: "מיד", en: "immediately" }, { he: "כאילו", en: "as if" }] },
  { question: "אם היית צריך לתאר את האישיות שלך דרך סוג של אוכל, מה היית?", keywords: [{ he: "מטפורה", en: "metaphor" }, { he: "מרקם", en: "texture" }, { he: "טעם", en: "taste" }], linkingWords: [{ he: "כמו", en: "like" }, { he: "כי", en: "because" }, { he: "מבחינת", en: "in terms of" }] },
  { question: "מה החוויה הכי מוזרה או מצחיקה שהייתה לך בגלל הבדלי תרבויות?", keywords: [{ he: "פער תרבותי", en: "cultural gap" }, { he: "אי הבנה", en: "misunderstanding" }, { he: "זר", en: "foreign" }], linkingWords: [{ he: "בגלל", en: "because of" }, { he: "בעוד ש", en: "while / whereas" }, { he: "מתברר ש", en: "it turns out that" }] },
  { question: "איזה שיר תמיד גורם לך להרגיש נוסטלגיה, ולאיזו תקופה הוא מחזיר אותך?", keywords: [{ he: "פסקול", en: "soundtrack" }, { he: "געגוע", en: "longing" }, { he: "תקופה", en: "period" }], linkingWords: [{ he: "בכל פעם ש", en: "every time that" }, { he: "כאילו", en: "as if" }, { he: "בזמן ש", en: "while" }] },
  { question: "מה הדבר שאתה הכי אוהב לבזבז עליו כסף בלי להרגיש אשמה?", keywords: [{ he: "פינוק", en: "treat" }, { he: "תקציב", en: "budget" }, { he: "רגשות אשם", en: "guilt" }], linkingWords: [{ he: "בלי ש", en: "without" }, { he: "אפילו אם", en: "even if" }, { he: "כי", en: "because" }] },
  { question: "אם היית חייב לעבור למדינה אחרת מחר, לפי מה היית בוחר לאן לטוס?", keywords: [{ he: "הגירה", en: "immigration" }, { he: "יעד", en: "destination" }, { he: "קריטריון", en: "criterion" }], linkingWords: [{ he: "בהתאם ל", en: "according to" }, { he: "בתנאי ש", en: "on condition that" }, { he: "קודם כל", en: "first of all" }] },
  { question: "אם היית יכול לבחור חיה אחת, אפילו פראית, שתלווה אותך לכל מקום כמו כלב, איזו חיה זו הייתה?", keywords: [{ he: "חיית מחמד", en: "pet" }, { he: "נאמנות", en: "loyalty" }, { he: "אקזוטי", en: "exotic" }], linkingWords: [{ he: "אפילו", en: "even" }, { he: "כמו", en: "like" }, { he: "משום ש", en: "because" }] },
  { question: "מה הדבר שחשבת שהוא ממש מסובך כשהיית קטן, והיום אתה מבין שהוא פשוט?", keywords: [{ he: "תפיסה", en: "perception" }, { he: "בגרות", en: "maturity" }, { he: "תמימות", en: "innocence" }], linkingWords: [{ he: "כש", en: "when" }, { he: "לעומת", en: "compared to" }, { he: "בעצם", en: "actually" }] },
  { question: "אם היית יכול להקשיב לשיחות של אנשים אחרים ברחוב בלי שהם ידעו, היית עושה את זה?", keywords: [{ he: "סקרנות", en: "curiosity" }, { he: "פרטיות", en: "privacy" }, { he: "גבולות", en: "boundaries" }], linkingWords: [{ he: "גם אם", en: "even if" }, { he: "אבל", en: "but" }, { he: "מבלי ש", en: "without" }] },
  { question: "אם היה לך ערוץ יוטיוב עם מיליון עוקבים — על מה היה הערוץ?", keywords: [{ he: "תוכן", en: "content" }, { he: "עוקבים", en: "followers" }, { he: "תשוקה", en: "passion" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "למשל", en: "for example" }] },
  { question: "מה הדבר שאתה הכי טוב בו שרוב האנשים לא יודעים עליו?", keywords: [{ he: "כישרון", en: "talent" }, { he: "סוד", en: "secret" }, { he: "יכולת", en: "ability" }], linkingWords: [{ he: "למרות ש", en: "although" }, { he: "בעצם", en: "actually" }, { he: "כי", en: "because" }] },
  { question: "אם חבר שלך היה מתאר אותך לאחרים, מה לדעתך הוא היה אומר?", keywords: [{ he: "תכונה", en: "trait" }, { he: "אישיות", en: "personality" }, { he: "חברות", en: "friendship" }], linkingWords: [{ he: "כנראה", en: "probably" }, { he: "כמו", en: "like" }, { he: "בגלל ש", en: "because" }] },
  { question: "אם היה לך יום חופשי מלא בלי שום התחייבויות — איך היית מבלה אותו?", keywords: [{ he: "חופש", en: "freedom" }, { he: "שגרה", en: "routine" }, { he: "כיף", en: "fun" }], linkingWords: [{ he: "קודם כל", en: "first of all" }, { he: "אחר כך", en: "afterwards" }, { he: "בלי", en: "without" }] },
  { question: "מה הדבר האחרון שגרם לך לצחוק ממש בכיף?", keywords: [{ he: "צחוק", en: "laughter" }, { he: "הומור", en: "humor" }, { he: "רגע", en: "moment" }], linkingWords: [{ he: "כאשר", en: "when" }, { he: "בגלל", en: "because of" }, { he: "פתאום", en: "suddenly" }] },
  { question: "איזה סרט, סדרה או משחק אתה הכי ממליץ עליו עכשיו — ולמה?", keywords: [{ he: "המלצה", en: "recommendation" }, { he: "עלילה", en: "plot" }, { he: "חוויה", en: "experience" }], linkingWords: [{ he: "כי", en: "because" }, { he: "במיוחד", en: "especially" }, { he: "בזכות", en: "thanks to" }] },
  { question: "אם יכולת לאכול רק ארוחה אחת לכל החיים — מה היא הייתה?", keywords: [{ he: "מאכל", en: "dish" }, { he: "טעם", en: "taste" }, { he: "געגוע", en: "longing" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "תמיד", en: "always" }] },
  { question: "מה הדבר שאתה הכי עושה שאנשים תמיד מתפלאים ממנו?", keywords: [{ he: "הפתעה", en: "surprise" }, { he: "הרגל", en: "habit" }, { he: "ייחודי", en: "unique" }], linkingWords: [{ he: "בכל פעם ש", en: "every time that" }, { he: "כי", en: "because" }, { he: "למרות ש", en: "although" }] },
  { question: "איזה כישרון חדש לגמרי היית רוצה לקום איתו מחר בבוקר?", keywords: [{ he: "כישרון", en: "talent" }, { he: "חלום", en: "dream" }, { he: "ללמוד", en: "to learn" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כדי", en: "in order to" }, { he: "במקום", en: "instead of" }] },
  { question: "מה הדבר שהכי גאה בו בשנה האחרונה — לא ציונים, משהו אחר?", keywords: [{ he: "גאווה", en: "pride" }, { he: "הישג", en: "achievement" }, { he: "התפתחות", en: "development" }], linkingWords: [{ he: "כי", en: "because" }, { he: "בעיקר", en: "mainly" }, { he: "סוף סוף", en: "finally" }] },
  { question: "אם יכולת לטייל לכל מקום בעולם מחר — לאן היית טס?", keywords: [{ he: "יעד", en: "destination" }, { he: "הרפתקה", en: "adventure" }, { he: "תרבות", en: "culture" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כדי", en: "in order to" }, { he: "במיוחד", en: "especially" }] },
  { question: "מה הדבר שאתה הכי מחכה לו בתקופה הקרובה?", keywords: [{ he: "ציפייה", en: "expectation" }, { he: "תכנון", en: "plan" }, { he: "התרגשות", en: "excitement" }], linkingWords: [{ he: "בקרוב", en: "soon" }, { he: "כי", en: "because" }, { he: "במיוחד", en: "especially" }] },
  { question: "מהי ההמצאה שהיית רוצה שתהיה קיימת — שעדיין לא המציאו?", keywords: [{ he: "המצאה", en: "invention" }, { he: "טכנולוגיה", en: "technology" }, { he: "פתרון", en: "solution" }], linkingWords: [{ he: "כדי", en: "in order to" }, { he: "אם", en: "if" }, { he: "כי", en: "because" }] },
  { question: "אם היית צריך ללמד את הכיתה משהו שאתה יודע טוב — מה היית בוחר?", keywords: [{ he: "ללמד", en: "to teach" }, { he: "מומחיות", en: "expertise" }, { he: "להעביר", en: "to transfer" }], linkingWords: [{ he: "קודם כל", en: "first of all" }, { he: "כי", en: "because" }, { he: "אחר כך", en: "afterwards" }] },
  { question: "מה הדבר הכי מוזר או מעניין שקרה לך השבוע?", keywords: [{ he: "מוזר", en: "strange" }, { he: "אירוע", en: "event" }, { he: "מקרה", en: "case" }], linkingWords: [{ he: "פתאום", en: "suddenly" }, { he: "ואז", en: "and then" }, { he: "בלי ש", en: "without" }] },
  { question: "איזו חוויה חדשה היית רוצה לנסות השנה שעדיין לא ניסית?", keywords: [{ he: "חוויה", en: "experience" }, { he: "להעז", en: "to dare" }, { he: "חדש", en: "new" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כדי", en: "in order to" }, { he: "סוף סוף", en: "finally" }] },
  { question: "אם יכולת לשנות דבר אחד בשגרת היום שלך — מה זה היה?", keywords: [{ he: "שגרה", en: "routine" }, { he: "לשנות", en: "to change" }, { he: "הרגל", en: "habit" }], linkingWords: [{ he: "אם", en: "if" }, { he: "במקום", en: "instead of" }, { he: "כי", en: "because" }] },
  { question: "מה גורם לך להרגיש 'שלך' — הרגע שבו אתה הכי אתה?", keywords: [{ he: "אותנטי", en: "authentic" }, { he: "רגע", en: "moment" }, { he: "זהות", en: "identity" }], linkingWords: [{ he: "כאשר", en: "when" }, { he: "בעיקר", en: "mainly" }, { he: "כי", en: "because" }] },
  { question: "איזה מקום בעולם נראה לך כמו מקום שהיית רוצה לחיות בו?", keywords: [{ he: "מקום", en: "place" }, { he: "אווירה", en: "atmosphere" }, { he: "סגנון חיים", en: "lifestyle" }], linkingWords: [{ he: "בגלל", en: "because of" }, { he: "כמו", en: "like" }, { he: "במיוחד", en: "especially" }] },
  { question: "מה הדבר שאתה עושה כשאתה רוצה להירגע אחרי יום עמוס?", keywords: [{ he: "רוגע", en: "calmness" }, { he: "ניתוק", en: "disconnection" }, { he: "מנוחה", en: "rest" }], linkingWords: [{ he: "אחרי ש", en: "after" }, { he: "כדי", en: "in order to" }, { he: "בדרך כלל", en: "usually" }] },
  { question: "אם יכולת להזמין לארוחת ערב כל אדם בעולם — מי היה יושב ליד השולחן?", keywords: [{ he: "השראה", en: "inspiration" }, { he: "פגישה", en: "meeting" }, { he: "שיחה", en: "conversation" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "במיוחד", en: "especially" }] },
  { question: "מה הדבר שהכי שמח אותך בבית — קטן ויומיומי?", keywords: [{ he: "שמחה", en: "joy" }, { he: "בית", en: "home" }, { he: "פרט קטן", en: "small detail" }], linkingWords: [{ he: "בכל יום", en: "every day" }, { he: "כי", en: "because" }, { he: "בעיקר", en: "mainly" }] },
  { question: "מהו הרגע שבו הרגשת שאתה ממש גאה בעצמך — לא בשביל ציון?", keywords: [{ he: "גאווה", en: "pride" }, { he: "רגע", en: "moment" }, { he: "הצלחה", en: "success" }], linkingWords: [{ he: "כאשר", en: "when" }, { he: "כי", en: "because" }, { he: "סוף סוף", en: "finally" }] },
  { question: "אם יכולת לדעת את התשובה לשאלה אחת בחיים — מה הייתה השאלה?", keywords: [{ he: "תשובה", en: "answer" }, { he: "סקרנות", en: "curiosity" }, { he: "תעלומה", en: "mystery" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "אולי", en: "maybe" }] },
  { question: "מה הדבר שאנשים בגילך הכי לא מבינים לגביך?", keywords: [{ he: "פער", en: "gap" }, { he: "הבנה", en: "understanding" }, { he: "ייחוד", en: "uniqueness" }], linkingWords: [{ he: "למרות ש", en: "although" }, { he: "בניגוד ל", en: "in contrast to" }, { he: "כי", en: "because" }] },
  { question: "אם היית שר חינוך ליום אחד — מה היית משנה מיד?", keywords: [{ he: "חינוך", en: "education" }, { he: "רפורמה", en: "reform" }, { he: "מערכת", en: "system" }], linkingWords: [{ he: "מיד", en: "immediately" }, { he: "כדי", en: "in order to" }, { he: "במקום", en: "instead of" }] },
  { question: "מהו הספר, הסרט או השיר שהשאיר בך הכי הרבה רושם?", keywords: [{ he: "רושם", en: "impression" }, { he: "השפעה", en: "influence" }, { he: "יצירה", en: "creation" }], linkingWords: [{ he: "בגלל", en: "because of" }, { he: "במיוחד", en: "especially" }, { he: "עד היום", en: "until today" }] },
  { question: "איזה חוק היית מוסיף לכיתה שלך — שאף אחד לא חשב עליו עדיין?", keywords: [{ he: "חוק", en: "rule" }, { he: "כיתה", en: "classroom" }, { he: "רעיון", en: "idea" }], linkingWords: [{ he: "כדי", en: "in order to" }, { he: "כי", en: "because" }, { he: "למשל", en: "for example" }] },
  { question: "מה הדבר הכי מצחיק שקרה לך בשנה האחרונה?", keywords: [{ he: "מצחיק", en: "funny" }, { he: "סיפור", en: "story" }, { he: "צחוק", en: "laughter" }], linkingWords: [{ he: "פתאום", en: "suddenly" }, { he: "ואז", en: "and then" }, { he: "כי", en: "because" }] },
  { question: "אם יכולת לשלוח הודעה לעצמך לפני שנה — מה היית כותב?", keywords: [{ he: "הודעה", en: "message" }, { he: "עצה", en: "advice" }, { he: "עבר", en: "past" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כדי ש", en: "so that" }, { he: "לפני ש", en: "before" }] },
  { question: "מה הדבר שאתה הכי אוהב לעשות עם חברים — שלא קשור לטלפון?", keywords: [{ he: "חברים", en: "friends" }, { he: "פעילות", en: "activity" }, { he: "ניתוק", en: "disconnection" }], linkingWords: [{ he: "ביחד", en: "together" }, { he: "בלי", en: "without" }, { he: "כי", en: "because" }] },
  { question: "מתי הרגשת לאחרונה שמישהו באמת הקשיב לך?", keywords: [{ he: "להקשיב", en: "to listen" }, { he: "חיבור", en: "connection" }, { he: "תחושה", en: "feeling" }], linkingWords: [{ he: "כאשר", en: "when" }, { he: "כי", en: "because" }, { he: "ממש", en: "really" }] },
  { question: "מהי תכונה אחת שלך שפעם הפריעה לך ועכשיו אתה שמח שיש לך אותה?", keywords: [{ he: "תכונה", en: "trait" }, { he: "קבלה", en: "acceptance" }, { he: "שינוי", en: "change" }], linkingWords: [{ he: "פעם", en: "once" }, { he: "עכשיו", en: "now" }, { he: "בזכות", en: "thanks to" }] },
  { question: "אם היית יכול ללמוד כל דבר בעולם תוך יום — מה היית בוחר?", keywords: [{ he: "ללמוד", en: "to learn" }, { he: "ידע", en: "knowledge" }, { he: "בחירה", en: "choice" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "כדי", en: "in order to" }] },
  { question: "מה הדבר שתמיד גורם לך להחייך — גם ביום הכי קשה?", keywords: [{ he: "חיוך", en: "smile" }, { he: "שמחה", en: "joy" }, { he: "נחמה", en: "comfort" }], linkingWords: [{ he: "תמיד", en: "always" }, { he: "אפילו", en: "even" }, { he: "כי", en: "because" }] },
  { question: "איזו שאלה היית רוצה שישאלו אותך יותר?", keywords: [{ he: "שאלה", en: "question" }, { he: "עניין", en: "interest" }, { he: "שיחה", en: "conversation" }], linkingWords: [{ he: "כי", en: "because" }, { he: "בעיקר", en: "mainly" }, { he: "במקום", en: "instead of" }] },
  { question: "מהו המנהג או הרגל שלך שאנשים אחרים תמיד מגיבים עליו?", keywords: [{ he: "הרגל", en: "habit" }, { he: "תגובה", en: "reaction" }, { he: "ייחודי", en: "unique" }], linkingWords: [{ he: "תמיד", en: "always" }, { he: "כי", en: "because" }, { he: "בכל פעם ש", en: "every time that" }] },
  { question: "אם יכולת לחיות בתקופה היסטורית אחרת — באיזו תקופה?", keywords: [{ he: "תקופה", en: "period" }, { he: "היסטוריה", en: "history" }, { he: "סקרנות", en: "curiosity" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "במיוחד", en: "especially" }] },
  { question: "מה הדבר שאתה מחכה לו הכי הרבה כשמסתיים בית הספר?", keywords: [{ he: "חופש", en: "freedom" }, { he: "ציפייה", en: "expectation" }, { he: "סיום", en: "end" }], linkingWords: [{ he: "כש", en: "when" }, { he: "סוף סוף", en: "finally" }, { he: "כי", en: "because" }] },
  { question: "איזה פרויקט או רעיון שרצית לעשות עדיין ממתין בתור?", keywords: [{ he: "פרויקט", en: "project" }, { he: "רעיון", en: "idea" }, { he: "דחייה", en: "postponement" }], linkingWords: [{ he: "עדיין", en: "still" }, { he: "כי", en: "because" }, { he: "בקרוב", en: "soon" }] },
  { question: "מה גורם לך לסמוך על מישהו — מה ה'מבחן' שלך?", keywords: [{ he: "אמון", en: "trust" }, { he: "מבחן", en: "test" }, { he: "כנות", en: "honesty" }], linkingWords: [{ he: "כאשר", en: "when" }, { he: "כי", en: "because" }, { he: "בעיקר", en: "mainly" }] },
  { question: "אם היה לך תקציב בלתי מוגבל לשבוע חופש — איך היית מתכנן אותו?", keywords: [{ he: "תקציב", en: "budget" }, { he: "חופשה", en: "vacation" }, { he: "תכנון", en: "plan" }], linkingWords: [{ he: "אם", en: "if" }, { he: "קודם כל", en: "first of all" }, { he: "אחר כך", en: "afterwards" }] },
  { question: "מהו הדבר שאתה רוצה לנסות אבל עדיין לא העזת?", keywords: [{ he: "אומץ", en: "courage" }, { he: "לנסות", en: "to try" }, { he: "פחד", en: "fear" }], linkingWords: [{ he: "למרות ש", en: "although" }, { he: "עדיין", en: "still" }, { he: "כי", en: "because" }] },
  { question: "מה הדבר שאתה תמיד עושה לפני שאתה הולך לישון?", keywords: [{ he: "שגרה", en: "routine" }, { he: "לילה", en: "night" }, { he: "הרגל", en: "habit" }], linkingWords: [{ he: "תמיד", en: "always" }, { he: "לפני ש", en: "before" }, { he: "כי", en: "because" }] },
  { question: "אם יכולת לבחור סופר-כוח אחד — מה היית בוחר ולמה?", keywords: [{ he: "כוח-על", en: "superpower" }, { he: "יכולת", en: "ability" }, { he: "חלום", en: "dream" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "כדי", en: "in order to" }] },
  { question: "מהי ההחלטה הכי טובה שקיבלת בשנה האחרונה?", keywords: [{ he: "החלטה", en: "decision" }, { he: "בחירה", en: "choice" }, { he: "שינוי", en: "change" }], linkingWords: [{ he: "בזכות", en: "thanks to" }, { he: "כי", en: "because" }, { he: "בסוף", en: "in the end" }] },
  { question: "מה הדבר שהיית רוצה שמבוגרים יבינו על בני הגיל שלך?", keywords: [{ he: "מבוגרים", en: "adults" }, { he: "הבנה", en: "understanding" }, { he: "פער", en: "gap" }], linkingWords: [{ he: "כי", en: "because" }, { he: "במיוחד", en: "especially" }, { he: "למרות ש", en: "although" }] },
  { question: "אם יכולת להקים עסק מחר — מה היה העסק?", keywords: [{ he: "עסק", en: "business" }, { he: "יזמות", en: "entrepreneurship" }, { he: "רעיון", en: "idea" }], linkingWords: [{ he: "אם", en: "if" }, { he: "כי", en: "because" }, { he: "כדי", en: "in order to" }] },
  { question: "מהו הרגע היומי שאתה הכי מחכה לו?", keywords: [{ he: "רגע", en: "moment" }, { he: "יומיומי", en: "daily" }, { he: "ציפייה", en: "expectation" }], linkingWords: [{ he: "בכל יום", en: "every day" }, { he: "כי", en: "because" }, { he: "בעיקר", en: "mainly" }] },
  { question: "מהי השאלה שהיית רוצה שישאלו אותך — שאף אחד עדיין לא שאל?", keywords: [{ he: "שאלה", en: "question" }, { he: "סקרנות", en: "curiosity" }, { he: "ייחודי", en: "unique" }], linkingWords: [{ he: "כי", en: "because" }, { he: "עדיין", en: "still" }, { he: "במיוחד", en: "especially" }] },
];

type AnimState = "idle" | "shuffling" | "revealed";

interface Props {
  onBack: () => void;
  lang: "he" | "en";
}

export default function ConversationRouletteStandalone({ onBack, lang }: Props) {
  const t = (en: string, he: string) => (lang === "he" ? he : en);

  const [currentItem, setCurrentItem] = useState<ConversationItem | null>(null);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [shuffleDisplay, setShuffleDisplay] = useState("");

  const pickRandom = useCallback(() => {
    if (animState === "shuffling") return;
    setAnimState("shuffling");

    let count = 0;
    const totalFlicks = 12;
    const interval = setInterval(() => {
      const rand = conversationData[Math.floor(Math.random() * conversationData.length)];
      setShuffleDisplay(rand.question.slice(0, 40) + "...");
      count++;
      if (count >= totalFlicks) {
        clearInterval(interval);
        const final = conversationData[Math.floor(Math.random() * conversationData.length)];
        setCurrentItem(final);
        setShuffleDisplay("");
        setAnimState("revealed");
      }
    }, 80);
  }, [animState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        {/* Back button */}
        <Button variant="ghost" onClick={onBack}>
          <ArrowRight className="h-4 w-4 ml-2" />
          {t("Back to Main Menu", "חזרה לתפריט הראשי")}
        </Button>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <MessageCircle className="h-4 w-4" />
            {t("Conversation Roulette", "רולטת שיחה")}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("Spin for a Conversation Starter", "סובב וקבל שאלה לשיחה")}
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t(
              "Practice spontaneous Hebrew speaking with random, thought-provoking questions. Use the keywords to build your answer!",
              "תרגלו דיבור עברי ספונטני עם שאלות אקראיות ומעוררות מחשבה. השתמשו במילות המפתח כדי לבנות את התשובה!"
            )}
          </p>
        </div>

        {/* Roulette Card */}
        <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
          <CardContent className="p-0">
            <div className="min-h-[240px] flex items-center justify-center p-8 relative bg-gradient-to-br from-primary/5 to-muted/30">
              {animState === "idle" && !currentItem && (
                <div className="text-center space-y-3 animate-fade-in">
                  <Dices className="h-16 w-16 mx-auto text-muted-foreground/40" />
                  <p className="text-muted-foreground text-lg">
                    {t("Press the button to get a question!", "לחצו על הכפתור כדי לקבל שאלה!")}
                  </p>
                </div>
              )}

              {animState === "shuffling" && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-primary"
                        style={{ animation: `pulse 0.6s ease-in-out ${i * 0.15}s infinite` }}
                      />
                    ))}
                  </div>
                  <p className="text-lg text-muted-foreground font-medium blur-[1px]">
                    {shuffleDisplay}
                  </p>
                </div>
              )}

              {animState === "revealed" && currentItem && (
                <div className="w-full space-y-6 animate-scale-in">
                  <p className="text-xl md:text-2xl font-semibold leading-[1.8] text-right text-foreground" style={{ whiteSpace: "pre-wrap" }}>
                    {currentItem.question}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    <span className="text-xs text-muted-foreground font-medium ml-2 self-center">
                      {t("Keywords:", "מילות מפתח:")}
                    </span>
                    {currentItem.keywords.map((kw) => (
                      <Badge key={kw.he} variant="secondary" className="text-sm px-3 py-1 font-medium">
                        {kw.he} <span className="text-muted-foreground text-xs mr-1">({kw.en})</span>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end pt-2 border-t border-border/50">
                    <span className="text-xs text-muted-foreground font-medium ml-2 self-center">
                      {t("Linking Words:", "מילות קישור:")}
                    </span>
                    {currentItem.linkingWords.map((lw) => (
                      <Badge key={lw.he} variant="outline" className="text-sm px-3 py-1 font-medium border-primary/40 text-primary">
                        {lw.he} <span className="text-muted-foreground text-xs mr-1">({lw.en})</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-card flex justify-center">
              <Button
                size="lg"
                onClick={pickRandom}
                disabled={animState === "shuffling"}
                className="gap-2 text-base px-8 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Dices className={cn("h-5 w-5", animState === "shuffling" && "animate-spin")} />
                {animState === "idle" && !currentItem
                  ? t("Get a Question", "קבל שאלה")
                  : t("Next Question", "שאלה הבאה")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          {t(`${conversationData.length} questions available`, `${conversationData.length} שאלות זמינות`)}
        </p>
      </div>
    </div>
  );
}
