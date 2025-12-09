
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { Copy, CheckCheck } from 'lucide-react';
import { TocHeading, generateSlug, extractHeadings } from './markdownUtils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// NOTE: utility helpers (generateSlug / extractHeadings / TocHeading) were moved
// to `markdownUtils.ts` to avoid exporting non-component values from this file
// which breaks React Fast Refresh (eslint rule `react-refresh/only-export-components`).
// However, to be resilient against any upstream slugging issues, provide a
// local slug generator and ensure headings always receive a stable `id`.
const localSlugify = (s: string) =>
  String(s)
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = "" }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
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
          h1: ({ node, children, ...props }) => {
            const text = String(children);
            const idFromProps = (props as any).id;
            const id = idFromProps && String(idFromProps).trim() !== '' ? String(idFromProps) : localSlugify(text || 'heading');
            return <h1 {...props} id={id} className="text-3xl md:text-4xl font-bold mt-8 mb-4 scroll-mt-20">{children}</h1>;
          },
          h2: ({ node, children, ...props }) => {
            const text = String(children);
            const idFromProps = (props as any).id;
            const id = idFromProps && String(idFromProps).trim() !== '' ? String(idFromProps) : localSlugify(text || 'heading');
            return <h2 {...props} id={id} className="text-2xl md:text-3xl font-bold mt-8 mb-4 scroll-mt-20">{children}</h2>;
          },
          h3: ({ node, children, ...props }) => {
            const text = String(children);
            const idFromProps = (props as any).id;
            const id = idFromProps && String(idFromProps).trim() !== '' ? String(idFromProps) : localSlugify(text || 'heading');
            return <h3 {...props} id={id} className="text-xl md:text-2xl font-bold mt-6 mb-3 scroll-mt-20">{children}</h3>;
          },
          h4: ({ node, children, ...props }) => {
            const text = String(children);
            const idFromProps = (props as any).id;
            const id = idFromProps && String(idFromProps).trim() !== '' ? String(idFromProps) : localSlugify(text || 'heading');
            return <h4 {...props} id={id} className="text-lg md:text-xl font-semibold mt-6 mb-3 scroll-mt-20">{children}</h4>;
          },
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
          // Handle the <pre> element to prevent prose plugin's default styling
          pre: ({ node, children, ...props }) => {
            // Just pass through - the code component handles the actual rendering
            return <>{children}</>;
          },
          code: ({ node, className, children, ...props }) => {
            // Check if we're in a code block or inline code
            const isCodeBlock = className?.includes('language-');
            let codeContent = String(children).replace(/\n$/, '');

            // For fenced code blocks, normalize for a couple of edge-cases:
            // - If the author put inline backticks inside the fenced block
            //   (e.g. the block contains exactly `` `/info` ``), display it
            //   as '/info' (single-quoted). This matches the requested UX.
            // - Otherwise, display the block content verbatim (no added quotes).
            if (isCodeBlock) {
              // Trim surrounding whitespace to avoid false matches
              const raw = codeContent.replace(/^\s+|\s+$/g, '');
              const backtickWrapped = raw.match(/^`([\s\S]*)`$/s);
              if (backtickWrapped) {
                codeContent = backtickWrapped[1];
              } else {
                codeContent = raw;
              }
            }

            return isCodeBlock ? (
              <div className="relative group not-prose my-6">
                <button 
                  className="absolute right-2 top-2 z-10 p-1.5 rounded-md opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                  onClick={() => handleCopyCode(codeContent)}
                >
                  {copiedCode === codeContent ? (
                    <CheckCheck className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <pre className="bg-slate-200 dark:bg-muted text-slate-800 dark:text-slate-50 p-4 rounded-lg overflow-x-auto border border-border">
                  <code {...props} className={`${className || ''} text-sm block text-slate-800 dark:text-slate-50`}>{codeContent}</code>
                </pre>
              </div>
            ) : (
              <code {...props} className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-50 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
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
