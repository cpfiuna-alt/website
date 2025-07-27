
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
      { name: "Codecademy", description: "Aprendizaje interactivo hands-on con editor en línea integrado", url: "https://www.codecademy.com/" },
      { name: "Pluralsight", description: "Cursos técnicos avanzados con skill assessments y learning paths", url: "https://www.pluralsight.com/" },
      { name: "Udemy Programming", description: "Amplia variedad de cursos prácticos con proyectos del mundo real", url: "https://www.udemy.com/courses/development/" },
      { name: "The Odin Project", description: "Bootcamp gratuito completo de full-stack web development", url: "https://www.theodinproject.com/" }
    ]
  },
  {
    title: "Competitive Programming",
    icon: Terminal,
    resources: [
      { name: "Codeforces", description: "Plataforma líder para contests con rating system y editorials", url: "https://codeforces.com/" },
      { name: "AtCoder", description: "Contests japoneses de alta calidad con problemas bien estructurados", url: "https://atcoder.jp/" },
      { name: "USACO Guide", description: "Guía completa gratuita con roadmap organizado por dificultad", url: "https://usaco.guide/" },
      { name: "LeetCode", description: "Ideal para preparación de entrevistas técnicas y coding challenges", url: "https://leetcode.com/" },
      { name: "HackerRank", description: "Challenges de programación y preparación para entrevistas", url: "https://www.hackerrank.com/" }
    ]
  },
  {
    title: "Herramientas de Desarrollo",
    icon: Code,
    resources: [
      { name: "Visual Studio Code", description: "Editor líder con extensiones, debugging y Git integrado", url: "https://code.visualstudio.com/" },
      { name: "GitHub Codespaces", description: "Entorno de desarrollo completo en la nube con VS Code", url: "https://github.com/features/codespaces" },
      { name: "Postman", description: "Herramienta esencial para testing y desarrollo de APIs", url: "https://www.postman.com/" },
      { name: "Docker", description: "Containerización para entornos consistentes y deployment", url: "https://www.docker.com/" },
      { name: "Figma", description: "Herramienta de diseño colaborativo para interfaces y prototipos", url: "https://www.figma.com/" }
    ]
  },
  {
    title: "Documentación Técnica",
    icon: Github,
    resources: [
      { name: "MDN Web Docs", description: "Documentación definitiva para tecnologías web y JavaScript", url: "https://developer.mozilla.org/es/" },
      { name: "DevDocs", description: "Documentación unificada offline para múltiples tecnologías", url: "https://devdocs.io/" },
      { name: "Developer Roadmaps", description: "Roadmaps visuales completos para diferentes carreras tech", url: "https://roadmap.sh/" },
      { name: "GeeksforGeeks", description: "Tutoriales completos de algoritmos, estructuras de datos y CS", url: "https://www.geeksforgeeks.org/" },
      { name: "GitHub Student Pack", description: "Recursos premium gratuitos para estudiantes desarrolladores", url: "https://education.github.com/pack" }
    ]
  },
  {
    title: "Cursos Universitarios Gratuitos",
    icon: Video,
    resources: [
      { name: "Harvard CS50", description: "Curso introductorio legendario de ciencias de la computación", url: "https://cs50.harvard.edu/x/" },
      { name: "MIT OpenCourseWare", description: "Cursos completos del MIT con materiales y assignments", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/" },
      { name: "Stanford Algorithms", description: "Especialización completa en algoritmos por Tim Roughgarden", url: "https://www.coursera.org/specializations/algorithms" },
      { name: "MIT 6.00.1x", description: "Introducción a CS y programación usando Python del MIT", url: "https://www.edx.org/course/introduction-computer-science-mitx-6-00-1x-10" },
      { name: "Full Stack Open", description: "Bootcamp gratuito de Universidad de Helsinki sobre React/Node.js", url: "https://fullstackopen.com/en/" }
    ]
  },
  {
    title: "Certificaciones Profesionales",
    icon: Coffee,
    resources: [
      { name: "AWS Certifications", description: "Certificaciones cloud reconocidas mundialmente por Amazon", url: "https://aws.amazon.com/certification/" },
      { name: "Google Cloud Certifications", description: "Certificaciones en tecnologías cloud de Google", url: "https://cloud.google.com/certification" },
      { name: "Microsoft Azure Certifications", description: "Certificaciones cloud y tecnologías Microsoft", url: "https://docs.microsoft.com/en-us/learn/certifications/" },
      { name: "Oracle Certifications", description: "Certificaciones Java, bases de datos y tecnologías enterprise", url: "https://www.oracle.com/certification/" },
      { name: "GitHub Certifications", description: "Certificaciones oficiales en Git, GitHub y DevOps", url: "https://examregistration.github.com/" }
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
