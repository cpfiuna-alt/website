
import { Disc } from "lucide-react";
import { SiYoutube, SiInstagram, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { contactInfo } from "@/config/site";

const SocialMedia = () => {
  return (
    <section className="py-20 section-padding relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Conectate con <span className="gradient-text">Nosotros</span>
          </h2>
          <p className="text-muted-foreground">
            Seguinos en nuestras redes sociales para estar al día con nuestras actividades, 
            eventos y recursos educativos.
          </p>
        </div>

        {/* Featured YouTube Videos */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <SiYoutube className="mr-2 text-red-500" /> YouTube
            </h3>
            <a 
              href={contactInfo.socials.youtube} 
              target="_blank" 
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Ver todos
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-card-static overflow-hidden hover:shadow-neon-blue group transition-all duration-300">
                <div className="aspect-video bg-muted/20 dark:bg-black/30 flex items-center justify-center relative overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <SiYoutube className="h-12 w-12 text-red-500" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1 line-clamp-2">Tutorial: Introducción a React {item}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    Aprende los conceptos básicos de React y cómo crear tu primera aplicación.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <SiInstagram className="mr-2 text-pink-500" /> Instagram
            </h3>
            <a 
              href={contactInfo.socials.instagram} 
              target="_blank" 
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Seguirnos
            </a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <a 
                key={item}
                href={contactInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="aspect-square bg-muted/20 dark:bg-black/30 rounded-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <img 
                  src="/placeholder.svg" 
                  alt={`Instagram post ${item}`}
                  className="w-full h-full object-cover" 
                />
              </a>
            ))}
          </div>
        </div>

        {/* Twitter Feed */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <SiX className="mr-2 text-white" /> X
            </h3>
            <a 
              href={contactInfo.socials.twitter} 
              target="_blank" 
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Seguirnos
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-card-static p-4 hover:shadow-neon-blue transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-muted/20 flex-shrink-0 overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Club de Programación FIUNA</p>
                    <p className="text-sm text-muted-foreground">@cpfiuna</p>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  ¡No te pierdas nuestro próximo hackathon! Este fin de semana estaremos desarrollando 
                  soluciones para problemas de la comunidad. Inscripciones abiertas.
                  <span className="text-primary"> #CPFHackathon #{item}</span>
                </p>
                <p className="text-xs text-muted-foreground">hace {item} día{item !== 1 ? 's' : ''}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/comunidad"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            Ver más en nuestra comunidad
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
