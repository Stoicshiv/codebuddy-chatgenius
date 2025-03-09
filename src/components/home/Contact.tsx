
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import AnimatedSection from "../shared/AnimatedSection";
import { useToast } from "@/hooks/use-toast";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      title: "Email Us",
      content: "info@codebuddy.com",
      link: "mailto:info@codebuddy.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-primary" />,
      title: "Call Us",
      content: "+1 (234) 567-890",
      link: "tel:+1234567890",
    },
    {
      icon: <MapPin className="w-5 h-5 text-primary" />,
      title: "Visit Us",
      content: "123 Tech Street, Silicon Valley, CA 94043",
      link: "https://maps.google.com",
    },
  ];

  return (
    <section className="py-20" id="contact">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Let's Discuss Your Project
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or need coding assistance? Contact us today and let's bring your ideas to life.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection className="order-2 lg:order-1" direction="left">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="website">Website Development</option>
                      <option value="mobile">Mobile App Development</option>
                      <option value="design">UI/UX Design</option>
                      <option value="assistance">Coding Assistance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                    placeholder="Tell us about your project or coding needs..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={cn(
                    "btn-hover-effect w-full bg-primary text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all",
                    (isSubmitting || isSubmitted) && "opacity-80 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>

          <AnimatedSection className="order-1 lg:order-2" direction="right">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-muted-foreground mb-8">
                  Ready to start your project or have questions about our services? Reach out to us through any of the channels below.
                </p>
                
                <div className="space-y-6 mb-12">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      target={info.title === "Visit Us" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex items-start hover:bg-muted/50 p-3 rounded-lg transition-colors"
                    >
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{info.title}</h4>
                        <p className="text-muted-foreground">{info.content}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-lg h-64 lg:h-auto mt-8 lg:mt-0">
                <iframe
                  title="CodeBuddy Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101408.22405348163!2d-122.1491522!3d37.42954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80857efed247ab05%3A0xeac0f3baf773a53a!2sSilicon%20Valley!5e0!3m2!1sen!2sus!4v1657662446467!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
