
import React from "react";

const ResourcesHero = () => {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="gradient-text">Recursos</span> para Programadores
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Aprende con los recursos creados por nuestra comunidad o explora nuestra colección
            de herramientas, tutoriales y materiales recomendados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;
