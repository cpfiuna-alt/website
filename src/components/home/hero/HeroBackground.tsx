
import MatrixRain from "@/components/ui/MatrixRain";

const HeroBackground = () => {
  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Background gradient with smooth transitions */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0 transition-all duration-500 ease-in-out"></div>
      
      {/* Geometric shapes in background with smooth transitions */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl z-0 animate-float transition-all duration-500 ease-in-out"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl z-0 transition-all duration-500 ease-in-out" style={{ animationDelay: "1s" }}></div>
    </>
  );
};

export default HeroBackground;
