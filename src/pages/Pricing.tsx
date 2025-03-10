import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { 
  IndianRupee, 
  Check, 
  X, 
  DollarSign, 
  User, 
  Code, 
  Gauge, 
  ArrowRight, 
  Users, 
  Palette, 
  Clock, 
  Shield, 
  Smartphone,
  Coffee,
  Headphones,
  Laptop,
  Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import ParticlesScene from "@/components/3d/ParticlesScene";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: { feature: string; included: boolean }[];
  highlighted?: boolean;
  cta: string;
}

const DEVELOPER_COST = 300; // INR

const Pricing: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [customPrice, setCustomPrice] = useState(0);
  const [developers, setDevelopers] = useState(1);
  const [days, setDays] = useState(5);
  const [selectedTechnologies, setSelectedTechnologies] = useState<Set<string>>(new Set(['html', 'css']));

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const techCosts: Record<string, number> = {
      'html': 50,
      'css': 50,
      'tailwind': 100,
      'typescript': 200,
      'react': 300,
      'node': 300,
      'threejs': 400,
    };
    
    let techCost = 0;
    selectedTechnologies.forEach(tech => {
      techCost += techCosts[tech] || 0;
    });
    
    const calculatedPrice = DEVELOPER_COST * developers * (days / 5) + techCost;
    setCustomPrice(Math.round(calculatedPrice));
  }, [developers, days, selectedTechnologies]);

  const toggleTechnology = (tech: string) => {
    const newSelection = new Set(selectedTechnologies);
    if (newSelection.has(tech)) {
      newSelection.delete(tech);
    } else {
      newSelection.add(tech);
    }
    setSelectedTechnologies(newSelection);
  };

  const membershipPlans: PricingPlan[] = [
    {
      name: "Basic",
      price: 299,
      description: "Perfect for simple web projects",
      features: [
        { feature: "Single use", included: true },
        { feature: "1 developer per use", included: true },
        { feature: "HTML & CSS", included: true },
        { feature: "Tailwind CSS", included: true },
        { feature: "24/7 support", included: true },
        { feature: "TypeScript", included: false },
        { feature: "Backend development", included: false },
        { feature: "3D rendering", included: false },
      ],
      cta: "Get Started"
    },
    {
      name: "Intermediate",
      price: 999,
      description: "Great for professional websites",
      features: [
        { feature: "Single use", included: true },
        { feature: "1 developer per use", included: true },
        { feature: "HTML & CSS", included: true },
        { feature: "Tailwind CSS", included: true },
        { feature: "TypeScript", included: true },
        { feature: "React components", included: true },
        { feature: "UI/UX design", included: true },
        { feature: "48-hour delivery", included: true },
        { feature: "1 revision included", included: true },
        { feature: "Backend development", included: false },
        { feature: "3D rendering", included: false },
      ],
      highlighted: true,
      cta: "Popular Choice"
    },
    {
      name: "Advanced",
      price: 1899,
      description: "For complete web applications",
      features: [
        { feature: "Single use", included: true },
        { feature: "2 developers per use", included: true },
        { feature: "Full-stack development", included: true },
        { feature: "React & Node.js", included: true },
        { feature: "Database integration", included: true },
        { feature: "API development", included: true },
        { feature: "Performance optimization", included: true },
        { feature: "Mobile responsiveness", included: true },
        { feature: "3 revisions included", included: true },
        { feature: "30-day support", included: true },
        { feature: "3D rendering", included: false },
      ],
      cta: "Get Advanced"
    },
    {
      name: "Ultra",
      price: 2299,
      description: "Premium immersive experiences",
      features: [
        { feature: "Single use", included: true },
        { feature: "4 developers per use", included: true },
        { feature: "Full-stack development", included: true },
        { feature: "Three.js integration", included: true },
        { feature: "3D rendering & animations", included: true },
        { feature: "Custom 3D models", included: true },
        { feature: "VR/AR capabilities", included: true },
        { feature: "Performance optimization", included: true },
        { feature: "Unlimited revisions", included: true },
        { feature: "90-day support", included: true },
        { feature: "White-label option", included: true },
      ],
      cta: "Get Ultra"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing & Plans - PixelForge Developer Services</title>
        <meta
          name="description"
          content="Hire expert coders starting from just ₹299. Choose from our range of membership plans or create your own custom package tailored to your needs."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 overflow-hidden">
            <div 
              className="absolute inset-0 w-full h-full z-0 opacity-40"
              style={{ 
                transform: `perspective(1000px) translateZ(${scrollY * 0.05}px)` 
              }}
            >
              <ParticlesScene className="w-full h-full" />
            </div>
            
            <div className="container-custom relative z-10">
              <AnimatedSection className="text-center max-w-4xl mx-auto" direction="zoom">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4 neon-border">
                  Flexible Pricing
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-future">
                  Hire Expert Developers Starting at Just ₹299
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Choose from our range of membership plans or create your own custom package 
                  tailored to your specific project requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-futuristic" asChild>
                    <a href="#plans">View Plans</a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/50" asChild>
                    <a href="#custom-pricing">Custom Pricing</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Plans Section */}
          <section className="py-16 bg-muted/30" id="plans">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="up">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Premium Memberships
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Select Your Perfect Plan
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our membership plans offer flexible options for projects of all sizes, from simple websites to complex applications.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {membershipPlans.map((plan, index) => (
                  <AnimatedSection
                    key={plan.name}
                    className={cn(
                      "card-futuristic flex flex-col h-full",
                      plan.highlighted && "ring-2 ring-primary relative shadow-lg"
                    )}
                    delay={index * 100}
                    direction={index % 2 === 0 ? "up" : "zoom"}
                    speed="normal"
                    intensity="medium"
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-0 right-0 text-center">
                        <span className="bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-5">
                      <IndianRupee className="h-5 w-5 text-muted-foreground" />
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">/ project</span>
                    </div>
                    <p className="text-muted-foreground mb-5">{plan.description}</p>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature) => (
                        <div key={feature.feature} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/50 mr-2 shrink-0" />
                          )}
                          <span className={cn(
                            "text-sm",
                            !feature.included && "text-muted-foreground/50"
                          )}>
                            {feature.feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className={cn(
                        "mt-auto w-full",
                        plan.highlighted ? "btn-futuristic" : ""
                      )}
                      variant={plan.highlighted ? "default" : "outline"}
                      asChild
                    >
                      <Link to="/contact">{plan.cta}</Link>
                    </Button>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Developer Perks Section */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="up">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Developer Benefits
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Perks of Working With Us
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join our team of talented developers and enjoy these exclusive benefits
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Laptop className="h-10 w-10" />,
                    title: "Latest Equipment",
                    description: "Access to high-end development machines and latest software licenses for maximum productivity"
                  },
                  {
                    icon: <Clock className="h-10 w-10" />,
                    title: "Flexible Hours",
                    description: "Work on your own schedule with our flexible hours policy to maintain work-life balance"
                  },
                  {
                    icon: <Coffee className="h-10 w-10" />,
                    title: "Premium Workspace",
                    description: "Enjoy our modern office with unlimited coffee, snacks, and ergonomic workstations"
                  },
                  {
                    icon: <Code className="h-10 w-10" />,
                    title: "Technical Growth",
                    description: "Regular workshops, training sessions, and conference opportunities to enhance your skills"
                  },
                  {
                    icon: <Users className="h-10 w-10" />,
                    title: "Collaborative Culture",
                    description: "Work in a supportive team environment with peer code reviews and knowledge sharing"
                  },
                  {
                    icon: <Gift className="h-10 w-10" />,
                    title: "Project Bonuses",
                    description: "Earn additional bonuses for completed projects based on client satisfaction and timely delivery"
                  },
                  {
                    icon: <Headphones className="h-10 w-10" />,
                    title: "Remote Options",
                    description: "Hybrid work model with the option to work remotely several days a week"
                  },
                  {
                    icon: <Shield className="h-10 w-10" />,
                    title: "Career Advancement",
                    description: "Clear career progression paths with regular performance reviews and promotion opportunities"
                  }
                ].map((perk, index) => (
                  <AnimatedSection
                    key={perk.title}
                    className="card-futuristic"
                    delay={index * 100}
                    direction={index % 4 === 0 ? "up" : index % 4 === 1 ? "zoom" : index % 4 === 2 ? "left" : "right"}
                  >
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5 neon-border">
                      {perk.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{perk.title}</h3>
                    <p className="text-muted-foreground">{perk.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Custom Pricing Calculator */}
          <section className="py-16" id="custom-pricing">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="zoom">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Custom Pricing
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Build Your Own Plan
                </h2>
                <p className="text-muted-foreground text-lg">
                  Create a tailor-made solution that perfectly fits your project requirements and budget.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                  <AnimatedSection className="card-futuristic" direction="left" delay={100}>
                    <h3 className="text-xl font-bold mb-6">1. Select Your Requirements</h3>
                    
                    {/* Number of developers */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium mb-2">Number of Developers</label>
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setDevelopers(Math.max(1, developers - 1))}
                          disabled={developers <= 1}
                        >
                          -
                        </Button>
                        <span className="text-2xl font-bold min-w-10 text-center">{developers}</span>
                        <Button 
                          variant="outline" 
                          onClick={() => setDevelopers(Math.min(10, developers + 1))}
                          disabled={developers >= 10}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    {/* Project Duration */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium mb-2">Project Duration (Days)</label>
                      <Slider
                        value={[days]}
                        onValueChange={(value) => setDays(value[0])}
                        max={30}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1 day</span>
                        <span>{days} days</span>
                        <span>30 days</span>
                      </div>
                    </div>
                    
                    {/* Technologies */}
                    <div>
                      <label className="block text-sm font-medium mb-4">Technologies</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'html', label: 'HTML', icon: <Code className="h-4 w-4 mr-2" /> },
                          { id: 'css', label: 'CSS', icon: <Palette className="h-4 w-4 mr-2" /> },
                          { id: 'tailwind', label: 'Tailwind', icon: <Palette className="h-4 w-4 mr-2" /> },
                          { id: 'typescript', label: 'TypeScript', icon: <Code className="h-4 w-4 mr-2" /> },
                          { id: 'react', label: 'React', icon: <Code className="h-4 w-4 mr-2" /> },
                          { id: 'node', label: 'Node.js', icon: <Code className="h-4 w-4 mr-2" /> },
                          { id: 'threejs', label: 'Three.js', icon: <Code className="h-4 w-4 mr-2" /> },
                        ].map(tech => (
                          <Button
                            key={tech.id}
                            variant={selectedTechnologies.has(tech.id) ? "default" : "outline"}
                            className={cn("flex items-center justify-start", 
                              selectedTechnologies.has(tech.id) && "bg-primary/20 text-primary hover:bg-primary/30"
                            )}
                            onClick={() => toggleTechnology(tech.id)}
                          >
                            {tech.icon}
                            {tech.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
                
                <div className="lg:col-span-2">
                  <AnimatedSection className="card-futuristic sticky top-24" direction="right" delay={200}>
                    <h3 className="text-xl font-bold mb-6">Your Custom Plan</h3>
                    
                    <div className="mb-8 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Developers:</span>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-primary" />
                          <span>{developers}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-primary" />
                          <span>{days} days</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Technologies:</span>
                        <div className="flex items-center">
                          <Code className="h-4 w-4 mr-1 text-primary" />
                          <span>{selectedTechnologies.size}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Estimated Price:</span>
                          <div className="flex items-center text-xl font-bold text-primary">
                            <IndianRupee className="h-5 w-5 mr-1" />
                            <span>{customPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full btn-futuristic" asChild>
                      <Link to="/contact">Get Started</Link>
                    </Button>
                    
                    <p className="mt-4 text-xs text-muted-foreground text-center">
                      Final quote may vary based on project specifics. 
                      Our team will provide a detailed estimate after consultation.
                    </p>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="up">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Why Choose Us
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  The WeCode Advantage
                </h2>
                <p className="text-muted-foreground text-lg">
                  We combine technical expertise with business insight to deliver outstanding results.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Users className="h-10 w-10" />,
                    title: "Expert Team",
                    description: "Our developers are vetted professionals with years of experience across various technologies."
                  },
                  {
                    icon: <Gauge className="h-10 w-10" />,
                    title: "Fast Delivery",
                    description: "We understand the importance of timely delivery and always aim to exceed expectations."
                  },
                  {
                    icon: <Shield className="h-10 w-10" />,
                    title: "Quality Assurance",
                    description: "Rigorous testing and quality control processes ensure your project is flawless."
                  },
                  {
                    icon: <DollarSign className="h-10 w-10" />,
                    title: "Transparent Pricing",
                    description: "No hidden costs or surprises. Our pricing is clear and competitive."
                  },
                  {
                    icon: <Smartphone className="h-10 w-10" />,
                    title: "Responsive Support",
                    description: "Our team is always available to assist you with any questions or concerns."
                  },
                  {
                    icon: <Code className="h-10 w-10" />,
                    title: "Clean Code",
                    description: "We write maintainable, well-documented code that follows best practices."
                  }
                ].map((feature, index) => (
                  <AnimatedSection
                    key={feature.title}
                    className="card-futuristic"
                    delay={index * 100}
                    direction={index % 3 === 0 ? "up" : index % 3 === 1 ? "zoom" : "left"}
                  >
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5 neon-border">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="card-futuristic p-8 md:p-12 text-center" direction="zoom">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Contact us today to discuss your project requirements and how our team can help bring your vision to life.
                </p>
                <Button size="lg" className="btn-futuristic" asChild>
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
