import React from 'react';
import PlantillaAdmin from '../../components/template/PlantillaAdmin';

const AdminNuevoUsuario = () => {
    return (
        <PlantillaAdmin>
            <div className="titulo-pagina">
                <h1>Crear Nuevo Usuario</h1>
                <a className="boton secundario" href="/admin/usuarios">Volver</a>
            </div>
            <section className="contenido">
                <p>Formulario para registrar un administrador o cliente manualmente.</p>
            </section>
        </PlantillaAdmin>
    );
};

export default AdminNuevoUsuario;