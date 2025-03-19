
import React from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Globe, 
  Mail,
  Instagram,
  SquareCode 
} from "lucide-react";

export interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
    email?: string;
  };
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  bio,
  social
}) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full max-w-xs mx-auto">
      <div className="flex flex-col items-center p-6 pb-2">
        <div className="relative w-32 h-32 rounded-full mb-4 overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-white text-center">{name}</h3>
        <p className="text-primary text-sm mb-2 text-center">{role}</p>
      </div>
      
      <div className="p-4 border-t border-gray-800 text-[#94a3b8] flex-grow">
        <p className="text-sm text-center">{bio}</p>
      </div>
      
      {social && (
        <div className="flex justify-center space-x-4 p-4 pt-0 pb-6 mt-auto">
          {social.instagram && (
            <a 
              href={social.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#94a3b8] hover:text-primary transition-colors"
              aria-label={`Instagram de ${name}`}
            >
              <Instagram size={20} />
            </a>
          )}
          {social.linkedin && (
            <a 
              href={social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#94a3b8] hover:text-primary transition-colors"
              aria-label={`LinkedIn de ${name}`}
            >
              <Linkedin size={20} />
            </a>
          )}
          {social.github && (
            <a 
              href={social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#94a3b8] hover:text-primary transition-colors"
              aria-label={`GitHub de ${name}`}
            >
              <Github size={20} />
            </a>
          )}
          {social.twitter && (
            <a 
              href={social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#94a3b8] hover:text-primary transition-colors"
              aria-label={`Twitter de ${name}`}
            >
              <Twitter size={20} />
            </a>
          )}
          {social.email && (
            <a 
              href={`mailto:${social.email}`}
              className="text-[#94a3b8] hover:text-primary transition-colors"
              aria-label={`Email de ${name}`}
            >
              <Mail size={20} />
            </a>
          )}
          {social.website && (
            <a 
              href={social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94a3b8] hover:text-primary transition-colors"
              aria-label={`Sitio web de ${name}`}
            >
              <Globe size={20} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
