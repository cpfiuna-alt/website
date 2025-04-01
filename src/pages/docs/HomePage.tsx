
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DocHero from '@/components/docs/DocHero';
import FeaturedDocs from '@/components/docs/FeaturedDocs';
import DocsCategories from '@/components/docs/DocsCategories';
import QuickGuides from '@/components/docs/QuickGuides';
import { useAllDocs } from '@/hooks/useDocumentation';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocsHomePage: React.FC = () => {
  const {
    docs,
    docsByCategory,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useAllDocs();
  
  const [searchParams, setSearchParams] = useSearchParams();

  // Set the page title
  useEffect(() => {
    document.title = 'Documentación | Club de Programación FIUNA';
  }, []);

  // Handle URL query parameters
  useEffect(() => {
    const queryCategory = searchParams.get('category');
    const querySearch = searchParams.get('search');
    
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    }
    
    if (querySearch) {
      setSearchQuery(querySearch);
    }
  }, [searchParams, setSelectedCategory, setSearchQuery]);

  // Update the URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    setSearchParams(params, { replace: true });
  }, [selectedCategory, searchQuery, setSearchParams]);
  
  // Get featured docs (first 6 docs or filtered by category)
  const featuredDocs = docs.slice(0, 6);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <DocHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        {searchQuery ? (
          // Show search results
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Resultados de búsqueda para "{searchQuery}"
            </h2>
            <FeaturedDocs docs={docs} loading={loading} />
          </div>
        ) : (
          <>
            {/* Welcome section for new users */}
            <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-lg mb-12">
              <h2 className="text-2xl font-semibold mb-3">¿Nuevo en el Club?</h2>
              <p className="text-lg mb-6">
                Si eres nuevo en el Club de Programación FIUNA, te recomendamos empezar con 
                nuestra guía de introducción para conocer nuestras actividades y cómo participar.
              </p>
              <Button asChild size="lg">
                <a href="/docs/introduccion">Comenzar aquí</a>
              </Button>
            </div>
            
            {/* Categories section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Categorías</h2>
              <DocsCategories categories={docsByCategory} loading={loading} />
            </section>
            
            {/* Quick guides section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Guías rápidas</h2>
              <QuickGuides />
            </section>
            
            {/* Featured docs section */}
            <section className="mb-16">
              <FeaturedDocs docs={featuredDocs} loading={loading} />
            </section>
          </>
        )}
        
        {/* Contribute CTA */}
        <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-lg mt-12">
          <h3 className="text-xl font-semibold mb-3">¿Quieres contribuir a la documentación?</h3>
          <p className="text-lg mb-6">
            Todas nuestras documentaciones están disponibles en GitHub y aceptamos contribuciones.
            Aprende cómo puedes ayudar a mejorar nuestra documentación.
          </p>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Contribuir en GitHub
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default DocsHomePage;
