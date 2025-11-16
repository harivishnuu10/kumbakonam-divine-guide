import OpenAI from 'openai';

// Note: In production, this would be handled via Supabase Edge Functions
// For now, we'll create a placeholder structure
export class OpenAIService {
  private openai: OpenAI | null = null;

  constructor() {
    // In a real application, this would be in a Supabase Edge Function
    // where API keys are stored securely
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true // Only for demo - use Edge Functions in production
      });
    }
  }

  async getChatResponse(message: string, context: string = ''): Promise<string> {
    if (!this.openai) {
      return this.getFallbackResponse(message);
    }

    try {
      const systemPrompt = `You are a friendly and culturally knowledgeable temple tour guide from Tamil Nadu, India.
You answer questions about temples using spiritual and historical facts.

Context includes:
- Temple names, deities, history, locations
- Timings, festivals, dress codes
- Nearby hotels and attractions
- Cultural and spiritual significance

Instructions:
- Answer in a warm, helpful tone like a local guide
- Keep answers concise (3-5 sentences max)
- If info is missing, reply politely: "Sorry, I don't have specific information about that yet."
- For directions, suggest: "You can find the exact location on our interactive map."
- Include relevant cultural context and tips when helpful

${context ? `Additional context: ${context}` : ''}

Respond like you're talking to a tourist who's new to Tamil Nadu's temple culture.`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || this.getFallbackResponse(message);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.getFallbackResponse(message);
    }
  }

  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('temple') && lowerMessage.includes('timing')) {
      return "🕉️ Most temples in Tamil Nadu are open from 6:00 AM to 12:30 PM and 4:00 PM to 9:00 PM daily. The morning hours are especially peaceful for prayers and darshan.";
    }
    
    if (lowerMessage.includes('mahamaham')) {
      return "🎊 Tamil Nadu hosts numerous grand temple festivals throughout the year! From Pongal celebrations to Mahamaham in Kumbakonam held once every 12 years, these festivals bring together millions of devotees in spiritual celebration.";
    }
    
    if (lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
      return "🏨 Tamil Nadu offers excellent accommodation options near temples, ranging from budget stays to premium hotels. You can check our Hotels section for detailed information about stays near the temples.";
    }
    
    if (lowerMessage.includes('dress') || lowerMessage.includes('code')) {
      return "👘 Temple dress code: Traditional attire is preferred. Men can wear dhoti with shirt or clean pants with shirt. Women can wear saree, salwar kameez, or long skirts with modest tops. Avoid shorts and sleeveless tops.";
    }
    
    return "🙏 Thank you for your question! I'm here to help you explore the beautiful temples and heritage of Tamil Nadu. Could you be more specific about what you'd like to know?";
  }
}

export const openaiService = new OpenAIService();