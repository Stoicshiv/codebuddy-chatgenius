
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CodeScene from "@/components/3d/CodeScene";
import CodeSnippet from "@/components/shared/CodeSnippet";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "website",
      title: "Website Development",
      description: "We build stunning, responsive websites that are optimized for performance and user experience.",
      features: [
        "Responsive Design", 
        "SEO Optimization", 
        "CMS Integration", 
        "E-commerce Functionality",
        "Performance Optimization",
        "Accessibility Compliance"
      ],
      code: `
// Modern React Component
const WebsiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed w-full z-50">
      <nav className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <MobileMenuButton 
            isOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <DesktopMenu />
        </div>
        {isMenuOpen && <MobileMenu />}
      </nav>
    </header>
  );
};`
    },
    {
      id: "mobile",
      title: "Mobile App Development",
      description: "We create powerful mobile applications for iOS and Android platforms that engage users and drive results.",
      features: [
        "Native iOS & Android", 
        "Cross-Platform Solutions", 
        "UI/UX Design", 
        "API Integration",
        "Push Notifications",
        "Analytics Implementation"
      ],
      code: `
// React Native Component
const AppScreen = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  });

  if (isLoading) return <LoadingSpinner />;
  
  return (
    <View style={styles.container}>
      <Header title="Dashboard" />
      <FlatList
        data={data.items}
        renderItem={({ item }) => (
          <Card 
            title={item.title}
            description={item.description}
            onPress={() => navigateToDetail(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};`
    },
    {
      id: "assistance",
      title: "Coding Assistance",
      description: "Get expert guidance and support for your development projects from our team of experienced developers.",
      features: [
        "Code Review", 
        "Bug Fixing", 
        "Performance Optimization", 
        "Legacy Code Modernization",
        "Technical Consulting",
        "Architecture Design"
      ],
      code: `
// TypeScript Utility Functions
const formatData = <T extends Record<string, any>>(
  data: T[], 
  options: FormatOptions
): FormattedData<T> => {
  return data.map(item => ({
    ...item,
    formattedDate: formatDate(item.createdAt, options.dateFormat),
    status: determineStatus(item.status),
    isActive: checkIfActive(item),
  }));
};

export const optimizePerformance = (callback: Function): Function => {
  return debounce(throttle(memoize(callback), 100), 200);
};`
    },
    {
      id: "design",
      title: "UI/UX Design",
      description: "We create beautiful and intuitive user interfaces that enhance user experience and drive engagement.",
      features: [
        "User Research", 
        "Wireframing", 
        "Prototyping", 
        "Interaction Design",
        "Usability Testing",
        "Design Systems"
      ],
      code: `
// Design System Components
const Button = ({ 
  variant = 'primary',
  size = 'medium',
  isLoading,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'btn',
        variantStyles[variant],
        sizeStyles[size],
        isLoading && 'loading',
        disabled && 'disabled'
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};`
    },
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - CodeBuddy Development Solutions</title>
        <meta
          name="description"
          content="Explore CodeBuddy's comprehensive development services including website development, mobile apps, coding assistance, and UI/UX design."
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
                    Expert Coding Solutions Tailored to Your Needs
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    We offer a comprehensive range of development services to help you bring your digital vision to life, from websites and mobile apps to custom coding solutions and UI/UX design.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#website" className="btn-hover-effect bg-primary text-white px-6 py-3 rounded-lg font-medium inline-flex items-center">
                      Explore Services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                    <Link to="/contact" className="bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg font-medium">
                      Get a Quote
                    </Link>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection direction="right" className="h-[400px]">
                  <CodeScene className="w-full h-full" />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Services List */}
          <section className="py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Our Development Services
                </h2>
                <p className="text-muted-foreground text-lg">
                  From concept to deployment, we provide end-to-end development solutions tailored to your specific requirements.
                </p>
              </AnimatedSection>

              <div className="space-y-24">
                {services.map((service, index) => (
                  <section key={service.id} id={service.id} className="scroll-mt-24">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <AnimatedSection direction={index % 2 === 0 ? "left" : "right"}>
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                          Service
                        </div>
                        <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                        <p className="text-muted-foreground mb-6">{service.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Link to="/contact" className="btn-hover-effect inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium">
                          Request Service
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </AnimatedSection>
                      
                      <AnimatedSection direction={index % 2 === 0 ? "right" : "left"} className="overflow-hidden rounded-xl shadow-lg bg-black/80 p-4">
                        <CodeSnippet code={service.code} language="typescript" />
                      </AnimatedSection>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-muted/30 py-16">
            <div className="container-custom">
              <AnimatedSection className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Contact our team today to discuss your project requirements and how we can help bring your vision to life.
                </p>
                <Link to="/contact" className="btn-hover-effect inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium">
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

export default Services;
