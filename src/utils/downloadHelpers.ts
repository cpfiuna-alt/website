/**
 * Helper functions for downloading media kit assets
 */

/**
 * Base URL for Cloudflare-hosted assets. If you host images elsewhere,
 * update this constant accordingly. Calls may pass a full URL or a
 * relative path (e.g. 'cpf-logo.png' or '/cpf-logo.png').
 */
const CLOUDFLARE_BASE = 'https://assets.cpfiuna.io/website/public';

/**
 * Resolve an input that might be a full URL or a relative path into a full URL.
 * - If input starts with 'http' or '//' it's returned as-is.
 * - Otherwise it's joined to `CLOUDFLARE_BASE`.
 */
const resolveAssetUrl = (input: string) => {
  if (!input) return input;
  const trimmed = input.trim();
  // If it's an absolute URL, return as-is
  if (/^https?:\/\//i.test(trimmed) || /^\/\//.test(trimmed)) {
    return trimmed;
  }

  // If it starts with a single leading slash, treat as origin-relative (served from /public)
  if (/^\//.test(trimmed)) {
    return trimmed; // e.g. '/cpf-logo.png' will request from the same origin
  }

  // Otherwise treat as an external asset path hosted on Cloudflare
  const path = trimmed.replace(/^\/+/, '');
  return `${CLOUDFLARE_BASE}/${path}`;
};

/**
 * Fallback: open URL in a new tab/window so the user can save the file manually.
 * This is used when programmatic fetch/download is blocked by CORS.
 */
const openInNewTab = (url: string) => {
  try {
    const final = resolveAssetUrl(url);
    const a = document.createElement('a');
    a.href = final;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    // Some browsers ignore the download attribute for cross-origin resources,
    // so opening in a new tab is the most compatible fallback.
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    // As a last resort, try window.open
    try { window.open(resolveAssetUrl(url), '_blank', 'noopener'); } catch (_) { /* ignore */ }
  }
};

/**
 * Downloads an image/file from a URL or relative path.
 * @param urlOrPath - Absolute URL or relative path (joined to CLOUDFLARE_BASE)
 * @param filename - Optional desired filename; if omitted the name is inferred from the URL
 */
export const downloadFile = async (urlOrPath: string, filename?: string) => {
  try {
    const finalUrl = resolveAssetUrl(urlOrPath);

    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;

    // If filename not provided, attempt to derive from URL path
    if (filename) {
      link.download = filename;
    } else {
      try {
        const urlObj = new URL(finalUrl, window.location.href);
        const parts = urlObj.pathname.split('/').filter(Boolean);
        link.download = parts.length ? parts[parts.length - 1] : 'download';
      } catch (e) {
        link.download = 'download';
      }
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    // Likely CORS or network issue in the browser; fallback to opening the
    // asset in a new tab so the user can save it manually.
    try {
      openInNewTab(urlOrPath);
      alert('No se pudo descargar automáticamente (CORS). Se abrió el recurso en una nueva pestaña para que puedas guardarlo manualmente.');
    } catch (e) {
      alert('Error al descargar el archivo. Por favor, intenta nuevamente.');
    }
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
        // If the browser blocks loading the image due to CORS, fallback by
        // opening the image URL in a new tab so the user can save it.
        try {
          openInNewTab(imageSrc);
          // Resolve so callers don't get an unhandled rejection; user can manually save.
          resolve();
        } catch (e) {
          reject(new Error('Could not load image'));
        }
    };
    
    img.src = resolveAssetUrl(imageSrc);
  });
};

/**
 * Creates and downloads an SVG version of the logo
 * @param filename - Desired filename
 */
export const downloadLogoAsSVG = async (filename: string) => {
  try {
    // Resolve via Cloudflare base if a relative path is used
    const svgUrl = resolveAssetUrl('/cpf-logo.svg');
    const response = await fetch(svgUrl);

    if (response.ok) {
      await downloadFile(svgUrl, filename);
    } else {
      alert('Archivo SVG no disponible. Descargando PNG en su lugar.');
      await downloadFile(resolveAssetUrl('/cpf-logo.png'), filename.replace('.svg', '.png'));
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
    // Check EPS via resolved URL
    const epsUrl = resolveAssetUrl('/cpf-logo.eps');
    const response = await fetch(epsUrl, { method: 'HEAD' });

    if (response.ok) {
      await downloadFile(epsUrl, filename);
    } else {
      // EPS doesn't exist, try SVG, then fallback to PNG
      const svgUrl = resolveAssetUrl('/cpf-logo.svg');
      const svgResponse = await fetch(svgUrl, { method: 'HEAD' });

      if (svgResponse.ok) {
        alert('Archivo EPS no disponible. Descargando SVG en su lugar (formato vectorial).');
        await downloadFile(svgUrl, filename.replace('.eps', '.svg'));
      } else {
        alert('Archivo EPS no disponible. Descargando PNG en su lugar.');
        await downloadFile(resolveAssetUrl('/cpf-logo.png'), filename.replace('.eps', '.png'));
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
  const zipUrl = resolveAssetUrl('/media-kit-complete.zip');

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

