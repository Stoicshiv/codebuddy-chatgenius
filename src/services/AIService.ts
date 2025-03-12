import { toast } from "sonner";

// Types for AI interaction
export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface AIResponse {
  text: string;
  confidence: number;
  metadata?: {
    detectedIntent?: string;
    projectType?: string;
    complexity?: string;
    estimatedPrice?: string;
  };
}

export interface TrainingExample {
  input: string;
  expectedOutput: string;
  category?: string;
}

export class AIService {
  private static apiKey: string | null = null;
  private static apiEndpoint: string = "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf";
  private static isInitialized: boolean = false;
  private static trainingExamples: TrainingExample[] = [];

  // Initialize the service with API key
  static init(apiKey: string): boolean {
    try {
      this.apiKey = apiKey;
      this.isInitialized = true;
      localStorage.setItem("pixelforge_ai_key", apiKey);
      console.log("AI service initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize AI service:", error);
      return false;
    }
  }

  // Check if the service is initialized
  static isReady(): boolean {
    // Try to load from localStorage if not initialized
    if (!this.isInitialized) {
      const savedKey = localStorage.getItem("pixelforge_ai_key");
      if (savedKey) {
        this.init(savedKey);
      }
    }
    return this.isInitialized;
  }

  // Add training examples
  static addTrainingExample(example: TrainingExample): void {
    this.trainingExamples.push(example);
    // Store training examples in localStorage
    localStorage.setItem("pixelforge_training_examples", JSON.stringify(this.trainingExamples));
    console.log("Training example added:", example);
  }

  // Get all training examples
  static getTrainingExamples(): TrainingExample[] {
    // Try to load from localStorage
    if (this.trainingExamples.length === 0) {
      const savedExamples = localStorage.getItem("pixelforge_training_examples");
      if (savedExamples) {
        this.trainingExamples = JSON.parse(savedExamples);
      }
    }
    return this.trainingExamples;
  }

  // Clear all training examples
  static clearTrainingExamples(): void {
    this.trainingExamples = [];
    localStorage.removeItem("pixelforge_training_examples");
  }

  private static generateSystemPrompt(): string {
    const examples = this.getTrainingExamples();
    let systemPrompt = `You are PixelForge's AI coding assistant that helps users with their development needs.
    
Main capabilities:
- I help write clean, efficient code under 100 lines
- I provide code examples and explanations
- I assist with React, TypeScript, and Tailwind CSS
- I focus on small, maintainable components
- I can help debug and fix issues

Guidelines:
- Be concise and precise with code suggestions
- Always consider best practices and TypeScript types
- Suggest breaking down complex features into smaller tasks
- Help users understand the code, not just write it
- Focus on responsive design with Tailwind CSS

Additional services:
- Basic packages (simple components): ₹299
- Intermediate (multi-component features): ₹999 
- Advanced (complex integrations): ₹1899
- Ultra (full applications): ₹2299

Contact:
- Email: shivrajsuman2005@gmail.com
- Phone: +91 7600267733
- Location: VIT Bhopal Kothri, Sehore, 466114 MP, India`;

    if (examples.length > 0) {
      systemPrompt += "\n\nTraining examples:\n";
      examples.forEach((example) => {
        systemPrompt += `User: ${example.input}\nResponse: ${example.expectedOutput}\n\n`;
      });
    }

    return systemPrompt;
  }

  static async getResponse(userMessage: string): Promise<AIResponse> {
    if (!this.isReady()) {
      return {
        text: "AI service is not initialized. Please provide an API key.",
        confidence: 0,
      };
    }

    try {
      if (this.apiKey === "demo" || this.apiKey === "test") {
        return this.getFallbackResponse(userMessage);
      }

      const prompt = {
        inputs: `<s>[INST]<<SYS>>${this.generateSystemPrompt()}<</SYS>>\n\n${userMessage}[/INST]</s>`,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false,
        }
      };

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(prompt),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("AI API Error:", errorData);
        
        if (response.status === 401) {
          toast.error("Invalid API key. Using fallback responses.");
          return this.getFallbackResponse(userMessage);
        }
        
        throw new Error(`AI API Error: ${response.status} - ${errorData || 'Unknown error'}`);
      }

      const data = await response.json();
      const generatedText = data[0]?.generated_text || "I apologize, but I couldn't generate a response. Let me help you with coding instead.";
      
      return {
        text: generatedText,
        confidence: 0.95,
        metadata: this.analyzeResponse(generatedText, userMessage),
      };
    } catch (error) {
      console.error("Error getting AI response:", error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private static getFallbackResponse(userMessage: string): AIResponse {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for code-related keywords
    if (lowerMsg.includes("code") || lowerMsg.includes("component") || lowerMsg.includes("function")) {
      return {
        text: "I can help you write clean, efficient code. Could you describe what functionality you need? I'll help create components under 100 lines following React and TypeScript best practices.",
        confidence: 0.8,
        metadata: {
          detectedIntent: "code_assistance"
        }
      };
    }

    if (lowerMsg.includes("error") || lowerMsg.includes("bug") || lowerMsg.includes("fix")) {
      return {
        text: "I can help debug your code. Could you share the error message or describe the issue you're experiencing? I'll help identify and fix the problem while maintaining clean code practices.",
        confidence: 0.8,
        metadata: {
          detectedIntent: "debugging"
        }
      };
    }

    // Use any training examples if available
    const examples = this.getTrainingExamples();
    if (examples.length > 0) {
      // Try to find a training example that matches the user message
      for (const example of examples) {
        // Simple keyword matching to find relevant examples
        const exampleKeywords = example.input.toLowerCase().split(/\s+/);
        const userKeywords = lowerMsg.split(/\s+/);
        
        // Count matching keywords
        const matchingKeywords = exampleKeywords.filter(keyword => 
          userKeywords.some(userKeyword => userKeyword.includes(keyword) || keyword.includes(userKeyword))
        );
        
        // If there's a reasonable match (30% or more keywords match), use this example
        if (matchingKeywords.length > 0 && 
            (matchingKeywords.length / exampleKeywords.length > 0.3 || 
             matchingKeywords.length >= 3)) {
          return {
            text: example.expectedOutput,
            confidence: 0.8,
            metadata: {
              detectedIntent: example.category || "matched_example"
            }
          };
        }
      }
    }
    
    // Check for specific queries if no matching example was found
    if (lowerMsg.includes("pricing") || lowerMsg.includes("cost") || lowerMsg.includes("price")) {
      return {
        text: "Our pricing varies based on project complexity. Basic packages start at ₹299, Intermediate at ₹999, Advanced at ₹1899, and Ultra at ₹2299. Would you like to schedule a consultation for a personalized quote?",
        confidence: 0.9,
        metadata: {
          detectedIntent: "pricing_inquiry"
        }
      };
    } 
    
    if (lowerMsg.includes("contact") || lowerMsg.includes("call") || lowerMsg.includes("email")) {
      return {
        text: "You can reach our team at shivrajsuman2005@gmail.com or call us at +91 7600267733. Alternatively, you can fill out the contact form on our website and we'll get back to you within 24 hours.",
        confidence: 0.9,
        metadata: {
          detectedIntent: "contact_inquiry"
        }
      };
    }
    
    if (lowerMsg.includes("time") || lowerMsg.includes("deadline") || lowerMsg.includes("how long")) {
      return {
        text: "We deliver products under 100 minutes on demand (terms and conditions apply). For larger projects, timelines depend on complexity and requirements. We'll provide a detailed timeline during our initial consultation.",
        confidence: 0.9,
        metadata: {
          detectedIntent: "timeline_inquiry"
        }
      };
    }
    
    if (lowerMsg.includes("location") || lowerMsg.includes("address") || lowerMsg.includes("where")) {
      return {
        text: "We're located at VIT Bhopal Kothri, Sehore, 466114 MP, India. Feel free to visit us or contact us via email or phone for remote consultations.",
        confidence: 0.9,
        metadata: {
          detectedIntent: "location_inquiry"
        }
      };
    }
    
    // Randomly select one of several different specific responses for general inquiries
    const generalResponses = [
      "Hi there! I'd be happy to help with your coding needs. We offer website development, mobile app development, e-commerce solutions, and more. Could you tell me more about your specific project requirements?",
      
      "Thanks for reaching out to PixelForge! We specialize in creating websites, web applications, mobile apps, and e-commerce platforms. What kind of project are you interested in?",
      
      "Welcome to PixelForge! I'm here to help with your technical needs. Our team excels in building websites, apps, and custom software solutions. What can we build for you today?",
      
      "Hello! I'm PixelForge's AI assistant. We offer a range of services including websites (from ₹299), web apps (from ₹999), and mobile apps (from ₹1899). How can we assist with your project?",
      
      "Greetings! PixelForge delivers high-quality coding solutions under 100 minutes on demand. Our services include website development, app creation, and e-commerce solutions. What are you looking to build?"
    ];
    
    // Detect project requirements
    if (lowerMsg.length > 15 && 
        (lowerMsg.includes("project") || 
         lowerMsg.includes("need") || 
         lowerMsg.includes("want") || 
         lowerMsg.includes("build") ||
         lowerMsg.includes("develop"))) {
      
      // Simple analysis of the user message
      const isWebsite = lowerMsg.includes("website") || lowerMsg.includes("site") || lowerMsg.includes("page");
      const isEcommerce = lowerMsg.includes("shop") || lowerMsg.includes("store") || lowerMsg.includes("sell");
      const isApp = lowerMsg.includes("app") || lowerMsg.includes("mobile") || lowerMsg.includes("ios") || lowerMsg.includes("android");
      
      // Simple complexity detection
      const isComplex = lowerMsg.includes("complex") || lowerMsg.includes("advanced") || lowerMsg.includes("dashboard");
      const isIntermediate = lowerMsg.includes("dynamic") || lowerMsg.includes("database");
      
      let projectType = isEcommerce ? "e-commerce site" : isApp ? "mobile app" : "website";
      let complexity = isComplex ? "advanced" : isIntermediate ? "intermediate" : "basic";
      let price = isComplex ? "₹1899" : isIntermediate ? "₹999" : "₹299";
      
      return {
        text: `Based on your requirements, it sounds like you're looking for a ${complexity} ${projectType}. Our estimated pricing for this would be ${price}. We typically deliver within 100 minutes for basic requirements (terms and conditions apply). Would you like to schedule a consultation?`,
        confidence: 0.8,
        metadata: {
          projectType: projectType,
          complexity: complexity,
          estimatedPrice: price
        }
      };
    }

    const codingResponses = [
      "I'm your AI coding assistant! I can help you create React components, implement features, or debug issues. What would you like to work on?",
      "Ready to help with your coding needs! I specialize in React, TypeScript, and Tailwind CSS. What component or feature should we build?",
      "Let's write some clean, efficient code together! I can help with components, hooks, or any React feature you need. What's your goal?",
      "Hi! I'm here to assist with your development tasks. I can help create components under 100 lines or debug issues. What can I help you with?",
    ];

    return {
      text: codingResponses[Math.floor(Math.random() * codingResponses.length)],
      confidence: 0.7,
      metadata: {
        detectedIntent: "general_coding"
      }
    };
  }

  // Analyze response to extract metadata (project type, complexity, etc.)
  private static analyzeResponse(response: string, userMessage: string): any {
    // Simple regex-based analysis to extract details from the response
    const metadata: any = {};
    
    // Try to detect project type
    const projectTypes = ["website", "web application", "e-commerce", "mobile app"];
    for (const type of projectTypes) {
      if (response.toLowerCase().includes(type)) {
        metadata.projectType = type;
        break;
      }
    }
    
    // Try to detect complexity
    const complexityLevels = ["basic", "intermediate", "advanced", "ultra"];
    for (const level of complexityLevels) {
      if (response.toLowerCase().includes(level)) {
        metadata.complexity = level;
        break;
      }
    }
    
    // Try to extract price
    const priceMatch = response.match(/₹\s*(\d+)/);
    if (priceMatch) {
      metadata.estimatedPrice = priceMatch[0];
    }
    
    return metadata;
  }
}
