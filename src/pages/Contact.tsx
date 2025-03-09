
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/home/Contact";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ChatBot from "@/components/ui/ChatBot";

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us - CodeBuddy</title>
        <meta
          name="description"
          content="Get in touch with CodeBuddy for your website, mobile app, or software development needs. Our team of expert coders is ready to help."
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
                  Contact Us
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                  Let's Start Building Together
                </h1>
                <p className="text-lg text-muted-foreground">
                  Have questions or ready to start your project? Reach out to our team and we'll get back to you promptly.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* Contact Section */}
          <Contact />

          {/* FAQ Section */}
          <section className="py-20 bg-muted/30">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-lg">
                  Find answers to common questions about our services and process.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    question: "What is the typical timeline for a website project?",
                    answer: "Timeline varies based on complexity. Simple websites typically take 2-4 weeks, while more complex web applications may take 1-3 months. We'll provide a detailed timeline during our initial consultation."
                  },
                  {
                    question: "How much does it cost to build a website or app?",
                    answer: "Pricing depends on project requirements, complexity, and features. Website projects typically start at $2,000, while mobile apps start at $5,000. We provide detailed quotes after understanding your specific needs."
                  },
                  {
                    question: "Do you provide ongoing maintenance and support?",
                    answer: "Yes, we offer various maintenance packages to ensure your website or app remains secure, up-to-date, and functioning optimally. Our support team is available to address any issues that arise."
                  },
                  {
                    question: "What information do you need to provide a quote?",
                    answer: "To provide an accurate quote, we need to understand your project goals, required features, design preferences, timeline expectations, and any specific technical requirements. The more details you provide, the more precise our estimate will be."
                  },
                  {
                    question: "Do you work with clients internationally?",
                    answer: "Yes, we work with clients worldwide. Our team is experienced in remote collaboration and we use efficient communication tools to ensure smooth project execution regardless of time zones."
                  },
                  {
                    question: "What technologies do you specialize in?",
                    answer: "We specialize in modern technologies including React, Angular, Vue.js, Node.js, Python, PHP, React Native, Flutter, and WordPress. We select the best technology stack based on your specific project requirements."
                  }
                ].map((faq, index) => (
                  <AnimatedSection
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm"
                    delay={index * 100}
                    direction="up"
                  >
                    <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
};

export default ContactPage;
