---
id: 2
title: "Sistema de Reserva del Quincho FIUNA"
description: "Plataforma web moderna para la gestión y reserva del Quincho de la Facultad de Ingeniería de la Universidad Nacional de Asunción, construida con React, TypeScript y Supabase."
image: "images/projects/quincho-fiuna/quincho-calendar-view.png"
tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Reservas", "Calendario"]
githubLink: "https://github.com/cpfiuna-alt/quincho-fiuna"
demoLink: "https://quincho-fiuna.vercel.app"
category: "web"
featured: true
status: "En desarrollo activo"
lastUpdated: "05-13-2025"
team: ["David Giménez", "Mathías Barrios", "Oscar Alderete", "José Hellión", "Esteban Ibarra", "Leonardo Martínez"]
githubStats: {}
startDate: "05-03-2025"
slug: "sistema-reserva-quincho"
gallery:
  - "/images/projects/quincho-fiuna/quincho-calendar-view.png"
  - "/images/projects/quincho-fiuna/quincho-reservation-form.png"
---

## ¿Qué es este proyecto?

El Sistema de Reserva del Quincho FIUNA es una aplicación web completa diseñada para facilitar la gestión y reserva del espacio de quincho de la Facultad de Ingeniería. Este sistema digital reemplaza el proceso manual anterior, permitiendo a estudiantes, docentes y personal administrativo reservar el espacio de manera eficiente y transparente.

La plataforma funciona como un punto central donde los usuarios pueden visualizar la disponibilidad del quincho en tiempo real, realizar reservas con validación automática de conflictos, y donde los administradores pueden gestionar todas las solicitudes de manera organizada.

## Características principales

- **Calendar io interactivo** con vista mensual, semanal y de agenda para visualizar reservas existentes y disponibilidad
- **Sistema de reservas inteligente** con validación automática de conflictos de horarios y fechas bloqueadas
- **Panel de administración completo** para aprobar, rechazar, editar y gestionar todas las reservas
- **Gestión de fechas bloqueadas** para eventos especiales o mantenimiento del espacio
- **Notificaciones por email** automáticas para confirmaciones, rechazos y recordatorios
- **Interfaz responsive** que funciona perfectamente en dispositivos móviles y de escritorio
- **Autenticación segura** para administradores con diferentes niveles de acceso
- **Reportes y estadísticas** de uso del quincho para la administración

## Tecnologías utilizadas

Este proyecto aprovecha tecnologías modernas de desarrollo web para ofrecer una experiencia robusta y escalable:

- **React** - Framework principal para crear una interfaz de usuario dinámica e interactiva
- **TypeScript** - Lenguaje que añade tipado estático para mayor seguridad y mantenibilidad del código
- **Tailwind CSS** - Framework de utilidades CSS para un diseño consistente y desarrollo rápido
- **shadcn/ui** - Biblioteca de componentes UI modernos y accesibles construidos sobre Radix UI
- **Supabase** - Plataforma backend completa que proporciona base de datos PostgreSQL, autenticación y APIs en tiempo real
- **TanStack Query** - Biblioteca para manejo de estado del servidor, cache y sincronización de datos
- **React Router** - Enrutamiento del lado del cliente para navegación fluida
- **Framer Motion** - Animaciones suaves y transiciones elegantes
- **React Hook Form** - Manejo eficiente de formularios con validación
- **Date-fns** - Biblioteca para manipulación y formato de fechas
- **Sonner** - Sistema de notificaciones toast moderno y accesible

## Cómo funciona

### Para usuarios regulares:
1. **Consulta de disponibilidad**: Los usuarios acceden al calendario para ver qué fechas y horarios están disponibles
2. **Solicitud de reserva**: Completan un formulario con detalles como fecha, horario, motivo del evento y número de personas
3. **Validación automática**: El sistema verifica automáticamente conflictos de horarios y fechas bloqueadas
4. **Confirmación**: Reciben una notificación por email sobre el estado de su solicitud

### Para administradores:
1. **Gestión de solicitudes**: Revisan todas las reservas pendientes con información detallada
2. **Aprobación/Rechazo**: Pueden aprobar o rechazar reservas con notas explicativas
3. **Edición de reservas**: Modifican detalles de reservas existentes cuando es necesario
4. **Bloqueo de fechas**: Marcan fechas como no disponibles para mantenimiento o eventos especiales
5. **Monitoreo**: Acceden a reportes de uso y estadísticas del quincho

### Base de datos y sincronización:
- **Tiempo real**: Todas las actualizaciones se sincronizan automáticamente entre usuarios
- **Backup automático**: Supabase proporciona respaldos automáticos de todos los datos
- **Escalabilidad**: La infraestructura puede manejar múltiples usuarios simultáneos sin problemas

## Estructura del proyecto

```
src/
  ├── components/           # Componentes reutilizables
  │   ├── AdminDashboard.tsx    # Panel principal de administración
  │   ├── Calendar.tsx          # Componente de calendario interactivo
  │   ├── ReservationForm.tsx   # Formulario de nueva reserva
  │   └── admin/               # Componentes específicos de administración
  ├── pages/               # Páginas principales
  │   ├── Index.tsx           # Página de inicio con calendario
  │   ├── ReservationPage.tsx # Página de nueva reserva
  │   └── AdminPage.tsx       # Página de administración
  ├── hooks/               # Hooks personalizados
  │   ├── useReservationsData.ts  # Lógica de manejo de reservas
  │   └── useAvailabilityCheck.ts # Validación de disponibilidad
  ├── context/             # Contextos de React
  ├── types/               # Definiciones de tipos TypeScript
  ├── utils/               # Funciones utilitarias
  └── integrations/        # Configuración de servicios externos
      └── supabase/        # Cliente y configuración de Supabase
```

## Despliegue y hosting

La aplicación está desplegada en **Vercel**, aprovechando sus capacidades para aplicaciones React:

- **Despliegue automático**: Cada push al repositorio principal genera una nueva versión
- **Preview deployments**: Cada pull request genera una URL de preview para testing
- **Edge Network**: CDN global para carga rápida desde cualquier ubicación
- **Optimizaciones automáticas**: Build optimizations y tree-shaking automático
- **Monitoring**: Métricas de rendimiento y analytics integrados

## Lo que aprendimos desarrollando este proyecto

Esta aplicación nos permitió como club explorar y dominar:

- **Arquitectura de aplicaciones full-stack** usando servicios serverless
- **Gestión de estado complejo** con múltiples fuentes de datos en tiempo real
- **Diseño de interfaces de usuario** centradas en la experiencia del usuario
- **Integración de servicios externos** como Supabase para backend as a service
- **Testing y validación** de aplicaciones con usuarios reales
- **Metodologías ágiles** de desarrollo con iteraciones rápidas
- **Deployment automatizado** y CI/CD con Vercel
- **Optimización de rendimiento** para aplicaciones React en producción

## Impacto en la comunidad FIUNA

Desde su implementación, el sistema ha transformado la manera en que se gestiona el quincho:

- **Transparencia**: Todos pueden ver la disponibilidad en tiempo real
- **Eficiencia**: Reducción significativa del tiempo de gestión administrativa
- **Accesibilidad**: Reservas disponibles 24/7 desde cualquier dispositivo
- **Trazabilidad**: Historial completo de todas las reservas y cambios
- **Equidad**: Sistema de cola justo basado en orden de llegada

## Estado actual y futuras mejoras

El sistema está en **desarrollo activo** con nuevas características planificadas:

### Implementado
- Sistema completo de reservas con validación
- Panel de administración funcional
- Calendario interactivo con múltiples vistas
- Interfaz responsive y accesible

### En desarrollo
- Notificaciones por email
- Sistema de recordatorios automáticos
- Métricas y analytics avanzados
- Integración con calendario institucional
- API pública para integraciones

## ¿Querés contribuir?

Este proyecto está abierto a contribuciones de la comunidad estudiantil:

### Formas de contribuir:
1. **Desarrollo**: Implementar nuevas características o mejorar las existentes
2. **Testing**: Reportar bugs y probar nuevas funcionalidades
3. **Diseño**: Mejorar la interfaz de usuario y experiencia
4. **Documentación**: Escribir guías de usuario y documentación técnica
5. **Feedback**: Sugerir mejoras basadas en el uso real del sistema

### Cómo empezar:
1. Fork el repositorio en GitHub
2. Clona tu fork localmente
3. Instala las dependencias con `npm install`
4. Configura las variables de entorno de Supabase
5. Ejecuta `npm run dev` para desarrollo local
6. ¡Comenzá a contribuir!

### Stack de desarrollo:
- Conocimientos básicos de React y TypeScript son útiles
- Experiencia con Tailwind CSS es un plus
- Interés en aprender sobre backend as a service (Supabase)

¡Es una excelente oportunidad para aprender desarrollo web moderno mientras contribuís a un proyecto que beneficia a toda la comunidad de la FIUNA!
