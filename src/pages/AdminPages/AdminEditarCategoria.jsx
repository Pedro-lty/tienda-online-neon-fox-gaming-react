import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminEditarCategoria = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Editar Categoría</h1>
                <a className="boton secundario" href="/admin/categorias">Volver</a>
            </div>
            <section className="contenido">
                <p>Formulario para modificar una categoría existente.</p>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminEditarCategoria;