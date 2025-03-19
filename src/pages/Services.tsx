
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";

// Import the existing Services component
import ServicesComponent from "@/components/home/Services";

const ServicesPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Services - PixelForge Development Solutions</title>
        <meta
          name="description"
          content="Explore the comprehensive development services offered by PixelForge, from custom websites to mobile apps and e-commerce solutions."
        />
      </Helmet>

      <AnimatedBackground variant="gradient2" intensity="medium" withShapes>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            {/* Hero Section with Parallax */}
            <motion.section 
              className="relative py-24 overflow-hidden"
              style={{ y: headerY, opacity: headerOpacity }}
            >
              <div className="container mx-auto px-4 text-center">
                <AnimatedSection direction="down" delay={200}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    Our Services
                  </h1>
                </AnimatedSection>
                
                <AnimatedSection direction="up" delay={400} className="max-w-3xl mx-auto">
                  <p className="text-xl text-muted-foreground">
                    We offer professional development services that help businesses transform their ideas into 
                    functional, beautiful, and scalable digital solutions.
                  </p>
                </AnimatedSection>
                
                {/* 3D-like floating cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                  {[
                    {
                      title: "Website Development",
                      description: "Custom websites that capture your brand's essence",
                      icon: "🌐",
                      delay: 300,
                      rotation: 5
                    },
                    {
                      title: "Mobile Applications",
                      description: "Native and cross-platform mobile solutions",
                      icon: "📱",
                      delay: 400,
                      rotation: -5
                    },
                    {
                      title: "E-commerce Solutions",
                      description: "Online stores with seamless shopping experiences",
                      icon: "🛒",
                      delay: 500,
                      rotation: 5
                    }
                  ].map((service, index) => (
                    <motion.div
                      key={index}
                      className="transform-3d card-futuristic"
                      initial={{ opacity: 0, y: 50, rotateX: service.rotation }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: service.delay / 1000, duration: 0.8 }}
                      whileHover={{ 
                        z: 30, 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                        rotateX: service.rotation,
                      }}
                    >
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
            
            {/* Main Services List */}
            <ServicesComponent />
          </main>
          
          <Footer />
        </div>
      </AnimatedBackground>
    </>
  );
};

export default ServicesPage;
