
import { useState, useEffect, useCallback } from 'react';

type SoundEffect = 'hover' | 'click' | 'success' | 'error' | 'notification';

interface SoundOptions {
  volume?: number;
  enabled?: boolean;
}

const soundPaths: Record<SoundEffect, string> = {
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  notification: '/sounds/notification.mp3',
};

export function useSoundEffects(defaultOptions: SoundOptions = {}) {
  const [sounds, setSounds] = useState<Record<SoundEffect, HTMLAudioElement | null>>({
    hover: null,
    click: null,
    success: null,
    error: null,
    notification: null,
  });
  
  const [options, setOptions] = useState<SoundOptions>({
    volume: 0.2,
    enabled: true,
    ...defaultOptions,
  });

  // Preload sounds
  useEffect(() => {
    const loadedSounds: Record<SoundEffect, HTMLAudioElement> = {} as Record<SoundEffect, HTMLAudioElement>;
    
    Object.entries(soundPaths).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = options.volume || 0.2;
      audio.preload = 'auto';
      loadedSounds[key as SoundEffect] = audio;
    });
    
    setSounds(loadedSounds);
    
    return () => {
      // Clean up
      Object.values(loadedSounds).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);
  
  // Update volume when options change
  useEffect(() => {
    Object.values(sounds).forEach(audio => {
      if (audio) {
        audio.volume = options.volume || 0.2;
      }
    });
  }, [options.volume, sounds]);
  
  const play = useCallback((effect: SoundEffect) => {
    if (!options.enabled) return;
    
    const sound = sounds[effect];
    if (sound) {
      // Reset the audio to start
      sound.currentTime = 0;
      sound.play().catch(err => {
        // Silent catch for browsers that block autoplay
        console.log('Sound play blocked:', err);
      });
    }
  }, [sounds, options.enabled]);
  
  const setVolume = useCallback((volume: number) => {
    setOptions(prev => ({ ...prev, volume }));
  }, []);
  
  const toggleEnabled = useCallback(() => {
    setOptions(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);
  
  return {
    play,
    setVolume,
    toggleEnabled,
    enabled: options.enabled,
    volume: options.volume,
  };
}

export default useSoundEffects;
