
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Globe, Smartphone, Code, Palette, Database, Zap, ArrowRight } from "lucide-react";
import AnimatedSection from "../shared/AnimatedSection";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, delay, link }) => {
  return (
    <AnimatedSection
      className="card-hover glass rounded-xl p-6 flex flex-col h-full"
      delay={delay}
      direction="up"
    >
      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-5 flex-1">{description}</p>
      <Link
        to={link}
        className="group inline-flex items-center text-primary font-medium animated-border"
      >
        Learn More
        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
      </Link>
    </AnimatedSection>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website Development",
      description: "Custom websites built to your specifications, from simple landing pages to complex web applications.",
      link: "/services#website",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
      link: "/services#mobile",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Coding Assistance",
      description: "Expert guidance and troubleshooting for your development projects, helping you overcome technical challenges.",
      link: "/services#assistance",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design",
      description: "Intuitive and engaging user interfaces that enhance user experience and drive engagement with your product.",
      link: "/services#design",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Solutions",
      description: "Robust database design, implementation, and optimization to ensure your data is secure and efficient.",
      link: "/services#database",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      description: "Speed up your applications and websites with our expert optimization services for the best user experience.",
      link: "/services#performance",
    },
  ];

  return (
    <section className="py-20 bg-muted/30" id="services">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Comprehensive Coding Services for Your Digital Needs
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to deployment, we provide end-to-end development solutions tailored to your specific requirements.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              delay={index * 100}
            />
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link
            to="/services"
            className="btn-hover-effect inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium"
          >
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
