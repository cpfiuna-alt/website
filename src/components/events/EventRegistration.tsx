
import React from "react";
import { ExternalLink } from "lucide-react";

interface EventRegistrationProps {
  isUpcoming: boolean;
  registrationLink: string;
}

const EventRegistration = ({ isUpcoming, registrationLink }: EventRegistrationProps) => {
  if (!isUpcoming) return null;
  
  return (
    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 mb-12">
      <h2 className="text-2xl font-bold mb-4">¿Te interesa este evento?</h2>
      <p className="text-muted-foreground mb-6">
        Regístrate ahora para asegurar tu lugar. Los espacios son limitados y 
        se asignan por orden de inscripción.
      </p>
      <a
        href={registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
      >
        Registrarme
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

export default EventRegistration;
