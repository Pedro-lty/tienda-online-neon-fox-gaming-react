import React from 'react';
import '../../estilos/admin_style.css'; // Asegúrate de ajustar tu CSS a este nuevo menú

const PlantillaAdmin = ({ children }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
            {/* Menú Lateral (Sidebar) */}
            <aside className="menu-lateral" style={{ width: '250px', backgroundColor: '#212529', color: '#fff', padding: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Company name</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a href="/admin/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</a>
                    <a href="/admin/ordenes" style={{ color: '#fff', textDecoration: 'none' }}>Órdenes</a>
                    <a href="/admin/productos" style={{ color: '#fff', textDecoration: 'none' }}>Productos</a>
                    <a href="/admin/categorias" style={{ color: '#fff', textDecoration: 'none' }}>Categorías</a>
                    <a href="/admin/usuarios" style={{ color: '#fff', textDecoration: 'none' }}>Usuarios</a>
                    <a href="/admin/reportes" style={{ color: '#fff', textDecoration: 'none' }}>Reportes</a>
                    <hr style={{ borderColor: '#495057', margin: '20px 0' }} />
                    <a href="/admin/perfil" style={{ color: '#fff', textDecoration: 'none' }}>Perfil</a>
                    <br />
                    <a href="/" style={{ backgroundColor: '#343a40', padding: '10px', textAlign: 'center', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Tienda</a>
                    <a href="/login" style={{ backgroundColor: '#dc3545', padding: '10px', textAlign: 'center', color: '#fff', textDecoration: 'none', borderRadius: '5px', marginTop: '10px' }}>Cerrar Sesión</a>
                </nav>
            </aside>

            {/* Contenido Principal */}
            <main style={{ flex: 1, padding: '20px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#343a40', padding: '10px', color: '#fff' }}>
                    <span>127.0.0.1:5500/admin/index.html</span>
                    {/* Aquí irían los iconos de búsqueda, notificaciones, etc. */}
                </header>
                
                <section className="contenido">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default PlantillaAdmin;