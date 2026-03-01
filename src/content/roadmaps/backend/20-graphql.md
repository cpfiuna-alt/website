---
id: "20"
title: "GraphQL"
description: "Lenguaje de consulta para APIs que permite pedir exactamente los datos que necesitas."
---

# GraphQL

Una alternativa a REST que te da más control sobre qué datos recibes.

## Schema

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String
  author: User!
}

type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!): User!
  createPost(title: String!, authorId: ID!): Post!
}
```

## Queries

```graphql
# Obtener usuario con sus posts
query {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}
```

## Mutations

```graphql
mutation {
  createUser(name: "Juan", email: "juan@email.com") {
    id
    name
  }
}
```

## Servidor con Apollo

```javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hola Mundo!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Servidor en ${url}`);
});
```

## REST vs GraphQL

| REST | GraphQL |
|------|---------|
| Multiple endpoints | Un endpoint |
| Over/under fetching | Pides lo que necesitas |
| Versionado en URL | Schema evolution |
| Simple | Más complejo |
