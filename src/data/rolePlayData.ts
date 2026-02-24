export interface RolePlayOption {
  text: string;
  naturalness: number;
  feedback: string;
}

export interface RolePlayStep {
  id: string;
  npcLine: string;
  options: RolePlayOption[];
}

export interface GlossaryItem {
  termHe: string;
  termEn: string;
  meaningEn: string;
  exampleHe: string;
  exampleEn: string;
}

export interface GlossaryScreen {
  titleHe: string;
  titleEn: string;
  items: GlossaryItem[];
  ctaHe: string;
  ctaEn: string;
}

export interface RolePlayScenario {
  scenarioId: string;
  title: string;
  titleEn: string;
  goal: string;
  goalEn: string;
  characterTone: string;
  characterToneEn: string;
  glossaryScreen: GlossaryScreen;
  steps: RolePlayStep[];
}

export const rolePlayScenarios: RolePlayScenario[] = [
  {
    scenarioId: "friends_whatsapp",
    title: "קובעים יציאה בוואטסאפ",
    titleEn: "Making Plans on WhatsApp",
    goal: "לקבוע יציאה בלי להישמע רובוטי",
    goalEn: "Make plans without sounding robotic",
    characterTone: "קליל וישראלי",
    characterToneEn: "Casual & Israeli",
    glossaryScreen: {
      titleHe: "מקרא לפני התרגול",
      titleEn: "Glossary Before Practice",
      items: [
        { termHe: "מה נסגר?", termEn: "Ma nisgar?", meaningEn: "What's going on? / What's the plan?", exampleHe: "יאללה, מה נסגר הערב?", exampleEn: "So, what's the plan tonight?" },
        { termHe: "יאללה", termEn: "Yalla", meaningEn: "Let's go / Come on", exampleHe: "יאללה, יוצאים!", exampleEn: "Come on, let's go!" },
        { termHe: "בא לך", termEn: "Ba lekha", meaningEn: "Do you feel like / Do you want", exampleHe: "בא לך קפה?", exampleEn: "Do you feel like coffee?" },
        { termHe: "אני על זה", termEn: "Ani al ze", meaningEn: "I'm on it / I'm in", exampleHe: "יאללה, אני על זה.", exampleEn: "Yalla, I'm in." },
        { termHe: "יש מצב", termEn: "Yesh matzav", meaningEn: "Maybe / There's a chance", exampleHe: "יש מצב שאגיע.", exampleEn: "I might come." },
        { termHe: "אין מצב", termEn: "Ein matzav", meaningEn: "No way / Definitely not", exampleHe: "אין מצב שאני בא.", exampleEn: "No way I'm coming." },
        { termHe: "זורם", termEn: "Zorem", meaningEn: "Going with the flow / easygoing", exampleHe: "נראה איך אני זורם.", exampleEn: "Let's see how it goes." },
        { termHe: "סתם", termEn: "Stam", meaningEn: "Just / Nothing special", exampleHe: "סתם, מתלבט.", exampleEn: "Nothing, just thinking about it." },
      ],
      ctaHe: "יאללה מתחילים",
      ctaEn: "Start",
    },
    steps: [
      {
        id: "f1",
        npcLine: "חבר: יאללה מה נסגר היום?",
        options: [
          { text: "הכול בסדר אצלי, מה שלומך?", naturalness: 40, feedback: "נכון דקדוקית, אבל נשמע פורמלי מדי." },
          { text: "סתם, מתלבט אם לצאת.", naturalness: 85, feedback: "מעולה. טבעי וזורם." },
          { text: "אין מצב, אני עייף.", naturalness: 60, feedback: "טבעי, אבל קצת חוסם את השיחה." },
          { text: "אני נמצא בביתי כרגע.", naturalness: 10, feedback: "נשמע רובוטי ולא ישראלי." },
        ],
      },
      {
        id: "f2",
        npcLine: "חבר: בא לך בירה ב-9?",
        options: [
          { text: "יאללה, אני על זה.", naturalness: 95, feedback: "בול ישראלי." },
          { text: "ייתכן ואגיע.", naturalness: 20, feedback: "פורמלי מדי." },
          { text: "יש מצב, נראה איך אני זורם.", naturalness: 80, feedback: "מעולה, נשמע טבעי." },
          { text: "אני אבדוק ואשוב אליך.", naturalness: 30, feedback: "יותר מתאים למייל עבודה." },
        ],
      },
    ],
  },
  {
    scenarioId: "restaurant_telaviv",
    title: "מסעדה בתל אביב",
    titleEn: "Restaurant in Tel Aviv",
    goal: "להישמע בטוח וטבעי מול מלצר",
    goalEn: "Sound confident and natural with a waiter",
    characterTone: "ישיר אבל נחמד",
    characterToneEn: "Direct but friendly",
    glossaryScreen: {
      titleHe: "מקרא לפני התרגול",
      titleEn: "Glossary Before Practice",
      items: [
        { termHe: "מה בשבילך?", termEn: "Ma bishvilkha?", meaningEn: "What would you like? (waiter to customer)", exampleHe: "מלצר: מה בשבילך?", exampleEn: "Waiter: What'll it be?" },
        { termHe: "אפשר…?", termEn: "Efshar…?", meaningEn: "Can I have…? (polite ordering)", exampleHe: "אפשר שניצל וצ'יפס?", exampleEn: "Can I have schnitzel and fries?" },
        { termHe: "תביא לי", termEn: "Tavi li", meaningEn: "Bring me (direct, casual)", exampleHe: "תביא לי סלט.", exampleEn: "Bring me a salad." },
        { termHe: "משהו לשתות?", termEn: "Mashehu lishtot?", meaningEn: "Something to drink?", exampleHe: "מלצר: משהו לשתות?", exampleEn: "Waiter: Something to drink?" },
        { termHe: "יאללה", termEn: "Yalla", meaningEn: "Let's go / Sure / OK", exampleHe: "יאללה, בירה קטנה.", exampleEn: "Sure, a small beer." },
        { termHe: "ברצוני", termEn: "Birtzoni", meaningEn: "I wish to (very formal, avoid)", exampleHe: "ברצוני במזון.", exampleEn: "I wish to have sustenance. (robotic)" },
        { termHe: "מעוניין", termEn: "Me'unyan", meaningEn: "Interested in (formal)", exampleHe: "אני מעוניין להזמין.", exampleEn: "I'm interested in ordering. (too formal)" },
        { termHe: "תודה רבה לך", termEn: "Toda raba lekha", meaningEn: "Thank you very much", exampleHe: "כן, תודה רבה לך.", exampleEn: "Yes, thank you very much." },
      ],
      ctaHe: "יאללה מתחילים",
      ctaEn: "Start",
    },
    steps: [
      {
        id: "r1",
        npcLine: "מלצר: מה בשבילך?",
        options: [
          { text: "אפשר שניצל וצ'יפס?", naturalness: 90, feedback: "מעולה. פשוט וטבעי." },
          { text: "אני מעוניין להזמין את המנה הזו.", naturalness: 25, feedback: "פורמלי מדי למסעדה רגילה." },
          { text: "תביא לי שניצל.", naturalness: 60, feedback: "טבעי, אבל קצת חד." },
          { text: "ברצוני במזון.", naturalness: 5, feedback: "לא נשמע אנושי." },
        ],
      },
      {
        id: "r2",
        npcLine: "מלצר: משהו לשתות?",
        options: [
          { text: "יאללה, בירה קטנה.", naturalness: 85, feedback: "קליל ונכון." },
          { text: "כן, תודה רבה לך.", naturalness: 70, feedback: "בסדר גמור, קצת מנומס יותר." },
          { text: "אני צורך מים בלבד.", naturalness: 10, feedback: "רובוטי מדי." },
          { text: "אין צורך בנוזלים.", naturalness: 5, feedback: "לא טבעי." },
        ],
      },
    ],
  },
  {
    scenarioId: "boss_message",
    title: "הודעה לבוס",
    titleEn: "Message to Your Boss",
    goal: "להישמע מקצועי אבל לא נוקשה",
    goalEn: "Sound professional but not stiff",
    characterTone: "מכבד אך יומיומי",
    characterToneEn: "Respectful yet casual",
    glossaryScreen: {
      titleHe: "מקרא לפני התרגול",
      titleEn: "Glossary Before Practice",
      items: [
        { termHe: "לעדכן", termEn: "Le'adken", meaningEn: "To update / inform", exampleHe: "אני רוצה לעדכן אותך.", exampleEn: "I want to update you." },
        { termHe: "כנראה", termEn: "Kanir'e", meaningEn: "Probably / likely", exampleHe: "אני כנראה אאחר.", exampleEn: "I'll probably be late." },
        { termHe: "יש מצב", termEn: "Yesh matzav", meaningEn: "There's a chance / maybe (casual)", exampleHe: "יש מצב שאאחר קצת.", exampleEn: "I might be a bit late." },
        { termHe: "סורי", termEn: "Sorry", meaningEn: "Sorry (informal, borrowed)", exampleHe: "סורי על האיחור.", exampleEn: "Sorry for being late." },
        { termHe: "תור", termEn: "Tor", meaningEn: "Appointment / turn", exampleHe: "יש לי תור לרופא.", exampleEn: "I have a doctor's appointment." },
        { termHe: "פשוט", termEn: "Pashut", meaningEn: "Simply / just", exampleHe: "פשוט יש לי תור.", exampleEn: "I just have an appointment." },
        { termHe: "אין באפשרותי", termEn: "Ein be'efsharuti", meaningEn: "I'm unable to (very formal, avoid)", exampleHe: "אין באפשרותי לפרט.", exampleEn: "I'm unable to elaborate. (too formal)" },
        { termHe: "הכול בסדר?", termEn: "Hakol beseder?", meaningEn: "Is everything OK?", exampleHe: "הבוס: הכול בסדר?", exampleEn: "Boss: Everything OK?" },
      ],
      ctaHe: "יאללה מתחילים",
      ctaEn: "Start",
    },
    steps: [
      {
        id: "b1",
        npcLine: "אתה צריך לעדכן שתאחר מחר.",
        options: [
          { text: "בוקר טוב, אני כנראה אאחר מחר בכ-20 דקות.", naturalness: 95, feedback: "מצוין. מקצועי וטבעי." },
          { text: "לא אגיע בזמן.", naturalness: 40, feedback: "ישיר מדי, חסר ריכוך." },
          { text: "יש מצב שאאחר קצת, סורי.", naturalness: 65, feedback: "טבעי, אולי קצת קליל מדי לעבודה." },
          { text: "איחורי יתרחש.", naturalness: 0, feedback: "לא אנושי בכלל." },
        ],
      },
      {
        id: "b2",
        npcLine: "הבוס: הכול בסדר?",
        options: [
          { text: "כן, פשוט יש לי תור לרופא.", naturalness: 90, feedback: "ענייני וברור." },
          { text: "כן כן.", naturalness: 50, feedback: "קצר מדי ולא מקצועי מספיק." },
          { text: "זה מורכב להסביר כרגע.", naturalness: 60, feedback: "אפשרי, אבל יוצר מתח." },
          { text: "אין באפשרותי לפרט.", naturalness: 15, feedback: "פורמלי ומרוחק מדי." },
        ],
      },
    ],
  },
];
