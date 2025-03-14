
import MatrixRain from "@/components/ui/MatrixRain";

const HeroBackground = () => {
  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-black/80 z-0"></div>
      
      {/* Geometric shapes in background */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl z-0 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl z-0" style={{ animationDelay: "1s" }}></div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-slow">
        <div className="w-0.5 h-10 bg-primary rounded-full mx-auto"></div>
      </div>
    </>
  );
};

export default HeroBackground;
