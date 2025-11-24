import React from "react";

const AdmissionHero = () => {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Únete al{" "}
            <span className="gradient-text">
              Club de Programación FIUNA
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Forma parte de una comunidad apasionada por la tecnología, 
            el desarrollo de software y la innovación. Completa tu solicitud 
            de admisión y comienza tu viaje con nosotros.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Proceso 100% digital</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Respuesta en 48-72 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Comunidad inclusiva</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionHero;
