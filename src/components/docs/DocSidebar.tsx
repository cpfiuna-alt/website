
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Search, Book, Code, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocFrontMatter } from '@/utils/markdown/types';

interface DocSidebarProps {
  categories: Record<string, Array<{
    title: string;
    slug: string;
    description?: string;
  }>>;
  loading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DocSidebar: React.FC<DocSidebarProps> = ({
  categories,
  loading,
  searchQuery,
  onSearchChange
}) => {
  const location = useLocation();

  // Get category icon based on category name
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'guías':
      case 'guides':
        return <Book className="h-5 w-5 text-primary" />;
      case 'apis':
      case 'api':
        return <Code className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar en la documentación..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Navigation */}
      <div className="mb-4">
        <Link
          to="/docs"
          className={`flex items-center py-2 px-3 rounded-md font-medium text-base 
            ${location.pathname === "/docs" ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
        >
          <FileText className="mr-2 h-4 w-4" />
          Inicio
        </Link>
      </div>

      {/* Categories and Documents */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        {loading ? (
          // Loading skeleton
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-muted rounded-md w-2/3 mb-4"></div>
                <div className="space-y-3 ml-2">
                  <div className="h-4 bg-muted/60 rounded-md w-full"></div>
                  <div className="h-4 bg-muted/60 rounded-md w-5/6"></div>
                  <div className="h-4 bg-muted/60 rounded-md w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(categories).map(([category, docs]) => (
              <div key={category}>
                <h3 className="flex items-center font-semibold text-lg mb-2 text-foreground">
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </h3>
                <div className="space-y-1 ml-2">
                  {docs.map((doc) => (
                    <Link
                      key={doc.slug}
                      to={`/docs/${doc.slug}`}
                      className={`flex items-center py-2 px-3 rounded-md text-sm 
                        ${location.pathname === `/docs/${doc.slug}` 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted text-muted-foreground"}`}
                    >
                      <ChevronRight className="mr-2 h-3 w-3 flex-shrink-0" />
                      <span className="line-clamp-1">{doc.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(categories).length === 0 && !loading && (
              <p className="text-muted-foreground text-sm">
                No se encontraron documentos.
              </p>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DocSidebar;
