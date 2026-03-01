
import { useState, useEffect } from 'react';
import { getAllBlogPosts } from '@/utils/blogService';
import { getAllEvents } from '@/utils/eventsService';
import { getAllProjects } from '@/utils/projectsService';
import { getAllCourses } from '@/utils/coursesService';
import { formatDateEs, parseDateString } from '@/utils/dateUtils';

export interface LatestContentItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageSrc: string;
  slug: string;
  eventType?: string;
}

export function useLatestContent(limit: number = 4) {
  const [latestContent, setLatestContent] = useState<LatestContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllContent = async () => {
      setIsLoading(true);
      try {
        // Fetch all sources in parallel to avoid slow sequential waits
        const [blogPosts, events, projects, courses] = await Promise.all([
          getAllBlogPosts(),
          getAllEvents(),
          getAllProjects(),
          getAllCourses()
        ]);

        // Helper to safely get a normalized ISO date string for sorting
        const normalizeDate = (d?: string | null) => {
          const parsed = parseDateString(d || undefined);
          return parsed ? parsed.toISOString() : new Date(0).toISOString();
        };

        // Transform to a unified format
        const allContent: LatestContentItem[] = [
          // Transform blog posts
          ...blogPosts.map(post => ({
            id: `blog-${post.frontMatter.id || post.slug}`,
            title: post.frontMatter.title,
            excerpt: post.frontMatter.excerpt || post.frontMatter.description || '',
            date: normalizeDate(post.frontMatter.date),
            category: 'Blog',
            imageSrc: post.frontMatter.image || '/placeholder.svg',
            slug: post.slug
          })),

          // Transform events
          ...events.map(event => ({
            id: `event-${event.frontMatter.id || event.slug}`,
            title: event.frontMatter.title,
            excerpt: event.frontMatter.description || '',
            date: normalizeDate(event.frontMatter.date),
            category: 'Eventos',
            imageSrc: event.frontMatter.image || '/placeholder.svg',
            slug: event.slug,
            eventType: event.frontMatter.type
          })),

          // Transform projects
          ...projects.map(project => ({
            id: `project-${project.frontMatter.id || project.slug}`,
            title: project.frontMatter.title,
            excerpt: project.frontMatter.description || '',
            date: normalizeDate(project.frontMatter.lastUpdated || project.frontMatter.startDate || ''),
            category: 'Proyectos',
            imageSrc: project.frontMatter.image || '/placeholder.svg',
            slug: project.slug
          })),

          // Transform courses
          ...courses.map(course => ({
            id: `course-${course.frontMatter.id || course.slug}`,
            title: course.frontMatter.title,
            excerpt: course.frontMatter.description || '',
            date: normalizeDate(course.frontMatter.date || ''),
            category: 'Cursos',
            imageSrc: course.frontMatter.image || '/placeholder.svg',
            slug: course.slug
          }))
        ];

        // Sort by date (newest first) using normalized ISO strings
        allContent.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // Take only the latest items
        setLatestContent(allContent.slice(0, limit));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching latest content:", error);
        setIsLoading(false);
      }
    };

    fetchAllContent();
  }, [limit]);

  return { latestContent, isLoading };
}
