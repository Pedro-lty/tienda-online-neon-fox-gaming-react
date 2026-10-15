import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ProductCard from '../components/organisms/ProductCard';
import { click, renderUI } from './testUtils.js';

const product = {
  id: 2,
  name: 'Mouse Razer',
  brand: 'Razer',
  price: 209990,
  image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
};

function CurrentPath() {
  const location = useLocation();
  return <output id="current-path">{location.pathname}</output>;
}

describe('ProductCard Component', () => {
  it('muestra información del producto y activa agregar al carrito', async () => {
    const agregar = jasmine.createSpy('agregar');
    const container = await renderUI(
      <MemoryRouter><ProductCard product={product} alAgregarAlCarrito={agregar} /></MemoryRouter>
    );
    expect(container.textContent).toContain(product.name);
    expect(container.textContent).toContain(product.brand);
    await click(container.querySelector('button'));
    expect(agregar).toHaveBeenCalledWith(product);
  });

  it('navega al detalle al pulsar la imagen', async () => {
    const container = await renderUI(
      <MemoryRouter><ProductCard product={product} alAgregarAlCarrito={() => {}} /><CurrentPath /></MemoryRouter>
    );
    await click(container.querySelector('.periferico-img-container'));
    expect(container.querySelector('#current-path').textContent).toBe('/products/2');
  });
});
