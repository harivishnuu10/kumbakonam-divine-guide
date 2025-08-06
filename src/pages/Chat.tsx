import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User,
  Sparkles,
  MapPin,
  Clock,
  Calendar
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What are the timings for Adi Kumbeswarar Temple?",
  "Tell me about the Mahamaham festival",
  "Which temples are dedicated to Lord Vishnu?",
  "What is the dress code for temple visits?",
  "How do I reach Sarangapani Temple?",
  "What are the special rituals at Nageshwara Temple?"
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '🙏 Vanakkam! I am your AI temple guide for Kumbakonam. I can help you with information about temples, festivals, timings, and spiritual practices. How may I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (in real app, this would call your AI API)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getAIResponse(message),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('adi kumbeswarar') || lowerQuestion.includes('timing')) {
      return "🕉️ Adi Kumbeswarar Temple is open from 6:00 AM to 12:30 PM and 4:00 PM to 9:00 PM daily. This ancient Shiva temple is one of the most sacred sites in Kumbakonam. The morning hours are especially peaceful for prayers and darshan.";
    }
    
    if (lowerQuestion.includes('mahamaham')) {
      return "🎊 Mahamaham is the grand festival held once every 12 years in Kumbakonam! During this time, millions of devotees gather at the Mahamaham tank for a holy dip. The next Mahamaham festival will be a truly spectacular spiritual experience. The entire town transforms into a vibrant celebration of faith.";
    }
    
    if (lowerQuestion.includes('vishnu') || lowerQuestion.includes('sarangapani')) {
      return "🪷 For Lord Vishnu worship, visit Sarangapani Temple - one of the 108 Divya Desams! It's known for its magnificent 11-tier gopuram. Chakrapani Temple is also dedicated to Vishnu and is part of the Navagraha temple circuit. Both temples have beautiful architecture and rich spiritual significance.";
    }
    
    if (lowerQuestion.includes('dress') || lowerQuestion.includes('code')) {
      return "👘 Temple dress code: Traditional attire is preferred and respectful. Men can wear dhoti with shirt or clean pants with shirt. Women can wear saree, salwar kameez, or long skirts with modest tops. Avoid shorts, sleeveless tops, and leather items. Many temples provide free dhoti for men if needed.";
    }
    
    return "🙏 Thank you for your question! As your temple guide, I'd be happy to help with more specific information about temples, festivals, timings, rituals, or directions. Could you please provide more details about what you'd like to know?";
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-temple rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <Sparkles className="w-6 h-6 text-temple-saffron" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Temple Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ask me anything about Kumbakonam temples, festivals, timings, rituals, and more.
            I'm here to help make your spiritual journey meaningful!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-soft h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-temple text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with Temple Guide AI
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[450px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-gradient-temple text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === 'bot' && (
                              <Bot className="w-4 h-4 mt-0.5 text-temple-saffron" />
                            )}
                            {message.type === 'user' && (
                              <User className="w-4 h-4 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-secondary rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4 text-temple-saffron" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-temple-saffron rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-temple-saffron rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-temple-saffron rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <Separator />
                
                <div className="p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about temples, festivals, timings..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                      disabled={isLoading}
                    />
                    <Button 
                      variant="temple" 
                      onClick={() => handleSendMessage(inputMessage)}
                      disabled={isLoading || !inputMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left h-auto p-3 hover:bg-secondary"
                      onClick={() => handleSendMessage(question)}
                    >
                      <span className="text-xs">{question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-temple-saffron mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">18+ Temples</p>
                    <p className="text-xs text-muted-foreground">Ancient sacred sites</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-temple-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">6 AM - 9 PM</p>
                    <p className="text-xs text-muted-foreground">General timings</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-temple-red mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Year-round</p>
                    <p className="text-xs text-muted-foreground">Festivals & celebrations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;