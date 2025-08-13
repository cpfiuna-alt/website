// Test the parsing logic specifically for gallery
import { parseMarkdown } from './src/utils/markdown/parser.js';

const testContent = `---
id: 1
title: "Test Project"
gallery:
  - "/images/projects/cpf-website-01.png"
  - "/images/projects/cpf-website-02.png"
  - "/images/projects/cpf-website-03.png"
  - "/images/projects/cpf-website-04.png"
  - "/images/projects/cpf-website-05.png"
---

# Test Content

This is test content.`;

const result = parseMarkdown(testContent);
console.log('Parsed frontMatter:', JSON.stringify(result.frontMatter, null, 2));
console.log('Gallery field:', result.frontMatter.gallery);
console.log('Gallery type:', typeof result.frontMatter.gallery);
console.log('Gallery length:', result.frontMatter.gallery?.length);
