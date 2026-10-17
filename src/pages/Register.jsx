import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/login-register.css';

const validarRutChileno = (rut) => {
  if (!rut || typeof rut !== 'string') return false;
  const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  if (rutLimpio.length < 8) return false;

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalc = 'K';
  if (dvEsperado === 11) dvCalc = '0';
  else if (dvEsperado !== 10) dvCalc = dvEsperado.toString();

  return dv === dvCalc;
};

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    email: '',
    password: '',
    passwordConfirmed: '',
    telefono: '',
    region: '',
    comuna: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!formData.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio.';

    if (!formData.rut.trim()) {
      nuevosErrores.rut = 'El RUT es obligatorio.';
    } else if (!validarRutChileno(formData.rut)) {
      nuevosErrores.rut = 'RUT inválido (ej: 12.345.678-k).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(formData.email.trim())) {
      nuevosErrores.email = 'Ingrese un correo electrónico válido.';
    }

    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres.';
    }

    if (!formData.passwordConfirmed) {
      nuevosErrores.passwordConfirmed = 'Confirme su contraseña.';
    } else if (formData.password !== formData.passwordConfirmed) {
      nuevosErrores.passwordConfirmed = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    try {
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const existe = usuarios.some(
        (u) => u.email && u.email.toLowerCase() === formData.email.trim().toLowerCase()
      );

      if (existe) {
        setErrors((prev) => ({
          ...prev,
          email: 'El correo electrónico ya se encuentra registrado.'
        }));
        return;
      }

      const nuevoUsuario = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        rut: formData.rut.trim(),
        email: formData.email.trim(),
        password: formData.password,
        telefono: formData.telefono.trim(),
        region: formData.region,
        comuna: formData.comuna,
        role: 'Cliente'
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Redirigir a login para que pueda ingresar
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-bg-container">
      <div className="btn-inicio">
        <Link to="/">Volver al Inicio</Link>
      </div>

      <main className="card-register">
        <header className="contenedor1">
          <h1 className="login-title">Registrarse</h1>
          <h2 className="login-subtitle">Registro de Usuario</h2>
        </header>

        <form className="register" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errors.nombre ? 'input-error' : ''}
            />
            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              placeholder="Tu apellido"
              value={formData.apellido}
              onChange={handleChange}
              className={errors.apellido ? 'input-error' : ''}
            />
            {errors.apellido && <span className="error-text">{errors.apellido}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="rut">RUT</label>
            <input
              type="text"
              id="rut"
              placeholder="12.345.678-k"
              value={formData.rut}
              onChange={handleChange}
              className={errors.rut ? 'input-error' : ''}
            />
            {errors.rut && <span className="error-text">{errors.rut}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="passwordConfirmed">Confirmar Contraseña</label>
            <input
              type="password"
              id="passwordConfirmed"
              value={formData.passwordConfirmed}
              onChange={handleChange}
              className={errors.passwordConfirmed ? 'input-error' : ''}
            />
            {errors.passwordConfirmed && (
              <span className="error-text">{errors.passwordConfirmed}</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="telefono">Número de Teléfono</label>
            <input
              type="tel"
              id="telefono"
              placeholder="+56 9 1234 5678"
              value={formData.telefono}
              onChange={handleChange}
              className={errors.telefono ? 'input-error' : ''}
            />
            {errors.telefono && <span className="error-text">{errors.telefono}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="region">Región</label>
            <select
              name="region"
              id="region"
              value={formData.region}
              onChange={handleChange}
              className={errors.region ? 'input-error' : ''}
            >
              <option value="" disabled>
                -- Seleccione la región --
              </option>
              <option value="rm">Metropolitana</option>
            </select>
            {errors.region && <span className="error-text">{errors.region}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="comuna">Comuna</label>
            <select
              name="comuna"
              id="comuna"
              value={formData.comuna}
              onChange={handleChange}
              className={errors.comuna ? 'input-error' : ''}
            >
              <option value="" disabled>
                -- Seleccione la comuna --
              </option>
              <option value="maipu">Maipú</option>
              <option value="cerrillos">Cerrillos</option>
            </select>
            {errors.comuna && <span className="error-text">{errors.comuna}</span>}
          </div>

          <p className="login-footer">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="text-nextpage">
              Inicia sesión aquí
            </Link>
          </p>

          <input type="submit" value="Registrarse" className="btn-submit" />
        </form>
      </main>
    </div>
  );
}