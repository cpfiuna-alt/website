
import React from "react";
import { featureFlags } from "@/config/site";

const EventsCallToAction = () => {
  // Use admission form if enabled, otherwise fall back to contact
  const joinClubLink = featureFlags.admissionForm.enabled ? "/admision" : "/contacto";
  const joinClubText = featureFlags.admissionForm.enabled ? "Unite al club" : "Contáctanos";

  return (
    <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Quieres proponer un evento?</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Si tienes ideas para talleres, charlas o cualquier evento relacionado con la programación,
            nos encantaría escucharlas.
          </p>
          <a
            href={joinClubLink}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            {joinClubText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsCallToAction;
