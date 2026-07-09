import { Adjective, AdjSentence } from "./adjectivesDrillTypes";

// The 50 approved opposite-pairs (100 adjectives), exactly as specified by the
// teacher, split into the 5 given categories. Base (ms) nikud is copied
// verbatim from the spec; fs/mp/fp were derived using standard Hebrew
// adjective inflection patterns and cross-checked against common usage.
//
// NOTE ON UNCERTAINTY (flagged per instructions, not blocking):
//   - מוטעה (mistaken): fs is conjugated as מֻטְעֵית (the common heard form,
//     "התשובה מוטעית") rather than the mechanically-regular מֻטְעָה. Worth a
//     native-speaker check.
//   - חסר סבלנות / בטוח בעצמו: these are construct-state phrases, not single
//     words. Only "חסר"/"בטוח" and the possessive suffix on "בעצמו" were
//     inflected; "סבלנות" stays fixed. Confirm the fp/mp construct forms read
//     naturally in context.
export const adjectives: Adjective[] = [
  // ===== Category 1: אופי ורגש =====
  { id: "c1-1a", category: 1, ms: "שָׂמֵחַ", fs: "שְׂמֵחָה", mp: "שְׂמֵחִים", fp: "שְׂמֵחוֹת", english: "happy", emoji: "😊", oppositeId: "c1-1b" },
  { id: "c1-1b", category: 1, ms: "עָצוּב", fs: "עֲצוּבָה", mp: "עֲצוּבִים", fp: "עֲצוּבוֹת", english: "sad", emoji: "😢", oppositeId: "c1-1a" },
  { id: "c1-2a", category: 1, ms: "חָכָם", fs: "חֲכָמָה", mp: "חֲכָמִים", fp: "חֲכָמוֹת", english: "smart", emoji: "🧠", oppositeId: "c1-2b" },
  { id: "c1-2b", category: 1, ms: "טִפֵּשׁ", fs: "טִפְּשָׁה", mp: "טִפְּשִׁים", fp: "טִפְּשׁוֹת", english: "foolish", emoji: "🤪", oppositeId: "c1-2a" },
  { id: "c1-3a", category: 1, ms: "אַמִּיץ", fs: "אַמִּיצָה", mp: "אַמִּיצִים", fp: "אַמִּיצוֹת", english: "brave", emoji: "🦁", oppositeId: "c1-3b" },
  { id: "c1-3b", category: 1, ms: "פַּחְדָן", fs: "פַּחְדָנִית", mp: "פַּחְדָנִים", fp: "פַּחְדָנִיּוֹת", english: "coward", emoji: "🐔", oppositeId: "c1-3a" },
  { id: "c1-4a", category: 1, ms: "נֶחְמָד", fs: "נֶחְמָדָה", mp: "נֶחְמָדִים", fp: "נֶחְמָדוֹת", english: "nice", emoji: "🙂", oppositeId: "c1-4b" },
  { id: "c1-4b", category: 1, ms: "רָשָׁע", fs: "רְשָׁעָה", mp: "רְשָׁעִים", fp: "רְשָׁעוֹת", english: "evil / wicked", emoji: "😈", oppositeId: "c1-4a" },
  { id: "c1-5a", category: 1, ms: "רָגוּעַ", fs: "רְגוּעָה", mp: "רְגוּעִים", fp: "רְגוּעוֹת", english: "calm", emoji: "😌", oppositeId: "c1-5b" },
  { id: "c1-5b", category: 1, ms: "עַצְבָּנִי", fs: "עַצְבָּנִית", mp: "עַצְבָּנִיִּים", fp: "עַצְבָּנִיּוֹת", english: "nervous / irritable", emoji: "😠", oppositeId: "c1-5a" },
  { id: "c1-6a", category: 1, ms: "סַבְלָנִי", fs: "סַבְלָנִית", mp: "סַבְלָנִיִּים", fp: "סַבְלָנִיּוֹת", english: "patient", emoji: "🧘", oppositeId: "c1-6b" },
  { id: "c1-6b", category: 1, ms: "חֲסַר סַבְלָנוּת", fs: "חֲסַרַת סַבְלָנוּת", mp: "חַסְרֵי סַבְלָנוּת", fp: "חַסְרוֹת סַבְלָנוּת", english: "impatient", emoji: "⏱️", oppositeId: "c1-6a" },
  { id: "c1-7a", category: 1, ms: "חָרוּץ", fs: "חֲרוּצָה", mp: "חֲרוּצִים", fp: "חֲרוּצוֹת", english: "diligent / hardworking", emoji: "💪", oppositeId: "c1-7b" },
  { id: "c1-7b", category: 1, ms: "עַצְלָן", fs: "עַצְלָנִית", mp: "עַצְלָנִים", fp: "עַצְלָנִיּוֹת", english: "lazy", emoji: "🦥", oppositeId: "c1-7a" },
  { id: "c1-8a", category: 1, ms: "בַּיְשָׁן", fs: "בַּיְשָׁנִית", mp: "בַּיְשָׁנִים", fp: "בַּיְשָׁנִיּוֹת", english: "shy", emoji: "🙈", oppositeId: "c1-8b" },
  { id: "c1-8b", category: 1, ms: "בָּטוּחַ בְּעַצְמוֹ", fs: "בְּטוּחָה בְּעַצְמָהּ", mp: "בְּטוּחִים בְּעַצְמָם", fp: "בְּטוּחוֹת בְּעַצְמָן", english: "confident", emoji: "😎", oppositeId: "c1-8a" },
  { id: "c1-9a", category: 1, ms: "מְנֻסֶּה", fs: "מְנֻסָּה", mp: "מְנֻסִּים", fp: "מְנֻסּוֹת", english: "experienced", emoji: "🎓", oppositeId: "c1-9b" },
  { id: "c1-9b", category: 1, ms: "יָרוֹק", fs: "יְרוּקָה", mp: "יְרוּקִים", fp: "יְרוּקוֹת", english: "inexperienced / green", emoji: "🌱", oppositeId: "c1-9a" },
  { id: "c1-10a", category: 1, ms: "מְסֻפָּק", fs: "מְסֻפֶּקֶת", mp: "מְסֻפָּקִים", fp: "מְסֻפָּקוֹת", english: "satisfied", emoji: "😊", oppositeId: "c1-10b" },
  { id: "c1-10b", category: 1, ms: "מְתֻסְכָּל", fs: "מְתֻסְכֶּלֶת", mp: "מְתֻסְכָּלִים", fp: "מְתֻסְכָּלוֹת", english: "frustrated", emoji: "😤", oppositeId: "c1-10a" },

  // ===== Category 2: מראה וגודל =====
  { id: "c2-1a", category: 2, ms: "גָּדוֹל", fs: "גְּדוֹלָה", mp: "גְּדוֹלִים", fp: "גְּדוֹלוֹת", english: "big", emoji: "🐘", oppositeId: "c2-1b" },
  { id: "c2-1b", category: 2, ms: "קָטָן", fs: "קְטַנָּה", mp: "קְטַנִּים", fp: "קְטַנּוֹת", english: "small", emoji: "🐭", oppositeId: "c2-1a" },
  { id: "c2-2a", category: 2, ms: "גָּבוֹהַּ", fs: "גְּבוֹהָה", mp: "גְּבוֹהִים", fp: "גְּבוֹהוֹת", english: "tall", emoji: "🦒", oppositeId: "c2-2b" },
  { id: "c2-2b", category: 2, ms: "נָמוּךְ", fs: "נְמוּכָה", mp: "נְמוּכִים", fp: "נְמוּכוֹת", english: "short / low", emoji: "📏", oppositeId: "c2-2a" },
  { id: "c2-3a", category: 2, ms: "אָרוֹךְ", fs: "אֲרֻכָּה", mp: "אֲרֻכִּים", fp: "אֲרֻכּוֹת", english: "long", emoji: "🐍", oppositeId: "c2-3b" },
  { id: "c2-3b", category: 2, ms: "קָצָר", fs: "קְצָרָה", mp: "קְצָרִים", fp: "קְצָרוֹת", english: "short", emoji: "✂️", oppositeId: "c2-3a" },
  { id: "c2-4a", category: 2, ms: "רָחָב", fs: "רְחָבָה", mp: "רְחָבִים", fp: "רְחָבוֹת", english: "wide", emoji: "↔️", oppositeId: "c2-4b" },
  { id: "c2-4b", category: 2, ms: "צַר", fs: "צָרָה", mp: "צָרִים", fp: "צָרוֹת", english: "narrow", emoji: "🚪", oppositeId: "c2-4a" },
  { id: "c2-5a", category: 2, ms: "יָפֶה", fs: "יָפָה", mp: "יָפִים", fp: "יָפוֹת", english: "beautiful", emoji: "🌸", oppositeId: "c2-5b" },
  { id: "c2-5b", category: 2, ms: "מְכֹעָר", fs: "מְכֹעֶרֶת", mp: "מְכֹעָרִים", fp: "מְכֹעָרוֹת", english: "ugly", emoji: "👹", oppositeId: "c2-5a" },
  { id: "c2-6a", category: 2, ms: "רָזֶה", fs: "רָזָה", mp: "רָזִים", fp: "רָזוֹת", english: "thin / skinny", emoji: "🥒", oppositeId: "c2-6b" },
  { id: "c2-6b", category: 2, ms: "שָׁמֵן", fs: "שְׁמֵנָה", mp: "שְׁמֵנִים", fp: "שְׁמֵנוֹת", english: "fat", emoji: "🍔", oppositeId: "c2-6a" },
  { id: "c2-7a", category: 2, ms: "צָעִיר", fs: "צְעִירָה", mp: "צְעִירִים", fp: "צְעִירוֹת", english: "young", emoji: "👶", oppositeId: "c2-7b" },
  { id: "c2-7b", category: 2, ms: "זָקֵן", fs: "זְקֵנָה", mp: "זְקֵנִים", fp: "זְקֵנוֹת", english: "old", emoji: "👴", oppositeId: "c2-7a" },
  { id: "c2-8a", category: 2, ms: "נָקִי", fs: "נְקִיָּה", mp: "נְקִיִּים", fp: "נְקִיּוֹת", english: "clean", emoji: "🧼", oppositeId: "c2-8b" },
  { id: "c2-8b", category: 2, ms: "מְלֻכְלָךְ", fs: "מְלֻכְלֶכֶת", mp: "מְלֻכְלָכִים", fp: "מְלֻכְלָכוֹת", english: "dirty", emoji: "🐷", oppositeId: "c2-8a" },
  { id: "c2-9a", category: 2, ms: "מָלֵא", fs: "מְלֵאָה", mp: "מְלֵאִים", fp: "מְלֵאוֹת", english: "full", emoji: "🈵", oppositeId: "c2-9b" },
  { id: "c2-9b", category: 2, ms: "רֵיק", fs: "רֵיקָה", mp: "רֵיקִים", fp: "רֵיקוֹת", english: "empty", emoji: "🈳", oppositeId: "c2-9a" },
  { id: "c2-10a", category: 2, ms: "בָּהִיר", fs: "בְּהִירָה", mp: "בְּהִירִים", fp: "בְּהִירוֹת", english: "light (colored)", emoji: "☀️", oppositeId: "c2-10b" },
  { id: "c2-10b", category: 2, ms: "כֵּהֶה", fs: "כֵּהָה", mp: "כֵּהִים", fp: "כֵּהוֹת", english: "dark (colored)", emoji: "🌑", oppositeId: "c2-10a" },

  // ===== Category 3: תנועה וקושי =====
  { id: "c3-1a", category: 3, ms: "מָהִיר", fs: "מְהִירָה", mp: "מְהִירִים", fp: "מְהִירוֹת", english: "fast", emoji: "🐇", oppositeId: "c3-1b" },
  { id: "c3-1b", category: 3, ms: "אִטִּי", fs: "אִטִּית", mp: "אִטִּיִּים", fp: "אִטִּיּוֹת", english: "slow", emoji: "🐢", oppositeId: "c3-1a" },
  { id: "c3-2a", category: 3, ms: "קָשֶׁה", fs: "קָשָׁה", mp: "קָשִׁים", fp: "קָשׁוֹת", english: "hard / difficult", emoji: "🧗", oppositeId: "c3-2b" },
  { id: "c3-2b", category: 3, ms: "קַל", fs: "קַלָּה", mp: "קַלִּים", fp: "קַלּוֹת", english: "easy", emoji: "✅", oppositeId: "c3-2a" },
  { id: "c3-3a", category: 3, ms: "רָחוֹק", fs: "רְחוֹקָה", mp: "רְחוֹקִים", fp: "רְחוֹקוֹת", english: "far", emoji: "🌍", oppositeId: "c3-3b" },
  { id: "c3-3b", category: 3, ms: "קָרוֹב", fs: "קְרוֹבָה", mp: "קְרוֹבִים", fp: "קְרוֹבוֹת", english: "close / near", emoji: "📍", oppositeId: "c3-3a" },
  { id: "c3-4a", category: 3, ms: "כָּבֵד", fs: "כְּבֵדָה", mp: "כְּבֵדִים", fp: "כְּבֵדוֹת", english: "heavy", emoji: "🏋️", oppositeId: "c3-4b" },
  { id: "c3-4b", category: 3, ms: "קַל", fs: "קַלָּה", mp: "קַלִּים", fp: "קַלּוֹת", english: "light (weight)", emoji: "🪶", oppositeId: "c3-4a" },
  { id: "c3-5a", category: 3, ms: "פָּתוּחַ", fs: "פְּתוּחָה", mp: "פְּתוּחִים", fp: "פְּתוּחוֹת", english: "open", emoji: "🔓", oppositeId: "c3-5b" },
  { id: "c3-5b", category: 3, ms: "סָגוּר", fs: "סְגוּרָה", mp: "סְגוּרִים", fp: "סְגוּרוֹת", english: "closed", emoji: "🔒", oppositeId: "c3-5a" },
  { id: "c3-6a", category: 3, ms: "עָמוּס", fs: "עֲמוּסָה", mp: "עֲמוּסִים", fp: "עֲמוּסוֹת", english: "busy / loaded", emoji: "📦", oppositeId: "c3-6b" },
  { id: "c3-6b", category: 3, ms: "פָּנוּי", fs: "פְּנוּיָה", mp: "פְּנוּיִים", fp: "פְּנוּיוֹת", english: "free / available", emoji: "🆓", oppositeId: "c3-6a" },
  { id: "c3-7a", category: 3, ms: "רוֹעֵשׁ", fs: "רוֹעֶשֶׁת", mp: "רוֹעֲשִׁים", fp: "רוֹעֲשׁוֹת", english: "noisy", emoji: "📢", oppositeId: "c3-7b" },
  { id: "c3-7b", category: 3, ms: "שָׁקֵט", fs: "שְׁקֵטָה", mp: "שְׁקֵטִים", fp: "שְׁקֵטוֹת", english: "quiet", emoji: "🤫", oppositeId: "c3-7a" },
  { id: "c3-8a", category: 3, ms: "חָלָק", fs: "חֲלָקָה", mp: "חֲלָקִים", fp: "חֲלָקוֹת", english: "smooth", emoji: "🧈", oppositeId: "c3-8b" },
  { id: "c3-8b", category: 3, ms: "מְחֻסְפָּס", fs: "מְחֻסְפֶּסֶת", mp: "מְחֻסְפָּסִים", fp: "מְחֻסְפָּסוֹת", english: "rough", emoji: "🪨", oppositeId: "c3-8a" },
  { id: "c3-9a", category: 3, ms: "חָד", fs: "חַדָּה", mp: "חַדִּים", fp: "חַדּוֹת", english: "sharp", emoji: "🔪", oppositeId: "c3-9b" },
  { id: "c3-9b", category: 3, ms: "כֵּהֶה", fs: "כֵּהָה", mp: "כֵּהִים", fp: "כֵּהוֹת", english: "dull", emoji: "🥄", oppositeId: "c3-9a" },
  { id: "c3-10a", category: 3, ms: "חָפְשִׁי", fs: "חָפְשִׁיָּה", mp: "חָפְשִׁיִּים", fp: "חָפְשִׁיּוֹת", english: "free", emoji: "🕊️", oppositeId: "c3-10b" },
  { id: "c3-10b", category: 3, ms: "תָּפוּס", fs: "תְּפוּסָה", mp: "תְּפוּסִים", fp: "תְּפוּסוֹת", english: "occupied / taken", emoji: "🚫", oppositeId: "c3-10a" },

  // ===== Category 4: חושים וטבע =====
  { id: "c4-1a", category: 4, ms: "חַם", fs: "חַמָּה", mp: "חַמִּים", fp: "חַמּוֹת", english: "hot", emoji: "🔥", oppositeId: "c4-1b" },
  { id: "c4-1b", category: 4, ms: "קַר", fs: "קָרָה", mp: "קָרִים", fp: "קָרוֹת", english: "cold", emoji: "❄️", oppositeId: "c4-1a" },
  { id: "c4-2a", category: 4, ms: "מָתוֹק", fs: "מְתוּקָה", mp: "מְתוּקִים", fp: "מְתוּקוֹת", english: "sweet", emoji: "🍯", oppositeId: "c4-2b" },
  { id: "c4-2b", category: 4, ms: "חָמוּץ", fs: "חֲמוּצָה", mp: "חֲמוּצִים", fp: "חֲמוּצוֹת", english: "sour", emoji: "🍋", oppositeId: "c4-2a" },
  { id: "c4-3a", category: 4, ms: "מָלוּחַ", fs: "מְלוּחָה", mp: "מְלוּחִים", fp: "מְלוּחוֹת", english: "salty", emoji: "🧂", oppositeId: "c4-3b" },
  { id: "c4-3b", category: 4, ms: "תָּפֵל", fs: "תְּפֵלָה", mp: "תְּפֵלִים", fp: "תְּפֵלוֹת", english: "bland", emoji: "🍚", oppositeId: "c4-3a" },
  { id: "c4-4a", category: 4, ms: "טָעִים", fs: "טְעִימָה", mp: "טְעִימִים", fp: "טְעִימוֹת", english: "tasty", emoji: "😋", oppositeId: "c4-4b" },
  { id: "c4-4b", category: 4, ms: "מַגְעִיל", fs: "מַגְעִילָה", mp: "מַגְעִילִים", fp: "מַגְעִילוֹת", english: "disgusting", emoji: "🤢", oppositeId: "c4-4a" },
  { id: "c4-5a", category: 4, ms: "יָבֵשׁ", fs: "יְבֵשָׁה", mp: "יְבֵשִׁים", fp: "יְבֵשׁוֹת", english: "dry", emoji: "🏜️", oppositeId: "c4-5b" },
  { id: "c4-5b", category: 4, ms: "רָטֹב", fs: "רְטֻבָּה", mp: "רְטֻבִּים", fp: "רְטֻבּוֹת", english: "wet", emoji: "💧", oppositeId: "c4-5a" },
  { id: "c4-6a", category: 4, ms: "טָרִי", fs: "טְרִיָּה", mp: "טְרִיִּים", fp: "טְרִיּוֹת", english: "fresh", emoji: "🥬", oppositeId: "c4-6b" },
  { id: "c4-6b", category: 4, ms: "רָקוּב", fs: "רְקוּבָה", mp: "רְקוּבִים", fp: "רְקוּבוֹת", english: "rotten", emoji: "🍂", oppositeId: "c4-6a" },
  { id: "c4-7a", category: 4, ms: "חָזָק", fs: "חֲזָקָה", mp: "חֲזָקִים", fp: "חֲזָקוֹת", english: "strong", emoji: "💪", oppositeId: "c4-7b" },
  { id: "c4-7b", category: 4, ms: "חַלָּשׁ", fs: "חַלָּשָׁה", mp: "חַלָּשִׁים", fp: "חַלָּשׁוֹת", english: "weak", emoji: "🪶", oppositeId: "c4-7a" },
  { id: "c4-8a", category: 4, ms: "יָקָר", fs: "יְקָרָה", mp: "יְקָרִים", fp: "יְקָרוֹת", english: "expensive", emoji: "💎", oppositeId: "c4-8b" },
  { id: "c4-8b", category: 4, ms: "זוֹל", fs: "זוֹלָה", mp: "זוֹלִים", fp: "זוֹלוֹת", english: "cheap", emoji: "🏷️", oppositeId: "c4-8a" },
  { id: "c4-9a", category: 4, ms: "עָשִׁיר", fs: "עֲשִׁירָה", mp: "עֲשִׁירִים", fp: "עֲשִׁירוֹת", english: "rich", emoji: "🤑", oppositeId: "c4-9b" },
  { id: "c4-9b", category: 4, ms: "עָנִי", fs: "עֲנִיָּה", mp: "עֲנִיִּים", fp: "עֲנִיּוֹת", english: "poor", emoji: "😔", oppositeId: "c4-9a" },
  { id: "c4-10a", category: 4, ms: "חָדָשׁ", fs: "חֲדָשָׁה", mp: "חֲדָשִׁים", fp: "חֲדָשׁוֹת", english: "new", emoji: "✨", oppositeId: "c4-10b" },
  { id: "c4-10b", category: 4, ms: "יָשָׁן", fs: "יְשָׁנָה", mp: "יְשָׁנִים", fp: "יְשָׁנוֹת", english: "old (things)", emoji: "📻", oppositeId: "c4-10a" },

  // ===== Category 5: עניין ואיכות =====
  { id: "c5-1a", category: 5, ms: "טוֹב", fs: "טוֹבָה", mp: "טוֹבִים", fp: "טוֹבוֹת", english: "good", emoji: "👍", oppositeId: "c5-1b" },
  { id: "c5-1b", category: 5, ms: "רַע", fs: "רָעָה", mp: "רָעִים", fp: "רָעוֹת", english: "bad", emoji: "👎", oppositeId: "c5-1a" },
  { id: "c5-2a", category: 5, ms: "מְעַנְיֵן", fs: "מְעַנְיֶנֶת", mp: "מְעַנְיְנִים", fp: "מְעַנְיְנוֹת", english: "interesting", emoji: "🤔", oppositeId: "c5-2b" },
  { id: "c5-2b", category: 5, ms: "מְשַׁעֲמֵם", fs: "מְשַׁעֲמֶמֶת", mp: "מְשַׁעֲמְמִים", fp: "מְשַׁעֲמְמוֹת", english: "boring", emoji: "🥱", oppositeId: "c5-2a" },
  { id: "c5-3a", category: 5, ms: "חָשׁוּב", fs: "חֲשׁוּבָה", mp: "חֲשׁוּבִים", fp: "חֲשׁוּבוֹת", english: "important", emoji: "❗", oppositeId: "c5-3b" },
  { id: "c5-3b", category: 5, ms: "זָנִיחַ", fs: "זְנִיחָה", mp: "זְנִיחִים", fp: "זְנִיחוֹת", english: "negligible", emoji: "🤏", oppositeId: "c5-3a" },
  { id: "c5-4a", category: 5, ms: "מֻרְכָּב", fs: "מֻרְכֶּבֶת", mp: "מֻרְכָּבִים", fp: "מֻרְכָּבוֹת", english: "complex", emoji: "🧩", oppositeId: "c5-4b" },
  { id: "c5-4b", category: 5, ms: "פָּשׁוּט", fs: "פְּשׁוּטָה", mp: "פְּשׁוּטִים", fp: "פְּשׁוּטוֹת", english: "simple", emoji: "⭐", oppositeId: "c5-4a" },
  { id: "c5-5a", category: 5, ms: "בָּטוּחַ", fs: "בְּטוּחָה", mp: "בְּטוּחִים", fp: "בְּטוּחוֹת", english: "safe", emoji: "🛡️", oppositeId: "c5-5b" },
  { id: "c5-5b", category: 5, ms: "מְסֻכָּן", fs: "מְסֻכֶּנֶת", mp: "מְסֻכָּנִים", fp: "מְסֻכָּנוֹת", english: "dangerous", emoji: "⚠️", oppositeId: "c5-5a" },
  { id: "c5-6a", category: 5, ms: "נָכוֹן", fs: "נְכוֹנָה", mp: "נְכוֹנִים", fp: "נְכוֹנוֹת", english: "correct", emoji: "✔️", oppositeId: "c5-6b" },
  { id: "c5-6b", category: 5, ms: "מוּטְעֶה", fs: "מֻטְעֵית", mp: "מֻטְעִים", fp: "מֻטְעוֹת", english: "mistaken", emoji: "❌", oppositeId: "c5-6a" },
  { id: "c5-7a", category: 5, ms: "מוּכָּר", fs: "מוּכֶּרֶת", mp: "מוּכָּרִים", fp: "מוּכָּרוֹת", english: "familiar", emoji: "👋", oppositeId: "c5-7b" },
  { id: "c5-7b", category: 5, ms: "זָר", fs: "זָרָה", mp: "זָרִים", fp: "זָרוֹת", english: "foreign / strange", emoji: "❓", oppositeId: "c5-7a" },
  { id: "c5-8a", category: 5, ms: "אֲמִתִּי", fs: "אֲמִתִּית", mp: "אֲמִתִּיִּים", fp: "אֲמִתִּיּוֹת", english: "real / true", emoji: "💯", oppositeId: "c5-8b" },
  { id: "c5-8b", category: 5, ms: "מְזֻיָּף", fs: "מְזֻיֶּפֶת", mp: "מְזֻיָּפִים", fp: "מְזֻיָּפוֹת", english: "fake", emoji: "🎭", oppositeId: "c5-8a" },
  { id: "c5-9a", category: 5, ms: "נִפְלָא", fs: "נִפְלָאָה", mp: "נִפְלָאִים", fp: "נִפְלָאוֹת", english: "wonderful", emoji: "🌟", oppositeId: "c5-9b" },
  { id: "c5-9b", category: 5, ms: "גָּרוּעַ", fs: "גְּרוּעָה", mp: "גְּרוּעִים", fp: "גְּרוּעוֹת", english: "terrible", emoji: "💩", oppositeId: "c5-9a" },
  { id: "c5-10a", category: 5, ms: "חִיּוּבִי", fs: "חִיּוּבִית", mp: "חִיּוּבִיִּים", fp: "חִיּוּבִיּוֹת", english: "positive", emoji: "➕", oppositeId: "c5-10b" },
  { id: "c5-10b", category: 5, ms: "שְׁלִילִי", fs: "שְׁלִילִית", mp: "שְׁלִילִיִּים", fp: "שְׁלִילִיּוֹת", english: "negative", emoji: "➖", oppositeId: "c5-10a" },
];

// Sentence-completion bank: varied nouns across gender/number, spanning all 5
// categories, for the agreement-drill stage.
export const adjSentences: AdjSentence[] = [
  { id: "s1", category: 1, noun: "הילד", gender: "m", number: "s", template: "הילד ___ כי קיבל מתנה.", adjectiveId: "c1-1a", english: "The boy is happy because he got a gift." },
  { id: "s2", category: 1, noun: "המורה", gender: "f", number: "s", template: "המורה שלנו מאוד ___.", adjectiveId: "c1-2a", english: "Our teacher is very smart." },
  { id: "s3", category: 1, noun: "החברים שלי", gender: "m", number: "p", template: "החברים שלי ___ מאוד - הם עוזרים לכולם.", adjectiveId: "c1-4a", english: "My friends are very nice - they help everyone." },
  { id: "s4", category: 1, noun: "העובדות החדשות", gender: "f", number: "p", template: "העובדות החדשות ___ מאוד בעבודה.", adjectiveId: "c1-7a", english: "The new employees (f) are very diligent at work." },
  { id: "s5", category: 2, noun: "הבית", gender: "m", number: "s", template: "הבית של סבא וסבתא ___ מאוד.", adjectiveId: "c2-1a", english: "Grandpa and grandma's house is very big." },
  { id: "s6", category: 2, noun: "הדירה", gender: "f", number: "s", template: "הדירה החדשה שלנו ___.", adjectiveId: "c2-1b", english: "Our new apartment is small." },
  { id: "s7", category: 2, noun: "הבניינים", gender: "m", number: "p", template: "הבניינים במרכז העיר ___ מאוד.", adjectiveId: "c2-2a", english: "The buildings downtown are very tall." },
  { id: "s8", category: 2, noun: "השמלות", gender: "f", number: "p", template: "השמלות בחלון הראווה ___ מאוד.", adjectiveId: "c2-5a", english: "The dresses in the shop window are very beautiful." },
  { id: "s9", category: 3, noun: "הרכבת", gender: "f", number: "s", template: "הרכבת החדשה ___ מאוד.", adjectiveId: "c3-1a", english: "The new train is very fast." },
  { id: "s10", category: 3, noun: "המבחן", gender: "m", number: "s", template: "המבחן היה ___ מאוד השנה.", adjectiveId: "c3-2a", english: "The test was very hard this year." },
  { id: "s11", category: 3, noun: "החדרים", gender: "m", number: "p", template: "כל החדרים במלון ___ עכשיו.", adjectiveId: "c3-6b", english: "All the rooms at the hotel are free (available) now." },
  { id: "s12", category: 3, noun: "השכונות", gender: "f", number: "p", template: "השכונות ליד הים ___ בערב.", adjectiveId: "c3-7b", english: "The neighborhoods near the sea are quiet in the evening." },
  { id: "s13", category: 4, noun: "התה", gender: "m", number: "s", template: "התה הזה ___ מדי בשבילי.", adjectiveId: "c4-1a", english: "This tea is too hot for me." },
  { id: "s14", category: 4, noun: "העוגה", gender: "f", number: "s", template: "העוגה של אמא ___ מאוד.", adjectiveId: "c4-2a", english: "Mom's cake is very sweet." },
  { id: "s15", category: 4, noun: "הפירות", gender: "m", number: "p", template: "הפירות בשוק ___ היום.", adjectiveId: "c4-6a", english: "The fruits at the market are fresh today." },
  { id: "s16", category: 4, noun: "המכוניות", gender: "f", number: "p", template: "המכוניות החדשות האלה ___ מאוד.", adjectiveId: "c4-8a", english: "These new cars are very expensive." },
  { id: "s17", category: 5, noun: "הסרט", gender: "m", number: "s", template: "הסרט הזה ___ מאוד - לא נהניתי.", adjectiveId: "c5-2b", english: "This movie is very boring - I didn't enjoy it." },
  { id: "s18", category: 5, noun: "התשובה", gender: "f", number: "s", template: "התשובה שלך ___.", adjectiveId: "c5-6a", english: "Your answer is correct." },
  { id: "s19", category: 5, noun: "החדשות", gender: "f", number: "p", template: "החדשות היום ___ מאוד.", adjectiveId: "c5-9b", english: "The news today is very bad (terrible)." },
  { id: "s20", category: 5, noun: "התכשיטים", gender: "m", number: "p", template: "התכשיטים האלה ___ - הם לא אמיתיים.", adjectiveId: "c5-8b", english: "These jewels are fake - they're not real." },
];
