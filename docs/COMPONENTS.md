# Component Library and Design System

## Overview

The CPF Website uses a comprehensive design system built on top of Shadcn/UI components and Tailwind CSS. This document outlines the component library, design tokens, patterns, and guidelines that ensure consistency across the entire application.

## Table of Contents

1. [Design System Foundation](#design-system-foundation)
2. [Component Architecture](#component-architecture)
3. [Design Tokens](#design-tokens)
4. [Base Components](#base-components)
5. [Composite Components](#composite-components)
6. [Layout Components](#layout-components)
7. [Page Components](#page-components)
8. [Component Guidelines](#component-guidelines)
9. [Styling Conventions](#styling-conventions)
10. [Accessibility Standards](#accessibility-standards)

## Design System Foundation

### Philosophy
Our design system follows atomic design principles with a focus on:
- **Consistency**: Unified visual language across all components
- **Accessibility**: WCAG 2.1 AA compliance for all interactive elements
- **Flexibility**: Components that adapt to different contexts and use cases
- **Performance**: Optimized components with minimal runtime overhead
- **Developer Experience**: Clear APIs and comprehensive documentation

### Tech Stack
- **Shadcn/UI**: Base component library with accessibility built-in
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Consistent icon system
- **CVA (Class Variance Authority)**: Type-safe component variants

## Component Architecture

### Component Hierarchy

```
Design System
├── Tokens
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Shadows
├── Base Components (Atoms)
│   ├── Button
│   ├── Input
│   ├── Badge
│   └── Avatar
├── Composite Components (Molecules)
│   ├── SearchBox
│   ├── Card
│   ├── Navigation
│   └── Form
├── Layout Components (Organisms)
│   ├── Header
│   ├── Footer
│   ├── Sidebar
│   └── Grid
└── Page Components (Templates)
    ├── BlogPage
    ├── EventPage
    └── ProjectPage
```

### Component Structure

Each component follows a consistent structure:

```typescript
// Component implementation
export interface ComponentProps {
  // Props interface
}

export const Component = React.forwardRef<
  HTMLElement,
  ComponentProps
>(({ ...props }, ref) => {
  // Component logic
  return (
    // JSX implementation
  );
});

Component.displayName = "Component";

// Export variants and utilities
export { componentVariants } from "./variants";
export type { ComponentProps };
```

## Design Tokens

### Color System

#### Primary Colors
```typescript
// Brand colors
const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Primary brand color
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
};
```

#### Semantic Colors
```typescript
const semanticColors = {
  success: {
    light: '#22c55e',
    DEFAULT: '#16a34a',
    dark: '#15803d',
  },
  warning: {
    light: '#f59e0b',
    DEFAULT: '#d97706',
    dark: '#b45309',
  },
  error: {
    light: '#ef4444',
    DEFAULT: '#dc2626',
    dark: '#b91c1c',
  },
  info: {
    light: '#06b6d4',
    DEFAULT: '#0891b2',
    dark: '#0e7490',
  },
};
```

### Typography System

#### Font Families
```css
/* Primary font for headings and body text */
.font-sans {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Monospace font for code */
.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

#### Type Scale
```typescript
const typography = {
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
```

### Spacing System

```typescript
const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
};
```

## Base Components

### Button Component

#### Implementation
```typescript
// components/ui/Button.tsx
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

#### Usage Examples
```tsx
// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon name="plus" />
</Button>

// As link
<Button asChild>
  <Link to="/projects">View Projects</Link>
</Button>
```

### Input Component

#### Implementation
```typescript
// components/ui/Input.tsx
import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
```

### Card Component

#### Implementation
```typescript
// components/ui/Card.tsx
import React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

## Composite Components

### BlogCard Component

```typescript
// components/blog/BlogCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  variant = 'default' 
}) => {
  return (
    <Card className={cn(
      'overflow-hidden transition-all hover:shadow-lg',
      variant === 'featured' && 'md:flex md:flex-row',
      variant === 'compact' && 'h-full'
    )}>
      {post.image && (
        <div className={cn(
          'relative overflow-hidden',
          variant === 'featured' ? 'md:w-1/2' : 'aspect-video'
        )}>
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <div className={cn(
        'flex flex-col',
        variant === 'featured' && 'md:w-1/2'
      )}>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="line-clamp-2">
            <Link 
              to={`/blog/${post.slug}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-muted-foreground line-clamp-3">
            {post.description}
          </p>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </>
            )}
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/blog/${post.slug}`}>
              Read More
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
```

### SearchBox Component

```typescript
// components/common/SearchBox.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  onSearch,
  onClear,
  className,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
};
```

## Layout Components

### Header Component

```typescript
// components/layout/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { siteConfig, mainNav } from '@/config/site';
import { cn } from '@/utils/cn';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/logo.svg" 
            alt={siteConfig.name}
            className="h-8 w-8"
          />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-8 items-center space-x-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Search */}
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      location.pathname === item.href
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
```

## Component Guidelines

### API Design Principles

#### 1. Consistent Prop Naming
```typescript
// Use standard HTML props when possible
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

// Use descriptive names for custom props
interface CardProps {
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}
```

#### 2. Flexible Composition
```typescript
// Allow composition with asChild pattern
<Button asChild>
  <Link to="/projects">View Projects</Link>
</Button>

// Support render props for complex customization
<DataTable
  data={projects}
  renderRow={(project) => (
    <ProjectRow key={project.id} project={project} />
  )}
/>
```

#### 3. Accessible by Default
```typescript
// Include ARIA attributes automatically
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-busy={loading}
        aria-disabled={loading}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);
```

### Performance Guidelines

#### 1. Optimize Re-renders
```typescript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }: Props) => {
  // Expensive rendering logic
});

// Use useMemo for expensive calculations
const sortedData = useMemo(() => 
  data.sort((a, b) => a.date.localeCompare(b.date)),
  [data]
);
```

#### 2. Lazy Load Heavy Components
```typescript
// Lazy load components that aren't immediately visible
const DataVisualization = lazy(() => import('./DataVisualization'));

// Use with Suspense
<Suspense fallback={<Skeleton />}>
  <DataVisualization data={data} />
</Suspense>
```

## Styling Conventions

### Class Organization
```tsx
// Order classes logically
<div className={cn(
  // Layout
  'flex items-center justify-between',
  // Spacing
  'p-4 gap-2',
  // Sizing
  'w-full h-auto',
  // Colors
  'bg-white border border-gray-200',
  // Typography
  'text-sm font-medium',
  // Effects
  'rounded-lg shadow-sm',
  // Interactive states
  'hover:shadow-md transition-shadow',
  // Responsive
  'md:p-6 lg:p-8',
  // Conditional classes
  isActive && 'bg-primary text-primary-foreground',
  className
)}>
```

### Responsive Design
```tsx
// Mobile-first responsive design
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  md:grid-cols-3 md:gap-8
  lg:grid-cols-4
">
```

### Dark Mode Support
```tsx
// Use semantic color classes
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### 1. Color Contrast
```css
/* Ensure minimum contrast ratios */
.text-primary {
  color: hsl(var(--primary)); /* 4.5:1 contrast ratio */
}

.text-muted-foreground {
  color: hsl(var(--muted-foreground)); /* 4.5:1 contrast ratio */
}
```

#### 2. Focus Management
```tsx
// Visible focus indicators
<Button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Click me
</Button>

// Focus trapping in modals
const DialogContent = ({ children }) => {
  useFocusTrap(ref);
  
  return (
    <div ref={ref} role="dialog" aria-labelledby="dialog-title">
      {children}
    </div>
  );
};
```

#### 3. Semantic HTML
```tsx
// Use proper semantic elements
<article>
  <header>
    <h1>Blog Post Title</h1>
    <time dateTime="2024-01-15">January 15, 2024</time>
  </header>
  <main>
    <p>Blog post content...</p>
  </main>
  <footer>
    <nav aria-label="Post navigation">
      <a href="/prev-post">Previous</a>
      <a href="/next-post">Next</a>
    </nav>
  </footer>
</article>
```

#### 4. ARIA Labels
```tsx
// Descriptive labels for interactive elements
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Status announcements
<div aria-live="polite" aria-atomic="true">
  {message && <Alert>{message}</Alert>}
</div>
```

This comprehensive component library and design system documentation ensures consistent, accessible, and maintainable UI components across the CPF Website project.
