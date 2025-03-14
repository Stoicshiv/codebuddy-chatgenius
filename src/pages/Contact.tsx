
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/home/Contact";
import InteractiveParticles from "@/components/3d/InteractiveParticles";
import useSoundEffects from "@/hooks/use-sound-effects";
import ImmersiveCard from "@/components/ui/ImmersiveCard";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const { play } = useSoundEffects();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Play success sound when page loads
    play('notification');
    
    // Add cursor trailer effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trailer';
    document.body.appendChild(cursor);
    
    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    window.addEventListener('mousemove', updateCursor);
    
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.body.removeChild(cursor);
    };
  }, [play]);

  return (
    <>
      <Helmet>
        <title>Contact PixelForge - Get in Touch with Our Development Team</title>
        <meta
          name="description"
          content="Contact PixelForge for website development, app creation, and custom software solutions. Our team of expert coders is ready to bring your vision to life."
        />
        {/* Add styles for cursor trailer */}
        <style>
          {`
            .cursor-trailer {
              position: fixed;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: rgba(59, 130, 246, 0.7);
              pointer-events: none;
              z-index: 9995;
              transform: translate(-50%, -50%);
              transition: transform 0.1s ease;
              box-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
                          0 0 20px rgba(59, 130, 246, 0.3),
                          0 0 30px rgba(59, 130, 246, 0.1);
            }
            
            /* Add sound toggle button */
            .sound-toggle {
              position: fixed;
              bottom: 20px;
              right: 20px;
              z-index: 100;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(10px);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            
            .sound-toggle:hover {
              transform: scale(1.1);
            }
          `}
        </style>
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow relative">
          {/* Background particles */}
          <div className="fixed inset-0 -z-5 opacity-50 pointer-events-none">
            <InteractiveParticles className="w-full h-full" />
          </div>
          
          {/* Page header with motion effects */}
          <motion.section 
            className="py-20 text-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            
            <div className="container mx-auto px-4">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-gradient-future"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              >
                Get in Touch
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              >
                Have a project in mind? Our team of expert developers is ready to turn your vision into reality.
              </motion.p>
            </div>
          </motion.section>
          
          {/* Contact info cards with immersive effect */}
          <section className="py-12 mb-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ImmersiveCard intensity="medium" className="p-8">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <p className="mb-4 text-muted-foreground">
                      Send us an email and we'll get back to you within 24 hours.
                    </p>
                    <a 
                      href="mailto:info@pixelforge.dev" 
                      className="text-primary hover:underline interactive"
                      onMouseEnter={() => play('hover')}
                      onClick={() => play('click')}
                    >
                      info@pixelforge.dev
                    </a>
                  </motion.div>
                </ImmersiveCard>
                
                <ImmersiveCard intensity="strong" className="p-8">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <p className="mb-4 text-muted-foreground">
                      Prefer a direct conversation? Give us a call.
                    </p>
                    <a 
                      href="tel:+919876543210" 
                      className="text-primary hover:underline interactive"
                      onMouseEnter={() => play('hover')}
                      onClick={() => play('click')}
                    >
                      +91 98765 43210
                    </a>
                  </motion.div>
                </ImmersiveCard>
                
                <ImmersiveCard intensity="subtle" className="p-8">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                    <p className="mb-4 text-muted-foreground">
                      Come by our office for an in-person meeting.
                    </p>
                    <address className="not-italic text-primary interactive">
                      VIT Bhopal, Kothri Kalan<br />
                      Sehore, MP 466114
                    </address>
                  </motion.div>
                </ImmersiveCard>
              </div>
            </div>
          </section>
          
          <Contact />
          
          {/* Sound toggle button */}
          <button 
            className="sound-toggle interactive"
            onClick={() => {
              const soundToggle = document.querySelector('.sound-toggle');
              if (soundToggle?.classList.contains('active')) {
                soundToggle.classList.remove('active');
                // Implement sound mute
              } else {
                soundToggle?.classList.add('active');
                // Implement sound unmute
                play('click');
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6c3.314 0 6 2.686 6 6-3.314 0-6-2.686-6-6zm0 0c-3.314 0-6 2.686-6 6 3.314 0 6-2.686 6-6z" />
            </svg>
          </button>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
