
import React, { useState } from "react";
import { Trophy, Medal, Award, Star, GraduationCap, Flag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Sample data for achievements
const achievements = [
  {
    id: 7,
    title: "Semifinalistas de la aceleradora Moonshot de Ueno Bank",
    description: "Un proyecto de un equipo formado por miembros del Club fue seleccionado entre los 100 mejores proyectos para participar en la prestigiosa competencia y aceleradora de startups Moonshot de Ueno Bank.",
    icon: <Award  className="h-8 w-8 text-primary" />,
    year: 2025,
    category: "competition",
    link: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/acentauri/"
  },
  {
    id: 6,
    title: "Finalistas Globales en NASA Space Apps Challenge",
    description: "Miembros del CPF fueron seleccionados entre los 40 finalistas globales de la competencia con el proyecto 'Appsteroids'.",
    icon: <Award  className="h-8 w-8 text-primary" />,
    year: 2024,
    category: "competition",
    link: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/acentauri/"
  },
  {
    id: 5,
    title: "Primer Lugar Local en NASA Space Apps Challenge",
    description: "Miembros del CPF ganaron el primer lugar en la competencia local con el proyecto 'Appsteroids'.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    year: 2024,
    category: "competition",
    link: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/acentauri/"
  },
  {
    id: 4,
    title: "Primer lugar en la Hackathon Samsung Tigo Campus Party",
    description: "El equipo del CPF obtuvo el primer lugar en la Hackathon Samsung Tigo Campus Party.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    year: 2023,
    category: "competition",
    link: "#"
  },
  {
    id: 3,
    title: "Mención de Honor Local en NASA Space Apps Challenge",
    description: "Miembros del CPF recibieron una mención de honor en la competencia local con el proyecto 'Moonquake Visualizer'.",
    icon: <Award  className="h-8 w-8 text-primary" />,
    year: 2022,
    category: "competition",
    link: "#"
  },
  {
    id: 2,
    title: "Primer lugar en la Hackathon Samsung Tigo Campus Party",
    description: "El equipo del CPF obtuvo el primer lugar en la Hackathon Samsung Tigo Campus Party.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    year: 2021,
    category: "competition",
    link: "#"
  },
  {
    id: 1,
    title: "Primer lugar local en la Competencia IEEEXtreme 12.0",
    description: "El equipo del CPF obtuvo el primer lugar en la competencia IEEEXtreme a nivel nacional.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    year: 2018,
    category: "competition",
    link: "#"
  },
  {
    id: 0,
    title: "Primer lugar en el Intercoding de la Universidad Católica",
    description: "El equipo del CPF obtuvo el primer lugar en la competencia Intercoding UC.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    year: 2018,
    category: "competition",
    link: "#"
  },

  /*
  {
    id: 0,
    title: "Clasificados entre los 100 proyectos de Ueno Moonshot",
    description: "Un proyecto de un equipo formado por miembros del Club fue seleccionado entre los 100 mejores proyectos para participar en la prestigiosa incubadora de startups Moonshot de Ueno Bank.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    year: 2024,
    category: "competition",
    link: "https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/acentauri/"
  },
  {
    id: 92,
    title: "Participación en ICPC Sudamérica",
    description: "El equipo clasificó a las finales regionales del International Collegiate Programming Contest (ICPC) representando a Paraguay.",
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    year: 2022,
    category: "competition",
    link: "#"
  },
  {
    id: 93,
    title: "Reconocimiento de Google Developer Student Clubs",
    description: "El club fue reconocido por Google como uno de los mejores clubes de programación universitarios en Latinoamérica.",
    icon: <Award className="h-8 w-8 text-primary" />,
    year: 2023,
    category: "recognition",
    link: "#"
  },
  /*{
    id: 94,
    title: "Ganadores del NASA Space Apps Challenge",
    description: "El equipo de CPF ganó el desafío local del NASA Space Apps Challenge con el proyecto 'MoonQuake Visualizer'.",
    icon: <Trophy className="h-8 w-8 text-primary" />,
    year: 2022,
    category: "hackathon",
    link: "/#"
  },
  {
    id: 95,
    title: "GitHub Campus Expert",
    description: "Dos miembros del club fueron seleccionados como GitHub Campus Experts, representando a la universidad en eventos internacionales.",
    icon: <Star className="h-8 w-8 text-primary" />,
    year: 2023,
    category: "recognition",
    link: "/#"
  },
  {
    id: 96,
    title: "Medalla de oro en Olimpiada Paraguaya de Informática",
    description: "Estudiantes del club obtuvieron medallas de oro en la Olimpiada Nacional de Informática representando a la FIUNA.",
    icon: <Medal className="h-8 w-8 text-primary" />,
    year: 2021,
    category: "competition",
    link: "/#"
  },
  {
    id: 97,
    title: "Hackathon de Innovación Sostenible",
    description: "El equipo ganó el primer premio con una solución para monitoreo de calidad del agua usando IoT y machine learning.",
    icon: <Flag className="h-8 w-8 text-primary" />,
    year: 2023,
    category: "hackathon",
    link: "/#"
  },
  {
    id: 98,
    title: "Mejor Club Universitario",
    description: "Reconocimiento otorgado por el Ministerio de Tecnología como el mejor CPF universitario del país.",
    icon: <Award className="h-8 w-8 text-primary" />,
    year: 2022,
    category: "recognition",
    link: "/#"
  },*/
];

// Categories for filter
const categories = [
  { id: "all", label: "Todos" },
  { id: "competition", label: "Competencias" },
  { id: "hackathon", label: "Hackathons" },
  { id: "recognition", label: "Reconocimientos" }
];

const LogrosGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredAchievements = achievements.filter(
    achievement => activeCategory === "all" || achievement.category === activeCategory
  );

  return (
    <section className="py-20">
      <div className="container px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestros principales logros</h2>
        
        {/* Category filter 
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>*/}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAchievements.map((achievement) => (
            // <Link 
            //   key={achievement.id}
            //   to={achievement.link}
            //   className="glass-card p-6 hover:translate-y-[-5px] hover:shadow-neon-blue transition-all duration-300 group"
            // >
            <div 
              key={achievement.id}
              className="glass-card-static p-6 hover:shadow-neon-blue transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4">
                {achievement.icon}
              </div>
              <span className="text-sm font-medium text-muted-foreground block text-center">{achievement.year}</span>
              <h3 className="text-xl font-semibold mb-3 text-center">{achievement.title}</h3>
              {/*<p className="text-muted-foreground text-sm mb-4">{achievement.description}</p>*/}
              {/*<div className="text-primary text-sm font-medium flex items-center justify-center mt-auto group-hover:underline">
                Ver más <ArrowRight className="ml-1 h-4 w-4" />
              </div>*/}
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogrosGrid;
