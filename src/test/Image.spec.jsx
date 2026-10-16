import React from 'react';
import Image from '../components/atoms/Image';
import { renderUI } from './testUtils.js';

describe('Image Component', () => {
  it('renderiza origen, texto alternativo y clase', async () => {
    const container = await renderUI(<Image src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="Teclado" className="foto" />);
    const image = container.querySelector('img');
    expect(image.getAttribute('src')).toBe('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
    expect(image.getAttribute('alt')).toBe('Teclado');
    expect(image.classList.contains('foto')).toBeTrue();
  });
});
