
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Resource {
  title: string;
  url: string;
}

interface DocResourcesProps {
  resources: Array<Resource>;
}

const DocResources: React.FC<DocResourcesProps> = ({ resources }) => {
  return (
    <div className="border-t border-border pt-6">
      <h2 className="text-2xl font-semibold mb-4">Recursos adicionales</h2>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{resource.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocResources;
