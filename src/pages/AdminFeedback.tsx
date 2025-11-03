import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Shield, Star, Search, LogOut, MessageSquare, Lightbulb, AlertCircle, ThumbsUp } from "lucide-react";

interface Feedback {
  id: string;
  user_name: string;
  user_email: string | null;
  feedback_type: "experience" | "idea" | "suggestion" | "issue";
  subject: string;
  message: string;
  rating: number | null;
  created_at: string;
}

const AdminFeedback = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [searchTerm, filterType, feedbacks]);

  const checkAdminAndFetch = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please login to access admin panel");
        navigate("/auth");
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchFeedbacks();
    } catch (error) {
      toast.error("Failed to verify admin status");
      navigate("/");
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  const filterFeedbacks = () => {
    let filtered = feedbacks;

    if (filterType !== "all") {
      filtered = filtered.filter((f) => f.feedback_type === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (f) =>
          f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.user_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFeedbacks(filtered);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "experience":
        return <ThumbsUp className="h-4 w-4" />;
      case "idea":
        return <Lightbulb className="h-4 w-4" />;
      case "suggestion":
        return <MessageSquare className="h-4 w-4" />;
      case "issue":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "experience":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "idea":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400";
      case "suggestion":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "issue":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage user feedback</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="idea">Idea</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="issue">Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{feedbacks.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {feedbacks.filter((f) => f.feedback_type === "experience").length}
                </p>
                <p className="text-sm text-muted-foreground">Experiences</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {feedbacks.filter((f) => f.feedback_type === "idea").length}
                </p>
                <p className="text-sm text-muted-foreground">Ideas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {feedbacks.filter((f) => f.feedback_type === "suggestion").length}
                </p>
                <p className="text-sm text-muted-foreground">Suggestions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {feedbacks.filter((f) => f.feedback_type === "issue").length}
                </p>
                <p className="text-sm text-muted-foreground">Issues</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No feedback found</p>
              </CardContent>
            </Card>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeBadgeColor(feedback.feedback_type)}>
                          {getTypeIcon(feedback.feedback_type)}
                          <span className="ml-1 capitalize">{feedback.feedback_type}</span>
                        </Badge>
                        {feedback.rating && (
                          <div className="flex items-center gap-1">
                            {Array.from({ length: feedback.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{feedback.subject}</CardTitle>
                      <CardDescription>
                        By {feedback.user_name}
                        {feedback.user_email && ` (${feedback.user_email})`} •{" "}
                        {new Date(feedback.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{feedback.message}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;
