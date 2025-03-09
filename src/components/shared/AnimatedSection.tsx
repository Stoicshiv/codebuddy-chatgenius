
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "zoom" | "rotate"; // Added zoom and rotate
  once?: boolean;
  threshold?: number;
  id?: string;
  speed?: "fast" | "normal" | "slow"; // Add animation speed control
  intensity?: "light" | "medium" | "strong"; // Add animation intensity
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  threshold = 0.1,
  id,
  speed = "normal",
  intensity = "medium",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
          }
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
    if (currentRef && !hasAnimated) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold, hasAnimated]);

  const getAnimationClass = () => {
    if (!isVisible) {
      // Initial state classes based on direction
      const initialStates: Record<string, string> = {
        up: "opacity-0 translate-y-12",
        down: "opacity-0 -translate-y-12",
        left: "opacity-0 translate-x-12",
        right: "opacity-0 -translate-x-12",
        fade: "opacity-0",
        zoom: "opacity-0 scale-75",
        rotate: "opacity-0 rotate-12 scale-95",
      };
      return initialStates[direction] || "opacity-0";
    }
    
    const animations: Record<string, string> = {
      up: "animate-slide-up",
      down: "animate-slide-down",
      left: "animate-slide-in-left",
      right: "animate-slide-in-right",
      fade: "animate-fade-in",
      zoom: "animate-zoom-in",
      rotate: "animate-rotate-in",
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

  const getSpeedClass = () => {
    const speedMap: Record<string, string> = {
      fast: "duration-500",
      normal: "duration-700",
      slow: "duration-1000",
    };
    return speedMap[speed] || "duration-700";
  };

  const getIntensityClass = () => {
    const intensityMap: Record<string, string> = {
      light: "ease-out",
      medium: "ease-in-out",
      strong: "ease-in-cubic", 
    };
    return intensityMap[intensity] || "ease-in-out";
  };

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "transition-all transform",
        getAnimationClass(),
        getDelayClass(),
        getSpeedClass(),
        getIntensityClass(),
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
