# Architecture Documentation

## Overview

The CPF Website is a modern React-based single-page application (SPA) designed for the Club de Programación FIUNA. It serves as the primary digital presence for the programming club, featuring educational resources, event information, project showcases, and community engagement tools.

## Tech Stack

### Core Technologies
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.6.2** - Type-safe JavaScript development
- **Vite 6.0.1** - Fast build tool and development server
- **React Router DOM 6.28.0** - Client-side routing

### UI & Styling
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **Shadcn/UI** - Pre-built accessible UI components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### State Management & Data Fetching
- **TanStack Query (React Query) 5.59.20** - Server state management
- **Zustand** - Lightweight state management
- **Custom Hooks** - Encapsulated logic and state

### Content Management
- **Gray-Matter** - YAML frontmatter parser
- **Marked** - Markdown parser
- **Prism.js** - Syntax highlighting

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Bun** - Package manager (as evidenced by bun.lockb)

## Architecture Patterns

### 1. Component-Driven Architecture

The application follows a component-driven approach with clear separation of concerns:

```
src/components/
├── ui/                 # Base UI components (Shadcn/UI)
├── layout/            # Layout components (Header, Footer, etc.)
├── common/            # Shared utility components
├── pages/             # Page-specific components
├── sections/          # Section-specific components
├── [feature]/         # Feature-specific components
```

### 2. File-Based Routing

Routes are defined in `App.tsx` using React Router, following a clear URL structure:

- `/` - Homepage
- `/sobre-nosotros` - About page
- `/eventos` - Events listing and detail pages
- `/logros` - Achievements page
- `/proyectos` - Projects showcase
- `/recursos` - Learning resources and roadmaps
- `/comunidad` - Community page
- `/blog` - Blog posts
- `/contacto` - Contact page
- `/docs/*` - Documentation system

### 3. Content Management System

The application implements a static site generator pattern for content management:

#### Content Types
- **Blog Posts** (`/src/content/blog/`)
- **Events** (`/src/content/events/`)
- **Projects** (`/src/content/projects/`)
- **Courses** (`/src/content/courses/`)
- **Documentation** (`/src/content/docs/`)

#### Frontmatter Schema
Each content type uses YAML frontmatter for metadata:

```yaml
---
title: "Content Title"
date: "YYYY-MM-DD"
author: "Author Name"
tags: ["tag1", "tag2"]
description: "Brief description"
image: "/path/to/image.jpg"
---
Content body in Markdown...
```

### 4. Static Site Generation

The `staticSiteGenerator.ts` utility provides functions for:
- Reading and parsing markdown files
- Extracting frontmatter metadata
- Generating content collections
- Handling dynamic routing for content

## Data Flow

### 1. Content Loading
```
Markdown Files → Static Site Generator → Parsed Content → React Components
```

### 2. Navigation Flow
```
User Action → React Router → Route Component → Data Hooks → UI Update
```

### 3. State Management
- **Local State**: React hooks for component-specific state
- **Server State**: TanStack Query for API data
- **Global State**: Zustand for shared application state

## Key Architectural Decisions

### 1. Static Generation over Dynamic APIs
- **Rationale**: Better performance, SEO, and simplicity
- **Implementation**: Markdown files with frontmatter
- **Benefits**: Easy content management, version control

### 2. Component Composition over Inheritance
- **Rationale**: React best practices and flexibility
- **Implementation**: Composition patterns with props and children
- **Benefits**: Reusability and maintainability

### 3. Type-First Development
- **Rationale**: Better developer experience and code reliability
- **Implementation**: TypeScript throughout the codebase
- **Benefits**: Compile-time error checking, better IDE support

### 4. Utility-First CSS
- **Rationale**: Consistent design system and developer productivity
- **Implementation**: Tailwind CSS with custom configurations
- **Benefits**: Rapid development, consistent spacing and colors

## Performance Considerations

### 1. Bundle Optimization
- **Code Splitting**: Route-based splitting with React.lazy()
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image optimization and lazy loading

### 2. Content Delivery
- **Static Assets**: Served from public directory
- **Content Caching**: Browser caching for static content
- **CDN Integration**: Ready for CDN deployment

### 3. Runtime Performance
- **React Query**: Intelligent caching and background updates
- **Memoization**: Strategic use of React.memo and useMemo
- **Virtual Scrolling**: For large content lists (if needed)

## Security Considerations

### 1. Content Security
- **Markdown Sanitization**: Safe rendering of user content
- **XSS Prevention**: Proper escaping and validation
- **Content Validation**: Frontmatter schema validation

### 2. Client-Side Security
- **Dependency Management**: Regular security updates
- **Bundle Analysis**: No sensitive data in client bundles
- **CSP Headers**: Content Security Policy implementation

## Scalability Patterns

### 1. Component Scalability
- **Atomic Design**: Components built from atoms to templates
- **Feature Modules**: Self-contained feature components
- **Shared Components**: Reusable UI component library

### 2. Content Scalability
- **Pagination**: For large content collections
- **Search Integration**: Content search capabilities
- **Categories**: Hierarchical content organization

### 3. Development Scalability
- **Modular Architecture**: Feature-based module organization
- **Type Safety**: Comprehensive TypeScript coverage
- **Testing Strategy**: Unit and integration testing setup

## Future Architecture Considerations

### 1. Potential Enhancements
- **Server-Side Rendering**: Next.js migration for better SEO
- **CMS Integration**: Headless CMS for non-technical content editors
- **API Layer**: Backend API for dynamic features
- **Micro-frontends**: Feature-based application splitting

### 2. Technology Evolution
- **React Server Components**: When widely adopted
- **Edge Computing**: For global content delivery
- **Progressive Web App**: Enhanced mobile experience
- **Real-time Features**: WebSocket integration for live features

## Deployment Architecture

### Current Setup
- **Build Process**: Vite production build
- **Static Hosting**: Compatible with Vercel, Netlify, etc.
- **Asset Optimization**: Automatic optimization during build

### Recommended Infrastructure
- **CDN**: Global content delivery
- **Monitoring**: Performance and error tracking
- **Analytics**: User behavior and performance metrics
- **Backup**: Content and configuration backup strategy
