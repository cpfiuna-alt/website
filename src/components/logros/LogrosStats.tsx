
import React from "react";
import { Users, Trophy, Briefcase, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import { LOGROS_STATS } from "@/data/stats";

const LogrosStats = () => {
  const statsWithIcons = LOGROS_STATS.map((stat, index) => {
    const iconMap = [
      <Users className="h-10 w-10 text-primary" />,
      <Trophy className="h-10 w-10 text-primary" />,
      <Briefcase className="h-10 w-10 text-primary" />,
      <GraduationCap className="h-10 w-10 text-primary" />,
    ];
    
    return {
      icon: iconMap[index] || <Users className="h-10 w-10 text-primary" />,
      value: stat.value,
      label: stat.label,
      suffix: stat.suffix || "",
    };
  });

  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros números</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsWithIcons.map((stat, index) => (
            <div key={index} className="glass-card-static p-6 flex flex-col items-center text-center">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 flex items-center justify-center">
                {stat.value}<span>{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LogrosStats;
