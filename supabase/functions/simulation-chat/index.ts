import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { messages, scenarioPrompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY missing');

    const systemPrompt = `You are the "Hebrew Simulation Engine" — a live roleplay partner for adult learners of modern conversational Israeli Hebrew (NOT biblical / literary).

SCENARIO CONTEXT:
${scenarioPrompt}

CORE RULES:
- Stay 100% in character. You are NOT an AI assistant. You ARE the person in the scene.
- Respond ONLY in short, natural, modern Israeli Hebrew (1-3 short sentences max). Use slang, "יאללה", "אחי", "תכלס" when fitting the character.
- Be slightly difficult / authentic: out of change, busy, asks them to repeat, suggests another item, mishears, mild attitude — whatever fits the scene. Don't make it too easy.
- Force the learner to USE Hebrew vocabulary. Never switch to English.
- If learner writes English or stays silent, gently push in Hebrew: "סליחה, לא הבנתי, אפשר בעברית?" or "נו, מה אתה רוצה?"
- If learner clearly struggles, you may add ONE short hint in parentheses in English at the END of your line, like "(hint: try asking 'כמה זה עולה?')". Use sparingly.
- Tone: authentic, a bit funny, engaging, real Israeli vibe.
- NEVER break character. NEVER explain that you're an AI. NEVER give long explanations.
- Wait for the learner's reply. Don't monologue.`;

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
