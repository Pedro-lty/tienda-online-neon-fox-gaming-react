import React from 'react';

const TarjetaMetrica = ({ titulo, valor, detalle, colorFondo, colorTexto = '#fff' }) => {
    return (
        <div style={{ flex: 1, backgroundColor: colorFondo, color: colorTexto, padding: '20px', borderRadius: '10px' }}>
            <h3>{titulo}</h3>
            <h2>{valor}</h2>
            <p style={{ fontSize: '0.8rem' }}>{detalle}</p>
        </div>
    );
};

export default TarjetaMetrica;