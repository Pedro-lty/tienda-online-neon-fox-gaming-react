import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages/login-register.css';

// Usuarios base del sistema
const USUARIOS_BASE = [
  { email: 'admin@neonfox.com', password: 'admin123', role: 'Admin', nombre: 'Administrador' },
  { email: 'cliente@neonfox.com', password: 'cliente123', role: 'Cliente', nombre: 'Cliente Demo' }
];

export function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  // Inicializar usuarios base en localStorage al montar el componente
  useEffect(() => {
    try {
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      USUARIOS_BASE.forEach((usuarioBase) => {
        const existe = usuarios.some(
          (u) => u.email && u.email.toLowerCase() === usuarioBase.email.toLowerCase()
        );
        if (!existe) usuarios.push(usuarioBase);
      });

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } catch (error) {
      console.error('[Login] Error al inicializar usuarios base:', error);
    }
  }, []);

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

    const email = formData.email.trim();
    const password = formData.password.trim();

    // Validaciones básicas de formulario
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(email)) {
      nuevosErrores.email = 'Ingrese un correo electrónico válido.';
    }

    if (!password) {
      nuevosErrores.password = 'La contraseña es obligatoria.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    // Proceso de Autenticación
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado = usuarios.find(
        (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
      );

      if (!usuarioEncontrado) {
        setErrors({ email: 'El correo no está registrado.' });
        return;
      }

      if (usuarioEncontrado.password !== password) {
        setErrors({ password: 'Contraseña incorrecta.' });
        return;
      }

      // Cuentas desactivadas desde el panel admin no pueden entrar
      if (usuarioEncontrado.estado === 'Inactivo') {
        setErrors({ email: 'Esta cuenta está desactivada.' });
        return;
      }

      // Guardar sesión activa
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: usuarioEncontrado.email,
          nombre: usuarioEncontrado.nombre || 'Usuario',
          role: usuarioEncontrado.role || 'Cliente'
        })
      );

      // Redirección según Rol
      if (usuarioEncontrado.role === 'Admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('[Login] Error durante el proceso de autenticación:', error);
      alert('Ocurrió un error inesperado al iniciar sesión.');
    }
  };

  return (
    <div className="login-bg-container">
      <div className="btn-inicio">
        <Link to="/">Volver al Inicio</Link>
      </div>

      <main className="card-login">
        <header className="contenedor2">
          <h1 className="login-title">Iniciar Sesión</h1>
          <h2 className="login-subtitle">Inicio de sesión de Usuario</h2>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
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

          <input type="submit" value="Iniciar Sesión" className="btn-submit" />

          <p className="login-footer">
            ¿No tienes una cuenta?
            <Link to="/register" className="text-nextpage">
              Créala aquí
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
