
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { 
  Briefcase, 
  Code, 
  Users, 
  Globe, 
  Clock, 
  Laptop, 
  Heart, 
  Target, 
  Lightbulb, 
  Filter, 
  Search, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CodeScene from "@/components/3d/CodeScene";

interface JobPosition {
  id: string;
  title: string;
  type: "Full-time" | "Contract" | "Part-time";
  location: "Remote" | "Hybrid" | "On-site";
  experience: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  category: "development" | "design" | "management";
}

const Careers: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const positions: JobPosition[] = [
    {
      id: "frontend-dev",
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      experience: "1-3 years",
      skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
      description: "We're looking for a passionate Frontend Developer to join our team and create beautiful, responsive user interfaces for our clients' projects.",
      responsibilities: [
        "Develop and maintain responsive web applications",
        "Collaborate with UI/UX designers to implement designs",
        "Optimize applications for maximum speed and scalability",
        "Work with cross-functional teams to deliver complete features"
      ],
      requirements: [
        "1-3 years of experience in frontend development",
        "Proficiency in HTML, CSS, JavaScript, and React",
        "Experience with modern CSS frameworks, preferably Tailwind CSS",
        "Knowledge of responsive design principles",
        "Understanding of cross-browser compatibility issues",
        "Good problem-solving skills"
      ],
      category: "development"
    },
    {
      id: "fullstack-dev",
      title: "Full-Stack Developer",
      type: "Full-time",
      location: "Remote",
      experience: "3-5 years",
      skills: ["JavaScript", "TypeScript", "Node.js", "React", "MongoDB", "API Development"],
      description: "Join our team as a Full-Stack Developer and work on exciting projects from concept to deployment, handling both frontend and backend development.",
      responsibilities: [
        "Design and develop both frontend and backend components",
        "Create and maintain RESTful APIs",
        "Implement database schema and queries",
        "Ensure high performance and responsiveness of applications",
        "Collaborate with the team to design and launch new features"
      ],
      requirements: [
        "3-5 years of experience in full-stack development",
        "Strong knowledge of JavaScript/TypeScript, Node.js, and React",
        "Experience with database systems like MongoDB or PostgreSQL",
        "Familiarity with cloud services (AWS, Azure, or GCP)",
        "Understanding of CI/CD pipelines",
        "Excellent problem-solving and communication skills"
      ],
      category: "development"
    },
    {
      id: "threejs-dev",
      title: "Three.js Developer",
      type: "Contract",
      location: "Remote",
      experience: "2+ years",
      skills: ["JavaScript", "Three.js", "WebGL", "3D Modeling", "Animation"],
      description: "We're seeking a skilled Three.js Developer to create immersive 3D experiences for our premium client projects.",
      responsibilities: [
        "Develop interactive 3D web applications using Three.js",
        "Optimize 3D models and animations for web performance",
        "Create engaging visual effects and animations",
        "Collaborate with designers to implement 3D UI elements",
        "Troubleshoot cross-browser and performance issues"
      ],
      requirements: [
        "2+ years of experience with Three.js or similar WebGL frameworks",
        "Strong JavaScript skills",
        "Understanding of 3D graphics principles",
        "Experience with 3D modeling software is a plus",
        "Portfolio demonstrating 3D web projects",
        "Excellent problem-solving skills"
      ],
      category: "development"
    },
    {
      id: "ui-ux-designer",
      title: "UI/UX Designer",
      type: "Full-time",
      location: "Hybrid",
      experience: "2-4 years",
      skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Visual Design"],
      description: "Join our creative team as a UI/UX Designer to create intuitive and visually appealing interfaces for web and mobile applications.",
      responsibilities: [
        "Create wireframes, prototypes, and high-fidelity designs",
        "Conduct user research and usability testing",
        "Develop user personas and journey maps",
        "Collaborate with developers to ensure design implementation",
        "Create and maintain design systems"
      ],
      requirements: [
        "2-4 years of experience in UI/UX design",
        "Proficiency in Figma or similar design tools",
        "Strong portfolio demonstrating web and mobile designs",
        "Understanding of user-centered design principles",
        "Knowledge of current design trends and best practices",
        "Excellent communication and collaboration skills"
      ],
      category: "design"
    },
    {
      id: "project-manager",
      title: "Technical Project Manager",
      type: "Full-time",
      location: "Remote",
      experience: "3+ years",
      skills: ["Project Management", "Agile", "Client Communication", "Technical Background"],
      description: "We're looking for a Technical Project Manager to oversee our development projects and ensure successful delivery to our clients.",
      responsibilities: [
        "Manage multiple development projects simultaneously",
        "Create and maintain project plans, schedules, and budgets",
        "Facilitate communication between development teams and clients",
        "Identify and mitigate project risks",
        "Ensure projects are delivered on time and within scope"
      ],
      requirements: [
        "3+ years of experience in managing technical projects",
        "Strong understanding of software development lifecycles",
        "Experience with Agile methodologies",
        "Excellent communication and leadership skills",
        "Technical background or experience in development is a plus",
        "Problem-solving mindset"
      ],
      category: "management"
    }
  ];

  const filteredPositions = positions.filter(position => {
    const matchesCategory = activeFilter === "all" || position.category === activeFilter;
    const matchesSearch = position.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         position.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const benefits = [
    { 
      icon: <Globe className="h-8 w-8" />, 
      title: "Remote-First Culture", 
      description: "Work from anywhere in the world. We believe in giving you the freedom to work where you're most productive." 
    },
    { 
      icon: <Clock className="h-8 w-8" />, 
      title: "Flexible Hours", 
      description: "We focus on results, not hours. Set your schedule to maintain a healthy work-life balance." 
    },
    { 
      icon: <Laptop className="h-8 w-8" />, 
      title: "Latest Equipment", 
      description: "Receive a stipend for your home office setup and the latest tools to do your best work." 
    },
    { 
      icon: <Heart className="h-8 w-8" />, 
      title: "Health Benefits", 
      description: "Comprehensive health insurance for you and your family, because your well-being matters to us." 
    },
    { 
      icon: <Target className="h-8 w-8" />, 
      title: "Growth Opportunities", 
      description: "Regular feedback, mentorship, and a clear path for advancement in your career." 
    },
    { 
      icon: <Lightbulb className="h-8 w-8" />, 
      title: "Learning Budget", 
      description: "Annual budget for courses, conferences, and resources to keep your skills sharp." 
    }
  ];

  return (
    <>
      <Helmet>
        <title>Careers - Join the CodeBuddy Team</title>
        <meta
          name="description"
          content="Join our team of talented developers and designers. Explore career opportunities at CodeBuddy and help us build amazing digital experiences."
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
                    Join Our Team
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-future">
                    Build The Future With Us
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    We're looking for talented developers who are passionate about creating exceptional digital experiences. Join our team and work on exciting projects with cutting-edge technologies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="btn-futuristic" asChild>
                      <a href="#open-positions">View Open Positions</a>
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/50" asChild>
                      <a href="#why-join">Why Join Us</a>
                    </Button>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection direction="right" className="h-[400px] perspective-1000" delay={200}>
                  <div 
                    className="w-full h-full transform-3d"
                    style={{ 
                      transform: `perspective(1000px) rotateY(${scrollY * 0.01}deg) rotateX(${scrollY * 0.005}deg)`
                    }}
                  >
                    <CodeScene className="w-full h-full" />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Why Join Us */}
          <section className="py-16 bg-muted/30" id="why-join">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="up">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Why CodeBuddy
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Why Join Our Team
                </h2>
                <p className="text-muted-foreground text-lg">
                  At CodeBuddy, we believe in creating an environment where developers can thrive and grow while working on exciting projects.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <AnimatedSection
                    key={benefit.title}
                    className="card-futuristic"
                    delay={index * 100}
                    direction={index % 3 === 0 ? "up" : index % 3 === 1 ? "zoom" : "left"}
                  >
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5 neon-border">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-16" id="open-positions">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="zoom">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Open Positions
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Join Our Talented Team
                </h2>
                <p className="text-muted-foreground text-lg">
                  Check out our current job openings and find the perfect role for your skills and experience.
                </p>
              </AnimatedSection>

              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by title or skill..." 
                      className="pl-10 w-full md:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Filter:</span>
                    <Tabs defaultValue="all" className="w-fit" onValueChange={setActiveFilter}>
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="development">Development</TabsTrigger>
                        <TabsTrigger value="design">Design</TabsTrigger>
                        <TabsTrigger value="management">Management</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </div>

              {filteredPositions.length > 0 ? (
                <div className="space-y-6">
                  {filteredPositions.map((position, index) => (
                    <AnimatedSection
                      key={position.id}
                      className="card-futuristic"
                      delay={index * 100}
                      direction="up"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="bg-primary/10">{position.type}</Badge>
                            <Badge variant="outline" className="bg-primary/10">{position.location}</Badge>
                            <Badge variant="outline" className="bg-primary/10">{position.experience}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4 max-w-3xl">{position.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {position.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="bg-secondary/10">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                          <Button className="lg:whitespace-nowrap">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value="details">
                          <AccordionTrigger>View Details</AccordionTrigger>
                          <AccordionContent>
                            <div className="mt-4 space-y-6">
                              <div>
                                <h4 className="font-bold mb-2">Responsibilities:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {position.responsibilities.map((item, i) => (
                                    <li key={i} className="text-muted-foreground">{item}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-bold mb-2">Requirements:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {position.requirements.map((item, i) => (
                                    <li key={i} className="text-muted-foreground">{item}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <Button size="sm" asChild>
                                <Link to="/contact">Apply Now</Link>
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </AnimatedSection>
                  ))}
                </div>
              ) : (
                <AnimatedSection className="text-center py-12" direction="fade">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No positions found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any positions matching your search criteria.
                  </p>
                  <Button variant="outline" onClick={() => {setSearchTerm(""); setActiveFilter("all");}}>
                    Reset Filters
                  </Button>
                </AnimatedSection>
              )}
            </div>
          </section>

          {/* Application Process */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="up">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  How to Apply
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Hiring Process
                </h2>
                <p className="text-muted-foreground text-lg">
                  We've designed a straightforward process to help us find the right talent quickly.
                </p>
              </AnimatedSection>

              <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {[
                  {
                    title: "Application Review",
                    description: "Submit your resume and portfolio. Our team will review your application and get back to you within one week."
                  },
                  {
                    title: "Technical Assessment",
                    description: "Complete a small coding challenge or design task related to the position you're applying for."
                  },
                  {
                    title: "Initial Interview",
                    description: "Meet with our team to discuss your experience, skills, and how you approach problem-solving."
                  },
                  {
                    title: "Technical Interview",
                    description: "Dive deeper into your technical expertise with our senior developers or designers."
                  },
                  {
                    title: "Final Interview",
                    description: "Meet with the team leads to discuss culture fit, career goals, and any remaining questions."
                  },
                  {
                    title: "Offer & Onboarding",
                    description: "Receive and review your offer. Once accepted, we'll start the onboarding process to get you set up for success."
                  },
                ].map((step, index) => (
                  <AnimatedSection
                    key={step.title}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                    delay={index * 100}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary/20 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card-hover glass rounded-xl p-4 md:p-6">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto" direction="zoom">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Questions & Answers
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-lg">
                  Find answers to commonly asked questions about working at CodeBuddy.
                </p>
              </AnimatedSection>

              <AnimatedSection className="max-w-3xl mx-auto" direction="up">
                <Accordion type="single" collapsible className="space-y-4">
                  {[
                    {
                      question: "Do you hire developers from outside India?",
                      answer: "Yes, we're a globally distributed team and hire talented developers from around the world. We believe in finding the best talent regardless of location."
                    },
                    {
                      question: "What technologies does CodeBuddy primarily work with?",
                      answer: "We work with a wide range of technologies, with a focus on modern JavaScript frameworks (React, Vue.js), TypeScript, Node.js, and Three.js for 3D experiences. We're always exploring new technologies to deliver the best solutions for our clients."
                    },
                    {
                      question: "What is the interview process like?",
                      answer: "Our interview process typically consists of an initial application review, a technical assessment relevant to the role, and 2-3 interviews. The entire process usually takes 2-3 weeks from application to offer."
                    },
                    {
                      question: "Do you offer internships or entry-level positions?",
                      answer: "Yes, we periodically offer internships and entry-level positions for promising candidates. These opportunities are a great way to start your career in development or design."
                    },
                    {
                      question: "What kind of projects will I be working on?",
                      answer: "Our projects range from e-commerce websites and web applications to interactive 3D experiences and complex full-stack solutions. You'll have the opportunity to work on diverse and challenging projects across various industries."
                    },
                    {
                      question: "What are the growth opportunities at CodeBuddy?",
                      answer: "We believe in promoting from within and offer clear career progression paths. You'll receive regular feedback, mentorship, and opportunities to lead projects as you grow with us."
                    }
                  ].map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="card-hover border rounded-lg px-4">
                      <AccordionTrigger className="text-lg font-medium py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AnimatedSection>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="card-futuristic p-8 md:p-12 text-center" direction="zoom">
                <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We're always looking for talented individuals to join our team. Check out our open positions or send us your resume for future opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-futuristic" asChild>
                    <a href="#open-positions">View Open Positions</a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/50" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Careers;
