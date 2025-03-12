
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

  // Generate system prompt from training examples
  private static generateSystemPrompt(): string {
    const examples = this.getTrainingExamples();
    let systemPrompt = `You are PixelForge's AI assistant that helps potential clients understand our services.
    
Important information:
- We deliver products under 100 minutes on demand (terms and conditions apply)
- The customer must provide their requirements in a written format
- We are not responsible for any incompatibility of the software with hardware
- Contact number: +91 7600267733
- Email: shivrajsuman2005@gmail.com
- Location: VIT Bhopal Kothri, Sehore, 466114 MP, India
- We were founded in 2024 and our first client was Alankarika

Pricing:
- Basic packages: ₹299
- Intermediate packages: ₹999
- Advanced packages: ₹1899
- Ultra packages: ₹2299

Project types we handle:
- Websites (basic, landing pages, portfolios, blogs)
- Web applications (dashboards, platforms, tools)
- E-commerce (online stores, payment systems)
- Mobile applications (iOS, Android)

Be helpful, concise, and precise with information. Analyze user requirements and provide relevant pricing estimates.`;

    // Add training examples if available
    if (examples.length > 0) {
      systemPrompt += "\n\nTraining examples:\n";
      examples.forEach((example, index) => {
        systemPrompt += `Example ${index + 1}:\nUser: ${example.input}\nResponse: ${example.expectedOutput}\n\n`;
      });
    }

    return systemPrompt;
  }

  // Get a response from the AI
  static async getResponse(userMessage: string): Promise<AIResponse> {
    if (!this.isReady()) {
      return {
        text: "AI service is not initialized. Please provide an API key.",
        confidence: 0,
      };
    }

    try {
      // For demo/development without an actual API key, provide a fallback
      if (this.apiKey === "demo" || this.apiKey === "test") {
        return this.getFallbackResponse(userMessage);
      }

      // Prepare conversation context with system prompt and user message
      const prompt = {
        inputs: `<s>[INST]<<SYS>>${this.generateSystemPrompt()}<</SYS>>\n\n${userMessage}[/INST]</s>`,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
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
        throw new Error(`AI API Error: ${response.status} - ${errorData || 'Unknown error'}`);
      }

      const data = await response.json();
      const generatedText = data[0]?.generated_text || "Sorry, I couldn't generate a response.";
      
      return {
        text: generatedText,
        confidence: 0.95, // Placeholder for actual confidence score
        metadata: this.analyzeResponse(generatedText, userMessage),
      };
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get AI response. Please try again.");
      
      // Return a fallback response if API call fails
      return this.getFallbackResponse(userMessage);
    }
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

  // Provide a fallback response when no API key is available or API fails
  private static getFallbackResponse(userMessage: string): AIResponse {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for specific queries first
    if (lowerMsg.includes("pricing") || lowerMsg.includes("cost")) {
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
    
    // Generic fallback
    return {
      text: "Thank you for your interest in PixelForge! I'd like to understand your project requirements better. Could you share more details about what you're looking to build, any specific features you need, and your timeline? This will help us provide the most accurate information and pricing.",
      confidence: 0.6
    };
  }
}
