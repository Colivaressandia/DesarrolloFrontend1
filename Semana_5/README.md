Markdown# 🎮 Memory Card Games

Proyecto web desarrollado para la asignatura **Desarrollo Frontend I (PFY2201)**.  
Esta es la **entrega de la Semana 5**: manipulación del DOM con JavaScript, implementación de eventos y consumo de datos externos mediante **Fetch API**.
📋 DescripciónMemory Card Games es una tienda ficticia de consolas y videojuegos. A partir de esta semana, el sitio deja de ser estático y se convierte en una aplicación web interactiva que:Reacciona a eventos del usuario (click, mouseover, mouseout, submit).Modifica el DOM dinámicamente con createElement, appendChild y remove().Consume datos externos desde APIs públicas mediante fetch().Aplica manejo de errores y promesas con async/await y bloques try/catch.✨ Funcionalidades implementadas1. Manipulación del DOMCreación dinámica de elementos en el carrito con detalles de consola y precio.Eliminación de nodos del DOM (element.remove()) tanto en productos individuales como al vaciar el carrito completo.Actualización de contadores y estilos en tiempo real (textContent, manipulación de estilos en línea).2. EventosEventoDónde se aplicaAcciónclickBotones "Comprar"Agrega el producto seleccionado al carrito y actualiza el contador.clickBotones "Quitar" y "Vaciar carrito"Remueve elementos del carrito dinámicamente.mouseover / mouseoutTarjetas del catálogo (.tarjeta-producto)Resalta la tarjeta con borde cian, sombra luminosa y elevación suave.submitFormulario de suscripciónValida los campos ingresados y muestra alertas de estado sin recargar la página.3. Fetch APISe implementó el consumo asíncrono desde APIs públicas en tiempo real:CheapShark API / JSONPlaceholder API: Carga asíncrona de ofertas y comentarios/reseñas de usuarios.PokéAPI: Carga dinámica de atributos, tipos e imágenes oficiales de Pokémon.Ambas integraciones incluyen:Manejo de excepciones y errores de conexión con try/catch.Verificación del estado de respuesta HTTP (response.ok).Renderizado dinámico de tarjetas informativas a partir del arreglo de datos JSON recibido.Mensajes de estado amigables en pantalla (indicador de carga y aviso en caso de error).4. Buenas prácticasCódigo modularizado en funciones con responsabilidad única.Espera de la carga completa del árbol DOM mediante el evento DOMContentLoaded.Separación estricta de estructura (HTML), estilos (CSS) y lógica (JS).Sin duplicidad de código y con nombres semánticos para variables y selectores.🛠️ Tecnologías utilizadasTecnologíaUsoHTML5Estructura semántica del documentoCSS3Estilos personalizados y paleta gamer oscuraBootstrap 5.3Sistema de cuadrícula responsiva, Navbar, Cards y CarruselJavaScript (ES6+)Lógica del DOM, escuchadores de eventos y Fetch API con async/awaitCheapShark API / JSONPlaceholderDatos de ofertas y opiniones de usuariosPokéAPIDatos y recursos visuales de Pokémon📁 Estructura del proyectoPlaintextSemana 5/
├── Index.html               # Estructura principal del sitio
├── README.md                # Documentación del proyecto
├── css/
│   └── styles.css           # Estilos personalizados complementarios
├── js/
│   └── main.js              # Lógica de manipulación del DOM, eventos y Fetch API
└── img/
    ├── banner1.jpg          # Banners del carrusel
    ├── banner2.jpg
    ├── banner3.jpg
    ├── switch2.png          # Imágenes del catálogo
    ├── ps5pro.png
    ├── xbox.png
    └── capturas/            # Evidencias de funcionamiento para evaluación
        ├── catalogo-hover.png
        ├── ofertas-gamer.png
        ├── pokedex.png
        ├── carrito.png
        └── formulario.png
🚀 Cómo ejecutar el proyectoOpción 1: Servidor local con VS Code (Recomendado)Para asegurar que las peticiones asíncronas de la Fetch API funcionen sin bloqueos de seguridad del navegador (políticas CORS locales):Abre la carpeta Semana 5 en Visual Studio Code.Asegúrate de tener instalada la extensión Live Server.Haz clic derecho sobre Index.html y selecciona Open with Live Server.La aplicación se abrirá en http://127.0.0.1:5500/Index.html.Opción 2: Versión publicada en GitHub PagesEl proyecto se encuentra desplegado y disponible en línea a través de:👉 Ver sitio en GitHub Pages(Nota: Si abres el archivo directamente con doble clic vía file:///, algunas funciones que dependen de peticiones de red locales podrían verse restringidas por la política de seguridad del navegador).🌐 CompatibilidadProbado y verificado en los siguientes navegadores modernos:NavegadorVersiónEstadoGoogle ChromeÚltima versión estable✅ FuncionalMozilla FirefoxÚltima versión estable✅ FuncionalMicrosoft EdgeÚltima versión estable✅ Funcional📸 Capturas de pantalla1. Catálogo con efecto hover activo2. Ofertas Gamer cargadas con Fetch API3. Pokédex cargada con Fetch API4. Carrito interactivo con productos agregados5. Validación del formulario de suscripción🧩 Cómo funciona el códigoEl script principal (js/main.js) inicia su ejecución únicamente cuando el documento HTML ha sido parseado en su totalidad:JavaScriptdocument.addEventListener("DOMContentLoaded", () => {
    inicializarHoverTarjetas();   // Eventos mouseover y mouseout
    inicializarCarrito();         // Eventos click, createElement y appendChild
    inicializarFetchResenas();     // Fetch API con async/await y try/catch
    inicializarFormulario();      // Evento submit y validación dinámica
});
Cada bloque de código está contenido en funciones puras e independientes, garantizando modularidad, mantenibilidad y legibilidad.📚 ReferenciasMDN Web Docs — Manipulación del DOMMDN Web Docs — Introducción a los eventosMDN Web Docs — Fetch APIBootstrap 5 — Documentación oficialCheapShark API DocumentationPokéAPI Documentation👤 AutorNombre: Cristián OlivaresCarrera: Analista Programador ComputacionalAsignatura: Desarrollo Frontend I (PFY2201)Institución: Duoc UCGitHub: @TU_USUARIO📝 LicenciaEste proyecto ha sido desarrollado exclusivamente con fines formativos y académicos para la asignatura de Desarrollo Frontend I (PFY2201).
