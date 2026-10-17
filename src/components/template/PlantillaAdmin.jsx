import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/admin_style.css';

const linkStyle = { color: '#fff', textDecoration: 'none' };

const PlantillaAdmin = ({ children }) => {
    const navigate = useNavigate();

    let sesion = null;
    try {
        sesion = JSON.parse(localStorage.getItem('user'));
    } catch {
        sesion = null;
    }

    const cerrarSesion = () => {
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
            {/* Menú Lateral (Sidebar) */}
            <aside className="menu-lateral" style={{ width: '250px', flexShrink: 0, backgroundColor: '#212529', color: '#fff', padding: '20px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Neon Fox Gaming</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
                    <Link to="/admin/ordenes" style={linkStyle}>Órdenes</Link>
                    <Link to="/admin/productos" style={linkStyle}>Productos</Link>
                    <Link to="/admin/categorias" style={linkStyle}>Categorías</Link>
                    <Link to="/admin/usuarios" style={linkStyle}>Usuarios</Link>
                    <Link to="/admin/reportes" style={linkStyle}>Reportes</Link>
                    <hr style={{ borderColor: '#495057', margin: '20px 0' }} />
                    <Link to="/admin/perfil" style={linkStyle}>Perfil</Link>
                    <br />
                    <Link to="/" style={{ ...linkStyle, backgroundColor: '#343a40', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>
                        Tienda
                    </Link>
                    <button
                        onClick={cerrarSesion}
                        style={{ backgroundColor: '#dc3545', padding: '10px', color: '#fff', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </aside>

            {/* Contenido Principal */}
            <main style={{ flex: 1, padding: '20px', minWidth: 0 }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', backgroundColor: '#343a40', padding: '10px', color: '#fff' }}>
                    <span>Panel de administración</span>
                    {sesion?.nombre && <span>Hola, {sesion.nombre}</span>}
                </header>

                <section className="contenido">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default PlantillaAdmin;
