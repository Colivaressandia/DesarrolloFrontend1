/* =========================================================================
   Beneficios.jsx — Sección de beneficios/servicios
   Semana 7 — Desarrollo Frontend I (PFY2201)
   ========================================================================= */

const beneficios = [
  {
    icono: "🚀",
    titulo: "Despacho Inmediato",
    texto: "Entregas dentro de 24 a 48 horas en todo el país.",
  },
  {
    icono: "🛡️",
    titulo: "Garantía Asegurada",
    texto: "Cobertura de 6 meses y servicio técnico especializado.",
  },
  {
    icono: "💳",
    titulo: "Medios de Pago",
    texto: "Hasta 12 cuotas sin interés mediante WebPay Plus.",
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