---
id: "24"
title: "Testing"
description: "Las pruebas aseguran que tu código funcione correctamente y ayudan a prevenir regresiones."
---

# Testing Frontend

Las pruebas son cruciales para mantener la calidad del código y prevenir que los bugs lleguen a producción.

## Tipos de Pruebas

1. **Unit Tests**: Prueban funciones/componentes individuales
2. **Integration Tests**: Prueban interacciones entre componentes
3. **End-to-End (E2E)**: Prueban flujos completos de usuario

## Herramientas de Testing

### Vitest (Unit Testing)
```javascript
import { describe, it, expect } from 'vitest';

describe('función sumar', () => {
  it('suma dos números', () => {
    expect(sumar(1, 2)).toBe(3);
  });
});
```

### React Testing Library
```javascript
import { render, screen, fireEvent } from '@testing-library/react';

test('click en botón incrementa contador', () => {
  render(<Contador />);
  
  const boton = screen.getByRole('button');
  fireEvent.click(boton);
  
  expect(screen.getByText('Cuenta: 1')).toBeInTheDocument();
});
```

### Playwright (E2E)
```javascript
import { test, expect } from '@playwright/test';

test('usuario puede iniciar sesión', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'usuario@ejemplo.com');
  await page.fill('[name=password]', 'contraseña');
  await page.click('button[type=submit]');
  
  await expect(page).toHaveURL('/dashboard');
});
```

## Mejores Prácticas de Testing

1. **Prueba comportamiento, no implementación**
2. **Escribe tests mientras programas**
3. **Mantén las pruebas simples y enfocadas**
4. **Usa descripciones de test significativas**
5. **No hagas over-mocking**

## Pirámide de Testing

```
     /\
    /E2E\        Pocas, lentas, costosas
   /------\
  /Integr.\     Algunas, velocidad media
 /----------\
/   Unit     \  Muchas, rápidas, baratas
```
