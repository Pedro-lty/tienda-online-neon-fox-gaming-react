import React, { useState } from 'react';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/contactos.css';

export function Contactos({ totalItemsCount = 0 }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contenido: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado:', formData);
    alert('Mensaje enviado con éxito');
    setFormData({ nombre: '', correo: '', contenido: '' });
  };

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <section className="form-wrapper">
        <div className="form-header">
          <h2>FORMULARIO DE CONTACTOS</h2>
        </div>

        <form id="miFormulario" className="contact-form" onSubmit={enviarMensaje}>
          <div className="form-group">
            <label htmlFor="nombre">NOMBRE COMPLETO</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">CORREO</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contenido">CONTENIDO</label>
            <textarea
              id="contenido"
              name="contenido"
              rows="5"
              value={formData.contenido}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="button-container">
            <button type="submit" className="submit-btn">
              ENVIAR MENSAJE
            </button>
          </div>
        </form>
      </section>
    </PlantillaBase>
  );
}

export default Contactos;
