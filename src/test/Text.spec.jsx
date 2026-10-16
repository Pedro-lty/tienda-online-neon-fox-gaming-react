import React from 'react';
import Text from '../components/atoms/Text';
import { renderUI } from './testUtils.js';

describe('Text Component', () => {
  it('usa párrafo como variante por defecto', async () => {
    const container = await renderUI(<Text>Contenido</Text>);
    expect(container.querySelector('p').textContent).toBe('Contenido');
  });

  it('permite elegir una etiqueta y una clase', async () => {
    const container = await renderUI(<Text variant="h2" className="titulo">Título</Text>);
    const heading = container.querySelector('h2');
    expect(heading.textContent).toBe('Título');
    expect(heading.classList.contains('titulo')).toBeTrue();
  });
});
