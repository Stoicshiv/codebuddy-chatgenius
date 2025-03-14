
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import GlobeScene from "@/components/3d/GlobeScene";

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>About PixelForge - Our Mission and Team</title>
        <meta
          name="description"
          content="Learn about PixelForge's mission, values, and the team of expert developers behind our coding services."
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
                    PixelForge was founded in 2024 with a simple mission: to make quality coding and development services accessible to businesses of all sizes. Our team of expert developers, designers, and consultants work together to transform your ideas into powerful digital solutions.
                  </p>
                  <p className="text-lg text-muted-foreground mb-4">
                    <strong>Fast Delivery:</strong> We deliver products under 100 mins on demand. Terms and conditions apply:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground mb-8">
                    <li>Project must have minimal content requirements</li>
                    <li>Customer must provide detailed requirements in written format</li>
                    <li>We are not responsible for any incompatibility between software and hardware</li>
                  </ul>
                </AnimatedSection>
                
                <AnimatedSection direction="right" className="h-[400px]">
                  <GlobeScene className="w-full h-full" />
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
                  At PixelForge, we believe in creating meaningful digital experiences driven by these core values.
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
                  The PixelForge Story
                </h2>
                <p className="text-muted-foreground text-lg">
                  From a small startup to a leading development firm, our journey has been defined by growth and excellence.
                </p>
              </AnimatedSection>

              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {[
                  {
                    year: "2024 Jan",
                    title: "Foundation",
                    description: "PixelForge was founded with a team of passionate developers led by Shivraj Suman."
                  },
                  {
                    year: "2024 Feb",
                    title: "First Major Client",
                    description: "Secured our first client, Alankarika, and delivered our first successful project."
                  },
                  {
                    year: "2024 Mar",
                    title: "Service Expansion",
                    description: "Expanded our service offerings to include mobile app development and UI/UX design."
                  },
                  {
                    year: "2024 Apr",
                    title: "Team Growth",
                    description: "Added new team members to enhance our development capabilities."
                  },
                  {
                    year: "2024 May",
                    title: "Innovation Focus",
                    description: "Launched rapid development methodology to deliver projects under 100 minutes on demand."
                  },
                  {
                    year: "2024 Present",
                    title: "Present Day",
                    description: "Now a growing team serving clients with cutting-edge solutions and rapid development."
                  },
                ].map((event, index) => (
                  <AnimatedSection
                    key={event.year}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                    delay={index * 100}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      {index + 1}
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

          {/* Team Section */}
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Our Team
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Meet the Experts Behind PixelForge
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our talented team of developers and designers is dedicated to creating exceptional digital experiences.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "Shivraj Suman",
                    role: "Founder",
                    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    bio: "Tech enthusiast with a passion for creating innovative solutions that solve real-world problems."
                  },
                  {
                    name: "Shaurya Pethe",
                    role: "Co-founder",
                    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
                    bio: "Creative developer with expertise in front-end technologies and user experience design."
                  },
                  {
                    name: "Nikhil Hegde",
                    role: "Lead Programmer",
                    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
                    bio: "Back-end specialist with a focus on building scalable, efficient systems and databases."
                  },
                  {
                    name: "Harshit Maurya",
                    role: "Lead Programmer",
                    image: "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
                    bio: "Full-stack developer with expertise in mobile app development and cloud solutions."
                  }
                ].map((member, index) => (
                  <AnimatedSection
                    key={member.name}
                    className="card-hover glass rounded-xl overflow-hidden text-center"
                    delay={index * 100}
                    direction="up"
                  >
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Location Section */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  Our Location
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Where to Find Us
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  We're headquartered at VIT Bhopal Kothri, Sehore, 466114 MP, with a team that collaborates both in-person and remotely.
                </p>
                <p className="text-lg font-medium">
                  Contact: <a href="mailto:shivrajsuman2005@gmail.com" className="text-primary">shivrajsuman2005@gmail.com</a> | <a href="tel:+917600267733" className="text-primary">+91 7600267733</a>
                </p>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
