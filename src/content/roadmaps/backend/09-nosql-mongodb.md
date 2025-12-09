---
id: "9"
title: "NoSQL (MongoDB)"
description: "Base de datos de documentos flexible y escalable, ideal para datos semi-estructurados."
---

# MongoDB

MongoDB almacena datos en documentos JSON flexibles (BSON).

## Conceptos Básicos

| SQL | MongoDB |
|-----|---------|
| Tabla | Colección |
| Fila | Documento |
| Columna | Campo |
| JOIN | Embedding / References |

## Operaciones CRUD

```javascript
// CREATE
db.usuarios.insertOne({
  nombre: "Juan",
  email: "juan@email.com",
  edad: 25,
  intereses: ["programación", "música"]
});

// READ
db.usuarios.find({ edad: { $gte: 18 } });
db.usuarios.findOne({ email: "juan@email.com" });

// UPDATE
db.usuarios.updateOne(
  { email: "juan@email.com" },
  { $set: { edad: 26 } }
);

// DELETE
db.usuarios.deleteOne({ email: "juan@email.com" });
```

## Estructura de Documentos

```javascript
{
  "_id": ObjectId("..."),
  "nombre": "Juan",
  "perfil": {
    "bio": "Desarrollador",
    "avatar": "url..."
  },
  "posts": [
    { "titulo": "Mi primer post", "fecha": ISODate("...") }
  ]
}
```

## Mongoose (Node.js)

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

## Recursos

- [MongoDB University](https://university.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
