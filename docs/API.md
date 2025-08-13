# API Documentation

## Overview

The CPF Website uses a static site generation approach with client-side data fetching. While there's no traditional REST API, the application provides several data access patterns and utility functions for content management.

## Static Site Generator API

### Core Functions

Located in `/src/utils/staticSiteGenerator.ts`, these functions handle content loading and parsing:

#### `getAllPosts()`
Retrieves all blog posts from the content directory.

```typescript
function getAllPosts(): Promise<BlogPost[]>
```

**Returns:** Array of blog post objects with frontmatter and content
**Usage:** Blog listing pages, recent posts components

#### `getPostBySlug(slug: string)`
Retrieves a specific blog post by its slug.

```typescript
function getPostBySlug(slug: string): Promise<BlogPost | null>
```

**Parameters:**
- `slug` (string): The URL slug of the blog post

**Returns:** Blog post object or null if not found
**Usage:** Individual blog post pages

#### `getAllEvents()`
Retrieves all events from the events content directory.

```typescript
function getAllEvents(): Promise<Event[]>
```

**Returns:** Array of event objects with frontmatter and content
**Usage:** Events listing, upcoming events components

#### `getEventBySlug(slug: string)`
Retrieves a specific event by its slug.

```typescript
function getEventBySlug(slug: string): Promise<Event | null>
```

**Parameters:**
- `slug` (string): The URL slug of the event

**Returns:** Event object or null if not found
**Usage:** Individual event detail pages

#### `getAllProjects()`
Retrieves all projects from the projects content directory.

```typescript
function getAllProjects(): Promise<Project[]>
```

**Returns:** Array of project objects with frontmatter and content
**Usage:** Projects showcase, portfolio components

#### `getProjectBySlug(slug: string)`
Retrieves a specific project by its slug.

```typescript
function getProjectBySlug(slug: string): Promise<Project | null>
```

**Parameters:**
- `slug` (string): The URL slug of the project

**Returns:** Project object or null if not found
**Usage:** Individual project detail pages

#### `getAllCourses()`
Retrieves all courses from the courses content directory.

```typescript
function getAllCourses(): Promise<Course[]>
```

**Returns:** Array of course objects with frontmatter and content
**Usage:** Resources page, learning pathways

#### `getCourseBySlug(slug: string)`
Retrieves a specific course by its slug.

```typescript
function getCourseBySlug(slug: string): Promise<Course | null>
```

**Parameters:**
- `slug` (string): The URL slug of the course

**Returns:** Course object or null if not found
**Usage:** Individual course pages

#### `getDocsByCategory(category: string)`
Retrieves documentation by category.

```typescript
function getDocsByCategory(category: string): Promise<Documentation[]>
```

**Parameters:**
- `category` (string): The documentation category

**Returns:** Array of documentation objects
**Usage:** Documentation sections

## Data Types

### BlogPost
```typescript
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  content: string;
  tags?: string[];
  image?: string;
  readTime?: number;
}
```

### Event
```typescript
interface Event {
  slug: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
  content: string;
  image?: string;
  category?: string;
  organizer?: string;
  maxParticipants?: number;
  registrationUrl?: string;
}
```

### Project
```typescript
interface Project {
  slug: string;
  title: string;
  date: string;
  author?: string;
  description: string;
  content: string;
  image?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
}
```

### Course
```typescript
interface Course {
  slug: string;
  title: string;
  description: string;
  content: string;
  instructor?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  technologies?: string[];
  image?: string;
}
```

### Documentation
```typescript
interface Documentation {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  lastUpdated?: string;
  author?: string;
}
```

## Custom Hooks API

### Data Fetching Hooks

#### `useBlogPosts()`
Hook for fetching and managing blog posts state.

```typescript
function useBlogPosts(): {
  posts: BlogPost[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
```

**Usage:**
```typescript
const { posts, isLoading, error } = useBlogPosts();
```

#### `useEvents()`
Hook for fetching and managing events state.

```typescript
function useEvents(): {
  events: Event[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
```

#### `useProjects()`
Hook for fetching and managing projects state.

```typescript
function useProjects(): {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
```

#### `useCourses()`
Hook for fetching and managing courses state.

```typescript
function useCourses(): {
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
```

### Utility Hooks

#### `useSearch(items: any[], searchTerm: string)`
Hook for filtering content based on search terms.

```typescript
function useSearch<T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[]
```

#### `usePagination(items: any[], itemsPerPage: number)`
Hook for paginating content arrays.

```typescript
function usePagination<T>(
  items: T[],
  itemsPerPage: number
): {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}
```

## Content Management API

### Frontmatter Processing

The application processes YAML frontmatter from markdown files to extract metadata:

```typescript
interface FrontmatterResult<T> {
  data: T;
  content: string;
}

function parseFrontmatter<T>(fileContent: string): FrontmatterResult<T>
```

### Markdown Processing

Markdown content is processed using the Marked library with custom configurations:

```typescript
interface MarkdownOptions {
  highlight?: boolean;
  sanitize?: boolean;
  breaks?: boolean;
}

function parseMarkdown(content: string, options?: MarkdownOptions): string
```

## Navigation API

### Site Configuration

The site navigation and configuration are managed through `/src/config/site.ts`:

```typescript
interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage?: string;
  links: {
    github?: string;
    discord?: string;
    instagram?: string;
    facebook?: string;
  };
}

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
}

export const siteConfig: SiteConfig;
export const mainNav: NavigationItem[];
```

## Error Handling

### Error Types
```typescript
interface ContentError extends Error {
  type: 'not-found' | 'parse-error' | 'network-error';
  slug?: string;
  category?: string;
}
```

### Error Boundaries
The application uses React Error Boundaries to handle rendering errors gracefully.

## Caching Strategy

### React Query Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Cache Keys
- `posts` - All blog posts
- `post-${slug}` - Individual blog post
- `events` - All events
- `event-${slug}` - Individual event
- `projects` - All projects
- `project-${slug}` - Individual project
- `courses` - All courses
- `course-${slug}` - Individual course

## Performance Optimizations

### Lazy Loading
```typescript
// Component lazy loading
const BlogPage = lazy(() => import('./pages/BlogPage'));

// Image lazy loading
<img loading="lazy" src={imageSrc} alt={imageAlt} />
```

### Memoization
```typescript
// Expensive computations
const sortedPosts = useMemo(() => 
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  [posts]
);

// Component memoization
const BlogCard = memo(({ post }: { post: BlogPost }) => {
  // Component implementation
});
```

## Future API Considerations

### Potential Backend Integration
- **REST API**: Traditional REST endpoints for dynamic content
- **GraphQL**: Flexible query language for complex data requirements
- **Headless CMS**: Integration with systems like Strapi or Contentful
- **Real-time Updates**: WebSocket connections for live features

### Search Integration
- **Elasticsearch**: Full-text search capabilities
- **Algolia**: Hosted search solution
- **Local Search**: Client-side search implementation

### Authentication API
- **JWT Tokens**: Stateless authentication
- **OAuth Integration**: Social login providers
- **Role-based Access**: Permission management system
