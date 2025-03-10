
import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { useToast } from "@/hooks/use-toast";

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null as File | null,
    coverLetter: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        resume: null,
        coverLetter: ""
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const positions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Mobile App Developer",
    "Project Manager",
    "QA Engineer",
    "DevOps Engineer",
    "Other"
  ];

  return (
    <AnimatedSection className="max-w-3xl mx-auto bg-card rounded-xl p-6 md:p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your email"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your phone number"
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium mb-2">Position *</label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select a position</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="experience" className="block text-sm font-medium mb-2">Years of Experience *</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Select experience level</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="resume" className="block text-sm font-medium mb-2">Resume/CV *</label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            required
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Accepted formats: .pdf, .doc, .docx (Max 5MB)
          </p>
        </div>
        
        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium mb-2">Cover Letter / Additional Information</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Tell us why you want to join PixelForge and what skills you bring to the team..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className={`btn-hover-effect bg-primary text-white px-6 py-3 rounded-lg font-medium inline-flex items-center ${
            (isSubmitting || isSubmitted) ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : isSubmitted ? (
            <span className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" />
              Application Sent!
            </span>
          ) : (
            <span className="flex items-center">
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </span>
          )}
        </button>
      </form>
    </AnimatedSection>
  );
};

export default ApplicationForm;
