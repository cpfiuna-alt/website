
import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { ProjectFrontMatter } from "@/utils/markdownUtils";
import { ImageModal } from "@/components/ui/image-modal";

interface ProjectDetailGalleryProps {
  project: ProjectFrontMatter;
}

const ProjectDetailGallery: React.FC<ProjectDetailGalleryProps> = ({ project }) => {
  // Get actual available images from gallery, filtering out placeholders
  const availableImages = project.gallery && project.gallery.length > 0 
    ? project.gallery.filter(img => img && img !== "/placeholder.svg")
    : [];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Don't render gallery if no images available
  if (availableImages.length === 0) {
    return null;
  }

  const openModal = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
    setSelectedIndex(0);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = selectedIndex > 0 ? selectedIndex - 1 : availableImages.length - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(availableImages[newIndex]);
    } else if (direction === 'next') {
      const newIndex = selectedIndex < availableImages.length - 1 ? selectedIndex + 1 : 0;
      setSelectedIndex(newIndex);
      setSelectedImage(availableImages[newIndex]);
    }
  };

  const renderGalleryLayout = () => {
    const count = availableImages.length;

    switch (count) {
      case 1:
        // Single large image
        return (
          <div className="w-full max-w-4xl mx-auto">
            <img 
              src={availableImages[0]} 
              alt="Project screenshot" 
              className="w-full h-[400px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(availableImages[0], 0)}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        );

      case 2:
        // Two images side by side
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableImages.map((img, index) => (
              <div key={index} className="bg-muted rounded-lg overflow-hidden">
                <img 
                  src={img} 
                  alt={`Project screenshot ${index + 1}`} 
                  className="w-full h-[300px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openModal(img, index)}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            ))}
          </div>
        );

      case 3:
        // One large, two smaller stacked
        return (
          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            <div className="col-span-12 md:col-span-8 row-span-2 bg-muted rounded-lg overflow-hidden">
              <img 
                src={availableImages[0]} 
                alt="Project screenshot 1" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(availableImages[0], 0)}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-4 row-span-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src={availableImages[1]} 
                alt="Project screenshot 2" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(availableImages[1], 1)}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-4 row-span-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src={availableImages[2]} 
                alt="Project screenshot 3" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(availableImages[2], 2)}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>
        );

      case 4:
        // Four corners grid
        return (
          <div className="grid grid-cols-2 gap-4">
            {availableImages.map((img, index) => (
              <div key={index} className="bg-muted rounded-lg overflow-hidden">
                <img 
                  src={img} 
                  alt={`Project screenshot ${index + 1}`} 
                  className="w-full h-[250px] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openModal(img, index)}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            ))}
          </div>
        );

      default: {
        // 5+ images: main layout with first 5 images
        const displayImages = availableImages.slice(0, 5);
        return (
          <div className="grid grid-cols-12 gap-4 auto-rows-[150px]">
            {/* Main large image */}
            <div className="col-span-12 md:col-span-6 row-span-2 bg-muted rounded-lg overflow-hidden">
              <img 
                src={displayImages[0]} 
                alt="Project screenshot 1" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(displayImages[0], 0)}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            
            {/* Medium images */}
            <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src={displayImages[1]} 
                alt="Project screenshot 2" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(displayImages[1], 1)}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            
            <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src={displayImages[2]} 
                alt="Project screenshot 3" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(displayImages[2], 2)}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            
            {/* Small images */}
            <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src={displayImages[3]} 
                alt="Project screenshot 4" 
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openModal(displayImages[3], 3)}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
            
            <div className="col-span-6 md:col-span-3 row-span-1 bg-muted rounded-lg overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openModal(displayImages[4], 4)}>
              <img 
                src={displayImages[4]} 
                alt="Project screenshot 5" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              {availableImages.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold">+{availableImages.length - 5} más</span>
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <Container className="px-6 md:px-8 lg:px-12 mb-16">
      {/* <h2 className="text-2xl font-bold mb-6">
        Galería del proyecto
        <span className="text-sm text-muted-foreground ml-2">
          ({availableImages.length} imagen{availableImages.length !== 1 ? 'es' : ''})
        </span>
      </h2> */}
      {renderGalleryLayout()}
      
      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        imageSrc={selectedImage}
        imageAlt={`Project screenshot ${selectedIndex + 1}`}
        imageIndex={selectedIndex}
        totalImages={availableImages.length}
        allImages={availableImages}
        onNavigate={handleNavigate}
      />
    </Container>
  );
};

export default ProjectDetailGallery;
