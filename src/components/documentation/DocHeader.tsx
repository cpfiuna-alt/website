
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DocFrontMatter } from "@/utils/markdownUtils";

interface DocHeaderProps {
  title?: string;
  slug?: string;
  frontMatter: DocFrontMatter;
}

const DocHeader: React.FC<DocHeaderProps> = ({ title, slug, frontMatter }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <button 
        onClick={() => navigate('/docs')}
        className="mr-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
        aria-label="Volver a la documentación"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div>
        <h1 className="text-3xl font-bold m-0">{title || slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
        {frontMatter.description && (
          <p className="text-muted-foreground mt-2 mb-0">{frontMatter.description}</p>
        )}
      </div>
    </div>
  );
};

export default DocHeader;
