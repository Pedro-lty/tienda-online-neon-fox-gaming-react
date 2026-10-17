import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

function PlantillaBase({ children, totalItemsCount = 0 }) {
  return (
    <div style={{ width: '100%', minWidth: '100%', padding: 0, margin: 0 }}>
      <Navbar totalItemsCount={totalItemsCount} />
      {/* Sin etiquetas de container aquí para que el contenido sea 100% libre */}
      {children}
      <Footer />
    </div>
  );
}

export default PlantillaBase;