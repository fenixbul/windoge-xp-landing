'use client'
import { useRef, useCallback } from 'react';

export const useStartupSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/windows-xp-startup.mp3');
      audioRef.current.preload = 'auto';
      // Start muted to allow autoplay
      audioRef.current.muted = true;
    }
    return audioRef.current;
  }, []);

  // Play startup sound (requires user interaction)
  const playStartupSound = useCallback(() => {
    try {
      const audio = initAudio();
      
      // Unmute and play
      audio.muted = false;
      audio.currentTime = 0; // Reset to beginning
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Audio play failed:', error);
          // Fallback: try muted playback
          audio.muted = true;
          audio.play().catch(() => {
            console.log('Muted audio play also failed');
          });
        });
      }
    } catch (error) {
      console.error('Startup sound error:', error);
    }
  }, [initAudio]);

  // Stop sound if needed
  const stopStartupSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return {
    playStartupSound,
    stopStartupSound,
    initAudio,
  };
};
