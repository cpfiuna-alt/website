import React from "react";
import { Link } from "react-router-dom";
import { featureFlags } from "@/config/site";

interface ResourcesCallToActionProps {
  onOpenUploadModal?: () => void;
}

const ResourcesCallToAction = ({ onOpenUploadModal }: ResourcesCallToActionProps) => {
  // Use admission form if enabled, otherwise fall back to contact
  const joinClubLink = featureFlags.admissionForm.enabled ? "/admision" : "/contacto";
  const joinClubText = featureFlags.admissionForm.enabled ? "Unite al club" : "Contactá con el club";

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
          {/* CURRENT: Disabled upload button */}
          <div className="relative group">
            <button
              disabled
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-muted text-muted-foreground font-medium cursor-not-allowed opacity-60"
            >
              Subir un recurso
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              No disponible
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
            </div>
          </div>

          {/* ORIGINAL: Functional upload button - Uncomment when ready to enable upload functionality
          <button
            onClick={onOpenUploadModal}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            Subir un recurso
          </button>
          */}
          <Link
            to={joinClubLink}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue"
          >
            {joinClubText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesCallToAction;
