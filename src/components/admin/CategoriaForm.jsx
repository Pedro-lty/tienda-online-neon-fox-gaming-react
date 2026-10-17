import React, { useState } from 'react';
import Campo from './Campo';

// onSubmit debe devolver { ok, error }
export default function CategoriaForm({ inicial = {}, onSubmit, textoBoton = 'Guardar' }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '', ...inicial });
  const [errorNombre, setErrorNombre] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorNombre('');
    setErrorGeneral('');
  };

  const enviar = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setErrorNombre('El nombre es obligatorio.');
      return;
    }
    const r = onSubmit(form);
    if (r && !r.ok) setErrorGeneral(r.error);
  };

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="bg-white rounded shadow-sm p-4"
      style={{ maxWidth: 600 }}
    >
      <Campo label="Nombre *" error={errorNombre}>
        <input className="form-control" name="nombre" value={form.nombre} onChange={cambiar} />
      </Campo>
      <Campo label="Descripción">
        <textarea
          className="form-control"
          rows="3"
          name="descripcion"
          value={form.descripcion}
          onChange={cambiar}
        />
      </Campo>
      {errorGeneral && <div className="alert alert-danger py-2">{errorGeneral}</div>}
      <button type="submit" className="btn btn-primary">
        {textoBoton}
      </button>
    </form>
  );
}
