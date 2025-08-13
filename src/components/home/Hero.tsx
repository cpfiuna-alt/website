import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroBackground from "./hero/HeroBackground";
import HeroTitle from "./hero/HeroTitle";
import HeroSubtitle from "./hero/HeroSubtitle";
import HeroActions from "./hero/HeroActions";
import HeroFeatureIcons from "./hero/HeroFeatureIcons";

const Hero = () => {
  const isMobile = useIsMobile();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 20);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-6 md:space-y-8 transition-opacity duration-500" style={{opacity: ready ? 1 : 0}}>
          <HeroTitle />
          <HeroSubtitle />
          <HeroActions />
        </div>
        <div className="transition-opacity duration-700 delay-150" style={{opacity: ready ? 1 : 0}}>
          <HeroFeatureIcons />
        </div>
      </div>
    </div>
  );
};

export default Hero;
