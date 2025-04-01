
import React from "react";

const AboutHero = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent dark:from-background dark:to-black/40 z-0"></div>
      
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl z-0 opacity-70"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Sobre <span className="gradient-text">Nosotros</span>
        </h1>
        
        <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
          Somos una comunidad de estudiantes y profesionales apasionados por la programación 
          y el desarrollo de software en la Facultad de Ingeniería de la Universidad Nacional de Asunción.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
