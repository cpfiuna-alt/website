
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface HeroActionsProps {
  onMount?: () => void;
}

const HeroActions = ({ onMount }: HeroActionsProps) => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (cta) {
      cta.classList.add("fadeIn");
      if (onMount) onMount();
    }
  }, [onMount]);

  return (
    <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
      <Link
        to="/nosotros"
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
      >
        Conocer más
      </Link>
      <Link
        to="/contacto"
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue group"
      >
        Únete al club
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default HeroActions;
