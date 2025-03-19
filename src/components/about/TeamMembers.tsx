
import React from "react";
import { teamMembers, secretariaMembers } from "./TeamMembersData";
import TeamSection from "./TeamSection";

const TeamMembers = () => {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <TeamSection 
          title={<>Nuestra <span className="gradient-text">Comisión Directiva</span></>}
          members={teamMembers}
        />

        <div className="mt-20">
          <TeamSection 
            title={<>Nuestras <span className="gradient-text">Secretarías</span></>}
            members={secretariaMembers}
          />
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
