
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Careers";
import AITrainerPage from "./pages/admin/AITrainer";
import NotFound from "./pages/NotFound";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load components that might be heavy
const ImmersiveBackground = lazy(() => import("./components/3d/ImmersiveBackground"));
const ChatBot = lazy(() => import("./components/ui/ChatBot"));

// Create a new query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Fallback components
const BackgroundFallback = () => (
  <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-900/20 via-indigo-900/20 to-purple-900/20" />
);

const ChatBotFallback = () => <div className="hidden"></div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* Lazy load background with fallback */}
      <Suspense fallback={<BackgroundFallback />}>
        <ImmersiveBackground />
      </Suspense>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/admin/ai-trainer" element={<AITrainerPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Lazy load chatbot with fallback */}
      <Suspense fallback={<ChatBotFallback />}>
        <ChatBot />
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
