
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Send, X, ChevronDown, ChevronUp, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    text: "Hi there! 👋 I'm PixelForge's assistant. How can I help you with your coding project today?",
    isBot: true,
    timestamp: new Date(),
  },
];

// Sample project requirements to analyze user input
const PROJECT_TYPES = {
  ecommerce: ["shop", "store", "commerce", "product", "sell", "payment", "cart"],
  webapp: ["application", "dashboard", "platform", "system", "webapp", "tool"],
  mobile: ["app", "mobile", "ios", "android", "phone", "tablet"],
  website: ["site", "landing", "page", "blog", "portfolio"]
};

const COMPLEXITY_INDICATORS = {
  basic: ["simple", "basic", "static", "landing page", "brochure"],
  intermediate: ["dynamic", "interactive", "user accounts", "database", "content management"],
  advanced: ["complex", "integration", "payment", "api", "analytics", "dashboard"],
  ultra: ["enterprise", "scalable", "custom", "high volume", "security", "multi-language"]
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // Analyze user's message to determine project type and complexity
  const analyzeRequirements = (userMessage: string) => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Detect project type
    let detectedType = "website"; // Default
    let typeConfidence = 0;
    
    for (const [type, keywords] of Object.entries(PROJECT_TYPES)) {
      const matchCount = keywords.filter(keyword => lowerMsg.includes(keyword)).length;
      if (matchCount > typeConfidence) {
        typeConfidence = matchCount;
        detectedType = type;
      }
    }
    
    // Detect complexity
    let detectedComplexity = "basic"; // Default
    let complexityConfidence = 0;
    
    for (const [complexity, indicators] of Object.entries(COMPLEXITY_INDICATORS)) {
      const matchCount = indicators.filter(indicator => lowerMsg.includes(indicator)).length;
      if (matchCount > complexityConfidence) {
        complexityConfidence = matchCount;
        detectedComplexity = complexity;
      }
    }
    
    return { projectType: detectedType, complexity: detectedComplexity };
  };

  // Get pricing recommendation based on analysis
  const getPricingRecommendation = (type: string, complexity: string) => {
    const prices = {
      basic: "₹299",
      intermediate: "₹999",
      advanced: "₹1899",
      ultra: "₹2299"
    };
    
    return {
      price: prices[complexity as keyof typeof prices],
      complexity,
      projectType: type
    };
  };

  const generateResponse = (userMessage: string) => {
    // Check for specific queries first
    if (userMessage.toLowerCase().includes("pricing") || userMessage.toLowerCase().includes("cost")) {
      return "Our pricing varies based on project complexity. Basic packages start at ₹299, Intermediate at ₹999, Advanced at ₹1899, and Ultra at ₹2299. Would you like to schedule a consultation for a personalized quote?";
    } 
    
    if (userMessage.toLowerCase().includes("contact") || userMessage.toLowerCase().includes("call") || userMessage.toLowerCase().includes("email")) {
      return "You can reach our team at shivrajsuman2005@gmail.com or call us at +91 7600267733. Alternatively, you can fill out the contact form on our website and we'll get back to you within 24 hours.";
    } 
    
    if (userMessage.toLowerCase().includes("time") || userMessage.toLowerCase().includes("deadline") || userMessage.toLowerCase().includes("how long")) {
      return "We deliver products under 100 minutes on demand (terms and conditions apply). For larger projects, timelines depend on complexity and requirements. We'll provide a detailed timeline during our initial consultation.";
    } 
    
    if (userMessage.toLowerCase().includes("location") || userMessage.toLowerCase().includes("address") || userMessage.toLowerCase().includes("where")) {
      return "We're located at VIT Bhopal Kothri, Sehore, 466114 MP, India.";
    }
    
    // For project requirement queries, analyze and provide customized response
    if (userMessage.length > 15 && 
        (userMessage.toLowerCase().includes("project") || 
         userMessage.toLowerCase().includes("need") || 
         userMessage.toLowerCase().includes("want") || 
         userMessage.toLowerCase().includes("build") ||
         userMessage.toLowerCase().includes("develop"))) {
      
      const { projectType, complexity } = analyzeRequirements(userMessage);
      const recommendation = getPricingRecommendation(projectType, complexity);
      
      return `Based on your requirements, it sounds like you're looking for a ${complexity} ${projectType} solution. Our estimated pricing for this would be ${recommendation.price}. For projects of this nature, we typically deliver within 100 minutes for basic requirements (terms and conditions apply), or we can discuss a custom timeline for more complex features. Would you like to schedule a consultation to discuss your specific needs in detail?`;
    }
    
    // Generic fallback
    return "Thank you for your message. I'd like to understand your project requirements better. Could you share more details about what you're looking to build, any specific features you need, and your timeline? This will help us provide you with the most accurate information and pricing.";
  };

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate response times based on message length
    const delay = Math.min(1000 + userMessage.length * 10, 3000);
    
    setTimeout(() => {
      const response = generateResponse(userMessage);
      addMessage(response, true);
      setIsTyping(false);
    }, delay);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputText.trim()) return;
    
    addMessage(inputText, false);
    simulateBotResponse(inputText);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChatBot}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all",
          "bg-primary text-white hover:bg-primary/90",
          "transform hover:scale-105 active:scale-95"
        )}
        aria-label="Chat with us"
      >
        <MessageSquare size={22} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl transform transition-all duration-300",
            "bg-white border border-gray-200",
            isMinimized ? "h-16" : "h-[30rem]"
          )}
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Chat Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
            onClick={isMinimized ? toggleChatBot : undefined}
          >
            <div className="flex items-center space-x-2">
              <Bot className="text-primary" size={20} />
              <h3 className="font-medium">PixelForge Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="text-gray-500 hover:text-gray-700"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <button
                onClick={toggleChatBot}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "mb-4 max-w-[85%] animate-fade-in",
                      msg.isBot ? "mr-auto" : "ml-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl p-3",
                        msg.isBot
                          ? "bg-muted text-foreground"
                          : "bg-primary text-white"
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center text-xs text-gray-500 mt-1",
                        msg.isBot ? "justify-start" : "justify-end"
                      )}
                    >
                      <span>
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {msg.isBot ? (
                        <Bot className="ml-1" size={12} />
                      ) : (
                        <User className="ml-1" size={12} />
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="mb-4 max-w-[85%] mr-auto">
                    <div className="bg-muted rounded-xl p-3">
                      <div className="flex space-x-1 items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse animation-delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse animation-delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-gray-100"
              >
                <div className="flex items-center">
                  <Input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your project requirements..."
                    className="flex-1 p-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button
                    type="submit"
                    className={cn(
                      "bg-primary text-white p-2 rounded-r-lg",
                      "transform transition-all",
                      inputText.trim()
                        ? "hover:bg-primary/90 active:scale-95"
                        : "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!inputText.trim()}
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
