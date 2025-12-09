
import { useState, useEffect } from 'react';
import { getAllBlogPosts } from '@/utils/blogService';
import { getAllEvents } from '@/utils/eventsService';
import { getAllProjects } from '@/utils/projectsService';
import { getAllCourses } from '@/utils/coursesService';
import { formatDateEs } from '@/utils/dateUtils';

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
        // Get content from all sources
        const blogPosts = await getAllBlogPosts();
        const events = await getAllEvents();
        const projects = await getAllProjects();
        const courses = await getAllCourses();

        // Transform to a unified format
        const allContent: LatestContentItem[] = [
          // Transform blog posts
          ...blogPosts.map(post => ({
            id: `blog-${post.frontMatter.id || post.slug}`,
            title: post.frontMatter.title,
            excerpt: post.frontMatter.excerpt || post.frontMatter.description || '',
            date: post.frontMatter.date,
            category: 'Blog',
            imageSrc: post.frontMatter.image || '/placeholder.svg',
            slug: post.slug
          })),
          
          // Transform events
          ...events.map(event => ({
            id: `event-${event.frontMatter.id || event.slug}`,
            title: event.frontMatter.title,
            excerpt: event.frontMatter.description || '',
            date: event.frontMatter.date,
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
            // Fix to handle missing date properties
            date: project.frontMatter.lastUpdated || project.frontMatter.startDate || new Date().toISOString(),
            category: 'Proyectos',
            imageSrc: project.frontMatter.image || '/placeholder.svg',
            slug: project.slug
          })),
          
          // Transform courses
          ...courses.map(course => ({
            id: `course-${course.frontMatter.id || course.slug}`,
            title: course.frontMatter.title,
            excerpt: course.frontMatter.description || '',
            // Fix - provide default date if not available
            date: course.frontMatter.date || new Date().toISOString(),
            category: 'Cursos',
            imageSrc: course.frontMatter.image || '/placeholder.svg',
            slug: course.slug
          }))
        ];

        // Sort by date (newest first)
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
