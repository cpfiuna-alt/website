import React from "react";
import { Upload } from "lucide-react";

interface ResourceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  resourceTypes: string[];
}

const ResourceUploadModal = ({ isOpen, onClose, onSubmit, resourceTypes }: ResourceUploadModalProps) => {
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-xl p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Subir nuevo recurso</h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nombre del recurso"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea 
                required
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Breve descripción del recurso"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select 
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background/50 border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Seleccionar tipo</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Autor</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background/50 border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Etiquetas (separadas por comas)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 rounded-lg bg-background/50 border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="React, JavaScript, Tutorial"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Archivo</label>
              <div className="border border-dashed border-muted rounded-lg p-8 text-center bg-background/50">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra y suelta archivos aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground">
                  Formatos soportados: PDF, ZIP, PPT, DOC, MP4 (máx. 100MB)
                </p>
                <input 
                  type="file" 
                  className="hidden" 
                  id="resource-file" 
                  required
                />
                <button 
                  type="button"
                  onClick={() => document.getElementById('resource-file')?.click()}
                  className="mt-4 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Seleccionar archivo
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-muted bg-transparent hover:bg-muted/20 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Subir recurso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceUploadModal;
