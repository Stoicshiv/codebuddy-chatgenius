
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CodeScene from "@/components/3d/CodeScene";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  technologies: string[];
  clientName?: string;
  featured?: boolean;
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects: Project[] = [
    {
      id: "project1",
      title: "E-commerce Platform",
      description: "A comprehensive online shopping platform with advanced product filtering, secure payment processing, and inventory management.",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      link: "#",
      clientName: "FashionBoutique Inc.",
      featured: true
    },
    {
      id: "project2",
      title: "Health & Fitness App",
      description: "Mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
      category: "mobile",
      technologies: ["React Native", "Firebase", "HealthKit API", "Google Fit API"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      link: "#",
      clientName: "FitLife Solutions"
    },
    {
      id: "project3",
      title: "Real Estate Portal",
      description: "Interactive real estate listing website with map integration, virtual tours, and advanced search functionality.",
      category: "web",
      technologies: ["Next.js", "PostgreSQL", "Google Maps API", "AWS S3"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      link: "#",
      clientName: "HomeQuest Realty",
      featured: true
    },
    {
      id: "project4",
      title: "Productivity Dashboard",
      description: "Team collaboration and project management dashboard with task tracking and performance analytics.",
      category: "desktop",
      technologies: ["Electron", "React", "TypeScript", "Chart.js"],
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
      link: "#",
      clientName: "ProductivityPro Corp"
    },
    {
      id: "project5",
      title: "Event Booking Platform",
      description: "End-to-end event management platform with ticket sales, attendee management, and organizer dashboard.",
      category: "web",
      technologies: ["Vue.js", "Laravel", "MySQL", "Stripe"],
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      link: "#",
      clientName: "EventMaster Inc."
    },
    {
      id: "project6",
      title: "Inventory Management System",
      description: "Comprehensive inventory tracking system with barcode scanning, analytics, and supplier management.",
      category: "desktop",
      technologies: ["C#", ".NET", "SQL Server", "WPF"],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      link: "#",
      clientName: "Global Supply Co."
    },
    {
      id: "project7",
      title: "Food Delivery App",
      description: "Mobile application for ordering food with real-time tracking, payment processing, and restaurant management.",
      category: "mobile",
      technologies: ["Flutter", "Firebase", "Google Maps API", "Stripe"],
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80",
      link: "#",
      clientName: "QuickBite Technologies",
      featured: true
    },
    {
      id: "project8",
      title: "Learning Management System",
      description: "Comprehensive e-learning platform with course creation, student management, and progress tracking.",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      link: "#",
      clientName: "EduTech Solutions"
    },
  ];

  const filters = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Development" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "desktop", label: "Desktop Software" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Our Projects - CodeBuddy Portfolio</title>
        <meta
          name="description"
          content="Explore CodeBuddy's portfolio of successful web, mobile, and desktop application projects delivered to clients across various industries."
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
                    Innovative Solutions for Real-World Challenges
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Explore our collection of successful projects that demonstrate our expertise in delivering high-quality digital solutions across various industries.
                  </p>
                </AnimatedSection>
                
                <AnimatedSection direction="right" className="h-[400px]">
                  <CodeScene className="w-full h-full" />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Featured Work
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Highlighted Projects
                </h2>
                <p className="text-muted-foreground text-lg">
                  These projects showcase our ability to solve complex problems with elegant and effective solutions.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {projects
                  .filter(project => project.featured)
                  .map((project, index) => (
                    <AnimatedSection
                      key={project.id}
                      className="group relative overflow-hidden rounded-xl shadow-md col-span-1"
                      delay={index * 100}
                      direction="up"
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 flex flex-col justify-end p-6">
                        <div className="">
                          <div className="text-white text-xl font-bold mb-2">{project.title}</div>
                          <p className="text-white/80 mb-4 text-sm line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="bg-white/10 text-white text-xs px-2 py-1 rounded">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="bg-white/10 text-white text-xs px-2 py-1 rounded">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                          <a
                            href={project.link}
                            className="inline-flex items-center text-white text-sm font-medium"
                          >
                            View Project
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
              </div>
            </div>
          </section>

          {/* Project Gallery */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Complete Portfolio
                </h2>
                <p className="text-muted-foreground text-lg">
                  Browse our full range of projects across different categories.
                </p>
              </AnimatedSection>

              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      activeFilter === filter.value
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredProjects.map((project, index) => (
                  <AnimatedSection
                    key={project.id}
                    className="group relative overflow-hidden rounded-xl shadow-md"
                    delay={index * 100}
                    direction="up"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-white text-xl font-bold mb-2">{project.title}</div>
                        <p className="text-white/80 mb-4 text-sm line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="bg-white/10 text-white text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="bg-white/10 text-white text-xs px-2 py-1 rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        <a
                          href={project.link}
                          className="inline-flex items-center text-white text-sm font-medium"
                        >
                          View Project
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-muted/30 py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Build Your Next Project?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Contact our team today to discuss how we can help bring your vision to life with our expertise.
                </p>
                <Link to="/contact" className="btn-hover-effect inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium">
                  Start Your Project
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
