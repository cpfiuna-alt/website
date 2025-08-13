import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

type CodeProps = React.PropsWithChildren<{inline?: boolean; className?: string}> & React.HTMLAttributes<HTMLElement>;

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  // Preprocess content to clean up any malformed backticks
  const preprocessContent = (text: string): string => {
    return text
      // Remove standalone backticks that aren't part of code blocks
      .replace(/(?<!`)`(?!`)/g, '')
      // Clean up lines that are just backticks
      .replace(/^\s*`\s*$/gm, '')
      // Fix any broken code block patterns
      .replace(/```\n\s*```/g, '')
      // Remove empty code blocks
      .replace(/```(\w+)?\s*\n\s*```/g, '');
  };

  const cleanContent = preprocessContent(content);

  return (
    <div className={`markdown-content prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />,
          code: ({inline, className, children, ...props}: CodeProps) => {
            const language = /language-(\w+)/.exec(className || '')?.[1];
            
            if (!inline) {
              return (
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm" data-lang={language}>
                  <code {...props}>{children}</code>
                </pre>
              );
            }
            return <code className="bg-muted/50 px-1 py-0.5 rounded text-sm" {...props}>{children}</code>;
          },
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
