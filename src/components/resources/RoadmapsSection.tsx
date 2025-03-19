
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Code, FileText, Book, Download, ChevronDown } from "lucide-react";

interface RoadmapStep {
  level: string;
  title: string;
  description: string;
  skills: string[];
  resources: {
    title: string;
    link: string;
    type: string;
  }[];
}

interface Roadmap {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  steps: RoadmapStep[];
}

const roadmaps: Roadmap[] = [
  {
    id: "frontend",
    title: "Desarrollo Frontend",
    icon: <Code className="h-6 w-6 text-primary" />,
    description: "Domina las tecnologías para crear interfaces de usuario atractivas y funcionales",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos Web",
        description: "Aprende los bloques básicos de la web moderna",
        skills: ["HTML5", "CSS3", "JavaScript Básico"],
        resources: [
          { title: "Curso HTML y CSS", link: "#", type: "curso" },
          { title: "JavaScript para principiantes", link: "#", type: "tutorial" }
        ]
      },
      {
        level: "Intermedio",
        title: "Frameworks Frontend",
        description: "Domina herramientas modernas de desarrollo",
        skills: ["React", "Vue", "Styling avanzado"],
        resources: [
          { title: "React desde cero", link: "#", type: "curso" },
          { title: "CSS Avanzado y Responsive Design", link: "#", type: "documento" }
        ]
      }
    ]
  },
  {
    id: "backend",
    title: "Desarrollo Backend",
    icon: <FileText className="h-6 w-6 text-primary" />,
    description: "Construye APIs robustas y servicios del lado del servidor",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos de Backend",
        description: "Aprende conceptos básicos de servidores y APIs",
        skills: ["Node.js", "Express", "RESTful APIs"],
        resources: [
          { title: "Introducción a Node.js", link: "#", type: "curso" },
          { title: "Construyendo APIs REST", link: "#", type: "tutorial" }
        ]
      },
      {
        level: "Intermedio",
        title: "Bases de datos y Auth",
        description: "Maneja datos y autenticación",
        skills: ["SQL", "MongoDB", "JWT Auth"],
        resources: [
          { title: "SQL para desarrolladores", link: "#", type: "curso" },
          { title: "Autenticación moderna en aplicaciones web", link: "#", type: "documento" }
        ]
      }
    ]
  },
  {
    id: "competitive",
    title: "Programación Competitiva",
    icon: <Book className="h-6 w-6 text-primary" />,
    description: "Mejora tus habilidades de algoritmos y estructuras de datos para competencias",
    steps: [
      {
        level: "Principiante",
        title: "Algoritmos Básicos",
        description: "Domina los fundamentos algorítmicos",
        skills: ["Algoritmos de búsqueda", "Complejidad computacional", "Estructuras básicas"],
        resources: [
          { title: "Algoritmos para principiantes", link: "#", type: "curso" },
          { title: "Problemas básicos resueltos", link: "#", type: "tutorial" }
        ]
      },
      {
        level: "Intermedio",
        title: "Técnicas avanzadas",
        description: "Aprende algoritmos más complejos",
        skills: ["Programación dinámica", "Grafos", "Geometría computacional"],
        resources: [
          { title: "Programación dinámica en profundidad", link: "#", type: "curso" },
          { title: "Problemas de competencias resueltos", link: "#", type: "documento" }
        ]
      }
    ]
  },
  {
    id: "data-science",
    title: "Ciencia de Datos",
    icon: <Download className="h-6 w-6 text-primary" />,
    description: "Explora el mundo de los datos, desde estadística básica hasta machine learning",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos de Datos",
        description: "Aprende a manejar y visualizar datos",
        skills: ["Python", "Pandas", "Visualización"],
        resources: [
          { title: "Python para Data Science", link: "#", type: "curso" },
          { title: "Visualización de datos con Matplotlib", link: "#", type: "tutorial" }
        ]
      },
      {
        level: "Intermedio",
        title: "Machine Learning Básico",
        description: "Introduccción a modelos de ML",
        skills: ["Scikit-Learn", "Aprendizaje supervisado", "Métricas de evaluación"],
        resources: [
          { title: "Introducción al Machine Learning", link: "#", type: "curso" },
          { title: "Implementando modelos ML", link: "#", type: "documento" }
        ]
      }
    ]
  },
  {
    id: "ai",
    title: "Inteligencia Artificial",
    icon: <Code className="h-6 w-6 text-primary" />,
    description: "Desde los fundamentos matemáticos hasta implementaciones prácticas de deep learning",
    steps: [
      {
        level: "Principiante",
        title: "Fundamentos de IA",
        description: "Conceptos básicos y matemáticas",
        skills: ["Álgebra lineal", "Probabilidad", "Python para IA"],
        resources: [
          { title: "Matemáticas para IA", link: "#", type: "curso" },
          { title: "Introducción a la IA", link: "#", type: "tutorial" }
        ]
      },
      {
        level: "Intermedio",
        title: "Deep Learning",
        description: "Redes neuronales y frameworks",
        skills: ["TensorFlow", "PyTorch", "Redes Neuronales Convolucionales"],
        resources: [
          { title: "Deep Learning práctico", link: "#", type: "curso" },
          { title: "Computer Vision con CNN", link: "#", type: "documento" }
        ]
      }
    ]
  }
];

const RoadmapsSection: React.FC = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);
  
  const handleRoadmapSelect = (id: string) => {
    setSelectedRoadmap(selectedRoadmap === id ? null : id);
  };

  const selectedRoadmapData = roadmaps.find(r => r.id === selectedRoadmap);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Rutas de <span className="text-gradient">Aprendizaje</span>
        </h2>
        <p className="text-[#94a3b8] mb-8 text-left">
          Guías paso a paso para dominar diferentes áreas de la programación y tecnología. Cada roadmap te ofrece 
          un camino estructurado de aprendizaje con recursos recomendados y proyectos prácticos.
        </p>
      </div>
      
      {/* Roadmaps in horizontal grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {roadmaps.map((roadmap) => (
          <Card 
            key={roadmap.id} 
            className={`glass-card overflow-hidden h-full flex flex-col cursor-pointer transition-all ${
              selectedRoadmap === roadmap.id ? 'border-primary glow-border' : ''
            }`}
            onClick={() => handleRoadmapSelect(roadmap.id)}
          >
            <div className="p-5 flex-1 flex flex-col">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                {roadmap.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">{roadmap.title}</h3>
              <p className="text-[#94a3b8] text-sm mb-4 flex-grow line-clamp-3 text-left">
                {roadmap.description}
              </p>
              <div className="flex items-center justify-center text-primary">
                <span className="text-sm">Ver ruta</span>
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${
                  selectedRoadmap === roadmap.id ? 'rotate-180' : ''
                }`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Roadmap Details */}
      {selectedRoadmapData && (
        <div className="glass-card p-6 animate-float mb-8 mt-6">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mr-4">
                {selectedRoadmapData.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedRoadmapData.title}</h3>
                <p className="text-[#94a3b8] text-left">{selectedRoadmapData.description}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {selectedRoadmapData.steps.map((step, index) => (
              <div key={index} className="border-l-2 border-primary pl-6 pb-6 relative">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                <div className="mb-2">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2">{step.level}</Badge>
                  <h4 className="text-xl font-semibold mb-1">{step.title}</h4>
                  <p className="text-[#94a3b8] mb-4 text-left">{step.description}</p>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2 text-left">Habilidades clave:</h5>
                  <div className="flex flex-wrap gap-2">
                    {step.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-2 text-left">Recursos recomendados:</h5>
                  <div className="space-y-2">
                    {step.resources.map((resource, idx) => (
                      <div key={idx} className="flex items-center">
                        <Badge variant="outline" className="mr-2 text-xs capitalize">{resource.type}</Badge>
                        <a 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline text-sm"
                        >
                          {resource.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link to={`/resources/roadmaps/${selectedRoadmapData.id}`}>
              <Button className="btn-glow">Ver ruta completa</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapsSection;
