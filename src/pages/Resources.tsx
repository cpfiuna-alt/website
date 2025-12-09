
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ResourcesHero from "@/components/resources/ResourcesHero";
import LearningRoadmaps from "@/components/resources/LearningRoadmaps";
import ClubResources from "@/components/resources/ClubResources";
import ExternalResources from "@/components/resources/ExternalResources";
import ResourcesCallToAction from "@/components/resources/ResourcesCallToAction";
import CoursesSection from "@/components/resources/CoursesSection";
import ResourceUploadModal from "@/components/resources/ResourceUploadModal";

const Resources = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission here
    setIsUploadModalOpen(false);
  };

  // Roadmaps are currently external links; no in-app selection handler

  const resourceTypes = ["Curso", "Tutorial", "Documentación", "Video", "Ejercicios"];

  // Interactive roadmaps are disabled for now; cards link to external roadmap.sh

  return (
    <Layout>
      <ResourcesHero />
      <LearningRoadmaps />
      <CoursesSection />
      <ClubResources />
      <ExternalResources />
      <ResourcesCallToAction onOpenUploadModal={handleOpenUploadModal} />
      <ResourceUploadModal 
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSubmit={handleUploadSubmit}
        resourceTypes={resourceTypes}
      />
    </Layout>
  );
};

export default Resources;
