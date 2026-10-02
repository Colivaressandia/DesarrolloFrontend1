# 🎮 Memory Card Games — Semana 8 (React + useEffect + Custom Hooks)

Proyecto desarrollado para la **Actividad Sumativa de la Semana 8** de la asignatura **Desarrollo Frontend I (PFY2201)** de Duoc UC.

Esta entrega representa la **evolución del eCommerce construido en Semana 7**, incorporando:

- Carga dinámica de datos con **`useEffect` + Fetch API**
- **Custom hooks** (`useProductos`, `useCarrito`) para separar responsabilidades
- **Persistencia con localStorage** para el carrito
- **Renderizado condicional** en 6 casos distintos
- **Toasts** con `react-hot-toast` para feedback visual
- **Botón "Reintentar"** para recuperación de errores

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
| 📦 Repositorio GitHub | https://github.com/Colivaressandia/DesarrolloFrontend1/tree/main/Semana_8/Cristian_Olivares_PFY2201_Semana8 |
| 🌐 Despliegue público (GitHub Pages) | https://colivaressandia.github.io/DesarrolloFrontend1/Semana_8/Cristian_Olivares_PFY2201_Semana8/dist/ |

---

## 🚀 Tecnologías utilizadas

- **React 18** — Componentes funcionales y Hooks
- **Vite 5** — Empaquetador y servidor de desarrollo
- **JavaScript ES2022** — `async/await`, spread operator, destructuring
- **Fetch API** — Carga asíncrona del catálogo desde JSON
- **Hooks de React:** `useState`, `useEffect`, `useMemo`, `useCallback`
- **Custom Hooks:** `useProductos`, `useCarrito`
- **react-hot-toast** — Notificaciones (toasts)
- **localStorage** — Persistencia del carrito
- **CSS3** — Grid, flexbox, sticky, animaciones y media queries
- **Git + GitHub** — Control de versiones
- **GitHub Pages** — Despliegue

---

## 📁 Estructura del proyecto

```
Cristian_Olivares_PFY2201_Semana8/
│
├── public/
│   ├── data/
│   │   └── productos.json           # Catálogo cargado con Fetch API
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
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Carrusel.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── Beneficios.jsx
│   │   ├── Formulario.jsx
│   │   └── Footer.jsx
│   │
│   ├── hooks/                       # Custom Hooks (Semana 8)
│   │   ├── useProductos.js          # Fetch + estados de carga/error
│   │   └── useCarrito.js            # Carrito + localStorage
│   │
│   ├── App.jsx                      # Orquestador
│   ├── main.jsx
│   └── styles.css
│
├── dist/                            # Build para GitHub Pages
├── capturas/
├── index.html
├── package.json
├── vite.config.js
├── .nojekyll
├── .gitignore
└── README.md
```

---

## ✨ Funcionalidades implementadas

### 1. Carga dinámica con `useEffect` + Fetch API
Los productos se cargan asíncronamente desde `public/data/productos.json`. El custom hook `useProductos` encapsula el fetch, el manejo de errores (HTTP y red) y expone la función `recargar` para reintentar.

### 2. Custom Hooks (Semana 8)
- **`useProductos`** → encapsula fetch, estados de carga/error y reintentos.
- **`useCarrito`** → encapsula el carrito, operaciones y persistencia.

### 3. Persistencia con localStorage
El carrito se guarda automáticamente en `localStorage`. Al recargar la página o cerrarla y volver a abrirla, los productos siguen ahí.

### 4. Gestión de estados con `useState`
8 estados en total:
- `productos`, `cargando`, `error` (en `useProductos`)
- `cart` (en `useCarrito`)
- `busqueda`, `categoria` (en `App`)
- `nombre`, `email`, `mensaje` (en `Formulario`)

### 5. Renderizado condicional en 6 casos

| Caso | Condición | Resultado |
|---|---|---|
| Carga | `cargando === true` | "⏳ Cargando productos..." |
| Error | `error !== null` | Mensaje rojo + botón "🔄 Reintentar" |
| Carrito vacío | `items.length === 0` | "Tu carrito está vacío." |
| Sin stock | `stock === 0` | Botón deshabilitado "Sin stock" |
| En carrito | `enCarrito === true` | Botón cyan "✓ En el carrito" |
| Sin resultados | `productosFiltrados.length === 0` | "🔍 No encontramos productos..." |

### 6. Botón "Reintentar"
Si el fetch falla, aparece un botón que vuelve a ejecutar la carga sin recargar la página. Demuestra manejo robusto de errores.

### 7. Notificaciones con `react-hot-toast`
- **Agregar al carrito** → `✅ [Producto] agregado al carrito`
- **Eliminar producto** → `🗑️ [Producto] eliminado del carrito`
- **Vaciar carrito** → `🧹 Carrito vaciado`

### 8. Búsqueda y filtros combinados
`useMemo` combina el término de búsqueda **y** la categoría seleccionada.

### 9. Carrito de compras
- Agregar con acumulación de cantidades.
- Eliminar individualmente con ✕.
- Vaciar completamente.
- Contador reactivo en el navbar.
- Total calculado con `useMemo`.

---

## 🔄 Cambios respecto a la Semana 7

| Aspecto | Semana 7 | Semana 8 |
|---|---|---|
| **Datos** | `import` estático de `productos.js` | `fetch` desde `public/data/productos.json` |
| **Carga asíncrona** | ❌ No existía | ✅ `useEffect` + estados de carga/error |
| **Custom Hooks** | ❌ No existían | ✅ `useProductos` y `useCarrito` |
| **Persistencia** | ❌ Carrito se perdía al recargar | ✅ `localStorage` |
| **Botón producto** | 2 estados | **3 estados** (+ "✓ En el carrito") |
| **Feedback visual** | Sin notificaciones | ✅ Toasts |
| **Manejo de errores** | ❌ No existía | ✅ `try/catch` + botón "Reintentar" |
| **Renderizado condicional** | 4 casos | **6 casos** |

---

## 📋 Cumplimiento de la pauta Semana 8

| Criterio | Pts | Estado | Dónde se cumple |
|---|---|---|---|
| **1. useState** (catálogo, carrito, interactivo) | 25 | ✅ | 8 estados distribuidos en hooks y componentes |
| **2. useEffect** (carga dinámica) | 20 | ✅ | `useProductos` con fetch + `cargar` recargable |
| **3. Renderizado condicional** | 20 | ✅ | 6 casos + toasts + botón "Reintentar" |
| **4. Estructura y buenas prácticas** | 15 | ✅ | Custom hooks + JSDoc + sin duplicación |
| **5. GitHub + gh-pages** | 20 | ✅ | Repo público + deploy funcionando |

---

## 📸 Capturas de pantalla

### 01 — Carga dinámica con Fetch API
`useEffect` ejecutando el `fetch` al JSON. En DevTools se observa `productos.json` con status **200** e **Initiator: App.jsx** (el propio `useEffect`).
![Carga dinámica](capturas/s8-01-carga-dinamica.png)

### 02 — Carrito funcionando
Productos agregados con cantidades acumuladas, subtotales y total calculado.
![Carrito](capturas/s8-02-carrito-funcionando.png)

### 03 — Renderizado condicional
Los tres estados del botón: **"✓ En el carrito"**, **"Agregar al carrito"** y **"Sin stock"**.
![Renderizado condicional](capturas/s8-03-renderizado-condicional.png)

### 04 — Búsqueda y filtros
Búsqueda en tiempo real: escribiendo "consola" se filtran las 3 consolas.
![Búsqueda](capturas/s8-04-busqueda-categorias.png)

### 05 — Validación del formulario
Mensaje de advertencia cuando el nombre es muy corto.
![Validación](capturas/s8-05-formulario-validacion.png)

### 06 — Vista móvil responsiva
Diseño adaptado a dispositivos móviles (Samsung Galaxy A55 - 360×800).
![Vista móvil](capturas/s8-06-vista-movil.png)

### 07 — Notificación toast al agregar al carrito
Feedback visual inmediato mediante `react-hot-toast` cuando el usuario agrega un producto.
![Toast](capturas/s8-07-toast.png)

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
```

### Otros comandos

```bash
npm run build      # Genera el build de producción en /dist
npm run preview    # Sirve el build localmente
```

---

## 🧪 Pruebas realizadas

| Prueba | Resultado |
|---|---|
| Carga de productos con `useEffect` | ✅ |
| Estado "Cargando productos..." visible | ✅ |
| Botón "Reintentar" tras error | ✅ |
| Agregar producto al carrito | ✅ |
| Toast al agregar | ✅ |
| Botón cambia a "✓ En el carrito" | ✅ |
| Acumular cantidad al repetir producto | ✅ |
| Toast al eliminar | ✅ |
| Persistencia del carrito con localStorage | ✅ |
| Toast al vaciar carrito | ✅ |
| Búsqueda en tiempo real | ✅ |
| Filtro por categoría | ✅ |
| Renderizado "Sin stock" | ✅ |
| Validación de formulario | ✅ |
| Vista responsive (móvil) | ✅ |
| Deploy en GitHub Pages | ✅ |

**Navegadores probados:** Chrome 120+, Edge 120+, Firefox 121+ sin errores en consola.

---

## 🎯 Mejoras aplicadas respecto a la Semana 7

- ✅ **Custom hook `useProductos`** — encapsula fetch + estados de carga/error
- ✅ **Custom hook `useCarrito`** — encapsula estado + operaciones + persistencia
- ✅ **Persistencia con localStorage** — el carrito sobrevive al recargar
- ✅ **Toasts con react-hot-toast** — feedback visual inmediato
- ✅ **Botón "Reintentar"** — recuperación de errores de red
- ✅ **3 estados del botón** — Agregar / En el carrito / Sin stock
- ✅ **JSDoc en todos los componentes** — documentación profesional

---

## 📄 Licencia

Proyecto desarrollado con fines académicos para la asignatura **Desarrollo Frontend I (PFY2201)** de Duoc UC. Todos los recursos gráficos son de uso libre o de elaboración propia.

---

**© 2026 Cristián Olivares Sandia — Duoc UC**
