import React from 'react';
import { Link } from 'react-router-dom';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/blogs.css';

export function Blogs({ totalItemsCount = 0 }) {
  const blogsData = [
    {
      id: 1,
      titulo: 'CASO CURIOSO #1',
      descripcion:
        'Descubre qué tipos de switches mecánicos ofrecen el menor tiempo de respuesta para juegos de disparos en primera persona.',
      imagen: 'https://pcsinmisterios.com/wp-content/uploads/2016/04/9gnpx4b.gif?w=1000',
      alt: 'Teclados mecánicos FPS',
      link: '/caso1'
    },
    {
      id: 2,
      titulo: 'CASO CURIOSO #2',
      descripcion:
        '¿Realmente influye el Polling Rate a 8000Hz? Analizamos el impacto de los sensores ópticos en el rendimiento competitivo.',
      imagen: 'https://acf.geeknetic.es/imgw/imagenes/tutoriales/cestus/1449-acer-predator-cestus-500-26-w99w.gif?f=webp',
      alt: 'Sensores de ratón gamer',
      link: '/caso2'
    }
  ];

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="blogs-page-wrapper">
        <main className="main-container">
          <h2 className="section-title">NOTICIAS IMPORTANTES</h2>

          <section className="blog-list">
            {blogsData.map((blog) => (
              <article key={blog.id} className="blog-card-horizontal">
                <div className="blog-info">
                  <h2>{blog.titulo}</h2>
                  <p>{blog.descripcion}</p>
                  <Link to={blog.link} className="ver-caso-btn">
                    VER CASO
                  </Link>
                </div>
                <div className="blog-image-container">
                  <img src={blog.imagen} alt={blog.alt} className="blog-img" />
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </PlantillaBase>
  );
}

export default Blogs;