
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Award, FileCode, Calendar, Clock, User, BookOpen, Youtube, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getContentBySlug } from "@/utils/staticSiteGenerator";
import { CourseFrontMatter } from "@/utils/markdownUtils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { getInstructorByName } from "@/data/instructors";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<{frontMatter: CourseFrontMatter, content: string} | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Determine YouTube video availability from frontmatter
  const getVideoStatus = () => {
    if (!course?.frontMatter.youtubeUrl) {
      return { hasVideo: false, url: "", message: "Playlist no disponible" };
    }
    
    const url = course.frontMatter.youtubeUrl;
    
    if (url === "none" || url === "null" || url === "unavailable") {
      return { hasVideo: false, url: "", message: "Playlist no disponible" };
    }
    
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return { hasVideo: true, url: url, message: "" };
    }
    
    // Fallback for any other value
    return { hasVideo: false, url: "", message: "Playlist no disponible" };
  };
  
  const videoStatus = getVideoStatus();
  
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
                to="/recursos"
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
      <article className="relative pb-16">
        {/* Course Hero */}
        <div className="relative w-full bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 mb-12">
          {/* Superimposed "Volver" button aligned with banner text */}
          <div className="absolute top-6 left-0 right-0 z-30">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl">
                <Link
                  to="/recursos"
                  className="inline-flex items-center text-foreground/90 hover:text-primary transition-colors backdrop-blur-sm rounded-lg px-3 py-2"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Volver a recursos
                </Link>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto px-6 py-12">
            
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
                    {(() => {
                      const instructor = getInstructorByName(frontMatter.instructor);
                      return instructor?.profilePicture ? (
                        <img 
                          src={instructor.profilePicture} 
                          alt={frontMatter.instructor}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            // Show fallback icon
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                          <User className="h-6 w-6" />
                        </div>
                      );
                    })()}
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4" style={{ display: 'none' }}>
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium">{frontMatter.instructor}</p>
                    </div>
                    
                    {videoStatus.hasVideo ? (
                      <Button 
                        className="ml-auto"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(videoStatus.url, '_blank')}
                      >
                        <Youtube className="mr-2 h-4 w-4" />
                        Ver playlist del curso
                      </Button>
                    ) : (
                      <Button 
                        className="ml-auto"
                        variant="outline"
                        size="sm"
                        disabled
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        {videoStatus.message}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass-card-static overflow-hidden">
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
                        <p className="text-sm text-muted-foreground">Inversión</p>
                        {(() => {
                          // Prefer explicit member/non-member fields, fallback to generic `price` or defaults
                          const member = frontMatter.priceMember || frontMatter.price || 'Gratuito (miembros)';
                          const nonMember = frontMatter.priceNonMember || (frontMatter.price ? '' : '30.000 Gs. (no miembros)');
                          return (
                            <>
                              <p className="font-medium">{member}</p>
                              {nonMember ? <p className="text-xs text-muted-foreground">{nonMember}</p> : null}
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="pt-4">
                      {/* CTA: keep label 'Inscribite al curso' — only change behavior/colors based on frontMatter.registrationLink */}
                      {frontMatter.registrationLink ? (
                        (() => {
                          const url = frontMatter.registrationLink as string;
                          const isExternal = /^https?:\/\//i.test(url);
                          return isExternal ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue"
                            >
                              Inscribite al curso
                            </a>
                          ) : (
                            <a
                              href={url}
                              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue"
                            >
                              Inscribite al curso
                            </a>
                          );
                        })()
                      ) : (
                        // Match ProjectDetail disabled demo button style but keep active padding/size
                        <button
                          key="inscripcion-disabled"
                          disabled
                          aria-disabled="true"
                          className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-200 text-gray-700 cursor-not-allowed border border-gray-200"
                        >
                          Inscripciones no disponibles
                        </button>
                      )}
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
              <div className="max-w-none">
                <MarkdownRenderer content={extractDescriptionOnly(content)} />
              </div>
              
              <div className="glass-card-static p-6">
                <h3 className="text-lg font-bold mb-4">Sobre el instructor</h3>
                <div className="flex items-center mb-4">
                  {(() => {
                    const instructor = getInstructorByName(frontMatter.instructor);
                    return instructor?.profilePicture ? (
                      <img 
                        src={instructor.profilePicture} 
                        alt={frontMatter.instructor}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          // Show fallback icon
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                        <User className="h-8 w-8" />
                      </div>
                    );
                  })()}
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4" style={{ display: 'none' }}>
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
                  <div key={weekIndex} className="glass-card-static p-6">
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

              {/* Read resource links from frontMatter. Support either a `resources` object
                  or top-level fields for backward compatibility. */}
              {(() => {
                const fmRecord = frontMatter as unknown as Record<string, unknown>;
                const resObj = (fmRecord.resources && typeof fmRecord.resources === 'object') ? fmRecord.resources as Record<string, unknown> : {};
                const materialLink = typeof resObj.material === 'string' ? resObj.material : (typeof fmRecord.materialLink === 'string' ? fmRecord.materialLink : '');
                const githubLink = typeof resObj.github === 'string' ? resObj.github : (typeof fmRecord.githubLink === 'string' ? fmRecord.githubLink : '');
                // Support resources.documentation (preferred), resObj.docs, or legacy frontmatter.
                // Prefer explicit `setupLink` if available (we're deprecating `documentationLink`).
                const docsLink = typeof resObj.documentation === 'string'
                  ? resObj.documentation
                  : (typeof resObj.docs === 'string'
                    ? resObj.docs
                    : (typeof fmRecord.setupLink === 'string'
                      ? fmRecord.setupLink
                      : (typeof fmRecord.documentationLink === 'string' ? fmRecord.documentationLink : '')));
                const readingsLink = typeof resObj.readings === 'string' ? resObj.readings : (typeof fmRecord.readingsLink === 'string' ? fmRecord.readingsLink : '');

                const cards = [
                  { key: 'material', title: 'Material del curso', desc: 'Acceso a las presentaciones, listas de ejercicios, cheatsheets y más', url: materialLink },
                  { key: 'github', title: 'Repositorio de GitHub', desc: 'Ejemplos de código y proyectos para practicar', url: githubLink },
                  { key: 'docs', title: 'Configuración y herramientas', desc: 'Instrucciones y enlaces para preparar el entorno de desarrollo', url: docsLink },
                  { key: 'readings', title: 'Lecturas recomendadas', desc: 'Libros y artículos para profundizar en los temas', url: readingsLink },
                ];

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((c) => (
                      c.url ? (
                        <a
                          key={c.key}
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card p-6 hover:shadow-neon-blue transition-all group"
                        >
                          <div className="flex items-start">
                            <div className="rounded-full bg-primary/10 p-3 mr-4">
                              <FileCode className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium group-hover:text-primary transition-colors">{c.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <div key={c.key} className="glass-card p-6 opacity-60">
                          <div className="flex items-start">
                            <div className="rounded-full bg-primary/10 p-3 mr-4">
                              <FileCode className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{c.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                              <p className="text-xs text-muted-foreground mt-2">Enlace no disponible</p>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                );
              })()}
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
              
              <div className="space-y-4">
                <div className="glass-card-static p-6">
                  <h3 className="font-medium text-lg mb-2">¿Necesito tener conocimientos previos?</h3>
                  <p className="text-muted-foreground">
                    Depende del nivel del curso. Para cursos principiantes, no se requiere experiencia previa. Para niveles intermedios, se mencionan los requisitos específicos en la descripción.
                  </p>
                </div>
                
                <div className="glass-card-static p-6">
                  <h3 className="font-medium text-lg mb-2">¿Habrá certificado al finalizar el curso?</h3>
                  <p className="text-muted-foreground">
                    Sí, recibirás un certificado de participación emitido por el Club de Programación FIUNA al completar satisfactoriamente el curso.
                  </p>
                </div>
                
                <div className="glass-card-static p-6">
                  <h3 className="font-medium text-lg mb-2">¿Qué materiales necesito para participar?</h3>
                  <p className="text-muted-foreground">
                    Una computadora con acceso a internet y las herramientas específicas mencionadas en la descripción del curso. La mayoría de software utilizado es gratuito o cuenta con versiones de prueba suficientes.
                  </p>
                </div>
                
                <div className="glass-card-static p-6">
                  <h3 className="font-medium text-lg mb-2">¿Qué hago si no puedo asistir a alguna clase?</h3>
                  <p className="text-muted-foreground">
                    Todas las clases serán grabadas y estarán disponibles en nuestra plataforma para miembros del club. Además, puedes contactar al instructor para resolver dudas específicas.
                  </p>
                </div>
              </div>
              
              <div className="mt-16 p-8 bg-primary/10 rounded-2xl text-center w-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Tenés más preguntas?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Si tenés dudas que no están cubiertas aquí, no dudes en contactarnos.
                </p>
                <a
                  href="/contacto"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors text-lg font-medium"
                >
                  Contactanos
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
  // Updated regex to handle both Unix (\n) and Windows (\r\n) line endings
  const regex = /### (.*?)[\r\n]([\s\S]*?)(?=### |## |$)/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const weekTitle = match[1].trim();
    const weekContent = match[2].trim();
    
    // Extract topics (bullet points)
    const topics: string[] = [];
    const topicLines = weekContent.split(/\r?\n/);
    
    for (const line of topicLines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('- ')) {
        topics.push(trimmedLine.substring(2));
      }
    }
    
    if (weekTitle && topics.length > 0) {
      syllabus.push({
        title: weekTitle,
        topics
      });
    }
  }
  
  return syllabus;
}

// Helper function to get instructor bio from the instructors data
function extractInstructorBio(content: string, instructorName: string): string {
  // Get instructor from data
  const instructor = getInstructorByName(instructorName);
  
  if (instructor) {
    return instructor.bio;
  }
  
  // Fallback: try to extract from markdown content (legacy support)
  const instructorSectionRegex = /## Instructor(?:a)?\s+\*\*([^*]+)\*\*\s+([\s\S]+?)(?=\s*##|$)/i;
  const match = content.match(instructorSectionRegex);
  
  if (match && match[2]) {
    return match[2].trim();
  }
  
  // Default fallback if no matching structure is found
  return "Error de carga del perfil del instructor. Por favor, contacta al administrador del curso.";
}

// Helper function to extract only the description part (before syllabus sections)
function extractDescriptionOnly(content: string): string {
  // Split content by ### headers (which mark syllabus sections like "### Semana X")
  const sections = content.split(/### /);
  
  // The first section should be the description
  let descriptionContent = sections[0].trim();
  
  // Remove any ## Instructor section if it exists in the description
  const instructorSectionRegex = /## Instructor(?:a)?[\s\S]*$/i;
  descriptionContent = descriptionContent.replace(instructorSectionRegex, '').trim();
  
  // Remove "## Contenido del curso" section and everything after it
  const contenidoSectionRegex = /## Contenido del curso[\s\S]*$/i;
  descriptionContent = descriptionContent.replace(contenidoSectionRegex, '').trim();
  
  // Remove "## Metodología" section and everything after it if it appears before syllabus
  const metodologiaSectionRegex = /## Metodología[\s\S]*$/i;
  descriptionContent = descriptionContent.replace(metodologiaSectionRegex, '').trim();
  
  // Remove "## Requisitos" section and everything after it if it appears before syllabus
  const requisitosSectionRegex = /## Requisitos[\s\S]*$/i;
  descriptionContent = descriptionContent.replace(requisitosSectionRegex, '').trim();
  
  return descriptionContent;
}

export default CourseDetail;
