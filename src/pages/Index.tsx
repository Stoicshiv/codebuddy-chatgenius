
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Projects from "@/components/home/Projects";
import Team from "@/components/home/Team";
import Contact from "@/components/home/Contact";
import ChatBot from "@/components/ui/ChatBot";

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>CodeBuddy - Professional Website & App Development Services</title>
        <meta
          name="description"
          content="CodeBuddy offers professional website and app development services, along with expert coding assistance for entrepreneurs and businesses."
        />
        <meta
          name="keywords"
          content="coding services, website development, app development, hire coders, programming assistance"
        />
        {/* Open Graph / Social Media Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CodeBuddy - Professional Website & App Development" />
        <meta
          property="og:description"
          content="Expert coding services for websites, mobile apps, and software solutions."
        />
        <meta property="og:url" content="https://codebuddy.com" />
        <meta property="og:site_name" content="CodeBuddy" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CodeBuddy - Professional Website & App Development" />
        <meta
          name="twitter:description"
          content="Expert coding services for websites, mobile apps, and software solutions."
        />
      </Helmet>

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
      </div>
    </>
  );
};

export default Index;
