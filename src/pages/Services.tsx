import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import DNAScene from "@/components/3d/DNAScene";

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Services - CodeBuddy Development</title>
        <meta
          name="description"
          content="Explore the range of professional development services offered by CodeBuddy including web development, mobile apps, and coding assistance."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 overflow-hidden">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection direction="left">
                  <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                    Our Services
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Expert Solutions For Your Digital Needs
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    We provide end-to-end development services tailored to your business requirements, helping you create efficient and scalable digital products.
                  </p>
                </AnimatedSection>
                
                <AnimatedSection direction="right" className="h-[400px]">
                  <DNAScene className="w-full h-full" />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Services List */}
          <section className="py-16 bg-muted/30" id="website">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Comprehensive Services
                </h2>
                <p className="text-muted-foreground text-lg">
                  We offer a wide range of development services to meet all your digital needs.
                </p>
              </AnimatedSection>

              <div className="space-y-24">
                {/* Website Development */}
                <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                      Website Development
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Custom Websites That Convert</h3>
                    <p className="text-muted-foreground mb-6">
                      We design and develop responsive, performance-optimized websites that provide exceptional user experiences and help you achieve your business goals.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Responsive web design for all devices",
                        "E-commerce solutions with secure payment gateways",
                        "Content management systems for easy updates",
                        "SEO-friendly structure for better visibility",
                        "Performance optimization for faster loading"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-hover glass rounded-xl overflow-hidden shadow-lg order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Website Development"
                      className="w-full h-64 object-cover object-center"
                    />
                  </div>
                </AnimatedSection>

                {/* Mobile App Development */}
                <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="mobile">
                  <div className="card-hover glass rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Mobile App Development"
                      className="w-full h-64 object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                      Mobile App Development
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Native & Cross-Platform Mobile Apps</h3>
                    <p className="text-muted-foreground mb-6">
                      We build high-performance mobile applications for iOS and Android platforms that provide seamless user experiences and help you reach your mobile audience.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Native iOS and Android development",
                        "Cross-platform solutions with React Native",
                        "Intuitive UI/UX design for mobile interfaces",
                        "Integration with device features",
                        "Continuous testing and quality assurance"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>

                {/* Other services... */}
                <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="assistance">
                  <div className="order-2 lg:order-1">
                    <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                      Coding Assistance
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Expert Help When You Need It</h3>
                    <p className="text-muted-foreground mb-6">
                      Our team of experienced developers can assist with your existing projects, provide code reviews, fix bugs, or help you overcome technical challenges.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Comprehensive code reviews and audits",
                        "Bug fixing and performance optimization",
                        "Technical consulting and architecture design",
                        "Development team augmentation",
                        "Legacy system modernization"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-hover glass rounded-xl overflow-hidden shadow-lg order-1 lg:order-2">
                    <img 
                      src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
                      alt="Coding Assistance"
                      className="w-full h-64 object-cover object-center"
                    />
                  </div>
                </AnimatedSection>
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
