
import React from "react";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
  };
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard = ({ member, index }: TeamMemberCardProps) => {
  return (
    <div 
      key={member.name}
      className="opacity-0 animate-fade-in"
      style={{ animationDelay: `${0.1 * (index + 1)}s`, animationFillMode: "forwards" }}
    >
      <div className="glass-card-static overflow-hidden hover:shadow-neon-blue transition-all duration-300 h-full flex flex-col">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 py-8">
          <div className="h-28 w-28 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/10">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-center">{member.name}</h3>
          <p className="text-muted-foreground text-center">{member.role}</p>
        </div>
        
        <div className="p-6 flex-grow">
          <p className="text-sm text-muted-foreground">{member.bio}</p>
        </div>
        
        <div className="p-4 flex justify-center gap-4 border-t border-border">
          <a href={member.social.instagram} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={member.social.github} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
          <a href={member.social.email} className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
