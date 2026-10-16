import React from 'react';
import PlantillaBase from '../components/template/PlantillaBase';

export function Blogs({ totalItemsCount = 0 }) {
  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <h2>Página de Blogs</h2>
    </PlantillaBase>
  );
}

export default Blogs;
