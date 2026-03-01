# Developer Onboarding Guide

## Welcome to CPF Website Development

This guide will help you get started with the CPF (Club de Programación FIUNA) website project. Whether you're a new team member or a contributor, this document will walk you through everything you need to know.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Code Standards](#code-standards)
6. [Content Management](#content-management)
7. [Component Development](#component-development)
8. [Testing Guidelines](#testing-guidelines)
9. [Deployment Process](#deployment-process)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Bun** (recommended) or npm/yarn - [Install Bun](https://bun.sh/)
- **Git** - [Download here](https://git-scm.com/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Recommended VS Code Extensions
- TypeScript and JavaScript Nightly
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

### Skills Prerequisites
- **JavaScript/TypeScript** - Intermediate level
- **React** - Understanding of hooks, components, and state management
- **CSS/Tailwind** - Basic styling knowledge
- **Git** - Version control basics
- **Markdown** - Content writing format

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/club-programacion-fiuna/cpf-website.git
cd cpf-website
```

### 2. Install Dependencies
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Start Development Server
```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` to see the development server running.

### 5. Verify Setup
- The homepage should load without errors
- Navigation should work correctly
- Hot reload should work when you make changes

## Project Structure

```
cpf-website/
├── public/                 # Static assets
│   ├── images/            # Images and media files
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Base UI components (Shadcn/UI)
│   │   ├── layout/       # Layout components
│   │   ├── common/       # Shared components
│   │   └── [feature]/    # Feature-specific components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── content/          # Markdown content files
│   │   ├── blog/         # Blog posts
│   │   ├── events/       # Event information
│   │   ├── projects/     # Project showcases
│   │   ├── courses/      # Course materials
│   │   └── docs/         # Documentation
│   ├── config/           # Configuration files
│   └── types/            # TypeScript type definitions
├── docs/                 # Project documentation
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.ts        # Vite build configuration
```

## Development Workflow

### 1. Feature Development Process

#### Step 1: Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

#### Step 2: Develop and Test
- Write your code following the established patterns
- Test your changes in the browser
- Ensure no TypeScript errors
- Follow the component structure guidelines

#### Step 3: Commit Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

#### Step 4: Push and Create PR
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

### 2. Commit Message Convention

We follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 3. Branch Naming Convention
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation updates
- `refactor/component-name` - Code refactoring

## Code Standards

### TypeScript Guidelines

#### 1. Always Define Types
```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

// Bad
const user: any = { ... };
```

#### 2. Use Proper Naming Conventions
```typescript
// Components: PascalCase
const BlogCard = () => { ... };

// Functions: camelCase
const fetchUserData = () => { ... };

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
```

#### 3. Export Types and Interfaces
```typescript
// types/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  content: string;
}
```

### React Component Guidelines

#### 1. Component Structure
```typescript
import React from 'react';
import { ComponentProps } from './types';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const MyComponent: React.FC<Props> = ({ title, children }) => {
  // Hooks at the top
  const [state, setState] = useState('');

  // Event handlers
  const handleClick = () => {
    // Handle click
  };

  // Render
  return (
    <div className="component-container">
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

#### 2. Custom Hooks
```typescript
// hooks/useApi.ts
export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Implementation...

  return { data, loading, error };
};
```

### CSS/Tailwind Guidelines

#### 1. Use Tailwind Classes
```tsx
// Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// Avoid custom CSS when Tailwind classes exist
<div style={{ padding: '1rem', backgroundColor: 'white' }}>
```

#### 2. Component-Specific Styles
```tsx
// For complex components, create utility classes
<div className="hero-gradient text-center py-20">
  <h1 className="text-4xl font-bold text-white">Welcome</h1>
</div>
```

## Content Management

### Adding New Content

#### 1. Blog Posts
Create a new file in `src/content/blog/`:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
author: "Your Name"
description: "Brief description of the post"
tags: ["react", "typescript", "tutorial"]
image: "/images/blog/your-post-image.jpg"
---

# Your Blog Post

Your content here in Markdown format...
```

#### 2. Events
Create a new file in `src/content/events/`:

```markdown
---
title: "Workshop: React Fundamentals"
date: "2024-02-20"
time: "18:00"
location: "Aula Magna, FIUNA"
description: "Learn React fundamentals in this hands-on workshop"
category: "workshop"
organizer: "CPF Team"
maxParticipants: 50
registrationUrl: "https://example.com/register"
---

# Event Details

Detailed event information...
```

#### 3. Projects
Create a new file in `src/content/projects/`:

```markdown
---
title: "CPF Website"
date: "2024-01-01"
author: "Development Team"
description: "Official website for Club de Programación FIUNA"
technologies: ["React", "TypeScript", "Tailwind CSS"]
githubUrl: "https://github.com/club-programacion-fiuna/cpf-website"
liveUrl: "https://cpf-fiuna.com"
status: "completed"
---

# Project Description

Project details and implementation...
```

### Content Guidelines

1. **File Naming**: Use kebab-case (e.g., `my-blog-post.md`)
2. **Images**: Store in `public/images/` with organized subdirectories
3. **Frontmatter**: Always include required fields
4. **Markdown**: Use proper heading hierarchy (# → ## → ###)

## Component Development

### Creating New Components

#### 1. UI Components (Reusable)
```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  ...props 
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'border border-gray-300 bg-transparent hover:bg-gray-50': variant === 'outline',
        },
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### 2. Feature Components
```typescript
// src/components/blog/BlogCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/Button';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{post.date}</span>
          <Button variant="outline" size="sm">
            <Link to={`/blog/${post.slug}`}>Read More</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
```

### Component Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Default Props**: Use default parameters instead of defaultProps
4. **Composition**: Prefer composition over inheritance
5. **Accessibility**: Include proper ARIA attributes and semantic HTML

## Testing Guidelines

### Unit Testing
```typescript
// src/components/ui/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('bg-gray-200');
  });
});
```

### Integration Testing
```typescript
// src/pages/__tests__/BlogPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BlogPage } from '../BlogPage';

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('BlogPage', () => {
  it('displays blog posts', async () => {
    renderWithProviders(<BlogPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    });
  });
});
```

## Deployment Process

### Development Deployment
1. Push changes to `develop` branch
2. Automatic deployment to staging environment
3. Review and test changes

### Production Deployment
1. Create Pull Request from `develop` to `main`
2. Code review and approval
3. Merge to `main` branch
4. Automatic deployment to production

### Build Commands
```bash
# Development build
bun run build:dev

# Production build
bun run build

# Preview production build locally
bun run preview
```

## Troubleshooting

### Common Issues

#### 1. TypeScript Errors
```bash
# Check for type errors
bun run type-check

# Fix common issues
- Ensure all imports have proper types
- Check for missing type definitions
- Verify interface definitions match usage
```

#### 2. Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules
rm bun.lockb  # or package-lock.json
bun install

# Check for circular dependencies
bun run build --verbose
```

#### 3. Content Not Loading
- Verify markdown frontmatter format
- Check file paths and naming conventions
- Ensure content files are in correct directories

#### 4. Styling Issues
- Check Tailwind configuration
- Verify class names are correct
- Check for conflicting styles

### Getting Help

1. **Documentation**: Check existing docs in `/docs` folder
2. **Code Examples**: Look at similar components for patterns
3. **Team Chat**: Reach out in the development channel
4. **Issues**: Create GitHub issues for bugs or feature requests

## Next Steps

After completing this onboarding:

1. **Explore the Codebase**: Browse through different components and pages
2. **Read Documentation**: Review architecture and API documentation
3. **Start Small**: Pick up beginner-friendly issues
4. **Ask Questions**: Don't hesitate to ask for help
5. **Contribute**: Share your improvements and suggestions

Welcome to the team! We're excited to have you contribute to the CPF website project.
