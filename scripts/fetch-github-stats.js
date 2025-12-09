#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.resolve(process.cwd(), 'src/content/projects');
const publicDir = path.resolve(process.cwd(), 'public');
const outFile = path.join(publicDir, 'github-stats.json');

const token = process.env.GITHUB_TOKEN || process.env.GH_PAT || '';

function parseRepo(url) {
  if (!url) return null;
  const m = url.match(/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)(?:\.git|\/|$)/i);
  if (!m || !m.groups) return null;
  return `${m.groups.owner}/${m.groups.repo.replace(/\.git$/i, '')}`;
}

async function fetchJson(url) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers['Authorization'] = `token ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} ${url}`);
  return res.json();
}

async function getContributorsCount(ownerRepo) {
  const url = `https://api.github.com/repos/${ownerRepo}/contributors?per_page=1&anon=true`;
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers['Authorization'] = `token ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) return 0;
  const link = res.headers.get('Link');
  if (link) {
    const m = link.match(/&page=(\d+)>; rel="last"/);
    if (m && m[1]) return Number(m[1]);
  }
  const arr = await res.json();
  return Array.isArray(arr) ? arr.length : 0;
}

async function main() {
  try {
    // Ensure public dir exists
    await fs.mkdir(publicDir, { recursive: true });

    const files = await fs.readdir(contentDir);
    const results = {};
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(contentDir, file);
      const raw = await fs.readFile(filePath, 'utf8');
      const { data } = matter(raw);
      const slug = (file || '').replace('.md', '');
      const githubLink = data.githubLink || data.github || data.githubUrl || '';
      const ownerRepo = parseRepo(githubLink);
      if (!ownerRepo) continue;

      try {
        const repoJson = await fetchJson(`https://api.github.com/repos/${ownerRepo}`);
        const contributors = await getContributorsCount(ownerRepo);
        results[slug] = {
          repo: ownerRepo,
          stars: Number(repoJson.stargazers_count || 0),
          forks: Number(repoJson.forks_count || 0),
          issues: Number(repoJson.open_issues_count || 0),
          contributors: contributors || 0,
        };
        console.log(`Fetched stats for ${slug} -> ${ownerRepo}`);
      } catch (err) {
        console.warn(`Failed to fetch ${ownerRepo}:`, err.message || err);
      }
    }

    const payload = { fetchedAt: Date.now(), projects: results };
    await fs.writeFile(outFile, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`Wrote ${outFile}`);
    process.exit(0);
  } catch (err) {
    console.error('Error in fetch-github-stats:', err);
    process.exit(1);
  }
}

main();
