/**
 * RSS Feed Generator for CPF Blog
 * Generates RSS 2.0 feed for blog posts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://cpfiuna.io';
const SITE_TITLE = 'Club de Programación FIUNA - Blog';
const SITE_DESCRIPTION = 'Artículos sobre programación, tecnología y desarrollo de software del Club de Programación FIUNA';
const SITE_LANGUAGE = 'es';
const SITE_EMAIL = 'clubdeprogramacion@ing.una.py';

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  
  return frontmatter;
}

/**
 * Get blog posts with metadata
 */
function getBlogPosts() {
  const blogDir = path.join(__dirname, '../src/content/blog');
  const posts = [];
  
  if (!fs.existsSync(blogDir)) {
    return posts;
  }

  const files = fs.readdirSync(blogDir);
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    
    if (!frontmatter) continue;
    
    const slug = file.replace('.md', '');
    const post = {
      slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || frontmatter.excerpt || '',
      date: frontmatter.date || frontmatter.publishDate || new Date().toISOString(),
      author: frontmatter.author || 'Club de Programación FIUNA',
    };
    
    posts.push(post);
  }
  
  // Sort by date, newest first
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return posts;
}

/**
 * Generate RSS feed XML
 */
function generateRSS() {
  const posts = getBlogPosts();
  const buildDate = new Date().toUTCString();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  xml += '  <channel>\n';
  xml += `    <title>${escapeXml(SITE_TITLE)}</title>\n`;
  xml += `    <link>${BASE_URL}/blog</link>\n`;
  xml += `    <description>${escapeXml(SITE_DESCRIPTION)}</description>\n`;
  xml += `    <language>${SITE_LANGUAGE}</language>\n`;
  xml += `    <lastBuildDate>${buildDate}</lastBuildDate>\n`;
  xml += `    <managingEditor>${SITE_EMAIL} (Club de Programación FIUNA)</managingEditor>\n`;
  xml += `    <webMaster>${SITE_EMAIL} (Club de Programación FIUNA)</webMaster>\n`;
  xml += `    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n`;
  xml += `    <image>\n`;
  xml += `      <url>${BASE_URL}/cpf-logo.png</url>\n`;
  xml += `      <title>${escapeXml(SITE_TITLE)}</title>\n`;
  xml += `      <link>${BASE_URL}/blog</link>\n`;
  xml += `    </image>\n`;
  
  for (const post of posts) {
    const pubDate = new Date(post.date).toUTCString();
    const postUrl = `${BASE_URL}/blog/${post.slug}`;
    
    xml += '    <item>\n';
    xml += `      <title>${escapeXml(post.title)}</title>\n`;
    xml += `      <link>${postUrl}</link>\n`;
    xml += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
    xml += `      <description>${escapeXml(post.description)}</description>\n`;
    xml += `      <pubDate>${pubDate}</pubDate>\n`;
    xml += `      <author>${SITE_EMAIL} (${escapeXml(post.author)})</author>\n`;
    xml += '    </item>\n';
  }
  
  xml += '  </channel>\n';
  xml += '</rss>\n';
  
  return xml;
}

/**
 * Main execution
 */
function main() {
  try {
    console.log('Generating RSS feed...');
    
    const rss = generateRSS();
    const outputPath = path.join(__dirname, '../public/rss.xml');
    
    fs.writeFileSync(outputPath, rss, 'utf8');
    
    console.log(`✓ RSS feed generated successfully at ${outputPath}`);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    process.exit(1);
  }
}

main();
