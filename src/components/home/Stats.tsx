
import React from "react";
import { Award, Code, Users, Calendar, Star, Briefcase } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const Stats = () => {
  const stats = [
    {
      value: 25,
      label: "Proyectos",
      icon: <Code className="h-6 w-6" />,
    },
    {
      value: 150,
      label: "Miembros",
      icon: <Users className="h-6 w-6" />,
    },
    {
      value: 45,
      label: "Eventos",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      value: 12,
      label: "Premios",
      icon: <Award className="h-6 w-6" />,
    },
    {
      value: 300,
      label: "Contribuciones",
      icon: <Star className="h-6 w-6" />,
    },
    {
      value: 15,
      label: "Aliados",
      icon: <Briefcase className="h-6 w-6" />,
    },
  ];

  return (
    <section className="py-16 px-6 bg-muted/40 dark:bg-black/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="gradient-text">CPF</span> en números
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
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
