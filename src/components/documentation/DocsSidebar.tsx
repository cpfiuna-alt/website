
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Search, BookOpen, Code, FileText, Home } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllDocPages, DocFrontMatter } from '@/utils/staticSiteGenerator';

// Group documentation by category
function groupByCategory(docs: Array<{ frontMatter: DocFrontMatter, slug: string }>) {
  const grouped: Record<string, Array<{ title: string; slug: string; description?: string; icon?: string; order?: number }>> = {};
  
  docs.forEach(doc => {
    const category = doc.frontMatter.category || 'Uncategorized';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    grouped[category].push({
      title: doc.frontMatter.title,
      description: doc.frontMatter.description,
      slug: doc.slug,
      icon: doc.frontMatter.icon,
      order: doc.frontMatter.order
    });
  });
  
  // Sort each category by order property if available
  Object.keys(grouped).forEach(category => {
    grouped[category].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return a.title.localeCompare(b.title);
    });
  });
  
  return grouped;
}

interface DocsSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openCategories: string[];
  toggleCategory: (category: string) => void;
}

const DocsSidebar = ({ 
  searchQuery, 
  setSearchQuery, 
  openCategories, 
  toggleCategory 
}: DocsSidebarProps) => {
  const location = useLocation();
  const [docsCategories, setDocsCategories] = useState<Record<string, Array<{ title: string; slug: string; description?: string; icon?: string; order?: number }>>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        const docs = await getAllDocPages();
        const grouped = groupByCategory(docs);
        setDocsCategories(grouped);
      } catch (error) {
        console.error("Error fetching documentation:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocs();
  }, []);
  
  // Filter docs based on search query
  const filteredCategories = Object.entries(docsCategories).reduce<Record<string, Array<{ title: string; slug: string; description?: string; icon?: string }>>>((acc, [category, items]) => {
    if (searchQuery) {
      const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      if (filteredItems.length > 0) {
        acc[category] = filteredItems;
      }
    } else {
      acc[category] = items;
    }
    
    return acc;
  }, {});

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'guías':
      case 'guides':
        return <BookOpen className="h-5 w-5" />;
      case 'apis':
      case 'api':
        return <Code className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  return (
    <aside className="md:sticky top-24 self-start">
      <div className="glass-card docs-card p-5 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar en la documentación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="glass-card docs-card overflow-hidden">
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="p-5">
            <Button
              variant="ghost"
              asChild
              className={`flex w-full items-center justify-start text-base font-medium px-3 py-2 rounded-md mb-3 ${
                location.pathname === "/docs" 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              }`}
            >
              <Link to="/docs">
                <Home className="h-4 w-4 mr-2" />
                Inicio de documentación
              </Link>
            </Button>
            
            {loading ? (
              <div className="space-y-4 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-5 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="ml-3 space-y-2">
                      <div className="h-4 bg-muted/50 rounded w-2/3"></div>
                      <div className="h-4 bg-muted/50 rounded w-1/2"></div>
                      <div className="h-4 bg-muted/50 rounded w-3/5"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {Object.entries(filteredCategories).map(([category, items]) => (
                  <div key={category} className="space-y-1 mb-4">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="flex items-center justify-between w-full text-base font-medium px-3 py-2 rounded-md hover:bg-muted"
                    >
                      <div className="flex items-center">
                        {getCategoryIcon(category)}
                        <span className="ml-2">{category}</span>
                      </div>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform ${
                          openCategories.includes(category) ? "transform rotate-180" : ""
                        }`} 
                      />
                    </button>
                    
                    {openCategories.includes(category) && (
                      <div className="pl-5 space-y-1 mt-1">
                        {items.map((item) => {
                          const isActive = location.pathname === `/docs/${item.slug}`;
                          return (
                            <Link
                              key={item.slug}
                              to={`/docs/${item.slug}`}
                              className={`flex items-center text-sm px-3 py-2 rounded-md ${
                                isActive 
                                  ? "bg-primary/10 text-primary" 
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                            >
                              <ChevronRight className="h-3 w-3 mr-2 flex-shrink-0" />
                              <span className="line-clamp-2">{item.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default DocsSidebar;
