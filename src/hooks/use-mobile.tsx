
import * as React from "react"

// Define breakpoints for different device sizes
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
};

// Hook to check if current viewport is mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.tablet);
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return !!isMobile;
}

// Hook to check if current viewport is tablet or smaller
export function useIsTabletOrSmaller() {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkSize = () => {
      setIsTabletOrSmaller(window.innerWidth < BREAKPOINTS.laptop);
    };
    
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return !!isTabletOrSmaller;
}

// Hook to get current device type
export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'laptop' | 'desktop'>('desktop');

  React.useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.mobile) {
        setDeviceType('mobile');
      } else if (width < BREAKPOINTS.tablet) {
        setDeviceType('mobile');
      } else if (width < BREAKPOINTS.laptop) {
        setDeviceType('tablet');
      } else if (width < BREAKPOINTS.desktop) {
        setDeviceType('laptop');
      } else {
        setDeviceType('desktop');
      }
    };
    
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    
    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  return deviceType;
}
