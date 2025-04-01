
import React from 'react';
import { ArrowLeft, Calendar, Clock, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DocFrontMatter } from '@/utils/markdown/types';

interface DocHeaderProps {
  frontMatter: DocFrontMatter;
}

const DocHeader: React.FC<DocHeaderProps> = ({ frontMatter }) => {
  return (
    <div>
      {/* Back button */}
      <Link 
        to="/docs" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver a la documentación
      </Link>
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-3">{frontMatter.title}</h1>
      
      {/* Description */}
      {frontMatter.description && (
        <p className="text-lg text-muted-foreground mb-4">{frontMatter.description}</p>
      )}
      
      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
        {frontMatter.updatedAt && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Actualizado: {frontMatter.updatedAt}</span>
          </div>
        )}
        
        {frontMatter.readTime && (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Tiempo de lectura: {frontMatter.readTime}</span>
          </div>
        )}
        
        {frontMatter.githubUrl && (
          <a 
            href={frontMatter.githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary"
          >
            <Github className="h-4 w-4 mr-1" />
            <span>Ver en GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default DocHeader;
