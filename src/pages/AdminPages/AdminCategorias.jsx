import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminCategorias = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Categorías</h1>
            </div>
            <section className="contenido">
                <div style={{ marginBottom: '20px' }}>
                    <a className="boton" href="/admin/nueva-categoria">Nueva Categoría</a>
                </div>
                {/* Aquí irá la tabla de categorías */}
            </section>
        </PlantillaAdmin>
    );
};

export default AdminCategorias;