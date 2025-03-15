
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ApplicationForm from "@/components/careers/ApplicationForm";
import PageBackground from "@/components/animations/PageBackground";

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Delay background animation to ensure smooth page transition
    const timer = setTimeout(() => {
      setBackgroundLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setTimeout(() => {
        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers at PixelForge - Join Our Team</title>
        <meta
          name="description"
          content="Explore career opportunities at PixelForge and join our team of passionate developers and designers."
        />
      </Helmet>

      {/* Enhanced background with deep blue particles */}
      {backgroundLoaded && (
        <PageBackground 
          type="fluid" 
          colorScheme="blue" 
          intensity="subtle" 
          blueVariant="deep"
          fadeIn={true}
        />
      )}

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 relative z-10">
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="container-custom">
              <AnimatedSection className="text-center max-w-3xl mx-auto mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-future">
                  Join Our Team
                </h1>
                <p className="text-lg text-muted-foreground mb-8 glass-futuristic backdrop-blur-sm p-6 rounded-xl">
                  At PixelForge, we're always looking for talented individuals who are passionate about creating exceptional digital experiences. Join us and be part of building the future.
                </p>
                <button
                  onClick={toggleForm}
                  className="btn-futuristic"
                >
                  {showForm ? "Hide Application Form" : "Apply Now"}
                </button>
              </AnimatedSection>

              {showForm && (
                <div id="application-form" className="mt-8 animate-fade-in">
                  <ApplicationForm />
                </div>
              )}
            </div>
          </section>

          {/* Benefits Section with enhanced appearance */}
          <section className="py-16 bg-muted/20 backdrop-blur-md">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4 neon-border animate-pulse-slow">
                  Developer Perks
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gradient-future">
                  Why Work With Us
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join PixelForge and enjoy these benefits and more as part of our growing team.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Flexible Work Hours",
                    description: "Set your own schedule and work when you're most productive. We value results over rigid hours."
                  },
                  {
                    title: "Remote Work Options",
                    description: "Work from home, our office, or anywhere you feel inspired. We provide the tools you need to succeed."
                  },
                  {
                    title: "Cutting-Edge Technology",
                    description: "Work with the latest tech stack and tools. We're always exploring new technologies and methodologies."
                  },
                  {
                    title: "Continuous Learning",
                    description: "We provide resources for professional development, including courses, conferences, and workshops."
                  },
                  {
                    title: "Growth Opportunities",
                    description: "Clear career paths and opportunities to advance your skills and take on more responsibilities."
                  },
                  {
                    title: "Collaborative Environment",
                    description: "Be part of a supportive team that values communication, collaboration, and knowledge sharing."
                  },
                  {
                    title: "Project Variety",
                    description: "Work on diverse projects across different industries to expand your skills and avoid monotony."
                  },
                  {
                    title: "Competitive Compensation",
                    description: "Fair pay that recognizes your skills and contributions, with regular performance reviews."
                  },
                  {
                    title: "Work-Life Balance",
                    description: "We understand the importance of life outside work and strive to maintain healthy boundaries."
                  }
                ].map((benefit, index) => (
                  <AnimatedSection
                    key={benefit.title}
                    className="card-futuristic border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-500"
                    delay={index * 50}
                    direction="up"
                  >
                    <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                    <p className="text-white/80">{benefit.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Careers;
