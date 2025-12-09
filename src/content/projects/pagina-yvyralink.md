---
id: 2
title: "Hub de enlaces del Club de Programación FIUNA"
description: "Un hub de enlaces para agrupar enlaces, redes y llamadas a la acción en una sola página."
image: "images/projects/yvyralink/cover.png"
tags: ["Web", "React", "TypeScript", "Tailwind CSS", "Vite", "Linktree"]
githubLink: "https://github.com/cpfiuna/yvyralink"
demoLink: "https://yvyralink.cpfiuna.io"
category: "web"
featured: false
demoButtonType: "project"
hideDemoIfMissing: true
status: "Activo"
lastUpdated: "07-12-2025"
team: ["David Giménez", "Daniel Villalba"]
githubStats: {}
startDate: "23-11-2024"
slug: "yvyralink"
gallery:
  - "/images/projects/yvyralink/01.png"
  - "/images/projects/yvyralink/02.png"
---

## El punto de partida

Teníamos una página de enlaces que la comunidad usaba para compartir recursos y enlaces importantes. Con el tiempo surgió un problema concreto: un botón destacado en ese hub generaba confusión —mostraba un mensaje de "unirse" que, para nuestra comunidad, parecía llevar al formulario de inscripción pero en realidad abría un modal distinto. Eso provocaba clicks equivocados y consultas repetidas.

Decidimos construir nuestra propia micro-landing para resolver ese tipo de fricciones: una página simple, predecible y controlada por nosotros, sin botones ambiguos ni anuncios sorpresa.

## Qué construimos

Yvyralink es una micro-landing ligera que hace una cosa muy bien: lleva a la gente a los enlaces correctos. Algunas decisiones clave:

- Interfaz minimalista enfocada en la acción primaria (abrir enlaces). Nada que distraiga.
- Controles de orden y visibilidad para que quien administra el perfil decida qué aparece y en qué lugar.
- Enlaces enriquecidos (iconos, etiquetas, botones de acción) pero sin elementos que parezcan anuncios o llamadas a cuentas.
- QR dinámico por perfil para compartir en físico sin pasos extra.

## Lo más interesante (decisiones de diseño)

- Evitar el "ruido": eliminamos cualquier control o CTA que pudiera interpretarse como un anuncio o una acción secundaria. Esto redujo clicks erróneos.
- Editable via archivos en `src/content/` para que cualquier miembro pueda proponer cambios mediante PRs, manteniendo historial y controles de calidad.
- Temas y plantillas simples: cambiar colores y tipografías no rompe la navegación ni el flujo de conversión.

## Stack y ejecución

Usamos un stack muy ligero y reproducible:

- **React + TypeScript** para UI
- **Vite** para dev/build rápido
- **Tailwind CSS** para estilos
- **Radix / shadcn patterns** para accesibilidad
- **sonner, lucide-react, embla** para toasts, iconos y carruseles cuando hacen falta

La app es principalmente frontend —si se necesita un panel o analytics, lo pensamos como una integración opcional.

## Impacto

Desde que la usamos, el flujo de clicks correctos aumentó y las consultas por confusión disminuyeron. Para nosotros fue una victoria sencilla: menos fricción, más control.

## Estado actual

La micro-landing está activa, el core funciona (perfil, enlaces, temas) y seguimos mejorando la experiencia de edición y los accesos para no técnicos.