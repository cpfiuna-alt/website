
import React from "react";
import { Heart, Users, Lightbulb, HandHeart, Award, BookOpen, Target, MessageSquare } from "lucide-react";

interface ValueProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values = [
  {
    title: "Pasión",
    description: "Trabajamos con entusiasmo y dedicación, motivados por nuestro amor a la tecnología y la resolución de problemas.",
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Colaboración",
    description: "Creemos en el poder del trabajo en equipo y el intercambio de conocimientos para lograr objetivos comunes.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Innovación",
    description: "Buscamos constantemente nuevas ideas y soluciones creativas para enfrentar los desafíos tecnológicos actuales.",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
  },
  {
    title: "Inclusión",
    description: "Promovemos un ambiente diverso y accesible donde todas las voces son valoradas y respetadas.",
    icon: <HandHeart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Excelencia",
    description: "Nos esforzamos por alcanzar los más altos estándares de calidad en todo lo que hacemos.",
    icon: <Award className="h-6 w-6 text-primary" />,
  },
  {
    title: "Aprendizaje",
    description: "Valoramos el conocimiento y el crecimiento continuo, compartiendo lo que aprendemos con la comunidad.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "Perseverancia",
    description: "Mantenemos nuestra determinación frente a los desafíos, valorando el esfuerzo constante.",
    icon: <Target className="h-6 w-6 text-primary" />,
  },
  {
    title: "Comunicación",
    description: "Fomentamos el diálogo abierto y honesto, compartiendo ideas y conocimientos de manera clara y efectiva.",
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
  }
];

const ValueCard: React.FC<ValueProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-6 flex flex-col items-center text-center">
      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#94a3b8]">{description}</p>
    </div>
  );
};

const Values: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {values.map((value, index) => (
        <ValueCard key={index} {...value} />
      ))}
    </div>
  );
};

export default Values;
