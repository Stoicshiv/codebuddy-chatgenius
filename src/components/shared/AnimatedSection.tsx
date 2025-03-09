
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  once?: boolean;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";
    
    const animations: Record<string, string> = {
      up: "animate-slide-up",
      down: "animate-slide-down",
      left: "animate-slide-in-left",
      right: "animate-slide-in-right",
      fade: "animate-fade-in",
    };
    
    return animations[direction] || "animate-fade-in";
  };

  const getDelayClass = () => {
    if (delay === 0) return "";
    const delayMap: Record<number, string> = {
      100: "animation-delay-100",
      200: "animation-delay-200",
      300: "animation-delay-300",
      400: "animation-delay-400",
      500: "animation-delay-500",
      700: "animation-delay-700",
      1000: "animation-delay-1000",
    };
    return delayMap[delay] || "";
  };

  return (
    <div
      ref={ref}
      className={cn(
        getAnimationClass(),
        getDelayClass(),
        "transition-opacity duration-700",
        className
      )}
      style={{ 
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
