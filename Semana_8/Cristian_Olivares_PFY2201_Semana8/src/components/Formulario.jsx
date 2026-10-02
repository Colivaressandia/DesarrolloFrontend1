/* =========================================================================
   Formulario.jsx — Formulario de suscripción con validación
   Semana 7 — Desarrollo Frontend I (PFY2201)
   -------------------------------------------------------------------------
   Migrado del formulario de contacto de la Semana 6.
   Usa useState para los campos y mensajes, y renderizado condicional
   para mostrar el mensaje de éxito o error.
   ========================================================================= */

import { useState } from "react";

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState(null); // { texto, tipo }

  const handleSubmit = (e) => {
    e.preventDefault();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre.trim().length < 3) {
      setMensaje({
        texto: "⚠️ El nombre debe tener al menos 3 caracteres.",
        tipo: "warning",
      });
      return;
    }

    if (!regexEmail.test(email.trim())) {
      setMensaje({
        texto: "⚠️ Ingresa un correo electrónico válido.",
        tipo: "warning",
      });
      return;
    }

    setMensaje({
      texto: `✅ ¡Gracias, ${nombre}! Te suscribiste correctamente.`,
      tipo: "success",
    });
    setNombre("");
    setEmail("");
  };

  return (
    <section className="formulario-seccion" id="contacto">
      <div className="formulario-card">
        <h2>Suscríbete a nuestras novedades</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Nombre
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@correo.com"
            />
          </label>

          <button type="submit">Suscribirme</button>
        </form>

        {/* 🔹 Renderizado condicional del mensaje */}
        {mensaje && (
          <div className={`mensaje ${mensaje.tipo}`}>{mensaje.texto}</div>
        )}
      </div>
    </section>
  );
}

export default Formulario;