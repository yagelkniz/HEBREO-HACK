import { useState, useEffect, useMemo } from "react";
import { ArrowRight, Home, RotateCcw, Lock, Check, X, Share2, Trophy } from "lucide-react";

// ============ TYPES ============
type Season = "סתיו" | "חורף" | "אביב";
type Holiday = {
  id: string;
  name: string;
  emoji: string;
  hebrewMonth: string;
  gregorian: string;
  season: Season;
  accent: { bg: string; soft: string; text: string; border: string; gradient: string };
  story: { text: string; bold?: boolean; en?: string }[];
  vocabulary: { hebrew: string; english: string }[];
  blessing: { text: string; translation: string; extra?: string };
  quizQuestions: { question: string; options: string[]; correct: number }[];
  funFact: string;
  completionEmojis: string[];
};

// ============ DATA ============
const HOLIDAYS: Holiday[] = [
  {
    id: "rosh-hashana",
    name: "ראש השנה",
    emoji: "🍎",
    hebrewMonth: "תשרי",
    gregorian: "ספטמבר/אוקטובר",
    season: "סתיו",
    accent: { bg: "bg-amber-500", soft: "bg-amber-50", text: "text-amber-700", border: "border-amber-400", gradient: "from-amber-400 to-yellow-500" },
    story: [
      { text: "המשפחה יושבת סביב השולחן בערב " }, { text: "ראש השנה", bold: true, en: "Rosh Hashana / New Year" }, { text: ". " },
      { text: "אבא מברך על היין ועל ה" }, { text: "חַלָּה", bold: true, en: "challah" }, { text: ". " },
      { text: "כולם טובלים " }, { text: "תַּפּוּחַ", bold: true, en: "apple" }, { text: " ב" }, { text: "דְּבַשׁ", bold: true, en: "honey" }, { text: ", כדי שתהיה שנה " },
      { text: "מְתוּקָה", bold: true, en: "sweet" }, { text: ". " },
      { text: "בבוקר הולכים ל" }, { text: "בֵּית כְּנֶסֶת", bold: true, en: "synagogue" }, { text: " ושומעים את ה" }, { text: "שּׁוֹפָר", bold: true, en: "shofar" }, { text: ". " },
      { text: "אומרים " }, { text: "תְּפִילָה", bold: true, en: "prayer" }, { text: " מיוחדת ומאחלים אחד לשני שנה טובה. " },
      { text: "זה " }, { text: "חַג", bold: true, en: "holiday" }, { text: " של התחלה חדשה." },
    ],
    vocabulary: [
      { hebrew: "שָׁנָה חֲדָשָׁה", english: "new year" },
      { hebrew: "שׁוֹפָר", english: "shofar" },
      { hebrew: "דְּבַשׁ", english: "honey" },
      { hebrew: "תַּפּוּחַ", english: "apple" },
      { hebrew: "תְּפִילָה", english: "prayer" },
      { hebrew: "בֵּית כְּנֶסֶת", english: "synagogue" },
      { hebrew: "מָתוֹק", english: "sweet" },
      { hebrew: "חַג", english: "holiday" },
    ],
    blessing: { text: "שָׁנָה טוֹבָה וּמְתוּקָה!", translation: "Have a good and sweet new year!" },
    quizQuestions: [
      { question: "מה אוכלים בראש השנה לסימן שנה מתוקה?", options: ["מצה ויין", "תפוח בדבש", "סופגניות", "פיתה וחומוס"], correct: 1 },
      { question: "באיזה כלי תוקעים בראש השנה?", options: ["חליל", "תוף", "שופר", "כינור"], correct: 2 },
    ],
    funFact: "ראש השנה הוא היחיד מהחגים שנמשך יומיים גם בישראל.",
    completionEmojis: ["🍎", "🍯", "🐝", "🎺"],
  },
  {
    id: "yom-kippur",
    name: "יום כיפור",
    emoji: "🕍",
    hebrewMonth: "תשרי",
    gregorian: "10 ימים אחרי ראש השנה",
    season: "סתיו",
    accent: { bg: "bg-slate-500", soft: "bg-slate-50", text: "text-slate-700", border: "border-slate-400", gradient: "from-slate-300 to-slate-500" },
    story: [
      { text: "הרחובות " }, { text: "שֶׁקֶט", bold: true, en: "quiet/silent" }, { text: " לגמרי. אין מכוניות ואין רעש. " },
      { text: "המשפחות מבלות את היום ב" }, { text: "בֵּית כְּנֶסֶת", bold: true, en: "synagogue" }, { text: " ועושות " },
      { text: "חֶשְׁבּוֹן נֶפֶשׁ", bold: true, en: "soul searching" }, { text: " על השנה שעברה. " },
      { text: "אנשים מבקשים " }, { text: "סְלִיחָה", bold: true, en: "forgiveness" }, { text: " זה מזה. " },
      { text: "ה" }, { text: "צוֹם", bold: true, en: "fast" }, { text: " מתחיל בערב ונמשך עד צאת הכוכבים. " },
      { text: "הילדים לובשים " }, { text: "לָבָן", bold: true, en: "white" }, { text: " ומדליקים " }, { text: "נֵר", bold: true, en: "candle" }, { text: " נשמה. " },
      { text: "זה יום של " }, { text: "תְּשׁוּבָה", bold: true, en: "repentance" }, { text: " ושל " }, { text: "כַּפָּרָה", bold: true, en: "atonement" }, { text: "." },
    ],
    vocabulary: [
      { hebrew: "סְלִיחָה", english: "forgiveness" },
      { hebrew: "צוֹם", english: "fast" },
      { hebrew: "שֶׁקֶט", english: "quiet/silence" },
      { hebrew: "כַּפָּרָה", english: "atonement" },
      { hebrew: "לָבָן", english: "white" },
      { hebrew: "חֶשְׁבּוֹן נֶפֶשׁ", english: "soul searching" },
      { hebrew: "תְּשׁוּבָה", english: "repentance" },
      { hebrew: "נֵר", english: "candle" },
    ],
    blessing: { text: "גְּמַר חֲתִימָה טוֹבָה!", translation: "May you be sealed for good in the Book of Life" },
    quizQuestions: [
      { question: "מה עושים ביום כיפור?", options: ["אוכלים סעודה גדולה", "צמים ומתפללים", "רוקדים במסיבות", "נוסעים לטיולים"], correct: 1 },
      { question: "באיזה צבע בגדים נהוג ללבוש ביום כיפור?", options: ["שחור", "אדום", "לבן", "כחול"], correct: 2 },
    ],
    funFact: "ביום כיפור אין כמעט תנועה בכבישים בישראל — ילדים רבים יוצאים לרכוב על אופניים.",
    completionEmojis: ["🕍", "🤍", "🕯️", "📖"],
  },
  {
    id: "sukkot",
    name: "סוכות",
    emoji: "🌿",
    hebrewMonth: "תשרי",
    gregorian: "5 ימים אחרי יום כיפור",
    season: "סתיו",
    accent: { bg: "bg-emerald-500", soft: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-400", gradient: "from-emerald-400 to-green-500" },
    story: [
      { text: "אבא והילדים בונים " }, { text: "סֻכָּה", bold: true, en: "sukkah" }, { text: " בחצר. " },
      { text: "הם תולים פירות וקישוטים מהגג. " },
      { text: "אוכלים את כל הארוחות בתוך הסוכה ורואים את ה" }, { text: "כּוֹכָבִים", bold: true, en: "stars" }, { text: " דרך הסכך. " },
      { text: "בבוקר מנענעים את " }, { text: "אֲרְבַּעַת הַמִּינִים", bold: true, en: "four species" }, { text: ": " },
      { text: "לוּלָב", bold: true, en: "palm branch" }, { text: ", " }, { text: "אֶתְרוֹג", bold: true, en: "etrog/citron" }, { text: ", הדס וערבה. " },
      { text: "מזמינים " }, { text: "אוֹרְחִים", bold: true, en: "guests" }, { text: " לסוכה לאכול " }, { text: "לֶחֶם", bold: true, en: "bread" }, { text: " ולשמוח יחד. " },
      { text: "הסוכה מזכירה את ה" }, { text: "אֹהֶל", bold: true, en: "tent" }, { text: " של אבותינו ב" }, { text: "מִדְבָּר", bold: true, en: "desert" }, { text: "." },
    ],
    vocabulary: [
      { hebrew: "סֻכָּה", english: "sukkah/booth" },
      { hebrew: "אֶתְרוֹג", english: "etrog/citron" },
      { hebrew: "לוּלָב", english: "palm branch" },
      { hebrew: "אֹהֶל", english: "tent" },
      { hebrew: "מִדְבָּר", english: "desert" },
      { hebrew: "כּוֹכָבִים", english: "stars" },
      { hebrew: "אֲרְבַּעַת הַמִּינִים", english: "four species" },
      { hebrew: "אוֹרְחִים", english: "guests" },
    ],
    blessing: { text: "חַג סֻכּוֹת שָׂמֵחַ!", translation: "Happy Sukkot!" },
    quizQuestions: [
      { question: "איפה אוכלים בחג סוכות?", options: ["במסעדה", "בסוכה", "בבית כנסת", "בגינה"], correct: 1 },
      { question: "מה כולל 'ארבעת המינים'?", options: ["תפוח, ענב, רימון, תאנה", "לולב, אתרוג, הדס, ערבה", "חיטה, שעורה, גפן, תמר", "מים, יין, חלב, דבש"], correct: 1 },
    ],
    funFact: "מצווה לישון בסוכה — וגם במזג אוויר קר רבים מקיימים את המצווה בשמחה.",
    completionEmojis: ["🌿", "⭐", "🍋", "🏕️"],
  },
  {
    id: "chanukah",
    name: "חנוכה",
    emoji: "🕎",
    hebrewMonth: "כסלו",
    gregorian: "נובמבר/דצמבר",
    season: "חורף",
    accent: { bg: "bg-blue-500", soft: "bg-blue-50", text: "text-blue-700", border: "border-blue-400", gradient: "from-blue-400 to-yellow-400" },
    story: [
      { text: "כל ערב במשך 8 לילות, המשפחה מדליקה את ה" }, { text: "חֲנֻכִּיָּה", bold: true, en: "chanukiah/menorah" }, { text: " ליד החלון. " },
      { text: "אחד אחד מוסיפים " }, { text: "נֵר", bold: true, en: "candle" }, { text: " חדש. " },
      { text: "הילדים משחקים ב" }, { text: "סְבִיבוֹן", bold: true, en: "dreidel" }, { text: " ומקבלים דמי חנוכה. " },
      { text: "כולם אוכלים " }, { text: "סֻפְגָּנִיָּה", bold: true, en: "sufganiya/donut" }, { text: " חמה ו" }, { text: "לְבִיבָה", bold: true, en: "latke" }, { text: " מתפוחי אדמה. " },
      { text: "סבתא מספרת על " }, { text: "נֵס", bold: true, en: "miracle" }, { text: " פך ה" }, { text: "שֶׁמֶן", bold: true, en: "oil" }, { text: " הקטן שהספיק ל" }, { text: "שְׁמוֹנָה", bold: true, en: "eight" }, { text: " ימים. " },
      { text: "זה חג של " }, { text: "אוֹר", bold: true, en: "light" }, { text: " ושל גבורה." },
    ],
    vocabulary: [
      { hebrew: "חֲנֻכִּיָּה", english: "chanukiah/menorah" },
      { hebrew: "נֵר", english: "candle" },
      { hebrew: "שֶׁמֶן", english: "oil" },
      { hebrew: "נֵס", english: "miracle" },
      { hebrew: "סְבִיבוֹן", english: "dreidel" },
      { hebrew: "סֻפְגָּנִיָּה", english: "sufganiya/donut" },
      { hebrew: "לְבִיבָה", english: "latke" },
      { hebrew: "אוֹר", english: "light" },
    ],
    blessing: {
      text: "חַג אוּרִים שָׂמֵחַ!",
      translation: "Happy Festival of Lights!",
      extra: "בָּרוּךְ אַתָּה ה׳... אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו",
    },
    quizQuestions: [
      { question: "כמה ימים נמשך חג חנוכה?", options: ["שבעה", "שמונה", "תשעה", "עשרה"], correct: 1 },
      { question: "מה אוכלים בחנוכה?", options: ["מצות", "סופגניות ולביבות", "תפוח בדבש", "חמין"], correct: 1 },
    ],
    funFact: "האותיות על הסביבון — נ.ג.ה.פ — ראשי תיבות של 'נס גדול היה פה' (בישראל) או 'שם' (בחו\"ל).",
    completionEmojis: ["🕎", "✨", "🍩", "🎁"],
  },
  {
    id: "tu-bishvat",
    name: "ט\"ו בשבט",
    emoji: "🌳",
    hebrewMonth: "שבט",
    gregorian: "ינואר/פברואר",
    season: "חורף",
    accent: { bg: "bg-pink-500", soft: "bg-pink-50", text: "text-pink-700", border: "border-pink-400", gradient: "from-pink-400 to-rose-400" },
    story: [
      { text: "הכיתה יוצאת ל" }, { text: "נְטִיעָה", bold: true, en: "planting" }, { text: " ביער. " },
      { text: "המורה מסבירה שהיום זה יום ההולדת של ה" }, { text: "עֵץ", bold: true, en: "tree" }, { text: ". " },
      { text: "כל אחד מקבל שתיל קטן ושותל אותו ב" }, { text: "אֲדָמָה", bold: true, en: "earth/soil" }, { text: ". " },
      { text: "מסביב רואים את כל ה" }, { text: "צִמְחִים", bold: true, en: "plants" }, { text: " וה" }, { text: "טֶבַע", bold: true, en: "nature" }, { text: " המתעוררים. " },
      { text: "אחרי הנטיעה כולם יושבים ואוכלים " }, { text: "פְּרִי", bold: true, en: "fruit" }, { text: " יבש — " },
      { text: "תְּאֵנָה", bold: true, en: "fig" }, { text: ", " }, { text: "תָּמָר", bold: true, en: "date" }, { text: " וצימוקים. " },
      { text: "ה" }, { text: "אָבִיב", bold: true, en: "spring" }, { text: " וה" }, { text: "פְּרִיחָה", bold: true, en: "blossoming" }, { text: " כבר באוויר." },
    ],
    vocabulary: [
      { hebrew: "עֵץ", english: "tree" },
      { hebrew: "נְטִיעָה", english: "planting" },
      { hebrew: "טֶבַע", english: "nature" },
      { hebrew: "פְּרִי", english: "fruit" },
      { hebrew: "תְּאֵנָה", english: "fig" },
      { hebrew: "תָּמָר", english: "date" },
      { hebrew: "אֲדָמָה", english: "earth/soil" },
      { hebrew: "פְּרִיחָה", english: "blossoming" },
    ],
    blessing: { text: "חַג טוּ בִּשְׁבָט שָׂמֵחַ!", translation: "Happy Tu BiShvat!" },
    quizQuestions: [
      { question: "מה עושים בט\"ו בשבט?", options: ["שותים הרבה יין", "נוטעים עצים", "מתחפשים", "צמים"], correct: 1 },
      { question: "מה זה ט\"ו בשבט?", options: ["יום העצמאות", "ראש השנה לאילנות", "חג המסכות", "חג האביב"], correct: 1 },
    ],
    funFact: "נהוג לערוך 'סדר ט\"ו בשבט' ולטעום מ-7 המינים שבהם נשתבחה ארץ ישראל.",
    completionEmojis: ["🌳", "🌸", "🍇", "🌱"],
  },
  {
    id: "purim",
    name: "פורים",
    emoji: "🎭",
    hebrewMonth: "אדר",
    gregorian: "פברואר/מרץ",
    season: "אביב",
    accent: { bg: "bg-purple-500", soft: "bg-purple-50", text: "text-purple-700", border: "border-purple-400", gradient: "from-purple-400 to-fuchsia-500" },
    story: [
      { text: "מיכל לובשת " }, { text: "תַּחְפֹּשֶׂת", bold: true, en: "costume" }, { text: " של מלכה. " },
      { text: "אחיה מתחפש לאריה ושמים " }, { text: "מַסֵּכָה", bold: true, en: "mask" }, { text: " על הפנים. " },
      { text: "הם הולכים לבית הכנסת לשמוע את " }, { text: "מְגִלַּת אֶסְתֵּר", bold: true, en: "Scroll of Esther" }, { text: ". " },
      { text: "כל פעם שהקורא אומר את השם של ה" }, { text: "רָשָׁע", bold: true, en: "villain" }, { text: " המן — כולם מרעישים ב" }, { text: "רַעֲשָׁן", bold: true, en: "grogger" }, { text: ". " },
      { text: "אחר כך הם נושאים " }, { text: "מִשְׁלוֹחַ מָנוֹת", bold: true, en: "gift baskets" }, { text: " לשכנים. " },
      { text: "אוכלים " }, { text: "אֹזֶן הָמָן", bold: true, en: "hamantaschen" }, { text: " מתוקות וכולם מלאי " }, { text: "שִׂמְחָה", bold: true, en: "joy" }, { text: "." },
    ],
    vocabulary: [
      { hebrew: "תַּחְפֹּשֶׂת", english: "costume" },
      { hebrew: "רַעֲשָׁן", english: "grogger" },
      { hebrew: "מְגִלָּה", english: "scroll" },
      { hebrew: "מִשְׁלוֹחַ מָנוֹת", english: "gift basket" },
      { hebrew: "שִׂמְחָה", english: "joy/happiness" },
      { hebrew: "אֹזֶן הָמָן", english: "hamantaschen" },
      { hebrew: "מַסֵּכָה", english: "mask" },
      { hebrew: "רָשָׁע", english: "villain" },
    ],
    blessing: { text: "פּוּרִים שָׂמֵחַ!", translation: "Happy Purim!" },
    quizQuestions: [
      { question: "מה עושים בפורים?", options: ["צמים ומתפללים", "מתחפשים וקוראים מגילה", "נוטעים עצים", "בונים סוכה"], correct: 1 },
      { question: "מי הם הגיבורים של מגילת אסתר?", options: ["משה ואהרון", "אסתר ומרדכי", "דוד ושלמה", "אברהם ושרה"], correct: 1 },
    ],
    funFact: "בירושלים חוגגים את פורים יום אחד מאוחר יותר — 'שושן פורים'.",
    completionEmojis: ["🎭", "🎊", "👑", "🥨"],
  },
  {
    id: "pesach",
    name: "פסח",
    emoji: "🫓",
    hebrewMonth: "ניסן",
    gregorian: "מרץ/אפריל",
    season: "אביב",
    accent: { bg: "bg-orange-500", soft: "bg-orange-50", text: "text-orange-700", border: "border-orange-400", gradient: "from-orange-300 to-amber-400" },
    story: [
      { text: "כל המשפחה מתאספת בליל ה" }, { text: "סֵדֶר", bold: true, en: "seder" }, { text: ". " },
      { text: "השולחן ערוך עם " }, { text: "מַצָּה", bold: true, en: "matzah" }, { text: ", " }, { text: "מָרוֹר", bold: true, en: "bitter herbs" }, { text: " וקערת הסדר. " },
      { text: "אבא קורא מתוך ה" }, { text: "הַגָּדָה", bold: true, en: "haggadah" }, { text: ". " },
      { text: "הילד הקטן ביותר שואל את ארבע הקושיות. " },
      { text: "מספרים על " }, { text: "יְצִיאַת מִצְרַיִם", bold: true, en: "Exodus from Egypt" }, { text: " ועל עשר ה" }, { text: "מַכּוֹת", bold: true, en: "plagues" }, { text: ". " },
      { text: "פותחים את הדלת ל" }, { text: "אֵלִיָּהוּ", bold: true, en: "Elijah" }, { text: " הנביא. " },
      { text: "כולם שרים יחד " }, { text: "דַּיֵּנוּ", bold: true, en: "Dayenu" }, { text: " וחוגגים את ה" }, { text: "חֵרוּת", bold: true, en: "freedom" }, { text: " מ" }, { text: "עַבְדוּת", bold: true, en: "slavery" }, { text: "." },
    ],
    vocabulary: [
      { hebrew: "חֵרוּת", english: "freedom" },
      { hebrew: "עַבְדוּת", english: "slavery" },
      { hebrew: "מַצָּה", english: "matzah" },
      { hebrew: "סֵדֶר", english: "seder" },
      { hebrew: "הַגָּדָה", english: "haggadah" },
      { hebrew: "מָרוֹר", english: "bitter herbs" },
      { hebrew: "מַכּוֹת", english: "plagues" },
      { hebrew: "יְצִיאַת מִצְרַיִם", english: "Exodus" },
    ],
    blessing: { text: "חַג פֶּסַח כָּשֵׁר וְשָׂמֵחַ!", translation: "Have a kosher and happy Passover!" },
    quizQuestions: [
      { question: "מה אוכלים בפסח במקום לחם?", options: ["פיתה", "מצה", "עוגה", "אורז"], correct: 1 },
      { question: "מה מספרים בליל הסדר?", options: ["סיפור פורים", "יציאת מצרים", "סיפור חנוכה", "מתן תורה"], correct: 1 },
    ],
    funFact: "במשך כל פסח לא אוכלים חמץ — לפני החג עורכים ניקיון גדול בבית.",
    completionEmojis: ["🫓", "🌊", "🍷", "🐑"],
  },
  {
    id: "shavuot",
    name: "שבועות",
    emoji: "🌸",
    hebrewMonth: "סיוון",
    gregorian: "מאי/יוני",
    season: "אביב",
    accent: { bg: "bg-green-500", soft: "bg-green-50", text: "text-green-700", border: "border-green-400", gradient: "from-green-300 to-emerald-400" },
    story: [
      { text: "בית הכנסת מקושט ב" }, { text: "פְּרָחִים", bold: true, en: "flowers" }, { text: " ובצמחים ירוקים. " },
      { text: "כולם לובשים בגדים " }, { text: "לְבָנִים", bold: true, en: "white" }, { text: ". " },
      { text: "אחרי התפילה המשפחות אוכלות " }, { text: "גְּבִינָה", bold: true, en: "cheese" }, { text: ", עוגת גבינה ובלינצ'ס עם " }, { text: "חָלָב", bold: true, en: "milk" }, { text: ". " },
      { text: "המורה מסבירה שביום הזה ניתנה ה" }, { text: "תּוֹרָה", bold: true, en: "Torah" }, { text: " ב" }, { text: "הַר סִינַי", bold: true, en: "Mount Sinai" }, { text: ". " },
      { text: "קוראים את " }, { text: "עֲשֶׂרֶת הַדִּבְּרוֹת", bold: true, en: "Ten Commandments" }, { text: ". " },
      { text: "בעבר היו מביאים את ה" }, { text: "בִּכּוּרִים", bold: true, en: "first fruits" }, { text: " לבית המקדש. " },
      { text: "זה היום של " }, { text: "מַתַּן תּוֹרָה", bold: true, en: "giving of the Torah" }, { text: "." },
    ],
    vocabulary: [
      { hebrew: "תּוֹרָה", english: "Torah" },
      { hebrew: "הַר סִינַי", english: "Mount Sinai" },
      { hebrew: "פְּרָחִים", english: "flowers" },
      { hebrew: "חָלָב", english: "milk/dairy" },
      { hebrew: "גְּבִינָה", english: "cheese" },
      { hebrew: "עֲצֶרֶת", english: "assembly" },
      { hebrew: "בִּכּוּרִים", english: "first fruits" },
      { hebrew: "מַתַּן תּוֹרָה", english: "giving of the Torah" },
    ],
    blessing: { text: "חַג שָׂמֵחַ!", translation: "Happy Holiday!" },
    quizQuestions: [
      { question: "מה אוכלים בשבועות?", options: ["בשר וחמין", "מאכלי חלב וגבינה", "מצות ומרור", "סופגניות"], correct: 1 },
      { question: "מה אנחנו חוגגים בשבועות?", options: ["יציאת מצרים", "מתן תורה בהר סיני", "ניצחון המכבים", "חנוכת המקדש"], correct: 1 },
    ],
    funFact: "מנהג מקובל ללמוד כל הלילה בשבועות — 'תיקון ליל שבועות'.",
    completionEmojis: ["🌸", "📜", "🧀", "🌾"],
  },
];

const SEASON_COLORS: Record<Season, { bg: string; ring: string; label: string; emoji: string }> = {
  "סתיו": { bg: "bg-orange-100/60", ring: "ring-orange-300", label: "סתיו", emoji: "🍂" },
  "חורף": { bg: "bg-blue-100/60", ring: "ring-blue-300", label: "חורף", emoji: "❄️" },
  "אביב": { bg: "bg-green-100/60", ring: "ring-green-300", label: "אביב", emoji: "🌷" },
};

const STORAGE_KEY = "jewish_holidays_completed";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============ MAIN ============
export default function JewishHolidays() {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  const markCompleted = (id: string) => {
    const next = new Set(completed); next.add(id);
    setCompleted(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
  };

  const resetAll = () => {
    setCompleted(new Set());
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const active = activeId ? HOLIDAYS.find(h => h.id === activeId) : null;
  const allDone = completed.size === HOLIDAYS.length;

  if (active) {
    return <HolidayModule holiday={active} onBack={() => setActiveId(null)} onComplete={() => { markCompleted(active.id); setActiveId(null); }} />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-blue-50">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-amber-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <button onClick={() => { window.location.hash = "#/"; }}
            className="flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 transition">
            <Home size={16} /> תפריט
          </button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-800">🗓️ חגי ישראל</h1>
            <p className="text-xs text-gray-500">למדת {completed.size} מתוך {HOLIDAYS.length} חגים</p>
          </div>
          <button onClick={resetAll} title="אפס התקדמות"
            className="p-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 transition">
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-blue-400 transition-all"
              style={{ width: `${(completed.size / HOLIDAYS.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-20">
        {allDone && (
          <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-400 to-blue-500 text-white text-center shadow-lg">
            <div className="text-5xl mb-2">🇮🇱🎉</div>
            <h2 className="text-xl font-bold">סיירת החגים!</h2>
            <p className="text-sm text-white/90 mt-1">השלמת את כל 8 החגים — כל הכבוד!</p>
          </div>
        )}

        {/* Season legend */}
        <div className="flex justify-center gap-2 mb-4">
          {(Object.keys(SEASON_COLORS) as Season[]).map(s => (
            <div key={s} className={`px-3 py-1.5 rounded-full text-xs font-bold ${SEASON_COLORS[s].bg} text-gray-700 border border-gray-200`}>
              {SEASON_COLORS[s].emoji} {SEASON_COLORS[s].label}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {(Object.keys(SEASON_COLORS) as Season[]).map(season => {
            const holidaysInSeason = HOLIDAYS.filter(h => h.season === season);
            return (
              <div key={season} className={`p-3 rounded-2xl ${SEASON_COLORS[season].bg} border-2 border-dashed border-white`}>
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-xl">{SEASON_COLORS[season].emoji}</span>
                  <span className="text-sm font-bold text-gray-600">{SEASON_COLORS[season].label}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {holidaysInSeason.map(h => {
                    const done = completed.has(h.id);
                    return (
                      <button key={h.id} onClick={() => setActiveId(h.id)}
                        className={`relative p-3 rounded-2xl bg-white text-right transition-all hover:scale-[1.03] active:scale-[0.97] shadow-sm hover:shadow-md border-2 ${done ? `${h.accent.border}` : "border-transparent"}`}>
                        {done && (
                          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs shadow">
                            ✓
                          </div>
                        )}
                        <div className={`text-3xl mb-1 ${done ? "" : "grayscale-[30%]"}`}>{h.emoji}</div>
                        <div className={`font-bold text-sm ${done ? h.accent.text : "text-gray-700"}`}>{h.name}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{h.hebrewMonth} • {h.gregorian}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ============ HOLIDAY MODULE ============
function HolidayModule({ holiday, onBack, onComplete }: { holiday: Holiday; onBack: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [unlocked, setUnlocked] = useState(1);
  const [quizScore, setQuizScore] = useState(0);

  const unlock = (n: number) => setUnlocked(u => Math.max(u, n));
  const go = (n: number) => { if (n <= unlocked) setStep(n); };

  return (
    <div dir="rtl" className={`min-h-screen bg-gradient-to-br ${holiday.accent.soft} from-white`}>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <button onClick={onBack}
            className={`flex items-center gap-1 text-sm font-medium ${holiday.accent.text} px-3 py-1.5 rounded-full ${holiday.accent.soft} hover:opacity-80 transition`}>
            <ArrowRight size={16} /> ללוח השנה
          </button>
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold text-gray-800">{holiday.emoji} {holiday.name}</h1>
            <p className="text-xs text-gray-500">שלב {step} מתוך 4</p>
          </div>
          <button onClick={() => { setStep(1); setUnlocked(1); setQuizScore(0); }}
            className="p-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 transition">
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(n => (
              <button key={n} onClick={() => go(n)} disabled={n > unlocked}
                className={`flex-1 h-2 rounded-full transition-all ${
                  n === step ? holiday.accent.bg : n <= unlocked ? `${holiday.accent.bg} opacity-50` : "bg-gray-200"
                }`} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[10px] text-gray-500 font-medium">
            {["📖 קראו", "🔤 מילים", "🧠 מבחן", "🎉 סיום"].map((l, i) => (
              <button key={i} onClick={() => go(i + 1)} disabled={i + 1 > unlocked}
                className={`flex items-center gap-0.5 ${i + 1 > unlocked ? "opacity-40" : ""} ${step === i + 1 ? `${holiday.accent.text} font-bold` : ""}`}>
                {i + 1 > unlocked && <Lock size={9} />} {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-20">
        {step === 1 && <StepStory holiday={holiday} onNext={() => { unlock(2); setStep(2); }} />}
        {step === 2 && <StepVocab holiday={holiday} onNext={() => { unlock(3); setStep(3); }} />}
        {step === 3 && <StepQuiz holiday={holiday} onPass={(s) => { setQuizScore(s); unlock(4); setStep(4); }} />}
        {step === 4 && <StepDone holiday={holiday} quizScore={quizScore} onComplete={onComplete} onRestart={() => { setStep(1); setUnlocked(1); setQuizScore(0); }} />}
      </main>
    </div>
  );
}

// ============ STEP 1 — STORY ============
function StepStory({ holiday, onNext }: { holiday: Holiday; onNext: () => void }) {
  const [tooltip, setTooltip] = useState<number | null>(null);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => { const t = setTimeout(() => setCanContinue(true), 10000); return () => clearTimeout(t); }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{holiday.emoji}</div>
          <h2 className={`text-2xl font-bold ${holiday.accent.text}`}>{holiday.name}</h2>
        </div>
        <p className="text-lg leading-loose text-gray-800" style={{ lineHeight: 2 }}>
          {holiday.story.map((seg, i) => {
            if (!seg.bold) return <span key={i}>{seg.text}</span>;
            return (
              <span key={i} className="relative inline-block">
                <button onClick={() => setTooltip(tooltip === i ? null : i)}
                  className={`font-bold ${holiday.accent.text} underline decoration-2 decoration-dotted underline-offset-4 cursor-pointer hover:scale-110 transition-transform inline-block px-0.5`}>
                  {seg.text}
                </button>
                {tooltip === i && (
                  <span className={`absolute z-20 top-full mt-2 right-1/2 translate-x-1/2 min-w-[10rem] ${holiday.accent.soft} border-2 ${holiday.accent.border} rounded-xl p-2 text-sm shadow-lg text-center`} dir="ltr">
                    {seg.en}
                  </span>
                )}
              </span>
            );
          })}
        </p>
      </div>

      {/* Blessing preview */}
      <div className={`bg-gradient-to-br ${holiday.accent.gradient} rounded-2xl p-5 text-white text-center shadow-lg`}>
        <p className="text-xs uppercase tracking-wider opacity-80 mb-2">ברכת החג</p>
        <p className="text-2xl font-bold mb-1" style={{ fontFamily: "Georgia, serif" }}>{holiday.blessing.text}</p>
        <p className="text-sm opacity-90" dir="ltr">{holiday.blessing.translation}</p>
      </div>

      <button onClick={onNext} disabled={!canContinue}
        className={`w-full py-4 ${holiday.accent.bg} text-white font-bold rounded-2xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2`}>
        {canContinue ? "המשך" : "קראו את הסיפור..."} <ArrowRight size={18} />
      </button>
    </div>
  );
}

// ============ STEP 2 — VOCAB FLASHCARDS ============
function StepVocab({ holiday, onNext }: { holiday: Holiday; onNext: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setFlipped(s => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i); else n.add(i);
      return n;
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-1">🔤 מילות המפתח</h2>
        <p className="text-xs text-gray-500">לחצו על כל כרטיס כדי להפוך אותו • הפכת: {flipped.size}/{holiday.vocabulary.length}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {holiday.vocabulary.map((v, i) => {
          const isFlipped = flipped.has(i);
          return (
            <button key={i} onClick={() => toggle(i)}
              className="relative h-28 rounded-2xl shadow-md"
              style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full transition-transform duration-500"
                style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "" }}>
                {/* Front */}
                <div className={`absolute inset-0 rounded-2xl ${holiday.accent.soft} border-2 ${holiday.accent.border} flex items-center justify-center p-2`}
                  style={{ backfaceVisibility: "hidden" }}>
                  <span className={`text-lg sm:text-xl font-bold ${holiday.accent.text} text-center`}>{v.hebrew}</span>
                </div>
                {/* Back */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${holiday.accent.gradient} text-white flex items-center justify-center p-2`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} dir="ltr">
                  <span className="text-base sm:text-lg font-bold text-center">{v.english}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button onClick={onNext} disabled={flipped.size < 5}
        className={`w-full py-4 ${holiday.accent.bg} text-white font-bold rounded-2xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2`}>
        {flipped.size < 5 ? `הפכו ${5 - flipped.size} כרטיסים נוספים` : "המשך"} <ArrowRight size={18} />
      </button>
    </div>
  );
}

// ============ STEP 3 — QUIZ ============
type QuizQ = { question: string; options: string[]; correct: number };

function buildQuiz(holiday: Holiday): QuizQ[] {
  const vocabQs: QuizQ[] = shuffle(holiday.vocabulary).slice(0, 6).map(v => {
    const wrong = holiday.vocabulary.filter(x => x.english !== v.english).map(x => x.english);
    const options = shuffle([v.english, ...shuffle(wrong).slice(0, 3)]);
    return { question: `מה הפירוש של "${v.hebrew}"?`, options, correct: options.indexOf(v.english) };
  });
  return [...vocabQs, ...holiday.quizQuestions];
}

function StepQuiz({ holiday, onPass }: { holiday: Holiday; onPass: (s: number) => void }) {
  const [questions, setQuestions] = useState<QuizQ[]>(() => buildQuiz(holiday));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState<number | null>(null);

  const q = questions[idx];

  const submit = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    const ok = i === q.correct;
    if (ok) setScore(s => s + 1);
    setTimeout(() => {
      setPick(null);
      if (idx + 1 >= questions.length) {
        const finalScore = score + (ok ? 1 : 0);
        if (finalScore >= 6) {
          setTimeout(() => onPass(finalScore), 600);
        } else {
          setTimeout(() => {
            alert(`קיבלת ${finalScore}/8. ננסה שוב!`);
            setQuestions(buildQuiz(holiday)); setIdx(0); setScore(0);
          }, 400);
        }
      } else {
        setIdx(i => i + 1);
      }
    }, 1100);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-800">🧠 מבחן</h2>
          <span className={`text-sm font-bold ${holiday.accent.text}`}>{idx + 1}/{questions.length} • ⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${holiday.accent.bg} transition-all`} style={{ width: `${(idx / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <p className="text-lg text-gray-800 mb-4 leading-relaxed">{q.question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {q.options.map((opt, i) => {
            const isCorrect = pick !== null && i === q.correct;
            const isWrong = pick === i && i !== q.correct;
            return (
              <button key={i} onClick={() => submit(i)} disabled={pick !== null}
                className={`py-3 px-4 rounded-xl text-base font-bold border-2 transition-all min-h-[48px] ${
                  isCorrect ? "bg-green-500 text-white border-green-500" :
                  isWrong ? "bg-red-500 text-white border-red-500" :
                  `${holiday.accent.soft} ${holiday.accent.text} ${holiday.accent.border} hover:scale-[1.02]`
                }`}>
                {opt}
              </button>
            );
          })}
        </div>
        {pick !== null && (
          <div className={`mt-4 p-3 rounded-xl flex items-center justify-center gap-2 font-bold ${pick === q.correct ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {pick === q.correct ? <><Check size={20} /> נכון!</> : <><X size={20} /> התשובה: {q.options[q.correct]}</>}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ STEP 4 — DONE ============
function StepDone({ holiday, quizScore, onComplete, onRestart }: { holiday: Holiday; quizScore: number; onComplete: () => void; onRestart: () => void }) {
  const [confetti, setConfetti] = useState<{ x: number; y: number; emoji: string; delay: number }[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: -10 - Math.random() * 30,
      emoji: holiday.completionEmojis[Math.floor(Math.random() * holiday.completionEmojis.length)],
      delay: Math.random() * 1.5,
    }));
    setConfetti(items);
  }, [holiday]);

  const share = () => {
    const text = `${holiday.emoji} סיימתי ללמוד על ${holiday.name}!\n📊 ציון מבחן: ${quizScore}/8\n${holiday.blessing.text}\n#חגי_ישראל`;
    navigator.clipboard.writeText(text);
    alert("✅ התוצאה הועתקה!");
  };

  return (
    <div className="space-y-4 relative">
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((c, i) => (
          <div key={i} className="absolute text-2xl" style={{
            left: `${c.x}%`, top: `${c.y}%`,
            animation: `fall 2.5s ${c.delay}s ease-in forwards`,
          }}>{c.emoji}</div>
        ))}
      </div>
      <style>{`@keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`}</style>

      <div className={`bg-gradient-to-br ${holiday.accent.gradient} rounded-2xl p-6 text-white text-center shadow-lg`}>
        <div className="text-6xl mb-2">{holiday.emoji}</div>
        <h2 className="text-2xl font-bold mb-1">כל הכבוד!</h2>
        <p className="text-white/90">סיימת את היחידה על {holiday.name}!</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{quizScore}/8</div>
            <div className="text-xs">ציון מבחן</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{holiday.vocabulary.length}</div>
            <div className="text-xs">מילים נלמדו</div>
          </div>
        </div>
      </div>

      {/* Blessing (large) */}
      <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-amber-200 text-center">
        <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">ברכת החג</p>
        <p className={`text-3xl font-bold ${holiday.accent.text} mb-2 leading-relaxed`} style={{ fontFamily: "Georgia, serif" }}>
          {holiday.blessing.text}
        </p>
        {holiday.blessing.extra && (
          <p className="text-base text-gray-600 italic mb-2" style={{ fontFamily: "Georgia, serif" }}>
            {holiday.blessing.extra}
          </p>
        )}
        <p className="text-sm text-gray-500" dir="ltr">{holiday.blessing.translation}</p>
      </div>

      {/* Fun fact */}
      <div className={`p-4 rounded-2xl ${holiday.accent.soft} border-2 ${holiday.accent.border}`}>
        <p className="text-xs font-bold text-gray-600 mb-1">💡 ידעת?</p>
        <p className="text-base text-gray-800 leading-relaxed">{holiday.funFact}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button onClick={share} className="py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1 min-h-[48px]">
          <Share2 size={14} /> שתף
        </button>
        <button onClick={onRestart} className="py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1 min-h-[48px]">
          <RotateCcw size={14} /> מחדש
        </button>
        <button onClick={onComplete} className={`py-3 ${holiday.accent.bg} text-white font-bold rounded-xl text-sm flex items-center justify-center gap-1 min-h-[48px]`}>
          <Trophy size={14} /> סיים
        </button>
      </div>
    </div>
  );
}
