import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminNuevoProducto = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Crear Nuevo Producto</h1>
                <a className="boton secundario" href="/admin/productos">Volver</a>
            </div>
            <section className="contenido">
                <p>Formulario para ingresar un nuevo producto al inventario.</p>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminNuevoProducto;