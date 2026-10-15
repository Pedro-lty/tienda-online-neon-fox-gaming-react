// src/test/Button.spec.jsx
import React from 'react';
import Button from '../components/atoms/Button';
import { click, renderUI } from './testUtils.js';

describe('Button Component', () => {
  it('renderiza el texto y aplica la variante de Bootstrap', async () => {
    const container = await renderUI(<Button variant="primary">Haz click</Button>);
    const button = container.querySelector('button');

    expect(button.textContent).toBe('Haz click');
    expect(button).toHaveClassName('btn-primary');
  });

  it('ejecuta el callback al hacer click', async () => {
    const onClick = jasmine.createSpy('onClick');
    const container = await renderUI(<Button onClick={onClick}>Haz click</Button>);

    await click(container.querySelector('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
