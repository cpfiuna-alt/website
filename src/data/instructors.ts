// Profile data for instructors and blog authors
export interface InstructorProfile {
  name: string;
  bio: string;
  expertise: string[];
  experience: string;
  profilePicture: string;
  title?: string; // Optional title for blog authors (e.g., "Coordinador de Competencias")
}

export const instructors: Record<string, InstructorProfile> = {
  "David Giménez": {
    name: "David Giménez",
    bio: "Estudiante de Ingeniería Mecatrónica con experiencia en desarrollo web y programación competitiva. Ha colaborado en proyectos de software para startups, obtenido premios en competencias internacionales y disfruta compartir su conocimiento para impulsar el crecimiento de la comunidad tecnológica.",
    expertise: ["C", "C++", "Python", "Algoritmos", "Programación Competitiva", "Estructuras de Datos"],
    experience: "4+ años",
    profilePicture: "/miembros/davidgimenez.jpg",
    title: "Presidente"
  },
  "Oscar Alderete": {
    name: "Oscar Alderete",
    bio: "Estudiante de Ingeniería Mecatrónica y Electrónica con tres años de experiencia en Python y desarrollo de soluciones tecnológicas. Especializado en la integración de inteligencia artificial y el desarrollo de agentes y sistemas inteligentes. Cuenta con amplia experiencia en trabajo con equipos multidisciplinarios y se apasiona por las tendencias tecnológicas actuales.",
    expertise: ["Python", "Inteligencia Artificial", "Ciencia de Datos", "Machine Learning"],
    experience: "3+ años",
    profilePicture: "/miembros/oscaralderete.jpg",
    title: "Vicepresidente"
  },
  "Esteban Ibarra": {
    name: "Esteban Ibarra",
    bio: "Encargado de la organización de eventos y gestión de la comunicación del club. Su experiencia en coordinación y habilidades comunicacionales han sido fundamentales para el crecimiento y la efectiva gestión de las actividades del club.",
    expertise: ["Organización de Eventos", "Comunicación", "Gestión", "Coordinación"],
    experience: "2+ años",
    profilePicture: "/miembros/estebanibarra.jpg",
    title: "Secretario"
  },
  "Iván Jara": {
    name: "Iván Jara",
    bio: "Responsable de las finanzas del club, gestión de presupuestos y coordinación de recursos para eventos y proyectos. Fan de la ciencia, la tecnología y los porqués del mundo, aporta una perspectiva analítica al manejo de los recursos del club.",
    expertise: ["Gestión Financiera", "Planificación", "Administración", "Coordinación de Recursos"],
    experience: "2+ años",
    profilePicture: "/miembros/ivanjara.jpg",
    title: "Tesorero"
  },
  "Daniel Villalba": {
    name: "Daniel Villalba",
    bio: "Líder del área de Sistemas Embebidos, siempre entre hardware, código y alguna que otra partida de Fortnite. Su expertise en sistemas embebidos aporta una dimensión práctica y técnica a los proyectos del club.",
    expertise: ["Sistemas Embebidos", "Hardware", "Programación", "Microcontroladores"],
    experience: "3+ años",
    profilePicture: "/miembros/danielvillalba.jpg",
    title: "Lead de Sistemas Embebidos"
  },
  "Gabriel Park": {
    name: "Gabriel Park",
    bio: "Líder del área de Programación Orientada a Objetos y estudiante de Ingeniería Mecatrónica. Excampeón de VEX Robotics, aporta experiencia práctica en robótica y programación estructurada al equipo del club.",
    expertise: ["POO", "Programación", "Robótica", "VEX Robotics"],
    experience: "3+ años",
    profilePicture: "/miembros/gabrielpark.jpg",
    title: "Lead de POO"
  },
  "Mathías Martínez": {
    name: "Mathías Martínez",
    bio: "Líder del área de Algoritmos, viviendo su vida entre algoritmos y estructuras de datos. Su pasión por la resolución de problemas computacionales y las estructuras de datos enriquece la formación técnica de los miembros del club.",
    expertise: ["Algoritmos", "Estructuras de Datos", "Programación Competitiva", "Resolución de Problemas"],
    experience: "3+ años",
    profilePicture: "/miembros/mathiasmartinez.jpg",
    title: "Lead de Algoritmos"
  },
};

// Helper function to get instructor by name
export const getInstructorByName = (name: string): InstructorProfile | null => {
  return instructors[name] || null;
};
