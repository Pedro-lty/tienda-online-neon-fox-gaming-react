import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Navbar from '../components/organisms/Navbar';
import { click, renderUI } from './testUtils.js';

function CurrentPath() {
  const location = useLocation();
  return <output id="current-path">{location.pathname}</output>;
}

describe('Navbar Component', () => {
  it('muestra los enlaces y el contador cuando hay productos', async () => {
    const container = await renderUI(
      <MemoryRouter><Navbar totalItemsCount={4} /><CurrentPath /></MemoryRouter>
    );
    expect(container.textContent).toContain('Inicio');
    expect(container.textContent).toContain('Productos');
    expect(container.querySelector('.badge').textContent).toBe('4');
  });

  it('navega al carrito desde el botón', async () => {
    const container = await renderUI(
      <MemoryRouter><Navbar /><CurrentPath /></MemoryRouter>
    );
    const cartButton = [...container.querySelectorAll('button')]
      .find((button) => button.textContent.includes('Carrito'));

    await click(cartButton);

    expect(container.querySelector('#current-path').textContent).toBe('/carrito');
  });
});
