
import React from "react";
import { ProjectFrontMatter } from "@/utils/markdownUtils";
import MarkdownContent from "@/components/markdown/MarkdownContent";

interface ProjectDetailContentProps {
  project: ProjectFrontMatter & { content: string };
}

const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project }) => {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h2 className="text-2xl font-bold mb-4">Descripción del proyecto</h2>
      <p className="mb-6">{project.description}</p>
      
      {/* Render markdown content using MarkdownContent component */}
      {project.content && (
        <MarkdownContent content={project.content} />
      )}
      
      {/* Fallback content sections if no markdown content */}
      {!project.content && (
        <div className="space-y-10">
          {/* Overview section */}
          <section>
            <h3 className="text-xl font-bold mb-4">Resumen del proyecto</h3>
            <p>
              {project.description}
            </p>
          </section>
          
          {/* Key Features section */}
          <section>
            <h3 className="text-xl font-bold mb-4">Características principales</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestión de estudiantes y profesores</li>
              <li>Administración de cursos y mallas curriculares</li>
              <li>Registro y cálculo de calificaciones</li>
              <li>Generación de reportes académicos</li>
              <li>Comunicación entre estudiantes y profesores</li>
              <li>Calendario de eventos y actividades académicas</li>
            </ul>
          </section>
          
          {/* Technologies Used section */}
          <section>
            <h3 className="text-xl font-bold mb-4">Tecnologías utilizadas</h3>
            <p className="mb-3">Este proyecto ha sido desarrollado utilizando el stack MERN:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>MongoDB:</strong> Base de datos NoSQL para almacenar la información de estudiantes, cursos y calificaciones.</li>
              <li><strong>Express:</strong> Framework de Node.js para la creación de la API REST.</li>
              <li><strong>React:</strong> Biblioteca de JavaScript para la construcción de la interfaz de usuario.</li>
              <li><strong>Node.js:</strong> Entorno de ejecución para JavaScript en el servidor.</li>
            </ul>
            <p className="mt-3">Además, se han utilizado las siguientes tecnologías y herramientas:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>JWT para la autenticación y autorización</li>
              <li>Redux para la gestión del estado global</li>
              <li>Tailwind CSS para el diseño responsive</li>
              <li>Jest y React Testing Library para pruebas</li>
              <li>GitHub Actions para CI/CD</li>
              <li>Docker para la contenerización de la aplicación</li>
            </ul>
          </section>
          
          {/* Challenges and Engineering Solutions section */}
          <section>
            <h3 className="text-xl font-bold mb-4">Desafíos y soluciones de ingeniería</h3>
            <p className="mb-3">Durante el desarrollo del proyecto, nos enfrentamos a varios desafíos técnicos:</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Gestión de permisos y roles</h4>
                <p>Implementamos un sistema de autorización basado en JWT con control granular de acceso que permite definir permisos específicos para diferentes tipos de usuarios.</p>
              </div>
              <div>
                <h4 className="font-bold">Rendimiento con grandes volúmenes de datos</h4>
                <p>Optimizamos las consultas a la base de datos utilizando índices compuestos y agregaciones en MongoDB, logrando tiempos de respuesta rápidos incluso con miles de registros.</p>
              </div>
              <div>
                <h4 className="font-bold">Integración con sistemas existentes</h4>
                <p>Desarrollamos una capa de compatibilidad que permite la sincronización bidireccional con sistemas legados mediante un sistema de eventos y colas de mensajes.</p>
              </div>
            </div>
          </section>
          
          {/* Outcome section */}
          <section>
            <h3 className="text-xl font-bold mb-4">Resultado e impacto</h3>
            <p>El Sistema de Gestión Académica ha sido implementado exitosamente en varias instituciones educativas, mejorando significativamente la eficiencia administrativa y la experiencia de usuarios.</p>
            <div className="mt-4 space-y-2">
              <p>Los resultados principales incluyen:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reducción del 60% en el tiempo dedicado a tareas administrativas</li>
                <li>Aumento del 40% en la satisfacción de estudiantes y profesores</li>
                <li>Disminución de errores en registros académicos en un 85%</li>
                <li>Mejora en la comunicación entre todos los actores del proceso educativo</li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailContent;
