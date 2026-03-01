
import React from "react";

const AboutHero = () => {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Sobre <span className="gradient-text">Nosotros</span>
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Somos una comunidad de estudiantes apasionados por la programación 
            y el desarrollo de software en la Facultad de Ingeniería de la Universidad Nacional de Asunción.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
