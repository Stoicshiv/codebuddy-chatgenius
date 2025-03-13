
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MessageSquare, Send, X, ChevronDown, ChevronUp, Bot, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIService, Message } from "@/services/AIService";
import { toast } from "sonner";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    text: "Hi there! 👋 I'm PixelForge's coding assistant. I can help you with React components, TypeScript, and Tailwind CSS. How can I help with your coding project today?",
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
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast: uiToast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    // Check if AI service is initialized
    if (!AIService.isReady() && !localStorage.getItem("pixelforge_ai_key")) {
      // Only show this to users once
      const hasSeenPrompt = localStorage.getItem("has_seen_ai_prompt");
      if (!hasSeenPrompt) {
        setTimeout(() => {
          setShowApiKeyPrompt(true);
        }, 2000);
      }
    }
  }, []);

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

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      const success = AIService.init(apiKey);
      if (success) {
        toast.success("AI service initialized successfully!");
        setShowApiKeyPrompt(false);
        localStorage.setItem("has_seen_ai_prompt", "true");
      } else {
        toast.error("Failed to initialize AI service. Please try again.");
      }
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message to chat
    addMessage(inputText, false);
    setIsTyping(true);
    
    try {
      // Get response from AI service
      const response = await AIService.getResponse(inputText);
      
      // Format code blocks in the response if present
      let formattedText = response.text;
      if (formattedText.includes("```")) {
        // Ensure code blocks are properly displayed
        formattedText = formattedText.replace(/```(\w*)([\s\S]*?)```/g, (match, language, code) => {
          return `<div class="bg-gray-800 rounded-md p-2 my-2 overflow-x-auto text-xs">
                    <pre><code class="language-${language || 'javascript'}">${code.trim()}</code></pre>
                  </div>`;
        });
      }
      
      addMessage(formattedText, true);
    } catch (error) {
      console.error("Error getting AI response:", error);
      addMessage("I'm sorry, I encountered an error. Please try again later.", true);
    } finally {
      setIsTyping(false);
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUseDemo = () => {
    AIService.init("demo");
    toast.success("Using demo mode for AI. Responses will be based on pre-trained examples.");
    setShowApiKeyPrompt(false);
    localStorage.setItem("has_seen_ai_prompt", "true");
  };

  // API Key setup prompt
  if (showApiKeyPrompt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 shadow-xl">
          <h3 className="text-lg font-medium mb-2">Setup AI Coding Assistant</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            To enable the AI coding assistant, please enter your Hugging Face API key below. 
            Your key is stored locally in your browser and never sent to our servers.
          </p>
          <div className="space-y-4">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Hugging Face API key"
            />
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Get a free API key at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="underline">huggingface.co</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowApiKeyPrompt(false);
                  localStorage.setItem("has_seen_ai_prompt", "true");
                }}
              >
                Skip for now
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={handleUseDemo}
              >
                Use demo mode
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSaveApiKey}
              >
                Save Key
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        aria-label="Code Assistant"
      >
        <MessageSquare size={22} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl transform transition-all duration-300",
            "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
            isMinimized ? "h-16" : "h-[30rem]"
          )}
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Chat Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer"
            onClick={isMinimized ? toggleChatBot : undefined}
          >
            <div className="flex items-center space-x-2">
              <Bot className="text-primary" size={20} />
              <h3 className="font-medium">Code Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <a 
                href="/admin/ai-trainer" 
                target="_blank"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="AI Training Interface"
                onClick={(e) => e.stopPropagation()}
              >
                <Settings size={16} />
              </a>
              <button
                onClick={toggleMinimize}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <button
                onClick={toggleChatBot}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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
                          ? "bg-muted text-foreground dark:bg-gray-700 dark:text-gray-100"
                          : "bg-primary text-white"
                      )}
                    >
                      {msg.isBot && msg.text.includes("<div class=") ? (
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      )}
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
                    <div className="bg-muted dark:bg-gray-700 rounded-xl p-3">
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
                className="p-3 border-t border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <Input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about React, TypeScript, UI components..."
                    className="flex-1 p-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
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
