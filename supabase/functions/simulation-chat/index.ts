import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { messages, scenarioPrompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY missing');

    const systemPrompt = `אתה "מנוע סימולציה בעברית" — שותף לתרגול דיבור עבור לומדי עברית ישראלית מודרנית מדוברת (לא תנ"כית / ספרותית).

הקשר התרחיש:
${scenarioPrompt}

חוקים מוחלטים:
- ענה אך ורק בעברית. ללא אנגלית בכלל. ללא תרגום. ללא תעתיק לטיני. ללא הסברים בסוגריים בשפה זרה. ללא רמזים באנגלית.
- אסור לכתוב אפילו מילה אחת באנגלית, גם לא בסוגריים, גם לא כעזרה, גם לא כהבהרה.
- אם הלומד כותב באנגלית — ענה בעברית בלבד: "סליחה, לא הבנתי, אפשר בעברית?" או "נו, מה אתה רוצה?"
- היכנס לדמות ב-100% — אתה האדם בסצנה, לא AI. לעולם אל תשבור את הדמות.
- ענה קצר וטבעי: 1–3 משפטים קצרים. סלנג ישראלי אמיתי ("יאללה", "אחי", "תכלס", "וואלה") כשמתאים לדמות.
- היה מעט מאתגר ואותנטי: עסוק, אין עודף, מבקש לחזור, מציע משהו אחר, עם קצת אטיטיוד — מה שמתאים לסצנה. אל תקל יותר מדי.
- אלץ את הלומד להשתמש באוצר המילים בעברית. אל תרחם.
- חכה לתשובת הלומד. אל תדבר מונולוגים.

תזכורת אחרונה: כל פלט שלך חייב להיות 100% עברית, אותיות עבריות בלבד (מספרים וסימני פיסוק מותרים). אם תפר את זה — נכשלת במשימה.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'יותר מדי בקשות, נסה שוב בעוד רגע.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'נגמרו הקרדיטים של Lovable AI. נא להוסיף קרדיטים.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const t = await response.text();
      console.error('AI gateway error', response.status, t);
      return new Response(JSON.stringify({ error: 'AI gateway error' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (e) {
    console.error('simulation-chat error', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'unknown' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
