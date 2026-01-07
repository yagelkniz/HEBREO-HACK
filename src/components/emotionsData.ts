export interface EmotionWord {
  word: string;
  withNikud: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
}

export interface EmotionStory {
  title: string;
  text: string;
  textWithNikud: string;
  translation: string;
}

export interface EmotionQuestion {
  id: number;
  question: string;
  questionWithNikud: string;
  options: { text: string; withNikud: string }[];
  answerIndex: number;
  explanation: string;
}

export const emotionsVocabulary: EmotionWord[] = [
  { word: "שמח", withNikud: "שָׂמֵחַ", meaning: "Happy", example: "אני שמח היום", exampleTranslation: "I am happy today" },
  { word: "עצוב", withNikud: "עָצוּב", meaning: "Sad", example: "הוא עצוב מאוד", exampleTranslation: "He is very sad" },
  { word: "כועס", withNikud: "כּוֹעֵס", meaning: "Angry", example: "אבא כועס עליי", exampleTranslation: "Dad is angry at me" },
  { word: "מפחד", withNikud: "מְפַחֵד", meaning: "Scared/Afraid", example: "הילד מפחד מהחושך", exampleTranslation: "The child is afraid of the dark" },
  { word: "מופתע", withNikud: "מֻפְתָּע", meaning: "Surprised", example: "היא מופתעת מהמתנה", exampleTranslation: "She is surprised by the gift" },
  { word: "עייף", withNikud: "עָיֵף", meaning: "Tired", example: "אני עייף אחרי העבודה", exampleTranslation: "I am tired after work" },
  { word: "מתרגש", withNikud: "מִתְרַגֵּשׁ", meaning: "Excited", example: "הם מתרגשים לפני הטיול", exampleTranslation: "They are excited before the trip" },
  { word: "מאוכזב", withNikud: "מְאֻכְזָב", meaning: "Disappointed", example: "היא מאוכזבת מהתוצאה", exampleTranslation: "She is disappointed by the result" },
  { word: "גאה", withNikud: "גֵּאֶה", meaning: "Proud", example: "אמא גאה בי", exampleTranslation: "Mom is proud of me" },
  { word: "מודאג", withNikud: "מֻדְאָג", meaning: "Worried", example: "הוא מודאג בגלל הבחינה", exampleTranslation: "He is worried because of the exam" },
  { word: "רגוע", withNikud: "רָגוּעַ", meaning: "Calm", example: "אני רגוע עכשיו", exampleTranslation: "I am calm now" },
  { word: "מבולבל", withNikud: "מְבֻלְבָּל", meaning: "Confused", example: "התלמיד מבולבל", exampleTranslation: "The student is confused" },
];

// ========== EASY LEVEL ==========
export const easyStory: EmotionStory = {
  title: "יום טוב",
  text: `היום דני שמח. הוא קיבל מתנה מאמא. המתנה היא כלב קטן! דני מתרגש מאוד. הוא אוהב את הכלב. אבל הכלב מפחד קצת. הכלב חדש בבית. דני רגוע ונותן לכלב אוכל. עכשיו הכלב גם שמח!`,
  textWithNikud: `הַיּוֹם דָּנִי שָׂמֵחַ. הוּא קִיבֵּל מַתָּנָה מֵאִמָּא. הַמַּתָּנָה הִיא כֶּלֶב קָטָן! דָּנִי מִתְרַגֵּשׁ מְאוֹד. הוּא אוֹהֵב אֶת הַכֶּלֶב. אֲבָל הַכֶּלֶב מְפַחֵד קְצָת. הַכֶּלֶב חָדָשׁ בַּבַּיִת. דָּנִי רָגוּעַ וְנוֹתֵן לַכֶּלֶב אֹכֶל. עַכְשָׁו הַכֶּלֶב גַּם שָׂמֵחַ!`,
  translation: "Today Danny is happy. He received a gift from mom. The gift is a small dog! Danny is very excited. He loves the dog. But the dog is a little scared. The dog is new at home. Danny is calm and gives the dog food. Now the dog is also happy!",
};

export const easyQuestions: EmotionQuestion[] = [
  {
    id: 1,
    question: "איך דני מרגיש בהתחלה?",
    questionWithNikud: "אֵיךְ דָּנִי מַרְגִּישׁ בַּהַתְחָלָה?",
    options: [
      { text: "שמח", withNikud: "שָׂמֵחַ" },
      { text: "עצוב", withNikud: "עָצוּב" },
      { text: "כועס", withNikud: "כּוֹעֵס" },
    ],
    answerIndex: 0,
    explanation: "דני שמח כי הוא קיבל מתנה",
  },
  {
    id: 2,
    question: "מה המתנה?",
    questionWithNikud: "מָה הַמַּתָּנָה?",
    options: [
      { text: "חתול", withNikud: "חָתוּל" },
      { text: "כלב", withNikud: "כֶּלֶב" },
      { text: "ספר", withNikud: "סֵפֶר" },
    ],
    answerIndex: 1,
    explanation: "המתנה היא כלב קטן",
  },
  {
    id: 3,
    question: "איך הכלב מרגיש בהתחלה?",
    questionWithNikud: "אֵיךְ הַכֶּלֶב מַרְגִּישׁ בַּהַתְחָלָה?",
    options: [
      { text: "שמח", withNikud: "שָׂמֵחַ" },
      { text: "מפחד", withNikud: "מְפַחֵד" },
      { text: "כועס", withNikud: "כּוֹעֵס" },
    ],
    answerIndex: 1,
    explanation: "הכלב מפחד כי הוא חדש בבית",
  },
  {
    id: 4,
    question: "מה דני נותן לכלב?",
    questionWithNikud: "מָה דָּנִי נוֹתֵן לַכֶּלֶב?",
    options: [
      { text: "מים", withNikud: "מַיִם" },
      { text: "צעצוע", withNikud: "צַעֲצוּעַ" },
      { text: "אוכל", withNikud: "אֹכֶל" },
    ],
    answerIndex: 2,
    explanation: "דני נותן לכלב אוכל",
  },
  {
    id: 5,
    question: "איך דני מרגיש כשהוא נותן אוכל לכלב?",
    questionWithNikud: "אֵיךְ דָּנִי מַרְגִּישׁ כְּשֶׁהוּא נוֹתֵן אֹכֶל לַכֶּלֶב?",
    options: [
      { text: "מפחד", withNikud: "מְפַחֵד" },
      { text: "רגוע", withNikud: "רָגוּעַ" },
      { text: "עצוב", withNikud: "עָצוּב" },
    ],
    answerIndex: 1,
    explanation: "דני רגוע כשהוא נותן אוכל לכלב",
  },
  {
    id: 6,
    question: "בסוף הסיפור - איך הכלב מרגיש?",
    questionWithNikud: "בְּסוֹף הַסִּיפּוּר - אֵיךְ הַכֶּלֶב מַרְגִּישׁ?",
    options: [
      { text: "מפחד", withNikud: "מְפַחֵד" },
      { text: "עצוב", withNikud: "עָצוּב" },
      { text: "שמח", withNikud: "שָׂמֵחַ" },
    ],
    answerIndex: 2,
    explanation: "בסוף הכלב גם שמח",
  },
];

// ========== MEDIUM LEVEL ==========
export const mediumStory: EmotionStory = {
  title: "הבחינה",
  text: `מיכל הייתה מודאגת כל הלילה. מחר יש לה בחינה בחשבון. היא לא הבינה את החומר והייתה מבולבלת. אבא שלה ראה שהיא עצובה ובא לעזור. הם למדו יחד שעתיים. אחרי הלימוד מיכל הרגישה יותר רגועה. 

למחרת, אחרי הבחינה, מיכל הייתה מופתעת - היא קיבלה ציון טוב! היא הייתה כל כך שמחה ומתרגשת. היא רצה לספר לאבא. אבא היה גאה בה מאוד. "ראית?" הוא אמר, "כשעובדים קשה, מצליחים!"`,
  textWithNikud: `מִיכַל הָיְתָה מֻדְאֶגֶת כָּל הַלַּיְלָה. מָחָר יֵשׁ לָהּ בְּחִינָה בְּחֶשְׁבּוֹן. הִיא לֹא הֵבִינָה אֶת הַחֹמֶר וְהָיְתָה מְבֻלְבֶּלֶת. אַבָּא שֶׁלָּהּ רָאָה שֶׁהִיא עֲצוּבָה וּבָא לַעֲזֹר. הֵם לָמְדוּ יַחַד שְׁעָתַיִם. אַחֲרֵי הַלִּימּוּד מִיכַל הִרְגִּישָׁה יוֹתֵר רְגוּעָה.

לְמָחֳרָת, אַחֲרֵי הַבְּחִינָה, מִיכַל הָיְתָה מֻפְתַּעַת - הִיא קִיבְּלָה צִיּוּן טוֹב! הִיא הָיְתָה כָּל כָּךְ שְׂמֵחָה וּמִתְרַגֶּשֶׁת. הִיא רָצָה לְסַפֵּר לְאַבָּא. אַבָּא הָיָה גֵּאֶה בָּהּ מְאוֹד. "רָאִית?" הוּא אָמַר, "כְּשֶׁעוֹבְדִים קָשֶׁה, מַצְלִיחִים!"`,
  translation: `Michal was worried all night. Tomorrow she has a math exam. She didn't understand the material and was confused. Her dad saw that she was sad and came to help. They studied together for two hours. After studying, Michal felt calmer.

The next day, after the exam, Michal was surprised - she got a good grade! She was so happy and excited. She ran to tell dad. Dad was very proud of her. "You see?" he said, "When you work hard, you succeed!"`,
};

export const mediumQuestions: EmotionQuestion[] = [
  {
    id: 1,
    question: "למה מיכל הייתה מודאגת?",
    questionWithNikud: "לָמָּה מִיכַל הָיְתָה מֻדְאֶגֶת?",
    options: [
      { text: "בגלל הבחינה", withNikud: "בִּגְלַל הַבְּחִינָה" },
      { text: "בגלל אבא", withNikud: "בִּגְלַל אַבָּא" },
      { text: "בגלל חבר", withNikud: "בִּגְלַל חָבֵר" },
    ],
    answerIndex: 0,
    explanation: "מיכל הייתה מודאגת בגלל הבחינה בחשבון",
  },
  {
    id: 2,
    question: "איך מיכל הרגישה לפני שאבא עזר?",
    questionWithNikud: "אֵיךְ מִיכַל הִרְגִּישָׁה לִפְנֵי שֶׁאַבָּא עָזַר?",
    options: [
      { text: "שמחה וגאה", withNikud: "שְׂמֵחָה וְגֵאָה" },
      { text: "עצובה ומבולבלת", withNikud: "עֲצוּבָה וּמְבֻלְבֶּלֶת" },
      { text: "רגועה ומתרגשת", withNikud: "רְגוּעָה וּמִתְרַגֶּשֶׁת" },
    ],
    answerIndex: 1,
    explanation: "היא הייתה עצובה ומבולבלת כי לא הבינה את החומר",
  },
  {
    id: 3,
    question: "כמה זמן הם למדו יחד?",
    questionWithNikud: "כַּמָּה זְמַן הֵם לָמְדוּ יַחַד?",
    options: [
      { text: "שעה", withNikud: "שָׁעָה" },
      { text: "שעתיים", withNikud: "שְׁעָתַיִם" },
      { text: "שלוש שעות", withNikud: "שָׁלוֹשׁ שָׁעוֹת" },
    ],
    answerIndex: 1,
    explanation: "הם למדו יחד שעתיים",
  },
  {
    id: 4,
    question: "איך מיכל הרגישה אחרי הלימוד עם אבא?",
    questionWithNikud: "אֵיךְ מִיכַל הִרְגִּישָׁה אַחֲרֵי הַלִּימּוּד עִם אַבָּא?",
    options: [
      { text: "יותר מודאגת", withNikud: "יוֹתֵר מֻדְאֶגֶת" },
      { text: "יותר רגועה", withNikud: "יוֹתֵר רְגוּעָה" },
      { text: "יותר עצובה", withNikud: "יוֹתֵר עֲצוּבָה" },
    ],
    answerIndex: 1,
    explanation: "אחרי הלימוד היא הרגישה יותר רגועה",
  },
  {
    id: 5,
    question: "למה מיכל הייתה מופתעת?",
    questionWithNikud: "לָמָּה מִיכַל הָיְתָה מֻפְתַּעַת?",
    options: [
      { text: "היא קיבלה ציון טוב", withNikud: "הִיא קִיבְּלָה צִיּוּן טוֹב" },
      { text: "היא קיבלה מתנה", withNikud: "הִיא קִיבְּלָה מַתָּנָה" },
      { text: "אבא בא לבית ספר", withNikud: "אַבָּא בָּא לְבֵית סֵפֶר" },
    ],
    answerIndex: 0,
    explanation: "היא הייתה מופתעת כי קיבלה ציון טוב",
  },
  {
    id: 6,
    question: "איך מיכל הרגישה אחרי הבחינה?",
    questionWithNikud: "אֵיךְ מִיכַל הִרְגִּישָׁה אַחֲרֵי הַבְּחִינָה?",
    options: [
      { text: "מאוכזבת וכועסת", withNikud: "מְאֻכְזֶבֶת וְכוֹעֶסֶת" },
      { text: "שמחה ומתרגשת", withNikud: "שְׂמֵחָה וּמִתְרַגֶּשֶׁת" },
      { text: "עייפה ורגועה", withNikud: "עֲיֵפָה וּרְגוּעָה" },
    ],
    answerIndex: 1,
    explanation: "היא הייתה שמחה ומתרגשת כי קיבלה ציון טוב",
  },
  {
    id: 7,
    question: "איך אבא הרגיש?",
    questionWithNikud: "אֵיךְ אַבָּא הִרְגִּישׁ?",
    options: [
      { text: "מודאג", withNikud: "מֻדְאָג" },
      { text: "גאה", withNikud: "גֵּאֶה" },
      { text: "מופתע", withNikud: "מֻפְתָּע" },
    ],
    answerIndex: 1,
    explanation: "אבא היה גאה במיכל",
  },
  {
    id: 8,
    question: "מה המסר של הסיפור?",
    questionWithNikud: "מָה הַמֶּסֶר שֶׁל הַסִּיפּוּר?",
    options: [
      { text: "לא צריך ללמוד", withNikud: "לֹא צָרִיךְ לִלְמֹד" },
      { text: "כשעובדים קשה, מצליחים", withNikud: "כְּשֶׁעוֹבְדִים קָשֶׁה, מַצְלִיחִים" },
      { text: "בחינות קלות", withNikud: "בְּחִינוֹת קַלּוֹת" },
    ],
    answerIndex: 1,
    explanation: "המסר הוא שכשעובדים קשה, מצליחים",
  },
];

// ========== HARD LEVEL ==========
export const hardStory: EmotionStory = {
  title: "ראיון העבודה",
  text: `יונתן היה מתרגש ומודאג בו זמנית. היום יש לו ראיון עבודה בחברה גדולה. הוא התכונן שבועות, אבל עדיין היה לחוץ. בדרך לראיון, הוא נתקע בפקק ונהיה עצבני. הוא פחד שיאחר.

כשהגיע, הוא היה נבוך ומבולבל קצת. אבל לקח נשימה עמוקה וניסה להירגע. הראיון התחיל, והמראיינת הייתה נחמדה. יונתן הרגיש יותר בטוח בעצמו והצליח לענות על כל השאלות.

אחרי הראיון הוא הרגיש הקלה, אבל גם חוסר ודאות. האם יקבלו אותו? שבוע אחר כך הוא קיבל טלפון - הוא התקבל! הוא היה בהלם מאושר. הוא התקשר לספר להורים והם היו נרגשים וגאים. יונתן הבין שלפעמים דברים שמפחידים אותנו יכולים להיגמר בצורה הכי טובה.`,
  textWithNikud: `יוֹנָתָן הָיָה מִתְרַגֵּשׁ וּמֻדְאָג בּוֹ זְמַנִּית. הַיּוֹם יֵשׁ לוֹ רֵאָיוֹן עֲבוֹדָה בְּחֶבְרָה גְּדוֹלָה. הוּא הִתְכּוֹנֵן שָׁבוּעוֹת, אֲבָל עֲדַיִן הָיָה לָחוּץ. בַּדֶּרֶךְ לָרֵאָיוֹן, הוּא נִתְקַע בְּפֶקֶק וְנִהְיָה עַצְבָּנִי. הוּא פָּחַד שֶׁיְּאַחֵר.

כְּשֶׁהִגִּיעַ, הוּא הָיָה נָבוֹךְ וּמְבֻלְבָּל קְצָת. אֲבָל לָקַח נְשִׁימָה עֲמֻקָּה וְנִיסָּה לְהֵירָגַע. הָרֵאָיוֹן הִתְחִיל, וְהַמְּרַאְיֶינֶת הָיְתָה נֶחְמָדָה. יוֹנָתָן הִרְגִּישׁ יוֹתֵר בָּטוּחַ בְּעַצְמוֹ וְהִצְלִיחַ לַעֲנוֹת עַל כָּל הַשְּׁאֵלוֹת.

אַחֲרֵי הָרֵאָיוֹן הוּא הִרְגִּישׁ הֲקָלָה, אֲבָל גַּם חֹסֶר וַדָּאוּת. הַאִם יְקַבְּלוּ אוֹתוֹ? שָׁבוּעַ אַחַר כָּךְ הוּא קִיבֵּל טֶלֶפוֹן - הוּא הִתְקַבֵּל! הוּא הָיָה בְּהֶלֶם מְאֻשָּׁר. הוּא הִתְקַשֵּׁר לְסַפֵּר לַהוֹרִים וְהֵם הָיוּ נִרְגָּשִׁים וּגְאִים. יוֹנָתָן הֵבִין שֶׁלִּפְעָמִים דְּבָרִים שֶׁמַּפְחִידִים אוֹתָנוּ יְכוֹלִים לְהִיגָמֵר בַּצּוּרָה הֲכִי טוֹבָה.`,
  translation: `Yonatan was excited and worried at the same time. Today he has a job interview at a big company. He prepared for weeks, but was still stressed. On the way to the interview, he got stuck in traffic and became irritated. He was afraid he would be late.

When he arrived, he was embarrassed and a bit confused. But he took a deep breath and tried to calm down. The interview started, and the interviewer was nice. Yonatan felt more confident and managed to answer all the questions.

After the interview he felt relief, but also uncertainty. Would they accept him? A week later he got a phone call - he was accepted! He was in happy shock. He called to tell his parents and they were emotional and proud. Yonatan understood that sometimes things that scare us can end in the best way.`,
};

export const hardQuestions: EmotionQuestion[] = [
  {
    id: 1,
    question: "איך יונתן הרגיש לפני הראיון?",
    questionWithNikud: "אֵיךְ יוֹנָתָן הִרְגִּישׁ לִפְנֵי הָרֵאָיוֹן?",
    options: [
      { text: "רגוע ושמח", withNikud: "רָגוּעַ וְשָׂמֵחַ" },
      { text: "מתרגש ומודאג", withNikud: "מִתְרַגֵּשׁ וּמֻדְאָג" },
      { text: "עצוב ומאוכזב", withNikud: "עָצוּב וּמְאֻכְזָב" },
    ],
    answerIndex: 1,
    explanation: "הוא היה מתרגש ומודאג בו זמנית",
  },
  {
    id: 2,
    question: "למה יונתן נהיה עצבני בדרך?",
    questionWithNikud: "לָמָּה יוֹנָתָן נִהְיָה עַצְבָּנִי בַּדֶּרֶךְ?",
    options: [
      { text: "הוא שכח משהו", withNikud: "הוּא שָׁכַח מַשֶּׁהוּ" },
      { text: "הוא נתקע בפקק", withNikud: "הוּא נִתְקַע בְּפֶקֶק" },
      { text: "הוא קיבל טלפון", withNikud: "הוּא קִיבֵּל טֶלֶפוֹן" },
    ],
    answerIndex: 1,
    explanation: "הוא נתקע בפקק ופחד שיאחר",
  },
  {
    id: 3,
    question: "מה יונתן עשה כדי להירגע?",
    questionWithNikud: "מָה יוֹנָתָן עָשָׂה כְּדֵי לְהֵירָגַע?",
    options: [
      { text: "שתה קפה", withNikud: "שָׁתָה קָפֶה" },
      { text: "לקח נשימה עמוקה", withNikud: "לָקַח נְשִׁימָה עֲמֻקָּה" },
      { text: "התקשר לחבר", withNikud: "הִתְקַשֵּׁר לְחָבֵר" },
    ],
    answerIndex: 1,
    explanation: "הוא לקח נשימה עמוקה וניסה להירגע",
  },
  {
    id: 4,
    question: "איך המראיינת הייתה?",
    questionWithNikud: "אֵיךְ הַמְּרַאְיֶינֶת הָיְתָה?",
    options: [
      { text: "קשה וכועסת", withNikud: "קָשָׁה וְכוֹעֶסֶת" },
      { text: "נחמדה", withNikud: "נֶחְמָדָה" },
      { text: "משעממת", withNikud: "מְשַׁעֲמֶמֶת" },
    ],
    answerIndex: 1,
    explanation: "המראיינת הייתה נחמדה",
  },
  {
    id: 5,
    question: "מה יונתן הרגיש אחרי הראיון?",
    questionWithNikud: "מָה יוֹנָתָן הִרְגִּישׁ אַחֲרֵי הָרֵאָיוֹן?",
    options: [
      { text: "הקלה וחוסר ודאות", withNikud: "הֲקָלָה וְחֹסֶר וַדָּאוּת" },
      { text: "כעס ואכזבה", withNikud: "כַּעַס וְאַכְזָבָה" },
      { text: "עייפות ורעב", withNikud: "עֲיֵפוּת וְרָעָב" },
    ],
    answerIndex: 0,
    explanation: "הוא הרגיש הקלה אבל גם לא ידע אם יתקבל",
  },
  {
    id: 6,
    question: "כמה זמן עבר עד שקיבל תשובה?",
    questionWithNikud: "כַּמָּה זְמַן עָבַר עַד שֶׁקִּיבֵּל תְּשׁוּבָה?",
    options: [
      { text: "יום", withNikud: "יוֹם" },
      { text: "שבוע", withNikud: "שָׁבוּעַ" },
      { text: "חודש", withNikud: "חֹדֶשׁ" },
    ],
    answerIndex: 1,
    explanation: "שבוע אחר כך הוא קיבל טלפון",
  },
  {
    id: 7,
    question: "איך יונתן הרגיש כשהתקבל?",
    questionWithNikud: "אֵיךְ יוֹנָתָן הִרְגִּישׁ כְּשֶׁהִתְקַבֵּל?",
    options: [
      { text: "בהלם מאושר", withNikud: "בְּהֶלֶם מְאֻשָּׁר" },
      { text: "מודאג", withNikud: "מֻדְאָג" },
      { text: "עצוב", withNikud: "עָצוּב" },
    ],
    answerIndex: 0,
    explanation: "הוא היה בהלם מאושר - מופתע ושמח מאוד",
  },
  {
    id: 8,
    question: "איך ההורים הרגישו?",
    questionWithNikud: "אֵיךְ הַהוֹרִים הִרְגִּישׁוּ?",
    options: [
      { text: "מודאגים", withNikud: "מֻדְאָגִים" },
      { text: "נרגשים וגאים", withNikud: "נִרְגָּשִׁים וּגְאִים" },
      { text: "מופתעים ומבולבלים", withNikud: "מֻפְתָּעִים וּמְבֻלְבָּלִים" },
    ],
    answerIndex: 1,
    explanation: "ההורים היו נרגשים וגאים ביונתן",
  },
  {
    id: 9,
    question: "מה המסר של הסיפור?",
    questionWithNikud: "מָה הַמֶּסֶר שֶׁל הַסִּיפּוּר?",
    options: [
      { text: "לא כדאי ללכת לראיונות", withNikud: "לֹא כְּדַאי לָלֶכֶת לְרֵאָיוֹנוֹת" },
      { text: "דברים מפחידים יכולים להיגמר טוב", withNikud: "דְּבָרִים מַפְחִידִים יְכוֹלִים לְהִיגָמֵר טוֹב" },
      { text: "פקקים זה נורא", withNikud: "פְּקָקִים זֶה נוֹרָא" },
    ],
    answerIndex: 1,
    explanation: "המסר הוא שדברים שמפחידים אותנו יכולים להיגמר בצורה טובה",
  },
  {
    id: 10,
    question: "מה עזר ליונתן להרגיש יותר בטוח?",
    questionWithNikud: "מָה עָזַר לְיוֹנָתָן לְהַרְגִּישׁ יוֹתֵר בָּטוּחַ?",
    options: [
      { text: "המראיינת הנחמדה", withNikud: "הַמְּרַאְיֶינֶת הַנֶּחְמָדָה" },
      { text: "הפקק בדרך", withNikud: "הַפֶּקֶק בַּדֶּרֶךְ" },
      { text: "הטלפון מההורים", withNikud: "הַטֶּלֶפוֹן מֵהַהוֹרִים" },
    ],
    answerIndex: 0,
    explanation: "המראיינת הנחמדה עזרה לו להרגיש יותר בטוח",
  },
];
