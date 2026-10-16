import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

function PlantillaBase({ children, totalItemsCount = 0 }) {
  return (
    <>
      <Navbar totalItemsCount={totalItemsCount} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default PlantillaBase;
