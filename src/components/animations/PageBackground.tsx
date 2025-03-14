
import React from 'react';
import { cn } from '@/lib/utils';
import FluidAnimation from './FluidAnimation';
import ImmersiveAnimation from './ImmersiveAnimation';

type BackgroundType = 'fluid' | 'immersive-grid' | 'immersive-dots' | 'immersive-waves' | 'immersive-particles';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'rainbow';

interface PageBackgroundProps {
  type?: BackgroundType;
  colorScheme?: ColorScheme;
  intensity?: 'subtle' | 'normal' | 'intense';
  className?: string;
  fadeIn?: boolean;
}

const PageBackground: React.FC<PageBackgroundProps> = ({
  type = 'fluid',
  colorScheme = 'blue',
  intensity = 'normal',
  className,
  fadeIn = true,
}) => {
  // Map colorScheme to ImmersiveAnimation format
  const getImmersiveColorScheme = (): 'blue' | 'purple' | 'rainbow' | 'green' => {
    switch (colorScheme) {
      case 'purple': return 'purple';
      case 'green': return 'green';
      case 'rainbow': return 'rainbow';
      case 'blue':
      case 'orange': // Fall back to blue for orange in immersive
      default: return 'blue';
    }
  };

  // Map intensity to ImmersiveAnimation format
  const getImmersiveIntensity = (): 'subtle' | 'normal' | 'deep' => {
    switch (intensity) {
      case 'subtle': return 'subtle';
      case 'intense': return 'deep';
      case 'normal':
      default: return 'normal';
    }
  };

  // Map type to ImmersiveAnimation type
  const getImmersiveType = (): 'grid' | 'dots' | 'waves' | 'particles' => {
    switch (type) {
      case 'immersive-dots': return 'dots';
      case 'immersive-waves': return 'waves';
      case 'immersive-particles': return 'particles';
      case 'immersive-grid':
      default: return 'grid';
    }
  };

  if (type === 'fluid') {
    return (
      <FluidAnimation
        className={cn("fixed inset-0 -z-10", className)}
        colorPalette={colorScheme}
        intensity={intensity}
        particleDensity={intensity === 'subtle' ? 'low' : intensity === 'intense' ? 'high' : 'medium'}
      />
    );
  }

  return (
    <div className={cn("fixed inset-0 -z-10", className)}>
      <ImmersiveAnimation
        type={getImmersiveType()}
        colorScheme={getImmersiveColorScheme()}
        visualDepth={getImmersiveIntensity()}
        className="w-full h-full"
        transitionIn={fadeIn}
      />
    </div>
  );
};

export default PageBackground;
