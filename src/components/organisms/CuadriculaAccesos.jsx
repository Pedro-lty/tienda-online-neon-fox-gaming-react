import React from 'react';
import AccesoRapido from '../molecules/AccesoRapido';

const CuadriculaAccesos = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <AccesoRapido titulo="Dashboard" descripcion="Visión general de las métricas clave" ruta="/admin/dashboard" />
            <AccesoRapido titulo="Órdenes" descripcion="Gestión y seguimiento de las órdenes de compra" ruta="/admin/ordenes" />
            <AccesoRapido titulo="Productos" descripcion="Administrar inventario y detalles disponibles" ruta="/admin/productos" />
            <AccesoRapido titulo="Categorías" descripcion="Organizar productos en categorías para su navegación" ruta="/admin/categorias" />
            <AccesoRapido titulo="Usuarios" descripcion="Gestión de cuentas de usuario y sus roles" ruta="/admin/usuarios" />
            <AccesoRapido titulo="Reportes" descripcion="Generación de informes sobre las operaciones" ruta="/admin/reportes" />
            <AccesoRapido titulo="Perfil" descripcion="Administración de la información personal de la cuenta" ruta="/admin/perfil" />
            <AccesoRapido titulo="Tienda" descripcion="Visualiza tu tienda en tiempo real" ruta="/" />
        </div>
    );
};

export default CuadriculaAccesos;