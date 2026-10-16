import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import TablaCarrito from '../components/organisms/TablaCarrito';
import { click, renderUI } from './testUtils.js';

const item = { id: 1, name: 'Teclado', image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=', price: 10000, quantity: 2 };

function CurrentPath() {
  const location = useLocation();
  return <output id="current-path">{location.pathname}</output>;
}

const callbacks = {
  alActualizarCantidad: () => {},
  alEliminar: () => {},
  alLimpiar: () => {},
};

describe('TablaCarrito Component', () => {
  it('muestra el estado vacío y deshabilita las acciones', async () => {
    const container = await renderUI(
      <MemoryRouter><TablaCarrito itemsCarrito={[]} totalPagar={0} {...callbacks} /></MemoryRouter>
    );
    expect(container.textContent).toContain('El carrito está vacío.');
    expect(container.querySelectorAll('button')[0].disabled).toBeTrue();
    expect(container.querySelectorAll('button')[1].disabled).toBeTrue();
  });

  it('muestra el total, permite limpiar y navega a checkout', async () => {
    const limpiar = jasmine.createSpy('limpiar');
    const container = await renderUI(
      <MemoryRouter>
        <TablaCarrito itemsCarrito={[item]} totalPagar={20000} {...callbacks} alLimpiar={limpiar} />
        <CurrentPath />
      </MemoryRouter>
    );
    const clearButton = [...container.querySelectorAll('button')]
      .find((button) => button.textContent.trim() === 'Limpiar');
    const checkoutButton = [...container.querySelectorAll('button')]
      .find((button) => button.textContent.includes('Comprar ahora'));

    expect(container.textContent).toContain('$20.000');
    await click(clearButton);
    expect(limpiar).toHaveBeenCalledTimes(1);
    await click(checkoutButton);
    expect(container.querySelector('#current-path').textContent).toBe('/checkout');
  });
});
