
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
            <h3 className="text-xl font-bold mb-4">📚 Plataformas de Aprendizaje</h3>
            <ul className="space-y-3">
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
                  <p className="text-sm text-[#94a3b8]">Cursos gratuitos completos con certificados y proyectos prácticos.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.codecademy.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Codecademy
                  </a>
                  <p className="text-sm text-[#94a3b8]">Aprendizaje interactivo hands-on con editor en línea integrado.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.pluralsight.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Pluralsight
                  </a>
                  <p className="text-sm text-[#94a3b8]">Cursos técnicos avanzados con skill assessments y learning paths.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.udemy.com/courses/development/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Udemy Programming
                  </a>
                  <p className="text-sm text-[#94a3b8]">Amplia variedad de cursos prácticos con proyectos del mundo real.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">🏆 Competitive Programming</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://codeforces.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Codeforces
                  </a>
                  <p className="text-sm text-[#94a3b8]">Plataforma líder para contests con rating system y editorials.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://atcoder.jp/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    AtCoder
                  </a>
                  <p className="text-sm text-[#94a3b8]">Contests japoneses de alta calidad con problemas bien estructurados.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://usaco.guide/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    USACO Guide
                  </a>
                  <p className="text-sm text-[#94a3b8]">Guía completa gratuita con roadmap organizado por dificultad.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://leetcode.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    LeetCode
                  </a>
                  <p className="text-sm text-[#94a3b8]">Ideal para preparación de entrevistas técnicas y coding challenges.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">🔧 Herramientas de Desarrollo</h3>
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
                  <p className="text-sm text-[#94a3b8]">Editor líder con extensiones, debugging y Git integrado.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://github.com/features/codespaces" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    GitHub Codespaces
                  </a>
                  <p className="text-sm text-[#94a3b8]">Entorno de desarrollo completo en la nube con VS Code.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.postman.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Postman
                  </a>
                  <p className="text-sm text-[#94a3b8]">Herramienta esencial para testing y desarrollo de APIs.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.docker.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Docker
                  </a>
                  <p className="text-sm text-[#94a3b8]">Containerización para entornos consistentes y deployment.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">📖 Documentación Técnica</h3>
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
                  <p className="text-sm text-[#94a3b8]">Documentación definitiva para tecnologías web y JavaScript.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://devdocs.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    DevDocs
                  </a>
                  <p className="text-sm text-[#94a3b8]">Documentación unificada offline para múltiples tecnologías.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://roadmap.sh/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Developer Roadmaps
                  </a>
                  <p className="text-sm text-[#94a3b8]">Roadmaps visuales completos para diferentes carreras tech.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.geeksforgeeks.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    GeeksforGeeks
                  </a>
                  <p className="text-sm text-[#94a3b8]">Tutoriales completos de algoritmos, estructuras de datos y CS.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">🎓 Cursos Universitarios Gratuitos</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://cs50.harvard.edu/x/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Harvard CS50
                  </a>
                  <p className="text-sm text-[#94a3b8]">Curso introductorio legendario de ciencias de la computación.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    MIT OpenCourseWare
                  </a>
                  <p className="text-sm text-[#94a3b8]">Cursos completos del MIT con materiales y assignments.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.coursera.org/specializations/algorithms" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Stanford Algorithms (Coursera)
                  </a>
                  <p className="text-sm text-[#94a3b8]">Especialización completa en algoritmos por Tim Roughgarden.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.edx.org/course/introduction-computer-science-mitx-6-00-1x-10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    MIT 6.00.1x (edX)
                  </a>
                  <p className="text-sm text-[#94a3b8]">Introducción a CS y programación usando Python del MIT.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">🚀 Bootcamps y Certificaciones</h3>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.theodinproject.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    The Odin Project
                  </a>
                  <p className="text-sm text-[#94a3b8]">Bootcamp gratuito completo de full-stack web development.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://aws.amazon.com/certification/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    AWS Certifications
                  </a>
                  <p className="text-sm text-[#94a3b8]">Certificaciones cloud reconocidas mundialmente por Amazon.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://fullstackopen.com/en/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Full Stack Open
                  </a>
                  <p className="text-sm text-[#94a3b8]">Bootcamp gratuito de Universidad de Helsinki sobre React/Node.js.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://www.oracle.com/certification/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Oracle Certifications
                  </a>
                  <p className="text-sm text-[#94a3b8]">Certificaciones Java, bases de datos y tecnologías enterprise.</p>
                </div>
              </li>
            </ul>
          </div>
        </Card>
        
        <Card className="glass-card overflow-hidden h-full">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">🌐 Comunidades y Networking</h3>
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
                  <p className="text-sm text-[#94a3b8]">Plataforma esencial para portfolio, colaboración y open source.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://stackoverflow.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    Stack Overflow
                  </a>
                  <p className="text-sm text-[#94a3b8]">Comunidad global para resolver dudas de programación.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://discord.gg/TheOdinProject" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    The Odin Project Discord
                  </a>
                  <p className="text-sm text-[#94a3b8]">Comunidad activa para desarrolladores web en formación.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <ExternalLink className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <div>
                  <a 
                    href="https://dev.to/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    DEV Community
                  </a>
                  <p className="text-sm text-[#94a3b8]">Plataforma de blogs y networking para desarrolladores.</p>
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
