
import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import { TeamMember } from "./TeamMemberCard";

interface TeamSectionProps {
  title: React.ReactNode;
  members: TeamMember[];
}

const TeamSection = ({ title, members }: TeamSectionProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-12 text-center">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, index) => (
          <TeamMemberCard 
            key={member.name} 
            member={member} 
            index={index} 
          />
        ))}
      </div>
    </>
  );
};

export default TeamSection;
