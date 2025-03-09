
import React from "react";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
  animated?: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "typescript",
  className,
  animated = true,
}) => {
  // Basic syntax highlighting for the snippet
  const formattedCode = code
    .split("\n")
    .map((line, i) => {
      const highlightedLine = line
        .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
        .replace(/(import|export|const|let|function|return|if|else|for|while)/g, '<span class="code-keyword">$1</span>')
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="code-string">$1</span>')
        .replace(/\b([A-Za-z]+)(?=\()/g, '<span class="code-function">$1</span>');
        
      return `<span class="code-line">${highlightedLine || " "}</span>`;
    })
    .join("");

  return (
    <div 
      className={cn(
        "code-block",
        animated && "overflow-hidden",
        className
      )}
    >
      <pre 
        className={cn(
          "language-typescript",
          animated && "animate-code-scroll"
        )}
        dangerouslySetInnerHTML={{ __html: formattedCode }}
      />
      {animated && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background to-transparent" />
      )}
    </div>
  );
};

export default CodeSnippet;
