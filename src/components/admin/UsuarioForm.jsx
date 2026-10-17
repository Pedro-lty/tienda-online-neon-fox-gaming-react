import React, { useState } from 'react';
import Campo from './Campo';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// onSubmit debe devolver { ok, error }
export default function UsuarioForm({
  inicial = {},
  esNuevo = false,
  bloquearRol = false,
  onSubmit,
  textoBoton = 'Guardar'
}) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    role: 'Cliente',
    estado: 'Activo',
    password: '',
    ...inicial
  });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
    setErrorGeneral('');
  };

  const enviar = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.nombre.trim()) er.nombre = 'El nombre es obligatorio.';
    if (!form.email.trim()) er.email = 'El correo es obligatorio.';
    else if (!emailRegex.test(form.email.trim())) er.email = 'Ingresa un correo válido.';
    if (esNuevo && !form.password) er.password = 'La contraseña es obligatoria.';
    else if (form.password && form.password.length < 8) {
      er.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (Object.keys(er).length) {
      setErrores(er);
      return;
    }
    const r = onSubmit({
      ...form,
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim()
    });
    if (r && !r.ok) setErrorGeneral(r.error);
  };

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="bg-white rounded shadow-sm p-4"
      style={{ maxWidth: 700 }}
    >
      <div className="row">
        <div className="col-md-6">
          <Campo label="Nombre *" error={errores.nombre}>
            <input className="form-control" name="nombre" value={form.nombre} onChange={cambiar} />
          </Campo>
        </div>
        <div className="col-md-6">
          <Campo label="Apellido">
            <input
              className="form-control"
              name="apellido"
              value={form.apellido}
              onChange={cambiar}
            />
          </Campo>
        </div>
      </div>

      <Campo label="Correo *" error={errores.email}>
        <input
          className="form-control"
          type="email"
          name="email"
          value={form.email}
          onChange={cambiar}
        />
      </Campo>

      <div className="row">
        <div className="col-md-6">
          <Campo
            label="Rol"
            ayuda={bloquearRol ? 'No puedes cambiar tu propio rol.' : undefined}
          >
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={cambiar}
              disabled={bloquearRol}
            >
              <option value="Admin">Administrador</option>
              <option value="Cliente">Cliente</option>
            </select>
          </Campo>
        </div>
        <div className="col-md-6">
          <Campo label="Estado">
            <select
              className="form-select"
              name="estado"
              value={form.estado}
              onChange={cambiar}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </Campo>
        </div>
      </div>

      <Campo
        label={esNuevo ? 'Contraseña *' : 'Nueva contraseña'}
        error={errores.password}
        ayuda={esNuevo ? 'Mínimo 8 caracteres.' : 'Déjala en blanco para mantener la actual.'}
      >
        <input
          className="form-control"
          type="password"
          name="password"
          value={form.password}
          onChange={cambiar}
          autoComplete="new-password"
        />
      </Campo>

      {errorGeneral && <div className="alert alert-danger py-2">{errorGeneral}</div>}
      <button type="submit" className="btn btn-primary">
        {textoBoton}
      </button>
    </form>
  );
}
