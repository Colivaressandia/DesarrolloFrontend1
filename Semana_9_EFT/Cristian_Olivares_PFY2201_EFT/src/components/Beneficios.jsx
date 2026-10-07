/* =========================================================================
   Beneficios.jsx — Sección de beneficios/servicios
   Evaluación Final Transversal — Desarrollo Frontend I (PFY2201)
   ========================================================================= */

const beneficios = [
  {
    icono: "🚀",
    titulo: "Catálogo para todos",
    texto: "Aventuras, acción y estrategia para cada tipo de jugador.",
  },
  {
    icono: "🛡️",
    titulo: "Compra protegida",
    texto: "Acompañamiento y soporte para que disfrutes tu compra.",
  },
  {
    icono: "💳",
    titulo: "Novedades semanales",
    texto: "Descubre nuevos títulos y ofertas destacadas de la tienda.",
  },
];

function Beneficios() {
  return (
    <section className="beneficios" id="servicios">
      {beneficios.map((b, i) => (
        <div key={i} className="beneficio-card">
          <div className="beneficio-icono">{b.icono}</div>
          <h3>{b.titulo}</h3>
          <p>{b.texto}</p>
        </div>
      ))}
    </section>
  );
}

export default Beneficios;