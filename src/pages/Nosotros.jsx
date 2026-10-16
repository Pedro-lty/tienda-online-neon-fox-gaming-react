import React from 'react';
import PlantillaBase from '../components/template/PlantillaBase';

export function Nosotros({ totalItemsCount = 0 }) {
  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <h2>Sobre Nosotros</h2>
    </PlantillaBase>
  );
}

export default Nosotros;
