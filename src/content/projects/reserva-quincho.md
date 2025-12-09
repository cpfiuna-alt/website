---
id: 2
title: "Sistema de reservas del Quincho para la Facultad de Ingeniería"
description: "Plataforma web para la gestión y reserva del Quincho de la FIUNA."
image: "https://assets.cpfiuna.io/website/public/images/projects/quincho-fiuna/quincho-calendar-view.png"
tags: ["Web", "React", "Supabase", "TypeScript", "Tailwind CSS", "Reservas", "Calendario"]
githubLink: "https://github.com/cpfiuna/quincho"
demoLink: "https://quincho.cpfiuna.io"
category: "web"
featured: false
demoButtonType: "project"
hideDemoIfMissing: false
status: "Activo"
lastUpdated: "07-12-2025"
team: ["David Giménez", "Mathías Barrios", "Oscar Alderete", "José Hellión", "Esteban Ibarra", "Leonardo Martínez"]
githubStats: {}
startDate: "08-03-2025"
slug: "reserva-quincho"
gallery:
  - "https://assets.cpfiuna.io/website/public/images/projects/quincho-fiuna/quincho-calendar-view.png"
  - "https://assets.cpfiuna.io/website/public/images/projects/quincho-fiuna/quincho-reservation-form.png"
---

## El problema que resolvimos

Antes de este sistema, reservar el quincho de la FIUNA era... un proceso bastante caótico. Todo funcionaba por correo electrónico: los estudiantes mandaban mails a la Directora de Administración con la fecha, hora, motivo del evento y cantidad de personas. Ella recibía decenas de solicitudes, tenía que organizarlas manualmente (probablemente en Excel o papel), chequear conflictos de horarios, responder uno por uno, y después acordarse de todo para el día del evento.

Era un cuello de botella administrativo importante. No había forma de ver qué días estaban disponibles sin escribirle directamente, los conflictos de horarios eran comunes, y el proceso completo tomaba días de ida y vuelta por email.

Cuando nos pidieron desarrollar una solución para streamline todo esto, vimos la oportunidad perfecta: automatizar el caos.

## ¿Qué hace?

Este es un sistema web completo donde cualquier estudiante, docente o personal de la facultad puede ver en tiempo real qué días está disponible el quincho y hacer una reserva en minutos. Todo desde su celular o compu, sin tener que perseguir a nadie por los pasillos.

El sistema tiene dos lados: uno para los que quieren reservar (que es súper simple) y otro para los administradores que gestionan las solicitudes. Cuando alguien hace una reserva, el sistema automáticamente chequea que no haya conflictos, y los admins reciben una notificación para aprobarla o rechazarla con un par de clicks.

## Lo más interesante del proyecto

- **Calendario interactivo**: Podés ver todas las reservas en un calendario visual, cambiar entre vista mensual, semanal o de agenda. Es como Google Calendar pero específico para el quincho.

- **Validación inteligente**: El sistema no te deja reservar una fecha que ya está ocupada o bloqueada. Se acabaron los conflictos de "yo reservé primero".

- **Panel de admin potente**: Los administradores tienen un dashboard donde ven todas las solicitudes pendientes, pueden aprobar o rechazar con notas, bloquear fechas para mantenimiento, y ver estadísticas de uso.

- **Todo en tiempo real**: Si alguien hace una reserva, todos los demás usuarios ven la actualización al instante. Gracias Supabase.

## Stack técnico

Usamos tecnologías modernas que nos permiten desarrollar rápido sin sacrificar calidad:

- **React + TypeScript**: Para la interfaz, con tipado estático para evitar bugs tontos
- **Vite**: Para el bundling y desarrollo con hot-reload súper rápido
- **React Router**: Para la navegación entre páginas y rutas protegidas
- **Tailwind CSS + shadcn/ui**: Para el diseño, porque la vida es muy corta para escribir CSS desde cero
- **Supabase**: Nuestro backend completo - base de datos PostgreSQL, autenticación, y APIs en tiempo real, todo en uno
- **TanStack Query**: Para manejar el estado del servidor y el caché de datos de forma elegante
- **React Hook Form + Zod**: Para validación de formularios con schemas de TypeScript
- **Framer Motion**: Para animaciones fluidas y transiciones
- **date-fns**: Para manipulación de fechas y horarios
- **Recharts**: Para visualización de datos y estadísticas en el dashboard
- **Vercel**: Para el hosting y deployment automático cada vez que pusheamos código

## El desarrollo

Empezamos el proyecto en mayo del 2025, y en pocas semanas ya teníamos un MVP funcional. El equipo trabajó en diferentes partes simultáneamente: algunos en el calendario y la UI, otros en la lógica de reservas y validaciones, y otros en el panel de administración.

Una de las partes más interesantes fue diseñar la lógica de validación de conflictos. Teníamos que asegurarnos de que:
- No se superpongan reservas
- Se respeten las fechas bloqueadas
- Los horarios sean válidos
- Todo funcione incluso con múltiples usuarios haciendo reservas simultáneamente

Supabase fue una elección acertada porque nos dio row-level security para que los usuarios solo vean y modifiquen lo que deberían, y las subscripciones en tiempo real funcionan sin que tengamos que configurar WebSockets manualmente.

## Impacto real

Desde que lanzamos el sistema, el proceso de reserva del quincho se volvió transparente y eficiente. Los estudiantes pueden ver la disponibilidad 24/7, los administradores procesan las solicitudes mucho más rápido, y prácticamente eliminamos los conflictos de horarios.

El feedback ha sido muy positivo, especialmente de los centros de estudiantes y agrupaciones que usan el quincho regularmente.

## Lo que aprendimos

Este proyecto nos enseñó muchísimo sobre:
- Diseñar sistemas pensando en la experiencia del usuario real
- Trabajar con autenticación y autorización granular
- Manejar estado complejo con datos en tiempo real
- Optimizar queries y renders para mejor rendimiento
- Testear con usuarios reales y adaptarnos a su feedback

## Estado actual

El sistema está funcionando y en desarrollo activo. Seguimos agregando features que los usuarios piden, como notificaciones por email, recordatorios automáticos, y métricas más detalladas para la administración.