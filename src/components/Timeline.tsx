
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Slider } from "@/components/ui/slider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Trophy, Flag, Users, Award, Rocket, BookOpen, Code, Sparkles } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2017",
    title: "Fundación del Club",
    description: "Creación del Club de Programación FIUNA por un grupo de estudiantes entusiastas de la carrera de Ingeniería Informática que buscaban complementar su educación formal con actividades prácticas y colaborativas. Durante los primeros meses, se establecieron las bases y objetivos del club, iniciando con pequeñas reuniones semanales de programación. Los fundadores trabajaron intensamente para definir la estructura organizativa, establecer los primeros proyectos y atraer más miembros interesados en el desarrollo de software y la tecnología.",
    icon: <Flag className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
  },
  {
    year: "2018",
    title: "Primer Hackathon",
    description: "Organización del primer hackathon interno con la participación de 50 estudiantes de diversas carreras de ingeniería. El evento duró 24 horas y se enfocó en desarrollar soluciones para mejorar la vida estudiantil en el campus. Los proyectos ganadores recibieron apoyo para su implementación a través de una colaboración con el Centro de Estudiantes. Este evento marcó un hito importante al establecer al Club como un organizador de actividades tecnológicas de alto impacto dentro de la facultad, atrayendo la atención de estudiantes y profesores de diferentes disciplinas.",
    icon: <Code className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070"
  },
  {
    year: "2019",
    title: "Reconocimiento Oficial",
    description: "El club es reconocido oficialmente por la Facultad de Ingeniería UNA, lo que permitió acceder a recursos institucionales, espacios físicos para reuniones y talleres, y mayor visibilidad dentro de la comunidad universitaria. Este reconocimiento también facilitó la creación de convenios con empresas tecnológicas nacionales interesadas en el talento estudiantil. A partir de este momento, el Club empezó a recibir un pequeño presupuesto anual para sus actividades y el respaldo institucional necesario para representar a la facultad en eventos interuniversitarios de programación y tecnología a nivel nacional.",
    icon: <Award className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070"
  },
  {
    year: "2020",
    title: "Adaptación Virtual",
    description: "Transformación de todas las actividades a formato virtual durante la pandemia. Se implementaron talleres en línea, competencias de programación remotas y sesiones de mentoría virtual. La situación desafiante se convirtió en una oportunidad para ampliar el alcance del club, permitiendo la participación de estudiantes que normalmente no podían asistir a eventos presenciales. Los webinars organizados por el club sobre tecnologías emergentes y desarrollo de software tuvieron una asistencia récord, con participantes no solo de la FIUNA sino también de otras universidades nacionales e incluso de países vecinos.",
    icon: <Users className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1603383928972-2116518cd3f3?q=80&w=2062"
  },
  {
    year: "2021",
    title: "Alianzas Estratégicas",
    description: "Establecimiento de alianzas con empresas tecnológicas locales como Roshka, Sodep y Penguin, que comenzaron a ofrecer pasantías exclusivas para miembros del club. Estas alianzas también incluyeron talleres especializados impartidos por profesionales de la industria, dotando a los estudiantes de conocimientos prácticos sobre las tecnologías más demandadas en el mercado laboral paraguayo. Las empresas aliadas también empezaron a proponer problemas reales para que los miembros del club desarrollaran soluciones como parte de proyectos académicos, creando un vínculo directo entre la formación universitaria y las necesidades del sector productivo.",
    icon: <Trophy className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032"
  },
  {
    year: "2022",
    title: "Expansión Regional",
    description: "Primeras colaboraciones con clubes de programación de universidades de la región como la Universidad de Buenos Aires (UBA) y la Universidad de São Paulo (USP). Se organizaron competencias interuniversitarias y se estableció un programa de intercambio de conocimientos a través de conferencias virtuales mensuales donde estudiantes de diferentes países compartían proyectos e investigaciones. Esta expansión regional dio a los miembros del club una perspectiva más amplia sobre el desarrollo tecnológico en Latinoamérica y fortaleció lazos académicos que más tarde se convertirían en oportunidades de investigación colaborativa y proyectos conjuntos.",
    icon: <Rocket className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
  },
  {
    year: "2023",
    title: "Hackathon Internacional",
    description: "Organización del primer hackathon con participantes de varios países de Latinoamérica, enfocado en soluciones tecnológicas para desafíos sociales regionales. El evento contó con más de 200 participantes de 8 países diferentes y fue patrocinado por importantes empresas tecnológicas internacionales. Los proyectos ganadores recibieron financiamiento para continuar su desarrollo. El impacto de este evento trascendió lo académico, ya que varias de las soluciones presentadas fueron posteriormente implementadas por ONGs y entidades gubernamentales para abordar problemas reales en comunidades vulnerables de la región.",
    icon: <Calendar className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070"
  },
  {
    year: "2024",
    title: "Nueva Plataforma Web",
    description: "Lanzamiento de la nueva plataforma web con recursos educativos, registro de eventos, y una comunidad en línea para facilitar la colaboración entre miembros. Esta plataforma incluye cursos desarrollados por estudiantes avanzados, repositorios de proyectos open source, y un sistema de mentoría que conecta a estudiantes nuevos con miembros experimentados del club. El desarrollo de la plataforma fue un proyecto colaborativo que involucró a más de 20 miembros del club, aplicando metodologías ágiles y las mejores prácticas de desarrollo de software, convirtiéndose en sí mismo en una valiosa experiencia de aprendizaje.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070"
  },
  {
    year: "2025",
    title: "Centro de Innovación",
    description: "Inauguración del Centro de Innovación Tecnológica del Club, un espacio físico dedicado dentro de la facultad con equipamiento especializado para desarrollo, prototipado y testeo de proyectos. Este centro incluye un laboratorio de hardware, estaciones de trabajo avanzadas, equipos de realidad virtual y un área de coworking. El centro se ha convertido en un punto focal para la innovación estudiantil, atrayendo colaboraciones con otras facultades e instituciones interesadas en el desarrollo tecnológico y la implementación de soluciones basadas en software a problemas complejos.",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
  },
];

export const Timeline: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSliderChange = (value: number[]) => {
    setCurrentIndex(value[0]);
  };

  const currentEvent = timelineEvents[currentIndex];

  return (
    <div className="glass-card p-8 rounded-xl" ref={ref}>
      <div className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}>
        <div className="mb-8">
          <Slider 
            value={[currentIndex]} 
            max={timelineEvents.length - 1} 
            step={1} 
            onValueChange={handleSliderChange}
            className="my-6"
          />
          
          <div className="flex justify-between text-xs text-[#94a3b8] overflow-x-auto pb-2">
            {timelineEvents.map((event, index) => (
              <span 
                key={index}
                className={`cursor-pointer whitespace-nowrap px-1 ${index === currentIndex ? 'text-primary font-bold' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                {event.year}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* On mobile: Image first, then info */}
          <div className="glass-card overflow-hidden rounded-xl md:order-2 order-1">
            <AspectRatio ratio={16/9}>
              <img 
                src={currentEvent.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"} 
                alt={currentEvent.title} 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          
          <div className="glass-card p-6 flex flex-col md:order-1 order-2">
            <div className="flex items-center mb-3">
              <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                {currentEvent.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gradient">
                  {currentEvent.title}
                </h3>
                <p className="text-primary font-medium text-sm">{currentEvent.year}</p>
              </div>
            </div>
            <p className="text-[#94a3b8]">{currentEvent.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TimelineItem: React.FC<{
  year: string;
  title: string;
  children: React.ReactNode;
}> = () => null; // This component is kept for backward compatibility but not used anymore
