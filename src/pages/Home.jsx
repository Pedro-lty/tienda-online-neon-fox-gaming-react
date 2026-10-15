import React from 'react';
import PlantillaBase from '../components/template/PlantillaBase';
import ProductCard from '../components/organisms/ProductCard';
import Text from '../components/atoms/Text';
import { products } from '../data/products.js';

import '../styles/pages/home/home.css';

function Home({ alAgregarAlCarrito, totalItemsCount = 0 }) {
  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="text-destacados my-4">
        <Text variant="h2" className="text-center">PRODUCTOS DESTACADOS</Text>
      </div>

      <div className="contenedor-caja d-flex justify-content-center flex-wrap gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            alAgregarAlCarrito={alAgregarAlCarrito}
          />
        ))}
      </div>
    </PlantillaBase>
  );
}

export default Home;
