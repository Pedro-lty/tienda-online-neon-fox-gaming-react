import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import PanelMetricas from '../../components/organisms/PanelMetricas';
import CuadriculaAccesos from '../../components/organisms/CuadriculaAccesos';

const AdminDashboard = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina" style={{ marginBottom: '20px' }}>
                <h1>Dashboard</h1>
                <p>Resumen de las actividades diarias</p>
            </div>

            {/* Inyectamos el organismo de las 3 tarjetas de colores */}
            <PanelMetricas />

            {/* Inyectamos el organismo de los 8 accesos rápidos */}
            <CuadriculaAccesos />
            
        </PlantillaAdmin>
    );
};

export default AdminDashboard;