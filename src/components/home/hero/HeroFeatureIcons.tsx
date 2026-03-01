
import { useRef, useEffect } from "react";
import { Code, Users, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroFeatureIconsProps {
  onMount?: () => void;
}

const HeroFeatureIcons = ({ onMount }: HeroFeatureIconsProps) => {
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icons = iconsRef.current;
    if (icons) {
      icons.classList.add("fadeIn");
      if (onMount) onMount();
    }
  }, [onMount]);

  const features = [
    {
      icon: <Code className="h-6 w-6 md:h-8 md:w-8 text-primary mb-2 md:mb-4 animate-pulse-slow" />,
      title: "Proyectos",
      description: "Código abierto y colaborativo",
      link: "/proyectos",
      delay: 0
    },
    {
      icon: <Users className="h-6 w-6 md:h-8 md:w-8 text-primary mb-2 md:mb-4 animate-pulse-slow" style={{ animationDelay: "0.5s" }} />,
      title: "Comunidad",
      description: "Aprendizaje compartido",
      link: "/comunidad",
      delay: 0
    },
    {
      icon: <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary mb-2 md:mb-4 animate-pulse-slow" style={{ animationDelay: "1s" }} />,
      title: "Eventos",
      description: "Hackathons y workshops",
      link: "/eventos",
      delay: 0
    },
    {
      icon: <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary mb-2 md:mb-4 animate-pulse-slow" style={{ animationDelay: "1.5s" }} />,
      title: "Recursos",
      description: "Tutoriales y herramientas",
      link: "/recursos",
      delay: 0
    }
  ];

  return (
    <div 
      ref={iconsRef}
      className="mt-12 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 opacity-0"
    >
      {features.map((feature, index) => (
        <Link 
          key={index}
          to={feature.link}
          className="glass-card p-4 md:p-6 text-center hover:scale-105 transition-transform hover:shadow-neon-blue" 
          style={{ transitionDelay: `${feature.delay}s` }}
        >
          <div className="flex justify-center">
            {feature.icon}
          </div>
          <h3 className="font-semibold text-sm md:text-base">{feature.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
            {feature.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default HeroFeatureIcons;
