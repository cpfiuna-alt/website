
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Calendar, 
  Code, 
  User, 
  Users,
  Tag,
  Star,
  GitFork,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";

// Sample project data (in a real app, this would come from an API/PayloadCMS)
const project = {
  id: "1",
  title: "Sistema de Gestión Académica",
  slug: "sistema-gestion-academica",
  repoUrl: "https://github.com/cpfiuna/academic-management",
  demoUrl: "https://academic.cpf.com.py",
  starCount: 45,
  forkCount: 18,
  issueCount: 7,
  status: "in-progress", // in-progress, completed, on-hold
  createdAt: new Date("2023-03-15"),
  updatedAt: new Date("2023-10-25"),
  tags: ["React", "Node.js", "MongoDB", "Express", "Education"],
  contributors: [
    {
      name: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      role: "Front-end Lead",
      githubUrl: "#"
    },
    {
      name: "Juan Pérez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      role: "Back-end Developer",
      githubUrl: "#"
    },
    {
      name: "Carlos Gómez",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      role: "DevOps Engineer",
      githubUrl: "#"
    },
    {
      name: "Sofía Vega",
      avatar: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      role: "UX/UI Designer",
      githubUrl: "#"
    }
  ],
  description: `
    <h2>Descripción del proyecto</h2>
    <p>El Sistema de Gestión Académica es una aplicación web desarrollada para instituciones educativas que facilita la administración de cursos, estudiantes, profesores y calificaciones. Este proyecto surge como respuesta a la necesidad de digitalizar y optimizar los procesos académicos en la Facultad de Ingeniería.</p>
    
    <p>La plataforma permite:</p>
    <ul>
      <li>Gestión de estudiantes y profesores</li>
      <li>Administración de cursos y mallas curriculares</li>
      <li>Registro y cálculo de calificaciones</li>
      <li>Generación de reportes académicos</li>
      <li>Comunicación entre estudiantes y profesores</li>
      <li>Calendario de eventos y actividades académicas</li>
    </ul>
    
    <h2>Tecnologías utilizadas</h2>
    <p>Este proyecto ha sido desarrollado utilizando el stack MERN:</p>
    <ul>
      <li><strong>MongoDB:</strong> Base de datos NoSQL para almacenar la información de estudiantes, cursos y calificaciones.</li>
      <li><strong>Express:</strong> Framework de Node.js para la creación de la API REST.</li>
      <li><strong>React:</strong> Biblioteca de JavaScript para la construcción de la interfaz de usuario.</li>
      <li><strong>Node.js:</strong> Entorno de ejecución para JavaScript en el servidor.</li>
    </ul>
    
    <p>Además, se han utilizado las siguientes tecnologías y herramientas:</p>
    <ul>
      <li>JWT para la autenticación y autorización</li>
      <li>Redux para la gestión del estado global</li>
      <li>Tailwind CSS para el diseño responsive</li>
      <li>Jest y React Testing Library para pruebas</li>
      <li>GitHub Actions para CI/CD</li>
      <li>Docker para la contenerización de la aplicación</li>
    </ul>
    
    <h2>Características principales</h2>
    
    <h3>Panel de administración</h3>
    <p>Interfaz intuitiva para la gestión de usuarios, cursos y recursos académicos. Los administradores pueden:</p>
    <ul>
      <li>Crear y modificar perfiles de usuarios (estudiantes, profesores, administrativos)</li>
      <li>Gestionar la estructura académica (facultades, carreras, cursos)</li>
      <li>Asignar profesores a cursos</li>
      <li>Generar reportes estadísticos</li>
    </ul>
    
    <h3>Portal del estudiante</h3>
    <p>Espacio personalizado donde los estudiantes pueden:</p>
    <ul>
      <li>Consultar su horario de clases</li>
      <li>Ver sus calificaciones y progreso académico</li>
      <li>Descargar recursos de los cursos</li>
      <li>Comunicarse con profesores y compañeros</li>
      <li>Recibir notificaciones importantes</li>
    </ul>
    
    <h3>Portal del profesor</h3>
    <p>Herramientas para que los profesores puedan:</p>
    <ul>
      <li>Registrar asistencia</li>
      <li>Cargar y evaluar actividades</li>
      <li>Comunicarse con los estudiantes</li>
      <li>Compartir recursos y materiales de estudio</li>
      <li>Visualizar estadísticas de rendimiento</li>
    </ul>
    
    <h2>Estado actual y próximos pasos</h2>
    <p>Actualmente, el proyecto se encuentra en fase de desarrollo activo, con las siguientes funcionalidades ya implementadas:</p>
    <ul>
      <li>Autenticación y gestión de usuarios ✅</li>
      <li>Administración de cursos y mallas curriculares ✅</li>
      <li>Registro de calificaciones ✅</li>
      <li>Generación de reportes básicos ✅</li>
    </ul>
    
    <p>Los próximos objetivos incluyen:</p>
    <ul>
      <li>Implementación del módulo de comunicación interna</li>
      <li>Desarrollo de una aplicación móvil complementaria</li>
      <li>Integración con sistemas de videoconferencia</li>
      <li>Ampliación de las capacidades de análisis de datos académicos</li>
    </ul>
    
    <h2>Cómo contribuir</h2>
    <p>Este proyecto es de código abierto y está abierto a contribuciones. Si estás interesado en participar, puedes hacerlo de las siguientes maneras:</p>
    <ul>
      <li>Reportando bugs o solicitando nuevas características a través de issues en GitHub</li>
      <li>Solucionando issues existentes</li>
      <li>Mejorando la documentación</li>
      <li>Realizando pruebas y aportando feedback</li>
    </ul>
    
    <p>Para contribuir con código, sigue estos pasos:</p>
    <ol>
      <li>Haz un fork del repositorio</li>
      <li>Crea una rama para tu contribución: <code>git checkout -b feature/nueva-funcionalidad</code></li>
      <li>Haz tus cambios y realiza commits: <code>git commit -m 'Añade nueva funcionalidad'</code></li>
      <li>Envía tu rama al repositorio: <code>git push origin feature/nueva-funcionalidad</code></li>
      <li>Crea un Pull Request</li>
    </ol>
    
    <p>Todas las contribuciones serán revisadas por los mantenedores del proyecto. Agradecemos cualquier tipo de ayuda para mejorar este sistema.</p>
  `,
  screenshots: [
    {
      id: "1",
      title: "Dashboard de administrador",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "2",
      title: "Portal del estudiante",
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "3",
      title: "Registro de calificaciones",
      url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "4",
      title: "Calendario académico",
      url: "https://images.unsplash.com/photo-1606327054629-64c8b0fd6e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
  relatedProjects: [
    {
      id: "2",
      title: "Plataforma de Aprendizaje Online",
      slug: "plataforma-aprendizaje-online",
      coverImage: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["Vue.js", "Express", "PostgreSQL"]
    },
    {
      id: "3",
      title: "App de Monitoreo de Salud",
      slug: "app-monitoreo-salud",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["Flutter", "Firebase"]
    },
    {
      id: "4",
      title: "Bot Asistente para Discord",
      slug: "bot-asistente-discord",
      coverImage: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["JavaScript", "Discord.js"]
    }
  ]
};

const ProjectDetail = () => {
  // In a real app, we would fetch the project based on the slug
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = `${project.title} | Club de Programación FIUNA`;
  }, []);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "in-progress":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400">
            En desarrollo
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500 dark:bg-green-500/10 dark:text-green-400">
            Completado
          </span>
        );
      case "on-hold":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-500 dark:bg-gray-500/10 dark:text-gray-400">
            En pausa
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <article className="relative py-12 md:py-20">
        {/* Back to projects button */}
        <div className="container mx-auto px-6 mb-8">
          <Link 
            to="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a proyectos
          </Link>
        </div>
        
        {/* Project header */}
        <div className="container mx-auto px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              <StatusBadge status={project.status} />
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Actualizado el {format(project.updatedAt, "dd/MM/yyyy")}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-muted/70 hover:bg-muted transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <a 
                href={project.repoUrl}
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Ver repositorio
              </a>
              
              <a 
                href={project.demoUrl}
                className="inline-flex items-center px-4 py-2 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:bg-primary/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver demo
              </a>
            </div>
            
            <div className="flex space-x-6 mb-12">
              <div className="flex items-center text-sm">
                <Star className="mr-1 h-4 w-4 text-amber-500" />
                <span>{project.starCount} estrellas</span>
              </div>
              
              <div className="flex items-center text-sm">
                <GitFork className="mr-1 h-4 w-4 text-primary" />
                <span>{project.forkCount} forks</span>
              </div>
              
              <div className="flex items-center text-sm">
                <MessageSquare className="mr-1 h-4 w-4 text-green-500" />
                <span>{project.issueCount} issues</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project screenshots */}
        <div className="container mx-auto px-6 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.screenshots.map((screenshot) => (
                <div key={screenshot.id} className="rounded-xl overflow-hidden group cursor-pointer">
                  <img 
                    src={screenshot.url} 
                    alt={screenshot.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Project content */}
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="bg-muted/30 rounded-xl p-6 mb-8 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Equipo del proyecto</h3>
                
                <div className="space-y-4">
                  {project.contributors.map((contributor) => (
                    <div key={contributor.name} className="flex items-center">
                      <img 
                        src={contributor.avatar} 
                        alt={contributor.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <div className="font-medium">{contributor.name}</div>
                        <div className="text-xs text-muted-foreground">{contributor.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold mb-4">Proyectos relacionados</h3>
                  
                  <div className="space-y-4">
                    {project.relatedProjects.map((relatedProject) => (
                      <Link 
                        key={relatedProject.id}
                        to={`/projects/${relatedProject.slug}`}
                        className="block group"
                      >
                        <div className="flex items-start space-x-3">
                          <img 
                            src={relatedProject.coverImage} 
                            alt={relatedProject.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium group-hover:text-primary transition-colors">
                              {relatedProject.title}
                            </h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {relatedProject.tags.slice(0, 2).map((tag) => (
                                <span 
                                  key={tag}
                                  className="inline-block px-2 py-0.5 bg-muted/50 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
