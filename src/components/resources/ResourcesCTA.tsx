
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { featureFlags } from "@/config/site";

const ResourcesCTA: React.FC = () => {
  // Use admission form if enabled, otherwise fall back to contact
  const joinClubLink = featureFlags.admissionForm.enabled ? "/admision" : "/contacto";
  const ctaText = featureFlags.admissionForm.enabled ? "Unite al club" : "Compartir Recursos";

  return (
    <div className="glass-card p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">¿Quieres contribuir con recursos?</h2>
      <p className="text-[#94a3b8] mb-8 max-w-2xl mx-auto">
        Si tienes tutoriales, artículos, videos u otros recursos educativos que quieras compartir con la comunidad,
        ¡contáctanos!
      </p>
      <Link to={joinClubLink}>
        <Button size="lg">
          {ctaText} <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default ResourcesCTA;
