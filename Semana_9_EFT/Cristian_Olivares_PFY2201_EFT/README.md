# Memory Card Games — EFT Semana 9

Tienda web gamer de consolas y accesorios desarrollada como Evaluación Final Transversal de
Desarrollo Frontend I (PFY2201). La aplicación combina HTML semántico, CSS,
JavaScript, Bootstrap 5 y componentes React.

## Enlaces

- Repositorio del curso: <https://github.com/Colivaressandia/DesarrolloFrontend1>
- Carpeta de entrega en el repositorio:
  <https://github.com/Colivaressandia/DesarrolloFrontend1/tree/main/Semana_9_EFT/Cristian_Olivares_PFY2201_EFT>
- URL de GitHub Pages al publicar esta carpeta:
  <https://colivaressandia.github.io/DesarrolloFrontend1/Semana_9_EFT/Cristian_Olivares_PFY2201_EFT/>

## Funcionalidades

- Catálogo original de consolas y accesorios, con fotografías reales, cargado
  desde `public/data/productos.json` mediante Fetch API.
- Tarjetas generadas dinámicamente con React a partir de los datos del catálogo.
- Búsqueda en tiempo real y filtro por categoría.
- Gestión del catálogo: agregar y quitar productos del estado de la aplicación,
  seleccionando entre las fotografías reales incluidas. Los cambios son de
  sesión y vuelven al catálogo inicial al recargar.
- Carrito con acumulación de unidades, eliminación, total y persistencia local.
- Formulario de contacto con validación de nombre, correo y mensaje. La confirmación
  es local; el proyecto no integra un servicio de envío.
- Validación visual por campo: mensajes accesibles de error y estado correcto al
  completar cada dato.
- Cancelación de solicitudes de catálogo al reintentar o desmontar el componente,
  mediante `AbortController`.
- Aviso visible si el navegador no permite leer o guardar el carrito en `localStorage`.
- Estados de carga, error, catálogo vacío, carrito vacío y resultados sin coincidencias.
- Diseño adaptable con componentes y utilidades de Bootstrap 5, Flexbox y CSS Grid.
- Fotografías y banners locales; no depende de servicios de imágenes externos.

## Gestión de estado

Los estados se agrupan según responsabilidad, sin duplicar valores derivados:

| Superficie | Estado |
|---|---|
| `useProductos` | Productos, indicador de carga y error de carga |
| `useCarrito` | Productos y cantidades del carrito, más el aviso de persistencia |
| `App` | Texto de búsqueda, categoría seleccionada y modo de administración |
| `Formulario` | Valores de los campos, errores, campos visitados y estado del envío |

Los totales y los identificadores del carrito se calculan a partir de sus
productos. La cantidad total de estados puede cambiar al extender las pantallas;
por eso se documentan aquí por responsabilidad y no con un número fijo.

## Tecnologías

- React 18 y Vite 5
- JavaScript ES Modules, Fetch API y Web Storage
- Bootstrap 5
- CSS 3
- `react-hot-toast`

## Estructura principal

```text
public/
  data/productos.json       # Datos iniciales del catálogo
  img/                      # Fotografías de consolas, accesorios y banners
src/
  components/               # Navbar, catálogo, tarjetas, carrito y contacto
  hooks/
    useProductos.js         # Fetch y estado del catálogo
    useCarrito.js           # Estado y persistencia del carrito
  App.jsx                   # Estado compartido y composición de la página
  main.jsx                  # Montaje de React e importación de Bootstrap
  styles.css                # Personalización visual y breakpoints
index.html                  # Documento HTML de entrada
```

## Requisitos

- Node.js 18 o posterior
- npm

## Instalación y ejecución

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir en el navegador.

## Compilación y vista previa

```bash
npm run build
npm run preview
```

El build se genera en `dist/`. Esa carpeta es reproducible y no es necesario
incluirla en el ZIP de entrega. Tampoco se deben incluir `node_modules/` ni
archivos ZIP generados.

## Publicación en GitHub Pages

Desde esta carpeta, `npm run deploy` compila el proyecto y publica `dist/` en
la ruta `Semana_9_EFT/Cristian_Olivares_PFY2201_EFT` de la rama `gh-pages`.
En la configuración **Settings → Pages** del repositorio, selecciona esa rama
y la raíz (`/`). El script no sube cambios a `main`: el código fuente también
debe incorporarse al repositorio para que el docente pueda revisarlo.

## Evidencias

Las evidencias corresponden a la versión EFT actual y se tomaron en escritorio
y móvil:

1. [Catálogo cargado con las fotografías originales](capturas/01-carga-dinamica.png).
2. [Carrito con dos unidades y total actualizado](capturas/02-carrito-funcionando.png).
3. [Estados condicionales: agregado al carrito y sin stock](capturas/03-renderizado-condicional.png).
4. [Búsqueda combinada con filtro de categoría](capturas/04-busqueda-categorias.png).
5. [Validación individual de los campos del formulario](capturas/05-formulario-validacion.png).
6. [Diseño adaptable en vista móvil](capturas/06-vista-movil.png).
7. [Formulario para administrar el catálogo](capturas/07-gestion-catalogo.png).
8. [Aviso cuando el navegador bloquea localStorage](capturas/08-error-localstorage.png).
9. [Notificación al agregar un producto al carrito](capturas/09-toast-agregar.png).

No se incluyen capturas de una publicación antigua como evidencia de esta EFT.
Cuando se publique esta versión, conviene añadir una captura de la URL final.

## Pruebas manuales recomendadas

1. Comprobar que las fotos reales de consolas, accesorios y banners se cargan.
2. Buscar un producto y combinar la búsqueda con distintas categorías.
3. Agregar el mismo producto dos veces y comprobar el contador y total del carrito.
4. Recargar la página y confirmar que el carrito se conserva.
5. Abrir **Administrar catálogo**, agregar un producto seleccionando su fotografía
   real y eliminarlo.
6. Enviar el formulario de contacto con campos vacíos, un correo inválido y datos
   válidos para revisar los mensajes de validación y confirmación.
7. Comprobar los indicadores `is-invalid` / `is-valid` y los mensajes asociados
   a cada campo del formulario.
8. Revisar el menú, las tarjetas, el carrito y el formulario en vista móvil y escritorio.

## Guion sugerido para el video de presentación

1. Presentar el objetivo de la tienda y recorrer su diseño responsivo.
2. Mostrar el catálogo de consolas y accesorios cargado desde JSON, una búsqueda
   y un filtro por categoría.
3. Explicar cómo `ProductList` recorre los productos y entrega cada elemento
   mediante props a `ProductCard`.
4. Mostrar la gestión de altas y bajas, el carrito y su persistencia.
5. Probar los errores y la confirmación del formulario de contacto.
6. Explicar brevemente `useProductos`, `useCarrito`, Bootstrap y la estructura
   de carpetas.

## Entrega

- Comparte el enlace del repositorio GitHub con el docente.
- Graba y entrega la presentación individual en formato MP4.
- Prepara el ZIP con el nombre solicitado por la pauta:
  `Cristian_Olivares_PFY2201_EFT_FRONT_END_I.zip`.
- Incluye este README y los recursos necesarios; excluye `node_modules/` y `dist/`.

## Control de versiones

Registra el avance con commits pequeños y descriptivos y verifica que el repositorio
contenga el código fuente, los recursos y las instrucciones de ejecución.
