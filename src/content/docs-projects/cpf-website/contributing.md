---
title: "Guía de Contribución"
description: "Cómo contribuir al desarrollo del sitio web CPF"
chapter: "Desarrollo"
section: "Guía de Contribución"
order: 1
---

# Contributing to CPF Website

## Welcome Contributors!

We're excited that you're interested in contributing to the CPF Website project! This guide will help you get started and ensure your contributions are effective and well-integrated.

## Code of Conduct

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Git** for version control
- **Code editor** (VS Code recommended)
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Setting Up Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/website.git
   cd website
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/CPF-FIUNA/website.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Create environment file**:
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

6. **Start development server**:
   ```bash
   npm start
   ```

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

Examples:
- `feature/add-event-registration`
- `fix/contact-form-validation`
- `docs/update-api-documentation`

### Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add event registration functionality"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes

**Examples:**
```bash
feat: add dark mode toggle
fix: resolve contact form submission error
docs: update API integration guide
style: format code according to prettier rules
refactor: extract email service into separate module
test: add unit tests for contact form validation
chore: update dependencies to latest versions
```

## Coding Standards

### TypeScript Guidelines

1. **Use TypeScript for all new code**:
   ```typescript
   // Good
   interface User {
     id: string;
     name: string;
     email: string;
   }

   const createUser = (userData: User): User => {
     return { ...userData };
   };
   ```

2. **Define proper interfaces**:
   ```typescript
   // src/types/events.ts
   export interface Event {
     id: string;
     title: string;
     description: string;
     date: Date;
     location: string;
     registrationRequired: boolean;
   }
   ```

3. **Use strict type checking**:
   ```typescript
   // Avoid 'any' type
   // Bad
   const data: any = fetchData();

   // Good
   const data: ApiResponse<Event[]> = fetchData();
   ```

### React Component Guidelines

1. **Use functional components with hooks**:
   ```tsx
   import React, { useState, useEffect } from 'react';

   interface Props {
     title: string;
     onSubmit: (data: FormData) => void;
   }

   export const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
     const [data, setData] = useState<FormData>({});

     return (
       <div className="container">
         <h1>{title}</h1>
         {/* Component content */}
       </div>
     );
   };
   ```

2. **Use proper prop interfaces**:
   ```tsx
   interface ButtonProps {
     variant: 'primary' | 'secondary' | 'danger';
     size: 'sm' | 'md' | 'lg';
     disabled?: boolean;
     onClick: () => void;
     children: React.ReactNode;
   }

   export const Button: React.FC<ButtonProps> = ({
     variant,
     size,
     disabled = false,
     onClick,
     children
   }) => {
     // Component implementation
   };
   ```

3. **Extract custom hooks for reusable logic**:
   ```tsx
   // src/hooks/useApi.ts
   export function useApi<T>(url: string) {
     const [data, setData] = useState<T | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
       fetchData();
     }, [url]);

     return { data, loading, error };
   }
   ```

### Styling Guidelines

1. **Use Tailwind CSS utility classes**:
   ```tsx
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
     <h2 className="text-xl font-semibold text-gray-800">Title</h2>
     <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
       Action
     </button>
   </div>
   ```

2. **Create component variants with clsx**:
   ```tsx
   import clsx from 'clsx';

   interface CardProps {
     variant?: 'default' | 'highlighted';
     size?: 'sm' | 'md' | 'lg';
   }

   export const Card: React.FC<CardProps> = ({
     variant = 'default',
     size = 'md',
     children
   }) => {
     return (
       <div className={clsx(
         'rounded-lg shadow-md',
         {
           'bg-white': variant === 'default',
           'bg-blue-50 border-2 border-blue-200': variant === 'highlighted',
           'p-2': size === 'sm',
           'p-4': size === 'md',
           'p-6': size === 'lg',
         }
       )}>
         {children}
       </div>
     );
   };
   ```

### File Organization

```
src/
├── components/
│   ├── common/          # Shared components
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections
│   └── ui/             # Basic UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript interfaces
├── content/            # Markdown content
└── assets/             # Static assets
```

## Testing Guidelines

### Unit Tests

```tsx
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button onClick={() => {}} disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Integration Tests

```tsx
// src/pages/__tests__/Contact.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from '../Contact';
import { EmailService } from '../../services/emailService';

// Mock the email service
jest.mock('../../services/emailService');

describe('Contact Page', () => {
  it('submits form successfully', async () => {
    const mockSendMessage = EmailService.sendContactMessage as jest.Mock;
    mockSendMessage.mockResolvedValueOnce(undefined);

    render(<Contact />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      });
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Button.test.tsx
```

## Documentation Guidelines

### Code Documentation

1. **Use JSDoc for functions**:
   ```typescript
   /**
    * Sends a contact message via EmailJS
    * @param data - The contact form data
    * @returns Promise that resolves when message is sent
    * @throws Error if message fails to send
    */
   export async function sendContactMessage(data: ContactFormData): Promise<void> {
     // Implementation
   }
   ```

2. **Document complex logic**:
   ```typescript
   // Calculate the optimal image size based on viewport and device pixel ratio
   const getOptimalImageSize = (containerWidth: number): number => {
     const devicePixelRatio = window.devicePixelRatio || 1;
     const optimalWidth = containerWidth * devicePixelRatio;
     
     // Round up to nearest standard size to leverage CDN caching
     const standardSizes = [320, 640, 960, 1280, 1920];
     return standardSizes.find(size => size >= optimalWidth) || 1920;
   };
   ```

### README Updates

When adding new features, update relevant documentation:

1. **Feature documentation**
2. **API changes**
3. **Configuration updates**
4. **Migration guides** (if applicable)

## Pull Request Process

### Before Submitting

1. **Test your changes thoroughly**
2. **Update documentation** if needed
3. **Add tests** for new functionality
4. **Check code style** with linting tools
5. **Verify build** passes locally

### Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### Review Process

1. **Automated checks** must pass
2. **At least one review** from a maintainer
3. **All feedback addressed** before merging
4. **Squash and merge** for clean history

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Getting Help

### Community Support

- **GitHub Discussions** - For questions and community interaction
- **GitHub Issues** - For bug reports and feature requests
- **Email** - contact@cpf-fiuna.org for direct communication

### Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Documentation](https://testing-library.com/docs)

## Recognition

Contributors are recognized in:

- **Contributors section** of README
- **Release notes** for significant contributions
- **Annual recognition** for outstanding contributors
- **Maintainer status** for consistent, high-quality contributions

## Questions?

Don't hesitate to ask questions! We're here to help:

- Open a discussion on GitHub
- Comment on existing issues
- Reach out via email

Thank you for contributing to the CPF Website project! 🚀
