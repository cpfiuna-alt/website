
import React from "react";
import { Link } from "react-router-dom";
import { Logro } from "@/types/logros";
import { Award, Calendar, MapPin, Users, ExternalLink, Trophy, Medal, Star, ArrowRight } from "lucide-react";

interface LogroCardProps {
  logro: Logro;
}

const LogroCard = ({ logro }: LogroCardProps) => {
  // Determine the icon based on premio (award) type
  const renderIcon = () => {
    const premioLower = logro.premio.toLowerCase();
    if (premioLower.includes("primer") || premioLower.includes("gold") || premioLower.includes("oro")) {
      return <Trophy className="h-8 w-8 text-amber-500" />;
    } else if (premioLower.includes("segundo") || premioLower.includes("silver") || premioLower.includes("plata")) {
      return <Medal className="h-8 w-8 text-slate-400" />;
    } else if (premioLower.includes("tercer") || premioLower.includes("bronze") || premioLower.includes("bronce")) {
      return <Medal className="h-8 w-8 text-amber-700" />;
    } else if (premioLower.includes("mencióon") || premioLower.includes("honor")) {
      return <Star className="h-8 w-8 text-amber-400" />;
    } else {
      return <Award className="h-8 w-8 text-primary" />;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="glass-card hover:shadow-neon-blue transition-all relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-10 scale-150 transform rotate-12 group-hover:rotate-6 transition-transform">
        {renderIcon()}
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {renderIcon()}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(logro.fecha)}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{logro.titulo}</h3>
        <p className="text-muted-foreground mb-4">{logro.descripcion}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-2 text-primary" />
            <span className="font-medium">{logro.premio}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{logro.lugar || "Virtual"}</span>
          </div>
          
          {logro.equipo && logro.equipo.length > 0 && (
            <div className="flex items-start">
              <Users className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <div>
                <span className="text-muted-foreground block mb-1">Equipo:</span>
                <div className="flex flex-wrap gap-1">
                  {logro.equipo.map((miembro, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-2 py-1 bg-muted/50 rounded-full"
                    >
                      {miembro}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {logro.url && (
          <a 
            href={logro.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            Ver más
            <ArrowRight className="ml-1 h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
};

export default LogroCard;
