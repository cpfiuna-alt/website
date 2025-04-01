
import React from "react";
import { ExternalLink } from "lucide-react";

interface Resource {
  title: string;
  url: string;
}

interface DocResourcesProps {
  resources?: Array<Resource>;
}

const DocResources: React.FC<DocResourcesProps> = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recursos Adicionales</h2>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocResources;
