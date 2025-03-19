
import React from "react";

const EventsCallToAction = () => {
  return (
    <section className="py-16 bg-primary/5 dark:bg-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Quieres proponer un evento?</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Si tienes ideas para talleres, charlas o cualquier evento relacionado con la programación,
            nos encantaría escucharlas.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsCallToAction;
