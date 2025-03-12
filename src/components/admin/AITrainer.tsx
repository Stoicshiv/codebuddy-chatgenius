
import React, { useState, useEffect } from "react";
import { AIService, TrainingExample } from "@/services/AIService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Bot, Save, Trash, Plus, Key, RefreshCw, Link } from "lucide-react";

const AITrainer: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [newExample, setNewExample] = useState<TrainingExample>({
    input: "",
    expectedOutput: "",
    category: "general",
  });
  const [examples, setExamples] = useState<TrainingExample[]>([]);

  useEffect(() => {
    // Try to get saved API key
    const key = localStorage.getItem("pixelforge_ai_key");
    if (key) {
      setSavedKey(key);
    }
    
    // Load existing examples
    refreshExamples();
  }, []);

  const refreshExamples = () => {
    const loadedExamples = AIService.getTrainingExamples();
    setExamples(loadedExamples);
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    const success = AIService.init(apiKey);
    if (success) {
      toast.success("API key saved successfully");
      setSavedKey(apiKey);
      setApiKey("");
    } else {
      toast.error("Failed to save API key");
    }
  };

  const handleAddExample = () => {
    if (!newExample.input.trim() || !newExample.expectedOutput.trim()) {
      toast.error("Please fill in both input and expected output fields");
      return;
    }
    
    AIService.addTrainingExample(newExample);
    toast.success("Training example added successfully");
    setNewExample({
      input: "",
      expectedOutput: "",
      category: "general",
    });
    refreshExamples();
  };

  const handleClearExamples = () => {
    if (confirm("Are you sure you want to clear all training examples?")) {
      AIService.clearTrainingExamples();
      toast.success("All training examples cleared");
      refreshExamples();
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bot className="h-6 w-6" /> AI Model Training Panel
      </h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI API Configuration</CardTitle>
          <CardDescription>
            Configure the AI service with your Hugging Face API key.
            {savedKey && (
              <span className="block mt-2 text-sm text-green-600">
                ✓ API key is currently set
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter your Hugging Face API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey}>
                <Key className="mr-2 h-4 w-4" /> Save Key
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              For testing without an API key, enter "demo" as the key.
            </p>
            <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-4 text-sm">
              <div className="flex items-center gap-2 font-medium text-blue-800 dark:text-blue-300 mb-1">
                <Link size={16} />
                <span>Get a free Hugging Face API token</span>
              </div>
              <p className="text-blue-700 dark:text-blue-400">
                1. Create a free account at <a href="https://huggingface.co/join" target="_blank" rel="noreferrer" className="underline">huggingface.co</a><br />
                2. Generate an API token at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="underline">Settings → Access Tokens</a><br />
                3. Copy and paste your token above
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Training Example</CardTitle>
          <CardDescription>
            Train the AI by providing example inputs and expected outputs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">User Input</label>
              <Textarea
                placeholder="e.g., How much does a basic website cost?"
                value={newExample.input}
                onChange={(e) => setNewExample({...newExample, input: e.target.value})}
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Expected AI Response</label>
              <Textarea
                placeholder="e.g., Our basic website packages start at ₹299..."
                value={newExample.expectedOutput}
                onChange={(e) => setNewExample({...newExample, expectedOutput: e.target.value})}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category (optional)</label>
              <Input
                placeholder="e.g., pricing, timeline, etc."
                value={newExample.category || ""}
                onChange={(e) => setNewExample({...newExample, category: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setNewExample({input: "", expectedOutput: "", category: "general"})}>
            Clear
          </Button>
          <Button onClick={handleAddExample}>
            <Plus className="mr-2 h-4 w-4" /> Add Example
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Training Examples ({examples.length})</CardTitle>
            <CardDescription>
              All training examples that have been added to the AI model.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={refreshExamples}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="destructive" onClick={handleClearExamples} disabled={examples.length === 0}>
              <Trash className="mr-2 h-4 w-4" /> Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {examples.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No training examples yet. Add some above to improve the AI.
            </p>
          ) : (
            <div className="space-y-6">
              {examples.map((example, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <div className="font-medium text-sm">{example.category && <span className="text-xs bg-muted px-2 py-1 rounded">{example.category}</span>}</div>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">User input:</p>
                    <p className="text-sm bg-muted p-2 rounded">{example.input}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Expected response:</p>
                    <p className="text-sm bg-muted p-2 rounded">{example.expectedOutput}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AITrainer;
