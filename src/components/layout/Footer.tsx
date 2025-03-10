
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Code, Mail, MapPin, Phone, Github, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="PixelForge Home">
              <Code className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-white">PixelForge</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Professional website and app building services. Expert coding assistance for entrepreneurs and businesses.
            </p>
            <p className="text-gray-300 mb-4">
              <strong>Fast Delivery:</strong> We deliver products under 100 mins on demand. Terms and conditions apply.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="text-gray-300 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Services", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-primary transition-colors animated-border inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Website Development",
                "Mobile App Development",
                "Coding Assistance",
                "UI/UX Design",
                "Web Maintenance"
              ].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services" 
                    className="text-gray-300 hover:text-primary transition-colors animated-border inline-block"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-300">
                  VIT Bhopal Kothri, Sehore, 466114 MP
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <a 
                  href="tel:+917600267733" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  +91 7600267733
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <a 
                  href="mailto:shivrajsuman2005@gmail.com" 
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  shivrajsuman2005@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-700 text-center md:text-left md:flex md:justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} PixelForge. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-400 hover:text-primary text-sm transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
