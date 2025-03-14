
import React from "react";
import { BookOpen, Code, Coffee, Github, Terminal, Video, ExternalLink } from "lucide-react";

interface ResourceItem {
  name: string;
  description: string;
  url: string;
}

interface ResourceCategory {
  title: string;
  icon: React.ElementType;
  resources: ResourceItem[];
}

const resourceCategories: ResourceCategory[] = [
  {
    title: "Tutoriales y Documentación",
    icon: BookOpen,
    resources: [
      { name: "MDN Web Docs", description: "Documentación completa para desarrollo web", url: "https://developer.mozilla.org" },
      { name: "React Documentation", description: "Guías oficiales y API de React", url: "https://reactjs.org/docs" },
      { name: "TypeScript Handbook", description: "Documentación oficial de TypeScript", url: "https://www.typescriptlang.org/docs/" }
    ]
  },
  {
    title: "Herramientas y Editores",
    icon: Terminal,
    resources: [
      { name: "VS Code", description: "Editor de código gratuito y potente", url: "https://code.visualstudio.com/" },
      { name: "Git", description: "Sistema de control de versiones", url: "https://git-scm.com/" },
      { name: "Node.js", description: "Entorno de ejecución para JavaScript", url: "https://nodejs.org/" }
    ]
  },
  {
    title: "Bibliotecas y Frameworks",
    icon: Code,
    resources: [
      { name: "Next.js", description: "Framework React para producción", url: "https://nextjs.org/" },
      { name: "Tailwind CSS", description: "Framework CSS utility-first", url: "https://tailwindcss.com/" },
      { name: "React Query", description: "Biblioteca para gestionar datos en React", url: "https://tanstack.com/query/latest/" }
    ]
  },
  {
    title: "Comunidad y Código Abierto",
    icon: Github,
    resources: [
      { name: "GitHub Student Pack", description: "Recursos gratuitos para estudiantes", url: "https://education.github.com/pack" },
      { name: "Open Source Guides", description: "Guías para contribuir a código abierto", url: "https://opensource.guide/" },
      { name: "DEV Community", description: "Comunidad de desarrolladores", url: "https://dev.to/" }
    ]
  },
  {
    title: "Videos y Cursos",
    icon: Video,
    resources: [
      { name: "freeCodeCamp", description: "Cursos gratuitos de programación", url: "https://www.freecodecamp.org/" },
      { name: "The Odin Project", description: "Currículo completo para desarrollo web", url: "https://www.theodinproject.com/" },
      { name: "Scrimba", description: "Cursos interactivos de programación", url: "https://scrimba.com/" }
    ]
  },
  {
    title: "Eventos y Conferencias",
    icon: Coffee,
    resources: [
      { name: "GitHub Universe", description: "Conferencia anual de GitHub", url: "https://githubuniverse.com/" },
      { name: "React Conf", description: "Conferencia oficial de React", url: "https://conf.reactjs.org/" },
      { name: "Google I/O", description: "Conferencia anual de Google para desarrolladores", url: "https://io.google/" }
    ]
  }
];

const ExternalResources = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Recursos <span className="gradient-text">Externos</span> Recomendados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass-card p-6 transition-all duration-300 hover:shadow-neon-blue"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {React.createElement(category.icon, { className: "h-5 w-5" })}
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              
              <ul className="space-y-4">
                {category.resources.map((resource, idx) => (
                  <li key={idx} className="border-b border-muted pb-3 last:border-0 last:pb-0">
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-base group-hover:text-primary transition-colors">
                          {resource.name}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {resource.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExternalResources;
