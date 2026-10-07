# Memory Card Games - Actividad Formativa Semana 4

Proyecto correspondiente a la actividad formativa individual titulada **"Utilizando Bootstrap 5 para el diseño responsivo"** de la asignatura **Desarrollo Frontend I (PFY2201)**.

El propósito de esta actividad es estructurar una página web totalmente responsiva, semántica y accesible mediante la implementación directa del framework **Bootstrap 5** y sus componentes nativos.

---

## 🚀 Enlaces del Proyecto

* **Repositorio en GitHub:** https://github.com/Colivaressandia/DesarrolloFrontend1/tree/main/Semana_4
* **Sitio Web Desplegado (GitHub Pages):** https://colivaressandia.github.io/DesarrolloFrontend1/Semana_4/

---

## 📁 Estructura del Directorio

El proyecto está organizado de manera autónoma, almacenando todos los recursos de forma local para no depender de servidores o enlaces externos:

* `index.html`: Archivo principal configurado para despliegue directo en GitHub Pages.
* `Cristian_Olivares_PFY2201_Bootstrap_Semana4.html`: Archivo con la nomenclatura oficial requerida para la evaluación en plataforma AVA.
* `img/`: Directorio de recursos gráficos locales que almacena los 3 banners del carrusel y las 3 fotografías de productos.
* `capturas/`: Registro de evidencias de comportamiento responsivo en distintos dispositivos.
* `README.md`: Documentación técnica del proyecto.

---

## 🛠️ Componentes de Bootstrap 5 Implementados

1. **Barra de Navegación (`Navbar`):**
   * Construida con las clases `.navbar`, `.navbar-expand-lg`, `.bg-dark` y `.sticky-top`.
   * Cuenta con soporte responsivo completo mediante `.navbar-toggler` y `.collapse.navbar-collapse`, colapsando ordenadamente tras un menú hamburguesa en pantallas menores a 992px.

2. **Carrusel Interactivo (`Carousel`):**
   * Implementado mediante `.carousel.slide` y `data-bs-ride="carousel"`.
   * Transiciones automáticas configuradas exactamente a 3 segundos de intervalo mediante el atributo `data-bs-interval="3000"` en cada elemento `.carousel-item`.
   * Incorpora indicadores de navegación inferiores y controles direccionales anterior/siguiente.

3. **Sistema de Cuadrícula (`Grid System`):**
   * Estructurado mediante `.container`, `.row` y columnas responsivas progresivas.
   * Breakpoints nativos sincronizados entre código y diseño:
     * **Dispositivos móviles (< 768px):** 1 columna (`.col-12`).
     * **Tablets (≥ 768px y < 992px):** 2 columnas (`.col-md-6`).
     * **Escritorio (≥ 992px):** 3 columnas (`.col-lg-4`).

4. **Tarjetas de Contenido (`Cards`):**
   * Uso de componentes `.card`, `.card-body`, `.card-title` y `.card-text` para el catálogo de productos.
   * Integración de insignias `.badge`, botones con estilos `.btn.btn-outline-info` y `.btn.btn-info`, y alineación flexible con `.h-100` para uniformidad visual.
   * Recursos gráficos vinculados localmente desde el directorio `img/` con `.card-img-top` y fondo transparente para correcta integración en tema oscuro.

5. **Buenas Prácticas, Semántica y Accesibilidad:**
   * Marcado semántico en HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   * Uso de etiquetas accesibles mediante atributos `aria-label`, `aria-controls`, `aria-expanded` y textos alternativos `alt` detallados en todas las imágenes.
   * Código ordenado y seccionado con comentarios explicativos.

---

## 🌐 Compatibilidad de Navegadores Verificada

El sitio fue probado y verificado en distintos motores de navegación:
* Google Chrome (Chromium)
* Microsoft Edge (Chromium)
* Mozilla Firefox (Gecko)

---

## 📸 Evidencias Responsivas

Las capturas de pantalla de validación se encuentran en la carpeta `capturas/`:
* `captura-escritorio.png`: Visualización en resolución amplia (menú horizontal y catálogo a 3 columnas).
* `captura-tablet.png`: Emulación iPad Mini a 768px (catálogo distribuido a 2 columnas con `col-md-6`).
* `captura-movil.png`: Emulación dispositivo móvil a 390px (navbar colapsada en botón hamburguesa y diseño vertical a 1 columna).

---

## 👤 Autor

* **Estudiante:** Cristian Olivares Sandia
* **Carrera:** Analista Programador Computacional
* **Asignatura:** Desarrollo Frontend I (PFY2201)
