import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Search, Flame, ArrowRight, ArrowLeft } from "lucide-react";
import type { SetStateAction, Dispatch } from "react";
import menuText from "@/i18n/menu";

const heeboStyle = `@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');`;

function updateStreak(): number {
  try {
    const stored = localStorage.getItem("grammify_streak");
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (!stored) {
      localStorage.setItem("grammify_streak", JSON.stringify({ count: 1, lastDate: today }));
      return 1;
    }
    const { count, lastDate } = JSON.parse(stored);
    if (lastDate === today) return count;
    if (lastDate === yesterday) {
      localStorage.setItem("grammify_streak", JSON.stringify({ count: count + 1, lastDate: today }));
      return count + 1;
    }
    localStorage.setItem("grammify_streak", JSON.stringify({ count: 1, lastDate: today }));
    return 1;
  } catch { return 0; }
}

interface IndexMainMenuProps {
  lang: "he" | "en";
  setLang: (lang: "he" | "en") => void;
  setShowLinkingWords: (b: boolean) => void;
  setShowPronounsMenu: (b: boolean) => void;
  setShowPossessivePronouns: (b: boolean) => void;
  setShowQuestionnaire: (b: boolean) => void;
  setSelectedPractice: (val: null | "verb" | "nounAdj" | "household") => void;
  setSelectedTextComp: Dispatch<SetStateAction<any>>;
  setShowEverydayHebrew: (b: boolean) => void;
  setShowVerbToBePresentation: (b: boolean) => void;
  setShowDaysAndPlacesVocab: (b: boolean) => void;
  setShowQuestionWords: (b: boolean) => void;
  setShowOddOneOut: (b: boolean) => void;
  setShowEmotions: (b: boolean) => void;
  setShowLinkingWordsLevels: (b: boolean) => void;
  setShowVerbMemoryGame: (b: boolean) => void;
  setShowColorsAndFruits: (b: boolean) => void;
  setShowVerbPatternsMenu: (b: boolean) => void;
  setShowListeningPractice: (b: boolean) => void;
  setShowConversationRoulette: (b: boolean) => void;
  setShowSentenceOrder: (b: boolean) => void;
  setShowPrepositionSuffix: (b: boolean) => void;
  setShowHebrewSlang: (b: boolean) => void;
  setShowRolePlay: (b: boolean) => void;
  setShowConnectorCorrection: (b: boolean) => void;
  setShowPronounSuffixReflexive: (b: boolean) => void;
  setShowBeginnerHebrew: (b: boolean) => void;
  setShowNumbers: (b: boolean) => void;
  setShowMonths: (b: boolean) => void;
  setShowAdjectives: (b: boolean) => void;
  setShowCityVocab: (b: boolean) => void;
  setShowShopping: (b: boolean) => void;
  setShowFamily: (b: boolean) => void;
  setShowQuickQuiz: (b: boolean) => void;
  setShowGenderFlip: (b: boolean) => void;
  setShowSongLyrics: (b: boolean) => void;
  setShowAlphabetCourse: (b: boolean) => void;
  setShowProfessions: (b: boolean) => void;
  setShowFoodDrinks: (b: boolean) => void;
  setShowWeather: (b: boolean) => void;
  setShowBodyHealth: (b: boolean) => void;
  setShowDialogueFlashcards: (b: boolean) => void;
  setShowOrdinalNumbers: (b: boolean) => void;
  setShowBinyanimInAction: (b: boolean) => void;
  setShowLiveTenseTable: (b: boolean) => void;
  setShowConjugationGenerator: (b: boolean) => void;
}

type HubKey = "foundations" | "grammar" | "pronouns" | "vocab" | "conversation" | "games" | "reading";

interface Hub {
  key: HubKey;
  emoji: string;
  label: string;
  desc: string;
  color: string;
}

interface MenuItem {
  emoji: string;
  label: string;
  hub: HubKey;
  level?: "beginner" | "intermediate" | "advanced";
  action: () => void;
}

function MenuItemCard({ emoji, label, onClick, index, visible }: { emoji: string; label: string; onClick: () => void; index: number; visible: boolean }) {
  return (
    <button onClick={onClick}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.4s ease ${index * 60}ms, transform 0.4s ease ${index * 60}ms`, fontFamily: "'Heebo', sans-serif", minHeight: 96 }}
      className="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 hover:bg-purple-50 active:scale-95 transition-all cursor-pointer w-full text-center">
      <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{emoji}</span>
      <span className="text-sm font-medium text-gray-700 leading-tight">{label}</span>
    </button>
  );
}

export default function IndexMainMenu(props: IndexMainMenuProps) {
  const {
    lang, setLang,
    setShowLinkingWords, setShowPronounsMenu, setShowPossessivePronouns,
    setShowQuestionnaire, setSelectedPractice, setSelectedTextComp,
    setShowEverydayHebrew, setShowVerbToBePresentation, setShowDaysAndPlacesVocab,
    setShowQuestionWords, setShowOddOneOut, setShowEmotions, setShowLinkingWordsLevels,
    setShowVerbMemoryGame, setShowColorsAndFruits, setShowVerbPatternsMenu,
    setShowListeningPractice, setShowConversationRoulette, setShowSentenceOrder,
    setShowPrepositionSuffix, setShowHebrewSlang, setShowRolePlay,
    setShowConnectorCorrection, setShowPronounSuffixReflexive, setShowBeginnerHebrew,
    setShowNumbers, setShowMonths, setShowAdjectives, setShowCityVocab, setShowShopping,
    setShowFamily, setShowQuickQuiz, setShowGenderFlip, setShowSongLyrics, setShowAlphabetCourse,
    setShowProfessions, setShowFoodDrinks, setShowWeather, setShowBodyHealth,
    setShowDialogueFlashcards, setShowOrdinalNumbers, setShowBinyanimInAction,
    setShowLiveTenseTable, setShowConjugationGenerator,
  } = props;

  const t = menuText[lang];
  const isHe = lang === "he";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHub, setActiveHub] = useState<HubKey | null>(null);
  const [streak, setStreak] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    setStreak(updateStreak());
    const timer = setTimeout(() => setCardsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const allItems: MenuItem[] = useMemo(() => [
    // Foundations
    { emoji: "🔤", label: isHe ? "אלפבית" : "Alphabet", hub: "foundations", level: "beginner", action: () => setShowAlphabetCourse(true) },
    { emoji: "🌱", label: isHe ? "עברית למתחילים" : "Beginner Hebrew", hub: "foundations", level: "beginner", action: () => setShowBeginnerHebrew(true) },
    { emoji: "📝", label: isHe ? "שאלון היכרות" : "Questionnaire", hub: "foundations", level: "beginner", action: () => setShowQuestionnaire(true) },
    { emoji: "🧠", label: isHe ? "פועל להיות" : "Verb To Be", hub: "foundations", level: "beginner", action: () => setShowVerbToBePresentation(true) },
    { emoji: "❓", label: isHe ? "מילות שאלה" : "Question Words", hub: "foundations", level: "beginner", action: () => setShowQuestionWords(true) },

    // Grammar & Verbs
    { emoji: "📚", label: isHe ? "בניינים" : "Verb Patterns", hub: "grammar", level: "intermediate", action: () => setShowVerbPatternsMenu(true) },
    { emoji: "🔄", label: isHe ? "בניינים בפעולה" : "Binyanim in Action", hub: "grammar", level: "advanced", action: () => setShowBinyanimInAction(true) },
    { emoji: "📋", label: isHe ? "טבלת זמנים חיה" : "Live Tense Table", hub: "grammar", level: "intermediate", action: () => setShowLiveTenseTable(true) },
    { emoji: "🧮", label: isHe ? "מחולל הטיות" : "Conjugation Generator", hub: "grammar", level: "intermediate", action: () => setShowConjugationGenerator(true) },
    { emoji: "✏️", label: isHe ? "תרגול פעלים" : "Verb Practice", hub: "grammar", level: "intermediate", action: () => setSelectedPractice("verb") },
    { emoji: "📜", label: isHe ? "תרגול משפטים" : "Sentence Order", hub: "grammar", level: "intermediate", action: () => setShowSentenceOrder(true) },
    { emoji: "🧩", label: isHe ? "שמות עצם + תואר" : "Nouns + Adjectives", hub: "grammar", level: "intermediate", action: () => setSelectedPractice("nounAdj") },
    { emoji: "🛠️", label: isHe ? "תיקון מילות קישור" : "Connector Correction", hub: "grammar", level: "advanced", action: () => setShowConnectorCorrection(true) },
    { emoji: "🔁", label: isHe ? "החלפת מין" : "Gender Flip", hub: "grammar", level: "intermediate", action: () => setShowGenderFlip(true) },

    // Pronouns & Connectors
    { emoji: "🧑‍🏫", label: isHe ? "שמות גוף" : "Pronouns", hub: "pronouns", level: "beginner", action: () => setShowPronounsMenu(true) },
    { emoji: "👤", label: isHe ? "מילות שייכות" : "Possessive Pronouns", hub: "pronouns", level: "beginner", action: () => setShowPossessivePronouns(true) },
    { emoji: "🪞", label: isHe ? "כינויי גוף רפלקסיביים" : "Reflexive Pronouns", hub: "pronouns", level: "advanced", action: () => setShowPronounSuffixReflexive(true) },
    { emoji: "🪡", label: isHe ? "סיומות מילות יחס" : "Preposition Suffixes", hub: "pronouns", level: "advanced", action: () => setShowPrepositionSuffix(true) },
    { emoji: "🔗", label: isHe ? "מילות קישור" : "Linking Words", hub: "pronouns", level: "beginner", action: () => setShowLinkingWords(true) },
    { emoji: "📊", label: isHe ? "מילות קישור - רמות" : "Linking Words Levels", hub: "pronouns", level: "intermediate", action: () => setShowLinkingWordsLevels(true) },

    // Vocab
    { emoji: "📅", label: isHe ? "ימים ומקומות" : "Days & Places", hub: "vocab", level: "beginner", action: () => setShowDaysAndPlacesVocab(true) },
    { emoji: "😊", label: isHe ? "רגשות" : "Emotions", hub: "vocab", level: "beginner", action: () => setShowEmotions(true) },
    { emoji: "💪", label: isHe ? "גוף ובריאות" : "Body & Health", hub: "vocab", level: "beginner", action: () => setShowBodyHealth(true) },
    { emoji: "🎨", label: isHe ? "צבעים ופירות" : "Colors & Fruits", hub: "vocab", level: "beginner", action: () => setShowColorsAndFruits(true) },
    { emoji: "🔢", label: isHe ? "מספרים" : "Numbers", hub: "vocab", level: "beginner", action: () => setShowNumbers(true) },
    { emoji: "🥇", label: isHe ? "מספרים סודרים" : "Ordinal Numbers", hub: "vocab", level: "intermediate", action: () => setShowOrdinalNumbers(true) },
    { emoji: "🗓️", label: isHe ? "חודשים" : "Months", hub: "vocab", level: "beginner", action: () => setShowMonths(true) },
    { emoji: "👨‍👩‍👧", label: isHe ? "משפחה" : "Family", hub: "vocab", level: "beginner", action: () => setShowFamily(true) },
    { emoji: "🍎", label: isHe ? "אוכל ושתייה" : "Food & Drinks", hub: "vocab", level: "beginner", action: () => setShowFoodDrinks(true) },
    { emoji: "👨‍⚕️", label: isHe ? "מקצועות" : "Professions", hub: "vocab", level: "intermediate", action: () => setShowProfessions(true) },
    { emoji: "☀️", label: isHe ? "מזג אוויר ועונות" : "Weather & Seasons", hub: "vocab", level: "beginner", action: () => setShowWeather(true) },
    { emoji: "🏙️", label: isHe ? "עיר" : "City", hub: "vocab", level: "beginner", action: () => setShowCityVocab(true) },
    { emoji: "🛒", label: isHe ? "קניות" : "Shopping", hub: "vocab", level: "beginner", action: () => setShowShopping(true) },
    { emoji: "✨", label: isHe ? "תארים" : "Adjectives", hub: "vocab", level: "beginner", action: () => setShowAdjectives(true) },

    // Conversation & Daily
    { emoji: "💬", label: isHe ? "עברית יומיומית" : "Everyday Hebrew", hub: "conversation", level: "beginner", action: () => setShowEverydayHebrew(true) },
    { emoji: "🎤", label: isHe ? "רולטת שיחה" : "Conversation Roulette", hub: "conversation", level: "advanced", action: () => setShowConversationRoulette(true) },
    { emoji: "🎭", label: isHe ? "משחקי תפקידים" : "Role Play", hub: "conversation", level: "advanced", action: () => setShowRolePlay(true) },
    { emoji: "🎧", label: isHe ? "האזנה" : "Listening", hub: "conversation", level: "intermediate", action: () => setShowListeningPractice(true) },
    { emoji: "🗣️", label: isHe ? "סלנג" : "Slang", hub: "conversation", level: "advanced", action: () => setShowHebrewSlang(true) },
    { emoji: "🎴", label: isHe ? "כרטיסי דיאלוג" : "Dialogue Flashcards", hub: "conversation", level: "intermediate", action: () => setShowDialogueFlashcards(true) },
    { emoji: "🎵", label: isHe ? "מילות שירים" : "Song Lyrics", hub: "conversation", level: "advanced", action: () => setShowSongLyrics(true) },

    // Games
    { emoji: "🎮", label: isHe ? "המוזר בחבורה" : "Odd One Out", hub: "games", level: "beginner", action: () => setShowOddOneOut(true) },
    { emoji: "🃏", label: isHe ? "משחק זיכרון פעלים" : "Verb Memory", hub: "games", level: "intermediate", action: () => setShowVerbMemoryGame(true) },
    { emoji: "💡", label: isHe ? "חידון מהיר" : "Quick Quiz", hub: "games", level: "beginner", action: () => setShowQuickQuiz(true) },

    // Reading
    { emoji: "🍔", label: isHe ? "אוכל - הבנת הנקרא" : "Food Reading", hub: "reading", level: "beginner", action: () => setSelectedTextComp("food-levels") },
    { emoji: "🍽️", label: isHe ? "הזמנת אוכל" : "Ordering Food", hub: "reading", level: "intermediate", action: () => setSelectedTextComp("food-order-medium") },
    { emoji: "🐶", label: isHe ? "חיות (קל)" : "Animals (Easy)", hub: "reading", level: "beginner", action: () => setSelectedTextComp("animals-easy") },
    { emoji: "📱", label: isHe ? "רשתות חברתיות" : "Social Media", hub: "reading", level: "intermediate", action: () => setSelectedTextComp("social-media") },
    { emoji: "🌍", label: isHe ? "מדינות" : "Countries", hub: "reading", level: "intermediate", action: () => setSelectedTextComp("countries-levels") },
    { emoji: "🎬", label: isHe ? "סדרות וסרטים" : "TV & Movies", hub: "reading", level: "intermediate", action: () => setSelectedTextComp("movies-series-levels") },
    { emoji: "🏖️", label: isHe ? "ים ובילוי" : "Beach & Fun", hub: "reading", level: "beginner", action: () => setSelectedTextComp("places-food-easy") },
    { emoji: "🏥", label: isHe ? "בית חולים" : "Hospital", hub: "reading", level: "intermediate", action: () => setSelectedTextComp("hospital") },
    { emoji: "✈️", label: isHe ? "שדה תעופה" : "Airport", hub: "reading", level: "intermediate", action: () => setSelectedTextComp("airport") },
    { emoji: "📰", label: isHe ? "חדשות" : "News", hub: "reading", level: "advanced", action: () => setSelectedTextComp("news") },
  ], [isHe]);

  const hubs: Hub[] = [
    { key: "foundations", emoji: "🌱", label: isHe ? "יסודות" : "Foundations", desc: isHe ? "אלפבית, מתחילים, פועל להיות" : "Alphabet, beginners, To Be", color: "from-green-100 to-emerald-50 border-green-200" },
    { key: "grammar", emoji: "📚", label: isHe ? "דקדוק ופעלים" : "Grammar & Verbs", desc: isHe ? "בניינים, זמנים, משפטים" : "Binyanim, tenses, sentences", color: "from-blue-100 to-indigo-50 border-blue-200" },
    { key: "pronouns", emoji: "🧑‍🏫", label: isHe ? "כינויים ומילות יחס" : "Pronouns & Connectors", desc: isHe ? "שייכות, רפלקסיבי, קישור" : "Possessive, reflexive, linking", color: "from-purple-100 to-fuchsia-50 border-purple-200" },
    { key: "vocab", emoji: "📖", label: isHe ? "אוצר מילים" : "Vocabulary", desc: isHe ? "משפחה, אוכל, מספרים, צבעים" : "Family, food, numbers, colors", color: "from-amber-100 to-orange-50 border-amber-200" },
    { key: "conversation", emoji: "💬", label: isHe ? "שיחה ויומיום" : "Conversation & Daily", desc: isHe ? "רולטה, תפקידים, האזנה, סלנג" : "Roulette, role-play, listening", color: "from-pink-100 to-rose-50 border-pink-200" },
    { key: "games", emoji: "🎮", label: isHe ? "משחקים" : "Games", desc: isHe ? "זיכרון, חידונים, אתגרים" : "Memory, quizzes, challenges", color: "from-cyan-100 to-sky-50 border-cyan-200" },
    { key: "reading", emoji: "📰", label: isHe ? "הבנת הנקרא" : "Reading", desc: isHe ? "טקסטים בנושאים שונים" : "Texts on various topics", color: "from-violet-100 to-purple-50 border-violet-200" },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allItems.filter(item => {
      const matchSearch = q === "" || item.label.toLowerCase().includes(q);
      const matchHub = !activeHub || item.hub === activeHub;
      // When searching, show across all hubs
      return q ? matchSearch : matchHub && matchSearch;
    });
  }, [allItems, activeHub, searchQuery]);

  const showHubGrid = !activeHub && searchQuery === "";
  const currentHub = hubs.find(h => h.key === activeHub);

  return (
    <div dir={isHe ? "rtl" : "ltr"} style={{ fontFamily: "'Heebo', sans-serif" }} className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <style>{heeboStyle}</style>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇮🇱</span>
              <h1 className="text-lg font-bold text-purple-700">
                {isHe ? "גרמיפיי באדי" : "Grammify Buddy"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                <Flame size={16} className="text-orange-500" />
                <span className="text-sm font-bold text-orange-600">{streak}</span>
                <span className="text-xs text-orange-400">{isHe ? "ימים" : "days"}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setLang(lang === "he" ? "en" : "he")} className="flex items-center gap-1 rounded-full text-xs px-3">
                <Globe size={14} />{lang === "he" ? "EN" : "עב"}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isHe ? "right-3" : "left-3"}`} />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder={isHe ? "חפש תרגיל..." : "Search exercises..."}
              className={`w-full bg-gray-50 border border-gray-200 rounded-full py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 ${isHe ? "pr-9 pl-4" : "pl-9 pr-4"}`} />
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-2">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveCategory(tab.key)}
                className={`flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === tab.key ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700"}`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {([
            { label: isHe ? "תרגילים" : "Total", value: allItems.length, color: "purple" },
            { label: isHe ? "מתחילים" : "Beginner", value: allItems.filter(i => i.level === "beginner").length, color: "green" },
            { label: isHe ? "רצף" : "Streak", value: streak, color: "orange" },
          ] as const).map((stat, i) => (
            <div key={i} style={{ opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? "translateY(0)" : "translateY(10px)", transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms` }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
              <div className={`text-xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={32} className="mx-auto mb-2 opacity-40" />
            <p>{isHe ? "לא נמצאו תרגילים" : "No exercises found"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-8">
            {filteredItems.map((item, i) => (
              <MenuItemCard key={item.label + i} emoji={item.emoji} label={item.label} onClick={item.action} index={i} visible={cardsVisible} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
