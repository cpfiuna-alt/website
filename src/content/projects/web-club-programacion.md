
---
id: 1
title: "Web del Club de Programación FIUNA"
description: "Sitio web oficial del Club de Programación de la Facultad de Ingeniería de la Universidad Nacional de Asunción."
image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
tags: ["React", "TypeScript", "Tailwind CSS", "ShadcnUI"]
githubLink: "https://github.com/cpfiuna/website"
demoLink: "#"
category: "web"
featured: true
slug: "web-club-programacion"
---

# Web del Club de Programación FIUNA

## Descripción del Proyecto

El sitio web oficial del Club de Programación de la Facultad de Ingeniería de la Universidad Nacional de Asunción (FIUNA) es una plataforma digital moderna que sirve como punto central de información, recursos y comunicación para miembros del club y la comunidad de estudiantes interesados en la programación y tecnología.

## Objetivos

- Proporcionar información actualizada sobre eventos, talleres y actividades del club
- Ofrecer recursos educativos para estudiantes interesados en programación
- Mostrar los proyectos desarrollados por miembros del club
- Facilitar la comunicación entre miembros y potenciales interesados
- Promover la participación en competencias de programación

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca JavaScript para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript que añade tipos estáticos
- **Tailwind CSS**: Framework de utilidades CSS para diseño rápido y responsivo
- **ShadcnUI**: Componentes de UI reutilizables y accesibles
- **React Router**: Navegación entre páginas de la aplicación
- **React Query**: Gestión de estado y datos del servidor
- **React Markdown**: Renderizado de contenido en formato markdown

### Herramientas de Desarrollo
- **Vite**: Herramienta de compilación rápida para desarrollo moderno
- **ESLint**: Linter para identificar problemas en el código
- **Prettier**: Formateador de código para mantener consistencia
- **Git**: Control de versiones
- **GitHub Actions**: CI/CD para automatizar pruebas y despliegue

## Características Principales

### Diseño Moderno y Responsivo
- Interfaz adaptable a diferentes dispositivos (móviles, tablets, escritorio)
- Modo oscuro/claro basado en preferencias del usuario
- Animaciones y transiciones suaves
- Estética moderna con elementos de "glassmorphism"

### Secciones del Sitio
1. **Inicio**: Visión general del club, noticias destacadas y próximos eventos
2. **Acerca de**: Historia del club, objetivos, organización y miembros
3. **Eventos**: Calendario y detalles de hackathons, workshops, competencias y meetups
4. **Proyectos**: Portafolio de proyectos desarrollados por miembros
5. **Recursos**: Material educativo, guías, tutoriales y roadmaps de aprendizaje
6. **Blog**: Artículos técnicos y noticias sobre tecnología y programación
7. **Contacto**: Formulario de contacto e información para unirse al club

### Contenido Dinámico
- Sistema de gestión de contenido para eventos, proyectos y blog
- Soporte para contenido en formato Markdown
- Imágenes optimizadas para carga rápida

## Arquitectura

El sitio web sigue una arquitectura de componentes reutilizables, con una clara separación de responsabilidades:

```
src/
  ├── components/         # Componentes reutilizables
  ├── context/            # Contextos de React (temas, autenticación)
  ├── hooks/              # Hooks personalizados
  ├── layouts/            # Layouts para las diferentes páginas
  ├── pages/              # Componentes de página
  ├── styles/             # Estilos globales
  ├── utils/              # Funciones de utilidad
  ├── content/            # Contenido en formato markdown
  └── App.tsx             # Componente principal
```

## Implementación y Despliegue

El sitio web se implementa mediante un flujo de trabajo de CI/CD con GitHub Actions:

1. Los cambios se envían a través de pull requests
2. Las pruebas automatizadas verifican la calidad del código
3. Una vez aprobados, los cambios se fusionan con la rama principal
4. El sitio se compila y se despliega automáticamente

El sitio está alojado en Vercel, aprovechando su rápida CDN global para ofrecer el contenido de manera eficiente a los usuarios de todo el mundo.

## Desafíos y Soluciones

### Rendimiento
El sitio utiliza varias técnicas para optimizar el rendimiento:
- Carga diferida (lazy loading) de componentes y rutas
- Optimización de imágenes con diversos formatos (WebP, AVIF)
- Minificación de recursos
- Implementación de memorización para componentes costosos

### Accesibilidad
Nos aseguramos de que el sitio sea accesible para todos los usuarios:
- Contraste de colores adecuado
- Etiquetas ARIA para lectores de pantalla
- Navegación por teclado
- Textos alternativos para imágenes

### SEO
Para mejorar la visibilidad en motores de búsqueda:
- Metadatos optimizados para cada página
- Estructura de URLs limpia y semántica
- Sitemap XML
- Schema.org markup para contenido rico

## Conclusiones y Trabajo Futuro

Este proyecto demuestra la capacidad del Club de Programación FIUNA para crear aplicaciones web modernas utilizando las mejores prácticas de desarrollo. Además de servir como plataforma informativa, el sitio es un ejemplo de las habilidades que los miembros del club pueden adquirir.

Para el futuro, planeamos:
- Implementar un sistema de autenticación para miembros
- Añadir una sección de foro para discusiones
- Integrar analíticas para entender mejor a nuestra audiencia
- Desarrollar una API para que otros servicios puedan interactuar con nuestro contenido

## Equipo de Desarrollo

El sitio web fue desarrollado por un equipo de estudiantes del Club de Programación FIUNA, demostrando la colaboración y habilidades técnicas que promueve nuestra organización.

## ¿Quieres Contribuir?

El código del sitio es de código abierto y estamos abiertos a contribuciones. Si quieres participar:
1. Revisa los issues abiertos en GitHub
2. Haz fork del repositorio
3. Crea una rama para tu contribución
4. Envía un pull request con tus cambios

¡Agradecemos cualquier ayuda para mejorar nuestro sitio web!
