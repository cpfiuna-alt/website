---
id: "9"
title: "Manipulación del DOM"
description: "El Modelo de Objetos del Documento (DOM) permite a JavaScript interactuar y modificar documentos HTML."
---

# Manipulación del DOM

El DOM es una interfaz de programación para documentos HTML, que permite a JavaScript acceder y manipular contenido, estructura y estilos.

## Seleccionar Elementos

```javascript
// Elemento único
document.getElementById("miId");
document.querySelector(".miClase");

// Múltiples elementos
document.getElementsByClassName("miClase");
document.querySelectorAll("p");
```

## Modificar Elementos

```javascript
const elemento = document.querySelector("#miElemento");

// Contenido
elemento.textContent = "Nuevo texto";
elemento.innerHTML = "<strong>Texto en negrita</strong>";

// Atributos
elemento.setAttribute("class", "nuevaClase");
elemento.getAttribute("id");

// Estilos
elemento.style.color = "red";
elemento.classList.add("activo");
elemento.classList.toggle("visible");
```

## Crear Elementos

```javascript
const nuevoDiv = document.createElement("div");
nuevoDiv.textContent = "Hola Mundo";
nuevoDiv.classList.add("tarjeta");

document.body.appendChild(nuevoDiv);
elementoPadre.insertBefore(nuevoDiv, elementoReferencia);
```

## Manejo de Eventos

```javascript
boton.addEventListener("click", (event) => {
  console.log("¡Botón clickeado!");
  event.preventDefault();
});

// Delegación de eventos
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-eliminar")) {
    e.target.parentElement.remove();
  }
});
```

## Mejores Prácticas

- Cachea las consultas al DOM en variables
- Usa delegación de eventos para elementos dinámicos
- Minimiza las manipulaciones del DOM (agrupa actualizaciones)
- Considera usar DocumentFragment para múltiples inserciones
