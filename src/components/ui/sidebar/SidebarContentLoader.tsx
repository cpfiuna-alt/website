
import { useState, useEffect } from 'react';
import { EventFrontMatter, ProjectFrontMatter, CourseFrontMatter, BlogFrontMatter } from '@/utils/markdownUtils';
import { getAllContent } from '@/utils/contentLoader';

export function useSidebarContent() {
  const [events, setEvents] = useState<EventFrontMatter[]>([]);
  const [projects, setProjects] = useState<ProjectFrontMatter[]>([]);
  const [courses, setCourses] = useState<CourseFrontMatter[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContentData = async () => {
      try {
        setLoading(true);
        
        // Load events
        const eventData = await getAllContent<EventFrontMatter>('events');
        const parsedEvents = eventData.map(item => ({
          ...item.frontMatter,
          slug: item.slug
        }));
        setEvents(parsedEvents.slice(0, 5)); // Take only 5 for sidebar
        
        // Load projects
        const projectData = await getAllContent<ProjectFrontMatter>('projects');
        const parsedProjects = projectData.map(item => ({
          ...item.frontMatter,
          slug: item.slug
        }));
        setProjects(parsedProjects.slice(0, 5));
        
        // Load courses
        const courseData = await getAllContent<CourseFrontMatter>('courses');
        const parsedCourses = courseData.map(item => ({
          ...item.frontMatter,
          slug: item.slug
        }));
        setCourses(parsedCourses);
        
        // Load blog posts
        const blogData = await getAllContent<BlogFrontMatter>('blog');
        const parsedBlogPosts = blogData.map(item => ({
          ...item.frontMatter,
          slug: item.slug
        }));
        setBlogPosts(parsedBlogPosts.slice(0, 5));
      } catch (error) {
        console.error("Error loading content for sidebar:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContentData();
  }, []);

  return {
    events: events.map(event => ({ 
      slug: event.slug || '', 
      title: event.title || 'Evento sin título', 
      url: `/events/${event.slug}` 
    })),
    projects: projects.map(project => ({ 
      slug: project.slug || '', 
      title: project.title || 'Proyecto sin título', 
      url: `/projects/${project.slug}` 
    })),
    courses: courses.map(course => ({ 
      slug: course.slug || '', 
      title: course.title || 'Curso sin título', 
      url: `/course/${course.slug}` 
    })),
    blogPosts: blogPosts.map(post => ({ 
      slug: post.slug || '', 
      title: post.title || 'Artículo sin título', 
      url: `/blog/${post.slug}` 
    })),
    loading
  };
}
