
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link } from 'react-router-dom';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = "" }) => {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, ...props }) => {
            const href = props.href || '';
            const isInternal = href.startsWith('/') || href.startsWith('#');
            
            if (isInternal && !href.startsWith('#')) {
              return <Link to={href} {...props} className="text-primary hover:underline" />;
            }
            
            return (
              <a 
                {...props} 
                className="text-primary hover:underline"
                target={!isInternal ? "_blank" : undefined}
                rel={!isInternal ? "noopener noreferrer" : undefined}
              />
            );
          },
          h1: ({ node, ...props }) => <h1 {...props} className="text-3xl md:text-4xl font-bold mt-8 mb-4" />,
          h2: ({ node, ...props }) => <h2 {...props} className="text-2xl md:text-3xl font-bold mt-8 mb-4" />,
          h3: ({ node, ...props }) => <h3 {...props} className="text-xl md:text-2xl font-bold mt-6 mb-3" />,
          h4: ({ node, ...props }) => <h4 {...props} className="text-lg md:text-xl font-semibold mt-6 mb-3" />,
          p: ({ node, ...props }) => <p {...props} className="my-4" />,
          ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-6 my-4" />,
          ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-6 my-4" />,
          li: ({ node, ...props }) => <li {...props} className="mb-1" />,
          blockquote: ({ node, ...props }) => (
            <blockquote 
              {...props} 
              className="border-l-4 border-primary pl-4 italic my-4" 
            />
          ),
          code: ({ node, className, ...props }) => {
            // Check if we're in a code block or inline code
            const isCodeBlock = className?.includes('language-');
            
            return isCodeBlock ? (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code {...props} className="text-sm" />
              </pre>
            ) : (
              <code {...props} className="bg-muted px-1 py-0.5 rounded text-sm" />
            );
          },
          img: ({ node, ...props }) => (
            <img 
              {...props} 
              className="rounded-lg my-6 mx-auto max-w-full h-auto" 
              loading="lazy"
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table {...props} className="min-w-full divide-y divide-border" />
            </div>
          ),
          th: ({ node, ...props }) => <th {...props} className="px-4 py-2 bg-muted font-medium" />,
          td: ({ node, ...props }) => <td {...props} className="px-4 py-2 border-t border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
