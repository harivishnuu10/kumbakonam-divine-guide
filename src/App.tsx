import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Temples from "./pages/Temples";
import TempleDetail from "./pages/TempleDetail";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import MapView from "./pages/MapView";
import Chat from "./pages/Chat";
import Itineraries from "./pages/Itineraries";
import LocalGuide from "./pages/LocalGuide";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AdminFeedback from "./pages/AdminFeedback";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { LanguageContext, useLanguageState } from "./hooks/useLanguage";

const queryClient = new QueryClient();

const App = () => {
  const languageState = useLanguageState();
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={languageState}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/temples" element={<Temples />} />
                <Route path="/temple/:id" element={<TempleDetail />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/itineraries" element={<Itineraries />} />
                <Route path="/local-guide" element={<LocalGuide />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin/feedback" element={<AdminFeedback />} />
                <Route path="/about" element={<About />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
