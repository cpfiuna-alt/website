
import React from "react";
import { Link } from "react-router-dom";

interface ResourcesCallToActionProps {
  onOpenUploadModal: () => void;
}

const ResourcesCallToAction = ({ onOpenUploadModal }: ResourcesCallToActionProps) => {
  return (
    <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">
          ¿Falta algún recurso <span className="gradient-text">importante</span>?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Si conoces algún recurso valioso que debería estar en esta lista, 
          háznoslo saber para que podamos compartirlo con toda la comunidad.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenUploadModal}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            Subir un recurso
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue"
          >
            Sugerir un recurso
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesCallToAction;
