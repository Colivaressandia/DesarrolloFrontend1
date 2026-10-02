/* =========================================================================
   Carrusel.jsx — Carrusel de banners promocionales
   Semana 7 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Reemplaza el carrusel de Bootstrap de la Semana 6 con un componente
   funcional en React. Usa useState para el slide activo y useEffect para
   el autoplay cada 5 segundos.
   ========================================================================= */

import { useState, useEffect } from "react";

const BASE = import.meta.env.BASE_URL;

const slides = [
  {
    id: 1,
    imagen: `${BASE}img/banner1.jpg`,
    titulo: "Lanzamientos de Temporada",
    texto: "Reserva las consolas y ediciones de colección más esperadas del año.",
  },
  {
    id: 2,
    imagen: `${BASE}img/banner2.jpg`,
    titulo: "Zona Competitiva",
    texto: "Mandos pro, periféricos de alto rendimiento y audio envolvente.",
  },
  {
    id: 3,
    imagen: `${BASE}img/banner3.jpg`,
    titulo: "Despacho en 48 Horas",
    texto: "Envíos rápidos y seguros a todo el país con garantía de satisfacción.",
  },
];

function Carrusel() {
  const [slideActual, setSlideActual] = useState(0);

  // Autoplay cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const anterior = () =>
    setSlideActual((prev) => (prev - 1 + slides.length) % slides.length);
  const siguiente = () =>
    setSlideActual((prev) => (prev + 1) % slides.length);

  return (
    <section className="carrusel" aria-label="Banners promocionales">
      <div className="carrusel-track">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`carrusel-slide ${i === slideActual ? "activo" : ""}`}
          >
            <img src={slide.imagen} alt={slide.titulo} />
            <div className="carrusel-caption">
              <h2>{slide.titulo}</h2>
              <p>{slide.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carrusel-btn prev"
        onClick={anterior}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        className="carrusel-btn next"
        onClick={siguiente}
        aria-label="Siguiente"
      >
        ›
      </button>

      <div className="carrusel-indicadores">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === slideActual ? "activo" : ""}`}
            onClick={() => setSlideActual(i)}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Carrusel;