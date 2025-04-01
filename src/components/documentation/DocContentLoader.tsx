
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocFrontMatter } from "@/utils/markdownUtils";
import { getContentBySlug } from "@/utils/staticSiteGenerator";
import { DocSection } from "./DocSections";

interface DocContentLoaderProps {
  slug?: string;
  children: (props: {
    docData: { frontMatter: DocFrontMatter; content: string } | null;
    loading: boolean;
    sections: DocSection[];
  }) => React.ReactNode;
}

const DocContentLoader: React.FC<DocContentLoaderProps> = ({ slug, children }) => {
  const navigate = useNavigate();
  const [docData, setDocData] = useState<{
    frontMatter: DocFrontMatter;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<DocSection[]>([]);

  useEffect(() => {
    // Scroll to top when content changes
    window.scrollTo(0, 0);
    
    const fetchDocContent = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const content = await getContentBySlug<DocFrontMatter>('docs', slug);
        if (content) {
          setDocData({
            frontMatter: content.frontMatter,
            content: content.content
          });
          
          // Parse content sections
          const parsedSections = parseSections(content.content);
          setSections(parsedSections);
        }
      } catch (error) {
        console.error("Error fetching documentation:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocContent();
  }, [slug]);
  
  // Function to extract section content by section name
  const parseSections = (content: string): DocSection[] => {
    const sections: DocSection[] = [];
    
    // Always include main content
    const mainSectionContent = content.split(/^## /m)[0];
    sections.push({ 
      id: "overview", 
      title: "Descripción General", 
      content: mainSectionContent 
    });
    
    // Find all sections that start with ## 
    const regex = /^## (.*?)$([\s\S]*?)(?=^## |\s*$)/gm;
    let match;
    
    while ((match = regex.exec(content))) {
      const title = match[1].trim();
      const sectionContent = match[0]; // Include the heading
      
      // Create section ID from title (slug-like)
      const id = title
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
        
      // Add special sections
      if (
        title.includes('Ejemplos') || 
        title.includes('Examples') ||
        title.includes('Guía') || 
        title.includes('Guide') ||
        title.includes('API') || 
        title.includes('Reference')
      ) {
        const sectionType = title.includes('Ejemplos') || title.includes('Examples') 
          ? 'examples'
          : title.includes('API') || title.includes('Reference')
            ? 'api'
            : 'guide';
            
        sections.push({ id: sectionType, title, content: sectionContent });
      } else {
        // Add regular sections
        sections.push({ id, title, content: sectionContent });
      }
    }
    
    return sections;
  };
  
  return <>{children({ docData, loading, sections })}</>;
};

export default DocContentLoader;
