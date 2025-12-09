---
id: 1
title: "Página web del Club de Programación FIUNA"
description: "Una página web que representa la presencia digital del Club de Programación FIUNA."
image: "images/projects/website/cpf-website-cover.png"
tags: ["Web", "React", "TypeScript", "Tailwind CSS", "Vite"]
githubLink: "https://github.com/cpfiuna/website"
demoLink: "https://cpfiuna.io"
category: "web"
featured: false
demoButtonType: "project"
hideDemoIfMissing: false
status: "Activo"
lastUpdated: "07-12-2025"
team: ["David Giménez", "Mathías Barrios", "Oscar Alderete"]
githubStats: {}
startDate: "02-01-2024"
slug: "pagina-web"
gallery:
  - "/images/projects/website/cpf-website-01.png"
  - "/images/projects/website/cpf-website-02.png"
  - "/images/projects/website/cpf-website-03.png"
  - "/images/projects/website/cpf-website-04.png"
  - "/images/projects/website/cpf-website-05.png"
---

## El problema que resolvimos

En los primeros días del club teníamos presencia online, sí —pero muy dispersa: publicaciones en redes, documentos sueltos y poca coherencia. No había un lugar único donde alguien pudiera enterarse de un evento, apuntarse a un curso o ver qué proyectos estaban activos. Eso generaba fricción para la comunidad y trabajo extra para los organizadores.

Decidimos construir nuestra "casa digital": una plataforma fácil de mantener por estudiantes y, sobre todo, que cualquiera pueda actualizar sin tocar el código.

## ¿Qué hace?

La web es el punto de encuentro oficial del Club de Programación FIUNA. Sus funciones no son exóticas, pero sí útiles:

- Publicar y centralizar **eventos** (hackathons, charlas, meetups)
- Publicar **cursos** y su material asociado
- Mostrar el **portfolio** de proyectos del club
- Publicar **artículos técnicos** escritos por miembros
- Servir como repositorio de **recursos** y guías educativas

Todo esto con un diseño moderno, accesible y responsive para que funcione tanto en celulares como en desktops.

## Lo más interesante del proyecto

- **Contenido manejable por cualquiera**: Añadir un evento o un post es tan simple como crear un archivo Markdown y abrir un PR.
- **Preview automático**: Cada PR genera un preview donde podés ver cómo queda la página antes de mergear.
- **Performance primero**: Optimizamos imágenes, lazy loading y splitting para que la web cargue rápido aun con contenido multimedia.

## Stack técnico

Usamos herramientas modernas que permiten iterar rápido sin sacrificar calidad:

- **React + TypeScript**: Componentes reutilizables y tipado que reduce errores
- **Tailwind CSS**: Desarrollo de estilos con velocidad y consistencia
- **Vite**: Dev server extremadamente rápido y builds eficientes
- **Framer Motion**: Animaciones discretas que mejoran la UX
- **Vercel**: Deployment automático, previews por PR y CDN global

Además de lo anterior, la aplicación incorpora una serie de librerías y utilidades que son clave para el flujo de contenido, la accesibilidad, el rendimiento y la experiencia de desarrollo:

- **React Router**: Enrutamiento del lado cliente y rutas dinámicas
- **TanStack Query**: Fetching, cache y sincronización de datos del servidor
- **gray-matter + react-markdown + rehype/remark**: Lectura y renderizado de Markdown (frontmatter → páginas)
- **date-fns**: Utilidades y formateo de fechas
- **React Hook Form + Zod**: Manejo y validación de formularios
- **@radix-ui / shadcn/ui**: Primitive components accesibles y patrones UI reutilizables
- **lucide-react**: Iconografía ligera y consistente
- **sonner**: Sistema de notificaciones/toasts moderno y accesible
- **embla-carousel-react**: Carruseles y sliders en galerías
- **react-day-picker**: Selección de fechas en UI (calendarios)
- **gray-matter**: Parseo de frontmatter en Markdown
- **react-markdown + rehype-raw + remark-gfm**: Renderizado seguro y enriquecido de Markdown
- **tailwind-merge + @tailwindcss/typography**: Plugins y helpers para estilos más robustos
- **lazy loading & code-splitting**: Técnicas para optimizar carga y rendimiento
- **Import.meta.glob**: Sistema de SSG ligero para cargar contenido desde `src/content/` en build time

Infra y utilidades de build/deploy:

- **Vercel**: Hosting, previews por PR, y CDN global
- **Scripts de mantenimiento**: Generación de `sitemap.xml` y `rss.xml` en `scripts/`

Esta combinación nos permite mantener la web rápida, accesible, fácil de editar por la comunidad y con un flujo de trabajo conocido (fork → PR → preview → merge).

## Cómo manejamos el contenido

Decidimos evitar CMS externos para mantener todo en Git: el contenido vive en `src/content/` como archivos `.md` con frontmatter. Esto tiene ventajas claras:

- Historial completo en Git (quién cambió qué y cuándo)
- Workflow conocido para estudiantes (fork → PR → review)
- Sin infraestructura adicional que mantener

Si se quiere agregar un proyecto o evento, se crea un `.md` con su frontmatter y se sube al repo; la web lo incorporará automáticamente vía static site generation.

## El desarrollo

El proyecto arrancó en enero de 2024 como una iniciativa para centralizar nuestras actividades. Desde el MVP hemos ido iterando con contribuciones de diferentes miembros: diseño, accesibilidad, mejoras de rendimiento y features como búsqueda interna y PWA.

Un reto constante fue mantener el balance entre flexibilidad (que cualquiera pueda editar contenido) y control (evitar que se rompa el layout o el SEO). Las revisiones por PR ayudaron mucho.

## Impacto y aprendizajes

La web no es sólo una carta de presentación: es una herramienta de trabajo para la comunidad. Nos permitió:

- Incluir más personas en la creación de contenido
- Reducir el tiempo de difusión de eventos
- Mostrar el trabajo de los miembros de forma profesional

Aprendimos prácticas reales de desarrollo web: CI/CD, revisión de PRs, optimización de rendimiento, y cómo diseñar para usuarios no técnicos.

## Estado actual

La web está activa y en mantenimiento continuo. Seguimos agregando contenido, mejorando la experiencia y escuchando feedback de la comunidad.
