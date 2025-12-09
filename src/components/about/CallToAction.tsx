
import React from "react";
import { featureFlags } from "@/config/site";

const CallToAction = () => {
  // Use admission form if enabled, otherwise fall back to contact
  const joinClubLink = featureFlags.admissionForm.enabled ? "/admision" : "/contacto";
  
  return (
    <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">
          Sé parte de nuestra <span className="gradient-text">historia</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Unite al Club de Programación FIUNA y contribuí a formar la próxima generación 
          de desarrolladores e innovadores tecnológicos en Paraguay.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={joinClubLink}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            Unite al club
          </a>
          <a
            href="/proyectos"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue"
          >
            Ver nuestros proyectos
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
