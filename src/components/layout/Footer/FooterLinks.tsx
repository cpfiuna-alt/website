
import React from "react";
import { Link } from "react-router-dom";

export interface FooterLinkSection {
  title: string;
  links: {
    name: string;
    href: string;
    external?: boolean;
  }[];
}

interface FooterLinksProps {
  linkSections: FooterLinkSection[];
}

const FooterLinks = ({ linkSections }: FooterLinksProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-border">
      {linkSections.map((section, i) => (
        <div key={i} className="mb-6 md:mb-0">
          <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
          <ul className="space-y-2">
            {section.links.map((link, j) => (
              <li key={j}>
                {link.external ? (
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
