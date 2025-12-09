
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
    title: "Plataformas de Aprendizaje",
    icon: BookOpen,
    resources: [
      { name: "freeCodeCamp", description: "Cursos gratuitos completos con certificados y proyectos prácticos", url: "https://www.freecodecamp.org/espanol/" },
      { name: "Developer Roadmaps", description: "Roadmaps visuales completos para diferentes carreras tech", url: "https://roadmap.sh/" },
      { name: "Khan Academy", description: "Cursos gratuitos de programación, ciencias de la computación y matemáticas", url: "https://www.khanacademy.org/computing" }
    ]
  },
  {
    title: "Competitive Programming",
    icon: Terminal,
    resources: [
      { name: "LeetCode", description: "Práctica gratuita de algoritmos y preparación para entrevistas", url: "https://leetcode.com/" },
      { name: "Codeforces", description: "Plataforma líder para contests con rating system y editorials", url: "https://codeforces.com/" },
      { name: "Advent of Code", description: "Evento anual de programación con puzzles diarios en diciembre", url: "https://adventofcode.com/" }
    ]
  },
  {
    title: "Herramientas de Desarrollo",
    icon: Code,
    resources: [
      { name: "Visual Studio Code", description: "Editor líder con extensiones, debugging y Git integrado", url: "https://code.visualstudio.com/" },
      { name: "GitHub", description: "Plataforma para alojar código y colaborar en proyectos", url: "https://github.com/" },
      { name: "Vercel", description: "Plataforma gratuita para deployment de aplicaciones web", url: "https://vercel.com/" }
    ]
  },
  {
    title: "Ofertas para Estudiantes",
    icon: Github,
    resources: [
      { name: "GitHub Student Developer Pack", description: "Recursos premium gratuitos para estudiantes desarrolladores", url: "https://education.github.com/pack" },
      { name: "MDN Web Docs", description: "Documentación definitiva para tecnologías web y JavaScript", url: "https://developer.mozilla.org/es/" },
      { name: "Stack Overflow", description: "Comunidad de programadores para resolver dudas técnicas", url: "https://stackoverflow.com/" }
    ]
  },
  {
    title: "Cursos Universitarios Gratuitos",
    icon: Video,
    resources: [
      { name: "Harvard CS50", description: "Curso introductorio legendario de ciencias de la computación", url: "https://cs50.harvard.edu/x/" },
      { name: "MIT OpenCourseWare", description: "Cursos completos del MIT con materiales y assignments", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/" },
      { name: "Full Stack Open", description: "Bootcamp gratuito de Universidad de Helsinki sobre React/Node.js", url: "https://fullstackopen.com/en/" }
    ]
  },
  {
    title: "Práctica y Proyectos",
    icon: Coffee,
    resources: [
      { name: "Exercism", description: "Plataforma gratuita para practicar programación con mentoring", url: "https://exercism.org/" },
      { name: "Project Euler", description: "Desafíos matemáticos que requieren programación para resolver", url: "https://projecteuler.net/" },
      { name: "HackerEarth", description: "Plataforma gratuita con challenges y hackathons", url: "https://www.hackerearth.com/" }
    ]
  }
];

const ExternalResources = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Recursos <span className="gradient-text">Externos</span> Recomendados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resourceCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass-card-static p-6 transition-all duration-300"
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
