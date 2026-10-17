import React from 'react';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/nosotros.css';

export function Nosotros({ totalItemsCount = 0 }) {
  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="nosotros-page-wrapper">
        <main className="nosotros-main-container">
          <section className="hero-section">
            <h2>Sobre Nuestra Tienda Gamer</h2>
            <p>Pasión, precisión y el mejor rendimiento para tu setup.</p>
            <br />
            <img
              src="https://media-front.elmostrador.cl/2022/08/Gamer-1-700x467.png"
              alt="Setup Gamer"
              className="responsive-img Pokedex"
            />
          </section>

          <section className="info-section">
            <h3>¿Quiénes somos?</h3>
            <p>
              Somos una tienda dedicada a equipar a los entusiastas de los videojuegos y jugadores competitivos con los periféricos de más alta calidad del mercado. Desde teclados mecánicos personalizados hasta ratones de ultra alta precisión y auriculares con sonido envolvente.
            </p>

            <h3>¿Por qué elegirnos?</h3>
            <ul>
              <li>
                <strong>Garantía Real:</strong> Todos nuestros teclados, mouses y audífonos cuentan con garantía directa.
              </li>
              <li>
                <strong>Envíos Rápidos:</strong> Despachamos tu equipamiento en menos de 24 horas a todo el país.
              </li>
              <li>
                <strong>Asesoría Especializada:</strong> Te ayudamos a elegir los switches, sensores y periféricos que mejor se adapten a tu estilo de juego.
              </li>
            </ul>

            <h3>Nuestra Misión</h3>
            <p>
              Llevar la experiencia de juego de cada gamer al siguiente nivel, asegurando comodidad, ergonomía y máxima respuesta en cada partida.
            </p>
          </section>

          <section className="gif-section">
            <h3>¡Siente el poder de cada click!</h3>
            <img
              src="https://images.squarespace-cdn.com/content/v1/5a04ada3fe54ef9d6db19bc8/e0e33d4c-1dff-41c6-abc3-90172cec4cad/portal_vortex_purple_blue.gif"
              alt="Gaming GIF"
              className="responsive-img"
            />
          </section>
        </main>
      </div>
    </PlantillaBase>
  );
}

export default Nosotros;