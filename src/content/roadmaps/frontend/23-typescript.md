---
id: "23"
title: "TypeScript"
description: "TypeScript es un superconjunto tipado de JavaScript que compila a JavaScript plano."
---

# TypeScript

TypeScript añade verificación de tipos estática a JavaScript, detectando errores en tiempo de compilación en lugar de tiempo de ejecución.

## Tipos Básicos

```typescript
// Primitivos
let nombre: string = "Juan";
let edad: number = 30;
let activo: boolean = true;

// Arrays
let numeros: number[] = [1, 2, 3];
let nombres: Array<string> = ["Alicia", "Bob"];

// Objetos
let usuario: { nombre: string; edad: number } = {
  nombre: "Juan",
  edad: 30
};
```

## Interfaces y Types

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email?: string; // Opcional
  readonly creadoEn: Date;
}

type Estado = "pendiente" | "aprobado" | "rechazado";

function procesarUsuario(usuario: Usuario): void {
  console.log(usuario.nombre);
}
```

## Genéricos

```typescript
function identidad<T>(arg: T): T {
  return arg;
}

interface RespuestaApi<T> {
  data: T;
  estado: number;
}
```

## React con TypeScript

```typescript
interface Props {
  titulo: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const Boton: React.FC<Props> = ({ titulo, onClick, children }) => {
  return <button onClick={onClick}>{children || titulo}</button>;
};
```

## Beneficios

1. **Detecta errores temprano** en tiempo de compilación
2. **Mejor soporte de IDE** con autocompletado
3. **Código auto-documentado**
4. **Refactorización más fácil**
5. **Mejor colaboración en equipo**

## Comenzando

```bash
npm install typescript -D
npx tsc --init
```
