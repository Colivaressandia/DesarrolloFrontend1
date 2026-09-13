// =============================================================================
// MEMORY CARD GAMES - MANIPULACIÓN DEL DOM E INTERACTIVIDAD (SEMANA 5)
// Desarrollo Frontend I (PFY2201)
// -----------------------------------------------------------------------------
// Este script implementa:
//   1. Eventos mouseover / mouseout sobre las tarjetas del catálogo.
//   2. Evento click para agregar productos al carrito (manipulación del DOM).
//   3. Evento submit con validación en el formulario de contacto.
//   4. Fetch API pública (CheapShark) para cargar ofertas reales de videojuegos.
//   5. Fetch API pública (PokéAPI) para cargar una Pokédex dinámica,
//      aplicando Promises en paralelo con Promise.all.
// =============================================================================


// -----------------------------------------------------------------------------
// 1. EVENTOS MOUSEOVER Y MOUSEOUT (Estilos dinámicos sobre las tarjetas)
// -----------------------------------------------------------------------------
function inicializarEfectosTarjetas() {
    const tarjetas = document.querySelectorAll(".tarjeta-producto");

    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener("mouseover", () => {
            tarjeta.classList.add("tarjeta-resaltada");
        });

        tarjeta.addEventListener("mouseout", () => {
            tarjeta.classList.remove("tarjeta-resaltada");
        });
    });
}


// -----------------------------------------------------------------------------
// 2. EVENTO CLICK: MANIPULACIÓN DEL DOM (createElement, appendChild, remove)
// -----------------------------------------------------------------------------
function inicializarCarrito() {
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    const listaCarrito = document.getElementById("lista-carrito");
    const avisoVacio = document.getElementById("carrito-vacio");
    const badgeContador = document.getElementById("badge-contador");
    const btnVaciar = document.getElementById("btn-vaciar-carrito");

    if (!listaCarrito || !badgeContador) return;

    let totalProductos = 0;

    // Actualiza el badge del navbar y el aviso de carrito vacío
    function actualizarContador() {
        badgeContador.textContent = totalProductos;
        if (avisoVacio) {
            avisoVacio.style.display = totalProductos === 0 ? "block" : "none";
        }
    }

    // Cada botón "Comprar" agrega un <li> al carrito
    botonesComprar.forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            const card = evento.target.closest(".card");
            const nombre = card.querySelector(".nombre-producto").textContent;
            const precio = card.querySelector(".precio-producto").textContent;

            const itemLista = document.createElement("li");
            itemLista.className = "list-group-item bg-dark text-light border-secondary d-flex justify-content-between align-items-center py-2";

            const textoDetalle = document.createElement("span");
            textoDetalle.textContent = "🎮 " + nombre + " - " + precio;

            const btnEliminar = document.createElement("button");
            btnEliminar.type = "button";
            btnEliminar.className = "btn btn-outline-danger btn-sm";
            btnEliminar.textContent = "✕ Quitar";

            btnEliminar.addEventListener("click", () => {
                itemLista.remove();
                totalProductos--;
                actualizarContador();
            });

            itemLista.appendChild(textoDetalle);
            itemLista.appendChild(btnEliminar);
            listaCarrito.appendChild(itemLista);

            totalProductos++;
            actualizarContador();
        });
    });

    // Botón "Vaciar carrito"
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            const items = listaCarrito.querySelectorAll("li:not(#carrito-vacio)");
            items.forEach((item) => item.remove());
            totalProductos = 0;
            actualizarContador();
        });
    }

    actualizarContador();
}


// -----------------------------------------------------------------------------
// 3. EVENTO SUBMIT: VALIDACIÓN DE FORMULARIO Y ALERTA DINÁMICA
// -----------------------------------------------------------------------------
function inicializarFormulario() {
    const formulario = document.getElementById("formulario-contacto");
    const contenedorMensaje = document.getElementById("mensaje-formulario");

    if (!formulario || !contenedorMensaje) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById("campo-nombre").value.trim();
        const email = document.getElementById("campo-email").value.trim();

        contenedorMensaje.textContent = "";

        const alerta = document.createElement("div");
        alerta.setAttribute("role", "alert");

        // Validaciones: campos vacíos y formato de correo
        if (nombre === "" || email === "") {
            alerta.className = "alert alert-danger py-2 mb-0";
            alerta.textContent = "⚠️ Todos los campos son obligatorios. Por favor, completa tu nombre y correo.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alerta.className = "alert alert-warning py-2 mb-0";
            alerta.textContent = "⚠️ Ingresa un formato de correo electrónico válido.";
        } else {
            alerta.className = "alert alert-success py-2 mb-0";
            alerta.textContent = "✅ ¡Gracias por suscribirte, " + nombre + "! Te enviaremos las novedades a " + email + ".";
            formulario.reset();
        }

        contenedorMensaje.appendChild(alerta);
    });
}


// -----------------------------------------------------------------------------
// 4. FETCH API PÚBLICA: OFERTAS GAMER DESDE CheapShark API
//    API pública de ofertas reales de videojuegos (Steam, GOG, etc.).
//    No requiere API key y devuelve contenido temático gamer.
// -----------------------------------------------------------------------------
async function cargarOfertasAPI() {
    const contenedor = document.getElementById("contenedor-ofertas");
    const estado = document.getElementById("estado-ofertas");
    const urlAPI = "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=30&pageSize=6";

    if (!contenedor || !estado) return;

    estado.textContent = "Cargando ofertas gamer...";
    contenedor.textContent = "";

    try {
        const respuesta = await fetch(urlAPI);

        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }

        const ofertas = await respuesta.json();
        estado.textContent = "";

        ofertas.forEach((oferta) => {
            const columna = document.createElement("div");
            columna.className = "col-12 col-md-6 col-lg-4";

            const card = document.createElement("article");
            card.className = "card h-100 text-light shadow-sm";

            const imagen = document.createElement("img");
            imagen.src = oferta.thumb;
            imagen.alt = oferta.title;
            imagen.className = "card-img-top";
            imagen.loading = "lazy";

            const body = document.createElement("div");
            body.className = "card-body d-flex flex-column";

            const cabecera = document.createElement("div");
            cabecera.className = "d-flex justify-content-between align-items-center mb-2";

            const original = document.createElement("span");
            original.className = "text-secondary text-decoration-line-through small";
            original.textContent = "$" + oferta.normalPrice + " USD";

            const badge = document.createElement("span");
            badge.className = "badge bg-danger";
            badge.textContent = "-" + Math.round(oferta.savings) + "%";

            cabecera.appendChild(original);
            cabecera.appendChild(badge);

            const titulo = document.createElement("h3");
            titulo.className = "h6 text-info mb-3";
            titulo.textContent = oferta.title;

            const precio = document.createElement("div");
            precio.className = "mt-auto pt-3 border-top border-secondary";

            const precioFinal = document.createElement("span");
            precioFinal.className = "fs-5 fw-bold text-success";
            precioFinal.textContent = "$" + oferta.salePrice + " USD";

            precio.appendChild(precioFinal);

            body.appendChild(cabecera);
            body.appendChild(titulo);
            body.appendChild(precio);

            card.appendChild(imagen);
            card.appendChild(body);

            card.addEventListener("mouseover", () => card.classList.add("tarjeta-resaltada"));
            card.addEventListener("mouseout", () => card.classList.remove("tarjeta-resaltada"));

            columna.appendChild(card);
            contenedor.appendChild(columna);
        });

    } catch (error) {
        estado.textContent = "";

        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger py-2";
        errorDiv.textContent = "❌ No fue posible cargar las ofertas: " + error.message;
        estado.appendChild(errorDiv);

        console.error("Error en Fetch API (CheapShark):", error);
    }
}


// -----------------------------------------------------------------------------
// 5. FETCH API PÚBLICA: POKÉDEX DINÁMICA DESDE PokéAPI
//    Se realiza un primer fetch para obtener la lista de Pokémon y luego
//    se usa Promise.all para lanzar en paralelo los fetch de cada detalle.
//    Esto demuestra manejo de promesas concurrentes y renderizado dinámico.
// -----------------------------------------------------------------------------
async function cargarProductosAPI() {
    const contenedor = document.getElementById("contenedor-productos");
    const estado = document.getElementById("estado-productos");
    const urlLista = "https://pokeapi.co/api/v2/pokemon?limit=6";

    if (!contenedor || !estado) return;

    estado.textContent = "Cargando Pokémon...";
    contenedor.textContent = "";

    try {
        // Primera petición: lista de Pokémon con sus URLs de detalle
        const respuestaLista = await fetch(urlLista);

        if (!respuestaLista.ok) {
            throw new Error("Error HTTP " + respuestaLista.status);
        }

        const lista = await respuestaLista.json();

        // Segunda fase: pedimos los detalles de cada Pokémon en paralelo
        const detalles = await Promise.all(
            lista.results.map((poke) => fetch(poke.url).then((r) => r.json()))
        );

        estado.textContent = "";

        // Renderizamos cada Pokémon
        detalles.forEach((poke) => {
            const columna = document.createElement("div");
            columna.className = "col-12 col-md-6 col-lg-4";

            const card = document.createElement("article");
            card.className = "card h-100 text-light shadow-sm";

            // Imagen oficial del Pokémon
            const imagen = document.createElement("img");
            imagen.src = poke.sprites.other["official-artwork"].front_default
                || poke.sprites.front_default;
            imagen.alt = poke.name;
            imagen.className = "card-img-top";
            imagen.loading = "lazy";

            // Cuerpo de la tarjeta
            const body = document.createElement("div");
            body.className = "card-body d-flex flex-column";

            // Número de Pokédex formateado (#001, #025, etc.)
            const numero = document.createElement("span");
            numero.className = "badge bg-secondary align-self-start mb-2";
            numero.textContent = "#" + String(poke.id).padStart(3, "0");

            // Nombre capitalizado
            const titulo = document.createElement("h3");
            titulo.className = "h5 text-info text-capitalize";
            titulo.textContent = poke.name;

            // Tipos como badges de colores
            const tipos = document.createElement("div");
            tipos.className = "d-flex gap-2 mb-3";

            poke.types.forEach((t) => {
                const badge = document.createElement("span");
                badge.className = "badge text-dark text-capitalize";
                badge.style.backgroundColor = colorPorTipo(t.type.name);
                badge.textContent = t.type.name;
                tipos.appendChild(badge);
            });

            // Altura y peso formateados
            const detallesP = document.createElement("p");
            detallesP.className = "card-text text-secondary small flex-grow-1";
            detallesP.textContent =
                "Altura: " + (poke.height / 10).toFixed(1) + " m · " +
                "Peso: " + (poke.weight / 10).toFixed(1) + " kg";

            // "Precio" simbólico basado en la experiencia base
            const precio = document.createElement("span");
            precio.className = "fs-5 fw-bold text-success mt-3 pt-3 border-top border-secondary";
            precio.textContent = "$" + (poke.base_experience * 100).toLocaleString("es-CL");

            body.appendChild(numero);
            body.appendChild(titulo);
            body.appendChild(tipos);
            body.appendChild(detallesP);
            body.appendChild(precio);

            card.appendChild(imagen);
            card.appendChild(body);

            // Hover dinámico
            card.addEventListener("mouseover", () => card.classList.add("tarjeta-resaltada"));
            card.addEventListener("mouseout", () => card.classList.remove("tarjeta-resaltada"));

            columna.appendChild(card);
            contenedor.appendChild(columna);
        });

    } catch (error) {
        estado.textContent = "";

        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger py-2";
        errorDiv.textContent = "❌ No fue posible cargar la Pokédex: " + error.message;
        estado.appendChild(errorDiv);

        console.error("Error en Fetch API (PokéAPI):", error);
    }
}

// Utilidad: color por tipo de Pokémon (para los badges)
function colorPorTipo(tipo) {
    const colores = {
        fire: "#f08030",
        water: "#6890f0",
        grass: "#78c850",
        electric: "#f8d030",
        ice: "#98d8d8",
        fighting: "#c03028",
        poison: "#a040a0",
        ground: "#e0c068",
        flying: "#a890f0",
        psychic: "#f85888",
        bug: "#a8b820",
        rock: "#b8a038",
        ghost: "#705898",
        dragon: "#7038f8",
        dark: "#705848",
        steel: "#b8b8d0",
        fairy: "#ee99ac",
        normal: "#a8a878"
    };
    return colores[tipo] || "#a8a878";
}


// -----------------------------------------------------------------------------
// 6. INICIALIZACIÓN DE LOS BOTONES DE FETCH API
// -----------------------------------------------------------------------------
function inicializarFetchAPI() {
    const btnOfertas = document.getElementById("btn-cargar-ofertas");
    if (btnOfertas) btnOfertas.addEventListener("click", cargarOfertasAPI);

    const btnPokemon = document.getElementById("btn-cargar-productos");
    if (btnPokemon) btnPokemon.addEventListener("click", cargarProductosAPI);
}


// -----------------------------------------------------------------------------
// 7. INICIALIZACIÓN GLOBAL
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    inicializarEfectosTarjetas();
    inicializarCarrito();
    inicializarFormulario();
    inicializarFetchAPI();
});