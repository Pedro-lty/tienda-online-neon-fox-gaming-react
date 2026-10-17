import React from 'react';
import { Link } from 'react-router-dom';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';
import { getProductos, getUsuarios, getOrdenes, clp, STOCK_CRITICO } from '../../services/adminData';

const accesos = [
    { titulo: 'Órdenes', descripcion: 'Gestión y seguimiento de todas las órdenes', to: '/admin/ordenes' },
    { titulo: 'Productos', descripcion: 'Administrar inventario y detalles', to: '/admin/productos' },
    { titulo: 'Categorías', descripcion: 'Organizar productos en categorías', to: '/admin/categorias' },
    { titulo: 'Usuarios', descripcion: 'Gestión de cuentas de usuario', to: '/admin/usuarios' },
    { titulo: 'Reportes', descripcion: 'Ventas y productos más vendidos', to: '/admin/reportes' },
    { titulo: 'Stock crítico', descripcion: 'Productos que se están agotando', to: '/admin/productos-criticos' },
    { titulo: 'Perfil', descripcion: 'Tus datos y contraseña', to: '/admin/perfil' },
    { titulo: 'Tienda', descripcion: 'Visualiza tu tienda', to: '/' }
];

const AdminDashboard = () => {
    const productos = getProductos();
    const usuarios = getUsuarios();
    const ordenes = getOrdenes();

    const ingresos = ordenes.filter((o) => o.estado !== 'Cancelada').reduce((s, o) => s + o.total, 0);
    const criticos = productos.filter((p) => p.stock <= STOCK_CRITICO).length;
    const admins = usuarios.filter((u) => u.role === 'Admin').length;

    const tarjetas = [
        { titulo: 'Órdenes', valor: ordenes.length, detalle: `Ingresos: ${clp(ingresos)}`, fondo: '#0d6efd', texto: '#fff' },
        { titulo: 'Productos', valor: productos.length, detalle: `Con stock crítico: ${criticos}`, fondo: '#198754', texto: '#fff' },
        { titulo: 'Usuarios', valor: usuarios.length, detalle: `Administradores: ${admins}`, fondo: '#ffc107', texto: '#000' }
    ];

    return (
        <PlantillaAdmin>
            <div>
                <h1>Dashboard</h1>
                <p>Resumen de las actividades diarias</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                {tarjetas.map((t) => (
                    <div key={t.titulo} style={{ flex: 1, minWidth: 200, backgroundColor: t.fondo, color: t.texto, padding: '20px', borderRadius: '10px' }}>
                        <h3>{t.titulo}</h3>
                        <h2>{t.valor}</h2>
                        <p style={{ fontSize: '0.8rem', marginBottom: 0 }}>{t.detalle}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {accesos.map((a) => (
                    <Link key={a.titulo} to={a.to} className="admin-acceso">
                        <h4>{a.titulo}</h4>
                        <p>{a.descripcion}</p>
                    </Link>
                ))}
            </div>
        </PlantillaAdmin>
    );
};

export default AdminDashboard;
