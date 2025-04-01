
---
title: "TypeScript: Guía Completa"
description: "Aprende a usar TypeScript de manera efectiva en tus proyectos"
category: "Guías"
order: 4
author: "Carlos Ramírez"
updatedAt: "2024-01-10"
readTime: "20 min"
githubUrl: "https://github.com/clubprogramacion/docs/typescript"
tags: ["TypeScript", "JavaScript", "Frontend"]
resources: [
  { 
    "title": "Documentación oficial de TypeScript", 
    "url": "https://www.typescriptlang.org/docs/" 
  },
  { 
    "title": "TypeScript Deep Dive", 
    "url": "https://basarat.gitbook.io/typescript/" 
  },
  { 
    "title": "Playground de TypeScript", 
    "url": "https://www.typescriptlang.org/play" 
  }
]
---

# TypeScript: Guía Completa

TypeScript es un superconjunto de JavaScript que añade tipado estático y otras características a JavaScript. En esta guía, aprenderás cómo usar TypeScript de manera efectiva en tus proyectos.

## ¿Qué es TypeScript?

TypeScript es un lenguaje de programación desarrollado por Microsoft que extiende JavaScript añadiendo tipos estáticos. Algunas de sus ventajas son:

- **Detección de errores en tiempo de compilación**: Encuentra errores antes de ejecutar el código
- **Mejor documentación**: Los tipos sirven como documentación viva
- **Mejores herramientas**: Autocompletado e IntelliSense en editores
- **Refactorización más segura**: Cambiar código con confianza
- **Soporte para características modernas**: Usa las últimas características de JavaScript, incluso en navegadores antiguos

## Instalación y configuración

### Instalación

Para instalar TypeScript, necesitas Node.js y npm:

```bash
npm install -g typescript
```

Para verificar la instalación:

```bash
tsc --version
```

### Configuración básica

Crear un archivo `tsconfig.json` para configurar TypeScript:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

### Compilar código TypeScript

Para compilar un archivo TypeScript a JavaScript:

```bash
tsc archivo.ts
```

Para compilar todos los archivos del proyecto:

```bash
tsc
```

Para compilar en modo watch (recompilar automáticamente con cambios):

```bash
tsc --watch
```

## Tipos básicos

### Primitivos

```typescript
// Tipos primitivos
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let bigInt: bigint = 100n;
let symbol: symbol = Symbol("sym");

// Arrays
let list: number[] = [1, 2, 3];
let fruits: Array<string> = ["apple", "orange", "banana"];

// Tuple
let tuple: [string, number] = ["hello", 10];

// Enum
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green; // 1

// Any - use with caution!
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// Void
function logMessage(message: string): void {
  console.log(message);
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Object
let obj: object = { key: "value" };

// Never - funciones que nunca retornan
function error(message: string): never {
  throw new Error(message);
}
```

### Union Types

```typescript
let id: string | number;
id = 101; // Valid
id = "202"; // Valid
// id = true; // Invalid - Type 'boolean' is not assignable to type 'string | number'
```

### Type Aliases

```typescript
type ID = string | number;
let userId: ID = 123;
userId = "abc123";

type Point = {
  x: number;
  y: number;
};

let position: Point = { x: 10, y: 20 };
```

### Literal Types

```typescript
type Direction = "north" | "south" | "east" | "west";
let bearing: Direction = "north"; // Valid
// bearing = "up"; // Invalid

function move(distance: number, direction: Direction): void {
  console.log(`Moving ${distance} units ${direction}`);
}
```

## Interfaces

### Definición básica

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const newUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true
};
```

### Propiedades opcionales

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Propiedad opcional
}

const phone: Product = {
  id: 1,
  name: "iPhone",
  price: 999
  // description es opcional
};
```

### Propiedades de solo lectura

```typescript
interface Config {
  readonly apiKey: string;
  readonly apiUrl: string;
}

const config: Config = {
  apiKey: "abc123",
  apiUrl: "https://api.example.com"
};

// Error: Cannot assign to 'apiKey' because it is a read-only property
// config.apiKey = "xyz789";
```

### Extender interfaces

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "Alice",
  age: 30,
  employeeId: 1001,
  department: "Engineering"
};
```

### Interfaces vs Type Aliases

Ambos pueden describir formas de objetos, pero las interfaces son más extensibles:

```typescript
// Interfaces se pueden extender o implementar
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Types se pueden unir con otros tipos
type Animal2 = {
  name: string;
}

type Dog2 = Animal2 & {
  breed: string;
}
```

## Clases

### Definición básica

```typescript
class Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

const alice = new Person("Alice", 28);
console.log(alice.greet());
```

### Modificadores de acceso

```typescript
class BankAccount {
  private balance: number;
  protected accountNumber: string;
  public owner: string;
  
  constructor(owner: string, accountNumber: string, initialBalance: number) {
    this.owner = owner;
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }
  
  public deposit(amount: number): void {
    this.balance += amount;
  }
  
  public getBalance(): number {
    return this.balance;
  }
}
```

### Herencia

```typescript
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  makeSound(): void {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
  
  makeSound(): void {
    console.log("Woof! Woof!");
  }
  
  fetch(): void {
    console.log("Fetching the ball!");
  }
}
```

### Propiedades estáticas

```typescript
class MathUtils {
  static PI: number = 3.14159;
  
  static calculateCircumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

console.log(MathUtils.PI);
console.log(MathUtils.calculateCircumference(5));
```

## Funciones

### Parámetros y tipos de retorno

```typescript
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Void return type
function log(message: string): void {
  console.log(message);
}
```

### Parámetros opcionales y por defecto

```typescript
// Parámetro opcional
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

// Parámetro por defecto
function createUser(name: string, role: string = "user"): object {
  return { name, role };
}
```

### Rest parameters

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

### Sobrecarga de funciones

```typescript
function process(x: number): number;
function process(x: string): string;
function process(x: number | string): number | string {
  if (typeof x === "number") {
    return x * 2;
  } else {
    return x.repeat(2);
  }
}

console.log(process(5)); // 10
console.log(process("hi")); // "hihi"
```

### Tipos de funciones

```typescript
type MathFunc = (a: number, b: number) => number;

const add: MathFunc = (a, b) => a + b;
const subtract: MathFunc = (a, b) => a - b;

// Como parámetro de otra función
function useMathFunc(a: number, b: number, fn: MathFunc): number {
  return fn(a, b);
}
```

## Generics

### Funciones genéricas

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let num = identity<number>(123);    // tipo number
let str = identity<string>("hello"); // tipo string
let auto = identity(true);          // inferido como boolean
```

### Interfaces genéricas

```typescript
interface Box<T> {
  value: T;
}

let numberBox: Box<number> = { value: 10 };
let stringBox: Box<string> = { value: "hello" };
```

### Clases genéricas

```typescript
class Queue<T> {
  private data: T[] = [];
  
  push(item: T): void {
    this.data.push(item);
  }
  
  pop(): T | undefined {
    return this.data.shift();
  }
}

const numberQueue = new Queue<number>();
numberQueue.push(10);
numberQueue.push(20);
```

### Restricciones en genéricos

```typescript
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

console.log(getLength("hello"));     // 5
console.log(getLength([1, 2, 3]));   // 3
console.log(getLength({ length: 10 })); // 10
// console.log(getLength(123)); // Error: number no tiene propiedad 'length'
```

## Avanzado

### Tipos de utilidad

TypeScript proporciona varios tipos de utilidad que facilitan la transformación de tipos:

```typescript
// Partial<T> - todos los campos opcionales
interface User {
  id: number;
  name: string;
  email: string;
}

const updateUser = (user: User, fields: Partial<User>): User => {
  return { ...user, ...fields };
};

// Readonly<T> - todos los campos readonly
const user: Readonly<User> = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

// Pick<T, K> - subconjunto de propiedades
type UserBasicInfo = Pick<User, "id" | "name">;

// Omit<T, K> - excluir propiedades
type UserWithoutEmail = Omit<User, "email">;

// Record<K, T> - crear un tipo con un conjunto de propiedades
type UserRoles = Record<string, boolean>;
const roles: UserRoles = {
  admin: true,
  editor: false
};
```

### Tipos condicionales

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// infer para extraer tipos
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getMessage(): string {
  return "Hello";
}

type MessageType = ReturnType<typeof getMessage>;  // string
```

### Mapped Types

```typescript
type ReadonlyProps<T> = {
  readonly [P in keyof T]: T[P];
};

type OptionalProps<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = ReadonlyProps<User>;
// Equivalente a: { readonly id: number, readonly name: string, readonly email: string }
```

### Decoradores experimentales

```typescript
// Habilitar experimentalDecorators en tsconfig.json
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with:`, args);
    const result = original.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };
  
  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);
// Imprime:
// Calling add with: [2, 3]
// Result: 5
```

## Guía

### Estructura de proyectos TypeScript

Estructura recomendada para un proyecto TypeScript:

```
mi-proyecto/
├── src/                  # Código fuente
│   ├── components/       # Componentes 
│   ├── models/           # Interfaces y tipos
│   ├── services/         # Servicios
│   ├── utils/            # Utilidades
│   └── index.ts          # Punto de entrada
├── dist/                 # Código compilado (JS)
├── node_modules/         # Dependencias
├── tests/                # Tests
├── .gitignore
├── package.json
├── tsconfig.json         # Configuración de TypeScript
└── README.md
```

#### Configuración recomendada (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### Patrones comunes en TypeScript

#### Patrón de Constructor de Objetos

```typescript
interface UserData {
  id: number;
  name: string;
  email: string;
  bio?: string;
  verified?: boolean;
}

class UserBuilder {
  private userData: Partial<UserData> = {};
  
  setId(id: number): UserBuilder {
    this.userData.id = id;
    return this;
  }
  
  setName(name: string): UserBuilder {
    this.userData.name = name;
    return this;
  }
  
  setEmail(email: string): UserBuilder {
    this.userData.email = email;
    return this;
  }
  
  setBio(bio: string): UserBuilder {
    this.userData.bio = bio;
    return this;
  }
  
  setVerified(verified: boolean): UserBuilder {
    this.userData.verified = verified;
    return this;
  }
  
  build(): UserData {
    // Verificar campos requeridos
    if (!this.userData.id || !this.userData.name || !this.userData.email) {
      throw new Error('User requires id, name, and email.');
    }
    
    return this.userData as UserData;
  }
}

// Uso
const user = new UserBuilder()
  .setId(1)
  .setName('John Doe')
  .setEmail('john@example.com')
  .setBio('Software developer')
  .build();
```

#### Módulos de servicios

```typescript
// models/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// services/api.ts
import { User } from '../models/user';

export class ApiService {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json() as Promise<User[]>;
  }
  
  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
    return response.json() as Promise<User>;
  }
}

// Uso
const api = new ApiService('https://api.example.com');
api.getUsers().then(users => console.log(users));
```

#### Type Guards

```typescript
interface Admin {
  id: number;
  name: string;
  privileges: string[];
}

interface User {
  id: number;
  name: string;
  registrationDate: Date;
}

type Person = Admin | User;

// Type guard con función
function isAdmin(person: Person): person is Admin {
  return 'privileges' in person;
}

function isUser(person: Person): person is User {
  return 'registrationDate' in person;
}

function processPersonData(person: Person) {
  if (isAdmin(person)) {
    console.log(`Admin ${person.name} has privileges: ${person.privileges.join(', ')}`);
  } else if (isUser(person)) {
    console.log(`User ${person.name} registered on ${person.registrationDate.toLocaleDateString()}`);
  }
}
```

## API Reference

### TypeScript Compiler API

TypeScript incluye un compilador API que permite programáticamente analizar, transformar y generar código TypeScript:

```typescript
import * as ts from 'typescript';

// Crear un programa TS a partir de archivos
const program = ts.createProgram(['./src/index.ts'], {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.ESNext
});

// Obtener el type checker
const checker = program.getTypeChecker();

// Obtener los archivos fuente
const sourceFiles = program.getSourceFiles();

// Visitar cada nodo del AST
sourceFiles.forEach(sourceFile => {
  if (!sourceFile.isDeclarationFile) {
    ts.forEachChild(sourceFile, node => {
      // Procesar cada nodo aquí
      if (ts.isFunctionDeclaration(node) && node.name) {
        console.log(`Found function: ${node.name.text}`);
      }
    });
  }
});

// Compilar el programa
const emitResult = program.emit();

// Mostrar errores de diagnóstico
const allDiagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(emitResult.diagnostics);

allDiagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    const { line, character } = 
      diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  } else {
    console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  }
});
```

### TSDoc - Documentación de código

TypeScript usa JSDoc con algunas extensiones. Ejemplo de documentación bien formateada:

```typescript
/**
 * Representa un usuario en el sistema.
 */
interface User {
  /** ID único del usuario */
  id: number;
  
  /** Nombre completo del usuario */
  name: string;
  
  /** Dirección de correo electrónico */
  email: string;
}

/**
 * Crea un nuevo usuario en el sistema.
 *
 * @param name - El nombre completo del usuario
 * @param email - La dirección de correo electrónico del usuario
 * @returns Un objeto de usuario completo con ID generado
 *
 * @example
 * ```typescript
 * const user = createUser('John Doe', 'john@example.com');
 * console.log(user.id); // ID generado automáticamente
 * ```
 */
function createUser(name: string, email: string): User {
  return {
    id: Date.now(),
    name,
    email
  };
}
```

## Ejemplos

### API REST con TypeScript y Express

```typescript
import express from 'express';
import { v4 as uuid } from 'uuid';

// Definición de tipos
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

type CreateTodoDTO = Omit<Todo, 'id' | 'createdAt'>;
type UpdateTodoDTO = Partial<Omit<Todo, 'id' | 'createdAt'>>;

// Base de datos en memoria
const todos: Todo[] = [];

const app = express();
app.use(express.json());

// GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  res.json(todo);
});

// POST /todos
app.post('/todos', (req, res) => {
  const { title, completed } = req.body as CreateTodoDTO;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  const newTodo: Todo = {
    id: uuid(),
    title,
    completed: completed || false,
    createdAt: new Date()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === req.params.id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  const updates = req.body as UpdateTodoDTO;
  
  // Actualizar propiedades
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...updates
  };
  
  res.json(todos[todoIndex]);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === req.params.id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.json(deletedTodo);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Aplicación React con TypeScript

```tsx
import React, { useState, useEffect } from 'react';

// Definición de tipos
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// Componente de formulario para añadir tareas
const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

// Componente de elemento de tarea
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

// Componente principal
const TaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Cargar tareas desde localStorage al inicio
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  
  useEffect(() => {
    // Guardar tareas en localStorage cuando cambien
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };
  
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  return (
    <div className="task-app">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask} />
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet. Add some!</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
      <div className="stats">
        <p>Total tasks: {tasks.length}</p>
        <p>
          Completed: {tasks.filter(task => task.completed).length} (
          {Math.round(
            (tasks.filter(task => task.completed).length / tasks.length) * 100 || 0
          )}
          %)
        </p>
      </div>
    </div>
  );
};

export default TaskApp;
```

### Diseño de Biblioteca con TypeScript

```typescript
// src/types.ts
export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rectangle {
  position: Point;
  size: Size;
}

export interface Circle {
  center: Point;
  radius: number;
}

export type Shape = Rectangle | Circle;

// src/utils.ts
import { Point, Size, Rectangle, Circle, Shape } from './types';

export function createPoint(x: number, y: number): Point {
  return { x, y };
}

export function createSize(width: number, height: number): Size {
  return { width, height };
}

export function createRectangle(position: Point, size: Size): Rectangle {
  return { position, size };
}

export function createCircle(center: Point, radius: number): Circle {
  return { center, radius };
}

export function isRectangle(shape: Shape): shape is Rectangle {
  return 'position' in shape && 'size' in shape;
}

export function isCircle(shape: Shape): shape is Circle {
  return 'center' in shape && 'radius' in shape;
}

// src/geometry.ts
import { Point, Rectangle, Circle, Shape } from './types';
import { isRectangle, isCircle } from './utils';

export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function area(shape: Shape): number {
  if (isRectangle(shape)) {
    return shape.size.width * shape.size.height;
  } else if (isCircle(shape)) {
    return Math.PI * shape.radius * shape.radius;
  }
  return 0;
}

export function perimeter(shape: Shape): number {
  if (isRectangle(shape)) {
    return 2 * (shape.size.width + shape.size.height);
  } else if (isCircle(shape)) {
    return 2 * Math.PI * shape.radius;
  }
  return 0;
}

export function contains(shape: Shape, point: Point): boolean {
  if (isRectangle(shape)) {
    const { position, size } = shape;
    return (
      point.x >= position.x &&
      point.x <= position.x + size.width &&
      point.y >= position.y &&
      point.y <= position.y + size.height
    );
  } else if (isCircle(shape)) {
    return distance(shape.center, point) <= shape.radius;
  }
  return false;
}

export function intersects(shape1: Shape, shape2: Shape): boolean {
  // Implementación simplificada para demostración
  if (isRectangle(shape1) && isRectangle(shape2)) {
    return !(
      shape1.position.x + shape1.size.width < shape2.position.x ||
      shape2.position.x + shape2.size.width < shape1.position.x ||
      shape1.position.y + shape1.size.height < shape2.position.y ||
      shape2.position.y + shape2.size.height < shape1.position.y
    );
  }
  
  // Otras combinaciones requerirían implementaciones más complejas
  return false;
}

// src/index.ts
export * from './types';
export * from './utils';
export * from './geometry';
```
