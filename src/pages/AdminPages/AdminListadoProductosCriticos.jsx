import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminListadoProductosCriticos = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Productos Críticos (Bajo Stock)</h1>
                <a className="boton secundario" href="/admin/productos">Volver</a>
            </div>
            <section className="contenido">
                <p>Tabla con los productos que están a punto de agotarse.</p>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminListadoProductosCriticos;