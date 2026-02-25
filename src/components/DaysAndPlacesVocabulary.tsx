
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2 } from "lucide-react";
import { speakHebrew } from "@/lib/speakHebrew";

interface VocabularyWord {
  hebrew: string;
  transliteration: string;
  english: string;
}

interface VocabularyCategory {
  name: string;
  words: VocabularyWord[];
}

interface DaysAndPlacesVocabularyProps {
  onBack: () => void;
}

export default function DaysAndPlacesVocabulary({ onBack }: DaysAndPlacesVocabularyProps) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const vocabularyData: VocabularyCategory[] = [
    {
      name: "Days and Week",
      words: [
        { hebrew: "יום ראשון", transliteration: "yom rishon", english: "Sunday" },
        { hebrew: "יום שני", transliteration: "yom sheni", english: "Monday" },
        { hebrew: "יום שלישי", transliteration: "yom shlishi", english: "Tuesday" },
        { hebrew: "יום רביעי", transliteration: "yom revi'i", english: "Wednesday" },
        { hebrew: "יום חמישי", transliteration: "yom chamishi", english: "Thursday" },
        { hebrew: "יום שישי", transliteration: "yom shishi", english: "Friday" },
        { hebrew: "שבת", transliteration: "shabbat", english: "Saturday" },
        { hebrew: "שבוע", transliteration: "shavua", english: "week" },
        { hebrew: "יום", transliteration: "yom", english: "day" },
        { hebrew: "היום", transliteration: "hayom", english: "today" },
        { hebrew: "אתמול", transliteration: "etmol", english: "yesterday" },
        { hebrew: "מחר", transliteration: "machar", english: "tomorrow" }
      ]
    },
    {
      name: "Common Places",
      words: [
        { hebrew: "בית", transliteration: "bayit", english: "house/home" },
        { hebrew: "בית ספר", transliteration: "beit sefer", english: "school" },
        { hebrew: "בית חולים", transliteration: "beit cholim", english: "hospital" },
        { hebrew: "חנות", transliteration: "chanut", english: "shop/store" },
        { hebrew: "סופרמרקט", transliteration: "supermarket", english: "supermarket" },
        { hebrew: "מסעדה", transliteration: "mis'ada", english: "restaurant" },
        { hebrew: "פארק", transliteration: "park", english: "park" },
        { hebrew: "תחנת אוטובוס", transliteration: "tachanat autobus", english: "bus station" },
        { hebrew: "בנק", transliteration: "bank", english: "bank" },
        { hebrew: "דואר", transliteration: "do'ar", english: "post office" },
        { hebrew: "תיאטרון", transliteration: "te'atron", english: "theater" },
        { hebrew: "קולנוע", transliteration: "kolno'a", english: "cinema" },
        { hebrew: "חוף", transliteration: "chof", english: "beach" },
        { hebrew: "הר", transliteration: "har", english: "mountain" },
        { hebrew: "עיר", transliteration: "ir", english: "city" }
      ]
    }
  ];

  const handlePronunciation = (text: string) => speakHebrew(text, 0.8);

  if (currentCategory) {
    const category = vocabularyData.find(cat => cat.name === currentCategory);
    if (!category) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentCategory(null)}
              className="mr-4"
            >
              ⬅ Back to Categories
            </Button>
            <h1 className="text-3xl font-bold text-primary">{category.name}</h1>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.words.map((word, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-2xl font-bold text-right" dir="rtl">
                        {word.hebrew}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePronunciation(word.hebrew)}
                        className="p-1 h-8 w-8"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-lg text-gray-600 italic">
                      {word.transliteration}
                    </p>
                    <p className="text-lg font-medium text-blue-700">
                      {word.english}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4"
          >
            ⬅ Back to Main Menu
          </Button>
          <h1 className="text-3xl font-bold text-primary">Days and Places Vocabulary</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {vocabularyData.map((category, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentCategory(category.name)}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-center text-blue-700">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 mb-4">
                  {category.words.length} words to learn
                </p>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Start Learning →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
