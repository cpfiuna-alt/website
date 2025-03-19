
import React from "react";
import Layout from "@/components/Layout";
import RoadmapsSection from "@/components/resources/RoadmapsSection";
import CoursesSection from "@/components/resources/CoursesSection";
import ClubResourcesSection from "@/components/resources/ClubResourcesSection";
import ExternalResourcesSection from "@/components/resources/ExternalResourcesSection";
import ResourcesCTA from "@/components/resources/ResourcesCTA";

const ResourcesPage: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 py-16 pt-24 md:pt-32">
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Recursos <span className="text-gradient">Educativos</span>
          </h1>
          <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
            Explora nuestra colección de recursos para aprender programación y tecnología
          </p>
        </div>

        {/* Displaying all sections sequentially without tabs */}
        <div className="space-y-20">
          <RoadmapsSection />
          
          <CoursesSection />
          
          <ClubResourcesSection />
          
          <ExternalResourcesSection />
        </div>
        
        {/* Call to action */}
        <div className="mt-20">
          <ResourcesCTA />
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
