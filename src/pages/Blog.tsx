import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Tag, Search, Code } from "lucide-react";

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Cómo comenzar en el mundo de la programación competitiva",
    excerpt: "Una guía completa para comenzar en el mundo de la programación competitiva, desde conceptos básicos hasta estrategias avanzadas.",
    date: "2023-11-15",
    author: "María García",
    readTime: "8 min",
    tags: ["Algoritmos", "Competitive Programming", "Tutoriales"],
    image: "/images/blog/competitive-programming.jpg",
    slug: "como-comenzar-programacion-competitiva"
  },
  {
    id: 2,
    title: "Desarrollando con React y TypeScript en 2024",
    excerpt: "Las mejores prácticas, patrones y herramientas para desarrollar aplicaciones modernas con React y TypeScript.",
    date: "2024-01-20",
    author: "Carlos Rodríguez",
    readTime: "12 min",
    tags: ["React", "TypeScript", "Frontend"],
    image: "/images/blog/react-typescript.jpg",
    slug: "como-comenzar-programacion-competitiva"
  },
  {
    id: 3,
    title: "Hackathon FIUNA 2023: Proyectos Ganadores",
    excerpt: "Conoce los proyectos más innovadores que ganaron el Hackathon FIUNA 2023 y las tecnologías que utilizaron.",
    date: "2023-10-05",
    author: "Jorge Martínez",
    readTime: "6 min",
    tags: ["Hackathon", "Proyectos", "Innovación"],
    image: "/images/blog/hackathon.jpg"
  },
  {
    id: 4,
    title: "Python para Análisis de Datos: Bibliotecas Esenciales",
    excerpt: "Una revisión de las bibliotecas más potentes de Python para análisis y visualización de datos en proyectos científicos y empresariales.",
    date: "2023-09-12",
    author: "Laura Pérez",
    readTime: "10 min",
    tags: ["Python", "Data Science", "Tutoriales"],
    image: "/images/blog/python-data.jpg"
  },
  {
    id: 5,
    title: "Introducción a la Inteligencia Artificial y Machine Learning",
    excerpt: "Conceptos fundamentales de IA y ML explicados de manera clara para principiantes con ejemplos prácticos.",
    date: "2024-02-03",
    author: "Andrés López",
    readTime: "15 min",
    tags: ["IA", "Machine Learning", "Tutoriales"],
    image: "/images/blog/ai-ml.jpg"
  },
  {
    id: 6,
    title: "Construyendo APIs RESTful con Node.js y Express",
    excerpt: "Guía paso a paso para crear APIs seguras, escalables y bien estructuradas utilizando Node.js y Express.",
    date: "2023-12-08",
    author: "Miguel Torres",
    readTime: "14 min",
    tags: ["Node.js", "Backend", "API"],
    image: "/images/blog/nodejs-api.jpg"
  }
];

// All unique tags from blog posts
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Filter posts based on search term and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-black to-background/90 dark:from-black dark:to-background/70">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Nuestro <span className="gradient-text">Blog</span>
          </h1>
          
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Artículos, tutoriales y recursos sobre programación, tecnología y eventos 
            del Club de Programación FIUNA.
          </p>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="py-8 px-6 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                Todos
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <article key={post.id} className="glass-card overflow-hidden transition-all duration-300 hover:shadow-neon-blue group">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="bg-muted/20 dark:bg-black/30 aspect-video flex items-center justify-center">
                      <Code className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex gap-2 flex-wrap mb-3">
                      {post.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No se encontraron artículos</h2>
              <p className="text-muted-foreground">
                Intenta cambiar tu búsqueda o seleccionar una etiqueta diferente.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Subscription */}
      <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">
            Suscríbete a nuestro <span className="gradient-text">Newsletter</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Recibe los últimos artículos, tutoriales y noticias directamente en tu bandeja de entrada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-full bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue">
              Suscribirme
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
