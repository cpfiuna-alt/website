
// Function to parse markdown content with front matter in browser environment
export function parseMarkdown(content: string) {
  try {
    // Simple frontmatter parser for browser environment
    const frontMatterRegex = /---\n([\s\S]*?)\n---\n([\s\S]*)/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
      return { frontMatter: {}, content: content };
    }
    
    const [, frontMatterStr, markdownContent] = match;
    
    // Parse the front matter
    const frontMatter: Record<string, any> = {};
    const lines = frontMatterStr.split('\n');
    
    // Track multiline array/object parsing
    let currentKey: string | null = null;
    let multilineValue: string[] = [];
    let isInMultiline = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Handle multiline parsing for arrays and objects
      if (isInMultiline) {
        multilineValue.push(line);
        
        // Check if this line ends the multiline value
        if (line === ']' || line === '}') {
          isInMultiline = false;
          if (currentKey) {
            try {
              // Join the multiline value and parse it as JSON
              const jsonStr = multilineValue.join('').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
              frontMatter[currentKey] = JSON.parse(jsonStr);
            } catch (e) {
              console.error('Error parsing multiline JSON:', e);
              frontMatter[currentKey] = multilineValue.join('\n');
            }
            multilineValue = [];
            currentKey = null;
          }
        }
        continue;
      }
      
      // Check if this is the start of a new key-value pair
      if (!isInMultiline && line.includes(':')) {
        const colonIndex = line.indexOf(':');
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // Check if this is the start of a multiline array or object
        if ((value === '[' || value === '{' || value.endsWith('[') || value.endsWith('{'))) {
          isInMultiline = true;
          currentKey = key;
          multilineValue = [value];
          continue;
        }
        
        // Handle regular single-line values
        if (value === 'true') {
          frontMatter[key] = true;
        } else if (value === 'false') {
          frontMatter[key] = false;
        } else if (!isNaN(Number(value)) && value !== '') {
          frontMatter[key] = Number(value);
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Parse arrays
          try {
            // Try to parse as JSON if it looks like JSON format
            if (value.includes('{')) {
              frontMatter[key] = JSON.parse(value);
            } else {
              // Fallback to simple array parsing
              frontMatter[key] = value
                .slice(1, -1)
                .split(',')
                .map(item => item.trim())
                .filter(Boolean);
            }
          } catch (e) {
            console.error('Error parsing array:', e);
            // Fallback to basic string array
            frontMatter[key] = value
              .slice(1, -1)
              .split(',')
              .map(item => item.trim())
              .filter(Boolean);
          }
        } else if (value.startsWith('"') && value.endsWith('"')) {
          // Remove quotes from quoted strings
          frontMatter[key] = value.slice(1, -1);
        } else {
          frontMatter[key] = value;
        }
      }
    }
    
    return {
      frontMatter,
      content: markdownContent || ''
    };
  } catch (error) {
    console.error('Error parsing markdown content:', error);
    return {
      frontMatter: {},
      content: ''
    };
  }
}

// Function to format date in human-readable format
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Function to check if an event is upcoming based on its date
export function isUpcomingEvent(dateString: string): boolean {
  try {
    const eventDate = new Date(dateString);
    if (isNaN(eventDate.getTime())) {
      return false;
    }
    const today = new Date();
    return eventDate >= today;
  } catch (error) {
    console.error('Error checking if event is upcoming:', error);
    return false;
  }
}

// Type for the result of getStaticContent
export type StaticContent<T> = {
  [slug: string]: {
    frontMatter: T;
    content: string;
  };
};

// Type for the front matter of blog posts
export type BlogFrontMatter = {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
};

// Alias for backward compatibility
export type BlogPostFrontMatter = BlogFrontMatter;

// Type for the front matter of events
export type EventFrontMatter = {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  type: string;
  registrationLink: string;
  isUpcoming: boolean;
  slug: string;
};

// Type for team member
export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
};

// Type for GitHub stats
export type GitHubStats = {
  stars: number;
  forks: number;
  issues: number;
};

// Type for the front matter of projects
export type ProjectFrontMatter = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink: string;
  demoLink?: string;
  category: string;
  featured: boolean;
  status?: string;
  date?: string; // Added missing property
  lastUpdated?: string;
  contributors?: number; // Added missing property
  team?: TeamMember[];
  githubStats?: GitHubStats;
  slug: string;
};

// Type for the front matter of courses
export type CourseFrontMatter = {
  id: number | string;
  title: string;
  description: string;
  level: string;
  duration: string;
  instructor: string;
  image: string;
  tags: string[];
  date?: string; // Added missing property
  slug: string;
};
