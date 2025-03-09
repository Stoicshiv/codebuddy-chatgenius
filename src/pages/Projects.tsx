
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ParticlesScene from "@/components/3d/ParticlesScene";
import { ArrowRight } from "lucide-react";

const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A complete e-commerce solution with product management, cart functionality, and secure checkout process.",
    image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    description: "A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Mobile Development",
    technologies: ["React Native", "Firebase", "Redux", "Health APIs"],
  },
  {
    id: 3,
    title: "Property Management System",
    description: "A comprehensive solution for real estate companies to manage properties, tenants, and maintenance requests.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    category: "Web Development",
    technologies: ["Angular", ".NET Core", "SQL Server", "Azure"],
  },
  {
    id: 4,
    title: "Inventory Management Dashboard",
    description: "A dashboard for tracking inventory levels, sales, and supply chain management with analytics.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Web Development",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
  },
  {
    id: 5,
    title: "Educational Learning Platform",
    description: "An interactive platform for online courses with video lessons, quizzes, and student progress tracking.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    id: 6,
    title: "Restaurant Ordering System",
    description: "A digital menu and ordering system for restaurants with kitchen management and payment integration.",
    image: "https://images.unsplash.com/photo-1601314002592-b8734bca6604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
    category: "Mobile Development",
    technologies: ["Flutter", "Firebase", "Stripe", "CloudKit"],
  },
];

const Projects: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Projects - CodeBuddy Development Portfolio</title>
        <meta
          name="description"
          content="Explore CodeBuddy's portfolio of successful web and mobile development projects across various industries."
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
                    Our Portfolio
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Showcasing Our Best Work
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Explore our collection of successful projects that demonstrate our expertise in creating digital solutions across various industries and technologies.
                  </p>
                </AnimatedSection>
                
                <AnimatedSection direction="right" className="h-[400px]">
                  <ParticlesScene className="w-full h-full" />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Project Showcase */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Recent Projects
                </h2>
                <p className="text-muted-foreground text-lg">
                  Take a look at some of our latest and most successful client projects.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, index) => (
                  <AnimatedSection
                    key={project.id}
                    className="card-hover glass rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                    delay={index * 100}
                    direction="up"
                  >
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {project.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        {project.description}
                      </p>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        to="#"
                        className="group inline-flex items-center text-primary font-medium animated-border"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Contact us today to discuss your project requirements and see how our development expertise can help bring your vision to life.
                </p>
                <Link
                  to="/contact"
                  className="btn-hover-effect bg-primary text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Projects;
