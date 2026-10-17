import React from 'react';
import { Carousel } from 'react-bootstrap';
import PlantillaBase from '../components/template/PlantillaBase';
import ProductCard from '../components/organisms/ProductCard';
import Text from '../components/atoms/Text';
import { products } from '../data/products.js';
import '../styles/pages/home.css';

function Home({ alAgregarAlCarrito, totalItemsCount = 0 }) {
  const productosDestacados = products.filter(
    (product) => product.id === 1 || product.id === 2 || product.id === 3
  );

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <main className="main-container">
        <Carousel id="carouselExampleIndicators" className="home-carousel" fade={false}>
          <Carousel.Item className="d-item">
            <img
              className="d-block w-100 d-img"
              src="/slide1.webp"
              alt="slide1"
            />
          </Carousel.Item>
          <Carousel.Item className="d-item">
            <img
              className="d-block w-100 d-img"
              src="/slide2.webp"
              alt="slide2"
            />
          </Carousel.Item>
          <Carousel.Item className="d-item">
            <img
              className="d-block w-100 d-img"
              src="/slide3.webp"
              alt="slide3"
            />
          </Carousel.Item>
        </Carousel>

        <div className="text-destacados">
          <Text variant="h2">PRODUCTOS DESTACADOS</Text>
        </div>

        <div className="contenedor-caja">
          {productosDestacados.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              hoverImage={product.images?.[1]}
              alAgregarAlCarrito={alAgregarAlCarrito}
            />
          ))}
        </div>
      </main>
    </PlantillaBase>
  );
}

export default Home;