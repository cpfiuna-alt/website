
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Award, FileCode, Calendar, Clock, User, BookOpen, Youtube, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getContentBySlug } from "@/utils/staticSiteGenerator";
import { CourseFrontMatter } from "@/utils/markdownUtils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<{frontMatter: CourseFrontMatter, content: string} | null>(null);
  const [loading, setLoading] = useState(true);
  
  // This would normally come from the course data, for now we'll simulate it
  const hasYoutubeVideo = slug === "desarrollo-web-react" || slug === "javascript-fundamentos";
  const youtubeUrl = hasYoutubeVideo ? "https://youtube.com/watch?v=example" : "";
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) {
        navigate("/resources");
        return;
      }
      
      setLoading(true);
      try {
        const courseData = await getContentBySlug<CourseFrontMatter>('courses', slug);
        if (courseData) {
          setCourse(courseData);
          // Set page title
          document.title = `${courseData.frontMatter.title} | Club de Programación FIUNA`;
        } else {
          // Redirect to resources page if course not found
          navigate("/resources");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        navigate("/resources");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted/50 rounded-lg w-1/4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-10 bg-muted/50 rounded-lg w-1/2"></div>
                  <div className="h-6 bg-muted/50 rounded-lg w-3/4"></div>
                  <div className="h-24 bg-muted/50 rounded-lg w-full"></div>
                </div>
                <div className="lg:col-span-1">
                  <div className="h-64 bg-muted/50 rounded-lg w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Curso no encontrado</h1>
              <p className="mb-6 text-muted-foreground">
                El curso que buscas no existe o ha sido removido.
              </p>
              <Link 
                to="/resources"
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a recursos
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const { frontMatter, content } = course;

  // Extract syllabus from content
  const syllabus = extractSyllabus(content);
  
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
                      {frontMatter.level}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {frontMatter.duration}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold">
                    {frontMatter.title}
                  </h1>
                  
                  <p className="text-xl text-muted-foreground">
                    {frontMatter.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pt-2">
                    {frontMatter.tags && frontMatter.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-sm bg-muted/70 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center mt-6 pt-6 border-t border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium">{frontMatter.instructor}</p>
                    </div>
                    
                    {hasYoutubeVideo ? (
                      <Button 
                        className="ml-auto"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(youtubeUrl, '_blank')}
                      >
                        <Youtube className="mr-2 h-4 w-4" />
                        Ver en YouTube
                      </Button>
                    ) : (
                      <Button 
                        className="ml-auto"
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Vídeo por subir
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass-card overflow-hidden">
                  <img 
                    src={frontMatter.image} 
                    alt={frontMatter.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Duración</p>
                        <p className="font-medium">{frontMatter.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nivel</p>
                        <p className="font-medium">{frontMatter.level}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Instructor</p>
                        <p className="font-medium">{frontMatter.instructor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Precio</p>
                        <p className="font-medium">Gratuito (miembros)</p>
                        <p className="text-xs text-muted-foreground">30.000 Gs. (no miembros)</p>
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
              <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownRenderer content={content} />
              </div>
              
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Sobre el instructor</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{frontMatter.instructor}</h3>
                    <p className="text-sm text-muted-foreground">Instructor/a</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {/* Extract instructor description from content */}
                  {extractInstructorBio(content, frontMatter.instructor)}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="syllabus" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Programa del curso</h2>
              
              <div className="space-y-6">
                {syllabus.map((week, weekIndex) => (
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
                <a 
                  href="#"
                  className="glass-card p-6 hover:shadow-neon-blue transition-all group"
                >
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <FileCode className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        Material del curso
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Acceso a las presentaciones, ejemplos de código y ejercicios
                      </p>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="#"
                  className="glass-card p-6 hover:shadow-neon-blue transition-all group"
                >
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <FileCode className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        Repositorio de GitHub
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ejemplos de código y proyectos para practicar
                      </p>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="#"
                  className="glass-card p-6 hover:shadow-neon-blue transition-all group"
                >
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <FileCode className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        Documentación oficial
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enlaces a documentación relevante para el curso
                      </p>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="#"
                  className="glass-card p-6 hover:shadow-neon-blue transition-all group"
                >
                  <div className="flex items-start">
                    <div className="rounded-full bg-primary/10 p-3 mr-4">
                      <FileCode className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        Lecturas recomendadas
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Libros y artículos para profundizar en los temas
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
              
              <div className="space-y-4">
                <div className="glass-card p-6">
                  <h3 className="font-medium text-lg mb-2">¿Necesito tener conocimientos previos?</h3>
                  <p className="text-muted-foreground">
                    Depende del nivel del curso. Para cursos principiantes, no se requiere experiencia previa. Para niveles intermedios, se mencionan los requisitos específicos en la descripción.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-medium text-lg mb-2">¿Habrá certificado al finalizar el curso?</h3>
                  <p className="text-muted-foreground">
                    Sí, recibirás un certificado de participación emitido por el Club de Programación FIUNA al completar satisfactoriamente el curso.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-medium text-lg mb-2">¿Qué materiales necesito para participar?</h3>
                  <p className="text-muted-foreground">
                    Una computadora con acceso a internet y las herramientas específicas mencionadas en la descripción del curso. La mayoría de software utilizado es gratuito o cuenta con versiones de prueba suficientes.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-medium text-lg mb-2">¿Qué hago si no puedo asistir a alguna clase?</h3>
                  <p className="text-muted-foreground">
                    Todas las clases serán grabadas y estarán disponibles en nuestra plataforma para miembros del club. Además, puedes contactar al instructor para resolver dudas específicas.
                  </p>
                </div>
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

// Helper function to extract syllabus data from markdown content
function extractSyllabus(content: string): { title: string; topics: string[] }[] {
  const syllabus: { title: string; topics: string[] }[] = [];
  
  // Look for section that starts with "### " which typically denotes weeks in our markdown
  const regex = /### (.*?)\n([\s\S]*?)(?=### |$)/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const weekTitle = match[1].trim();
    const weekContent = match[2].trim();
    
    // Extract topics (bullet points)
    const topics: string[] = [];
    const topicLines = weekContent.split('\n');
    
    for (const line of topicLines) {
      if (line.trim().startsWith('- ')) {
        topics.push(line.trim().substring(2));
      }
    }
    
    if (weekTitle && topics.length > 0) {
      syllabus.push({
        title: weekTitle,
        topics
      });
    }
  }
  
  // If we couldn't extract syllabus (different format), return some defaults
  if (syllabus.length === 0) {
    return [
      {
        title: "Semana 1: Introducción",
        topics: ["Fundamentos básicos", "Configuración del entorno", "Primeros pasos"]
      },
      {
        title: "Semana 2: Conceptos fundamentales",
        topics: ["Estructuras básicas", "Ejercicios prácticos", "Estudio de casos"]
      }
    ];
  }
  
  return syllabus;
}

// Helper function to extract instructor bio from the markdown content
function extractInstructorBio(content: string, instructorName: string): string {
  // Look for the instructor section in the markdown
  const instructorSectionRegex = /## Instructor(?:a)?\s+\*\*([^*]+)\*\*\s+([\s\S]+?)(?=\s*##|$)/i;
  const match = content.match(instructorSectionRegex);
  
  if (match && match[2]) {
    return match[2].trim();
  }
  
  // Fallback for different markdown structures
  const paragraphsAfterInstructor = content.split(/## Instructor(?:a)?/i)[1];
  if (paragraphsAfterInstructor) {
    const firstParagraphs = paragraphsAfterInstructor.split(/\n\n|\r\n\r\n/);
    // Skip the name line and get the next paragraph
    for (let i = 1; i < firstParagraphs.length; i++) {
      const paragraph = firstParagraphs[i].trim();
      if (paragraph && !paragraph.startsWith('#') && paragraph.length > 30) {
        return paragraph;
      }
    }
  }
  
  // Default fallback if no matching structure is found
  return "Especialista con amplia experiencia en enseñanza y práctica profesional. Enfoque práctico y orientado a resultados.";
}

export default CourseDetail;
