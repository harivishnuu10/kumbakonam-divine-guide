import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = 'en' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Language-specific system prompts
    const systemPrompts: Record<string, string> = {
      en: "You are a helpful AI assistant for Kumbakonam Divine Guide, a temple and tourism information service. Provide accurate, friendly information about temples, festivals, accommodations, and travel tips in Kumbakonam. Keep responses concise and helpful.",
      ta: "நீங்கள் கும்பகோணம் தெய்வீக வழிகாட்டிக்கான உதவிகரமான AI உதவியாளர் ஆவீர்கள், இது கோவில் மற்றும் சுற்றுலா தகவல் சேவை. கும்பகோணத்தில் உள்ள கோவில்கள், திருவிழாக்கள், தங்குமிடங்கள் மற்றும் பயண உதவிக்குறிப்புகள் பற்றிய துல்லியமான, நட்புரீதியான தகவல்களை வழங்கவும். பதில்களை சுருக்கமாகவும் உதவிகரமாகவும் வைத்திருங்கள்.",
      hi: "आप कुम्भकोणम डिवाइन गाइड के लिए एक सहायक AI सहायक हैं, जो मंदिर और पर्यटन सूचना सेवा है। कुम्भकोणम में मंदिरों, त्योहारों, आवास और यात्रा युक्तियों के बारे में सटीक, मैत्रीपूर्ण जानकारी प्रदान करें। प्रतिक्रियाओं को संक्षिप्त और सहायक रखें।",
      te: "మీరు కుంభకోణం దివ్య గైడ్ కోసం సహాయక AI సహాయకులు, ఇది దేవాలయ మరియు పర్యాటక సమాచార సేవ. కుంభకోణంలోని దేవాలయాలు, పండుగలు, వసతి మరియు ప్రయాణ చిట్కాల గురించి ఖచ్చితమైన, స్నేహపూర్వక సమాచారాన్ని అందించండి. ప్రతిస్పందనలను సంక్షిప్తంగా మరియు సహాయకరంగా ఉంచండి.",
      ml: "നിങ്ങൾ കുംഭകോണം ഡിവൈൻ ഗൈഡിനായുള്ള ഒരു സഹായക AI അസിസ്റ്റന്റാണ്, ഇത് ക്ഷേത്ര-വിനോദസഞ്ചാര വിവര സേവനമാണ്. കുംഭകോണത്തിലെ ക്ഷേത്രങ്ങൾ, ഉത്സവങ്ങൾ, താമസസൗകര്യങ്ങൾ, യാത്രാ നുറുങ്ങുകൾ എന്നിവയെക്കുറിച്ച് കൃത്യവും സൗഹൃദപരവുമായ വിവരങ്ങൾ നൽകുക. പ്രതികരണങ്ങൾ സംക്ഷിപ്തവും സഹായകരവുമായി സൂക്ഷിക്കുക."
    };

    const systemPrompt = systemPrompts[language] || systemPrompts['en'];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI Gateway request failed');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
