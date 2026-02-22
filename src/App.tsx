import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Hebrew Flow imports
import HebrewFlowLayout from "./components/hebrewFlow/HebrewFlowLayout";
import HebrewFlowDashboard from "./components/hebrewFlow/HebrewFlowDashboard";
import VerbVisualizer from "./components/hebrewFlow/VerbVisualizer";
import BinyanOverview from "./components/hebrewFlow/BinyanOverview";
import PracticeArena from "./components/hebrewFlow/PracticeArena";
import SentenceBuilder from "./components/hebrewFlow/SentenceBuilder";
import RootsConcept from "./components/hebrewFlow/RootsConcept";
import SyntaxModules from "./components/hebrewFlow/SyntaxModules";
import ConversationRoulette from "./components/hebrewFlow/ConversationRoulette";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Index />} />
          
          {/* Hebrew Flow Routes */}
          <Route path="/hebrew-flow" element={<HebrewFlowLayout />}>
            <Route index element={<HebrewFlowDashboard />} />
            <Route path="visualizer" element={<VerbVisualizer />} />
            <Route path="binyanim" element={<BinyanOverview />} />
            <Route path="roots" element={<RootsConcept />} />
            <Route path="prepositions" element={<SyntaxModules />} />
            <Route path="smichut" element={<SyntaxModules />} />
            <Route path="definite-article" element={<SyntaxModules />} />
            <Route path="practice/roots" element={<PracticeArena />} />
            <Route path="practice/conjugation" element={<PracticeArena />} />
            <Route path="practice/sentences" element={<SentenceBuilder />} />
            <Route path="conversation-roulette" element={<ConversationRoulette />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
