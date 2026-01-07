export interface VocabWord {
  hebrew: string;
  hebrewWithNikud: string;
  english: string;
}

export const colorsVocabulary: VocabWord[] = [
  { hebrew: "אדום", hebrewWithNikud: "אָדֹם", english: "Red" },
  { hebrew: "כתום", hebrewWithNikud: "כָּתֹם", english: "Orange" },
  { hebrew: "צהוב", hebrewWithNikud: "צָהֹב", english: "Yellow" },
  { hebrew: "ירוק", hebrewWithNikud: "יָרֹק", english: "Green" },
  { hebrew: "כחול", hebrewWithNikud: "כָּחֹל", english: "Blue" },
  { hebrew: "סגול", hebrewWithNikud: "סָגֹל", english: "Purple" },
  { hebrew: "ורוד", hebrewWithNikud: "וָרֹד", english: "Pink" },
  { hebrew: "לבן", hebrewWithNikud: "לָבָן", english: "White" },
  { hebrew: "שחור", hebrewWithNikud: "שָׁחֹר", english: "Black" },
  { hebrew: "חום", hebrewWithNikud: "חוּם", english: "Brown" },
];

export const fruitsVocabulary: VocabWord[] = [
  { hebrew: "תפוח", hebrewWithNikud: "תַּפּוּחַ", english: "Apple" },
  { hebrew: "בננה", hebrewWithNikud: "בַּנָנָה", english: "Banana" },
  { hebrew: "תפוז", hebrewWithNikud: "תַּפּוּז", english: "Orange (fruit)" },
  { hebrew: "ענבים", hebrewWithNikud: "עֲנָבִים", english: "Grapes" },
  { hebrew: "תות", hebrewWithNikud: "תּוּת", english: "Strawberry" },
  { hebrew: "אבטיח", hebrewWithNikud: "אֲבַטִּיחַ", english: "Watermelon" },
  { hebrew: "לימון", hebrewWithNikud: "לִימוֹן", english: "Lemon" },
  { hebrew: "אגס", hebrewWithNikud: "אַגָּס", english: "Pear" },
  { hebrew: "מנגו", hebrewWithNikud: "מַנְגוֹ", english: "Mango" },
  { hebrew: "אננס", hebrewWithNikud: "אֲנָנָס", english: "Pineapple" },
];

export interface StoryData {
  text: string;
  textWithNikud: string;
  translation: string;
}

export const stories: Record<"easy" | "medium" | "hard", StoryData> = {
  easy: {
    text: "דני הולך לשוק. הוא קונה תפוח אדום ובננה צהובה. אמא שלו אוהבת תפוזים כתומים. דני אוכל את הפירות בבית.",
    textWithNikud: "דָּנִי הוֹלֵךְ לַשּׁוּק. הוּא קוֹנֶה תַּפּוּחַ אָדֹם וּבַנָנָה צְהֻבָּה. אִמָּא שֶׁלּוֹ אוֹהֶבֶת תַּפּוּזִים כְּתֻמִּים. דָּנִי אוֹכֵל אֶת הַפֵּרוֹת בַּבַּיִת.",
    translation: "Danny goes to the market. He buys a red apple and a yellow banana. His mom likes orange oranges. Danny eats the fruits at home."
  },
  medium: {
    text: "בחנות הירקות יש הרבה פירות צבעוניים. מיכל בוחרת ענבים סגולים ותותים אדומים לסלט פירות. היא גם לוקחת אבטיח ירוק מבחוץ ואדום מבפנים. הסלט יהיה טעים מאוד!",
    textWithNikud: "בַּחֲנוּת הַיְּרָקוֹת יֵשׁ הַרְבֵּה פֵּרוֹת צִבְעוֹנִיִּים. מִיכַל בּוֹחֶרֶת עֲנָבִים סְגֻלִּים וְתוּתִים אֲדֻמִּים לְסָלָט פֵּרוֹת. הִיא גַּם לוֹקַחַת אֲבַטִּיחַ יָרֹק מִבַּחוּץ וְאָדֹם מִבִּפְנִים. הַסָּלָט יִהְיֶה טָעִים מְאֹד!",
    translation: "In the vegetable store there are many colorful fruits. Michal chooses purple grapes and red strawberries for a fruit salad. She also takes a watermelon that is green outside and red inside. The salad will be very tasty!"
  },
  hard: {
    text: "בקיץ, המשפחה נוסעת לכרם לקטוף פירות. הילדים אוספים ענבים ירוקים וסגולים לסלים גדולים. אבא מוצא עץ לימון עם פירות צהובים בהירים. סבתא מכינה מיץ לימון קר עם קרח. בערב, כולם יושבים בחצר ואוכלים אבטיח מתוק. הצבעים של הפירות - אדום, ירוק, צהוב וסגול - נראים יפים על השולחן הלבן.",
    textWithNikud: "בַּקַּיִץ, הַמִּשְׁפָּחָה נוֹסַעַת לַכֶּרֶם לִקְטֹף פֵּרוֹת. הַיְּלָדִים אוֹסְפִים עֲנָבִים יְרֻקִּים וּסְגֻלִּים לַסַּלִּים הַגְּדוֹלִים. אַבָּא מוֹצֵא עֵץ לִימוֹן עִם פֵּרוֹת צְהֻבִּים בְּהִירִים. סָבְתָא מְכִינָה מִיץ לִימוֹן קַר עִם קֶרַח. בָּעֶרֶב, כֻּלָּם יוֹשְׁבִים בֶּחָצֵר וְאוֹכְלִים אֲבַטִּיחַ מָתוֹק. הַצְּבָעִים שֶׁל הַפֵּרוֹת - אָדֹם, יָרֹק, צָהֹב וְסָגֹל - נִרְאִים יָפִים עַל הַשֻּׁלְחָן הַלָּבָן.",
    translation: "In summer, the family travels to the vineyard to pick fruits. The children collect green and purple grapes into large baskets. Dad finds a lemon tree with bright yellow fruits. Grandma prepares cold lemonade with ice. In the evening, everyone sits in the yard and eats sweet watermelon. The colors of the fruits - red, green, yellow and purple - look beautiful on the white table."
  }
};

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

// שאלות על צבעים - תרגום מעברית לאנגלית ולהיפך
export const colorQuestions: Question[] = [
  { question: "מה התרגום של 'אדום'?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Red" },
  { question: "מה התרגום של 'כתום'?", options: ["Purple", "Pink", "Orange", "Brown"], answer: "Orange" },
  { question: "מה התרגום של 'צהוב'?", options: ["Yellow", "White", "Black", "Green"], answer: "Yellow" },
  { question: "מה התרגום של 'ירוק'?", options: ["Blue", "Red", "Green", "Purple"], answer: "Green" },
  { question: "מה התרגום של 'כחול'?", options: ["Blue", "Green", "Pink", "Brown"], answer: "Blue" },
  { question: "מה התרגום של 'סגול'?", options: ["Pink", "Purple", "Orange", "Red"], answer: "Purple" },
  { question: "מה התרגום של 'ורוד'?", options: ["White", "Pink", "Red", "Purple"], answer: "Pink" },
  { question: "מה התרגום של 'לבן'?", options: ["Black", "Brown", "White", "Yellow"], answer: "White" },
  { question: "מה התרגום של 'שחור'?", options: ["White", "Brown", "Black", "Blue"], answer: "Black" },
  { question: "מה התרגום של 'חום'?", options: ["Brown", "Orange", "Red", "Black"], answer: "Brown" },
  // הפוך - מאנגלית לעברית
  { question: "What is 'Red' in Hebrew?", options: ["כחול", "אדום", "ירוק", "צהוב"], answer: "אדום" },
  { question: "What is 'Green' in Hebrew?", options: ["ירוק", "כתום", "סגול", "לבן"], answer: "ירוק" },
  { question: "What is 'Blue' in Hebrew?", options: ["שחור", "כחול", "חום", "ורוד"], answer: "כחול" },
  { question: "What is 'Yellow' in Hebrew?", options: ["צהוב", "כתום", "לבן", "אדום"], answer: "צהוב" },
  { question: "What is 'White' in Hebrew?", options: ["שחור", "חום", "לבן", "ורוד"], answer: "לבן" },
];

// שאלות על פירות
export const fruitQuestions: Question[] = [
  { question: "מה התרגום של 'תפוח'?", options: ["Orange", "Apple", "Banana", "Pear"], answer: "Apple" },
  { question: "מה התרגום של 'בננה'?", options: ["Banana", "Mango", "Lemon", "Grape"], answer: "Banana" },
  { question: "מה התרגום של 'תפוז'?", options: ["Apple", "Lemon", "Orange", "Pear"], answer: "Orange" },
  { question: "מה התרגום של 'ענבים'?", options: ["Strawberry", "Grapes", "Watermelon", "Pineapple"], answer: "Grapes" },
  { question: "מה התרגום של 'תות'?", options: ["Strawberry", "Cherry", "Apple", "Mango"], answer: "Strawberry" },
  { question: "מה התרגום של 'אבטיח'?", options: ["Melon", "Watermelon", "Pineapple", "Mango"], answer: "Watermelon" },
  { question: "מה התרגום של 'לימון'?", options: ["Lime", "Orange", "Lemon", "Banana"], answer: "Lemon" },
  { question: "מה התרגום של 'אגס'?", options: ["Apple", "Pear", "Peach", "Plum"], answer: "Pear" },
  { question: "מה התרגום של 'מנגו'?", options: ["Mango", "Papaya", "Banana", "Pineapple"], answer: "Mango" },
  { question: "מה התרגום של 'אננס'?", options: ["Banana", "Mango", "Pineapple", "Coconut"], answer: "Pineapple" },
  // הפוך - מאנגלית לעברית
  { question: "What is 'Apple' in Hebrew?", options: ["תפוז", "תפוח", "אגס", "בננה"], answer: "תפוח" },
  { question: "What is 'Banana' in Hebrew?", options: ["מנגו", "בננה", "אננס", "לימון"], answer: "בננה" },
  { question: "What is 'Grapes' in Hebrew?", options: ["תותים", "ענבים", "תפוזים", "לימונים"], answer: "ענבים" },
  { question: "What is 'Watermelon' in Hebrew?", options: ["מלון", "אבטיח", "אננס", "מנגו"], answer: "אבטיח" },
  { question: "What is 'Lemon' in Hebrew?", options: ["תפוז", "לימון", "אגס", "תפוח"], answer: "לימון" },
];

// שאלות על חיבור צבעים לפירות
export const colorFruitMatchQuestions: Question[] = [
  { question: "באיזה צבע בננה בדרך כלל?", options: ["אדום", "ירוק", "צהוב", "כתום"], answer: "צהוב" },
  { question: "באיזה צבע תפוז?", options: ["צהוב", "כתום", "אדום", "ירוק"], answer: "כתום" },
  { question: "באיזה צבע תות?", options: ["צהוב", "ירוק", "אדום", "סגול"], answer: "אדום" },
  { question: "באיזה צבע ענבים יכולים להיות?", options: ["כתום", "ירוק או סגול", "צהוב", "לבן"], answer: "ירוק או סגול" },
  { question: "באיזה צבע לימון?", options: ["כתום", "ירוק", "צהוב", "לבן"], answer: "צהוב" },
  { question: "מה הצבע של אבטיח מבפנים?", options: ["ירוק", "אדום", "צהוב", "לבן"], answer: "אדום" },
  { question: "מה הצבע של אבטיח מבחוץ?", options: ["אדום", "ירוק", "צהוב", "חום"], answer: "ירוק" },
  { question: "איזה פרי צהוב?", options: ["תות", "ענבים", "בננה", "אבטיח"], answer: "בננה" },
  { question: "איזה פרי כתום?", options: ["תפוח", "תפוז", "אגס", "ענבים"], answer: "תפוז" },
  { question: "איזה פרי יכול להיות אדום או ירוק?", options: ["בננה", "תפוז", "תפוח", "לימון"], answer: "תפוח" },
];

export const questions: Record<"easy" | "medium" | "hard", Question[]> = {
  easy: [
    {
      question: "איזה צבע התפוח שדני קנה?",
      options: ["ירוק", "אדום", "צהוב", "כתום"],
      answer: "אדום"
    },
    {
      question: "מה אמא של דני אוהבת?",
      options: ["בננות", "תפוחים", "תפוזים", "ענבים"],
      answer: "תפוזים"
    },
    {
      question: "איזה צבע הבננה?",
      options: ["כתום", "ירוק", "צהוב", "לבן"],
      answer: "צהוב"
    }
  ],
  medium: [
    {
      question: "מה מיכל מכינה?",
      options: ["מרק", "סלט ירקות", "סלט פירות", "עוגה"],
      answer: "סלט פירות"
    },
    {
      question: "איזה צבע הענבים שמיכל בחרה?",
      options: ["ירוקים", "סגולים", "אדומים", "כחולים"],
      answer: "סגולים"
    },
    {
      question: "מה הצבע של האבטיח מבפנים?",
      options: ["ירוק", "צהוב", "אדום", "לבן"],
      answer: "אדום"
    },
    {
      question: "איזה פירות אדומים מיכל לקחה?",
      options: ["תפוחים", "תותים", "ענבים", "תפוזים"],
      answer: "תותים"
    }
  ],
  hard: [
    {
      question: "לאן המשפחה נוסעת בקיץ?",
      options: ["לים", "לכרם", "להר", "לחנות"],
      answer: "לכרם"
    },
    {
      question: "מה הילדים אוספים?",
      options: ["תפוחים", "לימונים", "ענבים", "תותים"],
      answer: "ענבים"
    },
    {
      question: "מה סבתא מכינה?",
      options: ["עוגה", "סלט", "מיץ לימון", "גלידה"],
      answer: "מיץ לימון"
    },
    {
      question: "איזה צבע השולחן?",
      options: ["חום", "שחור", "לבן", "ירוק"],
      answer: "לבן"
    },
    {
      question: "כמה צבעים של פירות מוזכרים בסוף הסיפור?",
      options: ["שניים", "שלושה", "ארבעה", "חמישה"],
      answer: "ארבעה"
    }
  ]
};
