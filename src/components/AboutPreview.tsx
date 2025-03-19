
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AboutPreview: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                El <span className="text-gradient">Club de Programación</span> de la Facultad de Ingeniería UNA
              </h2>
              <p className="text-[#94a3b8] mb-6">
                Fundado en 2015, el Club de Programación FIUNA es una organización estudiantil
                dedicada a promover la cultura de programación y tecnología dentro
                de la Facultad de Ingeniería de la Universidad Nacional de
                Asunción.
              </p>
              <p className="text-[#94a3b8] mb-8">
                Nuestra misión es complementar la formación académica mediante
                actividades prácticas, proyectos reales y eventos que permitan
                a los estudiantes desarrollar habilidades técnicas y blandas
                fundamentales para el mundo profesional.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center bg-secondary text-secondary-foreground font-medium py-3 px-6 rounded-lg transition-all hover:bg-secondary/80"
              >
                Conoce más sobre nosotros
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070" 
                  alt="Estudiantes programando juntos" 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
