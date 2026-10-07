/* =========================================================================
   main.js — Memory Card Games
   Semana 6 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   ÍNDICE:
     1.  Estado global
     2.  Referencias al DOM
     3.  Inicializadores (punto de entrada)
     4.  Catálogo: Fetch API + renderizado dinámico con createElement
     5.  Búsqueda y filtros por categoría
     6.  Carrito: agregar, eliminar, vaciar
     7.  Efectos interactivos (hover)
     8.  Validación del formulario de contacto
     9.  Utilidades
   ========================================================================= */

'use strict';

/* =========================================================================
   1. ESTADO GLOBAL
   ========================================================================= */
let productosGlobal = [];  // Lista completa (para filtrar sin re-fetch)
let carrito         = [];  // Productos del carrito con cantidad

/* =========================================================================
   2. REFERENCIAS AL DOM
   ========================================================================= */
const contenedorProductos = document.getElementById('contenedor-productos');
const estadoProductos     = document.getElementById('estado-productos');
const formBusqueda        = document.getElementById('form-busqueda');
const inputBusqueda       = document.getElementById('input-busqueda');
const listaCarrito        = document.getElementById('lista-carrito');
const badgeContador       = document.getElementById('badge-contador');
const btnVaciarCarrito    = document.getElementById('btn-vaciar-carrito');
const formularioContacto  = document.getElementById('formulario-contacto');
const mensajeFormulario   = document.getElementById('mensaje-formulario');

/* =========================================================================
   3. INICIALIZADORES (punto de entrada único)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  inicializarCatalogo();
  inicializarBusqueda();
  inicializarCarrito();
  inicializarEfectosTarjetas();
  inicializarFormulario();
});

/* =========================================================================
   4. CATÁLOGO: FETCH API + RENDERIZADO DINÁMICO CON DOM
   ========================================================================= */

/**
 * Descarga los productos desde el JSON local y los renderiza.
 * Distingue entre errores de red, errores HTTP y respuestas vacías.
 */
async function inicializarCatalogo() {
  try {
    const respuesta = await fetch('assets/data/productos.json');

    // Error HTTP (404, 500, etc.)
    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
    }

    productosGlobal = await respuesta.json();

    // Respuesta correcta pero sin datos
    if (productosGlobal.length === 0) {
      mostrarMensajeEstado('📦 El catálogo está vacío por ahora.', 'warning');
      return;
    }

    renderizarProductos(productosGlobal);
    ocultarMensajeEstado();

  } catch (error) {
    console.error('❌ Error al cargar productos:', error);

    // Diferenciamos el mensaje según el tipo de error
    const mensaje = error.message.includes('HTTP')
      ? '🛠️ Hubo un problema con el servidor. Intenta nuevamente en unos minutos.'
      : '📡 No pudimos conectar. Revisa tu conexión a internet.';

    mostrarMensajeEstado(mensaje, 'danger');
  }
}

/**
 * Renderiza la lista completa de productos reemplazando el contenido actual.
 * @param {Array<Object>} lista - Productos a mostrar.
 */
function renderizarProductos(lista) {
  contenedorProductos.innerHTML = '';  // Limpieza rápida del contenedor

  if (lista.length === 0) {
    mostrarMensajeEstado('🔍 No encontramos productos con ese criterio.', 'warning');
    return;
  }

  // Fragmento para mejor rendimiento: un solo appendChild al final
  const fragmento = document.createDocumentFragment();

  lista.forEach(producto => {
    fragmento.appendChild(crearCardProducto(producto));
  });

  contenedorProductos.appendChild(fragmento);
  ocultarMensajeEstado();
}

/**
 * Crea el nodo completo de una tarjeta de producto usando createElement.
 * @param {Object} producto - Datos del producto.
 * @returns {HTMLElement} Columna Bootstrap con la card del producto.
 */
function crearCardProducto(producto) {
  // Columna responsiva
  const columna = document.createElement('div');
  columna.className = 'col-12 col-md-6 col-lg-4';

  // Card principal
  const card = document.createElement('article');
  card.className = 'card tarjeta-producto h-100 text-light shadow-sm';

  // Imagen
  const imagen = document.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.loading = 'lazy';
  imagen.className = 'card-img-top';

  // Body
  const body = document.createElement('div');
  body.className = 'card-body d-flex flex-column';

  // Encabezado (nombre + badge)
  const encabezado = document.createElement('div');
  encabezado.className = 'd-flex justify-content-between align-items-center mb-2';

  const titulo = document.createElement('h3');
  titulo.className = 'card-title h5 mb-0 nombre-producto';
  titulo.textContent = producto.nombre;

  const badge = document.createElement('span');
  badge.className = 'badge bg-info text-dark';
  badge.textContent = producto.badge;

  encabezado.appendChild(titulo);
  encabezado.appendChild(badge);

  // Descripción
  const descripcion = document.createElement('p');
  descripcion.className = 'card-text text-secondary flex-grow-1';
  descripcion.textContent = producto.descripcion;

  // Footer con precio + botón
  const footer = document.createElement('div');
  footer.className = 'd-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary';

  const precio = document.createElement('span');
  precio.className = 'fs-5 fw-bold text-success precio-producto';
  precio.textContent = `$${formatearPrecio(producto.precio)}`;

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'btn btn-info text-dark btn-sm fw-bold btn-comprar';
  boton.textContent = 'Comprar';
  boton.dataset.id = producto.id;
  boton.setAttribute('aria-label', `Agregar ${producto.nombre} al carrito`);
  boton.addEventListener('click', manejarAgregarAlCarrito);

  footer.appendChild(precio);
  footer.appendChild(boton);

  // Ensamblado final
  body.appendChild(encabezado);
  body.appendChild(descripcion);
  body.appendChild(footer);
  card.appendChild(imagen);
  card.appendChild(body);
  columna.appendChild(card);

  return columna;
}

/* =========================================================================
   5. BÚSQUEDA Y FILTROS POR CATEGORÍA
   ========================================================================= */

/**
 * Registra el evento submit del formulario de búsqueda y
 * los filtros por categoría del navbar.
 */
function inicializarBusqueda() {
  // Evento submit (buscador)
  formBusqueda.addEventListener('submit', manejarBusqueda);

  // Filtros de categoría (links con data-categoria)
  document.querySelectorAll('[data-categoria]').forEach(enlace => {
    enlace.addEventListener('click', manejarFiltroCategoria);
  });
}

/**
 * Filtra los productos por nombre o categoría desde el buscador.
 * @param {Event} evento - Evento submit.
 */
function manejarBusqueda(evento) {
  evento.preventDefault();

  const termino = inputBusqueda.value.trim().toLowerCase();

  if (termino === '') {
    renderizarProductos(productosGlobal);
    return;
  }

  const filtrados = productosGlobal.filter(producto =>
    producto.nombre.toLowerCase().includes(termino) ||
    producto.categoria.toLowerCase().includes(termino)
  );

  renderizarProductos(filtrados);
}

/**
 * Filtra los productos por la categoría asociada al enlace del navbar.
 * Reutiliza renderizarProductos() y desplaza suavemente hacia el catálogo.
 * @param {Event} evento - Evento click del enlace de categoría.
 */
function manejarFiltroCategoria(evento) {
  evento.preventDefault(); // Evitamos el salto brusco de ancla

  const categoria = evento.currentTarget.dataset.categoria;

  // "todas" muestra el catálogo completo; cualquier otra filtra por categoría
  const filtrados = categoria === 'todas'
    ? productosGlobal
    : productosGlobal.filter(p => p.categoria === categoria);

  renderizarProductos(filtrados);

  // Desplazamiento suave hacia la sección del catálogo
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });

  // Feedback visual del enlace activo
  marcarCategoriaActiva(evento.currentTarget);
}

/**
 * Quita el estado "active" de todos los links de categoría
 * y lo aplica al enlace seleccionado.
 * @param {HTMLElement} enlaceSeleccionado
 */
function marcarCategoriaActiva(enlaceSeleccionado) {
  document.querySelectorAll('[data-categoria]').forEach(enlace => {
    enlace.classList.remove('active', 'text-info');
  });
  enlaceSeleccionado.classList.add('active', 'text-info');
}

/* =========================================================================
   6. CARRITO: AGREGAR / ELIMINAR / VACIAR
   ========================================================================= */

/**
 * Registra los eventos relacionados al carrito.
 */
function inicializarCarrito() {
  btnVaciarCarrito.addEventListener('click', vaciarCarrito);
}

/**
 * Maneja el click del botón "Comprar" de cada tarjeta.
 * @param {Event} evento
 */
function manejarAgregarAlCarrito(evento) {
  const id = Number(evento.currentTarget.dataset.id);
  const producto = productosGlobal.find(p => p.id === id);
  if (producto) agregarAlCarrito(producto);
}

/**
 * Agrega un producto al carrito. Si ya existe, incrementa su cantidad
 * (evitando duplicados como sugirió el evaluador de la Semana 5).
 * @param {Object} producto
 */
function agregarAlCarrito(producto) {
  const existente = carrito.find(item => item.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  animarBadge();
}

/**
 * Elimina por completo un producto del carrito por su id.
 * @param {number} id
 */
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

/**
 * Vacía todo el carrito.
 */
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

/**
 * Redibuja la lista del carrito y actualiza el contador del navbar.
 */
function actualizarCarrito() {
  // Contador
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  badgeContador.textContent = totalItems;

  // Limpiamos la lista
  listaCarrito.innerHTML = '';

  if (carrito.length === 0) {
    const vacio = document.createElement('li');
    vacio.className = 'list-group-item bg-dark text-secondary border-secondary text-center';
    vacio.textContent = 'Tu carrito está vacío.';
    listaCarrito.appendChild(vacio);
    return;
  }

  // Fragmento con todos los ítems
  const fragmento = document.createDocumentFragment();

  carrito.forEach(item => {
    fragmento.appendChild(crearItemCarrito(item));
  });

  listaCarrito.appendChild(fragmento);
}

/**
 * Crea el nodo <li> de un ítem del carrito, con botón de eliminación.
 * @param {Object} item
 * @returns {HTMLLIElement}
 */
function crearItemCarrito(item) {
  const li = document.createElement('li');
  li.className = 'list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center';

  // Info del producto
  const info = document.createElement('div');

  const nombre = document.createElement('strong');
  nombre.className = 'text-info d-block';
  nombre.textContent = item.nombre;

  const detalle = document.createElement('small');
  detalle.className = 'text-secondary';
  detalle.textContent = `${item.cantidad} x $${formatearPrecio(item.precio)}`;

  info.appendChild(nombre);
  info.appendChild(detalle);

  // Subtotal + botón eliminar
  const acciones = document.createElement('div');
  acciones.className = 'd-flex align-items-center gap-2';

  const subtotal = document.createElement('span');
  subtotal.className = 'badge bg-success';
  subtotal.textContent = `$${formatearPrecio(item.precio * item.cantidad)}`;

  const btnEliminar = document.createElement('button');
  btnEliminar.type = 'button';
  btnEliminar.className = 'btn btn-outline-danger btn-sm';
  btnEliminar.textContent = '✕';
  btnEliminar.setAttribute('aria-label', `Eliminar ${item.nombre} del carrito`);
  btnEliminar.addEventListener('click', () => eliminarDelCarrito(item.id));

  acciones.appendChild(subtotal);
  acciones.appendChild(btnEliminar);

  li.appendChild(info);
  li.appendChild(acciones);

  return li;
}

/* =========================================================================
   7. EFECTOS INTERACTIVOS: HOVER SOBRE TARJETAS
   ========================================================================= */

/**
 * Aplica eventos mouseover/mouseout a las tarjetas del catálogo.
 * Usa delegación de eventos para funcionar incluso con tarjetas
 * creadas dinámicamente después de la carga inicial.
 */
function inicializarEfectosTarjetas() {
  contenedorProductos.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.tarjeta-producto');
    if (card && !card.classList.contains('card-hover')) {
      card.classList.add('card-hover');
    }
  });

  contenedorProductos.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.tarjeta-producto');
    if (card) {
      card.classList.remove('card-hover');
    }
  });
}

/* =========================================================================
   8. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   ========================================================================= */

/**
 * Registra el evento submit del formulario de suscripción.
 */
function inicializarFormulario() {
  if (!formularioContacto) return;
  formularioContacto.addEventListener('submit', manejarEnvioFormulario);
}

/**
 * Valida nombre y email antes de mostrar el mensaje de éxito.
 * @param {Event} evento
 */
function manejarEnvioFormulario(evento) {
  evento.preventDefault();

  const nombre = document.getElementById('campo-nombre').value.trim();
  const email  = document.getElementById('campo-email').value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validaciones
  if (nombre.length < 3) {
    mostrarMensajeFormulario('⚠️ El nombre debe tener al menos 3 caracteres.', 'warning');
    return;
  }

  if (!regexEmail.test(email)) {
    mostrarMensajeFormulario('⚠️ Ingresa un correo electrónico válido.', 'warning');
    return;
  }

  mostrarMensajeFormulario(`✅ ¡Gracias, ${nombre}! Te suscribiste correctamente.`, 'success');
  formularioContacto.reset();
}

/**
 * Muestra un mensaje dentro del formulario de contacto.
 * @param {string} texto
 * @param {string} tipo - Clase Bootstrap (success, warning, danger)
 */
function mostrarMensajeFormulario(texto, tipo = 'info') {
  mensajeFormulario.className = `alert alert-${tipo} mt-3`;
  mensajeFormulario.textContent = texto;
}

/* =========================================================================
   9. UTILIDADES
   ========================================================================= */

/**
 * Formatea un número como precio chileno (con separadores de miles).
 * @param {number} valor
 * @returns {string}
 */
function formatearPrecio(valor) {
  return valor.toLocaleString('es-CL');
}

/**
 * Muestra el mensaje de estado del catálogo.
 * @param {string} texto
 * @param {string} tipo
 */
function mostrarMensajeEstado(texto, tipo = 'info') {
  estadoProductos.className = `alert alert-${tipo} text-center`;
  estadoProductos.textContent = texto;
  estadoProductos.classList.remove('d-none');
}

/**
 * Oculta el mensaje de estado del catálogo.
 */
function ocultarMensajeEstado() {
  estadoProductos.classList.add('d-none');
}

/**
 * Anima el badge del carrito al agregar un producto.
 */
function animarBadge() {
  badgeContador.classList.add('badge-pulse');
  setTimeout(() => badgeContador.classList.remove('badge-pulse'), 400);
}