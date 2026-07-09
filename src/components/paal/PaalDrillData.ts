import { BinyanDrillData, DrillVerb, DrillSentence } from "@/components/binyanDrill/binyanDrillTypes";

// The 22 approved Pa'al (קל) verbs for this module, each fully inflected for
// all 10 persons across past/present/future. Infinitive nikud is exactly as
// specified by the teacher; conjugations below were derived from it using
// standard Pa'al sub-patterns and cross-checked against real usage.
//
// NOTE ON UNCERTAINTY (per instructions: flag and continue rather than stall):
// Pa'al is the least predictable binyan — the future/imperative theme vowel
// (a/e/o-class) is lexically determined, not fully rule-based, so a few forms
// here rest on best-confidence recall rather than a pattern already verified
// elsewhere in this codebase:
//   - לגדול: the participle (הווה) is conjugated with the STATIVE קָטֵל pattern
//     (גָּדֵל, no cholam) rather than the dynamic קוֹטֵל pattern, matching the
//     colloquial "הילדים גדלים כל כך מהר". Worth a native-speaker sanity check.
//   - לבחור / ללמוד: future is Patach-class (יִבְחַר / יִלְמַד) despite the
//     cholam-looking infinitive — this is correct (very common real usage) but
//     is a lexical exception, not something derivable from the infinitive alone.
// All other verbs follow well-attested regular Pa'al sub-patterns (o-class
// sound roots, final-guttural roots, Pe-Nun assimilation, Lamed-Alef, Lamed-He,
// and the three classically irregular verbs ללכת/לעשות/לראות).
const paalDrillVerbs: DrillVerb[] = [
  {
    infinitive: "לבחור",
    infinitiveNikud: "לִבְחוֹר",
    english: "To choose",
    root: "ב.ח.ר",
    conjugations: {
      past: { "אני": "בָּחַרְתִּי", "אתה": "בָּחַרְתָּ", "את": "בָּחַרְתְּ", "הוא": "בָּחַר", "היא": "בָּחֲרָה", "אנחנו": "בָּחַרְנוּ", "אתם": "בְּחַרְתֶּם", "אתן": "בְּחַרְתֶּן", "הם": "בָּחֲרוּ", "הן": "בָּחֲרוּ" },
      present: { "אני": "בּוֹחֵר", "אתה": "בּוֹחֵר", "את": "בּוֹחֶרֶת", "הוא": "בּוֹחֵר", "היא": "בּוֹחֶרֶת", "אנחנו": "בּוֹחֲרִים", "אתם": "בּוֹחֲרִים", "אתן": "בּוֹחֲרוֹת", "הם": "בּוֹחֲרִים", "הן": "בּוֹחֲרוֹת" },
      future: { "אני": "אֶבְחַר", "אתה": "תִּבְחַר", "את": "תִּבְחֲרִי", "הוא": "יִבְחַר", "היא": "תִּבְחַר", "אנחנו": "נִבְחַר", "אתם": "תִּבְחֲרוּ", "אתן": "תִּבְחַרְנָה", "הם": "יִבְחֲרוּ", "הן": "תִּבְחַרְנָה" },
    },
  },
  {
    infinitive: "לבדוק",
    infinitiveNikud: "לִבְדּוֹק",
    english: "To check",
    root: "ב.ד.ק",
    conjugations: {
      past: { "אני": "בָּדַקְתִּי", "אתה": "בָּדַקְתָּ", "את": "בָּדַקְתְּ", "הוא": "בָּדַק", "היא": "בָּדְקָה", "אנחנו": "בָּדַקְנוּ", "אתם": "בְּדַקְתֶּם", "אתן": "בְּדַקְתֶּן", "הם": "בָּדְקוּ", "הן": "בָּדְקוּ" },
      present: { "אני": "בּוֹדֵק", "אתה": "בּוֹדֵק", "את": "בּוֹדֶקֶת", "הוא": "בּוֹדֵק", "היא": "בּוֹדֶקֶת", "אנחנו": "בּוֹדְקִים", "אתם": "בּוֹדְקִים", "אתן": "בּוֹדְקוֹת", "הם": "בּוֹדְקִים", "הן": "בּוֹדְקוֹת" },
      future: { "אני": "אֶבְדּוֹק", "אתה": "תִּבְדּוֹק", "את": "תִּבְדְּקִי", "הוא": "יִבְדּוֹק", "היא": "תִּבְדּוֹק", "אנחנו": "נִבְדּוֹק", "אתם": "תִּבְדְּקוּ", "אתן": "תִּבְדּוֹקְנָה", "הם": "יִבְדְּקוּ", "הן": "תִּבְדּוֹקְנָה" },
    },
  },
  {
    infinitive: "לבנות",
    infinitiveNikud: "לִבְנוֹת",
    english: "To build",
    root: "ב.נ.ה",
    conjugations: {
      past: { "אני": "בָּנִיתִי", "אתה": "בָּנִיתָ", "את": "בָּנִית", "הוא": "בָּנָה", "היא": "בָּנְתָה", "אנחנו": "בָּנִינוּ", "אתם": "בְּנִיתֶם", "אתן": "בְּנִיתֶן", "הם": "בָּנוּ", "הן": "בָּנוּ" },
      present: { "אני": "בּוֹנֶה", "אתה": "בּוֹנֶה", "את": "בּוֹנָה", "הוא": "בּוֹנֶה", "היא": "בּוֹנָה", "אנחנו": "בּוֹנִים", "אתם": "בּוֹנִים", "אתן": "בּוֹנוֹת", "הם": "בּוֹנִים", "הן": "בּוֹנוֹת" },
      future: { "אני": "אֶבְנֶה", "אתה": "תִּבְנֶה", "את": "תִּבְנִי", "הוא": "יִבְנֶה", "היא": "תִּבְנֶה", "אנחנו": "נִבְנֶה", "אתם": "תִּבְנוּ", "אתן": "תִּבְנֶינָה", "הם": "יִבְנוּ", "הן": "תִּבְנֶינָה" },
    },
  },
  {
    infinitive: "לגדול",
    infinitiveNikud: "לִגְדּוֹל",
    english: "To grow",
    root: "ג.ד.ל",
    conjugations: {
      past: { "אני": "גָּדַלְתִּי", "אתה": "גָּדַלְתָּ", "את": "גָּדַלְתְּ", "הוא": "גָּדַל", "היא": "גָּדְלָה", "אנחנו": "גָּדַלְנוּ", "אתם": "גְּדַלְתֶּם", "אתן": "גְּדַלְתֶּן", "הם": "גָּדְלוּ", "הן": "גָּדְלוּ" },
      present: { "אני": "גָּדֵל", "אתה": "גָּדֵל", "את": "גְּדֵלָה", "הוא": "גָּדֵל", "היא": "גְּדֵלָה", "אנחנו": "גְּדֵלִים", "אתם": "גְּדֵלִים", "אתן": "גְּדֵלוֹת", "הם": "גְּדֵלִים", "הן": "גְּדֵלוֹת" },
      future: { "אני": "אֶגְדַּל", "אתה": "תִּגְדַּל", "את": "תִּגְדְּלִי", "הוא": "יִגְדַּל", "היא": "תִּגְדַּל", "אנחנו": "נִגְדַּל", "אתם": "תִּגְדְּלוּ", "אתן": "תִּגְדַּלְנָה", "הם": "יִגְדְּלוּ", "הן": "תִּגְדַּלְנָה" },
    },
  },
  {
    infinitive: "לדרוש",
    infinitiveNikud: "לִדְרוֹשׁ",
    english: "To demand",
    root: "ד.ר.שׁ",
    conjugations: {
      past: { "אני": "דָּרַשְׁתִּי", "אתה": "דָּרַשְׁתָּ", "את": "דָּרַשְׁתְּ", "הוא": "דָּרַשׁ", "היא": "דָּרְשָׁה", "אנחנו": "דָּרַשְׁנוּ", "אתם": "דְּרַשְׁתֶּם", "אתן": "דְּרַשְׁתֶּן", "הם": "דָּרְשׁוּ", "הן": "דָּרְשׁוּ" },
      present: { "אני": "דּוֹרֵשׁ", "אתה": "דּוֹרֵשׁ", "את": "דּוֹרֶשֶׁת", "הוא": "דּוֹרֵשׁ", "היא": "דּוֹרֶשֶׁת", "אנחנו": "דּוֹרְשִׁים", "אתם": "דּוֹרְשִׁים", "אתן": "דּוֹרְשׁוֹת", "הם": "דּוֹרְשִׁים", "הן": "דּוֹרְשׁוֹת" },
      future: { "אני": "אֶדְרוֹשׁ", "אתה": "תִּדְרוֹשׁ", "את": "תִּדְרְשִׁי", "הוא": "יִדְרוֹשׁ", "היא": "תִּדְרוֹשׁ", "אנחנו": "נִדְרוֹשׁ", "אתם": "תִּדְרְשׁוּ", "אתן": "תִּדְרוֹשְׁנָה", "הם": "יִדְרְשׁוּ", "הן": "תִּדְרוֹשְׁנָה" },
    },
  },
  {
    infinitive: "ללכת",
    infinitiveNikud: "לָלֶכֶת",
    english: "To go / walk",
    root: "ה.ל.כ",
    conjugations: {
      past: { "אני": "הָלַכְתִּי", "אתה": "הָלַכְתָּ", "את": "הָלַכְתְּ", "הוא": "הָלַךְ", "היא": "הָלְכָה", "אנחנו": "הָלַכְנוּ", "אתם": "הֲלַכְתֶּם", "אתן": "הֲלַכְתֶּן", "הם": "הָלְכוּ", "הן": "הָלְכוּ" },
      present: { "אני": "הוֹלֵךְ", "אתה": "הוֹלֵךְ", "את": "הוֹלֶכֶת", "הוא": "הוֹלֵךְ", "היא": "הוֹלֶכֶת", "אנחנו": "הוֹלְכִים", "אתם": "הוֹלְכִים", "אתן": "הוֹלְכוֹת", "הם": "הוֹלְכִים", "הן": "הוֹלְכוֹת" },
      future: { "אני": "אֵלֵךְ", "אתה": "תֵּלֵךְ", "את": "תֵּלְכִי", "הוא": "יֵלֵךְ", "היא": "תֵּלֵךְ", "אנחנו": "נֵלֵךְ", "אתם": "תֵּלְכוּ", "אתן": "תֵּלַכְנָה", "הם": "יֵלְכוּ", "הן": "תֵּלַכְנָה" },
    },
  },
  {
    infinitive: "לזכות",
    infinitiveNikud: "לִזְכּוֹת",
    english: "To win / gain",
    root: "ז.כ.ה",
    conjugations: {
      past: { "אני": "זָכִיתִי", "אתה": "זָכִיתָ", "את": "זָכִית", "הוא": "זָכָה", "היא": "זָכְתָה", "אנחנו": "זָכִינוּ", "אתם": "זְכִיתֶם", "אתן": "זְכִיתֶן", "הם": "זָכוּ", "הן": "זָכוּ" },
      present: { "אני": "זוֹכֶה", "אתה": "זוֹכֶה", "את": "זוֹכָה", "הוא": "זוֹכֶה", "היא": "זוֹכָה", "אנחנו": "זוֹכִים", "אתם": "זוֹכִים", "אתן": "זוֹכוֹת", "הם": "זוֹכִים", "הן": "זוֹכוֹת" },
      future: { "אני": "אֶזְכֶּה", "אתה": "תִּזְכֶּה", "את": "תִּזְכִּי", "הוא": "יִזְכֶּה", "היא": "תִּזְכֶּה", "אנחנו": "נִזְכֶּה", "אתם": "תִּזְכּוּ", "אתן": "תִּזְכֶּינָה", "הם": "יִזְכּוּ", "הן": "תִּזְכֶּינָה" },
    },
  },
  {
    infinitive: "לחשוב",
    infinitiveNikud: "לַחֲשׁוֹב",
    english: "To think",
    root: "ח.שׁ.ב",
    conjugations: {
      past: { "אני": "חָשַׁבְתִּי", "אתה": "חָשַׁבְתָּ", "את": "חָשַׁבְתְּ", "הוא": "חָשַׁב", "היא": "חָשְׁבָה", "אנחנו": "חָשַׁבְנוּ", "אתם": "חֲשַׁבְתֶּם", "אתן": "חֲשַׁבְתֶּן", "הם": "חָשְׁבוּ", "הן": "חָשְׁבוּ" },
      present: { "אני": "חוֹשֵׁב", "אתה": "חוֹשֵׁב", "את": "חוֹשֶׁבֶת", "הוא": "חוֹשֵׁב", "היא": "חוֹשֶׁבֶת", "אנחנו": "חוֹשְׁבִים", "אתם": "חוֹשְׁבִים", "אתן": "חוֹשְׁבוֹת", "הם": "חוֹשְׁבִים", "הן": "חוֹשְׁבוֹת" },
      future: { "אני": "אֶחְשׁוֹב", "אתה": "תַּחְשׁוֹב", "את": "תַּחְשְׁבִי", "הוא": "יַחְשׁוֹב", "היא": "תַּחְשׁוֹב", "אנחנו": "נַחְשׁוֹב", "אתם": "תַּחְשְׁבוּ", "אתן": "תַּחְשׁוֹבְנָה", "הם": "יַחְשְׁבוּ", "הן": "תַּחְשׁוֹבְנָה" },
    },
  },
  {
    infinitive: "לכתוב",
    infinitiveNikud: "לִכְתּוֹב",
    english: "To write",
    root: "כ.ת.ב",
    conjugations: {
      past: { "אני": "כָּתַבְתִּי", "אתה": "כָּתַבְתָּ", "את": "כָּתַבְתְּ", "הוא": "כָּתַב", "היא": "כָּתְבָה", "אנחנו": "כָּתַבְנוּ", "אתם": "כְּתַבְתֶּם", "אתן": "כְּתַבְתֶּן", "הם": "כָּתְבוּ", "הן": "כָּתְבוּ" },
      present: { "אני": "כּוֹתֵב", "אתה": "כּוֹתֵב", "את": "כּוֹתֶבֶת", "הוא": "כּוֹתֵב", "היא": "כּוֹתֶבֶת", "אנחנו": "כּוֹתְבִים", "אתם": "כּוֹתְבִים", "אתן": "כּוֹתְבוֹת", "הם": "כּוֹתְבִים", "הן": "כּוֹתְבוֹת" },
      future: { "אני": "אֶכְתּוֹב", "אתה": "תִּכְתּוֹב", "את": "תִּכְתְּבִי", "הוא": "יִכְתּוֹב", "היא": "תִּכְתּוֹב", "אנחנו": "נִכְתּוֹב", "אתם": "תִּכְתְּבוּ", "אתן": "תִּכְתּוֹבְנָה", "הם": "יִכְתְּבוּ", "הן": "תִּכְתּוֹבְנָה" },
    },
  },
  {
    infinitive: "ללמוד",
    infinitiveNikud: "לִלְמוֹד",
    english: "To learn / study",
    root: "ל.מ.ד",
    conjugations: {
      past: { "אני": "לָמַדְתִּי", "אתה": "לָמַדְתָּ", "את": "לָמַדְתְּ", "הוא": "לָמַד", "היא": "לָמְדָה", "אנחנו": "לָמַדְנוּ", "אתם": "לְמַדְתֶּם", "אתן": "לְמַדְתֶּן", "הם": "לָמְדוּ", "הן": "לָמְדוּ" },
      present: { "אני": "לוֹמֵד", "אתה": "לוֹמֵד", "את": "לוֹמֶדֶת", "הוא": "לוֹמֵד", "היא": "לוֹמֶדֶת", "אנחנו": "לוֹמְדִים", "אתם": "לוֹמְדִים", "אתן": "לוֹמְדוֹת", "הם": "לוֹמְדִים", "הן": "לוֹמְדוֹת" },
      future: { "אני": "אֶלְמַד", "אתה": "תִּלְמַד", "את": "תִּלְמְדִי", "הוא": "יִלְמַד", "היא": "תִּלְמַד", "אנחנו": "נִלְמַד", "אתם": "תִּלְמְדוּ", "אתן": "תִּלְמַדְנָה", "הם": "יִלְמְדוּ", "הן": "תִּלְמַדְנָה" },
    },
  },
  {
    infinitive: "למצוא",
    infinitiveNikud: "לִמְצוֹא",
    english: "To find",
    root: "מ.צ.א",
    conjugations: {
      past: { "אני": "מָצָאתִי", "אתה": "מָצָאתָ", "את": "מָצָאת", "הוא": "מָצָא", "היא": "מָצְאָה", "אנחנו": "מָצָאנוּ", "אתם": "מְצָאתֶם", "אתן": "מְצָאתֶן", "הם": "מָצְאוּ", "הן": "מָצְאוּ" },
      present: { "אני": "מוֹצֵא", "אתה": "מוֹצֵא", "את": "מוֹצֵאת", "הוא": "מוֹצֵא", "היא": "מוֹצֵאת", "אנחנו": "מוֹצְאִים", "אתם": "מוֹצְאִים", "אתן": "מוֹצְאוֹת", "הם": "מוֹצְאִים", "הן": "מוֹצְאוֹת" },
      future: { "אני": "אֶמְצָא", "אתה": "תִּמְצָא", "את": "תִּמְצְאִי", "הוא": "יִמְצָא", "היא": "תִּמְצָא", "אנחנו": "נִמְצָא", "אתם": "תִּמְצְאוּ", "אתן": "תִּמְצֶאנָה", "הם": "יִמְצְאוּ", "הן": "תִּמְצֶאנָה" },
    },
  },
  {
    infinitive: "לנסוע",
    infinitiveNikud: "לִנְסוֹעַ",
    english: "To drive / travel",
    root: "נ.ס.ע",
    conjugations: {
      past: { "אני": "נָסַעְתִּי", "אתה": "נָסַעְתָּ", "את": "נָסַעְתְּ", "הוא": "נָסַע", "היא": "נָסְעָה", "אנחנו": "נָסַעְנוּ", "אתם": "נְסַעְתֶּם", "אתן": "נְסַעְתֶּן", "הם": "נָסְעוּ", "הן": "נָסְעוּ" },
      present: { "אני": "נוֹסֵעַ", "אתה": "נוֹסֵעַ", "את": "נוֹסַעַת", "הוא": "נוֹסֵעַ", "היא": "נוֹסַעַת", "אנחנו": "נוֹסְעִים", "אתם": "נוֹסְעִים", "אתן": "נוֹסְעוֹת", "הם": "נוֹסְעִים", "הן": "נוֹסְעוֹת" },
      future: { "אני": "אֶסַּע", "אתה": "תִּסַּע", "את": "תִּסְּעִי", "הוא": "יִסַּע", "היא": "תִּסַּע", "אנחנו": "נִסַּע", "אתם": "תִּסְּעוּ", "אתן": "תִּסַּעְנָה", "הם": "יִסְּעוּ", "הן": "תִּסַּעְנָה" },
    },
  },
  {
    infinitive: "לעשות",
    infinitiveNikud: "לַעֲשׂוֹת",
    english: "To do / make",
    root: "ע.שׂ.ה",
    conjugations: {
      past: { "אני": "עָשִׂיתִי", "אתה": "עָשִׂיתָ", "את": "עָשִׂית", "הוא": "עָשָׂה", "היא": "עָשְׂתָה", "אנחנו": "עָשִׂינוּ", "אתם": "עֲשִׂיתֶם", "אתן": "עֲשִׂיתֶן", "הם": "עָשׂוּ", "הן": "עָשׂוּ" },
      present: { "אני": "עוֹשֶׂה", "אתה": "עוֹשֶׂה", "את": "עוֹשָׂה", "הוא": "עוֹשֶׂה", "היא": "עוֹשָׂה", "אנחנו": "עוֹשִׂים", "אתם": "עוֹשִׂים", "אתן": "עוֹשׂוֹת", "הם": "עוֹשִׂים", "הן": "עוֹשׂוֹת" },
      future: { "אני": "אֶעֱשֶׂה", "אתה": "תַּעֲשֶׂה", "את": "תַּעֲשִׂי", "הוא": "יַעֲשֶׂה", "היא": "תַּעֲשֶׂה", "אנחנו": "נַעֲשֶׂה", "אתם": "תַּעֲשׂוּ", "אתן": "תַּעֲשֶׂינָה", "הם": "יַעֲשׂוּ", "הן": "תַּעֲשֶׂינָה" },
    },
  },
  {
    infinitive: "לצפות",
    infinitiveNikud: "לִצְפּוֹת",
    english: "To watch / anticipate",
    root: "צ.פ.ה",
    conjugations: {
      past: { "אני": "צָפִיתִי", "אתה": "צָפִיתָ", "את": "צָפִית", "הוא": "צָפָה", "היא": "צָפְתָה", "אנחנו": "צָפִינוּ", "אתם": "צְפִיתֶם", "אתן": "צְפִיתֶן", "הם": "צָפוּ", "הן": "צָפוּ" },
      present: { "אני": "צוֹפֶה", "אתה": "צוֹפֶה", "את": "צוֹפָה", "הוא": "צוֹפֶה", "היא": "צוֹפָה", "אנחנו": "צוֹפִים", "אתם": "צוֹפִים", "אתן": "צוֹפוֹת", "הם": "צוֹפִים", "הן": "צוֹפוֹת" },
      future: { "אני": "אֶצְפֶּה", "אתה": "תִּצְפֶּה", "את": "תִּצְפִּי", "הוא": "יִצְפֶּה", "היא": "תִּצְפֶּה", "אנחנו": "נִצְפֶּה", "אתם": "תִּצְפּוּ", "אתן": "תִּצְפֶּינָה", "הם": "יִצְפּוּ", "הן": "תִּצְפֶּינָה" },
    },
  },
  {
    infinitive: "לקרוא",
    infinitiveNikud: "לִקְרוֹא",
    english: "To read / call",
    root: "ק.ר.א",
    conjugations: {
      past: { "אני": "קָרָאתִי", "אתה": "קָרָאתָ", "את": "קָרָאת", "הוא": "קָרָא", "היא": "קָרְאָה", "אנחנו": "קָרָאנוּ", "אתם": "קְרָאתֶם", "אתן": "קְרָאתֶן", "הם": "קָרְאוּ", "הן": "קָרְאוּ" },
      present: { "אני": "קוֹרֵא", "אתה": "קוֹרֵא", "את": "קוֹרֵאת", "הוא": "קוֹרֵא", "היא": "קוֹרֵאת", "אנחנו": "קוֹרְאִים", "אתם": "קוֹרְאִים", "אתן": "קוֹרְאוֹת", "הם": "קוֹרְאִים", "הן": "קוֹרְאוֹת" },
      future: { "אני": "אֶקְרָא", "אתה": "תִּקְרָא", "את": "תִּקְרְאִי", "הוא": "יִקְרָא", "היא": "תִּקְרָא", "אנחנו": "נִקְרָא", "אתם": "תִּקְרְאוּ", "אתן": "תִּקְרֶאנָה", "הם": "יִקְרְאוּ", "הן": "תִּקְרֶאנָה" },
    },
  },
  {
    infinitive: "לקנות",
    infinitiveNikud: "לִקְנוֹת",
    english: "To buy",
    root: "ק.נ.ה",
    conjugations: {
      past: { "אני": "קָנִיתִי", "אתה": "קָנִיתָ", "את": "קָנִית", "הוא": "קָנָה", "היא": "קָנְתָה", "אנחנו": "קָנִינוּ", "אתם": "קְנִיתֶם", "אתן": "קְנִיתֶן", "הם": "קָנוּ", "הן": "קָנוּ" },
      present: { "אני": "קוֹנֶה", "אתה": "קוֹנֶה", "את": "קוֹנָה", "הוא": "קוֹנֶה", "היא": "קוֹנָה", "אנחנו": "קוֹנִים", "אתם": "קוֹנִים", "אתן": "קוֹנוֹת", "הם": "קוֹנִים", "הן": "קוֹנוֹת" },
      future: { "אני": "אֶקְנֶה", "אתה": "תִּקְנֶה", "את": "תִּקְנִי", "הוא": "יִקְנֶה", "היא": "תִּקְנֶה", "אנחנו": "נִקְנֶה", "אתם": "תִּקְנוּ", "אתן": "תִּקְנֶינָה", "הם": "יִקְנוּ", "הן": "תִּקְנֶינָה" },
    },
  },
  {
    infinitive: "לראות",
    infinitiveNikud: "לִרְאוֹת",
    english: "To see",
    root: "ר.א.ה",
    conjugations: {
      past: { "אני": "רָאִיתִי", "אתה": "רָאִיתָ", "את": "רָאִית", "הוא": "רָאָה", "היא": "רָאֲתָה", "אנחנו": "רָאִינוּ", "אתם": "רְאִיתֶם", "אתן": "רְאִיתֶן", "הם": "רָאוּ", "הן": "רָאוּ" },
      present: { "אני": "רוֹאֶה", "אתה": "רוֹאֶה", "את": "רוֹאָה", "הוא": "רוֹאֶה", "היא": "רוֹאָה", "אנחנו": "רוֹאִים", "אתם": "רוֹאִים", "אתן": "רוֹאוֹת", "הם": "רוֹאִים", "הן": "רוֹאוֹת" },
      future: { "אני": "אֶרְאֶה", "אתה": "תִּרְאֶה", "את": "תִּרְאִי", "הוא": "יִרְאֶה", "היא": "תִּרְאֶה", "אנחנו": "נִרְאֶה", "אתם": "תִּרְאוּ", "אתן": "תִּרְאֶינָה", "הם": "יִרְאוּ", "הן": "תִּרְאֶינָה" },
    },
  },
  {
    infinitive: "לשמוע",
    infinitiveNikud: "לִשְׁמוֹעַ",
    english: "To hear / listen",
    root: "שׁ.מ.ע",
    conjugations: {
      past: { "אני": "שָׁמַעְתִּי", "אתה": "שָׁמַעְתָּ", "את": "שָׁמַעְתְּ", "הוא": "שָׁמַע", "היא": "שָׁמְעָה", "אנחנו": "שָׁמַעְנוּ", "אתם": "שְׁמַעְתֶּם", "אתן": "שְׁמַעְתֶּן", "הם": "שָׁמְעוּ", "הן": "שָׁמְעוּ" },
      present: { "אני": "שׁוֹמֵעַ", "אתה": "שׁוֹמֵעַ", "את": "שׁוֹמַעַת", "הוא": "שׁוֹמֵעַ", "היא": "שׁוֹמַעַת", "אנחנו": "שׁוֹמְעִים", "אתם": "שׁוֹמְעִים", "אתן": "שׁוֹמְעוֹת", "הם": "שׁוֹמְעִים", "הן": "שׁוֹמְעוֹת" },
      future: { "אני": "אֶשְׁמַע", "אתה": "תִּשְׁמַע", "את": "תִּשְׁמְעִי", "הוא": "יִשְׁמַע", "היא": "תִּשְׁמַע", "אנחנו": "נִשְׁמַע", "אתם": "תִּשְׁמְעוּ", "אתן": "תִּשְׁמַעְנָה", "הם": "יִשְׁמְעוּ", "הן": "תִּשְׁמַעְנָה" },
    },
  },
  {
    infinitive: "לשתות",
    infinitiveNikud: "לִשְׁתּוֹת",
    english: "To drink",
    root: "שׁ.ת.ה",
    conjugations: {
      past: { "אני": "שָׁתִיתִי", "אתה": "שָׁתִיתָ", "את": "שָׁתִית", "הוא": "שָׁתָה", "היא": "שָׁתְתָה", "אנחנו": "שָׁתִינוּ", "אתם": "שְׁתִיתֶם", "אתן": "שְׁתִיתֶן", "הם": "שָׁתוּ", "הן": "שָׁתוּ" },
      present: { "אני": "שׁוֹתֶה", "אתה": "שׁוֹתֶה", "את": "שׁוֹתָה", "הוא": "שׁוֹתֶה", "היא": "שׁוֹתָה", "אנחנו": "שׁוֹתִים", "אתם": "שׁוֹתִים", "אתן": "שׁוֹתוֹת", "הם": "שׁוֹתִים", "הן": "שׁוֹתוֹת" },
      future: { "אני": "אֶשְׁתֶּה", "אתה": "תִּשְׁתֶּה", "את": "תִּשְׁתִּי", "הוא": "יִשְׁתֶּה", "היא": "תִּשְׁתֶּה", "אנחנו": "נִשְׁתֶּה", "אתם": "תִּשְׁתּוּ", "אתן": "תִּשְׁתֶּינָה", "הם": "יִשְׁתּוּ", "הן": "תִּשְׁתֶּינָה" },
    },
  },
  {
    infinitive: "לתמוך",
    infinitiveNikud: "לִתְמוֹךְ",
    english: "To support",
    root: "ת.מ.כ",
    conjugations: {
      past: { "אני": "תָּמַכְתִּי", "אתה": "תָּמַכְתָּ", "את": "תָּמַכְתְּ", "הוא": "תָּמַךְ", "היא": "תָּמְכָה", "אנחנו": "תָּמַכְנוּ", "אתם": "תְּמַכְתֶּם", "אתן": "תְּמַכְתֶּן", "הם": "תָּמְכוּ", "הן": "תָּמְכוּ" },
      present: { "אני": "תּוֹמֵךְ", "אתה": "תּוֹמֵךְ", "את": "תּוֹמֶכֶת", "הוא": "תּוֹמֵךְ", "היא": "תּוֹמֶכֶת", "אנחנו": "תּוֹמְכִים", "אתם": "תּוֹמְכִים", "אתן": "תּוֹמְכוֹת", "הם": "תּוֹמְכִים", "הן": "תּוֹמְכוֹת" },
      future: { "אני": "אֶתְמוֹךְ", "אתה": "תִּתְמוֹךְ", "את": "תִּתְמְכִי", "הוא": "יִתְמוֹךְ", "היא": "תִּתְמוֹךְ", "אנחנו": "נִתְמוֹךְ", "אתם": "תִּתְמְכוּ", "אתן": "תִּתְמוֹכְנָה", "הם": "יִתְמְכוּ", "הן": "תִּתְמוֹכְנָה" },
    },
  },
  {
    infinitive: "לשמור",
    infinitiveNikud: "לִשְׁמוֹר",
    english: "To keep / guard",
    root: "שׁ.מ.ר",
    conjugations: {
      past: { "אני": "שָׁמַרְתִּי", "אתה": "שָׁמַרְתָּ", "את": "שָׁמַרְתְּ", "הוא": "שָׁמַר", "היא": "שָׁמְרָה", "אנחנו": "שָׁמַרְנוּ", "אתם": "שְׁמַרְתֶּם", "אתן": "שְׁמַרְתֶּן", "הם": "שָׁמְרוּ", "הן": "שָׁמְרוּ" },
      present: { "אני": "שׁוֹמֵר", "אתה": "שׁוֹמֵר", "את": "שׁוֹמֶרֶת", "הוא": "שׁוֹמֵר", "היא": "שׁוֹמֶרֶת", "אנחנו": "שׁוֹמְרִים", "אתם": "שׁוֹמְרִים", "אתן": "שׁוֹמְרוֹת", "הם": "שׁוֹמְרִים", "הן": "שׁוֹמְרוֹת" },
      future: { "אני": "אֶשְׁמוֹר", "אתה": "תִּשְׁמוֹר", "את": "תִּשְׁמְרִי", "הוא": "יִשְׁמוֹר", "היא": "תִּשְׁמוֹר", "אנחנו": "נִשְׁמוֹר", "אתם": "תִּשְׁמְרוּ", "אתן": "תִּשְׁמוֹרְנָה", "הם": "יִשְׁמְרוּ", "הן": "תִּשְׁמוֹרְנָה" },
    },
  },
  {
    infinitive: "לפתוח",
    infinitiveNikud: "לִפְתּוֹחַ",
    english: "To open",
    root: "פ.ת.ח",
    conjugations: {
      past: { "אני": "פָּתַחְתִּי", "אתה": "פָּתַחְתָּ", "את": "פָּתַחְתְּ", "הוא": "פָּתַח", "היא": "פָּתְחָה", "אנחנו": "פָּתַחְנוּ", "אתם": "פְּתַחְתֶּם", "אתן": "פְּתַחְתֶּן", "הם": "פָּתְחוּ", "הן": "פָּתְחוּ" },
      present: { "אני": "פּוֹתֵחַ", "אתה": "פּוֹתֵחַ", "את": "פּוֹתַחַת", "הוא": "פּוֹתֵחַ", "היא": "פּוֹתַחַת", "אנחנו": "פּוֹתְחִים", "אתם": "פּוֹתְחִים", "אתן": "פּוֹתְחוֹת", "הם": "פּוֹתְחִים", "הן": "פּוֹתְחוֹת" },
      future: { "אני": "אֶפְתַּח", "אתה": "תִּפְתַּח", "את": "תִּפְתְּחִי", "הוא": "יִפְתַּח", "היא": "תִּפְתַּח", "אנחנו": "נִפְתַּח", "אתם": "תִּפְתְּחוּ", "אתן": "תִּפְתַּחְנָה", "הם": "יִפְתְּחוּ", "הן": "תִּפְתַּחְנָה" },
    },
  },
];

// 45 everyday sentences (15 per tense) across 5 topics: עבודה, קניות, משפחה, נסיעות, שיחות.
const paalDrillSentences: DrillSentence[] = [
  // ===== Past (עבר) =====
  { id: "pa-past-1", tense: "past", topic: "עבודה", sentence: "אתמול אני ___ את הדוח לפני הישיבה.", correctForm: "כתבתי", correctFormNikud: "כָּתַבְתִּי", options: ["כתבתי", "כותב", "אכתוב", "כתב"], optionsNikud: ["כָּתַבְתִּי", "כּוֹתֵב", "אֶכְתּוֹב", "כָּתַב"], correctAnswer: 0, fullSentence: "אתמול אני כתבתי את הדוח לפני הישיבה.", english: "Yesterday I wrote the report before the meeting." },
  { id: "pa-past-2", tense: "past", topic: "עבודה", sentence: "המנהלת ___ מהעובדים לסיים את הפרויקט בזמן.", correctForm: "דרשה", correctFormNikud: "דָּרְשָׁה", options: ["דרשה", "דורשת", "תדרוש", "דרשתי"], optionsNikud: ["דָּרְשָׁה", "דּוֹרֶשֶׁת", "תִּדְרוֹשׁ", "דָּרַשְׁתִּי"], correctAnswer: 0, fullSentence: "המנהלת דרשה מהעובדים לסיים את הפרויקט בזמן.", english: "The manager demanded that the employees finish the project on time." },
  { id: "pa-past-3", tense: "past", topic: "עבודה", sentence: "הם ___ מועמד חדש לתפקיד אחרי ראיונות רבים.", correctForm: "בחרו", correctFormNikud: "בָּחֲרוּ", options: ["בחרו", "בוחרים", "יבחרו", "בחרנו"], optionsNikud: ["בָּחֲרוּ", "בּוֹחֲרִים", "יִבְחֲרוּ", "בָּחַרְנוּ"], correctAnswer: 0, fullSentence: "הם בחרו מועמד חדש לתפקיד אחרי ראיונות רבים.", english: "They chose a new candidate for the position after many interviews." },
  { id: "pa-past-4", tense: "past", topic: "קניות", sentence: "אתמול אני ___ חולצה חדשה בקניון.", correctForm: "קניתי", correctFormNikud: "קָנִיתִי", options: ["קניתי", "קונה", "אקנה", "קנה"], optionsNikud: ["קָנִיתִי", "קוֹנֶה", "אֶקְנֶה", "קָנָה"], correctAnswer: 0, fullSentence: "אתמול אני קניתי חולצה חדשה בקניון.", english: "Yesterday I bought a new shirt at the mall." },
  { id: "pa-past-5", tense: "past", topic: "קניות", sentence: "היא ___ את המחירים לפני שהיא קנתה את זה.", correctForm: "בדקה", correctFormNikud: "בָּדְקָה", options: ["בדקה", "בודקת", "תבדוק", "בדקתי"], optionsNikud: ["בָּדְקָה", "בּוֹדֶקֶת", "תִּבְדּוֹק", "בָּדַקְתִּי"], correctAnswer: 0, fullSentence: "היא בדקה את המחירים לפני שהיא קנתה את זה.", english: "She checked the prices before she bought it." },
  { id: "pa-past-6", tense: "past", topic: "קניות", sentence: "אנחנו ___ מקום חנייה קרוב לחנות.", correctForm: "מצאנו", correctFormNikud: "מָצָאנוּ", options: ["מצאנו", "מוצאים", "נמצא", "מצאו"], optionsNikud: ["מָצָאנוּ", "מוֹצְאִים", "נִמְצָא", "מָצְאוּ"], correctAnswer: 0, fullSentence: "אנחנו מצאנו מקום חנייה קרוב לחנות.", english: "We found a parking spot close to the store." },
  { id: "pa-past-7", tense: "past", topic: "משפחה", sentence: "סבא וסבתא ___ בית קטן בגליל לפני שנים רבות.", correctForm: "בנו", correctFormNikud: "בָּנוּ", options: ["בנו", "בונים", "יבנו", "בנינו"], optionsNikud: ["בָּנוּ", "בּוֹנִים", "יִבְנוּ", "בָּנִינוּ"], correctAnswer: 0, fullSentence: "סבא וסבתא בנו בית קטן בגליל לפני שנים רבות.", english: "Grandpa and grandma built a small house in the Galilee many years ago." },
  { id: "pa-past-8", tense: "past", topic: "משפחה", sentence: "הילדים ___ הרבה בקיץ האחרון.", correctForm: "גדלו", correctFormNikud: "גָּדְלוּ", options: ["גדלו", "גדלים", "יגדלו", "גדלנו"], optionsNikud: ["גָּדְלוּ", "גְּדֵלִים", "יִגְדְּלוּ", "גָּדַלְנוּ"], correctAnswer: 0, fullSentence: "הילדים גדלו הרבה בקיץ האחרון.", english: "The kids grew a lot last summer." },
  { id: "pa-past-9", tense: "past", topic: "משפחה", sentence: "אתמול בערב אנחנו ___ בסרט ביחד בסלון.", correctForm: "צפינו", correctFormNikud: "צָפִינוּ", options: ["צפינו", "צופים", "נצפה", "צפו"], optionsNikud: ["צָפִינוּ", "צוֹפִים", "נִצְפֶּה", "צָפוּ"], correctAnswer: 0, fullSentence: "אתמול בערב אנחנו צפינו בסרט ביחד בסלון.", english: "Last night we watched a movie together in the living room." },
  { id: "pa-past-10", tense: "past", topic: "נסיעות", sentence: "בקיץ שעבר אנחנו ___ לצפון לשבוע שלם.", correctForm: "נסענו", correctFormNikud: "נָסַעְנוּ", options: ["נסענו", "נוסעים", "ניסע", "נסעו"], optionsNikud: ["נָסַעְנוּ", "נוֹסְעִים", "נִסַּע", "נָסְעוּ"], correctAnswer: 0, fullSentence: "בקיץ שעבר אנחנו נסענו לצפון לשבוע שלם.", english: "Last summer we drove up north for a whole week." },
  { id: "pa-past-11", tense: "past", topic: "נסיעות", sentence: "בטיול הוא ___ הרים גבוהים מהחלון.", correctForm: "ראה", correctFormNikud: "רָאָה", options: ["ראה", "רואה", "יראה", "ראיתי"], optionsNikud: ["רָאָה", "רוֹאֶה", "יִרְאֶה", "רָאִיתִי"], correctAnswer: 0, fullSentence: "בטיול הוא ראה הרים גבוהים מהחלון.", english: "On the trip he saw tall mountains from the window." },
  { id: "pa-past-12", tense: "past", topic: "נסיעות", sentence: "בתחנה המרכזית אני ___ את הרציף הנכון אחרי חיפוש קצר.", correctForm: "מצאתי", correctFormNikud: "מָצָאתִי", options: ["מצאתי", "מוצא", "אמצא", "מצא"], optionsNikud: ["מָצָאתִי", "מוֹצֵא", "אֶמְצָא", "מָצָא"], correctAnswer: 0, fullSentence: "בתחנה המרכזית אני מצאתי את הרציף הנכון אחרי חיפוש קצר.", english: "At the central station I found the right platform after a short search." },
  { id: "pa-past-13", tense: "past", topic: "שיחות", sentence: "אתמול הם ___ בי כשהיה לי יום קשה.", correctForm: "תמכו", correctFormNikud: "תָּמְכוּ", options: ["תמכו", "תומכים", "יתמכו", "תמכנו"], optionsNikud: ["תָּמְכוּ", "תּוֹמְכִים", "יִתְמְכוּ", "תָּמַכְנוּ"], correctAnswer: 0, fullSentence: "אתמול הם תמכו בי כשהיה לי יום קשה.", english: "Yesterday they supported me when I had a hard day." },
  { id: "pa-past-14", tense: "past", topic: "שיחות", sentence: "היא ___ לי סיפור קצר לפני השינה.", correctForm: "קראה", correctFormNikud: "קָרְאָה", options: ["קראה", "קוראת", "תקרא", "קראתי"], optionsNikud: ["קָרְאָה", "קוֹרֵאת", "תִּקְרָא", "קָרָאתִי"], correctAnswer: 0, fullSentence: "היא קראה לי סיפור קצר לפני השינה.", english: "She read me a short story before bed." },
  { id: "pa-past-15", tense: "past", topic: "שיחות", sentence: "אתמול הם ___ חדשות מדאיגות בטלוויזיה.", correctForm: "שמעו", correctFormNikud: "שָׁמְעוּ", options: ["שמעו", "שומעים", "ישמעו", "שמענו"], optionsNikud: ["שָׁמְעוּ", "שׁוֹמְעִים", "יִשְׁמְעוּ", "שָׁמַעְנוּ"], correctAnswer: 0, fullSentence: "אתמול הם שמעו חדשות מדאיגות בטלוויזיה.", english: "Yesterday they heard worrying news on TV." },

  // ===== Present (הווה) =====
  { id: "pa-pres-1", tense: "present", topic: "עבודה", sentence: "אני תמיד ___ את האימיילים שלי בבוקר.", correctForm: "בודק", correctFormNikud: "בּוֹדֵק", options: ["בודק", "בדקתי", "אבדוק", "בודקת"], optionsNikud: ["בּוֹדֵק", "בָּדַקְתִּי", "אֶבְדּוֹק", "בּוֹדֶקֶת"], correctAnswer: 0, fullSentence: "אני תמיד בודק את האימיילים שלי בבוקר.", english: "I always check my emails in the morning." },
  { id: "pa-pres-2", tense: "present", topic: "עבודה", sentence: "היא ___ דוחות כספיים בעבודה שלה.", correctForm: "כותבת", correctFormNikud: "כּוֹתֶבֶת", options: ["כותבת", "כתבה", "תכתוב", "כותב"], optionsNikud: ["כּוֹתֶבֶת", "כָּתְבָה", "תִּכְתּוֹב", "כּוֹתֵב"], correctAnswer: 0, fullSentence: "היא כותבת דוחות כספיים בעבודה שלה.", english: "She writes financial reports at her job." },
  { id: "pa-pres-3", tense: "present", topic: "עבודה", sentence: "אנחנו ___ פתרונות חדשים לבעיה כל הזמן.", correctForm: "מוצאים", correctFormNikud: "מוֹצְאִים", options: ["מוצאים", "מצאנו", "נמצא", "מוצאות"], optionsNikud: ["מוֹצְאִים", "מָצָאנוּ", "נִמְצָא", "מוֹצְאוֹת"], correctAnswer: 0, fullSentence: "אנחנו מוצאים פתרונות חדשים לבעיה כל הזמן.", english: "We keep finding new solutions to the problem." },
  { id: "pa-pres-4", tense: "present", topic: "קניות", sentence: "אני ___ תמיד את המחיר לפני שאני קונה.", correctForm: "בודק", correctFormNikud: "בּוֹדֵק", options: ["בודק", "בדקתי", "אבדוק", "בודקת"], optionsNikud: ["בּוֹדֵק", "בָּדַקְתִּי", "אֶבְדּוֹק", "בּוֹדֶקֶת"], correctAnswer: 0, fullSentence: "אני בודק תמיד את המחיר לפני שאני קונה.", english: "I always check the price before I buy." },
  { id: "pa-pres-5", tense: "present", topic: "קניות", sentence: "הם ___ ירקות טריים בשוק כל שבוע.", correctForm: "קונים", correctFormNikud: "קוֹנִים", options: ["קונים", "קנו", "יקנו", "קונות"], optionsNikud: ["קוֹנִים", "קָנוּ", "יִקְנוּ", "קוֹנוֹת"], correctAnswer: 0, fullSentence: "הם קונים ירקות טריים בשוק כל שבוע.", english: "They buy fresh vegetables at the market every week." },
  { id: "pa-pres-6", tense: "present", topic: "קניות", sentence: "היא ___ בין שתי חנויות לפני שהיא מחליטה.", correctForm: "בוחרת", correctFormNikud: "בּוֹחֶרֶת", options: ["בוחרת", "בחרה", "תבחר", "בוחר"], optionsNikud: ["בּוֹחֶרֶת", "בָּחֲרָה", "תִּבְחַר", "בּוֹחֵר"], correctAnswer: 0, fullSentence: "היא בוחרת בין שתי חנויות לפני שהיא מחליטה.", english: "She chooses between two stores before she decides." },
  { id: "pa-pres-7", tense: "present", topic: "משפחה", sentence: "הילדים ___ מהר מאוד בגיל הזה.", correctForm: "גדלים", correctFormNikud: "גְּדֵלִים", options: ["גדלים", "גדלו", "יגדלו", "גדלות"], optionsNikud: ["גְּדֵלִים", "גָּדְלוּ", "יִגְדְּלוּ", "גְּדֵלוֹת"], correctAnswer: 0, fullSentence: "הילדים גדלים מהר מאוד בגיל הזה.", english: "The kids grow very fast at this age." },
  { id: "pa-pres-8", tense: "present", topic: "משפחה", sentence: "אנחנו ___ סרטים ביחד כל יום שישי.", correctForm: "צופים", correctFormNikud: "צוֹפִים", options: ["צופים", "צפינו", "נצפה", "צופות"], optionsNikud: ["צוֹפִים", "צָפִינוּ", "נִצְפֶּה", "צוֹפוֹת"], correctAnswer: 0, fullSentence: "אנחנו צופים בסרטים ביחד כל יום שישי.", english: "We watch movies together every Friday." },
  { id: "pa-pres-9", tense: "present", topic: "משפחה", sentence: "סבא ___ מכתבים לנכדים שלו כל חודש.", correctForm: "כותב", correctFormNikud: "כּוֹתֵב", options: ["כותב", "כתב", "יכתוב", "כותבת"], optionsNikud: ["כּוֹתֵב", "כָּתַב", "יִכְתּוֹב", "כּוֹתֶבֶת"], correctAnswer: 0, fullSentence: "סבא כותב מכתבים לנכדים שלו כל חודש.", english: "Grandpa writes letters to his grandchildren every month." },
  { id: "pa-pres-10", tense: "present", topic: "נסיעות", sentence: "אנחנו ___ לחוף הים כל קיץ.", correctForm: "נוסעים", correctFormNikud: "נוֹסְעִים", options: ["נוסעים", "נסענו", "ניסע", "נוסעות"], optionsNikud: ["נוֹסְעִים", "נָסַעְנוּ", "נִסַּע", "נוֹסְעוֹת"], correctAnswer: 0, fullSentence: "אנחנו נוסעים לחוף הים כל קיץ.", english: "We go to the beach every summer." },
  { id: "pa-pres-11", tense: "present", topic: "נסיעות", sentence: "הוא ___ הרים גבוהים מהחלון של הרכבת.", correctForm: "רואה", correctFormNikud: "רוֹאֶה", options: ["רואה", "ראה", "יראה", "רואים"], optionsNikud: ["רוֹאֶה", "רָאָה", "יִרְאֶה", "רוֹאִים"], correctAnswer: 0, fullSentence: "הוא רואה הרים גבוהים מהחלון של הרכבת.", english: "He sees tall mountains from the train window." },
  { id: "pa-pres-12", tense: "present", topic: "נסיעות", sentence: "היא ___ את המפה לפני כל נסיעה.", correctForm: "בודקת", correctFormNikud: "בּוֹדֶקֶת", options: ["בודקת", "בדקה", "תבדוק", "בודק"], optionsNikud: ["בּוֹדֶקֶת", "בָּדְקָה", "תִּבְדּוֹק", "בּוֹדֵק"], correctAnswer: 0, fullSentence: "היא בודקת את המפה לפני כל נסיעה.", english: "She checks the map before every trip." },
  { id: "pa-pres-13", tense: "present", topic: "שיחות", sentence: "אני לא ___ מה שאתה אומר.", correctForm: "שומע", correctFormNikud: "שׁוֹמֵעַ", options: ["שומע", "שמעתי", "אשמע", "שומעת"], optionsNikud: ["שׁוֹמֵעַ", "שָׁמַעְתִּי", "אֶשְׁמַע", "שׁוֹמַעַת"], correctAnswer: 0, fullSentence: "אני לא שומע מה שאתה אומר.", english: "I can't hear what you're saying." },
  { id: "pa-pres-14", tense: "present", topic: "שיחות", sentence: "הם ___ אחד בשני מאוד.", correctForm: "תומכים", correctFormNikud: "תּוֹמְכִים", options: ["תומכים", "תמכו", "יתמכו", "תומכות"], optionsNikud: ["תּוֹמְכִים", "תָּמְכוּ", "יִתְמְכוּ", "תּוֹמְכוֹת"], correctAnswer: 0, fullSentence: "הם תומכים אחד בשני מאוד.", english: "They support each other a lot." },
  { id: "pa-pres-15", tense: "present", topic: "שיחות", sentence: "היא ___ לי סיפורים כל ערב.", correctForm: "קוראת", correctFormNikud: "קוֹרֵאת", options: ["קוראת", "קראה", "תקרא", "קורא"], optionsNikud: ["קוֹרֵאת", "קָרְאָה", "תִּקְרָא", "קוֹרֵא"], correctAnswer: 0, fullSentence: "היא קוראת לי סיפורים כל ערב.", english: "She reads me stories every evening." },

  // ===== Future (עתיד) =====
  { id: "pa-fut-1", tense: "future", topic: "עבודה", sentence: "מחר אני ___ את הדוח החדש.", correctForm: "אכתוב", correctFormNikud: "אֶכְתּוֹב", options: ["אכתוב", "כתבתי", "כותב", "יכתוב"], optionsNikud: ["אֶכְתּוֹב", "כָּתַבְתִּי", "כּוֹתֵב", "יִכְתּוֹב"], correctAnswer: 0, fullSentence: "מחר אני אכתוב את הדוח החדש.", english: "Tomorrow I will write the new report." },
  { id: "pa-fut-2", tense: "future", topic: "עבודה", sentence: "היא ___ בין שתי הצעות עבודה.", correctForm: "תבחר", correctFormNikud: "תִּבְחַר", options: ["תבחר", "בחרה", "בוחרת", "יבחר"], optionsNikud: ["תִּבְחַר", "בָּחֲרָה", "בּוֹחֶרֶת", "יִבְחַר"], correctAnswer: 0, fullSentence: "היא תבחר בין שתי הצעות עבודה.", english: "She will choose between two job offers." },
  { id: "pa-fut-3", tense: "future", topic: "עבודה", sentence: "אנחנו ___ פתרון לבעיה השבוע.", correctForm: "נמצא", correctFormNikud: "נִמְצָא", options: ["נמצא", "מצאנו", "מוצאים", "ימצא"], optionsNikud: ["נִמְצָא", "מָצָאנוּ", "מוֹצְאִים", "יִמְצָא"], correctAnswer: 0, fullSentence: "אנחנו נמצא פתרון לבעיה השבוע.", english: "We will find a solution to the problem this week." },
  { id: "pa-fut-4", tense: "future", topic: "קניות", sentence: "מחר אני ___ מתנה ליום ההולדת שלה.", correctForm: "אקנה", correctFormNikud: "אֶקְנֶה", options: ["אקנה", "קניתי", "קונה", "יקנה"], optionsNikud: ["אֶקְנֶה", "קָנִיתִי", "קוֹנֶה", "יִקְנֶה"], correctAnswer: 0, fullSentence: "מחר אני אקנה מתנה ליום ההולדת שלה.", english: "Tomorrow I will buy a gift for her birthday." },
  { id: "pa-fut-5", tense: "future", topic: "קניות", sentence: "הוא ___ את המחיר לפני שהוא יקנה.", correctForm: "יבדוק", correctFormNikud: "יִבְדּוֹק", options: ["יבדוק", "בדק", "בודק", "תבדוק"], optionsNikud: ["יִבְדּוֹק", "בָּדַק", "בּוֹדֵק", "תִּבְדּוֹק"], correctAnswer: 0, fullSentence: "הוא יבדוק את המחיר לפני שהוא יקנה.", english: "He will check the price before he buys." },
  { id: "pa-fut-6", tense: "future", topic: "קניות", sentence: "הם ___ את המוצר הכי טוב בחנות.", correctForm: "יבחרו", correctFormNikud: "יִבְחֲרוּ", options: ["יבחרו", "בחרו", "בוחרים", "תבחרו"], optionsNikud: ["יִבְחֲרוּ", "בָּחֲרוּ", "בּוֹחֲרִים", "תִּבְחֲרוּ"], correctAnswer: 0, fullSentence: "הם יבחרו את המוצר הכי טוב בחנות.", english: "They will choose the best product in the store." },
  { id: "pa-fut-7", tense: "future", topic: "משפחה", sentence: "בשנה הבאה הילד ___ עוד קצת.", correctForm: "יגדל", correctFormNikud: "יִגְדַּל", options: ["יגדל", "גדל", "תגדל", "יגדלו"], optionsNikud: ["יִגְדַּל", "גָּדַל", "תִּגְדַּל", "יִגְדְּלוּ"], correctAnswer: 0, fullSentence: "בשנה הבאה הילד יגדל עוד קצת.", english: "Next year the child will grow a bit more." },
  { id: "pa-fut-8", tense: "future", topic: "משפחה", sentence: "אנחנו ___ סרט חדש בסוף השבוע.", correctForm: "נצפה", correctFormNikud: "נִצְפֶּה", options: ["נצפה", "צפינו", "צופים", "יצפו"], optionsNikud: ["נִצְפֶּה", "צָפִינוּ", "צוֹפִים", "יִצְפּוּ"], correctAnswer: 0, fullSentence: "אנחנו נצפה בסרט חדש בסוף השבוע.", english: "We will watch a new movie this weekend." },
  { id: "pa-fut-9", tense: "future", topic: "משפחה", sentence: "סבתא ___ לנו סיפור לפני השינה.", correctForm: "תקרא", correctFormNikud: "תִּקְרָא", options: ["תקרא", "קראה", "קוראת", "יקרא"], optionsNikud: ["תִּקְרָא", "קָרְאָה", "קוֹרֵאת", "יִקְרָא"], correctAnswer: 0, fullSentence: "סבתא תקרא לנו סיפור לפני השינה.", english: "Grandma will read us a story before bed." },
  { id: "pa-fut-10", tense: "future", topic: "נסיעות", sentence: "בקיץ הבא אנחנו ___ לאילת.", correctForm: "ניסע", correctFormNikud: "נִסַּע", options: ["ניסע", "נסענו", "נוסעים", "ייסע"], optionsNikud: ["נִסַּע", "נָסַעְנוּ", "נוֹסְעִים", "יִסַּע"], correctAnswer: 0, fullSentence: "בקיץ הבא אנחנו ניסע לאילת.", english: "Next summer we will drive to Eilat." },
  { id: "pa-fut-11", tense: "future", topic: "נסיעות", sentence: "הם ___ הרים ונהרות בטיול הבא.", correctForm: "יראו", correctFormNikud: "יִרְאוּ", options: ["יראו", "ראו", "רואים", "תראו"], optionsNikud: ["יִרְאוּ", "רָאוּ", "רוֹאִים", "תִּרְאוּ"], correctAnswer: 0, fullSentence: "הם יראו הרים ונהרות בטיול הבא.", english: "They will see mountains and rivers on the next trip." },
  { id: "pa-fut-12", tense: "future", topic: "נסיעות", sentence: "היא ___ מקום חדש לבקר בו.", correctForm: "תמצא", correctFormNikud: "תִּמְצָא", options: ["תמצא", "מצאה", "מוצאת", "ימצא"], optionsNikud: ["תִּמְצָא", "מָצְאָה", "מוֹצֵאת", "יִמְצָא"], correctAnswer: 0, fullSentence: "היא תמצא מקום חדש לבקר בו.", english: "She will find a new place to visit." },
  { id: "pa-fut-13", tense: "future", topic: "שיחות", sentence: "אני ___ לך תמיד, גם כשקשה.", correctForm: "אתמוך", correctFormNikud: "אֶתְמוֹךְ", options: ["אתמוך", "תמכתי", "תומך", "יתמוך"], optionsNikud: ["אֶתְמוֹךְ", "תָּמַכְתִּי", "תּוֹמֵךְ", "יִתְמוֹךְ"], correctAnswer: 0, fullSentence: "אני אתמוך לך תמיד, גם כשקשה.", english: "I will always support you, even when it's hard." },
  { id: "pa-fut-14", tense: "future", topic: "שיחות", sentence: "מתי אתם ___ על התוכנית החדשה?", correctForm: "תשמעו", correctFormNikud: "תִּשְׁמְעוּ", options: ["תשמעו", "שמעתם", "שומעים", "ישמעו"], optionsNikud: ["תִּשְׁמְעוּ", "שְׁמַעְתֶּם", "שׁוֹמְעִים", "יִשְׁמְעוּ"], correctAnswer: 0, fullSentence: "מתי אתם תשמעו על התוכנית החדשה?", english: "When will you hear about the new plan?" },
  { id: "pa-fut-15", tense: "future", topic: "שיחות", sentence: "הוא ___ ממני תשובה ברורה מחר.", correctForm: "ידרוש", correctFormNikud: "יִדְרוֹשׁ", options: ["ידרוש", "דרש", "דורש", "תדרוש"], optionsNikud: ["יִדְרוֹשׁ", "דָּרַשׁ", "דּוֹרֵשׁ", "תִּדְרוֹשׁ"], correctAnswer: 0, fullSentence: "הוא ידרוש ממני תשובה ברורה מחר.", english: "He will demand a clear answer from me tomorrow." },
];

export const paalDrillData: BinyanDrillData = {
  binyanKey: "paal",
  binyanLabel: "פעל (קל)",
  binyanLabelNikud: "פָּעַל",
  binyanDescription: "22 פעלים שכיחים בבניין פעל (קל), בשלושה זמנים - עבר, הווה ועתיד. כולל כמה פעלים לא סדירים כמו ללכת, לראות ולעשות.",
  verbs: paalDrillVerbs,
  sentences: paalDrillSentences,
};
