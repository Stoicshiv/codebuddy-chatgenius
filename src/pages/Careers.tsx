
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import ApplicationForm from "@/components/careers/ApplicationForm";

const CareersPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const translateY = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openPositions = [
    {
      title: "Senior Frontend Developer",
      type: "Full-time",
      location: "Remote",
      description: "We're looking for an experienced frontend developer with strong React skills to join our team.",
      requirements: [
        "5+ years of experience with modern JavaScript and React",
        "Experience with TypeScript, Redux, and Next.js",
        "Strong understanding of responsive design and web accessibility",
        "Ability to write clean, maintainable code",
        "Experience with testing frameworks like Jest and React Testing Library"
      ]
    },
    {
      title: "Backend Developer",
      type: "Full-time",
      location: "Remote",
      description: "Join our backend team to build scalable and high-performance APIs and services.",
      requirements: [
        "3+ years of experience with Node.js and Express",
        "Strong knowledge of database design and ORM libraries",
        "Experience with RESTful APIs and GraphQL",
        "Understanding of authentication and authorization mechanisms",
        "Familiarity with cloud services (AWS, Azure, or GCP)"
      ]
    },
    {
      title: "UI/UX Designer",
      type: "Full-time",
      location: "Remote",
      description: "Help us create beautiful and user-friendly interfaces for our web and mobile applications.",
      requirements: [
        "3+ years of experience in UI/UX design",
        "Proficiency in design tools like Figma or Adobe XD",
        "Strong portfolio demonstrating user-centered design solutions",
        "Understanding of design systems and component libraries",
        "Experience with user research and usability testing"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Careers - Join the PixelForge Team</title>
        <meta
          name="description"
          content="Explore career opportunities at PixelForge. Join our team of talented developers and designers creating innovative digital solutions."
        />
      </Helmet>

      <AnimatedBackground variant="gradient5" intensity="medium" withShapes>
        <div className="flex flex-col min-h-screen" ref={containerRef}>
          <Navbar />
          
          <main className="flex-grow">
            {/* Hero Section with Motion Effects */}
            <section className="relative py-24 overflow-hidden">
              <motion.div 
                className="container mx-auto px-4 text-center"
                style={{ y: translateY, scale }}
              >
                <AnimatedSection direction="zoom" delay={200}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                    Join Our Team
                  </h1>
                </AnimatedSection>
                
                <AnimatedSection direction="up" delay={400} className="max-w-3xl mx-auto">
                  <p className="text-xl text-muted-foreground">
                    We're always looking for talented individuals to join our growing team of passionate developers,
                    designers, and creative problem solvers.
                  </p>
                </AnimatedSection>
              </motion.div>
              
              {/* 3D Culture Cards */}
              <div className="container mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
                  {[
                    {
                      title: "Innovation Culture",
                      description: "We encourage creative thinking and exploring new technologies",
                      icon: "🚀",
                      delay: 0.2,
                      rotate: 10
                    },
                    {
                      title: "Continuous Learning",
                      description: "We invest in your growth with training and development opportunities",
                      icon: "📚",
                      delay: 0.4,
                      rotate: -10
                    },
                    {
                      title: "Work-Life Balance",
                      description: "Flexible schedules and remote work options to support your wellbeing",
                      icon: "⚖️",
                      delay: 0.6,
                      rotate: 10
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="transform-3d card-futuristic"
                      initial={{ opacity: 0, rotateY: item.rotate }}
                      whileInView={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: item.delay, duration: 0.8 }}
                      whileHover={{ 
                        rotateY: item.rotate,
                        z: 50
                      }}
                    >
                      <div className="text-center p-6">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Open Positions */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16" direction="up">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Open Positions</h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Explore our current job openings and find the perfect role for your skills and interests.
                  </p>
                </AnimatedSection>
                
                <div className="space-y-8 max-w-4xl mx-auto">
                  {openPositions.map((position, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="p-6">
                        <div className="flex flex-wrap justify-between items-center mb-4">
                          <h3 className="text-2xl font-bold">{position.title}</h3>
                          <div className="flex gap-3 mt-2 sm:mt-0">
                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">{position.type}</span>
                            <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm">{position.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{position.description}</p>
                        
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 mb-6 space-y-1">
                          {position.requirements.map((req, i) => (
                            <li key={i} className="text-muted-foreground">{req}</li>
                          ))}
                        </ul>
                        
                        <button
                          onClick={() => {
                            const formElement = document.getElementById('application-form');
                            formElement?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="btn-hover-effect bg-primary text-white px-6 py-2 rounded-lg font-medium inline-flex items-center"
                        >
                          Apply Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Application Form */}
            <section id="application-form" className="py-16 bg-black/5 backdrop-blur-lg">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-12" direction="up">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Apply Now</h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Fill out the form below to apply for a position at PixelForge. We'll review your application 
                    and get back to you as soon as possible.
                  </p>
                </AnimatedSection>
                
                <div className="max-w-2xl mx-auto">
                  <ApplicationForm />
                </div>
              </div>
            </section>
          </main>
          
          <Footer />
        </div>
      </AnimatedBackground>
    </>
  );
};

export default CareersPage;
