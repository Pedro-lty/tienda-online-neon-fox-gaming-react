import React from 'react';
import { Link } from 'react-router-dom';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/blogs.css';

export function Caso1({ totalItemsCount = 0 }) {
  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="caso-detail-wrapper">
        <main className="caso-detail-container">
          <Link to="/blogs" className="btn-volver">
            &larr; Volver a Blogs
          </Link>

          <h2>CASO CURIOSO #1: Teclados Mecánicos FPS</h2>

          <div className="img-box">
            <img
              src="https://pcsinmisterios.com/wp-content/uploads/2016/04/9gnpx4b.gif?w=1000"
              alt="Teclados mecánicos FPS"
            />
          </div>

          <div className="contenido-texto">
            <p>
              En el ecosistema del gaming competitivo, donde una fracción de segundo determina la victoria o la derrota, la elección de los switches mecánicos se ha vuelto un factor determinante para el rendimiento. Para los entusiastas y jugadores profesionales de shooters en primera persona (FPS), reducir la latencia de entrada y optimizar el punto de actuación no es solo un lujo, sino una necesidad táctica.
            </p>
            <p>
              Tradicionalmente, los switches lineales como los Red o Speed Silver han sido los preferidos por su recorrido suave y sin resistencia táctil, permitiendo pulsaciones rápidas y consecutivas. Sin embargo, la evolución tecnológica ha introducido los switches ópticos y los basados en efecto Hall (magnéticos). Estas tecnologías eliminan el contacto físico metálico para registrar la señal mediante haces de luz o campos magnéticos, reduciendo el rebote de señal (debounce delay) prácticamente a cero y alcanzando tiempos de respuesta de fracciones de milisegundo.
            </p>
            <p>
              Además, la llegada del Rapid Trigger en los teclados de última generación permite que la tecla se reinicie en el instante en que comienza a subir, sin tener que superar un punto fijo de retorno. Esto facilita dinámicas de juego avanzadas como el counter-strafing o frenados instantáneos en títulos competitivos. En conclusión, mientras que los switches mecánicos tradicionales siguen siendo excelentes para uso diario, las alternativas ópticas y magnéticas representan la cúspide actual en velocidad y precisión para el entorno FPS.
            </p>
          </div>
        </main>
      </div>
    </PlantillaBase>
  );
}

export default Caso1;