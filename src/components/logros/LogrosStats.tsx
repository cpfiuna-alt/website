
import React from "react";
import { Users, Trophy, Briefcase, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import AnimatedCounter from "@/components/home/AnimatedCounter";

const LogrosStats = () => {
  const stats = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      value: 145,
      label: "Miembros activos",
      suffix: ""
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      value: 25,
      label: "Premios recibidos",
      suffix: "+"
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      value: 30,
      label: "Proyectos realizados",
      suffix: "+"
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      value: 12,
      label: "Competencias",
      suffix: ""
    }
  ];

  return (
    <section className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros números</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-6 flex flex-col items-center text-center">
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
