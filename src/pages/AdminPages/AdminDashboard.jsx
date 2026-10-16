import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminDashboard = () => {
    return (
        <PlantillaAdmin>
            <div>
                <h1>Dashboard</h1>
                <p>Resumen de las actividades diarias</p>
            </div>

            {/* Tarjetas de Métricas */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ flex: 1, backgroundColor: '#0d6efd', color: '#fff', padding: '20px', borderRadius: '10px' }}>
                    <h3>Compras</h3>
                    <h2>1,234</h2>
                    <p style={{ fontSize: '0.8rem' }}>Probabilidad de aumento: 20%</p>
                </div>
                <div style={{ flex: 1, backgroundColor: '#198754', color: '#fff', padding: '20px', borderRadius: '10px' }}>
                    <h3>Productos</h3>
                    <h2>400</h2>
                    <p style={{ fontSize: '0.8rem' }}>Inventario actual: 500</p>
                </div>
                <div style={{ flex: 1, backgroundColor: '#ffc107', color: '#000', padding: '20px', borderRadius: '10px' }}>
                    <h3>Usuarios</h3>
                    <h2>890</h2>
                    <p style={{ fontSize: '0.8rem' }}>Nuevos usuarios este mes: 120</p>
                </div>
            </div>

            {/* Cuadrícula de Accesos Rápidos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Dashboard</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Visión general de todas las métricas...</p>
                </div>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Órdenes</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Gestión y seguimiento de todas las órdenes...</p>
                </div>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Productos</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Administrar inventario y detalles...</p>
                </div>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Categorías</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Organizar productos en categorías...</p>
                </div>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Usuarios</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Gestión de cuentas de usuario...</p>
                </div>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Reportes</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Generación de informes detallados...</p>
                </div>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Perfil</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Administración de la información personal...</p>
                </div>
                <div style={{ border: '1px solid #dee2e6', padding: '20px', textAlign: 'center', borderRadius: '10px', backgroundColor: '#fff' }}>
                    <h4>Tienda</h4>
                    <p style={{ fontSize: '0.8rem', color: '#6c757d' }}>Visualiza tu tienda en tiempo real...</p>
                </div>
            </div>
        </PlantillaAdmin>
    );
};

export default AdminDashboard;