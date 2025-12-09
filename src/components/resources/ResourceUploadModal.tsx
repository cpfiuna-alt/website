import React, { useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  resourceTypes: string[];
}

const ResourceUploadModal = ({ isOpen, onClose, onSubmit, resourceTypes }: ResourceUploadModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store original styles
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
      
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply scroll lock
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${parseInt(originalPaddingRight) + scrollbarWidth}px`;
      
      // Prevent keyboard scrolling
      const handleKeyDown = (e: KeyboardEvent) => {
        // Prevent arrow keys, page up/down, home/end from scrolling background
        const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Space'];
        if (scrollKeys.includes(e.code)) {
          // Only prevent if the target is not a form input
          const target = e.target as HTMLElement;
          if (!target.matches('input, textarea, select, [contenteditable]')) {
            e.preventDefault();
          }
        }
      };
      
      // Add event listeners
      document.addEventListener('keydown', handleKeyDown, { passive: false });
      
      // Cleanup function to restore original styles and remove listeners
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPaddingRight;
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // === RESOURCE UPLOAD ENDPOINT ===
    // Replace this with actual API endpoint for file uploads
    // Example:
    // const formData = new FormData(e.target as HTMLFormElement);
    // const response = await fetch('https://api.yoursite.com/resources/upload', {
    //   method: 'POST',
    //   body: formData, // Use FormData to handle file uploads
    // });
    // if (!response.ok) throw new Error('Upload failed');
    // === END RESOURCE UPLOAD ENDPOINT ===
    
    onSubmit(e);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onWheel={(e) => {
        // Completely block all wheel events on backdrop
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        // Completely block all touch scrolling on backdrop
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div 
        className="h-full overflow-y-auto"
        onWheel={(e) => {
          // Stop all wheel events from propagating to backdrop
          e.stopPropagation();
        }}
        onTouchMove={(e) => {
          // Stop all touch events from propagating to backdrop
          e.stopPropagation();
        }}
      >
        <div 
          className="min-h-full flex items-start justify-center p-4 pt-8 pb-8"
          onClick={(e) => {
            // Close modal if clicking on the backdrop (not the modal content)
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div 
            className="glass-card-static w-full max-w-2xl relative"
            onClick={(e) => {
              // Prevent modal from closing when clicking inside the card
              e.stopPropagation();
            }}
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center p-6 border-b border-muted/20">
              <h3 className="text-xl font-semibold">Subir nuevo recurso</h3>
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </button>
            </div>
            
            {/* Form content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Título
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-3 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="Nombre del recurso"
                  />
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Descripción
                  </label>
                  <textarea 
                    required
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                    placeholder="Breve descripción del recurso"
                  />
                </div>
                
                {/* Type and Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Tipo
                    </label>
                    <select 
                      id="resource-type"
                      name="type"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    >
                      <option value="">Seleccionar tipo</option>
                      {resourceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Autor
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-3 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                </div>
                
                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Etiquetas
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="React, JavaScript, Tutorial (separadas por comas)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separa las etiquetas con comas para mejor categorización
                  </p>
                </div>
                
                {/* File Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Archivo
                  </label>
                  <div className="border-2 border-dashed border-muted/50 rounded-lg p-6 text-center bg-muted/10 hover:bg-muted/20 transition-colors">
                    <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Arrastra y suelta archivos aquí o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Formatos soportados: PDF, ZIP, PPT, DOC, MP4 (máx. 100MB)
                    </p>
                    <input 
                      type="file" 
                      className="hidden" 
                      id="resource-file" 
                      required
                      accept=".pdf,.zip,.ppt,.pptx,.doc,.docx,.mp4,.mov,.avi"
                    />
                    <Button 
                      type="button"
                      variant="secondary"
                      onClick={() => document.getElementById('resource-file')?.click()}
                    >
                      Seleccionar archivo
                    </Button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t border-muted/20">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="mt-2 sm:mt-0"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Subir recurso
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceUploadModal;
