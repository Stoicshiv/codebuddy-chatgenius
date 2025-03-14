
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

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showImmersive, setShowImmersive] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setIsLoading(false);
    } else {
      // If not, show the loading screen
      document.body.style.overflow = 'hidden';
    }

    // Show immersive scene after delay (only if they've already seen the loading screen)
    if (hasSeenLoading) {
      const timer = setTimeout(() => {
        setShowImmersive(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
    sessionStorage.setItem('hasSeenLoading', 'true');
    
    // Show immersive scene after loading completes
    setTimeout(() => {
      setShowImmersive(true);
    }, 2000);
  };

  const handleCloseImmersive = () => {
    setShowImmersive(false);
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

      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <div className="flex flex-col min-h-screen">
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
