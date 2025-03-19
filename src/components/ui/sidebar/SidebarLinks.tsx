
import React from 'react';
import { SidebarLink } from './SidebarComponents';

interface SidebarLinksProps {
  className?: string;
}

export const SidebarLinks: React.FC<SidebarLinksProps> = ({ className }) => {
  return (
    <div className={className} style={{ backdropFilter: 'blur(8px)' }}>
      <SidebarLink to="/" exact>
        Inicio
      </SidebarLink>
      <SidebarLink to="/about">
        Sobre nosotros
      </SidebarLink>
      <SidebarLink to="/projects">
        Proyectos
      </SidebarLink>
      <SidebarLink to="/events">
        Eventos
      </SidebarLink>
      <SidebarLink to="/resources">
        Recursos
      </SidebarLink>
      <SidebarLink to="/blog">
        Blog
      </SidebarLink>
      <SidebarLink to="/contact">
        Contacto
      </SidebarLink>
    </div>
  );
};
