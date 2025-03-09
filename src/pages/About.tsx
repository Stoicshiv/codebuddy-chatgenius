
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ChatBot from "@/components/ui/ChatBot";
import { CheckCircle, Code, Users, Award, Coffee } from "lucide-react";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: "5+", label: "Years of Experience", icon: <Coffee className="w-5 h-5 text-primary" /> },
    { value: "500+", label: "Projects Completed", icon: <Code className="w-5 h-5 text-primary" /> },
    { value: "50+", label: "Expert Coders", icon: <Users className="w-5 h-5 text-primary" /> },
    { value: "20+", label: "Industry Awards", icon: <Award className="w-5 h-5 text-primary" /> },
  ];

  const values = [
    {
      title: "Excellence",
      description: "We pursue excellence in every line of code we write, ensuring top-notch quality in all our deliverables.",
    },
    {
      title: "Innovation",
      description: "We stay ahead of the technological curve, bringing innovative solutions to complex problems.",
    },
    {
      title: "Collaboration",
      description: "We believe in working closely with our clients, ensuring their vision is realized through collaborative development.",
    },
    {
      title: "Integrity",
      description: "We maintain the highest standards of professional integrity in all our business relationships.",
    },
    {
      title: "Adaptability",
      description: "We embrace change and quickly adapt to new technologies and methodologies in our field.",
    },
    {
      title: "User-Centric",
      description: "We prioritize user experience in everything we build, creating intuitive and accessible digital products.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - CodeBuddy</title>
        <meta 
          name="description" 
          content="Learn about CodeBuddy's team of expert coders and our mission to provide exceptional software development services."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="pt-32 pb-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center max-w-3xl mx-auto">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  About Us
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                  We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">CodeBuddy</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  A team of passionate coders dedicated to transforming ideas into exceptional digital experiences.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-20">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection direction="left">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-xl"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-xl"></div>
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                      alt="CodeBuddy Team"
                      className="w-full h-auto rounded-xl relative z-10"
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection direction="right">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Our Story</h2>
                    <p className="text-muted-foreground">
                      Founded in 2018, CodeBuddy started with a simple mission: to make high-quality software development accessible to businesses of all sizes. What began as a small team of three developers has grown into a thriving community of over 50 expert coders, designers, and project managers.
                    </p>
                    <p className="text-muted-foreground">
                      We've worked with startups, small businesses, and enterprise clients across various industries, helping them bring their digital visions to life. Our commitment to quality, innovation, and client satisfaction has made us a trusted partner for all software development needs.
                    </p>
                    <p className="text-muted-foreground">
                      Today, we continue to evolve and expand our expertise, staying ahead of industry trends to deliver cutting-edge solutions that drive business growth and user engagement.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <AnimatedSection
                    key={stat.label}
                    className="text-center"
                    delay={index * 100}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-sm h-full flex flex-col items-center justify-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-20">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Core Values
                </h2>
                <p className="text-muted-foreground text-lg">
                  These principles guide our work and define our company culture.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <AnimatedSection
                    key={value.title}
                    className="glass p-6 rounded-xl"
                    delay={index * 100}
                    direction="up"
                  >
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <CheckCircle className="text-primary w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-secondary text-white">
            <div className="container-custom">
              <AnimatedSection className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Work With Us?
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Let's turn your ideas into reality. Contact us today to discuss your project.
                </p>
                <a
                  href="/contact"
                  className="btn-hover-effect inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium"
                >
                  Get in Touch
                </a>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
};

export default About;
