import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Users, BookOpen, Star, Award, 
  Code, GraduationCap, Heart, Lightbulb, Handshake, 
  MessageSquare, Trophy, Globe 
} from "lucide-react";

const timelineEvents = [
	{
		year: "2017",
		title: "Fundación del Club",
		description:
			"Inspirados por modelos de universidades extranjeras, Marcos Villalba, Paolo Bello y José Benítez proponen crear Clubes temáticos en la FIUNA. El 9 de abril se funda oficialmente el Club de Programación y el 11 de abril se realiza la primera reunión, marcando el inicio de nuestra misión de promover la cultura de la programación.",
		icon: Users,
		image: "/images/timeline/cpf-2017.jpg",
	},
	{
		year: "2018",
		title: "Primeras Actividades",
		description:
			"El Club inicia sus primeras actividades y talleres, estableciéndose como espacio abierto para estudiantes. Se organizan cursos de Godot, Java y POO, participa en IEEEXtreme e Intercoding UCA, colabora con DTICS en la creación del sistema de evaluación docente y colabora en la organización de la segunda edición de FIUNA TECH DAY.",
		icon: Code,
		image: "/images/timeline/cpf-2018.jpg",
	},
	{
		year: "2019",
		title: "Expansión y Crecimiento",
		description:
			"El Club crece significativamente, superando los 50 miembros activos y formando alianzas con empresas tecnológicas locales. Se consolida el reconocimiento dentro de la comunidad universitaria, ofreciendo talleres introductorios y actividades colaborativas que generan vínculos entre estudiantes de diversas carreras.",
		icon: GraduationCap,
		image: "/images/timeline/cpf-2019.jpg",
	},
	{
		year: "2020",
		title: "Adaptación Virtual",
		description:
			"Con el impacto de la pandemia, el Club migra sus actividades al entorno virtual y se reorganiza por áreas temáticas. Se organizan charlas y encuentros en línea, manteniendo el espíritu de colaboración. Aunque COVID-19 detiene varias iniciativas y varios miembros migran al ámbito laboral, se retoman los refuerzos de Computación al reanudarse las clases.",
		icon: BookOpen,
		image: "/images/timeline/cpf-2020.png",
	},
	{
		year: "2021",
		title: "Recuperación y Reorganización",
		description:
			"El Club continúa desarrollando espacios de formación y participación, adaptándose al nuevo contexto postpandemia. Se sientan las bases para una etapa de renovación estructural y organizativa que permitirá el crecimiento futuro.",
		icon: Star,
		image: "/images/timeline/cpf-2021.jpg",
	},
	{
		year: "2022",
		title: "Renovación y Expansión",
		description:
			"El Club se transforma con nuevo logo, presencia digital y equipo de marketing, trabajando en recuperar la actividad tras la pandemia. Se continúa con cursos y tutorías, se reactivan espacios presenciales como las salas R y se participa en eventos clave como TIGO Campus Party e IEEExtreme, sentando las bases para una renovación estructural y organizativa.",
		icon: Award,
		image: "/images/timeline/cpf-2022.jpg",
	},
	{
		year: "2023",
		title: "Transición a una nueva época",
		description:
			"El CPF se consolida como referente en la facultad y continúa participando en eventos tecnológicos relevantes, manteniendo una agenda activa de formación. Se imparten cursos de Git y GitHub y se fortalecen los lazos con IEEE. A pesar de atravesar una fase de transición interna, el impacto de los esfuerzos previos sigue beneficiando a la comunidad.",
		icon: Users,
		image: "/images/timeline/cpf-2023.jpg",
	},
	{
		year: "2024",
		title: "Modernización Digital",
		description:
			"El Club entra en una pausa estratégica para enfocarse en el refuerzo de su identidad digital, modernización de las redes sociales y la creación de una nueva página web. Durante este período se incrementa la participación en eventos tecnológicos y se impulsa el desarrollo de proyectos innovadores, sentando las bases para una nueva era de crecimiento.",
		icon: Lightbulb,
		image: "/images/timeline/cpf-2025.png",
	},
	{
		year: "2025",
		title: "Visión de Futuro",
		description:
			"Se proyecta expandir la influencia del Club más allá de los límites universitarios, estableciendo conexiones con empresas, startups y organizaciones tecnológicas para crear un ecosistema digital robusto que impulse la innovación y beneficie a toda la comunidad paraguaya, contribuyendo al desarrollo tecnológico del país.",
		icon: Star,
		image: "/images/timeline/cpf-2025.jpg",
	},
];

const Timeline = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const timelineRef = useRef<HTMLDivElement>(null);
	const [autoScrollPaused, setAutoScrollPaused] = useState(false);
	const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

	const scrollToEvent = useCallback(
		(index: number, userInitiated = false) => {
			if (index >= 0 && index < timelineEvents.length) {
				setActiveIndex(index);

				// If user initiated, pause auto-scrolling
				if (userInitiated) {
					setAutoScrollPaused(true);

					// Clear any existing timer
					if (autoScrollTimerRef.current) {
						clearTimeout(autoScrollTimerRef.current);
					}

					// Resume auto-scrolling after 10 seconds
					autoScrollTimerRef.current = setTimeout(() => {
						setAutoScrollPaused(false);
					}, 10000);
				}
			}
		},
		[] // Removed timelineEvents.length as it's a constant
	);

	const nextEvent = useCallback(() => {
		if (activeIndex < timelineEvents.length - 1) {
			scrollToEvent(activeIndex + 1, true);
		} else {
			// Loop back to the first event
			scrollToEvent(0, true);
		}
	}, [activeIndex, scrollToEvent]); // Removed timelineEvents.length

	const prevEvent = useCallback(() => {
		if (activeIndex > 0) {
			scrollToEvent(activeIndex - 1, true);
		} else {
			// Loop to the last event
			scrollToEvent(timelineEvents.length - 1, true);
		}
	}, [activeIndex, scrollToEvent]); // Removed timelineEvents.length

	// Auto-scroll effect
	useEffect(() => {
		let autoScrollInterval: NodeJS.Timeout;

		if (!autoScrollPaused) {
			autoScrollInterval = setInterval(() => {
				const nextIndex = (activeIndex + 1) % timelineEvents.length;
				scrollToEvent(nextIndex);
			}, 5000); // Change slide every 5 seconds
		}

		return () => {
			clearInterval(autoScrollInterval);
		};
	}, [activeIndex, autoScrollPaused, scrollToEvent]); // Added scrollToEvent

	// Keyboard navigation effect
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") {
				nextEvent();
			} else if (e.key === "ArrowLeft") {
				prevEvent();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [activeIndex, nextEvent, prevEvent]);

	// Cleanup timers on component unmount
	useEffect(() => {
		return () => {
			if (autoScrollTimerRef.current) {
				clearTimeout(autoScrollTimerRef.current);
			}
		};
	}, []);

	return (
		<section className="py-20 px-6 relative overflow-hidden">
			<div className="absolute inset-0 bg-transparent z-0"></div>

			<div className="container mx-auto max-w-6xl relative z-10">
				<h2 className="text-3xl font-bold mb-16 text-center">
					Nuestra{" "}
					<span className="gradient-text">Historia</span>
				</h2>

				<div className="flex justify-center items-center gap-4 mb-6 sm:mb-12">
					<button
						onClick={prevEvent}
						className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all"
						aria-label="Evento anterior"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>

					<span className="text-xl font-medium">
						{timelineEvents[activeIndex].year}
					</span>

					<button
						onClick={nextEvent}
						className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all"
						aria-label="Siguiente evento"
					>
						<ChevronRight className="h-6 w-6" />
					</button>
				</div>

				{/* Timeline Line with Year Indicators - Hidden on small screens */}
				<div className="hidden sm:block relative h-1 bg-muted/50 dark:bg-muted/30 rounded-full mb-16">
					<div
						className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
						style={{
							width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%`,
						}}
					></div>

					{timelineEvents.map((event, index) => (
						<div
							key={event.year}
							className="absolute flex flex-col items-center cursor-pointer"
							style={{
								left: `${(index / (timelineEvents.length - 1)) * 100}%`,
								transform: "translateX(-50%)",
								top: "-6px",
							}}
							onClick={() => scrollToEvent(index, true)}
						>
							<div
								className={`h-4 w-4 rounded-full transition-all duration-300 ${
									index <= activeIndex ? "bg-primary" : "bg-muted"
								} ${index === activeIndex ? "scale-150" : "scale-100"}`}
								aria-label={`Ver evento de ${event.year}`}
							></div>
							<span
								className={`text-xs font-medium mt-4 transition-all ${
									index === activeIndex
										? "text-primary scale-110"
										: "text-muted-foreground hover:text-primary"
								}`}
							>
								{event.year}
							</span>
						</div>
					))}
				</div>

				{/* Special mobile-only spacer - Visible only on small screens */}
				<div className="block sm:hidden h-8"></div>

				{/* Timeline Events */}
				<div
					ref={timelineRef}
					className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
				>
					<div className="order-2 md:order-1">
						<div className="glass-card-static p-8 timeline-event">
							<div className="flex items-center gap-3 mb-4">
								<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
									{React.createElement(
										timelineEvents[activeIndex].icon,
										{ className: "h-5 w-5" }
									)}
								</div>
								<div>
									<h3 className="text-xl font-semibold">
										{timelineEvents[activeIndex].title}
									</h3>
									<p className="text-muted-foreground text-sm">
										{timelineEvents[activeIndex].year}
									</p>
								</div>
							</div>
							<p className="text-muted-foreground">
								{timelineEvents[activeIndex].description}
							</p>
						</div>
					</div>

					<div className="order-1 md:order-2">
						<div className="glass-card-static overflow-hidden">
							<div className="bg-muted/20 dark:bg-black/30 aspect-video relative">
								{timelineEvents[activeIndex].image ? (
									<img
										src={timelineEvents[activeIndex].image}
										alt={timelineEvents[activeIndex].title}
										className="object-cover w-full h-full"
									/>
								) : (
									<Code className="h-16 w-16 text-muted-foreground/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Timeline;
