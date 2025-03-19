
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/media-kit/HeroSection";
import BrandAssets from "@/components/media-kit/BrandAssets";
import UsageGuidelines from "@/components/media-kit/UsageGuidelines";

const MediaKit = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandAssets />
      <UsageGuidelines />
    </Layout>
  );
};

export default MediaKit;
