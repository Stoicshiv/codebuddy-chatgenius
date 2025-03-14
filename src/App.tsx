
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
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
import CustomCursor from "./components/ui/CustomCursor";
import LoadingAnimation from "./components/animations/LoadingAnimation";

// Lazy load components that might be heavy
const ImmersiveBackground = lazy(() => import("./components/3d/ImmersiveBackground"));
const ChatBot = lazy(() => import("./components/ui/ChatBot"));
const ImmersiveScene = lazy(() => import("./components/animations/ImmersiveScene"));

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

// ScrollToTop component to handle scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showImmersive, setShowImmersive] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      // Simulate resource loading time - in a real app, you would load actual assets
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    preloadResources();
  }, []);

  // Toggle immersive scene - hook this up to a UI control later
  const toggleImmersiveScene = () => {
    setShowImmersive(prev => !prev);
  };

  // Only render the main content after loading is complete
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Initial loading animation */}
        <LoadingAnimation isLoading={isLoading} />
        
        {/* Only show the main UI after loading completes */}
        {!isLoading && (
          <>
            <Toaster />
            <Sonner />
            
            {/* Custom cursor - will only show on desktop */}
            <CustomCursor />
            
            {/* Full-screen immersive scene - toggled by user action */}
            <Suspense fallback={<div className="fixed inset-0 z-50 bg-black" />}>
              {showImmersive && (
                <ImmersiveScene isActive={showImmersive} onClose={() => setShowImmersive(false)} />
              )}
            </Suspense>
            
            {/* Lazy load background with fallback */}
            <Suspense fallback={<BackgroundFallback />}>
              <ImmersiveBackground />
            </Suspense>
            
            <BrowserRouter>
              <ScrollToTop />
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
            
            {/* Hidden button to toggle immersive scene (can be added to UI later) */}
            <button 
              onClick={toggleImmersiveScene} 
              className="fixed bottom-6 right-6 z-50 p-3 bg-black/50 rounded-full backdrop-blur-sm text-white hover:bg-black/70 transition-all"
              aria-label="Toggle immersive experience"
            >
              <span className="sr-only">Toggle immersive experience</span>
              {showImmersive ? 'Exit' : 'Experience'}
            </button>
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
