
import { getAllContent, getContentBySlug } from './contentLoader';
import { CourseFrontMatter } from './markdownUtils';

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
  // Get all courses
  const courses = await getAllContent<CourseFrontMatter>('courses');
  
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
    filteredCourses.sort((a, b) => 
      Number(a.frontMatter.id) - Number(b.frontMatter.id)
    );
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredCourses = filteredCourses.slice(0, limit);
  }
  
  return filteredCourses;
}

// Get a single course by slug
export async function getCourseBySlug(slug: string): Promise<{ frontMatter: CourseFrontMatter, content: string, slug: string } | null> {
  return getContentBySlug<CourseFrontMatter>('courses', slug);
}
