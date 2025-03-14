
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PageBackground from "@/components/animations/PageBackground";
import { motion, useScroll, useTransform } from "framer-motion";

const Projects: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "custom", label: "Custom Software" }
  ];
  
  const projects = [
    {
      title: "EcoShop - Sustainable E-Commerce Platform",
      description: "A complete e-commerce solution for environmentally-friendly products with advanced filtering, secure checkout, and inventory management.",
      image: "/placeholder.svg",
      categories: ["web", "ecommerce"],
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
    },
    {
      title: "HealthTrack Mobile App",
      description: "A comprehensive health tracking application that monitors vital signs, activity levels, and provides personalized wellness recommendations.",
      image: "/placeholder.svg",
      categories: ["mobile"],
      technologies: ["React Native", "Firebase", "HealthKit API", "Google Fit API"]
    },
    {
      title: "PropertyPro Real Estate Platform",
      description: "An advanced real estate listing platform with virtual tours, neighborhood analytics, and agent-client matching system.",
      image: "/placeholder.svg",
      categories: ["web", "custom"],
      technologies: ["Vue.js", "Django", "PostgreSQL", "Google Maps API"]
    },
    {
      title: "FinanceFlow Investment Tracker",
      description: "A secure investment portfolio tracking application with real-time data visualization, predictive analytics, and automated reporting.",
      image: "/placeholder.svg",
      categories: ["web", "custom"],
      technologies: ["Angular", "Express.js", "MySQL", "D3.js"]
    },
    {
      title: "TravelBuddy Mobile Companion",
      description: "A comprehensive travel companion app with itinerary management, local recommendations, and real-time travel alerts.",
      image: "/placeholder.svg",
      categories: ["mobile"],
      technologies: ["Flutter", "GraphQL", "AWS", "Google Places API"]
    },
    {
      title: "LuxuryBoutique E-Commerce",
      description: "A premium shopping experience for luxury goods featuring 3D product visualization, personalized recommendations, and VIP customer portal.",
      image: "/placeholder.svg",
      categories: ["web", "ecommerce"],
      technologies: ["Next.js", "Shopify API", "Three.js", "Algolia"]
    }
  ];
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.categories.includes(activeCategory));

  return (
    <>
      <Helmet>
        <title>Our Projects | PixelForge - Case Studies and Portfolio</title>
        <meta
          name="description"
          content="Explore our portfolio of successful projects across web development, mobile applications, e-commerce platforms, and custom software solutions."
        />
      </Helmet>

      {/* Dynamic background based on scroll */}
      <PageBackground 
        type="immersive-waves" 
        colorScheme="purple"
        intensity="subtle"
      />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-24">
          {/* Hero Section with Parallax */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 z-[-1]"
              style={{ opacity: backgroundOpacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
            </motion.div>
            
            <div className="container-custom relative z-10">
              <AnimatedSection className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-future">
                  Our Projects
                </h1>
                <p className="text-lg text-white/80 mb-8">
                  Explore our portfolio of successful projects that showcase our expertise in creating innovative, high-performance digital solutions across various industries.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Project Filtering */}
          <section className="py-8">
            <div className="container-custom">
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      activeCategory === category.id
                        ? "bg-primary text-white"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-8 pb-24">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <AnimatedSection
                    key={project.title}
                    className="group"
                    delay={index * 100}
                    direction="up"
                  >
                    <div className="rounded-xl overflow-hidden h-full glass-card transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-xl">
                      {/* Project Image */}
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-blue-600/30 group-hover:opacity-70 transition-opacity z-10" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Project Details */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map(tech => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        {/* View Project Button */}
                        <button className="animated-border text-primary font-medium">
                          View Case Study
                        </button>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
          
          {/* Client Testimonials */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear what our clients have to say about their experience working with us and the results we've delivered.
                </p>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote: "The team at PixelForge transformed our business with a custom e-commerce solution that increased our online sales by 200% in the first six months.",
                    author: "Sarah Johnson",
                    position: "CEO, EcoLiving Essentials",
                    image: "/placeholder.svg"
                  },
                  {
                    quote: "Their mobile app development expertise helped us bring our vision to life. The app has received outstanding user feedback and over 100,000 downloads in the first quarter.",
                    author: "Michael Chen",
                    position: "Product Manager, HealthTrack",
                    image: "/placeholder.svg"
                  }
                ].map((testimonial, index) => (
                  <AnimatedSection
                    key={testimonial.author}
                    className="card-futuristic"
                    delay={index * 150}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <div className="flex flex-col h-full">
                      <blockquote className="text-lg italic mb-6">"{testimonial.quote}"</blockquote>
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                        </div>
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

export default Projects;
