/**
 * Helper functions for downloading media kit assets
 */

/**
 * Downloads an image/file from a URL
 * @param url - The URL of the file to download
 * @param filename - The desired filename for the download
 */
export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    alert('Error al descargar el archivo. Por favor, intenta nuevamente.');
  }
};

/**
 * Converts an image to a different format and downloads it
 * @param imageSrc - Source image URL
 * @param format - Desired format ('png', 'jpeg', 'webp')
 * @param filename - Desired filename
 */
export const convertAndDownloadImage = async (
  imageSrc: string,
  format: 'png' | 'jpeg' | 'webp',
  filename: string
) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Could not create blob'));
          return;
        }
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        resolve();
      }, `image/${format}`);
    };
    
    img.onerror = () => {
      reject(new Error('Could not load image'));
    };
    
    img.src = imageSrc;
  });
};

/**
 * Creates and downloads an SVG version of the logo
 * @param filename - Desired filename
 */
export const downloadLogoAsSVG = async (filename: string) => {
  try {
    // Check if SVG exists in public folder
    const svgUrl = '/cpf-logo.svg';
    const response = await fetch(svgUrl);
    
    if (response.ok) {
      // SVG exists, download it directly
      await downloadFile(svgUrl, filename);
    } else {
      // SVG doesn't exist, use PNG as fallback
      alert('Archivo SVG no disponible. Descargando PNG en su lugar.');
      await downloadFile('/cpf-logo.png', filename.replace('.svg', '.png'));
    }
  } catch (error) {
    console.error('Error downloading SVG:', error);
    alert('Error al descargar el archivo SVG.');
  }
};

/**
 * Creates a PDF with the logo (requires jsPDF library - install if needed)
 * For now, this will just download the PNG with PDF extension as a placeholder
 */
export const downloadLogoAsPDF = async (filename: string) => {
  // Fallback: just download PNG for now
  alert('La descarga en PDF requiere configuración adicional. Descargando PNG en su lugar.');
  await downloadFile('/cpf-logo.png', filename.replace('.pdf', '.png'));
};

/**
 * Downloads logo as EPS format
 * For now, this will check for EPS file or fall back to SVG/PNG
 */
export const downloadLogoAsEPS = async (filename: string) => {
  try {
    // Check if EPS exists in public folder
    const epsUrl = '/cpf-logo.eps';
    const response = await fetch(epsUrl, { method: 'HEAD' });
    
    if (response.ok) {
      // EPS exists, download it directly
      await downloadFile(epsUrl, filename);
    } else {
      // EPS doesn't exist, try SVG, then fallback to PNG
      const svgUrl = '/cpf-logo.svg';
      const svgResponse = await fetch(svgUrl, { method: 'HEAD' });
      
      if (svgResponse.ok) {
        alert('Archivo EPS no disponible. Descargando SVG en su lugar (formato vectorial).');
        await downloadFile(svgUrl, filename.replace('.eps', '.svg'));
      } else {
        alert('Archivo EPS no disponible. Descargando PNG en su lugar.');
        await downloadFile('/cpf-logo.png', filename.replace('.eps', '.png'));
      }
    }
  } catch (error) {
    console.error('Error downloading EPS:', error);
    alert('Error al descargar el archivo EPS.');
  }
};


/**
 * Creates and downloads a complete media kit ZIP file
 * This is a placeholder - you'll need to create the actual ZIP in the public folder
 */
export const downloadCompleteMediaKit = () => {
  const zipUrl = '/media-kit-complete.zip';
  
  // Check if zip exists, otherwise show message
  fetch(zipUrl, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        window.location.href = zipUrl;
      } else {
        alert('El paquete completo aún no está disponible. Por favor, descarga los recursos individuales.');
      }
    })
    .catch(() => {
      alert('El paquete completo aún no está disponible. Por favor, descarga los recursos individuales.');
    });
};

/**
 * Downloads color palette as JSON or text file
 */
export const downloadColorPalette = () => {
  const colors = {
    primary: {
      name: 'Primario',
      hex: '#0070F3',
      rgb: 'rgb(0, 112, 243)',
    },
    secondary: {
      name: 'Secundario',
      hex: '#1A2333',
      rgb: 'rgb(26, 35, 51)',
    },
    titles: {
      name: 'Títulos',
      hex: '#FAFAFA',
      rgb: 'rgb(250, 250, 250)',
    },
    text: {
      name: 'Textos',
      hex: '#94A3B8',
      rgb: 'rgb(148, 163, 184)',
    },
  };

  const content = `Club de Programación FIUNA - Paleta de Colores

Primario: ${colors.primary.hex} | ${colors.primary.rgb}
Secundario: ${colors.secondary.hex} | ${colors.secondary.rgb}
Títulos: ${colors.titles.hex} | ${colors.titles.rgb}
Textos: ${colors.text.hex} | ${colors.text.rgb}

JSON:
${JSON.stringify(colors, null, 2)}
`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cpfiuna-color-palette.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

