import React from 'react';
import '../../styles/footer.css';

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-links">
            <h4>Ayuda</h4>
            <ul>
              <li>Centro de ayuda</li>
              <li>Seguimiento de mi compra</li>
              <li>Formulario de contacto</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Nosotros</h4>
            <ul>
              <li>Quienes somos</li>
              <li>Ventas corporativas</li>
              <li>Términos y condiciones</li>
              <li>Políticas y seguridad</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Síguenos</h4>
            <div className="social-link">
              <a href="#">🟦</a>
              <a href="#">🐦</a>
              <a href="#">📸</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
