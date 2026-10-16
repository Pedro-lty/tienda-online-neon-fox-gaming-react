import React from 'react';

const AccesoRapido = ({ titulo, descripcion, ruta }) => {
    return (
        // Usamos una etiqueta <a> normal por ahora (luego puedes cambiarla a <Link> si usas react-router-dom)
        <a href={ruta} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff', height: '100%' }}>
                <h4 style={{ marginBottom: '10px', color: '#110027' }}>{titulo}</h4>
                <p style={{ fontSize: '0.8rem', color: '#6c757d', margin: 0 }}>{descripcion}</p>
            </div>
        </a>
    );
};

export default AccesoRapido;