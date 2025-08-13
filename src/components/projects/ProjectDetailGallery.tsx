
import React from "react";
import { Container } from "@/components/ui/container";
import { ProjectFrontMatter } from "@/utils/markdownUtils";

interface ProjectDetailGalleryProps {
  project: ProjectFrontMatter;
}

const ProjectDetailGallery: React.FC<ProjectDetailGalleryProps> = ({ project }) => {
  // Default fallback images if no gallery is specified in frontmatter
  const defaultImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  // Use gallery from frontmatter or fallback to default images
  const images = project.gallery && project.gallery.length > 0 ? project.gallery : defaultImages;

  // Ensure we always have 5 images, filling missing ones with placeholder.svg
  const galleryImages = [];
  for (let i = 0; i < 5; i++) {
    galleryImages.push(images[i] || "/placeholder.svg");
  }

  // Always render the gallery (removed the length check)
  // if (images.length < 5) {
  //   console.log('ProjectDetailGallery - Not enough images, not rendering');
  //   return null;
  // }

  return (
    <Container className="px-6 md:px-8 lg:px-12 mb-16">
      <h2 className="text-2xl font-bold mb-6">Galería del proyecto</h2>
      {galleryImages[0] === "/placeholder.svg" && (
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            No se pudieron cargar las imágenes del proyecto
          </p>
        </div>
      )}
      <div className="grid grid-cols-12 gap-4 auto-rows-[150px]">
        {/* Main large image */}
        <div className="col-span-12 md:col-span-6 row-span-2 bg-muted rounded-lg overflow-hidden">
          <img 
            src={galleryImages[0]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        
        {/* Medium image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={galleryImages[1]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        
        {/* Medium image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={galleryImages[2]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        
        {/* Small image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={galleryImages[3]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        
        {/* Small image */}
        <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
          <img 
            src={galleryImages[4]} 
            alt="Project screenshot" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProjectDetailGallery;
