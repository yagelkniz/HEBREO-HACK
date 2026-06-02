import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Send, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Scenario {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  level: "מתחילים" | "בינוני" | "מתקדם";
  prompt: string;
  opening: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "144",
    emoji: "📞",
    title: "144 — מודיעין טלפוני",
    subtitle: "להתקשר ולבקש מספר טלפון של עסק",
    level: "בינוני",
    prompt: "You are a 144 (Israeli phone directory) operator named דנה. Slightly impatient, talks fast, asks for: שם העסק, עיר, ולפעמים רחוב. Sometimes you can't find it and offer alternatives. Sometimes you give the number digit-by-digit in Hebrew. Real Israeli call-center vibe.",
    opening: "מודיעין 144 שלום, דנה מדברת. את מי לחפש?",
  },
  {
    id: "kiosk",
    emoji: "🥤",
    title: "הקיוסק בפינה",
    subtitle: "לקנות שתייה, חטיף או כרטיס רב-קו",
    level: "מתחילים",
    prompt: "You are מוטי, the owner of a small קיוסק (corner kiosk) in Tel Aviv. Friendly but busy. You're often out of change ('אין לי עודף, יש משהו קטן?'), suggest other products, comment on the weather. Make the learner specify size (קטן/גדול), flavor, with/without ice.",
    opening: "אהלן! מה תרצה?",
  },
  {
    id: "taxi",
    emoji: "🚕",
    title: "מונית בתל אביב",
    subtitle: "להגיד לנהג לאן ולנהל סמול-טוק",
    level: "בינוני",
    prompt: "You are a chatty Tel Aviv taxi driver named אבי. Ask where they're going, suggest a route ('דרך אבן גבירול או דרך נמיר?'), complain about traffic, ask where they're from. Sometimes pretend you didn't hear the address — make them repeat clearly.",
    opening: "שלום, לאן נוסעים?",
  },
  {
    id: "shuk",
    emoji: "🍅",
    title: "בשוק הכרמל",
    subtitle: "לקנות פירות וירקות ולהתמקח",
    level: "בינוני",
    prompt: "You are a loud market vendor in שוק הכרמל selling fruits and vegetables. Shout your prices, push deals ('שלושה במאה!'), don't easily lower the price but eventually relent if pushed. Use words like 'אחי', 'בוא בוא', 'הכי טרי בשוק'.",
    opening: "בוא אחי! עגבניות הכי טריות, חמישה שקל קילו! מה לוקח?",
  },
  {
    id: "doctor",
    emoji: "🩺",
    title: "אצל הרופא",
    subtitle: "לתאר תסמינים ולהבין הוראות",
    level: "מתקדם",
    prompt: "You are דר' לוי, a calm GP at a קופת חולים clinic. Ask about symptoms, when it started, pain level 1-10, allergies. Eventually give a simple recommendation. Use medical-ish Hebrew but not too hard.",
    opening: "שלום, בבקשה שב. אז מה הביא אותך אליי היום?",
  },
  {
    id: "cafe",
    emoji: "☕",
    title: "בית קפה",
    subtitle: "להזמין קפה וארוחה",
    level: "מתחילים",
    prompt: "You are a casual Tel Aviv café waiter. Recite specials, ask 'הפוך / שחור / נמס?', 'חלב רגיל או שקדים?', 'משהו לאכול?'. Be slightly out of one item ('נגמר הסלמון, יש טונה').",
    opening: "היי, ברוך הבא. ישבת? קפה להתחיל?",
  },
];

type Msg = { role: "user" | "assistant"; content: string };

export default function LiveSimulation() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const startScenario = (s: Scenario) => {
    setScenario(s);
    setMessages([{ role: "assistant", content: s.opening }]);
  };

  const reset = () => {
    if (!scenario) return;
    setMessages([{ role: "assistant", content: scenario.opening }]);
    setInput("");
  };

  const send = async () => {
    if (!input.trim() || loading || !scenario) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/simulation-chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages,
          scenarioPrompt: scenario.prompt,
        }),
      });

      if (resp.status === 429) { toast.error("יותר מדי בקשות, נסה בעוד רגע"); setLoading(false); return; }
      if (resp.status === 402) { toast.error("נגמרו הקרדיטים של Lovable AI"); setLoading(false); return; }
      if (!resp.ok || !resp.body) { toast.error("שגיאה בחיבור"); setLoading(false); return; }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(data);
            const chunk = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              assistantText += chunk;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      if (assistantText) speakHebrew(assistantText);
    } catch (e) {
      console.error(e);
      toast.error("שגיאה");
    } finally {
      setLoading(false);
    }
  };

  if (!scenario) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                חזרה לתפריט
              </Button>
            </Link>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white gap-1 px-3 py-1">
              <Sparkles className="h-3 w-3" /> AI חי
            </Badge>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎭 סימולציה חיה
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto" style={{ lineHeight: 1.7 }}>
              דבר/י בעברית עם דמות ישראלית אמיתית. הדמות תאתגר אותך, תתעקש, ותכריח אותך להשתמש באוצר המילים שלמדת — בדיוק כמו בחיים.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCENARIOS.map((s) => (
              <Card
                key={s.id}
                onClick={() => startScenario(s)}
                className="p-6 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-2 hover:border-purple-300 bg-white/80 backdrop-blur"
              >
                <div className="text-5xl mb-3">{s.emoji}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3" style={{ lineHeight: 1.6 }}>
                  {s.subtitle}
                </p>
                <Badge variant="secondary">{s.level}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b p-3 md:p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <Button variant="outline" size="sm" onClick={() => { stopSpeech(); setScenario(null); setMessages([]); }} className="gap-1">
            <ArrowRight className="h-4 w-4" />
            תפריט
          </Button>
          <div className="text-center flex-1">
            <div className="font-bold text-sm md:text-base">{scenario.emoji} {scenario.title}</div>
            <div className="text-xs text-muted-foreground">{scenario.subtitle}</div>
          </div>
          <Button variant="outline" size="sm" onClick={reset} className="gap-1">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  m.role === "user"
                    ? "bg-blue-500 text-white rounded-tr-2xl rounded-tl-md"
                    : "bg-white border-2 border-purple-200 rounded-tl-2xl rounded-tr-md"
                }`}
                style={{ lineHeight: 1.7, fontSize: "18px", whiteSpace: "pre-wrap" }}
              >
                {m.content || <span className="opacity-50">...</span>}
                {m.role === "assistant" && m.content && (
                  <button
                    onClick={() => speakHebrew(m.content)}
                    className="ml-2 inline-flex items-center text-purple-600 hover:text-purple-800"
                    aria-label="השמע"
                  >
                    <Volume2 className="h-4 w-4 inline" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-end">
              <div className="bg-white border-2 border-purple-200 rounded-2xl px-4 py-3 text-muted-foreground">
                כותב...
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="sticky bottom-0 bg-white/95 backdrop-blur border-t p-3 md:p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="תכתוב בעברית..."
            dir="rtl"
            disabled={loading}
            className="text-base md:text-lg h-12"
            style={{ fontSize: "18px" }}
          />
          <Button onClick={send} disabled={loading || !input.trim()} size="lg" className="h-12 px-5 bg-gradient-to-r from-purple-600 to-pink-600">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
