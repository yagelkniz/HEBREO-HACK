export interface SlangQuestion {
  id: string;
  promptHe: string;
  promptEn: string;
  optionsHe: string[];
  optionsEn: string[];
  correctIndex: number;
}

export interface SlangLevel {
  levelId: string;
  title: string;
  titleHe: string;
  descriptionHe: string;
  descriptionEn: string;
  instructionsHe: string;
  instructionsEn: string;
  items: SlangQuestion[];
}

export const hebrewSlangLevels: SlangLevel[] = [
  {
    levelId: "beginner",
    title: "Beginner (סלנג בסיסי יומיומי)",
    titleHe: "מתחילים – סלנג בסיסי יומיומי",
    descriptionHe: "ביטויים בסיסיים שתשמעו בכל שיחה יומיומית",
    descriptionEn: "Basic expressions you'll hear in every daily conversation",
    instructionsHe: "בחר/י את התשובה הנכונה. שים/י לב להקשר של השיחה.",
    instructionsEn: "Choose the correct answer. Pay attention to the conversation context.",
    items: [
      { id: "b01", promptHe: "חבר: בא לך קפה?\nאתה: סבבה.\nמה המשמעות של \"סבבה\" כאן?", promptEn: "Friend: Want coffee?\nYou: Sababa.\nWhat does \"sababa\" mean here?", optionsHe: ["לא", "כן / בסדר", "אולי", "אני לא יודע"], optionsEn: ["No", "Yes / OK", "Maybe", "I don't know"], correctIndex: 1 },
      { id: "b02", promptHe: "מישהו אומר לך: \"יאללה, יוצאים!\"\nמה הכוונה?", promptEn: "Someone tells you: \"Yalla, we're leaving!\"\nWhat do they mean?", optionsHe: ["להתחיל לזוז עכשיו", "לשבת עוד שעה", "להתעצבן", "לבטל את התוכנית"], optionsEn: ["Start moving now", "Sit for another hour", "Get angry", "Cancel the plan"], correctIndex: 0 },
      { id: "b03", promptHe: "אתה: \"אני בא בעוד 5 דקות\"\nחבר: \"סגור\"\nמה המשמעות של \"סגור\"?", promptEn: "You: \"I'll be there in 5 minutes.\"\nFriend: \"Sagur.\"\nWhat does \"sagur\" mean?", optionsHe: ["לא הבנתי", "מסכים / סיכמנו", "לא רוצה", "אולי אחר כך"], optionsEn: ["I didn't understand", "Agreed / it's settled", "I don't want to", "Maybe later"], correctIndex: 1 },
      { id: "b04", promptHe: "חברה: \"זה ייקח הרבה זמן?\"\nאתה: \"בקטנה\"\nמה הכוונה?", promptEn: "Friend: \"Will it take a long time?\"\nYou: \"Baktana.\"\nWhat do you mean?", optionsHe: ["זה ממש קשה", "זה לא עניין גדול", "אני לא יכול", "זה מסוכן"], optionsEn: ["It's really hard", "It's no big deal", "I can't", "It's dangerous"], correctIndex: 1 },
      { id: "b05", promptHe: "מישהו אומר: \"אין מצב שאני בא היום\".\nמה זה אומר?", promptEn: "Someone says: \"Ein matzav I'm coming today.\"\nWhat does it mean?", optionsHe: ["אולי הוא יבוא", "בטוח שהוא לא יבוא", "הוא כבר בדרך", "הוא מתלבט"], optionsEn: ["Maybe he'll come", "He definitely won't come", "He's already on the way", "He's undecided"], correctIndex: 1 },
      { id: "b06", promptHe: "חבר: \"איך היה הסרט?\"\nאתה: \"חבל על הזמן\"\nמה המשמעות הכי טבעית כאן?", promptEn: "Friend: \"How was the movie?\"\nYou: \"Chaval al hazman.\"\nWhat's the most natural meaning here?", optionsHe: ["היה מעולה", "היה משעמם", "לא ראיתי", "היה קצר"], optionsEn: ["It was amazing", "It was boring", "I didn't see it", "It was short"], correctIndex: 0 },
      { id: "b07", promptHe: "מישהו אומר לך: \"די כבר\"\nמה הוא מבקש?", promptEn: "Someone tells you: \"Di kvar.\"\nWhat are they asking?", optionsHe: ["תמשיך עוד", "תעצור / מספיק", "תבוא עכשיו", "תסביר שוב"], optionsEn: ["Continue more", "Stop / enough", "Come now", "Explain again"], correctIndex: 1 },
      { id: "b08", promptHe: "אתה נכנס לקבוצה ומישהו שואל: \"מה נסגר?\"\nמה זה אומר?", promptEn: "You enter a group and someone asks: \"Ma nisgar?\"\nWhat does it mean?", optionsHe: ["מה קורה? / מה חדש?", "מה השעה?", "איפה אתה גר?", "מי אתה?"], optionsEn: ["What's up? / What's new?", "What time is it?", "Where do you live?", "Who are you?"], correctIndex: 0 },
      { id: "b09", promptHe: "חבר: \"אתה יכול לעזור לי רגע?\"\nאתה: \"ברור\"\nמה המשמעות כאן?", promptEn: "Friend: \"Can you help me for a moment?\"\nYou: \"Barur.\"\nWhat does it mean here?", optionsHe: ["לא", "כן, בטח", "אולי", "אין לי מושג"], optionsEn: ["No", "Yes, sure", "Maybe", "No idea"], correctIndex: 1 },
      { id: "b10", promptHe: "מישהו אומר: \"עזוב אותך\"\nמה הכוונה בדרך כלל?", promptEn: "Someone says: \"Azov otkha.\"\nWhat does it usually mean?", optionsHe: ["בוא נעשה את זה עכשיו", "לא שווה להתעסק בזה", "אני מאוד מתרגש", "תספר לי עוד"], optionsEn: ["Let's do it now", "It's not worth dealing with it", "I'm very excited", "Tell me more"], correctIndex: 1 },
      { id: "b11", promptHe: "חבר: \"אפשר להזמין עכשיו?\"\nאתה: \"יאללה\"\nמה הכוונה?", promptEn: "Friend: \"Can we order now?\"\nYou: \"Yalla.\"\nWhat do you mean?", optionsHe: ["בוא נתקדם / כן", "לא", "אולי", "אני עוזב"], optionsEn: ["Let's go / yes", "No", "Maybe", "I'm leaving"], correctIndex: 0 },
      { id: "b12", promptHe: "מישהו אומר: \"סבבה, נדבר אחר כך\"\nמה זה מביע?", promptEn: "Someone says: \"Sababa, we'll talk later.\"\nWhat does it express?", optionsHe: ["הסכמה רגועה", "כעס", "בלבול", "פחד"], optionsEn: ["Calm agreement", "Anger", "Confusion", "Fear"], correctIndex: 0 },
      { id: "b13", promptHe: "חבר: \"בא לך לבוא איתנו?\"\nאתה: \"לא נראה לי\"\nמה הכוונה?", promptEn: "Friend: \"Wanna come with us?\"\nYou: \"Lo nireh li.\"\nWhat does it mean?", optionsHe: ["בטוח כן", "כנראה לא", "אני כבר שם", "אין בעיה"], optionsEn: ["Definitely yes", "Probably not", "I'm already there", "No problem"], correctIndex: 1 },
      { id: "b14", promptHe: "מישהו אומר: \"אין בעיה\"\nמה זה אומר בדרך כלל?", promptEn: "Someone says: \"Ein be'aya.\"\nWhat does it usually mean?", optionsHe: ["יש בעיה גדולה", "הכול בסדר / אין בעיה", "אני לא רוצה", "אני עייף"], optionsEn: ["There's a big problem", "All good / no problem", "I don't want to", "I'm tired"], correctIndex: 1 },
      { id: "b15", promptHe: "חבר: \"תוכל לחכות רגע?\"\nאתה: \"סגור\"\nמה הכי מתאים?", promptEn: "Friend: \"Can you wait a second?\"\nYou: \"Sagur.\"\nWhat fits best?", optionsHe: ["לא", "כן, אין בעיה", "מה זה אומר?", "אני הולך"], optionsEn: ["No", "Yes, no problem", "What does that mean?", "I'm leaving"], correctIndex: 1 },
    ],
  },
  {
    levelId: "intermediate",
    title: "Intermediate (סלנג רגשי וחברתי)",
    titleHe: "בינוני – סלנג רגשי וחברתי",
    descriptionHe: "ביטויים רגשיים וחברתיים בשיחות יומיומיות",
    descriptionEn: "Emotional and social slang in daily conversations",
    instructionsHe: "בחר/י את הפירוש הכי מתאים או את המילה שחסרה בשיחה.",
    instructionsEn: "Choose the best meaning or the missing slang word in the dialogue.",
    items: [
      { id: "i01", promptHe: "חבר: \"אני לא מפסיק לדבר על זה, נכון?\"\nאתה: \"כן, אתה קצת ___\"\nמה הכי מתאים?", promptEn: "Friend: \"I can't stop talking about it, right?\"\nYou: \"Yeah, you're kind of ___.\"\nWhat fits best?", optionsHe: ["חופר", "זורם", "קטלני", "סגור"], optionsEn: ["a yapper / overtalking (khoper)", "easygoing (zorem)", "awesome (katlani)", "agreed (sagur)"], correctIndex: 0 },
      { id: "i02", promptHe: "חברה: \"תקשיב, הרעיון שלך ממש טוב\"\nאתה: \"אני ___ על זה!\"\nמה הכי מתאים?", promptEn: "Friend: \"Listen, your idea is really good.\"\nYou: \"I'm ___ about it!\"\nWhat fits best?", optionsHe: ["עף", "מביך", "שרוט", "די"], optionsEn: ["super excited (af)", "embarrassing (mevikh)", "crazy/weird (sharut)", "enough (di)"], correctIndex: 0 },
      { id: "i03", promptHe: "מישהו אומר: \"זה היה כל כך ___\" (מצב לא נעים מול כולם)\nמה מתאים?", promptEn: "Someone says: \"That was so ___\" (an awkward situation in front of everyone)\nWhat fits?", optionsHe: ["מביך", "קטלני", "סבבה", "זורם"], optionsEn: ["embarrassing (mevikh)", "awesome (katlani)", "ok (sababa)", "easygoing (zorem)"], correctIndex: 0 },
      { id: "i04", promptHe: "חבר: \"אתה רוצה לצאת היום או שנשאר בבית?\"\nאתה: \"אני ___\" (אתה פתוח למה שיחליטו)\nמה מתאים?", promptEn: "Friend: \"Do you want to go out today or stay home?\"\nYou: \"I'm ___.\" (You're open to whatever)\nWhat fits?", optionsHe: ["זורם", "חופר", "אין מצב", "מביך"], optionsEn: ["easygoing/open (zorem)", "over-talking (khoper)", "no way (ein matzav)", "embarrassing (mevikh)"], correctIndex: 0 },
      { id: "i05", promptHe: "חברה: \"בא לך פיצה?\"\nאתה: \"וואי, ___ לי\"\nמה הכי טבעי?", promptEn: "Friend: \"Do you want pizza?\"\nYou: \"Wow, I ___.\"\nWhat's most natural?", optionsHe: ["בא", "שרוט", "סגור", "מביך"], optionsEn: ["want it (ba li)", "crazy/weird (sharut)", "agreed (sagur)", "embarrassing (mevikh)"], correctIndex: 0 },
      { id: "i06", promptHe: "מישהו אומר: \"אני מת על זה\"\nמה זה אומר?", promptEn: "Someone says: \"I'm met on it.\"\nWhat does it mean?", optionsHe: ["אני שונא את זה", "אני ממש אוהב את זה", "אני מפחד מזה", "אני לא מבין"], optionsEn: ["I hate it", "I really love it", "I'm scared of it", "I don't understand"], correctIndex: 1 },
      { id: "i07", promptHe: "חבר: \"איך היה האירוע?\"\nאתה: \"היה ___!\" (ממש טוב)\nמה מתאים?", promptEn: "Friend: \"How was the event?\"\nYou: \"It was ___!\" (really good)\nWhat fits?", optionsHe: ["קטלני", "מביך", "חופר", "די כבר"], optionsEn: ["awesome (katlani)", "embarrassing (mevikh)", "boring talker (khoper)", "stop already (di kvar)"], correctIndex: 0 },
      { id: "i08", promptHe: "מישהו אומר: \"מה אתה אומר?\"\nבדרך כלל זה אומר:", promptEn: "Someone says: \"Ma ata omer?\"\nIt usually means:", optionsHe: ["אני מסכים איתך", "באמת? ספר לי עוד", "תפסיק לדבר", "אני הולך עכשיו"], optionsEn: ["I agree with you", "Really? tell me more", "Stop talking", "I'm leaving now"], correctIndex: 1 },
      { id: "i09", promptHe: "חבר: \"ראית מה הוא עשה? זה הזוי\"\nמה המשמעות של \"הזוי\" כאן?", promptEn: "Friend: \"Did you see what he did? That's hazuy.\"\nWhat does \"hazuy\" mean here?", optionsHe: ["רגיל", "מוזר/מטורף", "משעמם", "יקר"], optionsEn: ["normal", "crazy/weird", "boring", "expensive"], correctIndex: 1 },
      { id: "i10", promptHe: "חברה: \"אני לא מאמינה שזה קרה\"\nאתה: \"וואלה\"\nמה \"וואלה\" מביע כאן?", promptEn: "Friend: \"I can't believe that happened.\"\nYou: \"Walla.\"\nWhat does it express here?", optionsHe: ["זלזול", "הפתעה/אישור", "כעס", "סירוב"], optionsEn: ["disrespect", "surprise/confirmation", "anger", "refusal"], correctIndex: 1 },
      { id: "i11", promptHe: "חבר: \"תגיע בשמונה\"\nאתה: \"סבבה, אני על זה\"\nמה אומר \"אני על זה\"?", promptEn: "Friend: \"Be there at eight.\"\nYou: \"Sababa, I'm on it.\"\nWhat does \"I'm on it\" mean?", optionsHe: ["אני לא מגיע", "אני מטפל בזה/דואג לזה", "אני לא מבין", "אני כועס"], optionsEn: ["I'm not coming", "I'll handle it / take care of it", "I don't understand", "I'm angry"], correctIndex: 1 },
      { id: "i12", promptHe: "מישהו אומר: \"אל תחפור\"\nמה הוא מבקש?", promptEn: "Someone says: \"Don't khpor.\"\nWhat are they asking?", optionsHe: ["תדבר יותר", "אל תדבר יותר מדי / אל תבלבל", "תסביר לעומק", "תשיר שיר"], optionsEn: ["Talk more", "Don't talk too much / don't overdo it", "Explain deeply", "Sing a song"], correctIndex: 1 },
      { id: "i13", promptHe: "חבר: \"אתה בא?\"\nאתה: \"נראה… אני בודק, לא מבטיח\"\nאיזה סלנג הכי מתאים לסיכום?", promptEn: "Friend: \"Are you coming?\"\nYou: \"We'll see… I'm checking, not promising.\"\nWhich slang fits best as a summary?", optionsHe: ["נראה לי", "אין מצב", "קטלני", "סגור"], optionsEn: ["we'll see / I think so (nireh li)", "no way (ein matzav)", "awesome (katlani)", "settled (sagur)"], correctIndex: 0 },
      { id: "i14", promptHe: "מישהו אומר: \"הוא קצת שרוט\"\nמה זה אומר בדרך כלל?", promptEn: "Someone says: \"He's kind of sharut.\"\nWhat does it usually mean?", optionsHe: ["הוא ממש מסודר", "הוא קצת מוזר", "הוא מאוד מקצועי", "הוא מאוד שקט"], optionsEn: ["He's very organized", "He's a bit weird/crazy", "He's very professional", "He's very quiet"], correctIndex: 1 },
      { id: "i15", promptHe: "חבר: \"אתה יכול לעזור לי לסחוב את זה?\"\nאתה: \"ברור, בכיף\"\nמה \"בכיף\" אומר?", promptEn: "Friend: \"Can you help me carry this?\"\nYou: \"Sure, bekef.\"\nWhat does \"bekef\" mean?", optionsHe: ["בעצבים", "בשמחה", "לא", "אולי אחר כך"], optionsEn: ["angrily", "happily / with pleasure", "no", "maybe later"], correctIndex: 1 },
    ],
  },
  {
    levelId: "advanced",
    title: "Advanced (ניואנסים, ציניות, שיח טבעי)",
    titleHe: "מתקדם – ניואנסים, ציניות, שיח טבעי",
    descriptionHe: "הבנת טון, ציניות וביטויים מורכבים בשיח ישראלי",
    descriptionEn: "Understanding tone, sarcasm, and complex expressions in Israeli speech",
    instructionsHe: "בחר/י את המשמעות המדויקת לפי הטון והסיטואציה. לפעמים יש ציניות.",
    instructionsEn: "Choose the precise meaning based on tone and situation. Sometimes it's sarcastic.",
    items: [
      { id: "a01", promptHe: "מישהו אומר \"ברור...\" בטון ציני אחרי רעיון לא טוב.\nמה הוא באמת מתכוון?", promptEn: "Someone says \"Barur...\" sarcastically after a bad idea.\nWhat do they really mean?", optionsHe: ["כן, רעיון מצוין", "לא, זה לא הגיוני", "אני מתרגש", "אין לי דעה"], optionsEn: ["Yes, great idea", "No, that's not reasonable", "I'm excited", "I have no opinion"], correctIndex: 1 },
      { id: "a02", promptHe: "חבר: \"אתה חייב להגיע בדיוק בשמונה\"\nאתה: \"יאללה נו\"\nמה \"יאללה נו\" מביע כאן?", promptEn: "Friend: \"You must arrive exactly at eight.\"\nYou: \"Yalla nu.\"\nWhat does it express here?", optionsHe: ["התלהבות", "חוסר סבלנות/נו באמת", "פחד", "הסכמה רשמית"], optionsEn: ["enthusiasm", "impatience / come on", "fear", "formal agreement"], correctIndex: 1 },
      { id: "a03", promptHe: "מישהו אומר: \"סתם, לא חשוב\"\nמה הכוונה?", promptEn: "Someone says: \"Stam, lo khashuv.\"\nWhat does it mean?", optionsHe: ["אני רציני מאוד", "עזוב, זה לא משנה", "תכתוב לי הודעה", "אני מסכים איתך"], optionsEn: ["I'm very serious", "Never mind, it doesn't matter", "Text me", "I agree with you"], correctIndex: 1 },
      { id: "a04", promptHe: "חבר: \"שמע, זה לא הזמן לזה\"\nאתה: \"עזוב, נשחרר\"\nמה המשמעות של \"נשחרר\" כאן?", promptEn: "Friend: \"It's not the time for that.\"\nYou: \"Forget it, neshakhrer.\"\nWhat does \"neshakhrer\" mean here?", optionsHe: ["נמשיך ללחוץ", "נרגיע ונעזוב את זה", "נברח", "נתחיל ויכוח"], optionsEn: ["keep pushing", "let it go / chill", "run away", "start an argument"], correctIndex: 1 },
      { id: "a05", promptHe: "מישהו אומר: \"מה אתה חי בסרט?\"\nמה זה אומר?", promptEn: "Someone says: \"Ma ata khay beseret?\"\nWhat does it mean?", optionsHe: ["אתה ריאליסט", "אתה מדמיין/לא מחובר למציאות", "אתה עצוב", "אתה עייף"], optionsEn: ["you're realistic", "you're delusional / not realistic", "you're sad", "you're tired"], correctIndex: 1 },
      { id: "a06", promptHe: "חבר: \"אמרת שתעשה את זה\"\nאתה: \"כן כן, עוד שנייה\"\nבהקשר של דחייה, מה \"עוד שנייה\" אומר?", promptEn: "Friend: \"You said you'd do it.\"\nYou: \"Yeah yeah, od shniya.\"\nIn a procrastination context, what does it imply?", optionsHe: ["ממש עכשיו", "כנראה לא עכשיו, אולי מאוחר יותר", "מחר בבוקר", "אני כבר סיימתי"], optionsEn: ["right now", "probably not now, maybe later", "tomorrow morning", "I already finished"], correctIndex: 1 },
      { id: "a07", promptHe: "מישהו אומר: \"אחי, תירגע\"\nמה המשמעות החברתית?", promptEn: "Someone says: \"Akhi, relax.\"\nWhat's the social meaning?", optionsHe: ["הוא מחמיא", "הוא מבקש שתוריד טון", "הוא מזמין אותך", "הוא מתנצל"], optionsEn: ["he's complimenting", "he's asking you to calm down / lower your tone", "he's inviting you", "he's apologizing"], correctIndex: 1 },
      { id: "a08", promptHe: "חבר: \"אתה בא למסיבה?\"\nאתה: \"נראה, יש מצב\"\nמה המשמעות של \"יש מצב\"?", promptEn: "Friend: \"Are you coming to the party?\"\nYou: \"Maybe, yesh matzav.\"\nWhat does \"yesh matzav\" mean?", optionsHe: ["בטוח לא", "אולי כן", "אני כבר שם", "אין שום סיכוי"], optionsEn: ["definitely not", "maybe yes", "I'm already there", "no chance at all"], correctIndex: 1 },
      { id: "a09", promptHe: "מישהו אומר: \"זה הסרט שלי\"\nבמשמעות סלנג, מה זה אומר?", promptEn: "Someone says: \"This is my movie.\"\nIn slang, what does it mean?", optionsHe: ["זה לא מעניין אותי", "זה בדיוק הקטע שלי / אני מתחבר לזה", "אני לא מבין", "זה מפחיד אותי"], optionsEn: ["I don't care", "That's totally my thing", "I don't understand", "It scares me"], correctIndex: 1 },
      { id: "a10", promptHe: "חבר: \"כולם כבר שם\"\nאתה: \"יאללה, אני טס\"\nמה \"אני טס\" אומר כאן?", promptEn: "Friend: \"Everyone's already there.\"\nYou: \"Yalla, I'm flying.\"\nWhat does it mean here?", optionsHe: ["אני נוסע מהר / מגיע מיד", "אני עולה על מטוס", "אני נשאר בבית", "אני מבטל"], optionsEn: ["I'm coming quickly / right away", "I'm getting on a plane", "I'm staying home", "I'm canceling"], correctIndex: 0 },
      { id: "a11", promptHe: "מישהו אומר: \"חלאס\"\nמה הוא מתכוון?", promptEn: "Someone says: \"Khalas.\"\nWhat do they mean?", optionsHe: ["תמשיך", "מספיק, די", "בוא ניפגש", "אני שמח"], optionsEn: ["continue", "enough, stop", "let's meet", "I'm happy"], correctIndex: 1 },
      { id: "a12", promptHe: "חבר: \"הוא שוב איחר\"\nאתה: \"קלאסי\"\nמה \"קלאסי\" אומר בהקשר הזה?", promptEn: "Friend: \"He's late again.\"\nYou: \"Classic.\"\nWhat does it mean in this context?", optionsHe: ["מפתיע", "טיפוסי לו", "לא נכון", "לא קשור"], optionsEn: ["surprising", "typical of him", "not true", "irrelevant"], correctIndex: 1 },
      { id: "a13", promptHe: "מישהו אומר: \"תפסיק להיות כבד\"\nמה המשמעות?", promptEn: "Someone says: \"Stop being heavy.\"\nWhat does it mean?", optionsHe: ["תפסיק להיות רציני מדי/מעיק", "תפסיק להתאמן", "תפסיק לאכול", "תפסיק לרוץ"], optionsEn: ["stop being too serious / dragging the mood down", "stop working out", "stop eating", "stop running"], correctIndex: 0 },
      { id: "a14", promptHe: "חבר: \"איך היה?\"\nאתה: \"מטורף\" (בהקשר חיובי)\nמה הכוונה?", promptEn: "Friend: \"How was it?\"\nYou: \"Metoraf.\" (positive)\nWhat do you mean?", optionsHe: ["רע מאוד", "מדהים/בלתי רגיל", "רגיל", "משעמם"], optionsEn: ["very bad", "amazing / unreal", "normal", "boring"], correctIndex: 1 },
      { id: "a15", promptHe: "מישהו אומר: \"נו באמת\"\nמה זה מביע בדרך כלל?", promptEn: "Someone says: \"Come on, really?\"\nWhat does it usually express?", optionsHe: ["שמחה", "חוסר אמון/תסכול קל", "אהבה", "הסכמה מלאה"], optionsEn: ["joy", "disbelief / mild frustration", "love", "full agreement"], correctIndex: 1 },
    ],
  },
];
