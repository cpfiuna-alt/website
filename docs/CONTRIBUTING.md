# Contributing Guidelines

## Welcome Contributors!

Thank you for your interest in contributing to the CPF (Club de Programación FIUNA) Website! This document provides comprehensive guidelines for contributing to our project, whether you're fixing a bug, adding a feature, improving documentation, or creating content.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Types of Contributions](#types-of-contributions)
4. [Development Workflow](#development-workflow)
5. [Code Standards](#code-standards)
6. [Content Contributions](#content-contributions)
7. [Pull Request Process](#pull-request-process)
8. [Review Process](#review-process)
9. [Community Guidelines](#community-guidelines)
10. [Recognition](#recognition)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We pledge to make participation in our project a harassment-free experience for everyone, regardless of:

- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, nationality, personal appearance, race, religion
- Sexual identity and orientation, socioeconomic status

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or discriminatory comments
- Publishing others' private information without permission
- Unprofessional conduct or inappropriate behavior
- Any conduct that could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team at [contact@cpf-fiuna.com]. All complaints will be reviewed and investigated promptly and fairly.

## Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js (v18 or higher)
- Bun (recommended) or npm/yarn
- Git
- VS Code (recommended) with suggested extensions
- Basic knowledge of React, TypeScript, and Tailwind CSS

### First-Time Setup

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/cpf-website.git
   cd cpf-website
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/club-programacion-fiuna/cpf-website.git
   ```

3. **Install Dependencies**
   ```bash
   bun install
   ```

4. **Start Development Server**
   ```bash
   bun dev
   ```

5. **Verify Setup**
   - Open `http://localhost:5173`
   - Ensure the site loads correctly
   - Test hot reload by making a small change

### Development Environment

#### Recommended VS Code Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### VS Code Settings
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Types of Contributions

### 1. Code Contributions

#### Bug Fixes
- Fix existing functionality issues
- Improve error handling
- Resolve performance problems
- Address accessibility issues

#### Feature Development
- New page components
- Enhanced UI components
- Additional functionality
- API integrations

#### Performance Improvements
- Bundle size optimization
- Runtime performance enhancements
- Image optimization
- Caching strategies

### 2. Content Contributions

#### Blog Posts
- Technical tutorials
- Programming guides
- Event summaries
- Community spotlights

#### Documentation
- API documentation
- Setup guides
- Best practices
- Troubleshooting guides

#### Learning Resources
- Course materials
- Project ideas
- Learning roadmaps
- Reference materials

### 3. Design Contributions

#### UI/UX Improvements
- Design system enhancements
- User experience improvements
- Accessibility enhancements
- Mobile responsiveness

#### Visual Content
- Graphics and illustrations
- Icons and assets
- Photography
- Video content

### 4. Community Contributions

#### Issue Triage
- Reproduce and verify bugs
- Label and categorize issues
- Provide additional context
- Help with issue resolution

#### Code Review
- Review pull requests
- Provide constructive feedback
- Test proposed changes
- Suggest improvements

#### Support and Mentoring
- Help new contributors
- Answer questions in discussions
- Share knowledge and expertise
- Mentor junior developers

## Development Workflow

### Branch Strategy

We use a simplified Git workflow:

```
main (production)
├── develop (integration)
│   ├── feature/user-authentication
│   ├── feature/blog-comments
│   ├── fix/navigation-bug
│   └── content/new-blog-post
```

#### Branch Naming Convention
- `feature/feature-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `content/content-type-title` - Content additions
- `refactor/component-name` - Code refactoring
- `style/styling-update` - Style-only changes

### Working on Issues

#### Finding Issues to Work On

1. **Good First Issues**: Look for `good first issue` label
2. **Help Wanted**: Check `help wanted` label
3. **Priority Issues**: Review `priority` labeled issues
4. **Your Expertise**: Find issues matching your skills

#### Claiming an Issue

1. Comment on the issue expressing interest
2. Wait for assignment from maintainers
3. Ask questions if requirements are unclear
4. Provide estimated timeline for completion

### Development Process

#### 1. Create Feature Branch
```bash
# Sync with upstream
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name
```

#### 2. Develop and Test
```bash
# Make your changes
# ... code, code, code ...

# Test your changes
bun dev
bun run type-check
bun run lint
bun test
```

#### 3. Commit Changes
```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add user authentication system"
```

#### 4. Push and Create PR
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## Code Standards

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples
```bash
git commit -m "feat(auth): add OAuth login integration"
git commit -m "fix(nav): resolve mobile menu toggle issue"
git commit -m "docs(api): update endpoint documentation"
git commit -m "style(button): improve hover state animations"
```

### TypeScript Guidelines

#### 1. Type Definitions
```typescript
// Always define interfaces for props
interface UserProfileProps {
  user: User;
  onEdit?: (user: User) => void;
  isEditable?: boolean;
}

// Use generic types when appropriate
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Export types for reuse
export type { UserProfileProps, ApiResponse };
```

#### 2. Component Structure
```typescript
import React from 'react';
import { ComponentProps } from './types';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const Component: React.FC<Props> = ({ title, children }) => {
  // Hooks at the top
  const [state, setState] = useState('');
  
  // Event handlers
  const handleClick = useCallback(() => {
    // Handle click
  }, []);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Render
  return (
    <div className="component-container">
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

#### 3. Error Handling
```typescript
// Use proper error types
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Handle errors gracefully
const fetchUserData = async (id: string): Promise<User | null> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new ApiError({
      code: 'FETCH_USER_FAILED',
      message: 'Unable to load user data',
    });
  }
};
```

### CSS/Tailwind Guidelines

#### 1. Class Organization
```tsx
// Organize classes logically
<div className={cn(
  // Layout
  'flex items-center justify-between',
  // Spacing
  'p-4 gap-2',
  // Appearance
  'bg-white rounded-lg border',
  // Typography
  'text-sm font-medium',
  // Interactive states
  'hover:shadow-md transition-shadow',
  // Responsive
  'md:p-6 lg:p-8',
  // Conditional
  isActive && 'bg-primary text-primary-foreground',
  className
)}>
```

#### 2. Custom Utilities
```css
/* Only when Tailwind utilities aren't sufficient */
@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent;
  }
}
```

### Testing Guidelines

#### 1. Unit Tests
```typescript
// Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### 2. Integration Tests
```typescript
// Page testing
import { renderWithProviders } from '@/test-utils';
import { BlogPage } from '../BlogPage';

describe('BlogPage', () => {
  it('displays blog posts', async () => {
    renderWithProviders(<BlogPage />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Blog Posts')).toBeInTheDocument();
    });
  });
});
```

## Content Contributions

### Blog Post Guidelines

#### Structure
```markdown
---
title: "How to Build React Components"
date: "2024-01-15"
author: "Your Name"
description: "Learn to build reusable React components"
tags: ["react", "javascript", "tutorial"]
image: "/images/blog/react-components.jpg"
readTime: 10
---

# Introduction

Start with a compelling introduction...

## Main Content

Break content into logical sections...

### Code Examples

\`\`\`typescript
// Always include working code examples
const ExampleComponent: React.FC = () => {
  return <div>Hello World</div>;
};
\`\`\`

## Conclusion

Summarize key takeaways...
```

#### Content Requirements
- **Original Content**: No plagiarism
- **Technical Accuracy**: Verify all code examples
- **Clear Writing**: Use simple, direct language
- **Proper Attribution**: Credit sources and inspirations
- **SEO Optimization**: Include relevant keywords naturally

### Documentation Guidelines

#### Technical Documentation
- **Clear Structure**: Use consistent headings and organization
- **Code Examples**: Include practical, working examples
- **Prerequisites**: List required knowledge and tools
- **Step-by-Step**: Break complex processes into steps
- **Troubleshooting**: Include common issues and solutions

#### API Documentation
- **Complete Coverage**: Document all endpoints and parameters
- **Type Definitions**: Include TypeScript interfaces
- **Usage Examples**: Show real-world usage
- **Error Handling**: Document error scenarios
- **Response Formats**: Show example responses

## Pull Request Process

### Before Submitting

#### Pre-submission Checklist
- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description is complete

### PR Description Template

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

Describe how you tested your changes:

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots

Include screenshots for UI changes.

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Small PR Guidelines

- **Single Responsibility**: One feature or fix per PR
- **Focused Changes**: Keep changes related and minimal
- **Clear Scope**: Easy to review and understand
- **Quick Turnaround**: Faster review and merge process

### Large PR Guidelines

- **Advance Discussion**: Discuss large changes in issues first
- **Incremental Approach**: Break into smaller, reviewable chunks
- **Detailed Documentation**: Comprehensive PR description
- **Extended Testing**: Thorough testing across different scenarios

## Review Process

### For Contributors

#### Responding to Feedback
- **Be Responsive**: Address feedback promptly
- **Be Open**: Accept constructive criticism gracefully
- **Ask Questions**: Clarify unclear feedback
- **Make Changes**: Implement requested modifications
- **Test Again**: Verify changes don't break anything

#### Code Review Etiquette
- **Stay Professional**: Keep discussions technical and respectful
- **Explain Decisions**: Provide context for your choices
- **Learn from Feedback**: Use reviews as learning opportunities
- **Appreciate Reviewers**: Thank reviewers for their time

### For Reviewers

#### Review Guidelines
- **Be Constructive**: Provide helpful, specific feedback
- **Be Timely**: Review PRs within reasonable time
- **Be Thorough**: Check code quality, functionality, and tests
- **Be Educational**: Explain the reasoning behind suggestions

#### Review Checklist
- [ ] Code quality and readability
- [ ] Adherence to project standards
- [ ] Test coverage and quality
- [ ] Documentation completeness
- [ ] Performance implications
- [ ] Security considerations
- [ ] Accessibility compliance

## Community Guidelines

### Communication Channels

#### GitHub Discussions
- **Q&A**: Ask and answer questions
- **Ideas**: Propose new features or improvements
- **Show and Tell**: Share your contributions
- **General**: Community discussions

#### Discord Server
- **Real-time Chat**: Quick questions and discussions
- **Collaboration**: Coordinate on contributions
- **Social**: Build community connections
- **Support**: Get help from other contributors

### Getting Help

#### When You're Stuck
1. **Check Documentation**: Review existing docs and guides
2. **Search Issues**: Look for similar problems and solutions
3. **Ask in Discussions**: Post detailed questions with context
4. **Join Discord**: Get real-time help from the community
5. **Reach Out**: Contact maintainers directly if needed

#### Providing Help
- **Monitor Discussions**: Help answer questions
- **Share Knowledge**: Write helpful responses
- **Be Patient**: Remember everyone was a beginner once
- **Be Encouraging**: Support new contributors

## Recognition

### Contributor Recognition

#### Contributors Page
All contributors are acknowledged on our contributors page with:
- Profile photo and GitHub link
- Contribution summary
- Role in the project
- Number of contributions

#### Social Media
We highlight significant contributions on our social media channels:
- Feature announcements
- Contributor spotlights
- Project milestones
- Community achievements

#### Swag and Rewards
Active contributors may receive:
- CPF stickers and merchandise
- Event invitations
- Mentorship opportunities
- Resume recommendations

### Maintainer Pathway

Exceptional contributors may be invited to become maintainers:

#### Requirements
- Consistent, high-quality contributions
- Strong understanding of project goals
- Excellent communication skills
- Commitment to community values

#### Responsibilities
- Review and merge pull requests
- Guide new contributors
- Make architectural decisions
- Maintain project standards

## Getting Started Checklist

For new contributors, follow this checklist:

### Technical Setup
- [ ] Fork and clone the repository
- [ ] Install required dependencies
- [ ] Set up development environment
- [ ] Run the project locally
- [ ] Run tests successfully

### Community Integration
- [ ] Read and understand Code of Conduct
- [ ] Join Discord server
- [ ] Introduce yourself in discussions
- [ ] Find a good first issue
- [ ] Ask questions if unclear

### First Contribution
- [ ] Comment on chosen issue
- [ ] Create feature branch
- [ ] Make small, focused changes
- [ ] Test thoroughly
- [ ] Submit pull request
- [ ] Respond to feedback

Welcome to the CPF Website community! We're excited to have you contribute to this project and help make it even better. If you have any questions, don't hesitate to reach out through our community channels.

Happy coding! 🚀
