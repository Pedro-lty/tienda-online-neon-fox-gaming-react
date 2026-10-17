import React from 'react';
import { Link } from 'react-router-dom';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/blogs.css';

export function Caso2({ totalItemsCount = 0 }) {
  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="caso-detail-wrapper">
        <main className="caso-detail-container">
          <Link to="/blogs" className="btn-volver">
            &larr; Volver a Blogs
          </Link>

          <h2>CASO CURIOSO #2: La evolución de los sensores ópticos en eSports</h2>

          <div className="img-box">
            <img
              src="https://acf.geeknetic.es/imgw/imagenes/tutoriales/cestus/1449-acer-predator-cestus-500-26-w99w.gif?f=webp"
              alt="Sensores de ratón gamer"
            />
          </div>

          <div className="contenido-texto">
            <p>
              El impacto de la tasa de sondeo (polling rate) en los periféricos de alta gama genera un debate constante dentro de la comunidad de los eSports. Mientras que el estándar de la industria se ha mantenido en 1000Hz (enviando la posición del cursor a la computadora 1000 veces por segundo, o cada 1 milisegundo), los ratones de última generación han elevado esta cifra a 4000Hz y hasta 8000Hz, reduciendo el intervalo de reporte a tan solo 0.125 milisegundos.
            </p>
            <p>
              Esta frecuencia de actualización extrema, combinada con los sensores ópticos más avanzados del mercado, busca ofrecer un seguimiento del movimiento infinitesimalmente más fluido y preciso. A nivel teórico, un polling rate de 8000Hz disminuye drásticamente el micro-stuttering visual en monitores de alta tasa de refresco (240Hz, 360Hz o superiores), logrando que la trayectoria del puntero coincida de manera más exacta con los cuadros renderizados en pantalla.
            </p>
            <p>
              Sin embargo, el beneficio real en el entorno competitivo depende de varios factores externos. Para aprovechar una tasa de 8000Hz se requiere un procesador de alto rendimiento, ya que el procesamiento constante de tantos datos por segundo genera una carga considerable en la CPU que puede provocar caídas de fotogramas en equipos de gama media. En definitiva, aunque los 8000Hz y los sensores ópticos de última generación representan la máxima precisión técnica disponible, su impacto práctico es perceptible principalmente por jugadores profesionales que cuentan con hardware de gama entusiasta y pantallas de refresco ultra alto.
            </p>
          </div>
        </main>
      </div>
    </PlantillaBase>
  );
}

export default Caso2;