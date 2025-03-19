
import React from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const ExternalResourcesSection: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Recursos Externos Recomendados</h2>
        <p className="text-[#94a3b8] mb-8">
          Selección de recursos online de calidad recomendados por el Club de Programación FIUNA.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Tutoriales y Documentación</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://developer.mozilla.org/es/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    MDN Web Docs
                  </a>
                  <p className="text-sm text-[#94a3b8]">Documentación completa sobre tecnologías web.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.freecodecamp.org/espanol/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    freeCodeCamp
                  </a>
                  <p className="text-sm text-[#94a3b8]">Cursos gratuitos de programación con certificados.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://docs.python.org/es/3/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Documentación Python
                  </a>
                  <p className="text-sm text-[#94a3b8]">Documentación oficial de Python en español.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Herramientas y Editores</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://code.visualstudio.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Visual Studio Code
                  </a>
                  <p className="text-sm text-[#94a3b8]">Editor de código gratuito y potente.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://replit.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Replit
                  </a>
                  <p className="text-sm text-[#94a3b8]">Entorno de desarrollo online para múltiples lenguajes.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.figma.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Figma
                  </a>
                  <p className="text-sm text-[#94a3b8]">Herramienta de diseño de interfaces colaborativa.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Bibliotecas y Frameworks</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://es.reactjs.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    React
                  </a>
                  <p className="text-sm text-[#94a3b8]">Biblioteca JavaScript para construir interfaces de usuario.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.djangoproject.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Django
                  </a>
                  <p className="text-sm text-[#94a3b8]">Framework web Python de alto nivel.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://tailwindcss.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Tailwind CSS
                  </a>
                  <p className="text-sm text-[#94a3b8]">Framework CSS de utilidades para desarrollo rápido.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Eventos y Conferencias</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.icpc.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    ICPC
                  </a>
                  <p className="text-sm text-[#94a3b8]">Competencia Internacional de Programación Universitaria.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://hacktoberfest.digitalocean.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Hacktoberfest
                  </a>
                  <p className="text-sm text-[#94a3b8]">Evento anual para fomentar contribuciones al código abierto.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://devfest.withgoogle.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    DevFest
                  </a>
                  <p className="text-sm text-[#94a3b8]">Serie de eventos tecnológicos organizados por comunidades de Google.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Videos y Cursos</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.coursera.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Coursera
                  </a>
                  <p className="text-sm text-[#94a3b8]">Plataforma con cursos online de universidades prestigiosas.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.edx.org/es" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    edX
                  </a>
                  <p className="text-sm text-[#94a3b8]">Cursos gratuitos y de pago de instituciones educativas.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.youtube.com/c/MitoCode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    MitoCode (YouTube)
                  </a>
                  <p className="text-sm text-[#94a3b8]">Canal de tutoriales sobre programación en español.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Comunidad y Código Abierto</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://github.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                  <p className="text-sm text-[#94a3b8]">Plataforma para alojar proyectos utilizando Git.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://stackoverflow.com/questions/tagged/spanish" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Stack Overflow en Español
                  </a>
                  <p className="text-sm text-[#94a3b8]">Comunidad de preguntas y respuestas para programadores.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.reddit.com/r/programacion/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    r/programacion
                  </a>
                  <p className="text-sm text-[#94a3b8]">Subreddit en español sobre programación.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExternalResourcesSection;
