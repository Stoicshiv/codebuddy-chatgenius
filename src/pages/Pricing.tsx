
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import useSoundEffects from "@/hooks/use-sound-effects";

const PricingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { play } = useSoundEffects();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const translateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for small businesses getting started",
      price: "799",
      features: [
        "Single page website",
        "Mobile responsive design",
        "3 content revisions",
        "Basic SEO setup",
        "Contact form integration",
        "1 month support"
      ],
      color: "from-blue-400 to-blue-600",
      shadow: "shadow-blue-500/20",
      delay: 0.1,
      popular: false
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses",
      price: "1499",
      features: [
        "Up to 5 pages",
        "Premium responsive design",
        "Unlimited revisions",
        "Advanced SEO optimization",
        "Email marketing integration",
        "Social media integration",
        "3 months support",
        "Database integration"
      ],
      color: "from-primary to-blue-700",
      shadow: "shadow-primary/30",
      delay: 0.2,
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large businesses with complex needs",
      price: "2999",
      features: [
        "Custom web application",
        "E-commerce functionality",
        "User authentication",
        "Database design & setup",
        "API integrations",
        "Payment gateway setup",
        "Admin dashboard",
        "6 months support",
        "Performance optimization"
      ],
      color: "from-indigo-600 to-purple-700",
      shadow: "shadow-indigo-500/20",
      delay: 0.3,
      popular: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - PixelForge Development Services</title>
        <meta
          name="description"
          content="Transparent pricing for our development services. Find the perfect plan to bring your digital project to life."
        />
      </Helmet>

      <AnimatedBackground variant="gradient4" intensity="medium" withShapes>
        <div className="flex flex-col min-h-screen" ref={containerRef}>
          <Navbar />
          
          <main className="flex-grow">
            {/* Hero Section with Motion Effects */}
            <section className="relative py-24 overflow-hidden">
              <motion.div 
                className="container mx-auto px-4 text-center"
                style={{ y: translateY, opacity }}
              >
                <AnimatedSection direction="rotate" delay={200}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                    Our Pricing
                  </h1>
                </AnimatedSection>
                
                <AnimatedSection direction="up" delay={400} className="max-w-3xl mx-auto">
                  <p className="text-xl text-muted-foreground">
                    Transparent pricing plans designed to fit your needs. Choose the package 
                    that works best for your project and business goals.
                  </p>
                </AnimatedSection>
              </motion.div>
            </section>
            
            {/* Pricing Plans */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricingPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      className={`relative overflow-hidden rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl ${plan.popular ? 'ring-2 ring-primary transform-gpu md:-translate-y-6' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: plan.delay, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br opacity-10 ${plan.color}`}></div>
                      
                      {/* Popular badge */}
                      {plan.popular && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-primary text-white px-4 py-1 text-sm font-medium shadow-lg transform rotate-45 translate-x-5 -translate-y-1">
                            Popular
                          </div>
                        </div>
                      )}
                      
                      <div className="relative p-8">
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-muted-foreground mb-6">{plan.description}</p>
                        
                        <div className="mb-8">
                          <span className="text-4xl font-bold">${plan.price}</span>
                        </div>
                        
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Link
                          to="/contact"
                          className={`block w-full py-3 px-6 text-center rounded-lg text-white bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all duration-300 ${plan.shadow}`}
                          onMouseEnter={() => play('hover')}
                          onClick={() => play('click')}
                        >
                          Get Started
                          <ChevronRight className="inline ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-20 bg-black/5 backdrop-blur-lg">
              <div className="container mx-auto px-4">
                <AnimatedSection className="text-center mb-16" direction="up">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Find answers to common questions about our pricing and services.
                  </p>
                </AnimatedSection>
                
                <div className="max-w-3xl mx-auto space-y-6">
                  {[
                    {
                      question: "What's included in the initial consultation?",
                      answer: "Our initial consultation includes a thorough discussion of your project requirements, goals, timeline, and budget. We'll provide expert advice and recommend the best approach for your specific needs."
                    },
                    {
                      question: "How long does it take to complete a project?",
                      answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while complex web applications could take 8-12 weeks or more. We'll provide a detailed timeline during our initial consultation."
                    },
                    {
                      question: "Do you offer ongoing maintenance and support?",
                      answer: "Yes, we offer ongoing maintenance and support packages to keep your website or application running smoothly. These can be customized based on your needs and can include regular updates, security monitoring, and technical support."
                    },
                    {
                      question: "Can I upgrade my plan later?",
                      answer: "Absolutely! You can upgrade your plan at any time as your business grows and needs evolve. We'll work with you to ensure a smooth transition and minimal disruption to your digital presence."
                    }
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="border border-white/20 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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

export default PricingPage;
