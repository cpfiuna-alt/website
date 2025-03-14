import React from "react";
import { Link } from "react-router-dom";
import { 
  Code, Terminal, Award, Lightbulb, Video, BookOpen, 
  FileText, Users, ExternalLink, ChevronRight, ArrowRight, Compass, Brain
} from "lucide-react";

interface RoadmapResource {
  name: string;
  url: string;
  type: string;
}

interface RoadmapLevel {
  name: string;
  skills: string[];
  resources: RoadmapResource[];
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  levels: RoadmapLevel[];
}

const learningRoadmaps: Roadmap[] = [
  {
    id: "frontend",
    title: "Desarrollo Frontend",
    description: "Domina las tecnologías para crear interfaces de usuario atractivas y funcionales",
    levels: [
      {
        name: "Principiante",
        skills: ["HTML5", "CSS3", "JavaScript Básico"],
        resources: [
          { name: "Fundamentos de HTML y CSS", url: "#", type: "Curso" },
          { name: "Introducción a JavaScript", url: "#", type: "Tutorial" }
        ]
      },
      {
        name: "Intermedio",
        skills: ["JavaScript Avanzado", "React", "TypeScript", "Responsive Design"],
        resources: [
          { name: "React desde cero", url: "#", type: "Curso" },
          { name: "TypeScript para desarrolladores de JavaScript", url: "#", type: "Guía" }
        ]
      },
      {
        name: "Avanzado",
        skills: ["Optimización de Rendimiento", "Patrones de Diseño", "SSR/SSG", "PWA"],
        resources: [
          { name: "Patrones avanzados en React", url: "#", type: "Taller" },
          { name: "Construyendo PWAs modernas", url: "#", type: "Curso" }
        ]
      }
    ]
  },
  {
    id: "backend",
    title: "Desarrollo Backend",
    description: "Construye APIs robustas y servicios del lado del servidor",
    levels: [
      {
        name: "Principiante",
        skills: ["Fundamentos de Backend", "Python o Node.js", "SQL Básico"],
        resources: [
          { name: "Introducción a Node.js", url: "#", type: "Curso" },
          { name: "Fundamentos de SQL", url: "#", type: "Tutorial" }
        ]
      },
      {
        name: "Intermedio",
        skills: ["Express/Django/Flask", "ORM", "Autenticación", "RESTful APIs"],
        resources: [
          { name: "Construyendo APIs RESTful", url: "#", type: "Curso" },
          { name: "Autenticación y Autorización", url: "#", type: "Guía" }
        ]
      },
      {
        name: "Avanzado",
        skills: ["GraphQL", "Microservicios", "Websockets", "Optimización de Bases de Datos"],
        resources: [
          { name: "Arquitectura de Microservicios", url: "#", type: "Taller" },
          { name: "GraphQL Avanzado", url: "#", type: "Curso" }
        ]
      }
    ]
  },
  {
    id: "competitive",
    title: "Programación Competitiva",
    description: "Mejora tus habilidades de algoritmos y estructuras de datos para competencias",
    levels: [
      {
        name: "Principiante",
        skills: ["Algoritmos básicos", "Complejidad", "Estructuras fundamentales"],
        resources: [
          { name: "Introducción a la Programación Competitiva", url: "#", type: "Curso" },
          { name: "Problemas para principiantes", url: "#", type: "Ejercicios" }
        ]
      },
      {
        name: "Intermedio",
        skills: ["Grafos", "Programación Dinámica", "Geometría Computacional"],
        resources: [
          { name: "Algoritmos en grafos", url: "#", type: "Taller" },
          { name: "Programación Dinámica explicada", url: "#", type: "Guía" }
        ]
      },
      {
        name: "Avanzado",
        skills: ["Algoritmos avanzados de grafos", "Teoría de números", "Optimización"],
        resources: [
          { name: "Preparación para ICPC", url: "#", type: "Taller" },
          { name: "Problemas avanzados comentados", url: "#", type: "Curso" }
        ]
      }
    ]
  },
  {
    id: "datascience",
    title: "Ciencia de Datos",
    description: "Aprende a analizar y obtener insights valiosos de los datos",
    levels: [
      {
        name: "Principiante",
        skills: ["Python", "Estadística Básica", "Pandas", "NumPy"],
        resources: [
          { name: "Fundamentos de Data Science", url: "#", type: "Curso" },
          { name: "Python para análisis de datos", url: "#", type: "Tutorial" }
        ]
      },
      {
        name: "Intermedio",
        skills: ["Visualización de Datos", "Machine Learning básico", "Feature Engineering"],
        resources: [
          { name: "Visualización con Matplotlib y Seaborn", url: "#", type: "Taller" },
          { name: "Introducción a Machine Learning", url: "#", type: "Curso" }
        ]
      },
      {
        name: "Avanzado",
        skills: ["Deep Learning", "NLP", "Big Data", "MLOps"],
        resources: [
          { name: "Deep Learning con TensorFlow", url: "#", type: "Curso" },
          { name: "Procesamiento de Lenguaje Natural", url: "#", type: "Taller" }
        ]
      }
    ]
  },
  {
    id: "artificialintelligence",
    title: "Inteligencia Artificial",
    description: "Explora los fundamentos y aplicaciones avanzadas de la IA y el aprendizaje automático",
    levels: [
      {
        name: "Principiante",
        skills: ["Matemáticas para IA", "Python", "Estadística básica", "Algoritmos básicos"],
        resources: [
          { name: "Fundamentos matemáticos para IA", url: "#", type: "Curso" },
          { name: "Introducción a Python para IA", url: "#", type: "Tutorial" }
        ]
      },
      {
        name: "Intermedio",
        skills: ["Machine Learning", "Redes Neuronales", "Procesamiento de datos", "Computer Vision básica"],
        resources: [
          { name: "Fundamentos de Machine Learning", url: "#", type: "Curso" },
          { name: "Introducción a las Redes Neuronales", url: "#", type: "Guía" }
        ]
      },
      {
        name: "Avanzado",
        skills: ["Deep Learning", "NLP avanzado", "Reinforcement Learning", "Ética en IA"],
        resources: [
          { name: "Arquitecturas avanzadas de Deep Learning", url: "#", type: "Taller" },
          { name: "Implementación de Reinforcement Learning", url: "#", type: "Curso" }
        ]
      }
    ]
  }
];

const RoadmapCardIcon = ({ id }: { id: string }) => {
  switch (id) {
    case "frontend":
      return <Code className="h-10 w-10 mb-4 text-primary" />;
    case "backend":
      return <Terminal className="h-10 w-10 mb-4 text-primary" />;
    case "competitive":
      return <Award className="h-10 w-10 mb-4 text-primary" />;
    case "datascience":
      return <Lightbulb className="h-10 w-10 mb-4 text-primary" />;
    case "artificialintelligence":
      return <Brain className="h-10 w-10 mb-4 text-primary" />;
    default:
      return null;
  }
};

const ResourceTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Curso":
      return <Video className="h-4 w-4 text-primary" />;
    case "Tutorial":
      return <BookOpen className="h-4 w-4 text-primary" />;
    case "Guía":
      return <FileText className="h-4 w-4 text-primary" />;
    case "Taller":
      return <Users className="h-4 w-4 text-primary" />;
    case "Ejercicios":
      return <Code className="h-4 w-4 text-primary" />;
    default:
      return <FileText className="h-4 w-4 text-primary" />;
  }
};

interface RoadmapDetailProps {
  roadmap: Roadmap;
}

const RoadmapDetail = ({ roadmap }: RoadmapDetailProps) => {
  return (
    <div className="glass-card p-8 mb-16 animate-fade-in">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
        <p className="text-muted-foreground">{roadmap.description}</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-primary/20"></div>
        
        <div className="space-y-12">
          {roadmap.levels.map((level, index) => (
            <div key={index} className="relative">
              <div className="absolute left-0 w-[12px] h-[12px] rounded-full bg-primary mt-2 transform -translate-x-[5px]"></div>
              
              <div className="ml-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h4 className="text-xl font-semibold">{level.name}</h4>
                  <div className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    Nivel {index + 1}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Habilidades clave:</p>
                  <div className="flex flex-wrap gap-2">
                    {level.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Recursos recomendados:</p>
                  <div className="space-y-2">
                    {level.resources.map((resource, i) => (
                      <a 
                        key={i}
                        href={resource.url}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ResourceTypeIcon type={resource.type} />
                          <span>{resource.name}</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
                
                {index < roadmap.levels.length - 1 && (
                  <div className="mt-6 flex justify-end">
                    <div className="flex items-center text-primary animate-pulse">
                      <span className="text-sm">Continúa al siguiente nivel</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-border flex justify-center">
        <Link 
          to="/contact"
          className="flex items-center text-primary hover:underline"
        >
          <span>¿Tienes sugerencias para esta ruta de aprendizaje?</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

interface LearningRoadmapsProps {
  selectedRoadmap: string | null;
  setSelectedRoadmap: (id: string | null) => void;
}

const LearningRoadmaps = ({ selectedRoadmap, setSelectedRoadmap }: LearningRoadmapsProps) => {
  return (
    <section className="py-16 px-6 bg-muted/30 dark:bg-black/20">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-full bg-primary/10">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Rutas de <span className="gradient-text">Aprendizaje</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sigue estas guías estructuradas para desarrollar tus habilidades de programación,
            desde principiante hasta experto en diferentes áreas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {learningRoadmaps.map(roadmap => (
            <button
              key={roadmap.id}
              onClick={() => setSelectedRoadmap(roadmap.id === selectedRoadmap ? null : roadmap.id)}
              className={`glass-card p-4 text-left transition-all h-full ${
                roadmap.id === selectedRoadmap 
                  ? "ring-2 ring-primary shadow-neon-blue" 
                  : "hover:shadow-neon-blue"
              }`}
            >
              <RoadmapCardIcon id={roadmap.id} />
              
              <h3 className="text-lg font-semibold mb-2">{roadmap.title}</h3>
              <p className="text-muted-foreground text-xs mb-4">{roadmap.description}</p>
              
              <div className="flex items-center text-primary text-sm font-medium">
                <span>Ver ruta</span>
                <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${
                  roadmap.id === selectedRoadmap ? "rotate-90" : ""
                }`} />
              </div>
            </button>
          ))}
        </div>
        
        {selectedRoadmap && (
          <RoadmapDetail roadmap={learningRoadmaps.find(r => r.id === selectedRoadmap)!} />
        )}
      </div>
    </section>
  );
};

export { learningRoadmaps };
export default LearningRoadmaps;
