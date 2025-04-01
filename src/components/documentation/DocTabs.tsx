
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocSection } from "./DocSections";
import DocSections from "./DocSections";
import DocResources from "./DocResources";
import { DocFrontMatter } from "@/utils/markdownUtils";

interface DocTabsProps {
  sections: DocSection[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  frontMatter: DocFrontMatter;
}

const DocTabs: React.FC<DocTabsProps> = ({ 
  sections, 
  activeTab, 
  setActiveTab, 
  frontMatter 
}) => {
  // Check which tabs should be available
  const hasGuide = sections.some(s => s.id === 'guide');
  const hasAPIReference = sections.some(s => s.id === 'api');
  const hasExamples = sections.some(s => s.id === 'examples');
  const hasResources = frontMatter.resources && frontMatter.resources.length > 0;
  
  return (
    <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">Descripción General</TabsTrigger>
        {hasGuide && <TabsTrigger value="guide">Guía</TabsTrigger>}
        {hasAPIReference && <TabsTrigger value="api">API</TabsTrigger>}
        {hasExamples && <TabsTrigger value="examples">Ejemplos</TabsTrigger>}
        {hasResources && <TabsTrigger value="resources">Recursos</TabsTrigger>}
        
        {/* Show additional sections as tabs */}
        {sections
          .filter(section => !['overview', 'guide', 'api', 'examples'].includes(section.id))
          .map(section => (
            <TabsTrigger key={section.id} value={section.id}>{section.title}</TabsTrigger>
          ))
        }
      </TabsList>
      
      {/* Render each section content */}
      {sections.map(section => (
        <TabsContent key={section.id} value={section.id}>
          <DocSections sections={sections} activeTab={section.id} />
        </TabsContent>
      ))}
      
      {/* Resources tab */}
      {hasResources && (
        <TabsContent value="resources">
          <DocResources resources={frontMatter.resources} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default DocTabs;
