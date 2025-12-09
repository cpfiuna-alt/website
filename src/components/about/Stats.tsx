
import { Award, Code, Users, Calendar, Star, Briefcase } from "lucide-react";
import AnimatedCounter from "../home/AnimatedCounter";
import { ABOUT_STATS } from "@/data/stats";

const Stats = () => {
  const statsWithIcons = ABOUT_STATS.map((stat, index) => {
    const iconMap = [
      <Code className="h-10 w-10 text-primary" />,
      <Users className="h-10 w-10 text-primary" />,
      <Calendar className="h-10 w-10 text-primary" />,
      <Award className="h-10 w-10 text-primary" />,
      <Star className="h-10 w-10 text-primary" />,
      <Briefcase className="h-10 w-10 text-primary" />,
    ];
    
    return {
      value: stat.value,
      label: stat.label,
      icon: iconMap[index] || <Code className="h-10 w-10 text-primary" />,
    };
  });

  return (
    <section className="py-16 px-6 bg-#030509 dark:bg-#030509 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-#030509"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-#030509"></div>
      
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="gradient-text">&lt;/cpf&gt;</span> en números
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statsWithIcons.map((stat, index) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.value}
              label={stat.label}
              icon={stat.icon}
              duration={2000 + (index * 200)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
