
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";

// Import the existing Projects component
import ProjectsComponent from "@/components/home/Projects";

const ProjectsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects - PixelForge Portfolio</title>
        <meta
          name="description"
          content="Explore our portfolio of successful projects and case studies showcasing our expertise in web development, app creation, and digital solutions."
        />
      </Helmet>

      <AnimatedBackground variant="gradient3" intensity="medium" withShapes>
        <div className="flex flex-col min-h-screen" ref={containerRef}>
          <Navbar />
          
          <main className="flex-grow">
            {/* Hero Section with 3D Effect */}
            <section className="relative py-24 overflow-hidden">
              <motion.div 
                className="container mx-auto px-4 text-center"
                style={{ y: titleY, scale: titleScale }}
              >
                <AnimatedSection direction="zoom" delay={200}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                    Our Projects
                  </h1>
                </AnimatedSection>
                
                <AnimatedSection direction="up" delay={400} className="max-w-3xl mx-auto">
                  <p className="text-xl text-muted-foreground">
                    Explore our portfolio of successful projects that demonstrate our commitment to excellence
                    and innovation in digital product development.
                  </p>
                </AnimatedSection>
              </motion.div>
              
              {/* Animated feature project */}
              <div className="mt-16 container mx-auto px-4">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden liquid-morph shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-600/20 backdrop-blur-sm"></div>
                  <div className="relative p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Project</h2>
                        <h3 className="text-2xl text-amber-500 font-semibold mb-6">E-Commerce Platform</h3>
                        <p className="text-lg mb-6">
                          A fully responsive e-commerce platform with integrated payment gateways, 
                          inventory management, and customer analytics. Built with React, Node.js, and MongoDB.
                        </p>
                        <div className="flex gap-4">
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 text-sm">React</span>
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 text-sm">Node.js</span>
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 text-sm">MongoDB</span>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="rounded-xl overflow-hidden shadow-lg"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                          alt="E-Commerce Platform" 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
            
            {/* Main Projects List */}
            <ProjectsComponent />
          </main>
          
          <Footer />
        </div>
      </AnimatedBackground>
    </>
  );
};

export default ProjectsPage;
