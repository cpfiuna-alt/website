
import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  // In a real implementation, we would use a markdown library like react-markdown
  // For this demo, we'll do a simple conversion of basic markdown elements
  
  const formatMarkdown = (markdownText: string) => {
    if (!markdownText) return '';
    
    // Convert headers
    let formattedText = markdownText
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-4 mt-6">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold mb-2 mt-4">$1</h4>');
    
    // Convert emphasis
    formattedText = formattedText
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert lists
    formattedText = formattedText
      .replace(/^\- (.+)$/gm, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 list-decimal">$2</li>');
    
    // Wrap lists
    formattedText = formattedText
      .replace(/(<li class="ml-6 list-disc">.*?<\/li>(\n|$))+/gs, (match) => {
        return `<ul class="mb-4 space-y-2">${match}</ul>`;
      })
      .replace(/(<li class="ml-6 list-decimal">.*?<\/li>(\n|$))+/gs, (match) => {
        return `<ol class="mb-4 space-y-2">${match}</ol>`;
      });
    
    // Convert links
    formattedText = formattedText
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert code blocks
    formattedText = formattedText
      .replace(/```([a-z]*)\n([\s\S]*?)\n```/g, (match, language, code) => {
        return `<pre class="bg-muted p-4 rounded-md overflow-x-auto mb-4"><code class="text-sm">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
      });
    
    // Convert inline code
    formattedText = formattedText
      .replace(/`([^`]+)`/g, '<code class="bg-muted/50 px-1 py-0.5 rounded text-sm">$1</code>');
    
    // Convert paragraphs (must be done last to avoid messing up other elements)
    formattedText = formattedText
      .replace(/^([^<].*?)$/gm, '<p class="mb-4 text-muted-foreground">$1</p>');
      
    // Remove empty paragraphs and clean up
    formattedText = formattedText
      .replace(/<p class="mb-4 text-muted-foreground"><\/p>/g, '')
      .replace(/\n/g, '');
    
    return formattedText;
  };
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} 
      className={`markdown-content ${className}`} 
    />
  );
};

export default MarkdownRenderer;
