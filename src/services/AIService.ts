
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
  private static predefinedExamples: TrainingExample[] = [
    {
      category: "react_component",
      input: "How do I create a button component in React?",
      expectedOutput: "Here's a simple button component using React and Tailwind CSS:\n\n```jsx\nimport React from 'react';\n\nconst Button = ({ children, onClick, variant = 'primary', size = 'md' }) => {\n  const baseClasses = 'font-medium rounded-lg focus:outline-none transition-colors';\n  \n  const variantClasses = {\n    primary: 'bg-primary text-white hover:bg-primary/90',\n    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',\n    outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10'\n  };\n  \n  const sizeClasses = {\n    sm: 'px-3 py-1.5 text-sm',\n    md: 'px-4 py-2',\n    lg: 'px-6 py-3 text-lg'\n  };\n  \n  return (\n    <button\n      onClick={onClick}\n      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}\n    >\n      {children}\n    </button>\n  );\n};\n\nexport default Button;\n```\n\nThis component accepts children, an onClick handler, and optional variant and size props. It uses Tailwind CSS for styling and provides three variants (primary, secondary, outline) and three sizes (sm, md, lg). You can easily extend this to add more variants or features as needed."
    },
    {
      category: "typescript_interface",
      input: "How do I create a TypeScript interface for a user object?",
      expectedOutput: "Here's a TypeScript interface for a typical user object:\n\n```typescript\nexport interface User {\n  id: string;\n  username: string;\n  email: string;\n  displayName?: string;\n  avatarUrl?: string;\n  role: 'user' | 'admin' | 'moderator';\n  createdAt: Date;\n  lastLogin?: Date;\n  isActive: boolean;\n  preferences?: {\n    theme: 'light' | 'dark' | 'system';\n    emailNotifications: boolean;\n    language: string;\n  };\n}\n```\n\nThis interface includes:\n- Required fields like id, username, email\n- Optional fields marked with ? like displayName and avatarUrl\n- Union types for the role field\n- Nested object type for preferences\n- Date objects for timestamps\n\nYou can adjust this based on your specific needs. To use this interface:\n\n```typescript\nimport { User } from './types';\n\nconst currentUser: User = {\n  id: '1',\n  username: 'johndoe',\n  email: 'john@example.com',\n  role: 'user',\n  createdAt: new Date(),\n  isActive: true\n};\n```"
    },
    {
      category: "tailwind_responsive",
      input: "How do I make a responsive layout with Tailwind?",
      expectedOutput: "Here's how to create a responsive layout with Tailwind CSS:\n\n```jsx\nimport React from 'react';\n\nconst ResponsiveLayout = () => {\n  return (\n    <div className=\"container mx-auto px-4\">\n      {/* Responsive Grid */}\n      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8\">\n        {/* Cards that adjust based on screen size */}\n        {[1, 2, 3, 4, 5, 6].map((item) => (\n          <div key={item} className=\"bg-white rounded-lg shadow p-6\">\n            <h2 className=\"text-xl md:text-2xl font-bold mb-4\">Card {item}</h2>\n            <p className=\"text-gray-600\">This card adapts to different screen sizes.</p>\n          </div>\n        ))}\n      </div>\n      \n      {/* Responsive Navigation */}\n      <nav className=\"bg-gray-800 text-white rounded-lg mb-8\">\n        <div className=\"flex flex-col sm:flex-row\">\n          <div className=\"px-4 py-3 sm:py-5 font-bold\">My Website</div>\n          {/* Mobile: Stacked, Desktop: Row */}\n          <div className=\"flex flex-col sm:flex-row sm:ml-auto\">\n            <a href=\"#\" className=\"px-4 py-3 hover:bg-gray-700\">Home</a>\n            <a href=\"#\" className=\"px-4 py-3 hover:bg-gray-700\">About</a>\n            <a href=\"#\" className=\"px-4 py-3 hover:bg-gray-700\">Services</a>\n            <a href=\"#\" className=\"px-4 py-3 hover:bg-gray-700\">Contact</a>\n          </div>\n        </div>\n      </nav>\n      \n      {/* Responsive Text Sizes */}\n      <h1 className=\"text-2xl md:text-3xl lg:text-4xl font-bold mb-4\">Responsive Title</h1>\n      <p className=\"text-sm md:text-base lg:text-lg mb-8\">This text changes size based on the viewport.</p>\n    </div>\n  );\n};\n\nexport default ResponsiveLayout;\n```\n\nTailwind's responsive design system uses these breakpoints:\n- `sm`: 640px and up\n- `md`: 768px and up\n- `lg`: 1024px and up\n- `xl`: 1280px and up\n- `2xl`: 1536px and up\n\nKey tips:\n- Use the responsive prefixes (sm:, md:, lg:, etc.) before utility classes\n- Define mobile styles first (without prefixes), then add responsive overrides\n- The `container` class helps center content with appropriate padding\n- Use `grid-cols-*` utilities with responsive prefixes for responsive grids"
    },
    {
      category: "react_hooks",
      input: "How do I use useState and useEffect hooks?",
      expectedOutput: "Here's a practical example of using useState and useEffect hooks in React:\n\n```jsx\nimport React, { useState, useEffect } from 'react';\n\nconst DataFetchingExample = () => {\n  // State for storing fetched data\n  const [data, setData] = useState([]);\n  \n  // State for loading status\n  const [isLoading, setIsLoading] = useState(false);\n  \n  // State for error handling\n  const [error, setError] = useState(null);\n  \n  // State for controlling when to fetch (e.g., page number)\n  const [page, setPage] = useState(1);\n\n  // Effect hook to fetch data whenever page changes\n  useEffect(() => {\n    // Async function for data fetching\n    const fetchData = async () => {\n      setIsLoading(true);\n      setError(null);\n      \n      try {\n        const response = await fetch(`https://api.example.com/data?page=${page}`);\n        \n        if (!response.ok) {\n          throw new Error(`HTTP error! Status: ${response.status}`);\n        }\n        \n        const result = await response.json();\n        setData(result);\n      } catch (err) {\n        console.error('Fetching error:', err);\n        setError('Failed to fetch data. Please try again.');\n      } finally {\n        setIsLoading(false);\n      }\n    };\n\n    fetchData();\n    \n    // Cleanup function (optional)\n    return () => {\n      // Cancel any pending requests or subscriptions here\n      console.log('Cleaning up before next effect or unmount');\n    };\n  }, [page]); // Only re-run when page changes\n\n  return (\n    <div className=\"container mx-auto p-4\">\n      <h1 className=\"text-2xl font-bold mb-4\">Data Example</h1>\n      \n      {/* Loading state */}\n      {isLoading && <p className=\"text-gray-500\">Loading data...</p>}\n      \n      {/* Error state */}\n      {error && <p className=\"text-red-500\">{error}</p>}\n      \n      {/* Data display */}\n      <ul className=\"space-y-2\">\n        {data.map(item => (\n          <li key={item.id} className=\"border p-3 rounded\">\n            {item.title}\n          </li>\n        ))}\n      </ul>\n      \n      {/* Pagination controls */}\n      <div className=\"mt-4 flex space-x-2\">\n        <button \n          onClick={() => setPage(p => Math.max(p - 1, 1))}\n          disabled={page === 1}\n          className=\"px-4 py-2 bg-gray-200 rounded disabled:opacity-50\"\n        >\n          Previous\n        </button>\n        <span className=\"px-4 py-2\">Page {page}</span>\n        <button \n          onClick={() => setPage(p => p + 1)}\n          className=\"px-4 py-2 bg-gray-200 rounded\"\n        >\n          Next\n        </button>\n      </div>\n    </div>\n  );\n};\n\nexport default DataFetchingExample;\n```\n\nKey points about these hooks:\n\n**useState:**\n- Provides a state variable and its setter function\n- Format: `const [state, setState] = useState(initialValue)`\n- Call setter to update state (triggers re-render)\n- Use functional updates (`setState(prev => prev + 1)`) when new state depends on old state\n\n**useEffect:**\n- Runs after render and after every update (by default)\n- Use dependency array to control when it runs:\n  - Empty array `[]`: Runs only on mount\n  - With dependencies `[dep1, dep2]`: Runs when dependencies change\n  - No array: Runs after every render\n- Return a cleanup function for subscriptions, timers, etc.\n- Keep your effects focused on one concern"
    },
    {
      category: "form_handling",
      input: "How do I create a form with validation in React?",
      expectedOutput: "Here's a form example with validation using React hooks:\n\n```jsx\nimport React, { useState } from 'react';\n\nconst ContactForm = () => {\n  // Form state\n  const [formData, setFormData] = useState({\n    name: '',\n    email: '',\n    message: ''\n  });\n\n  // Error state\n  const [errors, setErrors] = useState({\n    name: '',\n    email: '',\n    message: ''\n  });\n\n  // Success state\n  const [isSubmitted, setIsSubmitted] = useState(false);\n\n  // Handle input changes\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    \n    // Clear error when user types\n    setErrors(prev => ({\n      ...prev,\n      [name]: ''\n    }));\n    \n    setFormData(prev => ({\n      ...prev,\n      [name]: value\n    }));\n  };\n\n  // Validate form\n  const validateForm = () => {\n    let valid = true;\n    const newErrors = { name: '', email: '', message: '' };\n    \n    // Name validation\n    if (!formData.name.trim()) {\n      newErrors.name = 'Name is required';\n      valid = false;\n    }\n    \n    // Email validation\n    if (!formData.email.trim()) {\n      newErrors.email = 'Email is required';\n      valid = false;\n    } else if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) {\n      newErrors.email = 'Email is invalid';\n      valid = false;\n    }\n    \n    // Message validation\n    if (!formData.message.trim()) {\n      newErrors.message = 'Message is required';\n      valid = false;\n    } else if (formData.message.length < 10) {\n      newErrors.message = 'Message must be at least 10 characters';\n      valid = false;\n    }\n    \n    setErrors(newErrors);\n    return valid;\n  };\n\n  // Handle form submission\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    \n    if (validateForm()) {\n      // Simulate form submission\n      console.log('Form submitted:', formData);\n      \n      // Reset form and show success message\n      setFormData({ name: '', email: '', message: '' });\n      setIsSubmitted(true);\n      \n      // Hide success message after 3 seconds\n      setTimeout(() => setIsSubmitted(false), 3000);\n    }\n  };\n\n  return (\n    <div className=\"max-w-md mx-auto p-6 bg-white rounded-lg shadow-md\">\n      <h2 className=\"text-2xl font-bold mb-6\">Contact Us</h2>\n      \n      {isSubmitted && (\n        <div className=\"mb-4 p-3 bg-green-100 text-green-700 rounded\">\n          Thank you for your message! We'll get back to you soon.\n        </div>\n      )}\n      \n      <form onSubmit={handleSubmit} noValidate>\n        <div className=\"mb-4\">\n          <label className=\"block text-gray-700 mb-2\" htmlFor=\"name\">\n            Name\n          </label>\n          <input\n            type=\"text\"\n            id=\"name\"\n            name=\"name\"\n            value={formData.name}\n            onChange={handleChange}\n            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}\n          />\n          {errors.name && <p className=\"mt-1 text-sm text-red-500\">{errors.name}</p>}\n        </div>\n        \n        <div className=\"mb-4\">\n          <label className=\"block text-gray-700 mb-2\" htmlFor=\"email\">\n            Email\n          </label>\n          <input\n            type=\"email\"\n            id=\"email\"\n            name=\"email\"\n            value={formData.email}\n            onChange={handleChange}\n            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}\n          />\n          {errors.email && <p className=\"mt-1 text-sm text-red-500\">{errors.email}</p>}\n        </div>\n        \n        <div className=\"mb-6\">\n          <label className=\"block text-gray-700 mb-2\" htmlFor=\"message\">\n            Message\n          </label>\n          <textarea\n            id=\"message\"\n            name=\"message\"\n            value={formData.message}\n            onChange={handleChange}\n            rows={4}\n            className={`w-full p-2 border rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}\n          />\n          {errors.message && <p className=\"mt-1 text-sm text-red-500\">{errors.message}</p>}\n        </div>\n        \n        <button\n          type=\"submit\"\n          className=\"w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition\"\n        >\n          Send Message\n        </button>\n      </form>\n    </div>\n  );\n};\n\nexport default ContactForm;\n```\n\nThis form demonstrates:\n\n1. **State management** for form data and validation errors\n2. **Controlled components** where React state is the source of truth\n3. **Form validation** with helpful error messages\n4. **UX improvements** like validation styling and success feedback\n5. **Accessibility** with proper labels and form structure\n\nTo improve this form, you could:\n- Add loading state during submission\n- Use a form library like React Hook Form for complex forms\n- Add ARIA attributes for better accessibility\n- Implement server-side validation"
    },
    {
      category: "pricing",
      input: "What are your pricing options?",
      expectedOutput: "PixelForge offers flexible pricing options based on project complexity:\n\n- **Basic Package (₹299)**: Simple components and small features\n  - Single-page interfaces\n  - Basic React components\n  - Simple styling with Tailwind CSS\n  - Ideal for small UI enhancements\n\n- **Intermediate Package (₹999)**: Multi-component features\n  - Multi-page applications\n  - Form handling with validation\n  - Custom hooks and state management\n  - API integration\n\n- **Advanced Package (₹1899)**: Complex integrations\n  - Complex data visualization\n  - Authentication systems\n  - Real-time features\n  - Performance optimizations\n\n- **Ultra Package (₹2299)**: Full applications\n  - Complete application development\n  - Advanced state management\n  - Comprehensive testing\n  - Deployment assistance\n\nAll packages include:\n- Clean, maintainable code under 100 lines per component\n- TypeScript for type safety\n- Responsive design with Tailwind CSS\n- Documentation and code explanations\n\nFor a personalized quote based on your specific requirements, please share more details about your project. We can tailor our services to meet your exact needs and budget."
    },
    {
      category: "timeline",
      input: "How long does it take to build a website?",
      expectedOutput: "Our development timelines vary based on project complexity:\n\n- **Basic Components**: We can deliver simple components in under 100 minutes (terms and conditions apply). This includes buttons, cards, and basic UI elements.\n\n- **Feature Development**:\n  - Small features (1-2 days): Forms, simple layouts, basic API integration\n  - Medium features (3-5 days): Complex forms with validation, multi-step processes, data visualization\n  - Large features (1-2 weeks): Authentication systems, complex dashboards, real-time features\n\n- **Full Websites**:\n  - Landing pages: 1-2 weeks\n  - Multi-page websites: 2-4 weeks\n  - Web applications: 4-8 weeks\n\nFactors that affect timeline:\n- Feature complexity and scope\n- Design requirements\n- Integration with external services\n- Content preparation\n- Feedback and revision cycles\n\nWe pride ourselves on delivering clean, maintainable code. Our development process focuses on quality and efficiency, with components under 100 lines that are easy to maintain.\n\nFor a more accurate timeline based on your specific requirements, please share more details about your project."
    },
    {
      category: "contact",
      input: "How can I contact you?",
      expectedOutput: "You can reach the PixelForge team through multiple channels:\n\n- **Email**: shivrajsuman2005@gmail.com\n- **Phone**: +91 7600267733\n- **Location**: VIT Bhopal Kothri, Sehore, 466114 MP, India\n\nWe typically respond to all inquiries within 24 hours. For project discussions, we'd be happy to set up a consultation call to discuss your requirements in detail.\n\nYou can also use the contact form on our website to send us a message, and a team member will get back to you promptly.\n\nFeel free to reach out with any questions about our services, pricing, or to discuss your project needs. We're here to help!"
    },
    {
      category: "debug_react",
      input: "How do I debug React components?",
      expectedOutput: "Here are effective techniques for debugging React components:\n\n```jsx\nimport React, { useState, useEffect } from 'react';\n\nconst DebuggingExample = () => {\n  const [count, setCount] = useState(0);\n  const [data, setData] = useState(null);\n\n  // Console logs for component lifecycle\n  console.log('Component rendering with count:', count);\n\n  useEffect(() => {\n    console.log('Effect running after mount or count change');\n    \n    // Simulate data fetching\n    const fetchData = async () => {\n      try {\n        // Log before API call\n        console.log('Fetching data...');\n        \n        // Simulated API call\n        const response = await fetch('https://api.example.com/data');\n        const result = await response.json();\n        \n        // Log API response\n        console.log('API response:', result);\n        \n        setData(result);\n      } catch (error) {\n        // Error logging\n        console.error('API Error:', error);\n      }\n    };\n\n    fetchData();\n    \n    // Cleanup function\n    return () => {\n      console.log('Cleanup running - component unmounting or count changing');\n    };\n  }, [count]);\n\n  // Debugging function example\n  const handleClick = () => {\n    console.log('Button clicked, current count:', count);\n    setCount(prevCount => {\n      const newCount = prevCount + 1;\n      console.log('Updating count from', prevCount, 'to', newCount);\n      return newCount;\n    });\n  };\n\n  return (\n    <div className=\"p-4 border rounded\">\n      <h2 className=\"text-xl font-bold mb-4\">Debugging Example</h2>\n      <p>Count: {count}</p>\n      <button \n        onClick={handleClick}\n        className=\"bg-blue-500 text-white px-4 py-2 rounded mt-2\"\n      >\n        Increment\n      </button>\n      \n      {/* Conditional rendering for debugging */}\n      {count > 5 && (\n        <div className=\"mt-4 p-2 bg-yellow-100\">\n          This only shows when count > 5\n        </div>\n      )}\n      \n      {/* Debug state display */}\n      <div className=\"mt-4 p-2 bg-gray-100 font-mono text-sm\">\n        <p>Debug Info:</p>\n        <pre>{JSON.stringify({ count, hasData: !!data }, null, 2)}</pre>\n      </div>\n    </div>\n  );\n};\n\nexport default DebuggingExample;\n```\n\n**Key Debugging Techniques:**\n\n1. **Strategic console.log usage**:\n   - Log component rendering\n   - Log effect execution\n   - Log state updates\n   - Log function calls\n\n2. **React DevTools (Browser extension)**:\n   - Inspect component hierarchy\n   - View and edit state/props\n   - Track renders and re-renders\n   - Profile performance\n\n3. **In-component debugging panel**:\n   - Display state/props values directly in your UI\n   - Use `<pre>` and `JSON.stringify()` for formatting\n\n4. **Browser DevTools**:\n   - Use debugger statements\n   - Set breakpoints in Chrome DevTools\n   - Use the React developer tools profiler\n\n5. **Error boundaries**:\n   ```jsx\n   class ErrorBoundary extends React.Component {\n     state = { hasError: false, error: null };\n     \n     static getDerivedStateFromError(error) {\n       return { hasError: true, error };\n     }\n     \n     componentDidCatch(error, info) {\n       console.error('Error caught by boundary:', error, info);\n     }\n     \n     render() {\n       if (this.state.hasError) {\n         return <div>Something went wrong: {this.state.error.message}</div>;\n       }\n       return this.props.children;\n     }\n   }\n   ```\n\nWhen debugging issues, follow this process:\n1. Identify exactly when and where the problem occurs\n2. Verify your assumptions with console logs\n3. Use React DevTools to inspect component state\n4. Test isolated components to narrow down the issue\n5. Check for common pitfalls (missing dependencies, stale closures)"
    }
  ];

  // Initialize the service with API key
  static init(apiKey: string): boolean {
    try {
      this.apiKey = apiKey;
      this.isInitialized = true;
      localStorage.setItem("pixelforge_ai_key", apiKey);
      
      // Load predefined examples into training examples
      this.loadPredefinedExamples();
      
      console.log("AI service initialized successfully");
      return true;
    } catch (error) {
      console.error("Failed to initialize AI service:", error);
      return false;
    }
  }

  private static loadPredefinedExamples(): void {
    // Merge predefined examples with user-added examples
    const savedExamples = localStorage.getItem("pixelforge_training_examples");
    const userExamples = savedExamples ? JSON.parse(savedExamples) : [];
    
    // Combine user examples with predefined ones, avoiding duplicates
    this.trainingExamples = [
      ...this.predefinedExamples,
      ...userExamples.filter((userEx: TrainingExample) => 
        !this.predefinedExamples.some(preEx => 
          preEx.input.toLowerCase() === userEx.input.toLowerCase()
        )
      )
    ];
    
    // Save combined examples
    localStorage.setItem("pixelforge_training_examples", JSON.stringify(this.trainingExamples));
    console.log(`Loaded ${this.trainingExamples.length} examples (${this.predefinedExamples.length} predefined, ${userExamples.length} user-added)`);
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
    // Check if example already exists
    const existingIndex = this.trainingExamples.findIndex(
      ex => ex.input.toLowerCase() === example.input.toLowerCase()
    );
    
    if (existingIndex >= 0) {
      // Update existing example
      this.trainingExamples[existingIndex] = example;
    } else {
      // Add new example
      this.trainingExamples.push(example);
    }
    
    // Store training examples in localStorage
    localStorage.setItem("pixelforge_training_examples", JSON.stringify(this.trainingExamples));
    console.log("Training example added:", example);
  }

  // Get all training examples
  static getTrainingExamples(): TrainingExample[] {
    // Try to load from localStorage if empty
    if (this.trainingExamples.length === 0) {
      const savedExamples = localStorage.getItem("pixelforge_training_examples");
      if (savedExamples) {
        this.trainingExamples = JSON.parse(savedExamples);
      } else {
        // Initialize with predefined examples if no user examples exist
        this.loadPredefinedExamples();
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
      // Include a selection of examples (prioritize code-related ones)
      const codeExamples = examples.filter(ex => 
        ex.category?.includes('react') || 
        ex.category?.includes('code') || 
        ex.category?.includes('typescript') ||
        ex.category?.includes('debug')
      );
      
      // Select up to 5 code examples and add general examples if needed
      const selectedExamples = [
        ...codeExamples.slice(0, 5),
        ...examples.filter(ex => !codeExamples.includes(ex)).slice(0, 3)
      ].slice(0, 5);
      
      selectedExamples.forEach((example) => {
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
      if (this.apiKey === "demo" || this.apiKey === "test" || this.apiKey.includes("xxx")) {
        return this.getFallbackResponse(userMessage);
      }

      const prompt = {
        inputs: `<s>[INST]<<SYS>>${this.generateSystemPrompt()}<</SYS>>\n\n${userMessage}[/INST]</s>`,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.6,
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
    
    // First check for exact matches to predefined examples
    const exactMatch = this.trainingExamples.find(
      example => example.input.toLowerCase() === lowerMsg
    );
    
    if (exactMatch) {
      return {
        text: exactMatch.expectedOutput,
        confidence: 0.99,
        metadata: {
          detectedIntent: exactMatch.category || "exact_match"
        }
      };
    }
    
    // Check for close matches based on keywords
    const examples = this.getTrainingExamples();
    if (examples.length > 0) {
      // Try to find a training example that matches the user message
      const matchedExamples = examples
        .map(example => {
          // Simple keyword matching with weights
          const exampleKeywords = example.input.toLowerCase().split(/\s+/);
          const userKeywords = lowerMsg.split(/\s+/);
          
          // Count matching keywords and calculate score
          const matchingKeywords = exampleKeywords.filter(keyword => 
            userKeywords.some(userKeyword => 
              userKeyword.includes(keyword) || keyword.includes(userKeyword)
            )
          );
          
          const matchScore = matchingKeywords.length / Math.max(exampleKeywords.length, 3);
          
          return {
            example,
            score: matchScore
          };
        })
        .filter(match => match.score > 0.3) // Only consider good matches
        .sort((a, b) => b.score - a.score); // Sort by score descending
      
      // If we have a good match, use it
      if (matchedExamples.length > 0) {
        return {
          text: matchedExamples[0].example.expectedOutput,
          confidence: 0.8 * matchedExamples[0].score,
          metadata: {
            detectedIntent: matchedExamples[0].example.category || "matched_example"
          }
        };
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
    
    // Check for code-related keywords - prioritize these for coding focus
    if (lowerMsg.includes("react") || 
        lowerMsg.includes("component") || 
        lowerMsg.includes("typescript") || 
        lowerMsg.includes("code") || 
        lowerMsg.includes("tailwind") ||
        lowerMsg.includes("function") ||
        lowerMsg.includes("hook") ||
        lowerMsg.includes("ui")) {
      
      const codingResponses = [
        "I'd be happy to help with your coding needs. Could you provide more details about what you're trying to build? I can provide clean, efficient code examples under 100 lines for React, TypeScript, and Tailwind CSS components.",
        
        "I specialize in writing maintainable React code. What specific component or functionality are you looking to implement? I'll provide a clean solution following TypeScript and React best practices.",
        
        "I can help create that for you. For React components, I focus on code that's under 100 lines, maintainable, and follows best practices. Please share more details about your requirements, and I'll provide a custom solution.",
        
        "I'd be glad to help with your React/TypeScript needs. Could you describe what you're looking to build in more detail? I'll create clean, efficient components that are easy to maintain and extend."
      ];
      
      return {
        text: codingResponses[Math.floor(Math.random() * codingResponses.length)],
        confidence: 0.8,
        metadata: {
          detectedIntent: "coding_assistance"
        }
      };
    }
    
    // Detect project requirements for general project inquiries
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

    // Default response for general coding assistance
    const generalCodingResponses = [
      "I'm your coding assistant specialized in React, TypeScript, and Tailwind CSS. I can help you create clean, efficient components under 100 lines. What would you like to build today?",
      
      "I'm here to help with your web development needs. Whether you need a new React component, help with TypeScript types, or assistance with Tailwind styling, I can provide clean, maintainable code examples. What are you working on?",
      
      "How can I assist with your coding project today? I specialize in React components, TypeScript, and responsive design with Tailwind CSS. Let me know what you're trying to build, and I'll help with implementation details.",
      
      "I'm PixelForge's coding assistant. I can help create React components, implement features with TypeScript, and design responsive UIs with Tailwind. What specific coding challenge can I help you with today?"
    ];

    return {
      text: generalCodingResponses[Math.floor(Math.random() * generalCodingResponses.length)],
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
    
    // Detect intent based on content
    if (response.includes("```")) {
      metadata.detectedIntent = "code_example";
    } else if (response.toLowerCase().includes("error") || response.toLowerCase().includes("debug")) {
      metadata.detectedIntent = "debugging";
    }
    
    return metadata;
  }
}
