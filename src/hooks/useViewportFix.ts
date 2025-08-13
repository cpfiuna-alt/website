
import { useEffect } from 'react';

export function useViewportFix() {
  useEffect(() => {
    // Fix for mobile viewport height issues (100vh problem)
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set on initial load
    setVh();

    // Update on resize
    window.addEventListener('resize', setVh);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);
}
