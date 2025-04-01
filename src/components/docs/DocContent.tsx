
import React from 'react';
import { DocFrontMatter } from '@/utils/markdown/types';
import MarkdownContent from '@/components/markdown/MarkdownContent';
import DocHeader from './DocHeader';
import DocResources from './DocResources';
import DocFeedback from './DocFeedback';

interface DocContentProps {
  frontMatter: DocFrontMatter;
  content: string;
}

const DocContent: React.FC<DocContentProps> = ({ frontMatter, content }) => {
  return (
    <div className="max-w-3xl">
      <DocHeader frontMatter={frontMatter} />
      
      <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
        <MarkdownContent content={content} />
      </div>
      
      {frontMatter.resources && frontMatter.resources.length > 0 && (
        <div className="mb-10">
          <DocResources resources={frontMatter.resources} />
        </div>
      )}
      
      <DocFeedback />
    </div>
  );
};

export default DocContent;
