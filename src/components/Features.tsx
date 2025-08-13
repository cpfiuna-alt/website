
import React from "react";
import { Code, Users, Lightbulb, Rocket, BookOpen, Award } from "lucide-react";

const features = [
  {
    title: "Aprendizaje Colaborativo",
    description:
      "Comparte conocimientos y aprende junto a otros estudiantes apasionados por la programación.",
    icon: Users,
  },
  {
    title: "Proyectos Prácticos",
    description:
      "Participa en proyectos reales que te ayudarán a mejorar tus habilidades de programación.",
    icon: Code,
  },
  {
    title: "Talleres y Workshops",
    description:
      "Asiste a talleres sobre las últimas tecnologías y metodologías de desarrollo.",
    icon: Lightbulb,
  },
  {
    title: "Hackathons",
    description:
      "Compite en hackathons internos y externos para poner a prueba tus habilidades.",
    icon: Rocket,
  },
  {
    title: "Recursos de Aprendizaje",
    description:
      "Accede a material educativo exclusivo y rutas de aprendizaje personalizadas.",
    icon: BookOpen,
  },
  {
    title: "Certificaciones",
    description:
      "Obtén certificados que validen tus conocimientos y mejoren tu currículum.",
    icon: Award,
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-secondary/50 dark:bg-gray-900/50">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Beneficios</span> del Club
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ser parte del Club de Programación FIUNA te brinda múltiples
            ventajas para tu desarrollo académico y profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:translate-y-[-5px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
