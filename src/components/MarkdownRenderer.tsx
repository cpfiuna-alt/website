import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';

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

  // Extend default sanitize schema to allow common img attributes and class/style so
  // authors can include HTML <img class="w-1/2 mx-auto" .../> in markdown.
  // IMPORTANT: hast-util-sanitize uses camelCase property names (className, not class)
  const schema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      img: [
        // permit common attributes on img
        // Use 'className' (camelCase) for hast compatibility, but also include 'class' for raw HTML
        'src', 'alt', 'title', 'width', 'height', 'className', 'class', 'style'
      ].concat(((defaultSchema.attributes as Record<string, unknown> | undefined)?.img as string[]) || []),
    },
  };

  return (
    <div className={`markdown-content prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        // enable raw HTML parsing, then sanitize with an extended schema
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" />,
          img: (props: { node?: unknown } & React.ImgHTMLAttributes<HTMLImageElement>) => {
            const { node, className: propClassName, alt, ...rest } = props;

            // Some rehype/rehype-raw/sanitize pipelines may leave the class
            // under different keys (e.g. `class` or `className`). Normalize
            // by checking multiple places so authors can write raw HTML with
            // `class="w-1/2"` or rely on the parsed `className` prop.
            const raw = rest as Record<string, unknown>;
            const rawClass = typeof raw['class'] === 'string' ? (raw['class'] as string) : undefined;
            const rawClassName = typeof raw['className'] === 'string' ? (raw['className'] as string) : undefined;
            const incomingClass = propClassName || rawClassName || rawClass;

            // Avoid forcing max-w-full here; let authors/classes control width when needed.
            const className = ["mx-auto", "rounded-md", incomingClass].filter(Boolean).join(" ");

            // rehype/rehype-raw may provide a `style` attribute as a string (e.g. "width:25% !important; display:block;").
            // React expects `style` to be an object. Convert style string -> React.CSSProperties when needed.
            const parseStyleString = (s: string): React.CSSProperties => {
              return s.split(';').map(part => part.trim()).filter(Boolean).reduce((acc: Record<string, string>, part) => {
                const [rawKey, ...rawValParts] = part.split(':');
                if (!rawKey || rawValParts.length === 0) return acc;
                const key = rawKey.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                let val = rawValParts.join(':').trim();
                // remove !important since React style objects don't support it
                val = val.replace(/!important/g, '').trim();
                acc[key] = val;
                return acc;
              }, {} as Record<string, string>);
            };

            // Remove any duplicate class/className keys from the rest props
            const imageProps = { ...(rest as React.ImgHTMLAttributes<HTMLImageElement>) } as Record<string, unknown>;
            delete imageProps['class'];
            delete imageProps['className'];

            const incomingStyle = (imageProps as Record<string, unknown>).style;
            const styleProp = typeof incomingStyle === 'string' && incomingStyle.length > 0
              ? parseStyleString(incomingStyle as string)
              : incomingStyle as React.CSSProperties | undefined;

            return (
              <figure className="mx-auto">
                <img
                  {...(imageProps as React.ImgHTMLAttributes<HTMLImageElement>)}
                  loading="lazy"
                  className={className}
                  style={styleProp}
                  alt={alt || ""}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }}
                />
                {(() => {
                  const caption = alt ?? (imageProps.title as unknown as string) ?? undefined;
                  return caption ? (
                    <figcaption className="mt-2 text-xs italic text-center text-muted-foreground">{String(caption)}</figcaption>
                  ) : null;
                })()}
              </figure>
            );
          },
          code: ({inline, className, children, ...props}: CodeProps) => {
            const language = /language-(\w+)/.exec(className || '')?.[1];
            const raw = String(children).replace(/\n$/, '');

            // For fenced code blocks only: if the block contains a single pair
            // of inline backticks (`` `/info` ``) convert to /info without
            // adding extra single-quote characters. Otherwise display verbatim.
            const trimmed = raw.replace(/^\s+|\s+$/g, '');
            const backtickMatch = trimmed.match(/^`([\s\S]*)`$/s);
            const display = backtickMatch ? backtickMatch[1] : trimmed;

            if (!inline) {
              return (
                  <div className="not-prose my-6">
                    <pre className="bg-slate-200 dark:bg-muted text-slate-800 dark:text-slate-50 p-4 rounded-lg overflow-x-auto text-sm border border-border" data-lang={language}>
                      <code {...props} className="text-slate-800 dark:text-slate-50">{display}</code>
                    </pre>
                  </div>
                );
            }
            return <code className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
          },
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
