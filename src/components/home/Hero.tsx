
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HeroBackground from "./hero/HeroBackground";
import HeroTitle from "./hero/HeroTitle";
import HeroSubtitle from "./hero/HeroSubtitle";
import HeroActions from "./hero/HeroActions";
import HeroFeatureIcons from "./hero/HeroFeatureIcons";

const Hero = () => {
  const isMobile = useIsMobile();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center space-y-6 md:space-y-8">
          <HeroTitle 
            onMount={() => setTimeout(() => setShowSubtitle(true), 200)}
          />
          
          {showSubtitle && (
            <HeroSubtitle 
              onMount={() => setTimeout(() => setShowActions(true), 200)}
            />
          )}
          
          {showActions && (
            <HeroActions 
              onMount={() => setTimeout(() => setShowIcons(true), 200)}
            />
          )}
        </div>
        
        {showIcons && <HeroFeatureIcons />}
      </div>
    </div>
  );
};

export default Hero;
