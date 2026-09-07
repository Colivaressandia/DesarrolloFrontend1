# Memory Card Games - Actividad Formativa Semana 4

Proyecto correspondiente a la actividad formativa **"Utilizando Bootstrap 5 para el diseño responsivo"** de la asignatura **Desarrollo Frontend I (PFY2201)**.

El propósito de la actividad es construir una interfaz web responsiva, accesible y semántica mediante los componentes y utilidades del framework **Bootstrap 5**.

---

## 🚀 Enlaces del Proyecto

* **Repositorio en GitHub:** https://github.com/Colivaressandia/DesarrolloFrontend1/tree/main/Semana_4
* **Sitio Web Desplegado:** https://colivaressandia.github.io/DesarrolloFrontend1/Semana_4/

---

## 🛠️ Componentes de Bootstrap 5 Implementados

1. **Barra de Navegación (`Navbar`):**
   * Clase `.navbar-expand-lg` para mantener el menú expandido en escritorio y colapsarlo automáticamente con botón hamburguesa (`.navbar-toggler`) en pantallas menores a 992px.
   * Fijación superior con `.sticky-top`.
2. **Carrusel Interactivo (`Carousel`):**
   * Configuración de transición automática cada 3 segundos mediante el atributo `data-bs-interval="3000"`.
   * Botones de navegación anterior/siguiente e indicadores de diapositivas inferiores.
3. **Sistema de Cuadrículas (`Grid System`):**
   * Estructuración mediante contenedores (`.container`), filas (`.row`) y columnas (`.col-*`).
   * Distribución progresiva:
     * **Móviles (< 768px):** 1 columna (`.col-12`).
     * **Tablets (≥ 768px):** 2 columnas (`.col-md-6`).
     * **Escritorio (≥ 992px):** 3 columnas (`.col-lg-4`).
4. **Tarjetas de Contenido (`Cards`):**
   * Componentes `.card` organizados con imágenes (`.card-img-top`), insignias destacadas (`.badge`) y botones de acción.
5. **Accesibilidad y Semántica:**
   * Uso de etiquetas semánticas HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`).
   * Atributos `aria-label`, `aria-controls` y contrastes de color accesibles.

---

## 🌐 Compatibilidad de Navegadores Verificada

Probado y verificado en:
* Google Chrome (Chromium)
* Microsoft Edge (Chromium)
* Mozilla Firefox (Gecko)

---

## 📸 Evidencia de Adaptabilidad Responsiva

Las capturas de pantalla de validación se encuentran almacenadas en la carpeta `/capturas`:
* `captura-escritorio.png`: Resolución > 1200px (3 columnas).
* `captura-tablet.png`: Resolución 768px / iPad Mini (2 columnas).
* `captura-movil.png`: Resolución 390px / iPhone (1 columna y menú colapsado).

---

## 👤 Autor

* **Estudiante:** Cristian Olivares Sandia
* **Carrera:** Analista Programador Computacional
* **Asignatura:** Desarrollo Frontend I / PFY2201
