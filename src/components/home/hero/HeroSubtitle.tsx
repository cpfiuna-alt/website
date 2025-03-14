
import { useRef, useEffect } from "react";

interface HeroSubtitleProps {
  onMount?: () => void;
}

const HeroSubtitle = ({ onMount }: HeroSubtitleProps) => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const subtitle = subtitleRef.current;
    if (subtitle) {
      subtitle.classList.add("fadeIn");
      if (onMount) onMount();
    }
  }, [onMount]);

  return (
    <p 
      ref={subtitleRef}
      className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto opacity-0"
    >
      Por amor al código y la innovación
    </p>
  );
};

export default HeroSubtitle;
