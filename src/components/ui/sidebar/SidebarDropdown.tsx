
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarLink } from './SidebarComponents';

interface SidebarDropdownProps {
  title: string;
  items: Array<{ slug: string; title: string; url: string }>;
  allItemsLink?: string;
  allItemsText?: string;
  defaultOpen?: boolean;
  className?: string;
}

export const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ 
  title, 
  items, 
  allItemsLink,
  allItemsText = "Ver todos",
  defaultOpen = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`mb-4 ${className || ''}`}>
      <button 
        className="flex items-center justify-between w-full py-2 px-3 text-sm font-medium hover:bg-muted/50 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      
      {isOpen && items.length > 0 && (
        <div className="mt-1 ml-3 pl-3 border-l border-border">
          {items.map((item) => (
            <SidebarLink 
              key={item.slug} 
              to={item.url}
              className="py-1.5 text-xs"
            >
              {item.title}
            </SidebarLink>
          ))}
          {allItemsLink && (
            <SidebarLink to={allItemsLink} className="py-1.5 text-xs text-primary">
              {allItemsText} →
            </SidebarLink>
          )}
        </div>
      )}
    </div>
  );
};
