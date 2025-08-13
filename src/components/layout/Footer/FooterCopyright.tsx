
import React from "react";
import { Link } from "react-router-dom";

interface FooterCopyrightProps {
  legalLinks?: { name: string; href: string }[];
  copyrightText?: string;
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ 
  legalLinks, 
  copyrightText 
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center text-sm text-muted-foreground">
      <p>
        © {currentYear} <Link to="/humans.txt" className="hover:text-primary transition-colors">Club de Programación FIUNA</Link>
      </p>
      <p className="mt-2">
        Facultad de Ingeniería, Universidad Nacional de Asunción
      </p>
      
      {legalLinks && legalLinks.length > 0 && (
        <div className="mt-4 flex justify-center space-x-4">
          {legalLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-xs hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FooterCopyright;
