# 🎮 Memory Card Games — Semana 8 (React + useEffect)

Proyecto desarrollado para la **Actividad Sumativa de la Semana 8** de la asignatura **Desarrollo Frontend I (PFY2201)** de Duoc UC.

Esta entrega representa la **evolución del eCommerce construido en Semana 7**, incorporando carga dinámica de datos con **`useEffect` + Fetch API**, gestión avanzada de estados con **`useState`**, y **renderizado condicional** para mejorar la interacción del usuario.

---

## 👤 Autor

- **Nombre:** Cristián Olivares Sandia
- **Asignatura:** Desarrollo Frontend I (PFY2201)
- **Semana:** 8 — Mejorando funcionalidades clave en el eCommerce con React
- **Carrera:** Analista Programador Computacional
- **Docente:** Enrique Urra
- **Fecha de entrega:** Octubre 2026

---

## 🔗 Enlaces del proyecto

| Recurso | URL |
|---|---|
| 📦 Repositorio GitHub | https://github.com/Colivaressandia/DesarrolloFrontend1/tree/main/Semana_8 |
| 🌐 Despliegue público (GitHub Pages) | https://colivaressandia.github.io/DesarrolloFrontend1/Semana_8/ |

---

## 🚀 Tecnologías utilizadas

- **React 18** — Componentes funcionales y Hooks
- **Vite 5** — Empaquetador y servidor de desarrollo
- **JavaScript ES2022** — `async/await`, spread operator, destructuring
- **Fetch API** — Carga asíncrona del catálogo desde JSON
- **Hooks de React:** `useState`, `useEffect`, `useMemo`
- **CSS3** — Grid, flexbox, sticky, animaciones y media queries
- **Git + GitHub** — Control de versiones
- **GitHub Pages** (rama `gh-pages`) — Despliegue

---

## 📁 Estructura del proyecto

```
Cristian_Olivares_PFY2201_Semana8/
│
├── public/                          # Archivos estáticos servidos tal cual
│   ├── data/
│   │   └── productos.json           # Catálogo cargado con Fetch API (NUEVO)
│   ├── img/                         # Imágenes de productos y banners
│   │   ├── switch2.png
│   │   ├── ps5pro.png
│   │   ├── xbox.png
│   │   ├── teclado.png
│   │   ├── mouse.png
│   │   ├── audifonos.png
│   │   ├── banner1.jpg
│   │   ├── banner2.jpg
│   │   └── banner3.jpg
│   ├── favicon.ico
│   └── favicon-32x32.png
│
├── src/
│   ├── components/                  # Componentes funcionales reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Carrusel.jsx
│   │   ├── ProductList.jsx          # Pasa `idsEnCarrito` a cada card
│   │   ├── ProductCard.jsx          # Botón con renderizado condicional (3 estados)
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── Beneficios.jsx
│   │   ├── Formulario.jsx
│   │   └── Footer.jsx
│   │
│   ├── App.jsx                      # Componente raíz con useEffect + fetch
│   ├── main.jsx                     # Punto de entrada React
│   └── styles.css                   # Estilos globales
│
├── capturas/                        # Evidencias de la entrega
│   ├── s8-01-carga-dinamica.png
│   ├── s8-02-carrito-funcionando.png
│   ├── s8-03-renderizado-condicional.png
│   ├── s8-04-busqueda-categorias.png
│   ├── s8-05-formulario-validacion.png
│   └── s8-06-vista-movil.png
│
├── index.html
├── package.json
├── vite.config.js
├── .nojekyll
├── .gitignore
└── README.md
```

---

## ✨ Funcionalidades implementadas

### 1. Carga dinámica de productos con Fetch API y useEffect
Los productos se cargan de forma asíncrona desde `public/data/productos.json` mediante **`useEffect` + `fetch`**. El estado `cargando` muestra un mensaje mientras se obtienen los datos, y el estado `error` maneja excepciones de red o HTTP.

```jsx
useEffect(() => {
  const cargarProductos = async () => {
    try {
      setCargando(true);
      const url = `${import.meta.env.BASE_URL}data/productos.json`;
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      const data = await respuesta.json();
      setProductos(data.map(...));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };
  cargarProductos();
}, []);
```

### 2. Gestión de estados con useState
La aplicación gestiona **8 estados** diferentes con `useState`:

| Estado | Tipo | Propósito |
|---|---|---|
| `productos` | Array | Catálogo cargado desde JSON |
| `cargando` | Boolean | Mostrar mensaje mientras carga |
| `error` | String \| null | Almacenar error de fetch |
| `cart` | Array | Productos del carrito |
| `busqueda` | String | Término de búsqueda |
| `categoria` | String | Categoría seleccionada |
| `nombre` (Formulario) | String | Campo del formulario |
| `email` (Formulario) | String | Campo del formulario |

### 3. Renderizado condicional en 5 lugares

| Lugar | Condición | Resultado |
|---|---|---|
| **Carga** | `cargando === true` | Mensaje "⏳ Cargando productos..." con animación |
| **Error** | `error !== null` | Mensaje rojo con detalle del error |
| **Carrito** | `items.length === 0` | "Tu carrito está vacío." |
| **Stock** | `producto.stock === 0` | Botón gris deshabilitado "Sin stock" |
| **Botón producto** | `enCarrito === true` | Botón cyan "✓ En el carrito" |
| **Sin resultados** | `productosFiltrados.length === 0` | "🔍 No encontramos productos..." |

### 4. Botón dinámico del producto (renderizado condicional)
El botón cambia de **estado visual y texto** según el estado del producto:

- 🟦 **"Agregar al carrito"** → producto disponible, no está en el carrito
- 🟩 **"✓ En el carrito"** → producto ya agregado (estilo cyan sólido)
- ⬛ **"Sin stock"** → producto con `stock === 0` (deshabilitado)

### 5. Carrito de compras completo
- **Agregar productos**: si ya existe, incrementa cantidad; si no, lo agrega.
- **Eliminar individualmente** con botón ✕.
- **Vaciar carrito** completo.
- **Contador** en el navbar actualizado reactivamente.
- **Total** calculado con `useMemo`.

### 6. Búsqueda y filtros combinados
`useMemo` combina la búsqueda por término **y** el filtro por categoría en un solo array filtrado. Cuando un producto entra al carrito, su botón cambia automáticamente a "✓ En el carrito" gracias a un `Set` de IDs memoizado.

### 7. Renderizado automático por React
No hay manipulación manual del DOM. Todos los cambios de estado se reflejan automáticamente en la UI.

---

## 🔄 Cambios respecto a la Semana 7

| Aspecto | Semana 7 | Semana 8 |
|---|---|---|
| **Datos de productos** | `import { productos }` (estático) | `fetch()` dentro de `useEffect` (dinámico) |
| **Ubicación de datos** | `src/data/productos.js` | `public/data/productos.json` |
| **Carga asíncrona** | ❌ No existía | ✅ Con estados `cargando` y `error` |
| **Botón producto** | 2 estados (Agregar / Sin stock) | **3 estados** (+ "✓ En el carrito") |
| **Manejo de errores** | ❌ No existía | ✅ `try/catch` + renderizado condicional |
| **Estado del carrito** | ✅ Ya existía | ✅ Optimizado con `Set` de IDs |
| **Renderizado condicional** | 4 casos | **6 casos** (carga, error, carrito, stock, botón, sin resultados) |
| **`useEffect`** | Solo en Carrusel | ✅ En App para fetch |

---

## 📋 Cumplimiento de la pauta Semana 8

| Criterio de evaluación | Pts | Estado | Dónde se cumple |
|---|---|---|---|
| **1. useState** (catálogo, carrito, interactivo) | 25 | ✅ | 8 estados en `App.jsx` + Formulario |
| **2. useEffect** (carga dinámica) | 20 | ✅ | `useEffect` con fetch a `productos.json` |
| **3. Renderizado condicional** | 20 | ✅ | 6 casos: carga, error, carrito vacío, stock, botón dinámico, sin resultados |
| **4. Estructura y buenas prácticas** | 15 | ✅ | 9 componentes, comentarios JSDoc, sin duplicación |
| **5. GitHub + gh-pages** | 20 | ✅ | Repo público + despliegue funcionando |

---

## 📸 Capturas de pantalla

### 01 — Carga dinámica con Fetch API
`useEffect` ejecutando el `fetch` al JSON. En DevTools se observa `productos.json` con status **200** e **Initiator: App.jsx:45** (el propio `useEffect`).
![Carga dinámica](capturas/s8-01-carga-dinamica.png)

### 02 — Carrito funcionando
Productos agregados con cantidades acumuladas, subtotales y total calculado.
![Carrito](capturas/s8-02-carrito-funcionando.png)

### 03 — Renderizado condicional en acción
Los tres estados del botón visibles simultáneamente: **"✓ En el carrito"** (Switch 2), **"Agregar al carrito"** (PS5, Xbox, Teclado, Mouse) y **"Sin stock"** (Audífonos 7.1).
![Renderizado condicional](capturas/s8-03-renderizado-condicional.png)

### 04 — Búsqueda y filtro por categoría
Búsqueda en tiempo real: escribiendo "consola" se filtran las 3 consolas del catálogo.
![Búsqueda](capturas/s8-04-busqueda-categorias.png)

### 05 — Validación del formulario
Renderizado condicional mostrando el mensaje de advertencia cuando el nombre es muy corto.
![Validación](capturas/s8-05-formulario-validacion.png)

### 06 — Vista móvil responsiva
Diseño adaptado a dispositivos móviles (Samsung Galaxy A55 - 360×800).
![Vista móvil](capturas/s8-06-vista-movil.png)

---

## ⚙️ Cómo ejecutar el proyecto localmente

### Requisitos
- Node.js 18+ (recomendado 20+)
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Colivaressandia/DesarrolloFrontend1.git
cd DesarrolloFrontend1/Semana_8/Cristian_Olivares_PFY2201_Semana8

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
# → http://localhost:5173/DesarrolloFrontend1/Semana_8/
```

### Otros comandos

```bash
npm run build      # Genera el build de producción en /dist
npm run preview    # Sirve el build localmente
npm run deploy     # Despliega a GitHub Pages (rama gh-pages)
```

---

## 🧪 Pruebas realizadas

| Prueba | Resultado |
|---|---|
| Carga de productos desde JSON con `useEffect` | ✅ |
| Estado "Cargando productos..." visible | ✅ |
| Manejo de error cuando JSON no existe | ✅ |
| Agregar producto al carrito | ✅ |
| Botón cambia a "✓ En el carrito" | ✅ |
| Acumular cantidad al repetir producto | ✅ |
| Eliminar producto individual | ✅ |
| Vaciar carrito | ✅ |
| Contador del navbar actualizado | ✅ |
| Total calculado correctamente | ✅ |
| Búsqueda en tiempo real | ✅ |
| Filtro por categoría | ✅ |
| Renderizado "Sin stock" | ✅ |
| Validación de formulario (warning) | ✅ |
| Validación de formulario (éxito) | ✅ |
| Vista responsive (móvil) | ✅ |

**Navegadores probados:** Chrome 120+, Edge 120+, Firefox 121+ sin errores en consola.

---

## 🎯 Mejoras aplicadas respecto a la Semana 7

- ✅ **Migración del catálogo** de `src/data/productos.js` a `public/data/productos.json`
- ✅ **Carga asíncrona** con `useEffect` + `fetch` + `async/await`
- ✅ **Estados de carga y error** con renderizado condicional
- ✅ **Manejo de errores diferenciado**: HTTP vs conexión
- ✅ **Botón dinámico del producto** con 3 estados visuales
- ✅ **Set de IDs en el carrito** (`idsEnCarrito`) para consulta O(1)
- ✅ **Simulación de latencia** de red (800 ms) para evidenciar el estado "Cargando..."

---

## 📄 Licencia

Proyecto desarrollado con fines académicos para la asignatura **Desarrollo Frontend I (PFY2201)** de Duoc UC. Todos los recursos gráficos son de uso libre o de elaboración propia.

---

## 📝 Comentarios finales

Esta entrega representa la **evolución del proyecto Memory Card Games** desde la versión estática en React (Semana 7) hacia una aplicación con **carga de datos asíncrona** y **gestión avanzada de estados**.

Se aplicaron buenas prácticas de:

- **Asincronía**: `async/await` + `try/catch` para manejar el fetch.
- **Renderizado condicional**: 6 casos distintos según el estado.
- **Rendimiento**: `useMemo` para evitar recálculos y `Set` para consultas O(1).
- **UX**: feedback visual en cada acción (cargando, error, "en el carrito").
- **Modularidad**: componentes con responsabilidades únicas.
- **Compatibilidad**: rutas adaptadas a GitHub Pages con `import.meta.env.BASE_URL`.

---

**© 2026 Cristián Olivares Sandia — Duoc UC**