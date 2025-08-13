
import { Link } from "react-router-dom";
import { ArrowRight, Code, Users, Lightbulb, BookOpen } from "lucide-react";

const AboutClub = () => {
  return (
    <section className="py-16 section-padding relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/4 dark:bg-primary/8 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Somos <span className="gradient-text">CPF</span>
            </h2>
            
            <p className="text-lg mb-6">
              El <strong>Club de Programación FIUNA</strong> nació en 2017 con el objetivo de crear
              un espacio de aprendizaje colaborativo para estudiantes interesados en el desarrollo de software
              y las tecnologías de la información.
            </p>
            
            <p className="text-lg mb-6"> {/*mb-6*/}
              Buscamos complementar la formación académica con experiencias prácticas,
              fomentando el trabajo en equipo, la resolución de problemas y el uso de
              tecnologías modernas que preparen a nuestros miembros para destacarse
              en el mundo profesional.
            </p>
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="aspect-square overflow-hidden rounded-lg transform translate-y-4">
              <img 
                src="/images/home/home-3.jpg"
                alt="Miembros del club en el Tigo Campus Party 2022" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform -translate-y-4">
              <img 
                src="images/home/home-7.jpg"
                alt="Revisando el código de un proyecto en equipo" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform translate-y-6">
              <img 
                src="/images/home/home-0.jpg"
                alt="VR en el Tigo Campus Party" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform -translate-y-6">
              <img 
                src="images/home/home-6.jpg"
                alt="Taller de programación en el Tigo Campus Party" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
