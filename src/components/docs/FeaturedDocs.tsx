
import React from 'react';
import { Grid } from 'lucide-react';
import DocCard from './DocCard';
import { DocFrontMatter } from '@/utils/markdown/types';

interface FeaturedDocsProps {
  docs: Array<{
    frontMatter: DocFrontMatter;
    slug: string;
  }>;
  loading: boolean;
}

const FeaturedDocs: React.FC<FeaturedDocsProps> = ({ docs, loading }) => {
  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Documentación destacada</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-card rounded-lg p-6 h-40">
              <div className="h-5 bg-muted rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-muted/60 rounded w-full mb-2"></div>
              <div className="h-4 bg-muted/60 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="text-center py-12">
        <Grid className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No hay documentación disponible</h3>
        <p className="text-muted-foreground">
          No se encontró ninguna documentación que coincida con los criterios de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Documentación destacada</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <DocCard
            key={doc.slug}
            title={doc.frontMatter.title}
            description={doc.frontMatter.description}
            slug={doc.slug}
            category={doc.frontMatter.category}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDocs;
