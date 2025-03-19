
import React from "react";
import { Github, Twitter, Instagram, Youtube } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <a
      href={href}
      className="text-muted-foreground hover:text-primary transition-colors p-2"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

interface FooterSocialProps {
  socialLinks: React.ReactNode;
}

const FooterSocial = ({ socialLinks }: FooterSocialProps) => {
  return (
    <div className="flex justify-center md:justify-start space-x-4">
      {socialLinks}
    </div>
  );
};

export default FooterSocial;
