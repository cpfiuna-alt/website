
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, BookOpen, ChevronRight, Award, FileCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample course data (in a real app, this would come from an API)
const course = {
  id: 1,
  title: "Introducción a Python",
  slug: "introduccion-python",
  description: "Aprendé los fundamentos de Python desde cero. Curso básico para principiantes sin experiencia previa en programación.",
  longDescription: "Este curso está diseñado para quienes quieren iniciarse en el mundo de la programación utilizando Python, uno de los lenguajes más populares y versátiles en la actualidad. A través de explicaciones claras y ejercicios prácticos, irás construyendo una base sólida en programación que te permitirá avanzar hacia temas más complejos.",
  level: "Principiante",
  duration: "6 semanas",
  sessions: 12,
  hoursPerWeek: 4,
  totalHours: 24,
  instructor: {
    name: "Prof. Ana González",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Ingeniera en Informática con más de 8 años de experiencia enseñando Python. Especialista en educación tecnológica y divulgación científica.",
  },
  image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  tags: ["Python", "Programación", "Básico"],
  startDate: new Date("2024-08-15"),
  endDate: new Date("2024-09-30"),
  schedule: "Martes y Jueves, 18:00 - 20:00",
  location: "Laboratorio de Informática, FIUNA",
  price: "Gratuito para miembros del Club",
  prerequisites: ["Ninguno, apto para principiantes absolutos"],
  syllabus: [
    {
      title: "Semana 1: Introducción a Python y configuración del entorno",
      topics: [
        "¿Qué es Python y por qué aprenderlo?",
        "Instalación de Python y entorno de desarrollo",
        "Primeros pasos: 'Hola Mundo'",
        "Variables y tipos de datos básicos"
      ]
    },
    {
      title: "Semana 2: Estructuras de control",
      topics: [
        "Operadores lógicos y de comparación",
        "Condicionales: if, elif, else",
        "Bucles: for y while",
        "Control de flujo con break y continue"
      ]
    },
    {
      title: "Semana 3: Estructuras de datos",
      topics: [
        "Listas y operaciones con listas",
        "Tuplas y sus características",
        "Diccionarios y conjuntos",
        "Métodos y funciones para manipular colecciones"
      ]
    },
    {
      title: "Semana 4: Funciones y módulos",
      topics: [
        "Definición y llamada de funciones",
        "Parámetros y valores de retorno",
        "Ámbito de variables",
        "Módulos y paquetes estándar"
      ]
    },
    {
      title: "Semana 5: Manejo de archivos y excepciones",
      topics: [
        "Lectura y escritura de archivos",
        "Formatos CSV y JSON",
        "Manejo de excepciones: try, except, finally",
        "Buenas prácticas en el manejo de errores"
      ]
    },
    {
      title: "Semana 6: Proyecto final",
      topics: [
        "Planificación y diseño del proyecto",
        "Implementación con las herramientas aprendidas",
        "Depuración y mejora del código",
        "Presentación y evaluación final"
      ]
    }
  ],
  resources: [
    {
      title: "Libro del curso",
      description: "Python Crash Course por Eric Matthes (versión digital disponible)",
      url: "#"
    },
    {
      title: "Entorno de desarrollo online",
      description: "Replit para practicar sin necesidad de instalaciones",
      url: "https://replit.com"
    },
    {
      title: "Documentación oficial de Python",
      description: "Referencia completa del lenguaje",
      url: "https://docs.python.org/es/3/"
    },
    {
      title: "Repositorio de ejercicios",
      description: "GitHub con todos los ejercicios y soluciones",
      url: "#"
    }
  ],
  projects: [
    {
      title: "Calculadora simple",
      description: "Implementación de operaciones básicas con interfaz de línea de comandos"
    },
    {
      title: "Gestor de tareas",
      description: "Aplicación para administrar una lista de tareas con almacenamiento en archivo"
    },
    {
      title: "Analizador de textos",
      description: "Herramienta que analiza la frecuencia de palabras en un texto"
    },
    {
      title: "Proyecto final personalizado",
      description: "Desarrollá un proyecto de libre elección aplicando lo aprendido"
    }
  ],
  faqs: [
    {
      question: "¿Necesito tener conocimientos previos de programación?",
      answer: "No, este curso está diseñado para principiantes absolutos. Comenzaremos desde cero."
    },
    {
      question: "¿Qué materiales necesito para participar?",
      answer: "Una computadora con conexión a internet es suficiente. Te guiaremos en la instalación del software necesario."
    },
    {
      question: "¿Habrá certificado al finalizar el curso?",
      answer: "Sí, recibirás un certificado de participación emitido por el Club de Programación FIUNA."
    },
    {
      question: "¿Qué hago si no puedo asistir a alguna clase?",
      answer: "Todas las clases serán grabadas y estarán disponibles en nuestra plataforma para miembros del club."
    }
  ]
};

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = `${course.title} | Club de Programación FIUNA`;
  }, []);

  return (
    <Layout>
      <article className="relative pt-24 pb-16">
        {/* Course Hero */}
        <div className="relative w-full bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 mb-12">
          <div className="container mx-auto px-6 py-12">
            {/* Back to courses button */}
            <Link 
              to="/resources"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a recursos
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                      {course.level}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {course.duration}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {course.title}
                  </h1>
                  
                  <p className="text-xl text-muted-foreground">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pt-2">
                    {course.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-sm bg-muted/70 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center mt-6 pt-6 border-t border-border">
                    <img 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium">{course.instructor.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass-card overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Duración</p>
                        <p className="font-medium">{course.totalHours} horas</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sesiones</p>
                        <p className="font-medium">{course.sessions} clases</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Horario</p>
                        <p className="font-medium">{course.hoursPerWeek} hrs/semana</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Precio</p>
                        <p className="font-medium">{course.price}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <a 
                        href="#" 
                        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue"
                      >
                        Inscribite al curso
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Descripción General</TabsTrigger>
              <TabsTrigger value="syllabus">Programa</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
              <TabsTrigger value="projects">Proyectos</TabsTrigger>
              <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2>Sobre este curso</h2>
                <p>{course.longDescription}</p>
                
                <h3>Lo que aprenderás</h3>
                <ul>
                  <li>Fundamentos de programación y pensamiento lógico</li>
                  <li>Sintaxis y estructuras básicas de Python</li>
                  <li>Manejo de estructuras de datos como listas, diccionarios y tuplas</li>
                  <li>Creación de funciones y módulos reutilizables</li>
                  <li>Lectura y escritura de archivos</li>
                  <li>Manejo de errores y excepciones</li>
                  <li>Desarrollo de pequeños proyectos prácticos</li>
                </ul>
                
                <h3>Requisitos previos</h3>
                <ul>
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
                
                <h3>Detalles logísticos</h3>
                <p><strong>Inicio:</strong> {course.startDate.toLocaleDateString()}</p>
                <p><strong>Finalización:</strong> {course.endDate.toLocaleDateString()}</p>
                <p><strong>Horario:</strong> {course.schedule}</p>
                <p><strong>Lugar:</strong> {course.location}</p>
              </div>
              
              <div className="bg-muted/30 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{course.instructor.name}</h3>
                    <p className="text-sm text-muted-foreground">Instructor/a</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {course.instructor.bio}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="syllabus" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Programa del curso</h2>
              
              <div className="space-y-6">
                {course.syllabus.map((week, weekIndex) => (
                  <div key={weekIndex} className="glass-card p-6">
                    <h3 className="text-lg font-medium mb-4">{week.title}</h3>
                    <ul className="space-y-2">
                      {week.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Recursos de aprendizaje</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.resources.map((resource, index) => (
                  <a 
                    key={index} 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-6 hover:shadow-neon-blue transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-3 mr-4">
                        <FileCode className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Proyectos prácticos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.projects.map((project, index) => (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-start">
                      <div className="rounded-full bg-primary/10 p-3 mr-4">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/30 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-medium mb-2">Metodología de proyectos</h3>
                <p>
                  Los proyectos están diseñados para aplicar lo aprendido en situaciones reales. 
                  Cada proyecto incluye especificaciones claras, recursos necesarios y criterios 
                  de evaluación. Trabajarás individualmente, con asesoría permanente del instructor.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
              
              <div className="space-y-4">
                {course.faqs.map((faq, index) => (
                  <div key={index} className="glass-card p-6">
                    <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6">
                <h3 className="text-lg font-medium mb-4">¿Tenés más preguntas?</h3>
                <p className="mb-4">
                  Si tenés dudas que no están cubiertas aquí, no dudes en contactarnos.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Contactanos
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </article>
    </Layout>
  );
};

export default CourseDetail;
