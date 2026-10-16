import React from 'react';
import CardBody from '../components/molecules/CardBody';
import { renderUI } from './testUtils.js';

describe('CardBody Component', () => {
  it('muestra título, descripción y precio', async () => {
    const container = await renderUI(
      <CardBody title="Mouse" description="Mouse gamer" price={19990} />
    );
    expect(container.querySelector('h5').textContent).toBe('Mouse');
    expect(container.querySelector('p').textContent).toBe('Mouse gamer');
    expect(container.querySelector('span').textContent).toBe('$19990');
  });
});
