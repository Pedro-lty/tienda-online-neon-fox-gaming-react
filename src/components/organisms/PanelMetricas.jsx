import React from 'react';
import TarjetaMetrica from '../molecules/TarjetaMetrica';

const PanelMetricas = () => {
    return (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <TarjetaMetrica 
                titulo="Compras" 
                valor="1,234" 
                detalle="Probabilidad de aumento: 20%" 
                colorFondo="#0d6efd" 
            />
            <TarjetaMetrica 
                titulo="Productos" 
                valor="400" 
                detalle="Inventario actual: 500" 
                colorFondo="#198754" 
            />
            <TarjetaMetrica 
                titulo="Usuarios" 
                valor="890" 
                detalle="Nuevos usuarios este mes: 120" 
                colorFondo="#ffc107" 
                colorTexto="#000" 
            />
        </div>
    );
};

export default PanelMetricas;