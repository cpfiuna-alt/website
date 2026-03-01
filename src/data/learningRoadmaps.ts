export interface RoadmapResource {
  name: string;
  url: string;
  type: string;
}

export interface RoadmapLevel {
  name: string;
  skills?: string[];
  resources?: RoadmapResource[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  levels?: RoadmapLevel[];
}

export const learningRoadmaps: Roadmap[] = [
  {
    id: "frontend",
    title: "Desarrollo Frontend",
    description: "Domina las tecnologías para crear interfaces de usuario atractivas y funcionales",
  },
  {
    id: "backend",
    title: "Desarrollo Backend",
    description:
      "Construye APIs robustas y servicios del lado del servidor",
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Aprende prácticas y herramientas para integrar desarrollo y operaciones y entregar software de forma continua",
  },
  {
    id: "datascience",
    title: "Ciencia de Datos",
    description:
      "Aprende a analizar y obtener insights valiosos de los datos",
  },
  {
    id: "artificialintelligence",
    title: "Inteligencia Artificial",
    description: "Explora fundamentos y aplicaciones avanzadas de IA y aprendizaje automático",
  },
];
