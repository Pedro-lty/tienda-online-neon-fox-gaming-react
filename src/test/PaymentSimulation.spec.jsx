import React from 'react';
import PaymentSimulation from '../components/organisms/PaymentSimulation';
import { click, renderUI } from './testUtils.js';

describe('PaymentSimulation Component', () => {
  it('ofrece simular ambos resultados', async () => {
    const choose = jasmine.createSpy('choose');
    const container = await renderUI(<PaymentSimulation onChoose={choose} onClose={() => {}} />);
    const buttons = container.querySelectorAll('button');

    await click(buttons[1]);
    await click(buttons[2]);

    expect(choose).toHaveBeenCalledWith('exito');
    expect(choose).toHaveBeenCalledWith('fallido');
  });

  it('permite cerrar la ventana de simulación', async () => {
    const close = jasmine.createSpy('close');
    const container = await renderUI(<PaymentSimulation onChoose={() => {}} onClose={close} />);
    await click(container.querySelector('[aria-label="Cerrar"]'));
    expect(close).toHaveBeenCalledTimes(1);
  });
});
