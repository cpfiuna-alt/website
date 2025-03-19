
import React from "react";
import LogoSection from "./LogoSection";
import ColorsSection from "./ColorsSection";
import TypographySection from "./TypographySection";
import DownloadPackage from "./DownloadPackage";

const BrandAssets = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Identidad visual</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nuestra marca representa nuestra misión de fomentar el aprendizaje colaborativo y el desarrollo
            tecnológico en la comunidad universitaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <LogoSection />
          <ColorsSection />
        </div>

        <TypographySection />
        <DownloadPackage />
      </div>
    </section>
  );
};

export default BrandAssets;
