
import React from "react";
import { ExternalLink } from "lucide-react";

interface EventRegistrationCTAProps {
  registrationUrl: string;
}

const EventRegistrationCTA = ({ registrationUrl }: EventRegistrationCTAProps) => {
  return (
    <div className="mt-16 p-8 bg-primary/10 rounded-2xl text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        ¿Estás listo para unirte a este evento?
      </h2>
      <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
        No pierdas la oportunidad de formar parte de esta experiencia única. 
        El evento está abierto a todos los interesados.
      </p>
      <a
        href={registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors text-lg font-medium"
      >
        <ExternalLink className="mr-2 h-5 w-5" />
        Registrarse Ahora
      </a>
    </div>
  );
};

export default EventRegistrationCTA;
