
import React from 'react';
import { Home, Info, FolderKanban, Calendar, BookOpen, FileText, Mail } from 'lucide-react';
import { SidebarLink } from './SidebarComponents';

interface SidebarLinksProps {
  className?: string;
}

export const SidebarLinks: React.FC<SidebarLinksProps> = ({ className }) => {
  return (
    <div className={className} style={{ backdropFilter: 'blur(8px)' }}>
      <SidebarLink to="/" exact icon={<Home className="h-4 w-4" />}>
        Inicio
      </SidebarLink>
      <SidebarLink to="/about" icon={<Info className="h-4 w-4" />}>
        Sobre nosotros
      </SidebarLink>
      <SidebarLink to="/projects" icon={<FolderKanban className="h-4 w-4" />}>
        Proyectos
      </SidebarLink>
      <SidebarLink to="/events" icon={<Calendar className="h-4 w-4" />}>
        Eventos
      </SidebarLink>
      <SidebarLink to="/resources" icon={<BookOpen className="h-4 w-4" />}>
        Recursos
      </SidebarLink>
      <SidebarLink to="/blog" icon={<FileText className="h-4 w-4" />}>
        Blog
      </SidebarLink>
      <SidebarLink to="/contact" icon={<Mail className="h-4 w-4" />}>
        Contacto
      </SidebarLink>
    </div>
  );
};
