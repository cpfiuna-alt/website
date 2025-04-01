
import React from "react";
import { DocFrontMatter } from "@/utils/markdownUtils";
import MarkdownContent from "@/components/markdown/MarkdownContent";

export interface DocSection {
  id: string;
  title: string;
  content: string;
}

interface DocSectionsProps {
  sections: DocSection[];
  activeTab: string;
}

const DocSections: React.FC<DocSectionsProps> = ({ sections, activeTab }) => {
  const activeSection = sections.find(section => section.id === activeTab);
  
  if (!activeSection) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none mt-6">
        <p>Sección no encontrada</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <MarkdownContent content={activeSection.content} />
    </div>
  );
};

export default DocSections;
