---
title: "Primeros Pasos"
description: "Guía para empezar a trabajar con el sitio web CPF"
chapter: "Configuración"
section: "Instalación y Configuración"
order: 1
---

# Getting Started with CPF Website

## Prerequisites

Before you begin working with the CPF Website, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- A modern web browser
- Code editor (VS Code recommended)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/CPF-FIUNA/website.git
cd website
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 4. Start Development Server

```bash
npm start
# or
yarn start
```

The website will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   └── ui/            # Basic UI elements
├── pages/              # Page components
├── content/           # Markdown content
├── styles/            # CSS and styled components
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
└── assets/            # Static assets
```

## Key Technologies

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Framer Motion** - Animations
- **EmailJS** - Contact form handling
- **Markdown** - Content management

## Development Workflow

### 1. Feature Development

1. Create a new branch from `main`
2. Implement your feature
3. Test thoroughly
4. Submit a pull request

### 2. Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use Tailwind classes for styling
- Add proper JSDoc comments for functions

### 3. Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Common Tasks

### Adding New Pages

1. Create the page component in `src/pages/`
2. Add routing in `src/App.tsx`
3. Update navigation if needed

### Adding Content

1. Create/edit markdown files in `src/content/`
2. Import and use in components
3. Update content types if needed

### Styling

- Use Tailwind utility classes
- Create custom components for reusable styles
- Follow the existing design system

## Next Steps

- [Architecture Overview](./architecture) - Understand the system design
- [API Integration](./api) - Learn about backend integration
- [Deployment Guide](./deployment) - Deploy your changes
- [Contributing](./contributing) - How to contribute to the project
