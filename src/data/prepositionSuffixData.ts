export interface PrepositionQuestion {
  id: string;
  sentence: string;
  translation: string;
  blank: string;
  options: string[];
  correct: string;
}

export interface PrepositionLevel {
  levelId: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  questions: PrepositionQuestion[];
}

export const prepositionSuffixLevels: PrepositionLevel[] = [
  {
    levelId: "beginner",
    title: "Beginner – ל (to/for)",
    titleHe: "מתחיל – ל (ל...)",
    description: "Basic indirect objects and possession with לי, לך, לו, לה, לנו, לכם, להם",
    descriptionHe: "מילת יחס בסיסית: לי, לך, לו, לה, לנו, לכם, להם",
    questions: [
      { id: "bg01", sentence: "יש ___ שאלה חשובה.", translation: "I have an important question.", blank: "___", options: ["לי", "לך", "לו", "לנו"], correct: "לי" },
      { id: "bg02", sentence: "אני רוצה לתת ___ מתנה.", translation: "I want to give you a gift.", blank: "___", options: ["לך", "לי", "להם", "לה"], correct: "לך" },
      { id: "bg03", sentence: "הוא אמר ___ שהוא מגיע מאוחר.", translation: "He told her he's arriving late.", blank: "___", options: ["לה", "לו", "לנו", "לי"], correct: "לה" },
      { id: "bg04", sentence: "זה לא מתאים ___.", translation: "It doesn't suit him.", blank: "___", options: ["לו", "לה", "לך", "להם"], correct: "לו" },
      { id: "bg05", sentence: "המורה הסביר ___ את החומר.", translation: "The teacher explained the material to us.", blank: "___", options: ["לנו", "להם", "לי", "לכם"], correct: "לנו" },
      { id: "bg06", sentence: "אתם יכולים להגיד ___ מה קרה?", translation: "Can you tell us what happened?", blank: "___", options: ["לנו", "לכם", "להם", "לי"], correct: "לנו" },
      { id: "bg07", sentence: "תגיד ___, מה השעה?", translation: "Tell me, what time is it?", blank: "___", options: ["לי", "לך", "לו", "לנו"], correct: "לי" },
      { id: "bg08", sentence: "היא שלחה ___ הודעה בוואטסאפ.", translation: "She sent them a WhatsApp message.", blank: "___", options: ["להם", "לנו", "לך", "לה"], correct: "להם" },
      { id: "bg09", sentence: "אין ___ זמן היום.", translation: "I don't have time today.", blank: "___", options: ["לי", "לו", "לך", "לכם"], correct: "לי" },
      { id: "bg10", sentence: "יש ___ רעיון טוב.", translation: "She has a good idea.", blank: "___", options: ["לה", "לו", "לי", "להם"], correct: "לה" },
      { id: "bg11", sentence: "אתה יכול לעזור ___?", translation: "Can you help me?", blank: "___", options: ["לי", "לך", "לנו", "לה"], correct: "לי" },
      { id: "bg12", sentence: "אמרתי ___ לבוא בשמונה.", translation: "I told them to come at eight.", blank: "___", options: ["להם", "לכם", "לנו", "לו"], correct: "להם" },
      { id: "bg13", sentence: "זה חשוב ___ מאוד.", translation: "It's very important to you (pl.).", blank: "___", options: ["לכם", "להם", "לנו", "לך"], correct: "לכם" },
      { id: "bg14", sentence: "מה קרה ___? אתה נראה עצוב.", translation: "What happened to you? You look sad.", blank: "___", options: ["לך", "לי", "לו", "לה"], correct: "לך" },
      { id: "bg15", sentence: "הנה, קנינו ___ עוגה ליום הולדת.", translation: "Here, we bought him a birthday cake.", blank: "___", options: ["לו", "לה", "לך", "להם"], correct: "לו" },
      { id: "bg16", sentence: "קשה ___ לקום בבוקר.", translation: "It's hard for her to get up in the morning.", blank: "___", options: ["לה", "לי", "לו", "לנו"], correct: "לה" },
    ],
  },
  {
    levelId: "intermediate",
    title: "Intermediate – את, על, אצל",
    titleHe: "בינוני – איתי, עליי, אצלי",
    description: "Add prepositions: איתי/איתך, עליי/עליך, אצלי/אצלך with past & future tenses",
    descriptionHe: "מילות יחס נוספות עם זמן עבר ועתיד",
    questions: [
      { id: "in01", sentence: "אתמול דיברתי ___ בטלפון.", translation: "Yesterday I spoke with him on the phone.", blank: "___", options: ["איתו", "עליו", "אצלו", "איתה"], correct: "איתו" },
      { id: "in02", sentence: "היא כועסת ___ כי איחרתי.", translation: "She's angry at me because I was late.", blank: "___", options: ["עליי", "איתי", "אצלי", "עליך"], correct: "עליי" },
      { id: "in03", sentence: "אתה רוצה לבוא ___?", translation: "Do you want to come with me?", blank: "___", options: ["איתי", "אצלי", "עליי", "איתך"], correct: "איתי" },
      { id: "in04", sentence: "הוא גר ___ כבר שנה.", translation: "He's been living at her place for a year.", blank: "___", options: ["אצלה", "איתה", "עליה", "אצלו"], correct: "אצלה" },
      { id: "in05", sentence: "מחר אני אשב ___ בסלון.", translation: "Tomorrow I'll sit with you in the living room.", blank: "___", options: ["איתך", "אצלך", "עליך", "איתי"], correct: "איתך" },
      { id: "in06", sentence: "הם סומכים ___ לגמרי.", translation: "They trust her completely.", blank: "___", options: ["עליה", "איתה", "אצלה", "עליו"], correct: "עליה" },
      { id: "in07", sentence: "השארנו את הילדים ___ אתמול.", translation: "We left the kids at their place yesterday.", blank: "___", options: ["אצלם", "איתם", "עליהם", "אצלנו"], correct: "אצלם" },
      { id: "in08", sentence: "למה אתה צועק ___?", translation: "Why are you yelling at me?", blank: "___", options: ["עליי", "איתי", "אצלי", "עליך"], correct: "עליי" },
      { id: "in09", sentence: "בוא נדבר ___. אני רוצה להסביר.", translation: "Let's talk with her. I want to explain.", blank: "___", options: ["איתה", "עליה", "אצלה", "איתו"], correct: "איתה" },
      { id: "in10", sentence: "החבילה נמצאת ___. תבוא לקחת.", translation: "The package is at my place. Come take it.", blank: "___", options: ["אצלי", "איתי", "עליי", "אצלך"], correct: "אצלי" },
      { id: "in11", sentence: "אני מאמין ___, אתה יכול להצליח.", translation: "I believe in you, you can succeed.", blank: "___", options: ["בך", "עליך", "איתך", "אצלך"], correct: "בך" },
      { id: "in12", sentence: "מחר ניפגש ___. באיזו שעה?", translation: "Tomorrow we'll meet at your place. What time?", blank: "___", options: ["אצלך", "איתך", "עליך", "אצלי"], correct: "אצלך" },
      { id: "in13", sentence: "הבוס לא מרוצה ___.", translation: "The boss is not happy with us.", blank: "___", options: ["מאיתנו", "עלינו", "אצלנו", "איתנו"], correct: "מאיתנו" },
      { id: "in14", sentence: "אני רוצה לדבר ___ על משהו חשוב.", translation: "I want to talk to you about something important.", blank: "___", options: ["איתך", "עליך", "אצלך", "איתי"], correct: "איתך" },
      { id: "in15", sentence: "מי ישב ___ באירוע?", translation: "Who sat next to him at the event?", blank: "___", options: ["לידו", "איתו", "עליו", "אצלו"], correct: "לידו" },
      { id: "in16", sentence: "זה תלוי ___. אתם מחליטים.", translation: "It depends on you (pl.). You decide.", blank: "___", options: ["בכם", "עליכם", "איתכם", "אצלכם"], correct: "בכם" },
    ],
  },
  {
    levelId: "advanced",
    title: "Advanced – Complex Sentences",
    titleHe: "מתקדם – משפטים מורכבים",
    description: "Complex sentences with connectors (אם, כי, למרות, כש) and emotional verbs",
    descriptionHe: "משפטים מורכבים עם מילות קישור ופעלים רגשיים",
    questions: [
      { id: "ad01", sentence: "אם אתה רוצה לדבר ___, אני פנוי אחרי הצהריים.", translation: "If you want to talk with me, I'm free in the afternoon.", blank: "___", options: ["איתי", "עליי", "אצלי", "איתך"], correct: "איתי" },
      { id: "ad02", sentence: "למרות שהוא כעס ___, הוא נשאר לעזור.", translation: "Even though he was angry at her, he stayed to help.", blank: "___", options: ["עליה", "איתה", "אצלה", "עליו"], correct: "עליה" },
      { id: "ad03", sentence: "אני גאה ___ כי הצלחת במבחן.", translation: "I'm proud of you because you passed the test.", blank: "___", options: ["בך", "עליך", "איתך", "אצלך"], correct: "בך" },
      { id: "ad04", sentence: "כשאת מדברת ___, אני תמיד מקשיב.", translation: "When you talk to me, I always listen.", blank: "___", options: ["איתי", "עליי", "אצלי", "איתך"], correct: "איתי" },
      { id: "ad05", sentence: "הוא מתנגד ___ כי זה לא הגיוני.", translation: "He opposes it because it's not logical.", blank: "___", options: ["לזה", "עליו", "איתו", "בזה"], correct: "לזה" },
      { id: "ad06", sentence: "אני חושש ___ כי הם לא עונים לטלפון.", translation: "I'm worried about them because they're not answering the phone.", blank: "___", options: ["עליהם", "איתם", "אצלם", "מהם"], correct: "עליהם" },
      { id: "ad07", sentence: "כשהיא סומכת ___, היא נותנת חופש מלא.", translation: "When she trusts someone, she gives complete freedom.", blank: "___", options: ["על מישהו", "עם מישהו", "ב מישהו", "אצל מישהו"], correct: "על מישהו" },
      { id: "ad08", sentence: "למרות שהם לא מסכימים ___, הם מכבדים אותנו.", translation: "Even though they don't agree with us, they respect us.", blank: "___", options: ["איתנו", "עלינו", "אצלנו", "בנו"], correct: "איתנו" },
      { id: "ad09", sentence: "אם תשב ___, אני אסביר הכול.", translation: "If you sit with me, I'll explain everything.", blank: "___", options: ["איתי", "אצלי", "עליי", "לידי"], correct: "איתי" },
      { id: "ad10", sentence: "הכול תלוי ___, אז תחליט מהר.", translation: "Everything depends on you, so decide quickly.", blank: "___", options: ["בך", "עליך", "איתך", "אצלך"], correct: "בך" },
      { id: "ad11", sentence: "כשאני חושב ___, אני מתמלא שמחה.", translation: "When I think about her, I'm filled with joy.", blank: "___", options: ["עליה", "איתה", "אצלה", "בה"], correct: "עליה" },
      { id: "ad12", sentence: "אם יש ___ בעיה, תגיד ואנחנו נעזור.", translation: "If you have a problem, say so and we'll help.", blank: "___", options: ["לך", "איתך", "עליך", "אצלך"], correct: "לך" },
      { id: "ad13", sentence: "היא מאמינה ___ למרות שכולם מפקפקים.", translation: "She believes in him even though everyone doubts.", blank: "___", options: ["בו", "עליו", "איתו", "לו"], correct: "בו" },
      { id: "ad14", sentence: "כשהם מדברים ___, אני מרגיש שהם לא כנים.", translation: "When they talk about me, I feel they're not honest.", blank: "___", options: ["עליי", "איתי", "אצלי", "בי"], correct: "עליי" },
      { id: "ad15", sentence: "למרות שקשה ___, היא ממשיכה ללמוד.", translation: "Even though it's hard for her, she keeps studying.", blank: "___", options: ["לה", "עליה", "איתה", "אצלה"], correct: "לה" },
      { id: "ad16", sentence: "אני לא מוכן לוותר ___ כי הם חשובים.", translation: "I'm not willing to give up on them because they're important.", blank: "___", options: ["עליהם", "איתם", "מהם", "להם"], correct: "עליהם" },
    ],
  },
];
