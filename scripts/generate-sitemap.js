/**
 * Sitemap Generator for CPF Website
 * Generates sitemap.xml with all static routes and dynamic content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://cpfiuna.io';
const TODAY = new Date().toISOString().split('T')[0];

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/nosotros', changefreq: 'monthly', priority: '0.8' },
  { path: '/eventos', changefreq: 'weekly', priority: '0.8' },
  { path: '/logros', changefreq: 'monthly', priority: '0.7' },
  { path: '/proyectos', changefreq: 'monthly', priority: '0.7' },
  { path: '/recursos', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/contacto', changefreq: 'monthly', priority: '0.6' },
  { path: '/admision', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacidad', changefreq: 'yearly', priority: '0.4' },
  { path: '/codigo-de-conducta', changefreq: 'yearly', priority: '0.4' },
  { path: '/kit-de-medios', changefreq: 'yearly', priority: '0.5' },
  { path: '/prensa', changefreq: 'monthly', priority: '0.5' },
  { path: '/transparencia', changefreq: 'monthly', priority: '0.5' },
  { path: '/estatuto', changefreq: 'yearly', priority: '0.5' },
  { path: '/reglamento', changefreq: 'yearly', priority: '0.5' },
];

/**
 * Get all markdown files from a directory and extract slugs
 */
function getContentSlugs(contentDir) {
  const slugs = [];
  
  if (!fs.existsSync(contentDir)) {
    return slugs;
  }

  const files = fs.readdirSync(contentDir);
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const slug = file.replace('.md', '');
      slugs.push(slug);
    }
  }
  
  return slugs;
}

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const eventsDir = path.join(__dirname, '../src/content/events');
  const projectsDir = path.join(__dirname, '../src/content/projects');
  
  const eventSlugs = getContentSlugs(eventsDir);
  const projectSlugs = getContentSlugs(projectsDir);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += '  <!-- Generated sitemap: includes all static routes and dynamic content -->\n';
  xml += `  <!-- Last updated: ${TODAY} -->\n`;
  
  // Add static routes
  for (const route of staticRoutes) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  
  // Add event detail pages
  for (const slug of eventSlugs) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/eventos/${slug}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += '  </url>\n';
  }
  
  // Add project detail pages
  for (const slug of projectSlugs) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}/proyectos/${slug}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += '  </url>\n';
  }
  
  xml += '</urlset>\n';
  
  return xml;
}

/**
 * Main execution
 */
function main() {
  try {
    console.log('Generating sitemap...');
    
    const sitemap = generateSitemap();
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    
    fs.writeFileSync(outputPath, sitemap, 'utf8');
    
    console.log(`✓ Sitemap generated successfully at ${outputPath}`);
    console.log(`  Date: ${TODAY}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
