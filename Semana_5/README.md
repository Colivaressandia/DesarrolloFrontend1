# 🎮 Memory Card Games

Proyecto web desarrollado para la asignatura **Desarrollo Frontend I (PFY2201)**.

Esta es la entrega de la **Semana 5**: manipulación del DOM con JavaScript, implementación de eventos y consumo de datos externos mediante **Fetch API**.

---

## 📋 Descripción

Memory Card Games es una tienda ficticia de consolas y videojuegos. A partir de esta semana, el sitio deja de ser estático y se convierte en una aplicación web interactiva que:

- Reacciona a eventos del usuario (`click`, `mouseover`, `mouseout`, `submit`).
- Modifica el DOM dinámicamente con `createElement`, `appendChild` y `remove()`.
- Consume datos externos desde APIs públicas mediante `fetch()`.
- Aplica manejo de errores y promesas con `async/await` y bloques `try/catch`.

---

## ✨ Funcionalidades implementadas

### 1. Manipulación del DOM

- Creación dinámica de elementos en el carrito con detalles de consola y precio.
- Eliminación de nodos del DOM (`element.remove()`) tanto en productos individuales como al vaciar el carrito completo.
- Actualización de contadores y estilos en tiempo real (`textContent`, manipulación de clases y estilos).

### 2. Eventos

| Evento | Dónde se aplica | Acción |
|--------|-----------------|--------|
| `click` | Botones "Comprar" | Agrega el producto seleccionado al carrito y actualiza el contador. |
| `click` | Botones "Quitar" y "Vaciar carrito" | Remueve elementos del carrito dinámicamente. |
| `mouseover` / `mouseout` | Tarjetas del catálogo (`.tarjeta-producto`) | Resalta la tarjeta con borde cian, sombra luminosa y elevación suave. |
| `submit` | Formulario de suscripción | Valida los campos ingresados y muestra alertas de estado sin recargar la página. |

### 3. Fetch API

Se implementó el consumo asíncrono desde APIs públicas en tiempo real:

- **CheapShark API**: Carga asíncrona de ofertas reales de videojuegos.
- **PokéAPI**: Carga dinámica de atributos, tipos e imágenes oficiales de Pokémon.

Ambas integraciones incluyen:

- Manejo de excepciones y errores de conexión con `try/catch`.
- Verificación del estado de respuesta HTTP (`response.ok`).
- Renderizado dinámico de tarjetas informativas a partir del arreglo de datos JSON recibido.
- Mensajes de estado amigables en pantalla (indicador de carga y aviso en caso de error).

### 4. Buenas prácticas

- Código modularizado en funciones con responsabilidad única.
- Espera de la carga completa del árbol DOM mediante el evento `DOMContentLoaded`.
- Separación estricta de estructura (HTML), estilos (CSS) y lógica (JS).
- Sin duplicidad de código y con nombres semánticos para variables y selectores.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica del documento |
| CSS3 | Estilos personalizados y paleta gamer oscura |
| Bootstrap 5.3 | Sistema de cuadrícula responsiva, Navbar, Cards y Carrusel |
| JavaScript (ES6+) | Lógica del DOM, escuchadores de eventos y Fetch API con `async/await` |
| CheapShark API | Datos de ofertas de videojuegos |
| PokéAPI | Datos y recursos visuales de Pokémon |

## 📁 Estructura del proyecto

```text
Semana_5/
├── Index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── img/
    ├── banner1.jpg
    ├── banner2.jpg
    ├── banner3.jpg
    ├── switch2.png
    ├── ps5pro.png
    ├── xbox.png
└── capturas/
    ├── 01-catalogo-reposo.png
    ├── 02-catalogo-hover.png
    ├── 03-carrito-interactivo.png
    ├── 04-fetch-api-ofertas.png
    └── 05-formulario-validacion.png
    └── 06-navegador-chrome.png
    └── 07-navegador-edge.png
    └── 08-navegador-firefox.png
```

## 🚀 Cómo ejecutar el proyecto

### Opción 1: Servidor local con VS Code (Recomendado)

Para asegurar que las peticiones asíncronas de la Fetch API funcionen sin bloqueos de seguridad del navegador:

1. Abre la carpeta `Semana_5` en Visual Studio Code.
2. Asegúrate de tener instalada la extensión **Live Server**.
3. Haz clic derecho sobre `Index.html` y selecciona **Open with Live Server**.
4. La aplicación se abrirá en `http://127.0.0.1:5500/Index.html`.

### Opción 2: Versión publicada en GitHub Pages

El proyecto se encuentra desplegado y disponible en línea a través de:

👉 [https://colivaressandia.github.io/Semana_5/](https://colivaressandia.github.io/DesarrolloFrontend1/Semana_5/Index.html)

---

## 🌐 Compatibilidad

Probado y verificado en los siguientes navegadores modernos:

| Navegador | Versión | Estado |
|-----------|---------|--------|
| Google Chrome | Última versión estable | ✅ Funcional |
| Mozilla Firefox | Última versión estable | ✅ Funcional |
| Microsoft Edge | Última versión estable | ✅ Funcional |

---

## 📸 Capturas de pantalla

### 1. Catálogo en estado inicial (en reposo)

<img width="1906" height="1018" alt="01-catalogo-reposo" src="https://github.com/user-attachments/assets/c737bd6a-0e76-46af-8993-654300b97792" />



### 2. Catálogo con efecto hover activo (Evento mouseover)

<img width="1875" height="1004" alt="02-catalogo-hover" src="https://github.com/user-attachments/assets/ae7983ef-602d-445d-b8ca-f244edcdab38" />



### 3. Carrito interactivo con productos agregados (Manipulación del DOM)

<img width="1910" height="1016" alt="03-carrito-interactivo" src="https://github.com/user-attachments/assets/b9a60e9a-0f64-40ba-aff9-1f1d0b842684" />



### 4. Ofertas Gamer cargadas mediante Fetch API

<img width="1916" height="1023" alt="04-fetch-api-ofertas" src="https://github.com/user-attachments/assets/07f9dda6-06c8-411b-b364-8aad5b83125c" />



### 5. Validación dinámica del formulario de suscripción (Evento submit)

<img width="1917" height="1007" alt="05-formulario-validacion" src="https://github.com/user-attachments/assets/2726bf4b-3fac-4b91-88b3-0778802749c0" />



### 6. Verificación de compatibilidad en Google Chrome

<img width="1917" height="1031" alt="06-navegador-chrome" src="https://github.com/user-attachments/assets/6501c96b-e5f2-49dc-82c8-f8b4da71a9e8" />



### 7. Verificación de compatibilidad en Microsoft Edge

<img width="1917" height="1007" alt="07-navegador-edge" src="https://github.com/user-attachments/assets/479b5f7c-0a94-45b4-8767-3f665b4690f8" />



### 8. Verificación de compatibilidad en Mozilla Firefox

<img width="1917" height="1027" alt="08-navegador-firefox" src="https://github.com/user-attachments/assets/f736fb05-86ce-439b-821c-260a6ae7f75b" />


---

## 🧩 Cómo funciona el código

El script principal (`js/main.js`) inicia su ejecución únicamente cuando el documento HTML ha sido parseado en su totalidad:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    inicializarHoverTarjetas();   // Eventos mouseover y mouseout
    inicializarCarrito();         // Eventos click, createElement y appendChild
    inicializarFetchResenas();    // Fetch API con async/await y try/catch
    inicializarFormulario();      // Evento submit y validación dinámica
});
Cada bloque de código está contenido en funciones puras e independientes, garantizando modularidad, mantenibilidad y legibilidad.

📚 Referencias
MDN Web Docs — Manipulación del DOM

MDN Web Docs — Introducción a los eventos

MDN Web Docs — Fetch API

Bootstrap 5 — Documentación oficial

CheapShark API Documentation

PokéAPI Documentation

👤 Autor
Nombre: Cristián Olivares

Carrera: Analista Programador Computacional

Asignatura: Desarrollo Frontend I (PFY2201)

Institución: Duoc UC

GitHub: @Colivaressandia

📝 Licencia
Este proyecto ha sido desarrollado exclusivamente con fines formativos y académicos para la asignatura de Desarrollo Frontend I (PFY2201).
