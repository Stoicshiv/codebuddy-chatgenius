
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import Team from "@/components/home/Team";

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us - PixelForge Team & Vision</title>
        <meta
          name="description"
          content="Learn about PixelForge's mission, vision, and the talented team behind our innovative development solutions."
        />
      </Helmet>

      <AnimatedBackground variant="gradient5" intensity="medium" withShapes>
        <div className="flex flex-col min-h-screen" ref={containerRef}>
          <Navbar />
          
          <main className="flex-grow">
            {/* Hero Section with Parallax */}
            <section className="relative py-24 overflow-hidden">
              <motion.div 
                className="container mx-auto px-4 text-center"
                style={{ opacity: titleOpacity, y: textY }}
              >
                <AnimatedSection direction="zoom" delay={200}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                    Our Story
                  </h1>
                </AnimatedSection>
                
                <AnimatedSection direction="up" delay={400} className="max-w-3xl mx-auto">
                  <p className="text-xl text-muted-foreground">
                    We're a team of passionate developers and designers committed to creating 
                    exceptional digital experiences that help businesses thrive in the digital world.
                  </p>
                </AnimatedSection>
              </motion.div>
            </section>
            
            {/* About Timeline */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded"></div>
                  
                  {/* Timeline items */}
                  {[
                    {
                      year: "2018",
                      title: "The Beginning",
                      description: "PixelForge was founded with a vision to create meaningful digital experiences.",
                      side: "left",
                      delay: 0
                    },
                    {
                      year: "2019",
                      title: "Growing Team",
                      description: "We expanded our team with talented developers and designers.",
                      side: "right",
                      delay: 0.2
                    },
                    {
                      year: "2020",
                      title: "Global Reach",
                      description: "Started working with international clients and expanding our service offerings.",
                      side: "left",
                      delay: 0.4
                    },
                    {
                      year: "2021",
                      title: "Major Milestone",
                      description: "Completed our 100th project and established partnerships with major tech companies.",
                      side: "right",
                      delay: 0.6
                    },
                    {
                      year: "Today",
                      title: "Continuous Innovation",
                      description: "Constantly pushing boundaries with cutting-edge technologies and creative solutions.",
                      side: "left",
                      delay: 0.8
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`relative z-10 mb-16 ${item.side === 'left' ? 'md:pr-10 md:text-right md:ml-0 md:mr-auto' : 'md:pl-10 md:text-left md:ml-auto md:mr-0'} max-w-md w-full`}
                      initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.delay, duration: 0.6 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg">
                        <div className={`absolute top-6 ${item.side === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-6 h-6 rounded-full bg-primary shadow-lg shadow-primary/30`}></div>
                        <span className="inline-block text-primary font-semibold mb-2">{item.year}</span>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Our Values Section */}
            <section className="py-20 bg-black/5 backdrop-blur-lg">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16" direction="up">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Values</h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    These core principles guide everything we do and help us deliver exceptional results for our clients.
                  </p>
                </AnimatedSection>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Innovation",
                      description: "We constantly explore new technologies and approaches to solve complex problems.",
                      icon: "💡",
                      delay: 0.2
                    },
                    {
                      title: "Excellence",
                      description: "We hold ourselves to the highest standards in code quality and design aesthetics.",
                      icon: "🏆",
                      delay: 0.4
                    },
                    {
                      title: "Collaboration",
                      description: "We believe the best solutions come from working closely together with our clients.",
                      icon: "🤝",
                      delay: 0.6
                    }
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      className="card-futuristic p-8 text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: value.delay, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Team Section */}
            <Team />
          </main>
          
          <Footer />
        </div>
      </AnimatedBackground>
    </>
  );
};

export default AboutPage;
