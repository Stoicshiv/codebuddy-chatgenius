import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight, Code, ArrowRight } from "lucide-react";
import CodeSnippet from "../shared/CodeSnippet";
import AnimatedSection from "../shared/AnimatedSection";
import InteractiveParticles from "../3d/InteractiveParticles";
import useSoundEffects from "@/hooks/use-sound-effects";

// Fallback component for 3D elements
const FallbackComponent = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-pulse bg-primary/20 rounded-xl w-full h-full"></div>
  </div>
);

const Hero: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Websites", "Mobile Apps", "Web Apps", "E-commerce", "SaaS"];
  const { play } = useSoundEffects();
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    
    // Set a timeout to assume 3D content is loaded after 3 seconds
    // This prevents a perpetual loading state if something goes wrong
    const timeout = setTimeout(() => {
      setIs3DLoaded(true);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [words.length]);

  // Handle 3D load success
  useEffect(() => {
    const handleLoad = () => {
      setIs3DLoaded(true);
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const codeSnippet = `const Hero: React.FC = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Websites", "Mobile Apps", "Web Apps", "E-commerce", "SaaS"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <AnimatedSection className="z-10" direction="left">
            <div className="max-w-2xl">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Professional Coding Services
              </div>
              
              {/* Page Background handles fluid animation now */}
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                We Build Amazing{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                    {words[currentWord]}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20 rounded"></span>
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                We specialize in professional website and app development, providing coding assistance tailored to entrepreneurs and businesses seeking expert software services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/contact"
                  className="interactive btn-hover-effect bg-primary text-white px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center"
                  onMouseEnter={() => play('hover')}
                  onClick={() => play('click')}
                >
                  Hire Our Coders
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                
                <Link 
                  to="/services"
                  className="interactive btn-hover-effect bg-secondary/10 text-secondary px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center"
                  onMouseEnter={() => play('hover')}
                  onClick={() => play('click')}
                >
                  Explore Services
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Code className="w-4 h-4 text-primary" />
                <span>Trusted by 500+ clients worldwide</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Add interactive particles as background */}
              <div className="absolute inset-0 -z-10">
                <InteractiveParticles className="w-full h-full" />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-2xl blur-3xl opacity-30 transform -rotate-6 scale-95"></div>
              
              <div className="relative bg-white/10 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-white/20 card-futuristic">
                <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 border-b border-gray-800/50">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-mono bg-white/10 text-gray-300 px-2 py-1 rounded-md flex-1 text-center">
                    codebuddy-solution.tsx
                  </div>
                </div>
                
                <CodeSnippet code={codeSnippet} animated={true} className="max-h-[350px] text-sm" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};`;

  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <AnimatedSection className="z-10" direction="left">
            <div className="max-w-2xl">
              <div className="inline-block bg-blue-900/30 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-blue-500/30 shadow-md shadow-blue-500/10 animate-pulse-slow">
                Professional Coding Services
              </div>
              
              {/* PixelForge title with glassmorphism effect */}
              <div className="h-[100px] w-full relative my-8">
                <div className="absolute inset-0 flex items-center justify-start">
                  <h2 className="text-5xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-500 animate-text-shimmer bg-[length:300%]">
                    PixelForge
                  </h2>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
                We Build Amazing{" "}
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
                    {words[currentWord]}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500/50 rounded"></span>
                </span>
              </h1>
              
              <p className="text-lg text-white/80 mb-8 max-w-xl backdrop-blur-sm bg-black/20 p-4 rounded-lg border-l-4 border-blue-500">
                We specialize in professional website and app development, providing coding assistance tailored to entrepreneurs and businesses seeking expert software services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/contact"
                  className="interactive bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1"
                  onMouseEnter={() => play('hover')}
                  onClick={() => play('click')}
                >
                  Hire Our Coders
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
                
                <Link 
                  to="/services"
                  className="interactive bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-all duration-300"
                  onMouseEnter={() => play('hover')}
                  onClick={() => play('click')}
                >
                  Explore Services
                </Link>
              </div>
              
              <div className="flex items-center gap-2 text-white/60 text-sm bg-black/30 backdrop-blur-sm p-2 rounded-lg inline-block">
                <Code className="w-4 h-4 text-blue-400" />
                <span>Trusted by 500+ clients worldwide</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" className="relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Add interactive particles as background */}
              <div className="absolute inset-0 -z-10">
                <Suspense fallback={<FallbackComponent />}>
                  <InteractiveParticles className="w-full h-full" />
                </Suspense>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-blue-400/20 rounded-2xl blur-3xl opacity-30 transform -rotate-6 scale-95"></div>
              
              <div className="relative bg-black/30 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden border border-blue-500/20 card-futuristic hover:border-blue-400/40 transition-all duration-500">
                <div className="flex items-center gap-2 bg-blue-900/80 px-4 py-2 border-b border-blue-800/50">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-mono bg-blue-800/30 text-blue-100 px-2 py-1 rounded-md flex-1 text-center">
                    codebuddy-solution.tsx
                  </div>
                </div>
                
                <CodeSnippet code={codeSnippet} animated={true} className="max-h-[350px] text-sm" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
