
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ResourcesHero from "@/components/resources/ResourcesHero";
import LearningRoadmaps from "@/components/resources/LearningRoadmaps";
import ClubResources from "@/components/resources/ClubResources";
import ExternalResources from "@/components/resources/ExternalResources";
import ResourcesCallToAction from "@/components/resources/ResourcesCallToAction";
import CoursesSection from "@/components/resources/CoursesSection";

const Resources = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <Layout>
      <ResourcesHero />
      <LearningRoadmaps 
        selectedRoadmap={selectedRoadmap} 
        setSelectedRoadmap={setSelectedRoadmap} 
      />
      <CoursesSection />
      <ClubResources />
      <ExternalResources />
      <ResourcesCallToAction onOpenUploadModal={handleOpenUploadModal} />
    </Layout>
  );
};

export default Resources;
