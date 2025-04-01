
import React from "react";
import { Calendar, Clock, User, Github, ExternalLink } from "lucide-react";
import { DocFrontMatter } from "@/utils/markdownUtils";

interface DocMetadataProps {
  frontMatter: DocFrontMatter;
}

const DocMetadata: React.FC<DocMetadataProps> = ({ frontMatter }) => {
  if (!frontMatter.updatedAt && !frontMatter.tags && !frontMatter.author && !frontMatter.readTime && !frontMatter.githubUrl) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
      {frontMatter.updatedAt && (
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Updated: {frontMatter.updatedAt}</span>
        </div>
      )}
      {frontMatter.readTime && (
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{frontMatter.readTime}</span>
        </div>
      )}
      {frontMatter.author && (
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>{frontMatter.author}</span>
        </div>
      )}
      {frontMatter.githubUrl && (
        <a 
          href={frontMatter.githubUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <Github className="h-4 w-4 mr-1" />
          <span>Ver en GitHub</span>
        </a>
      )}
    </div>
  );
};

export default DocMetadata;
