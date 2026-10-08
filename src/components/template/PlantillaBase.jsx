import React from 'react';
import Navbar from '../organisms/Navbar';

function PlantillaBase({ children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default PlantillaBase;