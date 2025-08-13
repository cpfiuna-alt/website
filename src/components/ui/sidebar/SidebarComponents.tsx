
import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarLinkProps extends Omit<NavLinkProps, 'children'> {
  exact?: boolean;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  children, 
  exact = false, 
  className,
  icon,
  ...props 
}) => {
  return (
    <NavLink
      {...props}
      end={exact}
      className={({ isActive }) => 
        cn(
          "flex items-center py-2 px-3 text-sm rounded-md transition-colors",
          isActive 
            ? "bg-primary/10 text-primary font-medium" 
            : "hover:bg-muted/80 hover:text-foreground",
          className
        )
      }
    >
      {({isActive}) => (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </NavLink>
  );
};
