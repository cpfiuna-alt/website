import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Code, Terminal, Award, Lightbulb, Video, BookOpen, 
  FileText, Users, ExternalLink, ChevronRight, ArrowRight, Compass, Brain
} from "lucide-react";
// COMMENTED OUT: RoadmapFlow import since roadmap display is disabled
// import RoadmapFlow from "./RoadmapFlow";

export interface RoadmapResource {
  name: string;
  url: string;
  type: string;
}

export interface RoadmapLevel {
  name: string;
  skills: string[];
  resources: RoadmapResource[];
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  levels: RoadmapLevel[];
}

const learningRoadmaps: Roadmap[] = [
  {
    id: "frontend",
    title: "Desarrollo Frontend",
    description: "Domina las tecnologías para crear interfaces de usuario atractivas y funcionales",
    levels: [
      {
        name: "Principiante",
        skills: [
          "HTML5 semántico", "CSS3 y Flexbox", "JavaScript ES6+", "Git básico", 
          "Responsive Design", "CSS Grid", "DOM Manipulation", "Event Handling",
          "Browser DevTools", "Semantic Web", "Web Standards", "CSS Variables",
          "CSS Animations", "JavaScript Debugging", "Version Control", "Code Editors"
        ],
        resources: [
          { name: "MDN HTML Tutorial - Curso oficial completo de Mozilla con ejemplos interactivos y buenas prácticas de HTML5 semántico", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML", type: "Tutorial" },
          { name: "CSS-Tricks Complete Guide to Flexbox - Guía visual definitiva con ejemplos prácticos para dominar el layout flexible", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "Guía" },
          { name: "JavaScript.info - Tutorial moderno y completo que cubre desde fundamentos hasta conceptos avanzados de ES6+", url: "https://javascript.info/", type: "Curso" },
          { name: "freeCodeCamp Responsive Web Design - Curso gratuito con certificación que incluye proyectos prácticos reales", url: "https://www.freecodecamp.org/learn/responsive-web-design/", type: "Curso" },
          { name: "Git Handbook by GitHub - Guía oficial para aprender control de versiones desde comandos básicos hasta workflows", url: "https://guides.github.com/introduction/git-handbook/", type: "Guía" },
          { name: "CSS Grid Garden - Juego interactivo que enseña CSS Grid Layout de forma divertida y práctica", url: "https://cssgridgarden.com/", type: "Ejercicios" },
          { name: "Flexbox Froggy - Juego educativo para dominar Flexbox resolviendo 24 niveles progresivos", url: "https://flexboxfroggy.com/", type: "Ejercicios" },
          { name: "30 Days of JavaScript - Desafío intensivo con ejercicios diarios para consolidar JavaScript moderno", url: "https://github.com/Asabeneh/30-Days-Of-JavaScript", type: "Ejercicios" },
          { name: "W3Schools HTML Reference - Referencia completa con ejemplos en vivo de todas las etiquetas y atributos HTML", url: "https://www.w3schools.com/html/", type: "Tutorial" },
          { name: "CSS Battle - Plataforma de desafíos para mejorar habilidades CSS recreando diseños específicos en el menor código", url: "https://cssbattle.dev/", type: "Ejercicios" },
          { name: "Chrome DevTools Documentation - Guía oficial para dominar las herramientas de desarrollo del navegador", url: "https://developer.chrome.com/docs/devtools/", type: "Guía" },
          { name: "Can I Use - Base de datos de compatibilidad de navegadores para características web modernas", url: "https://caniuse.com/", type: "Tutorial" },
          { name: "Codecademy HTML & CSS - Curso interactivo estructurado con ejercicios prácticos paso a paso", url: "https://www.codecademy.com/learn/learn-html", type: "Curso" },
          { name: "CSS Animation Rocks - Tutoriales y ejemplos para crear animaciones CSS atractivas y performantes", url: "https://cssanimation.rocks/", type: "Tutorial" },
          { name: "JavaScript30 - 30 proyectos en 30 días para practicar JavaScript vanilla sin frameworks", url: "https://javascript30.com/", type: "Ejercicios" }
        ]
      },
      {
        name: "Intermedio",
        skills: [
          "React.js", "TypeScript", "State Management", "React Hooks", "CSS-in-JS", 
          "Webpack/Vite", "NPM/Yarn", "API Integration", "Testing básico", "Sass/SCSS",
          "React Router", "Form Handling", "Component Libraries", "Context API",
          "Custom Hooks", "Error Boundaries", "Code Splitting", "Lazy Loading",
          "Performance Optimization", "ESLint/Prettier", "Module Bundlers"
        ],
        resources: [
          { name: "React Official Tutorial - Documentación oficial renovada con ejemplos interactivos y conceptos modernos paso a paso", url: "https://react.dev/learn", type: "Curso" },
          { name: "TypeScript Handbook - Guía completa oficial desde conceptos básicos hasta características avanzadas del tipado estático", url: "https://www.typescriptlang.org/docs/", type: "Guía" },
          { name: "React Hooks in Action - Curso práctico completo sobre hooks modernos con ejemplos reales y patrones avanzados", url: "https://www.manning.com/books/react-hooks-in-action", type: "Curso" },
          { name: "Styled Components Documentation - Guía oficial para CSS-in-JS con componentes estilizados y theming dinámico", url: "https://styled-components.com/docs", type: "Tutorial" },
          { name: "Vite Getting Started - Herramienta de construcción ultrarrápida con HMR instantáneo y configuración mínima", url: "https://vitejs.dev/guide/", type: "Guía" },
          { name: "React Testing Library - Librería para testing intuitivo de componentes enfocado en la experiencia del usuario", url: "https://testing-library.com/docs/react-testing-library/intro/", type: "Tutorial" },
          { name: "Zustand State Management - Librería minimalista para gestión de estado global sin boilerplate", url: "https://github.com/pmndrs/zustand", type: "Guía" },
          { name: "React Hook Form - Librería performante para manejo de formularios con validación y menos re-renders", url: "https://react-hook-form.com/get-started", type: "Tutorial" },
          { name: "Axios HTTP Client - Cliente HTTP basado en promesas para consumir APIs REST de forma elegante", url: "https://axios-http.com/docs/intro", type: "Guía" },
          { name: "Tailwind CSS Documentation - Framework CSS utility-first para desarrollo rápido y diseño consistente", url: "https://tailwindcss.com/docs", type: "Tutorial" },
          { name: "React Router v6 - Librería declarativa para navegación y enrutamiento en aplicaciones React SPA", url: "https://reactrouter.com/en/main", type: "Tutorial" },
          { name: "Material-UI (MUI) - Librería completa de componentes React con Material Design y customización avanzada", url: "https://mui.com/getting-started/installation/", type: "Tutorial" },
          { name: "Sass Documentation - Preprocesador CSS con variables, mixins, funciones y estructuración modular", url: "https://sass-lang.com/documentation", type: "Guía" },
          { name: "Jest Testing Framework - Framework de testing JavaScript con snapshots, mocking y coverage reports", url: "https://jestjs.io/docs/getting-started", type: "Tutorial" },
          { name: "ESLint Configuration - Herramienta de linting para mantener código JavaScript/TypeScript consistente y libre de errores", url: "https://eslint.org/docs/user-guide/getting-started", type: "Guía" },
          { name: "Framer Motion - Librería de animaciones declarativas para React con spring animations y gestures", url: "https://www.framer.com/motion/", type: "Tutorial" }
        ]
      },
      {
        name: "Avanzado",
        skills: [
          "Next.js/Gatsby", "SSR/SSG/ISR", "PWA", "Performance Optimization", 
          "Web Vitals", "Advanced State Management (Redux/Zustand)", "Testing avanzado",
          "CI/CD", "Micro-frontends", "Web Assembly", "Server Components", 
          "Edge Computing", "A11y (Accessibility)", "SEO", "Bundle Analysis",
          "Monorepos", "Design Systems", "GraphQL", "WebSockets", "Web Workers",
          "Service Workers", "Module Federation", "Streaming SSR", "React Suspense"
        ],
        resources: [
          { name: "Next.js Documentation - Framework React full-stack con SSR, SSG, ISR, API routes y optimizaciones automáticas", url: "https://nextjs.org/docs", type: "Curso" },
          { name: "Web.dev Performance - Guías oficiales de Google para optimización web, Core Web Vitals y mejores prácticas", url: "https://web.dev/performance/", type: "Guía" },
          { name: "PWA Builder by Microsoft - Herramienta para convertir sitios web en Progressive Web Apps con manifests y service workers", url: "https://www.pwabuilder.com/", type: "Taller" },
          { name: "Redux Toolkit Official Guide - Herramienta oficial para gestión de estado global predictible en aplicaciones complejas", url: "https://redux-toolkit.js.org/", type: "Tutorial" },
          { name: "Cypress Testing Documentation - Framework de testing end-to-end con debugging visual y testing de integración", url: "https://docs.cypress.io/guides/overview/why-cypress", type: "Curso" },
          { name: "GitHub Actions Workflow - Plataforma de CI/CD para automatizar testing, building y deployment de aplicaciones", url: "https://docs.github.com/en/actions", type: "Guía" },
          { name: "Webpack Bundle Optimization - Guía avanzada para optimización de bundles, code splitting y tree shaking", url: "https://webpack.js.org/guides/code-splitting/", type: "Guía" },
          { name: "TanStack Query (React Query) - Librería para gestión de estado servidor con cache inteligente y sincronización", url: "https://tanstack.com/query/latest", type: "Tutorial" },
          { name: "Storybook Documentation - Herramienta para desarrollo y documentación de componentes UI en aislamiento", url: "https://storybook.js.org/docs", type: "Taller" },
          { name: "WCAG 2.1 Guidelines - Estándares internacionales de accesibilidad web para crear aplicaciones inclusivas", url: "https://www.w3.org/WAI/WCAG21/quickref/", type: "Guía" },
          { name: "Lighthouse Performance Auditing - Herramienta de auditoría automática para rendimiento, SEO y accesibilidad", url: "https://developers.google.com/web/tools/lighthouse", type: "Taller" },
          { name: "Micro-frontends Architecture - Patrón arquitectónico para dividir aplicaciones grandes en módulos independientes", url: "https://micro-frontends.org/", type: "Guía" },
          { name: "React Server Components - Nueva arquitectura para renderizado híbrido servidor/cliente con componentes del servidor", url: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components", type: "Guía" },
          { name: "Vercel Edge Functions - Computación en el edge para reducir latencia y mejorar rendimiento global", url: "https://vercel.com/docs/concepts/functions/edge-functions", type: "Tutorial" },
          { name: "GraphQL Documentation - Lenguaje de consulta para APIs que permite obtener exactamente los datos necesarios", url: "https://graphql.org/learn/", type: "Curso" },
          { name: "Apollo GraphQL Client - Cliente GraphQL completo para React con cache normalizado y optimistic updates", url: "https://www.apollographql.com/docs/react/", type: "Tutorial" },
          { name: "Turborepo Monorepo Guide - Herramienta para gestionar monorepos con builds incrementales y cache distribuido", url: "https://turbo.build/repo/docs", type: "Guía" },
          { name: "Radix UI Design System - Primitivos de UI sin estilo para construir design systems accesibles y customizables", url: "https://www.radix-ui.com/", type: "Tutorial" },
          { name: "Playwright Testing - Framework moderno de testing end-to-end multi-browser con auto-wait y debugging", url: "https://playwright.dev/", type: "Curso" },
          { name: "Parcel Bundler - Bundler zero-configuration con soporte nativo para múltiples lenguajes y optimizaciones", url: "https://parceljs.org/docs/", type: "Guía" }
        ]
      }
    ]
  },
  {
    id: "backend",
    title: "Desarrollo Backend",
    description: "Construye APIs robustas y servicios del lado del servidor",
    levels: [
      {
        name: "Principiante",
        skills: [
          "Fundamentos HTTP", "Node.js/Python", "SQL Básico", "Git", "Linux Básico",
          "REST APIs", "JSON", "Bases de Datos Relacionales", "Postman/Insomnia",
          "Environment Variables", "Package Managers", "CRUD Operations",
          "Status Codes HTTP", "Server Fundamentals", "Command Line", "Debugging Básico"
        ],
        resources: [
          { name: "Node.js Official Tutorial - Documentación oficial completa con ejemplos prácticos para crear aplicaciones del lado del servidor", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", type: "Curso" },
          { name: "SQL Tutorial by W3Schools - Curso interactivo que cubre SELECT, INSERT, UPDATE, DELETE y conceptos fundamentales de bases de datos", url: "https://www.w3schools.com/sql/", type: "Tutorial" },
          { name: "HTTP Crash Course - MDN Guide - Fundamentos del protocolo HTTP, métodos, headers, status codes y cómo funciona la web", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", type: "Guía" },
          { name: "PostgreSQL Tutorial - Curso completo desde instalación hasta consultas avanzadas con la base de datos más popular", url: "https://www.postgresqltutorial.com/", type: "Tutorial" },
          { name: "REST API Design Best Practices - Guía para diseñar APIs RESTful escalables siguiendo estándares de la industria", url: "https://restfulapi.net/", type: "Guía" },
          { name: "Postman Learning Center - Herramienta esencial para testing de APIs con colecciones, environments y automatización", url: "https://learning.postman.com/", type: "Tutorial" },
          { name: "Python for Beginners - Microsoft - Curso oficial de Microsoft para aprender Python desde cero con enfoque en desarrollo backend", url: "https://docs.microsoft.com/en-us/learn/paths/beginner-python/", type: "Curso" },
          { name: "SQLBolt Interactive Tutorial - Aprende SQL de forma interactiva con ejercicios prácticos y feedback inmediato", url: "https://sqlbolt.com/", type: "Ejercicios" },
          { name: "Linux Command Line Basics - Comandos esenciales de terminal para administración de servidores y desarrollo", url: "https://ubuntu.com/tutorials/command-line-for-beginners", type: "Tutorial" },
          { name: "Git Handbook - Control de versiones distribuido esencial para cualquier desarrollador backend", url: "https://guides.github.com/introduction/git-handbook/", type: "Guía" },
          { name: "JSON Introduction - MDN - Formato de intercambio de datos más usado en APIs modernas con ejemplos prácticos", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON", type: "Tutorial" },
          { name: "Database Design Fundamentals - Principios de diseño de bases de datos relacionales, normalización y buenas prácticas", url: "https://opentextbc.ca/dbdesign01/", type: "Curso" },
          { name: "VS Code for Backend Development - Configuración y extensiones esenciales para desarrollo backend eficiente", url: "https://code.visualstudio.com/docs/nodejs/nodejs-tutorial", type: "Tutorial" }
        ]
      },
      {
        name: "Intermedio",
        skills: [
          "Express.js/FastAPI/Flask", "ORM/ODM", "JWT Authentication", "Middleware",
          "Database Design", "API Documentation", "Testing (Unit/Integration)", "Docker Básico",
          "Environment Management", "Error Handling", "Logging", "Validation",
          "Security Basics", "CORS", "Rate Limiting", "File Upload", "Email Services",
          "Caching", "Session Management", "Background Jobs"
        ],
        resources: [
          { name: "Express.js Official Guide - Framework web más popular de Node.js para crear APIs robustas y escalables", url: "https://expressjs.com/en/guide/routing.html", type: "Curso" },
          { name: "FastAPI Documentation - Framework Python moderno y rápido para APIs con validación automática y documentación interactiva", url: "https://fastapi.tiangolo.com/tutorial/", type: "Curso" },
          { name: "Prisma ORM Complete Guide - ORM moderno type-safe para Node.js con generación automática de tipos TypeScript", url: "https://www.prisma.io/docs/getting-started", type: "Tutorial" },
          { name: "JWT.io Introduction - JSON Web Tokens para autenticación stateless segura en aplicaciones distribuidas", url: "https://jwt.io/introduction/", type: "Guía" },
          { name: "Docker Getting Started - Containerización de aplicaciones para desarrollo y deployment consistente", url: "https://docs.docker.com/get-started/", type: "Tutorial" },
          { name: "Jest Testing Framework - Framework de testing completo para Node.js con mocking, coverage y snapshots", url: "https://jestjs.io/docs/getting-started", type: "Tutorial" },
          { name: "Swagger/OpenAPI Specification - Estándar para documentación de APIs con interfaz interactiva y generación de clientes", url: "https://swagger.io/docs/specification/about/", type: "Guía" },
          { name: "Mongoose ODM for MongoDB - Object Document Mapper para MongoDB con validaciones y middleware avanzado", url: "https://mongoosejs.com/docs/guide.html", type: "Tutorial" },
          { name: "bcrypt Password Hashing - Librería para hash seguro de contraseñas con salt automático y configuración de rounds", url: "https://www.npmjs.com/package/bcrypt", type: "Guía" },
          { name: "Winston Logging Library - Sistema de logging avanzado con múltiples transportes y niveles configurables", url: "https://github.com/winstonjs/winston", type: "Tutorial" },
          { name: "Joi Validation Library - Librería para validación de esquemas de datos con soporte para objetos complejos", url: "https://joi.dev/api/", type: "Guía" },
          { name: "Helmet.js Security Middleware - Middleware de seguridad para Express que configura headers HTTP seguros automáticamente", url: "https://helmetjs.github.io/", type: "Tutorial" },
          { name: "Redis Caching Tutorial - Base de datos en memoria para caching, sessions y estructuras de datos complejas", url: "https://redis.io/docs/getting-started/", type: "Tutorial" },
          { name: "Nodemailer Email Service - Librería para envío de emails desde Node.js con soporte para múltiples proveedores", url: "https://nodemailer.com/about/", type: "Guía" },
          { name: "Bull Queue for Background Jobs - Sistema de colas robusto para procesamiento de tareas en background", url: "https://github.com/OptimalBits/bull", type: "Tutorial" },
          { name: "Supertest API Testing - Librería para testing de APIs HTTP con assertions fluidas y setup sencillo", url: "https://github.com/visionmedia/supertest", type: "Tutorial" }
        ]
      },
      {
        name: "Avanzado",
        skills: [
          "Microservicios", "GraphQL", "WebSockets", "Message Queues", "Event Sourcing",
          "CQRS", "Database Optimization", "Monitoring & Observability", "Kubernetes",
          "CI/CD Pipelines", "Load Balancing", "API Gateway", "Service Discovery",
          "Distributed Systems", "Event-Driven Architecture", "Performance Tuning",
          "Security Advanced", "Scalability Patterns", "Data Streaming", "Cloud Services"
        ],
        resources: [
          { name: "Microservices Architecture Guide - Patrón arquitectónico para dividir aplicaciones en servicios independientes y escalables", url: "https://microservices.io/patterns/microservices.html", type: "Guía" },
          { name: "GraphQL Official Tutorial - Lenguaje de consulta para APIs que permite obtener exactamente los datos necesarios", url: "https://graphql.org/learn/", type: "Curso" },
          { name: "Apollo GraphQL Server - Implementación completa de GraphQL server con subscriptions, federación y caching", url: "https://www.apollographql.com/docs/apollo-server/", type: "Tutorial" },
          { name: "Socket.io Documentation - Librería para comunicación bidireccional en tiempo real entre cliente y servidor", url: "https://socket.io/docs/v4/", type: "Tutorial" },
          { name: "Apache Kafka Tutorial - Plataforma de streaming distribuida para procesamiento de eventos en tiempo real", url: "https://kafka.apache.org/documentation/", type: "Curso" },
          { name: "RabbitMQ Message Broker - Sistema de mensajería robusto para comunicación asíncrona entre servicios", url: "https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html", type: "Tutorial" },
          { name: "Event Sourcing Pattern - Patrón para capturar todos los cambios como secuencia de eventos inmutables", url: "https://martinfowler.com/eaaDev/EventSourcing.html", type: "Guía" },
          { name: "CQRS Pattern Explained - Command Query Responsibility Segregation para separar lecturas y escrituras", url: "https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs", type: "Guía" },
          { name: "Kubernetes Documentation - Orquestación de contenedores para deployment y scaling automático de aplicaciones", url: "https://kubernetes.io/docs/home/", type: "Curso" },
          { name: "Prometheus Monitoring - Sistema de monitoreo y alertas para aplicaciones distribuidas con métricas time-series", url: "https://prometheus.io/docs/introduction/overview/", type: "Tutorial" },
          { name: "Grafana Observability - Plataforma de visualización para dashboards y alertas de métricas y logs", url: "https://grafana.com/docs/grafana/latest/", type: "Tutorial" },
          { name: "NGINX Load Balancer - Servidor web y reverse proxy para balanceo de carga y mejora de rendimiento", url: "https://docs.nginx.com/nginx/admin-guide/load-balancer/", type: "Guía" },
          { name: "Kong API Gateway - Gateway para gestión centralizada de APIs con plugins y rate limiting", url: "https://docs.konghq.com/getting-started-guide/", type: "Tutorial" },
          { name: "Consul Service Discovery - Herramienta para descubrimiento de servicios y configuración distribuida", url: "https://learn.hashicorp.com/consul", type: "Curso" },
          { name: "Elasticsearch Guide - Motor de búsqueda y analytics distribuido para grandes volúmenes de datos", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html", type: "Tutorial" },
          { name: "AWS Lambda Serverless - Computación serverless para ejecutar código sin gestionar servidores", url: "https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html", type: "Tutorial" },
          { name: "Terraform Infrastructure as Code - Herramienta para provisioning de infraestructura declarativa y versionada", url: "https://learn.hashicorp.com/terraform", type: "Curso" },
          { name: "Database Performance Tuning - Técnicas avanzadas para optimización de consultas y esquemas de base de datos", url: "https://use-the-index-luke.com/", type: "Guía" },
          { name: "OAuth 2.0 Security Framework - Protocolo de autorización estándar para acceso seguro a recursos protegidos", url: "https://oauth.net/2/", type: "Guía" },
          { name: "Circuit Breaker Pattern - Patrón de resilencia para prevenir cascadas de fallos en sistemas distribuidos", url: "https://martinfowler.com/bliki/CircuitBreaker.html", type: "Guía" }
        ]
      }
    ]
  },
  {
    id: "competitive",
    title: "Programación Competitiva",
    description: "Mejora tus habilidades de algoritmos y estructuras de datos para competencias",
    levels: [
      {
        name: "Principiante",
        skills: [
          "Análisis de Complejidad (Big O)", "Arrays y Strings", "Ordenamiento básico", "Búsqueda binaria",
          "Matemáticas básicas", "Recursión", "Implementación", "Time/Space complexity",
          "Two Pointers", "Sliding Window", "Prefix Sums", "Basic Math",
          "Greedy básico", "Complete Search", "Ad Hoc Problems", "STL básico"
        ],
        resources: [
          { name: "Competitive Programming 3 by Steven Halim - Libro fundamental que cubre desde conceptos básicos hasta técnicas avanzadas", url: "https://cpbook.net/", type: "Curso" },
          { name: "Codeforces Contest Platform - Plataforma principal para contests regulares con problemas clasificados por dificultad", url: "https://codeforces.com/", type: "Ejercicios" },
          { name: "AtCoder Programming Contests - Contests japoneses de alta calidad con problemas bien estructurados y explicaciones", url: "https://atcoder.jp/", type: "Ejercicios" },
          { name: "USACO Guide - Guía completa gratuita con temas organizados y problemas progresivos para aprender paso a paso", url: "https://usaco.guide/", type: "Curso" },
          { name: "CodeChef Practice Problems - Miles de problemas categorizados por dificultad con soluciones y tutoriales", url: "https://www.codechef.com/practice", type: "Ejercicios" },
          { name: "HackerRank Algorithm Challenges - Problemas estructurados por temas con tests automáticos y explicaciones detalladas", url: "https://www.hackerrank.com/domains/algorithms", type: "Tutorial" },
          { name: "GeeksforGeeks Algorithms - Artículos explicativos con implementaciones en múltiples lenguajes y complejidad", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/", type: "Tutorial" },
          { name: "LeetCode Easy Problems - Problemas básicos perfectos para comenzar con categorización por temas", url: "https://leetcode.com/problemset/algorithms/?difficulty=Easy", type: "Ejercicios" },
          { name: "Kattis Problem Archive - Problemas de contests reales con juez automático y múltiples sets de datos", url: "https://open.kattis.com/", type: "Ejercicios" },
          { name: "Big O Notation Explained - Curso interactivo para entender análisis de complejidad temporal y espacial", url: "https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation", type: "Tutorial" },
          { name: "Binary Search Tutorial - Guía completa sobre búsqueda binaria con variaciones y casos edge", url: "https://www.topcoder.com/thrive/articles/Binary%20Search", type: "Guía" },
          { name: "C++ STL Reference - Documentación completa de Standard Template Library esencial para competitive programming", url: "https://cplusplus.com/reference/stl/", type: "Guía" },
          { name: "Sorting Algorithms Visualized - Visualizaciones interactivas de algoritmos de ordenamiento con análisis de complejidad", url: "https://visualgo.net/en/sorting", type: "Tutorial" },
          { name: "Two Pointers Technique - Técnica fundamental para problemas de arrays con múltiples ejemplos", url: "https://www.geeksforgeeks.org/two-pointers-technique/", type: "Guía" },
          { name: "Prefix Sum Arrays - Técnica para optimizar consultas de rangos en arrays", url: "https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/", type: "Tutorial" },
          { name: "CP-Algorithms Basic Topics - Tutoriales matemáticos y algorítmicos específicos para competitive programming", url: "https://cp-algorithms.com/", type: "Curso" }
        ]
      },
      {
        name: "Intermedio",
        skills: [
          "Programación Dinámica", "Grafos (DFS/BFS)", "Union Find", "Segment Trees", "Binary Indexed Trees",
          "Teoría de Números básica", "Combinatoria", "String Algorithms", "Shortest Paths",
          "Minimum Spanning Tree", "Topological Sort", "2-SAT", "Strongly Connected Components",
          "Game Theory básica", "Bitmask DP", "Matrix Exponentiation", "Mo's Algorithm"
        ],
        resources: [
          { name: "Dynamic Programming Tutorial - TopCoder - Guía completa desde DP básica hasta optimizaciones avanzadas con ejemplos", url: "https://www.topcoder.com/thrive/articles/Dynamic%20Programming", type: "Curso" },
          { name: "Graph Algorithms Visualization - Visualizaciones interactivas de DFS, BFS, Dijkstra, y algoritmos de grafos", url: "https://visualgo.net/en/graphds", type: "Tutorial" },
          { name: "Competitive Programming Handbook - Libro gratuito que cubre todos los temas intermedios con implementaciones", url: "https://cses.fi/book/book.pdf", type: "Curso" },
          { name: "CSES Problem Set - Colección curada de 300 problemas organizados por temas con dificultad progresiva", url: "https://cses.fi/problemset/", type: "Ejercicios" },
          { name: "Segment Tree Tutorial - Estructura de datos para consultas y updates eficientes en rangos", url: "https://cp-algorithms.com/data_structures/segment_tree.html", type: "Tutorial" },
          { name: "Union Find Explained - Estructura de datos para componentes conectados con path compression", url: "https://www.topcoder.com/thrive/articles/Disjoint-set%20data%20structures", type: "Guía" },
          { name: "String Algorithms Guide - KMP, Z-algorithm, Rolling Hash y otras técnicas para strings", url: "https://cp-algorithms.com/string/", type: "Curso" },
          { name: "Number Theory for CP - Algoritmos de teoría de números: GCD, modular arithmetic, primes", url: "https://cp-algorithms.com/algebra/", type: "Tutorial" },
          { name: "Graph Theory Course - Coursera - Curso académico completo sobre algoritmos de grafos con certificación", url: "https://www.coursera.org/learn/algorithms-on-graphs", type: "Curso" },
          { name: "DP Optimization Techniques - Convex Hull Trick, Divide and Conquer optimization y otras técnicas", url: "https://cp-algorithms.com/dynamic_programming/", type: "Guía" },
          { name: "Binary Indexed Tree Tutorial - Estructura eficiente para prefix sums y range updates", url: "https://www.topcoder.com/thrive/articles/Binary%20Indexed%20Trees", type: "Tutorial" },
          { name: "Game Theory in CP - Nim games, Sprague-Grundy theorem y estrategias ganadoras", url: "https://www.topcoder.com/thrive/articles/Algorithm%20Games", type: "Guía" },
          { name: "Strongly Connected Components - Kosaraju y Tarjan algorithms para componentes fuertemente conexos", url: "https://cp-algorithms.com/graph/strongly-connected-components.html", type: "Tutorial" },
          { name: "2-SAT Problem Solving - Reducción de problemas a satisfiabilidad booleana", url: "https://cp-algorithms.com/graph/2SAT.html", type: "Guía" },
          { name: "Mo's Algorithm Tutorial - Técnica para responder consultas offline en arrays", url: "https://blog.anudeep2011.com/mos-algorithm/", type: "Tutorial" },
          { name: "Matrix Exponentiation - Técnica para acelerar recurrencias lineales usando multiplicación de matrices", url: "https://www.geeksforgeeks.org/matrix-exponentiation/", type: "Guía" }
        ]
      },
      {
        name: "Avanzado",
        skills: [
          "Advanced DP optimizations", "Heavy-Light Decomposition", "Centroid Decomposition", "Suffix Arrays/Trees",
          "FFT/NTT", "Persistent Data Structures", "Link-Cut Tree", "Convex Hull Algorithms",
          "Advanced Graph Algorithms", "Max Flow algorithms", "Bipartite Matching", "Advanced String Matching",
          "Computational Geometry", "Advanced Number Theory", "Randomized Algorithms", "Parallel Binary Search"
        ],
        resources: [
          { name: "ICPC World Finals Preparation - Estrategias, teamwork y problemas de nivel mundial para competencias", url: "https://icpc.global/", type: "Taller" },
          { name: "Advanced Algorithms Course - MIT OpenCourseWare - Curso académico con algoritmos de vanguardia", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-854j-advanced-algorithms-fall-2008/", type: "Curso" },
          { name: "Heavy-Light Decomposition Tutorial - Técnica para queries eficientes en árboles con path decomposition", url: "https://cp-algorithms.com/graph/hld.html", type: "Tutorial" },
          { name: "Centroid Decomposition Guide - Descomposición de árboles para resolver problemas de caminos", url: "https://medium.com/carpanese/an-illustrated-introduction-to-centroid-decomposition-8c1989d53308", type: "Guía" },
          { name: "Fast Fourier Transform Tutorial - Algoritmo para multiplicación rápida de polinomios y convolución", url: "https://cp-algorithms.com/algebra/fft.html", type: "Tutorial" },
          { name: "Suffix Array Construction - Estructura para búsquedas eficientes en strings y pattern matching", url: "https://cp-algorithms.com/string/suffix-array.html", type: "Guía" },
          { name: "Max Flow Algorithms - Ford-Fulkerson, Dinic, Push-Relabel para problemas de flujo máximo", url: "https://cp-algorithms.com/graph/maxflow.html", type: "Tutorial" },
          { name: "Computational Geometry Guide - Algoritmos para problemas geométricos: convex hull, intersecciones", url: "https://cp-algorithms.com/geometry/", type: "Curso" },
          { name: "Persistent Data Structures - Versiones inmutables de estructuras para queries históricas", url: "https://blog.anudeep2011.com/persistent-segment-trees-explained-with-spoj-problems/", type: "Tutorial" },
          { name: "Link-Cut Tree Tutorial - Estructura dinámica para árboles con link/cut operations", url: "https://courses.csail.mit.edu/6.851/spring14/lectures/L19.html", type: "Guía" },
          { name: "Advanced String Algorithms - Suffix trees, Aho-Corasick, advanced pattern matching", url: "https://web.stanford.edu/class/cs97si/suffix-array.pdf", type: "Tutorial" },
          { name: "Bipartite Matching Algorithms - Hungarian algorithm, Kuhn's algorithm para matching óptimo", url: "https://cp-algorithms.com/graph/kuhn_maximum_bipartite_matching.html", type: "Guía" },
          { name: "Randomized Algorithms Course - Algoritmos probabilísticos y análisis de complejidad esperada", url: "https://www.cs.cmu.edu/~15451-f17/", type: "Curso" },
          { name: "Advanced Number Theory - Chinese Remainder Theorem, discrete log, factorización", url: "https://cp-algorithms.com/algebra/chinese-remainder-theorem.html", type: "Tutorial" },
          { name: "Parallel Binary Search - Técnica para optimizar múltiples búsquedas binarias simultáneas", url: "https://robert1003.github.io/2020/01/31/parallel-binary-search.html", type: "Guía" },
          { name: "Codeforces Educational Blog - Artículos educativos sobre técnicas avanzadas por red coders", url: "https://codeforces.com/blog/entry/57282", type: "Tutorial" },
          { name: "Contest Math for CS - Matemáticas avanzadas aplicadas a competitive programming", url: "https://artofproblemsolving.com/wiki/index.php/Contest_Math", type: "Curso" },
          { name: "IOI Training Materials - Recursos oficiales de la Olimpiada Internacional de Informática", url: "https://ioinformatics.org/page/syllabus/12", type: "Taller" },
          { name: "Advanced CP Techniques Blog - Técnicas cutting-edge y optimizaciones para contests de alto nivel", url: "https://codeforces.com/blog/entry/15643", type: "Guía" },
          { name: "AtCoder Library Documentation - Librería oficial con implementaciones optimizadas de algoritmos avanzados", url: "https://atcoder.github.io/ac-library/production/document_en/", type: "Tutorial" }
        ]
      }
    ]
  },
  {
    id: "datascience",
    title: "Ciencia de Datos",
    description: "Aprende a analizar y obtener insights valiosos de los datos",
    levels: [
      {
        name: "Principiante",
        skills: [
          "Python Fundamentals", "Estadística Descriptiva", "Pandas Data Manipulation", "NumPy Arrays",
          "Jupyter Notebooks", "Data Types & Structures", "Data Cleaning", "Basic Visualization",
          "CSV/Excel Handling", "Mathematical Foundations", "Probability Basics", "SQL Fundamentals",
          "Git Version Control", "Command Line Basics", "Data Ethics", "Exploratory Data Analysis"
        ],
        resources: [
          { name: "Python for Data Science Handbook - Guía completa gratuita de Jake VanderPlas para análisis de datos con Python", url: "https://jakevdp.github.io/PythonDataScienceHandbook/", type: "Curso" },
          { name: "Kaggle Learn Data Science - Cursos gratuitos interactivos cubriendo desde Python básico hasta machine learning", url: "https://www.kaggle.com/learn", type: "Curso" },
          { name: "Pandas Official Documentation - Documentación completa con tutoriales paso a paso para manipulación de datos", url: "https://pandas.pydata.org/docs/user_guide/index.html", type: "Tutorial" },
          { name: "NumPy Quickstart Tutorial - Guía oficial para arrays multidimensionales y operaciones matemáticas", url: "https://numpy.org/doc/stable/user/quickstart.html", type: "Tutorial" },
          { name: "Jupyter Notebook Tutorial - Introducción completa a notebooks interactivos para análisis de datos", url: "https://jupyter-notebook.readthedocs.io/en/stable/", type: "Guía" },
          { name: "Introduction to Statistical Learning - Libro gratuito con fundamentos estadísticos aplicados a data science", url: "https://www.statlearning.com/", type: "Curso" },
          { name: "SQL for Data Science - Coursera - Curso especializado en consultas SQL para análisis de datos", url: "https://www.coursera.org/learn/sql-for-data-science", type: "Curso" },
          { name: "Data Cleaning with Python - Tutorial completo para preprocesamiento y limpieza de datasets", url: "https://realpython.com/python-data-cleaning-numpy-pandas/", type: "Tutorial" },
          { name: "Matplotlib Tutorials - Visualizaciones básicas y gráficos estáticos con la librería fundamental", url: "https://matplotlib.org/stable/tutorials/index.html", type: "Tutorial" },
          { name: "Khan Academy Statistics - Fundamentos de estadística descriptiva e inferencial explicados intuitivamente", url: "https://www.khanacademy.org/math/statistics-probability", type: "Curso" },
          { name: "Google Colab Tutorial - Plataforma gratuita para ejecutar notebooks en la nube con GPUs", url: "https://colab.research.google.com/notebooks/intro.ipynb", type: "Guía" },
          { name: "Data Ethics Course - EdX - Consideraciones éticas en recolección, análisis y uso de datos", url: "https://www.edx.org/course/data-science-ethics", type: "Curso" },
          { name: "Exploratory Data Analysis Guide - Técnicas sistemáticas para entender datasets antes del modelado", url: "https://www.kaggle.com/code/pmarcelino/comprehensive-data-exploration-with-python", type: "Tutorial" },
          { name: "Git for Data Scientists - Control de versiones específico para proyectos de ciencia de datos", url: "https://www.datacamp.com/tutorial/git-for-data-science", type: "Guía" },
          { name: "Python Data Science Cheat Sheets - Referencias rápidas de Pandas, NumPy, Matplotlib y más", url: "https://www.datacamp.com/cheat-sheet/category/python", type: "Guía" }
        ]
      },
      {
        name: "Intermedio",
        skills: [
          "Advanced Visualization", "Machine Learning Algorithms", "Feature Engineering", "Model Evaluation",
          "Cross-Validation", "Scikit-learn", "Statistical Analysis", "Hypothesis Testing", "A/B Testing",
          "Time Series Analysis", "Data Preprocessing", "Dimensionality Reduction", "Clustering",
          "Classification & Regression", "Model Selection", "Performance Metrics", "Data Pipelines",
          "Web Scraping", "API Integration", "Database Connections"
        ],
        resources: [
          { name: "Scikit-learn User Guide - Documentación oficial completa de la librería principal para machine learning", url: "https://scikit-learn.org/stable/user_guide.html", type: "Curso" },
          { name: "Seaborn Data Visualization - Librería avanzada para visualizaciones estadísticas atractivas", url: "https://seaborn.pydata.org/tutorial.html", type: "Tutorial" },
          { name: "Feature Engineering for Machine Learning - Libro de O'Reilly sobre creación y selección de features", url: "https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/", type: "Curso" },
          { name: "Machine Learning Course - Andrew Ng - Curso fundamental de Stanford disponible en Coursera", url: "https://www.coursera.org/learn/machine-learning", type: "Curso" },
          { name: "Time Series Analysis with Python - Análisis y forecasting de series temporales con statsmodels", url: "https://www.statsmodels.org/stable/tsa.html", type: "Tutorial" },
          { name: "A/B Testing Guide - Diseño e interpretación de experimentos controlados para data-driven decisions", url: "https://www.optimizely.com/optimization-glossary/ab-testing/", type: "Guía" },
          { name: "Plotly Interactive Visualizations - Gráficos interactivos y dashboards para exploración de datos", url: "https://plotly.com/python/", type: "Tutorial" },
          { name: "Web Scraping with Python - Beautiful Soup y Scrapy para extracción automatizada de datos web", url: "https://realpython.com/beautiful-soup-web-scraper-python/", type: "Tutorial" },
          { name: "Statistical Analysis with SciPy - Tests estadísticos, distribuciones y análisis científico", url: "https://docs.scipy.org/doc/scipy/tutorial/stats.html", type: "Tutorial" },
          { name: "Cross-Validation Techniques - Métodos para evaluar robustez y generalización de modelos", url: "https://scikit-learn.org/stable/modules/cross_validation.html", type: "Guía" },
          { name: "Dimensionality Reduction Guide - PCA, t-SNE, UMAP para visualización y reducción de dimensiones", url: "https://umap-learn.readthedocs.io/en/latest/", type: "Tutorial" },
          { name: "Model Evaluation Metrics - ROC curves, confusion matrices, precision/recall para clasificación", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", type: "Guía" },
          { name: "Data Pipeline with Apache Airflow - Orquestación de workflows para procesamiento automatizado", url: "https://airflow.apache.org/docs/apache-airflow/stable/tutorial.html", type: "Tutorial" },
          { name: "APIs for Data Science - Integración con REST APIs y servicios web para obtención de datos", url: "https://realpython.com/api-integration-in-python/", type: "Tutorial" },
          { name: "Database Connections - SQLAlchemy y conectores para integración con bases de datos", url: "https://docs.sqlalchemy.org/en/14/tutorial/", type: "Guía" },
          { name: "Hyperparameter Tuning - Grid search, random search y optimización bayesiana de parámetros", url: "https://scikit-learn.org/stable/modules/grid_search.html", type: "Tutorial" }
        ]
      },
      {
        name: "Avanzado",
        skills: [
          "Deep Learning Frameworks", "Neural Networks", "Natural Language Processing", "Computer Vision",
          "Big Data Technologies", "MLOps & Model Deployment", "Advanced Statistics", "Causal Inference",
          "Reinforcement Learning", "Ensemble Methods", "AutoML", "Model Interpretability",
          "Distributed Computing", "Cloud Platforms", "Data Engineering", "Real-time Analytics",
          "Advanced Optimization", "Bayesian Methods", "Graph Analytics", "Recommendation Systems"
        ],
        resources: [
          { name: "Deep Learning Specialization - Andrew Ng - Serie completa de cursos en deep learning y redes neuronales", url: "https://www.coursera.org/specializations/deep-learning", type: "Curso" },
          { name: "TensorFlow Official Tutorials - Guías completas para deep learning, desde básico hasta producción", url: "https://www.tensorflow.org/tutorials", type: "Curso" },
          { name: "Natural Language Processing with Python - NLTK book para procesamiento de texto y análisis lingüístico", url: "https://www.nltk.org/book/", type: "Curso" },
          { name: "Computer Vision with OpenCV - Procesamiento de imágenes y visión artificial con Python", url: "https://opencv-python-tutroals.readthedocs.io/en/latest/", type: "Tutorial" },
          { name: "Apache Spark for Big Data - Procesamiento distribuido para datasets masivos", url: "https://spark.apache.org/docs/latest/quick-start.html", type: "Tutorial" },
          { name: "MLOps with MLflow - Gestión del ciclo de vida completo de modelos machine learning", url: "https://mlflow.org/docs/latest/tutorials-and-examples/index.html", type: "Tutorial" },
          { name: "Docker for Data Science - Containerización de aplicaciones y reproducibilidad de entornos", url: "https://docker-curriculum.com/", type: "Guía" },
          { name: "Kubernetes for ML - Orquestación y escalado de aplicaciones de machine learning", url: "https://kubernetes.io/docs/tutorials/", type: "Tutorial" },
          { name: "AWS SageMaker Tutorial - Plataforma cloud para desarrollo y despliegue de modelos ML", url: "https://docs.aws.amazon.com/sagemaker/latest/dg/gs.html", type: "Tutorial" },
          { name: "Google Cloud AI Platform - Servicios de ML en la nube con AutoML y custom training", url: "https://cloud.google.com/ai-platform/docs", type: "Guía" },
          { name: "Causal Inference Book - Métodos para inferencia causal y análisis de efectos", url: "https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/", type: "Curso" },
          { name: "Reinforcement Learning Course - David Silver - Curso fundamental de DeepMind sobre RL", url: "https://www.deepmind.com/learning-resources/introduction-to-reinforcement-learning-with-david-silver", type: "Curso" },
          { name: "SHAP Model Interpretability - Librería para explicabilidad de modelos machine learning", url: "https://shap.readthedocs.io/en/latest/", type: "Tutorial" },
          { name: "Dask Parallel Computing - Computación paralela escalable para datasets grandes", url: "https://docs.dask.org/en/latest/", type: "Tutorial" },
          { name: "PyTorch Deep Learning - Framework flexible para investigación y producción en deep learning", url: "https://pytorch.org/tutorials/", type: "Curso" },
          { name: "Hugging Face Transformers - Modelos pre-entrenados para NLP de última generación", url: "https://huggingface.co/docs/transformers/index", type: "Tutorial" },
          { name: "FastAPI for ML APIs - Framework moderno para crear APIs de machine learning", url: "https://fastapi.tiangolo.com/tutorial/", type: "Guía" },
          { name: "Graph Neural Networks - Redes neuronales para datos estructurados en grafos", url: "https://pytorch-geometric.readthedocs.io/en/latest/", type: "Tutorial" },
          { name: "Advanced Bayesian Methods - Stan y PyMC para modelado probabilístico avanzado", url: "https://docs.pymc.io/en/v3/", type: "Curso" },
          { name: "Real-time ML with Kafka - Stream processing para machine learning en tiempo real", url: "https://kafka.apache.org/documentation/", type: "Tutorial" }
        ]
      }
    ]
  },
  {
    id: "artificialintelligence",
    title: "Inteligencia Artificial",
    description: "Explora los fundamentos y aplicaciones avanzadas de la IA y el aprendizaje automático",
    levels: [
      {
        name: "Principiante",
        skills: [
          "Matemáticas para IA", "Python Programming", "Estadística & Probabilidad", "Álgebra Lineal",
          "Cálculo Básico", "Algoritmos & Estructuras de Datos", "Logic & Reasoning", "Problem Solving",
          "Scientific Computing", "Data Structures", "Programming Fundamentals", "Basic Statistics",
          "Mathematical Optimization", "Graph Theory Basics", "Set Theory", "Discrete Mathematics"
        ],
        resources: [
          { name: "Mathematics for Machine Learning - Libro gratuito de Imperial College cubriendo álgebra lineal, cálculo y probabilidad", url: "https://mml-book.github.io/", type: "Curso" },
          { name: "CS229 Machine Learning - Stanford - Curso fundamental de Andrew Ng con fundamentos matemáticos sólidos", url: "https://cs229.stanford.edu/", type: "Curso" },
          { name: "Elements of AI - Universidad de Helsinki - Introducción no técnica a conceptos fundamentales de IA", url: "https://www.elementsofai.com/", type: "Curso" },
          { name: "Linear Algebra by 3Blue1Brown - Visualizaciones intuitivas de conceptos de álgebra lineal esenciales", url: "https://www.3blue1brown.com/topics/linear-algebra", type: "Tutorial" },
          { name: "Python for Artificial Intelligence - Fundamentos de programación Python específicos para IA", url: "https://realpython.com/python-ai-neural-network/", type: "Tutorial" },
          { name: "Khan Academy Statistics - Fundamentos estadísticos necesarios para entender algoritmos de ML", url: "https://www.khanacademy.org/math/statistics-probability", type: "Curso" },
          { name: "MIT Introduction to Algorithms - Curso fundamental sobre algoritmos y estructuras de datos", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/", type: "Curso" },
          { name: "Calculus Essentials for ML - Khan Academy - Derivadas e integrales aplicadas al machine learning", url: "https://www.khanacademy.org/math/calculus-1", type: "Tutorial" },
          { name: "NumPy for AI Computing - Computación científica y operaciones matriciales fundamentales", url: "https://numpy.org/learn/", type: "Tutorial" },
          { name: "Introduction to Logic - Stanford Encyclopedia - Fundamentos de lógica proposicional y predicativa", url: "https://plato.stanford.edu/entries/logic-propositional/", type: "Guía" },
          { name: "AI Ethics Introduction - MIT - Consideraciones éticas desde el inicio del aprendizaje en IA", url: "https://www.media.mit.edu/courses/the-ethics-of-ai/", type: "Curso" },
          { name: "Graph Theory Primer - Introducción a teoría de grafos para algoritmos de IA", url: "https://www.tutorialspoint.com/graph_theory/index.htm", type: "Tutorial" },
          { name: "Discrete Mathematics for CS - Fundamentos matemáticos discretos aplicados a ciencias de la computación", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/", type: "Curso" },
          { name: "Scientific Python Ecosystem - SciPy, Matplotlib y herramientas científicas fundamentales", url: "https://scipy-lectures.org/", type: "Tutorial" },
          { name: "Problem Solving Techniques - Estrategias algorítmicas y heurísticas para resolución de problemas", url: "https://www.coursera.org/learn/algorithmic-thinking-1", type: "Curso" }
        ]
      },
      {
        name: "Intermedio",
        skills: [
          "Machine Learning Algorithms", "Neural Networks", "Deep Learning Basics", "Computer Vision",
          "Natural Language Processing", "Supervised Learning", "Unsupervised Learning", "Feature Engineering",
          "Model Evaluation", "Cross-Validation", "Gradient Descent", "Backpropagation", "CNNs & RNNs",
          "Transfer Learning", "Data Preprocessing", "Hyperparameter Tuning", "Ensemble Methods",
          "Reinforcement Learning Basics", "AI Frameworks", "Model Deployment"
        ],
        resources: [
          { name: "Deep Learning Specialization - Andrew Ng - Serie completa de 5 cursos sobre deep learning y redes neuronales", url: "https://www.coursera.org/specializations/deep-learning", type: "Curso" },
          { name: "CS231n Convolutional Neural Networks - Stanford - Curso avanzado sobre CNNs para computer vision", url: "http://cs231n.stanford.edu/", type: "Curso" },
          { name: "CS224n Natural Language Processing - Stanford - NLP con deep learning y modelos de lenguaje", url: "http://web.stanford.edu/class/cs224n/", type: "Curso" },
          { name: "TensorFlow Official Tutorials - Guías prácticas desde básico hasta implementaciones avanzadas", url: "https://www.tensorflow.org/tutorials", type: "Tutorial" },
          { name: "PyTorch Tutorials - Framework flexible para investigación e implementación de modelos", url: "https://pytorch.org/tutorials/", type: "Tutorial" },
          { name: "Hands-On Machine Learning - Libro práctico de Aurélien Géron con implementaciones completas", url: "https://github.com/ageron/handson-ml3", type: "Curso" },
          { name: "Computer Vision Course - Georgia Tech - Técnicas fundamentales de visión artificial", url: "https://omscs.gatech.edu/cs-6476-computer-vision", type: "Curso" },
          { name: "NLP with Python and spaCy - Procesamiento de lenguaje natural práctico con herramientas modernas", url: "https://spacy.io/usage/spacy-101", type: "Tutorial" },
          { name: "Scikit-learn Machine Learning - Librería fundamental para algoritmos de ML tradicionales", url: "https://scikit-learn.org/stable/tutorial/index.html", type: "Tutorial" },
          { name: "OpenCV Computer Vision - Procesamiento de imágenes y visión artificial con Python", url: "https://opencv-python-tutroals.readthedocs.io/en/latest/", type: "Tutorial" },
          { name: "Reinforcement Learning Introduction - Sutton & Barto - Libro clásico sobre aprendizaje por refuerzo", url: "http://incompleteideas.net/book/the-book-2nd.html", type: "Curso" },
          { name: "Model Deployment with MLflow - Gestión del ciclo de vida y despliegue de modelos ML", url: "https://mlflow.org/docs/latest/tutorials-and-examples/index.html", type: "Tutorial" },
          { name: "Hyperparameter Optimization - Optuna y técnicas avanzadas para tuning de modelos", url: "https://optuna.readthedocs.io/en/stable/tutorial/index.html", type: "Guía" },
          { name: "Transfer Learning Guide - Aprovechamiento de modelos pre-entrenados para nuevas tareas", url: "https://www.tensorflow.org/tutorials/images/transfer_learning", type: "Tutorial" },
          { name: "AI Model Interpretability - SHAP, LIME y técnicas para explicabilidad de modelos", url: "https://christophm.github.io/interpretable-ml-book/", type: "Curso" },
          { name: "Ensemble Methods Tutorial - Random Forest, Gradient Boosting y combinación de modelos", url: "https://scikit-learn.org/stable/modules/ensemble.html", type: "Guía" }
        ]
      },
      {
        name: "Avanzado",
        skills: [
          "Advanced Deep Learning", "Transformers & Attention", "Generative AI", "Large Language Models",
          "Computer Vision Advanced", "Multimodal AI", "Reinforcement Learning Advanced", "AI Research",
          "Neural Architecture Search", "Few-Shot Learning", "Meta-Learning", "Federated Learning",
          "Edge AI & Optimization", "AI Safety & Alignment", "Explainable AI", "AI Governance",
          "Quantum Machine Learning", "Neuromorphic Computing", "AI for Science", "Autonomous Systems"
        ],
        resources: [
          { name: "Transformers Course - Hugging Face - Curso completo sobre modelos Transformer y LLMs", url: "https://huggingface.co/course/chapter1/1", type: "Curso" },
          { name: "OpenAI GPT Research Papers - Artículos fundamentales sobre modelos generativos de lenguaje", url: "https://openai.com/research/", type: "Curso" },
          { name: "DeepMind Research Publications - Investigación de vanguardia en IA y aprendizaje automático", url: "https://deepmind.com/research/publications", type: "Curso" },
          { name: "Advanced Computer Vision - CS231A Stanford - Geometría 3D, SLAM y visión avanzada", url: "http://web.stanford.edu/class/cs231a/", type: "Curso" },
          { name: "Reinforcement Learning Course - David Silver - Curso fundamental de DeepMind sobre RL avanzado", url: "https://www.deepmind.com/learning-resources/introduction-to-reinforcement-learning-with-david-silver", type: "Curso" },
          { name: "Neural Architecture Search - AutoML para diseño automático de arquitecturas de redes", url: "https://automl.org/book/", type: "Curso" },
          { name: "Generative Adversarial Networks - Curso completo sobre GANs y modelos generativos", url: "https://www.coursera.org/learn/build-basic-generative-adversarial-networks-gans", type: "Curso" },
          { name: "Large Language Models Course - Entrenamiento y fine-tuning de modelos masivos", url: "https://github.com/mlabonne/llm-course", type: "Curso" },
          { name: "AI Safety Fundamentals - Alignment, robustez y seguridad en sistemas de IA", url: "https://www.aisafetyfundamentals.com/", type: "Curso" },
          { name: "Federated Learning Research - Aprendizaje distribuido preservando privacidad", url: "https://federated.withgoogle.com/", type: "Tutorial" },
          { name: "Edge AI Development - TensorFlow Lite y optimización para dispositivos móviles", url: "https://www.tensorflow.org/lite", type: "Tutorial" },
          { name: "Quantum Machine Learning - IBM Qiskit para algoritmos cuánticos de ML", url: "https://qiskit.org/textbook/ch-machine-learning/", type: "Curso" },
          { name: "MLOps Advanced Practices - Kubernetes, monitoring y CI/CD para sistemas de IA", url: "https://ml-ops.org/content/mlops-principles", type: "Guía" },
          { name: "Multimodal AI Research - Modelos que combinan texto, imagen, audio y video", url: "https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models", type: "Tutorial" },
          { name: "AI Ethics & Governance - Políticas, regulación y consideraciones sociales de IA", url: "https://www.partnershiponai.org/", type: "Curso" },
          { name: "Neuromorphic Computing - Hardware especializado inspirado en el cerebro", url: "https://www.intel.com/content/www/us/en/research/neuromorphic-computing.html", type: "Tutorial" },
          { name: "AI for Scientific Discovery - Aplicaciones de IA en investigación científica", url: "https://www.deepmind.com/blog/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology", type: "Guía" },
          { name: "Autonomous Systems Engineering - Robótica, vehículos autónomos y sistemas inteligentes", url: "https://www.edx.org/course/autonomous-systems", type: "Curso" },
          { name: "Advanced NLP Research - BERT, GPT, T5 y arquitecturas de última generación", url: "https://huggingface.co/docs/transformers/model_doc/auto", type: "Tutorial" },
          { name: "Meta-Learning & Few-Shot Learning - Aprendizaje de algoritmos de aprendizaje", url: "https://lilianweng.github.io/posts/2018-11-30-meta-learning/", type: "Guía" }
        ]
      }
    ]
  }
];

const RoadmapCardIcon = ({ id }: { id: string }) => {
  switch (id) {
    case "frontend":
      return <Code className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "backend":
      return <Terminal className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "competitive":
      return <Award className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "datascience":
      return <Lightbulb className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "artificialintelligence":
      return <Brain className="h-10 w-10 mb-4 text-primary mx-auto" />;
    default:
      return null;
  }
};

const ResourceTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Curso":
      return <Video className="h-4 w-4 text-primary" />;
    case "Tutorial":
      return <BookOpen className="h-4 w-4 text-primary" />;
    case "Guía":
      return <FileText className="h-4 w-4 text-primary" />;
    case "Taller":
      return <Users className="h-4 w-4 text-primary" />;
    case "Ejercicios":
      return <Code className="h-4 w-4 text-primary" />;
    default:
      return <FileText className="h-4 w-4 text-primary" />;
  }
};

interface RoadmapDetailProps {
  roadmap: Roadmap;
}

const RoadmapDetail = ({ roadmap }: RoadmapDetailProps) => {
  return (
    <div className="glass-card p-8 mb-16 animate-fade-in">
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
        <p className="text-muted-foreground">{roadmap.description}</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-[22px] top-0 bottom-0 w-[2px] bg-primary/20"></div>
        
        <div className="space-y-12">
          {roadmap.levels.map((level, index) => (
            <div key={index} className="relative">
              <div className="absolute left-0 w-[12px] h-[12px] rounded-full bg-primary mt-2 transform -translate-x-[5px]"></div>
              
              <div className="ml-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h4 className="text-xl font-semibold">{level.name}</h4>
                  <div className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    Nivel {index + 1}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Habilidades clave:</p>
                  <div className="flex flex-wrap gap-2">
                    {level.skills.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Recursos recomendados:</p>
                  <div className="space-y-2">
                    {level.resources.map((resource, i) => (
                      <a 
                        key={i}
                        href={resource.url}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <ResourceTypeIcon type={resource.type} />
                          <span>{resource.name}</span>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
                
                {index < roadmap.levels.length - 1 && (
                  <div className="mt-6 flex justify-end">
                    <div className="flex items-center text-primary animate-pulse">
                      <span className="text-sm">Continúa al siguiente nivel</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-border flex justify-center">
        <Link 
          to="/contacto"
          className="flex items-center text-primary hover:underline"
        >
          <span>¿Tienes sugerencias para esta ruta de aprendizaje?</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

interface LearningRoadmapsProps {
  selectedRoadmap?: string | null;
  setSelectedRoadmap?: (id: string | null) => void;
}

const LearningRoadmaps = ({ selectedRoadmap: propSelectedRoadmap, setSelectedRoadmap }: LearningRoadmapsProps) => {
  // Internal state for when component is used standalone without props
  const [internalSelectedRoadmap, setInternalSelectedRoadmap] = useState<string | null>(
    propSelectedRoadmap || "frontend"
  );
  
  // Use either the props or internal state
  const selectedRoadmap = propSelectedRoadmap !== undefined ? propSelectedRoadmap : internalSelectedRoadmap;
  
  // COMMENTED OUT: Roadmap selection functionality
  // const handleRoadmapSelection = (id: string | null) => {
  //   if (setSelectedRoadmap) {
  //     setSelectedRoadmap(id);
  //   } else {
  //     setInternalSelectedRoadmap(id);
  //   }
  // };
  
  return (
    <section className="py-16 bg-muted/30 dark:bg-black/20">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-full bg-primary/10">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Rutas de <span className="gradient-text">Aprendizaje</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sigue estas guías estructuradas para desarrollar tus habilidades de programación,
            desde principiante hasta experto en diferentes áreas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {learningRoadmaps.map(roadmap => (
            <div
              key={roadmap.id}
              // COMMENTED OUT: Click functionality
              // onClick={() => handleRoadmapSelection(roadmap.id === selectedRoadmap ? null : roadmap.id)}
              className={`glass-card p-4 text-center transition-all h-full hover:shadow-neon-blue flex flex-col justify-center items-center`}
              // COMMENTED OUT: Selected state styling
              // className={`glass-card p-4 text-center transition-all h-full ${
              //   roadmap.id === selectedRoadmap 
              //     ? "ring-2 ring-primary shadow-neon-blue" 
              //     : "hover:shadow-neon-blue"
              // }`}
            >
              <RoadmapCardIcon id={roadmap.id} />
              
              <h3 className="text-lg font-semibold mb-2">{roadmap.title}</h3>
              <p className="text-muted-foreground text-xs mb-4">{roadmap.description}</p>
              
              {/* COMMENTED OUT: "Ver ruta" text and its container space */}
              {/* <div className="flex items-center justify-center text-primary text-sm font-medium">
                <span>Ver ruta</span>
                <ChevronRight className={`h-4 w-4 ml-1 transition-transform`} />
              </div> */}
              {/* COMMENTED OUT: Selected state arrow rotation */}
              {/* <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${
                roadmap.id === selectedRoadmap ? "rotate-90" : ""
              }`} /> */}
            </div>
          ))}
        </div>
        
        {/* COMMENTED OUT: Roadmap flow display logic */}
        {/* {selectedRoadmap && (
          <RoadmapFlow roadmap={learningRoadmaps.find(r => r.id === selectedRoadmap)!} />
        )} */}
      </div>
    </section>
  );
};

export { learningRoadmaps };
export default LearningRoadmaps;
