import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminNuevaCategoria = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Nueva Categoría</h1>
                <a className="boton secundario" href="/admin/categorias">Volver</a>
            </div>
            <section className="contenido">
                <p>Formulario para crear una categoría.</p>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminNuevaCategoria;