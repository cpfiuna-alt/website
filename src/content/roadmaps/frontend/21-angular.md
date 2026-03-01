---
id: "21"
title: "Angular"
description: "Angular es un framework completo basado en TypeScript para construir aplicaciones web empresariales."
---

# Angular

Angular es un framework completo basado en TypeScript de Google, que proporciona todo lo necesario para aplicaciones a gran escala.

## Conceptos Fundamentales

### Componentes
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-hola',
  template: `<h1>¡Hola, {{ nombre }}!</h1>`,
  styles: [`h1 { color: blue; }`]
})
export class HolaComponent {
  nombre = 'Mundo';
}
```

### Templates
```html
<!-- Interpolación -->
<h1>{{ titulo }}</h1>

<!-- Property binding -->
<img [src]="urlImagen" />

<!-- Event binding -->
<button (click)="manejarClick()">Clic</button>

<!-- Two-way binding -->
<input [(ngModel)]="nombre" />

<!-- Directivas -->
<div *ngIf="esVisible">Visible</div>
<li *ngFor="let item of items">{{ item }}</li>
```

### Servicios e Inyección de Dependencias
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  obtenerDatos() {
    return this.http.get('/api/datos');
  }
}

// En componente
constructor(private dataService: DataService) {}
```

## Características Clave

1. **TypeScript por defecto**
2. **Inyección de dependencias integrada**
3. **RxJS para programación reactiva**
4. **Solución completa** (routing, formularios, HTTP)
5. **CLI para scaffolding**

## Cuándo Usar Angular

- Aplicaciones empresariales grandes
- Equipos con experiencia en TypeScript
- Cuando necesitas una solución completa y opinionada
- Proyectos a largo plazo y mantenibles
