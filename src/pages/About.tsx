
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PageBackground from "@/components/animations/PageBackground";

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.6, 0.4]);

  return (
    <>
      <Helmet>
        <title>About Us | PixelForge - Our Story & Team</title>
        <meta
          name="description"
          content="Learn about PixelForge's journey, values, and the talented team behind our innovative development solutions."
        />
      </Helmet>

      {/* Dynamic background */}
      <PageBackground 
        type="immersive-particles" 
        colorScheme="green"
        intensity="normal"
      />

      <div className="flex flex-col min-h-screen" ref={containerRef}>
        <Navbar />
        
        <main className="flex-grow pt-24">
          {/* Hero Section with Parallax */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 z-[-1]"
              style={{ opacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
            </motion.div>
            
            <div className="container-custom relative z-10">
              <AnimatedSection className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-future">
                  Our Story
                </h1>
                <p className="text-lg text-white/80 mb-8">
                  We're a team of passionate developers, designers, and digital strategists dedicated to creating exceptional digital experiences that drive real results.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-16 md:py-24 relative">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  From humble beginnings to industry leadership, discover how we've grown and evolved over the years.
                </p>
              </AnimatedSection>
              
              {/* Timeline */}
              <div className="relative max-w-4xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20"></div>
                
                {[
                  {
                    year: "2015",
                    title: "The Beginning",
                    description: "PixelForge was founded by a small team of developers with a shared vision: to create digital solutions that combine technical excellence with beautiful design."
                  },
                  {
                    year: "2017",
                    title: "Growth & Expansion",
                    description: "We expanded our team and capabilities, adding specialized expertise in mobile development, UX design, and e-commerce solutions."
                  },
                  {
                    year: "2019",
                    title: "International Reach",
                    description: "PixelForge began working with clients across Europe and North America, bringing our innovative approach to businesses around the world."
                  },
                  {
                    year: "2021",
                    title: "Industry Recognition",
                    description: "Our work received multiple industry awards for excellence in design, development, and digital innovation."
                  },
                  {
                    year: "Today",
                    title: "Continued Innovation",
                    description: "We continue to push boundaries and explore new technologies, always focused on delivering exceptional results for our clients."
                  }
                ].map((milestone, index) => (
                  <AnimatedSection
                    key={milestone.year}
                    className="relative mb-16 last:mb-0"
                    delay={index * 150}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                      {/* Year marker */}
                      <div className="w-1/2 px-4 text-center">
                        <div className="inline-block bg-gradient-to-r from-primary to-indigo-600 text-white px-6 py-3 rounded-full font-bold">
                          {milestone.year}
                        </div>
                      </div>
                      
                      {/* Timeline node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                      
                      {/* Content */}
                      <div className="w-1/2 px-4">
                        <div className="p-6 glass-card rounded-xl">
                          <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  These core principles guide everything we do, from how we approach projects to how we build our team.
                </p>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🌟",
                    title: "Excellence",
                    description: "We're committed to delivering the highest quality in everything we do, constantly pushing ourselves to exceed expectations."
                  },
                  {
                    icon: "🤝",
                    title: "Collaboration",
                    description: "We believe the best results come from working closely with our clients and each other, combining our diverse perspectives and expertise."
                  },
                  {
                    icon: "💡",
                    title: "Innovation",
                    description: "We embrace new technologies and approaches, constantly exploring better ways to solve problems and create exceptional experiences."
                  },
                  {
                    icon: "🔍",
                    title: "Attention to Detail",
                    description: "We know that the small details make a big difference, so we pay careful attention to every aspect of our work."
                  },
                  {
                    icon: "🌱",
                    title: "Continuous Growth",
                    description: "We're dedicated to learning and improving, both as individuals and as an organization, to stay at the forefront of our industry."
                  },
                  {
                    icon: "💙",
                    title: "User-Centered",
                    description: "We put users at the heart of everything we build, creating solutions that are intuitive, accessible, and genuinely useful."
                  }
                ].map((value, index) => (
                  <AnimatedSection
                    key={value.title}
                    className="card-futuristic h-full"
                    delay={index * 100}
                    direction="up"
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 md:py-24">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The talented individuals who bring creativity, expertise, and passion to every project.
                </p>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "Alex Johnson",
                    role: "Founder & Lead Developer",
                    image: "/placeholder.svg",
                    description: "With over 15 years of experience, Alex leads our development strategy and technical vision."
                  },
                  {
                    name: "Sophia Chen",
                    role: "UX Design Director",
                    image: "/placeholder.svg",
                    description: "Sophia crafts intuitive, engaging user experiences that balance beauty and functionality."
                  },
                  {
                    name: "Marcus Williams",
                    role: "Mobile Development Lead",
                    image: "/placeholder.svg",
                    description: "Marcus specializes in creating seamless, high-performance mobile applications across platforms."
                  },
                  {
                    name: "Olivia Martinez",
                    role: "Project Manager",
                    image: "/placeholder.svg",
                    description: "Olivia ensures our projects run smoothly, on time, and with clear communication throughout."
                  },
                  {
                    name: "David Kim",
                    role: "Frontend Developer",
                    image: "/placeholder.svg",
                    description: "David brings designs to life with clean, efficient code and attention to interactive details."
                  },
                  {
                    name: "Priya Patel",
                    role: "Backend Developer",
                    image: "/placeholder.svg",
                    description: "Priya builds robust, scalable systems that power our applications with reliability and speed."
                  },
                  {
                    name: "James Wilson",
                    role: "DevOps Engineer",
                    image: "/placeholder.svg",
                    description: "James manages our infrastructure and deployment processes for optimal performance and security."
                  },
                  {
                    name: "Zoe Thompson",
                    role: "UI Designer",
                    image: "/placeholder.svg",
                    description: "Zoe creates visually stunning interfaces that capture each client's unique brand identity."
                  }
                ].map((member, index) => (
                  <AnimatedSection
                    key={member.name}
                    className="group"
                    delay={index * 50}
                    direction="up"
                  >
                    <div className="rounded-xl overflow-hidden h-full glass-card transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-xl">
                      {/* Team Member Image */}
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-green-500/30 to-blue-600/30 opacity-0 group-hover:opacity-70 transition-opacity z-10" />
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Team Member Details */}
                      <div className="p-4 text-center">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <div className="text-primary text-sm font-medium mb-3">{member.role}</div>
                        <p className="text-muted-foreground text-sm">{member.description}</p>
                      </div>
                    </div>
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

export default About;
