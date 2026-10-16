import React from 'react';
import FilaItemCarrito from '../components/molecules/FilaItemPedido';
import { click, renderUI } from './testUtils.js';

const item = {
  id: 1,
  name: 'Teclado Redragon',
  image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
  price: 32990,
  quantity: 2,
};

describe('FilaItemPedido Component', () => {
  it('muestra el producto y calcula el subtotal', async () => {
    const container = await renderUI(
      <table><tbody><FilaItemCarrito item={item} alActualizarCantidad={() => {}} alEliminar={() => {}} /></tbody></table>
    );
    expect(container.textContent).toContain('Teclado Redragon');
    expect(container.textContent).toContain('$32.990');
    expect(container.textContent).toContain('$65.980');
    expect(container.querySelector('img').getAttribute('alt')).toBe(item.name);
  });

  it('envía los cambios de cantidad y eliminación al padre', async () => {
    const actualizar = jasmine.createSpy('actualizar');
    const eliminar = jasmine.createSpy('eliminar');
    const container = await renderUI(
      <table><tbody><FilaItemCarrito item={item} alActualizarCantidad={actualizar} alEliminar={eliminar} /></tbody></table>
    );
    const buttons = container.querySelectorAll('button');

    await click(buttons[0]);
    await click(buttons[1]);
    await click(buttons[2]);

    expect(actualizar).toHaveBeenCalledWith(item.id, -1);
    expect(actualizar).toHaveBeenCalledWith(item.id, 1);
    expect(eliminar).toHaveBeenCalledWith(item.id);
  });
});
