
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Projects from "@/components/home/Projects";
import Team from "@/components/home/Team";
import Contact from "@/components/home/Contact";
import ChatBot from "@/components/ui/ChatBot";
import LoadingScreen from "@/components/animations/LoadingScreen";
import ImmersiveScene from "@/components/animations/ImmersiveScene";
import PageBackground from "@/components/animations/PageBackground";

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showImmersive, setShowImmersive] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [showExperienceButton, setShowExperienceButton] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setIsLoading(false);
      // Show background immediately if loading screen is skipped
      setBackgroundVisible(true);
    } else {
      // If not, show the loading screen
      document.body.style.overflow = 'hidden';
    }

    // Show experience button after a delay only if they've already seen the loading screen
    if (hasSeenLoading) {
      const timer = setTimeout(() => {
        setShowExperienceButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
    sessionStorage.setItem('hasSeenLoading', 'true');
    
    // Show background after loading completes
    setBackgroundVisible(true);
    
    // Show experience button after loading completes
    setTimeout(() => {
      setShowExperienceButton(true);
    }, 3000);
  };

  const handleCloseImmersive = () => {
    setShowImmersive(false);
  };

  const handleExperienceClick = () => {
    setShowImmersive(true);
  };

  return (
    <>
      <Helmet>
        <title>PixelForge - Professional Website & App Development Services</title>
        <meta
          name="description"
          content="PixelForge offers professional website and app development services, along with expert coding assistance for entrepreneurs and businesses."
        />
        <meta
          name="keywords"
          content="coding services, website development, app development, hire coders, programming assistance, 100 minute delivery"
        />
        {/* Open Graph / Social Media Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PixelForge - Professional Website & App Development" />
        <meta
          property="og:description"
          content="Expert coding services for websites, mobile apps, and software solutions. Products delivered under 100 minutes on demand."
        />
        <meta property="og:url" content="https://pixelforge.com" />
        <meta property="og:site_name" content="PixelForge" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PixelForge - Professional Website & App Development" />
        <meta
          name="twitter:description"
          content="Expert coding services for websites, mobile apps, and software solutions. Products delivered under 100 minutes on demand."
        />
      </Helmet>

      {/* Page background effect with optimized blue color scheme */}
      {backgroundVisible && (
        <PageBackground 
          type="fluid" 
          colorScheme="blue" 
          intensity="normal" 
          fadeIn={true}
          blueVariant="deep"
        />
      )}

      {/* Experience button (left side of screen) */}
      {showExperienceButton && (
        <button 
          onClick={handleExperienceClick}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 bg-white text-black px-4 py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center animate-fade-in"
          style={{
            writingMode: 'vertical-lr',
            textOrientation: 'mixed',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)'
          }}
        >
          <span className="text-lg font-bold mb-2">Experience</span>
          <span className="text-xs">Click to explore</span>
        </button>
      )}

      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="flex flex-col min-h-screen relative z-0">
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <Services />
            <Projects />
            <Team />
            <Contact />
          </main>
          <Footer />
          <ChatBot />
          <ImmersiveScene isActive={showImmersive} onClose={handleCloseImmersive} />
        </div>
      )}
    </>
  );
};

export default Index;
