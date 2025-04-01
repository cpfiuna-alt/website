import { parseMarkdown, BlogFrontMatter, EventFrontMatter, ProjectFrontMatter, CourseFrontMatter } from "./markdownUtils";

// Function to get all markdown content files of a specific type
export async function getAllContent<T>(
  contentType: 'events' | 'projects' | 'courses' | 'blog' | 'docs'
): Promise<Array<{ frontMatter: T, content: string, slug: string }>> {
  // Create a glob pattern based on content type
  const globPattern = `../content/${contentType}/*.md`;
  
  // Import all markdown files matching the pattern
  const contentFiles = import.meta.glob('../content/*/*.md', { as: 'raw', eager: true });
  
  // Filter files that match our content type
  const filteredFiles = Object.entries(contentFiles).filter(
    ([path]) => path.includes(`/content/${contentType}/`)
  );
  
  // Parse each file and extract front matter and content
  return filteredFiles.map(([path, content]) => {
    // Extract slug from path
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    
    // Parse the markdown content
    const { frontMatter, content: markdownContent } = parseMarkdown(content as string);
    
    return {
      frontMatter: { ...frontMatter, slug } as T,
      content: markdownContent,
      slug
    };
  });
}

// Get a single content item by slug
export async function getContentBySlug<T>(
  contentType: 'events' | 'projects' | 'courses' | 'blog' | 'docs',
  slug: string
): Promise<{ frontMatter: T, content: string, slug: string } | null> {
  try {
    // Get all content of specified type
    const allContent = await getAllContent<T>(contentType);
    
    // Find the item with matching slug
    const contentItem = allContent.find(item => item.slug === slug);
    
    return contentItem || null;
  } catch (error) {
    console.error(`Error fetching ${contentType} content with slug ${slug}:`, error);
    return null;
  }
}

// Get all events (with sorting and filtering options)
export async function getAllEvents({
  sortBy = 'date',
  filterByType,
  showUpcomingOnly = false,
  limit
}: {
  sortBy?: 'date',
  filterByType?: string,
  showUpcomingOnly?: boolean,
  limit?: number
} = {}): Promise<Array<{ frontMatter: EventFrontMatter, content: string, slug: string }>> {
  // Get all events
  const events = await getAllContent<EventFrontMatter>('events');
  
  // Filter events based on criteria
  let filteredEvents = events;
  
  if (filterByType && filterByType !== 'all') {
    filteredEvents = filteredEvents.filter(event => 
      event.frontMatter.type === filterByType
    );
  }
  
  if (showUpcomingOnly) {
    filteredEvents = filteredEvents.filter(event => 
      event.frontMatter.isUpcoming
    );
  }
  
  // Sort events
  if (sortBy === 'date') {
    filteredEvents.sort((a, b) => 
      new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
    );
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredEvents = filteredEvents.slice(0, limit);
  }
  
  return filteredEvents;
}

// Get all projects (with sorting and filtering options)
export async function getAllProjects({
  sortBy = 'featured',
  filterByCategory,
  filterByTag,
  featuredOnly = false,
  limit
}: {
  sortBy?: 'featured',
  filterByCategory?: string,
  filterByTag?: string,
  featuredOnly?: boolean,
  limit?: number
} = {}): Promise<Array<{ frontMatter: ProjectFrontMatter, content: string, slug: string }>> {
  // Get all projects
  const projects = await getAllContent<ProjectFrontMatter>('projects');
  
  // Filter projects based on criteria
  let filteredProjects = projects;
  
  if (filterByCategory && filterByCategory !== 'all') {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.category === filterByCategory
    );
  }
  
  if (filterByTag) {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.tags && project.frontMatter.tags.includes(filterByTag)
    );
  }
  
  if (featuredOnly) {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.featured
    );
  }
  
  // Sort projects
  if (sortBy === 'featured') {
    filteredProjects.sort((a, b) => {
      // First sort by featured status (featured first)
      if (a.frontMatter.featured && !b.frontMatter.featured) return -1;
      if (!a.frontMatter.featured && b.frontMatter.featured) return 1;
      
      // If both have same featured status, sort by id
      return Number(b.frontMatter.id) - Number(a.frontMatter.id);
    });
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredProjects = filteredProjects.slice(0, limit);
  }
  
  return filteredProjects;
}

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

// Get all blog posts
export async function getAllBlogPosts({
  sortBy = 'date',
  filterByTag,
  limit
}: {
  sortBy?: 'date',
  filterByTag?: string,
  limit?: number
} = {}): Promise<Array<{ frontMatter: BlogFrontMatter, content: string, slug: string }>> {
  // Get all blog posts
  const blogPosts = await getAllContent<BlogFrontMatter>('blog');
  
  // Filter blog posts based on criteria
  let filteredPosts = blogPosts;
  
  if (filterByTag) {
    filteredPosts = filteredPosts.filter(post => 
      post.frontMatter.tags && post.frontMatter.tags.includes(filterByTag)
    );
  }
  
  // Sort blog posts
  if (sortBy === 'date') {
    filteredPosts.sort((a, b) => 
      new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
    );
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredPosts = filteredPosts.slice(0, limit);
  }
  
  return filteredPosts;
}

// Get all documentation pages
export async function getAllDocPages({
  filterByCategory,
  sortBy = 'order',
  limit
}: {
  filterByCategory?: string,
  sortBy?: 'order' | 'title',
  limit?: number
} = {}): Promise<Array<{ frontMatter: DocFrontMatter, content: string, slug: string }>> {
  // Get all documentation pages
  const docPages = await getAllContent<DocFrontMatter>('docs');
  
  // Filter docs based on category if specified
  let filteredDocs = docPages;
  if (filterByCategory) {
    filteredDocs = filteredDocs.filter(doc => 
      doc.frontMatter.category === filterByCategory
    );
  }
  
  // Sort docs
  if (sortBy === 'order') {
    filteredDocs.sort((a, b) => 
      Number(a.frontMatter.order || 0) - Number(b.frontMatter.order || 0)
    );
  } else if (sortBy === 'title') {
    filteredDocs.sort((a, b) => 
      (a.frontMatter.title || '').localeCompare(b.frontMatter.title || '')
    );
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredDocs = filteredDocs.slice(0, limit);
  }
  
  return filteredDocs;
}

// Type for documentation front matter
export type DocFrontMatter = {
  title: string;
  description: string;
  category: string;
  order?: number;
  tags?: string[];
  icon?: string;
  slug: string;
};
