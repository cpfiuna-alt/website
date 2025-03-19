
import { getAllContent, getContentBySlug } from './contentLoader';
import { CourseFrontMatter } from './markdownUtils';
import { CourseItem } from './contentTypes';

// Get all courses
export async function getAllCourses({
  sortBy = 'id',
  filterByLevel,
  filterByTag,
  limit
}: {
  sortBy?: 'id',
  filterByLevel?: string,
  filterByTag?: string,
  limit?: number
} = {}): Promise<Array<{ frontMatter: CourseFrontMatter, content: string, slug: string }>> {
  try {
    // Get all courses
    const coursesFiles = import.meta.glob('/src/content/courses/*.md', { eager: true, as: 'raw' });
    console.log("Available course files:", Object.keys(coursesFiles));
    
    let courses: Array<{ frontMatter: CourseFrontMatter, content: string, slug: string }> = [];
    
    for (const path in coursesFiles) {
      const content = coursesFiles[path] as string;
      const fileName = path.split('/').pop()?.replace('.md', '') || '';
      
      // Parse the markdown content
      const { frontMatter, content: markdownContent } = parseMarkdown(content);
      
      courses.push({
        frontMatter: { ...frontMatter, slug: fileName } as CourseFrontMatter,
        content: markdownContent,
        slug: fileName
      });
    }
    
    console.log("Raw courses data:", courses);
    
    // Filter courses based on criteria
    let filteredCourses = courses;
    
    if (filterByLevel) {
      filteredCourses = filteredCourses.filter(course => 
        course.frontMatter.level === filterByLevel
      );
    }
    
    if (filterByTag) {
      filteredCourses = filteredCourses.filter(course => 
        course.frontMatter.tags && course.frontMatter.tags.includes(filterByTag)
      );
    }
    
    // Sort courses
    if (sortBy === 'id') {
      filteredCourses.sort((a, b) => {
        const idA = Number(a.frontMatter.id);
        const idB = Number(b.frontMatter.id);
        return !isNaN(idA) && !isNaN(idB) ? idA - idB : 0;
      });
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      filteredCourses = filteredCourses.slice(0, limit);
    }
    
    console.log("Processed courses:", filteredCourses);
    return filteredCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

// Get a single course by slug
export async function getCourseBySlug(slug: string): Promise<{ frontMatter: CourseFrontMatter, content: string, slug: string } | null> {
  try {
    const courseFiles = import.meta.glob('/src/content/courses/*.md', { eager: true, as: 'raw' });
    const coursePath = Object.keys(courseFiles).find(path => path.includes(`/${slug}.md`));
    
    if (!coursePath) {
      console.error(`Course with slug ${slug} not found`);
      return null;
    }
    
    const content = courseFiles[coursePath] as string;
    const { frontMatter, content: markdownContent } = parseMarkdown(content);
    
    return {
      frontMatter: { ...frontMatter, slug } as CourseFrontMatter,
      content: markdownContent,
      slug
    };
  } catch (error) {
    console.error(`Error fetching course with slug ${slug}:`, error);
    return null;
  }
}

// Import parseMarkdown directly to ensure it's available
import { parseMarkdown } from './markdownUtils';
