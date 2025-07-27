
import React from "react";
import { Github, User } from "lucide-react";

const ProjectsCallToAction = () => {
  return (
    <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Tienes una idea de proyecto?</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            ¿Quieres contribuir a alguno de nuestros proyectos o proponer uno nuevo?
            ¡Nos encantaría colaborar contigo!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://github.com/cpfiuna"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue"
            >
              <User className="mr-2 h-5 w-5" />
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCallToAction;
