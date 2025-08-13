# Estadísticas Centralizadas del CPF

Este archivo centraliza todas las estadísticas y contadores del Club de Programación FIUNA para mantener consistencia a través de todo el sitio web.

## 📁 Ubicación
`src/data/stats.ts`

## 🎯 Propósito
- Evitar duplicación de números en diferentes componentes
- Mantener consistencia en todas las estadísticas
- Facilitar actualizaciones: cambiar un número en un solo lugar
- Proporcionar una fuente única de verdad para todos los contadores

## 📊 Estadísticas Principales

### CPF_STATS
Objeto principal que contiene todos los números base:
```typescript
export const CPF_STATS = {
  MIEMBROS_ACTIVOS: 145,
  PROYECTOS_REALIZADOS: 30,
  EVENTOS_ORGANIZADOS: 45,
  PREMIOS_RECIBIDOS: 25,
  COMPETENCIAS_PARTICIPADAS: 12,
  CONTRIBUCIONES_GITHUB: 300,
  ALIADOS_COLABORADORES: 15,
  AÑOS_FUNDACION: 2017,
  get AÑOS_HISTORIA() {
    return new Date().getFullYear() - this.AÑOS_FUNDACION;
  }
};
```

### Arrays de Estadísticas

#### ABOUT_STATS
Para la página "Nosotros" (`/about`):
- Proyectos, Miembros, Eventos, Premios, Contribuciones, Aliados

#### LOGROS_STATS  
Para la página "Logros" (`/logros`):
- Miembros activos, Premios recibidos, Proyectos realizados, Competencias

#### HERO_STATS
Para componentes de hero/landing:
- Miembros Activos, Eventos Realizados, Proyectos Completados, Premios Recibidos

## 🔄 Componentes Actualizados

Los siguientes componentes ahora usan las estadísticas centralizadas:

1. **`src/components/about/Stats.tsx`**
   - Página "Nosotros"
   - Usa `ABOUT_STATS`

2. **`src/components/logros/LogrosStats.tsx`**
   - Página "Logros" 
   - Usa `LOGROS_STATS`

3. **`src/components/StatsCounter.tsx`**
   - Componente general de contadores
   - Usa `HERO_STATS`

## 📝 Cómo Actualizar las Estadísticas

### Para cambiar un número:
1. Abre `src/data/stats.ts`
2. Modifica el valor en el objeto `CPF_STATS`
3. El cambio se aplicará automáticamente en todos los componentes que usen esa estadística

### Ejemplo:
```typescript
// Para cambiar el número de miembros activos
export const CPF_STATS = {
  MIEMBROS_ACTIVOS: 160, // Cambiar de 145 a 160
  // ...resto de estadísticas
};
```

### Para agregar una nueva estadística:
1. Añádela al objeto `CPF_STATS`
2. Agrégala a los arrays correspondientes (`ABOUT_STATS`, `LOGROS_STATS`, etc.)
3. Actualiza los componentes que necesiten mostrar la nueva estadística

## 🎨 Estructura de StatItem

```typescript
interface StatItem {
  value: number;      // El número a mostrar
  label: string;      // La etiqueta/descripción
  suffix?: string;    // Sufijo opcional (ej: "+")
  prefix?: string;    // Prefijo opcional (ej: "+")
}
```

## ✅ Beneficios

- **Consistencia**: Todos los números son iguales en todo el sitio
- **Mantenibilidad**: Un solo lugar para actualizar
- **Escalabilidad**: Fácil agregar nuevas estadísticas
- **Tipado**: TypeScript asegura que los tipos sean correctos
- **Automatización**: Algunos valores se calculan automáticamente (ej: años de historia)

## 🚀 Próximos Pasos

1. Considerar conectar con una API o CMS para actualizaciones dinámicas
2. Agregar estadísticas adicionales según necesidades del club
3. Implementar animaciones más sofisticadas para los contadores
4. Agregar estadísticas específicas por año o período
