/* =========================================================================
   Formulario de contacto con validación por campo.
   ========================================================================= */

import { useState } from "react";

const validadores = {
  nombre: (valor) =>
    valor.trim().length >= 3 ? "" : "Escribe al menos 3 caracteres.",
  email: (valor) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
      ? ""
      : "Ingresa un correo electrónico válido.",
  mensaje: (valor) =>
    valor.trim().length >= 10 ? "" : "Escribe al menos 10 caracteres.",
};

const camposVacios = { nombre: "", email: "", mensaje: "" };

function Formulario() {
  const [campos, setCampos] = useState(camposVacios);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [estado, setEstado] = useState(null);

  const validarCampo = (campo, valor) => {
    setErrores((actuales) => ({
      ...actuales,
      [campo]: validadores[campo](valor),
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCampos((actuales) => ({ ...actuales, [name]: value }));
    setEstado(null);
    if (tocados[name]) validarCampo(name, value);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTocados((actuales) => ({ ...actuales, [name]: true }));
    validarCampo(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nuevosErrores = Object.fromEntries(
      Object.entries(validadores).map(([campo, validar]) => [
        campo,
        validar(campos[campo]),
      ])
    );
    setErrores(nuevosErrores);
    setTocados({ nombre: true, email: true, mensaje: true });

    const primerError = Object.values(nuevosErrores).find(Boolean);
    if (primerError) {
      setEstado({ texto: "Revisa los campos indicados antes de enviar.", tipo: "warning" });
      return;
    }

    setEstado({
      texto: `Gracias, ${campos.nombre.trim()}. Tu mensaje fue enviado correctamente.`,
      tipo: "success",
    });
    setCampos(camposVacios);
    setErrores({});
    setTocados({});
  };

  const claseCampo = (campo) => {
    if (!tocados[campo]) return "form-control";
    return `form-control ${errores[campo] ? "is-invalid" : "is-valid"}`;
  };

  return (
    <section className="formulario-seccion" id="contacto">
      <div className="formulario-card">
        <h2>¿Necesitas ayuda?</h2>
        <p>Escríbenos y nuestro equipo se pondrá en contacto contigo.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label className="form-label" htmlFor="contacto-nombre">Nombre</label>
            <input
              className={claseCampo("nombre")}
              id="contacto-nombre"
              name="nombre"
              type="text"
              value={campos.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tu nombre"
              autoComplete="name"
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby={errores.nombre ? "error-nombre" : undefined}
              required
            />
            {errores.nombre && tocados.nombre && (
              <div className="invalid-feedback" id="error-nombre">{errores.nombre}</div>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="contacto-email">Correo electrónico</label>
            <input
              className={claseCampo("email")}
              id="contacto-email"
              name="email"
              type="email"
              value={campos.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="nombre@correo.com"
              autoComplete="email"
              aria-invalid={Boolean(errores.email)}
              aria-describedby={errores.email ? "error-email" : undefined}
              required
            />
            {errores.email && tocados.email && (
              <div className="invalid-feedback" id="error-email">{errores.email}</div>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="contacto-mensaje">Mensaje</label>
            <textarea
              className={claseCampo("mensaje")}
              id="contacto-mensaje"
              name="mensaje"
              value={campos.mensaje}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Cuéntanos cómo podemos ayudarte"
              rows="4"
              minLength="10"
              aria-invalid={Boolean(errores.mensaje)}
              aria-describedby={errores.mensaje ? "error-mensaje" : undefined}
              required
            />
            {errores.mensaje && tocados.mensaje && (
              <div className="invalid-feedback" id="error-mensaje">{errores.mensaje}</div>
            )}
          </div>
          <button className="btn btn-info" type="submit">Enviar mensaje</button>
        </form>

        {estado && (
          <div className={`alert alert-${estado.tipo} mensaje`} role="status">
            {estado.texto}
          </div>
        )}
      </div>
    </section>
  );
}

export default Formulario;
