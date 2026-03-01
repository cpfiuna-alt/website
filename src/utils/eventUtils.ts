import { useState, useEffect } from "react";

// Define interfaces for event data
export interface EventMeta {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  type: string;
  registrationLink: string;
  isUpcoming: boolean;
  slug: string;
  content: string;
  tags?: string[];
  schedule?: {
    time: string;
    title: string;
    description: string;
  }[];
  organizers?: {
    name: string;
    role: string;
  }[];
}

// Sample event data (in a real app, this would come from a backend service or markdown files)
const eventData: EventMeta[] = [
  {
    id: "1",
    title: "Hackathon FIUNA 2024",
    date: "2024-05-15",
    time: "09:00",
    location: "Aula Magna, FIUNA",
    description: "Participa en nuestro hackathon anual donde podrás desarrollar soluciones innovadoras a problemas reales.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    type: "hackathon",
    registrationLink: "https://forms.com/register-hackathon",
    isUpcoming: true,
    slug: "hackathon-fiuna-2024",
    content: "# Hackathon FIUNA 2024\n\nEl evento anual de programación competitiva más grande de la facultad. Forma tu equipo y resuelve desafíos de programación durante 24 horas.\n\n## Detalles\n\n- **Fecha**: 15-17 de mayo, 2024\n- **Hora**: 09:00 AM - 09:00 AM (siguiente día)\n- **Lugar**: Campus FIUNA, Aula Magna\n\n## Premios\n\n- 1er lugar: Notebooks Lenovo ThinkPad\n- 2do lugar: Tablets Samsung Galaxy\n- 3er lugar: Auriculares Sony WH-1000XM4\n\n## Requisitos\n\n- Estudiantes activos de FIUNA\n- Equipos de 3-4 personas\n- Conocimientos básicos de programación\n\n## Registro\n\nEl registro está abierto hasta el 10 de mayo. ¡No pierdas la oportunidad de participar en este evento increíble!\n\n## Agenda\n\n### Día 1 (15 de mayo)\n- 09:00 - 10:00: Registro y bienvenida\n- 10:00 - 11:00: Presentación de desafíos\n- 11:00 - 12:00: Formación de equipos (para participantes individuales)\n- 12:00 - 13:00: Almuerzo\n- 13:00: ¡Comienza el hackathon!\n\n### Día 2 (16 de mayo)\n- Desarrollo continuo\n- Mentorías disponibles durante todo el día\n\n### Día 3 (17 de mayo)\n- 08:00 - 09:00: Finalización del desarrollo\n- 09:00 - 12:00: Presentaciones de proyectos\n- 12:00 - 13:00: Deliberación del jurado\n- 13:00 - 14:00: Anuncio de ganadores y clausura\n\n## Patrocinadores\n\n- Universidad Nacional de Asunción\n- Microsoft\n- Google Developer Student Clubs\n- GitHub Education",
    tags: ["programación", "concurso", "tecnología", "innovación"],
    schedule: [
      { time: "09:00 - 10:00", title: "Registro y bienvenida", description: "Check-in de participantes y presentación del evento" },
      { time: "10:00 - 11:00", title: "Presentación de desafíos", description: "Explicación detallada de los problemas a resolver" },
      { time: "11:00 - 12:00", title: "Formación de equipos", description: "Organización de grupos para participantes individuales" },
      { time: "12:00 - 13:00", title: "Almuerzo", description: "Pausa para comer y networking" },
      { time: "13:00", title: "Inicio del hackathon", description: "Comienza el tiempo de desarrollo" }
    ],
    organizers: [
      { name: "Juan Pérez", role: "Coordinador General" },
      { name: "María Gómez", role: "Coordinadora Técnica" },
      { name: "Carlos Benítez", role: "Encargado de Mentorías" }
    ]
  },
  {
    id: "2",
    title: "Workshop: Inteligencia Artificial y Machine Learning",
    date: "2024-06-05",
    time: "14:00",
    location: "Laboratorio 3, FIUNA",
    description: "Aprende los fundamentos de la IA y cómo implementar modelos de machine learning en tus proyectos.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    type: "workshop",
    registrationLink: "https://forms.com/register-ai-workshop",
    isUpcoming: true,
    slug: "workshop-ia-ml",
    content: "# Workshop: Inteligencia Artificial y Machine Learning\n\nAprende los conceptos básicos de la IA y cómo implementar algoritmos de aprendizaje automático en Python.\n\n## Agenda\n\n### 1. Introducción a los conceptos de IA (1 hora)\n- Historia y evolución de la Inteligencia Artificial\n- Diferencias entre IA, Machine Learning y Deep Learning\n- Aplicaciones actuales y casos de uso\n- Ética en la IA\n\n### 2. Configuración del entorno de trabajo (30 min)\n- Instalación de Python y bibliotecas necesarias\n- Configuración de Jupyter Notebooks\n- Introducción a Google Colab\n\n### 3. Primeros pasos con scikit-learn (1 hora)\n- Estructura de datos en ML\n- Preprocesamiento de datos\n- División de datos para entrenamiento y prueba\n- Evaluación de modelos\n\n### 4. Desarrollo de un modelo básico de clasificación (1.5 horas)\n- Implementación paso a paso\n- Evaluación y mejora del modelo\n- Visualización de resultados\n\n## Requisitos\n\n- Laptop con Python 3.8+ instalado\n- Conocimientos básicos de programación en Python\n- Entusiasmo por aprender algo nuevo\n\n## Materiales\n\nSe proporcionarán notebooks de Jupyter y datasets para prácticas. Todos los materiales estarán disponibles para descarga antes del workshop.\n\n## Instructor\n\nEl workshop será impartido por el Dr. Carlos Benítez, especialista en Machine Learning con experiencia en proyectos de investigación y aplicaciones industriales.\n\n## Lugar y fecha\n\n- **Fecha**: 5 de junio, 2024\n- **Hora**: 14:00 - 18:00\n- **Lugar**: Laboratorio 3, FIUNA\n\n## Plazas limitadas\n\nEl workshop tiene un cupo máximo de 30 participantes. ¡Reserva tu lugar ahora!",
    tags: ["inteligencia artificial", "machine learning", "python", "data science"],
    schedule: [
      { time: "14:00 - 15:00", title: "Introducción a IA", description: "Conceptos fundamentales de la Inteligencia Artificial" },
      { time: "15:00 - 15:30", title: "Configuración del entorno", description: "Preparación de herramientas para el desarrollo" },
      { time: "15:30 - 16:30", title: "Scikit-learn", description: "Uso de la biblioteca para modelos de ML" },
      { time: "16:30 - 18:00", title: "Modelo de clasificación", description: "Implementación práctica de un modelo" }
    ],
    organizers: [
      { name: "Carlos Benítez", role: "Instructor Principal" },
      { name: "Ana Martínez", role: "Asistente" }
    ]
  },
  {
    id: "3",
    title: "Charla: Desarrollo de Aplicaciones Web Modernas",
    date: "2024-06-20",
    time: "18:30",
    location: "Virtual (Zoom)",
    description: "Descubre las mejores prácticas y tecnologías actuales para el desarrollo de aplicaciones web.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    type: "charla",
    registrationLink: "https://forms.com/register-web-talk",
    isUpcoming: true,
    slug: "charla-desarrollo-web",
    content: "# Charla: Desarrollo de Aplicaciones Web Modernas\n\nDescubre las mejores prácticas y tecnologías actuales para el desarrollo de aplicaciones web modernas. Desde frameworks frontend hasta arquitecturas backend escalables.\n\n## Temas a cubrir\n\n- Estado actual del desarrollo web en 2024\n- Frontend moderno: React, Vue, Svelte y más\n- Backend y APIs: Node.js, GraphQL, REST\n- Arquitecturas serverless y JAMstack\n- Performance y optimización\n- Accesibilidad y buenas prácticas\n\n## Ponente\n\nLa charla será impartida por María Gómez, desarrolladora web senior con más de 8 años de experiencia en compañías como Google y Mercado Libre.\n\n## Detalles del evento\n\n- **Fecha**: 20 de junio, 2024\n- **Hora**: 18:30 - 20:00\n- **Lugar**: Virtual (Zoom)\n\n## ¿A quién está dirigido?\n\n- Estudiantes de informática e ingeniería\n- Desarrolladores junior que desean actualizarse\n- Profesionales interesados en las tendencias web actuales\n\nSe enviará el enlace de Zoom a todos los inscritos el día del evento.",
    tags: ["desarrollo web", "frontend", "backend", "javascript"],
    schedule: [
      { time: "18:30 - 18:45", title: "Introducción", description: "Bienvenida y presentación de la ponente" },
      { time: "18:45 - 19:30", title: "Charla principal", description: "Desarrollo de aplicaciones web modernas" },
      { time: "19:30 - 20:00", title: "Preguntas y respuestas", description: "Sesión interactiva con los participantes" }
    ],
    organizers: [
      { name: "María Gómez", role: "Ponente Principal" },
      { name: "Roberto Sánchez", role: "Moderador" }
    ]
  },
  {
    id: "4",
    title: "Competencia de Programación 2024",
    date: "2024-07-10",
    time: "13:00",
    location: "Laboratorio de Informática, FIUNA",
    description: "Demuestra tus habilidades de programación y algoritmos en nuestra competencia anual.",
    image: "https://images.unsplash.com/photo-1581092921461-7aaac723efed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    type: "competencia",
    registrationLink: "https://forms.com/register-coding-competition",
    isUpcoming: true,
    slug: "competencia-programacion-2024",
    content: "# Competencia de Programación 2024\n\nDemuestra tus habilidades de programación y algoritmos en nuestra competencia anual. Resuelve problemas algorítmicos desafiantes en un ambiente competitivo amistoso.\n\n## Formato de la competencia\n\n- Duración: 5 horas\n- Individual o equipos de 2 personas\n- 8-12 problemas de dificultad variada\n- Lenguajes permitidos: C, C++, Java, Python\n\n## Temas incluidos\n\n- Estructuras de datos\n- Algoritmos de grafos\n- Programación dinámica\n- Algoritmos de búsqueda y ordenación\n- Matemáticas y teoría de números\n\n## Premios\n\n- 1er lugar: Certificado + Trofeo + Computadora portátil\n- 2do lugar: Certificado + Trofeo + Tablet\n- 3er lugar: Certificado + Trofeo + Auriculares inalámbricos\n\nTodos los participantes recibirán un certificado digital de participación.\n\n## Requisitos\n\n- Ser estudiante activo de alguna institución educativa paraguaya\n- Conocimientos básicos de programación y algoritmos\n- Traer tu propia laptop (recomendado) o usar las computadoras del laboratorio\n\n## Cronograma\n\n- 12:30 - 13:00: Registro de participantes\n- 13:00 - 13:30: Explicación de reglas y sistema de evaluación\n- 13:30 - 18:30: Competencia\n- 18:30 - 19:00: Deliberación de jueces\n- 19:00 - 19:30: Anuncio de ganadores y premiación\n\n¡Prepárate para demostrar tus habilidades y competir por grandes premios!",
    tags: ["algoritmos", "programación competitiva", "concurso", "coding"],
    schedule: [
      { time: "12:30 - 13:00", title: "Registro", description: "Check-in de participantes" },
      { time: "13:00 - 13:30", title: "Explicación de reglas", description: "Instrucciones y sistema de evaluación" },
      { time: "13:30 - 18:30", title: "Competencia", description: "Resolución de problemas" },
      { time: "18:30 - 19:00", title: "Deliberación", description: "Evaluación por parte de los jueces" },
      { time: "19:00 - 19:30", title: "Premiación", description: "Anuncio de ganadores y entrega de premios" }
    ],
    organizers: [
      { name: "Pedro Rodríguez", role: "Director de la Competencia" },
      { name: "Laura García", role: "Jueza Principal" },
      { name: "Diego Torres", role: "Coordinador Técnico" }
    ]
  },
  {
    id: "5",
    title: "Taller de Git y GitHub",
    date: "2024-07-25",
    time: "15:00",
    location: "Aula 23, FIUNA",
    description: "Aprende a utilizar Git y GitHub para trabajar en proyectos colaborativos y mejorar tu flujo de trabajo.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    type: "taller",
    registrationLink: "https://forms.com/register-git-workshop",
    isUpcoming: true,
    slug: "taller-git-github",
    content: "# Taller de Git y GitHub\n\nAprende a utilizar Git y GitHub para trabajar en proyectos colaborativos y mejorar tu flujo de trabajo en el desarrollo de software.\n\n## Contenido del taller\n\n### Fundamentos de Git\n- ¿Qué es el control de versiones?\n- Instalación y configuración de Git\n- Comandos básicos: init, add, commit, status\n- Trabajo con ramas: branch, checkout, merge\n\n### GitHub y trabajo colaborativo\n- Creación de cuenta y repositorios\n- Clonar, push y pull\n- Forks y Pull Requests\n- Issues y proyectos\n\n### Flujos de trabajo\n- Gitflow\n- GitHub flow\n- Estrategias de ramificación\n\n### Herramientas avanzadas\n- Git rebase\n- Cherry-pick\n- Resolución de conflictos\n- GitHub Actions básico\n\n## Requisitos\n\n- Laptop con Git instalado\n- Cuenta de GitHub (puedes crearla durante el taller)\n- Conocimientos básicos de línea de comandos\n\n## Instructor\n\nEl taller será impartido por Juan Pérez, DevOps Engineer con amplia experiencia en entornos de desarrollo colaborativo.\n\n## Detalles del evento\n\n- **Fecha**: 25 de julio, 2024\n- **Hora**: 15:00 - 18:00\n- **Lugar**: Aula 23, FIUNA\n\n## Materiales\n\nSe proporcionará una guía digital con todos los comandos y conceptos cubiertos en el taller para referencia futura.\n\n¡Aprende a colaborar eficientemente en proyectos de código y mejora tus habilidades de desarrollo!",
    tags: ["git", "github", "control de versiones", "colaboración"],
    schedule: [
      { time: "15:00 - 15:30", title: "Fundamentos de Git", description: "Conceptos básicos de control de versiones" },
      { time: "15:30 - 16:15", title: "GitHub y trabajo colaborativo", description: "Uso de GitHub para proyectos en equipo" },
      { time: "16:15 - 16:30", title: "Pausa", description: "Descanso y networking" },
      { time: "16:30 - 17:15", title: "Flujos de trabajo", description: "Estrategias de ramificación y desarrollo" },
      { time: "17:15 - 18:00", title: "Herramientas avanzadas", description: "Técnicas y funciones avanzadas" }
    ],
    organizers: [
      { name: "Juan Pérez", role: "Instructor Principal" },
      { name: "Sofía Martínez", role: "Asistente" }
    ]
  }
];

// Hook to get a single event by slug
export function useEvent(slug: string): EventMeta | null {
  const [event, setEvent] = useState<EventMeta | null>(null);

  useEffect(() => {
    const foundEvent = eventData.find(e => e.slug === slug) || null;
    setEvent(foundEvent);
  }, [slug]);

  return event;
}

// Hook to get all events
export function useEvents(): EventMeta[] {
  const [events, setEvents] = useState<EventMeta[]>([]);

  useEffect(() => {
    setEvents(eventData);
  }, []);

  return events;
}

// Hook to get related events (same type, excluding current)
export function useRelatedEvents(currentSlug: string, limit: number = 3): EventMeta[] {
  const [relatedEvents, setRelatedEvents] = useState<EventMeta[]>([]);
  const currentEvent = useEvent(currentSlug);

  useEffect(() => {
    if (currentEvent) {
      const related = eventData
        .filter(e => e.type === currentEvent.type && e.slug !== currentEvent.slug)
        .slice(0, limit);
      
      setRelatedEvents(related);
    }
  }, [currentEvent, currentSlug, limit]);

  return relatedEvents;
}

// Format a date string
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  try {
    return new Date(dateString).toLocaleDateString('es-ES', options || defaultOptions);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}
