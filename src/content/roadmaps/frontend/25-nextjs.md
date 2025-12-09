---
id: "25"
title: "Next.js"
description: "Next.js es un framework React para construir aplicaciones web full-stack."
---

# Next.js

Next.js es el framework React más popular, proporcionando renderizado del lado del servidor, generación estática y capacidades full-stack.

## Características Clave

### Routing Basado en Archivos (App Router)
```
app/
├── page.tsx          # ruta /
├── about/
│   └── page.tsx      # ruta /about
├── blog/
│   └── [slug]/
│       └── page.tsx  # ruta dinámica /blog/:slug
└── layout.tsx        # Layout raíz
```

### Server Components
```tsx
// Esto se ejecuta en el servidor por defecto
async function BlogPosts() {
  const posts = await db.posts.findMany();
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.titulo}</li>
      ))}
    </ul>
  );
}
```

### Server Actions
```tsx
async function crearPost(formData: FormData) {
  'use server';
  await db.posts.create({
    data: { titulo: formData.get('titulo') }
  });
}
```

### Estrategias de Renderizado

| Estrategia | Cuándo | Caso de Uso |
|------------|--------|-------------|
| SSG | Build time | Páginas de marketing |
| SSR | Request time | Contenido dinámico |
| ISR | Periódico | Actualización frecuente |
| Client | Navegador | UI interactiva |

## Comenzando

```bash
npx create-next-app@latest mi-app
```

## Cuándo Usar

- Aplicaciones críticas para SEO
- Apps React full-stack
- Cuando necesitas SSR/SSG
- Proyectos React listos para producción
