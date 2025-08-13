// Instructor profiles data
export interface InstructorProfile {
  name: string;
  bio: string;
  expertise: string[];
  experience: string;
  profilePicture: string;
}

export const instructors: Record<string, InstructorProfile> = {
  "David Giménez": {
    name: "David Giménez",
    bio: "Estudiante de Ingeniería Mecatrónica con experiencia en desarrollo web y programación competitiva. Ha colaborado en proyectos de software para startups, obtenido premios en competencias internacionales y disfruta compartir su conocimiento para impulsar el crecimiento de la comunidad tecnológica.",
    expertise: ["C", "C++", "Python", "Algoritmos", "Programación Competitiva", "Estructuras de Datos"],
    experience: "4+ años",
    profilePicture: "/miembros/davidgimenez.png"
  },
  "Esteban Ibarra": {
    name: "Esteban Ibarra",
    bio: "Ingeniero en Sistemas con más de 8 años de experiencia como desarrollador frontend. Especialista en JavaScript y frameworks modernos como React y Vue. Ha trabajado en proyectos para startups y grandes empresas, y mantiene una pasión por la enseñanza y la comunidad de desarrollo web. ¡Únete a este curso y domina el lenguaje que da vida a la web moderna!.",
    expertise: ["JavaScript", "Node.js", "Frontend Development", "Full-Stack"],
    experience: "6+ años",
    profilePicture: "/miembros/estebanibarra.png"
  },
  "Oscar Alderete": {
    name: "Oscar Alderete",
    bio: "Estudiante de Ingeniería Mecatrónica y Electrónica con tres años de experiencia en Python y desarrollo de soluciones tecnológicas. Especializado en la integración de inteligencia artificial y el desarrollo de agentes y sistemas inteligentes. Cuenta con amplia experiencia en trabajo con equipos multidisciplinarios y se apasiona por las tendencias tecnológicas actuales.",
    expertise: ["React", "Next.js", "TypeScript", "Frontend Architecture"],
    experience: "7+ años",
    profilePicture: "/miembros/oscaralderete.png"
  },
  "Daniel Villalba": {
    name: "Daniel Villalba",
    bio: "Licenciada en Informática con maestría en Ciencias de la Computación. Experiencia de 8 años en desarrollo de software y 5 años como docente de programación. Especialista en Python para ciencia de datos e inteligencia artificial. ¡Te esperamos para iniciar tu viaje en el mundo de la programación con Python!.",
    expertise: ["Python", "Educación Tecnológica", "Programación Básica", "Metodologías Didácticas"],
    experience: "5+ años",
    profilePicture: "/miembros/danielvillalba.png"
  },
};

// Helper function to get instructor by name
export const getInstructorByName = (name: string): InstructorProfile | null => {
  return instructors[name] || null;
};
