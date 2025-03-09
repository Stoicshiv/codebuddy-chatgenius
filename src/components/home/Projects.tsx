
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight, ExternalLink } from "lucide-react";
import AnimatedSection from "../shared/AnimatedSection";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const projects: Project[] = [
    {
      id: "project1",
      title: "E-commerce Platform",
      description: "A comprehensive online shopping platform with advanced product filtering and secure payment processing.",
      category: "web",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      link: "/projects/e-commerce-platform",
    },
    {
      id: "project2",
      title: "Health & Fitness App",
      description: "Mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      link: "/projects/health-fitness-app",
    },
    {
      id: "project3",
      title: "Real Estate Portal",
      description: "Interactive real estate listing website with map integration, virtual tours, and advanced search functionality.",
      category: "web",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      link: "/projects/real-estate-portal",
    },
    {
      id: "project4",
      title: "Productivity Dashboard",
      description: "Team collaboration and project management dashboard with task tracking and performance analytics.",
      category: "desktop",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
      link: "/projects/productivity-dashboard",
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
    <section className="py-20" id="projects">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Recent Projects We've Delivered
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our collection of successful projects that demonstrate our expertise and commitment to quality.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                  <p className="text-white/80 mb-4 text-sm">{project.description}</p>
                  <Link
                    to={project.link}
                    className="inline-flex items-center text-white text-sm font-medium"
                  >
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link
            to="/projects"
            className="btn-hover-effect inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium"
          >
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projects;
