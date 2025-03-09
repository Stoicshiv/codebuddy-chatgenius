
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Send, X, ChevronDown, ChevronUp, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    text: "Hi there! 👋 I'm CodeBuddy's assistant. How can I help you with your coding project today?",
    isBot: true,
    timestamp: new Date(),
  },
];

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

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate response times based on message length
    const delay = Math.min(1000 + userMessage.length * 10, 3000);
    
    setTimeout(() => {
      let response = "";
      
      // Very basic response logic - would be replaced with actual API call
      if (userMessage.toLowerCase().includes("pricing") || userMessage.toLowerCase().includes("cost")) {
        response = "Our pricing varies based on project complexity. For website development, prices start at $2,000. For mobile apps, prices start at $5,000. Would you like to schedule a consultation for a personalized quote?";
      } else if (userMessage.toLowerCase().includes("contact") || userMessage.toLowerCase().includes("call") || userMessage.toLowerCase().includes("email")) {
        response = "You can reach our team at info@codebuddy.com or call us at +1 (234) 567-890. Alternatively, you can fill out the contact form on our website and we'll get back to you within 24 hours.";
      } else if (userMessage.toLowerCase().includes("time") || userMessage.toLowerCase().includes("deadline") || userMessage.toLowerCase().includes("how long")) {
        response = "Project timelines depend on complexity and requirements. Simple websites typically take 2-4 weeks, while more complex applications may take 1-3 months. We'll provide a detailed timeline during our initial consultation.";
      } else {
        response = "Thank you for your message. One of our coding experts will review your inquiry and get back to you shortly. If you'd like immediate assistance, please call us or fill out the contact form for a consultation.";
      }
      
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
              <h3 className="font-medium">CodeBuddy Assistant</h3>
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
                  <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
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
                  </button>
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
