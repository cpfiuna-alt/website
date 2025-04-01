
import React from "react";
import { Container } from "@/components/ui/container";

interface ProjectDetailGalleryProps {
  projectSlug: string;
}

const ProjectDetailGallery: React.FC<ProjectDetailGalleryProps> = ({ projectSlug }) => {
  // Project image map - we'll use this to show relevant images for each project
  const projectImages: Record<string, string[]> = {
    "neo-tracker": [
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581822261290-991b38693cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    "moonquake-visualizer": [
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528155124528-06c125d91497?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532364158125-0cd01dddab4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570404180088-a76c19ae4ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    "lunar-habitat": [
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1636816245390-1319499988f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441931931789-7969c5a4a3e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1467683140651-35575f16127e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    "analisis-datos-climaticos": [
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579847188900-d92970be5b0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533593116515-a3c0237e33e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    // Fallback images for other projects
    "default": [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ]
  };

  // Get images for this project or use default if none exist
  const images = projectImages[projectSlug] || projectImages.default;

  return (
    <Container className="px-6 md:px-8 lg:px-12 mb-16">
      <h2 className="text-2xl font-bold mb-6">Galería del proyecto</h2>
      <div className="grid grid-cols-12 gap-4 auto-rows-[150px]">
        {/* Main large image */}
        <div className="col-span-12 md:col-span-6 row-span-2 bg-muted rounded-lg overflow-hidden">
          <img 
            src={images[0]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Medium image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={images[1]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Medium image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={images[2]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Small image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={images[3]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Small image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={images[4]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Container>
  );
};

export default ProjectDetailGallery;
