
import { Link } from "react-router-dom";
import { ArrowRight, Code, Users, Lightbulb, BookOpen } from "lucide-react";

const AboutClub = () => {
  return (
    <section className="py-16 section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Somos <span className="gradient-text">CPF</span>
            </h2>
            
            <p className="text-lg mb-6">
              El <strong>Club de Programación FIUNA</strong> nació en 2015 con el objetivo de crear
              un espacio de aprendizaje colaborativo para estudiantes interesados en el desarrollo de software
              y las tecnologías de la información.
            </p>
            
            <p className="mb-6">
              Buscamos complementar la formación académica con experiencias prácticas,
              fomentando el trabajo en equipo, la resolución de problemas y el uso de
              tecnologías modernas que preparen a nuestros miembros para destacarse
              en el mundo profesional.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Desarrollo</h3>
                  <p className="text-sm text-muted-foreground">Proyectos reales con impacto</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Comunidad</h3>
                  <p className="text-sm text-muted-foreground">Red de apoyo y colaboración</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Innovación</h3>
                  <p className="text-sm text-muted-foreground">Soluciones creativas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Formación</h3>
                  <p className="text-sm text-muted-foreground">Aprendizaje continuo</p>
                </div>
              </div>
            </div>
            
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
            >
              Conoce nuestra historia
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="aspect-square overflow-hidden rounded-lg transform translate-y-4">
              <img 
                src="/placeholder.svg" 
                alt="Miembros del club trabajando en proyectos" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform -translate-y-4">
              <img 
                src="/placeholder.svg" 
                alt="Evento de programación del club" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform -translate-y-6">
              <img 
                src="/placeholder.svg" 
                alt="Taller de programación" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg transform translate-y-6">
              <img 
                src="/placeholder.svg" 
                alt="Miembros del club en una competencia" 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
