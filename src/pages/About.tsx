
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CodeScene from "@/components/3d/CodeScene";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About CodeBuddy - Our Mission and Team</title>
        <meta
          name="description"
          content="Learn about CodeBuddy's mission, values, and the team of expert developers behind our coding services."
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
                    Our Story
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    We Build Digital Solutions That Drive Success
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    CodeBuddy was founded in 2018 with a simple mission: to make quality coding and development services accessible to businesses of all sizes. Our team of expert developers, designers, and consultants work together to transform your ideas into powerful digital solutions.
                  </p>
                </AnimatedSection>
                
                <AnimatedSection direction="right" className="h-[400px]">
                  <CodeScene className="w-full h-full" />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Our Values
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  The Principles That Guide Our Work
                </h2>
                <p className="text-muted-foreground text-lg">
                  At CodeBuddy, we believe in creating meaningful digital experiences driven by these core values.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Excellence",
                    description: "We strive for excellence in every line of code we write, every design we create, and every solution we deliver."
                  },
                  {
                    title: "Innovation",
                    description: "We embrace new technologies and approaches to solve complex problems and create cutting-edge solutions."
                  },
                  {
                    title: "Collaboration",
                    description: "We work closely with our clients to understand their needs and involve them throughout the development process."
                  },
                  {
                    title: "Integrity",
                    description: "We maintain the highest standards of professional integrity in all our business relationships."
                  },
                  {
                    title: "Continuous Learning",
                    description: "We constantly update our skills and knowledge to stay at the forefront of our industry."
                  },
                  {
                    title: "User-Centric",
                    description: "We focus on creating exceptional user experiences that drive engagement and satisfaction."
                  }
                ].map((value, index) => (
                  <AnimatedSection
                    key={value.title}
                    className="card-hover glass rounded-xl p-6 flex flex-col h-full"
                    delay={index * 100}
                    direction="up"
                  >
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Our Journey
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  The CodeBuddy Story
                </h2>
                <p className="text-muted-foreground text-lg">
                  From a small startup to a leading development firm, our journey has been defined by growth and excellence.
                </p>
              </AnimatedSection>

              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {[
                  {
                    year: "2018",
                    title: "Foundation",
                    description: "CodeBuddy was founded with a team of just three developers."
                  },
                  {
                    year: "2019",
                    title: "First Major Client",
                    description: "Secured our first enterprise client and expanded our team to 10 developers."
                  },
                  {
                    year: "2020",
                    title: "Remote Transition",
                    description: "Successfully transitioned to a fully remote team while maintaining productivity."
                  },
                  {
                    year: "2021",
                    title: "Global Expansion",
                    description: "Expanded our services to international clients across Europe and Asia."
                  },
                  {
                    year: "2022",
                    title: "Innovation Lab",
                    description: "Launched the CodeBuddy Innovation Lab to explore emerging technologies."
                  },
                  {
                    year: "2023",
                    title: "Present Day",
                    description: "Now a team of 50+ professionals serving clients worldwide with cutting-edge solutions."
                  },
                ].map((event, index) => (
                  <AnimatedSection
                    key={event.year}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                    delay={index * 100}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      {event.year}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] card-hover glass rounded-xl p-4 md:p-6">
                      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                      <time className="text-sm text-primary font-semibold mb-2 block">{event.year}</time>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
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

export default About;
