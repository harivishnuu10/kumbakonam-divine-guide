import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MessageSquare, Star, Send, Lock } from "lucide-react";
import { z } from "zod";
import TranslatedText from "@/components/TranslatedText";

const feedbackSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long").optional().or(z.literal("")),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(200, "Subject too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message too long"),
  feedbackType: z.enum(["experience", "idea", "suggestion", "issue"]),
  rating: z.number().min(1).max(5).optional(),
});

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = feedbackSchema.parse({
        name,
        email: email || undefined,
        subject,
        message,
        feedbackType,
        rating: rating > 0 ? rating : undefined,
      });

      setLoading(true);

      const { error } = await supabase.from("feedback").insert({
        user_name: validatedData.name,
        user_email: validatedData.email || null,
        feedback_type: validatedData.feedbackType,
        subject: validatedData.subject,
        message: validatedData.message,
        rating: validatedData.rating || null,
      });

      if (error) throw error;

      toast.success("Feedback submitted successfully!");
      
      // Reset form
      setName("");
      setEmail("");
      setFeedbackType("");
      setSubject("");
      setMessage("");
      setRating(0);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Failed to submit feedback");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <MessageSquare className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <TranslatedText text="Share Your Feedback" />
          </h1>
          <p className="text-muted-foreground text-lg">
            <TranslatedText text="Help us improve your temple visiting experience" />
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <TranslatedText text="Your Feedback is Private" />
            </CardTitle>
            <CardDescription>
              <TranslatedText text="Only administrators can view your feedback. We value your privacy and input." />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <TranslatedText text="Name" /> *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <TranslatedText text="Email" /> (<TranslatedText text="Optional" />)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  <TranslatedText text="Feedback Type" /> *
                </Label>
                <Select value={feedbackType} onValueChange={setFeedbackType} disabled={loading}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="experience">
                      <TranslatedText text="Share Experience" />
                    </SelectItem>
                    <SelectItem value="idea">
                      <TranslatedText text="Share Idea" />
                    </SelectItem>
                    <SelectItem value="suggestion">
                      <TranslatedText text="Suggestion" />
                    </SelectItem>
                    <SelectItem value="issue">
                      <TranslatedText text="Report Issue" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  <TranslatedText text="Subject" /> *
                </Label>
                <Input
                  id="subject"
                  placeholder="Brief title for your feedback"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  <TranslatedText text="Message" /> *
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={loading}
                  className="min-h-[150px]"
                />
                <p className="text-xs text-muted-foreground">
                  {message.length}/1000 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label>
                  <TranslatedText text="Rating" /> (<TranslatedText text="Optional" />)
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      disabled={loading}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Submitting..." : <TranslatedText text="Submit Feedback" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
