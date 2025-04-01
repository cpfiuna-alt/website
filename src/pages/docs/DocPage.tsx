
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DocContent from '@/components/docs/DocContent';
import DocSidebar from '@/components/docs/DocSidebar';
import { useDocBySlug, useAllDocs } from '@/hooks/useDocumentation';
import { ArrowLeft } from 'lucide-react';

const DocPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { doc, loading, error } = useDocBySlug(slug);
  const { docsByCategory, searchQuery, setSearchQuery } = useAllDocs();

  // Set page title
  useEffect(() => {
    if (doc) {
      document.title = `${doc.frontMatter.title} | Documentación CPF`;
    } else if (!loading) {
      document.title = 'Documentación no encontrada | CPF';
    }
  }, [doc, loading]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="glass-card docs-card p-6 h-fit lg:sticky lg:top-24">
            <DocSidebar 
              categories={docsByCategory}
              loading={loading}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </aside>

          {/* Main content */}
          <main className="glass-card docs-card p-6 lg:p-10">
            {loading ? (
              // Loading state
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="mt-8 space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-4/5"></div>
                </div>
              </div>
            ) : error || !doc ? (
              // Error state
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold mb-4">Documentación no encontrada</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Lo sentimos, no pudimos encontrar la documentación que estás buscando.
                </p>
                <Link to="/docs" className="flex items-center text-primary hover:underline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a la documentación
                </Link>
              </div>
            ) : (
              // Content
              <DocContent 
                frontMatter={doc.frontMatter}
                content={doc.content}
              />
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default DocPage;
