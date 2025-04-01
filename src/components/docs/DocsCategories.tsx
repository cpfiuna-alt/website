
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Code, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DocsCategoriesProps {
  categories: Record<string, Array<{
    title: string;
    slug: string;
  }>>;
  loading: boolean;
}

const DocsCategories: React.FC<DocsCategoriesProps> = ({ categories, loading }) => {
  // Get category icon and description
  const getCategoryDetails = (category: string) => {
    switch (category.toLowerCase()) {
      case 'guías':
      case 'guides':
        return {
          icon: <Book className="h-6 w-6 text-primary" />,
          description: 'Guías paso a paso y tutoriales detallados'
        };
      case 'apis':
      case 'api':
        return {
          icon: <Code className="h-6 w-6 text-primary" />,
          description: 'Documentación técnica y referencias de API'
        };
      default:
        return {
          icon: <FileText className="h-6 w-6 text-primary" />,
          description: 'Recursos y documentación general'
        };
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-card rounded-lg p-6 h-64">
            <div className="h-10 w-10 bg-muted rounded-full mb-4"></div>
            <div className="h-6 bg-muted rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-muted/60 rounded w-full mb-2"></div>
            <div className="h-4 bg-muted/60 rounded w-5/6 mb-6"></div>
            <div className="h-20 bg-muted/40 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(categories).map(([category, docs]) => {
        const { icon, description } = getCategoryDetails(category);
        
        return (
          <Card key={category} className="overflow-hidden bg-card">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {icon}
              </div>
              <CardTitle>{category}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {docs.slice(0, 3).map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      to={`/docs/${doc.slug}`}
                      className="flex items-center text-primary hover:underline"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{doc.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to={`/docs?category=${category}`}>
                  Ver todos ({docs.length})
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default DocsCategories;
