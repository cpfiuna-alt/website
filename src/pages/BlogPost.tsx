
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { CalendarIcon, Clock, User, Tag, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Sample blog post data (in a real app, this would come from an API/PayloadCMS)
const blogPost = {
  id: "1",
  title: "Cómo comenzar en el mundo de la programación competitiva",
  slug: "como-comenzar-programacion-competitiva",
  publishedAt: new Date("2023-09-15"),
  updatedAt: new Date("2023-09-20"),
  author: {
    name: "Carlos Gómez",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    role: "Coordinador de Competencias"
  },
  estimatedReadTime: 8,
  tags: ["Programación Competitiva", "Algoritmos", "Consejos", "Principiantes"],
  excerpt: "Una guía completa para quienes desean iniciarse en el fascinante mundo de la programación competitiva, con recursos, consejos y estrategias para competidores novatos.",
  coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  content: `
    <h2>¿Qué es la programación competitiva?</h2>
    <p>La programación competitiva es un deporte mental donde los participantes resuelven problemas de programación algorítmicos en un tiempo limitado. Estas competencias ponen a prueba no solo tus habilidades de programación, sino también tu capacidad para resolver problemas, trabajar bajo presión y pensar creativamente.</p>
    
    <p>Participar en competencias de programación ofrece múltiples beneficios:</p>
    
    <ul>
      <li>Mejora tus habilidades de resolución de problemas</li>
      <li>Fortalece tu comprensión de estructuras de datos y algoritmos</li>
      <li>Aumenta tu eficiencia y velocidad de codificación</li>
      <li>Te prepara para entrevistas técnicas en grandes empresas de tecnología</li>
      <li>Te conecta con una comunidad global de programadores</li>
    </ul>
    
    <h2>Plataformas populares</h2>
    <p>Existen varias plataformas donde puedes practicar y participar en competencias regularmente:</p>
    
    <h3>1. Codeforces</h3>
    <p>Probablemente la plataforma más popular para programación competitiva, con contests regulares y una gran comunidad.</p>
    
    <h3>2. LeetCode</h3>
    <p>Excelente para practicar problemas comunes de entrevistas, con una gran colección de problemas clasificados por dificultad y tema.</p>
    
    <h3>3. HackerRank</h3>
    <p>Ofrece desafíos de codificación en múltiples dominios, desde algoritmos hasta inteligencia artificial.</p>
    
    <h3>4. ICPC</h3>
    <p>La International Collegiate Programming Contest es una de las competencias más prestigiosas a nivel mundial para estudiantes universitarios.</p>
    
    <h2>Recursos recomendados para principiantes</h2>
    <p>Si estás comenzando, te recomendamos estos recursos:</p>
    
    <h3>Libros</h3>
    <ul>
      <li>"Competitive Programming 3" por Steven Halim y Felix Halim</li>
      <li>"Introduction to Algorithms" por CLRS</li>
      <li>"Algorithm Design Manual" por Steven Skiena</li>
    </ul>
    
    <h3>Cursos en línea</h3>
    <ul>
      <li>Coursera: "Algoritmos" por la Universidad de Princeton</li>
      <li>edX: "Estructuras de Datos y Algoritmos" por la Universidad de California, San Diego</li>
      <li>YouTube: Canal "Errichto" y "William Lin"</li>
    </ul>
    
    <h2>Consejos para comenzar</h2>
    <ol>
      <li><strong>Domina un lenguaje de programación:</strong> Elige uno (C++, Java o Python son populares) y domínalo antes de intentar problemas complejos.</li>
      <li><strong>Aprende las estructuras de datos fundamentales:</strong> Arrays, listas enlazadas, pilas, colas, árboles, grafos, etc.</li>
      <li><strong>Estudia algoritmos básicos:</strong> Búsqueda binaria, ordenamiento, programación dinámica, algoritmos codiciosos, etc.</li>
      <li><strong>Practica regularmente:</strong> Resuelve al menos un problema diario.</li>
      <li><strong>Participa en contests:</strong> Incluso si no te sientes preparado, participar en competencias reales es la mejor forma de aprender.</li>
      <li><strong>Analiza soluciones:</strong> Después de cada competencia, estudia las soluciones de otros participantes para aprender técnicas nuevas.</li>
      <li><strong>Únete a una comunidad:</strong> Participar en comunidades como el Club de Programación FIUNA te conectará con otros entusiastas y mentores.</li>
    </ol>
    
    <h2>Próximos pasos</h2>
    <p>En el Club de Programación FIUNA organizamos talleres regulares, sesiones de práctica y competencias internas para ayudarte a mejorar tus habilidades. ¡No dudes en unirte a nuestras actividades!</p>
    
    <p>Recuerda que la programación competitiva es un camino largo, pero extremadamente gratificante. La constancia y la perseverancia son claves para el éxito. ¡Esperamos verte pronto en nuestras competencias!</p>
  `,
  relatedPosts: [
    {
      id: "2",
      title: "Estructuras de datos avanzadas para competencias",
      slug: "estructuras-datos-avanzadas",
      coverImage: "https://images.unsplash.com/photo-1629904853893-c2c8c2417bac?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "3",
      title: "Guía de preparación para el ICPC",
      slug: "guia-preparacion-icpc",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "4",
      title: "Optimización de algoritmos: técnicas avanzadas",
      slug: "optimizacion-algoritmos",
      coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ]
};

const BlogPost = () => {
  // In a real app, we would fetch the post based on the slug
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = `${blogPost.title} | Club de Programación FIUNA`;
  }, []);

  return (
    <Layout>
      <article className="relative py-12 md:py-20">
        {/* Back to blog button */}
        <div className="container mx-auto px-6 mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Link>
        </div>
        
        {/* Cover image */}
        <div className="relative w-full h-[300px] md:h-[500px] mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={blogPost.coverImage} 
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container px-6 mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {blogPost.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {blogPost.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
        
        {/* Post metadata */}
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center">
                <img 
                  src={blogPost.author.avatar} 
                  alt={blogPost.author.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-medium">{blogPost.author.name}</div>
                  <div className="text-sm text-muted-foreground">{blogPost.author.role}</div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {format(blogPost.publishedAt, "d 'de' MMMM, yyyy", { locale: es })}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {blogPost.estimatedReadTime} min de lectura
                </div>
              </div>
            </div>
            
            {/* Post content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {blogPost.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>
            
            {/* Share and actions */}
            <div className="flex justify-between items-center mb-12 pb-8 border-b">
              <div className="flex space-x-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Me gusta</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span>Comentar</span>
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Bookmark className="h-4 w-4" />
                  <span>Guardar</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
            
            {/* Author bio */}
            <div className="bg-muted/30 rounded-xl p-6 mb-12">
              <div className="flex items-center mb-4">
                <img 
                  src={blogPost.author.avatar} 
                  alt={blogPost.author.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-lg font-medium">{blogPost.author.name}</h3>
                  <p className="text-sm text-muted-foreground">{blogPost.author.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Apasionado por la programación competitiva y la enseñanza de algoritmos. 
                Ha participado en múltiples competencias nacionales e internacionales, 
                incluyendo el ICPC Latinoamericano. Actualmente coordina el equipo de 
                competencias del Club de Programación FIUNA.
              </p>
            </div>
            
            {/* Related posts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPost.relatedPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    to={`/blog/${post.slug}`}
                    className="group"
                  >
                    <div className="rounded-lg overflow-hidden mb-3">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
