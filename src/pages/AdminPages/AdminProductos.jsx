import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminProductos = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Gestión de Productos</h1>
            </div>
            <section className="contenido">
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <a className="boton" href="/admin/nuevo-producto">Nuevo Producto</a>
                    <a className="boton secundario" href="/admin/productos-criticos">Ver Productos Críticos</a>
                </div>
                {/* Aquí irá la tabla con el listado de productos */}
            </section>
        </PlantillaAdmin>
    );
};

export default AdminProductos;