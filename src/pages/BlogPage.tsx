import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  slug: string;
}

const blogPosts: BlogPostProps[] = [
  {
    id: "1",
    title: "Introducción a la Programación Competitiva",
    excerpt: "Aprende los fundamentos de la programación competitiva y cómo participar en concursos internacionales.",
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1789&q=80",
    author: "Carlos Santana",
    date: "15 de Abril, 2024",
    tags: ["Programación Competitiva", "Algoritmos", "Tutoriales"],
    slug: "introduccion-programacion-competitiva"
  },
  {
    id: "2",
    title: "Desarrollo Web Moderno con React y TypeScript",
    excerpt: "Explora las mejores prácticas y patrones de diseño para crear aplicaciones web modernas.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Laura Martínez",
    date: "3 de Mayo, 2024",
    tags: ["React", "TypeScript", "Desarrollo Web"],
    slug: "desarrollo-web-react-typescript"
  },
  {
    id: "3",
    title: "Inteligencia Artificial: Presente y Futuro",
    excerpt: "Un análisis sobre el estado actual de la IA y hacia dónde se dirige esta tecnología.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    author: "Miguel Sánchez",
    date: "20 de Mayo, 2024",
    tags: ["Inteligencia Artificial", "Machine Learning", "Tecnología"],
    slug: "inteligencia-artificial-presente-futuro"
  },
  {
    id: "4",
    title: "Optimización de Algoritmos: Casos de Estudio",
    excerpt: "Analizamos diferentes enfoques para mejorar la eficiencia de algoritmos comunes.",
    image: "https://images.unsplash.com/photo-1581092921461-7aaac723efed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Ana Torres",
    date: "8 de Junio, 2024",
    tags: ["Algoritmos", "Optimización", "Programación"],
    slug: "optimizacion-algoritmos"
  },
  {
    id: "5",
    title: "Ciberseguridad para Desarrolladores",
    excerpt: "Consejos y buenas prácticas para escribir código seguro y proteger tus aplicaciones.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    author: "Roberto Gómez",
    date: "15 de Junio, 2024",
    tags: ["Ciberseguridad", "Desarrollo", "Buenas Prácticas"],
    slug: "ciberseguridad-desarrolladores"
  }
];

// Get unique tags
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const BlogPostCard: React.FC<BlogPostProps> = ({ title, excerpt, image, author, date, tags, slug }) => {
  return (
    <Link to={`/blog/${slug}`}>
      <Card className="glass-card overflow-hidden h-full flex flex-col group hover:shadow-neon-blue transition-all">
        <div className="h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          
          <div className="flex items-center text-[#94a3b8] mb-2">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm">{author}</span>
          </div>
          
          <div className="flex items-center text-[#94a3b8] mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          
          <p className="text-[#94a3b8] mb-4 flex-grow">{excerpt}</p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-end">
            <span className="text-primary text-sm flex items-center">
              Leer más <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const BlogPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on tag and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    const matchesSearch = searchQuery 
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  return (
    <Layout>
      <div className="container px-4 py-16 pt-24">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestro <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
            Artículos, tutoriales y reflexiones sobre programación, tecnología y más
          </p>
        </div>

        <div className="glass-card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input 
                type="text" 
                id="blogpage-search"
                name="blogSearch"
                placeholder="Buscar artículos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Button 
                variant={selectedTag ? "outline" : "default"} 
                size="sm" 
                onClick={() => setSelectedTag(null)}
                className="mr-2"
              >
                Todos
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard key={post.id} {...post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#94a3b8] text-lg mb-4">No se encontraron artículos con los criterios de búsqueda.</p>
              <Button onClick={() => {setSearchQuery(""); setSelectedTag(null);}}>
                Ver todos los artículos
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

// DEPRECATED: This legacy BlogPage component is superseded by pages/Blog.tsx using dynamic content.
// Consider deleting this file after confirming no routes reference it.
