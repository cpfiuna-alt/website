
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, BookOpen, Code, FileText, Book, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllDocPages, DocFrontMatter } from "@/utils/staticSiteGenerator";

const DocsHome = () => {
  const [featuredDocs, setFeaturedDocs] = useState<Array<{ frontMatter: DocFrontMatter, slug: string }>>([]);
  const [docsByCategory, setDocsByCategory] = useState<Record<string, Array<{ frontMatter: DocFrontMatter, slug: string }>>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docs = await getAllDocPages();
        
        // Group docs by category
        const grouped = docs.reduce<Record<string, Array<{ frontMatter: DocFrontMatter, slug: string }>>>((acc, doc) => {
          const category = doc.frontMatter.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(doc);
          return acc;
        }, {});

        setDocsByCategory(grouped);
        
        // Get top docs for featured section (taking first 4 docs)
        setFeaturedDocs(docs.slice(0, 4));
      } catch (error) {
        console.error("Error fetching documentation:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocs();
  }, []);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'guías':
      case 'guides':
        return <BookOpen className="h-6 w-6" />;
      case 'apis':
      case 'api':
        return <Code className="h-6 w-6" />;
      case 'recursos':
      case 'resources':
        return <BookMarked className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-6">Documentación CPF</h1>
      <p className="text-xl mb-8 leading-relaxed">
        Bienvenido a la documentación del Club de Programación FIUNA. Acá encontrarás
        guías detalladas, referencias de API y recursos para todos los proyectos y
        herramientas desarrollados por el club.
      </p>
      
      <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mt-0 mb-4">¿Nuevo en el Club?</h2>
        <p className="mb-4">
          Si sos nuevo en el Club de Programación FIUNA, te recomendamos empezar con 
          nuestra guía de introducción para conocer nuestras actividades y cómo participar.
        </p>
        <Button asChild>
          <Link to="/docs/introduccion" className="inline-flex items-center">
            Comenzá aquí
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <h2 className="text-2xl font-semibold mt-12 mb-6">Documentación destacada</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-6">
        {loading ? (
          // Loading state
          Array(4).fill(null).map((_, i) => (
            <div key={i} className="glass-card docs-card p-6 animate-pulse">
              <div className="h-7 bg-muted/50 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-muted/30 rounded w-full mb-2"></div>
              <div className="h-4 bg-muted/30 rounded w-5/6"></div>
            </div>
          ))
        ) : (
          featuredDocs.map((doc) => (
            <Link 
              key={doc.slug}
              to={`/docs/${doc.slug}`}
              className="glass-card docs-card p-6 no-underline hover:bg-muted/10 transition-colors"
            >
              <div>
                <h3 className="text-xl font-medium m-0 flex items-center">
                  {doc.frontMatter.title}
                </h3>
                <p className="text-muted-foreground mt-2 mb-0 leading-relaxed">
                  {doc.frontMatter.description}
                </p>
                <div className="flex items-center mt-4 text-primary text-sm">
                  Leer más <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      
      <h2 className="text-2xl font-semibold mt-12 mb-6">Categorías</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mb-12">
        {Object.keys(docsByCategory).length === 0 && loading ? (
          // Loading state for categories
          Array(3).fill(null).map((_, i) => (
            <div key={i} className="glass-card docs-card p-6 animate-pulse">
              <div className="h-6 w-6 bg-muted/50 rounded-full mb-3"></div>
              <div className="h-6 bg-muted/50 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-muted/30 rounded w-full mb-2"></div>
            </div>
          ))
        ) : (
          Object.entries(docsByCategory).map(([category, docs]) => (
            <Card key={category} className="border-none glass-card docs-card no-underline">
              <CardHeader>
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  {getCategoryIcon(category)}
                </div>
                <CardTitle className="text-xl">{category}</CardTitle>
                <CardDescription>
                  {category === 'Guías' ? 'Guías de introducción y tutoriales detallados' : 
                   category === 'APIs' ? 'Referencia técnica de nuestras APIs' : 
                   'Recursos adicionales y material de apoyo'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none p-0 space-y-1">
                  {docs.slice(0, 3).map((doc) => (
                    <li key={doc.slug}>
                      <Link 
                        to={`/docs/${doc.slug}`} 
                        className="text-primary hover:underline flex items-center"
                      >
                        <ArrowRight className="mr-2 h-3 w-3" />
                        {doc.frontMatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full" size="sm">
                  <Link to={`/docs?category=${category}`}>
                    Ver todos ({docs.length})
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      <h2 className="text-2xl font-semibold mt-12 mb-6">Guías rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
        <Link to="/docs/introduccion" className="glass-card docs-card p-6 no-underline hover:bg-muted/10 transition-colors">
          <Book className="h-6 w-6 mb-2 text-primary" />
          <h3 className="text-xl font-medium">Introducción al Club</h3>
          <p className="text-muted-foreground">Conocé qué es el Club de Programación FIUNA y cómo participar</p>
        </Link>
        <Link to="/docs/instalacion" className="glass-card docs-card p-6 no-underline hover:bg-muted/10 transition-colors">
          <Code className="h-6 w-6 mb-2 text-primary" />
          <h3 className="text-xl font-medium">Guía de instalación</h3>
          <p className="text-muted-foreground">Configura tu entorno para trabajar en proyectos del club</p>
        </Link>
        <Link to="/docs/programacion-competitiva" className="glass-card docs-card p-6 no-underline hover:bg-muted/10 transition-colors">
          <BookMarked className="h-6 w-6 mb-2 text-primary" />
          <h3 className="text-xl font-medium">Programación Competitiva</h3>
          <p className="text-muted-foreground">Aprende sobre programación competitiva y cómo participar en torneos</p>
        </Link>
        <Link to="/docs/api-discord-bot" className="glass-card docs-card p-6 no-underline hover:bg-muted/10 transition-colors">
          <Code className="h-6 w-6 mb-2 text-primary" />
          <h3 className="text-xl font-medium">API del Bot de Discord</h3>
          <p className="text-muted-foreground">Referencia completa para interactuar con nuestro bot de Discord</p>
        </Link>
      </div>
      
      <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-lg mt-12">
        <h3 className="text-xl font-semibold mb-4">¿Querés contribuir a la documentación?</h3>
        <p className="text-lg mb-6 leading-relaxed">
          Todas nuestras documentaciones están disponibles en GitHub y aceptamos contribuciones.
          Aprendé cómo podés ayudar a mejorar nuestra documentación.
        </p>
        <Button variant="outline" className="mt-2">
          <ExternalLink className="mr-2 h-4 w-4" />
          Contribuir
        </Button>
      </div>
    </div>
  );
};

export default DocsHome;
