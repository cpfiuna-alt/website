import { useRef, useEffect } from "react";

interface HeroTitleProps {
  onMount?: () => void;
}

const HeroTitle = ({ onMount }: HeroTitleProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (title) {
      title.classList.add("fadeIn");
      if (onMount) onMount();
    }
  }, [onMount]);

  return (
    <h1 
      ref={titleRef}
      className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight opacity-0 will-change-transform leading-tight mb-2"
    >
      <span className="block">Club de Programación</span>
      <span className="gradient-text">FIUNA</span>
    </h1>
  );
};

export default HeroTitle;
