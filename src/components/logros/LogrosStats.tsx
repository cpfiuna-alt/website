
import React from "react";
import { Users, Trophy, Briefcase, GraduationCap, Calendar } from "lucide-react";
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
      <Calendar className="h-10 w-10 text-primary" />,
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
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="gradient-text">&lt;/cpf&gt;</span> en números
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsWithIcons.map((stat, index) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.value}
              label={stat.label}
              icon={stat.icon}
              duration={1800 + index * 200}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LogrosStats;
