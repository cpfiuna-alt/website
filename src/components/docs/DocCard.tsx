
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Code, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DocCardProps {
  title: string;
  description: string;
  slug: string;
  category?: string;
}

const DocCard: React.FC<DocCardProps> = ({
  title,
  description,
  slug,
  category
}) => {
  // Get category icon based on category or title keywords
  const getIcon = () => {
    const lowerCategory = category?.toLowerCase() || '';
    const lowerTitle = title.toLowerCase();
    
    if (lowerCategory.includes('api') || lowerTitle.includes('api')) {
      return <Code className="h-5 w-5 text-primary" />;
    } else if (
      lowerCategory.includes('guía') || 
      lowerCategory.includes('guide') || 
      lowerTitle.includes('guía') || 
      lowerTitle.includes('introducción')
    ) {
      return <Book className="h-5 w-5 text-primary" />;
    } else {
      return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden bg-card">
      <Link to={`/docs/${slug}`} className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="mb-2">{getIcon()}</div>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto pt-4">
          <div className="flex items-center text-primary text-sm font-medium">
            Leer documentación
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default DocCard;
