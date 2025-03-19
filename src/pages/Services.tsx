
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PageBackground from "@/components/animations/PageBackground";
import { motion, useScroll, useTransform } from "framer-motion";

const Services: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0]);
  
  // Services data
  const services = [
    {
      title: "Website Development",
      description: "Our expert team creates responsive, high-performance websites that deliver exceptional user experiences. From simple landing pages to complex web applications, we build solutions that drive results for your business.",
      features: [
        "Custom design and development",
        "Responsive layouts for all devices",
        "SEO-friendly architecture",
        "Performance optimization",
        "Content management systems",
        "E-commerce functionality"
      ],
      colorClass: "from-blue-500 to-indigo-600",
      icon: "🌐"
    },
    {
      title: "Mobile App Development",
      description: "Transform your ideas into powerful mobile applications that users love. We design and develop native and cross-platform apps that are fast, intuitive, and deliver real value to your audience.",
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "UI/UX design for mobile",
        "App Store optimization",
        "Integration with device features",
        "Push notifications and analytics"
      ],
      colorClass: "from-purple-500 to-pink-600",
      icon: "📱"
    },
    {
      title: "Custom Software Solutions",
      description: "We create tailored software solutions that solve your unique business challenges. Our team works closely with you to understand your requirements and deliver robust, scalable software that drives efficiency and growth.",
      features: [
        "Business process automation",
        "Custom CRM and ERP systems",
        "Data management solutions",
        "API development and integration",
        "Legacy system modernization",
        "Cloud-based applications"
      ],
      colorClass: "from-emerald-500 to-teal-600",
      icon: "⚙️"
    },
    {
      title: "E-commerce Development",
      description: "Build a powerful online store that converts visitors into customers. We develop secure, scalable e-commerce solutions that provide seamless shopping experiences and help you increase sales.",
      features: [
        "Custom e-commerce websites",
        "Shopping cart development",
        "Payment gateway integration",
        "Inventory management systems",
        "Customer account portals",
        "Order processing and fulfillment"
      ],
      colorClass: "from-amber-500 to-orange-600",
      icon: "🛒"
    }
  ];

  useEffect(() => {
    // Update active section based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      
      // Simple mapping of scroll position to service index
      const totalServices = services.length;
      const scrollRatio = scrollPosition / (docHeight - windowHeight);
      const newActiveSection = Math.min(
        Math.floor(scrollRatio * totalServices * 1.5),
        totalServices - 1
      );
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, services.length]);

  return (
    <>
      <Helmet>
        <title>Our Services | PixelForge - Professional Development Solutions</title>
        <meta
          name="description"
          content="Explore our comprehensive development services including website creation, mobile app development, custom software solutions, and e-commerce platforms."
        />
      </Helmet>

      {/* Animated background that changes with scroll */}
      <PageBackground 
        type="immersive-dots" 
        colorScheme={
          activeSection === 0 ? "blue" :
          activeSection === 1 ? "purple" :
          activeSection === 2 ? "green" :
          "orange"
        }
        intensity="normal"
      />

      <div className="flex flex-col min-h-screen">
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
                  Our Services
                </h1>
                <p className="text-lg text-white/80 mb-8">
                  We offer comprehensive development solutions tailored to your unique business needs. Our team of experts combines technical excellence with creative innovation to deliver exceptional digital experiences.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Services Showcase */}
          <section className="py-16 md:py-24">
            <div className="container-custom">
              {services.map((service, index) => (
                <AnimatedSection 
                  key={service.title}
                  className={cn(
                    "mb-24 last:mb-0",
                    index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                  )}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 100}
                >
                  <div className={cn(
                    "relative z-10 rounded-xl p-8 md:p-10 overflow-hidden max-w-4xl",
                    index % 2 === 0 ? "md:ml-auto" : "md:mr-auto",
                    "glass-card"
                  )}>
                    {/* Background gradient */}
                    <div className={cn(
                      "absolute inset-0 -z-10 opacity-20 bg-gradient-to-br",
                      service.colorClass
                    )} />
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Service icon/visual */}
                      <div className="flex-shrink-0 flex items-start justify-center">
                        <div className={cn(
                          "w-20 h-20 rounded-xl flex items-center justify-center text-4xl",
                          "bg-gradient-to-br", service.colorClass
                        )}>
                          {service.icon}
                        </div>
                      </div>
                      
                      {/* Service content */}
                      <div className="flex-grow">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className={cn(
                                "w-2 h-2 rounded-full bg-gradient-to-br",
                                service.colorClass
                              )} />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="py-16 md:py-24 bg-muted/30 relative">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Development Process</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We follow a structured, collaborative approach to ensure your project is completed on time, within budget, and to the highest standards.
                </p>
              </AnimatedSection>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    phase: "01",
                    title: "Discovery & Planning",
                    description: "We work closely with you to understand your goals, target audience, and requirements to create a comprehensive project plan."
                  },
                  {
                    phase: "02",
                    title: "Design & Development",
                    description: "Our designers and developers create beautiful, functional solutions based on the approved plans, with regular updates and feedback sessions."
                  },
                  {
                    phase: "03",
                    title: "Testing & Launch",
                    description: "We thoroughly test all aspects of your project to ensure quality, then provide a smooth launch and ongoing support."
                  }
                ].map((step, index) => (
                  <AnimatedSection 
                    key={step.phase}
                    className="card-futuristic"
                    delay={index * 150}
                    direction="up"
                  >
                    <div className="text-5xl font-bold text-primary/30 mb-4">{step.phase}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
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

export default Services;
