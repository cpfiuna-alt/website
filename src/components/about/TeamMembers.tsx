
import React from "react";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "David Giménez",
    role: "Presidente",
    image: "/miembros/davidgimenez.png",
    bio: "Estudiante de Ingeniería Mecatrónica con especialización en Inteligencia Artificial.",
    social: {
      github: "https://github.com/davidgimenezs",
      linkedin: "https://linkedin.com/in/davidgimenezs",
      instagram: "https://instagram.com/davidgimenez_s",
      email: "mailto:david.gimenezs@fiuna.edu.py",
    },
  },
  {
    name: "Oscar Alderete",
    role: "Vicepresidente",
    image: "/miembros/oscaralderete.png",
    bio: "Especialista en desarrollo web y gestión de proyectos de software.",
    social: {
      github: "https://github.com/Osukaru17",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/oscar_alderete99",
      email: "mailto:osualderete@fiuna.edu.py",
    },
  },
  {
    name: "Daniel Villalba",
    role: "Secretario",
    image: "/placeholder.svg",
    bio: "Apasionado por la educación en tecnología y el desarrollo de habilidades de programación.",
    social: {
      github: "https://github.com/DaniVillalba03",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/danivillalba03",
      email: "mailto:daniel.villalba@fiuna.edu.py",
    },
  },
  {
    name: "Ivan Jara",
    role: "Tesorero",
    image: "/placeholder.svg",
    bio: "Encargada de la organización de eventos y gestión de la comunicación del club.",
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/ivanjara019",
      email: "mailto:",
    },
  },
];

const secretariaMembers = [
  {
    name: "Nombre1",
    role: "Secretaría Académica",
    image: "/placeholder.svg",
    bio: "Coordinadora de programas educativos y formación en tecnología.",
    social: {
      github: "https://github.com/anajimenez",
      linkedin: "https://linkedin.com/in/anajimenez",
      instagram: "https://instagram.com/anajimenez",
      email: "mailto:academic@cpf.com",
    },
  },
  {
    name: "Nombre2",
    role: "Secretaría de Comunicación",
    image: "/placeholder.svg",
    bio: "Responsable de la estrategia de comunicación y redes sociales del club.",
    social: {
      github: "https://github.com/rodrigolopez",
      linkedin: "https://linkedin.com/in/rodrigolopez",
      instagram: "https://instagram.com/rodrigolopez",
      email: "mailto:communication@cpf.com",
    },
  },
  {
    name: "Nombre3",
    role: "Secretaría de Eventos",
    image: "/placeholder.svg",
    bio: "Organizadora de hackathones, talleres y conferencias tecnológicas.",
    social: {
      github: "https://github.com/gabrielamendez",
      linkedin: "https://linkedin.com/in/gabrielamendez",
      instagram: "https://instagram.com/gabrielamendez",
      email: "mailto:events@cpf.com",
    },
  },
  {
    name: "Nombre4",
    role: "Secretaría de Proyectos",
    image: "/placeholder.svg",
    bio: "Líder de iniciativas de desarrollo de software y proyectos tecnológicos.",
    social: {
      github: "https://github.com/diegotorres",
      linkedin: "https://linkedin.com/in/diegotorres",
      instagram: "https://instagram.com/diegotorres",
      email: "mailto:projects@cpf.com",
    },
  },
];

const TeamMembers = () => {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Nuestra <span className="gradient-text">Comisión Directiva</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
            >
              <div className="glass-card overflow-hidden hover:shadow-neon-blue transition-all duration-300 h-full flex flex-col">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 py-8">
                  <div className="h-28 w-28 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/10">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                  <p className="text-muted-foreground text-center">{member.role}</p>
                </div>
                
                <div className="p-6 flex-grow">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
                
                <div className="p-4 flex justify-center gap-4 border-t border-border">
                  <a href={member.social.instagram} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.github} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={member.social.email} className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-12 mt-20 text-center">
          Nuestras <span className="gradient-text">Secretarías</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {secretariaMembers.map((member, index) => (
            <div 
              key={member.name}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
            >
              <div className="glass-card overflow-hidden hover:shadow-neon-blue transition-all duration-300 h-full flex flex-col">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 py-8">
                  <div className="h-28 w-28 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/10">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                  <p className="text-muted-foreground text-center">{member.role}</p>
                </div>
                
                <div className="p-6 flex-grow">
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
                
                <div className="p-4 flex justify-center gap-4 border-t border-border">
                  <a href={member.social.instagram} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.github} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={member.social.email} className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
