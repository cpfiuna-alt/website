
// Project data and utility functions

// Define the Project type
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  contributors: number;
  status: "Activo" | "En Desarrollo" | "Completado" | "Abandonado";
  lastUpdated?: string;
  slug: string;
  
  // Fields for detailed project information
  features?: string[];
  technologies?: string[];
  challenges?: string;
  outcomes?: string;
  objectives?: string[];
  contributionGuidelines?: string;
}

// Sample project data
const projects: Project[] = [
  {
    id: "1",
    title: "Sistema de Gestión Académica",
    description: "Aplicación web para la gestión de cursos, estudiantes y calificaciones para instituciones educativas.",
    longDescription: "Este sistema permite a instituciones educativas gestionar de manera eficiente los cursos, estudiantes, profesores y calificaciones. Facilita el seguimiento del progreso académico, la comunicación entre docentes y alumnos, y la administración general de la institución.",
    image: "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express", "Educación"],
    repoUrl: "https://github.com/cpfiuna/sga",
    demoUrl: "https://sga-demo.cpfiuna.io",
    contributors: 6,
    status: "Completado",
    lastUpdated: "Marzo 2024",
    slug: "sistema-gestion-academica",
    features: [
      "Gestión completa de cursos, materias y clases",
      "Sistema de calificaciones y asistencia",
      "Portal para estudiantes y docentes",
      "Generación de reportes académicos",
      "Comunicación interna entre usuarios",
      "Gestión de tareas y asignaciones"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Material UI"],
    challenges: "Uno de los mayores desafíos fue implementar un sistema de permisos granular que permitiera diferentes niveles de acceso según el rol del usuario. Además, desarrollamos un motor de cálculo de promedios y estadísticas que debía ser preciso y eficiente con grandes volúmenes de datos.",
    outcomes: "El sistema se implementó exitosamente en varias instituciones educativas y ha recibido comentarios positivos por su facilidad de uso e interfaz intuitiva. Ha ayudado a estas instituciones a reducir la carga administrativa y mejorar la comunicación con los estudiantes."
  },
  {
    id: "2",
    title: "App Móvil para Monitoreo Ambiental",
    description: "Aplicación móvil para recopilar y visualizar datos ambientales utilizando sensores IoT.",
    longDescription: "Esta aplicación permite a los usuarios monitorear variables ambientales como temperatura, humedad, calidad del aire y niveles de ruido a través de sensores IoT conectados. Proporciona visualizaciones en tiempo real y alertas cuando los valores exceden los umbrales configurados.",
    image: "https://images.unsplash.com/photo-1623705574100-990d5c277f48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    tags: ["Flutter", "IoT", "Firebase", "Ambiental", "Mobile"],
    repoUrl: "https://github.com/cpfiuna/eco-app",
    demoUrl: "https://ecoapp.cpfiuna.io",
    contributors: 4,
    status: "Activo",
    lastUpdated: "Abril 2024",
    slug: "app-monitoreo-ambiental",
    features: [
      "Monitoreo en tiempo real de variables ambientales",
      "Visualización de datos históricos",
      "Sistema de alertas configurables",
      "Mapas de calor para visualizar zonas afectadas",
      "Integración con múltiples sensores IoT"
    ],
    technologies: ["Flutter", "Dart", "Firebase", "IoT", "MQTT", "Arduino"],
    challenges: "La sincronización de datos en tiempo real entre múltiples sensores y dispositivos fue un reto significativo. También enfrentamos desafíos en la optimización del consumo de batería en los dispositivos móviles mientras se mantenía una monitorización constante.",
    outcomes: "La aplicación se ha utilizado en varios proyectos de investigación ambiental y ha facilitado la recopilación de datos en áreas urbanas para estudiar la contaminación y sus efectos."
  },
  {
    id: "3",
    title: "Plataforma de Competencias de Programación",
    description: "Sistema web para organizar y participar en competencias de programación con verificación automática.",
    longDescription: "Esta plataforma permite a organizadores crear competencias de programación con problemas personalizados, y a participantes enviar soluciones que son verificadas automáticamente. Incluye rankings, estadísticas y herramientas colaborativas.",
    image: "https://images.unsplash.com/photo-1603969409447-ba86143a03f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tags: ["Next.js", "Docker", "Python", "Algoritmos", "Competencias"],
    repoUrl: "https://github.com/cpfiuna/codecompete",
    contributors: 8,
    status: "En Desarrollo",
    lastUpdated: "Mayo 2024",
    slug: "plataforma-competencias",
    objectives: [
      "Crear un entorno de verificación seguro para código enviado",
      "Implementar un editor de código en línea con resaltado de sintaxis",
      "Desarrollar un sistema de puntuación y rankings en tiempo real",
      "Permitir competencias individuales y por equipos",
      "Integrar funcionalidades educativas y de aprendizaje"
    ],
    technologies: ["Next.js", "TypeScript", "Docker", "Python", "PostgreSQL", "Redis"],
    contributionGuidelines: "Buscamos colaboradores con experiencia en desarrollo frontend (React/Next.js), backend (Node.js/Python), y especialmente personas con conocimiento en contenedores Docker para entornos de ejecución aislados y seguros. También necesitamos colaboradores para crear problemas de programación de calidad para diferentes niveles."
  },
  {
    id: "4",
    title: "Biblioteca Virtual de Recursos Técnicos",
    description: "Repositorio digital de recursos educativos en ciencias e ingeniería con sistema de recomendaciones.",
    longDescription: "Este proyecto recopila y organiza recursos educativos de diversas fuentes, incluyendo libros, artículos, videos y cursos en línea. Implementa un sistema de recomendaciones basado en los intereses y nivel del usuario.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
    tags: ["React", "ElasticSearch", "Node.js", "ML", "Educación"],
    repoUrl: "https://github.com/cpfiuna/tech-library",
    demoUrl: "https://biblioteca.cpfiuna.io",
    contributors: 5,
    status: "Abandonado",
    lastUpdated: "Febrero 2024",
    slug: "biblioteca-virtual",
    objectives: [
      "Centralizar recursos educativos de calidad en áreas técnicas",
      "Implementar un motor de búsqueda avanzado y eficiente",
      "Desarrollar un sistema de recomendaciones personalizado",
      "Crear una interfaz intuitiva y accesible",
      "Permitir contribuciones de la comunidad académica"
    ],
    technologies: ["React", "Node.js", "ElasticSearch", "TensorFlow.js", "AWS S3", "GraphQL"],
    contributionGuidelines: "Este proyecto necesita colaboradores para ampliar la base de datos de recursos, mejorar los algoritmos de recomendación, y desarrollar nuevas funcionalidades para la comunidad educativa. Si tienes experiencia en desarrollo web, machine learning o ciencias de la educación, ¡únete al equipo!"
  }
];

// Get all projects
export const getAllProjects = (): Project[] => {
  return projects;
};

// Get a specific project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Get featured projects (e.g., for homepage)
export const getFeaturedProjects = (count: number = 3): Project[] => {
  return projects.slice(0, count);
};
