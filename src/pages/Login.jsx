import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import '../styles/pages/login-register.css';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-bg-container">
      <Button className="btn-volver-inicio" onClick={() => navigate('/')}>
        Volver al Inicio
      </Button>

      <div className="login-card shadow-lg">
        <Text variant="h2" className="login-title">Iniciar Sesion</Text>
        <Text className="login-subtitle">Inicio de sesion de Usuario</Text>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Correo Electronico</label>
            <input type="email" required />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" required />
          </div>

          <Button type="submit" className="btn-submit-login">
            Iniciar Sesion
          </Button>
        </form>

        <div className="login-footer text-center mt-3">
          <Text variant="span">¿No tienes una cuenta? </Text>
          <a href="/registro" className="link-crear-cuenta">Créala aquí</a>
        </div>
      </div>
    </div>
  );
}

// ESTA LÍNEA ES LA QUE FALTA O CORRIGE EL ERROR:
export default Login;
