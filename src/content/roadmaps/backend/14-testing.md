---
id: "14"
title: "Testing"
description: "Escribe tests para garantizar la calidad y confiabilidad de tu código."
---

# Testing en Backend

Los tests son esenciales para código confiable y mantenible.

## Tipos de Tests

| Tipo | Descripción | Velocidad |
|------|-------------|-----------|
| Unit | Funciones individuales | ⚡ Rápido |
| Integration | Componentes juntos | 🚀 Medio |
| E2E | Sistema completo | 🐢 Lento |

## Unit Tests con Jest

```javascript
// suma.js
function suma(a, b) {
  return a + b;
}

// suma.test.js
describe('suma', () => {
  test('suma dos números positivos', () => {
    expect(suma(2, 3)).toBe(5);
  });

  test('suma números negativos', () => {
    expect(suma(-1, -1)).toBe(-2);
  });
});
```

## Integration Tests

```javascript
const request = require('supertest');
const app = require('../app');

describe('GET /api/usuarios', () => {
  test('retorna lista de usuarios', async () => {
    const res = await request(app)
      .get('/api/usuarios')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('POST /api/usuarios', () => {
  test('crea un usuario', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({ nombre: 'Test', email: 'test@test.com' })
      .expect(201);

    expect(res.body.data.nombre).toBe('Test');
  });
});
```

## Cobertura de Tests

```bash
npm test -- --coverage
```

## Mejores Prácticas

- Test behavior, no implementation
- Un assert por test (cuando sea posible)
- Nombres descriptivos
- Setup y teardown limpios
